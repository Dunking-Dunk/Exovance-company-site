"use client";

import React, { useMemo } from 'react';
import { DAYS, btn, countClashes, mins } from './data';
import type { Ctx } from './types';

const DAY_MINUTES = 9 * 50;

const AnalyticsTab = ({ ctx }: { ctx: Ctx }) => {
    const { assign, sessions, ready, runs, goTo } = ctx;

    const perDay = useMemo(() => DAYS.map((_, d) => sessions.filter((s) => s.day === d).length), [sessions]);
    const rooms = useMemo(() => {
        const m = new Map<string, number>();
        for (const s of sessions) m.set(s.room, (m.get(s.room) ?? 0) + mins(s.end) - mins(s.start));
        return Array.from(m.entries()).map(([room, minutes]) => ({ room, minutes, pct: Math.round((minutes / (DAY_MINUTES * 5)) * 100) })).sort((a, b) => b.minutes - a.minutes);
    }, [sessions]);
    const clashes = useMemo(() => countClashes(sessions, assign), [sessions, assign]);
    const maxDay = Math.max(...perDay, 1);

    if (!ready) {
        return (
            <div className="rounded-[14px] border p-8 text-center" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <p className="text-sm" style={{ color: 'var(--exo-muted)' }}>Analytics appear once a timetable exists.</p>
                <button type="button" onClick={() => goTo('generate')} className={`${btn} mt-4`} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}>Go to Generate</button>
            </div>
        );
    }

    const tiles = [
        { label: 'Clashes', value: String(clashes), color: clashes ? '#f59e0b' : '#22c55e' },
        { label: 'Sessions placed', value: String(sessions.length), color: 'var(--exo-fg)' },
        { label: 'Rooms in use', value: String(rooms.length), color: 'var(--exo-fg)' },
        { label: 'Solver runs', value: String(runs), color: '#a78bfa' },
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

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[14px] border p-[18px]" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                    <p className="mb-4 text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Sessions per day</p>
                    <div className="flex h-40 items-end gap-3" role="img" aria-label={`Sessions per day: ${DAYS.map((d, i) => `${d} ${perDay[i]}`).join(', ')}`}>
                        {perDay.map((n, i) => (
                            <div key={DAYS[i]} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                                <span className="text-xs tabular-nums" style={{ color: 'var(--exo-fg)' }}>{n}</span>
                                <div className="w-full rounded-t" style={{ height: `${(n / maxDay) * 100}px`, background: '#7c3aed' }} />
                                <span className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>{DAYS[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[14px] border p-[18px]" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                    <p className="mb-4 text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Room use across the week</p>
                    <ul className="space-y-3">
                        {rooms.map((r) => (
                            <li key={r.room}>
                                <div className="flex justify-between text-xs"><span style={{ color: 'var(--exo-fg)' }}>{r.room}</span><span className="tabular-nums" style={{ color: 'var(--exo-muted)' }}>{(r.minutes / 60).toFixed(1)} h · {r.pct}%</span></div>
                                <div className="mt-1 h-1.5 rounded-full" style={{ background: 'var(--exo-surface-high)' }}><div className="h-full rounded-full" style={{ width: `${Math.min(100, r.pct * 3)}%`, background: '#38bdf8' }} /></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--exo-muted)' }}>Counts come from the timetable above, including any session you moved.</p>
        </div>
    );
};

export default AnalyticsTab;
