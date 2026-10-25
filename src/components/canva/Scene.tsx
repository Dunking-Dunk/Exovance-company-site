"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'
import { memo, Suspense } from 'react'

// When the glow effect is switched off, draw the scene ourselves. Relying on the default render
// left the last home-page frame frozen on screen after leaving the home page.
const PlainRender = () => {
    // The effect composer switches off the renderer's auto clear, so clear explicitly
    useFrame(({ gl, scene, camera }) => {
        gl.setRenderTarget(null)
        gl.clear()
        gl.render(scene, camera)
    }, 1)
    return null
}

// bloom is only worth its cost on the home page, where the particles glow
const Scene = memo(({ bloom = false, ...props }: any) => {
    return (
        <Canvas {...props}
            onCreated={(state) => {
                state.gl.toneMapping = THREE.AgXToneMapping;
                state.gl.setClearColor(0x06060c, 1);
            }}
            dpr={[1, 1.5]}
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
            {!bloom && <PlainRender />}
            <EffectComposer enabled={bloom} multisampling={0} frameBufferType={THREE.HalfFloatType}>
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