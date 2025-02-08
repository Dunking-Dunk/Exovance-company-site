"use client"

import dynamic from "next/dynamic";
import CompanyName from "@/components/global/Company-name";
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
    <div className="w-full h-full relative" >
      <div className="absolute inset-0 z-[0] bg-gradient-to-b dark:from-zinc-900 from-zinc-100 dark:from-40% from-40% dark:via-gray-50/10 via-gray-600/10 dark:to-transparent to-transparent h-dvh" />

      {/* Hero Page */}
      <section className="relative z-10 h-dvh  w-full  flex flex-col items-center justify-center antialiased bg-grid-white/[0.02]  overflow-hidden">
        <Spotlight />
        <CompanyName className="md:text-9xl text-6xl" />
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
        
        <TextGenerateEffect words="SCROLL TO DISCOVER" duration={3} className="font-base text-2xl text-customGrayDarker absolute bottom-28" />
        {/* @ts-ignore */}
        <View className="absolute inset-0 z-[0] ">
        {/* <CompanyName3D/> */}
          <Background />
        </View>
      </section>
      
      {/* About Us */}
      <About/>
 
      {/* Vision*/}
      <Vision />

      {/* Abstract */}
      <Abstract />

      {/* Services */}
      <Service />

      {/* scroll text carousel */}
      <ScrollTextAnimation />

      {/* contact */}
      <ContactPage/>

      {/* footer */}
      <Footer/>

      {/* particle */}
      {/* @ts-ignore */}
      <View className="fixed inset-0 z-0">
        <Common />
        <Particles />
      </View>

    </div>
  );
}
