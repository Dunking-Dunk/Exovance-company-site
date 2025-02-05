"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

const AnimatedParagraph = () => {
    return (
        <div className="relative space-y-6 h-full overflow-hidden md:p-8 py-4">
            {/* First Section */}
            <div className="items-center gap-4 inline-flex">
                <p className="text-2xl leading-relaxed font-normal text-customGrayDark">
                At <span className="font-bold">EXOVANCE</span>, we are <span className="font-bold">pioneers</span> and <span className="font-bold">innovators</span> in the field of <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>  <img src={"/gif/ai-hologram.gif"} alt="India Flag" className="inline-block mx-4 w-30 h-20" /> .
                    We are based in <span className="font-bold">India</span> <img src={"/gif/flag_of_india.gif"} alt="India Flag" className="inline-block w-20 h-12 mx-4" /> and dedicated to <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>.
                    Our goal is to develop <span className="font-bold">advanced</span> and <span className="font-bold">unknown technologies</span> that can <span className="font-bold">transform</span> the world. <img src={"/gif/earth.gif"} alt="India Flag" className="inline-block mx-4 w-24 h-20" /> 
                </p>
            </div>
        </div>
    )
}

export default AnimatedParagraph