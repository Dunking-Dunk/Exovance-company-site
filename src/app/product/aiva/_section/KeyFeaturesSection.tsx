import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const KeyFeaturesSection = () => {
    return (
        <div className="relative">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-customGrayLight/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-customGrayLight/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Section header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 border border-customGrayLight/30 mb-6">
                    <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-4 tracking-tight">
                    Key Features
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-customGrayLight to-transparent mx-auto mb-4"></div>
                <p className="text-lg text-customGrayDark max-w-2xl mx-auto">
                    Discover the powerful features that make AIVA a revolutionary sales assistant
                </p>
            </div>

            {/* Enhanced feature cards */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                <SpotlightCard
                    className="group text-center p-10 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-3xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-105 relative overflow-hidden"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 right-4 w-20 h-20 border border-customGrayLight/20 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 border border-customGrayLight/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl">🤖</span>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Intelligent Sales Assistant
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed mb-6">
                            Engages customers with natural conversation, provides personalized recommendations, and guides them through the complete sales process with human-like intelligence.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Natural Language Processing</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Personalized Recommendations</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Sales Process Automation</span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="group text-center p-10 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-3xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-105 relative overflow-hidden"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 left-4 w-20 h-20 border border-customGrayLight/20 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 border border-customGrayLight/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl">❤️</span>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Emotional Intelligence
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed mb-6">
                            Combines human touch with machine power to create meaningful connections with customers through advanced emotional understanding and empathetic responses.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Emotion Recognition</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Empathetic Responses</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Human-like Interaction</span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="group text-center p-10 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-3xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-105 relative overflow-hidden"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 right-4 w-20 h-20 border border-customGrayLight/20 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 border border-customGrayLight/20 rounded-full"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-2xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-3xl">📱</span>
                        </div>
                        <h4 className="text-xl font-bold text-customGrayLight mb-4 group-hover:text-white transition-colors">
                            Mobile Kiosk Design
                        </h4>
                        <p className="text-customGrayDarker leading-relaxed mb-6">
                            Features a sleek mobile design with interactive display and 3D avatar for immersive customer experiences that can be deployed anywhere.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Interactive 3D Avatar</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Mobile Deployment</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-customGrayLight/80">
                                <div className="w-2 h-2 bg-customGrayLight/60 rounded-full"></div>
                                <span>Immersive Experience</span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
};

export default KeyFeaturesSection;
