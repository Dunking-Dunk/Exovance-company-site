//@ts-nocheck

import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { scroll } from 'motion'

import SimulationMaterial from './shaders/particles/simulationMaterial';
import vertexShader from "!!raw-loader!./shaders/particles/vertexShader.glsl";
import fragmentShader from "!!raw-loader!./shaders/particles/fragmentShader.glsl";

extend({ SimulationMaterial: SimulationMaterial });

export const Particles = () => {
    const size = 128;

    // This reference gives us direct access to our points
    const points = useRef();
    const simulationMaterialRef = useRef();

    // Add mouse position state
    const mousePosition = useRef({
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
    });

    // Add scroll progress state
    const scrollProgress = useRef(0);

    useEffect(() => {
        const updateMousePosition = (e) => {
            // Convert mouse position to normalized device coordinates (-1 to +1)
            mousePosition.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

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

    // Generate our positions attributes array
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
        uPositions: {
            value: null,
        }
    }), [])

    const mouse = useRef(new THREE.Vector3());

    // Damping function
    const damp = (current, target, lambda, dt) => {
        return THREE.MathUtils.damp(current, target, lambda, dt);
    };

    scroll(progress => {
        scrollProgress.current = progress + 0.1;
    }, { container: document.getElementById('scroller') })

    useFrame((state) => {
        const { gl, clock } = state;

        // Smooth mouse movement
        mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.1;
        mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.1;

        // Update mouse position in simulation
        mouse.current.set(
            mousePosition.current.x,
            mousePosition.current.y,
            0
        );

        // Smooth scroll progress
        const dt = state.clock.getElapsedTime();
        const dampedScroll = damp(simulationMaterialRef.current.uniforms.uScroll.value, scrollProgress.current, 0.001, dt);

        simulationMaterialRef.current.uniforms.uScroll.value = dampedScroll;

        // Update simulation material
        if (mouse.current)
            simulationMaterialRef.current.uniforms.uMouse.value = mouse?.current;
        simulationMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();

        // Render FBO
        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null);

        // Update points material
        points.current.material.uniforms.uPositions.value = renderTarget.texture;
    });


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