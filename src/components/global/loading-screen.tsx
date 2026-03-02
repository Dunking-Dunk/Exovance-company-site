"use client"

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useProgress, useGLTF } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
    blockUntilParticlesReady?: boolean;
    particlesReady?: boolean;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { progress, active, loaded, total } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [assetsReady, setAssetsReady] = useState(false);
    const completionCalledRef = useRef(false);
    const startTimeRef = useRef(Date.now());

    // Preload all 3D assets up-front
    useEffect(() => {
        const preloadAssets = async () => {
            try {
                await Promise.all([
                    useGLTF.preload('/3d/brain_3d.glb'),
                    useGLTF.preload('/3d/human_head.glb'),
                    useGLTF.preload('/3d/spider_robot.glb'),
                    useGLTF.preload('/3d/vertebral.glb'),
                ]);
                setTimeout(() => setAssetsReady(true), 600);
            } catch {
                setTimeout(() => setAssetsReady(true), 1200);
            }
        };
        preloadAssets();
    }, []);

    const startExitAnimation = () => {
        gsap.set('.revealer svg', { scale: 0 });
        const revealer = document.querySelector('.revealer svg');
        const loader = document.querySelector('.loader');
        if (revealer) {
            gsap.to(revealer, {
                scale: 45,
                duration: 1.2,
                ease: 'power3.out',
                onComplete: () => {
                    if (loader) {
                        gsap.to(loader, {
                            opacity: 0,
                            duration: 0.4,
                            ease: 'power4.out',
                            onComplete: () => {
                                document.querySelector('.loader')?.remove();
                            },
                        });
                    }
                },
            });
        }
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#06060c] text-customGray loader">
            <div className="text-9xl font-light">
                {Math.round(displayProgress)}%
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="absolute bottom-4 left-4 text-xs text-gray-500 space-y-1">
                    <div>Three.js: {Math.round(progress)}% ({loaded}/{total})</div>
                    <div>Assets: {assetsReady ? 'ready' : 'loading'}</div>
                    <div>Active: {active ? 'yes' : 'no'}</div>
                </div>
            )}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 revealer">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="scale-0">
                    <circle cx="100" cy="100" r="50" className="fill-customGray stroke-[#06060c] stroke-[3]" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingScreen
