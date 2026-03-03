'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Three } from '@/lib/components/Three'


export const Common = ({ color }: { color?: string }) => (
    <Suspense fallback={null}>
        {color && <color attach='background' args={[color]} />}
        <ambientLight />
        <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
        <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
        {/* We rely on the global camera in Scene.tsx now, so no local camera is strictly needed, 
            but if a component relies on it internally, we'll keep it commented or disabled. */}
    </Suspense>
)

/**
 * Maps a DOM element's position on screen into 3D world coordinates.
 * This effectively achieves what <View> does (syncing DOM to 3D) 
 * but without multiple webgl renders or scissor cutouts, meaning 
 * PostProcessing / EffectComposer works globally and flawlessly!
 */
function DOMSyncGroup({ track, children, orbit }: any) {
    const groupRef = useRef<THREE.Group>(null)
    const { camera, size } = useThree()

    useFrame(() => {
        if (!track.current || !groupRef.current) return
        
        const rect = track.current.getBoundingClientRect()
        
        // For PerspectiveCamera, we calculate the visible width & height at the object's z position (z=0)
        if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
            const cam = camera as THREE.PerspectiveCamera
            const distance = cam.position.z 
            const vFov = (cam.fov * Math.PI) / 180
            const heightAtZ = 2 * Math.tan(vFov / 2) * distance
            const widthAtZ = heightAtZ * cam.aspect

            // Get standard window dimensions
            const screenW = window.innerWidth
            const screenH = window.innerHeight

            // Get element center in pixel coordinates
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2

            // Convert px coordinates to Normalized Device Coordinates (-1 to +1)
            const ndcX = (cx / screenW) * 2 - 1
            const ndcY = -(cy / screenH) * 2 + 1

            // Scale NDC by the world footprint size to get correct 3D positional shift
            groupRef.current.position.x = ndcX * (widthAtZ / 2)
            groupRef.current.position.y = ndcY * (heightAtZ / 2)
        }
    })

    return (
        <group ref={groupRef}>
            {children}
            {orbit && <OrbitControls />}
        </group>
    )
}

const View = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    orbit?: boolean;
}>(({ children, orbit, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => localRef.current!)

    return (
        <>
            <div ref={localRef} {...props} />
            <Three>
                <DOMSyncGroup track={localRef} orbit={orbit}>
                    {children}
                </DOMSyncGroup>
            </Three>
        </>
    )
})
View.displayName = 'View'

export { View }