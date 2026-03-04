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
        float videoZoom = 3.0; // Change this value to zoom more or less (>1 zooms out)
        screenUV = (screenUV - 0.5) * videoZoom + 0.5;

        // ── Normal / view ─────────────────────────────────────────────────────
        vec3 N    = gl_FrontFacing ? normalize(vNormal) : -normalize(vNormal);
        vec3 V    = normalize(vViewDir);
        float NdotV = max(0.0, dot(N, V));

        // ── Fresnel — crisp metallic falloff ─────────────────────────────────
        float fresnel = pow(1.0 - NdotV, 4.0);

        // ── Refraction warp for video beneath the coating ─────────────────────
        float refrStr = 0.006 + fresnel * 0.010;
        vec2 wuv = screenUV;
        wuv.x += sin(screenUV.y * 6.0 + t * 0.35) * refrStr
               + sin(screenUV.y * 17.0 - t * 0.7) * refrStr * 0.35;
        wuv.y += cos(screenUV.x * 5.0 + t * 0.28) * refrStr
               + cos(screenUV.x * 13.0 + t * 0.5) * refrStr * 0.35;

        // ── Video — subdued underneath the coating ───────────────────────────
        vec3 videoColor = texture2D(uVideoTexture, wuv).rgb;
        float videoLum  = dot(videoColor, vec3(0.299, 0.587, 0.114));
        // Visible hazy glow of the video under the film — not just 18%
        vec3 videoUnder = mix(vec3(videoLum), videoColor, 0.80) * 0.45;

        // ── Video bloom — light bursting through the coating ─────────────────
        // Large radius so light spreads wide; very low threshold so most video bleeds
        float br = 0.032;
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
        // Super-low threshold — all video color bleeds aggressively
        float bMask = smoothstep(0.04, 0.50, bLum);
        vec3  bloomRaw = bAccum * bMask;

        // ── Oil-slick / thin-film coating ─────────────────────────────────────
        float filmThickness = 3.5;
        float phase = NdotV * filmThickness * 6.283
                    + sin(screenUV.x * 2.8 + t * 0.18) * 1.2
                    + cos(screenUV.y * 2.2 + t * 0.14) * 1.0
                    + t * 0.25;

        float filmBrightness = thinFilm(phase);
        vec3 filmColor = vec3(filmBrightness);

        // ── Bloom ↔ coating interaction ───────────────────────────────────────
        // Bright video light pushes hard through the film, illuminating it
        float bloomMod = 1.0 + bMask * 3.20;  // coating brightens up to 4.2× at hotspots
        filmColor *= bloomMod;

        // Coating intensity
        float coatFace  = 0.30;
        float coatEdge  = fresnel * 0.45;
        float coatTotal = coatFace + coatEdge;
        vec3  coating   = filmColor * coatTotal;

        // Emissive bloom escaping through the surface — very strong, coloured by video
        vec3 bloomEmit = bloomRaw * 2.00;

        // ── Sharp metallic chrome rim — double layer for depth ────────────────
        float rim      = pow(1.0 - NdotV, 6.0);
        float rimSharp = pow(1.0 - NdotV, 20.0);
        vec3 rimColor  = vec3(0.88, 0.90, 1.00) * rim * 1.20
                       + vec3(1.00, 1.00, 1.00) * rimSharp * 0.90;

        // ── Specular hotspot — hard reflection on the coating ─────────────────
        vec3 L  = normalize(vec3(0.4, 1.0, 0.6));
        vec3 H  = normalize(L + V);
        float spec  = pow(max(0.0, dot(N, H)), 90.0) * 0.60;
        vec3 L2 = normalize(vec3(sin(t * 0.3) * 0.5, 0.8, cos(t * 0.2) * 0.5));
        vec3 H2 = normalize(L2 + V);
        float spec2 = pow(max(0.0, dot(N, H2)), 28.0) * 0.20;
        vec3 specColor = vec3(0.90, 0.92, 1.00) * (spec + spec2);

        // ── Dark glass base ───────────────────────────────────────────────────
        vec3 glassBase = vec3(0.012, 0.013, 0.020);

        // ── Composite ─────────────────────────────────────────────────────────
        vec3 finalColor = glassBase;
        finalColor += videoUnder;      // hazy video glow under the coating
        finalColor += coating;         // film (locally brightened by bloom)
        finalColor += bloomEmit;       // emissive light escaping through the coating
        finalColor += rimColor;        // deep chrome border
        finalColor += specColor;       // hard specular on coating

        // ── Alpha: face semi-transparent (coating shows), rim fully opaque ────
        float alpha = 0.35 + 0.60 * fresnel;  // face ~0.35, rim ~0.95
        alpha = clamp(alpha, 0.30, 0.97);

        if (alpha < 0.10) discard;

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
            const scrollSpin = maxScrollY > 0 ? (compensatedScroll / maxScrollY) * (140 * Math.PI / 180) : 0

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
