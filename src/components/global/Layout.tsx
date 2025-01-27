"use client"

import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import Header from './Header'

const Scene = dynamic(() => import('@/components/canva/Scene'), { ssr: false })

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    return (
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
            id="scroller"
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
        </div>
    )
}

export default Layout