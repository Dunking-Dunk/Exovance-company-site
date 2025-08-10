"use client";

import React from 'react';

const ContactHero = () => {
    return (
        <section className="relative w-full h-full pt-40 px-4 md:px-8 lg:px-32 z-[10]">
            <div className="max-w-6xl">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-customGrayLight to-customGrayDark" />
                    <span className="text-sm tracking-[0.2em] uppercase text-customGrayLight font-medium">Contact</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Get In Touch
                </h1>
                <p className="text-lg md:text-xl text-customGrayDarker leading-relaxed max-w-3xl">
                    Ready to transform your ideas into reality? Let's collaborate on building the future together.
                </p>
            </div>
        </section>
    );
};

export default ContactHero;
