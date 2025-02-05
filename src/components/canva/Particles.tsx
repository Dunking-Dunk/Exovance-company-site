//@ts-nocheck

import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
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

export const Particles = () => {
    const { theme } = useTheme()
    const size = 200;
    const points = useRef();
    const simulationMaterialRef = useRef();

    // Add state for position transitions
    const positionState = useRef({
        currentPosition: 'A',
        transitionProgress: 0,
        radiusScale: 1,
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Create scroll-triggered animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Section 1: Position A with increasing radius (0-0.15)
                    if (progress < 0.20) {
                        positionState.current.currentPosition = 'A';
                        positionState.current.radiusScale = 1 + (progress * 10);
                        positionState.current.transitionProgress = 0;
                    }
                    // First Vision Section - Transition to and stay at Position B (0.20-0.30)
                    else if (progress < 0.30) {
                        positionState.current.currentPosition = 'A-B';
                        // First 30% of the section is transition, rest stays at B
                        const sectionProgress = (progress - 0.20) / (0.30 - 0.20);
                        positionState.current.transitionProgress = Math.min(1, sectionProgress * 3);
                        positionState.current.radiusScale = 5;
                    }
                    // Second Vision Section - Transition to and stay at Position C (0.30-0.40)
                    else if (progress < 0.40) {
                        positionState.current.currentPosition = 'B-C';
                        // First 30% of the section is transition, rest stays at C
                        const sectionProgress = (progress - 0.30) / (0.40 - 0.30);
                        positionState.current.transitionProgress = Math.min(1, sectionProgress * 3);
                        positionState.current.radiusScale = 1;
                    }
                    // Third Vision Section - Transition to and stay at Position D (0.40-0.55)
                    else if (progress < 0.55) {
                        positionState.current.currentPosition = 'C-D';
                        // First 30% of the section is transition, rest stays at D
                        const sectionProgress = (progress - 0.40) / (0.55 - 0.40);
                        positionState.current.transitionProgress = Math.min(1, sectionProgress * 3);
                        positionState.current.radiusScale = 1;
                    }
                    // Transition D to Semi-sphere (0.55-0.80)
                    else if (progress < 0.80) {
                        positionState.current.currentPosition = 'D-S';
                        const sectionProgress = (progress - 0.55) / (0.80 - 0.55);
                        positionState.current.transitionProgress = sectionProgress;
                        positionState.current.radiusScale = 1;
                    }
                    // Semi-sphere to A (0.80-1.0)
                    else {
                        positionState.current.currentPosition = 'S-A';
                        const finalProgress = (progress - 0.80) / (0.95 - 0.80);
                        positionState.current.transitionProgress = finalProgress;
                        positionState.current.radiusScale = 1;
                    }

                    if (simulationMaterialRef.current) {
                        simulationMaterialRef.current.uniforms.uTransitionProgress.value = positionState.current.transitionProgress;
                        simulationMaterialRef.current.uniforms.uRadiusScale.value = positionState.current.radiusScale;
                        simulationMaterialRef.current.uniforms.uCurrentPosition.value =
                            positionState.current.currentPosition === 'A' ? 0 :
                            positionState.current.currentPosition === 'A-B' ? 1 :
                            positionState.current.currentPosition === 'B-C' ? 2 :
                            positionState.current.currentPosition === 'C-D' ? 3 :
                            positionState.current.currentPosition === 'D' ? 4 :
                            positionState.current.currentPosition === 'D-S' ? 5 :
                            positionState.current.currentPosition === 'S-A' ? 6 : 0;
                    }
                }
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    const mousePosition = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
    });

    const { scrollYProgress } = useScroll()
    const distance = useTransform(scrollYProgress, [0, 1], [1, 10]);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
    const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

    const renderTarget = useFBO(size, size, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        type: THREE.FloatType,
    });

    const particlesPosition = useMemo(() => {
        const length = size * size;
        const particles = new Float32Array(length * 3);
        for (let i = 0; i < length; i++) {
            let i3 = i * 3;
            particles[i3 + 0] = (i % size) / size;
            particles[i3 + 1] = i / size / size;
        }
        return particles;
    }, [size]);

    const uniforms = useMemo(() => ({
        uPositions: { value: null },
        uColor: { value: null },
        uTransitionProgress: { value: 0 },
        uRadiusScale: { value: 1 },
        uCurrentPosition: { value: 0 } // 0: A, 1: A-B transition, 2: B-C transition
    }), []);

    const mouse = useRef(new THREE.Vector3());

    useFrame((state) => {
        const { gl, clock } = state;

        // Smooth mouse movement
        mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.1;
        mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.1;

        mouse.current.set(
            mousePosition.current.x,
            mousePosition.current.y,
            0
        );

        // Update scroll progress with damping
        const dt = 10;
        const dampedScroll = damp(
            simulationMaterialRef.current.uniforms.uScroll.value,
            distance.get(),
            0.005,
            dt
        );
        simulationMaterialRef.current.uniforms.uScroll.value = dampedScroll;

        // Update other uniforms
        simulationMaterialRef.current.uniforms.uMouse.value = mouse.current;
        simulationMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();

        // Render FBO
        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null);

        // Update points material
        points.current.material.uniforms.uPositions.value = renderTarget.texture;
        points.current.material.uniforms.uColor.value = theme === 'dark'
            ? new THREE.Vector3(.9804, .9373, .9373)
            : new THREE.Vector3(0.0, 0.0, 0.0);
    });

    useEffect(() => {
        const updateMousePosition = (e) => {
            mousePosition.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <>
            {createPortal(
                <mesh>
                    <simulationMaterial ref={simulationMaterialRef} args={[size]} />
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={positions.length / 3}
                            array={positions}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-uv"
                            count={uvs.length / 2}
                            array={uvs}
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
};