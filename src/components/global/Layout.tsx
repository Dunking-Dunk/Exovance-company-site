"use client"

import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import Header from './Header'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP);

const Scene = dynamic(() => import('@/components/canva/Scene'), { ssr: false })

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {

    const ref = useRef<HTMLDivElement | null>(null)
    return (
        <ReactLenis root>
            <div
                ref={ref}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    touchAction: 'auto'
                }}
                className='bg-customBlack'

            >
                <Header />
                {children}
                <Scene
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        pointerEvents: 'none',
                    }}
                    eventSource={ref}
                    eventPrefix='client'
                />
            </div >
        </ReactLenis >
    )
}

export default Layout