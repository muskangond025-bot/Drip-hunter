"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSneakerProps {
  imageSrc: string;
  name: string;
  activeProductIdx: number;
  selectedColorIdx: number;
}

export function HeroSneaker({
  imageSrc,
  name,
  activeProductIdx,
  selectedColorIdx
}: HeroSneakerProps) {
  return (
    <div className="relative flex items-center justify-center min-h-[260px] sm:min-h-[320px] w-full pointer-events-auto">
      
      {/* 1. Floating Pedestal/Shadow Effect at the bottom */}
      <div 
        className="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-44 sm:w-60 h-4 rounded-full bg-black/40 blur-md pointer-events-none z-0"
        style={{
          boxShadow: "0 25px 35px rgba(0, 0, 0, 0.8)",
          transform: "scale(1.2)"
        }}
      />

      {/* 2. Floating Motion wrapper (GSAP style soft hover float) */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {/* Unique key triggers entry transition on product/color swap */}
          <motion.img
            key={`${activeProductIdx}-${selectedColorIdx}`}
            src={imageSrc}
            alt={name}
            initial={{ opacity: 0, scale: 0.78, rotate: -25 }}
            animate={{ opacity: 1, scale: 1.0, rotate: -15 }}
            exit={{ opacity: 0, scale: 0.78, rotate: -25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, rotate: -8 }}
            className="max-w-[240px] sm:max-w-[300px] md:max-w-[360px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.55)] cursor-pointer select-none"
          />
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
