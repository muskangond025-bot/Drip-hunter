"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageGroupCircle } from "@/components/ui/ImageGroupCircle";

interface HeroSectionProps {
  onShopTheLook?: (category: string) => void;
  onExploreCollections?: () => void;
}

export function HeroSection({ onShopTheLook, onExploreCollections }: HeroSectionProps) {
  return (
    <section 
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center overflow-hidden py-12 lg:py-16 select-none bg-zinc-950 text-white"
    >
      {/* 1. Full-bleed background Image Group Circle covering entire hero section */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none opacity-45 sm:opacity-60">
        <ImageGroupCircle 
          rings={2}
          innerRadius={100}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* 2. Ambient Glow Orbs to blend the design premium feel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyan-500/10 blur-[100px] sm:blur-[150px] opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-pink-500/10 blur-[120px] sm:blur-[180px] opacity-40" />
      </div>

      {/* 3. Text layout content overlay (layered on top, aligned left) */}
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-16 xl:px-24 pointer-events-none">
        {/* Left Side Content - aligned to the left of the page */}
        <div className="max-w-xl space-y-6 text-white text-left pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-black tracking-widest px-4 py-2 rounded shadow-sm">
            ⚡ NEW DROP
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-chaney-title leading-[1.05] uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              URBAN DRIP 2026
            </h1>
            <h2 className="text-sm sm:text-lg font-mono text-zinc-300 font-bold tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              STREETWEAR FOR THE UNCONVENTIONAL
            </h2>
            <p className="text-white text-sm sm:text-[15px] max-w-md leading-relaxed font-sans font-semibold drop-shadow-sm bg-black/40 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/5">
              Explore our latest curation of oversized fits, bold graphics, and industrial outerwear.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onShopTheLook && onShopTheLook("Graphic Tees")}
              className="font-extrabold uppercase text-xs tracking-wider px-8 py-4.5 rounded-full flex items-center gap-2 transition-all shadow-md hover:scale-102 cursor-pointer border-none bg-white text-black hover:bg-cyan-400 hover:shadow-cyan-400/20"
            >
              Shop the Look
              <ArrowUpRight className="w-4 h-4 transition-transform" />
            </button>
            <button
              onClick={onExploreCollections}
              className="border border-zinc-800 bg-zinc-900/60 hover:border-zinc-650 hover:text-white text-zinc-300 font-extrabold uppercase text-xs tracking-wider px-8 py-4.5 rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
