"use client";

import React from "react";
import { motion } from "framer-motion";

const values = [
    {
        icon: "🧭",
        title: "Curiosity",
        desc: "We are lifelong learners who constantly ask 'why?' and 'what if?'",
    },
    {
        icon: "🤝",
        title: "Collaboration",
        desc: "We believe the best ideas are born from open discussion and diverse perspectives.",
    },
    {
        icon: "⚙️",
        title: "Execution",
        desc: "We are passionate about turning ideas into beautifully crafted, functional products.",
    },
];

const CultureValues = () => {
    return (
        <section className="relative w-full py-24 md:py-32">
            <div className="px-4 md:px-32">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-3">
                        Our DNA
                    </h2>
                    <p className="text-customGrayDarker text-lg max-w-3xl">
                        The principles that shape how we explore, build, and ship.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="rounded-2xl border border-white/10 bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm p-8"
                        >
                            <div className="text-4xl mb-4">{v.icon}</div>
                            <h3 className="text-xl font-semibold text-customGrayLight mb-2">{v.title}</h3>
                            <p className="text-customGrayDarker text-sm leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CultureValues;


