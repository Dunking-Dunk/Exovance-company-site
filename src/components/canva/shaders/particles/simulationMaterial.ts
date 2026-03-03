//@ts-nocheck
"use client";

import simulationVertexShader from '!!raw-loader!./simulationVertexShader.glsl';
import simulationFragmentShader from '!!raw-loader!./simulationFragmentShader.glsl';
import * as THREE from "three";
import { useGLTF } from '@react-three/drei';


useGLTF.preload('/3d/brain_3d.glb')
useGLTF.preload('/3d/human_head.glb')
useGLTF.preload('/3d/spider_robot.glb')
useGLTF.preload('/3d/dna_3.glb')
useGLTF.preload('/3d/exovance-3d.glb')

const getRandomData = (width, height) => {
    const length = width * height * 4;
    const data = new Float32Array(length);
    for (let i = 0; i < length; i += 4) {
        // Simple random distribution in unit cube
        data[i] = (Math.random() - 0.5) * 2;
        data[i + 1] = (Math.random() - 0.5) * 2;
        data[i + 2] = (Math.random() - 0.5) * 2;
        data[i + 3] = 1.0;
    }
    return data;
};

const normalizeAndResizeVertices = (vertices, size, scale, applyRotation = false) => {
    const normalizedData = new Float32Array(size * size * 4);
    const vertexCount = vertices.length / 3;
    const totalParticles = size * size;

    if (vertexCount === 0) {
        return normalizedData;
    }

    // 90-degree rotation matrix around Y-axis (if applyRotation is true)
    const cos90 = Math.cos(Math.PI / 2);
    const sin90 = Math.sin(Math.PI / 2);

    for (let i = 0; i < totalParticles; i++) {
        const targetIdx = i * 4;
        let sourceIdx;

        if (totalParticles >= vertexCount) {
            const passes = Math.ceil(totalParticles / vertexCount);
            const currentPass = Math.floor(i / vertexCount);
            const indexInPass = i % vertexCount;

            // Add offset for each pass to create variation
            const passOffset = (currentPass * 7) % vertexCount; // Use prime number for better distribution
            sourceIdx = ((indexInPass + passOffset) % vertexCount) * 3;
        } else {

            const goldenRatio = 1.618033988749;
            const step = vertexCount / totalParticles;


            const baseIndex = Math.floor(i * step);
            const quasiRandomOffset = Math.floor((i * goldenRatio * step * 0.3) % (step * 0.6));

            sourceIdx = Math.min(baseIndex + quasiRandomOffset, vertexCount - 1) * 3;
        }


        sourceIdx = Math.min(sourceIdx, vertices.length - 3);

        let x = vertices[sourceIdx] * scale;
        let y = vertices[sourceIdx + 1] * scale;
        let z = vertices[sourceIdx + 2] * scale;


        if (applyRotation) {
            const rotatedX = cos90 * x - sin90 * z;
            const rotatedZ = sin90 * x + cos90 * z;
            x = rotatedX;
            z = rotatedZ;
        }

        normalizedData[targetIdx] = x;
        normalizedData[targetIdx + 1] = y;
        normalizedData[targetIdx + 2] = z;
        normalizedData[targetIdx + 3] = 1.0;
    }
    return normalizedData;
};

const brainVertices = () => {
    const { nodes } = useGLTF('/3d/brain_3d.glb');

    if (!nodes.Object_4) return new Float32Array();
    const positions = nodes.Object_4.geometry.attributes.position.array;


    return positions;
};

const humanVertices = () => {
    const { nodes } = useGLTF('/3d/human_head.glb');

    if (!nodes.Object_4) return new Float32Array();
    const positions = nodes.Object_4.geometry.attributes.position.array;
    return positions;
};


const robotVertices = () => {
    const { nodes } = useGLTF('/3d/dna_3.glb');

    const positions = nodes.Scene.children[0].geometry.attributes.position.array;
    return positions;

    // let allVertices = [];
    // const collectVertices = (object) => {

    //     for (let i of object) {
    //         if (i.geometry && i.geometry.attributes.position.array) {
    //             const positions = Array.from(i.geometry.attributes.position.array);
    //             allVertices.push(...positions);
    //         }

    //         if (i.children) {
    //             collectVertices(i.children)
    //         }
    //     }
    // };

    // if (nodes.Sketchfab_model) {
    //     if (nodes.Sketchfab_model.children) {
    //         collectVertices(nodes.Sketchfab_model.children)
    //     }
    // }



    // return allVertices.length > 0 ? new Float32Array(allVertices) : new Float32Array();
};

const logoVertices = () => {
    try {
        const { nodes } = useGLTF('/3d/exovance-3d.glb');
        if (!nodes.Curve003 || !nodes.Curve003.geometry) return new Float32Array();
        return nodes.Curve003.geometry.attributes.position.array;
    } catch {
        return new Float32Array();
    }
};



class SimulationMaterial extends THREE.ShaderMaterial {
    constructor(size) {
        const positionsTexture = new THREE.DataTexture(
            getRandomData(size, size),
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsTexture.needsUpdate = true;

        const brainPositions = normalizeAndResizeVertices(brainVertices(), size, 2);
        const positionsBrainTexture = new THREE.DataTexture(
            brainPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsBrainTexture.needsUpdate = true;

        const humanPositions = normalizeAndResizeVertices(humanVertices(), size, 1);
        const positionsHumanTexture = new THREE.DataTexture(
            humanPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsHumanTexture.needsUpdate = true;


        const robotPositions = normalizeAndResizeVertices(robotVertices(), size, 0.3, true);
        const positionsRobotTexture = new THREE.DataTexture(
            robotPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsRobotTexture.needsUpdate = true;

        // ── Logo vertices: transform exactly as the ExovanceLogo mesh renders ──
        // The mesh uses: group rotation [-PI/2, PI, PI], mesh scale 8.
        // Euler XYZ [-PI/2, PI, PI] transforms vertex (x,y,z) → (x, -z, y).
        // After that we auto-normalise to ±1.6 world units so it matches
        // brain / face scale in particle space.
        const rawLogo = logoVertices();
        let logoPositions: Float32Array;
        if (rawLogo.length >= 3) {
            const transformed = new Float32Array(rawLogo.length);
            for (let i = 0; i < rawLogo.length; i += 3) {
                const vx = rawLogo[i]     * 8;   // mesh scale = 8
                const vy = rawLogo[i + 1] * 8;
                const vz = rawLogo[i + 2] * 8;
                // Rotation [-PI/2, PI, PI] XYZ Euler: (x,y,z) → (x, -z, y)
                transformed[i]     =  vx;
                transformed[i + 1] = -vz;
                transformed[i + 2] =  vy;
            }
            // Auto-scale so the point cloud spans ±1.6 units (same as brain/face)
            let maxExtent = 0;
            for (let i = 0; i < transformed.length; i += 3) {
                maxExtent = Math.max(
                    maxExtent,
                    Math.abs(transformed[i]),
                    Math.abs(transformed[i + 1]),
                    Math.abs(transformed[i + 2])
                );
            }
            const targetSize = 1.6;
            const normScale = maxExtent > 0 ? targetSize / maxExtent : 1.0;
            for (let i = 0; i < transformed.length; i++) {
                transformed[i] *= normScale;
            }
            logoPositions = normalizeAndResizeVertices(transformed, size, 1.0);
        } else {
            logoPositions = new Float32Array(size * size * 4);
        }
        const positionsLogoTexture = new THREE.DataTexture(
            logoPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsLogoTexture.needsUpdate = true;


        super({
            uniforms: {
                positionsA: { value: positionsTexture },
                positionsB: { value: positionsBrainTexture },
                positionsC: { value: positionsHumanTexture },
                positionsD: { value: positionsRobotTexture },
                positionsE: { value: positionsLogoTexture },
                uTime: { value: 0 },
                uFrequency: { value: 0.25 },
                uMouse: { value: new THREE.Vector3(0, 0, 0) },
                uPrevMouse: { value: new THREE.Vector3(0, 0, 0) },
                uMouseActive: { value: 0 },
                uMouseRadius: { value: 0.2 },
                uScroll: { value: 0 },
                uTransitionProgress: { value: 0 },
                uRadiusScale: { value: 3.2 },
                uCurrentPosition: { value: 0 }
            },
            vertexShader: simulationVertexShader,
            fragmentShader: simulationFragmentShader,
        });
    }
}

export default SimulationMaterial;