"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'
import { memo } from 'react'

const Scene = memo(({ ...props }) => {
    return (
        <Canvas {...props}
            onCreated={(state) => {
                state.gl.toneMapping = THREE.AgXToneMapping;
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 0.8));
            }}
            dpr={[0.5, 1]}
            performance={{ min: 1 }}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
            }}
            camera={{ position: [0, 0, 5], fov: 75 }}
        >
            <r3.Out />
            <Preload all />
        </Canvas>
    )
})

Scene.displayName = 'Scene'

export default Scene