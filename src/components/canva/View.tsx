'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/lib/components/Three'
import { Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { EffectComposer } from '@react-three/postprocessing'

export const Common = ({ color }: { color?: string }) => (
    <Suspense fallback={null}>
        {color && <color attach='background' args={[color]} />}
        <ambientLight />
        <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
        <pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
        <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
)

const View = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    orbit?: boolean;
}>(({ children, orbit, ...props }, ref) => {
    const localRef: any = useRef(null)
    useImperativeHandle(ref, () => localRef.current)

    return (
        <>
            <div ref={localRef} {...props} />
            <Three>

                <ViewImpl track={localRef}>
                    {children}
                    {orbit && <OrbitControls />}
                </ViewImpl>

            </Three>
        </>
    )
})
View.displayName = 'View'

export { View }