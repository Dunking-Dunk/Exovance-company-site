"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'
import { memo, Suspense } from 'react'

const Scene = memo(({ ...props }) => {
    return (
        <Canvas {...props}
            onCreated={(state) => {
                state.gl.toneMapping = THREE.AgXToneMapping;
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                state.gl.setClearColor(0x06060c, 1);
            }}
            dpr={[0.5, 1]}
            performance={{ min: 1 }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true,
                preserveDrawingBuffer: false,
            }}
            camera={{ position: [0, 0, 7], fov: 62 }}
            frameloop="always"
        >
            <Suspense fallback={null}>
                <r3.Out />
                <Preload all />
            </Suspense>

            {/* Global Bloom for the single continuous scheme */}
            <EffectComposer multisampling={0} frameBufferType={THREE.HalfFloatType}>
                <Bloom
                    intensity={0.25}
                    luminanceThreshold={0.9}
                    luminanceSmoothing={0.3}
                    blendFunction={BlendFunction.ADD}
                    mipmapBlur
                    radius={0.5}
                />
            </EffectComposer>
        </Canvas>
    )
})

Scene.displayName = 'Scene'

export default Scene