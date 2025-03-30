import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { useTheme } from 'next-themes';

const AnimatedCursor: React.FC = memo(() => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevTimeRef = useRef(performance.now());
  const { theme } = useTheme();
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Check if device is mobile
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileRef.current) {
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial setup
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0
    });

    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.7)"
    });

    const calculateVelocity = (currentX: number, currentY: number) => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - prevTimeRef.current) / 1000;
      prevTimeRef.current = currentTime;

      velocityRef.current = {
        x: Math.abs((currentX - posRef.current.x) / deltaTime),
        y: Math.abs((currentY - posRef.current.y) / deltaTime)
      };

      posRef.current = { x: currentX, y: currentY };
    };

    const updateCursorShape = () => {
      const totalVelocity = Math.sqrt(
        velocityRef.current.x * velocityRef.current.x +
        velocityRef.current.y * velocityRef.current.y
      );

      const scale = gsap.utils.clamp(0.8, 1.3, 1 + totalVelocity / 4000);
      const stretch = gsap.utils.clamp(1, 1.6, 1 + totalVelocity / 2000);

      gsap.to(cursor, {
        scaleX: scale * (velocityRef.current.x > velocityRef.current.y ? stretch : 1),
        scaleY: scale * (velocityRef.current.x > velocityRef.current.y ? 1 : stretch),
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      calculateVelocity(clientX, clientY);

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "expo.out",
        onUpdate: updateCursorShape,
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('[role="button"]')) {

        gsap.killTweensOf(cursor);

        gsap.to(cursor, {
          scale: 2,
          filter: 'invert(0)',
          duration: 0.4,
          ease: "elastic.out(1, 0.7)",
          overwrite: true
        });
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;

      const isLeavingHoverable = target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('[role="button"]');

      const isEnteringHoverable = relatedTarget?.classList.contains('cursor-hover') ||
        relatedTarget?.closest('.cursor-hover') ||
        relatedTarget?.tagName === 'BUTTON' ||
        relatedTarget?.tagName === 'A' ||
        relatedTarget?.closest('[role="button"]');

      if (isLeavingHoverable && !isEnteringHoverable) {
        gsap.killTweensOf(cursor);

        gsap.to(cursor, {
          scale: 1,
          filter: 'invert(0)',
          duration: 0.4,
          ease: "elastic.out(1, 0.7)",
          overwrite: true
        });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  // Don't render anything on mobile
  if (isMobileRef.current) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '28px',
        height: '28px',
        backgroundColor: theme === 'dark' ? 'var(--custom-gray-light)' : 'var(--custom-gray)',
        backdropFilter: 'blur(1px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        willChange: 'transform, filter',
        transition: 'background-color 0.3s ease',
        filter: 'invert(0)',
        display: isMobileRef.current ? 'none' : 'block' // Additional safety measure
      }}
    />
  );
});

AnimatedCursor.displayName = 'AnimatedCursor';

export default AnimatedCursor;