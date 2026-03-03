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

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
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

    vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    float hash21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float n2(vec2 p){
        vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),
                   mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);
    }

    void main() {
        float t  = uTime;
        vec2  uv = vUv;

        // Fresnel for edge brightening (works even on flat mesh for silhouette)
        float NdotV  = max(0.0, dot(normalize(vNormal), normalize(vViewDir)));
        float fresnel = pow(1.0 - NdotV, 3.5);

        // ── Animated UV warp — creates the flowing glass distortion ──────────
        vec2 wuv = uv;
        wuv.x += sin(uv.y * 5.0 + t * 0.55) * 0.06 + sin(uv.y * 11.0 - t * 0.9) * 0.02;
        wuv.y += cos(uv.x * 4.0 + t * 0.40) * 0.05 + cos(uv.x *  8.0 + t * 0.7) * 0.02;

        // ── Surface noise ────────────────────────────────────────────────────
        float noise = n2(wuv * 3.0 + t * 0.18) * 0.55
                    + n2(wuv * 7.0 - t * 0.25) * 0.30
                    + n2(wuv *14.0 + t * 0.40) * 0.15;

        // ── Iridescent colour — hue driven purely by animated UV ─────────────
        // Slow wide sweep across the full spectrum (teal→violet→rose→back)
        float bandHue = fract(wuv.x * 0.9 + wuv.y * 0.6 + noise * 0.25 + t * 0.06);
        // High saturation, low-medium value so glass reads DARK not bright
        float sat = 0.75 + 0.25 * noise;
        float val = 0.18 + 0.22 * noise;          // dark glass body
        vec3 glassColor = hsv2rgb(vec3(bandHue, sat, val));

        // ── Bright thin colour streaks — the signature Active Theory light lines
        float s1 = pow(max(0.0, sin(wuv.y * 28.0 - t * 2.2 + bandHue * 8.0)), 9.0);
        float s2 = pow(max(0.0, sin(wuv.x * 20.0 + t * 1.6 - bandHue * 5.0)), 8.0) * 0.6;
        float s3 = pow(max(0.0, sin((wuv.x + wuv.y) * 18.0 - t * 1.9)), 10.0) * 0.4;
        float streakMask = s1 + s2 + s3;
        vec3  streakHue  = hsv2rgb(vec3(fract(bandHue + 0.12), 0.60, 1.8));
        // Streaks add bright saturated light on top of the dark glass
        vec3 iridColor = glassColor + streakHue * streakMask * 0.9;

        // ── Fresnel rim (edge glow) ───────────────────────────────────────────
        vec3 rimCol  = vec3(0.75, 0.70, 1.0) * fresnel * (0.8 + 0.2 * sin(t*0.8)) * 1.6;
        vec3 finalColor = iridColor + rimCol;

        // ── Minimal video glow inside the glass ──────────────────────────────
        // Sample the video texture at the warped UV so it distorts with glass.
        // Only luminous parts of the video bleed through; darks stay invisible.
        // Max contribution ~9% — reads as a faint inner light wash.
        vec3 videoSample = texture2D(uVideoTexture, wuv).rgb;
        float videoLum = dot(videoSample, vec3(0.299, 0.587, 0.114));
        float videoMask = smoothstep(0.15, 0.75, videoLum);
        float videoIntensity = 0.09 * (1.0 - fresnel * 0.6) * videoMask;
        finalColor += videoSample * videoIntensity;

        // ── Alpha — dark glass: interior ~12%, streaks punch through, rim visible
        float alpha = 0.12 + 0.40 * fresnel + 0.35 * streakMask + 0.08 * noise;
        alpha = clamp(alpha, 0.06, 0.72);

        gl_FragColor = vec4(finalColor, alpha);
    }
`

export const ExovanceLogo = (props: any) => {
    const { nodes }: any = useGLTF('/3d/exovance-3d.glb')
    const matRef = useRef<THREE.ShaderMaterial>(null!)
    const groupRef = useRef<THREE.Group>(null!)
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uVideoTexture: { value: new THREE.Texture() },
    }), [])

    // Create video element and wire up THREE.VideoTexture
    useEffect(() => {
        const video = document.createElement('video')
        video.src = '/video/colorvideo.mp4'
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
        if (groupRef.current) {
            // Very subtle drift: ±0.06 up/down, ±0.04 left, independent slow frequencies
            groupRef.current.position.y = 0.7 + Math.sin(t * 0.45) * 0.15
            groupRef.current.position.x = Math.sin(t * 0.30) * 0.1
        }
    })

    return (
        <>
            <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.0} floatingRange={[0, 0]}>
                <group ref={groupRef} {...props} dispose={null} rotation={[-Math.PI / 2, Math.PI, Math.PI]} position={[0, 0.7, 0.5]}>
                    <mesh geometry={nodes.Curve003.geometry} position={[0, 0, 0.1]} scale={8}>
                        <shaderMaterial
                            ref={matRef}
                            vertexShader={logoVertexShader}
                            fragmentShader={logoFragmentShader}
                            uniforms={uniforms}
                            transparent={true}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                </group>
            </Float>
        </>
    )
}
