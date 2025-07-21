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
import { useTheme } from "next-themes";
import { useMotionValueEvent, useTransform } from "framer-motion";
import { damp } from "three/src/math/MathUtils.js";

extend({ SimulationMaterial: SimulationMaterial });


const SIZE = 170;
const POSITIONS = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
const UVS = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

export const Particles = () => {
    const { theme } = useTheme();
    const points = useRef();
    const simulationMaterialRef = useRef();
    const mousePosition = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
    });

    // Track previous mouse position and activity time
    const prevMouse = useRef(new THREE.Vector3());
    const mouseActive = useRef(0);
    const lastMouseMove = useRef(0);

    // Add ref for canvas element
    const canvasRef = useRef(null);

    // Smooth color transition state
    const currentColor = useRef(new THREE.Vector3(1.0, 1.0, 1.0)); // Start with white
    const targetColor = useRef(new THREE.Vector3(1.0, 1.0, 1.0));

    useEffect(() => {
        // Set target color based on theme with smooth transition
        if (theme === 'dark') {
            targetColor.current.set(1.0, 1.0, 1.0); // White particles in dark mode
        } else {
            targetColor.current.set(0.0, 0.0, 0.0); // Black particles in light mode
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
        }
        return particles;
    }, []);

    // Memoize uniforms
    const uniforms = useMemo(() => ({
        uPositions: { value: null },
        uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
        uTransitionProgress: { value: 0 },
        uRadiusScale: { value: 1 },
        uCurrentPosition: { value: 0 }
    }), []);

    const mouse = useRef(new THREE.Vector3());

    // Fixed mouse position update handler with activity tracking
    const updateMousePosition = useCallback((e: MouseEvent) => {
        // Simply use window dimensions since Three.js canvas is typically fullscreen
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        // Track significant mouse movement
        const prevX = mousePosition.current.targetX;
        const prevY = mousePosition.current.targetY;
        const moveDist = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));

        // If mouse moved significantly, update activity time
        if (moveDist > 0.02) {
            mouseActive.current = Date.now() / 1000;
            lastMouseMove.current = Date.now() / 1000;
        }

        // Apply smoother interpolation for mouse movement
        mousePosition.current.targetX += (x - mousePosition.current.targetX) * 0.2;
        mousePosition.current.targetY += (y - mousePosition.current.targetY) * 0.2;
    }, []);

    // Optimize scroll trigger setup - Synced with Vision page
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const updatePositionState = (progress: number) => {
            if (!simulationMaterialRef.current) return;

            let currentPosition = 'A';
            let transitionProgress = 0;
            let radiusScale = 1;

            // Vision timeline: 240% scroll with 3 sections
            // GSAP timeline adds each section sequentially with overlaps
            // Section 0 (IMAGINE): starts immediately 
            // Section 1 (INVENT): starts around 33% 
            // Section 2 (EXOVANCE): starts around 66%

            if (progress < 0.30) {
                // Sphere grows continuously until IMAGINE text becomes visible
                currentPosition = 'A';
                transitionProgress = 0;
                radiusScale = 1 + (progress * 16); // Continuous growth to maximum

            } else if (progress < 0.38) {
                // Transition to Brain as IMAGINE text pops up (becomes clear from blur)
                currentPosition = 'A-B';
                const sectionProgress = (progress - 0.30) / (0.38 - 0.30);
                transitionProgress = Math.min(1, sectionProgress * 6); // Very fast transition
                radiusScale = 5; // Peak size during brain formation

            } else if (progress < 0.50) {
                // Hold Brain formation while IMAGINE is fully visible
                currentPosition = 'B';
                transitionProgress = 1;
                radiusScale = 2.5; // Stable brain size

            } else if (progress < 0.63) {
                // Transition to Human head as INVENT text pops up
                currentPosition = 'B-C';
                const sectionProgress = (progress - 0.50) / (0.63 - 0.50);
                transitionProgress = Math.min(1, sectionProgress * 6); // Very fast transition
                radiusScale = 2.5;

            } else if (progress < 0.61) {
                // Hold Human head while INVENT is fully visible
                currentPosition = 'C';
                transitionProgress = 1;
                radiusScale = 2; // Stable human head size

            } else if (progress < 0.88) {
                // Transition to Robot as EXOVANCE text pops up
                currentPosition = 'C-D';
                const sectionProgress = (progress - 0.61) / (0.88 - 0.61);
                transitionProgress = Math.min(1, sectionProgress * 6); // Very fast transition
                radiusScale = 2;

            } else {
                // EXOVANCE section and beyond - hold Robot formation
                currentPosition = 'D';
                transitionProgress = 1;
                radiusScale = 1.5; // Final stable robot size
            }

            // Debug logging to help track the animations
            console.log(`Particles - Progress: ${progress.toFixed(3)}, Position: ${currentPosition}, Transition: ${transitionProgress.toFixed(3)}, Scale: ${radiusScale.toFixed(3)}`);

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

        // Create a separate ScrollTrigger for particles that doesn't conflict with theme switching
        const particlesScrollTrigger = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => updatePositionState(self.progress),
            id: 'particles-animation'
        });

        return () => {
            // Clean up only this specific ScrollTrigger
            particlesScrollTrigger.kill();
        };
    }, []);

    // Mouse event effect with correct element reference
    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [updateMousePosition]);

    // Optimize frame updates with improved mouse handling and smooth color transitions
    useFrame((state) => {
        const { gl, clock } = state;
        const elapsedTime = clock.getElapsedTime();

        // Save previous mouse position
        prevMouse.current.set(mouse.current.x, mouse.current.y, 0);

        // Enhanced mouse movement smoothing
        mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.15;
        mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.15;

        // Map mouse position to world space without additional scaling
        // The mouse coordinates are already properly normalized
        mouse.current.set(
            mousePosition.current.x,
            mousePosition.current.y,
            0
        );

        if (!simulationMaterialRef.current) return;

        // Update scroll progress with damping
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

        // Smooth color transition using lerp for eased animation
        currentColor.current.lerp(targetColor.current, 0.05); // Slower lerp for smooth 1000ms-like transition

        // Update points material with smooth color transition
        points.current.material.uniforms.uPositions.value = renderTarget.texture;
        points.current.material.uniforms.uColor.value = currentColor.current;
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
                <points ref={points}>
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