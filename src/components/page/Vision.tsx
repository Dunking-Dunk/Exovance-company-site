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
                anticipatePin: 1
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
    }, []);

    return (
        <div ref={containerRef} className="w-full h-screen overflow-hidden relative z-10">
              <p className="absolute top-1/3 left-[5%] md:left-[15%] text-base md:text-xl text-customGrayDark">Indian Tamil Nadu <br />Based start-up</p>
              <p className="absolute top-1/4 right-[5%] md:right-[15%] text-base md:text-xl text-customGrayDark">We define the <br />  future</p>
              <p className="absolute top-3/4 left-[5%] md:left-[15%] text-base md:text-xl text-customGrayDark">UNFAZED</p>
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="0">
                <span className="overflow-hidden relative">
                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-bold text-customGrayDark pin-section-text">IMAGINE</h3>
                </span>
                <p className="section-description font-normal absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-base md:text-xl text-customGrayDark w-36 md:w-48">
                    Represents creativity and visionary thinking.
                </p>
            </section>
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="1">
                <span className="overflow-hidden relative">
                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-bold text-customGrayDark pin-section-text">INVENT</h3>
                </span>
                <p className="section-description font-normal absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-base md:text-xl text-customGrayDark w-36 md:w-48">
                    Reflects building something entirely new
                </p>
            </section>
            <section className="pin-section absolute top-0 left-0 w-full h-full flex items-center justify-center" data-section="2">
                <span className="overflow-hidden relative">
                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-bold text-customGrayDark pin-section-text">EXOVANCE</h3>
                </span>
                <p className="section-description font-normal absolute bottom-[15%] md:bottom-[20%] right-[5%] md:right-[20%] text-base md:text-xl text-customGrayDark w-36 md:w-48">
                    Highlights improving and pushing boundaries.
                </p>
            </section>
        </div>
    );
};

export default Vision;