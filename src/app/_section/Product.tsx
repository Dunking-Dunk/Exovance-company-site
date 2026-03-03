"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const products = [
    {
        id: '01',
        name: 'Campus Suite',
        tagline: 'EdTech · Indian Universities · Agentic AI',
        description: 'Campus Schedule rewrites the timetable in 30 seconds. Campus Intelligence gives every student, teacher, and admin an AI that knows their campus live — schedules, rules, and all.',
        tags: ['Campus Schedule', 'Campus Intelligence', 'FFCS · Hybrid · Traditional', '30 Seconds'],
        href: '/product/campus-suite',
        accent: 'violet',
    },
    {
        id: '02',
        name: 'AIVA',
        tagline: 'Voice Agents · 3D Avatars · Enterprise Kiosks',
        description: 'AI voice agents with lifelike 3D avatars deployed in movable enterprise kiosks — handling sales, billing, and customer service without a human in the loop.',
        tags: ['Voice Agent', '3D Avatar', 'Kiosk', 'Enterprise Automation'],
        href: '/product/aiva',
        accent: 'violet',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } }
}
const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const Product = () => {
    return (
        <div className="w-full relative z-20 bg-[#06060c]/50">

            {/* Top hairline */}
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
                        02 &mdash;&nbsp; Products
                    </motion.p>
                    <motion.h2
                        variants={itemVariants}
                        className="font-display font-bold leading-[0.92] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]"
                    >
                        <span className="block text-customGrayLight">WHAT WE</span>
                        <span className="block">
                            <span className="text-violet-400">SHIP</span>
                            <span className="text-customGrayLight"> TODAY.</span>
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Dual product cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {products.map((p) => (
                        <motion.div
                            key={p.id}
                            variants={itemVariants}
                            className="group relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-500 overflow-hidden"
                        >
                            {/* Ambient glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/0 group-hover:from-violet-500/6 transition-all duration-700 rounded-2xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <span className="font-mono text-[9px] tracking-[0.4em] text-violet-400/40 uppercase">{p.id}</span>
                                    <span className="font-mono text-[8px] tracking-[0.3em] text-violet-400/35 uppercase">{p.tagline}</span>
                                </div>

                                <h3 className="font-display font-bold text-4xl md:text-5xl text-customGrayLight mb-5 tracking-tight">{p.name}</h3>

                                <p className="text-base leading-[1.8] text-customGrayDark font-light mb-8">{p.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {p.tags.map((tag) => (
                                        <span key={tag} className="font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-sm border border-violet-500/20 bg-violet-500/[0.05] text-customGrayDark">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={p.href}
                                    className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-violet-400/70 hover:text-violet-300 transition-colors duration-300 group/link"
                                >
                                    <span>Learn More</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>

            {/* Bottom hairline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
        </div>
    )
}

export default Product

