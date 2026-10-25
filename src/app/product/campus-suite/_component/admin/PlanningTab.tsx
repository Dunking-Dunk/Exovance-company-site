"use client";

import React, { useState } from 'react';
import { AlertTriangle, Lock } from 'lucide-react';
import { COURSES, FACULTY, WEEKLY_LIMIT_HOURS, facultyClash, facultyName, hoursFor, type Dept } from './data';
import type { Ctx } from './types';

const DEPT_LIST: Dept[] = ['CSE', 'IT', 'ECE'];

const initials = (name: string) => name.replace(/^(Dr|Prof)\. /, '').split(' ').map((p) => p[0]).join('');

const PlanningTab = ({ ctx }: { ctx: Ctx }) => {
    const { assign, setAssign, sessions, locked, note } = ctx;
    const [dept, setDept] = useState<Dept>('CSE');
    const courses = COURSES.filter((c) => c.dept === dept);

    const change = (code: string, facultyId: string) => {
        setAssign({ ...assign, [code]: facultyId });
        note(`${code} assigned to ${facultyName(facultyId)}`);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                    <div>
                        <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Academic planning</p>
                        <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>Odd semester · choose who teaches each course</p>
                    </div>
                    <div role="tablist" aria-label="Department" className="flex gap-1 rounded-xl border p-1" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)' }}>
                        {DEPT_LIST.map((d) => (
                            <button key={d} type="button" role="tab" aria-selected={dept === d} onClick={() => setDept(d)} className="min-h-[36px] rounded-lg px-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" style={{ background: dept === d ? 'var(--exo-surface-high)' : 'transparent', color: dept === d ? 'var(--exo-fg)' : 'var(--exo-muted)' }}>{d}</button>
                        ))}
                    </div>
                </div>
                {locked && (
                    <p className="flex items-center gap-2 border-b px-[18px] py-2.5 text-xs" style={{ borderColor: 'var(--exo-border)', color: '#fcd34d' }}><Lock size={12} /> Published. Start again to change assignments.</p>
                )}
                <ul className="divide-y" style={{ borderColor: 'var(--exo-border)' }}>
                    {courses.map((c) => {
                        const per = sessions.filter((s) => s.course === c.code).length;
                        return (
                            <li key={c.code} className="flex flex-col gap-3 px-[18px] py-3.5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--exo-border)' }}>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--exo-fg)' }}>
                                        <span className="mr-2 rounded px-1.5 py-0.5 font-mono text-[11px]" style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd' }}>{c.code}</span>
                                        {c.name}
                                    </p>
                                    <p className="mt-1 text-[11px]" style={{ color: 'var(--exo-muted)' }}>{c.lab ? 'Lab' : 'Theory'} · {per} session{per > 1 ? 's' : ''} a week · {c.room}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: 'rgba(99,102,241,0.25)', color: '#c7d2fe' }}>{initials(facultyName(assign[c.code]))}</span>
                                    <label className="sr-only" htmlFor={`fac-${c.code}`}>Teacher for {c.code}</label>
                                    <select
                                        id={`fac-${c.code}`}
                                        value={assign[c.code]}
                                        disabled={locked}
                                        onChange={(e) => change(c.code, e.target.value)}
                                        className="min-h-[44px] w-full rounded-xl border px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:opacity-60 sm:w-56"
                                        style={{ background: 'var(--exo-surface-high)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}
                                    >
                                        {FACULTY.map((f) => {
                                            const clash = f.id === assign[c.code] ? null : facultyClash(sessions, assign, f.id, c.code);
                                            return <option key={f.id} value={f.id} disabled={!!clash}>{f.name}{clash ? ` (teaches ${clash} then)` : ''}</option>;
                                        })}
                                    </select>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div className="border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Faculty bench</p>
                    <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>Weekly teaching hours · limit {WEEKLY_LIMIT_HOURS} h (sample)</p>
                </div>
                <ul data-lenis-prevent className="max-h-[420px] space-y-3 overflow-y-auto overscroll-contain p-[18px]">
                    {FACULTY.map((f) => {
                        const h = hoursFor(sessions, assign, f.id);
                        const over = h > WEEKLY_LIMIT_HOURS;
                        return (
                            <li key={f.id}>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span style={{ color: 'var(--exo-fg)' }}>{f.name}</span>
                                    <span className="flex items-center gap-1 tabular-nums" style={{ color: over ? '#fbbf24' : 'var(--exo-muted)' }}>
                                        {over && <AlertTriangle size={11} aria-label="Over limit" />}
                                        {h.toFixed(1)} h
                                    </span>
                                </div>
                                <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--exo-surface-high)' }}>
                                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, (h / (WEEKLY_LIMIT_HOURS * 1.25)) * 100)}%`, background: over ? '#f59e0b' : '#7c3aed' }} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PlanningTab;
