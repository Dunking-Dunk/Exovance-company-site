//@ts-nocheck

import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import { useScroll } from 'motion/react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SimulationMaterial from './shaders/particles/simulationMaterial';
import vertexShader from "!!raw-loader!./shaders/particles/vertexShader.glsl";
import fragmentShader from "!!raw-loader!./shaders/particles/fragmentShader.glsl";
import { getVariableColor } from "@/lib/utils";
import { useScrollTheme } from "@/components/provider/scroll-theme-provider";
import { useMotionValueEvent, useTransform } from "framer-motion";
import { damp } from "three/src/math/MathUtils.js";

extend({ SimulationMaterial: SimulationMaterial });


// Increase simulation size to 128 for a much denser, "Active Theory" style effect (16,384 particles)
const SIZE = 128;
const POSITIONS = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
const UVS = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

export const Particles = ({ onReady = null }: { onReady?: () => void }) => {
    const points = useRef();
    const simulationMaterialRef = useRef();
    const [isReady, setIsReady] = useState(false);
    const mousePosition = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
    });

    const prevMouse = useRef(new THREE.Vector3());
    const mouseActive = useRef(0);
    const lastMouseMove = useRef(0);
    const canvasRef = useRef(null);
    const currentColor = useRef(new THREE.Vector3(1.0, 1.0, 1.0));
    // uColor is no longer used for theme switching — kept in uniforms for API compat


    const particleOffset = useRef(0);
    const isParticleStopped = useRef(false);
    const stopScrollPosition = useRef(0);
    const scrollPositions = useRef({ heroEnd: 0.35, aboutEnd: 0.43, visionStart: 0.50, visionEnd: 0.65, abstractEnd: 0.85 });

    // Memoize scroll transform
    const { scrollYProgress } = useScroll();
    const distance = useTransform(scrollYProgress, [0, 1], [1, 10]);

    // Memoize scene and camera
    const scene = useMemo(() => new THREE.Scene(), []);
    const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1), []);

    // Memoize FBO setup
    const renderTarget = useFBO(SIZE, SIZE, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        type: THREE.FloatType,
    });

    // Memoize particles position
    const particlesPosition = useMemo(() => {
        const length = SIZE * SIZE;
        const particles = new Float32Array(length * 3);
        for (let i = 0; i < length; i++) {
            let i3 = i * 3;
            particles[i3 + 0] = (i % SIZE) / SIZE;
            particles[i3 + 1] = i / SIZE / SIZE;
            particles[i3 + 2] = 0;
        }
        return particles;
    }, []);

    const uniforms = useMemo(() => ({
        uPositions: { value: null },
        uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
        uTime: { value: 0 },
        uTransitionProgress: { value: 0 },
        uRadiusScale: { value: 5.0 },  // wider initial scatter so particles fill more of the screen
        uCurrentPosition: { value: 0 },
        uParticleOffset: { value: 0 },
        uFade: { value: 1 },
        uMouse: { value: new THREE.Vector3(-9, -9, 0) },
        uMouseActive: { value: 0 },
    }), []);

    const mouse = useRef(new THREE.Vector3());
    // Frame skipping to reduce costly FBO renders. Render every N frames.
    const renderSkip = useRef(1); // set to 1 to render every frame by default
    const frameCounter = useRef(0);

    const updateMousePosition = useCallback((e: MouseEvent) => {

        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;


        const prevX = mousePosition.current.targetX;
        const prevY = mousePosition.current.targetY;
        const moveDist = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));

        if (moveDist > 0.02) {
            mouseActive.current = Date.now() / 1000;
            lastMouseMove.current = Date.now() / 1000;
        }


        mousePosition.current.targetX += (x - mousePosition.current.targetX) * 0.05;
        mousePosition.current.targetY += (y - mousePosition.current.targetY) * 0.05;
    }, []);


    useEffect(() => {

        const calculateScrollPositions = () => {
            const heroSection = document.querySelector('[data-section="hero"]');
            const aboutSection = document.querySelector('[data-section="about"]');
            const visionSection = document.querySelector('[data-section="vision"]');
            const teamSection = document.querySelector('[data-section="team"]');

            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;


            let positions = { heroEnd: 0.35, aboutEnd: 0.43, visionStart: 0.50, visionEnd: 0.65, abstractEnd: 0.85 };

            if (totalScrollHeight > 0) {
                // Calculate positions relative to total scroll height
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    positions.heroEnd = heroBottom / totalScrollHeight
                    positions.heroEnd += 0.05;
                }

                if (aboutSection) {
                    const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;
                    positions.aboutEnd = aboutBottom / totalScrollHeight
                }

                if (visionSection) {
                    positions.visionStart = Math.max(positions.aboutEnd + 0.03, visionSection.offsetTop / totalScrollHeight);
                    const visionBottom = visionSection.offsetTop + visionSection.offsetHeight;
                    positions.visionEnd = (visionBottom - window.innerHeight) / totalScrollHeight;
                    // Abstract section starts after vision, ends ~25% of remaining scroll later
                    positions.abstractEnd = Math.min(0.97, positions.visionEnd + 0.20);
                }


                positions.aboutEnd = Math.max(positions.heroEnd + 0.05, positions.aboutEnd);
                positions.visionStart = Math.max(positions.aboutEnd, positions.visionStart);
                positions.visionEnd = Math.max(positions.visionStart, positions.visionEnd);
                positions.abstractEnd = Math.max(positions.visionEnd + 0.05, positions.abstractEnd);
            }

            scrollPositions.current = positions;
            return positions;
        };

        const updatePositionState = (progress: number) => {
            if (!simulationMaterialRef.current) return;

            const { heroEnd, aboutEnd, visionStart, visionEnd, abstractEnd } = scrollPositions.current;

            let currentPosition = 'A';
            let transitionProgress = 0;
            let radiusScale = 1;

            if (progress <= abstractEnd) {
                isParticleStopped.current = false;
                uniforms.uFade.value = 1;

                if (progress < visionStart) {
                    // A→B: particles slowly coalesce into the brain shape across the
                    // entire hero + about sections. The brain is NOT fully formed until
                    // the vision section starts (visionStart), so IMAGINE text is already
                    // appearing as the last particles lock into place.
                    const abProgress = progress / Math.max(0.001, visionStart);
                    currentPosition = 'A-B';
                    transitionProgress = Math.min(1, abProgress);
                    radiusScale = 5.0 - transitionProgress * 2.8;
                } else if (progress < visionEnd) {
                    const visionProgress = (progress - visionStart) / (visionEnd - visionStart);
                    // 0.00 – 0.28: brain holds (IMAGINE pinned in view)
                    // 0.28 – 0.50: brain → face transition (B-C morph)
                    // 0.50 – 0.78: face holds (INVENT pinned in view)
                    // 0.78 – 1.00: face disperses upward (C-D)
                    if (visionProgress < 0.28) {
                        // Brain fully formed, holding while IMAGINE is visible
                        currentPosition = 'B';
                        transitionProgress = 1;
                        radiusScale = 2.2;
                    } else if (visionProgress < 0.50) {
                        currentPosition = 'B-C';
                        transitionProgress = Math.min(1, (visionProgress - 0.28) / 0.22);
                        radiusScale = 2.2;
                    } else if (visionProgress < 0.78) {
                        // Face fully formed, holding
                        currentPosition = 'C';
                        transitionProgress = 1;
                        radiusScale = 2.2;
                    } else {
                        currentPosition = 'C-D';
                        const lastChunk = (visionProgress - 0.78) / 0.22;
                        transitionProgress = Math.min(1, lastChunk);
                        radiusScale = 2.2 - lastChunk * 0.8;
                    }
                } else {
                    // Abstract section — particles flow into logo then hold fully visible.
                    // NO FADE OUT: particles remain at full opacity for the entire abstract
                    // section, "stuck" in the logo shape as the user scrolls through.
                    //   0.00–0.55 : D → Logo  (particles converge into logo)
                    //   0.55–1.00 : Logo hold  (fully formed, stays put)
                    const abstractProgress = (progress - visionEnd) / Math.max(0.001, abstractEnd - visionEnd);
                    if (abstractProgress < 0.55) {
                        currentPosition = 'D-Logo';
                        transitionProgress = Math.min(1, abstractProgress / 0.55);
                        radiusScale = 2.0 - transitionProgress * 0.2;
                    } else {
                        currentPosition = 'Logo';
                        transitionProgress = 1;
                        radiusScale = 1.8;
                    }
                    // Particles stay fully visible (uFade = 1) throughout abstract section —
                    // they are "stuck" here rather than fading/drifting away.
                    uniforms.uFade.value = 1;
                }
            } else {
                // Past abstractEnd — particles snap off instantly
                isParticleStopped.current = true;
                currentPosition = 'Logo';
                transitionProgress = 1;
                radiusScale = 1.8;
                uniforms.uFade.value = 0;
            }

            simulationMaterialRef.current.uniforms.uTransitionProgress.value = transitionProgress;
            simulationMaterialRef.current.uniforms.uRadiusScale.value = radiusScale;
            simulationMaterialRef.current.uniforms.uCurrentPosition.value =
                currentPosition === 'A'        ? 0  :
                currentPosition === 'A-B'      ? 1  :
                currentPosition === 'B'        ? 1  :
                currentPosition === 'B-C'      ? 2  :
                currentPosition === 'C'        ? 2  :
                currentPosition === 'C-D'      ? 3  :
                currentPosition === 'D'        ? 3  :
                currentPosition === 'D-Logo'   ? 10 :
                currentPosition === 'Logo'     ? 11 : 0;

            // CRITICAL: also sync the points (vertex) shader uniforms —
            // without this the vertex shader is always stuck at initial values
            // and every shape looks like a sphere/circle.
            uniforms.uTransitionProgress.value = transitionProgress;
            uniforms.uRadiusScale.value = radiusScale;
            uniforms.uCurrentPosition.value = simulationMaterialRef.current.uniforms.uCurrentPosition.value;
        };

        // Fire measurements at multiple delays so dynamic imports (Vision, Product, etc.) are included
        const initTimer  = setTimeout(calculateScrollPositions, 300);
        const initTimer2 = setTimeout(() => { calculateScrollPositions(); ScrollTrigger.refresh(); }, 1500);
        const initTimer3 = setTimeout(() => { calculateScrollPositions(); ScrollTrigger.refresh(); }, 3000);

        const particlesScrollTrigger = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            // scrub: 1.0 — medium lag (~1 s) for smooth, cinematic transitions;
            // A→B spans hero+about so it naturally feels very slow even at this scrub.
            scrub: 1.0,
            onUpdate: (self) => updatePositionState(self.progress),
            id: 'particles-animation',
            refreshPriority: -1,
        });

        const resizeObserver = new ResizeObserver(() => {
            calculateScrollPositions();
            ScrollTrigger.refresh();
        });


        resizeObserver.observe(document.body);


        const handleResize = () => {
            calculateScrollPositions();
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            particlesScrollTrigger.kill();
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
            clearTimeout(initTimer);
            clearTimeout(initTimer2);
            clearTimeout(initTimer3);
        };
    }, []);


    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [updateMousePosition]);


    useFrame((state) => {
        const { gl, clock } = state;
        const elapsedTime = clock.getElapsedTime();

        prevMouse.current.set(mouse.current.x, mouse.current.y, 0);

        mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.04;
        mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.04;

        mouse.current.set(
            mousePosition.current.x,
            mousePosition.current.y,
            0
        );

        if (!simulationMaterialRef.current) return;

        // Check if particles are ready and notify parent
        if (!isReady && simulationMaterialRef.current && points.current) {
            setIsReady(true);
            // Ensure parent is notified reliably when the particle simulation is initialized.
            if (typeof onReady === 'function') {
                // Small delay to ensure render targets / materials are fully created,
                // but still call the callback in a safe try/catch wrapper.
                setTimeout(() => {
                    try {
                        onReady();
                        console.log('Particles: onReady() called');
                    } catch (err) {
                        console.error('Particles: onReady callback threw', err);
                    }
                }, 100);
            }
        }


        const dt = 10;
        const dampedScroll = damp(
            simulationMaterialRef.current.uniforms.uScroll.value,
            distance.get(),
            0.005,
            dt
        );
        simulationMaterialRef.current.uniforms.uScroll.value = dampedScroll;

        // Update uniforms with scaled mouse position and activity
        simulationMaterialRef.current.uniforms.uMouse.value = mouse.current;
        simulationMaterialRef.current.uniforms.uPrevMouse.value = prevMouse.current;
        simulationMaterialRef.current.uniforms.uMouseActive.value = mouseActive.current;
        simulationMaterialRef.current.uniforms.uTime.value = elapsedTime;

        // Render FBO with simple frame skipping to reduce GPU load
        frameCounter.current++;
        if (frameCounter.current >= renderSkip.current) {
            frameCounter.current = 0;
            gl.setRenderTarget(renderTarget);
            gl.clear();
            gl.render(scene, camera);
            gl.setRenderTarget(null);
        }


        // Theme switching removed — single dark palette, always AdditiveBlending
        points.current.material.uniforms.uPositions.value = renderTarget.texture;
        points.current.material.uniforms.uColor.value = currentColor.current;
        points.current.material.uniforms.uTime.value = elapsedTime;
        points.current.material.uniforms.uParticleOffset.value = particleOffset.current;
        points.current.material.uniforms.uMouse.value = mouse.current;
        points.current.material.uniforms.uMouseActive.value = mouseActive.current;
    });

    try {
        return (
            <>
                {createPortal(
                    <mesh>
                        <simulationMaterial ref={simulationMaterialRef} args={[SIZE]} />
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={POSITIONS.length / 3}
                                array={POSITIONS}
                                itemSize={3}
                            />
                            <bufferAttribute
                                attach="attributes-uv"
                                count={UVS.length / 2}
                                array={UVS}
                                itemSize={2}
                            />
                        </bufferGeometry>
                    </mesh>,
                    scene
                )}
                <points ref={points} renderOrder={1}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particlesPosition.length / 3}
                            array={particlesPosition}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <shaderMaterial
                        depthWrite={false}
                        transparent={true}
                        blending={THREE.AdditiveBlending}
                        depthTest={false}
                        toneMapped={false}
                        fragmentShader={fragmentShader}
                        vertexShader={vertexShader}
                        uniforms={uniforms}
                    />
                </points>
            </>
        );
    } catch (error) {
        console.error('Particles rendering error:', error);
        return null;
    }
};