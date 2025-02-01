import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

const WaveStatus = (props: Props) => {
    return (
        <svg width="200" height="40" viewBox="0 0 350 60" xmlns="http://www.w3.org/2000/svg" stroke="var(--custom-gray)" fill=" none" strokeWidth="3">
            < defs >
                <clipPath id="clipWave">
                    <rect x="5" y="5" width="320" height="50" rx="20" ry="20" />
                </clipPath>
            </defs >
            {/* Outer Rounded Rectangle */}
            < rect x="5" y="5" width="320" height="50" rx="20" ry="20" stroke="var(--custom-gray)" strokeWidth="2" />
            <g clipPath="url(#clipWave)">
                <motion.path
                    d="M 10 30 
                        Q 25 10, 40 30 
                        Q 55 50, 70 30 
                        Q 85 10, 100 30 
                        Q 115 50, 130 30 
                        Q 145 10, 160 30 
                        Q 175 50, 190 30 
                        Q 205 10, 220 30 
                        Q 235 50, 250 30 
                        Q 265 10, 280 30
                        Q 295 50, 310 30
                        Q 325 10, 340 30 
                        Q 355 50, 370 30
                        Q 385 10, 400 30
                        Q 415 50, 430 30 
                        Q 445 10, 460 30
                        Q 475 50, 490 30
                        Q 505 10, 520 30
                        Q 535 50, 550 30
                        Q 565 10, 580 30"
                    stroke="var(--custom-gray)"
                    fill="none"
                    strokeWidth="2"
                    initial={{ x: 0 }}

                    animate={{
                        x: -200,
                        transition: {
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                />
                <motion.path
                    d="M 10 20 
                        Q 25 50, 40 30 
                        Q 55 10, 70 30 
                        Q 85 50, 100 30 
                        Q 115 10, 130 30 
                        Q 145 50, 160 30 
                        Q 175 10, 190 30 
                        Q 205 50, 220 30 
                        Q 235 10, 250 30 
                        Q 265 50, 280 30
                        Q 295 10, 310 30
                        Q 325 50, 340 30 
                        Q 355 10, 370 30
                        Q 385 50, 400 30
                        Q 415 10, 430 30 
                        Q 445 50, 460 30
                        Q 475 10, 490 30
                        Q 505 50, 520 30
                        Q 535 10, 550 30
                        Q 565 50, 580 30"
                    stroke="var(--custom-gray-darker)"
                    fill="none"
                    strokeWidth="2"
                    initial={{ x: 0 }}
                    animate={{
                        x: -200,
                        transition: {
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                />
            </g>
        </svg >
    )
}

export default WaveStatus