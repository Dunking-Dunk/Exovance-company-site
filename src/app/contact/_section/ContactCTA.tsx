"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ContactCTA = () => {
    return (
        <section className="relative w-full z-[10] py-24 px-6 md:px-12 lg:px-28 overflow-hidden">

            {/* Background rule */}
            <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-28 lg:right-28 h-px bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" />

            <div className="relative rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] px-8 md:px-14 py-14 md:py-16 overflow-hidden">

                {/* Inner bloom */}
                <div className="absolute -top-20 -right-20 w-[400px] h-[300px] opacity-[0.12] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 80% 20%, #8b5cf6 0%, transparent 60%)' }} />

                <motion.p
                    className="font-mono text-[9px] tracking-[0.5em] uppercase text-violet-400/50 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    Ready when you are
                </motion.p>

                <motion.h2
                    className="font-display font-bold text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] tracking-tight text-customGrayLight mb-6 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    HAVE A PROJECT<br />
                    <span className="text-violet-400">IN MIND?</span>
                </motion.h2>

                <motion.p
                    className="text-sm md:text-base text-customGrayDarker font-light leading-relaxed mb-10 max-w-lg"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Drop us a line or schedule a call — we'll respond within 24 hours and help you figure out the best path forward.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <a
                        href="mailto:exovancelab@gmail.com"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-violet-600/80 hover:bg-violet-500/90 text-white text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-violet-900/20"
                    >
                        Email us
                    </a>
                    <a
                        href="tel:+918056201341"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-violet-500/25 hover:border-violet-400/50 text-customGrayLight hover:text-violet-200 text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300"
                    >
                        +91 80562 01341
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactCTA;
