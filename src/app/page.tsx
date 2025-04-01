"use client"

import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GlitchText from "@/components/ui/glitch-text";
import Arrow from "@/components/ui/arrow";
import Vision from "@/components/page/Vision";
import Abstract from "@/components/page/Abstract";
import Service from "@/components/page/Service";
import ScrollTextAnimation from "@/components/global/Marquee";
import ContactPage from "@/components/page/Contact";
import Footer from "@/components/global/Footer";
import About from "@/components/page/About";
import Works from "@/components/page/Works";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


const Background = dynamic(() => import("@/components/canva/backgroundHero").then((mod: any) => mod.BackgroundHero), {
  ssr: false
})

const View = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 z-10 h-full w-full flex items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Common = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.Common), {
  ssr: false
})

const Particles = dynamic(() => import("@/components/canva/Particles").then((mod: any) => mod.Particles), {
  ssr: false
})

export default function Home() {

  return (
    <div className="w-full h-full relative " >
      <div className="absolute inset-0 z-[0] bg-gradient-to-b dark:from-zinc-900 from-zinc-100 dark:from-40% from-40% dark:via-gray-50/10 via-gray-600/10 dark:to-transparent to-transparent h-dvh" />

      {/* Hero Page */}
      <section className="relative z-10 h-[100dvh]  w-full  flex flex-col items-center justify-center antialiased bg-grid-white/[0.02]  overflow-hidden">
        <Spotlight />
        <h1 className={cn(
          "font-regular tracking-widest text-customGrayDark cursor-hover md:text-9xl text-6xl",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-customGrayDark/20 before:to-transparent",
          "before:animate-pulse before:opacity-50 before:blur-sm"
        )}>
          EXOVANCE
        </h1>
        <div className="absolute top-[28%] md:right-[28%] right-[5%]">
          <div className="absolute -bottom-[25px] right-[60px] -rotate-[40deg]">
            <Arrow />
          </div>
          <GlitchText
            text="UNKNOWN"
            className="absolute md:top-[25%] top-[20%] right-[23%] text-3xl font-light text-customGrayDarker"
            duration={2}
            glitchIntensity={0.5}
            repeat={true}
          />
        </div>

        <div className="absolute bottom-28 flex flex-col items-center space-y-4">
          <TextGenerateEffect
            words="SCROLL TO DISCOVER"
            duration={3}
            className="font-base text-2xl text-customGrayDarker"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-full text-customGrayDarker"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </div>
        {/* @ts-ignore */}
        <View className="absolute inset-0 z-[0] ">
          {/* <CompanyName3D/> */}
          <Background />
        </View>
      </section>

      {/* About Us */}
      <About />

      {/* Vision*/}
      <Vision />

      {/* Abstract */}
      <Abstract />


      {/* Works */}
      {/* <Works /> */}

      {/* Services */}
      <Service />

      {/* scroll text carousel */}
      <ScrollTextAnimation />

      {/* contact */}
      <ContactPage />

      {/* footer */}
      <Footer />

      {/* particle */}
      {/* @ts-ignore */}
      <View className="fixed inset-0 ">
        <Common />
        <Particles />
      </View>
    </div>
  );
}
