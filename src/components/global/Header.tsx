import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useCurrentScrollTheme } from '../provider/scroll-theme-provider'
import { gsap } from 'gsap'

const Header = () => {
    const theme = useCurrentScrollTheme()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [viewport, setViewport] = useState({ w: 0, h: 0 })
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const pathRef = useRef<SVGPathElement | null>(null)
    const openTlRef = useRef<gsap.core.Timeline | null>(null)
    const closeTlRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])

    useEffect(() => {
        const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    useEffect(() => {
        const original = document.body.style.overflow
        document.body.style.overflow = isOpen ? 'hidden' : original
        if (!isOpen) document.body.style.overflow = original
        return () => {
            document.body.style.overflow = original
        }
    }, [isOpen])

    type MenuItem = { label: string; key: string; href?: string }

    const handleMenuSelection = (item: MenuItem) => {
        closeMenu()
        if (item.href) {
            router.push(item.href)
            return
        }
        const el = document.querySelector(`[data-section="${item.key}"]`)
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 500)
        }
    }

    const buildPath = (frontY: number, curvature: number) => {
        const w = viewport.w || (typeof window !== 'undefined' ? window.innerWidth : 1920)
        const h = viewport.h || (typeof window !== 'undefined' ? window.innerHeight : 1080)
        const y = Math.max(-120, Math.min(frontY, h + 200))
        const c = curvature

        return `M0 0 H${w} V${y} Q ${w / 2} ${y + c} 0 ${y} Z`
    }

    const writePath = (y: number, c: number) => {
        if (!pathRef.current) return
        pathRef.current.setAttribute('d', buildPath(y, c))
    }

    const openMenu = () => {
        setIsOpen(true)
        // Allow next paint to ensure pathRef mounted
        requestAnimationFrame(() => {
            const h = viewport.h || (typeof window !== 'undefined' ? window.innerHeight : 1080)
            // drive the path with a single normalized progress to avoid stalls
            const state = { t: 0 }
            writePath(-120, 0)
            openTlRef.current?.kill()
            openTlRef.current = gsap.timeline()
                .set(contentRef.current, { opacity: 0, y: 10 })
                .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
                .to(state, {
                    t: 1,
                    duration: 0.95,
                    ease: 'power3.out',
                    onUpdate: () => {
                        const p = state.t
                        const y = -120 + (h + 120) * p
                        const c = 340 * Math.sin(Math.PI * p)
                        writePath(y, c)
                    },
                }, 0)
                .to(contentRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.25')
        })
    }

    const closeMenu = () => {
        const h = viewport.h || (typeof window !== 'undefined' ? window.innerHeight : 1080)
        if (!pathRef.current) {
            setIsOpen(false)
            return
        }
        const state = { t: 1 }
        closeTlRef.current?.kill()
        closeTlRef.current = gsap.timeline({ onComplete: () => setIsOpen(false) })
            .to(contentRef.current, { opacity: 0, y: 10, duration: 0.2, ease: 'power1.in' }, 0)
            .to(state, {
                t: 0,
                duration: 0.9,
                ease: 'power2.in',
                onUpdate: () => {
                    const p = state.t
                    const y = -120 + (h + 120) * p
                    const c = 340 * Math.sin(Math.PI * p)
                    writePath(y, c)
                },
            }, 0)
            .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, '-=0.15')
    }

    return (
        <div className='fixed w-full top-0 z-50'>
            <div className='flex justify-between items-center w-full md:px-12 px-4 py-6'>
                <div className='cursor-pointer z-[500]'>
                    <Image
                        src={theme === 'dark' ? '/logo/only logo white.png' : '/logo/only logo black.png'}
                        alt='Exovance logo'
                        width={48}
                        height={48}
                        priority
                    />
                </div>

                <button
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => (isOpen ? closeMenu() : openMenu())}
                    className='inline-flex items-center gap-2 px-3 py-2 rounded-full border border-customGrayDark/40 text-customGrayLight hover:border-customGrayDark/70 hover:text-white transition-colors'
                >
                    {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                </button>
            </div>

            {isOpen && (
                <div
                    ref={overlayRef}
                    className='fixed inset-0 z-[60] bg-black/70 backdrop-blur'
                    onClick={() => closeMenu()}
                >
                    <div
                        className='absolute inset-0'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Curved SVG panel background */}
                        <svg
                            className='absolute inset-0 w-full h-full pointer-events-none'
                            viewBox={`0 0 ${viewport.w || 1920} ${viewport.h || 1080}`}
                            preserveAspectRatio='none'
                        >
                            <path ref={pathRef} d={buildPath(-80, 100)} fill='rgba(10,10,10,0.96)' />
                        </svg>

                        <button
                            aria-label='Close menu'
                            onClick={() => closeMenu()}
                            className='absolute top-5 right-5 z-20 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-customGrayDark/40 text-customGrayLight hover:border-customGrayDark/70 hover:text-white transition-colors'
                        >
                            <X className='w-5 h-5' />
                            <span className='hidden md:inline'>Close</span>
                        </button>

                        <div
                            ref={contentRef}
                            className='h-full w-full flex flex-col items-center justify-center gap-6 px-6 relative z-[10]'
                        >

                            {([
                                { label: 'Home', key: 'hero', href: '/' },
                                { label: 'About', key: 'about', href: '/about' },
                                { label: 'Products', key: 'product', href: '/product/aiva' },
                                { label: 'Services', key: 'service', href: '/service' },
                                { label: 'Team', key: 'team', href: '/team' },
                                { label: 'Contact', key: 'contact', href: '/contact' },
                            ] as MenuItem[]).map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleMenuSelection(item)}
                                    className='text-3xl md:text-5xl tracking-wider text-white/90 hover:text-white transition-colors'
                                >
                                    {item.label}
                                </button>
                            ))}

                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Header