"use client";

import React from "react";
import { motion } from "framer-motion";

const values = [
    {
        id: "01",
        title: "Build for India First",
        desc: "Solve India's problems with India's constraints in mind. Not a Silicon Valley MVP adapted for the subcontinent — built here, for here.",
    },
    {
        id: "02",
        title: "Ship Before You're Ready",
        desc: "Done is better than perfect. We'd rather put real software in front of real users than polish something no one's seen yet.",
    },
    {
        id: "03",
        title: "Student-Built, Not Student-Sized",
        desc: "We're students. The problems we're solving aren't. 1,000+ engineering colleges. Millions of students. The stakes are real.",
    },
    {
        id: "04",
        title: "Every Campus Deserves AI",
        desc: "Not just the IITs. Tier-2 and Tier-3 colleges have the same 3-week timetable problem. We're building for all of them.",
    },
];

const CultureValues = () => {
    return (
        <section className="relative w-full px-6 md:px-12 lg:px-28 py-28 md:py-40 overflow-hidden">

            {/* Top hairline */}
            <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />

            {/* Ambient bloom */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 80% 100%, #7800ff 0%, transparent 60%)' }} />

            <div className="relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-10"
                >
                    02 &mdash;&nbsp; How We Work
                </motion.p>

                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-3">
                        Our DNA
                    </h2>
                    <p className="text-customGrayDarker text-lg max-w-xl">
                        The principles that shape how we build and ship.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 hover:border-violet-500/20 transition-colors duration-300"
                        >
                            <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/40 uppercase mb-5">{v.id}</p>
                            <h3 className="text-2xl font-semibold text-customGrayLight mb-3 leading-tight">{v.title}</h3>
                            <p className="text-customGray text-sm leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CultureValues;


