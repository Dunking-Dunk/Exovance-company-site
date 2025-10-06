import React from 'react'
import * as THREE from 'three'
import { Float, useGLTF } from '@react-three/drei'


export const ExovanceLogo = (props: any) => {
    const { nodes }: any = useGLTF('/3d/exovance-3d.glb')

    return (
        <>
            <Float speed={1} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
                <group {...props} dispose={null} rotation={[-Math.PI / 2, Math.PI, Math.PI]} position={[0, 0.7, 0.5]}>
                    <mesh geometry={nodes.Curve003.geometry} position={[0, 0, 0.1]} scale={5} >
                        <meshBasicMaterial color={'#ffffff'} />
                    </mesh>

                </group>
            </Float >
        </>
    )
}
