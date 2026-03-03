"use client";

import React from 'react';
import { motion } from 'framer-motion';

const structures = [
    {
        id: '01',
        label: 'FFCS / VIT-style',
        desc: 'Fully Flexible Credit System — student-selected slots, faculty-load balancing, room utilization. The hardest structure to automate. We handle it.',
    },
    {
        id: '02',
        label: 'Hybrid',
        desc: 'Mix of fixed department timetables and elective slot-picking. Common in autonomous colleges across Tamil Nadu.',
    },
    {
        id: '03',
        label: 'Traditional',
        desc: 'Full department-assigned schedules. Standard across Anna University affiliates. Full constraint resolution in seconds.',
    },
];

const ScheduleModule = () => {
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
                01 &mdash;&nbsp; Module One
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Left — explanation */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl font-bold text-customGrayLight leading-tight tracking-tight mb-6"
                    >
                        Campus Schedule
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-5 text-customGrayDark leading-relaxed"
                    >
                        <p>
                            A coordinator today rebuilds the timetable every semester by hand — on a spreadsheet, sometimes for 3 weeks. One room changes and the whole grid breaks.
                        </p>
                        <p>
                            Campus Schedule uses a{' '}
                            <span className="text-customGrayLight font-medium">CP-SAT constraint solver</span>{' '}
                            (the same class of tool Google uses for resource scheduling) wrapped in a{' '}
                            <span className="text-customGrayLight font-medium">LangGraph agent</span>{' '}
                            that ingests your college's constraints — faculty availability, room capacities, department rules — and generates a conflict-free timetable in under 30 seconds.
                        </p>
                        <p className="text-customGrayDarker text-sm">
                            No manual entry beyond the initial setup. When one room changes, it regenerates.
                        </p>
                    </motion.div>

                    {/* Proof point stat */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-10 inline-block rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] px-8 py-6"
                    >
                        <p className="text-5xl font-bold text-customGrayLight mb-1">30s</p>
                        <p className="text-sm text-customGrayDarker">vs. 3 weeks on a spreadsheet</p>
                    </motion.div>
                </div>

                {/* Right — structures */}
                <div className="space-y-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs text-customGrayDarker uppercase tracking-widest mb-6"
                    >
                        Structures supported
                    </motion.p>
                    {structures.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-violet-500/20 transition-colors duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <p className="font-mono text-[10px] tracking-[0.3em] text-violet-400/40 uppercase mt-1 shrink-0">{s.id}</p>
                                <div>
                                    <h3 className="text-base font-semibold text-customGrayLight mb-2">{s.label}</h3>
                                    <p className="text-customGrayDarker text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScheduleModule;
