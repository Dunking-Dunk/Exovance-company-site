"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Each "scene" describes where the four orbs sit + their opacities.
// Orbs: [A] top-edge  [B] right-edge  [C] bottom-left  [D] far-right accent
// Values are CSS strings — we tween them via GSAP inline-style props.
interface Scene {
    // orb A — large bloom that anchors to the top
    aX: string; aY: string; aOpacity: number; aColor: string
    // orb B — right-edge accent (Active Theory's signature right glow)
    bX: string; bY: string; bOpacity: number; bColor: string
    // orb C — bottom / left atmosphere
    cX: string; cY: string; cOpacity: number; cColor: string
    // orb D — floating mid accent
    dX: string; dY: string; dOpacity: number; dColor: string
}

// Purple-first palette — matches the particle system palette
const SCENES: Record<string, Scene> = {
    // ── Hero ─────────────────────────────────────────────────────────────
    hero: {
        aX: '50%',  aY: '-18%', aOpacity: 0.55, aColor: 'radial-gradient(ellipse at center, #6d28d9 0%, #4c1d95 30%, transparent 70%)',
        bX: '105%', bY: '30%',  bOpacity: 0.40, bColor: 'radial-gradient(ellipse at center, #7c3aed 0%, #5b21b6 35%, transparent 72%)',
        cX: '-20%', cY: '80%',  cOpacity: 0.18, cColor: 'radial-gradient(ellipse at center, #4c1d95 0%, transparent 65%)',
        dX: '80%',  dY: '70%',  dOpacity: 0.12, dColor: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 60%)',
    },
    // ── About ────────────────────────────────────────────────────────────
    about: {
        aX: '-10%', aY: '10%',  aOpacity: 0.30, aColor: 'radial-gradient(ellipse at center, #5b21b6 0%, #3b0764 40%, transparent 70%)',
        bX: '110%', bY: '50%',  bOpacity: 0.50, bColor: 'radial-gradient(ellipse at center, #7c3aed 0%, #4c1d95 30%, transparent 68%)',
        cX: '20%',  cY: '90%',  cOpacity: 0.25, cColor: 'radial-gradient(ellipse at center, #6d28d9 0%, transparent 65%)',
        dX: '60%',  dY: '20%',  dOpacity: 0.10, dColor: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 55%)',
    },
    // ── Vision ───────────────────────────────────────────────────────────
    vision: {
        aX: '50%',  aY: '-10%', aOpacity: 0.45, aColor: 'radial-gradient(ellipse at center, #7c3aed 0%, #4c1d95 35%, transparent 70%)',
        bX: '108%', bY: '20%',  bOpacity: 0.65, bColor: 'radial-gradient(ellipse at center, #8b5cf6 0%, #5b21b6 28%, transparent 65%)',
        cX: '-15%', cY: '60%',  cOpacity: 0.20, cColor: 'radial-gradient(ellipse at center, #3b0764 0%, transparent 60%)',
        dX: '75%',  dY: '85%',  dOpacity: 0.15, dColor: 'radial-gradient(ellipse at center, #6d28d9 0%, transparent 55%)',
    },
    // ── Product ──────────────────────────────────────────────────────────
    product: {
        aX: '15%',  aY: '-5%',  aOpacity: 0.30, aColor: 'radial-gradient(ellipse at center, #4c1d95 0%, transparent 65%)',
        bX: '112%', bY: '40%',  bOpacity: 0.55, bColor: 'radial-gradient(ellipse at center, #7c3aed 0%, #3b0764 32%, transparent 68%)',
        cX: '-5%',  cY: '75%',  cOpacity: 0.35, cColor: 'radial-gradient(ellipse at center, #5b21b6 0%, #2e1065 38%, transparent 70%)',
        dX: '85%',  dY: '15%',  dOpacity: 0.20, dColor: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 52%)',
    },
    // ── Abstract ─────────────────────────────────────────────────────────
    abstract: {
        aX: '50%',  aY: '50%',  aOpacity: 0.20, aColor: 'radial-gradient(ellipse at center, #5b21b6 0%, transparent 62%)',
        bX: '105%', bY: '60%',  bOpacity: 0.35, bColor: 'radial-gradient(ellipse at center, #7c3aed 0%, transparent 58%)',
        cX: '-10%', cY: '30%',  cOpacity: 0.28, cColor: 'radial-gradient(ellipse at center, #4c1d95 0%, transparent 60%)',
        dX: '70%',  dY: '-5%',  dOpacity: 0.22, dColor: 'radial-gradient(ellipse at center, #6d28d9 0%, transparent 55%)',
    },
    // ── Contact ──────────────────────────────────────────────────────────
    contact: {
        aX: '50%',  aY: '110%', aOpacity: 0.45, aColor: 'radial-gradient(ellipse at center, #6d28d9 0%, #3b0764 35%, transparent 70%)',
        bX: '108%', bY: '70%',  bOpacity: 0.45, bColor: 'radial-gradient(ellipse at center, #8b5cf6 0%, #5b21b6 30%, transparent 65%)',
        cX: '-15%', cY: '85%',  cOpacity: 0.30, cColor: 'radial-gradient(ellipse at center, #4c1d95 0%, transparent 60%)',
        dX: '25%',  dY: '40%',  dOpacity: 0.15, dColor: 'radial-gradient(ellipse at center, #7c3aed 0%, transparent 55%)',
    },
}

const ORB_SIZE = 'min(120vw, 120vh)'

export default function AmbientLighting() {
    const orbA = useRef<HTMLDivElement>(null)
    const orbB = useRef<HTMLDivElement>(null)
    const orbC = useRef<HTMLDivElement>(null)
    const orbD = useRef<HTMLDivElement>(null)

    const applyScene = (scene: Scene, duration = 1.8) => {
        const ease = 'power2.inOut'
        const common = { duration, ease, overwrite: true }

        gsap.to(orbA.current, { ...common, opacity: scene.aOpacity, left: scene.aX, top: scene.aY })
        gsap.to(orbB.current, { ...common, opacity: scene.bOpacity, left: scene.bX, top: scene.bY })
        gsap.to(orbC.current, { ...common, opacity: scene.cOpacity, left: scene.cX, top: scene.cY })
        gsap.to(orbD.current, { ...common, opacity: scene.dOpacity, left: scene.dX, top: scene.dY })

        // background can't be tweened by GSAP — swap instantly on scene change
        if (orbA.current) orbA.current.style.background = scene.aColor
        if (orbB.current) orbB.current.style.background = scene.bColor
        if (orbC.current) orbC.current.style.background = scene.cColor
        if (orbD.current) orbD.current.style.background = scene.dColor
    }

    useEffect(() => {
        // Set initial scene immediately
        applyScene(SCENES.hero, 0)

        const SECTION_SCENES: Array<{ selector: string; scene: Scene }> = [
            { selector: '[data-section="hero"]',    scene: SCENES.hero },
            { selector: '[data-section="about"]',   scene: SCENES.about },
            { selector: '[data-section="vision"]',  scene: SCENES.vision },
            { selector: '[data-section="product"]', scene: SCENES.product },
            { selector: '[data-section="abstract"]',scene: SCENES.abstract },
            { selector: '[data-section="contact"]', scene: SCENES.contact },
        ]

        const triggers: ScrollTrigger[] = []

        SECTION_SCENES.forEach(({ selector, scene }) => {
            const el = document.querySelector(selector)
            if (!el) return

            const st = ScrollTrigger.create({
                trigger: el,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter:     () => applyScene(scene),
                onEnterBack: () => applyScene(scene),
            })
            triggers.push(st)
        })

        return () => triggers.forEach(t => t.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const orbStyle: React.CSSProperties = {
        position: 'fixed',
        width: ORB_SIZE,
        height: ORB_SIZE,
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity, left, top',
        // mix-blend-mode screen keeps orbs additive on the dark background
        mixBlendMode: 'screen',
        filter: 'blur(80px)',
    }

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        >
            <div ref={orbA} style={{ ...orbStyle, left: '50%', top: '-18%', opacity: 0.55, background: SCENES.hero.aColor }} />
            <div ref={orbB} style={{ ...orbStyle, left: '105%', top: '30%', opacity: 0.40, background: SCENES.hero.bColor }} />
            <div ref={orbC} style={{ ...orbStyle, left: '-20%', top: '80%', opacity: 0.18, background: SCENES.hero.cColor }} />
            <div ref={orbD} style={{ ...orbStyle, left: '80%',  top: '70%', opacity: 0.12, background: SCENES.hero.dColor }} />
        </div>
    )
}
