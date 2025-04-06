"use client"

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export function Vertebral({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/hczs9mLzPJBKtpzJ/scene.splinecode')
  return (
    <>
      <color attach="background" args={['#74757a']} />
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <mesh
            name="Rectangle 3"
            geometry={nodes['Rectangle 3'].geometry}
            material={materials['Rectangle 3 Material']}
            castShadow
            receiveShadow
            position={[-0.49, -38.35, -24.56]}
            rotation={[-Math.PI, 0.52, -Math.PI]}
            scale={[1, 1, 46.8]}
          />
          <mesh
            name="Rectangle 2"
            geometry={nodes['Rectangle 2'].geometry}
            material={materials['Rectangle 2 Material']}
            castShadow
            receiveShadow
            position={[8.7, -10.35, 4.34]}
            rotation={[0, 1.1, 0]}
            scale={[1, 1, 46.8]}
          />
          <mesh
            name="Rectangle"
            geometry={nodes.Rectangle.geometry}
            material={materials['Rectangle Material']}
            castShadow
            receiveShadow
            position={[-28.99, 20.05, 16.41]}
            scale={[1, 1, 46.8]}
          />
          <group name="vertebral" position={[-17, 28, 0]} scale={19}>
            <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.08}>
              <group name="TL_vertebralcolumnobjcleanermaterialmergergles">
                <mesh
                  name="Object_2"
                  geometry={nodes.Object_2.geometry}
                  material={nodes.Object_2.material}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="Object_3"
                  geometry={nodes.Object_3.geometry}
                  material={nodes.Object_3.material}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={nodes.Object_4.material}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="Object_5"
                  geometry={nodes.Object_5.geometry}
                  material={nodes.Object_5.material}
                  castShadow
                  receiveShadow
                />
              </group>
            </group>
          </group>
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[162, 109, 300]}
          />
          <OrthographicCamera name="1" makeDefault={true} far={10000} near={-50000} />
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
        </scene>
      </group>
    </>
  )
}
