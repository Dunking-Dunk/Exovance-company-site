import { TextGenerateEffect } from '../ui/text-generate-effect'
import { motion } from 'framer-motion'
import { Spotlight2 } from '../ui/spotlight2'
import { Common, View } from '../canva/View'

const About = () => {
    return (
        <div className="w-full min-h-screen bg-customBlack text-customGray relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <Spotlight2 />
            </div>
            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-16 lg:px-48">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center">
                            <TextGenerateEffect
                                words="INNOVATE <br/> THE UNSEEN"
                                duration={3}
                                className="text-customGray text-6xl md:text-7xl lg:text-8xl font-semibold"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-6"
                        >
                            <motion.p
                                className="text-xl text-customGrayDark leading-relaxed"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                At <span className="font-bold dark:text-white text-black">EXOVANCE</span>, we are <span className="font-bold dark:text-white text-black">pioneers</span> and <span className="font-bold dark:text-white text-black">innovators</span> in the field of <span className="font-bold dark:text-white text-black">technology</span>.
                            </motion.p>
                            <motion.div
                                className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <span className="font-bold dark:text-white text-black">Based in India</span>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    🇮🇳
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-3xl md:text-4xl font-bold dark:text-white text-black"
                        >
                            Our Story
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="space-y-6 text-customGrayDark"
                        >
                            <motion.p
                                whileHover={{ scale: 1.02, x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Founded in 2025, EXOVANCE is driven by a mission to redefine the limits of technology. What began as a small team of visionaries has evolved into a powerhouse of innovation, crafting intelligent solutions in AI, web development, and beyond.
                            </motion.p>
                            <motion.p
                                whileHover={{ scale: 1.02, x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                We're just getting started—this is only the beginning of a transformative journey
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About