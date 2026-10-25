"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FinalCTASection = () => {
    return (
        <div className="relative py-12">

            {/* Ambient bloom */}
            <div className="absolute bottom-0 left-0 w-[700px] h-[400px] opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 10% 100%, #8a8a8a 0%, transparent 60%)' }} />

            <div className="relative z-10">

                {/* Top hairline */}
                <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent mb-16" />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-8"
                >
                    Deploy
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold text-customGrayLight leading-tight tracking-tight mb-4"
                        >
                            Deploy AIVA at<br />Your Location
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-customGrayDarker text-lg leading-relaxed max-w-md"
                        >
                            We&rsquo;re taking early deployment partners now. Hotel lobby, hospital reception, retail floor, admission kiosk &mdash; we&rsquo;ll scope and ship.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between px-8 py-5 rounded-2xl bg-white/[0.07] border border-white/[0.1] hover:border-violet-500/30 hover:bg-white/[0.1] transition-all duration-300 group"
                        >
                            <span className="text-customGrayLight font-semibold text-lg">Get in touch to deploy</span>
                            <span className="text-violet-400/60 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300 text-xl">&rarr;</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Cross-link to Campus Suite */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="border-t border-white/[0.06] pt-10"
                >
                    <p className="text-customGrayDarker text-sm mb-3">Looking for campus AI?</p>
                    <Link
                        href="/product/campus-suite"
                        className="inline-flex items-center gap-2 text-customGrayDark hover:text-customGrayLight transition-colors duration-200 group"
                    >
                        <span className="font-semibold">Campus Suite &mdash; AI timetabling for Indian engineering colleges</span>
                        <span className="text-violet-400/60 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200">&rarr;</span>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default FinalCTASection;
