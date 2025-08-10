"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Advisor = {
    name: string;
    title: string;
    photo: string;
    quote?: string;
};

const advisors: Advisor[] = [
    {
        name: "Advisor Name",
        title: "Professor of Computer Science, University Name",
        photo: "/team/hursun.jpg",
        quote:
            "This team embodies the mindset and momentum needed to build meaningful technology.",
    },
];

const CommunityAdvisors = () => {
    return (
        <section className="relative w-full py-24 md:py-32">
            <div className="px-4 md:px-32 max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mb-3">
                        Powered by a Community of Innovators
                    </h2>
                    <p className="text-customGrayDarker text-lg max-w-4xl">
                        Our work is amplified and challenged by a vibrant community of 500+ student developers and tech enthusiasts from across India. This network is our think‑tank for new ideas and our testing ground for impactful solutions.
                    </p>
                </div>

                {/* Advisors */}
                {advisors.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-6">
                            Advisors & Mentors
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {advisors.map((a, i) => (
                                <motion.div
                                    key={a.name + i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="rounded-xl border border-white/10 bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden"
                                >
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image src={a.photo} alt={a.name} fill className="object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold text-customGrayLight">{a.name}</h4>
                                        <p className="text-sm text-customGrayDarker">{a.title}</p>
                                        {a.quote && (
                                            <p className="text-sm text-customGrayDarker mt-3 leading-relaxed italic">
                                                "{a.quote}"
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommunityAdvisors;


