import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      chromeShader: any
    }
  }
}

const ChromeShaderBase = shaderMaterial(
  {
    time: 0,
    colorA: [0.95, 0.95, 0.95], // Whitish
    colorB: [0.85, 0.85, 0.85], // Light gray
    colorC: [0.75, 0.75, 0.75], // Medium gray
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewDir;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vViewDir = normalize(cameraPosition - worldPosition.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewDir;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewDir);
      
      // Enhanced fresnel effect
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
      
      // Diamond-like sparkle effect
      float sparkle = pow(max(dot(reflect(-viewDir, normal), viewDir), 0.0), 64.0);
      
      // Subtle color variation based on position
      float gradient = sin(vPosition.y * 3.0 + time * 0.5) * 0.5 + 0.5;
      
      // Mix base colors with fresnel
      vec3 color = mix(
        mix(colorA, colorB, gradient),
        colorC,
        fresnel * 0.5
      );
      
      // Add diamond-like sparkle
      color += vec3(sparkle) * 0.8;
      
      // Add subtle rainbow-like dispersion
      float dispersion = sin(vPosition.x * 5.0 + time) * 0.1 + 0.9;
      color *= vec3(dispersion, dispersion * 0.98, dispersion * 0.95);
      
      // Enhance highlights
      float highlight = pow(max(dot(normal, viewDir), 0.0), 8.0);
      color += vec3(highlight) * 0.3;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ ChromeShader: ChromeShaderBase })

export { ChromeShaderBase }
export type ChromeShaderType = typeof ChromeShaderBase 