"use client"

import React from 'react'

const AnimatedParagraph = () => {
    return (
        <div className="relative space-y-6 h-full overflow-hidden md:p-8 py-4">
                <p  style={{lineHeight: '2'}} className="md:text-4xl text-2xl text-customGrayDark">
                At <span className="font-bold">EXOVANCE</span>, we are <span className="font-bold">pioneers</span> and <span className="font-bold">innovators</span> in the field of <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>.
                    We are based in <span className="font-bold">India</span> <img src={"/gif/india.gif"} alt="India Flag" className="inline-block w-20 h-12 mx-4" /> and dedicated to <span className="font-bold">technology</span> and <span className="font-bold">innovation</span>.
                    Our goal is to develop <span className="font-bold">advanced</span> and <span className="font-bold">unknown technologies</span> that can <span className="font-bold">transform</span> the world. 
                </p>
        </div>
    )
}

export default AnimatedParagraph