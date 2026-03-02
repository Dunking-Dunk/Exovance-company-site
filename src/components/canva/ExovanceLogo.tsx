"use client"
import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Float, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Animated aurora/video-texture shader — full spectrum color cycling through the mesh
const logoVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vViewDir;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
`

const logoFragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vViewDir;

    // HSV to RGB
    vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
        vec2 uv = vUv;

        // Fresnel — strong at glancing angles (glass silhouette edge)
        float NdotV = max(0.0, dot(normalize(vNormal), normalize(vViewDir)));
        float fresnel = pow(1.0 - NdotV, 3.0);

        // Gentle UV warp for undulating surface
        float warpX = sin(uv.y * 2.5 + uTime * 0.35) * 0.03
                    + sin(uv.y * 5.0 - uTime * 0.2) * 0.015;
        float warpY = cos(uv.x * 2.0 + uTime * 0.28) * 0.025
                    + cos(uv.x * 4.5 - uTime * 0.18) * 0.01;
        vec2 wv = uv + vec2(warpX, warpY);

        // PEARL WHITE BASE — very low saturation, near-white
        // A slow-drifting hue gives the iridescent colour shift without full rainbow
        float hue = fract(wv.x * 0.4 + wv.y * 0.25 + uTime * 0.025);
        // Very desaturated — mostly white with a hint of colour
        float sat = 0.18 + 0.12 * sin(uTime * 0.5 + uv.x * 2.0);
        float val = 0.90 + 0.08 * sin(uTime * 0.7 + uv.y * 3.0);
        vec3 pearlBase = hsv2rgb(vec3(hue, sat, val));

        // IRIDESCENT RIM — richer colour at edges; purple/teal/blue shift
        float rimHue = fract(hue + 0.35 + uTime * 0.018);
        vec3 rimColor = hsv2rgb(vec3(rimHue, 0.55, 1.0));

        // Mix pearl interior with coloured rim by fresnel
        vec3 finalColor = mix(pearlBase, rimColor, fresnel * 0.75);

        // Subtle inner glow — brightens the core slightly
        float breathe = 0.5 + 0.5 * sin(uTime * 0.8);
        finalColor += pearlBase * (0.08 + 0.06 * breathe);

        // Alpha:
        //   core = mostly transparent (see-through like glass)
        //   rim  = opaque bright edge (glass silhouette)
        float alpha = mix(0.12, 0.82, fresnel);
        // Boost slightly on brighter surface facets
        alpha += (val - 0.9) * 0.3;
        alpha = clamp(alpha, 0.08, 0.85);

        gl_FragColor = vec4(finalColor, alpha);
    }
`

export const ExovanceLogo = (props: any) => {
    const { nodes }: any = useGLTF('/3d/exovance-3d.glb')
    const matRef = useRef<THREE.ShaderMaterial>(null!)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return (
        <>
            {/* White key light — gives the pearl highlight */}
            <pointLight position={[4, 3, 6]} intensity={22} color="#ffffff" />
            {/* Teal-cyan fill — iridescent edge shimmer */}
            <pointLight position={[-4, -2, 4]} intensity={12} color="#44ddcc" />
            {/* Purple side — colour-shift the shadows */}
            <pointLight position={[3, -3, 3]} intensity={10} color="#9933ff" />
            {/* Soft warm rim for depth */}
            <pointLight position={[-2, 4, 2]} intensity={8} color="#aaccff" />
            <ambientLight intensity={0.35} color="#111122" />

            <Float speed={0.7} rotationIntensity={0.4} floatIntensity={1.0} floatingRange={[-0.1, 0.1]}>
                <group {...props} dispose={null} rotation={[-Math.PI / 2, Math.PI, Math.PI]} position={[0, 0.7, 0.5]}>
                    <mesh geometry={nodes.Curve003.geometry} position={[0, 0, 0.1]} scale={5}>
                        <shaderMaterial
                            ref={matRef}
                            vertexShader={logoVertexShader}
                            fragmentShader={logoFragmentShader}
                            uniforms={uniforms}
                            transparent={true}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                            blending={THREE.NormalBlending}
                        />
                    </mesh>
                </group>
            </Float>
        </>
    )
}
