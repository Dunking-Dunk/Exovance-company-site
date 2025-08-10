import React from 'react'
import Mission from './_section/Mission'
import Story from './_section/Story'
import Community from './_section/Community'
import Principles from './_section/Principles'
import Journey from './_section/Journey'


const About = () => {
    return (
        <main className="w-full h-full relative">
            <Mission />
            <Story />
            <Community />
            <Principles />
            <Journey />

        </main>
    )
}

export default About