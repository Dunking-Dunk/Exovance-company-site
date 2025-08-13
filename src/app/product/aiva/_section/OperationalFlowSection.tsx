import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const OperationalFlowSection = () => {
    return (
        <div className="relative">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-customGrayLight/20 to-transparent"></div>
            </div>

            {/* Section header */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 border border-customGrayLight/30 mb-6">
                    <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-4 tracking-tight">
                    Operational Flow
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-customGrayLight to-transparent mx-auto mb-4"></div>
                <p className="text-lg text-customGrayDark max-w-2xl mx-auto">
                    Experience the seamless customer journey from greeting to purchase completion
                </p>
            </div>

            {/* Enhanced flow cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="relative">
                    <SpotlightCard
                        className="group h-full text-center p-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">👋</span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-customGrayLight/20 rounded-full flex items-center justify-center text-xs font-bold text-customGrayLight border border-customGrayLight/30">
                                1
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Greeting
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed">
                            Warmly greets customers as they approach and intelligently identifies their needs through natural conversation
                        </p>
                        <div className="mt-4 pt-4 border-t border-customGrayDark/20">
                            <span className="text-xs text-customGrayLight/80 font-medium">INITIAL CONTACT</span>
                        </div>
                    </SpotlightCard>
                    {/* Connecting line for large screens */}
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-customGrayLight/40 to-transparent transform -translate-y-1/2"></div>
                </div>

                <div className="relative">
                    <SpotlightCard
                        className="group h-full text-center p-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">🔍</span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-customGrayLight/20 rounded-full flex items-center justify-center text-xs font-bold text-customGrayLight border border-customGrayLight/30">
                                2
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Discovery
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed">
                            Showcases product features, detailed comparisons, and interactive demonstrations tailored to customer interests
                        </p>
                        <div className="mt-4 pt-4 border-t border-customGrayDark/20">
                            <span className="text-xs text-customGrayLight/80 font-medium">PRODUCT EXPLORATION</span>
                        </div>
                    </SpotlightCard>
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-customGrayLight/40 to-transparent transform -translate-y-1/2"></div>
                </div>

                <div className="relative">
                    <SpotlightCard
                        className="group h-full text-center p-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">💡</span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-customGrayLight/20 rounded-full flex items-center justify-center text-xs font-bold text-customGrayLight border border-customGrayLight/30">
                                3
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Recommendation
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed">
                            Intelligently suggests the best options and identifies strategic upselling opportunities based on customer behavior
                        </p>
                        <div className="mt-4 pt-4 border-t border-customGrayDark/20">
                            <span className="text-xs text-customGrayLight/80 font-medium">PERSONALIZED SUGGESTIONS</span>
                        </div>
                    </SpotlightCard>
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-customGrayLight/40 to-transparent transform -translate-y-1/2"></div>
                </div>

                <div className="relative">
                    <SpotlightCard
                        className="group h-full text-center p-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors"
                        spotlightColor="rgba(160, 160, 160, 0.15)"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">💳</span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-customGrayLight/20 rounded-full flex items-center justify-center text-xs font-bold text-customGrayLight border border-customGrayLight/30">
                                4
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Purchase
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed">
                            Seamlessly guides customers to secure payment options or checkout process with minimal friction
                        </p>
                        <div className="mt-4 pt-4 border-t border-customGrayDark/20">
                            <span className="text-xs text-customGrayLight/80 font-medium">TRANSACTION COMPLETION</span>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </div>
    );
};

export default OperationalFlowSection;
