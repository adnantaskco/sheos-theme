"use client";
import React, { useEffect, useRef } from 'react';

export default function XRayRevealHero() {
  // সঠিক HTML Element টাইপগুলো যুক্ত করা হয়েছে
  const containerRef = useRef<HTMLElement | null>(null);
  const topLayerRef = useRef<HTMLImageElement | null>(null);
  const scannerRingRef = useRef<HTMLDivElement | null>(null);

  const OUTER_IMAGE_URL =
    'https://i.pinimg.com/1200x/4e/c9/a1/4ec9a1d713bd1715fc0ddf772c7f2f5d.jpg';
  const INNER_XRAY_IMAGE_URL =
    'https://plain-apac-prod-public.komododecks.com/202611/16/8cEiLn9tTSudKr0SnIxu/image.png';

  useEffect(() => {
    const container = containerRef.current;
    const topLayer = topLayerRef.current;
    const scannerRing = scannerRingRef.current;
    if (!container || !topLayer || !scannerRing) return;

    let animationFrameId: number;
    let isUserInteracting = false;
    let idleTime = 0;

    let bounds = container.getBoundingClientRect();
    const current = { x: bounds.width * 0.5, y: bounds.height * 0.5 };
    const target = { x: bounds.width * 0.5, y: bounds.height * 0.5 };

    const getScannerRadius = () => {
      const minDim = Math.min(bounds.width, bounds.height);
      return Math.max(100, Math.min(220, minDim * 0.24));
    };

    let radius = getScannerRadius();

    const updateScannerRingSize = () => {
      bounds = container.getBoundingClientRect();
      radius = getScannerRadius();
      scannerRing.style.width = `${radius * 2}px`;
      scannerRing.style.height = `${radius * 2}px`;
    };

    updateScannerRingSize();

    const onPointerMove = (e: PointerEvent) => {
      isUserInteracting = true;
      target.x = e.clientX - bounds.left;
      target.y = e.clientY - bounds.top;
    };

    const onPointerLeave = () => {
      isUserInteracting = false;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', updateScannerRingSize, { passive: true });

    const renderLoop = () => {
      if (!isUserInteracting) {
        idleTime += 0.016;
        target.x = bounds.width * 0.5 + Math.cos(idleTime * 1.1) * (bounds.width * 0.24);
        target.y = bounds.height * 0.5 + Math.sin(idleTime * 1.7) * (bounds.height * 0.16);
      }

      const ease = 0.14;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      const maskValue = `radial-gradient(circle ${radius}px at ${current.x.toFixed(2)}px ${current.y.toFixed(2)}px, transparent 0%, transparent 72%, rgba(0,0,0,0.45) 88%, black 100%)`;
      topLayer.style.maskImage = maskValue;
      (topLayer.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = maskValue;

      scannerRing.style.transform = `translate3d(${(current.x - radius).toFixed(2)}px, ${(current.y - radius).toFixed(2)}px, 0)`;

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', updateScannerRingSize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-950 select-none cursor-crosshair touch-none"
    >
      <img
        src={INNER_XRAY_IMAGE_URL}
        alt="X-Ray Inner Layer"
        draggable={false}
        style={{
          filter: 'invert(1) hue-rotate(180deg) contrast(1.5) saturate(2) brightness(0.95)',
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />

      <img
        ref={topLayerRef}
        src={OUTER_IMAGE_URL}
        alt="Outer Surface Layer"
        draggable={false}
        style={{
          maskImage: 'radial-gradient(circle 150px at 50% 50%, transparent 0%, transparent 72%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle 150px at 50% 50%, transparent 0%, transparent 72%, black 100%)',
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center will-change-[mask-image]"
      />

      <div
        ref={scannerRingRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full border border-cyan-300/65 shadow-[0_0_32px_rgba(34,211,238,0.45),inset_0_0_24px_rgba(34,211,238,0.25)] will-change-transform"
      />
    </section>
  );
}