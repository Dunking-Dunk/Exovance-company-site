"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Mission = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center lg:px-32 py-20 z-[1]">

            <div className="relative z-10 flex flex-col ">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >

                    <TextGenerateEffect
                        words="Our goal is to build deep tech solutions in India, to push India's standing in tech forward. We build AI solutions and aim to develop robotics in the future."
                        className="text-2xl md:text-4xl lg:text-7xl text-customGrayDarker"
                    />

                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-semibold text-customGray mb-6">
                        Our Vision
                    </h3>
                    <p className="text-lg md:text-xl text-customGrayDarker leading-relaxed max-w-4xl">
                        We envision India as a global leader in technology innovation, where our deep tech solutions
                        contribute to advancing the nation's technological capabilities and creating meaningful impact worldwide.
                    </p>
                </motion.div>
            </div>
        </section >
    );
};

export default Mission;
