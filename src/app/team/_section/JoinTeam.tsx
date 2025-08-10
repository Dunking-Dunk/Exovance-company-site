"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const JoinTeam = () => {
    return (
        <section className="relative w-full py-24 md:py-32">
            <div className="px-4 md:px-32 max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6"
                >
                    Ready to Make an Impact?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-customGrayDarker text-lg leading-relaxed mb-8"
                >
                    We are always looking for passionate individuals to join our mission. If you are excited by the challenge of deep tech and want to build things that matter, we would love to hear from you.
                </motion.p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact" className="inline-flex px-6 py-3 rounded-full bg-white/10 text-customGrayLight hover:bg-white/20 transition">
                        Get in Touch
                    </Link>
                    <a href="mailto:careers@exovance.in" className="inline-flex px-6 py-3 rounded-full border border-white/20 text-customGrayLight hover:bg-white/10 transition">
                        careers@exovance.in
                    </a>
                </div>
            </div>
        </section>
    );
};

export default JoinTeam;


