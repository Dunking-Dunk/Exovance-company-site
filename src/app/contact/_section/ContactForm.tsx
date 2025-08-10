"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/SpotlightCard';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Create mailto link
            const mailtoLink = `mailto:exovancelab@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Reset form after a short delay
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSubmitStatus('success');
                setIsSubmitting(false);
            }, 1000);

        } catch (error) {
            setSubmitStatus('error');
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full h-full py-16 px-4 md:px-8 lg:px-32 z-[10]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Contact Form */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-customGray mb-4">
                            Send us a message
                        </h2>
                        <p className="text-customGrayDarker">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    <SpotlightCard className="bg-customBlackAlt/5 border-customGrayDark/30">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-customGrayLight mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-customBlackAlt/20 border border-customGrayDark/40 rounded-lg text-customGray placeholder-customGrayDarker focus:outline-none focus:border-customGrayLight focus:ring-2 focus:ring-customGrayDark/40 transition-colors"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-customGrayLight mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-customBlackAlt/20 border border-customGrayDark/40 rounded-lg text-customGray placeholder-customGrayDarker focus:outline-none focus:border-customGrayLight focus:ring-2 focus:ring-customGrayDark/40 transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-customGrayLight mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-customBlackAlt/20 border border-customGrayDark/40 rounded-lg text-customGray placeholder-customGrayDarker focus:outline-none focus:border-customGrayLight focus:ring-2 focus:ring-customGrayDark/40 transition-colors"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-customGrayLight mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-customBlackAlt/20 border border-customGrayDark/40 rounded-lg text-customGray placeholder-customGrayDarker focus:outline-none focus:border-customGrayLight focus:ring-2 focus:ring-customGrayDark/40 transition-colors resize-vertical"
                                    placeholder="Tell us about your project, goals, and how we can help..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-customGrayLight text-customBlack hover:bg-customGray transition-colors py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-customBlack border-t-transparent" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </Button>
                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400">
                                    There was an error sending your message. Please try again.
                                </div>
                            )}
                        </form>
                    </SpotlightCard>
                </div>

                {/* Company Information */}
                <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-customGray mb-4">
                            Let's Connect
                        </h2>
                        <p className="text-customGrayDarker">
                            We're here to help bring your vision to life. Reach out through any of these channels.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <SpotlightCard className="bg-customBlackAlt/5 border-customGrayDark/30 space-y-4">
                        <div className="flex items-start space-x-4 p-4 rounded-lg border border-customGrayDark/20 bg-customBlackAlt/10">
                            <Mail className="h-6 w-6 text-customGrayLight mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-customGrayLight">Email</h3>
                                <a
                                    href="mailto:exovancelab@gmail.com"
                                    className="text-customGray hover:text-customGrayLight transition-colors"
                                >
                                    exovancelab@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 rounded-lg border border-customGrayDark/20 bg-customBlackAlt/10">
                            <Phone className="h-6 w-6 text-customGrayLight mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-customGrayLight">Phone</h3>
                                <a
                                    href="tel:+918056201341"
                                    className="text-customGray hover:text-customGrayLight transition-colors"
                                >
                                    +91 80562 01341
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 rounded-lg border border-customGrayDark/20 bg-customBlackAlt/10">
                            <MapPin className="h-6 w-6 text-customGrayLight mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-customGrayLight">Address</h3>
                                <address className="not-italic text-customGray">
                                    RWD Grand Corridor<br />
                                    Vanagram, Chennai<br />
                                    Tamil Nadu, India
                                </address>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Social Media */}
                    <SpotlightCard className="bg-customBlackAlt/5 border-customGrayDark/30">
                        <h3 className="font-medium text-customGrayLight mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg border border-customGrayDark/20 hover:border-customGrayDark/40 text-customGray hover:text-customGrayLight transition-all"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/exovance-lab-328005350/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg border border-customGrayDark/20 hover:border-customGrayDark/40 text-customGray hover:text-customGrayLight transition-all"
                            >
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a
                                href="https://twitter.com/exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg border border-customGrayDark/20 hover:border-customGrayDark/40 text-customGray hover:text-customGrayLight transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.47v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@exovance"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg border border-customGrayDark/20 hover:border-customGrayDark/40 text-customGray hover:text-customGrayLight transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path d="M23.498 6.186a2.998 2.998 0 0 0-2.112-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.566A2.998 2.998 0 0 0 .502 6.186 31.08 31.08 0 0 0 0 12a31.08 31.08 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.112 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.566a2.998 2.998 0 0 0 2.112-2.12A31.08 31.08 0 0 0 24 12a31.08 31.08 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
                                </svg>
                            </a>
                        </div>
                    </SpotlightCard>

                    {/* Business Hours */}
                    <SpotlightCard className="p-6 border-customGrayDark/30 bg-customBlackAlt/5">
                        <h3 className="font-medium text-customGrayLight mb-3">Business Hours</h3>
                        <div className="space-y-2 text-customGray">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>9:00 AM - 6:00 PM IST</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span>10:00 AM - 4:00 PM IST</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span>Closed</span>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
