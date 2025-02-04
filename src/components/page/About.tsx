import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import AnimatedParagraph from "../ui/animated-paragraph";

const About = () => {
    return (
        <section className="z-10 px-48 py-8 space-y-6 grid grid-rows-2 h-screen w-full antialiased">
        <div className="flex items-center">
          <TextGenerateEffect words="INNOVATE <br/> THE UNSEEN" duration={3} className="text-customGray text-9xl font-semibold" />
        </div>
        <AnimatedParagraph />
      </section>

    )
}

export default About