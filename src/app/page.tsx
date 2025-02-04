"use client"

import dynamic from "next/dynamic";
import { Particles } from "@/components/canva/Particles";
import CompanyName from "@/components/global/Company-name";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GlitchText from "@/components/ui/glitch-text";
import Arrow from "@/components/ui/arrow";
import AnimatedParagraph from "@/components/ui/animated-paragraph";
import Vision from "@/components/page/Vision";
import Abstract from "@/components/page/Abstract";
import Service from "@/components/page/Service";
import ScrollTextAnimation from "@/components/global/Marquee";
import ContactPage from "@/components/page/Contact";
import Footer from "@/components/global/Footer";

const Background = dynamic(() => import("@/components/canva/backgroundHero").then((mod: any) => mod.BackgroundHero), {
  ssr: false
})

const View = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 z-10 h-96 w-full flex-col items-center justify-center'>
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

export default function Home() {

  return (
    <div className="w-full h-full relative" >
      <div className="absolute inset-0 z-[0] bg-gradient-to-b from-zinc-900 from-40% via-gray-50/10 to-transparent h-screen" />

      {/* Hero Page */}
      <section className="relative z-10 h-screen  w-full  flex flex-col items-center justify-center antialiased bg-grid-white/[0.02]  overflow-hidden">
        <Spotlight />
        <CompanyName className="text-9xl" />
        <div className="absolute top-[35%] right-[30%] -rotate-[40deg]">
          <Arrow />
        </div>
        <GlitchText text="UNKNOWN" className="absolute top-[28%] right-[23%]  text-3xl font-light text-customGrayDarker" duration={2} />
        <TextGenerateEffect words="SCROLL TO DISCOVER" duration={3} className="font-base text-2xl text-customGrayDarker absolute bottom-28" />
        {/* @ts-ignore */}
        <View className="absolute inset-0 z-[0]">
          <Background />
        </View>
      </section>

      {/* About Us */}
      <section className="z-10 px-48 py-8 space-y-6 grid grid-rows-2 h-screen w-full antialiased">
        <div className="flex items-center">
          <TextGenerateEffect words="INNOVATE <br/> THE UNSEEN" duration={3} className="text-customGray text-9xl font-semibold" />
        </div>
        <AnimatedParagraph />
      </section>

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
      <View className="fixed inset-0 -z-10">
        <Common />
        <Particles />
      </View>

    </div>
  );
}
