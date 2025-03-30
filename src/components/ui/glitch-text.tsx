"use client"

import React, { useEffect, useState, useRef, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils';
import { Variants } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    duration?: number;
    glitchIntensity?: number;
    delay?: number;
    repeat?: boolean;
}

const glitchVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3 }
    },
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
            repeatType: "reverse" as const
        }
    }
};

const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return chars[Math.floor(Math.random() * chars.length)];
};

const getRandomDelay = () => {
    return Math.random() * 2 + 1;
};

const GlitchText = memo(({
    text,
    className = "",
    duration = 2,
    glitchIntensity = 0.3,
    delay = 0,
    repeat = false
}: GlitchTextProps) => {
    const [mounted, setMounted] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout>();
    const timeoutRef = useRef<NodeJS.Timeout>();
    const startTimeRef = useRef(0);
    const animationDurationRef = useRef(duration * 1000);

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: !repeat, margin: "0px 0px -50px 0px" });

    useEffect(() => {
        setMounted(true);
        if (mounted) {
            setIsGlitching(true);
            setDisplayText(Array(text.length).fill('').map(getRandomChar).join(''));
        }
    }, [mounted, text.length]);

    useEffect(() => {
        if (!isInView || !mounted) return;

        startTimeRef.current = Date.now();
        animationDurationRef.current = duration * 1000;

        const updateText = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / animationDurationRef.current, 1);

            if (progress === 1) {
                setDisplayText(text);
                setIsGlitching(false);
                clearInterval(intervalRef.current);

                if (repeat) {
                    timeoutRef.current = setTimeout(() => {
                        setIsGlitching(true);
                        setDisplayText(Array(text.length).fill('').map(getRandomChar).join(''));
                        startTimeRef.current = Date.now();
                        intervalRef.current = setInterval(updateText, 50);
                    }, getRandomDelay() * 1000);
                }
                return;
            }

            const newText = text.split('').map((targetChar, index) => {
                if (Math.random() < glitchIntensity || index < progress * text.length) {
                    return targetChar;
                }
                return getRandomChar();
            }).join('');

            setDisplayText(newText);
        };

        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(updateText, 50);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        };
    }, [isInView, text, duration, glitchIntensity, delay, repeat, mounted]);

    return (
        <motion.div
            ref={ref}
            className={cn('relative', className)}
            initial={{ opacity: 0 }}
            animate={isInView ? "visible" : {}}
            variants={glitchVariants}
        >
            <motion.div
                animate={isGlitching ? "glitch" : "visible"}
                className="relative inline-block"
            >
                <span className="relative z-10">
                    {displayText}
                </span>
                {isGlitching && mounted && (
                    <>
                        <motion.span
                            key="glitch-top"
                            className="absolute top-0 left-0 w-full text-red-800 opacity-50 mix-blend-screen"
                            style={{ clipPath: 'inset(0 0 50% 0)' }}
                            animate={{ x: [-2, 1, -1, 2, 0] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            {displayText}
                        </motion.span>
                        <motion.span
                            key="glitch-bottom"
                            className="absolute top-0 left-0 w-full text-blue-800 opacity-50 mix-blend-screen"
                            style={{ clipPath: 'inset(50% 0 0 0)' }}
                            animate={{ x: [2, -1, 1, -2, 0] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            {displayText}
                        </motion.span>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
});

GlitchText.displayName = 'GlitchText';

export default GlitchText;
