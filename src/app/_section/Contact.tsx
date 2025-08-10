"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section className="relative w-full py-28 md:py-40 lg:py-48 px-4 md:px-8 lg:px-32 min-h-[70vh] md:min-h-[80vh] z-10">
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center space-x-3 mb-6"
                >
                    <div className="w-1 h-8 bg-gradient-to-b from-white/60 to-white/20" />
                    <span className="text-sm tracking-[0.2em] uppercase text-customGrayLight font-medium">Contact</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest text-customGray mb-6"
                >
                    Let’s collaborate on what’s next
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-5xl text-customGrayDark leading-relaxed text-base md:text-lg mb-10"
                >
                    Have a problem to solve or an idea to explore? Whether you want to build, automate, or simply understand what’s possible, we’d love to talk. Get in touch to share context and discover how we can help.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/50 text-white hover:border-white hover:text-white transition-colors"
                    >
                        Collaborate with us
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white hover:text-white hover:bg-white/10 border border-transparent transition-colors"
                    >
                        Know more
                    </Link>
                </motion.div>

                {/* Highlights */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-customGrayLight/90">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <h4 className="text-white/90 text-lg mb-2">Product & Prototyping</h4>
                        <p className="text-sm leading-relaxed text-customGrayDark">From idea to MVP. Rapid prototyping, hardware-software integration, and proof-of-concepts.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <h4 className="text-white/90 text-lg mb-2">Automation & Optimization</h4>
                        <p className="text-sm leading-relaxed text-customGrayDark">Workflow automation, robotics control, and process optimization tailored to your operations.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <h4 className="text-white/90 text-lg mb-2">Advisory & Collaboration</h4>
                        <p className="text-sm leading-relaxed text-customGrayDark">Exploratory sessions to align on goals, de-risk delivery, and choose the right tech strategy.</p>
                    </div>
                </div>

                {/* Quick contact */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 text-sm">
                    <a href="mailto:exovancelab@gmail.com" className="text-white/90 hover:text-white underline underline-offset-4">exovancelab@gmail.com</a>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <a href="tel:+918056201341" className="text-white/90 hover:text-white">+91 80562 01341</a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
