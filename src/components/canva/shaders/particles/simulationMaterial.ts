//@ts-nocheck

import simulationVertexShader from '!!raw-loader!./simulationVertexShader.glsl';
import simulationFragmentShader from '!!raw-loader!./simulationFragmentShader.glsl';
import * as THREE from "three";

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

        super({
            uniforms: {
                positionsA: { value: positionsTexture },
                uTime: { value: 0 },
                uFrequency: { value: 0.25 },
                uMouse: { value: new THREE.Vector3(0, 0, 0) },
                uMouseRadius: { value: 0.5 },
                uScroll: { value: 0 }
            },
            vertexShader: simulationVertexShader,
            fragmentShader: simulationFragmentShader,
        });
    }
}

export default SimulationMaterial;
