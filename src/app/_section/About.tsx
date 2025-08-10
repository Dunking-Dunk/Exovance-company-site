"use client"

import { motion } from 'framer-motion'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { DotBackground } from '@/components/ui/dot-background'
import React from 'react';

const About = () => {
    return (
        <div className="w-full min-h-screen relative overflow-hidden z-20">

            <div className="absolute inset-0 z-0">
                <DotBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customBlack/5 to-transparent" />
            </div>

            <div className="relative z-10 w-full flex flex-col justify-center px-4 md:px-8 lg:px-32 py-20 md:py-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center space-x-3 mb-8 md:mb-12"
                >
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 32 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-1 bg-gradient-to-b from-customGrayDark to-customGrayDarker"
                    />
                    <span className="text-sm tracking-[0.2em] uppercase text-customGrayDark font-medium">
                        What We Do
                    </span>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-8 md:mb-12"
                >
                    <TextGenerateEffect
                        duration={1.2}
                        words='INNOVATE THE <br/> UNSEEN'
                        className='text-6xl md:text-8xl lg:text-[120px] xl:text-[140px] font-medium tracking-wider leading-none'
                    />
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-5xl"
                >
                    <p
                        className="text-lg md:text-xl lg:text-xl leading-relaxed text-customGrayDark"
                    >
                        At EXOVANCE, we specialize in building cutting-edge AI virtual agents powered by lifelike 3D avatars. Our intelligent agents can serve as sales representatives, billing counter assistants, and customer service representatives, all housed in movable kiosks for maximum flexibility. Beyond virtual agents, we provide a comprehensive range of automation services designed to streamline your business operations and enhance customer experiences.
                    </p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="mt-16 md:mt-24 flex flex-wrap gap-4"
                >
                    {['AI Agents', '3D Avatars', 'Automation', 'Virtual Kiosks'].map((keyword, index) => (
                        <motion.span
                            key={keyword}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                            className="px-4 py-2 text-sm tracking-wide border border-customGrayDark/30 rounded-full text-customGrayDark hover:border-customGrayDark/60 transition-colors duration-300"
                        >
                            {keyword}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default About