import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

const MarqueeScrollText = () => {
    const containerRef = React.useRef(null);
    const { theme } = useTheme()
 
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

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
        <div
            ref={containerRef}
            className="relative z-10 w-full mt-24 flex flex-col items-center justify-center overflow-hidden"
        >

            <motion.div
                className="relative w-full px-4">
                <div className='absolute z-20 inset-0  w-full h-full' style={{ background: 'linear-gradient(90deg, var(--custom-black) 0%, rgba(255,246,247,0) 50%, var(--custom-black) 100%)' }} />
                {/* Enhanced Background curves */}
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-60"
                    viewBox="0 0 800 100"
                >
                    {/* Base curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`base-${i}`}
                            d="M 0,50 C 200,30 600,70 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Additional interweaving curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`wave-${i}`}
                            d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 4,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Tighter curves for more detail */}
                    {[...Array(2)].map((_, i) => (
                        <motion.path
                            key={`detail-${i}`}
                            d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 5,
                                delay: i * 0.4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </svg>
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[25%] w-full h-60"
                    viewBox="0 0 800 100"
                >
                    {/* Base curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`base-${i}`}
                            d="M 0,50 C 200,30 600,70 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Additional interweaving curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`wave-${i}`}
                            d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 4,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Tighter curves for more detail */}
                    {[...Array(2)].map((_, i) => (
                        <motion.path
                            key={`detail-${i}`}
                            d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 5,
                                delay: i * 0.4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </svg>
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] w-full h-60"
                    viewBox="0 0 800 100"
                >
                    {/* Base curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`base-${i}`}
                            d="M 0,50 C 200,30 600,70 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Additional interweaving curves */}
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={`wave-${i}`}
                            d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 4,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Tighter curves for more detail */}
                    {[...Array(2)].map((_, i) => (
                        <motion.path
                            key={`detail-${i}`}
                            d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                            stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                pathOffset: [0, 1]
                            }}
                            transition={{
                                duration: 5,
                                delay: i * 0.4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </svg>

                {/* Marquee container */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex space-x-32 whitespace-nowrap"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">IMAGINE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">INVENT</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">EXOVANCE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">IMAGINE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">INVENT</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">EXOVANCE</span>
                    </motion.div>

                    <motion.div
                        className="flex space-x-20 whitespace-nowrap"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">IMAGINE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">INVENT</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">EXOVANCE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">IMAGINE</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">INVENT</span>
                        <span className="text-customGrayLight md:text-9xl text-5xl font-light tracking-wider">EXOVANCE</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default MarqueeScrollText;