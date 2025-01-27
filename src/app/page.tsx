"use client"

import { Particles } from "@/components/canva/Particles";
import { Common, View } from "@/components/canva/View";
import CompanyName from "@/components/global/Company-name";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {

  return (
    <div className="w-full h-screen relative" id="home__container">
      <div className="flex items-center justify-center w-full h-full relative">
        <div className="z-10 h-full w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight />
          <CompanyName />
        </div>

      </div>
      <div className="flex items-center justify-center w-full h-full relative">
        <div className="z-10 h-full w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <p className="text-2xl font-medium w-1/2">EXO VANCE is the pinnacle of AI innovation, pushing the boundaries of technology to redefine the future. We deliver cutting-edge solutions that empower businesses and drive progress, advancing humanity through intelligence .  .  .  .  .  .  .  .  .  .  .  . </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full relative">
        <div className="z-10 h-full w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <p className="text-2xl font-medium w-1/2">EXO VANCE is the pinnacle of AI innovation, pushing the boundaries of technology to redefine the future. We deliver cutting-edge solutions that empower businesses and drive progress, advancing humanity through intelligence .  .  .  .  .  .  .  .  .  .  .  . </p>
        </div>

      </div>
      <View className="fixed inset-0 ">
        <Common />
        <Particles />
      </View>
    </div>
  );
}
