"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Vision = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.pin-section');

        // Initial blur setup
        gsap.set(".pin-section-text", {
            filter: "blur(10px)",
            opacity: 0
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=240%",
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.2, max: 0.3 },
                    ease: "power2.inOut",
                    inertia: false
                },
                anticipatePin: 1,
                id: 'vision-timeline' // Add unique ID to avoid conflicts
            }
        });

        sections.forEach((section: any, index) => {
            const text = section.querySelector(".pin-section-text");
            const descriptions = section.querySelector(".section-description");

            if (index !== 0) {
                tl.fromTo(section,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 1, ease: "power2.inOut" }
                )
            }
            tl.fromTo(text,
                {
                    opacity: 0,
                    y: 100,
                    filter: "blur(10px)"
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power2.out"
                }, "-=0.8"
            ).fromTo(descriptions,
                {
                    opacity: 0,
                    x: 50,
                    filter: "blur(5px)"
                },
                {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.8"
            );


            if (index !== sections.length - 1) {
                tl.to(descriptions,
                    {
                        opacity: 0,
                        x: -50,
                        filter: "blur(5px)",
                        duration: 1,
                        ease: "power2.inOut"
                    }
                ).to(text,
                    {
                        opacity: 0,
                        y: -100,
                        filter: "blur(10px)",
                        duration: 1,
                        ease: "power2.inOut"
                    }
                ).to(section,
                    {
                        autoAlpha: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }
                );
            }
        });

        // Cleanup function to avoid conflicts
        return () => {
            // Only kill the specific timeline for this component
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[100dvh] overflow-hidden relative z-10">
            {/* Minimal background patterns */}
            <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
                {/* Radial dots pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.3) 1px, transparent 0)`,
                    backgroundSize: '80px 80px'
                }} />
            </div>

            {/* Geometric accent lines */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.1]">
                {/* Diagonal grid */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.2) 49%, rgba(0,0,0,0.2) 51%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.2) 49%, rgba(0,0,0,0.2) 51%, transparent 52%)
                    `,
                    backgroundSize: '120px 120px'
                }} />
            </div>

            {/* Corner text elements with proper typography */}
            <p className="absolute top-1/3 left-[5%] md:left-[15%] text-sm md:text-base text-customGray font-light tracking-wider">
                INDIAN TAMIL NADU <br />BASED START-UP
            </p>
            <p className="absolute top-1/4 right-[5%] md:right-[15%] text-sm md:text-base text-customGray font-light tracking-wider">
                WE DEFINE THE <br />FUTURE
            </p>
            <p className="absolute top-3/4 left-[5%] md:left-[15%] text-sm md:text-base text-customGray font-light tracking-widest">
                UNFAZED
            </p>

            {/* Section 1 - IMAGINE */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="0">
                {/* Minimal geometric accents for IMAGINE */}
                <div className="absolute top-[20%] left-[10%] w-16 h-16 opacity-[0.15] dark:opacity-[0.2]">
                    <div className="w-full h-full border border-customGray rotate-45"></div>
                </div>
                <div className="absolute bottom-[30%] left-[8%] w-8 h-8 opacity-[0.18] dark:opacity-[0.25]">
                    <div className="w-full h-full bg-customGray rounded-full"></div>
                </div>
                <div className="absolute top-[15%] right-[12%] w-1 h-20 bg-customGray opacity-[0.12] dark:opacity-[0.18]"></div>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-customGrayDark pin-section-text tracking-widest">
                        IMAGINE
                    </h3>
                </span>
                <p className="section-description font-light absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-sm md:text-base text-customGray w-36 md:w-48 leading-relaxed">
                    Represents creativity and visionary thinking.
                </p>
            </section>

            {/* Section 2 - INVENT */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="1">
                {/* Minimal geometric accents for INVENT */}
                <div className="absolute top-[25%] left-[8%] w-12 h-1 bg-customGray opacity-[0.16] dark:opacity-[0.22]"></div>
                <div className="absolute top-[28%] left-[8%] w-20 h-1 bg-customGray opacity-[0.12] dark:opacity-[0.18]"></div>
                <div className="absolute bottom-[25%] right-[8%] w-10 h-10 opacity-[0.14] dark:opacity-[0.2]">
                    <div className="w-full h-full border-2 border-customGray"></div>
                </div>
                <div className="absolute top-[20%] right-[15%] w-6 h-6 bg-customGray opacity-[0.18] dark:opacity-[0.25] rotate-45"></div>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-customGrayDark pin-section-text tracking-widest">
                        INVENT
                    </h3>
                </span>
                <p className="section-description font-light absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-sm md:text-base text-customGray w-36 md:w-48 leading-relaxed">
                    Reflects building something entirely new
                </p>
            </section>

            {/* Section 3 - EXOVANCE */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="2">
                {/* Minimal geometric accents for EXOVANCE */}
                <div className="absolute top-[18%] left-[12%] w-14 h-14 opacity-[0.14] dark:opacity-[0.2]">
                    <div className="w-full h-full border border-customGray rounded-full"></div>
                </div>
                <div className="absolute bottom-[35%] left-[6%] opacity-[0.16] dark:opacity-[0.22]">
                    <div className="w-4 h-4 bg-customGray transform rotate-45"></div>
                    <div className="w-4 h-4 bg-customGray transform rotate-45 translate-x-3 -translate-y-4"></div>
                </div>
                <div className="absolute top-[30%] right-[10%] w-24 h-1 bg-customGray opacity-[0.12] dark:opacity-[0.18] rotate-12"></div>
                <div className="absolute bottom-[20%] right-[12%] w-2 h-16 bg-customGray opacity-[0.15] dark:opacity-[0.22]"></div>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-customGrayDark pin-section-text tracking-widest">
                        EXOVANCE
                    </h3>
                </span>
                <p className="section-description font-light absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-sm md:text-base text-customGray w-36 md:w-48 leading-relaxed">
                    Highlights improving and pushing boundaries.
                </p>
            </section>
        </div>
    );
};

export default Vision;