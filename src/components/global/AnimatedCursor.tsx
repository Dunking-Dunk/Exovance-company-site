"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export interface BlobCursorProps {
  // legacy props kept for API compatibility — not used in new implementation
  blobType?: string;
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

/**
 * Minimal dot + ring cursor — matches the dark glass/space aesthetic.
 *
 * • Sharp 5px white dot: snaps to cursor instantly (no lag)
 * • 32px ring: silver-blue border, follows with a smooth 0.18s delay
 * • Subtle glow on both elements via box-shadow
 */
export default function BlobCursor({ zIndex = 100 }: BlobCursorProps) {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    // Hide native cursor across the whole page
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Dot — instant
      gsap.set(dotRef.current, { x, y });

      // Ring — smooth follow
      gsap.to(ringRef.current, {
        x,
        y,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const onEnter = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
    };

    // Scale ring up on clickable elements
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isClickable = el.closest('a, button, [role="button"], input, textarea, select, label');
      gsap.to(ringRef.current, {
        scale: isClickable ? 1.6 : 1,
        borderColor: isClickable ? "rgba(180,100,255,0.85)" : "rgba(150,80,255,0.50)",
        duration: 0.25,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none"
      style={{ zIndex }}
    >
      {/* Sharp dot — center point */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "rgba(232, 232, 240, 0.95)",
          boxShadow: "0 0 6px 2px rgba(150, 80, 255, 0.55)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      {/* Delayed ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(150, 80, 255, 0.50)",
          boxShadow: "0 0 10px 0px rgba(120, 0, 255, 0.20), inset 0 0 6px 0px rgba(150, 80, 255, 0.08)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
