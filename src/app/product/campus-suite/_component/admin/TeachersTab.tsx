"use client";

import React, { useMemo, useState } from 'react';
import WeekGrid from './WeekGrid';
import { FACULTY, btn, courseOf, hoursFor, facultyName, mins } from './data';
import type { Ctx } from './types';

const TeachersTab = ({ ctx }: { ctx: Ctx }) => {
    const { assign, sessions, ready, goTo } = ctx;
    const [facultyId, setFacultyId] = useState('f2');

    const mine = useMemo(() => sessions.filter((s) => assign[s.course] === facultyId), [sessions, assign, facultyId]);
    const items = mine.map((s) => ({ id: s.id, code: s.course, label: `${s.course}${courseOf(s.course).lab ? ' Lab' : ''}`, sub: `${courseOf(s.course).dept}, room ${s.room}`, day: s.day, start: s.start, end: s.end }));
    const depts = Array.from(new Set(mine.map((s) => courseOf(s.course).dept)));
    const busy = mine.reduce((m, s) => m + mins(s.end) - mins(s.start), 0);

    if (!ready) {
        return (
            <div className="rounded-[14px] border p-8 text-center" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
                <p className="text-sm" style={{ color: 'var(--exo-muted)' }}>Generate a timetable to see each teacher&apos;s week.</p>
                <button type="button" onClick={() => goTo('generate')} className={`${btn} mt-4`} style={{ background: 'var(--exo-gradient-cta)', color: '#fff' }}>Go to Generate</button>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[14px] border" style={{ background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-[18px] py-[14px]" style={{ borderColor: 'var(--exo-border)' }}>
                <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Teacher timetable</p>
                    <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>One teacher&apos;s week across every department</p>
                </div>
                <label className="text-xs" style={{ color: 'var(--exo-muted)' }}>
                    <span className="sr-only">Teacher</span>
                    <select value={facultyId} onChange={(e) => setFacultyId(e.target.value)} className="min-h-[44px] w-full rounded-xl border px-3 text-sm sm:w-56" style={{ background: 'var(--exo-surface-high)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}>
                        {FACULTY.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                </label>
            </div>
            <div className="grid grid-cols-3 gap-2.5 px-[18px] pt-4">
                {[['Sessions a week', String(mine.length)], ['Teaching hours', hoursFor(sessions, assign, facultyId).toFixed(1)], ['Departments', depts.join(', ') || 'None']].map(([k, v]) => (
                    <div key={k} className="rounded-[10px] border p-3" style={{ background: 'var(--exo-bg)', borderColor: 'var(--exo-border)' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--exo-muted)' }}>{k}</p>
                        <p className="mt-1 text-lg font-bold" style={{ color: 'var(--exo-fg)' }}>{v}</p>
                    </div>
                ))}
            </div>
            <WeekGrid items={items} />
            <p className="border-t px-[18px] py-3 text-sm" style={{ borderColor: 'var(--exo-border)', color: 'var(--exo-muted)' }} aria-live="polite">
                {mine.length ? `${facultyName(facultyId)} teaches ${mine.length} sessions, ${Math.round(busy / 60 * 10) / 10} hours in the week.` : `${facultyName(facultyId)} has no sessions.`}
            </p>
        </div>
    );
};

export default TeachersTab;
