"use client";

import React from 'react';
import {
    HeroSection,
    OverviewSection,
    CoreFunctionalitiesSection,
    DataAnalyticsSection,
    OperationalFlowSection,
    KeyFeaturesSection,
    FinalCTASection
} from './_section';

const Product = () => {
    return (
        <main className="relative h-full px-4 md:px-8 lg:px-32 py-20 z-10">
            {/* Hero Section */}
            <HeroSection />

            {/* Main Content Sections */}
            <div className="max-w-7xl mx-auto mt-32 space-y-32">
                {/* Overview Section */}
                <OverviewSection />

                {/* Core Functionalities Section */}
                <CoreFunctionalitiesSection />

                {/* Data Analytics Section */}
                <DataAnalyticsSection />

                {/* Operational Flow Section */}
                <OperationalFlowSection />

                {/* Key Features Section */}
                <KeyFeaturesSection />

                {/* Final CTA Section */}
                <FinalCTASection />
            </div>
        </main>
    );
};

export default Product;

