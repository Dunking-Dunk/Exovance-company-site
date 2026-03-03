"use client";

import React from 'react';
import { motion } from 'framer-motion';

const comingModules = [
    {
        id: '03',
        status: 'COMING SOON',
        label: 'Campus Place',
        desc: 'AI-assisted job board, placement drives, and company-student matching — built for the placement cell, not just the student.',
        tags: ['Placement Drive', 'Company Matching', 'Resume Screening'],
    },
    {
        id: '04',
        status: 'COMING SOON',
        label: 'Campus Hostel',
        desc: 'Hostel allocation, room booking, and complaint management — replacing the spreadsheets and handwritten registers that most hostels still run on.',
        tags: ['Room Allocation', 'Booking Flow', 'Admin Dashboard'],
    },
    {
        id: '05',
        status: 'PIPELINE',
        label: 'More Modules',
        desc: 'Fee management, attendance AI, transport tracking, library systems. Campus Suite is a platform — not a single tool. Every broken process is a module waiting to be built.',
        tags: ['Fee Management', 'Attendance AI', 'Transport', 'Library'],
    },
];

const ComingModules = () => {
    return (
        <div className="relative">

            {/* Top hairline */}
            <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent mb-16" />

            {/* Ambient bloom */}
            <div
                className="absolute top-0 left-0 w-[600px] h-[400px] opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 10% 0%, #7800ff 0%, transparent 60%)' }}
            />

            <div className="relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    04 &mdash;&nbsp; What&rsquo;s Next
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl font-bold text-customGrayLight leading-tight tracking-tight mb-4"
                        >
                            More modules<br />are coming.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-customGrayDark leading-relaxed max-w-md"
                        >
                            Campus Suite isn&rsquo;t a product — it&rsquo;s a platform. Every broken process in an Indian engineering college is a module. We&rsquo;re building them one by one.
                        </motion.p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                    {comingModules.map((m, i) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
                        >
                            {/* Status badge */}
                            <span className={`absolute top-5 right-5 font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1 rounded ${
                                m.status === 'PIPELINE'
                                    ? 'text-customGrayDarker/60 bg-white/[0.04]'
                                    : 'text-amber-400/70 bg-amber-400/10'
                            }`}>
                                {m.status}
                            </span>

                            <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/40 uppercase mb-4">{m.id}</p>
                            <h3 className="text-xl font-semibold text-customGrayLight mb-3 leading-tight">{m.label}</h3>
                            <p className="text-customGrayDarker text-sm leading-relaxed mb-5">{m.desc}</p>

                            <div className="flex flex-wrap gap-2">
                                {m.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[8px] tracking-[0.25em] uppercase px-2 py-1 rounded-sm border border-white/[0.06] text-customGrayDarker"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComingModules;
