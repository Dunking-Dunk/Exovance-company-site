"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// One full-screen fragment shader paints the whole background: five soft glows (four greys
// plus one darker accent), a slow drift, a low horizon light and a faint glow that follows
// the cursor. Grain and the vignette are plain CSS layers on top.

// Each orb: [x, y, radius, r, g, b, strength]. x and y are fractions of the viewport (y down).
type Orb = [number, number, number, number, number, number, number]
type Scene = Orb[]

const hex = (h: string): [number, number, number] => [
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255,
]
const orb = (x: number, y: number, r: number, color: string, a: number): Orb => [x, y, r, ...hex(color), a * 0.4]

// Darker accent that keeps the greys from feeling flat
const BLUE = '#6e6e6e'

const SCENES: Record<string, Scene> = {
    hero: [
        orb(0.5, -0.18, 0.55, '#8a8a8a', 0.55), orb(1.05, 0.3, 0.5, '#d4d4d4', 0.4),
        orb(-0.2, 0.8, 0.5, '#5c5c5c', 0.18), orb(0.8, 0.7, 0.4, '#a3a3a3', 0.12),
        orb(0.12, 0.38, 0.4, BLUE, 0.16),
    ],
    about: [
        orb(-0.1, 0.1, 0.55, '#707070', 0.3), orb(1.1, 0.5, 0.5, '#d4d4d4', 0.5),
        orb(0.2, 0.9, 0.5, '#8a8a8a', 0.25), orb(0.6, 0.2, 0.4, '#a3a3a3', 0.1),
        orb(0.9, 0.92, 0.42, BLUE, 0.18),
    ],
    vision: [
        orb(0.5, -0.1, 0.55, '#d4d4d4', 0.45), orb(1.08, 0.2, 0.5, '#a3a3a3', 0.65),
        orb(-0.15, 0.6, 0.5, '#3a3a3a', 0.2), orb(0.75, 0.85, 0.4, '#8a8a8a', 0.15),
        orb(0.08, 0.15, 0.42, BLUE, 0.2),
    ],
    product: [
        orb(0.15, -0.05, 0.55, '#5c5c5c', 0.3), orb(1.12, 0.4, 0.5, '#d4d4d4', 0.55),
        orb(-0.05, 0.75, 0.5, '#707070', 0.35), orb(0.85, 0.15, 0.4, '#a3a3a3', 0.2),
        orb(0.5, 0.98, 0.45, BLUE, 0.18),
    ],
    abstract: [
        orb(0.5, 0.5, 0.55, '#707070', 0.2), orb(1.05, 0.6, 0.5, '#d4d4d4', 0.35),
        orb(-0.1, 0.3, 0.5, '#5c5c5c', 0.28), orb(0.7, -0.05, 0.4, '#8a8a8a', 0.22),
        orb(0.92, 0.2, 0.4, BLUE, 0.16),
    ],
    contact: [
        orb(0.5, 1.1, 0.55, '#8a8a8a', 0.45), orb(1.08, 0.7, 0.5, '#a3a3a3', 0.45),
        orb(-0.15, 0.85, 0.5, '#5c5c5c', 0.3), orb(0.25, 0.4, 0.4, '#d4d4d4', 0.15),
        orb(0.1, 0.12, 0.4, BLUE, 0.14),
    ],
}

const flat = (s: Scene) => s.flat()

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uEnergy;
uniform float uIntensity;
uniform vec3 uPos[5];
uniform vec4 uCol[5];
float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3. - 2. * f);
    return mix(mix(hash21(i), hash21(i + vec2(1., 0.)), f.x),
               mix(hash21(i + vec2(0., 1.)), hash21(i + vec2(1., 1.)), f.x), f.y);
}
void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    uv.y = 1. - uv.y;
    float asp = uRes.x / uRes.y;
    // slow drift so the glow breathes instead of sitting still
    vec2 p = uv + .025 * vec2(sin(uv.y * 3. + uTime * .07), cos(uv.x * 2.6 - uTime * .06));
    vec3 c = vec3(0.);
    for (int i = 0; i < 5; i++) {
        vec2 d = (p - uPos[i].xy) * vec2(asp, 1.);
        float r = uPos[i].z;
        c += uCol[i].rgb * uCol[i].a * exp(-dot(d, d) / (r * r));
    }
    // faint glow that follows the cursor and brightens while it moves
    vec2 dm = (uv - uMouse) * vec2(asp, 1.);
    c += vec3(.55, .42, 1.) * uEnergy * .12 * exp(-dot(dm, dm) / .05);
    // low horizon light
    float h = (uv.y - .97) / .09;
    c += vec3(.4) * exp(-h * h) * .10;
    // mottled texture: slow cloud noise breaks up the smooth gradients
    vec2 np = uv * vec2(asp, 1.) * 3.2 + vec2(uTime * .012, -uTime * .009);
    float cloud = vnoise(np) * .6 + vnoise(np * 2.3 + 7.1) * .3 + vnoise(np * 5.1 + 3.7) * .1;
    c *= .62 + .75 * cloud;
    c = 1. - exp(-c * .8 * uIntensity);
    // fine dither noise so dark gradients never band
    c += (hash21(gl_FragCoord.xy + fract(uTime) * 37.) - .5) * .035;
    c = max(c, 0.);
    // premultiplied alpha: the glow adds light over whatever is behind it (stars, logo, page)
    gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)));
}`

export default function AmbientLighting() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' })
        if (!gl) return

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!
            gl.shaderSource(s, src)
            gl.compileShader(s)
            return s
        }
        const prog = gl.createProgram()!
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
        gl.useProgram(prog)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, 'p')
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

        const u = (n: string) => gl.getUniformLocation(prog, n)
        const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse'), uEnergy = u('uEnergy'), uIntensity = u('uIntensity'), uPos = u('uPos'), uCol = u('uCol')

        // The glow is soft, so it renders at half size and the browser scales it up
        const resize = () => {
            canvas.width = Math.max(2, Math.round(window.innerWidth * 0.5))
            canvas.height = Math.max(2, Math.round(window.innerHeight * 0.5))
            gl.viewport(0, 0, canvas.width, canvas.height)
        }
        resize()
        window.addEventListener('resize', resize)

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const cur = flat(SCENES.hero)
        const tween = { v: 1 }

        const applyScene = (scene: Scene, duration = 1.8) => {
            const from = cur.slice()
            const to = flat(scene)
            tween.v = 0
            gsap.killTweensOf(tween)
            gsap.to(tween, {
                v: 1, duration, ease: 'power2.inOut',
                onUpdate: () => { for (let i = 0; i < cur.length; i++) cur[i] = from[i] + (to[i] - from[i]) * tween.v },
            })
        }

        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, energy: 0 }
        const onMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth, ny = e.clientY / window.innerHeight
            mouse.energy = Math.min(1, mouse.energy + Math.hypot(nx - mouse.tx, ny - mouse.ty) * 6)
            mouse.tx = nx; mouse.ty = ny
        }
        window.addEventListener('mousemove', onMove, { passive: true })

        const triggers: ScrollTrigger[] = []
        const SECTIONS: Array<[string, Scene]> = [
            ['hero', SCENES.hero], ['about', SCENES.about], ['vision', SCENES.vision],
            ['product', SCENES.product], ['abstract', SCENES.abstract], ['contact', SCENES.contact],
        ]
        SECTIONS.forEach(([name, scene]) => {
            const el = document.querySelector(`[data-section="${name}"]`)
            if (!el) return
            triggers.push(ScrollTrigger.create({
                trigger: el, start: 'top 60%', end: 'bottom 40%',
                onEnter: () => applyScene(scene), onEnterBack: () => applyScene(scene),
            }))
        })

        const posArr = new Float32Array(15)
        const colArr = new Float32Array(20)
        let raf = 0, last = 0
        const t0 = performance.now()
        const frame = (now: number) => {
            raf = requestAnimationFrame(frame)
            if (document.hidden || now - last < 33) return // about 30 fps is plenty for a slow glow
            last = now
            for (let i = 0; i < 5; i++) {
                const o = i * 7
                posArr[i * 3] = cur[o]; posArr[i * 3 + 1] = cur[o + 1]; posArr[i * 3 + 2] = cur[o + 2]
                colArr[i * 4] = cur[o + 3]; colArr[i * 4 + 1] = cur[o + 4]; colArr[i * 4 + 2] = cur[o + 5]; colArr[i * 4 + 3] = cur[o + 6]
            }
            mouse.x += (mouse.tx - mouse.x) * 0.08
            mouse.y += (mouse.ty - mouse.y) * 0.08
            mouse.energy *= 0.94
            gl.uniform2f(uRes, canvas.width, canvas.height)
            gl.uniform1f(uTime, reduceMotion ? 0 : (now - t0) / 1000)
            gl.uniform2f(uMouse, mouse.x, mouse.y)
            gl.uniform1f(uEnergy, mouse.energy)
            // calmer on phones, where the glow fills most of the screen
            gl.uniform1f(uIntensity, window.innerWidth < 768 ? 0.5 : 0.72)
            gl.uniform3fv(uPos, posArr)
            gl.uniform4fv(uCol, colArr)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
        raf = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
            triggers.forEach(t => t.kill())
            gsap.killTweensOf(tween)
        }
    }, [])

    return (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
            {/* vignette: darken the corners a little for depth */}
            <div
                style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(2,2,2,0.5) 100%)',
                }}
            />
            {/* fine film grain removes banding in the dark gradients */}
            <div
                style={{
                    position: 'absolute', inset: 0, opacity: 0.09,
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />
        </div>
    )
}
