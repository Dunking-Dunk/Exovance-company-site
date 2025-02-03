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
    const size = 128;
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
                    
                    // Section 1: Position A with increasing radius (0-0.20)
                    if (progress < 0.20) {
                        positionState.current.currentPosition = 'A';
                        positionState.current.radiusScale = 1 + (progress * 10);
                        positionState.current.transitionProgress = 0;
                    }
                    // Section 2: Transition A to B (0.20-0.30)
                    else if (progress < 0.30) {
                        positionState.current.currentPosition = 'A-B';
                        positionState.current.transitionProgress = (progress - 0.20) / (0.30 - 0.20);
                    }
                    // Section 3: Transition B to C (0.30-0.40)
                    else if (progress < 0.40) {
                        positionState.current.currentPosition = 'B-C';
                        positionState.current.transitionProgress = (progress - 0.30) / (0.40 - 0.30);
                    }
                    // Section 4: Transition C back to A (0.40-0.50)
                    else if (progress < 0.50) {
                        positionState.current.currentPosition = 'C-A';
                        positionState.current.transitionProgress = (progress - 0.40) / (0.50 - 0.40);
                        // Start with a small radius when transitioning back
                        positionState.current.radiusScale = 1;
                    }
                    // Section 5: Position A with increasing radius (0.50-0.90)
                    else if (progress < 0.86) {
                        positionState.current.currentPosition = 'A';
                        // Scale radius from 1 to 11 in this section
                        positionState.current.radiusScale = 1 + ((progress - 0.50) * 22.5);
                        positionState.current.transitionProgress = 0;
                    }
                    // Section 6: Final transition back to Position A with radius 1 (0.90-1.0)
                    else {
                        positionState.current.currentPosition = 'A';
                        // Smoothly transition radius back to 1
                        const finalProgress = (progress - 0.86) / 0.1;
                        positionState.current.radiusScale = 11 * (1 - finalProgress) + 1;
                        positionState.current.transitionProgress = 0;
                    }

                    if (simulationMaterialRef.current) {
                        simulationMaterialRef.current.uniforms.uTransitionProgress.value = positionState.current.transitionProgress;
                        simulationMaterialRef.current.uniforms.uRadiusScale.value = positionState.current.radiusScale;
                        simulationMaterialRef.current.uniforms.uCurrentPosition.value = 
                            positionState.current.currentPosition === 'A' ? 0 :
                            positionState.current.currentPosition === 'A-B' ? 1 :
                            positionState.current.currentPosition === 'B-C' ? 2 :
                            positionState.current.currentPosition === 'C-A' ? 3 : 0;
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
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                />
            </points>
        </>
    );
};