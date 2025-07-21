"use client"

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { progress } = useProgress();
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);
    const completionCalledRef = useRef(false);
    const startTimeRef = useRef(Date.now());

    // Smooth progress animation that ensures steady progress
    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const timeBasedProgress = Math.min(95, (elapsed / 2500) * 100); // Reach 95% in 2.5 seconds
            const actualProgress = Math.min(100, progress);

            // Use the higher of time-based or actual progress, with minimum guaranteed progress
            const minProgress = Math.min(90, (elapsed / 1000) * 30); // Ensure at least 30% per second
            const targetProgress = Math.min(100, Math.max(timeBasedProgress, actualProgress, minProgress));

            setDisplayProgress(prev => {
                const diff = targetProgress - prev;
                // Faster interpolation to prevent visual pauses
                const step = Math.max(0.5, diff * 0.15);
                return Math.min(100, prev + step); // Cap at 100%
            });

            // Start completion when we reach near 100% or after 3 seconds
            if ((targetProgress >= 95 || elapsed > 3000) && !completionCalledRef.current) {
                completionCalledRef.current = true;
                setIsCompleting(true);

                // Immediately show 100% and call completion
                setDisplayProgress(100);
                if (onLoadingComplete) onLoadingComplete();

                // Start exit animation without delay
                startExitAnimation();
            }
        }, 16); // 60fps updates

        return () => clearInterval(interval);
    }, [progress, onLoadingComplete]);

    const startExitAnimation = () => {
        gsap.set(".revealer svg", { scale: 0 });

        // Single reveal element for faster animation
        const revealer = document.querySelector(".revealer svg");
        if (revealer) {
            gsap.to(revealer, {
                scale: 45,
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    gsap.to('.loader', {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power4.out",
                        onComplete: () => {
                            document.querySelector(".loader")?.remove();
                        }
                    });
                }
            });
        }
    };

    // Emergency fallback
    useEffect(() => {
        const emergencyTimer = setTimeout(() => {
            if (!completionCalledRef.current) {
                console.log('Emergency loading completion');
                completionCalledRef.current = true;
                setDisplayProgress(100);
                if (onLoadingComplete) onLoadingComplete();
                startExitAnimation();
            }
        }, 4000); // 4 second absolute max

        return () => clearTimeout(emergencyTimer);
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-customBlack text-customGray loader">
            <div className="text-9xl font-light">
                {Math.round(displayProgress)}%
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 revealer">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="scale-0">
                    <circle cx="100" cy="100" r="50" className="fill-customGray stroke-customBlack stroke-[3]" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingScreen