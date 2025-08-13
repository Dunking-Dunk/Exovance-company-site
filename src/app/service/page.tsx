import React from 'react'
import ServiceOverview from './_section/ServiceOverview'
import AIAutomationIntro from './_section/AIAutomationIntro'
import AIUseCases from './_section/AIUseCases'
import AgentProcess from './_section/AgentProcess'
import EngagementCTA from './_section/EngagementCTA'
import FAQ from './_section/FAQ'
import ServiceProjects from './_section/ServiceProjects'
import AIVoiceAgent from './_section/AIVoiceAgent'

type Props = {}

const Page = (props: Props) => {
    return (
        <div className='w-full h-full relative overflow-x-hidden'>
            <ServiceOverview />
            <AIAutomationIntro />
            <AIVoiceAgent />
            <AIUseCases />
            <AgentProcess />
            <ServiceProjects />
            <EngagementCTA />
            <FAQ />
        </div>
    )
}

export default Page