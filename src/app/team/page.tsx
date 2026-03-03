import React from 'react'
import TeamCarousel from './_component/TeamCarousel'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import Leadership from './_section/Leadership'
import CoreTeam from './_section/CoreTeam'
import CommunityAdvisors from './_section/CommunityAdvisors'
import CultureValues from './_section/CultureValues'
import JoinTeam from './_section/JoinTeam'


const TeamPage = () => {
    return (
        <main className='w-full h-full relative z-10'>

            <section className='relative w-full pt-40 md:pt-56 pb-0 overflow-hidden'>
                {/* Ambient bloom */}
                <div
                    className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(100,0,200,0.07) 0%, transparent 100%)' }}
                />
                <div className="relative z-10 px-6 md:px-12 lg:px-28 mb-20">
                    <p className='font-mono text-[10px] tracking-[0.5em] text-violet-400/50 uppercase mb-10'>
                        The People Behind It
                    </p>
                    <TextGenerateEffect className='text-6xl md:text-9xl text-customGrayLight mb-8'
                        words='The Team <br/> Behind Exovance'
                    />
                    <p className='text-lg text-customGrayDark max-w-2xl leading-relaxed'>
                        We&rsquo;re final-year engineering students from Tamil Nadu. We got tired of watching our campus run on WhatsApp groups and spreadsheets. So we built the tools to fix it &mdash; and decided to keep going.
                    </p>
                </div>
                <TeamCarousel />
            </section>
            <Leadership />
            {/* <CoreTeam /> */}
            {/* <CommunityAdvisors /> */}
            <CultureValues />
            <JoinTeam />
        </main>
    )
}

export default TeamPage