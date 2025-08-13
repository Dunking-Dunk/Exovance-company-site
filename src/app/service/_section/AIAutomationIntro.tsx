"use client"

import React from 'react'
import { Bot, ShieldCheck, Network, Workflow, Sparkles } from 'lucide-react'

const bullets = [
    { title: 'Autonomous Agents', desc: 'Goal-driven systems that plan, act, and learn within guardrails.', Icon: Bot },
    { title: 'Safe-by-Design', desc: 'Role, capability, and data boundaries to ensure predictable behavior.', Icon: ShieldCheck },
    { title: 'Orchestrated Workflows', desc: 'Multi-agent collaboration with tools, APIs, and human-in-the-loop.', Icon: Workflow },
    { title: 'Systems Integration', desc: 'Connect CRM, ERP, chat, and data layers for end-to-end automation.', Icon: Network },
]

const AIAutomationIntro = () => {
    return (
        <section className="relative w-full min-h-[100vh] px-4 md:px-16 lg:px-32 py-20">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-customGray">
                        <Sparkles className="w-4 h-4 text-customGrayLight/70" />
                        <span className="text-xs tracking-widest uppercase">AI Automation</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight mt-3">Agents that do the work</h2>
                    <p className="text-customGrayDarker mt-4 max-w-2xl">We design agentic systems that take actions, call tools, and collaborate to complete real business tasks—reliably and safely.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {bullets.map(({ title, desc, Icon }) => (
                        <div
                            key={title}
                            className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(2,6,23,0.25)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center text-customGray bg-white/10">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-customGrayLight">{title}</h3>
                                    <p className="text-sm text-customGrayDarker mt-1.5 leading-relaxed">{desc}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {['Tools', 'APIs', 'Human-in-loop'].map((chip) => (
                                            <span key={chip} className="px-2.5 py-1 text-[11px] rounded-full border border-white/20 dark:border-white/10 text-customGray bg-white/10">{chip}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/20 to-transparent" />
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-6">
                    <div
                        className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6"
                    >
                        <h4 className="text-lg font-semibold text-customGrayLight mb-3">What an agent can do</h4>
                        <ul className="space-y-2 text-sm text-customGrayDarker">
                            {['Answer with sources using RAG', 'Call internal APIs and tools', 'Route/coordinate with other agents', 'Ask for help when uncertain'].map(item => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-customGrayLight/60" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6"
                    >
                        <h4 className="text-lg font-semibold text-customGrayLight mb-3">Value</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {[{ k: '-40%', v: 'Costs' }, { k: 'x3', v: 'Throughput' }, { k: '24/7', v: 'Coverage' }].map(({ k, v }) => (
                                <div key={v} className="text-center rounded-xl border border-customGrayDark/40 bg-black/10 py-4">
                                    <div className="text-2xl font-bold text-customGrayLight">{k}</div>
                                    <div className="text-[11px] text-customGray">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AIAutomationIntro


