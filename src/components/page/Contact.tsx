"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { View } from '../canva/View';
import { BackgroundHero } from '../canva/backgroundHero';
import { useTheme } from 'next-themes';

const ContactMarquee = () => {
    const containerRef = React.useRef(null);
    const { theme } = useTheme()

    const marqueeVariants = {
        animate: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className="relative h-[100dvh] z-20 text-customGray overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-b dark:from-transparent from-zinc-100/50 dark:from-40% dark:via-gray-50/10 dark:to-40%  h-screen" />
            <div className='absolute z-0 inset-0  w-full h-full' style={{ background: 'linear-gradient(90deg, var(--custom-black) 0%, rgba(255,246,247,0) 50%, var(--custom-black) 100%)' }} />
            <View className="absolute inset-0 z-[0]">
                <BackgroundHero />
            </View>
            <div
                ref={containerRef}
                className="relative w-full h-screen flex flex-col items-center justify-center"
            >
                {/* Marquee text container */}
                <div className="absolute -z-10 md:top-1/2 md:-translate-y-1/2 top-[25%]  w-full overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        {/* Repeat the text multiple times to ensure continuous flow */}
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center mx-8 text-customGrayDark2">
                                <span className="md:text-[8vw] text-[14vw] font-bold tracking-wider mr-8">IN TOUCH</span>
                                <span className="md:text-[8vw] text-[14vw] font-bold tracking-wider">GET IN </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Eye shape container */}
                <div className="absolute md:top-1/2 md:-translate-y-1/2 top-[25%] w-full">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 1920 1080"
                        preserveAspectRatio="none"
                    >
                        {/* Main eye outline - extended to screen edges */}
                        <motion.path
                            d="M 0,540 C 480,1 1440,1 1920,540 C 1440,1100 480,1100 0,540"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth="5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />


                    </svg>

                    {/* Email text */}
                    <motion.a
                        href="mailto:exovancelab@gmail.com"
                        className="absolute font-bold text-customGrayLight border-b-2 bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 md:text-5xl text-2xl tracking-widest  z-20 cursor-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        exovancelab@gmail.com
                    </motion.a>
                </div>

                {/* Gradient overlays for fade effect */}
            </div>
        </div>
    );
};

export default function ContactPage() {
    return <ContactMarquee />;
}
