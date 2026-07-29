"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Collection of Unsplash avatar headshots
const headshots = [
  "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
  "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
  "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
  "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
  "https://img105.savana.com/4b8e375e990c4f80ba1c1b79546897bd.webp",
  "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
  "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
  "https://img105.savana.com/b778ce7f97cc4b8dacb8fc6b3f5a2f2f.webp",
  "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
  "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
  "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
  "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
  "https://img105.savana.com/4b8e375e990c4f80ba1c1b79546897bd.webp",
  "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
  "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
  "https://img105.savana.com/b778ce7f97cc4b8dacb8fc6b3f5a2f2f.webp",
  "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
  "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp",
  "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
  "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
  "https://img105.savana.com/4b8e375e990c4f80ba1c1b79546897bd.webp",
  "https://img105.savana.com/4934e176de2f4a9eae0d137b77c9b316.webp",
  "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
  "https://img105.savana.com/b778ce7f97cc4b8dacb8fc6b3f5a2f2f.webp"
];

interface UmenOrbitProps {
  brandText?: string;
  title?: string;
  subtitle?: string;
}

export function UmenOrbit({
  brandText = "UNRL",
  title = "NFL EXPANSION DROP",
  subtitle = "LIMITED EDITION",
}: UmenOrbitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Motion value for smooth rotation
  const rotation = useMotionValue<number>(0);
  const smoothRotation = useSpring(rotation, { stiffness: 200, damping: 24 });

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);

  const getAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastAngle.current = getAngle(e.clientX, e.clientY);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const currentAngle = getAngle(e.clientX, e.clientY);
    let angleDelta = currentAngle - lastAngle.current;

    // Handle boundary crossover (-180 to 180 deg)
    if (angleDelta > 180) angleDelta -= 360;
    if (angleDelta < -180) angleDelta += 360;

    // Linear drag fallback (allows drag in any direction: X or Y movement)
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const linearDelta = (dx - dy) * 0.35;

    // Combine angular and linear drag for responsive movement in any direction
    const effectiveDelta = Math.abs(angleDelta) > 0.2 ? angleDelta : linearDelta;

    rotation.set(rotation.get() + effectiveDelta);
    lastAngle.current = currentAngle;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Dense 3-ring avatar counts (no gaps)
  const ring1Count = 14;
  const ring2Count = 26;
  const ring3Count = 38;

  const ring1Radius = 145; // in px
  const ring2Radius = 230; // in px
  const ring3Radius = 320; // in px

  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden border-t border-zinc-100 flex flex-col items-center w-full select-none relative bg-[url('/images/topography_pattern.svg')] bg-center bg-no-repeat bg-contain">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full max-w-5xl h-[680px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Static Center Black Circle Badge */}
        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-black border-4 border-zinc-900 flex flex-col items-center justify-center text-center p-6 z-30 shadow-2xl relative text-white shrink-0 pointer-events-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            <span className="font-black text-sm sm:text-base tracking-widest">{brandText}</span>
            <span className="text-zinc-500 font-light text-xs">×</span>
            <span className="font-semibold text-xs sm:text-xs tracking-wider text-zinc-200">{title}</span>
          </div>

          <div className="w-4/5 h-[1px] bg-zinc-600/70 my-3" />

          <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] font-extrabold text-zinc-300 uppercase">
            {subtitle}
          </div>
        </div>

        {/* Topography & Orbit Constellation Radial Axis Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[640px] h-[1px] bg-zinc-200" />
          <div className="w-[640px] h-[1px] bg-zinc-200 rotate-45 absolute" />
          <div className="w-[640px] h-[1px] bg-zinc-200 rotate-90 absolute" />
          <div className="w-[640px] h-[1px] bg-zinc-200 rotate-135 absolute" />
        </div>

        {/* Orbit Grid Line Circles (Static + Dashed Constellation Layers) */}
        <div className="absolute rounded-full border border-zinc-200/80 w-[290px] h-[290px] pointer-events-none" />
        <div className="absolute rounded-full border border-dashed border-zinc-200/80 w-[375px] h-[375px] pointer-events-none" />
        <div className="absolute rounded-full border border-zinc-200/80 w-[460px] h-[460px] pointer-events-none" />
        <div className="absolute rounded-full border border-dashed border-zinc-200/80 w-[550px] h-[550px] pointer-events-none" />
        <div className="absolute rounded-full border border-zinc-200/80 w-[640px] h-[640px] pointer-events-none" />

        {/* Rotatable Orbit Rings Group */}
        <motion.div
          style={{ rotate: smoothRotation }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {mounted && (
            <>
              {/* Ring 1 (Inner) */}
              <div className="absolute w-[290px] h-[290px] flex items-center justify-center">
                {Array.from({ length: ring1Count }).map((_, idx) => {
                  const src = headshots[idx % headshots.length];
                  const angle = (idx * 2 * Math.PI) / ring1Count;
                  const x = (Math.cos(angle) * ring1Radius).toFixed(2);
                  const y = (Math.sin(angle) * ring1Radius).toFixed(2);

                  return (
                    <div
                      key={`r1-${idx}`}
                      suppressHydrationWarning
                      className="absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <Image src={src} alt="Avatar" fill sizes="40px" className="object-cover" />
                    </div>
                  );
                })}
              </div>

              {/* Ring 2 (Middle) */}
              <div className="absolute w-[460px] h-[460px] flex items-center justify-center">
                {Array.from({ length: ring2Count }).map((_, idx) => {
                  const src = headshots[(idx + 3) % headshots.length];
                  const angle = (idx * 2 * Math.PI) / ring2Count;
                  const x = (Math.cos(angle) * ring2Radius).toFixed(2);
                  const y = (Math.sin(angle) * ring2Radius).toFixed(2);

                  return (
                    <div
                      key={`r2-${idx}`}
                      suppressHydrationWarning
                      className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <Image src={src} alt="Avatar" fill sizes="35px" className="object-cover" />
                    </div>
                  );
                })}
              </div>

              {/* Ring 3 (Outer) */}
              <div className="absolute w-[640px] h-[640px] flex items-center justify-center">
                {Array.from({ length: ring3Count }).map((_, idx) => {
                  const src = headshots[(idx + 7) % headshots.length];
                  const angle = (idx * 2 * Math.PI) / ring3Count;
                  const x = (Math.cos(angle) * ring3Radius).toFixed(2);
                  const y = (Math.sin(angle) * ring3Radius).toFixed(2);

                  return (
                    <div
                      key={`r3-${idx}`}
                      suppressHydrationWarning
                      className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <Image src={src} alt="Avatar" fill sizes="35px" className="object-cover" />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
