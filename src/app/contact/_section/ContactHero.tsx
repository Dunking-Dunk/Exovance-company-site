"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
    return (
        <section className="relative w-full pt-40 pb-16 px-6 md:px-12 lg:px-28 z-[10] overflow-hidden">

            {/* Ambient bloom */}
            <div className="absolute top-0 right-0 w-[600px] h-[400px] opacity-[0.07] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 80% 0%, #7800ff 0%, transparent 65%)' }} />

            <motion.p
                className="font-mono text-[10px] tracking-[0.5em] uppercase text-violet-400/50 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                05 &mdash;&nbsp; Contact
            </motion.p>

            <motion.h1
                className="font-display font-bold leading-[0.88] tracking-tight text-[clamp(3.5rem,9vw,7.5rem)] text-customGrayLight mb-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="block">LET'S</span>
                <span className="block text-violet-400">BUILD</span>
                <span className="block">TOGETHER.</span>
            </motion.h1>

            <motion.p
                className="max-w-lg text-base md:text-lg leading-relaxed text-customGrayDarker font-light"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
            >
                Whether you're exploring AI agents, lifelike avatars, or end-to-end automation — we're ready to make it real.
            </motion.p>

            {/* Divider */}
            <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />
        </section>
    );
};

export default ContactHero;
