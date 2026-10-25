import * as THREE from 'three';

/**
 * Small GPU "stable fluids" solver (velocity advection, pressure projection) plus a
 * displacement field that the particles read. The cursor stirs the water; the particles
 * ride the flow and then settle back into their shape as the water calms down.
 *
 * Everything runs in fragment shaders on half-float render targets, so it is only
 * switched on when the GPU can do that and keeps up (see `canRunFluid` and `FluidGuard`).
 */

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const COMMON = /* glsl */ `
precision highp float;
precision highp sampler2D;
varying vec2 vUv;
`;

const ADVECT = /* glsl */ `${COMMON}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uDt;
uniform float uDissipation;
void main() {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexel;
    gl_FragColor = uDissipation * texture2D(uSource, coord);
}`;

const SPLAT = /* glsl */ `${COMMON}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + splat, 1.0);
}`;

const DIVERGENCE = /* glsl */ `${COMMON}
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
    vec2 vL = vUv - vec2(uTexel.x, 0.0);
    vec2 vR = vUv + vec2(uTexel.x, 0.0);
    vec2 vT = vUv + vec2(0.0, uTexel.y);
    vec2 vB = vUv - vec2(0.0, uTexel.y);
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    // the walls reflect the flow
    if (vL.x < 0.0) L = -C.x;
    if (vR.x > 1.0) R = -C.x;
    if (vT.y > 1.0) T = -C.y;
    if (vB.y < 0.0) B = -C.y;
    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const PRESSURE = /* glsl */ `${COMMON}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexel;
void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT = /* glsl */ `${COMMON}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
    float L = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    vec2 v = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
    gl_FragColor = vec4(v, 0.0, 1.0);
}`;

// The displacement the particles read: carried along by the water, topped up by the flow,
// and slowly relaxing back to zero.
const DISPLACE = /* glsl */ `${COMMON}
uniform sampler2D uVelocity;
uniform sampler2D uDisp;
uniform vec2 uTexel;
uniform float uDt;
uniform float uGain;
uniform float uDecay;
void main() {
    vec2 v = texture2D(uVelocity, vUv).xy;
    vec2 d = texture2D(uDisp, vUv - uDt * v * uTexel).xy + v * uTexel * uDt * uGain;
    gl_FragColor = vec4(d * uDecay, 0.0, 1.0);
}`;

const SCALE = /* glsl */ `${COMMON}
uniform sampler2D uSource;
uniform float uValue;
void main() {
    gl_FragColor = uValue * texture2D(uSource, vUv);
}`;

type Target = THREE.WebGLRenderTarget;
type Pair = { read: Target; write: Target; swap: () => void };

const makeTarget = (w: number, h: number): Target =>
    new THREE.WebGLRenderTarget(w, h, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        depthBuffer: false,
        stencilBuffer: false,
    });

const makePair = (w: number, h: number): Pair => {
    const pair = {
        read: makeTarget(w, h),
        write: makeTarget(w, h),
        swap() { const t = pair.read; pair.read = pair.write; pair.write = t; },
    };
    return pair;
};

/** True when the renderer can render to half-float targets and looks like a real GPU. */
export function canRunFluid(gl: THREE.WebGLRenderer): { ok: boolean; reason: string } {
    if (typeof window === 'undefined') return { ok: false, reason: 'no window' };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { ok: false, reason: 'reduced motion' };
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900) return { ok: false, reason: 'touch or small screen' };
    if (!gl.capabilities.isWebGL2) return { ok: false, reason: 'no WebGL2' };
    const ext = gl.extensions;
    if (!ext.has('EXT_color_buffer_float') && !ext.has('EXT_color_buffer_half_float')) return { ok: false, reason: 'no float render targets' };
    const ctx = gl.getContext();
    const info = ctx.getExtension('WEBGL_debug_renderer_info');
    const name = info ? String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(name)) return { ok: false, reason: `software renderer (${name})` };
    return { ok: true, reason: name || 'gpu' };
}

export class FluidSim {
    readonly width: number;
    readonly height: number;
    private gl: THREE.WebGLRenderer;
    private scene = new THREE.Scene();
    private camera = new THREE.Camera();
    private quad: THREE.Mesh;
    private velocity: Pair;
    private pressure: Pair;
    private divergence: Target;
    private disp: Pair;
    private mats: Record<string, THREE.ShaderMaterial>;
    private texel: THREE.Vector2;
    private last: { x: number; y: number; has: boolean } = { x: 0, y: 0, has: false };
    private pending: { x: number; y: number } | null = null;
    private pressureIterations: number;

    /** Texture the particles sample: screen-space displacement, in uv units. */
    get texture() { return this.disp.read.texture; }

    constructor(gl: THREE.WebGLRenderer, cells = 112, pressureIterations = 14) {
        this.gl = gl;
        const aspect = window.innerWidth / Math.max(1, window.innerHeight);
        this.height = cells;
        this.width = Math.max(cells, Math.round(cells * aspect));
        this.texel = new THREE.Vector2(1 / this.width, 1 / this.height);
        this.pressureIterations = pressureIterations;

        this.velocity = makePair(this.width, this.height);
        this.pressure = makePair(this.width, this.height);
        this.divergence = makeTarget(this.width, this.height);
        this.disp = makePair(this.width, this.height);

        const mat = (frag: string, uniforms: Record<string, THREE.IUniform>) =>
            new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
        const texel = { value: this.texel };
        this.mats = {
            advect: mat(ADVECT, { uVelocity: { value: null }, uSource: { value: null }, uTexel: texel, uDt: { value: 0 }, uDissipation: { value: 1 } }),
            splat: mat(SPLAT, { uTarget: { value: null }, uAspect: { value: aspect }, uPoint: { value: new THREE.Vector2() }, uColor: { value: new THREE.Vector3() }, uRadius: { value: 0.0035 } }),
            divergence: mat(DIVERGENCE, { uVelocity: { value: null }, uTexel: texel }),
            pressure: mat(PRESSURE, { uPressure: { value: null }, uDivergence: { value: null }, uTexel: texel }),
            gradient: mat(GRADIENT, { uPressure: { value: null }, uVelocity: { value: null }, uTexel: texel }),
            displace: mat(DISPLACE, { uVelocity: { value: null }, uDisp: { value: null }, uTexel: texel, uDt: { value: 0 }, uGain: { value: 0.4 }, uDecay: { value: 0.975 } }),
            scale: mat(SCALE, { uSource: { value: null }, uValue: { value: 0.8 } }),
        };

        // One big triangle covers the screen
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
        geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
        this.quad = new THREE.Mesh(geo, this.mats.advect);
        this.quad.frustumCulled = false;
        this.scene.add(this.quad);
    }

    /** Cursor position in 0..1 screen coordinates (y up). */
    pointer(x: number, y: number) {
        this.pending = { x, y };
    }

    private run(mat: THREE.ShaderMaterial, target: Target) {
        this.quad.material = mat;
        this.gl.setRenderTarget(target);
        this.gl.render(this.scene, this.camera);
    }

    step(dtRaw: number) {
        const dt = Math.min(dtRaw, 1 / 30);
        const gl = this.gl;
        const prevTarget = gl.getRenderTarget();
        const prevAuto = gl.autoClear;
        gl.autoClear = false;

        const { advect, splat, divergence, pressure, gradient, displace, scale } = this.mats;

        // 1. carry the velocity along itself
        advect.uniforms.uVelocity.value = this.velocity.read.texture;
        advect.uniforms.uSource.value = this.velocity.read.texture;
        advect.uniforms.uDt.value = dt;
        advect.uniforms.uDissipation.value = Math.pow(0.2, dt); // calms down in about a second
        this.run(advect, this.velocity.write);
        this.velocity.swap();

        // 2. the cursor pushes the water
        if (this.pending) {
            const p = this.pending;
            if (this.last.has) {
                const dx = p.x - this.last.x;
                const dy = p.y - this.last.y;
                if (dx !== 0 || dy !== 0) {
                    // push the water at about the cursor's own speed (texels per second)
                    const rate = 0.6 / dt;
                    splat.uniforms.uTarget.value = this.velocity.read.texture;
                    splat.uniforms.uPoint.value.set(p.x, p.y);
                    splat.uniforms.uColor.value.set(
                        THREE.MathUtils.clamp(dx * this.width * rate, -300, 300),
                        THREE.MathUtils.clamp(dy * this.height * rate, -300, 300),
                        0,
                    );
                    this.run(splat, this.velocity.write);
                    this.velocity.swap();
                }
            }
            this.last = { x: p.x, y: p.y, has: true };
            this.pending = null;
        }

        // 3. keep the water incompressible: solve for pressure and subtract its gradient
        divergence.uniforms.uVelocity.value = this.velocity.read.texture;
        this.run(divergence, this.divergence);

        scale.uniforms.uSource.value = this.pressure.read.texture; // warm start from last frame
        this.run(scale, this.pressure.write);
        this.pressure.swap();

        pressure.uniforms.uDivergence.value = this.divergence.texture;
        for (let i = 0; i < this.pressureIterations; i++) {
            pressure.uniforms.uPressure.value = this.pressure.read.texture;
            this.run(pressure, this.pressure.write);
            this.pressure.swap();
        }

        gradient.uniforms.uPressure.value = this.pressure.read.texture;
        gradient.uniforms.uVelocity.value = this.velocity.read.texture;
        this.run(gradient, this.velocity.write);
        this.velocity.swap();

        // 4. update the displacement the particles read
        displace.uniforms.uVelocity.value = this.velocity.read.texture;
        displace.uniforms.uDisp.value = this.disp.read.texture;
        displace.uniforms.uDt.value = dt;
        displace.uniforms.uDecay.value = Math.pow(0.03, dt); // relaxes back in about a second, at any frame rate
        this.run(displace, this.disp.write);
        this.disp.swap();

        gl.setRenderTarget(prevTarget);
        gl.autoClear = prevAuto;
    }

    dispose() {
        [this.velocity.read, this.velocity.write, this.pressure.read, this.pressure.write, this.divergence, this.disp.read, this.disp.write].forEach((t) => t.dispose());
        Object.values(this.mats).forEach((m) => m.dispose());
        this.quad.geometry.dispose();
    }
}

/** Watches frame times and says when the fluid is costing too much, so it can be switched off. */
export class FluidGuard {
    private frames = 0;
    private sum = 0;
    private slowWindows = 0;
    private warmup = 120; // ignore the first frames while shaders compile and textures upload

    /** Returns true once the page has been slow for two checks in a row. */
    tick(dtMs: number): boolean {
        if (this.warmup > 0) { this.warmup--; return false; }
        this.frames++;
        this.sum += dtMs;
        if (this.frames < 90) return false;
        const avg = this.sum / this.frames;
        this.frames = 0;
        this.sum = 0;
        this.slowWindows = avg > 28 ? this.slowWindows + 1 : 0;
        return this.slowWindows >= 2;
    }
}
