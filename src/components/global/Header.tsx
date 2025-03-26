import Link from 'next/link'
import React from 'react'
import { FollowerPointerCard } from '../ui/following-pointer'
import CompanyName from './Company-name'
import { Circle } from 'lucide-react'
import { ModeToggle } from './Toggle-Mode'
import WaveStatus from '../ui/wave-status'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlitchText from '../ui/glitch-text'
import { useTheme } from 'next-themes'

const Header = () => {
    const { scrollYProgress } = useScroll();
    const { setTheme, theme } = useTheme()
    // Transform scroll progress to color values
    const circleColor = useTransform(
        scrollYProgress,
        [0, 1], // Input range (0 = top, 1 = bottom)
        ['#22c55e', '#ef4444'] // Output range (green to red)
    );

    const circleScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1.2] // Subtle scale effect
    );

    return (
        <div className='fixed w-full top-0 z-50'>
            <div className='flex md:justify-between justify-center w-full md:px-36 px-2 py-8'>
                <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='cursor-pointer'>
                    <CompanyName className='md:text-2xl text-3xl' />
                </div>
                <div className='md:flex hidden flex-col gap-y-2 items-center'>
                    <div className='flex gap-x-4 items-center'>
                        <GlitchText className='text-customGrayLight w-28' text='STABILITY'
                            duration={2}
                            glitchIntensity={0.5}
                            repeat={true}
                            delay={4}
                        />
                        <motion.div
                            style={{
                                color: circleColor,
                                scale: circleScale,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Circle />
                        </motion.div>
                        <ModeToggle />
                    </div>
                    <WaveStatus />
                </div>
            </div>
        </div>
    )
}

export default Header