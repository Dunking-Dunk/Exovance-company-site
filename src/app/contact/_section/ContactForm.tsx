"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const INPUT_CLASS = "w-full px-4 py-3 bg-transparent border border-violet-500/15 rounded-lg text-customGrayLight placeholder-customGrayDarker/50 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 text-sm";
const LABEL_CLASS = "block font-mono text-[9px] tracking-[0.35em] uppercase text-violet-400/50 mb-2";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to send');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitStatus('success');
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full py-16 px-6 md:px-12 lg:px-28 z-[10]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

                {/* â”€â”€ Form â”€â”€ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-violet-400/50 mb-4">Send a message</p>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-customGrayLight mb-8 tracking-tight">
                        Tell us about your project
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className={LABEL_CLASS}>Name *</label>
                                <input type="text" id="name" name="name" value={formData.name}
                                    onChange={handleInputChange} required className={INPUT_CLASS}
                                    placeholder="Your full name" />
                            </div>
                            <div>
                                <label htmlFor="email" className={LABEL_CLASS}>Email *</label>
                                <input type="email" id="email" name="email" value={formData.email}
                                    onChange={handleInputChange} required className={INPUT_CLASS}
                                    placeholder="your@email.com" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className={LABEL_CLASS}>Subject *</label>
                            <input type="text" id="subject" name="subject" value={formData.subject}
                                onChange={handleInputChange} required className={INPUT_CLASS}
                                placeholder="What's this about?" />
                        </div>

                        <div>
                            <label htmlFor="message" className={LABEL_CLASS}>Message *</label>
                            <textarea id="message" name="message" value={formData.message}
                                onChange={handleInputChange} required rows={6}
                                className={INPUT_CLASS + " resize-none"}
                                placeholder="Tell us about your project, goals, and how we can help..." />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600/80 hover:bg-violet-500/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono tracking-[0.25em] uppercase transition-all duration-300 shadow-lg shadow-violet-900/20"
                        >
                            {isSubmitting ? (
                                <><div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /><span>Sendingâ€¦</span></>
                            ) : (
                                <><Send className="w-3.5 h-3.5" /><span>Send message</span></>
                            )}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-400 text-sm">
                                Message sent â€” we'll be in touch within 24 hours.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/[0.06] text-red-400 text-sm">
                                Something went wrong. Please try again or email us directly.
                            </div>
                        )}
                    </form>
                </motion.div>

                {/* â”€â”€ Sidebar â”€â”€ */}
                <motion.div
                    className="space-y-4 lg:sticky lg:top-28"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Contact details */}
                    {[
                        { Icon: Mail, label: 'Email', value: 'exovancelab@gmail.com', href: 'mailto:exovancelab@gmail.com' },
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
                            <a href="https://www.instagram.com/exovance" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400/60 hover:text-violet-300 hover:border-violet-400/30 transition-all duration-300">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/in/exovance-lab-328005350/" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg border border-violet-500/15 bg-violet-500/[0.06] flex items-center justify-center text-violet-400/60 hover:text-violet-300 hover:border-violet-400/30 transition-all duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="p-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.03]">
                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-violet-400/40 mb-3">Hours</p>
                        <div className="space-y-1.5 text-xs text-customGrayDarker">
                            <div className="flex justify-between"><span>Mon â€“ Fri</span><span className="text-customGrayDark">9 AM â€“ 6 PM IST</span></div>
                            <div className="flex justify-between"><span>Saturday</span><span className="text-customGrayDark">10 AM â€“ 4 PM IST</span></div>
                            <div className="flex justify-between"><span>Sunday</span><span className="text-violet-400/40">Closed</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
