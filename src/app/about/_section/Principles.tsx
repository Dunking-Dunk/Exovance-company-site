"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Principles = () => {
    const principles = [
        {
            title: "IMAGINE",
            description: "We believe every great solution starts with a bold question. We foster a culture of boundless curiosity and creativity.",
            icon: "💭",
            color: "bg-customBlackAlt/5",
            borderColor: "border-customGrayDark/30",
            delay: 0.1
        },
        {
            title: "INVENT",
            description: "We are builders and problem-solvers at heart. We are passionate about turning ambitious ideas into tangible, high-quality technology.",
            icon: "🛠️",
            color: "bg-customBlackAlt/5",
            borderColor: "border-customGrayDark/30",
            delay: 0.3
        },
        {
            title: "ADVANCE",
            description: "We are committed to continuous learning and improvement, pushing both our own skills and the boundaries of what is possible in tech.",
            icon: "🚀",
            color: "bg-customBlackAlt/5",
            borderColor: "border-customGrayDark/30",
            delay: 0.5
        }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-customGrayDark/20 rotate-45"
                    animate={{
                        rotate: [45, 225, 45],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full border-2 border-customGrayDark/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-customGrayDark/20"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6">
                        Our Guiding Principles
                    </h2>
                    <div className="text-lg md:text-xl text-customGray font-semibold tracking-wider mb-8">
                        THE FOUNDATION OF EVERYTHING WE DO
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <TextGenerateEffect
                            words="These three core values shape our approach to innovation, guide our decision-making, and define who we are as a collective force in technology."
                            className="text-lg text-customGrayDarker"
                        />
                    </div>
                </motion.div>

                {/* Principles Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: principle.delay }}
                            className={`relative p-8 rounded-2xl border ${principle.borderColor} ${principle.color} backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                                {principle.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-customGrayLight mb-6 text-center">
                                {principle.title}
                            </h3>

                            {/* Description */}
                            <p className="text-customGrayDarker leading-relaxed text-center">
                                {principle.description}
                            </p>

                            {/* Hover effect */}
                            <div className="absolute inset-0 rounded-2xl bg-customBlackAlt/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom quote section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <blockquote className="text-2xl md:text-3xl font-light text-customGrayDarker italic leading-relaxed mb-8">
                            "Innovation happens at the intersection of imagination, invention, and advancement."
                        </blockquote>
                        <div className="flex justify-center items-center space-x-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-customGrayDark/50 to-transparent" />
                            <div className="text-sm font-semibold text-customGray tracking-wider">
                                EXOVANCE
                            </div>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-customGrayDark/50 to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Principles;
