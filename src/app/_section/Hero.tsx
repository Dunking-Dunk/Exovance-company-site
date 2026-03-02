"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrentScrollTheme } from "@/components/provider/scroll-theme-provider";

export default function Hero() {
    const theme = useCurrentScrollTheme();

    return (
        <section className="relative z-10 h-[100dvh] w-full flex flex-col items-center justify-center antialiased overflow-hidden">

            {/* Single minimal gradient bloom */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden={true}>
                {/* Primary violet bloom — top-center */}
                <div
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.22] transition-opacity duration-700"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, #7800ff 0%, #9a20e0 30%, transparent 70%)" }}
                />
                {/* Secondary bloom — right offset, softer */}
                <div
                    className="absolute -top-20 right-[8%] w-[560px] h-[400px] opacity-[0.10] transition-opacity duration-700"
                    style={{ background: "radial-gradient(ellipse at 60% 0%, #aa00ff 0%, transparent 65%)" }}
                />
                {/* Tertiary bloom — left counter-balance */}
                <div
                    className="absolute -top-16 left-[6%] w-[460px] h-[340px] opacity-[0.08] transition-opacity duration-700"
                    style={{ background: "radial-gradient(ellipse at 40% 0%, #5500cc 0%, transparent 65%)" }}
                />
                {/* Hairline bottom rule */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            </div>

            {/* Brand name */}
            <div className="relative">

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
                    "font-regular tracking-widest text-customGrayLight cursor-hover md:text-9xl text-6xl relative transition-colors duration-1000 ease-in-out"
                )}>
                    <span className="inline-flex items-baseline align-middle leading-none">
                        <Image
                            src={theme === 'dark' ? '/logo/only logo white.png' : '/logo/only logo black.png'}
                            alt="E mark"
                            width={120}
                            height={120}
                            priority
                            style={{ height: '1em', width: '1em' }}
                            className="mr-[0.05em]"
                        />
                        <span>XOVANCE</span>
                    </span>
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


            <div className="absolute bottom-28 flex flex-col items-center space-y-6">

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
