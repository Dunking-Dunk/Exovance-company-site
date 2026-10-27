"use client";

import React from 'react'
import dynamic from 'next/dynamic'
import Mission from './_section/Mission'
import Story from './_section/Story'
import StoryHook from './_section/StoryHook'
import Community from './_section/Community'
import Principles from './_section/Principles'
import Journey from './_section/Journey'

const HoverShapes = dynamic(() => import('@/components/canva/HoverShapes'), { ssr: false })

const About = () => {
    return (
        <main className="w-full h-full relative">
            <HoverShapes />
            <StoryHook />
            <Mission />
            <Story />
            {/* <Community /> */}
            {/* <Principles /> */}
            <Journey />
        </main>
    )
}

export default About