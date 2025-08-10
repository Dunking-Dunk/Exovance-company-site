"use client"

import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'
import Header from './Header'
import BlobCursor from './AnimatedCursor'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";

import LoadingScreen from './loading-screen'
import { debounce } from '@/lib/utils'
import { useScrollTheme } from '@/components/provider/scroll-theme-provider'
import Footer from './Footer'



gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP);

const
    Scene: any = dynamic(() => import('@/components/canva/Scene'), { ssr: false })


const TransparentPlane: any = dynamic(() => import("@/components/canva/TransparentPlane").then((mod: any) => mod.TransparentPlane), {
    ssr: false
})

const View: any = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
    ssr: false
})

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [sceneReady, setSceneReady] = React.useState(false)
    const { theme } = useScrollTheme();

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)

        const setAppHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        };

        window.addEventListener('resize', setAppHeight);
        setAppHeight();


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

        const debouncedRefresh = debounce(() => {
            ScrollTrigger.refresh();
        }, 200);

        window.addEventListener('resize', debouncedRefresh);

        return () => {
            gsap.ticker.remove(update)
            window.removeEventListener('resize', setAppHeight);
            window.removeEventListener('resize', debouncedRefresh);
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.clearMatchMedia();
        };
    }, []);


    const handleLoadingComplete = React.useCallback(() => {
        setTimeout(() => {
            setIsLoading(false);
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
                syncTouch: true,
                autoRaf: false,
                lerp: 0.09
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
                {!isLoading && <BlobCursor
                    blobType="circle"
                    fillColor={theme === 'dark' ? '#fff' : '#000'}
                    trailCount={3}
                    sizes={[50, 115, 65]}
                    innerSizes={[20, 35, 25]}
                    innerColor="rgba(0, 0, 0, 0.3)"
                    opacities={[0.4, 0.3, 0.2]}
                    shadowColor="rgba(0, 0, 0, 0.5)"
                    shadowBlur={8}
                    shadowOffsetX={5}
                    shadowOffsetY={5}
                    filterStdDeviation={25}
                    useFilter={true}
                    fastDuration={0.1}
                    slowDuration={0.5}
                    zIndex={100}
                />}
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

                {/* @ts-ignore */}
                <View className="fixed inset-0 z-[-10] pointer-events-none">
                    <TransparentPlane />
                </View>

                <Footer />

            </div>
        </ReactLenis >
    )
}

export default Layout