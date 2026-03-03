"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
    return (
        <div className="relative py-12">

            {/* Ambient bloom */}
            <div
                className="absolute bottom-0 left-0 w-[700px] h-[500px] opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 10% 100%, #7800ff 0%, transparent 60%)' }}
            />

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
                    Early Access
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-16 items-end mb-16">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl font-bold text-customGrayLight leading-tight tracking-tight mb-4"
                        >
                            Get Early Access
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-customGrayDarker text-lg leading-relaxed max-w-md"
                        >
                            We&rsquo;re pre-revenue. There&rsquo;s no pricing page. If you run a college or know someone who does, reach out directly — we&rsquo;ll scope it with you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 space-y-2"
                        >
                            {[
                                'Free pilot for the first 3 partner colleges',
                                'Full setup and integration support',
                                'Direct line to the engineers building it',
                            ].map((point, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-customGrayDark">
                                    <span className="text-emerald-400/60 mt-0.5 shrink-0">✓</span>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <a
                            href="https://waitlist.exovance.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between px-8 py-5 rounded-2xl bg-white/[0.07] border border-white/[0.1] hover:border-violet-500/30 hover:bg-white/[0.1] transition-all duration-300 group"
                        >
                            <span className="text-customGrayLight font-semibold text-lg">Join the waitlist</span>
                            <span className="text-violet-400/60 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-300 text-xl">&rarr;</span>
                        </a>
                        <a
                            href="mailto:hello@exovance.in"
                            className="inline-flex items-center justify-between px-8 py-4 rounded-2xl border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
                        >
                            <span className="text-customGrayDark text-sm">hello@exovance.in</span>
                            <span className="font-mono text-[9px] tracking-[0.3em] text-violet-400/40 uppercase">Email</span>
                        </a>
                    </motion.div>
                </div>

                {/* Cross-link to AIVA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="border-t border-white/[0.06] pt-10"
                >
                    <p className="text-customGrayDarker text-sm mb-3">Looking for enterprise voice AI?</p>
                    <Link
                        href="/product/aiva"
                        className="inline-flex items-center gap-2 text-customGrayDark hover:text-customGrayLight transition-colors duration-200 group"
                    >
                        <span className="font-semibold">AIVA &mdash; 3D AI voice agents for hotel lobbies, retail, and kiosks</span>
                        <span className="text-violet-400/60 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200">&rarr;</span>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default CTASection;
