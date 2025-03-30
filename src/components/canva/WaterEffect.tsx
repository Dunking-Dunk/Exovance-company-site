import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from '@react-three/postprocessing'
import { extend } from '@react-three/fiber'
import { Effect, BlendFunction } from 'postprocessing'

interface Point {
    x: number
    y: number
    age: number
    force: number
    vx: number
    vy: number
}

// Fragment shader for the water effect
const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D inputBuffer;
#define PI 3.14159265359

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 tex = texture2D(uTexture, uv);
    // Convert normalized values into regular unit vector
    float vx = -(tex.r * 2. - 1.);
    float vy = -(tex.g * 2. - 1.);
    // Normalized intensity works just fine for intensity
    float intensity = tex.b;
    float maxAmplitude = 0.2;
    vec2 distortedUv = uv + vec2(vx, vy) * intensity * maxAmplitude;
    outputColor = texture2D(inputBuffer, distortedUv);
}
`

// Custom Water Effect
class WaterEffect extends Effect {
    constructor(texture: THREE.Texture) {
        const uniforms = new Map<string, THREE.Uniform>([
            ['uTexture', new THREE.Uniform(texture)],
            ['inputBuffer', new THREE.Uniform(null)]
        ])

        super('WaterEffect', fragmentShader, {
            uniforms,
            blendFunction: BlendFunction.NORMAL
        })
    }
}

// Extend Three.js with our custom effect
extend({ WaterEffect })

// Water texture class to handle ripples
class WaterTexture {
    size: number
    radius: number
    width: number
    height: number
    points: Point[]
    maxAge: number
    last: Point | null
    canvas!: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D
    texture!: THREE.CanvasTexture

    constructor() {
        this.size = 64
        this.radius = this.size * 0.1
        this.width = this.height = this.size
        this.points = []
        this.maxAge = 64
        this.last = null

        this.initTexture()
    }

    initTexture() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx = this.canvas.getContext('2d')!
        this.texture = new THREE.CanvasTexture(this.canvas)
        this.clear()
    }

    clear() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    addPoint(point: { x: number; y: number }) {
        let force = 0
        let vx = 0
        let vy = 0

        if (this.last) {
            const relativeX = point.x - this.last.x
            const relativeY = point.y - this.last.y
            const distanceSquared = relativeX * relativeX + relativeY * relativeY
            const distance = Math.sqrt(distanceSquared)
            force = Math.min(distanceSquared * 100, 1)
            vx = relativeX / distance
            vy = relativeY / distance
        }

        this.points.push({
            x: point.x,
            y: point.y,
            age: 0,
            force,
            vx,
            vy
        })

        this.last = { ...point, age: 0, force: 0, vx: 0, vy: 0 }
    }

    update() {
        this.clear()
        this.points.forEach((point, i) => {
            point.age += 1
            if (point.age > this.maxAge) {
                this.points.splice(i, 1)
            }
        })

        this.points.forEach(point => {
            this.drawPoint(point)
        })

        this.texture.needsUpdate = true
    }

    drawPoint(point: Point) {
        const pos = {
            x: point.x * this.width,
            y: point.y * this.height
        }

        const intensity = 1 - point.age / this.maxAge
        const radius = this.radius * point.force * intensity

        this.ctx.beginPath()
        this.ctx.fillStyle = `rgba(255,255,255,${0.2 * intensity})`
        this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        this.ctx.fill()
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            waterEffect: any
        }
    }
}

export function WaterEffectComponent() {
    const waterTexture = useMemo(() => new WaterTexture(), [])
    const mousePosition = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            }
            waterTexture.addPoint(mousePosition.current)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [waterTexture])

    useFrame(() => {
        waterTexture.update()
    })

    return (
        <EffectComposer>
            <waterEffect args={[waterTexture.texture]} />
        </EffectComposer>
    )
} 