"use client"

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

// ─── Grid config ────────────────────────────────────────────
const COLS = 12
const ROWS = 8
const TOTAL = COLS * ROWS

const COLORS = [
    '#0d0221',
    '#1a0533',
    '#2d1b69',
    '#4c1d95',
    '#7c3aed',
    '#1e1b4b',
    '#06b6d4',
    '#0e0e1a',
]

// ─── Module-level singleton ─────────────────────────────────
// Any component can call `navigateTo(href)` without needing a provider.
type NavFn = (href: string) => void
let _navigateTo: NavFn | null = null

export const navigateTo: NavFn = (href) => {
    if (_navigateTo) {
        _navigateTo(href)
    } else {
        window.location.href = href
    }
}

// ─── Component ──────────────────────────────────────────────
export default function PageTransition() {
    const pathname = usePathname()
    const router = useRouter()
    const gridRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const awaitingReveal = useRef(false)

    const getBlocks = () =>
        gridRef.current
            ? Array.from(gridRef.current.querySelectorAll<HTMLElement>('.ptx-block'))
            : []

    const randomiseColors = (blocks: HTMLElement[]) => {
        blocks.forEach(b => {
            b.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        })
    }

    const cover = (blocks: HTMLElement[]): Promise<void> =>
        new Promise(resolve => {
            randomiseColors(blocks)
            tlRef.current?.kill()
            tlRef.current = gsap.timeline({ onComplete: resolve })
            tlRef.current.set(blocks, { scaleY: 0, transformOrigin: 'top center' })
            tlRef.current.to(blocks, {
                scaleY: 1,
                duration: 0.22,
                ease: 'power4.inOut',
                stagger: { each: 0.006, from: 'random' },
            })
        })

    const reveal = (blocks: HTMLElement[]) => {
        randomiseColors(blocks)
        tlRef.current?.kill()
        tlRef.current = gsap.timeline()
        tlRef.current.to(blocks, {
            scaleY: 0,
            transformOrigin: 'bottom center',
            duration: 0.22,
            ease: 'power4.inOut',
            stagger: { each: 0.006, from: 'random' },
        })
    }

    // Register the singleton navigate function
    useEffect(() => {
        _navigateTo = async (href: string) => {
            if (href === window.location.pathname) return
            const blocks = getBlocks()
            if (!blocks.length) { router.push(href); return }

            // Phase 1 — cover screen
            await cover(blocks)

            // Phase 2 — push route while screen is covered
            awaitingReveal.current = true
            router.push(href)
        }
        return () => { _navigateTo = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    // Phase 3 — reveal on new page mount
    useEffect(() => {
        if (!awaitingReveal.current) return
        awaitingReveal.current = false
        const blocks = getBlocks()
        if (blocks.length) reveal(blocks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <div
            ref={gridRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-[9990]"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
        >
            {Array.from({ length: TOTAL }, (_, i) => (
                <div
                    key={i}
                    className="ptx-block"
                    style={{
                        backgroundColor: COLORS[i % COLORS.length],
                        transform: 'scaleY(0)',
                        transformOrigin: 'top center',
                        outline: '0.5px solid rgba(124,58,237,0.07)',
                    }}
                />
            ))}
        </div>
    )
}
