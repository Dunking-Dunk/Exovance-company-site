"use client"

import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'
import Header from './Header'
import AnimatedCursor from './AnimatedCursor'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import LoadingScreen from './loading-screen'
import { debounce } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP);

const
    Scene: any = dynamic(() => import('@/components/canva/Scene'), { ssr: false })

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [sceneReady, setSceneReady] = React.useState(false)

    useEffect(() => {
        // Set initial viewport height
        const setAppHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        };

        window.addEventListener('resize', setAppHeight);
        setAppHeight();

        // ScrollTrigger setup with correct proxy
        ScrollTrigger.scrollerProxy(ref.current, {
            scrollTop(value: any) {
                if (arguments.length) {
                    window.scrollTo(0, value);
                }
                return window.pageYOffset;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
        });

        // Refresh ScrollTrigger on resize
        const debouncedRefresh = debounce(() => {
            ScrollTrigger.refresh();
        }, 200);

        window.addEventListener('resize', debouncedRefresh);

        return () => {
            window.removeEventListener('resize', setAppHeight);
            window.removeEventListener('resize', debouncedRefresh);
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.clearMatchMedia();
        };
    }, []);

    // Handle loading completion
    const handleLoadingComplete = React.useCallback(() => {
        setTimeout(() => {
            setIsLoading(false);
            // Enable interactions after scene is ready
            setTimeout(() => {
                setSceneReady(true);
            }, 500);
        }, 300);
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                wheelMultiplier: 1,
                touchMultiplier: 1,
                smoothWheel: true,
                syncTouch: true
            }}
        >
            <div
                ref={ref}
                style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: 'var(--app-height)',
                    overflow: 'auto',
                    touchAction: 'pan-y',
                    WebkitOverflowScrolling: 'touch',
                    WebkitTextSizeAdjust: '100%',
                }}
                className='bg-customBlack'
            >
                <Header />
                {!isLoading && <AnimatedCursor />}
                {children}

                <Scene
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        pointerEvents: sceneReady ? 'none' : 'none',
                        opacity: isLoading ? 0 : 1,
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                    eventSource={ref}
                    eventPrefix='client'
                />
                {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
            </div>
        </ReactLenis>
    )
}

export default Layout