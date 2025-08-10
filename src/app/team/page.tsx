import React from 'react'
import TeamCarousel from './_component/TeamCarousel'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import Leadership from './_section/Leadership'
import CoreTeam from './_section/CoreTeam'
import CommunityAdvisors from './_section/CommunityAdvisors'
import CultureValues from './_section/CultureValues'
import JoinTeam from './_section/JoinTeam'
import dynamic from 'next/dynamic'
import Footer from '@/components/global/Footer'

const View: any = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
    ssr: false
})

const TransparentPlane: any = dynamic(() => import("@/components/canva/TransparentPlane").then((mod: any) => mod.TransparentPlane), {
    ssr: false
})

const TeamPage = () => {
    return (
        <main className='w-full h-full relative z-10'>

            <section className='w-full h-full py-60'>
                <div className="px-4 md:px-32">
                    <TextGenerateEffect className='text-5xl md:text-9xl text-customGrayLight mb-6'
                        words='Meet the Innovators <br/> of Exovance'
                    />
                    <p className='text-lg text-customGrayDark max-w-3xl leading-relaxed'
                    >
                        We are a collective of driven undergraduate students operating at the forefront of deep tech. Our founding team is a testament to the power of synergy, uniting a diverse range of talents from intricate UI/UX design to robust backend development. This multidisciplinary approach allows us to architect solutions from concept to code, tackling complex challenges with a holistic and innovative perspective that is unconstrained by convention.
                    </p>
                </div>
                <TeamCarousel />
            </section>
            <Leadership />
            <CoreTeam />
            {/* <CommunityAdvisors /> */}
            <CultureValues />
            <JoinTeam />

            {/* @ts-ignore */}
            <View className="fixed inset-0 z-[0] pointer-events-none">
                <TransparentPlane />
            </View>
        </main>
    )
}

export default TeamPage