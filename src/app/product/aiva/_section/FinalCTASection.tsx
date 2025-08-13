import React from 'react';
import Link from 'next/link';

const FinalCTASection = () => {
    return (
        <div className="relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-customGrayLight/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-customGrayLight/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-customGrayLight/10 to-transparent"></div>
                </div>
            </div>

            <div className="text-center space-y-10 py-24">
                <div className="max-w-5xl mx-auto relative">
                    {/* Status indicator with enhanced styling */}
                    <div className="inline-flex items-center justify-center mb-8">
                        <div className="relative p-8 rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150">
                            {/* Animated status light */}
                            <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-customBlack shadow-lg">
                                <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-xl font-bold text-customGrayLight tracking-wide">
                                    PRODUCT STATUS
                                </span>
                                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Main heading with gradient */}
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-customGrayLight via-white to-customGrayLight bg-clip-text text-transparent">
                            AIVA is in
                        </span>
                        <br />
                        <span className="text-customGrayLight">
                            Finishing Stage
                        </span>
                    </h3>

                    {/* Enhanced description */}
                    <div className="max-w-4xl mx-auto mb-10">
                        <p className="text-xl md:text-2xl leading-relaxed text-customGrayDark font-light">
                            We're putting the final touches on AIVA and conducting comprehensive testing to ensure
                            optimal performance. Our team is working diligently to deliver a revolutionary AI sales
                            assistant that exceeds expectations.
                        </p>
                    </div>

                    {/* Progress indicators */}
                    <div className="flex justify-center items-center space-x-8 mb-12">
                        <div className="text-center">
                            <div className="w-4 h-4 bg-customGrayLight rounded-full mb-2 mx-auto"></div>
                            <span className="text-xs text-customGrayLight/80 font-medium">Development</span>
                        </div>
                        <div className="w-8 h-0.5 bg-customGrayLight/60"></div>
                        <div className="text-center">
                            <div className="w-4 h-4 bg-customGrayLight rounded-full mb-2 mx-auto"></div>
                            <span className="text-xs text-customGrayLight/80 font-medium">Testing</span>
                        </div>
                        <div className="w-8 h-0.5 bg-customGrayLight/40"></div>
                        <div className="text-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mb-2 mx-auto animate-pulse"></div>
                            <span className="text-xs text-yellow-500 font-medium">Finalizing</span>
                        </div>
                        <div className="w-8 h-0.5 bg-customGrayDark/40"></div>
                        <div className="text-center">
                            <div className="w-4 h-4 bg-customGrayDark/40 rounded-full mb-2 mx-auto"></div>
                            <span className="text-xs text-customGrayDark font-medium">Launch</span>
                        </div>
                    </div>

                    {/* Enhanced CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                        <Link
                            href="/contact"
                            className="group relative px-10 py-5 bg-gradient-to-r from-customGrayLight to-customGray text-customBlack rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                        >
                            {/* Button background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center space-x-2">
                                <span>Get in Touch for Details</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </Link>

                        <div className="text-center space-y-2">
                            <span className="block text-customGrayDarker text-lg">
                                Ready to discuss implementation?
                            </span>
                            <span className="block text-customGrayLight/80 text-sm font-medium">
                                Contact us today for early access opportunities
                            </span>
                        </div>
                    </div>

                    {/* Additional info cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150">
                            <div className="text-2xl mb-3">🚀</div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">Early Access</h4>
                            <p className="text-customGrayDarker text-sm">Be among the first to experience AIVA's revolutionary capabilities</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150">
                            <div className="text-2xl mb-3">💼</div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">Custom Implementation</h4>
                            <p className="text-customGrayDarker text-sm">Tailored solutions for your specific business needs and requirements</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150">
                            <div className="text-2xl mb-3">🤝</div>
                            <h4 className="text-lg font-semibold text-customGrayLight mb-2">Partnership Opportunities</h4>
                            <p className="text-customGrayDarker text-sm">Explore collaboration possibilities and strategic partnerships</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalCTASection;
