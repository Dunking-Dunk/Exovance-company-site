"use client"

import React, { useEffect, useRef } from 'react'
import { services, projects } from '@/lib/data'
import CardSwap, { Card } from '../../components/ui/CardSwap'
import { useMobile } from '@/hooks/useMobile'
import { CheckCircle2, Cpu, BarChart3, Workflow, Sparkles, ExternalLink, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

type Props = {}

const Service = (props: Props) => {
    const isMobile = useMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        if (!isMobile && containerRef.current && sectionsRef.current) {
            const sections = sectionsRef.current.children;
            const totalSections = sections.length;

            const tl = gsap.to(sections, {
                xPercent: -100 * (totalSections - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (containerRef.current?.offsetWidth || 0) * (totalSections - 1),
                    id: "serviceScrollTrigger"
                }
            });

            return () => {
                tl.kill();
                const trigger = gsap.getById('serviceScrollTrigger');
                if (trigger) trigger.kill();
            };
        }

        return () => { };
    }, [isMobile]);

    const handleLearnMore = () => {

    };

    return (
        <div
            ref={containerRef}
            className="w-full relative overflow-hidden z-10"
            style={{ height: isMobile ? 'auto' : '100dvh' }}
        >
            {!isMobile ? (
                <div
                    ref={sectionsRef}
                    className="flex w-[300%] h-screen"
                >
                    <div className="w-1/3 min-h-screen px-4 md:px-32 py-32 flex items-center">
                        <div className="w-full flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/2 flex flex-col justify-center">
                                <div className="mb-3 inline-flex items-center gap-2 text-customGray">
                                    <Sparkles className="h-4 w-4 text-customGrayLight/80" />
                                    <span className="text-sm tracking-widest uppercase">What we do</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-customGray leading-[1.05] mb-6">
                                    Our Services
                                </h1>
                                <p className="text-lg md:text-xl text-customGrayDark max-w-2xl mb-10">
                                    Discover solutions engineered to transform your business through modern software, automation, and AI-driven insight.
                                </p>

                                <div className="space-y-4 mb-10">
                                    {[{
                                        label: 'AI-Powered Web Development',
                                        Icon: Cpu
                                    }, {
                                        label: 'End-to-End Automation Solutions',
                                        Icon: Workflow
                                    }, {
                                        label: 'Data-Driven Analytics',
                                        Icon: BarChart3
                                    }].map(({ label, Icon }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-customGrayLight/80" />
                                            <Icon className="h-4 w-4 text-customGray/80" />
                                            <span className="text-customGrayLight">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-10">
                                    {[{ value: '10+', label: 'Projects Delivered' }, { value: '24/7', label: 'Support' }, { value: '99%', label: 'Client Satisfaction' }].map((item) => (
                                        <div key={item.label} className="text-center rounded-xl border border-customGrayDark/40 bg-black/10 backdrop-blur-sm py-4">
                                            <div className="text-3xl md:text-4xl font-bold text-customGrayLight mb-1">{item.value}</div>
                                            <div className="text-xs md:text-sm text-customGray">{item.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleLearnMore}
                                    className="group relative px-8 py-4 bg-customGrayDark text-customGrayLight font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-customGray transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] max-w-fit border border-customGray"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Learn More About Our Services
                                        <svg
                                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-customGray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </button>
                            </div>

                            <div className="lg:w-1/2 flex items-center justify-center">
                                <CardSwap
                                    width={600}
                                    height={400}
                                    cardDistance={50}
                                    verticalDistance={60}
                                    delay={5000}
                                    pauseOnHover={true}
                                >
                                    {services.slice(0, 2).map((service, index) => (
                                        <Card key={index}>
                                            <div className="relative w-full h-full bg-customBlack rounded-xl overflow-hidden border border-customGrayDark/40">
                                                <div className="absolute inset-0">
                                                    <video
                                                        className="w-full h-full object-cover opacity-25"
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        preload="metadata"
                                                    >
                                                        <source data-src={`/video/${service.video}.mp4`} type="video/mp4" />
                                                    </video>
                                                    <div className="absolute inset-0 bg-black/20" />
                                                </div>

                                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                                    <h3 className="text-xl md:text-2xl font-bold text-customGrayLight tracking-tight mb-4">
                                                        {service.title}
                                                    </h3>
                                                    <p className="text-customGray text-sm leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </CardSwap>
                            </div>
                        </div>
                    </div>

                    {projects.map((project, index) => (
                        <div key={index} className="w-1/3 min-h-screen px-4 md:px-16 h-full relative">

                            <div className="absolute inset-0 pointer-events-none">

                                <div className="absolute right-[-20%] top-[55%] transform -translate-y-1/2 -rotate-90 origin-center">
                                    <div className="text-8xl md:text-9xl font-black text-customGrayDark/5 tracking-[0.2em] whitespace-nowrap">
                                        EXOVANCE
                                    </div>
                                </div>


                                <div className="absolute top-20 right-10 w-32 h-32 border border-customGrayDark/10 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-20 left-10 w-24 h-24 bg-customGrayLight/5 rotate-45 rounded-lg"></div>


                                <div className="absolute top-8 right-8">
                                    <div className="text-6xl font-black text-customGrayDark/20">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center gap-8 h-full w-full relative z-10">
                                <div className="lg:w-3/5">
                                    <div className="relative aspect-video bg-customGrayDark/30 rounded-2xl overflow-hidden shadow-2xl border border-customGrayDark/20 backdrop-blur-sm">

                                        <div className="absolute inset-0 bg-gradient-to-br from-customGrayDark/20 via-transparent to-customGrayLight/10 z-10"></div>

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-customGrayLight/50 text-sm">Project Image</div>
                                        </div>

                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover h-full transition-transform duration-700 hover:scale-105"
                                        />


                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 text-xs bg-customGrayDark/80 backdrop-blur-md text-customGrayLight rounded-full border border-customGrayLight/20">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-2/5 h-full flex flex-col justify-center space-y-6 pr-14 ">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-[1px] bg-customGrayLight/30"></div>
                                            <span className="text-xs text-customGrayLight/70 tracking-wider uppercase">
                                                Featured Work
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-customGrayLight mb-4 leading-tight">
                                            {project.title}
                                        </h3>

                                        <p className="text-customGrayDark leading-relaxed text-sm md:text-base">
                                            {project.briefDescription}
                                        </p>
                                    </div>


                                    <div className="space-y-3">
                                        <div className="text-xs text-customGrayLight/60 tracking-wider uppercase">
                                            Technologies
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1.5 text-xs bg-customGrayLight/10 text-customGrayLight rounded-lg border border-customGrayDark/40 backdrop-blur-sm hover:bg-customGrayLight/20 transition-all duration-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <span className="px-3 py-1.5 text-xs text-customGrayDark/60 rounded-lg">
                                                    +{project.technologies.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Enhanced CTA button */}
                                    <div className="pt-6">
                                        <Link
                                            href={project.link || "#"}
                                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-customGrayDark/60 to-customGrayDark/40 text-customGrayLight rounded-xl hover:from-customGray/30 hover:to-customGray/20 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] border border-customGrayDark/30 backdrop-blur-sm"
                                        >
                                            <span className="font-medium">Explore Project</span>
                                            <div className="flex items-center justify-center w-6 h-6 bg-customGrayLight/20 rounded-full group-hover:bg-customGrayLight/30 transition-all duration-300">
                                                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            ) : (
                // Mobile: Regular vertical layout
                <div className="w-full min-h-screen px-4 md:px-32 py-32 relative">
                    <div className="relative z-10 flex flex-col gap-12">
                        <div className="w-full flex flex-col justify-center">
                            <div className="mb-3 inline-flex items-center gap-2 text-customGray">
                                <Sparkles className="h-4 w-4 text-customGrayLight/80" />
                                <span className="text-sm tracking-widest uppercase">What we do</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-customGray leading-[1.05] mb-6">
                                Our Services
                            </h1>
                            <p className="text-lg md:text-xl text-customGrayDark max-w-2xl mb-10">
                                Discover solutions engineered to transform your business through modern software, automation, and AI-driven insight.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[{
                                    label: 'AI-Powered Web Development',
                                    Icon: Cpu
                                }, {
                                    label: 'End-to-End Automation Solutions',
                                    Icon: Workflow
                                }, {
                                    label: 'Data-Driven Analytics',
                                    Icon: BarChart3
                                }].map(({ label, Icon }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-customGrayLight/80" />
                                        <Icon className="h-4 w-4 text-customGray/80" />
                                        <span className="text-customGrayLight">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-10">
                                {[{ value: '10+', label: 'Projects Delivered' }, { value: '24/7', label: 'Support' }, { value: '99%', label: 'Client Satisfaction' }].map((item) => (
                                    <div key={item.label} className="text-center rounded-xl border border-customGrayDark/40 bg-black/10 backdrop-blur-sm py-4">
                                        <div className="text-3xl md:text-4xl font-bold text-customGrayLight mb-1">{item.value}</div>
                                        <div className="text-xs md:text-sm text-customGray">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleLearnMore}
                                className="group relative px-8 py-4 bg-customGrayDark text-customGrayLight font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-customGray transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] max-w-fit border border-customGray"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Learn More About Our Services
                                    <svg
                                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-customGray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Service