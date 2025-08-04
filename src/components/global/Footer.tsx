"use client";

import React from 'react';
import Link from 'next/link';
import CompanyName from './Company-name';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full min-h-[35vh] sm:py-10 overflow-hidden text-customGray sm:mb-10">
            <h2 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] sm:text-[20vw] z-10 font-semibold text-customGrayDarker opacity-50'>EXOVANCE</h2>

            <div className="absolute  inset-0 mx-28 py-10 h-full z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center justify-between h-full">
                    <div className='flex flex-col items-center sm:items-start justify-between h-full space-y-6 sm:space-y-0'>
                        {/* Social Links */}
                        <div className="flex space-x-4 sm:space-x-6">
                            <motion.a
                                href="https://www.instagram.com/exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Instagram className="h-6 w-6" />
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/exovance-lab-328005350/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Linkedin className="h-6 w-6" />
                            </motion.a>
                        </div>
                        <p className="text-base sm:text-xl">©{currentYear}</p>
                    </div>
                    {/* Logo and Copyright */}
                    <div className="flex flex-col items-center sm:items-end space-y-4 sm:space-y-6 justify-between h-full ">
                        {/* Navigation Links */}
                        <nav className="flex text-lg sm:text-2xl items-center space-x-4 sm:space-x-8">
                            {/* <Link
                                href="/team"
                                className="hover:text-customGrayLight transition-colors"
                            >
                                TEAM
                            </Link> */}
                            {/* <Link
                                href="/contact"
                                className="hover:text-customGrayLight transition-colors"
                            >
                                CONTACT US
                            </Link> */}
                            <motion.a
                                href="mailto:exovancelab@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-customGrayLight transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                CONTACT US
                            </motion.a>
                        </nav>
                        <h5 className="text-3xl sm:text-4xl font-semibold" >EXOVANCE</h5>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
