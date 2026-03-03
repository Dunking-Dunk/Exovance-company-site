"use client";

import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
    {
        id: '01',
        who: 'Student',
        query: '"When is my next exam?"',
        answer: 'Pulls from the live schedule, cross-references your registered courses, gives the exact slot and room.',
    },
    {
        id: '02',
        who: 'Teacher',
        query: '"Is Room 204 free on Thursday at 10 AM?"',
        answer: 'Real-time room availability from the active timetable. No back-and-forth with admin.',
    },
    {
        id: '03',
        who: 'Admin',
        query: '"What does the attendance policy say about medical leave?"',
        answer: 'RAG over college handbooks, regulation PDFs, circular archives — with an actual cited answer.',
    },
];

const IntelligenceModule = () => {
    return (
        <div className="relative">

            {/* Top hairline */}
            <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent mb-16" />

            {/* Ambient bloom */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 80% 0%, #7800ff 0%, transparent 60%)' }}
            />

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
            >
                02 &mdash;&nbsp; Module Two
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Left — use cases */}
                <div className="space-y-4 order-2 lg:order-1">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs text-customGrayDarker uppercase tracking-widest mb-6"
                    >
                        Live queries it can answer
                    </motion.p>

                    {useCases.map((u, i) => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.09 }}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-violet-500/20 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-mono text-[9px] tracking-[0.3em] text-violet-400/40 uppercase">{u.id}</span>
                                <span className="text-xs text-customGrayDarker bg-white/[0.05] px-2 py-0.5 rounded-full">{u.who}</span>
                            </div>
                            <p className="text-customGrayLight font-medium text-sm mb-2">{u.query}</p>
                            <p className="text-customGrayDarker text-sm leading-relaxed">{u.answer}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Right — explanation */}
                <div className="order-1 lg:order-2">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl font-bold text-customGrayLight leading-tight tracking-tight mb-6"
                    >
                        Campus Intelligence
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-5 text-customGrayDark leading-relaxed"
                    >
                        <p>
                            Every campus has a WhatsApp group where students ask the same 10 questions. Nobody has the full picture. Answers contradict. Important info gets buried.
                        </p>
                        <p>
                            Campus Intelligence is a{' '}
                            <span className="text-customGrayLight font-medium">RAG agent</span>{' '}
                            that's different from generic chatbots because it's{' '}
                            <span className="text-customGrayLight font-medium">live-schedule-aware</span>
                            {' '}— it knows the current timetable, not just static PDFs. It also ingests your college's handbooks, circulars, and regulation documents.
                        </p>
                        <p>
                            Students get real answers. Teachers get real-time room data. Admins stop fielding repeat queries.
                        </p>
                    </motion.div>

                    {/* What makes it different */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mt-10 space-y-3"
                    >
                        <p className="font-mono text-[9px] tracking-[0.35em] text-violet-400/40 uppercase">What makes it different</p>
                        {[
                            'Knows your live timetable — not just uploaded docs',
                            'Connects schedule data with policy documents in one query',
                            'Built for Indian college naming conventions and exam structures',
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-customGrayDark">
                                <span className="text-violet-400/50 mt-0.5 shrink-0">—</span>
                                <span>{point}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default IntelligenceModule;
