"use client"

import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { foundingTeam, type FoundingTeamMember } from '@/lib/data';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ShinyText from '@/components/ui/ShinyText';
import { useMobile } from '@/hooks/useMobile';


const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false });

const TeamCarousel = () => {
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
    const isMobile = useMobile();

    const handleCenterItemChange = (index: number) => {
        setSelectedMemberIndex(index);
    };

    return (
        <div className="w-full h-full z-[20]">
            <div className="w-full h-[800px] overflow-hidden">
                <CircularGallery
                    bend={isMobile ? 0 : 3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                    onCenterItemChange={handleCenterItemChange}
                />
            </div>

        </div>
    );
}

export default TeamCarousel;