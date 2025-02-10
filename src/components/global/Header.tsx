import Link from 'next/link'
import React from 'react'
import { FollowerPointerCard } from '../ui/following-pointer'
import CompanyName from './Company-name'
import { Circle } from 'lucide-react'
import { ModeToggle } from './Toggle-Mode'
import WaveStatus from '../ui/wave-status'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlitchText from '../ui/glitch-text'

const Header = () => {
    const { scrollYProgress } = useScroll();

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
            <div className='flex justify-between w-full md:px-36 px-2 md:py-8 py-4'>
                <div>
                    <Link href={'/'}>
                        <CompanyName className='text-2xl' />
                    </Link>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex gap-x-4 items-center'>
                        <GlitchText className='text-customGrayLight' text='STABILITY'
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