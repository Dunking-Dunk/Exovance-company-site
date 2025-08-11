"use client"

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import Vision from "@/app/_section/Vision";
import ScrollTextAnimation from "@/components/global/Marquee";
import ContactPage from "@/app/_section/Contact";
import About from "@/app/_section/About";
import Hero from "@/app/_section/Hero";
import { useScrollTheme } from "@/components/provider/scroll-theme-provider";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Service from "@/app/_section/Service";
import Product from "@/app/_section/Product";
import Abstract from "./_section/Abstract";
import Footer from "@/components/global/Footer";


// 3D components are now handled in Layout component

export default function Home() {
  const { setScrollTheme } = useScrollTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  const handleThemeSwitch = useCallback((progress: number) => {
    const visionStart = 0.15;
    const visionEnd = 0.30;

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
        <div data-section="product">
          <Product />
        </div>

        <ScrollTextAnimation />

        {/* Services */}
        <div data-section="service">
          <Service />
        </div>


        {/* Team */}
        {/* <div data-section="team">
          <Team />
        </div> */}


        {/* Abstract */}
        <Abstract />



        {/* scroll text carousel */}
        <ScrollTextAnimation />

        {/* contact */}
        <ContactPage />

      </div>
    </>
  );
}