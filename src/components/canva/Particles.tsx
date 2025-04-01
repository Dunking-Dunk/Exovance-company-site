//@ts-nocheck

import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useCallback } from "react";
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


const SIZE = 165;
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

    // Set initial particle color based on theme
    useEffect(() => {
        if (points.current?.material) {
            points.current.material.uniforms.uColor.value = theme === 'dark'
                ? new THREE.Vector3(.9804, .9373, .9373)
                : new THREE.Vector3(0.0, 0.0, 0.0);
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
        uColor: { value: null },
        uTransitionProgress: { value: 0 },
        uRadiusScale: { value: 1 },
        uCurrentPosition: { value: 0 }
    }), []);

    const mouse = useRef(new THREE.Vector3());

    // Memoize mouse position update handler
    const updateMousePosition = useCallback((e: MouseEvent) => {
        mousePosition.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, []);

    // Optimize scroll trigger setup
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const updatePositionState = (progress: number) => {
            if (!simulationMaterialRef.current) return;

            let currentPosition = 'A';
            let transitionProgress = 0;
            let radiusScale = 1;

            if (progress < 0.20) {
                currentPosition = 'A';
                radiusScale = 1 + (progress * 10);
            } else if (progress < 0.30) {
                currentPosition = 'A-B';
                const sectionProgress = (progress - 0.20) / (0.30 - 0.20);
                transitionProgress = Math.min(1, sectionProgress * 3);
                radiusScale = 5;
            } else if (progress < 0.40) {
                currentPosition = 'B-C';
                const sectionProgress = (progress - 0.30) / (0.40 - 0.30);
                transitionProgress = Math.min(1, sectionProgress * 3);
            } else if (progress < 0.55) {
                currentPosition = 'C-D';
                const sectionProgress = (progress - 0.40) / (0.55 - 0.40);
                transitionProgress = Math.min(1, sectionProgress * 3);
            } else if (progress < 0.80) {
                currentPosition = 'D-S';
                transitionProgress = (progress - 0.55) / (0.80 - 0.55);
            } else {
                currentPosition = 'S-A';
                transitionProgress = (progress - 0.80) / (0.95 - 0.80);
            }

            simulationMaterialRef.current.uniforms.uTransitionProgress.value = transitionProgress;
            simulationMaterialRef.current.uniforms.uRadiusScale.value = radiusScale;
            simulationMaterialRef.current.uniforms.uCurrentPosition.value =
                currentPosition === 'A' ? 0 :
                    currentPosition === 'A-B' ? 1 :
                        currentPosition === 'B-C' ? 2 :
                            currentPosition === 'C-D' ? 3 :
                                currentPosition === 'D' ? 4 :
                                    currentPosition === 'D-S' ? 5 :
                                        currentPosition === 'S-A' ? 6 : 0;
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => updatePositionState(self.progress)
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    // Mouse event effect
    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [updateMousePosition]);

    // Optimize frame updates
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

        // Update uniforms
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
};