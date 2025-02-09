"use client"

import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export const BackgroundHero = (props: any) => {
    const { theme } = useTheme()
    useGLTF.preload('/3d/lost_orb_in_the_mountains-transformed.glb')
    const { nodes }: { nodes: any } = useGLTF('/3d/lost_orb_in_the_mountains-transformed.glb')

    // Create a custom shader material
    const gradientMaterial1 = new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `varying vec3 vPosition;
        void main() {
            float gradient = smoothstep(-0.3, -0.6, vPosition.y);
            vec3 color = mix(vec3(${theme === 'light' ? ' 0.9490196078431372, 0.9568627450980393, 0.9568627450980393 ' : '0.0, 0.0, 0.0'}), vec3(${theme === 'light' ? '0.85, 0.85, 0.85' : '0.1, 0.1, 0.1'}), gradient);
            gl_FragColor = vec4(color, 1.0);
        }`,
    });

    const gradientMaterial2 = new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `varying vec3 vPosition;
        void main() {
            float gradient = smoothstep(0.1, -0.5, vPosition.y);
            vec3 color = mix(vec3(${theme === 'light' ? '0.95, 0.95, 0.95' : '0.0, 0.0, 0.0'}), vec3(${theme === 'light' ? '0.85, 0.85, 0.85' : '0.1, 0.1, 0.1'}), gradient);
            gl_FragColor = vec4(color, 1.0);
        }`,
    });


    const gradientMaterial3 = new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `varying vec3 vPosition;
        void main() {
            float gradient = smoothstep(0.2,-0.2, vPosition.y);
            vec3 color = mix(vec3(${theme === 'light' ? '0.95, 0.95, 0.95' : '0.0, 0.0, 0.0'}), vec3(${theme === 'light' ? '0.85, 0.85, 0.85' : '0.1, 0.1, 0.1'}), gradient);
            gl_FragColor = vec4(color, 1.0);
        }`,
    });

    return (
        <group {...props} dispose={null} >
            <mesh
                geometry={nodes.mountain.geometry}
                material={gradientMaterial1}
                position={[10, -13, -8]}
                rotation={[Math.PI, 0, 0]}
                scale={[35, 28, 3.834]}
            />
            <mesh
                geometry={nodes.mountain.geometry}
                material={gradientMaterial2}
                position={[15, -13, -20]}
                rotation={[Math.PI, 0, 0]}
                scale={[60, 35.478, 5.834]}
            />
            <mesh
                geometry={nodes.mountain.geometry}
                material={gradientMaterial3}
                position={[-50, -10, -31]}
                rotation={[Math.PI, 0, 0]}
                scale={[60, 25.478, 10.834]}
            />
            <mesh
                geometry={nodes.mountain.geometry}
                material={gradientMaterial3}
                position={[20, -10, -30]}
                rotation={[Math.PI, 0, 0]}
                scale={[60, 40.478, 8.834]}
            />
        </group>
    )
}
