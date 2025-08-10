"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Mission = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">



            <div className="relative z-10 max-w-6xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-6">
                        Our Mission
                    </h2>
                    <div className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold tracking-wider">
                        IMPACT-DRIVEN INNOVATION
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="text-2xl md:text-3xl lg:text-4xl text-customGrayDarker leading-relaxed mb-8">
                        <TextGenerateEffect
                            words="Our mission is to leverage cutting-edge technology and fresh perspectives to build practical solutions that solve real-world problems and create a meaningful impact."
                            className="text-2xl md:text-3xl lg:text-4xl text-customGrayDarker"
                        />
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                        Our Vision
                    </h3>
                    <p className="text-lg md:text-xl text-customGrayDarker leading-relaxed max-w-4xl mx-auto">
                        We envision a future where technology is a force for good, and we aim to be a launchpad
                        for the next generation of innovators who will build it.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Mission;
