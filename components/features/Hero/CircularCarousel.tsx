"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductItem } from "./ProductData";

interface CircularCarouselProps {
  products: ProductItem[];
  activeProductIdx: number;
  setActiveProductIdx: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CircularCarousel({
  products,
  activeProductIdx,
  setActiveProductIdx,
  onPrev,
  onNext
}: CircularCarouselProps) {
  // Reduced radius of the circle dial path to fit laptop viewports cleanly
  const radius = 100;
  
  // Angle spacing for 5 items equally distributed (72 degrees each)
  const angleStep = 360 / products.length;
  
  // Calculate rotation angle to align active thumbnail at the left edge (180 degrees)
  const rotationAngle = -activeProductIdx * angleStep + 180;

  return (
    <div className="relative w-full max-w-[260px] h-[300px] flex flex-col items-center justify-center select-none pointer-events-auto">
      
      {/* Dynamic CSS keyframes for infinite neon spinning and track animations */}
      <style>{`
        @keyframes spinTrack {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-track {
          animation: spinTrack 15s linear infinite;
        }
      `}</style>

      {/* 1. DESKTOP CIRCULAR Menus - Hide on Mobile */}
      <div className="hidden sm:flex relative w-[220px] h-[220px] items-center justify-center overflow-visible">
        
        {/* Infinite Spinning Glowing Neon Track Circle */}
        <div 
          className="absolute w-[200px] h-[200px] rounded-full border-[2px] border-dashed border-white/10 animate-spin-track"
          style={{
            borderColor: products[activeProductIdx].accent,
            boxShadow: `0 0 15px ${products[activeProductIdx].accent}22`,
            transition: "border-color 1s ease-in-out, box-shadow 1s ease-in-out"
          }}
        />

        {/* Rotating Circular Container (Orbit Track) */}
        <motion.div
          animate={{ rotate: rotationAngle }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center"
        >
          {products.map((prod, idx) => {
            // Position items equally around the ring
            const angleInRad = ((idx * angleStep) * Math.PI) / 180;
            const x = radius * Math.cos(angleInRad);
            const y = radius * Math.sin(angleInRad);
            
            const isActive = activeProductIdx === idx;

            // Avoid hydration mismatch by using explicit, rounded pixel coordinates relative to the 200px track center (100px)
            const leftVal = (100 + x - 26).toFixed(3);
            const topVal = (100 + y - 26).toFixed(3);

            return (
              <button
                key={prod.id}
                onClick={() => setActiveProductIdx(idx)}
                className="absolute w-13 h-13 rounded-full overflow-hidden border bg-zinc-950/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:border-white/30"
                style={{
                  left: `${leftVal}px`,
                  top: `${topVal}px`,
                  borderColor: isActive ? prod.accent : "rgba(63, 63, 70, 0.4)",
                  boxShadow: isActive ? `0 0 12px ${prod.accent}` : "none"
                }}
              >
                {/* Counter-rotate content so the sneaker thumbnail remains perfectly upright */}
                <motion.div
                  animate={{ rotate: -rotationAngle }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center p-1"
                >
                  <img
                    src={prod.colors[0].img}
                    alt={prod.name}
                    className={cn(
                      "max-w-[90%] max-h-[90%] object-contain rotate-[-15deg] transition-all duration-300",
                      isActive ? "scale-110 drop-shadow-md" : "scale-90 opacity-70"
                    )}
                  />
                </motion.div>
              </button>
            );
          })}
        </motion.div>

        {/* Circular indicator highlight on the active (left 180 degree) position (center 100px minus 18px offset) */}
        <div 
          className="absolute left-[-18px] top-[82px] w-9 h-9 rounded-full border-2 bg-transparent pointer-events-none transition-all duration-700"
          style={{
            borderColor: products[activeProductIdx].accent,
            boxShadow: `0 0 10px ${products[activeProductIdx].accent}`,
          }}
        />

        {/* Previous Navigation Button (floating left of the circle dial) */}
        <button
          onClick={onPrev}
          className="absolute left-[-55px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-550 flex items-center justify-center text-white cursor-pointer shadow-md transition-all hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next Navigation Button (floating right of the circle dial) */}
        <button
          onClick={onNext}
          className="absolute right-[-55px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-550 flex items-center justify-center text-white cursor-pointer shadow-md transition-all hover:scale-110"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* 2. RESPONSIVE MOBILE HORIZONTAL LIST MENU - Hide on Desktop */}
      <div className="flex sm:hidden items-center justify-center gap-3 py-3 w-full">
        {products.map((prod, idx) => {
          const isActive = activeProductIdx === idx;
          return (
            <button
              key={prod.id}
              onClick={() => setActiveProductIdx(idx)}
              className={cn(
                "w-13 h-13 rounded-xl border p-1 bg-zinc-900/60 backdrop-blur-md overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center",
                isActive
                  ? "scale-105 shadow"
                  : "border-zinc-850 opacity-60"
              )}
              style={{
                borderColor: isActive ? prod.accent : "rgba(63, 63, 70, 0.4)",
                boxShadow: isActive ? `0 0 10px ${prod.accent}44` : "none"
              }}
            >
              <img
                src={prod.colors[0].img}
                alt={prod.name}
                className="max-w-[90%] max-h-[90%] object-contain rotate-[-10deg]"
              />
            </button>
          );
        })}
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export default CircularCarousel;
