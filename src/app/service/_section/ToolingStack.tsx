"use client"

import React from 'react'

const categories = [
    { name: 'LLMs', items: ['OpenAI', 'Anthropic', 'Local (LLama, Qwen)'] },
    { name: 'Retrieval', items: ['RAG', 'Embeddings', 'Vector DB'] },
    { name: 'Orchestration', items: ['LangGraph', 'LangChain', 'Custom'] },
    { name: 'Data', items: ['Postgres', 'S3/Blob', 'Airbyte'] },
    { name: 'Integration', items: ['REST', 'GraphQL', 'Webhooks'] },
    { name: 'Observability', items: ['Tracing', 'Eval harness', 'Feedback'] },
]

const ToolingStack = () => {
    return (
        <section className="relative w-full px-4 md:px-16 lg:px-32 py-20">
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight">Tech stack</h2>
                    <p className="text-customGrayDarker mt-3 max-w-2xl">We pick the right tools for your context—prioritizing reliability, security, and cost-efficiency.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(({ name, items }) => (
                        <div
                            key={name}
                            className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(2,6,23,0.25)] hover:-translate-y-0.5"
                        >
                            <h3 className="text-lg font-semibold text-customGrayLight">{name}</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {items.map((i) => (
                                    <span key={i} className="px-3 py-1.5 text-xs rounded-lg border border-white/20 dark:border-white/10 text-customGray bg-white/10">{i}</span>
                                ))}
                            </div>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/20 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ToolingStack


