"use client"

import React, { useRef } from 'react'
import { services } from '@/lib/data'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

type Props = {}

const Card = ({ title, description, index }: {
    title: string;
    description: string;
    index: number;
}) => {
    return (
        <div className={`relative service__card`} id={`card-${index + 1}`}>
            <div className="relative flex w-full h-full p-8 gap-16 will-change-transform service__card__inner bg-customBlack  border-b-2 border-b-customGray">
                <div className="flex-[3] space-y-6">
                    <TypewriterEffectSmooth className="text-7xl font-bold text-customGray " words={title.split(' ').map((x) => ({
                        text: x
                    }))} />
                    <p className=" text-xl text-customGrayDark w-2/3 ">{description}</p>
                </div>
                <div className="flex-1 aspect-[16/9] rounded-lg overflow-hidden">
                    <img
                        src={`/assets/card-${index + 1}.jpeg`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
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
            start: "top 50%",
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
                start: "top 50%",
                endTrigger: ".service__outro",
                end: "top 65%",
                pin: true,
                pinSpacing: false,
            });


            gsap.to(cardInner, {
                y: `-${(cards.length - index) * 10}vh`,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top 50%",
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
        <div className=' w-full h-full'>
            <div className='w-full h-full service__intro' />
            <div className='w-full h-full relative px-20' ref={container}>
                {
                    services.map(({ title, description }, index) => <Card title={title} description={description} index={index} />)
                }
            </div>
        </div>
    )
}

export default Service