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

        // Define progress thresholds for each animation
        const thresholds = [20, 40, 60, 80, 90, 100];
        
        // Initial position when loading starts
        if (progress > 0 && progress <= thresholds[0]) {
            tl.to(".count", {
                x: -900,
                duration: 0.85,
                ease: "power4.inOut"
            });
        }
        
        // Animate based on progress thresholds
        if (progress > thresholds[0] && progress <= thresholds[1]) {
            tl.to(".count", {
                x: -720, // -900 + (1 * 180)
                duration: 0.85,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.to(".count-wrapper", {
                        x: stepDistance * 1,
                        duration: 0.85,
                        ease: "power4.inOut",
                    });
                }
            });
        }
        
        if (progress > thresholds[1] && progress <= thresholds[2]) {
            tl.to(".count", {
                x: -540, // -900 + (2 * 180)
                duration: 0.85,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.to(".count-wrapper", {
                        x: stepDistance * 2,
                        duration: 0.85,
                        ease: "power4.inOut",
                    });
                }
            });
        }
        
        if (progress > thresholds[2] && progress <= thresholds[3]) {
            tl.to(".count", {
                x: -360, // -900 + (3 * 180)
                duration: 0.85,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.to(".count-wrapper", {
                        x: stepDistance * 3,
                        duration: 0.85,
                        ease: "power4.inOut",
                    });
                }
            });
        }
        
        if (progress > thresholds[3] && progress <= thresholds[4]) {
            tl.to(".count", {
                x: -180, // -900 + (4 * 180)
                duration: 0.85,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.to(".count-wrapper", {
                        x: stepDistance * 4,
                        duration: 0.85,
                        ease: "power4.inOut",
                    });
                }
            });
        }
        
        // Final animation when loading is complete
        if (progress > thresholds[4]) {
            tl.to(".count", {
                x: 0, // -900 + (5 * 180)
                duration: 0.85,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.to(".count-wrapper", {
                        x: stepDistance * 5,
                        duration: 0.85,
                        ease: "power4.inOut",
                    });
                }
            });

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

            {[1].map((num) => (
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