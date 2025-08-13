"use client"

import React from 'react'
import { Headphones, FileText, PackageCheck, MailOpen, SearchCheck, Megaphone, ReceiptText, IdCard, Wrench, ShieldCheck, ShoppingCart, CalendarClock } from 'lucide-react'

type UseCase = {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    impact: string
}

const useCases: UseCase[] = [
    {
        icon: Headphones,
        title: 'Customer Support Agent',
        description: '24/7 multi-channel support that triages, answers, and escalates with context from your knowledge base and CRM.',
        impact: 'Reduce response time by 70% and ticket volume by 40%'
    },
    {
        icon: FileText,
        title: 'Back-office Document Agent',
        description: 'Automate document intake, extraction, and filing across invoices, contracts, and forms with human verification loops.',
        impact: 'Cut processing time from days to minutes'
    },
    {
        icon: PackageCheck,
        title: 'Operations & Fulfillment Agent',
        description: 'Coordinate orders, inventory, and shipping updates by calling internal APIs and notifying stakeholders proactively.',
        impact: 'Improve on-time fulfillment and reduce manual coordination'
    },
    {
        icon: MailOpen,
        title: 'Outbound Sales Agent',
        description: 'Prospect, qualify, and schedule meetings using email, chat, and CRM actions with compliance-friendly personalization.',
        impact: 'Increase meetings booked without expanding team size'
    },
    {
        icon: SearchCheck,
        title: 'RAG Knowledge Assistant',
        description: 'Secure retrieval-augmented generation over your docs, Slack, and wikis with source-cited answers and audit trails.',
        impact: 'Empower teams to find answers instantly with trust'
    },
    {
        icon: Megaphone,
        title: 'Marketing Content Agent',
        description: 'Plan, draft, and A/B test multi-channel campaigns with style and tone controls and brand guardrails.',
        impact: 'Increase content velocity while maintaining brand consistency'
    },
    {
        icon: ReceiptText,
        title: 'Finance Reconciliation Agent',
        description: 'Match transactions to invoices, flag anomalies, and prepare summaries for month-end close.',
        impact: 'Shorten close cycles and reduce manual effort'
    },
    {
        icon: IdCard,
        title: 'HR Onboarding Agent',
        description: 'Automate paperwork collection, account provisioning, and training nudges with status tracking.',
        impact: 'Speed up onboarding and improve employee experience'
    },
    {
        icon: Wrench,
        title: 'IT Helpdesk Agent',
        description: 'Diagnose common issues, run safe scripts, collect logs, and escalate with context when needed.',
        impact: 'Deflect L1 tickets and reduce mean time to resolution'
    },
    {
        icon: ShieldCheck,
        title: 'Compliance Monitoring Agent',
        description: 'Continuously scan docs, tickets, and logs for policy violations and generate audit-ready reports.',
        impact: 'Move from periodic checks to continuous compliance'
    },
    {
        icon: ShoppingCart,
        title: 'Merchandising Agent',
        description: 'Optimize product titles, descriptions, and recommendations with inventory and pricing signals.',
        impact: 'Lift conversion without manual catalog work'
    },
    {
        icon: CalendarClock,
        title: 'Calendar & Meeting Agent',
        description: 'Coordinate schedules, prepare agendas, and generate action-item notes that sync to your tools.',
        impact: 'Fewer coordination loops and better follow-through'
    }
]

const AIUseCases = () => {
    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20">
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight">AI Automation Use Cases</h2>
                    <p className="text-customGrayDarker mt-3 max-w-2xl">Practical automations we can deploy quickly and evolve with your workflow.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map(({ icon: Icon, title, description, impact }) => (
                        <div
                            key={title}
                            className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6 flex flex-col gap-3 transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(2,6,23,0.25)] hover:-translate-y-0.5"
                        >
                            <div className="w-10 h-10 rounded-lg border border-customGrayDark/40 flex items-center justify-center text-customGray">
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-customGrayLight">{title}</h3>
                            <p className="text-sm text-customGrayDarker leading-relaxed">{description}</p>
                            <div className="text-xs text-customGray mt-2">{impact}</div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/20 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AIUseCases


