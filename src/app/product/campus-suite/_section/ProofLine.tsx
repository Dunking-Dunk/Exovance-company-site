"use client";

import { useEffect, useRef } from 'react';

const TEXT = 'Live at Rajalakshmi Engineering College, 10,000+ students';
const COPIES = 4;

/** Slow marquee that speeds up and follows the direction of the page scroll. */
const ProofLine = () => {
    const track = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = track.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let x = 0, dir = -1, boost = 0, last = window.scrollY, raf = 0;
        const onScroll = () => {
            const d = window.scrollY - last;
            last = window.scrollY;
            if (d !== 0) { dir = d > 0 ? -1 : 1; boost = Math.min(Math.abs(d), 60); }
        };
        const tick = () => {
            boost *= 0.92;
            x += dir * (0.5 + boost * 0.35);
            const w = el.scrollWidth / 2;
            if (x <= -w) x += w;
            if (x > 0) x -= w;
            el.style.transform = `translate3d(${x}px,0,0)`;
            raf = requestAnimationFrame(tick);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        raf = requestAnimationFrame(tick);
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);

    const items = Array.from({ length: COPIES * 2 }, (_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
            {TEXT}
            <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
        </span>
    ));

    return (
        <div className="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-28 overflow-hidden border-y border-customGrayDark/30 py-5">
            <p className="sr-only">{TEXT}</p>
            <div aria-hidden="true" ref={track} className="flex w-max whitespace-nowrap text-base md:text-lg text-customGrayLight will-change-transform">
                {items}
            </div>
        </div>
    );
};

export default ProofLine;
