"use client";

import React, { useState } from 'react';
import { Spotlight2 } from '@/components/ui/spotlight2';

const HeroSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Waitlist signup:', email);
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto py-10 md:py-20">
            <Spotlight2 className='absolute top-10' />

            <div className="relative">
                <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-2xl overflow-hidden group">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/video/Kiosk_With_Wheels.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-customBlack/60 via-transparent to-customBlack/20"></div>

                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
                        <div className="max-w-md">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2 tracking-wide">
                                AIVA in Action
                            </h3>
                            <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4 hidden sm:block">
                                Experience the future of retail with our intelligent kiosk system.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30">
                                    Mobile Design
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30">
                                    3D Avatar
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30">
                                    Interactive Display
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Play/Pause Button */}
                    <button
                        className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                        onClick={(e) => {
                            const video = e.currentTarget.parentElement?.querySelector('video');
                            if (video) {
                                if (video.paused) {
                                    video.play();
                                } else {
                                    video.pause();
                                }
                            }
                        }}
                    >
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-customGrayLight mb-4">
                        AIVA
                    </h1>
                    <div className="w-24 h-1 bg-customGrayLight"></div>
                </div>

                <div>
                    <p className="text-lg md:text-xl text-customGrayDarker leading-relaxed">
                        AIVA is an AI-powered virtual sales assistant designed to enhance customer engagement and sales
                        in both in-store and online retail environments. More than just AI, AIVA revolutionizes the
                        future of selling through emotional intelligence and seamless customer interactions.
                    </p>
                </div>


                <div className="max-w-md">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-full bg-customBlackAlt/10 border border-customGrayDark/30 text-customGrayLight placeholder-customGrayDarker focus:outline-none focus:border-customGrayLight transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-customGrayLight text-customBlack rounded-full font-semibold hover:bg-customGray transition-colors"
                            >
                                Join Waitlist
                            </button>
                        </form>
                    ) : (
                        <div className="p-6 rounded-xl bg-customBlackAlt/10 border border-customGrayDark/30">
                            <div className="text-2xl mb-2">🎉</div>
                            <h3 className="text-lg font-semibold text-customGrayLight mb-2">
                                You're on the list!
                            </h3>
                            <p className="text-customGrayDarker">
                                We'll notify you when AIVA is ready for early access.
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <span className="inline-block px-6 py-2 border border-customGrayDark/40 text-customGray text-sm font-medium rounded-full">
                        Coming Soon
                    </span>
                </div>
            </div>


        </div>
    );
};

export default HeroSection;
