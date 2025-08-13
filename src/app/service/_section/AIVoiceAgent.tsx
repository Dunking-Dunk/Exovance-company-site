"use client"

import React from 'react'
import { PhoneCall, Headphones, CalendarClock, Wrench, Store, BookOpen, Link, Bot, Brain, MessageSquare, Globe, Timer, ShieldCheck } from 'lucide-react'

const channels = ['Phone', 'WhatsApp', 'Web Widget', 'In‑Store Kiosk', 'Mobile App']

const VoiceUseCases = [
    {
        icon: Headphones,
        title: 'Voice Support Triage',
        desc: 'Answer questions, authenticate callers, and create tickets with context from CRM and knowledge bases.'
    },
    {
        icon: CalendarClock,
        title: 'Reception & Scheduling',
        desc: 'Book meetings, send reminders, and coordinate calendars hands‑free with human‑like dialogs.'
    },
    {
        icon: Wrench,
        title: 'Field Ops Dispatcher',
        desc: 'Log incidents by voice, fetch SOPs, and trigger workflows and on‑call rotations.'
    },
    {
        icon: Store,
        title: 'Kiosk & In‑Store Assistant',
        desc: 'Guide customers, check inventory, and make recommendations in real time.'
    },
    {
        icon: BookOpen,
        title: 'Internal Voice Q&A',
        desc: 'Ask policy or technical questions verbally and get source‑cited answers via RAG.'
    }
]

const Integration = [
    {
        icon: PhoneCall,
        title: 'Input pipeline',
        desc: 'Low‑latency ASR + VAD with barge‑in for natural turn‑taking and interruptions.'
    },
    {
        icon: Bot,
        title: 'Agent orchestration',
        desc: 'Route to domain agents (support, sales, ops) with tools, RAG, and human‑in‑loop steps.'
    },
    {
        icon: Link,
        title: 'System actions',
        desc: 'Call internal APIs, create tickets, update CRM, and trigger workflows during the call.'
    },
    {
        icon: MessageSquare,
        title: 'Output pipeline',
        desc: 'Streaming TTS with expressive voices and safeguards for clarity and tone.'
    }
]

const AIVoiceAgent = () => {
    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20">
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="text-xs tracking-widest uppercase text-customGray">AI Voice</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight mt-2">AI Voice Agents are the future</h2>
                    <p className="text-customGrayDarker mt-4 max-w-3xl">
                        Natural, real‑time conversations that can think, reference your data, and take action. Voice makes automation
                        feel human—available across phone, apps, and kiosks.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-10">
                    <div className="lg:col-span-2 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150">
                        <h3 className="text-lg font-semibold text-customGrayLight">Why voice first</h3>
                        <ul className="mt-3 space-y-2 text-sm text-customGrayDarker">
                            <li className="flex items-start gap-2"><Timer className="w-4 h-4 mt-0.5 text-customGray" /><span>Low‑latency dialogs with barge‑in for natural interruptions</span></li>
                            <li className="flex items-start gap-2"><Brain className="w-4 h-4 mt-0.5 text-customGray" /><span>Grounded answers via RAG and domain agents with memory and context</span></li>
                            <li className="flex items-start gap-2"><Globe className="w-4 h-4 mt-0.5 text-customGray" /><span>Multilingual support and channel‑agnostic delivery (PSTN, VoIP, web)</span></li>
                            <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-customGray" /><span>Transcripts, consent prompts, and audit trails for compliance</span></li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150">
                        <h3 className="text-lg font-semibold text-customGrayLight">Channels</h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {channels.map((c) => (
                                <span key={c} className="px-3 py-1.5 text-xs rounded-full border border-white/20 dark:border-white/10 text-customGray bg-white/10">{c}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                            {[{ k: '<300ms', v: 'Turn latency' }, { k: '40+', v: 'Locales' }, { k: 'Live', v: 'Barge‑in' }].map(({ k, v }) => (
                                <div key={v} className="rounded-xl border border-white/15 bg-white/5 py-3">
                                    <div className="text-base font-semibold text-customGrayLight">{k}</div>
                                    <div className="text-[11px] text-customGray">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-xl font-semibold text-customGrayLight mb-3">Voice use cases</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {VoiceUseCases.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/30">
                                <div className="w-10 h-10 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center text-customGray bg-white/10 mb-3">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-base font-semibold text-customGrayLight">{title}</div>
                                <div className="text-sm text-customGrayDarker mt-1.5 leading-relaxed">{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div>
                    <h3 className="text-xl font-semibold text-customGrayLight mb-3">How voice integrates with your agents</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Integration.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/30">
                                <div className="w-10 h-10 rounded-lg border border-white/20 dark:border-white/10 flex items-center justify-center text-customGray bg-white/10 mb-3">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-base font-semibold text-customGrayLight">{title}</div>
                                <div className="text-sm text-customGrayDarker mt-1.5 leading-relaxed">{desc}</div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default AIVoiceAgent


