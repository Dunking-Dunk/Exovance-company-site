"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { active, progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            gsap.set(".revealer svg", { scale: 0 });
            const delays = [0.5, 1, 1.5];

            document.querySelectorAll(".revealer svg").forEach((el, i) => {
                gsap.to(el, {
                    scale: 45,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: delays[i],
                    onComplete: () => {
                        if (onLoadingComplete) onLoadingComplete();
                        const tl = gsap.timeline();

                        tl.to(el, {
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.inOut",
                        })
                        tl.to('.loader', {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power4.Out",
                            onComplete: () => {
                                document.querySelector(".loader")?.remove();
                            }
                        }, '-=0.7')
                    }
                });
            });
        }
    }, [progress, active, onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-customBlack text-customGray loader">
            <div className="text-9xl font-light">
                {Math.round(progress)}%
            </div>

            {[1].map((num) => (
                <div key={num} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 revealer revealer-${num}`}>
                    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="scale-0">
                        <circle cx="100" cy="100" r="50" className="bg-customGray stroke-customBlack stroke-[3]" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default LoadingScreen