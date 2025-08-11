import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const DataAnalyticsSection = () => {
    return (
        <div className="relative">
            {/* Section header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 border border-customGrayLight/30 mb-6">
                    <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-4 tracking-tight">
                    Data & Analytics
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-customGrayLight to-transparent mx-auto mb-4"></div>
                <p className="text-lg text-customGrayDark max-w-2xl mx-auto">
                    Harness the power of advanced analytics to understand customer behavior and optimize your sales strategy
                </p>
            </div>

            {/* Enhanced grid layout */}
            <div className="grid md:grid-cols-2 md:grid-rows-2 gap-8 lg:gap-12">
                <SpotlightCard
                    className="group p-8 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-2xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-[1.02]"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">👁️</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-customGrayLight mb-3 group-hover:text-white transition-colors">
                                Behavioral Insights
                            </h4>
                            <p className="text-customGrayDarker leading-relaxed">
                                Captures detailed customer behavior data including eye contact, dwell time, clicks, and hesitations to provide deep insights into customer preferences.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Eye Tracking
                                </span>
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Interaction Analysis
                                </span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="group p-8 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-2xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-[1.02]"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">📋</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-customGrayLight mb-3 group-hover:text-white transition-colors">
                                Actionable Reports
                            </h4>
                            <p className="text-customGrayDarker leading-relaxed">
                                Generates comprehensive reports for businesses to optimize sales, marketing, and R&D strategies with data-driven recommendations.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Sales Optimization
                                </span>
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Marketing Insights
                                </span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="group p-8 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-2xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-[1.02]"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">📈</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-customGrayLight mb-3 group-hover:text-white transition-colors">
                                Analytics Dashboard
                            </h4>
                            <p className="text-customGrayDarker leading-relaxed">
                                Real-time dashboard provides insights into product interest and conversion rates with interactive visualizations and KPI tracking.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Real-time Data
                                </span>
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    KPI Tracking
                                </span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                <SpotlightCard
                    className="group p-8 bg-gradient-to-br from-customBlackAlt/10 via-customBlackAlt/5 to-transparent border border-customGrayDark/30 rounded-2xl hover:border-customGrayLight/40 transition-all duration-500 hover:scale-[1.02]"
                    spotlightColor="rgba(160, 160, 160, 0.15)"
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-customGrayLight/20 to-customGrayLight/10 rounded-xl flex items-center justify-center border border-customGrayLight/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">🔗</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-customGrayLight mb-3 group-hover:text-white transition-colors">
                                CRM Integration
                            </h4>
                            <p className="text-customGrayDarker leading-relaxed">
                                Seamlessly integrates with existing CRM systems to create detailed customer profiles for targeted marketing and personalized experiences.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    Customer Profiles
                                </span>
                                <span className="px-3 py-1 bg-customGrayLight/10 text-customGrayLight text-xs rounded-full border border-customGrayLight/20">
                                    API Integration
                                </span>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
};

export default DataAnalyticsSection;
