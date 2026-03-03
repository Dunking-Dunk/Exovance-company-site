"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Spotlight2 } from '@/components/ui/spotlight2';

const HeroSection = () => {
    return (
        <div className="relative max-w-7xl mx-auto py-10 md:py-20">
            <Spotlight2 className="absolute top-10" />

            <div className="relative z-10 max-w-4xl">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="font-mono text-[10px] tracking-[0.5em] text-violet-400/50 uppercase mb-8"
                >
                    Exovance &mdash; Product 01 &middot; Campus Suite
                </motion.p>

                {/* Proof point */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/[0.05]"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="font-mono text-xs text-emerald-400/80 tracking-wide">Shipping now — early access open</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-customGrayLight leading-[0.95] tracking-tight mb-6"
                >
                    3 weeks{' '}
                    <span className="text-customGrayDarker">&rarr;</span>{' '}
                    <span className="text-customGrayLight">30 seconds.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl md:text-2xl text-customGrayDark leading-relaxed max-w-2xl mb-4"
                >
                    AI timetabling for Indian engineering colleges.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.28 }}
                    className="text-base text-customGrayDarker leading-relaxed max-w-xl mb-12"
                >
                    Campus Suite is two AI modules built for the specific scheduling constraints of Indian engineering colleges — FFCS, hybrid, and traditional structures. The timetable that used to take 3 weeks of coordinator effort now takes 30 seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a
                        href="https://waitlist.exovance.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.08] border border-white/[0.1] text-customGrayLight font-semibold hover:bg-white/[0.13] hover:border-violet-500/30 transition-all duration-300 group"
                    >
                        Get Early Access
                        <span className="text-violet-400/60 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-300">&rarr;</span>
                    </a>
                    <p className="inline-flex items-center text-sm text-customGrayDarker self-center">
                        Pre-revenue &mdash; waitlist only
                    </p>
                </motion.div>

                {/* Modules brief */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex flex-col sm:flex-row gap-6 border-t border-white/[0.06] pt-10"
                >
                    <div>
                        <p className="font-mono text-[9px] tracking-[0.3em] text-violet-400/40 uppercase mb-1">Module 01</p>
                        <p className="text-customGrayLight font-semibold">Campus Schedule</p>
                        <p className="text-xs text-customGrayDarker mt-1">CP-SAT solver + LangGraph agent</p>
                    </div>
                    <div className="hidden sm:block w-px bg-white/[0.06]" />
                    <div>
                        <p className="font-mono text-[9px] tracking-[0.3em] text-violet-400/40 uppercase mb-1">Module 02</p>
                        <p className="text-customGrayLight font-semibold">Campus Intelligence</p>
                        <p className="text-xs text-customGrayDarker mt-1">RAG agent · live schedule-aware</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
