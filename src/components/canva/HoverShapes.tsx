"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Particles that gather into a shape over an element. Any element with data-particle-shape
// triggers it on hover. Elements inside a [data-particle-group] are also picked as the group scrolls
// past (several items are walked through in turn). Moving between targets flies the same particles. Own small canvas, idle (not rendering) until something triggers.

const FOV = 40;
const SHAPE_NAMES = ["question", "face", "cube", "india", "grid", "wave"] as const;
const SHAPE_INDEX: Record<string, number> = Object.fromEntries(SHAPE_NAMES.map((n, i) => [n, i]));
// spin modes passed to the shader: 0 still, 1 cube turning, 2 head swaying
const spinOf = (shape: number) => (shape === SHAPE_INDEX.cube ? 1 : shape === SHAPE_INDEX.face ? 2 : 0);
const HEAD_MODEL = "/3d/human_head.glb";

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uVisible;
    uniform float uMorph;
    uniform float uDpr;
    uniform float uCamZ;
    uniform float uOpacity;
    uniform float uArc;
    uniform float uAScatter;
    uniform float uASpin;
    uniform float uBSpin;
    uniform float uAScale;
    uniform float uBScale;
    uniform vec2 uAPos;
    uniform vec2 uASpread;
    uniform vec2 uBPos;
    attribute vec2 aScatter;
    attribute vec3 aTargetA;
    attribute vec3 aTargetB;
    attribute vec4 aRand;
    varying float vAlpha;
    varying vec3 vColor;

    vec3 spin(vec3 s, float on) {
        if (on < 0.5) return s;
        float ay = uTime * 0.7;
        float ax = 0.5;
        if (on > 1.5) { // head: turns a little each way instead of spinning round
            ay = sin(uTime * 0.6) * 0.22;
            ax = sin(uTime * 0.4) * 0.08;
        }
        s = vec3(cos(ay) * s.x + sin(ay) * s.z, s.y, -sin(ay) * s.x + cos(ay) * s.z);
        return vec3(s.x, cos(ax) * s.y - sin(ax) * s.z, sin(ax) * s.y + cos(ax) * s.z);
    }

    void main() {
        // per-point stagger so the move reads as a flock, not a slide
        float t = clamp((uMorph - aRand.x * 0.45) / 0.55, 0.0, 1.0);
        t = t * t * (3.0 - 2.0 * t);

        // where the point starts: scattered around an element, or on the previous shape
        vec3 a;
        float shadeA = 1.0;
        if (uAScatter > 0.5) {
            a = vec3(uAPos + aScatter * uASpread, (aRand.y - 0.5) * 140.0);
            a.xy += vec2(sin(uTime * 0.8 + aRand.z * 6.2831), cos(uTime * 0.7 + aRand.z * 9.0)) * 10.0;
        } else {
            vec3 sa = spin(aTargetA, uASpin);
            shadeA = 1.0 + sa.z * 0.9;
            a = vec3(uAPos + sa.xy * uAScale, sa.z * uAScale);
            a.xy += vec2(sin(uTime * 1.3 + aRand.z * 20.0), cos(uTime * 1.1 + aRand.z * 17.0)) * 0.9;
        }

        vec3 sb = spin(aTargetB, uBSpin);
        vec3 b = vec3(uBPos + sb.xy * uBScale, sb.z * uBScale);
        b.xy += vec2(sin(uTime * 1.3 + aRand.z * 20.0), cos(uTime * 1.1 + aRand.z * 17.0)) * 0.9;

        vec3 p = mix(a, b, t);
        // curve each point's flight sideways and out of the page so the flock sweeps across
        float arc = sin(t * 3.14159);
        vec2 dir = b.xy - a.xy;
        p.xy += vec2(-dir.y, dir.x) * arc * (aRand.z - 0.5) * uArc;
        p.z += arc * 180.0 * aRand.y;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.8 + aRand.y * 1.6) * uDpr * uCamZ / -mv.z;

        vec3 grey = vec3(0.82);
        vec3 violet = vec3(0.655, 0.545, 0.98);
        vColor = mix(grey, violet, step(aRand.w, 0.45));
        float formed = uAScatter > 0.5 ? 0.35 + 0.55 * t : 0.9;
        // nearer points are brighter, so 3D shapes (cube, head) read as solid
        float shade = mix(shadeA, 1.0 + sb.z * 0.9, t);
        vAlpha = uVisible * formed * uOpacity * shade;
    }
`;

const fragmentShader = /* glsl */ `
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.12, d);
        if (a < 0.01) discard;
        gl_FragColor = vec4(vColor, vAlpha * a);
    }
`;

type Rand = () => number;

// Draws a shape on a square 2D canvas and returns a lookup for its filled pixels
const N = 256;
function rasterise(draw: (ctx: CanvasRenderingContext2D) => void) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = N;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = ctx.strokeStyle = "#fff";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    draw(ctx);
    const data = ctx.getImageData(0, 0, N, N).data;
    return (x: number, y: number) => data[(y * N + x) * 4 + 3] > 128;
}

// Random filled pixels as points in [-0.5, 0.5]
function sampleRandom(draw: (ctx: CanvasRenderingContext2D) => void, count: number, rand: Rand) {
    const filled = rasterise(draw);
    const px: number[] = [];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (filled(x, y)) px.push(y * N + x);
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const p = px[Math.floor(rand() * px.length)] ?? 0;
        out[i * 3] = ((p % N) + rand()) / N - 0.5;
        out[i * 3 + 1] = 0.5 - (Math.floor(p / N) + rand()) / N;
    }
    return out;
}

// Evenly spaced dots on a grid, so the shape reads as a dot matrix
function sampleDotMatrix(draw: (ctx: CanvasRenderingContext2D) => void, count: number, rand: Rand, step: number) {
    const filled = rasterise(draw);
    const dots: number[] = [];
    for (let y = 0; y < N; y += step) for (let x = 0; x < N; x += step) if (filled(x, y)) dots.push(x, y);
    const total = dots.length / 2;
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const d = i < total ? i : Math.floor(rand() * total);
        out[i * 3] = dots[d * 2] / N - 0.5 + (rand() - 0.5) * 0.004;
        out[i * 3 + 1] = 0.5 - dots[d * 2 + 1] / N + (rand() - 0.5) * 0.004;
    }
    // the first `total` particles take every dot once; shuffle so a smaller count still covers the map
    for (let i = count - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        for (let k = 0; k < 3; k++) { const t = out[i * 3 + k]; out[i * 3 + k] = out[j * 3 + k]; out[j * 3 + k] = t; }
    }
    return out;
}

// Points spread over the surface of the head model, fitted into [-0.5, 0.5] by height. Points are
// kept more often where the surface faces the light, so the dots are denser on lit planes and the
// eyes, nose and mouth show as shadow.
function sampleMesh(geometry: THREE.BufferGeometry, count: number, rand: Rand) {
    if (!geometry.getAttribute("normal")) geometry.computeVertexNormals();
    const pos = geometry.getAttribute("position");
    const nor = geometry.getAttribute("normal");
    const index = geometry.index;
    const tris = index ? index.count / 3 : pos.count / 3;
    const vert = (t: number, k: number) => (index ? index.getX(t * 3 + k) : t * 3 + k);
    const cumulative = new Float32Array(tris);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    let total = 0;
    for (let t = 0; t < tris; t++) {
        a.fromBufferAttribute(pos, vert(t, 0));
        b.fromBufferAttribute(pos, vert(t, 1));
        c.fromBufferAttribute(pos, vert(t, 2));
        total += b.clone().sub(a).cross(c.clone().sub(a)).length() / 2;
        cumulative[t] = total;
    }
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const centre = box.getCenter(new THREE.Vector3());
    const k = 0.96 / (box.max.y - box.min.y);
    const light = new THREE.Vector3(0.1, 0.35, 1).normalize();
    const na = new THREE.Vector3(), nb = new THREE.Vector3(), nc = new THREE.Vector3(), n = new THREE.Vector3();
    const out = new Float32Array(count * 3);
    let filled = 0;
    for (let tries = 0; filled < count && tries < count * 40; tries++) {
        const r = rand() * total;
        let lo = 0, hi = tris - 1;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (cumulative[mid] < r) lo = mid + 1; else hi = mid; }
        const ia = vert(lo, 0), ib = vert(lo, 1), ic = vert(lo, 2);
        const s = Math.sqrt(rand()), u = 1 - s, v = rand() * s, w = 1 - u - v;

        n.set(0, 0, 0)
            .addScaledVector(na.fromBufferAttribute(nor, ia), u)
            .addScaledVector(nb.fromBufferAttribute(nor, ib), v)
            .addScaledVector(nc.fromBufferAttribute(nor, ic), w)
            .normalize();
        const lit = Math.max(0, n.dot(light));
        if (rand() > 0.08 + 0.92 * lit * lit) continue;

        a.fromBufferAttribute(pos, ia);
        b.fromBufferAttribute(pos, ib);
        c.fromBufferAttribute(pos, ic);
        out[filled * 3] = ((a.x * u + b.x * v + c.x * w) - centre.x) * k;
        out[filled * 3 + 1] = ((a.y * u + b.y * v + c.y * w) - centre.y) * k;
        out[filled * 3 + 2] = ((a.z * u + b.z * v + c.z * w) - centre.z) * k;
        filled++;
    }
    return out;
}

// Edges of a cube, in [-0.5, 0.5] on all three axes
function sampleCube(count: number, rand: Rand) {
    const h = 0.3;
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const axis = Math.floor(rand() * 3);
        const corner = Math.floor(rand() * 4);
        const a = corner & 1 ? h : -h;
        const b = corner & 2 ? h : -h;
        const v = [0, 0, 0];
        v[axis] = (rand() * 2 - 1) * h;
        v[(axis + 1) % 3] = a;
        v[(axis + 2) % 3] = b;
        out.set(v, i * 3);
    }
    return out;
}

const drawQuestion = (ctx: CanvasRenderingContext2D) => {
    ctx.font = "bold 250px Arial, Helvetica, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", 128, 140);
};

// Head and shoulders, with the features cut out so the dots read as a face
const drawFace = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath(); // shoulders
    ctx.moveTo(14, 256); ctx.quadraticCurveTo(20, 198, 86, 184); ctx.lineTo(170, 184); ctx.quadraticCurveTo(236, 198, 242, 256);
    ctx.closePath(); ctx.fill();
    ctx.fillRect(108, 140, 40, 60); // neck
    ctx.beginPath(); ctx.ellipse(128, 98, 58, 74, 0, 0, Math.PI * 2); ctx.fill(); // head
    ctx.beginPath(); ctx.ellipse(68, 104, 8, 16, 0, 0, Math.PI * 2); ctx.fill(); // ears
    ctx.beginPath(); ctx.ellipse(188, 104, 8, 16, 0, 0, Math.PI * 2); ctx.fill();

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.ellipse(102, 98, 13, 8, 0, 0, Math.PI * 2); ctx.fill(); // eyes
    ctx.beginPath(); ctx.ellipse(154, 98, 13, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 8; // brows
    ctx.beginPath(); ctx.moveTo(84, 76); ctx.lineTo(120, 70); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(136, 70); ctx.lineTo(172, 76); ctx.stroke();
    ctx.lineWidth = 7; // nose
    ctx.beginPath(); ctx.moveTo(128, 102); ctx.lineTo(119, 128); ctx.lineTo(137, 130); ctx.stroke();
    ctx.lineWidth = 8; // mouth
    ctx.beginPath(); ctx.moveTo(102, 150); ctx.quadraticCurveTo(128, 170, 154, 150); ctx.stroke();
    ctx.lineWidth = 5; // jaw, so the head separates from the neck
    ctx.beginPath(); ctx.ellipse(128, 98, 58, 74, 0, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
};

// Simplified outline of India as [longitude, latitude]
const INDIA: [number, number][] = [
    [74.3, 34.8], [75.5, 37.0], [77.8, 35.5], [79.0, 34.3], [78.9, 32.5], [80.2, 30.8], [81.0, 30.1], [84.0, 28.7],
    [88.1, 27.9], [88.8, 27.3], [89.8, 26.8], [92.0, 27.0], [94.5, 29.0], [96.2, 29.4], [97.3, 28.2], [95.5, 26.6],
    [95.2, 26.0], [94.6, 24.0], [93.4, 22.7], [93.0, 21.9], [92.3, 23.0], [91.3, 23.0], [91.2, 24.2], [92.2, 24.9],
    [91.5, 25.1], [90.0, 25.2], [89.8, 26.0], [89.0, 26.3], [88.4, 26.0], [88.2, 25.0], [88.5, 24.2], [88.8, 23.5],
    [89.0, 22.5], [88.9, 21.7], [87.0, 21.5], [86.7, 20.2], [85.0, 19.3], [83.3, 17.4], [82.3, 16.5], [80.9, 15.7],
    [80.2, 13.4], [79.8, 11.0], [79.3, 10.3], [78.2, 8.9], [77.5, 8.1], [76.6, 8.9], [76.2, 9.9], [75.0, 12.0],
    [74.6, 13.5], [73.8, 15.5], [73.0, 17.5], [72.8, 19.1], [72.7, 21.0], [72.5, 21.2], [71.0, 20.8], [70.0, 21.0],
    [69.0, 22.2], [70.0, 22.8], [70.2, 23.3], [68.3, 23.6], [69.5, 24.2], [71.0, 24.5], [70.8, 25.7], [70.0, 26.2],
    [70.2, 27.9], [71.0, 28.0], [72.3, 29.2], [73.3, 29.9], [74.4, 31.0], [74.6, 32.5], [74.0, 33.7],
];

const drawIndia = (ctx: CanvasRenderingContext2D) => {
    // longitude 67.5-98, latitude 7.5-37.5, fitted into the square
    const x = (lon: number) => ((lon - 67.5) / 30.5) * 236 + 10;
    const y = (lat: number) => ((37.5 - lat) / 30) * 236 + 10;
    ctx.beginPath();
    INDIA.forEach(([lon, lat], i) => (i ? ctx.lineTo(x(lon), y(lat)) : ctx.moveTo(x(lon), y(lat))));
    ctx.closePath();
    ctx.fill();
};

const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const left = 36, size = 184, cell = size / 6;
    ctx.lineWidth = 3;
    for (let i = 0; i <= 6; i++) {
        ctx.beginPath(); ctx.moveTo(left + i * cell, left); ctx.lineTo(left + i * cell, left + size); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(left, left + i * cell); ctx.lineTo(left + size, left + i * cell); ctx.stroke();
    }
    for (const [c, r] of [[0, 1], [1, 3], [2, 0], [3, 4], [4, 2], [5, 5], [2, 5]]) {
        ctx.fillRect(left + c * cell + 4, left + r * cell + 4, cell - 8, cell - 8);
    }
};

const drawWave = (ctx: CanvasRenderingContext2D) => {
    const heights = [34, 64, 104, 148, 96, 172, 118, 196, 128, 160, 88, 120, 62, 36];
    ctx.lineWidth = 9;
    heights.forEach((h, i) => {
        const x = 24 + i * 16.5;
        ctx.beginPath(); ctx.moveTo(x, 128 - h / 2); ctx.lineTo(x, 128 + h / 2); ctx.stroke();
    });
};

function mulberry32(seed: number) {
    return () => {
        seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// One point set per shape, in the same order as SHAPE_NAMES
function buildShapes(count: number, rand: Rand) {
    return [
        sampleRandom(drawQuestion, count, rand),
        sampleRandom(drawFace, count, rand),
        sampleCube(count, rand),
        sampleDotMatrix(drawIndia, count, rand, 4),
        sampleRandom(drawGrid, count, rand),
        sampleRandom(drawWave, count, rand),
    ];
}

function buildGeometry(count: number, first: Float32Array) {
    const rand = mulberry32(11);
    const scatter = new Float32Array(count * 2);
    const rnd = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
        scatter[i * 2] = rand() - 0.5;
        scatter[i * 2 + 1] = rand() - 0.5;
        for (let k = 0; k < 4; k++) rnd[i * 4 + k] = rand();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 2));
    geo.setAttribute("aTargetA", new THREE.BufferAttribute(first.slice(), 3));
    geo.setAttribute("aTargetB", new THREE.BufferAttribute(first.slice(), 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);
    return geo;
}

type Group = { el: HTMLElement; items: HTMLElement[] };
type Registry = { groups: Group[]; chaos: { section: HTMLElement; to: HTMLElement } | null };
let registry: Registry | null = null;

function scan(): Registry {
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-particle-group]"))
        .map((el) => ({ el, items: Array.from(el.querySelectorAll<HTMLElement>("[data-particle-shape]")) }))
        .filter((g) => g.items.length);
    const section = document.querySelector<HTMLElement>("[data-particle-chaos]");
    const to = section?.querySelector<HTMLElement>("[data-particle-shape]") ?? null;
    registry = { groups, chaos: section && to ? { section, to } : null };
    return registry;
}

// the marked elements are found once and only looked up again if one has been removed from the page
function getRegistry(): Registry {
    const r = registry;
    if (r && r.groups.every((g) => g.el.isConnected) && (!r.chaos || r.chaos.section.isConnected)) return r;
    return scan();
}

const centreY = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2;
};

// Which element is up as a group scrolls past. A group with several items is walked through item
// by item as it travels from the lower part of the screen to the upper part; a group with one item
// is active while that item is in the middle of the screen.
function pickScrollTarget(): HTMLElement | null {
    const vh = window.innerHeight;
    for (const { el: group, items } of getRegistry().groups) {
        if (items.length === 1) {
            const mid = centreY(items[0]);
            if (mid > vh * 0.12 && mid < vh * 0.88) return items[0];
            continue;
        }
        const r = group.getBoundingClientRect();
        const p = (vh * 0.85 - r.top) / (vh * 0.75 + r.height);
        if (p <= 0 || p >= 1) continue;
        // item k is centred at p = (k + 0.5) / n, so the nearest item is the one the walk is on
        return items[Math.min(items.length - 1, Math.max(0, Math.round(p * items.length - 0.5)))];
    }
    return null;
}

// While a group's walk is between two of its items, the swarm is tied to the scroll: it holds on an
// item for a stretch, then moves to the next one as you scroll, so a quick scroll can never skip a shape.
function pickWalk(): { from: HTMLElement; to: HTMLElement; t: number } | null {
    const vh = window.innerHeight;
    for (const { el: group, items } of getRegistry().groups) {
        const n = items.length;
        if (n < 2) continue;
        const r = group.getBoundingClientRect();
        const p = (vh * 0.85 - r.top) / (vh * 0.75 + r.height);
        if (p <= 0 || p >= 1) continue;
        const x = p * n - 0.5;
        if (x <= 0 || x >= n - 1) return null;
        const k = Math.floor(x);
        const t = Math.min(1, Math.max(0, (x - k - 0.2) / 0.6));
        if (t <= 0 || t >= 1) return null;
        return { from: items[k], to: items[k + 1], t: t * t * (3 - 2 * t) };
    }
    return null;
}

// Between two groups far apart on the page, the swarm travels down with the scroll: it leaves the last
// card of one group and arrives at the first card of the next. `t` runs 0 -> 1 over that scroll distance,
// which keeps the swarm moving down the screen while both cards scroll up.
function pickFlow(): { from: HTMLElement; to: HTMLElement; t: number } | null {
    const vh = window.innerHeight;
    const { groups } = getRegistry();
    for (let i = 0; i < groups.length - 1; i++) {
        const from = groups[i].items[groups[i].items.length - 1];
        const to = groups[i + 1].items[0];
        const yA = centreY(from);
        const yB = centreY(to);
        if (yB - yA < vh * 0.6) continue;
        const yStart = vh * 0.3; // where the first card sits when its shape is up
        const yEnd = vh * 0.88; // where the next card sits when its shape starts
        const span = yB + yStart - yA - yEnd;
        if (span <= 0) continue;
        const t = (yStart - yA) / span;
        if (t > 0.002 && t < 0.998) return { from, to, t };
    }
    return null;
}

// The opening scatter: points drift across a [data-particle-chaos] section and are pulled into the
// shape of its marked item as that item scrolls from the lower part of the screen to the middle.
function pickChaos(): { from: HTMLElement; to: HTMLElement; t: number } | null {
    const { chaos } = getRegistry();
    if (!chaos) return null;
    const vh = window.innerHeight;
    const sr = chaos.section.getBoundingClientRect();
    if (sr.bottom < 0 || sr.top > vh) return null;
    const x = Math.min(1, Math.max(0, (vh * 0.8 - centreY(chaos.to)) / (vh * 0.35)));
    const t = x * x * (3 - 2 * x);
    return t >= 1 ? null : { from: chaos.section, to: chaos.to, t };
}

const shapeOf = (el: HTMLElement | null) => (el ? SHAPE_INDEX[el.dataset.particleShape ?? ""] ?? -1 : -1);

// Where a shape sits for an element, in CSS pixels from the screen centre (y up)
function place(el: HTMLElement, shape: number, screen: { width: number; height: number }) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2 - screen.width / 2;
    const cy = screen.height / 2 - (r.top + r.height / 2);
    // shapes sit behind the card text, so they are large and dimmed to keep the text readable
    let scale = Math.min(r.height * 1.25, r.width * 1.1);
    let x = cx;
    let opacity = 0.6;
    // the face, and any element marked data-particle-side, gets the empty space beside it when there is room
    if (shape === SHAPE_INDEX.face || el.dataset.particleSide !== undefined) {
        const room = screen.width - r.right - 48;
        if (room > 300) {
            scale = Math.min(screen.height * (shape === SHAPE_INDEX.face ? 0.85 : 0.7), room, 640);
            x = r.right + 24 + scale / 2 - screen.width / 2;
            opacity = 1;
        } else if (shape === SHAPE_INDEX.face) {
            scale = r.height * 1.1;
            opacity = 0.5;
        } else {
            // no room beside it (phones): the shape sits centred behind the content, faint
            scale = Math.min(screen.width * 0.8, screen.height * 0.55);
            x = 0;
            opacity = 0.35;
        }
    }
    return { x, y: cy, scale, opacity, w: r.width, h: r.height };
}

// how much the swarm thins out mid-flight, and how far each point curves off the straight path
const STYLE_CHAOS = { dim: 0, arc: 0.5 };
const STYLE_WALK = { dim: 0.15, arc: 0.3 };
const STYLE_FLOW = { dim: 0.4, arc: 0.12 };

// A first guess at what the device can take. Every device draws at up to 60fps; phones get a smaller
// point budget than desktops, and weaker ones start at half of it. The real frame times then adjust it.
function deviceTier() {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const coarse = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const weak = (nav.hardwareConcurrency || 4) <= 4 || (nav.deviceMemory ?? 4) <= 3; // memory is not reported on iOS
    return { coarse, weak, max: coarse ? 3600 : 5000, start: weak ? 0.5 : 1, dpr: coarse ? (weak ? 1 : 1.5) : 1.75 };
}
const MIN_QUALITY = 0.35; // never fewer than this share of the points
// the 3D head needs a model download and a decoder, so skip it when the visitor asked to save data
const savesData = () => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    return !!c && (!!c.saveData || /(^|-)2g$/.test(c.effectiveType ?? ""));
};

type FieldProps = {
    hovered: React.MutableRefObject<HTMLElement | null>;
    running: boolean;
    loadHead: React.MutableRefObject<(() => void) | null>;
    headWanted: React.MutableRefObject<boolean>;
    onIdle: () => void;
};

function Field({ hovered, running, loadHead, headWanted, onIdle }: FieldProps) {
    const [tier] = useState(deviceTier);
    const count = tier.max;
    const invalidate = useThree((st) => st.invalidate);

    // the canvas only draws when asked: at most 60 times a second (also on 120Hz screens), and not at all when idle
    useEffect(() => {
        if (!running) return;
        let raf = 0;
        let last = 0;
        const tick = (now: number) => {
            raf = requestAnimationFrame(tick);
            if (now - last >= 15) { last = now; invalidate(); }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [running, invalidate]);
    const shapes = useMemo(() => buildShapes(count, mulberry32(5)), [count]);
    const geometry = useMemo(() => buildGeometry(count, shapes[0]), [count, shapes]);

    // Share of the points that are drawn. The points are in random order, so any share is an even spread.
    // If frames run long the share drops; it climbs back when there is room, but never past a level that failed.
    const quality = useRef(tier.start);
    const ceiling = useRef(1);
    const frameMs = useRef(16.7);
    const sinceAdjust = useRef(0);
    const warmup = useRef(0);
    useEffect(() => { geometry.setDrawRange(0, Math.round(count * quality.current)); }, [geometry, count]);
    useEffect(() => { if (running) { warmup.current = 0; frameMs.current = 16.7; } }, [running]);
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uTime: { value: 0 },
                    uVisible: { value: 0 },
                    uMorph: { value: 0 },
                    uDpr: { value: 1 },
                    uCamZ: { value: 1000 },
                    uOpacity: { value: 1 },
                    uArc: { value: 0.5 },
                    uAScatter: { value: 1 },
                    uASpin: { value: 0 },
                    uBSpin: { value: 0 },
                    uAScale: { value: 300 },
                    uBScale: { value: 300 },
                    uAPos: { value: new THREE.Vector2() },
                    uASpread: { value: new THREE.Vector2(300, 300) },
                    uBPos: { value: new THREE.Vector2() },
                },
            }),
        [],
    );
    useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

    // A is where the points are coming from, B where they are heading
    const A = useRef<{ el: HTMLElement | null; shape: number; scatter: boolean }>({ el: null, shape: 0, scatter: true });
    const B = useRef<{ el: HTMLElement | null; shape: number }>({ el: null, shape: 0 });
    const visible = useRef(0);
    const morph = useRef(1);
    const flowing = useRef(false);
    const flowT = useRef(0);
    const flowStyle = useRef(STYLE_FLOW);

    // swap the flat face for the 3D head model once it has loaded; asked for when the face is near
    useEffect(() => {
        let started = false;
        let cancelled = false;
        let draco: DRACOLoader | null = null;
        const load = () => {
            if (started || cancelled || savesData()) return;
            started = true;
            draco = new DRACOLoader();
            draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
            const loader = new GLTFLoader();
            loader.setDRACOLoader(draco);
            loader.load(
                HEAD_MODEL,
                (gltf) => {
                    draco?.dispose();
                    if (cancelled) return;
                    let mesh: THREE.Mesh | null = null;
                    gltf.scene.traverse((o) => { if (!mesh && (o as THREE.Mesh).isMesh) mesh = o as THREE.Mesh; });
                    if (!mesh) return;
                    const head = sampleMesh((mesh as THREE.Mesh).geometry, count, mulberry32(21));
                    (mesh as THREE.Mesh).geometry.dispose();
                    shapes[SHAPE_INDEX.face] = head;
                    const show = (ref: { shape: number }, attr: THREE.BufferAttribute) => {
                        if (ref.shape !== SHAPE_INDEX.face) return;
                        (attr.array as Float32Array).set(head);
                        attr.needsUpdate = true;
                    };
                    show(B.current, geometry.getAttribute("aTargetB") as THREE.BufferAttribute);
                    if (!A.current.scatter) show(A.current, geometry.getAttribute("aTargetA") as THREE.BufferAttribute);
                },
                undefined,
                () => { /* the model could not load: the flat face stays */ },
            );
        };
        loadHead.current = load;
        if (headWanted.current) load();
        return () => { cancelled = true; loadHead.current = null; draco?.dispose(); };
    }, [count, geometry, shapes, loadHead, headWanted]);

    useFrame((state, delta) => {
        const { size, camera, gl, clock } = state;
        const u = material.uniforms;
        const dt = Math.min(delta, 0.05);

        // adapt the point count to the frame time (skipping the first frames after a start, and stalls such as a hidden tab)
        if (warmup.current < 20) warmup.current++;
        else if (delta < 0.1) {
            frameMs.current += (delta * 1000 - frameMs.current) * 0.1;
            sinceAdjust.current += delta;
            if (frameMs.current > 24 && sinceAdjust.current > 1 && quality.current > MIN_QUALITY) {
                ceiling.current = Math.max(MIN_QUALITY, quality.current * 0.95);
                quality.current = Math.max(MIN_QUALITY, quality.current * 0.75);
                geometry.setDrawRange(0, Math.round(count * quality.current));
                sinceAdjust.current = 0;
                frameMs.current = 16.7;
            } else if (frameMs.current < 18.5 && sinceAdjust.current > 4 && quality.current < ceiling.current) {
                quality.current = Math.min(ceiling.current, quality.current * 1.15);
                geometry.setDrawRange(0, Math.round(count * quality.current));
                sinceAdjust.current = 0;
            }
        }

        if (hovered.current && !hovered.current.isConnected) hovered.current = null;
        const tA = geometry.getAttribute("aTargetA") as THREE.BufferAttribute;
        const tB = geometry.getAttribute("aTargetB") as THREE.BufferAttribute;
        const setA = (el: HTMLElement, shape: number, scatter: boolean) => {
            A.current = { el, shape, scatter };
            if (!scatter) { (tA.array as Float32Array).set(shapes[shape]); tA.needsUpdate = true; }
        };
        const setB = (el: HTMLElement, shape: number) => {
            B.current = { el, shape };
            (tB.array as Float32Array).set(shapes[shape]);
            tB.needsUpdate = true;
        };

        const walk = hovered.current ? null : pickWalk();
        const flow = hovered.current || walk ? null : pickFlow();
        const chaos = hovered.current || walk || flow ? null : pickChaos();
        const pair = walk ?? flow ?? chaos;
        let el: HTMLElement | null;
        let want: number;
        if (pair && (chaos || !(A.current.scatter && morph.current < 1))) {
            // scroll-linked flight: from the opening scatter into a shape, between a group's items, or from
            // one section's last card to the next section's first
            const to = shapeOf(pair.to);
            if (chaos) {
                if (!A.current.scatter || A.current.el !== chaos.from || B.current.el !== chaos.to) {
                    setA(chaos.from, to, true);
                    setB(chaos.to, to);
                }
            } else if (A.current.el !== pair.from || A.current.scatter || B.current.el !== pair.to) {
                setA(pair.from, shapeOf(pair.from), false);
                setB(pair.to, to);
            }
            morph.current = flowT.current = pair.t;
            flowing.current = true;
            flowStyle.current = chaos ? STYLE_CHAOS : walk ? STYLE_WALK : STYLE_FLOW;
            el = pair.to;
            want = to;
        } else {
            if (flowing.current) {
                // the flight ended: settle on whichever end it stopped at
                flowing.current = false;
                const end = flowT.current < 0.5 ? A.current : B.current;
                if (end.el && !(end === A.current && A.current.scatter)) { setA(end.el, end.shape, false); setB(end.el, end.shape); }
                morph.current = 1;
            }
            el = hovered.current ?? pickScrollTarget();
            want = shapeOf(el);

            // a new target: fly from wherever the points are now, or gather from scatter if nothing is showing
            if (el && want >= 0 && el !== B.current.el) {
                if (visible.current > 0.05 && B.current.el) {
                    if (morph.current >= 0.5 || A.current.scatter) setA(B.current.el, B.current.shape, false);
                } else {
                    setA(el, want, true);
                }
                setB(el, want);
                morph.current = 0;
            }
            morph.current = Math.min(1, morph.current + dt / 1.4);
        }

        const goal = el && want >= 0 ? 1 : 0;
        visible.current = THREE.MathUtils.damp(visible.current, goal, goal ? 5 : 6, dt);

        if (goal === 0 && visible.current < 0.003) {
            visible.current = 0;
            u.uVisible.value = 0;
            B.current = { el: null, shape: B.current.shape };
            onIdle();
            return;
        }

        const camZ = size.height / 2 / Math.tan((FOV * Math.PI) / 360);
        camera.position.z = camZ;
        u.uCamZ.value = camZ;
        u.uDpr.value = gl.getPixelRatio();
        u.uTime.value = clock.elapsedTime;
        u.uVisible.value = visible.current;
        u.uMorph.value = morph.current;

        // both ends follow their elements, which keep moving while the page scrolls
        let opacityB = 0.6;
        let opacityA = 0.6;
        if (B.current.el?.isConnected) {
            const pb = place(B.current.el, B.current.shape, size);
            u.uBPos.value.set(pb.x, pb.y);
            u.uBScale.value = pb.scale;
            u.uBSpin.value = spinOf(B.current.shape);
            opacityB = pb.opacity;
        }
        u.uAScatter.value = A.current.scatter ? 1 : 0;
        if (A.current.el?.isConnected) {
            const pa = place(A.current.el, A.current.shape, size);
            u.uAPos.value.set(pa.x, pa.y);
            u.uAScale.value = pa.scale;
            u.uASpread.value.set(pa.w, pa.h);
            u.uASpin.value = spinOf(A.current.shape);
            opacityA = A.current.scatter ? opacityB : pa.opacity;
        }
        // mid-flight the swarm thins out and arcs less, so it does not cover the text it passes
        const flightDim = flowing.current ? 1 - flowStyle.current.dim * Math.sin(Math.PI * morph.current) : 1;
        u.uOpacity.value = (opacityA + (opacityB - opacityA) * morph.current) * flightDim;
        u.uArc.value = flowing.current ? flowStyle.current.arc : 0.5;
    });

    return <points geometry={geometry} material={material} frustumCulled={false} />;
}

const HoverShapes = () => {
    const hovered = useRef<HTMLElement | null>(null);
    const [running, setRunning] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const loadHead = useRef<(() => void) | null>(null);
    const headWanted = useRef(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setEnabled(true);
        scan();

        // fetch the 3D head only once a face target is within a couple of screens of the viewport
        let faceWatch: IntersectionObserver | null = null;
        const faces = Array.from(document.querySelectorAll("[data-particle-shape=\"face\"]"));
        if (faces.length && "IntersectionObserver" in window) {
            faceWatch = new IntersectionObserver((entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                headWanted.current = true;
                loadHead.current?.();
                faceWatch?.disconnect();
            }, { rootMargin: "250% 0px" });
            faces.forEach((f) => faceWatch!.observe(f));
        }

        const shapeUnder = (x: number, y: number) =>
            (document.elementFromPoint(x, y)?.closest("[data-particle-shape]") as HTMLElement | null) ?? null;
        const inGroup = (el: HTMLElement | null) => !!el?.closest("[data-particle-group]");
        const point = { x: -1, y: -1 };

        // Hover follows real mouse movement only. After a scroll the browser re-fires hover for the
        // card now under a resting pointer; that must not fight the scroll-driven shapes.
        let moveRaf = 0;
        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            point.x = e.clientX;
            point.y = e.clientY;
            if (!(e.movementX || e.movementY) || moveRaf) return;
            moveRaf = requestAnimationFrame(() => {
                moveRaf = 0;
                const el = shapeUnder(point.x, point.y);
                if (el === hovered.current) return;
                hovered.current = el;
                if (el) setRunning(true);
            });
        };
        // touch has no hover: a tap works on items that are not part of a scrolling group
        const onDown = (e: PointerEvent) => {
            if (e.pointerType !== "touch") return;
            const el = shapeUnder(e.clientX, e.clientY);
            hovered.current = inGroup(el) ? null : el;
            if (hovered.current) setRunning(true);
        };
        const onLeave = () => { hovered.current = null; };

        let scrollRaf = 0;
        const onScroll = () => {
            if (scrollRaf) return;
            scrollRaf = requestAnimationFrame(() => {
                scrollRaf = 0;
                // whatever now sits under the pointer: group items yield to the scroll-driven walk
                if (hovered.current && point.x >= 0) {
                    const el = shapeUnder(point.x, point.y);
                    hovered.current = inGroup(el) ? null : el;
                } else if (hovered.current) {
                    hovered.current = null;
                }
                if (hovered.current || pickScrollTarget() || pickWalk() || pickFlow() || pickChaos()) setRunning(true);
            });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        onScroll();
        return () => {
            faceWatch?.disconnect();
            cancelAnimationFrame(moveRaf);
            cancelAnimationFrame(scrollRaf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("scroll", onScroll);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    if (!enabled) return null;

    return (
        <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden="true">
            <Canvas
                frameloop="demand"
                dpr={[1, deviceTier().dpr]}
                gl={{ alpha: true, antialias: false }}
                camera={{ fov: FOV, near: 10, far: 6000, position: [0, 0, 1000] }}
            >
                <Field hovered={hovered} running={running} loadHead={loadHead} headWanted={headWanted} onIdle={() => setRunning(false)} />
            </Canvas>
        </div>
    );
};

export default HoverShapes;
