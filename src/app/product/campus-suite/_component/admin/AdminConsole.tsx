"use client";

/**
 * Interactive copy of the admin console (sample data only). One shared state
 * feeds every tab: planning changes show up in workload, the generated
 * timetable, teacher timetables and analytics.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Activity, BarChart3, CalendarDays, ClipboardList, Cpu, User, type LucideIcon } from 'lucide-react';
import { EXO_TOKENS } from '../exo-tokens';
import { initialAssign, initialSessions, type Assign, type Session } from './data';
import type { Ctx, Phase, TabKey } from './types';
import PlanningTab from './PlanningTab';
import WorkloadTab from './WorkloadTab';
import GenerateTab from './GenerateTab';
import TimetableTab from './TimetableTab';
import TeachersTab from './TeachersTab';
import AnalyticsTab from './AnalyticsTab';

const TABS: { key: TabKey; label: string; Icon: LucideIcon }[] = [
    { key: 'planning', label: 'Planning', Icon: ClipboardList },
    { key: 'workload', label: 'Workload', Icon: BarChart3 },
    { key: 'generate', label: 'Generate', Icon: Cpu },
    { key: 'timetable', label: 'Timetable', Icon: CalendarDays },
    { key: 'teachers', label: 'Teachers', Icon: User },
    { key: 'analytics', label: 'Analytics', Icon: Activity },
];

const AdminConsole = () => {
    const [tab, setTab] = useState<TabKey>('generate');
    const [assign, setAssign] = useState<Assign>(initialAssign);
    const [sessions, setSessions] = useState<Session[]>(initialSessions);
    const [phase, setPhase] = useState<Phase>('draft');
    const [progress, setProgress] = useState(0);
    const [runs, setRuns] = useState(0);
    const [log, setLog] = useState<string[]>(['Scenario created']);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

    const note = (m: string) => setLog((l) => [m, ...l].slice(0, 30));

    const run = () => {
        setPhase('running');
        setProgress(0);
        let p = 0;
        timer.current = setInterval(() => {
            p += 12;
            setProgress(Math.min(p, 100));
            if (p >= 100) {
                if (timer.current) clearInterval(timer.current);
                setPhase('ready');
                setRuns((r) => r + 1);
                note('Solver run finished');
            }
        }, 220);
    };
    const publish = () => { setPhase('published'); note('Timetable published to students'); };
    const reset = () => {
        if (timer.current) clearInterval(timer.current);
        setPhase('draft'); setProgress(0); setRuns(0);
        setAssign(initialAssign()); setSessions(initialSessions()); setLog(['Scenario created']);
    };

    const ctx: Ctx = {
        assign, setAssign, sessions, setSessions, phase, runs, note, goTo: setTab,
        ready: phase === 'ready' || phase === 'published',
        locked: phase === 'published',
    };

    const chip = phase === 'published'
        ? { text: 'PUBLISHED', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.28)', color: '#22c55e' }
        : { text: 'DRAFT', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.28)', color: '#f59e0b' };

    return (
        <div style={EXO_TOKENS} className="w-full space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border px-[18px] py-3" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div>
                    <p className="text-[15px] font-bold tracking-tight" style={{ color: 'var(--exo-fg)' }}>Odd semester</p>
                    <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>Sample data · 3 departments · Semester 5</p>
                </div>
                <span role="status" className="rounded-full text-[10px] font-bold uppercase tracking-[0.08em]" style={{ background: chip.bg, border: `1px solid ${chip.border}`, color: chip.color, padding: '3px 9px' }}>{chip.text}</span>
            </div>

            <div role="tablist" aria-label="Admin console" className="flex gap-1 overflow-x-auto rounded-xl border p-1" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)' }}>
                {TABS.map(({ key, label, Icon }) => (
                    <button
                        key={key}
                        type="button"
                        role="tab"
                        id={`tab-${key}`}
                        aria-selected={tab === key}
                        aria-controls="admin-panel"
                        onClick={() => setTab(key)}
                        className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-appviolet-300"
                        style={{ background: tab === key ? 'var(--exo-surface-high)' : 'transparent', color: tab === key ? 'var(--exo-fg)' : 'var(--exo-muted)', boxShadow: tab === key ? 'inset 0 -2px 0 #a78bfa' : 'none' }}
                    >
                        <Icon size={14} /> {label}
                    </button>
                ))}
            </div>

            <div role="tabpanel" id="admin-panel" aria-labelledby={`tab-${tab}`}>
                {tab === 'planning' && <PlanningTab ctx={ctx} />}
                {tab === 'workload' && <WorkloadTab ctx={ctx} />}
                {tab === 'generate' && <GenerateTab ctx={ctx} progress={progress} log={log} onRun={run} onPublish={publish} onReset={reset} />}
                {tab === 'timetable' && <TimetableTab ctx={ctx} />}
                {tab === 'teachers' && <TeachersTab ctx={ctx} />}
                {tab === 'analytics' && <AnalyticsTab ctx={ctx} />}
            </div>
        </div>
    );
};

export default AdminConsole;
