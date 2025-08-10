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


const SIZE = 100;
const POSITIONS = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
const UVS = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

export const Particles = () => {
    const { theme } = useScrollTheme();
    const points = useRef();
    const simulationMaterialRef = useRef();
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
    const currentColor = useRef(new THREE.Vector3(1.0, 1.0, 1.0)); // Start with white
    const targetColor = useRef(new THREE.Vector3(1.0, 1.0, 1.0));


    const particleOffset = useRef(0);
    const isParticleStopped = useRef(false);
    const stopScrollPosition = useRef(0);
    const scrollPositions = useRef({ heroEnd: 0.35, aboutEnd: 0.43, visionStart: 0.50, visionEnd: 0.65 });

    useEffect(() => {
        if (theme === 'dark') {
            targetColor.current.set(1.0, 1.0, 1.0);
        } else {
            targetColor.current.set(0.0, 0.0, 0.0);
        }
    }, [theme]);

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

    // Memoize uniforms
    const uniforms = useMemo(() => ({
        uPositions: { value: null },
        uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
        uTransitionProgress: { value: 0 },
        uRadiusScale: { value: 1 },
        uCurrentPosition: { value: 0 },
        uParticleOffset: { value: 0 }
    }), []);

    const mouse = useRef(new THREE.Vector3());

    // Fixed mouse position update handler with activity tracking
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


        mousePosition.current.targetX += (x - mousePosition.current.targetX) * 0.2;
        mousePosition.current.targetY += (y - mousePosition.current.targetY) * 0.2;
    }, []);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);


        const calculateScrollPositions = () => {
            const heroSection = document.querySelector('[data-section="hero"]');
            const aboutSection = document.querySelector('[data-section="about"]');
            const visionSection = document.querySelector('[data-section="vision"]');
            const teamSection = document.querySelector('[data-section="team"]');

            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;


            let positions = { heroEnd: 0.35, aboutEnd: 0.43, visionStart: 0.50, visionEnd: 0.65 };

            if (totalScrollHeight > 0) {
                // Calculate positions relative to total scroll height
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    positions.heroEnd = heroBottom / totalScrollHeight
                    positions.heroEnd += 0.12;
                }

                if (aboutSection) {
                    const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;
                    positions.aboutEnd = aboutBottom / totalScrollHeight
                }

                if (visionSection) {
                    positions.visionStart = Math.max(positions.aboutEnd + 0.03, visionSection.offsetTop / totalScrollHeight);
                    const visionBottom = visionSection.offsetTop + visionSection.offsetHeight;

                    positions.visionEnd = (visionBottom - window.innerHeight) / totalScrollHeight
                }


                positions.aboutEnd = Math.max(positions.heroEnd + 0.05, positions.aboutEnd);
                positions.visionStart = Math.max(positions.aboutEnd + 0.03, positions.visionStart);
                positions.visionEnd = Math.max(positions.visionStart + 0.1, positions.visionEnd);
            }

            scrollPositions.current = positions;
            return positions;
        };

        const updatePositionState = (progress: number) => {
            if (!simulationMaterialRef.current) return;

            const { heroEnd, aboutEnd, visionStart, visionEnd } = scrollPositions.current;

            let currentPosition = 'A';
            let transitionProgress = 0;
            let radiusScale = 1;

            if (progress <= visionEnd) {
                isParticleStopped.current = false;

                if (progress < heroEnd) {
                    currentPosition = 'A';
                    transitionProgress = 0;
                    radiusScale = 1 + (progress * 12);
                } else if (progress < aboutEnd) {
                    currentPosition = 'A-B';
                    const sectionProgress = (progress - heroEnd) / (aboutEnd - heroEnd);
                    transitionProgress = Math.min(1, sectionProgress * 3);
                    radiusScale = 5;
                } else if (progress < visionStart) {
                    currentPosition = 'B';
                    transitionProgress = 1;
                    radiusScale = 2.5;
                } else if (progress < visionEnd) {
                    const visionProgress = (progress - visionStart) / (visionEnd - visionStart);
                    if (visionProgress < 0.5) {
                        currentPosition = 'B-C';
                        transitionProgress = Math.min(1, visionProgress * 6); // Faster transition
                        radiusScale = 2.5;
                    } else {
                        currentPosition = 'C-D';
                        const secondHalf = (visionProgress - 0.5) / 0.5;
                        transitionProgress = Math.min(1, secondHalf * 3);
                        radiusScale = 2 - (secondHalf * 0.5); // Gradually reduce from 2 to 1.5
                    }
                }
            } else {
                if (!isParticleStopped.current) {
                    isParticleStopped.current = true;
                    stopScrollPosition.current = progress;
                }

                currentPosition = 'D';
                transitionProgress = 1;
                radiusScale = 1.5;

                const scrollAfterStop = progress - stopScrollPosition.current;
                particleOffset.current = scrollAfterStop * 40;
            }

            simulationMaterialRef.current.uniforms.uTransitionProgress.value = transitionProgress;
            simulationMaterialRef.current.uniforms.uRadiusScale.value = radiusScale;
            simulationMaterialRef.current.uniforms.uCurrentPosition.value =
                currentPosition === 'A' ? 0 :
                    currentPosition === 'A-B' ? 1 :
                        currentPosition === 'B' ? 1 :
                            currentPosition === 'B-C' ? 2 :
                                currentPosition === 'C' ? 2 :
                                    currentPosition === 'C-D' ? 3 :
                                        currentPosition === 'D' ? 3 : 0;
        };

        // Initial calculation
        const initTimer = setTimeout(calculateScrollPositions, 100);


        const particlesScrollTrigger = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
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


        mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.15;
        mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.15;

        mouse.current.set(
            mousePosition.current.x,
            mousePosition.current.y,
            0
        );

        if (!simulationMaterialRef.current) return;


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

        // Render FBO
        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null);


        currentColor.current.lerp(targetColor.current, 0.05);
        points.current.material.uniforms.uPositions.value = renderTarget.texture;
        points.current.material.uniforms.uColor.value = currentColor.current;
        points.current.material.uniforms.uParticleOffset.value = particleOffset.current;
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
                        blending={THREE.NormalBlending}
                        depthTest={true}
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