"use client";

import React from "react";
import { motion } from "framer-motion";

const pillars = [
    {
        id: '01',
        label: 'The Problem',
        body: 'Indian engineering colleges spend 3 weeks building timetables on spreadsheets. Students can\'t get straight answers from admin. Enterprises burn human hours on work that AI should handle.',
    },
    {
        id: '02',
        label: 'The Products',
        body: 'Campus Suite — AI timetabling and live knowledge agents for every college. AIVA — 3D AI voice agents deployed in enterprise kiosks for sales, billing, and customer service.',
    },
    {
        id: '03',
        label: 'The Scale',
        body: 'Over 1,000 engineering colleges in India share the exact same timetable problem. Every one of them is a potential Campus Suite deployment.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const Mission = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-28 py-32 z-[1]">

            {/* Faint violet top bloom */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(100,0,200,0.06) 0%, transparent 100%)' }} />

            <div className="relative z-10 w-full max-w-6xl mx-auto">

                {/* Label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    01 &mdash;&nbsp; Why We Exist
                </motion.p>

                {/* Main quote */}
                <motion.h2
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-customGrayLight leading-[1.25] tracking-tight mb-20 max-w-4xl"
                >
                    &ldquo;We&rsquo;re engineering students who decided to solve the real problems we lived inside &mdash; broken timetables, unanswered admin queries, and human effort wasted on work that AI should be doing.&rdquo;
                </motion.h2>

                {/* Three pillars */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {pillars.map((p) => (
                        <motion.div
                            key={p.id}
                            variants={itemVariants}
                            className="group p-8 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-500"
                        >
                            <span className="block font-mono text-[9px] tracking-[0.45em] text-violet-400/40 uppercase mb-4">{p.id}</span>
                            <h3 className="font-display font-semibold text-sm text-violet-300/80 uppercase tracking-widest mb-4">{p.label}</h3>
                            <p className="text-sm leading-[1.9] text-customGrayDark font-light">{p.body}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Mission;
