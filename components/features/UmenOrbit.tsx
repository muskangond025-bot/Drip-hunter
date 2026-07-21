"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Collection of Unsplash avatar headshots
const headshots = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?auto=format&fit=crop&w=120&h=120&q=80"
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
