"use client"
import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

// ─── VERTEX ──────────────────────────────────────────────────────────────────
const logoVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec4 vClipPos;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
        vClipPos = gl_Position;
    }
`

// ─── FRAGMENT ─────────────────────────────────────────────────────────────────
const logoFragmentShader = `
    uniform float uTime;
    uniform sampler2D uVideoTexture;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec4 vClipPos;

    // Cheap hue-shift helper for thin-film iridescence
    vec3 hueShift(vec3 col, float shift) {
        const vec3 k = vec3(0.57735);
        float c = cos(shift);
        return col * c + cross(k, col) * sin(shift) + k * dot(k, col) * (1.0 - c);
    }

    // Thin-film coating — achromatic (no color), just varying brightness
    // produces a clear glass-like sheen without hue
    float thinFilm(float phase) {
        return 0.5 + 0.5 * cos(phase);
    }

    void main() {
        float t = uTime;

        // ── Screen-space UV for video ─────────────────────────────────────────
        vec2 ndc      = vClipPos.xy / vClipPos.w;
        vec2 screenUV = ndc * 0.5 + 0.5;

        // Zoom out the video by scaling from the center
        float videoZoom = 1.5;
        screenUV = (screenUV - 0.5) * videoZoom + 0.5;

        // ── Normal / view ─────────────────────────────────────────────────────
        vec3 N    = gl_FrontFacing ? normalize(vNormal) : -normalize(vNormal);
        vec3 V    = normalize(vViewDir);
        float NdotV = max(0.0, dot(N, V));

        // ── Fresnel — glass-like exponential falloff ─────────────────────────
        float fresnel = pow(1.0 - NdotV, 3.5);

        // ── Edge darkness mask — dark blurred border for depth ────────────────
        // NdotV is ~1 at face center, ~0 at silhouette edges.
        // edgeDark is 0 at center (clear glass) and 1 at edges (dark border).
        float edgeDark = smoothstep(0.45, 0.0, NdotV);   // starts darkening at 45°
        float edgeHard = pow(1.0 - NdotV, 5.0);          // sharper falloff layer
        float borderMask = mix(edgeDark, edgeHard, 0.5);  // blend soft+hard

        // ── Refraction warp — heavy distortion for blurred-light glass look ───
        float refrStr = 0.022 + fresnel * 0.038;
        vec2 wuv = screenUV;
        // Multi-frequency distortion layers — like light bending through thick glass
        wuv.x += sin(screenUV.y * 4.0 + t * 0.30) * refrStr
               + sin(screenUV.y * 11.0 - t * 0.55) * refrStr * 0.50
               + sin(screenUV.y * 23.0 + t * 0.90) * refrStr * 0.18;
        wuv.y += cos(screenUV.x * 3.5 + t * 0.25) * refrStr
               + cos(screenUV.x * 9.0 + t * 0.45) * refrStr * 0.50
               + cos(screenUV.x * 19.0 - t * 0.75) * refrStr * 0.18;
        // Normal-based chromatic offset — edges refract more than center
        vec2 normalWarp = N.xy * 0.015 * (1.0 + fresnel * 1.5);
        wuv += normalWarp;

        // ── Refracted video with per-channel chromatic aberration ────────────
        // Slightly different UV per channel — light splits through glass
        float chromaSpread = 0.004 + fresnel * 0.008;
        vec2 rUV = wuv + vec2( chromaSpread,  chromaSpread * 0.5);
        vec2 gUV = wuv;
        vec2 bUV = wuv + vec2(-chromaSpread, -chromaSpread * 0.5);
        vec3 videoColor = vec3(
            texture2D(uVideoTexture, rUV).r,
            texture2D(uVideoTexture, gUV).g,
            texture2D(uVideoTexture, bUV).b
        );

        // ── Gaussian-ish blur over the entire video for soft refracted look ──
        // Two-ring 16-tap blur — the light itself looks diffused through glass
        float glassBlur = 0.012 + borderMask * 0.035;
        vec3 blurSum = videoColor;  // center sample (weight 1)
        float totalW = 1.0;
        // Inner ring (8 taps, radius = glassBlur)
        float r1 = glassBlur;
        blurSum += texture2D(uVideoTexture, wuv + vec2( r1,     0.0  )).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r1,     0.0  )).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2( 0.0,    r1   )).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2( 0.0,   -r1   )).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2( r1*.71,  r1*.71)).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r1*.71,  r1*.71)).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2( r1*.71, -r1*.71)).rgb;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r1*.71, -r1*.71)).rgb;
        totalW += 8.0;
        // Outer ring (8 taps, radius = glassBlur*2.2, lower weight)
        float r2 = glassBlur * 2.2;
        float w2 = 0.5;  // half-weight for outer ring
        blurSum += texture2D(uVideoTexture, wuv + vec2( r2,     0.0  )).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r2,     0.0  )).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2( 0.0,    r2   )).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2( 0.0,   -r2   )).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2( r2*.71,  r2*.71)).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r2*.71,  r2*.71)).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2( r2*.71, -r2*.71)).rgb * w2;
        blurSum += texture2D(uVideoTexture, wuv + vec2(-r2*.71, -r2*.71)).rgb * w2;
        totalW += 8.0 * w2;
        vec3 blurredVideo = blurSum / totalW;

        // Blend sharp refracted video with blur — more blur everywhere for soft light
        float blurMix = 0.55 + borderMask * 0.40;  // center 55% blurred, edges 95%
        videoColor = mix(videoColor, blurredVideo, blurMix);

        float videoLum  = dot(videoColor, vec3(0.299, 0.587, 0.114));
        vec3 videoUnder = mix(vec3(videoLum), videoColor, 0.90) * 0.72;
        videoUnder *= (1.0 - borderMask * 0.85);

        // ── Blurred video at edges — frosted thick border glass ──────────────
        float edgeBlurR = 0.055 * borderMask;
        vec3 blurAccum = vec3(0.0);
        blurAccum += texture2D(uVideoTexture, wuv + vec2( edgeBlurR,    0.0     )).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2(-edgeBlurR,    0.0     )).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2( 0.0,       edgeBlurR  )).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2( 0.0,      -edgeBlurR  )).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2( edgeBlurR*.7,  edgeBlurR*.7)).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2(-edgeBlurR*.7,  edgeBlurR*.7)).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2( edgeBlurR*.7, -edgeBlurR*.7)).rgb;
        blurAccum += texture2D(uVideoTexture, wuv + vec2(-edgeBlurR*.7, -edgeBlurR*.7)).rgb;
        blurAccum /= 8.0;
        vec3 edgeBlurVideo = blurAccum * 0.25 * borderMask;

        // ── Video bloom — light bursting through the glass ───────────────────
        float br = 0.040;
        vec3 bAccum = vec3(0.0);
        bAccum += texture2D(uVideoTexture, wuv + vec2( br,    0.0 )).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2(-br,    0.0 )).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2( 0.0,   br  )).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2( 0.0,  -br  )).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2( br*.7,  br*.7)).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2(-br*.7,  br*.7)).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2( br*.7, -br*.7)).rgb;
        bAccum += texture2D(uVideoTexture, wuv + vec2(-br*.7, -br*.7)).rgb;
        bAccum /= 8.0;
        float bLum  = dot(bAccum, vec3(0.299, 0.587, 0.114));
        float bMask = smoothstep(0.04, 0.50, bLum);
        vec3  bloomRaw = bAccum * bMask;

        // ── Thin-film coating — subtle, glass doesn't overpower video ─────────
        float filmThickness = 3.5;
        float phase = NdotV * filmThickness * 6.283
                    + sin(screenUV.x * 2.8 + t * 0.18) * 1.2
                    + cos(screenUV.y * 2.2 + t * 0.14) * 1.0
                    + t * 0.25;

        float filmBrightness = thinFilm(phase);
        vec3 filmColor = vec3(filmBrightness);

        // Bloom brightens the coating at video hotspots
        float bloomMod = 1.0 + bMask * 2.40;
        filmColor *= bloomMod;

        // Coating: very light on face (see-through), stronger at edges
        float coatFace  = 0.12;
        float coatEdge  = fresnel * 0.35;
        float coatTotal = coatFace + coatEdge;
        vec3  coating   = filmColor * coatTotal;

        // Bloom emission — light escaping through glass
        vec3 bloomEmit = bloomRaw * 1.60;

        // ── Dark border shadow — deep black rim for glass depth ───────────────
        // Multiple falloff curves blended for a wide, soft dark border
        vec3 darkBorder = vec3(0.0);
        float borderSoft  = smoothstep(0.50, 0.0, NdotV) * 0.90;  // wide soft shadow
        float borderMid   = pow(1.0 - NdotV, 4.0) * 0.70;         // medium falloff
        float borderSharp = pow(1.0 - NdotV, 10.0) * 0.50;        // tight inner rim
        float borderTotal = borderSoft + borderMid + borderSharp;
        // This darkens everything proportionally — like a dark glass bevel
        float darkenFactor = 1.0 - clamp(borderTotal, 0.0, 0.92);

        // ── Subtle chrome rim highlight sitting on top of the dark border ─────
        float rim      = pow(1.0 - NdotV, 7.0);
        float rimSharp = pow(1.0 - NdotV, 22.0);
        vec3 rimColor  = vec3(0.75, 0.78, 0.90) * rim * 0.55
                       + vec3(1.00, 1.00, 1.00) * rimSharp * 0.45;

        // ── Specular hotspot — hard reflection on the glass ───────────────────
        vec3 L  = normalize(vec3(0.4, 1.0, 0.6));
        vec3 H  = normalize(L + V);
        float spec  = pow(max(0.0, dot(N, H)), 120.0) * 0.45;
        vec3 L2 = normalize(vec3(sin(t * 0.3) * 0.5, 0.8, cos(t * 0.2) * 0.5));
        vec3 H2 = normalize(L2 + V);
        float spec2 = pow(max(0.0, dot(N, H2)), 40.0) * 0.15;
        vec3 specColor = vec3(0.92, 0.94, 1.00) * (spec + spec2);

        // ── Dark glass base ───────────────────────────────────────────────────
        vec3 glassBase = vec3(0.008, 0.009, 0.016);

        // ── Composite ─────────────────────────────────────────────────────────
        vec3 finalColor = glassBase;
        finalColor += videoUnder;        // clear video through the glass
        finalColor += edgeBlurVideo;     // blurred dark video at borders
        finalColor += coating;           // light thin-film
        finalColor += bloomEmit;         // bloom escaping through glass
        // Apply dark border shadow — multiplies everything darker at edges
        finalColor *= darkenFactor;
        // Rim highlight and specular sit ON TOP of the dark border
        finalColor += rimColor;
        finalColor += specColor;

        // ── Alpha: center is transparent glass, rim is solid dark border ──────
        float alpha = 0.30 + 0.65 * fresnel;   // face ~0.30 (very see-through), rim ~0.95
        // Border darkening also boosts alpha so the dark edge feels solid
        alpha += borderMask * 0.20;
        alpha = clamp(alpha, 0.25, 0.98);

        if (alpha < 0.08) discard;

        gl_FragColor = vec4(finalColor, alpha);
    }
`

export const ExovanceLogo = (props: any) => {
    const { nodes }: any = useGLTF('/3d/exovance-3d.glb')
    const matRef = useRef<THREE.ShaderMaterial>(null!)
    const groupRef = useRef<THREE.Group>(null!)
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null)
    // Normalize mouse target (-1 to 1) and smoothed current value
    const mouseTgt = useRef({ x: 0, y: 0 })
    const mouseCur = useRef({ x: 0, y: 0 })
    
    // We'll track scroll progression here
    const scrollRef = useRef(0)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uVideoTexture: { value: new THREE.Texture() },
    }), [])

    // Track mouse position, normalised -1..1
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseTgt.current.x = (e.clientX / window.innerWidth)  * 2 - 1
            mouseTgt.current.y = (e.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    // Create video element and wire up THREE.VideoTexture
    useEffect(() => {
        const video = document.createElement('video')
        video.src = '/video/color2.mp4'
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.autoplay = true
        video.crossOrigin = 'anonymous'
        // Must trigger play after user gesture or autoplay policy — muted allows auto
        video.play().catch(() => {})

        const texture = new THREE.VideoTexture(video)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.format = THREE.RGBAFormat
        videoTextureRef.current = texture
        uniforms.uVideoTexture.value = texture

        return () => {
            video.pause()
            texture.dispose()
        }
    }, [uniforms])

    const { camera } = useThree()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        if (matRef.current) {
            matRef.current.uniforms.uTime.value = t
        }
        // Keep VideoTexture flagged for update each frame so frames advance
        if (videoTextureRef.current) {
            videoTextureRef.current.needsUpdate = true
        }
        // Smooth lerp mouse toward target (easing factor 0.06 = silky slow)
        const ease = 0.06
        mouseCur.current.x += (mouseTgt.current.x - mouseCur.current.x) * ease
        mouseCur.current.y += (mouseTgt.current.y - mouseCur.current.y) * ease
        if (groupRef.current) {
            // Find max scroll limit
            let maxScrollY = 0
            // Safely look up the About section (wait for mount)
            if (typeof document !== 'undefined') {
                const aboutEl = document.querySelector('[data-section="about"]') as HTMLElement
                if (aboutEl) {
                    // Stop compensating 150px after the about section reaches the bottom of the viewport
                    maxScrollY = Math.max(0, aboutEl.offsetTop + aboutEl.offsetHeight - window.innerHeight + 150)
                }
            }

            const currentScroll = typeof window !== 'undefined' ? Math.max(0, window.scrollY) : 0
            const compensatedScroll = Math.min(currentScroll, maxScrollY)

            // Convert compensatedScroll to 3D Y offset
            let yOffset = 0
            if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
                const cam = camera as THREE.PerspectiveCamera
                const distance = cam.position.z 
                const vFov = (cam.fov * Math.PI) / 180
                const heightAtZ = 2 * Math.tan(vFov / 2) * distance
                const screenH = typeof window !== 'undefined' ? window.innerHeight : 1000
                yOffset = - (compensatedScroll * heightAtZ / screenH)
            }

            // Idle float + compensated scroll
            groupRef.current.position.y = 0.7 + Math.sin(t * 0.45) * 0.15 + yOffset
            groupRef.current.position.x = Math.sin(t * 0.30) * 0.1
            const tiltX =  mouseCur.current.y * 0.08
            const tiltY =  mouseCur.current.x * 0.06
            const tiltZ = -mouseCur.current.x * 0.04

            // Coin spin based on scroll (exactly 140 degrees across the free scroll range)
            const scrollSpin = maxScrollY > 0 ? (compensatedScroll / maxScrollY) * (70 * Math.PI / 180) : 0

            groupRef.current.rotation.x = -Math.PI / 2 + tiltX
            groupRef.current.rotation.y =  Math.PI + tiltY
            groupRef.current.rotation.z =  Math.PI + 0.08 + tiltZ + scrollSpin
        }
    })

    return (
        <>
            <group ref={groupRef} {...props} dispose={null} rotation={[-Math.PI / 2, Math.PI, Math.PI]} position={[0, 0.7, 0.5]}>
                    <mesh geometry={nodes.Curve003.geometry} position={[0, 0, 0.1]} scale={8} renderOrder={2}>
                        <shaderMaterial
                            ref={matRef}
                            vertexShader={logoVertexShader}
                            fragmentShader={logoFragmentShader}
                            uniforms={uniforms}
                            transparent={true}
                            side={THREE.FrontSide}
                            depthWrite={true}
                            blending={THREE.NormalBlending}
                        />
                    </mesh>
            </group>
        </>
    )
}
