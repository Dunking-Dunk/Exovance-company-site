"use client"

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

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
// A soft dark veil with a faint violet glow, the Exovance mark and a thin line that fills.
export default function PageTransition() {
    const pathname = usePathname()
    const router = useRouter()
    const veilRef = useRef<HTMLDivElement>(null)
    const markRef = useRef<HTMLImageElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const awaitingReveal = useRef(false)
    const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)

    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cover = (): Promise<void> =>
        new Promise(resolve => {
            const veil = veilRef.current
            if (!veil) { resolve(); return }
            tlRef.current?.kill()
            veil.style.pointerEvents = 'auto'
            const fast = reduced()
            tlRef.current = gsap.timeline({ onComplete: resolve })
            tlRef.current
                .set(lineRef.current, { scaleX: 0 })
                .set(markRef.current, { y: 10, opacity: 0 })
                .to(veil, { opacity: 1, duration: fast ? 0.15 : 0.45, ease: 'power2.inOut' })
            if (!fast) {
                tlRef.current
                    .to(markRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.15)
                    .to(lineRef.current, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, 0.2)
            }
        })

    const reveal = () => {
        const veil = veilRef.current
        if (!veil) return
        if (failsafe.current) clearTimeout(failsafe.current)
        tlRef.current?.kill()
        const fast = reduced()
        tlRef.current = gsap.timeline({ onComplete: () => { veil.style.pointerEvents = 'none' } })
        tlRef.current
            .to(markRef.current, { y: -8, opacity: 0, duration: fast ? 0.1 : 0.3, ease: 'power2.in' })
            .to(veil, { opacity: 0, duration: fast ? 0.15 : 0.6, ease: 'power2.out' }, fast ? 0 : 0.15)
    }

    // Register the singleton navigate function
    useEffect(() => {
        _navigateTo = async (href: string) => {
            if (href === window.location.pathname) return
            if (!veilRef.current) { router.push(href); return }

            // Phase 1: fade the veil in
            await cover()

            // Phase 2: push the route while the screen is covered
            awaitingReveal.current = true
            router.push(href)
            // Never leave the visitor stuck behind the veil if the route does not change
            failsafe.current = setTimeout(() => { awaitingReveal.current = false; reveal() }, 4000)
        }
        return () => { _navigateTo = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    // Phase 3: fade out once the new page has mounted
    useEffect(() => {
        if (!awaitingReveal.current) return
        awaitingReveal.current = false
        reveal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <div
            ref={veilRef}
            aria-hidden="true"
            className="fixed inset-0 z-[9990] pointer-events-none flex flex-col items-center justify-center"
            style={{
                opacity: 0,
                background:
                    'radial-gradient(ellipse at 50% 40%, rgba(76,29,149,0.35) 0%, rgba(6,6,12,0.97) 60%), #06060c',
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={markRef} src="/logo/only logo white.png" alt="" className="h-10 w-auto opacity-0" />
            <div className="mt-6 h-px w-40 overflow-hidden rounded-full bg-violet-400/15">
                <div ref={lineRef} className="h-full w-full origin-left bg-violet-300/80" style={{ transform: 'scaleX(0)' }} />
            </div>
        </div>
    )
}
