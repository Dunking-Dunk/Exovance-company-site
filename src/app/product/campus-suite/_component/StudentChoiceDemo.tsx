"use client";

/**
 * Interactive copy of the student course-selection screen (sample data only).
 * Layout, tokens and states follow the student portal's selection page:
 * group cards with radio-style offerings, seat bars, "Time conflict" and
 * "Already picked" states, lab batch sub-rows and a live timetable preview.
 */

import React, { useMemo, useState } from 'react';
import { EXO_TOKENS as TOKENS } from './exo-tokens';
import { BanIcon, CheckCircle2, ChevronRight, Clock, Info, LayoutGrid, RotateCcw, Users } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FIRST_HOUR = 8;
const HOURS = 9; // 8:00 to 17:00
const ROW_H = 40;

type Session = { day: number; start: string; end: string };
type Offering = {
    id: string;
    courseId: string;
    code: string;
    name: string;
    faculty: string;
    seatsLeft: number;
    maxSeats: number;
    sessions: Session[];
    lab?: boolean;
    batch?: number;
};
type Bucket = { id: string; name: string; group?: number; offerings: Offering[] };

const s = (day: number, start: string, end: string): Session => ({ day, start, end });

const BUCKETS: Bucket[] = [
    { id: 'b1', name: 'Database Systems: choose your teacher', offerings: [
        { id: 'o1', courseId: 'CS502', code: 'CS502', name: 'Database Systems', faculty: 'Prof. Latha R', seatsLeft: 18, maxSeats: 60, sessions: [s(0, '08:00', '08:50'), s(2, '08:00', '08:50')] },
        { id: 'o2', courseId: 'CS502', code: 'CS502', name: 'Database Systems', faculty: 'Dr. Naveen T', seatsLeft: 9, maxSeats: 60, sessions: [s(1, '10:00', '10:50'), s(3, '10:00', '10:50')] },
        { id: 'o3', courseId: 'CS502', code: 'CS502', name: 'Database Systems', faculty: 'Prof. Divya M', seatsLeft: 31, maxSeats: 60, sessions: [s(0, '14:10', '15:00'), s(3, '14:10', '15:00')] },
    ] },
    { id: 'b2', name: 'Computer Networks: choose your teacher', offerings: [
        { id: 'o4', courseId: 'CS503', code: 'CS503', name: 'Computer Networks', faculty: 'Dr. Suresh B', seatsLeft: 22, maxSeats: 60, sessions: [s(0, '08:50', '09:40'), s(2, '08:50', '09:40')] },
        { id: 'o5', courseId: 'CS503', code: 'CS503', name: 'Computer Networks', faculty: 'Prof. Kavya N', seatsLeft: 14, maxSeats: 60, sessions: [s(1, '10:50', '11:40'), s(4, '10:50', '11:40')] },
        { id: 'o6', courseId: 'CS503', code: 'CS503', name: 'Computer Networks', faculty: 'Dr. Rahul D', seatsLeft: 27, maxSeats: 60, sessions: [s(0, '14:10', '15:00'), s(4, '13:20', '14:10')] },
    ] },
    { id: 'b3', name: 'Professional elective', group: 1, offerings: [
        { id: 'o7', courseId: 'AI301', code: 'AI301', name: 'Machine Learning', faculty: 'Dr. Harini S', seatsLeft: 12, maxSeats: 60, sessions: [s(1, '08:00', '08:50'), s(3, '08:00', '08:50')] },
        { id: 'o8', courseId: 'CS311', code: 'CS311', name: 'Cloud Computing', faculty: 'Prof. Gopal C', seatsLeft: 4, maxSeats: 60, sessions: [s(2, '10:00', '10:50'), s(4, '10:00', '10:50')] },
        { id: 'o9', courseId: 'CS312', code: 'CS312', name: 'Information Security', faculty: 'Dr. Nisha A', seatsLeft: 0, maxSeats: 60, sessions: [s(0, '10:50', '11:40'), s(3, '10:50', '11:40')] },
    ] },
    { id: 'b4', name: 'Open elective', group: 2, offerings: [
        { id: 'o10', courseId: 'AI301', code: 'AI301', name: 'Machine Learning', faculty: 'Prof. Tara J', seatsLeft: 20, maxSeats: 40, sessions: [s(1, '11:40', '12:30'), s(4, '11:40', '12:30')] },
        { id: 'o11', courseId: 'HS301', code: 'HS301', name: 'Entrepreneurship', faculty: 'Dr. Manoj V', seatsLeft: 33, maxSeats: 40, sessions: [s(2, '11:40', '12:30'), s(4, '08:00', '08:50')] },
        { id: 'o12', courseId: 'MA311', code: 'MA311', name: 'Operations Research', faculty: 'Prof. Ishita G', seatsLeft: 15, maxSeats: 40, sessions: [s(1, '13:20', '14:10'), s(3, '13:20', '14:10')] },
    ] },
    { id: 'b5', name: 'Database Lab: choose a faculty, then a batch', offerings: [
        { id: 'o13', courseId: 'CS5L1:latha', code: 'CS5L1', name: 'Database Lab', faculty: 'Prof. Latha R', lab: true, batch: 1, seatsLeft: 11, maxSeats: 30, sessions: [s(1, '13:20', '15:00')] },
        { id: 'o14', courseId: 'CS5L1:latha', code: 'CS5L1', name: 'Database Lab', faculty: 'Prof. Latha R', lab: true, batch: 2, seatsLeft: 7, maxSeats: 30, sessions: [s(2, '15:00', '16:40')] },
        { id: 'o15', courseId: 'CS5L1:anand', code: 'CS5L1', name: 'Database Lab', faculty: 'Dr. Anand K', lab: true, batch: 1, seatsLeft: 16, maxSeats: 30, sessions: [s(0, '15:00', '16:40')] },
        { id: 'o16', courseId: 'CS5L1:anand', code: 'CS5L1', name: 'Database Lab', faculty: 'Dr. Anand K', lab: true, batch: 2, seatsLeft: 13, maxSeats: 30, sessions: [s(3, '13:20', '15:00')] },
    ] },
];

const ALL = BUCKETS.flatMap((b) => b.offerings.map((o) => ({ ...o, bucketId: b.id })));
const mins = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const overlap = (a: Session, b: Session) => a.day === b.day && mins(a.start) < mins(b.end) && mins(b.start) < mins(a.end);
const clashes = (a: Offering, b: Offering) => a.sessions.some((x) => b.sessions.some((y) => overlap(x, y)));

const COLORS = ['#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a78bfa', '#f87171', '#38bdf8'];
const colorOf = (code: string) => {
    let h = 0;
    for (let i = 0; i < code.length; i++) h = code.charCodeAt(i) + ((h << 5) - h);
    return COLORS[Math.abs(h) % COLORS.length];
};

const slotLabel = (o: Offering) => o.sessions.map((x) => `${DAYS[x.day]} ${x.start}`).join(', ');

type Picks = Record<string, string>;

const StudentChoiceDemo = () => {
    const [picks, setPicks] = useState<Picks>({});
    const [facPicks, setFacPicks] = useState<Record<string, string>>({});
    const [hover, setHover] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const picked = useMemo(() => Object.values(picks).map((id) => ALL.find((o) => o.id === id)!), [picks]);
    const done = picked.length;
    const canConfirm = done === BUCKETS.length;

    const status = (o: Offering & { bucketId: string }) => {
        const others = picked.filter((p) => ALL.find((x) => x.id === p.id)!.bucketId !== o.bucketId);
        return {
            used: !o.lab && others.some((p) => !p.lab && p.courseId === o.courseId),
            blocked: others.some((p) => clashes(o, p)),
            full: o.seatsLeft === 0,
        };
    };

    const choose = (bucketId: string, id: string) => setPicks((p) => (p[bucketId] === id ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== bucketId)) : { ...p, [bucketId]: id }));
    const chooseFaculty = (bucketId: string, key: string) => {
        setFacPicks((f) => ({ ...f, [bucketId]: key }));
        setPicks((p) => {
            const cur = ALL.find((o) => o.id === p[bucketId]);
            return cur && cur.courseId !== key ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== bucketId)) : p;
        });
    };
    const reset = () => { setPicks({}); setFacPicks({}); setConfirmed(false); };

    const hoverOffering = hover ? ALL.find((o) => o.id === hover) : undefined;
    const preview = hoverOffering && !picked.some((p) => p.id === hoverOffering.id) ? hoverOffering : null;
    const previewClash = preview
        ? picked.some((p) => ALL.find((x) => x.id === p.id)!.bucketId !== preview.bucketId && clashes(preview, p))
        : false;

    if (confirmed) {
        return (
            <div style={TOKENS} className="rounded-[22px] border p-6 sm:p-8" >
                <div className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium" style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.3)', color: 'var(--exo-success)' }}>
                    <CheckCircle2 size={16} className="shrink-0" />
                    Selection confirmed. Your timetable has no clashes.
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {BUCKETS.map((b) => {
                        const o = ALL.find((x) => x.id === picks[b.id])!;
                        return (
                            <li key={b.id} className="rounded-2xl border p-4" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)' }}>
                                <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--exo-muted)' }}>{b.name}</p>
                                <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--exo-fg)' }}>{o.code} <span className="font-normal" style={{ color: 'var(--exo-muted)' }}>{o.name}</span></p>
                                <p className="mt-0.5 text-xs" style={{ color: 'var(--exo-muted)' }}>{o.faculty}{o.batch ? ` · Batch ${o.batch}` : ''} · {slotLabel(o)}</p>
                            </li>
                        );
                    })}
                </ul>
                <button type="button" onClick={reset} className="mt-5 flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}>
                    <RotateCcw size={13} /> Start again
                </button>
            </div>
        );
    }

    return (
        <div style={TOKENS} className="w-full space-y-4 text-left">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--exo-fg)' }}>Course selection</h3>
                    <p className="mt-1 text-sm" style={{ color: 'var(--exo-muted)' }} aria-live="polite">
                        {done}/{BUCKETS.length} groups selected · Sample data
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button type="button" onClick={reset} disabled={done === 0} className="flex min-h-[44px] items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)', color: 'var(--exo-fg)' }}>
                        <RotateCcw size={13} /> Clear all
                    </button>
                    <button type="button" onClick={() => setConfirmed(true)} disabled={!canConfirm} className="flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" style={{ background: canConfirm ? 'var(--exo-gradient-cta)' : 'var(--exo-surface-high)', color: canConfirm ? '#fff' : 'var(--exo-muted)' }}>
                        Confirm selection <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm" style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.25)' }}>
                <Info size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--exo-primary)' }} />
                <p style={{ color: 'var(--exo-muted)' }}>Pick one offering in each group. Your timetable updates on the right. Options that would clash are switched off.</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:items-start">
                {/* Left: course options */}
                <div className="flex flex-col overflow-hidden rounded-[22px] border" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)', boxShadow: 'var(--exo-card-shadow)' }}>
                    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--exo-border)', background: 'var(--exo-surface-2)' }}>
                        <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Course options</p>
                        <span className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>{done}/{BUCKETS.length} selected</span>
                    </div>
                    <div data-lenis-prevent className="space-y-3 overscroll-contain p-3 xl:max-h-[600px] xl:overflow-y-auto">
                        {BUCKETS.map((b, i) => {
                            const isDone = Boolean(picks[b.id]);
                            const pickedO = ALL.find((o) => o.id === picks[b.id]);
                            const hasBatches = b.offerings.some((o) => o.batch);
                            const facKeys = Array.from(new Set(b.offerings.map((o) => o.courseId)));
                            const activeKey = facPicks[b.id] ?? pickedO?.courseId;
                            return (
                                <section key={b.id} aria-label={b.name} className="rounded-2xl border p-4 transition-all" style={{ background: 'var(--exo-surface)', borderColor: isDone ? 'rgba(167,139,250,0.55)' : 'var(--exo-border)' }}>
                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: isDone ? 'var(--exo-primary-soft)' : 'var(--exo-surface-high)', color: isDone ? 'var(--exo-primary)' : 'var(--exo-muted)' }}>
                                            {isDone ? <CheckCircle2 size={11} /> : i + 1}
                                        </div>
                                        <h4 className="flex-1 text-sm font-semibold" style={{ color: 'var(--exo-fg)' }}>{b.name}</h4>
                                        {b.group && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: 'var(--exo-primary-soft)', color: 'var(--exo-primary)' }}>Group {b.group}</span>}
                                        {isDone && <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--exo-success)' }}>Selected</span>}
                                    </div>

                                    <div role="radiogroup" aria-label={b.name} className="space-y-2">
                                        {hasBatches
                                            ? facKeys.map((key) => {
                                                const list = b.offerings.filter((o) => o.courseId === key);
                                                const active = activeKey === key;
                                                return (
                                                    <div key={key} className="overflow-hidden rounded-xl border" style={{ borderColor: active ? 'rgba(167,139,250,0.5)' : 'var(--exo-border)' }}>
                                                        <button type="button" onClick={() => chooseFaculty(b.id, key)} aria-expanded={active} className="flex min-h-[44px] w-full items-start gap-3 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300" style={{ background: active ? 'rgba(124,58,237,0.12)' : 'var(--exo-surface-high)', borderBottom: `1px solid ${active ? 'rgba(167,139,250,0.3)' : 'var(--exo-border)'}` }}>
                                                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: active ? 'var(--exo-primary)' : 'var(--exo-dim)', color: 'var(--exo-primary)' }}>{active && <CheckCircle2 size={10} />}</span>
                                                            <span className="min-w-0 flex-1">
                                                                <span className="block text-xs font-semibold" style={{ color: 'var(--exo-fg)' }}>{list[0].name}</span>
                                                                <span className="mt-0.5 block text-[11px]" style={{ color: 'var(--exo-muted)' }}>{list[0].faculty}</span>
                                                            </span>
                                                            <span className="shrink-0 rounded-full px-1.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>Lab batches</span>
                                                        </button>
                                                        {active && (
                                                            <div className="divide-y" style={{ borderColor: 'var(--exo-border)' }}>
                                                                {list.map((o) => (
                                                                    <Row key={o.id} o={o} bucketId={b.id} selected={picks[b.id] === o.id} st={status({ ...o, bucketId: b.id })} onPick={() => choose(b.id, o.id)} onHover={setHover} sub />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                            : b.offerings.map((o) => (
                                                <Row key={o.id} o={o} bucketId={b.id} selected={picks[b.id] === o.id} st={status({ ...o, bucketId: b.id })} onPick={() => choose(b.id, o.id)} onHover={setHover} />
                                            ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>

                {/* Right: live timetable preview */}
                <Preview picked={picked} preview={preview} previewClash={previewClash} />
            </div>
        </div>
    );
};

type RowProps = {
    o: Offering;
    bucketId: string;
    selected: boolean;
    st: { used: boolean; blocked: boolean; full: boolean };
    onPick: () => void;
    onHover: (id: string | null) => void;
    sub?: boolean;
};

const Row = ({ o, selected, st, onPick, onHover, sub }: RowProps) => {
    const disabled = (st.full || st.used || st.blocked) && !selected;
    const pct = Math.round(((o.maxSeats - o.seatsLeft) / o.maxSeats) * 100);
    const border = st.blocked ? 'rgba(248,113,113,0.4)' : st.used ? 'rgba(245,158,11,0.4)' : st.full ? 'rgba(239,68,68,0.3)' : selected ? 'var(--exo-primary)' : 'var(--exo-border)';
    const bg = st.blocked ? 'rgba(248,113,113,0.06)' : st.used ? 'rgba(245,158,11,0.06)' : st.full ? 'rgba(239,68,68,0.06)' : selected ? 'rgba(124,58,237,0.16)' : 'var(--exo-surface-2)';
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={disabled}
            onClick={() => { if (!disabled) onPick(); }}
            onMouseEnter={() => onHover(o.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(o.id)}
            onBlur={() => onHover(null)}
            className={`w-full min-h-[44px] border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${sub ? 'rounded-none px-4 py-2.5' : 'rounded-xl px-3.5 py-3'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
            style={{ background: bg, borderColor: sub ? 'transparent' : border }}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                    {st.used && !selected ? (
                        <BanIcon size={16} className="mt-0.5 shrink-0" style={{ color: 'rgba(245,158,11,0.8)' }} />
                    ) : (
                        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2" style={{ borderColor: selected ? 'var(--exo-primary)' : 'var(--exo-dim)', background: selected ? 'var(--exo-primary)' : 'transparent', boxShadow: selected ? 'inset 0 0 0 2px var(--exo-surface-2)' : 'none' }} />
                    )}
                    <div className="min-w-0 flex-1">
                        {!sub && (
                            <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--exo-fg)' }}>
                                {o.code} <span className="ml-1 text-[12px] font-normal" style={{ color: 'var(--exo-muted)' }}>{o.name}</span>
                            </p>
                        )}
                        <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs ${sub ? '' : 'mt-1.5'}`} style={{ color: 'var(--exo-muted)' }}>
                            {!sub && <span>{o.faculty}</span>}
                            {o.batch && <span className="rounded-full px-1.5 text-[10px] font-semibold" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>Batch {o.batch}</span>}
                            <span className="inline-flex items-center gap-0.5" style={{ color: 'var(--exo-dim)' }}><Clock size={9} /> {slotLabel(o)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                    {st.blocked && !selected && <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(248,113,113,0.16)', color: '#fca5a5' }}><Clock size={8} /> Time conflict</span>}
                    {st.used && !selected && <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(245,158,11,0.16)', color: '#fcd34d' }}>Already picked</span>}
                    {st.full ? (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(239,68,68,0.16)', color: '#fca5a5' }}>Full</span>
                    ) : (
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--exo-muted)' }}><Users size={10} /> {o.seatsLeft} left</span>
                    )}
                </div>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full" style={{ background: 'var(--exo-surface-high)' }} aria-hidden="true">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--exo-danger)' : pct > 85 ? '#f59e0b' : '#7c3aed' }} />
            </div>
        </button>
    );
};

const Preview = ({ picked, preview, previewClash }: { picked: Offering[]; preview: Offering | null; previewClash: boolean }) => {
    const sessionCount = picked.reduce((n, o) => n + o.sessions.length, 0);
    const entries = [
        ...picked.map((o) => ({ o, ghost: false })),
        ...(preview ? [{ o: preview, ghost: true }] : []),
    ];
    return (
        <div className="flex flex-col overflow-hidden rounded-[22px] border" style={{ background: 'var(--exo-surface)', borderColor: 'var(--exo-border)', boxShadow: 'var(--exo-card-shadow)' }}>
            <div className="flex items-center justify-between gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--exo-border)', background: 'var(--exo-surface-2)' }}>
                <div className="flex items-center gap-2.5">
                    <LayoutGrid size={14} style={{ color: 'var(--exo-primary)' }} />
                    <div>
                        <p className="text-[13px] font-semibold" style={{ color: 'var(--exo-fg)' }}>Live timetable preview</p>
                        <p className="text-[11px]" style={{ color: 'var(--exo-muted)' }}>Updates as you pick from each group.</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                    {sessionCount > 0 && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: 'var(--exo-primary-soft)', color: 'var(--exo-primary)' }}>{sessionCount} sessions</span>}
                    <span role="status" className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: 'rgba(34,197,94,0.14)', color: 'var(--exo-success)' }}>
                        <CheckCircle2 size={11} /> No clashes
                    </span>
                </div>
            </div>
            <div className="overflow-x-auto p-3">
                <div className="min-w-[440px]">
                    <div className="grid" style={{ gridTemplateColumns: '2.75rem repeat(5, minmax(0, 1fr))' }}>
                        <div />
                        {DAYS.map((d) => <div key={d} className="py-1.5 text-center text-xs font-medium" style={{ color: 'var(--exo-muted)' }}>{d}</div>)}
                    </div>
                    <div className="grid border-l border-t" style={{ gridTemplateColumns: '2.75rem repeat(5, minmax(0, 1fr))', borderColor: 'var(--exo-border)' }}>
                        <div>
                            {Array.from({ length: HOURS }).map((_, h) => (
                                <div key={h} className="border-b border-r pr-1 pt-0.5 text-right text-[10px]" style={{ height: ROW_H, borderColor: 'var(--exo-border)', color: 'var(--exo-muted)' }}>{String(FIRST_HOUR + h).padStart(2, '0')}:00</div>
                            ))}
                        </div>
                        {DAYS.map((_, d) => (
                            <div key={d} className="relative border-r" style={{ height: ROW_H * HOURS, borderColor: 'var(--exo-border)', backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${ROW_H - 1}px, var(--exo-border) ${ROW_H - 1}px, var(--exo-border) ${ROW_H}px)` }}>
                                {entries.flatMap(({ o, ghost }) => o.sessions.filter((x) => x.day === d).map((x, i) => {
                                    const top = ((mins(x.start) - FIRST_HOUR * 60) / 60) * ROW_H;
                                    const height = ((mins(x.end) - mins(x.start)) / 60) * ROW_H - 2;
                                    const color = ghost && previewClash ? '#f87171' : colorOf(o.code);
                                    return (
                                        <div key={`${o.id}-${i}`} className="absolute left-0.5 right-0.5 overflow-hidden rounded px-1.5 py-0.5 text-[10px] leading-tight" style={{ top: top + 1, height, background: `${color}${ghost ? '1f' : '33'}`, borderLeft: `3px ${ghost ? 'dashed' : 'solid'} ${color}`, outline: ghost ? `1px dashed ${color}` : 'none', color: 'var(--exo-fg)', zIndex: ghost ? 2 : 1 }}>
                                            <div className="truncate font-semibold">{o.code}{o.lab ? ' Lab' : ''}</div>
                                            <div className="truncate" style={{ color: 'var(--exo-muted)' }}>{x.start}</div>
                                        </div>
                                    );
                                }))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {preview && (
                <p className="border-t px-4 py-2 text-xs" style={{ borderColor: 'var(--exo-border)', color: previewClash ? '#fca5a5' : 'var(--exo-muted)' }}>
                    Preview: {preview.code} {preview.name}, {preview.faculty}
                </p>
            )}
        </div>
    );
};

export default StudentChoiceDemo;
