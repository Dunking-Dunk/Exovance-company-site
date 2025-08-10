"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";

const Journey = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6">
                        Join Our Journey
                    </h2>
                    <div className="text-lg md:text-xl text-violet-600 dark:text-violet-400 font-semibold tracking-wider mb-8">
                        LET'S BUILD THE FUTURE TOGETHER
                    </div>
                </motion.div>

                {/* Forward-looking statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="max-w-4xl mx-auto">
                        <TextGenerateEffect
                            words="We're just getting started. Every project is a stepping stone toward a future where technology serves humanity's greatest aspirations. Your vision combined with our passion creates possibilities that haven't been imagined yet."
                            className="text-xl md:text-2xl text-customGrayDarker leading-relaxed"
                        />
                    </div>
                </motion.div>

                {/* Call-to-action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                >
                    <Link href="/product">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25"
                        >
                            <span className="relative z-10">View Our Services</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                        </motion.button>
                    </Link>

                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 border-2 border-violet-500/50 text-customGrayLight rounded-full font-semibold text-lg transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10"
                        >
                            <span className="relative z-10">Get in Touch</span>
                            <div className="absolute inset-0 bg-violet-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Additional content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-violet-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-2">
                            Have an Idea?
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Share your vision with us and let's explore how we can bring it to life
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤝</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-2">
                            Want to Collaborate?
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Join our community of innovators and be part of the next big thing
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-2">
                            Ready to Scale?
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Let's discuss how our solutions can accelerate your business growth
                        </p>
                    </div>
                </motion.div>

                {/* Final quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20"
                >
                    <blockquote className="text-2xl md:text-3xl font-light text-customGrayDarker italic leading-relaxed">
                        "The future belongs to those who believe in the beauty of their dreams."
                    </blockquote>
                    <div className="mt-6 flex justify-center items-center space-x-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                        <div className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                            Eleanor Roosevelt
                        </div>
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Journey;
