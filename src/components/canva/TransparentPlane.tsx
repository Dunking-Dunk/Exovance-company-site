"use client"

import React, { useRef, useEffect, useMemo, useState } from 'react'
import { useScrollTheme } from '@/components/provider/scroll-theme-provider'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import { lerp } from 'three/src/math/MathUtils.js'

interface TransparentPlaneProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
    opacity?: number
    color?: string
}


const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `

const velocityShader = `
    uniform sampler2D uVelocity;
    uniform sampler2D uPressure;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uDeltaTime;
        varying vec2 vUv;

    void main() {
        vec2 texel = 1.0 / uResolution;
        vec2 velocity = texture2D(uVelocity, vUv).xy;

        // Mouse interaction removed - no mouse effects
            
        // Reduced ambient motion with smaller patterns
        float time1 = uTime * 0.3;
        float time2 = uTime * 0.7;
        float time3 = uTime * 1.1;
        
        // Smaller wave patterns
        vec2 wave1 = vec2(
            sin(vUv.x * 12.0 + time1) * cos(vUv.y * 10.0 + time1 * 0.8),
            cos(vUv.x * 10.0 + time1 * 1.2) * sin(vUv.y * 12.0 + time1)
        ) * 0.002;
        
        vec2 wave2 = vec2(
            sin(vUv.x * 18.0 + time2 + 2.0) * cos(vUv.y * 15.0 + time2 * 0.6),
            cos(vUv.x * 15.0 + time2 * 1.4) * sin(vUv.y * 18.0 + time2 + 1.5)
        ) * 0.001;
        
        vec2 wave3 = vec2(
            sin(vUv.x * 24.0 + time3 + 4.0) * cos(vUv.y * 20.0 + time3 * 0.4),
            cos(vUv.x * 20.0 + time3 * 1.6) * sin(vUv.y * 24.0 + time3 + 3.0)
        ) * 0.0005;
        
        // Combine waves
        velocity += wave1 + wave2 + wave3;
        
        // Smaller swirling motion
        vec2 center = vUv - 0.5;
        float angle = atan(center.y, center.x);
        float radius = length(center);
        vec2 swirl = vec2(-sin(angle), cos(angle)) * radius * 0.0005 * sin(uTime * 0.5);
        velocity += swirl;
        
        // Damping
        velocity *= 0.985;
        
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`

// Pressure calculation shader
const pressureShader = `
    uniform sampler2D uVelocity;
    uniform sampler2D uPressure;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
        vec2 texel = 1.0 / uResolution;
        
        // Sample neighboring velocities
        float left = texture2D(uVelocity, vUv - vec2(texel.x, 0.0)).x;
        float right = texture2D(uVelocity, vUv + vec2(texel.x, 0.0)).x;
        float top = texture2D(uVelocity, vUv + vec2(0.0, texel.y)).y;
        float bottom = texture2D(uVelocity, vUv - vec2(0.0, texel.y)).y;
        
        // Calculate divergence
        float divergence = (right - left + top - bottom) * 0.5;
        
        // Sample neighboring pressures
        float leftP = texture2D(uPressure, vUv - vec2(texel.x, 0.0)).x;
        float rightP = texture2D(uPressure, vUv + vec2(texel.x, 0.0)).x;
        float topP = texture2D(uPressure, vUv + vec2(0.0, texel.y)).x;
        float bottomP = texture2D(uPressure, vUv - vec2(0.0, texel.y)).x;
        
        // Jacobi iteration for pressure
        float pressure = (leftP + rightP + topP + bottomP - divergence) * 0.25;
        
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`

// Density advection shader - black and white effects
const densityShader = `
    uniform sampler2D uDensity;
    uniform sampler2D uVelocity;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uDeltaTime;
    varying vec2 vUv;
    
    void main() {
        vec2 texel = 1.0 / uResolution;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        
        // Enhanced semi-Lagrangian advection
        vec2 coord = vUv - velocity * uDeltaTime * 0.15;
        vec4 density = texture2D(uDensity, coord);
        
        // Mouse density effects removed - no mouse interaction
        
        // Faster decay for more responsive effects
        density.rgb *= 0.996;
        density.a *= 0.995;
        
        gl_FragColor = density;
    }
`

// Final render shader with dark black and white gradient effects
const renderShader = `
    uniform sampler2D uDensity;
    uniform sampler2D uVelocity;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uThemeValue; // Use float value for smooth interpolation
    varying vec2 vUv;
    
    // Enhanced noise function for more fluid patterns
    vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        
        return mix(mix(mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                           dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
                       mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                           dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
                   mix(mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                           dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
                       mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                           dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
    }

    // Enhanced fractal noise with more octaves
    float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        // 6 octaves for more detailed noise
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
        
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
        
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
        
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
        
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
        
        value += amplitude * noise(p * frequency);
        
        return value;
    }

    // Grainy noise function for texture
    float grainNoise(vec2 uv, float time) {
        vec2 grain_uv = uv * 800.0 + time * 0.1;
        return fract(sin(dot(grain_uv, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
    }
    
    // Authentic film grain noise function
    float filmGrain(vec2 uv, float time) {
        // Create moving grain coordinates
        vec2 grainUv = uv + time * 0.02;
        
        // Multiple hash functions for realistic grain texture
        float hash1 = fract(sin(dot(grainUv * 512.0, vec2(12.9898, 78.233))) * 43758.5453);
        float hash2 = fract(sin(dot(grainUv * 256.0 + 1.0, vec2(269.5, 183.3))) * 43758.5453);
        float hash3 = fract(sin(dot(grainUv * 1024.0 + 2.0, vec2(419.2, 371.9))) * 43758.5453);
        
        // Combine multiple scales for realistic film grain
        float grain = 0.0;
        grain += (hash1 - 0.5) * 0.6;  // Main grain structure
        grain += (hash2 - 0.5) * 0.3;  // Medium grain details
        grain += (hash3 - 0.5) * 0.1;  // Fine grain details
        
        return grain;
    }
    
    // Additional noise layers for grain complexity
    float layeredGrainNoise(vec2 uv, float time, float scale) {
        vec2 noiseUv = uv * scale + time * 0.01;
        float hash = fract(sin(dot(noiseUv, vec2(127.1, 311.7))) * 43758.5453);
        return (hash - 0.5) * 2.0; // Center around 0 with range -1 to 1
    }

    // Wavy noise function for flowing patterns
    float wavyNoise(vec2 uv, float time) {
        vec2 wave1 = vec2(
            sin(uv.x * 8.0 + time * 1.2) * 0.1,
            cos(uv.y * 6.0 + time * 0.8) * 0.1
        );
        vec2 wave2 = vec2(
            cos(uv.x * 12.0 + time * 0.9) * 0.05,
            sin(uv.y * 10.0 + time * 1.1) * 0.05
        );
        vec2 wave3 = vec2(
            sin(uv.x * 16.0 + uv.y * 4.0 + time * 0.7) * 0.03,
            cos(uv.y * 14.0 + uv.x * 3.0 + time * 1.3) * 0.03
        );
        
        vec2 waveUv = uv + wave1 + wave2 + wave3;
        return noise(vec3(waveUv * 4.0, time * 0.3));
    }

    // Enhanced wavy fractal noise
    float wavyFbm(vec3 p) {
        vec2 uv = p.xy;
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        // Apply wavy distortion to each octave
        for (int i = 0; i < 4; i++) {
            vec2 wavyUv = uv + vec2(
                sin(uv.x * frequency * 0.5 + uTime * 0.8) * 0.1 / frequency,
                cos(uv.y * frequency * 0.3 + uTime * 0.6) * 0.1 / frequency
            );
            value += amplitude * noise(vec3(wavyUv * frequency, p.z));
            amplitude *= 0.5;
            frequency *= 2.0;
        }
        
        return value;
    }

    void main() {
        vec4 density = texture2D(uDensity, vUv);
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        
        // Enhanced fluid distortion with more noise layers
        vec2 fluidUv = vUv;
        fluidUv += velocity * 10.;
        
        // Multiple detailed noise layers with wavy patterns
        float detailNoise1 = wavyFbm(vec3(fluidUv * 8.0, uTime * 0.1));
        float detailNoise2 = wavyFbm(vec3(fluidUv * 16.0 + 50.0, uTime * 0.08));
        float detailNoise3 = wavyNoise(fluidUv * 32.0 + 100.0, uTime * 0.12);
        float detailNoise4 = wavyNoise(fluidUv * 64.0 + 150.0, uTime * 0.06);
        
        // Add flowing wavy patterns
        float wavyPattern1 = wavyNoise(fluidUv * 6.0, uTime * 0.4);
        float wavyPattern2 = wavyNoise(fluidUv * 12.0 + 200.0, uTime * 0.3);
        
        // Combine multiple noise layers for rich detail
        float combinedNoise = detailNoise1 * 0.3 + detailNoise2 * 0.25 + detailNoise3 * 0.2 + detailNoise4 * 0.15;
        combinedNoise += (wavyPattern1 + wavyPattern2) * 0.05; // Add wavy influence
        
        // Create flowing gradient with wavy distortion
        vec2 gradient = fluidUv;
        gradient += vec2(combinedNoise * 0.2);
        gradient += velocity * 1.5;
        
        // Add wavy distortion to gradient
        gradient += vec2(
            wavyPattern1 * 0.1,
            wavyPattern2 * 0.08
        );
        
        // Velocity magnitude for dynamic effects
        float velocityMag = length(velocity);
        float fluidStrength = velocityMag * 3.0 + combinedNoise * 0.2; // Reduced noise influence
        
        // Gradient calculation with more noise detail
        float gradientValue = 0.0;
        gradientValue += smoothstep(-0.3, 1.3, gradient.x + gradient.y + combinedNoise * 0.2) * 0.3; // Reduced noise
        gradientValue += smoothstep(-0.2, 1.2, gradient.x - gradient.y + combinedNoise * 0.15) * 0.3; // Reduced noise
        gradientValue += smoothstep(0.0, 1.0, length(gradient - 0.5) * 1.5 + combinedNoise * 0.15) * 0.2; // Reduced noise
        gradientValue += combinedNoise * 0.15; // Reduced direct noise contribution
        
        // Add fluid motion and density influence
        gradientValue += fluidStrength * 0.3;
        gradientValue += density.a * 0.8; // Stronger density influence
        
        // Authentic film grain effect covering the entire plane
        float movieGrain = filmGrain(vUv, uTime);
        
        // Multiple grain layers for different frequencies
        float grainLayer1 = layeredGrainNoise(vUv, uTime, 800.0);  // Coarse grain
        float grainLayer2 = layeredGrainNoise(vUv, uTime * 1.2, 1200.0); // Medium grain
        float grainLayer3 = layeredGrainNoise(vUv, uTime * 0.8, 1600.0); // Fine grain
        float grainLayer4 = layeredGrainNoise(vUv, uTime * 1.5, 2000.0); // Ultra fine grain
        
        // Combine all grain layers for realistic film texture
        float combinedGrain = movieGrain * 0.5 + 
                                  grainLayer1 * 0.25 + 
                                  grainLayer2 * 0.15 + 
                                  grainLayer3 * 0.08 + 
                                  grainLayer4 * 0.02;
        
        // Intensify grain for visibility - make it much more prominent
        float grainIntensity = 0.4; // High intensity for visible effect
        float finalGrain = combinedGrain * grainIntensity;
        
        // Apply film grain effect across entire plane with smooth interpolation
        vec3 baseColor;
        
        // Calculate light mode version
        float lightGradientValue = 1.0 - gradientValue; // Invert
        lightGradientValue = pow(lightGradientValue, 2.8); // Strong contrast
        float lightDarkGrayRange = 0.15 + lightGradientValue * 0.1; // Very dark range: 0.15 to 0.25 (very dark gray)
        vec3 lightBaseColor = vec3(lightDarkGrayRange);
        lightBaseColor += vec3(finalGrain * 0.7); // Slightly reduced but still intense grain in light mode
        float lightShadow = smoothstep(0.95, 1.0, (1.0 - lightGradientValue) + fluidStrength);
        lightBaseColor -= vec3(lightShadow * 0.05); // Minimal shadows to stay very dark
        
        // Calculate dark mode version
        float darkGradientValue = pow(gradientValue, 3.0); // Very strong contrast to push almost everything to black
        float darkBlackRange = darkGradientValue * 0.3; // Extremely limited range: 0.0 to 0.08 (ultra dark)
        vec3 darkBaseColor = vec3(darkBlackRange);
        darkBaseColor += vec3(finalGrain); // Full intensity film grain in dark mode
        float darkHighlight = smoothstep(0.98, 1.0, darkGradientValue + fluidStrength);
        darkBaseColor += vec3(darkHighlight * 0.05); // Very minimal highlights
        
        // Smooth interpolation between light and dark modes
        baseColor = mix(lightBaseColor, darkBaseColor, uThemeValue);
        
        // Add extremely subtle flowing patterns with wavy noise
        float wavyFlow1 = wavyNoise(gradient * 15.0, uTime * 2.0);
        float wavyFlow2 = wavyNoise(gradient * 20.0 + 300.0, uTime * 1.5);
        
        float flowPattern = sin(gradient.x * 25.0 + uTime * 2.0 + combinedNoise * 8.0 + finalGrain * 10.0 + wavyFlow1 * 5.0) * cos(gradient.y * 20.0 + uTime * 1.5 + combinedNoise * 6.0 + finalGrain * 8.0 + wavyFlow2 * 4.0);
        flowPattern *= (velocityMag * 1.5 + 0.05) * combinedNoise;
        
        // Add very subtle wavy flow contribution with smooth interpolation
        float pureWavyFlow = (wavyFlow1 + wavyFlow2) * 0.5;
        
        // Calculate light mode flow effects
        vec3 lightFlowEffect = vec3(flowPattern * 0.005) + vec3(pureWavyFlow * 0.003);
        
        // Calculate dark mode flow effects   
        vec3 darkFlowEffect = vec3(-flowPattern * 0.003) + vec3(-pureWavyFlow * 0.002);
        
        // Smooth interpolation between light and dark flow effects
        baseColor += mix(lightFlowEffect, darkFlowEffect, uThemeValue);
        
        // Film grain stays consistent across all effects
        baseColor = clamp(baseColor, 0.0, 1.0);
        
        // Dynamic opacity
        float dynamicOpacity = uOpacity * (0.3 + velocityMag * 1.5 + density.a * 0.5);
        dynamicOpacity = clamp(dynamicOpacity, 0.0, 0.8); // Cap maximum opacity
        
        gl_FragColor = vec4(baseColor, dynamicOpacity);
    }
`

export const TransparentPlane = (props: TransparentPlaneProps) => {
    const {
        position = [0, 0, 0],
        rotation = [0, 0, 0],
        opacity = 1,
    } = props

    const { viewport, gl } = useThree()
    const { theme } = useScrollTheme()
    const [isCompiled, setIsCompiled] = useState(false);

    const timeRef = useRef(0)


    const [themeValue, setThemeValue] = useState(theme === 'dark' ? 1.0 : 0.0);

    useEffect(() => {
        if (theme === 'dark') {
            setThemeValue(1.0);
        }
        else {
            setThemeValue(0.0);
        }
    }, [theme]);

    // Optimized resolution - reduced from 512x512 to 256x256 for better performance
    const resolution = useMemo(() => new THREE.Vector2(256, 256), [])

    // Optimized FBO settings - reduced precision and simplified filtering
    const fboSettings = useMemo(() => ({
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        generateMipmaps: false, // Disable mipmaps for performance
        stencilBuffer: false,   // Disable stencil buffer
    }), [])

    const fboFloatSettings = useMemo(() => ({
        ...fboSettings,
        type: THREE.FloatType,
    }), [fboSettings])

    // Create render targets for ping-pong rendering with optimized settings
    const velocityTarget1 = useFBO(resolution.x, resolution.y, fboFloatSettings)
    const velocityTarget2 = useFBO(resolution.x, resolution.y, fboFloatSettings)
    const pressureTarget1 = useFBO(resolution.x, resolution.y, fboFloatSettings)
    const pressureTarget2 = useFBO(resolution.x, resolution.y, fboFloatSettings)
    const densityTarget1 = useFBO(resolution.x, resolution.y, fboSettings)
    const densityTarget2 = useFBO(resolution.x, resolution.y, fboSettings)

    // Create materials with memoized uniforms
    const velocityUniforms = useMemo(() => ({
        uVelocity: { value: null },
        uPressure: { value: null },
        uResolution: { value: resolution },
        uTime: { value: 0 },
        uDeltaTime: { value: 0 },
    }), [resolution])

    const pressureUniforms = useMemo(() => ({
        uVelocity: { value: null },
        uPressure: { value: null },
        uResolution: { value: resolution },
    }), [resolution])

    const densityUniforms = useMemo(() => ({
        uDensity: { value: null },
        uVelocity: { value: null },
        uResolution: { value: resolution },
        uTime: { value: 0 },
        uDeltaTime: { value: 0 },
    }), [resolution])

    const renderUniforms = useMemo(() => ({
        uDensity: { value: null },
        uVelocity: { value: null },
        uResolution: { value: resolution },
        uTime: { value: 0 },
        uOpacity: { value: opacity },
        uThemeValue: { value: 0.0 }, // Start with neutral value
    }), [resolution, opacity]) // Keep minimal dependencies

    const velocityMaterial = useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: velocityShader,
        uniforms: velocityUniforms,
    }), [velocityUniforms])

    const pressureMaterial = useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: pressureShader,
        uniforms: pressureUniforms,
    }), [pressureUniforms])

    const densityMaterial = useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: densityShader,
        uniforms: densityUniforms,
    }), [densityUniforms])

    const renderMaterial = useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: renderShader,
        uniforms: renderUniforms,
        transparent: true,
        depthWrite: false,
    }), [renderUniforms])

    // Scene and camera for FBO rendering
    const scene = useMemo(() => new THREE.Scene(), [])
    const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), [])
    const quad = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2)), [])

    useEffect(() => {
        scene.add(quad)
        return () => {
            scene.remove(quad)
        }
    }, [scene, quad])

    useEffect(() => {
        const tempScene = new THREE.Scene();
        const tempCam = new THREE.OrthographicCamera();
        const tempMesh = new THREE.Mesh(new THREE.PlaneGeometry(), renderMaterial);
        tempScene.add(tempMesh);

        const tempRT = new THREE.WebGLRenderTarget(1, 1);
        gl.setRenderTarget(tempRT);
        gl.render(tempScene, tempCam);
        gl.setRenderTarget(null);

        tempMesh.geometry.dispose();
        tempRT.dispose();
        setIsCompiled(true);
    }, [gl, renderMaterial]);


    // Ping-pong state
    const [ping, setPing] = useState(true)


    useFrame((state) => {
        if (!isCompiled) return; // Wait until shaders are compiled
        const { gl, clock } = state
        const deltaTime = Math.min(clock.getDelta(), 1 / 30)
        timeRef.current = clock.getElapsedTime()

        velocityMaterial.uniforms.uTime.value = timeRef.current
        velocityMaterial.uniforms.uDeltaTime.value = deltaTime
        densityMaterial.uniforms.uTime.value = timeRef.current
        densityMaterial.uniforms.uDeltaTime.value = deltaTime
        renderMaterial.uniforms.uTime.value = timeRef.current


        const themeTransitionSpeed = 0.06;

        const currentValue = renderMaterial.uniforms.uThemeValue.value;
        const targetValue = themeValue;
        const difference = Math.abs(targetValue - currentValue);


        if (difference < 0.01) {
            renderMaterial.uniforms.uThemeValue.value = targetValue;
        } else {

            const progress = 1 - Math.pow(1 - themeTransitionSpeed, 2);
            renderMaterial.uniforms.uThemeValue.value = lerp(currentValue, targetValue, progress);
        }


        // Ping-pong between render targets
        const velocityRead = ping ? velocityTarget1 : velocityTarget2
        const velocityWrite = ping ? velocityTarget2 : velocityTarget1
        const pressureRead = ping ? pressureTarget1 : pressureTarget2
        const pressureWrite = ping ? pressureTarget2 : pressureTarget1
        const densityRead = ping ? densityTarget1 : densityTarget2
        const densityWrite = ping ? densityTarget2 : densityTarget1

        // Update velocity
        velocityMaterial.uniforms.uVelocity.value = velocityRead.texture
        velocityMaterial.uniforms.uPressure.value = pressureRead.texture
        quad.material = velocityMaterial
        gl.setRenderTarget(velocityWrite)
        gl.render(scene, camera)

        // Reduced pressure iterations from 3 to 2 for better performance
        for (let i = 0; i < 2; i++) {
            pressureMaterial.uniforms.uVelocity.value = velocityWrite.texture
            pressureMaterial.uniforms.uPressure.value = i === 0 ? pressureRead.texture : pressureWrite.texture
            quad.material = pressureMaterial
            gl.setRenderTarget(i === 0 ? pressureWrite : pressureRead) // Alternate targets
            gl.render(scene, camera)
        }

        // Update density
        densityMaterial.uniforms.uDensity.value = densityRead.texture
        densityMaterial.uniforms.uVelocity.value = velocityWrite.texture
        quad.material = densityMaterial
        gl.setRenderTarget(densityWrite)
        gl.render(scene, camera)

        // Final render
        renderMaterial.uniforms.uDensity.value = densityWrite.texture
        renderMaterial.uniforms.uVelocity.value = velocityWrite.texture

        gl.setRenderTarget(null)
        setPing(!ping)
    })


    if (!isCompiled) {
        return null;
    }

    return (
        <mesh
            position={position}
            rotation={rotation}
            scale={[viewport.width, viewport.height, 1]}
            renderOrder={0}
            material={renderMaterial} // Use the material we created and update
        >
            <planeGeometry args={[2, 2]} />
        </mesh>
    )
}