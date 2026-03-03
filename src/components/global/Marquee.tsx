"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ROW1 = ['IMAGINE', 'AUTOMATE', 'INVENT', 'SCALE', 'BUILD', 'DEPLOY', 'IMAGINE', 'AUTOMATE', 'INVENT', 'SCALE', 'BUILD', 'DEPLOY'];
const ROW2 = ['AI AGENTS', 'AVATARS', 'EXOVANCE', 'AUTOMATION', 'KIOSKS', 'INTELLIGENCE', 'AI AGENTS', 'AVATARS', 'EXOVANCE', 'AUTOMATION', 'KIOSKS', 'INTELLIGENCE'];

// Indices that get the violet outline treatment instead of filled
const OUTLINE_IDX = new Set([1, 4, 7, 10]);
const OUTLINE_IDX2 = new Set([2, 5, 8, 11]);

const MarqueeScrollText = () => {
    return (
        <div className="relative z-10 w-full overflow-hidden py-6 select-none">

            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />

            {/* Row 1 — scrolls left */}
            <div className="flex overflow-hidden mb-1">
                <motion.div
                    className="flex shrink-0 gap-10 pr-10 whitespace-nowrap items-baseline"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                    {ROW1.map((word, i) =>
                        OUTLINE_IDX.has(i % 6) ? (
                            <span key={i}
                                className="font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight"
                                style={{ WebkitTextStroke: '1px rgba(167,139,250,0.55)', color: 'transparent' }}
                            >{word}</span>
                        ) : (
                            <span key={i}
                                className="font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight text-white/[0.13]"
                            >{word}</span>
                        )
                    )}
                </motion.div>
                {/* duplicate for seamless loop */}
                <motion.div
                    className="flex shrink-0 gap-10 pr-10 whitespace-nowrap items-baseline"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    aria-hidden
                >
                    {ROW1.map((word, i) =>
                        OUTLINE_IDX.has(i % 6) ? (
                            <span key={i}
                                className="font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight"
                                style={{ WebkitTextStroke: '1px rgba(167,139,250,0.55)', color: 'transparent' }}
                            >{word}</span>
                        ) : (
                            <span key={i}
                                className="font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight text-white/[0.13]"
                            >{word}</span>
                        )
                    )}
                </motion.div>
            </div>

            {/* Row 2 — scrolls right (reverse) */}
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex shrink-0 gap-10 pr-10 whitespace-nowrap items-baseline"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                >
                    {ROW2.map((word, i) =>
                        OUTLINE_IDX2.has(i % 6) ? (
                            <span key={i}
                                className="font-display font-bold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none tracking-tight"
                                style={{ WebkitTextStroke: '1px rgba(167,139,250,0.45)', color: 'transparent' }}
                            >{word}</span>
                        ) : (
                            <span key={i}
                                className="font-display font-bold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none tracking-tight text-white/[0.10]"
                            >{word}</span>
                        )
                    )}
                </motion.div>
                <motion.div
                    className="flex shrink-0 gap-10 pr-10 whitespace-nowrap items-baseline"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                    aria-hidden
                >
                    {ROW2.map((word, i) =>
                        OUTLINE_IDX2.has(i % 6) ? (
                            <span key={i}
                                className="font-display font-bold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none tracking-tight"
                                style={{ WebkitTextStroke: '1px rgba(167,139,250,0.45)', color: 'transparent' }}
                            >{word}</span>
                        ) : (
                            <span key={i}
                                className="font-display font-bold text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none tracking-tight text-white/[0.10]"
                            >{word}</span>
                        )
                    )}
                </motion.div>
            </div>

            {/* Bottom hairline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        </div>
    );
};

export default MarqueeScrollText;




                // <svg
                //     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-60"
                //     viewBox="0 0 800 100"
                // >
    
                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`base-${i}`}
                //             d="M 0,50 C 200,30 600,70 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 3,
                //                 delay: i * 0.5,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

   
                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`wave-${i}`}
                //             d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 4,
                //                 delay: i * 0.3,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

        
                //     {[...Array(2)].map((_, i) => (
                //         <motion.path
                //             key={`detail-${i}`}
                //             d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 5,
                //                 delay: i * 0.4,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}
                // </svg>
                // <svg
                //     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[25%] w-full h-60"
                //     viewBox="0 0 800 100"
                // >

                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`base-${i}`}
                //             d="M 0,50 C 200,30 600,70 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 3,
                //                 delay: i * 0.5,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`wave-${i}`}
                //             d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 4,
                //                 delay: i * 0.3,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

            
                //     {[...Array(2)].map((_, i) => (
                //         <motion.path
                //             key={`detail-${i}`}
                //             d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 5,
                //                 delay: i * 0.4,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}
                // </svg>
                // <svg
                //     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] w-full h-60"
                //     viewBox="0 0 800 100"
                // >
    
                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`base-${i}`}
                //             d="M 0,50 C 200,30 600,70 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 3,
                //                 delay: i * 0.5,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

                //     {[...Array(3)].map((_, i) => (
                //         <motion.path
                //             key={`wave-${i}`}
                //             d="M 0,50 C 100,20 200,80 300,50 C 400,20 500,80 600,50 C 700,20 800,80 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 4,
                //                 delay: i * 0.3,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}

                //     {[...Array(2)].map((_, i) => (
                //         <motion.path
                //             key={`detail-${i}`}
                //             d="M 0,50 C 50,40 100,60 150,50 C 200,40 250,60 300,50 C 350,40 400,60 450,50 C 500,40 550,60 600,50 C 650,40 700,60 750,50 C 800,40 850,60 800,50"
                //             stroke={theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                //             strokeWidth="1"
                //             fill="none"
                //             initial={{ pathLength: 0 }}
                //             animate={{
                //                 pathLength: [0, 1],
                //                 pathOffset: [0, 1]
                //             }}
                //             transition={{
                //                 duration: 5,
                //                 delay: i * 0.4,
                //                 repeat: Infinity,
                //                 ease: "linear"
                //             }}
                //         />
                //     ))}
                // </svg>
