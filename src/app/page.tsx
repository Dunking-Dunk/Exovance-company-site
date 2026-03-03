"use client"

import dynamic from "next/dynamic";
import Hero from "@/app/_section/Hero";
import About from "@/app/_section/About";

const Vision = dynamic(() => import("@/app/_section/Vision"), { ssr: false });
const ScrollTextAnimation = dynamic(() => import("@/components/global/Marquee"), { ssr: false });
const ContactPage = dynamic(() => import("@/app/_section/Contact"), { ssr: false });
const Product = dynamic(() => import("@/app/_section/Product"), { ssr: false });
const Abstract = dynamic(() => import("./_section/Abstract"), { ssr: false });
const Footer = dynamic(() => import("@/components/global/Footer"), { ssr: false });

export default function Home() {
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