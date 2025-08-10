"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Community = () => {
    const stats = [
        { number: "500+", label: "Community Members", icon: "👥" },
        { number: "50+", label: "Active Developers", icon: "💻" },
        { number: "30+", label: "Designers & Creators", icon: "🎨" },
        { number: "24/7", label: "Collaborative Support", icon: "🤝" },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                        style={{
                            left: `${10 + (i * 8)}%`,
                            top: `${20 + (i * 6)}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6">
                        The Power of Our Community
                    </h2>
                    <div className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
                        MORE THAN A COMPANY, A COLLECTIVE OF INNOVATORS
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left side - Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                                Our Vibrant Ecosystem
                            </h3>
                            <div className="text-lg text-customGrayDarker leading-relaxed">
                                <TextGenerateEffect
                                    words="Exovance is powered by a vibrant and growing tech community of over 500+ students, developers, and designers. This network is our greatest asset, providing a diverse pool of talent, fresh ideas, and rigorous feedback."
                                    className="text-lg text-customGrayDarker"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                                Your Advantage
                            </h3>
                            <p className="text-lg text-customGrayDarker leading-relaxed">
                                When you partner with Exovance, you aren't just hiring our core team; you are tapping
                                into the collective intelligence of a community dedicated to technological excellence.
                                This allows us to innovate faster, solve complex problems more effectively, and deliver
                                truly exceptional results.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side - Community Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 dark:hover:bg-gray-800/30 transition-all duration-300"
                            >
                                <div className="text-3xl mb-3">{stat.icon}</div>
                                <div className="text-2xl md:text-3xl font-bold text-emerald-500 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-customGrayDarker leading-tight">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Community Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <div className="text-center p-6 rounded-xl bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm">
                        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h4 className="text-xl font-semibold text-customGrayLight mb-3">Rapid Innovation</h4>
                        <p className="text-customGrayDarker text-sm">
                            Our community accelerates development with diverse perspectives and collaborative problem-solving
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm">
                        <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🧠</span>
                        </div>
                        <h4 className="text-xl font-semibold text-customGrayLight mb-3">Collective Intelligence</h4>
                        <p className="text-customGrayDarker text-sm">
                            Access to cutting-edge knowledge and emerging technologies through our network of innovators
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm">
                        <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h4 className="text-xl font-semibold text-customGrayLight mb-3">Quality Assurance</h4>
                        <p className="text-customGrayDarker text-sm">
                            Rigorous peer review and feedback ensure the highest standards in every project we deliver
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Community;
