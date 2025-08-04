import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { foundingTeam, type FoundingTeamMember } from '@/lib/data';
import SpotlightCard from '../ui/SpotlightCard';
import ShinyText from '../ui/ShinyText';


const CircularGallery = dynamic(() => import('@/components/ui/CircularGallery'), { ssr: false });

const Team = () => {
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
    const selectedMember = foundingTeam[selectedMemberIndex];

    const handleCenterItemChange = (index: number) => {
        setSelectedMemberIndex(index);
    };

    return (
        <div className="w-full min-h-screen z-[30] py-8">
            {/* Header Section */}
            <div className="text-center mb-4">
                <h1 className='text-5xl md:text-6xl font-bold mb-4 text-customGrayLight'>
                    Meet Our Team
                </h1>
                <p className='text-lg text-customGray max-w-2xl mx-auto leading-relaxed'>
                    We are a group of passionate students dedicated to building and developing in the field of deep tech.
                </p>
            </div>



            <div className="w-full h-[600px] overflow-hidden">
                <CircularGallery
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                    onCenterItemChange={handleCenterItemChange}
                />
            </div>


            <div className='w-full flex items-center justify-center px-4 h-[400px]'>
                <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.3)" className='max-w-lg'>
                    <div className="text-center p-2">
                        <h4 className="text-3xl md:text-4xl font-bold text-customGrayLight mb-3 transition-all duration-300">
                            {selectedMember.name}
                        </h4>
                        <div className="inline-block px-4 py-2 mb-6  rounded-full border border-white">
                            <ShinyText className="text-xl text-customGrayLight font-semibold" text={selectedMember.role} speed={3} />
                        </div>
                        <p className="text-customGrayLight leading-relaxed text-lg opacity-90">
                            {selectedMember.description}
                        </p>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}

export default Team;