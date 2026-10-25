"use client";

/**
 * Hero version of the admin main dashboard ("Campus Overview"), sample data.
 * Same structure as the admin console: stat cards with sparklines, the
 * Current Scenario card with its metric tiles and actions, and the activity feed.
 */

import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, CalendarDays, CheckCircle2, ClipboardList, LayoutDashboard, Play, Send, Settings, Users, DoorOpen, GraduationCap, Layers } from 'lucide-react';
import { EXO_TOKENS } from './exo-tokens';

type Phase = 'draft' | 'running' | 'ready' | 'published';

const RAIL = [LayoutDashboard, CalendarDays, ClipboardList, Users, BarChart3, Settings];

const Spark = ({ points, color }: { points: number[]; color: string }) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const d = points.map((p, i) => `${(i / (points.length - 1)) * 60},${22 - ((p - min) / (max - min || 1)) * 20}`).join(' ');
    return (
        <svg aria-hidden="true" viewBox="0 0 60 24" className="h-6 w-14" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={d} />
        </svg>
    );
};

const STATS = [
    { label: 'Active scenarios', value: '1', sub: 'Odd semester', color: '#a78bfa', tint: 'rgba(124,58,237,0.16)', Icon: Layers, spark: [2, 3, 3, 5, 4, 6, 7], live: true },
    { label: 'Teachers', value: '15', sub: 'Across 3 departments', color: '#60a5fa', tint: 'rgba(96,165,250,0.14)', Icon: GraduationCap, spark: [3, 4, 4, 6, 5, 7, 8] },
    { label: 'Rooms in use', value: '9', sub: 'Classrooms and labs', color: '#34d399', tint: 'rgba(52,211,153,0.14)', Icon: DoorOpen, spark: [2, 2, 3, 5, 4, 6, 6] },
    { label: 'Choices complete', value: '3/3', sub: 'Cohorts, Semester 5', color: '#fbbf24', tint: 'rgba(251,191,36,0.14)', Icon: Users, spark: [1, 3, 2, 5, 6, 6, 8] },
];

const AdminDashboardHero = () => {
    const [phase, setPhase] = useState<Phase>('draft');
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>(['Teachers assigned to courses', 'Scenario created']);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

    const run = () => {
        setPhase('running'); setProgress(0);
        let p = 0;
        timer.current = setInterval(() => {
            p += 14;
            setProgress(Math.min(p, 100));
            if (p >= 100) {
                if (timer.current) clearInterval(timer.current);
                setPhase('ready');
                setLog((l) => ['Solver run finished, 0 clashes', ...l].slice(0, 4));
            }
        }, 200);
    };
    const publish = () => { setPhase('published'); setLog((l) => ['Timetable published to students', ...l].slice(0, 4)); };
    const reset = () => { setPhase('draft'); setProgress(0); setLog(['Teachers assigned to courses', 'Scenario created']); };

    const done = phase === 'ready' || phase === 'published';
    const published = phase === 'published';
    const tiles = [
        { label: 'Clashes', value: done ? '0' : '—', color: done ? '#22c55e' : 'var(--exo-muted)' },
        { label: 'Unplaced', value: done ? '0' : '—', color: done ? '#22c55e' : 'var(--exo-muted)' },
        { label: 'Sessions', value: done ? '27' : '—', color: done ? '#a78bfa' : 'var(--exo-muted)' },
    ];
    const btn = 'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-appviolet-300';

    return (
        <section aria-labelledby="dash-title" style={EXO_TOKENS} className="overflow-hidden rounded-2xl border text-left shadow-2xl shadow-black/50" >
            <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
                <span className="ml-2 text-[11px]" style={{ color: 'var(--exo-muted)' }}>Campus Core · Dashboard · Sample data</span>
            </div>

            <div className="flex" style={{ background: 'var(--exo-bg)' }}>
                <nav aria-hidden="true" className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r py-4 sm:flex" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)' }}>
                    {RAIL.map((Icon, i) => (
                        <span key={i} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: i === 0 ? 'rgba(124,58,237,0.25)' : 'transparent', color: i === 0 ? '#e9d5ff' : 'var(--exo-muted)' }}><Icon size={15} /></span>
                    ))}
                </nav>

                <div className="min-w-0 flex-1 space-y-3 p-3.5 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 id="dash-title" className="font-display text-lg font-bold tracking-tight sm:text-xl" style={{ color: 'var(--exo-fg)' }}>Campus Overview</h2>
                            <p className="mt-0.5 text-[11px]" style={{ color: 'var(--exo-muted)' }}>Welcome back. Here is the latest from the scheduling engine.</p>
                        </div>
                        <span className="shrink-0 rounded-lg border px-2.5 py-1 text-[11px]" style={{ borderColor: 'var(--exo-border)', color: 'var(--exo-fg)', background: 'var(--exo-surface)' }}>Odd semester</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        {STATS.map(({ label, value, sub, color, tint, Icon, spark, live }) => (
                            <div key={label} className="rounded-xl border p-3" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                                <div className="flex items-center justify-between">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: tint, color }}><Icon size={14} /></span>
                                    {live && <span className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: 'rgba(34,197,94,0.14)', color: '#4ade80' }}><i className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />LIVE</span>}
                                </div>
                                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--exo-muted)' }}>{label}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--exo-fg)' }}>{value}</p>
                                    <Spark points={spark} color={color} />
                                </div>
                                <p className="text-[10px]" style={{ color: 'var(--exo-muted)' }}>{sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                        <div className="flex items-center justify-between border-b px-3.5 py-2.5" style={{ borderColor: 'var(--exo-border)' }}>
                            <span className="text-[12px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Current scenario</span>
                            <span role="status" className="rounded-full text-[9px] font-bold uppercase tracking-[0.08em]" style={{ background: published ? 'rgba(34,197,94,0.10)' : 'rgba(245,158,11,0.10)', border: `1px solid ${published ? 'rgba(34,197,94,0.28)' : 'rgba(245,158,11,0.28)'}`, color: published ? '#22c55e' : '#f59e0b', padding: '3px 9px' }}>{published ? 'PUBLISHED' : 'DRAFT'}</span>
                        </div>
                        <div className="space-y-3 p-3.5">
                            <div className="grid grid-cols-3 gap-2">
                                {tiles.map((t) => (
                                    <div key={t.label} className="rounded-lg border p-2 text-center" style={{ background: 'var(--exo-bg)', borderColor: 'var(--exo-border)' }}>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--exo-muted)' }}>{t.label}</p>
                                        <p className="my-1 text-[22px] font-bold tabular-nums" style={{ color: t.color }}>{t.value}</p>
                                    </div>
                                ))}
                            </div>
                            {phase === 'running' && (
                                <div aria-live="polite">
                                    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--exo-surface-high)' }}><div className="h-full rounded-full" style={{ width: `${progress}%`, background: '#7c3aed' }} /></div>
                                    <p className="mt-1 text-[11px]" style={{ color: 'var(--exo-muted)' }}>Placing sessions and checking for clashes</p>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={run} disabled={phase === 'running' || published} className={btn} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}><Play size={13} /> {done ? 'Run again' : 'Run solver'}</button>
                                <button type="button" onClick={publish} disabled={phase !== 'ready'} className={btn} style={{ background: phase === 'ready' ? 'rgba(34,197,94,0.16)' : 'var(--exo-surface-high)', border: '1px solid rgba(34,197,94,0.35)', color: phase === 'ready' ? '#4ade80' : 'var(--exo-muted)' }}><Send size={13} /> Publish</button>
                                {phase !== 'draft' && <button type="button" onClick={reset} className={btn} style={{ background: 'var(--exo-surface)', border: '1px solid var(--exo-border)', color: 'var(--exo-fg)' }}>Reset</button>}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border px-3.5 py-3" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                        <p className="mb-2 text-[12px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Activity</p>
                        <ul className="space-y-2" aria-live="polite">
                            {log.map((entry, i) => (
                                <li key={`${entry}-${i}`} className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--exo-fg)' }}><CheckCircle2 size={13} style={{ color: 'var(--exo-primary)' }} />{entry}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboardHero;
