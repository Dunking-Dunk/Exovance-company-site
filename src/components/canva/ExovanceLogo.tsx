"use client"
import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { Float, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

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
// Active Theory glass: dark transparent body with animated iridescent colour washes.
// The mesh is flat/2-D so NdotV is useless for hue — instead we drive colour purely
// from UV-space animated waves, exactly what Active Theory does.
const logoFragmentShader = `
    uniform float uTime;
    uniform sampler2D uVideoTexture;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec4 vClipPos;

    void main() {
        float t = uTime;

        // Screen-space UV — full video mapped across the logo
        vec2 ndc = vClipPos.xy / vClipPos.w;
        vec2 screenUV = ndc * 0.5 + 0.5;

        // Back-face normal correction
        vec3 facingNormal = gl_FrontFacing ? normalize(vNormal) : -normalize(vNormal);
        float NdotV = max(0.0, dot(facingNormal, normalize(vViewDir)));

        // ── Fresnel — glass is bright/reflective at edges, transparent at face-on ──
        float fresnel = pow(1.0 - NdotV, 2.8);

        // ── Refraction warp — more distortion at grazing edges (like real glass) ──
        float refrStrength = 0.018 + fresnel * 0.022;
        vec2 wuv = screenUV;
        wuv.x += sin(screenUV.y * 7.0 + t * 0.40) * refrStrength
               + sin(screenUV.y * 18.0 - t * 0.9) * refrStrength * 0.4;
        wuv.y += cos(screenUV.x * 5.0 + t * 0.30) * refrStrength
               + cos(screenUV.x * 14.0 + t * 0.55) * refrStrength * 0.4;

        // ── Video refracted through glass ────────────────────────────────────────
        vec3 videoColor = texture2D(uVideoTexture, wuv).rgb;

        // ── Dark glass body — near-black with a cool blue-grey tint ─────────────
        vec3 glassBody = vec3(0.04, 0.05, 0.09);

        // ── Chrome rim — silver-blue at Fresnel edges ────────────────────────────
        vec3 rimColor  = vec3(0.50, 0.62, 0.80);

        // ── Specular hotspot — animated reflection on the glass face ─────────────
        float spec = pow(NdotV, 14.0) * 0.25;
        vec3 specColor = vec3(0.65, 0.72, 0.88) * spec;

        // ── Composite ─────────────────────────────────────────────────────────────
        // Base: video clearly visible through the glass (increased mix)
        vec3 finalColor = mix(glassBody, videoColor * 0.75, 0.55);
        // Dark smoked-glass tint — cool near-black shade like tinted car glass
        finalColor *= vec3(0.50, 0.52, 0.60);
        // Add Fresnel rim glow at edges
        finalColor += rimColor * fresnel * 0.55;
        // Add specular highlight on front face
        finalColor += specColor;

        // ── Alpha — higher base so dark glass body/shade is present ──────────────
        float alpha = 0.55 + 0.38 * fresnel;
        alpha = clamp(alpha, 0.45, 0.93);

        // Discard fully transparent fragments so they don't write depth
        // (prevents the empty letterform cutouts from blocking particles behind)
        if (alpha < 0.12) discard;

        gl_FragColor = vec4(finalColor, alpha);
    }
`

export const ExovanceLogo = (props: any) => {
    const { nodes }: any = useGLTF('/3d/exovance-3d.glb')
    const matRef = useRef<THREE.ShaderMaterial>(null!)
    const groupRef = useRef<THREE.Group>(null!)
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null)
    // Normalized mouse target (-1 to 1) and smoothed current value
    const mouseTgt = useRef({ x: 0, y: 0 })
    const mouseCur = useRef({ x: 0, y: 0 })

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
            // Idle float
            groupRef.current.position.y = 0.7 + Math.sin(t * 0.45) * 0.15
            groupRef.current.position.x = Math.sin(t * 0.30) * 0.1
            // Mouse tilt — base rotation is [-PI/2, PI, PI], add delta on top
            // mx → tilt left/right (Y axis), my → tilt up/down (X axis)
            const tiltX =  mouseCur.current.y * 0.08   // ~4.5° max up/down
            const tiltY =  mouseCur.current.x * 0.06   // ~3.5° max left/right
            groupRef.current.rotation.x = -Math.PI / 2 + tiltX  // base flat, mouse adds subtle tilt
            groupRef.current.rotation.y =  Math.PI     + tiltY
            groupRef.current.rotation.z =  Math.PI + 0.08  // subtle ~4.5° Z tilt
        }
    })

    return (
        <>
            <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.0} floatingRange={[0, 0]}>
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
            </Float>
        </>
    )
}
