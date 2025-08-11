"use client";

import React, { useState } from 'react';
import MagicBento from '@/components/ui/MagicBento';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Link from 'next/link';

const Product = () => {
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
        <main className="relative min-h-screen px-4 md:px-8 lg:px-32 py-20 z-10">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

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

                    {/* Waitlist Form */}
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

                {/* Right Column - Video */}
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
            </div>

            <div className="max-w-7xl mx-auto mt-40 space-y-20">

                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide mb-8 text-customGrayLight">
                        AI VIRTUAL SALES ASSISTANT & CRM SAAS
                    </h2>

                    <div className="max-w-5xl mx-auto">
                        <p className="text-lg md:text-xl leading-relaxed text-customGrayDark">
                            AIVA is an AI-powered virtual sales assistant designed to enhance customer engagement and sales
                            in both in-store and online retail environments. It operates 24/7 with human-like, multilingual
                            interactions to provide personalized recommendations and guided checkout experiences.
                        </p>
                    </div>
                </div>

                {/* Core Functionalities */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-12 text-center">
                        Core Functionalities
                    </h3>
                    <div className="max-w-7xl mx-auto">
                        <MagicBento
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            spotlightRadius={350}
                            particleCount={8}
                            enableTilt={true}
                            clickEffect={true}
                            enableMagnetism={true}
                            glowColor="160, 160, 160"
                        />
                    </div>
                </div>

                {/* Data and Analytics */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-8 text-center">
                        Data & Analytics
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <SpotlightCard
                                className="p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                                spotlightColor="rgba(160, 160, 160, 0.15)"
                            >
                                <div className="w-12 h-12 mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">👁️</span>
                                </div>
                                <h4 className="text-lg font-semibold text-customGrayLight mb-3">Behavioral Insights</h4>
                                <p className="text-customGrayDarker text-sm">
                                    Captures detailed customer behavior data including eye contact, dwell time, clicks, and hesitations.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard
                                className="p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                                spotlightColor="rgba(160, 160, 160, 0.15)"
                            >
                                <div className="w-12 h-12 mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">📊</span>
                                </div>
                                <h4 className="text-lg font-semibold text-customGrayLight mb-3">Actionable Reports</h4>
                                <p className="text-customGrayDarker text-sm">
                                    Generates comprehensive reports for businesses to optimize sales, marketing, and R&D strategies.
                                </p>
                            </SpotlightCard>
                        </div>

                        <div className="space-y-6">
                            <SpotlightCard
                                className="p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                                spotlightColor="rgba(160, 160, 160, 0.15)"
                            >
                                <div className="w-12 h-12 mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">📈</span>
                                </div>
                                <h4 className="text-lg font-semibold text-customGrayLight mb-3">Analytics Dashboard</h4>
                                <p className="text-customGrayDarker text-sm">
                                    Real-time dashboard provides insights into product interest and conversion rates.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard
                                className="p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                                spotlightColor="rgba(160, 160, 160, 0.15)"
                            >
                                <div className="w-12 h-12 mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🔗</span>
                                </div>
                                <h4 className="text-lg font-semibold text-customGrayLight mb-3">CRM Integration</h4>
                                <p className="text-customGrayDarker text-sm">
                                    Integrates with CRM systems to create detailed customer profiles for targeted marketing.
                                </p>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>

                {/* Operational Flow */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-customGrayLight mb-8 text-center">
                        Operational Flow
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <SpotlightCard
                            className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                            spotlightColor="rgba(160, 160, 160, 0.15)"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👋</span>
                            </div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">1. Greeting</h4>
                            <p className="text-customGrayDarker text-sm">
                                Greets customers as they approach and identifies their needs
                            </p>
                        </SpotlightCard>

                        <SpotlightCard
                            className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                            spotlightColor="rgba(160, 160, 160, 0.15)"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">2. Discovery</h4>
                            <p className="text-customGrayDarker text-sm">
                                Showcases features, comparisons, and demonstrations
                            </p>
                        </SpotlightCard>

                        <SpotlightCard
                            className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                            spotlightColor="rgba(160, 160, 160, 0.15)"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">3. Recommendation</h4>
                            <p className="text-customGrayDarker text-sm">
                                Suggests best options and upselling opportunities
                            </p>
                        </SpotlightCard>

                        <SpotlightCard
                            className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                            spotlightColor="rgba(160, 160, 160, 0.15)"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">4. Purchase</h4>
                            <p className="text-customGrayDarker text-sm">
                                Seamlessly directs to payment or checkout
                            </p>
                        </SpotlightCard>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <SpotlightCard
                        className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            Intelligent Sales Assistant
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Engages customers with natural conversation, provides personalized recommendations, and guides them through the sales process.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard
                        className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">❤️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            Emotional Intelligence
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Combines human touch with machine power to create meaningful connections with customers through emotional understanding.
                        </p>
                    </SpotlightCard>

                    <SpotlightCard
                        className="text-center p-6 bg-customBlackAlt/5 border-customGrayDark/20"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-customBlackAlt/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="text-lg font-semibold text-customGrayLight mb-3">
                            Mobile Kiosk Design
                        </h3>
                        <p className="text-customGrayDarker text-sm">
                            Features a sleek mobile design with interactive display and 3D avatar for immersive customer experiences.
                        </p>
                    </SpotlightCard>
                </div>

                <div className="text-center space-y-8 py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mr-3"></div>
                                <span className="text-lg font-semibold text-customGrayLight">Product Status</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-customGrayLight mb-4">
                                AIVA is in Finishing Stage
                            </h3>

                            <p className="text-lg text-customGrayDark mb-6 leading-relaxed">
                                We're putting the final touches on AIVA and conducting comprehensive testing to ensure
                                optimal performance. Our team is working diligently to deliver a revolutionary AI sales
                                assistant that exceeds expectations.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-customGrayLight text-customBlack rounded-full font-semibold hover:bg-customGray transition-all duration-300 hover:scale-105"
                                >
                                    Get in Touch for Details
                                </Link>
                                <span className="text-customGrayDarker text-sm">
                                    Ready to discuss implementation? Contact us today.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Product;