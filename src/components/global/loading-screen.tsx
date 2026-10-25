"use client"

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useProgress, useGLTF } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
    blockUntilParticlesReady?: boolean;
    particlesReady?: boolean;
    preload?: boolean;
}

const LoadingScreen = ({ onLoadingComplete, preload = true }: Props) => {
    const { progress, active, loaded, total } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [assetsReady, setAssetsReady] = useState(false);
    const completionCalledRef = useRef(false);
    const startTimeRef = useRef(Date.now());

    // Preload all 3D assets up-front (only the home page uses them)
    useEffect(() => {
        if (!preload) {
            setTimeout(() => setAssetsReady(true), 300);
            return;
        }
        const preloadAssets = async () => {
            try {
                await Promise.all([
                    useGLTF.preload('/3d/brain_3d.glb'),
                    useGLTF.preload('/3d/human_head.glb'),
                    useGLTF.preload('/3d/spider_robot.glb'),
                    useGLTF.preload('/3d/vertebral.glb'),
                    useGLTF.preload('/3d/dna_3.glb'),
                    useGLTF.preload('/3d/exovance-3d.glb'),
                ]);
                setTimeout(() => setAssetsReady(true), 600);
            } catch {
                setTimeout(() => setAssetsReady(true), 1200);
            }
        };
        preloadAssets();
    }, []);

    const startExitAnimation = () => {
        const loader = document.querySelector('.loader');
        if (!loader) return;
        // The number and mark drift up and fade, then the veil lifts to reveal the page
        gsap.to('.loader-content', { y: -16, opacity: 0, duration: 0.5, ease: 'power2.in' });
        gsap.to(loader, {
            opacity: 0,
            duration: 0.9,
            delay: 0.25,
            ease: 'power2.inOut',
            onComplete: () => { document.querySelector('.loader')?.remove(); },
        });
    };

    const completeNow = () => {
        if (completionCalledRef.current) return;
        completionCalledRef.current = true;
        setDisplayProgress(100);
        setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
            startExitAnimation();
        }, 400);
    };

    // Smoothly animate display progress and auto-complete
    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const timeBased = Math.min(80, (elapsed / 2500) * 100);
            const actual = Math.min(100, progress);

            let target: number;
            if (assetsReady && !active && loaded >= total && total > 0) {
                target = 100;
            } else if (assetsReady && !active) {
                target = Math.min(95, Math.max(timeBased, actual));
            } else if (assetsReady) {
                target = Math.min(90, Math.max(timeBased, actual * 0.9));
            } else {
                target = Math.min(75, Math.max(timeBased * 0.8, actual * 0.7));
            }

            setDisplayProgress(prev => {
                const diff = target - prev;
                const step = Math.max(0.3, diff * 0.08);
                return Math.min(target, prev + step);
            });

            const shouldComplete =
                (displayProgress >= 98 && assetsReady && !active && elapsed > 2000) ||
                elapsed > 5000;

            if (shouldComplete && !completionCalledRef.current) {
                completeNow();
            }
        }, 20);

        return () => clearInterval(interval);
    }, [progress, active, loaded, total, assetsReady, displayProgress]);

    // Hard emergency ceiling — never stay stuck beyond 4 s
    useEffect(() => {
        const t = setTimeout(() => {
            if (!completionCalledRef.current) {
                completionCalledRef.current = true;
                setDisplayProgress(100);
                setAssetsReady(true);
                if (onLoadingComplete) onLoadingComplete();
                startExitAnimation();
            }
        }, 4000);
        return () => clearTimeout(t);
    }, [onLoadingComplete]);

    const pct = Math.round(displayProgress);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-customGray loader"
            style={{ background: 'radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.171) 0%, rgba(5,5,5,0.97) 62%), #050505' }}
            role="status"
            aria-label={`Loading ${pct} percent`}
        >
            <div className="loader-content flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo/only logo white.png" alt="" className="h-10 w-auto opacity-90" />
                <div className="mt-8 font-display text-7xl sm:text-8xl font-light tabular-nums tracking-tight text-customGrayLight">
                    {pct}<span className="text-violet-300/70 text-3xl sm:text-4xl align-top ml-1">%</span>
                </div>
                <div className="mt-8 h-px w-48 sm:w-64 overflow-hidden rounded-full bg-accent-400/15">
                    <div className="h-full origin-left bg-accent-300/80" style={{ transform: `scaleX(${displayProgress / 100})` }} />
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-violet-300/50">Exovance</p>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="absolute bottom-4 left-4 text-xs text-gray-500 space-y-1">
                    <div>Three.js: {Math.round(progress)}% ({loaded}/{total})</div>
                    <div>Assets: {assetsReady ? 'ready' : 'loading'}</div>
                    <div>Active: {active ? 'yes' : 'no'}</div>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen
