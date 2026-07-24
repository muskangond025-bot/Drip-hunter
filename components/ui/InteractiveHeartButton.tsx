"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InteractiveHeartButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md";
  plain?: boolean;
}

export function InteractiveHeartButton({
  isFavorite,
  onClick,
  className,
  size = "sm",
  plain = false
}: InteractiveHeartButtonProps) {
  const isSm = size === "sm";
  const [triggerExplosion, setTriggerExplosion] = useState(false);

  // Play animation sparks/bubbles on toggle to active state (favorited)
  useEffect(() => {
    if (isFavorite) {
      setTriggerExplosion(true);
      const timer = setTimeout(() => setTriggerExplosion(false), 1400);
      return () => clearTimeout(timer);
    } else {
      setTriggerExplosion(false);
    }
  }, [isFavorite]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center cursor-pointer transition-all duration-300 outline-none select-none group border-none bg-transparent active:scale-75",
        plain
          ? "w-auto h-auto p-0"
          : (isSm 
              ? "w-7.5 h-7.5 rounded-full bg-white/90 hover:bg-white shadow-xs" 
              : "w-10 h-10 rounded-full bg-white hover:bg-zinc-50 shadow-md"),
        className
      )}
    >
      {/* Background ring scaling effect */}
      <span className={cn(
        "absolute inset-0 rounded-full border border-[#ff2e56] scale-0 pointer-events-none opacity-0 z-0",
        triggerExplosion && "animate-heart-ring"
      )} />

      {/* Floating mini hearts and sparkles */}
      {triggerExplosion && (
        <span className="absolute inset-0 pointer-events-none z-0">
          {/* Floating sway bubbles */}
          <span className="absolute left-[15%] top-[-15%] text-[#ff2e56] text-[10px] animate-heart-bubble-1 opacity-0 select-none">❤️</span>
          <span className="absolute right-[10%] top-[-25%] text-[#ff5a79] text-[8px] animate-heart-bubble-2 opacity-0 select-none">💖</span>
          <span className="absolute left-[-15%] top-[30%] text-[#ff2e56] text-[9px] animate-heart-bubble-3 opacity-0 select-none">❤️</span>
          <span className="absolute right-[-20%] top-[25%] text-[#ff5a79] text-[10px] animate-heart-bubble-4 opacity-0 select-none">💕</span>
          
          {/* Confetti spark lines radiating from center */}
          <span className="absolute left-[50%] top-[50%] w-1.5 h-1.5 bg-[#ff2e56] rounded-full animate-heart-spark-1 opacity-0" />
          <span className="absolute left-[50%] top-[50%] w-1.5 h-1.5 bg-[#ebd26b] rounded-full animate-heart-spark-2 opacity-0" />
          <span className="absolute left-[50%] top-[50%] w-1 h-1 bg-[#ff5a79] rounded-full animate-heart-spark-3 opacity-0" />
          <span className="absolute left-[50%] top-[50%] w-1 h-1 bg-[#3b82f6] rounded-full animate-heart-spark-4 opacity-0" />
        </span>
      )}

      {/* Main Heart SVG */}
      <svg
        className={cn(
          "transition-all duration-300 pointer-events-none z-10",
          isSm ? "w-3.5 h-3.5" : "w-5.5 h-5.5",
          isFavorite 
            ? "fill-[#ff2e56] text-[#ff2e56] scale-110 animate-heart-pop" 
            : "fill-none text-zinc-500 group-hover:text-[#ff2e56] group-hover:scale-110"
        )}
        viewBox="0 0 24 24"
        strokeWidth="2.4"
        stroke="currentColor"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
