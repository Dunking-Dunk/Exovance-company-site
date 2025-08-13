"use client";

import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Mission = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center lg:px-32 py-32 z-[1]">

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4">

                <TextGenerateEffect
                    words="We build deep tech solutions in AI and robotics to drive global technology innovation, creating meaningful impact worldwide and advancing technological capabilities for the future."
                    className="text-2xl md:text-4xl lg:text-5xl text-customGrayDarker leading-relaxed"
                />

                <div className="grid md:grid-cols-3 md:gap-8 max-w-5xl mx-auto mb-12 mt-8">
                    {[{
                        emoji: '🤖', title: 'AI Innovation', desc: 'Developing cutting-edge artificial intelligence solutions that solve complex real-world problems'
                    }, {
                        emoji: '⚙️', title: 'Robotics Future', desc: 'Building advanced robotics systems that enhance human capabilities and automate complex tasks'
                    }, {
                        emoji: '🌍', title: 'Global Impact', desc: 'Creating solutions that transcend borders and make a positive difference worldwide'
                    }].map(item => (
                        <div key={item.title} className="text-center p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border border-white/20 dark:border-white/10 bg-white/10">
                                <span className="text-2xl">{item.emoji}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                                {item.title}
                            </h3>
                            <p className="text-customGrayDarker text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-customGrayDarker leading-relaxed">
                        At Exovance, we believe technology should be a force for progress. Our commitment extends beyond just building solutions—we're
                        dedicated to fostering innovation, empowering communities, and creating a future where technology serves humanity's greatest aspirations.
                    </p>
                </div>
            </div>
        </section >
    );
};

export default Mission;
