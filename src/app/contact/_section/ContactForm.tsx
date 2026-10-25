"use client";

import React from 'react';
import { Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryForm from '@/components/enquiry/EnquiryForm';

const ContactForm = () => {
    return (
        <section className="relative w-full py-16 px-6 md:px-12 lg:px-28 z-[10]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

                {/* Form */}
                <motion.div
                    id="enquiry"
                    tabIndex={-1}
                    className="scroll-mt-28 focus:outline-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-violet-400/50 mb-4">Send a message</p>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-customGrayLight mb-8 tracking-tight">
                        Tell us about your college
                    </h2>
                    <EnquiryForm />
                </motion.div>

                {/* Sidebar */}
                <motion.div
                    className="space-y-4 lg:sticky lg:top-28"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Contact details */}
                    {[
                        { Icon: Phone, label: 'Phone', value: '+91 80562 01341', href: 'tel:+918056201341' },
                        { Icon: MapPin, label: 'Location', value: 'Vanagram, Chennai\nTamil Nadu, India', href: null },
                    ].map(({ Icon, label, value, href }) => (
                        <div key={label} className="flex gap-4 p-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.03] hover:border-violet-500/20 transition-colors duration-300">
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center">
                                <Icon className="w-4 h-4 text-violet-400/70" />
                            </div>
                            <div>
                                <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-violet-400/40 mb-1">{label}</p>
                                {href ? (
                                    <a href={href} className="text-sm text-customGrayDark hover:text-violet-300 transition-colors whitespace-pre-line">{value}</a>
                                ) : (
                                    <p className="text-sm text-customGrayDark whitespace-pre-line">{value}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Social */}
                    <div className="p-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.03]">
                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-violet-400/40 mb-3">Follow</p>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/exovance" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400/60 hover:text-violet-300 hover:border-violet-400/30 transition-all duration-300">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/exovance-lab-328005350/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400/60 hover:text-violet-300 hover:border-violet-400/30 transition-all duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="p-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.03]">
                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-violet-400/40 mb-3">Hours</p>
                        <div className="space-y-1.5 text-xs text-customGrayDarker">
                            <div className="flex justify-between"><span>Mon – Fri</span><span className="text-customGrayDark">9 AM – 6 PM IST</span></div>
                            <div className="flex justify-between"><span>Saturday</span><span className="text-customGrayDark">10 AM – 4 PM IST</span></div>
                            <div className="flex justify-between"><span>Sunday</span><span className="text-violet-400/40">Closed</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
