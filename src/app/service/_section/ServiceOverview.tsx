"use client"

import React from 'react'
import { Cpu, Workflow, BarChart3, MonitorSmartphone, Boxes, Cloud } from 'lucide-react'

const services = [
    { title: 'AI-Powered Web Development', description: 'Modern, performant websites and apps enhanced with AI-driven experiences and personalization.', Icon: MonitorSmartphone },
    { title: 'AI Automation (Agents)', description: 'Autonomous and semi-autonomous agents that handle workflows, tasks, and decisions safely.', Icon: Workflow },
    { title: 'Data & Analytics', description: 'Dashboards, event pipelines, and insights to power better decisions across your org.', Icon: BarChart3 },
    { title: 'Custom AI Solutions', description: 'RAG, fine-tuning, vector search, and domain-specific models tailored to your needs.', Icon: Cpu },
    { title: 'Product Prototyping', description: 'Rapidly turn ideas into validated prototypes with iterative design and development.', Icon: Boxes },
    { title: 'Cloud & DevOps', description: 'Secure, scalable infrastructure, CI/CD, and observability for reliable delivery.', Icon: Cloud },
]

const ServiceOverview = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-16 lg:px-32 py-24">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl">
                <div className="mb-10">
                    <div className="text-sm tracking-widest uppercase text-customGray">What we provide</div>
                    <h2 className="text-4xl md:text-6xl font-bold text-customGrayLight mt-3">Services</h2>
                    <p className="text-customGrayDarker mt-4 max-w-2xl">End-to-end solutions that blend design, engineering, and AI to build delightful, reliable products.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(({ title, description, Icon }) => (
                        <div
                            key={title}
                            className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6 transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(2,6,23,0.25)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center text-customGray bg-white/5">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-customGrayLight">{title}</h3>
                                    <p className="text-sm text-customGrayDarker mt-2 leading-relaxed">{description}</p>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/20 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServiceOverview


