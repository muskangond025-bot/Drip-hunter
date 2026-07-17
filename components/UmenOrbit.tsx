"use client";

import React from "react";
import Image from "next/image";

// A collection of Unsplash headshots for our creative orbit
const headshots = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?auto=format&fit=crop&w=100&h=100&q=80"
];

export function UmenOrbit() {
  // We split headshots into inner circle (8) and outer circle (16)
  const innerCount = 8;
  const outerCount = 16;

  const innerRadius = 140; // in px for desktop
  const outerRadius = 240; // in px for desktop

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-zinc-100 flex flex-col items-center">
      <div className="relative w-full max-w-4xl h-[580px] flex items-center justify-center select-none">
        
        {/* Inject dynamic spinning keyframes */}
        <style>{`
          @keyframes spin-clockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-counter {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .animate-spin-clockwise {
            animation: spin-clockwise 30s linear infinite;
          }
          .animate-spin-counter {
            animation: spin-counter 45s linear infinite;
          }
        `}</style>

        {/* Outer Orbit Ring Grid line */}
        <div className="absolute rounded-full border border-zinc-100 w-[480px] h-[480px] pointer-events-none" />

        {/* Inner Orbit Ring Grid line */}
        <div className="absolute rounded-full border border-zinc-150 w-[280px] h-[280px] pointer-events-none" />

        {/* Center limited edition badge */}
        <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-black border-4 border-zinc-800 hover:border-yellow-400 transition-colors duration-500 flex flex-col items-center justify-center text-center p-6 z-30 shadow-2xl relative">
          <div className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
            UMEN
          </div>
          <div className="text-lg sm:text-xl font-chaney-title uppercase tracking-tight text-white my-2 leading-none">
            10% Premium Drip
          </div>
          <div className="text-[8px] font-mono tracking-widest font-black text-yellow-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full mt-2 uppercase shadow-inner">
            LIMITED EDITION
          </div>
        </div>

        {/* Inner Circle Orbit (Counter-Clockwise spin) */}
        <div className="absolute w-[280px] h-[280px] flex items-center justify-center z-10 animate-spin-counter">
          {headshots.slice(0, innerCount).map((src, idx) => {
            const angle = (idx * 2 * Math.PI) / innerCount;
            const x = Math.cos(angle) * innerRadius;
            const y = Math.sin(angle) * innerRadius;

            return (
              <div
                key={`inner-${idx}`}
                className="absolute w-10 h-10 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden hover:scale-125 transition-transform duration-300 pointer-events-auto cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${(-angle * 180) / Math.PI}deg)`,
                }}
              >
                <div className="w-full h-full relative animate-spin-clockwise">
                  <Image
                    src={src}
                    alt={`User avatar ${idx}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Circle Orbit (Clockwise spin) */}
        <div className="absolute w-[480px] h-[480px] flex items-center justify-center z-10 animate-spin-clockwise">
          {headshots.slice(innerCount, innerCount + outerCount).map((src, idx) => {
            const angle = (idx * 2 * Math.PI) / outerCount;
            const x = Math.cos(angle) * outerRadius;
            const y = Math.sin(angle) * outerRadius;

            return (
              <div
                key={`outer-${idx}`}
                className="absolute w-10 h-10 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden hover:scale-125 transition-transform duration-300 pointer-events-auto cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${(-angle * 180) / Math.PI}deg)`,
                }}
              >
                <div className="w-full h-full relative animate-spin-counter">
                  <Image
                    src={src}
                    alt={`User avatar ${idx + innerCount}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
