"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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
    },
    {
      text: "BUILD",
      scrollRange: [0.15, 0.55],
      outputRange: [-70, 70],
      top: "10%",
      left: "60%",
      delay: 0.6,
      duration: 2.9,
      spring: { stiffness: 105, damping: 24 }
    },
    {
      text: "CREATE",
      scrollRange: [0.25, 0.65],
      outputRange: [-90, 60],
      top: "35%",
      left: "55%",
      delay: 0.7,
      duration: 3.2,
      spring: { stiffness: 115, damping: 22 }
    },
    {
      text: "OPTIMIZE",
      scrollRange: [0.45, 0.8],
      outputRange: [-100, 50],
      top: "75%",
      right: "5%",
      delay: 0.95,
      duration: 3.0,
      spring: { stiffness: 90, damping: 20 }
    },
    {
      text: "AUTOMATE",
      scrollRange: [0.2, 0.6],
      outputRange: [-80, 80],
      top: "50%",
      left: "5%",
      delay: 0.85,
      duration: 3.1,
      spring: { stiffness: 100, damping: 23 }
    },
    {
      text: "SCALE",
      scrollRange: [0.3, 0.7],
      outputRange: [-85, 65],
      top: "5%",
      right: "20%",
      delay: 0.5,
      duration: 2.8,
      spring: { stiffness: 110, damping: 21 }
    },
    {
      text: "DEPLOY",
      scrollRange: [0.4, 0.8],
      outputRange: [-90, 70],
      top: "90%",
      left: "45%",
      delay: 1.0,
      duration: 3.3,
      spring: { stiffness: 95, damping: 26 }
    }
  ];

  return (
    <div className="relative h-[100dvh] z-10 overflow-hidden flex items-center justify-center px-4 md:px-16 lg:px-80 md:py-60 py-10" ref={container}>
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