"use client";

import React, { useMemo, useState } from 'react';
import { Check, Lock, Pencil, X } from 'lucide-react';
import WeekGrid from './WeekGrid';
import { DAYS, DAY_NAMES, LAB_STARTS, THEORY_STARTS, addMin, btn, courseOf, facultyName, lengthOf, moveClash, type Dept } from './data';
import type { Ctx } from './types';

const DEPT_LIST: Dept[] = ['CSE', 'IT', 'ECE'];

const TimetableTab = ({ ctx }: { ctx: Ctx }) => {
    const { assign, sessions, setSessions, locked, note, ready, goTo } = ctx;
    const [dept, setDept] = useState<Dept>('CSE');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [day, setDay] = useState(0);
    const [start, setStart] = useState('08:00');

    const items = useMemo(
        () => sessions.filter((s) => courseOf(s.course).dept === dept).map((s) => ({ id: s.id, code: s.course, label: `${s.course}${courseOf(s.course).lab ? ' Lab' : ''}`, sub: facultyName(assign[s.course]), day: s.day, start: s.start, end: s.end })),
        [sessions, assign, dept],
    );
    const selected = sessions.find((s) => s.id === selectedId) ?? null;
    const course = selected ? courseOf(selected.course) : null;

    const pick = (id: string) => {
        const s = sessions.find((x) => x.id === id)!;
        setSelectedId(id); setDay(s.day); setStart(s.start);
    };

    const cand = selected ? { day, start, end: addMin(start, lengthOf(selected.course)) } : null;
    const unchanged = !!selected && selected.day === day && selected.start === start;
    const clash = selected && cand && !unchanged ? moveClash(sessions, assign, selected, cand) : null;

    const apply = () => {
        if (!selected || !cand || clash || unchanged) return;
        setSessions(sessions.map((s) => (s.id === selected.id ? { ...s, ...cand } : s)));
        note(`Moved ${selected.course} to ${DAYS[day]} ${start}`);
    };

    if (!ready) {
        return (
            <div className="rounded-[14px] border p-8 text-center" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <p className="text-sm" style={{ color: 'var(--exo-muted)' }}>There is no timetable to view yet.</p>
                <button type="button" onClick={() => goTo('generate')} className={`${btn} mt-4`} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}>Go to Generate</button>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>View and edit timetable</p>
                    <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>Select a session to move it. Clashing slots are refused.</p>
                </div>
                <div role="tablist" aria-label="Department" className="flex gap-1 rounded-xl border p-1" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)' }}>
                    {DEPT_LIST.map((d) => (
                        <button key={d} type="button" role="tab" aria-selected={dept === d} onClick={() => { setDept(d); setSelectedId(null); }} className="min-h-[36px] rounded-lg px-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" style={{ background: dept === d ? 'var(--exo-surface-high)' : 'transparent', color: dept === d ? 'var(--exo-fg)' : 'var(--exo-muted)' }}>{d}</button>
                    ))}
                </div>
            </div>

            <WeekGrid items={items} selectedId={selectedId} onSelect={locked ? undefined : pick} />

            <div className="border-t px-[18px] py-4" style={{ borderColor: 'var(--exo-border)' }} aria-live="polite">
                {locked && <p className="flex items-center gap-2 text-sm" style={{ color: '#fcd34d' }}><Lock size={13} /> Published. Start again to edit.</p>}
                {!locked && !selected && <p className="text-sm" style={{ color: 'var(--exo-muted)' }}>Select a session in the timetable to edit it.</p>}
                {!locked && selected && course && (
                    <div className="space-y-3">
                        <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--exo-fg)' }}>
                            <Pencil size={13} style={{ color: 'var(--exo-primary)' }} />
                            {course.code} {course.name}
                            <span className="font-normal" style={{ color: 'var(--exo-muted)' }}>· {facultyName(assign[course.code])} · Room {selected.room}</span>
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                            <label className="text-xs" style={{ color: 'var(--exo-muted)' }}>Day
                                <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="mt-1 min-h-[44px] w-full rounded-xl border px-3 text-sm" style={{ background: 'var(--exo-surface-high)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}>
                                    {DAY_NAMES.map((n, i) => <option key={n} value={i}>{n}</option>)}
                                </select>
                            </label>
                            <label className="text-xs" style={{ color: 'var(--exo-muted)' }}>Start time
                                <select value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 min-h-[44px] w-full rounded-xl border px-3 text-sm" style={{ background: 'var(--exo-surface-high)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}>
                                    {(course.lab ? LAB_STARTS : THEORY_STARTS).map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </label>
                        </div>
                        {clash ? (
                            <p className="flex items-center gap-2 text-sm" style={{ color: '#fca5a5' }}><X size={14} /> {clash}</p>
                        ) : (
                            <p className="flex items-center gap-2 text-sm" style={{ color: unchanged ? 'var(--exo-muted)' : '#4ade80' }}><Check size={14} /> {unchanged ? 'Current slot' : 'No clashes in this slot'}</p>
                        )}
                        <div className="flex gap-2">
                            <button type="button" onClick={apply} disabled={!!clash || unchanged} className={btn} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}>Move session</button>
                            <button type="button" onClick={() => setSelectedId(null)} className={btn} style={{ background: 'var(--exo-surface)', border: '1px solid var(--exo-border)', color: 'var(--exo-fg)' }}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimetableTab;
