"use client"

import dynamic from "next/dynamic";
import { Particles } from "@/components/canva/Particles";
import { Common, View } from "@/components/canva/View";
import CompanyName from "@/components/global/Company-name";
import { Spotlight2 } from "@/components/ui/spotlight2";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import SmoothScroll from "@/components/global/SmoothScroll";

const Model = dynamic(() => import("@/components/canva/background").then((mod: any) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
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


export default function Home() {

  return (
    <div className="w-full h-full relative" >
      <SmoothScroll>
        <div className="z-10 h-screen w-full flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
          {/* <Spotlight2
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white" /> */}
          <Spotlight />
          <CompanyName className="text-9xl" />
        </div>
        <div className="z-10 px-28 py-8 grid grid-rows-2 h-screen w-full antialiased">
          <div className="flex items-center">
            <TextGenerateEffect words="INNOVATE THE <br/> UNSEEN" duration={3} className="w-2/3" />
          </div>
          <div className="flex items-center justify-end">
            <TypewriterEffect className="w-2/3 text-left" words={'At Exovance, we venture beyond the ordinary, crafting generative AI products that redefine the limits of imagination. Driven by mystery, innovation, and a touch of darkness, our creations are designed to shape a futuristic world yet to be envisioned. We are the architects of the unimaginable.'.split(' ').map((text) => ({ text, className: 'text-2xl font-normal' }))} />
            {/* <p className="text-2xl w-2/3">
            At Exovance, we venture beyond the ordinary, crafting generative AI products that redefine the limits of imagination. Driven by mystery, innovation, and a touch of darkness, our creations are designed to shape a futuristic world yet to be envisioned. We are the architects of the unimaginable.
          </p> */}
          </div>
        </div>
        <div className="z-10 px-28 py-8 grid grid-rows-2 h-screen w-full antialiased">
          <div className="flex items-center justify-end">
            <TextGenerateEffect words="REDEFINING POSSIBILITIES, <br/> EMBRACING THE <br/> UNKNOWN" duration={3} className=" text-right font-n" />
          </div>
          <div className="flex items-center">
            <TypewriterEffect className="w-2/3 text-left" words={'Exovance exists to break the mold of conventional AI. We bring a bold approach to innovation, focusing on unexplored possibilities and crafting intelligent solutions that defy expectations. In a rapidly evolving world, Exovance drives the future by embracing the unknown, unlocking new dimensions of creativity, and delivering transformative experiences that set us apart.'.split(' ').map((text) => ({ text, className: 'text-2xl font-normal' }))} />
          </div>
        </div>
        <div className="px-28 py-8 grid grid-rows-2 h-screen w-full antialiased">

        </div>
      </SmoothScroll>
      <View className="fixed inset-0 -z-10">
        <Common />
        {/* <Model /> */}
        <Particles />
      </View>
    </div>
  );
}
