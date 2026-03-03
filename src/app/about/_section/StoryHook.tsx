"use client";

import React from "react";
import { motion } from "framer-motion";

const lines = [
    "8 AM to 3 PM. Continuous classes. No free hour. No flexibility. No choice.",
    "Had a question? Ask five people. Get six answers.\nNo one had the full picture.",
    "The coordinator was redoing the timetable spreadsheet.\nAgain. Because one room changed.",
    "No software solved this.\nSo we decided to build one.",
];

const StoryHook = () => {
    return (
        <section className="relative w-full px-6 md:px-12 lg:px-28 py-28 md:py-40 overflow-hidden">

            {/* Ambient bloom */}
            <div
                className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(100,0,200,0.06) 0%, transparent 100%)' }}
            />

            {/* Left rule */}
            <div className="absolute left-6 md:left-12 lg:left-28 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />

            <div className="relative z-10 max-w-3xl pl-6">

                {/* Label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.5em] text-violet-400/40 uppercase mb-14"
                >
                    The moment it started
                </motion.p>

                {/* Lines — scroll to white */}
                <div className="space-y-10">
                    {lines.map((line, i) => {
                        const isLast = i === lines.length - 1;
                        return (
                            <motion.p
                                key={i}
                                initial={{ color: "#2a2a38" }}
                                whileInView={{ color: isLast ? "#e8e8f0" : "#9898aa" }}
                                viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="font-display font-bold tracking-tight text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.3] whitespace-pre-line"
                            >
                                {isLast ? (
                                    <>
                                        <motion.span
                                            initial={{ color: "#2a2a38" }}
                                            whileInView={{ color: "#606070" }}
                                            viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            {"No software solved this.\n"}
                                        </motion.span>
                                        <motion.span
                                            initial={{ color: "#2a2a38" }}
                                            whileInView={{ color: "#e8e8f0" }}
                                            viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                        >
                                            So we decided to build one.
                                        </motion.span>
                                    </>
                                ) : line}
                            </motion.p>
                        );
                    })}
                </div>

                {/* Pull quote */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 pt-10 border-t border-violet-500/10"
                >
                    <p className="font-display font-semibold text-base md:text-lg text-customGrayLight leading-[1.75] max-w-xl">
                        &ldquo;We&rsquo;re building the AI that should have existed when we were sitting in those 8 AM classes.&rdquo;
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.35em] text-violet-400/40 uppercase mt-4">
                        Hursun SS &amp; Dhayananth C &mdash; Co-Founders
                    </p>
                </motion.div>

            </div>

        </section>
    );
};

export default StoryHook;


