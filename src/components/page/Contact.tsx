"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ContactMarquee = () => {
    const containerRef = React.useRef(null);

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
        <div className="relative min-h-[100vh] z-10 text-customGray overflow-hidden">
            <div
                ref={containerRef}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center"
            >
                {/* Marquee text container */}
                <div className="absolute z-10 top-1/2 -translate-y-1/2 w-full overflow-hidden">
                    <motion.div 
                        className="flex whitespace-nowrap"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        {/* Repeat the text multiple times to ensure continuous flow */}
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center mx-8 text-customGrayDark2">
                                <span className="text-[8vw] font-bold tracking-wider mr-8">IN TOUCH</span>
                                <span className="text-[8vw] font-bold tracking-wider">GET IN </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Eye shape container */}
                <div className="relative w-full">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 1920 1080"
                        preserveAspectRatio="none"
                    >
                        {/* Main eye outline - extended to screen edges */}
                        <motion.path
                            d="M 0,540 C 480,1 1440,1 1920,540 C 1440,1100 480,1100 0,540"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                    
                    </svg>

                    {/* Email text */}
                    <motion.a
                        href="mailto:exovance@gmail.com"
                        className="absolute font-bold text-customGrayLight border-b-2 bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl tracking-widest hover:text-gray-300 transition-colors z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        exovance@gmail.com
                    </motion.a>
                </div>

                {/* Gradient overlays for fade effect */}
                <div className='absolute z-20 inset-0 w-full h-full pointer-events-none' 
                     style={{ background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,1) 100%)' }} />
            </div>
        </div>
    );
};

export default function ContactPage() {
    return <ContactMarquee />;
}
