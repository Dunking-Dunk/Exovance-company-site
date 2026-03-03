"use client";
import React from 'react';
import { motion } from 'framer-motion';

const deployments = [
    {
        id: '01',
        label: 'Hotel Lobbies',
        desc: 'Check-in guidance, room service queries, local recommendations — 24/7, no front-desk backlog.',
    },
    {
        id: '02',
        label: 'Retail Stores',
        desc: 'Product discovery, pricing, guided checkout. Handles peak hours without extra headcount.',
    },
    {
        id: '03',
        label: 'Hospital Reception',
        desc: 'Department routing, appointment queries, insurance guidance — in the patient\'s language.',
    },
    {
        id: '04',
        label: 'University Admission Kiosks',
        desc: 'Course eligibility, fee structures, campus directions. Answers the questions your staff fields 100 times a day.',
    },
];

const OverviewSection = () => {
    return (
        <div className="relative">
            <div className="mb-12">
                <p className="font-mono text-[10px] tracking-[0.45em] text-violet-400/60 uppercase mb-6">
                    Where AIVA Deploys
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-customGrayLight mb-4 leading-tight tracking-tight">
                    Built for India&rsquo;s <br className="hidden md:block" /> physical spaces
                </h2>
                <p className="text-customGrayDark text-lg max-w-2xl leading-relaxed">
                    A movable kiosk with a lifelike 3D avatar. Speaks Hindi, Tamil, English. Works in any industry where humans answer the same questions every day.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {deployments.map((d, i) => (
                    <motion.div
                        key={d.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.07 }}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 hover:border-violet-500/20 transition-colors duration-300"
                    >
                        <p className="font-mono text-[10px] tracking-[0.4em] text-violet-400/40 uppercase mb-4">{d.id}</p>
                        <h3 className="text-xl font-semibold text-customGrayLight mb-2">{d.label}</h3>
                        <p className="text-customGrayDarker text-sm leading-relaxed">{d.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OverviewSection;
