"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const openRoles = [
    {
        id: "01",
        title: "Flutter Developer",
        stack: "Flutter · Dart · Isar DB",
        desc: "Build the mobile-first experience for Campus Suite. Students will use this every day.",
    },
    {
        id: "02",
        title: "Backend Engineer",
        stack: "FastAPI · asyncpg · PostgreSQL",
        desc: "Own the API layer. High-throughput, async, and production-grade from day one.",
    },
    {
        id: "03",
        title: "ML / AI Engineer",
        stack: "LangGraph · OR-Tools · Python",
        desc: "Work on the scheduling engine and the LangGraph agent pipeline that powers Campus Intelligence.",
    },
    {
        id: "04",
        title: "Timetabling Domain Expert",
        stack: "FFCS · Hybrid structures · Academic scheduling",
        desc: "Know how FFCS, slot-based, or hybrid timetabling actually works at the college level? We need you.",
    },
];

const JoinTeam = () => {
    return (
        <section className="relative w-full px-6 md:px-12 lg:px-28 py-28 md:py-40 overflow-hidden">

            {/* Top hairline */}
            <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />

            {/* Ambient bloom */}
            <div className="absolute bottom-0 left-0 w-[700px] h-[500px] opacity-[0.05] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 10% 100%, #7800ff 0%, transparent 60%)' }} />

            <div className="relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    03 &mdash;&nbsp; Open Roles
                </motion.p>

                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold text-customGrayLight mb-4"
                    >
                        Open Roles
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-customGrayDarker text-base md:text-lg leading-relaxed max-w-2xl"
                    >
                        We&rsquo;re students building real products. We don&rsquo;t pay well yet. But you&rsquo;ll ship things that go to real colleges with real users.
                    </motion.p>
                </div>

                {/* Roles grid */}
                <div className="grid md:grid-cols-2 gap-5 mb-16">
                    {openRoles.map((role, i) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 hover:border-violet-500/20 transition-colors duration-300"
                        >
                            {/* OPEN badge */}
                            <span className="absolute top-6 right-6 font-mono text-[8px] tracking-[0.3em] text-emerald-400/70 bg-emerald-400/10 px-2 py-1 rounded uppercase">
                                Open
                            </span>
                            <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/40 uppercase mb-4">{role.id}</p>
                            <h3 className="text-2xl font-semibold text-customGrayLight mb-2 leading-tight">{role.title}</h3>
                            <p className="font-mono text-xs text-violet-400/50 mb-5">{role.stack}</p>
                            <p className="text-customGray text-sm leading-relaxed">{role.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA panel */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.03] p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/50 uppercase mb-3">Get in touch</p>
                        <p className="text-customGrayLight font-semibold text-lg md:text-xl max-w-md leading-snug">
                            Build something real. Ship to real colleges. Start now.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                        <a
                            href="mailto:careers@exovance.in"
                            className="inline-flex px-6 py-3 rounded-full bg-white/10 text-customGrayLight hover:bg-white/20 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                            careers@exovance.in
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex px-6 py-3 rounded-full border border-white/[0.12] text-customGrayDark hover:text-customGrayLight hover:border-white/20 transition-colors text-sm whitespace-nowrap"
                        >
                            Contact page &rarr;
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default JoinTeam;


