"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3 } from '@/lib/tunnel'
import * as THREE from 'three'

export default function Scene({ ...props }) {
    return (
        <Canvas {...props}
            onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
        >
            <r3.Out />
            <Preload all />
        </Canvas>
    )
}