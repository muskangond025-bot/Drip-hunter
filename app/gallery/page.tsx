"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DraggableContainer,
  GridBody,
  GridItem,
  type variants,
} from "@/components/ui/infinite-draggable-gallery";

const galleryImages = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1618517047922-928929e06180?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
];

export default function GalleryPage() {
  const [selectedVariant, setSelectedVariant] = useState<variants>("polaroid");

  return (
    <div className="relative w-full h-dvh bg-[#141414] overflow-hidden select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl">
        {(["default", "masonry", "polaroid"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setSelectedVariant(v)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedVariant === v
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Infinite Draggable Gallery Grid */}
      <DraggableContainer variant={selectedVariant}>
        <GridBody>
          {galleryImages.map((src, idx) => (
            <GridItem key={idx}>
              <div className="relative w-36 h-48 sm:w-48 sm:h-64 bg-zinc-800 rounded-sm overflow-hidden">
                <Image
                  src={src}
                  alt={`Streetwear ${idx}`}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </div>
  );
}
