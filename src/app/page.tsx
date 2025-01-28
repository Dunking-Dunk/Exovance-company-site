"use client"

import { Particles } from "@/components/canva/Particles";
import { Common, View } from "@/components/canva/View";
import CompanyName from "@/components/global/Company-name";
import {  Spotlight2 } from "@/components/ui/spotlight2";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {

  return (
    <div className="w-full h-screen relative " id="home__container">
      
      <div className="z-10 h-full w-full flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight2
           className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"/>
        <Spotlight/>
          <CompanyName className="text-9xl"/>
        </div>
        <div className="z-10 px-32 py-8 grid grid-rows-2 h-full w-full   antialiased">
          <div className="flex items-center">
            <TextGenerateEffect words="INNOVATE THE UNSEEN" duration={5} className="w-2/3"/>
          </div>
          <div className="flex items-center justify-end">
          <p className="text-2xl w-2/3">
         At Exovance, we venture beyond the ordinary, crafting generative AI products that redefine the limits of imagination. Driven by mystery, innovation, and a touch of darkness, our creations are designed to shape a futuristic world yet to be envisioned. We are the architects of the unimaginable.
</p>
          </div>
        </div>  
        <div className="z-10 px-32 py-8 grid grid-rows-2 h-full w-full antialiased">
          <div className="flex items-center justify-end">
          <TextGenerateEffect words="REDEFINING POSSIBILITIES,EMBRACING THE UNKNOWN" duration={5} className="w-3/4"/>
          </div>
          <div className="flex items-center">
          <p className="text-2xl w-2/3">Exovance exists to break the mold of conventional AI. We bring a bold approach to innovation, focusing on unexplored possibilities and crafting intelligent solutions that defy expectations. In a rapidly evolving world, Exovance drives the future by embracing the unknown, unlocking new dimensions of creativity, and delivering transformative experiences that set us apart.</p>
          </div>
        </div>  
        <div className="z-10 px-32 py-8 grid grid-rows-2 h-full w-full antialiased">

        </div>
      <View className="fixed inset-0 -z-10">
        <Common />
        <Particles />
      </View>
    </div>
  );
}
