"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'

export default function Scene({ ...props }) {
    return (
        <Canvas {...props}
            onCreated={(state) => {
                state.gl.toneMapping = THREE.AgXToneMapping;
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
        >
            <r3.Out />
            <Preload all />
        </Canvas>
    )
}