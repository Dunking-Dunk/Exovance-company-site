import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'
import { Vertebral } from '../canva/Vertebral'
import { InfoCard } from '../canva/InfoCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PerspectiveCamera } from '@react-three/drei'

const View = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
    ssr: false,
    loading: () => (
        <div className='absolute inset-0 z-10 h-full w-full flex items-center justify-center'>
            <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
            </svg>
        </div>
    ),
})

const AnimatedCamera = () => {
    const cameraRef = useRef<any>(null)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.works-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2,
                snap: {
                    snapTo: [0, 0.25, 0.5, 0.75, 1],
                    duration: { min: 0.2, max: 0.3 },
                    ease: "power2.inOut"
                },
                onUpdate: (self) => {
                    if (cameraRef.current) {
                        const progress = self.progress
                        const radius = 8
                        const angle = progress * Math.PI * 1.5
                        const x = Math.cos(angle) * radius
                        const y = -progress * 4
                        const z = Math.sin(angle) * radius

                        cameraRef.current.position.set(x, y, z)
                        cameraRef.current.lookAt(0, 0, 0)
                    }
                }
            }
        })
    }, [])

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={40}
            position={[0, 0, 8]}
        />
    )
}

const AnimatedCard = ({ index }: { index: number }) => {
    const cardRef = useRef<any>(null)

    useEffect(() => {
        if (cardRef.current) {
            // Create a static circular arrangement
            const radius = 6 // Fixed radius for all cards
            const totalCards = 6
            const offsetAngle = (index * 2 * Math.PI) / totalCards // Even distribution

            // Calculate static positions in a circle
            const x = Math.cos(offsetAngle) * radius
            const y = Math.sin(offsetAngle) * radius * 0.5 // Flatten the circle vertically
            const z = Math.sin(offsetAngle) * radius

            // Add slight vertical offset based on index
            const verticalOffset = (index % 2) * 0.5 // Alternate heights

            cardRef.current.position.set(x, y + verticalOffset, -1)
            cardRef.current.lookAt(0, 0, 0)
        }
    }, [index])

    return (
        <InfoCard
            ref={cardRef}
            position={[0, 0, 0]}
            scale={[0.4, 0.2, 0.8]}
        />
    )
}

const Works = () => {
    return (
        <div className='h-[200dvh] relative works-container'>
            <View className='absolute inset-0 -top-[120vh] h-[300dvh] w-full'>
                <AnimatedCamera />
                <Vertebral />
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <AnimatedCard key={index} index={index} />
                ))}
            </View>
        </div>
    )
}

export default Works