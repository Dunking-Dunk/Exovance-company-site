"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const Abstract = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Adjusted tag variants with a smaller scroll range
  const tagVariants = [
    {
      text: "IMAGINE",
      scrollRange: [0.2, 0.6],
      outputRange: [-80, 80],
      top: "15%",
      left: "20%",
      delay: 0.3,
      duration: 3.2,
      spring: { stiffness: 100, damping: 30 }
    },
    {
      text: "INNOVATE",
      scrollRange: [0.3, 0.7],
      outputRange: [-100, 50],
      top: "70%",
      left: "15%",
      delay: 0.5,
      duration: 2.8,
      spring: { stiffness: 120, damping: 20 }
    },
    {
      text: "SERVICES",
      scrollRange: [0.25, 0.75],
      outputRange: [-100, 50],
      top: "20%",
      right: "10%",
      delay: 0.8,
      duration: 3.0,
      spring: { stiffness: 80, damping: 25 }
    },
    {
      text: "INVENT",
      scrollRange: [0.35, 0.65],
      outputRange: [-80, 80],
      top: "45%",
      right: "25%",
      delay: 1.2,
      duration: 2.5,
      spring: { stiffness: 90, damping: 15 }
    },
    {
      text: "DESIGN",
      scrollRange: [0.3, 0.7],
      outputRange: [-90, 60],
      top: "30%",
      left: "10%",
      delay: 0.7,
      duration: 3.5,
      spring: { stiffness: 110, damping: 22 }
    },
    {
      text: "DISRUPT",
      scrollRange: [0.4, 0.6],
      outputRange: [-80, 70],
      top: "85%",
      right: "15%",
      delay: 0.9,
      duration: 3.1,
      spring: { stiffness: 95, damping: 28 }
    },
    {
      text: "EVOLVE",
      scrollRange: [0.2, 0.8],
      outputRange: [-85, 65],
      top: "60%",
      left: "10%",
      delay: 1.1,
      duration: 3.3,
      spring: { stiffness: 85, damping: 18 }
    }
  ];

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-4 md:px-16 lg:px-80 md:py-60 py-10" ref={container}>
      {tagVariants.map(({ text, scrollRange, outputRange, top, left, right, delay, duration, spring }, index) => {
        const x = useTransform(scrollYProgress, scrollRange, outputRange);
        const opacity = useTransform(scrollYProgress,
          [scrollRange[0] - 0.1, scrollRange[0], scrollRange[1], scrollRange[1] + 0.1],
          [0, 1, 1, 0]
        );

        return (
          <motion.div
            key={index}
            style={{
              x,
              opacity,
              position: 'absolute',
              top,
              left,
              right
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              ...spring,
              delay,
              duration
            }}
          >
            <div className="group cursor-pointer z-0">
              <span className="bg-customGray text-customBlack md:px-4 px-2 md:py-1 rounded-sm text-sm font-semibold
                           transition-all duration-300 ease-in-out
                           hover:bg-gray-800 hover:text-gray-200
                           group-hover:shadow-lg">
                {text}
              </span>
            </div>
          </motion.div>
        );
      })}

      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-customGray text-5xl md:text-7xl font-bold leading-tight tracking-wider font-exo2"
        >
          <TextGenerateEffect words="PIONEERING INTELLIGENT"  duration={2}/>
       
        </motion.h1>

        <div className="relative my-4 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            className="playwrite-us-trad text-4xl md:text-7xl text-customGrayDark"
          >
            Solutions for a
          </motion.span>
        </div>

        <motion.h1
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
          className="text-customGray text-right text-5xl md:text-7xl font-bold tracking-wider font-exo2"
        >
          <TextGenerateEffect words="FUTURISTIC WORLD" duration={4}/>
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="text-customGrayDarker absolute left-[10%] bottom-[15%] mt-8 mx-auto text-sm"
      >
        Innovate. Automate. Elevate. Cutting-edge AI, web, and <br /> mobile solutions to shape the future.
      </motion.p>
    </div>
  );
};

export default Abstract;