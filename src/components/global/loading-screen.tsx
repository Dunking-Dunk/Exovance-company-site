"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { progress, total, loaded, active } = useProgress();
    const counterRef = useRef<HTMLDivElement>(null);
    const loadingScreenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const counter = counterRef.current;
        const screen = loadingScreenRef.current;
        if (!counter || !screen) return;

        // Update counter text directly from progress
        counter.textContent = Math.round(progress).toString() + '%';

        // When loading is complete (progress is 100)
        if (progress === 100 && !active) {
            const tl = gsap.timeline();
            
            // Add a small delay before fade out
            tl.to({}, { duration: 0.5 })
              // Fade out loading screen
              .to(screen, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    if (onLoadingComplete)
                    onLoadingComplete();
                    // Hide the loading screen after fade out
                    screen.style.display = 'none';
                }
            });
        }
    }, [progress, active, onLoadingComplete]);

    return (
        <div 
            ref={loadingScreenRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-customBlack"
        >
            <div className="text-center">
                <div className="space-y-2">
                    <div 
                        ref={counterRef}
                        className="text-9xl font-bold text-customGrayDark"
                    >
                        0%
                    </div>
                    <div className="text-sm text-customGrayDark">
                        {loaded} / {total} assets loaded
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
