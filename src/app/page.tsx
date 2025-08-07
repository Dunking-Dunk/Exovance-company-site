"use client"

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import Vision from "@/components/page/Vision";
import ScrollTextAnimation from "@/components/global/Marquee";
import ContactPage from "@/components/page/Contact";
import Footer from "@/components/global/Footer";
import About from "@/components/page/About";
import Hero from "@/components/page/Hero";
import { useScrollTheme } from "@/components/provider/scroll-theme-provider";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Team from "@/components/page/Team";
import Service from "@/components/page/Service";
import Product from "@/components/page/Product";

// Preload critical components
const View = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.View), {
  ssr: false
})

const Common = dynamic(() => import("@/components/canva/View").then((mod: any) => mod.Common), {
  ssr: false
})

const Particles = dynamic(() => import("@/components/canva/Particles").then((mod: any) => mod.Particles), {
  ssr: false
})

const TransparentPlane = dynamic(() => import("@/components/canva/TransparentPlane").then((mod: any) => mod.TransparentPlane), {
  ssr: false
})


if (typeof window !== 'undefined') {
  import("@/components/canva/View");
  import("@/components/canva/Particles");
  import("@/components/canva/TransparentPlane");
}

export default function Home() {
  const { setScrollTheme } = useScrollTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  const handleThemeSwitch = useCallback((progress: number) => {
    const visionStart = 0.20;
    const visionEnd = 0.45;

    let targetTheme: 'light' | 'dark';

    if (progress >= visionStart && progress <= visionEnd) {
      targetTheme = 'light';
    } else {
      targetTheme = 'dark';
    }


    if (targetTheme !== currentTheme) {
      setCurrentTheme(targetTheme);
      setScrollTheme(targetTheme);
    }
  }, [setScrollTheme, currentTheme]);

  useEffect(() => {
    const themeScrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => handleThemeSwitch(self.progress),
      id: 'theme-switcher',
      refreshPriority: -1
    });

    return () => {
      themeScrollTrigger.kill();
    };
  }, [handleThemeSwitch]);

  return (
    <>
      <div className="w-full h-full relative overflow-x-hidden" >
        {/* <div className="absolute inset-0 z-[0] bg-gradient-to-b dark:from-zinc-900 from-zinc-100 dark:from-40% from-40% dark:via-gray-50/10 via-gray-600/10 dark:to-transparent to-transparent h-dvh" /> */}

        {/* Hero Page */}
        <div data-section="hero">
          <Hero />
        </div>



        {/* About */}
        <div data-section="about">
          <About />
        </div>


        {/* Vision*/}
        <div data-section="vision">
          <Vision />
        </div>

        {/* Products */}
        <Product />

        {/* Services */}
        <div data-section="service">
          <Service />
        </div>


        {/* Team */}
        <div data-section="team">
          <Team />
        </div>


        {/* Abstract */}
        {/* <Abstract /> */}



        {/* scroll text carousel */}
        <ScrollTextAnimation />

        {/* contact */}
        <ContactPage />

        {/* footer */}
        <Footer />

        {/* particle - foreground layer */}
        {/* @ts-ignore */}
        <View className="fixed inset-0 z-[15] pointer-events-none">
          <TransparentPlane />
          <Common />
          <Particles />
        </View>
      </div>
    </>
  );
}