"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { DotBackground } from '@/components/ui/dot-background'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import MagicBento from '@/components/ui/MagicBento'

const Product = () => {
    return (
        <div className="w-full h-full relative z-20" >

            <div className="absolute inset-0 z-0">
                <DotBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customBlack/5 to-transparent" />
            </div>

            <div className="relative w-full h-full flex flex-col justify-center px-4 md:px-8 lg:px-32 md:py-32">

                <div className="flex items-center space-x-3 mb-8 md:mb-12">
                    <div className="w-1 h-8 bg-gradient-to-b from-customGrayDark to-customGrayDarker" />
                    <span className="text-sm tracking-[0.2em] uppercase text-customGrayDark font-medium">
                        Our Flagship Product
                    </span>
                </div>

                {/* Product Title */}
                <div className="mb-8 md:mb-16">
                    <TextGenerateEffect
                        duration={1.2}
                        words='AIVA <br/> THE FUTURE'
                        className='text-6xl md:text-8xl lg:text-[120px] xl:text-[140px] font-medium tracking-wider leading-none'
                    />
                </div>

                {/* Subtitle */}
                <div className="mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                        ARTIFICIAL INTELLIGENCE VIRTUAL AGENT
                    </h2>
                </div>

                <div className="max-w-5xl mb-16 md:mb-24">
                    <p className="text-lg md:text-xl lg:text-xl leading-relaxed text-customGrayDark">
                        AIVA is more than AI — it's your all-in-one, charming, intelligent sales assistant that engages,
                        recommends, explains, and sells. With human touch and machine power, AIVA revolutionizes the
                        future of selling in the market through emotional intelligence and seamless customer interactions.
                    </p>
                </div>

                <div className="relative w-full mb-16 md:mb-24">
                    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] rounded-2xl overflow-hidden group">

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

                        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:p-16">
                            <div className="max-w-3xl">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-medium text-white mb-2 md:mb-4 tracking-wide">
                                    AIVA in Action
                                </h3>
                                <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed mb-4 md:mb-6 hidden sm:block">
                                    Experience the future of retail with our intelligent kiosk system.
                                </p>
                                <div className="flex flex-wrap gap-2 md:gap-4">
                                    <span className="px-3 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-white/30">
                                        Mobile Design
                                    </span>
                                    <span className="px-3 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-white/30">
                                        3D Avatar
                                    </span>
                                    <span className="px-3 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-white/30 hidden sm:inline-block">
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

                <div className="mb-16 md:mb-24">

                    <div className='w-full'>
                        <MagicBento
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            disableAnimations={false}
                            spotlightRadius={300}
                            particleCount={8}
                            enableTilt={true}
                            glowColor="160, 160, 160"
                            clickEffect={true}
                            enableMagnetism={true}
                        />
                    </div>
                </div>


                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-customGrayDark/5 to-transparent rounded-3xl"></div>

                    <div className="relative text-center">

                        <div className="flex items-center justify-center mb-8">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-customGrayDark to-transparent"></div>
                            <div className="mx-4 w-2 h-2 bg-customGrayDark rounded-full"></div>
                            <div className="w-16 h-px bg-gradient-to-r from-customGrayDark via-transparent to-transparent"></div>
                        </div>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-customGrayDark tracking-wide">
                            Ready to revolutionize
                        </h3>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-customGrayDarker tracking-wide">
                            your retail experience?
                        </h3>


                        <p className="text-lg md:text-xl text-customGrayDarker mb-12 max-w-2xl mx-auto leading-relaxed">
                            Discover how AIVA can transform your business with AI-powered sales assistance and seamless customer interactions.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {/* Primary CTA Button */}
                            <div className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-customGrayDark to-customGrayDarker rounded-xl opacity-20 group-hover:opacity-40 transition duration-300 blur"></div>
                                <Button
                                    className="relative px-10 py-5 bg-customGrayDark text-white hover:bg-customGrayDark/90 transition-all duration-300 flex items-center space-x-3 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl"
                                    onClick={() => {

                                        console.log('Navigate to detailed AIVA product page');
                                    }}
                                >
                                    <span>Explore AIVA in Detail</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </div>


                            <div className="group relative">
                                <Button
                                    variant="outline"
                                    className="px-10 py-5 border-2 border-customGrayDark text-customGrayDark hover:bg-customGrayDark hover:text-white transition-all duration-300 rounded-xl font-medium text-lg shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        console.log('Request demo');
                                    }}
                                >
                                    <span>Request Demo</span>
                                </Button>
                            </div>
                        </div>


                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-customGrayDarker">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-customGrayDark rounded-full"></div>
                                <span>No setup fees</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-customGrayDark rounded-full"></div>
                                <span>24/7 AI support</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-customGrayDark rounded-full"></div>
                                <span>Instant deployment</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product