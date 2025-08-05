"use client"

import React from 'react'
import { services } from '@/lib/data'
import CardSwap, { Card } from '../ui/CardSwap'
import { useMobile } from '@/hooks/useMobile'

type Props = {}

const Service = (props: Props) => {
    const isMobile = useMobile();

    const handleLearnMore = () => {
        window.open('/services', '_blank'); // 
    };

    return (
        <div className="w-full h-screen px-4 md:px-32 py-32 relative z-10">
            <div className={`flex flex-col ${!isMobile ? 'lg:flex-row' : ''} gap-12 h-full`}>
                {/* Left Content Section */}
                <div className={`${!isMobile ? 'lg:w-1/2' : 'w-full'} flex flex-col justify-center`}>
                    <h1 className="text-6xl md:text-8xl font-bold text-customGrayDark mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-customGray max-w-2xl mb-8">
                        Discover our cutting-edge solutions designed to transform your business with innovative technology and AI-powered innovation.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-customGray rounded-full"></div>
                            <span className="text-customGrayLight">AI-Powered Web Development</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-customGray rounded-full"></div>
                            <span className="text-customGrayLight">End-to-End Automation Solutions</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-customGray rounded-full"></div>
                            <span className="text-customGrayLight">Data-Driven Analytics</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-customGrayLight mb-1">10+</div>
                            <div className="text-sm text-customGray">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-customGrayLight mb-1">24/7</div>
                            <div className="text-sm text-customGray">Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-customGrayLight mb-1">99%</div>
                            <div className="text-sm text-customGray">Client Satisfaction</div>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <button
                        onClick={handleLearnMore}
                        className="group relative px-8 py-4 bg-customGrayDark text-customGrayLight font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-customGray transform hover:scale-105 hover:shadow-xl max-w-fit border border-customGray"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Learn More About Our Services
                            <svg
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-customGray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>

                {/* Right Side - CardSwap (Hidden on Mobile) */}
                {!isMobile && (
                    <div className="lg:w-1/2 flex items-center justify-center">
                        <CardSwap
                            width={700}
                            height={500}
                            cardDistance={60}
                            verticalDistance={70}
                            delay={5000}
                            pauseOnHover={false}
                        >
                            {services.map((service, index) => (
                                <Card key={index}>
                                    <div className="relative w-full h-full bg-customBlack">
                                        {/* Video Background */}
                                        <div className="absolute inset-0">
                                            <video
                                                className="w-full h-full object-cover opacity-20"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            >
                                                {/* <source src={`/video/${service.video}.mp4`} type="video/mp4" /> */}
                                            </video>
                                            <div className="absolute inset-0 bg-black/10" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                            <h3 className="text-2xl md:text-3xl font-bold text-customGrayLight mb-4">
                                                {service.title}
                                            </h3>
                                            <p className="text-customGray text-sm md:text-base leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Service