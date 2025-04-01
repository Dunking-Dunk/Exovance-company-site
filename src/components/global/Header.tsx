import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FollowerPointerCard } from '../ui/following-pointer'
import CompanyName from './Company-name'
import { Circle, Sun, Moon } from 'lucide-react'
import WaveStatus from '../ui/wave-status'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlitchText from '../ui/glitch-text'
import { useTheme } from 'next-themes'

const Header = () => {
    const { scrollYProgress } = useScroll();
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

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

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    // Prevent hydration mismatch by not rendering theme-dependent content until mounted
    if (!mounted) {
        return (
            <div className='fixed w-full top-0 z-50'>
                <div className='flex md:justify-between justify-center w-full md:px-36 px-2 py-8'>
                    <div className='cursor-pointer'>
                        <CompanyName className='md:text-2xl text-3xl' />
                    </div>
                    <div className='md:flex hidden flex-col gap-y-2 items-center'>
                        <div className='flex gap-x-4 items-center'>
                            <GlitchText className='text-customGrayLight w-20' text='STABILITY'
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
                            {/* Desktop Theme Toggle placeholder */}
                            <div className="p-2 rounded-full bg-background border border-border shadow-sm">
                                <div className="h-5 w-5" />
                            </div>
                        </div>
                        <WaveStatus />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='fixed w-full top-0 z-50'>
            <div className='flex md:justify-between justify-center w-full md:px-36 px-2 py-8'>
                <div onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className='cursor-pointer'>
                    <CompanyName className='md:text-2xl text-3xl' />
                </div>
                <div className='md:flex hidden flex-col gap-y-2 items-center'>
                    <div className='flex gap-x-4 items-center'>
                        <GlitchText className='text-customGrayLight w-20' text='STABILITY'
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
                        {/* Desktop Theme Toggle - Same as mobile version */}
                        <motion.button
                            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full bg-background border border-border shadow-sm"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {resolvedTheme === 'dark' ? (
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Sun className="h-5 w-5 text-yellow-500" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Moon className="h-5 w-5 text-gray-700" />
                                </motion.div>
                            )}
                        </motion.button>
                    </div>
                    <WaveStatus />
                </div>
                {/* Mobile Theme Toggle */}
                <motion.button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="md:hidden fixed right-4 top-8 p-2 rounded-full bg-background border border-border shadow-sm"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {resolvedTheme === 'dark' ? (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sun className="h-5 w-5 text-yellow-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Moon className="h-5 w-5 text-gray-700" />
                        </motion.div>
                    )}
                </motion.button>
            </div>
        </div>
    )
}

export default Header