"use client"

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { progress, active, loaded, total } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);
    const [assetsReady, setAssetsReady] = useState(false);
    const completionCalledRef = useRef(false);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        const preloadAssets = async () => {
            try {

                const preloadPromises = [
                    useGLTF.preload('/3d/brain_3d.glb'),
                    useGLTF.preload('/3d/human_head.glb'),
                    useGLTF.preload('/3d/spider_robot.glb'),
                    useGLTF.preload('/3d/vertebral.glb'),
                    useGLTF.preload('/3d/lost_orb_in_the_mountains-transformed.glb')
                ];

                await Promise.all(preloadPromises);

                setTimeout(() => {
                    console.log('All 3D assets loaded and ready');
                    setAssetsReady(true);
                }, 800);

            } catch (error) {
                console.error('Error preloading assets:', error);
                // Continue anyway after timeout
                setTimeout(() => {
                    setAssetsReady(true);
                }, 1500);
            }
        };

        preloadAssets();
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const timeBasedProgress = Math.min(80, (elapsed / 2500) * 100);
            const actualProgress = Math.min(100, progress);


            let targetProgress;
            if (assetsReady && !active && loaded >= total && total > 0) {

                targetProgress = 100;
            } else if (assetsReady && !active) {

                targetProgress = Math.min(95, Math.max(timeBasedProgress, actualProgress));
            } else if (assetsReady) {

                targetProgress = Math.min(90, Math.max(timeBasedProgress, actualProgress * 0.9));
            } else {

                targetProgress = Math.min(75, Math.max(timeBasedProgress * 0.8, actualProgress * 0.7));
            }

            setDisplayProgress(prev => {
                const diff = targetProgress - prev;
                const step = Math.max(0.3, diff * 0.08); // Slower, more controlled progress
                return Math.min(targetProgress, prev + step);
            });


            const minElapsed = 2000;
            const shouldComplete = (
                displayProgress >= 98 &&
                assetsReady &&
                !active &&
                elapsed > minElapsed
            ) || elapsed > 7000;

            if (shouldComplete && !completionCalledRef.current) {
                completionCalledRef.current = true;
                setIsCompleting(true);
                setDisplayProgress(100);


                setTimeout(() => {

                    if (onLoadingComplete) onLoadingComplete();
                    startExitAnimation();
                }, 400);
            }
        }, 20);

        return () => clearInterval(interval);
    }, [progress, active, loaded, total, assetsReady, displayProgress, onLoadingComplete]);

    const startExitAnimation = () => {
        gsap.set(".revealer svg", { scale: 0 });

        const revealer = document.querySelector(".revealer svg");
        const loader = document.querySelector(".loader");
        if (revealer) {
            gsap.to(revealer, {
                scale: 45,
                duration: 1.2,
                ease: "power3.out",
                onComplete: () => {
                    if (loader) {
                        gsap.to(loader, {
                            opacity: 0,
                            duration: 0.4,
                            ease: "power4.out",
                            onComplete: () => {
                                document.querySelector(".loader")?.remove();
                            }
                        });
                    }
                }
            });
        }
    };

    useEffect(() => {
        const emergencyTimer = setTimeout(() => {
            if (!completionCalledRef.current) {
                console.log('Emergency loading completion - assets may still be loading');
                completionCalledRef.current = true;
                setDisplayProgress(100);
                setAssetsReady(true); // Force assets ready
                if (onLoadingComplete) onLoadingComplete();
                startExitAnimation();
            }
        }, 8000);

        return () => clearTimeout(emergencyTimer);
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-customBlack text-customGray loader">
            <div className="text-9xl font-light">
                {Math.round(displayProgress)}%
            </div>

            {/* Debug info in development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                    <div>Progress: {Math.round(progress)}%</div>
                    <div>Assets Ready: {assetsReady ? 'Yes' : 'No'}</div>
                    <div>Active: {active ? 'Yes' : 'No'}</div>
                    <div>Loaded: {loaded}/{total}</div>
                </div>
            )}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 revealer">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="scale-0">
                    <circle cx="100" cy="100" r="50" className="fill-customGray stroke-customBlack stroke-[3]" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingScreen