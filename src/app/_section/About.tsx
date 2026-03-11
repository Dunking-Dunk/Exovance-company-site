"use client"

import { motion } from 'framer-motion'
import React from 'react';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const About = () => {
    return (
        <div className="w-full min-h-screen relative overflow-hidden z-20">

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-28 py-28 md:py-40 flex flex-col justify-center min-h-screen">

                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.4em] text-violet-400/60 uppercase mb-8"
                >
                    01 &mdash;&nbsp; What We Do
                </motion.p>

                {/* Headline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mb-12"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="font-display font-bold leading-[0.92] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
                    >
                        <span className="block text-white">INNOVATE</span>
                        <span className="block">
                            <span className="text-violet-400">THE</span>
                            <span className="text-white"> UNSEEN</span>
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Description + CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col gap-8 max-w-2xl"
                >
                    <p className="text-xl md:text-2xl leading-[1.7] text-white/70 font-semibold tracking-wide">
                        We build AI that <span className="text-white">eliminates the slow</span>, manual, and repetitive — from every campus and enterprise that dares to move faster.
                    </p>

                    <a
                        href="/about"
                        className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-violet-400/70 hover:text-violet-300 transition-colors duration-300 group w-fit"
                    >
                        <span>Discover our story</span>
                        <span className="block h-px w-8 bg-violet-400/50 group-hover:w-14 transition-all duration-500" />
                    </a>
                </motion.div>

            </div>

        </div>
    )
}

export default About
