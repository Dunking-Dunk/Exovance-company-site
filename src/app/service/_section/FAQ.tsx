"use client"

import React, { useState } from 'react'

const faqs = [
    { q: 'How do we start?', a: 'We begin with a short discovery to pick a high-ROI workflow, then run a 2-week pilot.' },
    { q: 'Is my data safe?', a: 'Yes. We follow least-privilege access, data minimization, and can run models in a private setup when required.' },
    { q: 'What tools do you use?', a: 'We are model- and vendor-agnostic. We select tools based on reliability, cost, and your constraints.' },
    { q: 'How do you measure success?', a: 'We define clear metrics such as reduced handling time, accuracy, and SLA adherence before kickoff.' },
    { q: 'How fast can we see results?', a: 'Most pilots deliver measurable outcomes in 10–14 days, with a clear plan for expansion.' },
    { q: 'Can humans stay in the loop?', a: 'Absolutely. We design review and approval steps anywhere they add safety or quality.' },
    { q: 'What about vendor lock-in?', a: 'We architect with portability in mind—abstracting models and providers to avoid lock-in.' },
    { q: 'Do you support on-prem or private cloud?', a: 'Yes. We can deploy components within your VPC and use private or local models where needed.' },
    { q: 'How are failures handled?', a: 'We implement guardrails, retries, circuit breakers, and audits to keep workflows safe and observable.' },
]

const FAQ = () => {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20 mb-12">
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight mb-8">FAQ</h2>
                <div className="space-y-3">
                    {faqs.map((f, idx) => (
                        <div key={f.q} className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 overflow-hidden backdrop-blur-md backdrop-saturate-150">
                            <button onClick={() => setOpen(open === idx ? null : idx)} className="w-full text-left px-5 py-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-customGrayLight font-medium">{f.q}</span>
                                    <span className="text-customGray">{open === idx ? '-' : '+'}</span>
                                </div>
                            </button>
                            {open === idx && (
                                <div className="px-5 pb-5 text-sm text-customGrayDarker">{f.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ


