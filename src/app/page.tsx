"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Vision from "@/components/page/Vision";
import Abstract from "@/components/page/Abstract";
import Service from "@/components/page/Service";
import ScrollTextAnimation from "@/components/global/Marquee";
import ContactPage from "@/components/page/Contact";
import Footer from "@/components/global/Footer";
import About from "@/components/page/About";
import Works from "@/components/page/Works";
import Hero from "@/components/page/Hero";
import { useTheme } from "next-themes";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Preload components immediately
if (typeof window !== 'undefined') {
  import("@/components/canva/View");
  import("@/components/canva/Particles");
  import("@/components/canva/TransparentPlane");
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  useEffect(() => {
    setTheme('dark');

    const handleThemeSwitch = (progress: number) => {
      const visionStart = 0.30;
      const visionEnd = 0.80;
      if (progress >= visionStart && progress <= visionEnd) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    };

    const themeScrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => handleThemeSwitch(self.progress),
      id: 'theme-switcher'
    });

    return () => {
      themeScrollTrigger.kill();
    };
  }, [setTheme]);

  return (
    <>
      <div className="w-full h-full relative " >
        <div className="absolute inset-0 z-[0] bg-gradient-to-b dark:from-zinc-900 from-zinc-100 dark:from-40% from-40% dark:via-gray-50/10 via-gray-600/10 dark:to-transparent to-transparent h-dvh" />

        {/* Hero Page */}
        <Hero mousePosition={mousePosition} />

        {/* About Us */}
        <About />

        {/* Vision*/}
        <Vision />

        {/* Abstract */}
        {/* <Abstract /> */}


        {/* Works */}
        {/* <Works /> */}

        {/* Services */}
        {/* <Service /> */}

        {/* scroll text carousel */}
        <ScrollTextAnimation />

        {/* contact */}
        <ContactPage />

        {/* footer */}
        <Footer />

        {/* transparent plane - background layer */}
        {/* @ts-ignore */}
        <View className="fixed inset-0 z-[5] pointer-events-none">
          <TransparentPlane />
        </View>
        {/* particle - foreground layer */}
        {/* @ts-ignore */}
        <View className="fixed inset-0 z-[15]">
          <Common />
          <Particles />
        </View>
      </div>
    </>
  );
}
