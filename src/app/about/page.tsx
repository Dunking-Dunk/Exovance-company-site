"use client";

import React from 'react'
import Mission from './_section/Mission'
import Story from './_section/Story'
import StoryHook from './_section/StoryHook'
import Community from './_section/Community'
import Principles from './_section/Principles'
import Journey from './_section/Journey'

const About = () => {
    return (
        <main className="w-full h-full relative">
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