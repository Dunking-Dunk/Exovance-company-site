"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variant } from 'framer-motion'
import { cn } from '@/lib/utils';

interface GlitchTextProps {
    text: string;
    className?: string;
    duration?: number;
    glitchIntensity?: number;
    delay?: number;
}

const generateRandomChar = () => {
    const chars = '0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
}

const glitchVariants:any = {
    hidden: { 
        opacity: 0,
        y: 20,
        scale: 0.9
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.1,
            delay: i * 0.1
        }
    }),
    glitch: {
        opacity: [1, 0.8, 0.6, 1],
        x: [0, -2, 3, -1, 0],
        y: [0, 1, -1, 1, 0],
        scale: [1, 1.01, 0.99, 1],
        filter: [
            'brightness(100%) contrast(100%)',
            'brightness(150%) contrast(120%)',
            'brightness(90%) contrast(90%)',
            'brightness(100%) contrast(100%)'
        ],
        transition: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
};

const GlitchText = ({ 
    text, 
    className = "", 
    duration = 2,
    glitchIntensity = 0.3,
    delay = 0
}: GlitchTextProps) => {
    const [displayText, setDisplayText] = useState(
        Array(text.length).fill('0').join('')
    );
    const [isGlitching, setIsGlitching] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let startTime = Date.now();
        const animationDuration = duration * 1000;

        const updateText = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            if (progress === 1) {
                setDisplayText(text);
                setIsGlitching(false);
                clearInterval(interval);
                return;
            }

            const newText = text.split('').map((targetChar, index) => {
                if (Math.random() < glitchIntensity || index < progress * text.length) {
                    return targetChar;
                }
                return generateRandomChar();
            }).join('');

            setDisplayText(newText);
        };

        const timeoutId = setTimeout(() => {
            interval = setInterval(updateText, 50);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(interval);
        };
    }, [text, duration, glitchIntensity, delay]);

    return (
        <motion.div 
            className={cn('relative' ,className)}
            initial="hidden"
            animate="visible"
            custom={delay}
        >
            <motion.div
                variants={glitchVariants}
                animate={isGlitching ? "glitch" : "visible"}
                className="relative inline-block"
            >
                <span className="relative z-10">
                    {displayText}
                </span>
                {isGlitching && (
                    <>
                                   <motion.span
                            key="glitch-top"
                            className="absolute top-0 left-0 w-full text-customGrayDarker opacity-50 mix-blend-screen"
                            style={{ clipPath: 'inset(0 0 50% 0)' }}
                            initial={{ x: 0 }}
                            animate={{
                                x: [-2, 1, -1, 2, 0],
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            exit={{ opacity: 0 }}
                        >
                            {displayText}
                        </motion.span>
                        <motion.span
                            key="glitch-bottom"
                            className="absolute top-0 left-0 w-full text-customGrayLight opacity-50 mix-blend-screen"
                            style={{ clipPath: 'inset(50% 0 0 0)' }}
                            initial={{ x: 0 }}
                            animate={{
                                x: [2, -1, 1, -2, 0],
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            exit={{ opacity: 0 }}
                        >
                            {displayText}
                        </motion.span>
                    </>
         
                )}
            </motion.div>
        </motion.div>
    );
};

export default GlitchText;
