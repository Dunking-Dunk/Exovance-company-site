"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

type Props = {
    onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: Props) => {
    const { active, progress } = useProgress();
    const loadingScreenRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        const wrapperWidth = 180;
        const finalPosition = windowWidth - wrapperWidth;
        const stepDistance = finalPosition / 6;
        const tl = gsap.timeline();

        // Only start animation when progress is complete
        if (progress === 100 && !active) {
            tl.to(".count", {
                x: -900,
                duration: 0.85,
                delay: 0.5,
                ease: "power4.inOut"
            });

            for (let i = 1; i < 6; i++) {
                const xPosition = -900 + i * 180;
                tl.to(".count", {
                    x: xPosition,
                    duration: 0.50,
                    ease: "power4.inOut",
                    onStart: () => {
                        gsap.to(".count-wrapper", {
                            x: stepDistance * i,
                            duration: 0.85,
                            ease: "power4.inOut",
                        });
                    }
                });
            }

            gsap.set(".revealer svg", { scale: 0 });

            const delays = [6, 6.5, 7];

            document.querySelectorAll(".revealer svg").forEach((el, i) => {
                gsap.to(el, {
                    scale: 45,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: delays[i],
                    onComplete: () => {
                        if (i === delays.length - 1) {
                            if (onLoadingComplete) onLoadingComplete();
                            document.querySelector(".loader")?.remove();
                            gsap.fromTo('body', {
                                autoAlpha: 0,
                            }, {
                                autoAlpha: 1,
                                duration: 1,
                                ease: "power3.out"
                            })
                        }
                    }
                });
            });
        }

    }, [progress, active, onLoadingComplete]);

    return (
        <div ref={loadingScreenRef}
            className="fixed inset-0 z-50 flex items-center overflow-hidden bg-customBlack text-customGray loader">
            <div className="relative  w-[180px] h-[360px] overflow-hidden count-wrapper"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', willChange: 'transform' }}>
                <div className="relative w-[1080px] h-[360px] flex -translate-x-[1080px] count"
                    style={{ willChange: 'transform' }}>
                    {[9, 8, 5, 3, 1, 0].map((digit, index) => (
                        <div key={index} className="relative w-[180px] h-[360px] digit">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none">
                                {digit}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative  w-[180px] h-[360px] overflow-hidden count-wrapper"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', willChange: 'transform' }}>
                <div className="relative w-[1080px] h-[360px] flex -translate-x-[1080px] count"
                    style={{ willChange: 'transform' }}>
                    {[9, 7, 6, 3, 2, 0].map((digit, index) => (
                        <div key={index} className="relative w-[180px] h-[360px] digit">
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none">
                                {digit}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>

            {[1, 2, 3].map((num) => (
                <div key={num} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 revealer revealer-${num}`}>
                    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="scale-0">
                        <circle cx="100" cy="100" r="50" className="bg-customGray stroke-customBlack stroke-[3]"/>
                    </svg>
                </div>
            ))}

            {/* Progress indicator */}
            {/* <div className="absolute bottom-4 left-4 text-sm font-light">
                Loading: {Math.round(progress)}%
            </div> */}
        </div>
    );
};

export default LoadingScreen
