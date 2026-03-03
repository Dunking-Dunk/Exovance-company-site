"use client"

import { motion } from 'framer-motion'
import React from 'react';

const capabilities = [
    { id: '01', title: 'Campus Schedule', desc: 'AI timetabling that does in 30 seconds what takes a university 3 weeks.' },
    { id: '02', title: 'Campus Intelligence', desc: 'RAG knowledge agent — every student, teacher, and admin talks to AI that knows their campus live.' },
    { id: '03', title: 'AIVA Voice Agents', desc: '3D AI avatars for sales, billing, and customer service — deployed in enterprise kiosks.' },
    { id: '04', title: 'Automation', desc: 'Workflow automation that eliminates repetitive human work at every operational touchpoint.' },
]

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
        <div className="w-full min-h-screen relative overflow-hidden z-20 bg-[#06060c]/50">

            {/* Top violet separator rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-28 py-28 md:py-40">

                {/* Section header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mb-20 md:mb-28"
                >
                    <motion.p variants={itemVariants} className="font-mono text-[10px] tracking-[0.4em] text-violet-400/60 uppercase mb-6">
                        01 &mdash;&nbsp; What We Do
                    </motion.p>

                    <motion.h2
                        variants={itemVariants}
                        className="font-display font-bold leading-[0.92] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
                    >
                        <span className="block text-customGrayLight">INNOVATE</span>
                        <span className="block">
                            <span className="text-violet-400">THE</span>
                            <span className="text-customGrayLight"> UNSEEN</span>
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left — body copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="space-y-8"
                    >
                        <p className="text-lg md:text-xl leading-[1.85] text-customGrayDark font-light tracking-wide">
                            At <span className="text-customGray font-medium">EXOVANCE</span>, we build AI that works — a campus intelligence suite that makes timetabling, knowledge, and administration instant, and AIVA, our 3D AI voice agent deployed in enterprise kiosks.
                        </p>
                        <p className="text-base md:text-lg leading-[1.85] text-customGrayDarker font-light tracking-wide">
                            Two product lines. One mission: eliminate the slow, manual, and repetitive from every institution and enterprise that dares to move faster.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-4"
                        >
                            <a
                                href="/about"
                                className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-violet-400/70 hover:text-violet-300 transition-colors duration-300 group"
                            >
                                <span>Discover our story</span>
                                <span className="block h-px w-8 bg-violet-400/50 group-hover:w-14 transition-all duration-500" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right — capability cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {capabilities.map((cap) => (
                            <motion.div
                                key={cap.id}
                                variants={itemVariants}
                                className="group relative p-6 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/0 group-hover:from-violet-500/5 transition-all duration-700 rounded-xl pointer-events-none" />
                                <span className="block font-mono text-[9px] tracking-[0.4em] text-violet-400/40 mb-4 uppercase">{cap.id}</span>
                                <h3 className="font-display font-semibold text-base text-customGrayLight mb-2 tracking-wide">{cap.title}</h3>
                                <p className="text-sm leading-relaxed text-customGrayDarker font-light">{cap.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>

            {/* Bottom violet separator rule */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>
    )
}

export default About
