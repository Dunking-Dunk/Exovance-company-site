"use client";

import React from 'react';
import { useLenis } from 'lenis/react';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

/** In-page anchor that scrolls through Lenis (the site's smooth scroller) and moves focus to the target. */
const ScrollLink = ({ to, onClick, children, ...rest }: Props) => {
    const lenis = useLenis();

    const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        const target = document.getElementById(to);
        if (!target || e.defaultPrevented) return;
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (lenis) lenis.scrollTo(target, { offset: -24, immediate: reduce });
        else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        history.replaceState(null, '', `#${to}`);
        target.focus({ preventScroll: true });
    };

    return <a href={`#${to}`} onClick={handle} {...rest}>{children}</a>;
};

export default ScrollLink;
