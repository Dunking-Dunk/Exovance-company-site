"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

const AnimatedParagraph = () => {
    return (
        <div className="relative space-y-6 overflow-hidden p-8">
            {/* First Section */}
            <div className="flex items-center gap-4">
                <p className="text-3xl leading-relaxed font-normal text-customGrayDark">
                    At <span className="font-bold">EXOVANCE</span>, we are <span className="font-bold">pioneers</span> and <span className="font-bold">innovators</span> in the field of <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>.
                </p>
            </div>

            {/* Second Section */}
            <div className="flex items-center gap-4">
                <p className="text-3xl leading-relaxed font-normal text-customGrayDark">
                    We are based in <span className="font-bold">India</span> <img src={"/gif/flag_of_india.gif"} alt="India Flag" className="inline-block w-20 h-12" /> and dedicated to <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>.
                </p>
            </div>

            {/* Third Section */}
            <div className="flex items-center gap-4">
                <p className="text-3xl leading-relaxed font-normal text-customGrayDark">
                    Our goal is to develop <span className="font-bold">advanced</span> and <span className="font-bold">unknown technologies</span> that can <span className="font-bold">transform</span> the world.
                </p>
            </div>

            {/* Background Decoration */}
            <motion.div
                className="absolute -z-10 w-full h-full rounded-2xl opacity-5 bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}

export default AnimatedParagraph