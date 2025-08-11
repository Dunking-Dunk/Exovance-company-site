import React from 'react';
import MagicBento from '@/components/ui/MagicBento';

const CoreFunctionalitiesSection = () => {
    return (
        <div className="relative">
            <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 border border-customGrayLight/30 mb-6">
                    <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-4 tracking-tight">
                    Core Functionalities
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-customGrayLight to-transparent mx-auto"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-customGrayLight/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-customGrayLight/5 rounded-full blur-3xl"></div>
                </div>

                <div className="md:p-8 rounded-3xl bg-gradient-to-br from-customBlackAlt/10 via-transparent to-customBlackAlt/5 backdrop-blur-sm">
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
        </div>
    );
};

export default CoreFunctionalitiesSection;
