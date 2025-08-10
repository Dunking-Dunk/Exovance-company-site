"use client"

import React from 'react'
import { services } from '@/lib/data'
import CardSwap, { Card } from '../../components/ui/CardSwap'
import { useMobile } from '@/hooks/useMobile'
import { motion } from 'framer-motion'
import { CheckCircle2, Cpu, BarChart3, Workflow, Sparkles } from 'lucide-react'

type Props = {}

const Service = (props: Props) => {
    const isMobile = useMobile();

    const handleLearnMore = () => {
        window.open('/services', '_blank'); // 
    };

    return (
        <div className="w-full min-h-screen px-4 md:px-32 py-32 relative">

            <div className="absolute inset-0 -z-10 opacity-[0.15] bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className={`relative z-10 flex flex-col ${!isMobile ? 'lg:flex-row' : ''} gap-12`}>
                {/* Left Content Section */}
                <div className={`${!isMobile ? 'lg:w-1/2' : 'w-full'} flex flex-col justify-center`}>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-3 inline-flex items-center gap-2 text-customGray">
                        <Sparkles className="h-4 w-4 text-customGrayLight/80" />
                        <span className="text-sm tracking-widest uppercase">What we do</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-5xl md:text-7xl lg:text-8xl font-bold text-customGray leading-[1.05] mb-6">
                        Our Services
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-lg md:text-xl text-customGrayDark max-w-2xl mb-10">
                        Discover solutions engineered to transform your business through modern software, automation, and AI-driven insight.
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }} className="space-y-4 mb-10">
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
                    </motion.div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        {[{ value: '10+', label: 'Projects Delivered' }, { value: '24/7', label: 'Support' }, { value: '99%', label: 'Client Satisfaction' }].map((item) => (
                            <div key={item.label} className="text-center rounded-xl border border-customGrayDark/40 bg-black/10 backdrop-blur-sm py-4">
                                <div className="text-3xl md:text-4xl font-bold text-customGrayLight mb-1">{item.value}</div>
                                <div className="text-xs md:text-sm text-customGray">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
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
                    </motion.button>
                </div>

                {!isMobile && (
                    <div className="flex items-center justify-center">
                        <CardSwap
                            width={700}
                            height={500}
                            cardDistance={60}
                            verticalDistance={70}
                            delay={5000}
                            pauseOnHover={true}
                        >
                            {services.map((service, index) => (
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
                                            <h3 className="text-2xl md:text-3xl font-bold text-customGrayLight tracking-tight mb-4">
                                                {service.title}
                                            </h3>
                                            <p className="text-customGray text-sm md:text-base leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                )}


            </div>
        </div>
    )
}

export default Service