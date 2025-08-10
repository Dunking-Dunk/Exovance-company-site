"use client";

import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const ContactCTA = () => {
    return (
        <section className="relative w-full h-full z-[10] py-20 px-4 md:px-8 lg:px-32">
            <div className="">
                <SpotlightCard className="p-8 border-customGrayDark/30 bg-customBlackAlt/5 text-center">
                    <h3 className="text-2xl font-semibold text-customGray mb-4">
                        Ready to Start Your Project?
                    </h3>
                    <p className="text-customGrayDarker mb-6 max-w-2xl mx-auto">
                        Whether you're looking to automate processes, build custom applications, or explore AI solutions,
                        we're here to help you achieve your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:exovancelab@gmail.com"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-customGrayLight text-customBlack hover:bg-customGray transition-colors"
                        >
                            Start a Project
                        </a>
                        <a
                            href="tel:+918056201341"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-customGrayDark/40 text-customGrayLight hover:border-customGrayDark/70 hover:text-customGray transition-colors"
                        >
                            Schedule a Call
                        </a>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
};

export default ContactCTA;
