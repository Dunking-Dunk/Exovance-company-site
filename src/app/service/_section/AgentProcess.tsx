"use client"

import React from 'react'
import { Lightbulb, PencilRuler, Rocket, RefreshCcw } from 'lucide-react'

const steps = [
    { title: 'Discover', desc: 'Map goals, constraints, data, and tools. Identify high-ROI tasks.', Icon: Lightbulb },
    { title: 'Design', desc: 'Define agent roles, guardrails, and workflows. Prototype quickly.', Icon: PencilRuler },
    { title: 'Deploy', desc: 'Integrate with your stack, enable monitoring, and roll out safely.', Icon: Rocket },
    { title: 'Improve', desc: 'Evaluate, fine-tune prompts/policies, and expand capabilities.', Icon: RefreshCcw },
]

const AgentProcess = () => {
    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20">
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight">How we build automation</h2>
                    <p className="text-customGrayDarker mt-3 max-w-2xl">A pragmatic, iterative approach that delivers value fast and scales with your needs.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map(({ title, desc, Icon }, idx) => (
                        <div
                            key={title}
                            className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(2,6,23,0.25)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center text-customGray bg-white/10">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-customGray">Step {idx + 1}</div>
                                    <h3 className="text-lg font-semibold text-customGrayLight">{title}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-customGrayDarker mt-3 leading-relaxed">{desc}</p>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/20 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AgentProcess


