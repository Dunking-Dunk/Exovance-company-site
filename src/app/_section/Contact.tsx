"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const highlights = [
    { title: 'AI Agents', desc: 'Autonomous virtual agents that sell, support, and serve â€” 24 / 7.' },
    { title: 'Automation', desc: 'Workflow automation and process optimisation at every touchpoint.' },
    { title: 'Advisory', desc: 'Exploratory sessions to align goals and de-risk delivery.' },
];

const ContactSection = () => {
    return (
        <section className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-28 z-20 overflow-hidden">

            {/* Ambient bloom */}
            <div className="absolute bottom-0 right-0 w-[700px] h-[500px] opacity-[0.07] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 85% 100%, #7800ff 0%, transparent 60%)' }} />

            {/* Top rule */}
            <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-end">

                {/* Left â€” headline block */}
                <div>
                    <motion.p
                        className="font-mono text-[10px] tracking-[0.5em] uppercase text-violet-400/50 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        04 &mdash;&nbsp; Get in touch
                    </motion.p>

                    <motion.h2
                        className="font-display font-bold leading-[0.88] tracking-tight text-[clamp(3rem,8vw,6.5rem)] text-customGrayLight mb-8"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block">LET'S</span>
                        <span className="block text-violet-400">COLLABORATE</span>
                        <span className="block">ON WHAT'S NEXT.</span>
                    </motion.h2>

                    <motion.p
                        className="max-w-xl text-base md:text-lg leading-relaxed text-customGrayDark font-light mb-10"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Have a problem to solve or an idea to explore? Whether you want to build, automate, or simply understand what's possible â€” we'd love to talk.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-violet-600/80 hover:bg-violet-500/90 text-white text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-violet-900/20"
                        >
                            Start a project
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-violet-500/25 hover:border-violet-400/50 text-customGrayLight hover:text-violet-200 text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300"
                        >
                            Know more
                        </Link>
                    </motion.div>

                    {/* Quick contact */}
                    <motion.div
                        className="mt-10 flex flex-col sm:flex-row gap-4 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <a href="mailto:exovancelab@gmail.com" className="font-mono text-[10px] tracking-[0.3em] text-violet-400/50 hover:text-violet-300 transition-colors uppercase">exovancelab@gmail.com</a>
                        <span className="hidden sm:inline text-violet-500/20">/</span>
                        <a href="tel:+918056201341" className="font-mono text-[10px] tracking-[0.3em] text-violet-400/50 hover:text-violet-300 transition-colors uppercase">+91 80562 01341</a>
                    </motion.div>
                </div>

                {/* Right â€” capability cards */}
                <motion.div
                    className="grid grid-cols-1 gap-3 min-w-[260px] lg:min-w-[300px]"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                >
                    {highlights.map((h, i) => (
                        <div key={h.title}
                            className="p-5 rounded-xl border border-violet-500/10 bg-violet-500/[0.03] hover:border-violet-500/20 hover:bg-violet-500/[0.05] transition-all duration-400"
                        >
                            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-violet-400/40 block mb-2">0{i + 1}</span>
                            <h4 className="font-display font-semibold text-sm text-customGrayLight mb-1">{h.title}</h4>
                            <p className="text-xs leading-relaxed text-customGrayDark">{h.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
