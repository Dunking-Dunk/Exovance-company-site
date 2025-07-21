"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { View } from '../canva/View';
import { BackgroundHero } from '../canva/backgroundHero';
import { useTheme } from 'next-themes';
import { DotBackground } from '../ui/dot-background';

const ContactPage = () => {
    return (
        <div className="relative h-[100dvh] z-20 overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b dark:from-transparent h-screen" />
            <DotBackground />
            <View className="absolute inset-0 z-[0]">
                <BackgroundHero />
            </View>

            {/* Main content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-8 lg:px-16">
                <div className="w-full">
                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center space-x-3 mb-8"
                    >
                        <div className="w-1 h-8 bg-gradient-to-b from-customGrayDark to-customGrayDarker"></div>
                        <span className="text-sm tracking-[0.2em] uppercase text-customGrayDark font-medium">
                            Contact
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-widest text-customGrayDark mb-16"
                    >
                        KEEP IN TOUCH
                    </motion.h1>

                    {/* Content grid - Full width */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
                        {/* Left column - Contact info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="lg:col-span-5 xl:col-span-4 space-y-12"
                        >
                            <div>
                                <p className="text-base text-customGray font-light mb-6 leading-relaxed">
                                    We'd love to hear from you
                                </p>

                                <div className="space-y-6">
                                    <motion.a
                                        href="mailto:exovancelab@gmail.com"
                                        className="block text-2xl md:text-3xl font-light text-customGrayDark tracking-wider hover:opacity-70 transition-opacity duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        exovancelab@gmail.com
                                    </motion.a>

                                    <motion.a
                                        href="tel:+918056201341"
                                        className="block text-xl font-light text-customGray tracking-wider hover:opacity-70 transition-opacity duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        +91 80562 01341
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right column - Location & Social */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="lg:col-span-7 xl:col-span-8 space-y-12"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-customGrayDark mb-4 tracking-wider">
                                    OUR LOCATION
                                </h3>
                                <div className="space-y-2 text-base text-customGray font-light leading-relaxed">
                                    <p>RWD Grand Corridor</p>
                                    <p>Vanagram, Chennai</p>
                                    <p>Tamil Nadu, India</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-customGrayDark mb-4 tracking-wider">
                                    FOLLOW US
                                </h3>
                                <div className="space-y-3">
                                    <motion.a
                                        href="#"
                                        className="block text-base text-customGray font-light tracking-wider hover:text-customGrayDark transition-colors duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        Instagram
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="block text-base text-customGray font-light tracking-wider hover:text-customGrayDark transition-colors duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        LinkedIn
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="block text-base text-customGray font-light tracking-wider hover:text-customGrayDark transition-colors duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        Twitter
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
