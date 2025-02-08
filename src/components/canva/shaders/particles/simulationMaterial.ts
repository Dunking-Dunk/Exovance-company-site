//@ts-nocheck
"use client";

import simulationVertexShader from '!!raw-loader!./simulationVertexShader.glsl';
import simulationFragmentShader from '!!raw-loader!./simulationFragmentShader.glsl';
import * as THREE from "three";
import { useGLTF } from '@react-three/drei';


useGLTF.preload('/brain_3d.glb')
useGLTF.preload('/human_head.glb')
useGLTF.preload('/spider_robot.glb')

const getRandomData = (width, height) => {
    const length = width * height * 4;
    const data = new Float32Array(length);
    for (let i = 0; i < length; i += 4) {
        const theta = Math.random() * Math.PI * 2;
        const phi = 2 * Math.PI * Math.random();
        const r = 0.5 + 0.5 * Math.random();
        data[i] = r * Math.sin(theta) * Math.cos(phi);
        data[i + 1] = r * Math.sin(theta) * Math.sin(phi);
        data[i + 2] = r * Math.cos(theta);
        data[i + 3] = 1.0;
    }
    return data;
};

const normalizeAndResizeVertices = (vertices, size, scale) => {
    const normalizedData = new Float32Array(size * size * 4);
    const vertexCount = vertices.length / 3;

    for (let i = 0; i < size * size; i++) {
        const sourceIdx = (i % vertexCount) * 3;
        const targetIdx = i * 4;

        if (sourceIdx < vertices.length) {
            normalizedData[targetIdx] = vertices[sourceIdx] * scale;
            normalizedData[targetIdx + 1] = vertices[sourceIdx + 1] * scale;
            normalizedData[targetIdx + 2] = vertices[sourceIdx + 2] * scale;
            normalizedData[targetIdx + 3] = 1.0;
        }
    }
    return normalizedData;
};

const brainVertices = () => {
    const { nodes } = useGLTF('/brain_3d.glb');

    if (!nodes.Object_4) return new Float32Array();
    const positions = nodes.Object_4.geometry.attributes.position.array;
    return positions;
};

const humanVertices = () => {
    const { nodes } = useGLTF('/human_head.glb');

    if (!nodes.Object_4) return new Float32Array();
    const positions = nodes.Object_4.geometry.attributes.position.array;
    return positions;
};


const robotVertices = () => {
    const { nodes } = useGLTF('/spider_robot.glb');

    let allVertices = [];
    const collectVertices = (object) => {
        for (let i of object) {
            if (i.geometry && i.geometry.attributes.position.array) {
                const positions = Array.from(i.geometry.attributes.position.array);
                allVertices.push(...positions);
            }
    
            if (i.children) {
                collectVertices(i.children)
            }else break

        }
      
     
    };

    if (nodes.Sketchfab_model) {
        if (nodes.Sketchfab_model.children) {
          
                collectVertices(nodes.Sketchfab_model.children)
        }
    }
    

    // Start traversal from the root node
    // if (nodes) {
    //         for (let i in nodes) {
    //             collectVertices(nodes[i]);
    //         }
    // }

    return allVertices.length > 0 ? new Float32Array(allVertices) : new Float32Array();
};


class SimulationMaterial extends THREE.ShaderMaterial {
    constructor(size) {
        // Initial sphere positions
        const positionsTexture = new THREE.DataTexture(
            getRandomData(size, size),
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsTexture.needsUpdate = true;

        // Brain model positions
        const brainPositions = normalizeAndResizeVertices(brainVertices(), size, 2 );
        const positionsBrainTexture = new THREE.DataTexture(
            brainPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsBrainTexture.needsUpdate = true;

        // Human head model positions
        const humanPositions = normalizeAndResizeVertices(humanVertices(), size, 1);
        const positionsHumanTexture = new THREE.DataTexture(
            humanPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsHumanTexture.needsUpdate = true;

        // Robot model positions
        const robotPositions = normalizeAndResizeVertices(robotVertices(), size, 1.);
        const positionsRobotTexture = new THREE.DataTexture(
            robotPositions,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsRobotTexture.needsUpdate = true;

        super({
            uniforms: {
                positionsA: { value: positionsTexture },
                positionsB: { value: positionsBrainTexture },
                positionsC: { value: positionsHumanTexture },
                positionsD: { value: positionsRobotTexture },
                uTime: { value: 0 },
                uFrequency: { value: 0.25 },
                uMouse: { value: new THREE.Vector3(0, 0, 0) },
                uMouseRadius: { value: 0.3 },
                uScroll: { value: 0 },
                uTransitionProgress: { value: 0 },
                uRadiusScale: { value: 1 },
                uCurrentPosition: { value: 0 } // 0: A, 1: A-B transition, 2: B-C transition, 3: C-D transition
            },
            vertexShader: simulationVertexShader,
            fragmentShader: simulationFragmentShader,
        });
    }
}

export default SimulationMaterial;
