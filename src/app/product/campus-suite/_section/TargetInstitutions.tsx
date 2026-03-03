"use client";

import React from 'react';
import { motion } from 'framer-motion';

const institutions = [
    { name: 'VIT', note: 'FFCS structure', location: 'Vellore & Chennai' },
    { name: 'SRM University', note: 'Slot-based hybrid', location: 'Kattankulathur, Chennai' },
    { name: 'BIHER', note: 'Traditional + electives', location: 'Chennai' },
    { name: 'CIT', note: 'Traditional structure', location: 'Coimbatore' },
    {
        name: 'Anna University Affiliates',
        note: 'Traditional structure',
        location: '500+ colleges across Tamil Nadu',
    },
    {
        name: 'Your College',
        note: 'FFCS · Hybrid · Traditional',
        location: 'Anywhere in India',
        highlight: true,
    },
];

const TargetInstitutions = () => {
    return (
        <div className="relative">

            {/* Top hairline */}
            <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent mb-16" />

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
            >
                03 &mdash;&nbsp; Built For
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl font-bold text-customGrayLight leading-tight tracking-tight mb-4"
                    >
                        Target Institutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-customGrayDark leading-relaxed max-w-md"
                    >
                        Over 1,000 engineering colleges in India share the exact same timetabling problem. We're starting in Tamil Nadu because that's where we built this — and scaling outward.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.03] p-6"
                >
                    <p className="font-mono text-[9px] tracking-[0.3em] text-violet-400/50 uppercase mb-3">The market</p>
                    <p className="text-4xl font-bold text-customGrayLight mb-1">1,000+</p>
                    <p className="text-sm text-customGrayDarker">engineering colleges in India</p>
                    <div className="h-px bg-white/[0.06] my-4" />
                    <p className="text-3xl font-bold text-customGrayLight mb-1">~3 weeks</p>
                    <p className="text-sm text-customGrayDarker">average timetable build time per semester</p>
                </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutions.map((inst, i) => (
                    <motion.div
                        key={inst.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className={`rounded-2xl border p-6 transition-colors duration-300 ${
                            inst.highlight
                                ? 'border-violet-500/30 bg-violet-500/[0.05] hover:border-violet-500/50'
                                : 'border-white/[0.06] bg-white/[0.02] hover:border-violet-500/20'
                        }`}
                    >
                        <h3 className={`text-lg font-semibold mb-1 ${inst.highlight ? 'text-violet-300' : 'text-customGrayLight'}`}>
                            {inst.name}
                        </h3>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-violet-400/50 uppercase mb-2">{inst.note}</p>
                        <p className="text-xs text-customGrayDarker">{inst.location}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TargetInstitutions;
