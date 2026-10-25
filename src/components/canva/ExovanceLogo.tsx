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

// ─── FRAGMENT ────────────────────────────────────────────────────
// Rough glass: the video plays underneath, refracted through a slightly rough surface (hammered
// micro-normals), with light diffraction: colour fringes, a rainbow sheen along the bevels and
// sparkling glints.
const logoFragmentShader = `
    uniform float uTime;
    uniform sampler2D uVideoTexture;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec4 vClipPos;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // Small disc blur with golden-angle taps, used for a light frost on the face
    vec3 discBlur(vec2 uv, float radius) {
        vec3 acc = vec3(0.0);
        for (int i = 0; i < 10; i++) {
            float fi = float(i);
            float r = sqrt((fi + 0.5) / 10.0);
            float a = fi * 2.39996;
            acc += texture2D(uVideoTexture, uv + vec2(cos(a), sin(a)) * r * radius).rgb;
        }
        return acc / 10.0;
    }

    float vnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
        float t = uTime;

        vec2 ndc      = vClipPos.xy / vClipPos.w;
        vec2 screenUV = ndc * 0.5 + 0.5;

        vec3 N = gl_FrontFacing ? normalize(vNormal) : -normalize(vNormal);
        vec3 V = normalize(vViewDir);

        // Roughness: broad hammered ripples plus fine grit tilt the surface normal
        vec2 fc = gl_FragCoord.xy;
        vec2 ripple = vec2(vnoise(fc * 0.045), vnoise(fc * 0.045 + 17.0)) - 0.5;
        vec2 grit = vec2(hash(fc), hash(fc.yx + 5.0)) - 0.5;
        N = normalize(N + vec3(ripple * 0.32 + grit * 0.14, 0.0));

        float NdotV   = max(0.0, dot(N, V));
        float fresnel = pow(1.0 - NdotV, 3.0);

        // Refraction: the video bends more toward the edges, like a thick pane
        vec2 bend = N.xy * (0.045 + fresnel * 0.07);
        vec2 uv = screenUV + bend;
        uv += 0.006 * vec2(sin(t * 0.25 + screenUV.y * 3.0), cos(t * 0.20 + screenUV.x * 3.0));

        // Chromatic aberration: each colour channel bends a touch differently
        float ca = 0.008 + fresnel * 0.022; // diffraction: the colours split apart
        vec3 clear = vec3(
            texture2D(uVideoTexture, uv + N.xy * ca).r,
            texture2D(uVideoTexture, uv).g,
            texture2D(uVideoTexture, uv - N.xy * ca).b
        );

        // Light frost on the face only: a little blur blended under the clear video
        vec3 soft = discBlur(uv, 0.034);
        vec3 vid = mix(clear, soft, 0.58);

        float lum = dot(vid, vec3(0.299, 0.587, 0.114));
        vid = mix(vec3(lum), vid, 1.15) * 0.95;
        // pull the video toward the site's violet so the glass sits with the particles and glow
        vid *= vec3(0.92, 0.80, 1.08);

        // Faint cool tint of the glass body
        vec3 col = vid * 0.9 + vec3(0.05, 0.06, 0.10);

        // Diffraction sheen: a rainbow that slides across the bevels and rough patches
        float phase = NdotV * 5.0 + ripple.x * 3.0 + screenUV.x * 2.0 + t * 0.12;
        // a narrow band of hues (violet, blue, pink) so the diffraction matches the palette
        vec3 spectrum = 0.5 + 0.5 * cos(6.2832 * (vec3(0.62, 0.72, 0.84) + phase * 0.35));
        col += spectrum * (fresnel * 0.32 + 0.03 + pow(abs(ripple.x * 2.0), 2.0) * 0.10);

        // Bright parts of the video glow softly through the glass
        col += vid * vid * 0.25;

        // Specular glints: a sharp one and a broad soft one that drifts slowly
        vec3 L  = normalize(vec3(-0.4, 0.9, 0.7));
        vec3 H  = normalize(L + V);
        float spec = pow(max(0.0, dot(N, H)), 60.0) * 0.9;
        vec3 L2 = normalize(vec3(0.6 + sin(t * 0.3) * 0.3, 0.5, 0.8));
        float spec2 = pow(max(0.0, dot(N, normalize(L2 + V))), 14.0) * 0.18;
        col += vec3(0.95, 0.97, 1.0) * (spec + spec2);

        // Edge: thin bright bevel line with a darker inner shade, like cut glass
        float rim = pow(1.0 - NdotV, 6.0);
        float inner = smoothstep(0.55, 0.15, NdotV);
        col *= 1.0 - inner * 0.30;
        col += vec3(0.80, 0.85, 1.0) * rim * 0.85;

        // Barely-there grain keeps the surface from looking flat
        col += (hash(gl_FragCoord.xy + fract(t) * 91.0) - 0.5) * 0.015;

        // Mostly see-through on the face, denser toward the bevel
        float alpha = clamp(0.50 + 0.40 * fresnel + inner * 0.18 + spec * 0.4, 0.0, 0.96);
        gl_FragColor = vec4(col, alpha);
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
