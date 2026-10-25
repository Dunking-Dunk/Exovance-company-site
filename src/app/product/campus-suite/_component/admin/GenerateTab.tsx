"use client";

import React from 'react';
import { CheckCircle2, Play, RotateCcw, Send } from 'lucide-react';
import { btn, countClashes } from './data';
import type { Ctx } from './types';

const COHORTS = [
    { name: 'CSE, Semester 5', done: 118, total: 118 },
    { name: 'IT, Semester 5', done: 96, total: 96 },
    { name: 'ECE, Semester 5', done: 104, total: 104 },
];
const STAGES = ['Reading course structure', 'Placing sessions', 'Checking for clashes'];

type Props = { ctx: Ctx; progress: number; log: string[]; onRun: () => void; onPublish: () => void; onReset: () => void };

const GenerateTab = ({ ctx, progress, log, onRun, onPublish, onReset }: Props) => {
    const { phase, ready, runs, sessions, assign } = ctx;
    const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress / 34))];
    const clashes = countClashes(sessions, assign);

    const tiles = [
        { label: 'Clashes', value: ready ? String(clashes) : '—', sub: 'must be zero', color: ready ? (clashes ? '#f59e0b' : '#22c55e') : 'var(--exo-muted)' },
        { label: 'Unplaced sessions', value: ready ? '0' : '—', sub: 'sessions without a slot', color: ready ? '#22c55e' : 'var(--exo-muted)' },
        { label: 'Choices complete', value: ready ? `${COHORTS.length}/${COHORTS.length}` : '—', sub: 'cohorts', color: ready ? '#a78bfa' : 'var(--exo-muted)' },
    ];

    return (
        <div className="grid gap-4 lg:grid-cols-[5fr_3fr]">
            <div className="space-y-4 rounded-[14px] border p-[18px]" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div>
                    <p className="text-[17px] font-bold tracking-tight" style={{ color: 'var(--exo-fg)' }}>Generate the timetable</p>
                    <p className="mt-1.5 text-[12px]" style={{ color: 'var(--exo-muted)' }}>Uses the teachers chosen in Planning. Sample data, 3 departments, Semester 5.</p>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    {tiles.map((m) => (
                        <div key={m.label} className="rounded-[10px] border p-3 text-center" style={{ background: 'var(--exo-bg)', borderColor: 'var(--exo-border)' }}>
                            <p className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--exo-muted)' }}>{m.label}</p>
                            <p className="my-1.5 text-[26px] font-bold tabular-nums" style={{ color: m.color }}>{m.value}</p>
                            <p className="text-[10px]" style={{ color: 'var(--exo-muted)' }}>{m.sub}</p>
                        </div>
                    ))}
                </div>

                {phase === 'running' && (
                    <div aria-live="polite">
                        <div className="mb-1.5 flex justify-between text-[11px]" style={{ color: 'var(--exo-muted)' }}><span>{stage}</span><span>{progress}%</span></div>
                        <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--exo-surface-high)' }}>
                            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #22c55e)' }} />
                        </div>
                    </div>
                )}

                {ready && (
                    <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--exo-muted)' }}>Solver runs</p>
                        <div className="flex items-center gap-3 border-t py-2 text-[12px]" style={{ borderColor: 'var(--exo-border)', color: 'var(--exo-muted)' }}>
                            <span className="font-mono">#{String(runs).padStart(4, '0')}</span>
                            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>FEASIBLE</span>
                            <span style={{ color: clashes ? '#f59e0b' : '#22c55e' }}>{clashes} clashes</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    <button type="button" onClick={onRun} disabled={phase === 'running' || phase === 'published'} className={btn} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}>
                        <Play size={13} /> {ready ? 'Run again' : 'Generate timetable'}
                    </button>
                    <button type="button" onClick={onPublish} disabled={phase !== 'ready'} className={btn} style={{ background: phase === 'ready' ? 'rgba(34,197,94,0.16)' : 'var(--exo-surface-high)', border: '1px solid rgba(34,197,94,0.35)', color: phase === 'ready' ? '#4ade80' : 'var(--exo-muted)' }}>
                        <Send size={13} /> Publish
                    </button>
                    <button type="button" onClick={onReset} disabled={phase === 'draft'} className={btn} style={{ background: 'var(--exo-surface)', border: '1px solid var(--exo-border)', color: 'var(--exo-fg)' }}>
                        <RotateCcw size={13} /> Start again
                    </button>
                </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div className="border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Activity</span>
                </div>
                <ul data-lenis-prevent className="max-h-60 flex-1 space-y-3 overflow-y-auto overscroll-contain p-[18px]" aria-live="polite">
                    {log.map((entry, i) => (
                        <li key={`${entry}-${i}`} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--exo-fg)' }}>
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--exo-primary)' }} />{entry}
                        </li>
                    ))}
                </ul>
                {ready && (
                    <div className="border-t p-[18px]" style={{ borderColor: 'var(--exo-border)' }}>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--exo-muted)' }}>Student choices</p>
                        {COHORTS.map((c) => (
                            <div key={c.name} className="mb-2 last:mb-0">
                                <div className="flex justify-between text-[11px]" style={{ color: 'var(--exo-muted)' }}><span>{c.name}</span><span>{c.done}/{c.total}</span></div>
                                <div className="mt-1 h-1 rounded-full" style={{ background: 'var(--exo-surface-high)' }}><div className="h-full rounded-full" style={{ width: '100%', background: '#7c3aed' }} /></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateTab;
