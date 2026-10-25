"use client";

import React from 'react';
import { DAYS, colorOf, mins } from './data';

export type GridItem = { id: string; code: string; label: string; sub: string; day: number; start: string; end: string };

const FIRST_HOUR = 8;
const HOURS = 9;
const ROW_H = 38;

/** Weekly grid in the admin console's style. Items are placed by time. */
const WeekGrid = ({ items, selectedId, onSelect }: { items: GridItem[]; selectedId?: string | null; onSelect?: (id: string) => void }) => (
    <div className="overflow-x-auto p-3">
        <div className="min-w-[460px]">
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
                        {items.filter((x) => x.day === d).map((x) => {
                            const color = colorOf(x.code);
                            const on = selectedId === x.id;
                            return (
                                <button
                                    key={x.id}
                                    type="button"
                                    onClick={() => onSelect?.(x.id)}
                                    disabled={!onSelect}
                                    aria-pressed={onSelect ? on : undefined}
                                    aria-label={`${x.label}, ${DAYS[x.day]} ${x.start}, ${x.sub}`}
                                    className="absolute left-0.5 right-0.5 overflow-hidden rounded px-1.5 py-0.5 text-left text-[10px] leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default"
                                    style={{ top: ((mins(x.start) - FIRST_HOUR * 60) / 60) * ROW_H + 1, height: ((mins(x.end) - mins(x.start)) / 60) * ROW_H - 2, background: `${color}${on ? '55' : '33'}`, borderLeft: `3px solid ${color}`, color: 'var(--exo-fg)', outline: on ? `1px solid ${color}` : 'none' }}
                                >
                                    <div className="truncate font-semibold">{x.label}</div>
                                    <div className="truncate" style={{ color: 'var(--exo-muted)' }}>{x.start}</div>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default WeekGrid;
