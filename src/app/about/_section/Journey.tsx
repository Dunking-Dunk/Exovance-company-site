"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const buildStages = [
    { id: '01', status: 'SHIPPING', label: 'Campus Schedule', desc: 'CP-SAT timetabling engine + LangGraph agent. Handles FFCS, Hybrid, and Traditional structures.' },
    { id: '02', status: 'MONTH 2', label: 'Campus Intelligence', desc: 'RAG knowledge agent with live schedule awareness. Every student and teacher gets an AI that knows their campus.' },
    { id: '03', status: 'PARALLEL', label: 'AIVA Kiosk', desc: '3D AI voice agent avatar stack + Enterprise kiosk hardware. Sales, billing, and customer service without a human.' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const Journey = () => {
    return (
        <section className="relative w-full px-6 md:px-12 lg:px-28 py-28 md:py-40 z-10 overflow-hidden">

            {/* Top hairline */}
            <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />

            {/* Ambient bloom */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[400px] opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 15% 100%, #7800ff 0%, transparent 60%)' }} />

            <div className="relative z-10 max-w-6xl mx-auto">

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    03 &mdash;&nbsp; What We&rsquo;re Building
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">

                    {/* Left — headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="font-display font-bold leading-[0.92] tracking-tight text-5xl md:text-6xl lg:text-7xl mb-8">
                            <span className="block text-customGrayLight">PRE-REVENUE.</span>
                            <span className="block text-violet-400">FULL BUILD.</span>
                        </h2>
                        <p className="text-base leading-[1.85] text-customGrayDark font-light max-w-md">
                            We&rsquo;re students shipping real product. No funding, no agency work, no detours. Just two product lines solving problems we lived through — still in college while building them.
                        </p>
                    </motion.div>

                    {/* Right — CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: 0.2 }}
                        className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-start"
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-violet-600/80 hover:bg-violet-500/90 text-white text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-violet-900/20 group"
                        >
                            Get Early Access — Campus Suite
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-violet-500/25 hover:border-violet-400/50 text-customGrayLight hover:text-violet-200 text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 group"
                        >
                            Deploy AIVA at Your Location
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>

                {/* Build stage cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {buildStages.map((s) => (
                        <motion.div
                            key={s.id}
                            variants={itemVariants}
                            className="group p-7 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-400"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <span className="font-mono text-[9px] tracking-[0.4em] text-violet-400/40 uppercase">{s.id}</span>
                                <span className="font-mono text-[7px] tracking-[0.4em] text-violet-400/60 uppercase px-2 py-1 rounded-sm border border-violet-500/20 bg-violet-500/[0.06]">{s.status}</span>
                            </div>
                            <h3 className="font-display font-semibold text-sm text-customGrayLight mb-3 tracking-wide">{s.label}</h3>
                            <p className="text-xs leading-relaxed text-customGrayDarker font-light">{s.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Journey;

  