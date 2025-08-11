"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Story = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">

            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 border border-gray-300/20 dark:border-gray-600/20 rounded-full"
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                    scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6">
                        Our Story
                    </h2>
                    <div className="text-lg md:text-xl text-purple-600 dark:text-purple-400 font-semibold tracking-wider">
                        FROM CLASSROOM TO CREATION
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Story Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                                The Beginning
                            </h3>
                            <p
                                className="text-lg text-customGrayDarker"
                            >
                                Exovance was born not in a corporate boardroom, but in the dynamic environment of our final year of university. As a group of passionate students, we saw a gap between theoretical knowledge and the tangible impact we wanted to make. We decided to bridge that gap ourselves.
                            </p>

                        </div>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                                The Motivation
                            </h3>
                            <p className="text-lg text-customGrayDarker leading-relaxed">
                                Fueled by late-night coding sessions and a shared ambition, we set out to create more
                                than just projects for grades—we wanted to build solutions for people. This passion for
                                practical innovation is the foundation of everything we do.
                            </p>
                        </div>
                    </motion.div>

                    {/* Visual Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="space-y-8">
                            {/* Timeline items */}
                            <div className="relative pl-8 border-l-2 border-purple-500/30">
                                <div className="absolute -left-2 w-4 h-4 bg-purple-500 rounded-full"></div>
                                <div className="bg-white/5 dark:bg-gray-800/20 rounded-lg p-6 backdrop-blur-sm">
                                    <h4 className="font-semibold text-customGrayLight mb-2">University Days</h4>
                                    <p className="text-customGrayDarker text-sm">
                                        Learning theoretical concepts and identifying real-world applications
                                    </p>
                                </div>
                            </div>

                            <div className="relative pl-8 border-l-2 border-purple-500/30">
                                <div className="absolute -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="bg-white/5 dark:bg-gray-800/20 rounded-lg p-6 backdrop-blur-sm">
                                    <h4 className="font-semibold text-customGrayLight mb-2">The Spark</h4>
                                    <p className="text-customGrayDarker text-sm">
                                        Recognizing the gap between academic learning and practical impact
                                    </p>
                                </div>
                            </div>

                            <div className="relative pl-8 border-l-2 border-purple-500/30">
                                <div className="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                                <div className="bg-white/5 dark:bg-gray-800/20 rounded-lg p-6 backdrop-blur-sm">
                                    <h4 className="font-semibold text-customGrayLight mb-2">Exovance Born</h4>
                                    <p className="text-customGrayDarker text-sm">
                                        Building solutions that matter, powered by fresh perspectives
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quote section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-20"
                >
                    <blockquote className="text-2xl md:text-3xl font-light text-customGrayDarker italic leading-relaxed max-w-4xl mx-auto">
                        "We don't just build technology; we craft experiences that transform ideas into reality."
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
};

export default Story;
