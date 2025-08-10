"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import Dither from '../canva/Dither';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full h-[80vh] py-24 overflow-hidden text-customGray">
            <h2 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] sm:text-[20vw] z-10 font-semibold text-customGrayDarker opacity-50'>EXOVANCE</h2>

            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <Dither
                    waveColor={[0.35, 0.35, 0.35]}
                    disableAnimation={false}
                    enableMouseInteraction={false}
                    mouseRadius={0.3}
                    colorNum={4}
                    waveAmplitude={0.25}
                    waveFrequency={2.5}
                    waveSpeed={0.04}
                />
            </div>

            <div className="relative z-20 mx-6 sm:mx-10 lg:mx-28 h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 lg:gap-y-20 lg:gap-x-20 items-start">
                    {/* Company */}
                    <div className='flex flex-col items-start space-y-20'>
                        <div>
                            <h3 className="text-4xl sm:text-5xl font-semibold text-customGrayLight leading-tight">EXOVANCE</h3>
                            <p className="text-base sm:text-lg text-customGray mt-3 leading-relaxed">Engineering intelligent systems for the real world.</p>
                        </div>
                        <div>
                            <h4 className="text-sm uppercase tracking-[0.18em] text-customGrayLight/80 mb-3">Location</h4>
                            <address className="not-italic text-base text-customGray leading-relaxed">
                                RWD Grand Corridor<br />
                                Vanagram, Chennai<br />
                                Tamil Nadu, India
                            </address>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm uppercase tracking-[0.18em] text-customGrayLight/80 mb-3">Contact</h4>
                            <a href="mailto:exovancelab@gmail.com" className="text-base hover:text-customGrayLight transition-colors">exovancelab@gmail.com</a><br />
                            <a href="tel:+918056201341" className="text-base hover:text-customGrayLight transition-colors">+91 80562 01341</a>
                        </div>
                        <p className="text-lg sm:text-2xl pt-3">©{currentYear}</p>
                    </div>

                    {/* Explore */}
                    <div className="flex flex-col items-start space-y-20 md:items-center md:justify-self-center">
                        <h4 className="text-sm uppercase tracking-[0.18em] text-customGrayLight/80">Explore</h4>
                        <nav className="flex flex-col text-lg sm:text-xl space-y-4">
                            <Link href="/about" className="hover:text-customGrayLight transition-colors">About</Link>
                            <Link href="/product" className="hover:text-customGrayLight transition-colors">Products</Link>
                            <Link href="/team" className="hover:text-customGrayLight transition-colors">Team</Link>
                            <Link href="/contact" className="hover:text-customGrayLight transition-colors">Contact</Link>
                        </nav>
                        <div className="flex gap-4 pt-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-customGrayDark/40 text-customGrayLight hover:border-customGrayDark/70 hover:text-white transition-colors text-base"
                            >
                                Start a project
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-customGrayDark hover:text-white hover:bg-customGrayDark/30 border border-transparent transition-colors text-base"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </div>

                    {/* Follow */}
                    <div className="flex flex-col items-start space-y-6 md:items-end md:justify-self-end">
                        <h4 className="text-base font-medium text-customGrayDark tracking-wider">Follow</h4>
                        <div className="flex space-x-6">
                            <motion.a
                                href="https://www.instagram.com/exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Instagram className="h-7 w-7" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/exovance-lab-328005350/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Linkedin className="h-7 w-7" />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com/exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 fill-current"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.47v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                            </motion.a>
                            <motion.a
                                href="https://www.youtube.com/@exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 fill-current"><path d="M23.498 6.186a2.998 2.998 0 0 0-2.112-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.566A2.998 2.998 0 0 0 .502 6.186 31.08 31.08 0 0 0 0 12a31.08 31.08 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.112 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.566a2.998 2.998 0 0 0 2.112-2.12A31.08 31.08 0 0 0 24 12a31.08 31.08 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" /></svg>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
