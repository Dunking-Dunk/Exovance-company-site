"use client"

import { Canvas } from "@react-three/fiber"
import { Preload, Loader } from "@react-three/drei"
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'
import { memo, Suspense } from 'react'

const Scene = memo(({ ...props }) => {
    return (
        <Canvas {...props}
            onCreated={(state) => {
                state.gl.toneMapping = THREE.AgXToneMapping;
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                // Match the CSS body background (#06060c) so there is zero flash
                // when the canvas mounts. The canvas is still alpha:true so CSS
                // background shows through, but this prevents the white-frame flicker.
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
        </Canvas>
    )
})

Scene.displayName = 'Scene'

export default Scene