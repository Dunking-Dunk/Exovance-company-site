"use client"

import { useState, useEffect } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative z-10 h-[100dvh] w-full flex flex-col items-center justify-center antialiased bg-grid-white/[0.02] overflow-hidden">


            <div className="absolute inset-0 opacity-20 dark:opacity-10 transition-opacity duration-1000 ease-in-out">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>


            <motion.div
                className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                }}
            >

                <motion.div
                    className="absolute w-96 h-96 border border-gray-300/20 dark:border-gray-600/20 rounded-full transition-colors duration-1000 ease-in-out"
                    style={{
                        top: '10%',
                        right: '5%',
                    }}
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    }}
                />


                <motion.div
                    className="absolute w-32 h-20 border border-gray-400/30 dark:border-gray-500/30 transition-colors duration-1000 ease-in-out"
                    style={{
                        top: '30%',
                        left: '8%',
                    }}
                    animate={{
                        rotate: [0, 15, -15, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-gray-400/25 dark:border-b-gray-500/25 transition-colors duration-1000 ease-in-out"
                    style={{
                        bottom: '25%',
                        right: '15%',
                    }}
                    animate={{
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Hexagon */}
                <motion.div
                    className="absolute w-16 h-16 transition-colors duration-1000 ease-in-out"
                    style={{
                        top: '60%',
                        left: '75%',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                    }}
                    animate={{
                        rotate: [0, 120, 240, 360],
                        scale: [1, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Ambient Orb */}
            <motion.div
                className="absolute w-[600px] h-[600px] pointer-events-none transition-opacity duration-1000 ease-in-out"
                style={{
                    background: `radial-gradient(circle, rgba(${mousePosition.x * 2.55}, ${mousePosition.y * 2.55}, 255, 0.03) 0%, transparent 70%)`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Floating Dots */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400/40 dark:bg-gray-500/40 rounded-full transition-colors duration-1000 ease-in-out"
                        style={{
                            left: `${20 + (i * 10)}%`,
                            top: `${30 + (i * 8)}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* Subtle Corner Accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gray-300/40 dark:border-gray-600/40 transition-colors duration-1000 ease-in-out" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gray-300/40 dark:border-gray-600/40 transition-colors duration-1000 ease-in-out" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gray-300/40 dark:border-gray-600/40 transition-colors duration-1000 ease-in-out" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gray-300/40 dark:border-gray-600/40 transition-colors duration-1000 ease-in-out" />

            {/* Refined Brand Name with Enhanced Styling */}
            <div className="relative">
                {/* Background glow effect */}
                <motion.div
                    className="absolute inset-0 blur-3xl opacity-20 transition-opacity duration-1000 ease-in-out"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        background: `linear-gradient(45deg, rgba(${mousePosition.x * 2.55}, ${mousePosition.y * 2.55}, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                    }}
                />

                <motion.div
                    className="absolute -top-16 left-0 text-xs tracking-[0.3em] uppercase text-customGrayDarker/60 font-light"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    IMAGINE
                </motion.div>

                <motion.div
                    className="absolute -top-16 right-0 text-xs tracking-[0.3em] uppercase text-customGrayDarker/60 font-light"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    INVENT
                </motion.div>

                <h1 className={cn(
                    "font-regular tracking-widest text-customGrayDark cursor-hover md:text-9xl text-6xl relative transition-colors duration-1000 ease-in-out",
                    "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-customGrayDark/20 before:to-transparent",
                    "before:animate-pulse before:opacity-50 before:blur-sm before:transition-colors before:duration-1000 before:ease-in-out"
                )}>
                    EXOVANCE
                </h1>

                {/* Bottom descriptive text */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs tracking-[0.4em] uppercase text-customGrayDarker/50 font-light"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.5 }}
                >
                    EXPERIENCE
                </motion.div>
            </div>

            {/* Enhanced Bottom Section */}
            <div className="absolute bottom-28 flex flex-col items-center space-y-6">
                {/* Subtle Line Above Text */}
                <motion.div
                    className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent transition-colors duration-1000 ease-in-out"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                />

                <TextGenerateEffect
                    words="SCROLL TO DISCOVER"
                    duration={3}
                    className="font-base text-2xl text-customGrayDarker transition-colors duration-1000 ease-in-out"
                />

                <motion.div
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-6 h-6 transition-colors duration-1000 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-full h-full text-customGrayDarker transition-colors duration-1000 ease-in-out"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        />
                    </svg>
                </motion.div>

                {/* Subtle Line Below Arrow */}
                <motion.div
                    className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent transition-colors duration-1000 ease-in-out"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 2 }}
                />
            </div>

        </section>
    );
}
