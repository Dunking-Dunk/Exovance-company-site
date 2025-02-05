import React, { useState } from "react";
import { motion, useSpring, useTransform, useScroll, useMotionValueEvent, useVelocity } from "framer-motion";

const WaveStatus = () => {
    const { scrollYProgress, scrollY }: any = useScroll();
    const [curveValue, setCurveValue] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("none");

    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
        mass: 0.5
    });

    const smoothScroll = useSpring(scrollYProgress, {
        damping: 50,
        stiffness: 400,
        mass: 0.5
    });

    // Map scroll progress to wave curve intensity
    const curveIntensity = useTransform(smoothScroll, [0, 1], [0, 15]);

    // Transform velocity to a curve multiplier
    const velocityCurve = useTransform(smoothVelocity, [-2000, 0, 2000], [-1, 0, 1]);

    useMotionValueEvent(scrollY, "change", (current: any) => {
        const diff = current - scrollY.getPrevious();
        if (diff < 2 && diff > -2) {
            setScrollDirection("none");
        } else {
            setScrollDirection(diff > 0 ? "down" : "up");
        }
    });

    useMotionValueEvent(velocityCurve, "change", (latest) => {
        const baseIntensity = curveIntensity.get();
        if (scrollDirection === "down") {
            setCurveValue(-baseIntensity * Math.abs(latest));
        } else if (scrollDirection === "up") {
            setCurveValue(baseIntensity * Math.abs(latest));
        } else {
            setCurveValue(0);
        }
    });

    return (
        <svg width="230" height="70" viewBox="20 0 320 80" xmlns="http://www.w3.org/2000/svg" stroke="var(--custom-gray)" fill="none" strokeWidth="3" overflow={'hidden'}>
            <defs>
                <clipPath id="clipWave">
                    <rect x="25" y="5" width="280" height="70" rx="25" ry="25" />
                </clipPath>
            </defs>
            {/* Outer Curved Rectangle with rounded corners */}
            <motion.path
                d={`
                    M 25 30
                    C 25 16, 36 5, 50 5
                    C 50 5, 145 ${5 + curveValue}, 165 ${5 + curveValue}
                    C 185 ${5 + curveValue}, 280 5, 280 5
                    C 294 5, 305 16, 305 30
                    L 305 30
                    C 305 44, 294 55, 280 55
                    C 280 55, 185 ${55 + curveValue}, 165 ${55 + curveValue}
                    C 145 ${55 + curveValue}, 50 55, 50 55
                    C 36 55, 25 44, 25 30
                    Z
                `}
                stroke="var(--custom-gray)"
                strokeWidth="2"
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }}
            />

            <g clipPath="url(#clipWave)">
                <motion.path
                    d="M 10 30 
                        Q 25 10, 40 30 
                        Q 55 50, 70 30 
                        Q 85 10, 100 30 
                        Q 115 50, 130 30 
                        Q 145 10, 160 30 
                        Q 175 50, 190 30 
                        Q 205 10, 220 30 
                        Q 235 50, 250 30 
                        Q 265 10, 280 30
                        Q 295 50, 310 30
                        Q 325 10, 340 30 
                        Q 355 50, 370 30
                        Q 385 10, 400 30
                        Q 415 50, 430 30 
                        Q 445 10, 460 30
                        Q 475 50, 490 30
                        Q 505 10, 520 30
                        Q 535 50, 550 30
                        Q 565 10, 580 30"
                    stroke="var(--custom-gray)"
                    fill="none"
                    strokeWidth="2"
                    initial={{ x: 0 }}
                    animate={{
                        x: -200,
                        transition: {
                            duration: 12, // Increased animation speed
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                />
                <motion.path
                    d="M 10 20 
                        Q 25 50, 40 30 
                        Q 55 10, 70 30 
                        Q 85 50, 100 30 
                        Q 115 10, 130 30 
                        Q 145 50, 160 30 
                        Q 175 10, 190 30 
                        Q 205 50, 220 30 
                        Q 235 10, 250 30 
                        Q 265 50, 280 30
                        Q 295 10, 310 30
                        Q 325 50, 340 30 
                        Q 355 10, 370 30
                        Q 385 50, 400 30
                        Q 415 10, 430 30 
                        Q 445 50, 460 30
                        Q 475 10, 490 30
                        Q 505 50, 520 30
                        Q 535 10, 550 30
                        Q 565 50, 580 30"
                    stroke="var(--custom-gray-darker)"
                    fill="none"
                    strokeWidth="2"
                    initial={{ x: 0 }}
                    animate={{
                        x: -200,
                        transition: {
                            duration: 12, // Increased animation speed
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                />
            </g>
        </svg>
    );
};

export default WaveStatus;