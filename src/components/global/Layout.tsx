"use client"

import dynamic from 'next/dynamic'
import React, { useRef, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
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

// Dynamic imports for 3D components with preloading
const Scene: any = dynamic(() => import('@/components/canva/Scene'), { ssr: false })
const View: any = dynamic(() => import('@/components/canva/View').then((mod: any) => mod.View), { ssr: false })
const Common: any = dynamic(() => import('@/components/canva/View').then((mod: any) => mod.Common), { ssr: false })
const Particles: any = dynamic(() => import('@/components/canva/Particles').then((mod: any) => mod.Particles), { ssr: false })
const TransparentPlane: any = dynamic(() => import('@/components/canva/TransparentPlane').then((mod: any) => mod.TransparentPlane), { ssr: false })

// Preload 3D components for better performance
if (typeof window !== 'undefined') {
    import('@/components/canva/View');
    import('@/components/canva/Particles');
    import('@/components/canva/TransparentPlane');
}

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const lenisRef = useRef<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [sceneReady, setSceneReady] = React.useState(false)
    const [particlesReady, setParticlesReady] = React.useState(false)
    const { theme } = useScrollTheme();
    const pathname = usePathname();


    const render3DComponents = useMemo(() => {
        const isHomePage = pathname === '/';
        const isAboutPage = pathname === '/about';

        return {
            showParticles: isHomePage,
            showTransparentPlane: true,
            showCommon: isHomePage,
        };
    }, [pathname]);

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


        const handleLenisScroll = () => {
            ScrollTrigger.update();
        };

        lenisRef.current?.lenis?.on('scroll', handleLenisScroll);

        const debouncedRefresh = debounce(() => {
            ScrollTrigger.refresh();
        }, 200);

        window.addEventListener('resize', debouncedRefresh);


        const resizeObserver = new ResizeObserver(
            debounce(() => {
                ScrollTrigger.refresh();
                lenisRef.current?.lenis?.resize();
            }, 100)
        );

        if (ref.current) {
            resizeObserver.observe(ref.current);
        }

        return () => {
            gsap.ticker.remove(update)
            lenisRef.current?.lenis?.off('scroll', handleLenisScroll);
            window.removeEventListener('resize', setAppHeight);
            window.removeEventListener('resize', debouncedRefresh);
            resizeObserver.disconnect();
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.clearMatchMedia();
        };
    }, []);


    useEffect(() => {
        const handleRouteChange = () => {

            setParticlesReady(false);


            lenisRef.current?.lenis?.scrollTo(0, { immediate: true });


            const refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();

                lenisRef.current?.lenis?.resize();


                setTimeout(() => {
                    ScrollTrigger.refresh();
                    lenisRef.current?.lenis?.resize();
                }, 200);
            }, 100);

            return () => clearTimeout(refreshTimer);
        };

        handleRouteChange();
    }, [pathname]);


    const handleParticlesReady = React.useCallback(() => {
        console.log('Particles are ready!');
        setParticlesReady(true);
    }, []);

    const handleLoadingComplete = React.useCallback(() => {

        const shouldWaitForParticles = render3DComponents.showParticles;

        if (!shouldWaitForParticles || particlesReady) {
            setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setSceneReady(true);
                }, 500);
            }, 300);
        }
    }, [render3DComponents.showParticles, particlesReady]);

    useEffect(() => {
        if (particlesReady || !render3DComponents.showParticles) {
            handleLoadingComplete();
        }
    }, [particlesReady, render3DComponents.showParticles, handleLoadingComplete]);

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
                    touchAction: 'pan-y',
                    WebkitOverflowScrolling: 'touch',
                    WebkitTextSizeAdjust: '100%',
                }}
                className='bg-black'
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


                <View className="fixed inset-0 pointer-events-none z-[-10]">
                    {render3DComponents.showCommon && <Common />}
                    {render3DComponents.showParticles && <Particles onReady={handleParticlesReady} />}
                    {render3DComponents.showTransparentPlane && <TransparentPlane />}
                </View>
                {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
                <Footer />
            </div>
        </ReactLenis >
    )
}

export default Layout