"use client";

import React from 'react';
import Link from 'next/link';
import CompanyName from './Company-name';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full h-[35vh] overflow-hidden text-customGray mb-10">
            <h2 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] z-10 font-semibold text-customGrayDarker'>EXOVANCE</h2>
            <div className='w-full h-full absolute z-10 inset-0 bg-gradient-to-r from-black/20 to-black/95 '/>
            <div className="absolute  inset-0 container mx-auto py-10 h-full z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between h-full">
                <div className='flex flex-col items-start justify-between h-full '>
                    {/* Social Links */}
                    <div className="flex  space-x-6">
                                    <motion.a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-customGrayLight transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Twitter className="h-6 w-6" />
                                    </motion.a>
                                    <motion.a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-customGrayLight transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Instagram className="h-6 w-6" />
                                    </motion.a>
                                    <motion.a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-customGrayLight transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Youtube className="h-6 w-6" />
                                    </motion.a>
                                    <motion.a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-customGrayLight transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Linkedin className="h-6 w-6" />
                                    </motion.a>
                                </div>
                                <p className="text-xl">©{currentYear}</p>
                            </div>  
                                                {/* Logo and Copyright */}
                    <div className="flex flex-col items-end space-y-6 justify-between h-full ">
                         {/* Navigation Links */}
                      <div className="flex justify-end">
                        <nav className="flex text-2xl items-center space-x-8">
                            <Link 
                                href="/team" 
                                className="hover:text-customGrayLight transition-colors"
                            >
                                TEAM
                            </Link>
                            <Link 
                                href="/contact" 
                                className="hover:text-customGrayLight transition-colors"
                            >
                                CONTACT US
                            </Link>
                        </nav>
                    </div>

                    <h5 className="text-4xl mb-4 font-semibold" >EXOVANCE</h5>
                    </div>
        
                </div>
            </div>
        </footer>
    );
};

export default Footer;
