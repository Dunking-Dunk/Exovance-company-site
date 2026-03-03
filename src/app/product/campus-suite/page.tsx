"use client";

import React from 'react';
import HeroSection from './_section/HeroSection';
import ScheduleModule from './_section/ScheduleModule';
import IntelligenceModule from './_section/IntelligenceModule';
import TargetInstitutions from './_section/TargetInstitutions';
import ComingModules from './_section/ComingModules';
import CTASection from './_section/CTASection';

const CampusSuitePage = () => {
    return (
        <main className="relative h-full px-6 md:px-12 lg:px-28 py-20 z-10">
            <HeroSection />
            <div className="max-w-7xl mx-auto mt-32 space-y-32">
                <ScheduleModule />
                <IntelligenceModule />
                <TargetInstitutions />
                <ComingModules />
                <CTASection />
            </div>
        </main>
    );
};

export default CampusSuitePage;
