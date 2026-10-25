import React from 'react'
import type { Metadata } from 'next'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import Leadership from './_section/Leadership'
import CoreTeam from './_section/CoreTeam'
import CommunityAdvisors from './_section/CommunityAdvisors'
import CultureValues from './_section/CultureValues'
import JoinTeam from './_section/JoinTeam'


export const metadata: Metadata = {
    title: 'Team',
    description: 'Meet the founder of Exovance.',
    alternates: { canonical: '/team' },
}

const TeamPage = () => {
    return (
        <main className='w-full h-full relative z-10'>

            <section className='relative w-full pt-40 md:pt-56 pb-0 overflow-hidden'>
                {/* Ambient bloom */}
                <div
                    className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.032) 0%, transparent 100%)' }}
                />
                <div className="relative z-10 px-6 md:px-12 lg:px-28 mb-20">
                    <p className='font-mono text-[10px] tracking-[0.5em] text-violet-400/50 uppercase mb-10'>
                        The Person Behind It
                    </p>
                    <TextGenerateEffect className='text-6xl md:text-9xl text-customGrayLight mb-8'
                        words='The Founder <br/> Behind Exovance'
                    />
                    <p className='text-lg text-customGrayDark max-w-2xl leading-relaxed'>
                        I&rsquo;m a final-year engineering student from Tamil Nadu. I got tired of watching our campus run on WhatsApp groups and spreadsheets. So I built the tools to fix it &mdash; and decided to keep going.
                    </p>
                </div>
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