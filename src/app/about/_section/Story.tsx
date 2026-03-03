"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
    {
        dot: 'bg-violet-500',
        label: 'Idea Born',
        body: 'Watched our scheduling coordinator redo the same timetable spreadsheet for the fourth time in a week. Realised no software existed that truly solved this.',
    },
    {
        dot: 'bg-violet-400',
        label: 'Campus Schedule',
        body: 'First proof-of-concept: a CP-SAT solver that generated a valid timetable for our department in under a minute. The 3 weeks → 30 seconds idea became real.',
    },
    {
        dot: 'bg-violet-300',
        label: 'AIVA Concept',
        body: 'Added a second product line — AI voice agents in enterprise kiosks. The same frustration (humans doing work AI should do) but in a different domain.',
    },
    {
        dot: 'bg-white/60',
        label: 'Building MVP — March 2026',
        body: 'Actively developing Campus Schedule and Campus Intelligence. AIVA kiosk hardware and avatar stack in parallel. Pre-revenue, full focus on shipping.',
    },
];

const Story = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-28 py-20">

            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-gray-300/20 dark:border-gray-600/20 rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto">

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    02 &mdash;&nbsp; Our Story
                </motion.p>

                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display font-bold text-4xl md:text-6xl text-customGrayLight mb-4 tracking-tight"
                    >
                        Built Inside the Problem
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="font-mono text-[10px] tracking-[0.4em] text-violet-400/50 uppercase"
                    >
                        We Were Living
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Story Content */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <h3 className="font-display font-semibold text-lg text-customGrayLight mb-4 tracking-wide">
                                The Beginning
                            </h3>
                            <p className="text-base leading-[1.9] text-customGrayDark font-light">
                                We were sitting in timetable revision week, watching our scheduling coordinator redo the same spreadsheet for the fourth time. Every small change cascaded into hours of manual work. No tool solved it. We decided to build one.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <h3 className="font-display font-semibold text-lg text-customGrayLight mb-4 tracking-wide">
                                The Motivation
                            </h3>
                            <p className="text-base leading-[1.9] text-customGrayDark font-light">
                                We weren&rsquo;t building for grades. We were building because the problem was real, the 1,000+ colleges that share it are real, and the students losing time to broken admin are real. That urgency is still what drives every line of code.
                            </p>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative"
                    >
                        <div className="space-y-0">
                            {milestones.map((m, i) => (
                                <div key={i} className="relative pl-8 border-l border-violet-500/20 pb-8 last:pb-0">
                                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${m.dot}`} />
                                    <div className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:border-violet-500/15 transition-all duration-300">
                                        <h4 className="font-display font-semibold text-sm text-customGrayLight mb-2 tracking-wide">{m.label}</h4>
                                        <p className="text-xs leading-relaxed text-customGrayDarker font-light">{m.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Founders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-24"
                >
                    <p className="font-mono text-[9px] tracking-[0.45em] text-violet-400/40 uppercase mb-10">
                        The People Who Built This
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Hursun */}
                        <div className="group p-8 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-500">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="font-display font-bold text-xl text-customGrayLight tracking-tight">Hursun SS</h3>
                                    <p className="font-mono text-[8px] tracking-[0.35em] text-violet-400/55 uppercase mt-1">CEO &amp; Tech Lead</p>
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/hursun-ss-377659233/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-violet-400/40 hover:text-violet-300 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764c.967 0 1.75.79 1.75 1.764s-.783 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.06-1.865-3.06-1.867 0-2.154 1.459-2.154 2.965v5.699h-3v-10h2.878v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.603v5.593z" /></svg>
                                    </a>
                                    <a
                                        href="https://github.com/Dunking-Dunk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-violet-400/40 hover:text-violet-300 transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.019c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.252-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.851.004 1.706.115 2.505.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.202 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.697-4.566 4.945.36.31.678.92.678 1.854 0 1.338-.012 2.418-.012 2.747 0 .267.18.579.688.48A10.022 10.022 0 0 0 22 12.019C22 6.484 17.523 2 12 2Z" clipRule="evenodd" /></svg>
                                    </a>
                                </div>
                            </div>

                            <p className="text-sm leading-[1.85] text-customGrayDark font-light mb-7">
                                Engineering student at <span className="text-customGray">Rajalakshmi Engineering College</span> and president of its largest tech club. Leads every technical decision at Exovance — the CP-SAT timetabling engine, LangGraph RAG agent, AIVA avatar stack, and Flutter app. The person who built what you&rsquo;re looking at right now.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Three.js', 'Django', 'React Native', 'AI & ML', 'IoT'].map((tag) => (
                                    <span key={tag} className="font-mono text-[7px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm border border-violet-500/15 bg-violet-500/[0.04] text-customGrayDarker">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Dhayananth */}
                        <div className="group p-8 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-500">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="font-display font-bold text-xl text-customGrayLight tracking-tight">Dhayananth C</h3>
                                    <p className="font-mono text-[8px] tracking-[0.35em] text-violet-400/55 uppercase mt-1">Co-Founder &amp; Business</p>
                                </div>
                                <div className="flex gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/dhayananth-c/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-violet-400/40 hover:text-violet-300 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764c.967 0 1.75.79 1.75 1.764s-.783 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.06-1.865-3.06-1.867 0-2.154 1.459-2.154 2.965v5.699h-3v-10h2.878v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.603v5.593z" /></svg>
                                    </a>
                                </div>
                            </div>

                            <p className="text-sm leading-[1.85] text-customGrayDark font-light mb-7">
                                <span className="text-customGray">AIML student at SRM University</span>. Owns the business side of Exovance — market positioning, college outreach, and the product decisions that translate engineering into something an institution will actually sign up for.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'UX', 'AIML', 'Product'].map((tag) => (
                                    <span key={tag} className="font-mono text-[7px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm border border-violet-500/15 bg-violet-500/[0.04] text-customGrayDarker">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Closing line */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 border-t border-violet-500/10 pt-10"
                >
                    <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/45 uppercase">
                        Tamil Nadu, India &mdash; 2026
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Story;
