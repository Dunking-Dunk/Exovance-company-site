import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'
import { ChromeShaderBase } from './ChromeShader'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
  }
  materials: {
    aiStandardSurface2SG: THREE.Material
  }
}

export function Vertebral(props: GroupProps) {
  const { nodes, materials } = useGLTF('/3d/vertebral.glb') as GLTFResult
  const shaderRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.07}>
        <mesh geometry={nodes.Object_2.geometry}>
          <primitive object={new ChromeShaderBase()} ref={shaderRef} />
        </mesh>
        <mesh geometry={nodes.Object_3.geometry}>
          <primitive object={new ChromeShaderBase()} ref={shaderRef} />
        </mesh>
        <mesh geometry={nodes.Object_4.geometry}>
          <primitive object={new ChromeShaderBase()} ref={shaderRef} />
        </mesh>
        <mesh geometry={nodes.Object_5.geometry}>
          <primitive object={new ChromeShaderBase()} ref={shaderRef} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/3d/vertebral.glb')
