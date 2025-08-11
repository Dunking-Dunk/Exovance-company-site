import React from 'react';

const OverviewSection = () => {
    return (
        <div className="relative text-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-customGrayLight/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-customGrayLight/10 to-customGrayLight/5 border border-customGrayLight/20">
                    <div className="w-2 h-2 bg-customGrayLight rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium text-customGrayLight">Next Generation AI Technology</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-customGrayLight leading-tight">
                    AI VIRTUAL SALES ASSISTANT
                    <span className="block mt-2 bg-gradient-to-r from-customGrayLight to-customGray bg-clip-text text-transparent">
                        & CRM SAAS
                    </span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    <p className="text-xl md:text-2xl leading-relaxed text-customGrayDark font-light">
                        AIVA is an AI-powered virtual sales assistant designed to enhance customer engagement and sales
                        in both in-store and online retail environments. It operates 24/7 with human-like, multilingual
                        interactions to provide personalized recommendations and guided checkout experiences.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
