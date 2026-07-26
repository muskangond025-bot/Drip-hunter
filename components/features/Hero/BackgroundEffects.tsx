"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  accentColor: string;
}

export function BackgroundEffects({ accentColor }: BackgroundEffectsProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Giant Outlined Background Text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] sm:text-[230px] font-black text-transparent select-none pointer-events-none uppercase tracking-[0.15em] font-chaney-title opacity-25 z-0"
        style={{
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.08)",
        }}
      >
        DRIP
      </div>

      {/* 2. Diagonal Neon Glowing Line - Glow color dynamically adapts to active product accent */}
      <div 
        className="absolute bottom-1/4 left-[-10%] right-[-10%] h-[2.5px] rotate-[-12deg] z-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 25px ${accentColor}`,
        }}
      />

      {/* 3. Soft Splatter Radial Ambient Glow Orb - Left Center */}
      <div 
        className="absolute bottom-0 left-0 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full blur-[100px] opacity-25 transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
        }}
      />

      {/* 4. Soft Splatter Radial Ambient Glow Orb - Center Right */}
      <div 
        className="absolute top-1/4 right-0 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
        }}
      />

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-zinc-950/20 z-10" />

    </div>
  );
}
