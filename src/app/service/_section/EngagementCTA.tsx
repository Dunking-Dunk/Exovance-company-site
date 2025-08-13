"use client"

import React from 'react'
import Link from 'next/link'

const EngagementCTA = () => {
    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20">
            <div className="relative z-10 max-w-5xl mx-auto rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-customGrayLight">Ready to automate with agents?</h3>
                <p className="text-customGrayDarker mt-3">Start with a 2-week pilot focused on one high-impact workflow. Clear success metrics, tangible results.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                    {['Discovery call (30m)', 'Pilot plan', 'Fixed price', 'Hands-on support'].map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10 text-customGray bg-white/10">{t}</span>
                    ))}
                </div>
                <Link href="/contact" className="inline-block mt-7 px-6 py-3 rounded-lg border border-white/30 text-customGrayLight bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">Book a call</Link>
            </div>
        </section>
    )
}

export default EngagementCTA


