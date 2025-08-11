"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import dynamic from "next/dynamic";

const View: any = dynamic(() => import('@/components/canva/View').then((mod: any) => mod.View), { ssr: false })

const Common: any = dynamic(() => import('@/components/canva/View').then((mod: any) => mod.Common), { ssr: false })

const BackgroundHero = dynamic(() => import('@/components/canva/Backgroundhero').then((_: any) => _.BackgroundHero), { ssr: false })

const Mission = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center lg:px-32 py-32 z-[1]">
            <View className="absolute inset-0 overflow-hidden pointer-events-none">
                <Common />
                <BackgroundHero />
            </View>

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4">


                <TextGenerateEffect
                    words="We build deep tech solutions in AI and robotics to drive global technology innovation, creating meaningful impact worldwide and advancing technological capabilities for the future."
                    className="text-2xl md:text-4xl lg:text-5xl text-customGrayDarker leading-relaxed"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid md:grid-cols-3 md:gap-8 max-w-5xl mx-auto mb-12"
                >
                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            AI Innovation
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Developing cutting-edge artificial intelligence solutions that solve complex real-world problems
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⚙️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            Robotics Future
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Building advanced robotics systems that enhance human capabilities and automate complex tasks
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            Global Impact
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Creating solutions that transcend borders and make a positive difference worldwide
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-lg text-customGrayDarker leading-relaxed">
                        At Exovance, we believe technology should be a force for progress. Our commitment extends beyond just building solutions—we're
                        dedicated to fostering innovation, empowering communities, and creating a future where technology serves humanity's greatest aspirations.
                    </p>
                </motion.div>
            </div>
        </section >
    );
};

export default Mission;
