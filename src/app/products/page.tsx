"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
    {
        id: '01',
        slug: 'campus-suite',
        name: 'Campus Suite',
        tagline: 'EdTech · Indian Universities · Agentic AI',
        desc: 'Campus Schedule rewrites the timetable in 30 seconds. Campus Intelligence gives every student, teacher, and admin an AI that knows their campus live — schedules, rules, and all.',
        tags: ['Campus Schedule', 'Campus Intelligence', 'FFCS · Hybrid · Traditional', '30 Seconds'],
        status: 'SHIPPING',
        statusColor: 'emerald',
        cta: 'See Campus Suite',
        href: '/product/campus-suite',
    },
    {
        id: '02',
        slug: 'aiva',
        name: 'AIVA',
        tagline: 'Voice Agents · 3D Avatars · Enterprise Kiosks',
        desc: 'AI voice agents with lifelike 3D avatars deployed in movable enterprise kiosks — handling sales, billing, and customer service without a human in the loop.',
        tags: ['Voice Agent', '3D Avatar', 'Kiosk', 'Enterprise Automation'],
        status: 'BUILDING',
        statusColor: 'amber',
        cta: 'See AIVA',
        href: '/product/aiva',
    },
];

const ProductsPage = () => {
    return (
        <main className="relative w-full min-h-screen px-6 md:px-12 lg:px-28 py-40 z-10 overflow-hidden">

            {/* Ambient bloom */}
            <div
                className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(100,0,200,0.07) 0%, transparent 100%)' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="font-mono text-[10px] tracking-[0.5em] text-violet-400/50 uppercase mb-10"
                >
                    Exovance &mdash; Products
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-customGrayLight leading-[0.95] tracking-tight mb-6"
                >
                    What We Ship
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-lg text-customGrayDark leading-relaxed max-w-xl mb-20"
                >
                    Two product lines. Both AI-native. Both built for India.
                </motion.p>

                {/* Product cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {products.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="group relative p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/25 hover:bg-violet-500/[0.03] transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 transition-all duration-700 rounded-2xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col flex-1">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-8">
                                    <span className="font-mono text-[9px] tracking-[0.4em] text-violet-400/40 uppercase">{p.id}</span>
                                    <span className={`font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1 rounded ${
                                        p.statusColor === 'emerald'
                                            ? 'text-emerald-400/70 bg-emerald-400/10'
                                            : 'text-amber-400/70 bg-amber-400/10'
                                    }`}>
                                        {p.status}
                                    </span>
                                </div>

                                <p className="font-mono text-[9px] tracking-[0.3em] text-violet-400/40 uppercase mb-3">{p.tagline}</p>
                                <h2 className="text-5xl md:text-6xl font-bold text-customGrayLight tracking-tight mb-5">{p.name}</h2>
                                <p className="text-base leading-[1.8] text-customGrayDark font-light mb-8 flex-1">{p.desc}</p>

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
                                    <span>{p.cta}</span>
                                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">&rarr;</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom separator + note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-20 pt-10 border-t border-white/[0.06]"
                >
                    <p className="text-customGrayDarker text-sm">
                        Pre-revenue. Early access open.{' '}
                        <a
                            href="https://waitlist.exovance.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400/60 hover:text-violet-400 transition-colors underline underline-offset-2"
                        >
                            Join the waitlist &rarr;
                        </a>
                    </p>
                </motion.div>

            </div>
        </main>
    );
};

export default ProductsPage;
