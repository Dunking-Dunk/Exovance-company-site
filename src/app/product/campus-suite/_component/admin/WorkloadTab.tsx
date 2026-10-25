"use client";

import React, { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { FACULTY, WEEKLY_LIMIT_HOURS, hoursFor } from './data';
import type { Ctx } from './types';

const WorkloadTab = ({ ctx }: { ctx: Ctx }) => {
    const { assign, sessions } = ctx;
    const [search, setSearch] = useState('');

    const rows = useMemo(
        () => FACULTY.map((f) => ({ ...f, hours: hoursFor(sessions, assign, f.id), count: sessions.filter((s) => assign[s.course] === f.id).length }))
            .sort((a, b) => b.hours - a.hours),
        [sessions, assign],
    );
    const shown = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    const total = rows.reduce((n, r) => n + r.count, 0);
    const max = rows[0]?.hours ?? 0;
    const over = rows.filter((r) => r.hours > WEEKLY_LIMIT_HOURS).length;

    const tiles = [
        { label: 'Total sessions', value: String(total), color: 'var(--exo-fg)' },
        { label: 'Average per faculty', value: (total / rows.length).toFixed(1), color: 'var(--exo-fg)' },
        { label: 'Highest load', value: `${max.toFixed(1)} h`, color: max > WEEKLY_LIMIT_HOURS ? '#fbbf24' : 'var(--exo-fg)' },
        { label: 'Over limit', value: String(over), color: over ? '#fbbf24' : '#22c55e' },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {tiles.map((t) => (
                    <div key={t.label} className="rounded-[10px] border p-3" style={{ background: 'var(--exo-bg)', borderColor: 'var(--exo-border)' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--exo-muted)' }}>{t.label}</p>
                        <p className="mt-1 text-xl font-bold tabular-nums" style={{ color: t.color }}>{t.value}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <div className="flex flex-wrap items-center gap-3 border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                    <p className="flex-1 text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Faculty workload</p>
                    <label className="sr-only" htmlFor="wl-search">Search faculty</label>
                    <input id="wl-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search faculty" className="min-h-[40px] w-full rounded-lg border px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-appviolet-300 sm:w-52" style={{ background: 'var(--exo-surface-high)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }} />
                </div>
                <div className="grid grid-cols-[1.5rem_1fr_3.5rem_4.5rem_minmax(0,8rem)] gap-3 px-[18px] py-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--exo-muted)' }}>
                    <span>#</span><span>Faculty</span><span className="text-right">Sessions</span><span className="text-right">Hours</span><span>Load</span>
                </div>
                <ul className="divide-y" style={{ borderColor: 'var(--exo-border)' }}>
                    {shown.map((r, i) => (
                        <li key={r.id} className="grid grid-cols-[1.5rem_1fr_3.5rem_4.5rem_minmax(0,8rem)] items-center gap-3 px-[18px] py-2.5 text-xs" style={{ borderColor: 'var(--exo-border)' }}>
                            <span className="tabular-nums" style={{ color: 'var(--exo-muted)' }}>{i + 1}</span>
                            <span className="truncate font-medium" style={{ color: 'var(--exo-fg)' }}>{r.name}</span>
                            <span className="text-right tabular-nums" style={{ color: 'var(--exo-fg)' }}>{r.count}</span>
                            <span className="flex items-center justify-end gap-1 tabular-nums" style={{ color: r.hours > WEEKLY_LIMIT_HOURS ? '#fbbf24' : 'var(--exo-muted)' }}>
                                {r.hours > WEEKLY_LIMIT_HOURS && <AlertTriangle size={11} aria-label="Over limit" />}{r.hours.toFixed(1)}
                            </span>
                            <div className="h-1.5 rounded-full" style={{ background: 'var(--exo-surface-high)' }}>
                                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (r.hours / (WEEKLY_LIMIT_HOURS * 1.25)) * 100)}%`, background: r.hours > WEEKLY_LIMIT_HOURS ? '#f59e0b' : '#7c3aed' }} />
                            </div>
                        </li>
                    ))}
                    {shown.length === 0 && <li className="px-[18px] py-6 text-center text-sm" style={{ color: 'var(--exo-muted)' }}>No results</li>}
                </ul>
            </div>
            <p className="text-xs" style={{ color: 'var(--exo-muted)' }}>Change a teacher on the Planning tab and this list updates. The {WEEKLY_LIMIT_HOURS} hour limit is sample data.</p>
        </div>
    );
};

export default WorkloadTab;
