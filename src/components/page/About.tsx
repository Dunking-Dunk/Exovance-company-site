import { TextGenerateEffect } from '../ui/text-generate-effect'
import AnimatedParagraph from '../ui/animated-paragraph'

const About = () => {
    return (
        <section className="z-10 px-4 md:px-16 lg:px-48 py-4 md:py-8 space-y-4 md:space-y-6 flex flex-col md:grid md:grid-rows-2 md:h-[100dvh]  h-full w-full antialiased">
            <div className="flex items-center">
                <TextGenerateEffect
                    words="INNOVATE <br/> THE UNSEEN"
                    duration={3}
                    className="text-customGray text-7xl md:text-7xl lg:text-9xl font-semibold"
                />
            </div>
            <AnimatedParagraph />
        </section>
    )
}

export default About