import { TextGenerateEffect } from '../ui/text-generate-effect'
import { motion } from 'framer-motion'
import { Spotlight2 } from '../ui/spotlight2'
import { Common, View } from '../canva/View'

const About = () => {
    return (
        <div className="w-full min-h-screen relative overflow-hidden">
            {/* Minimal background pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0),
                        linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%)
                    `,
                    backgroundSize: '24px 24px, 120px 120px'
                }} />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Main Content - Full Width */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16">
                <div className="w-full">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-customGrayDark to-customGrayDarker"></div>
                            <span className="text-sm tracking-[0.2em] uppercase text-customGrayDark font-medium">
                                About
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-widest text-customGrayDark">
                            INNOVATE
                            <br />
                            <span className="text-customGrayDarker">THE UNSEEN</span>
                        </h1>
                    </motion.div>

                    {/* Content Grid - Full Width */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
                        {/* Left Column - Company Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5 xl:col-span-4 space-y-8"
                        >
                            <div>
                                <h2 className="text-lg font-regular text-customGrayDark mb-4 tracking-wider">
                                    COMPANY
                                </h2>
                                <p className="text-base leading-relaxed text-customGray font-light">
                                    At <span className="font-medium text-customGrayDark">EXOVANCE</span>, we are pioneers in technology innovation, redefining the limits of what's possible through intelligent solutions.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-regular text-customGrayDark mb-3 tracking-wider">
                                    LOCATION
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-base text-customGray font-light">India</span>
                                    <span className="text-lg">🇮🇳</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Story */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-7 xl:col-span-8 space-y-8"
                        >
                            <div>
                                <h2 className="text-lg font-regular text-customGrayDark mb-6 tracking-wider">
                                    OUR STORY
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-customGray font-light">
                                        Founded in 2025, EXOVANCE emerged from a vision to transform how technology integrates with human potential. We began as a small team of innovators who believed that the most profound solutions come from understanding the unseen challenges.
                                    </p>
                                    <p className="text-base leading-relaxed text-customGray font-light">
                                        Today, we craft intelligent solutions across AI, web development, and emerging technologies. Our approach combines technical excellence with thoughtful design, creating experiences that feel both powerful and natural.
                                    </p>
                                    <p className="text-base leading-relaxed text-customGray font-light">
                                        This is just the beginning of our journey to redefine what technology can achieve.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Stats/Info - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-20 pt-12 border-t border-customGrayLight"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                            <div className="lg:col-span-2">
                                <div className="text-3xl font-light text-customGrayDark mb-2 tracking-wider">
                                    2025
                                </div>
                                <div className="text-sm text-customGrayDarker tracking-widest uppercase">
                                    Founded
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="text-3xl font-light text-customGrayDark mb-2 tracking-wider">
                                    Innovation
                                </div>
                                <div className="text-sm text-customGrayDarker tracking-widest uppercase">
                                    Core Focus
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="text-3xl font-light text-customGrayDark mb-2 tracking-wider">
                                    Global
                                </div>
                                <div className="text-sm text-customGrayDarker tracking-widest uppercase">
                                    Reach
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About