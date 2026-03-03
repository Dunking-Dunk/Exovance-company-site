"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Vision = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.pin-section');


        gsap.set(".pin-section-text", {
            filter: "blur(10px)",
            opacity: 0
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=360%",
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.2, max: 0.3 },
                    ease: "power2.inOut",
                    inertia: false
                },
                anticipatePin: 1,
                id: 'vision-timeline'
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

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[100dvh] overflow-hidden relative z-10">
            {/* Faint violet bloom top */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 35% at 50% -5%, rgba(100,0,200,0.08) 0%, transparent 100%)' }} />

            {/* Corner ambient text — mono small caps */}
            <p className="absolute top-1/3 left-[5%] md:left-[12%] font-mono text-[9px] tracking-[0.35em] text-violet-400/45 uppercase leading-loose">
                Tamil Nadu<br />India
            </p>
            <p className="absolute top-1/4 right-[5%] md:right-[12%] font-mono text-[9px] tracking-[0.35em] text-violet-400/45 uppercase text-right leading-loose">
                We Define<br />The Future
            </p>
            <p className="absolute top-3/4 left-[5%] md:left-[12%] font-mono text-[9px] tracking-[0.35em] text-violet-400/35 uppercase">
                Unfazed
            </p>

            {/* Section 1 - IMAGINE */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="0">
                {/* Accent: thin violet hairlines */}
                <div className="absolute top-[18%] left-[8%] w-px h-24 bg-gradient-to-b from-violet-500/20 to-transparent" />
                <div className="absolute bottom-[25%] right-[8%] w-16 h-px bg-gradient-to-r from-transparent to-violet-500/20" />
                <span className="absolute top-[18%] left-[8%] font-mono text-[8px] tracking-[0.5em] text-violet-400/40 uppercase ml-3">01</span>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-customGrayLight pin-section-text tracking-tight">
                        IMAGINE
                    </h3>
                </span>
                <p className="section-description font-mono absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[18%] text-[10px] tracking-[0.35em] text-violet-400/65 uppercase w-44">
                    A university where AI writes the entire timetable before morning coffee.
                </p>
            </section>

            {/* Section 2 - INVENT */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="1">
                <div className="absolute top-[18%] right-[8%] w-px h-24 bg-gradient-to-b from-violet-500/20 to-transparent" />
                <div className="absolute bottom-[25%] left-[8%] w-16 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                <span className="absolute top-[18%] right-[8%] font-mono text-[8px] tracking-[0.5em] text-violet-400/40 uppercase mr-3">02</span>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-customGrayLight pin-section-text tracking-tight">
                        INVENT
                    </h3>
                </span>
                <p className="section-description font-mono absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[18%] text-[10px] tracking-[0.35em] text-violet-400/65 uppercase w-44">
                    A kiosk that speaks, thinks, and closes deals without a human present.
                </p>
            </section>

            {/* Section 3 - EXOVANCE */}
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="2">
                <div className="absolute top-[18%] left-[8%] w-px h-24 bg-gradient-to-b from-violet-500/30 to-transparent" />
                <div className="absolute top-[18%] right-[8%] w-px h-24 bg-gradient-to-b from-violet-500/30 to-transparent" />
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
                <span className="absolute top-[18%] left-[8%] font-mono text-[8px] tracking-[0.5em] text-violet-400/40 uppercase ml-3">03</span>

                <span className="overflow-hidden relative">
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold pin-section-text tracking-tight">
                        <span className="text-violet-400">EXO</span><span className="text-customGrayLight">VANCE</span>
                    </h3>
                </span>
                <p className="section-description font-mono absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[18%] text-[10px] tracking-[0.35em] text-violet-400/65 uppercase w-44">
                    Pushing beyond known boundaries.
                </p>
            </section>
        </div>
    );
};

export default Vision;