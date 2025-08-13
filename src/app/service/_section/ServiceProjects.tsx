"use client"

import React, { useEffect, useRef } from 'react'
import { projects } from '@/lib/data'
import { useMobile } from '@/hooks/useMobile'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ServiceProjects = () => {
    const isMobile = useMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile) return;
        if (containerRef.current && sectionsRef.current) {
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
                    id: "serviceProjectsScrollTrigger"
                }
            });

            return () => {
                tl.kill();
                const trigger = gsap.getById('serviceProjectsScrollTrigger');
                if (trigger) (trigger as any).kill?.();
            };
        }
        return () => { };
    }, [isMobile]);

    return (
        <section className="relative w-full h-full">
            <div
                ref={containerRef}
                className="w-full h-full relative overflow-hidden z-10"
            >
                {!isMobile ? (
                    <div
                        ref={sectionsRef}
                        className="flex h-screen"
                        style={{ width: `${projects.length * 100}vw` }}
                    >
                        {projects.map((project, index) => (
                            <div key={index} className="w-screen min-h-screen px-4 md:px-16 h-full relative">

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
                    <div className="w-full h-full space-y-16">
                        {projects.map((project, index) => (
                            <div key={index} className="w-full h-full px-4 md:px-32 py-16 relative overflow-hidden">
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-20 right-10 w-24 h-24 border border-customGrayDark/10 rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-20 left-10 w-16 h-16 bg-customGrayLight/5 rotate-45 rounded-lg"></div>
                                    <div className="absolute top-8 right-8">
                                        <div className="text-4xl md:text-6xl font-black text-customGrayDark/20">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8 h-full w-full relative z-10">
                                    <div className="w-full">
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

                                    <div className="w-full flex flex-col justify-center space-y-6 px-4">
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
                )}
            </div>
        </section>
    )
}

export default ServiceProjects


