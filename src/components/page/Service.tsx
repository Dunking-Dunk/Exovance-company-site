"use client"

import React, { useRef } from 'react'
import { services } from '@/lib/data'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

type Props = {}

const Card = ({ title, description, index, video }: {
    title: string;
    description: string;
    index: number;
    video: string;
}) => {
    return (
        <div className={`relative service__card`} id={`card-${index + 1}`}>
            <div className="relative flex flex-col md:flex-row w-full h-full py-4 md:py-8 md:gap-16 gap-6 will-change-transform service__card__inner bg-customBlack border-b-2 border-b-customGray">
                <div className="mg:flex-[3] flex-[2] space-y-2 md:space-y-6 z-10">
                    <TypewriterEffectSmooth
                        words={title.split(' ').map((x) => ({
                            text: x,
                            className: 'text-2xl md:text-4xl lg:text-7xl font-bold text-customGray'
                        }))}
                    />
                    <p className="text-sm md:text-xl text-customGrayDark w-full md:w-2/3">{description}</p>
                </div>
                <div className="md:flex-1 flex-[2] aspect-[16/9] rounded-lg overflow-hidden z-20 ">
                    <video className="w-full h-full object-cover z-20" autoPlay muted loop>
                        <source src={`/video/${video}.mp4`} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

const Service = (props: Props) => {
    const container = useRef(null)

    useGSAP(() => {
        const cards: any = gsap.utils.toArray('.service__card')

        ScrollTrigger.create({
            trigger: cards[0],
            start: "top 35%",
            endTrigger: cards[cards.length - 1],
            end: "top 30%",
            pin: '.service__intro',
            pinSpacing: false,
        })

        cards.forEach((card: any, index: number) => {
            const isLastCard = index === cards.length - 1;
            const cardInner = card.querySelector(".service__card__inner");

            ScrollTrigger.create({
                trigger: card,
                start: "top 35%",
                endTrigger: ".service__outro",
                end: "top 65%",
                pin: true,
                pinSpacing: false,
            });

            gsap.to(cardInner, {
                y: `-${(cards.length - index) * (window.innerWidth < 768 ? 8 : 12)}vh`, // Adjust animation for mobile
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top 35%",
                    endTrigger: ".service__outro",
                    end: "top 65%",
                    scrub: true,
                },
            });
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [])

    return (
        <>
            <div className='w-full h-full service__intro' />
            <div className='w-full h-full relative px-2 sm:px-4 md:px-10' ref={container}>
                {
                    services.map(({ title, description, video }, index) => (
                        <Card key={index} title={title} description={description} index={index} video={video} />
                    ))
                }
            </div>
            <div className='service__outro w-full h-40 md:h-60' />
        </>
    )
}

export default Service