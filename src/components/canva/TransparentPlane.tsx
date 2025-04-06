"use client"

import React, { useRef, useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'

interface TransparentPlaneProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
    opacity?: number
    color?: string
}

// Shader for Buffer A - Water ripple and normal map generation
const bufferAVertexShader = `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `

const bufferAFragmentShader = `
        varying vec2 vUv;
        uniform float iTime;
    uniform float iTimeDelta;
    uniform int iFrame;
        uniform vec2 iResolution;
    uniform vec4 iMouse;
    uniform sampler2D iChannel0;

    // Water ripple parameters
    float nsize = 5.0;
    float nstrenght = 1.0;
    float turbInfluence = 0.025;
    float rippleSpeed = 15.0;
    float rippleFreq = 20.0;
    float size = 0.6;
    float dropSpeed = 1.0;
    float dropSize = 0.7;
    float pi = 3.14159265359;

    float hash(float n) {
        return fract(sin(dot(vec2(n,n), vec2(12.9898,78.233))) * 43758.5453);  
    } 

    float brush(vec2 uv, float tile) {            
        uv *= tile;
        float mouseRipple;

        if(iMouse.z > 0.1) {     
            vec2 mPos = iMouse.xy/iResolution.xy;
            mPos.x *= iResolution.x/iResolution.y; 
            mPos *= tile;
            
            float l = 1.0 - length(uv - mPos);
            mouseRipple = smoothstep(size, 1.0, l);
        } else {
            mouseRipple = 0.0; 
        }
            
        float dropRipple;
        
        const int iter = 10;
        for (int i = 0; i < iter; i++) {
            float ifloat = float(i)+1.0;
            float phase = (ifloat/float(iter))*dropSpeed;
            float t = iTime*dropSpeed + phase;
            float rX = hash(floor(t)+ifloat);
            float rY = hash(floor(t)*0.5+ifloat);
            
            vec2 rPos = vec2(rX,rY)*tile; 
            rPos.x *= iResolution.x/iResolution.y; 
            float rl = 1.0 - length(uv - rPos);
            float fTime = fract(t);
            float rRipple = sin(rl*rippleFreq + fTime*rippleSpeed)*0.5+0.5;
            float rB = smoothstep((1.0 - fTime)*dropSize, 1.0, rl);
            dropRipple += rB*rRipple*(1.0 - fTime);
        }
        
        return dropRipple + mouseRipple;
    }
        
    vec3 calculateNormals(vec2 uv, float tile) {
        float offsetX = nsize/iResolution.x;
        float offsetY = nsize/iResolution.y;
        vec2 ovX = vec2(0.0, offsetX);
        vec2 ovY = vec2(0.0, offsetY);
        
        float X = (brush(uv - ovX.yx, tile) - brush(uv + ovX.yx, tile)) * nstrenght;
        float Y = (brush(uv - ovY.xy, tile) - brush(uv + ovY.xy, tile)) * nstrenght;
        float Z = brush(uv, tile);
        
        return vec3(X,Y,Z);
    }

    void main() {
        float ratio = iResolution.x/iResolution.y;
        vec2 uv = vUv;
        vec2 uvR = uv;
        uvR.x *= ratio;
        
        vec4 tex = mix(vec4(0.0,0.0,1.0,0.0), texture2D(iChannel0, uv)*2.0-1.0, turbInfluence);
        
        // Mask border to avoid artefacts
        float maskX = sin(uv.x*pi);
        float maskY = sin(uv.y*pi);
        float mask = smoothstep(0.3, 0.0, maskX*maskY);
        
        vec3 n = calculateNormals(uvR, 2.0); 
        
        gl_FragColor = mix(vec4(vec3(tex.x + n.x, tex.y + n.y, 0.0)*0.5+0.5, n.z), vec4(0.5,0.5,1.0,0.0), mask);
    }
`

// Shader for Buffer B - Fluid simulation
const bufferBVertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const bufferBFragmentShader = `
    varying vec2 vUv;
    uniform float iTime;
    uniform float iTimeDelta;
    uniform int iFrame;
    uniform vec2 iResolution;
    uniform sampler2D iChannel0; // Buffer A
    uniform sampler2D iChannel1; // Previous Buffer B
    uniform sampler2D iChannel2; // Reset signal
    uniform sampler2D iChannel3; // Buffer C (turbulence)

    float sampleDistance = 10.0;
    float diffusion = -1.0;
    float turbulence = 0.3;

    void main() {
        vec2 uv = vUv;
        
        vec4 baseColor = texture2D(iChannel0, uv)*2.0-1.0;
        
        vec2 sDist = sampleDistance/iResolution.xy;
        
        vec4 newColor = texture2D(iChannel1, uv);
        vec2 turb = (texture2D(iChannel3, uv).xy*2.0-1.0)*turbulence;

        vec4 newColor1 = texture2D(iChannel1, uv + vec2(1.0,0.0)*sDist);
        vec4 newColor2 = texture2D(iChannel1, uv + vec2(-1.0,0.0)*sDist);
        vec4 newColor3 = texture2D(iChannel1, uv + vec2(0.0,1.0)*sDist);
        vec4 newColor4 = texture2D(iChannel1, uv + vec2(0.0,-1.0)*sDist);
        
        vec4 newColor5 = texture2D(iChannel1, uv + vec2(1.0,1.0)*sDist);
        vec4 newColor6 = texture2D(iChannel1, uv + vec2(-1.0,1.0)*sDist);
        vec4 newColor7 = texture2D(iChannel1, uv + vec2(1.0,-1.0)*sDist);
        vec4 newColor8 = texture2D(iChannel1, uv + vec2(-1.0,-1.0)*sDist);
            
        vec2 t = newColor1.xy * 2.0 - 1.0;
        t += newColor2.xy * 2.0 - 1.0;
        t += newColor3.xy * 2.0 - 1.0;
        t += newColor4.xy * 2.0 - 1.0;
        
        t += newColor5.xy * 2.0 - 1.0;
        t += newColor6.xy * 2.0 - 1.0;
        t += newColor7.xy * 2.0 - 1.0;
        t += newColor8.xy * 2.0 - 1.0;
        
        t /= 8.0;

        vec2 dir = vec2(t+turb)*diffusion*iTimeDelta;
        
        vec4 res = texture2D(iChannel1, uv + dir);
        
        baseColor = baseColor*0.5+0.5;
        
        // Reset condition on first frames
        if(iFrame < 10) {
            gl_FragColor = baseColor;
        } else {
            gl_FragColor = mix(res, baseColor, baseColor.a);
        }
    }
`

// Shader for Buffer C - Turbulence
const bufferCVertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const bufferCFragmentShader = `
    varying vec2 vUv;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform sampler2D iChannel0; // Buffer A

    vec2 speed = vec2(5.0,-2.0);
    float v = 30.0;
    float dist = 0.3;
    float random1 = 1.0;
    float random2 = 2.0;

    float hash(float n) {
        return fract(sin(dot(vec2(n,n), vec2(12.9898,78.233))) * 43758.5453);  
    }  

    vec2 turbulence(vec2 uv) {
        vec2 turb;
        turb.x = sin(uv.x);
        turb.y = cos(uv.y);
        
        for(int i = 0; i < 10; i++) {
            float ifloat = 1.0 + float(i);
            float ifloat1 = ifloat + random1;
            float ifloat2 = ifloat + random2; 
            
            float r1 = hash(ifloat1)*2.0-1.0;
            float r2 = hash(ifloat2)*2.0-1.0;
            
            vec2 turb2;
            turb2.x = sin(uv.x*(1.0 + r1*v) + turb.y*dist*ifloat + iTime*speed.x*r2);
            turb2.y = cos(uv.y*(1.0 + r1*v) + turb.x*dist*ifloat + iTime*speed.y*r2);
            
            turb.x = mix(turb.x, turb2.x, 0.5);
            turb.y = mix(turb.y, turb2.y, 0.5);
        }
        
        return turb;
    }

    void main() {
        float ratio = iResolution.x/iResolution.y;
        vec2 uv = vUv;
        uv.x *= ratio;
        
        vec4 buff = texture2D(iChannel0, vUv)*2.0-1.0;
        vec2 turb = turbulence(uv+buff.xy*0.1)*0.5+0.5;
        
        gl_FragColor = vec4(turb.x, turb.y, 0.0, 0.0);
    }
`

// Final render shader
const finalVertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const finalFragmentShader = `
    varying vec2 vUv;
    uniform float iTime;
    uniform float opacity;
    uniform vec2 iResolution;
    uniform sampler2D iChannel0; // Buffer A (normals)
    uniform sampler2D iChannel1; // Buffer B (fluid)
    uniform sampler2D iChannel2; // Environment map

    float rotSpeed = 0.05;

    void main() {
        vec2 uv = vUv;
        
        vec4 buff = texture2D(iChannel0, uv)*2.0-1.0;
        float z = sqrt(1.0 - clamp(dot(vec2(buff.x,buff.y), vec2(buff.x,buff.y)), 0.0, 1.0));
        vec3 n = normalize(vec3(buff.x, buff.y, z));
        
        vec3 lightDir = vec3(sin(iTime*rotSpeed), cos(iTime*rotSpeed), 0.0);
        
        float l = max(0.0, dot(n, lightDir));
        float fresnel = 1.0 - dot(vec3(0.0,0.0,1.0), n);
        
        // Simulate environment reflection
        vec2 reflectCoords = reflect(normalize(vec3(0.0, 0.0, 1.0)), n).xy * 0.5 + 0.5;
        vec4 reflection = texture2D(iChannel2, reflectCoords);
        
        // Use normal map to distort the background - this creates refraction
        vec2 refractionUv = vUv + n.xy * 0.1;
        vec4 tex = texture2D(iChannel1, vec2(uv.x*(iResolution.x/iResolution.y), uv.y) + n.xy*0.1);
        
        // Final color composition
        vec4 waterColor = vec4(0.2, 0.4, 0.8, 1.0);
        vec4 finalColor = tex*0.5 + vec4((fresnel + l)*0.5)*reflection + reflection*0.5;
        finalColor = mix(waterColor, finalColor, 0.8);
        
        // Make it slightly transparent to see objects behind
        gl_FragColor = vec4(finalColor.rgb, opacity * 0.85);
    }
`

// Buffer reset shader
const resetShaderFragment = `
    varying vec2 vUv;
        void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
`

export const TransparentPlane = (props: TransparentPlaneProps) => {
    const {
        position = [0, 0, 0],
        rotation = [0, 0, 0],
        opacity = 0.4,
        color = '#ffffff'
    } = props

    // Get viewport size for fullscreen rendering
    const { viewport, size: canvasSize } = useThree()

    const { theme } = useTheme()
    const mouseRef = useRef<THREE.Vector4>(new THREE.Vector4(0, 0, 0, 0))
    const frameCountRef = useRef(0)
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    // FBO setup with higher resolution for more detail
    const fboSize = useMemo(() => new THREE.Vector2(1024, 1024), [])

    // Create render targets (buffers)
    const bufferA = useFBO({
        samples: 4,
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
    })
    const bufferB = useFBO({
        samples: 4,
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
    })
    const bufferBPrev = useFBO({
        samples: 4,
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
    })
    const bufferC = useFBO({
        samples: 4,
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter
    })
    const resetTarget = useFBO({
        samples: 4,
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter
    })

    // Create material refs
    const bufferAMaterial = useRef<THREE.ShaderMaterial | null>(null)
    const bufferBMaterial = useRef<THREE.ShaderMaterial | null>(null)
    const bufferCMaterial = useRef<THREE.ShaderMaterial | null>(null)
    const finalMaterial = useRef<THREE.ShaderMaterial | null>(null)

    // Create environment map texture
    const envMapTexture = useMemo(() => {
        const loader = new THREE.TextureLoader()
        // Create a fallback texture in case the file doesn't exist
        const fallbackTexture = new THREE.DataTexture(
            new Uint8Array([0, 128, 255, 255]), // RGBA blue color
            1, 1,
            THREE.RGBAFormat
        )
        fallbackTexture.needsUpdate = true

        try {
            return loader.load('/textures/envmap.jpg',
                (texture) => {
                    texture.wrapS = THREE.RepeatWrapping
                    texture.wrapT = THREE.RepeatWrapping
                },
                undefined,
                () => fallbackTexture // On error, use fallback
            )
        } catch (error) {
            console.warn("Error loading environment map texture, using fallback", error)
            return fallbackTexture
        }
    }, [])

    // Create scene and camera for FBO rendering
    const scene = useMemo(() => new THREE.Scene(), [])
    const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), [])
    const plane = useMemo(() => new THREE.PlaneGeometry(2, 2), [])

    // Create materials for each buffer
    const shaderMaterials = useMemo(() => {
        // Reset material
        const resetMaterial = new THREE.ShaderMaterial({
            vertexShader: bufferAVertexShader,
            fragmentShader: resetShaderFragment,
            uniforms: {}
        })

        // Buffer A material
        const bufferAMat = new THREE.ShaderMaterial({
            vertexShader: bufferAVertexShader,
            fragmentShader: bufferAFragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iTimeDelta: { value: 0 },
                iFrame: { value: 0 },
                iResolution: { value: fboSize },
                iMouse: { value: mouseRef.current },
                iChannel0: { value: null }
            }
        })

        // Buffer B material
        const bufferBMat = new THREE.ShaderMaterial({
            vertexShader: bufferBVertexShader,
            fragmentShader: bufferBFragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iTimeDelta: { value: 0 },
                iFrame: { value: 0 },
                iResolution: { value: fboSize },
                iChannel0: { value: null },
                iChannel1: { value: null },
                iChannel2: { value: resetTarget.texture },
                iChannel3: { value: null }
            }
        })

        // Buffer C material
        const bufferCMat = new THREE.ShaderMaterial({
            vertexShader: bufferCVertexShader,
            fragmentShader: bufferCFragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: fboSize },
                iChannel0: { value: null }
            }
        })

        // Final material - make it transparent and refractive
        const finalMat = new THREE.ShaderMaterial({
            vertexShader: finalVertexShader,
            fragmentShader: finalFragmentShader,
            uniforms: {
                iTime: { value: 0 },
                opacity: { value: opacity },
                iResolution: { value: new THREE.Vector2(viewport.width * 2., viewport.height * 2.) },
                iChannel0: { value: null },
                iChannel1: { value: null },
                iChannel2: { value: envMapTexture }
            },
            transparent: true,
            depthWrite: false, // Important for transparency to see objects behind
            side: THREE.DoubleSide
        })

        return { resetMaterial, bufferAMat, bufferBMat, bufferCMat, finalMat }
    }, [fboSize, viewport.width, viewport.height, opacity, envMapTexture])

    // Setup for FBO rendering
    useEffect(() => {
        const quad = new THREE.Mesh(plane, shaderMaterials.resetMaterial)
        scene.add(quad)

        // Initialize reset target texture
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(fboSize.x, fboSize.y)
        renderer.setRenderTarget(resetTarget)
        renderer.render(scene, camera)
        renderer.setRenderTarget(null)

        // Setup initial buffer states
        quad.material = shaderMaterials.resetMaterial
        renderer.setRenderTarget(bufferB)
        renderer.render(scene, camera)
        renderer.setRenderTarget(bufferBPrev)
        renderer.render(scene, camera)
        renderer.setRenderTarget(null)

        // Store material references
        bufferAMaterial.current = shaderMaterials.bufferAMat
        bufferBMaterial.current = shaderMaterials.bufferBMat
        bufferCMaterial.current = shaderMaterials.bufferCMat
        finalMaterial.current = shaderMaterials.finalMat

        return () => {
            scene.remove(quad)
            renderer.dispose()
        }
    }, [plane, scene, camera, fboSize, shaderMaterials, resetTarget, bufferB, bufferBPrev])

    // Handle mouse movement for interactivity
    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            if (meshRef.current) {
                // Normalize mouse position to FBO space
                const x = (event.clientX / canvasSize.width) * fboSize.x
                const y = (1.0 - event.clientY / canvasSize.height) * fboSize.y

                mouseRef.current.x = x
                mouseRef.current.y = y
                // Keep ripple effect active when mouse is over the canvas
                mouseRef.current.z = 1
            }
        }

        const handlePointerDown = () => {
            // Stronger effect on click
            mouseRef.current.z = 2
        }

        const handlePointerUp = () => {
            // Return to hover effect
            mouseRef.current.z = 1
        }

        // Add event listeners to window for fullscreen effect
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('pointerup', handlePointerUp)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('pointerup', handlePointerUp)
        }
    }, [canvasSize, fboSize])

    // Update and render buffers every frame
    useFrame((state) => {
        const { gl, clock } = state
        frameCountRef.current++

        // Update uniforms
        const time = clock.getElapsedTime()
        const delta = clock.getDelta()

        if (!bufferAMaterial.current || !bufferBMaterial.current ||
            !bufferCMaterial.current || !finalMaterial.current) return

        // Update Buffer A uniforms
        bufferAMaterial.current.uniforms.iTime.value = time
        bufferAMaterial.current.uniforms.iTimeDelta.value = delta
        bufferAMaterial.current.uniforms.iFrame.value = frameCountRef.current
        bufferAMaterial.current.uniforms.iMouse.value = mouseRef.current
        bufferAMaterial.current.uniforms.iChannel0.value = resetTarget.texture

        // Render Buffer A
        const quadA = new THREE.Mesh(plane, bufferAMaterial.current)
        scene.clear()
        scene.add(quadA)
        gl.setRenderTarget(bufferA)
        gl.render(scene, camera)

        // Update Buffer C uniforms
        bufferCMaterial.current.uniforms.iTime.value = time
        bufferCMaterial.current.uniforms.iChannel0.value = bufferA.texture

        // Render Buffer C
        const quadC = new THREE.Mesh(plane, bufferCMaterial.current)
        scene.clear()
        scene.add(quadC)
        gl.setRenderTarget(bufferC)
        gl.render(scene, camera)

        // Update Buffer B uniforms
        bufferBMaterial.current.uniforms.iTime.value = time
        bufferBMaterial.current.uniforms.iTimeDelta.value = delta
        bufferBMaterial.current.uniforms.iFrame.value = frameCountRef.current
        bufferBMaterial.current.uniforms.iChannel0.value = bufferA.texture
        bufferBMaterial.current.uniforms.iChannel1.value = bufferBPrev.texture
        bufferBMaterial.current.uniforms.iChannel3.value = bufferC.texture

        // Render Buffer B
        const quadB = new THREE.Mesh(plane, bufferBMaterial.current)
        scene.clear()
        scene.add(quadB)
        gl.setRenderTarget(bufferB)
        gl.render(scene, camera)

        // Copy bufferB to bufferBPrev for the next frame
        // Using a simple pass-through shader
        const copyPassMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform sampler2D tDiffuse;
                void main() {
                    gl_FragColor = texture2D(tDiffuse, vUv);
                }
            `,
            uniforms: {
                tDiffuse: { value: bufferB.texture }
            }
        });
        quadB.material = copyPassMaterial;
        gl.setRenderTarget(bufferBPrev)
        gl.render(scene, camera)

        // Update Final material uniforms
        finalMaterial.current.uniforms.iTime.value = time
        finalMaterial.current.uniforms.iChannel0.value = bufferA.texture
        finalMaterial.current.uniforms.iChannel1.value = bufferB.texture

        // Reset render target
        gl.setRenderTarget(null)

        // Clear scene
        scene.clear()

        // Update mesh material
        if (meshRef.current) {
            meshRef.current.material = finalMaterial.current
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            // Use larger scale multiplier to ensure full coverage
            scale={[viewport.width * 4, viewport.height * 4, 1]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={finalMaterial}
                vertexShader={finalVertexShader}
                fragmentShader={finalFragmentShader}
                transparent={true}
                depthWrite={false}
                side={THREE.DoubleSide}
                uniforms={{
                    iTime: { value: 0 },
                    opacity: { value: opacity },
                    iResolution: { value: new THREE.Vector2(viewport.width * 4, viewport.height * 4) },
                    iChannel0: { value: null },
                    iChannel1: { value: null },
                    iChannel2: { value: envMapTexture }
                }}
            />
        </mesh>
    )
} 