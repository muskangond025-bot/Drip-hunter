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
  "https://img105.savana.com/82f87913d0814f9083297cfb44303ef9.webp",
  "https://img105.savana.com/4a98999a637a41fba333a1881f09c60c.webp",
  "https://img105.savana.com/156220e3ccb24d899323dae724a3951b.webp",
  "https://img105.savana.com/fd912543884c43c892a39219b2f63738.webp",
  "https://img105.savana.com/5e08c0285d82474ea9d0278e33deb10e.webp",
  "https://img105.savana.com/b624019e62da430f8e7c88b4f8c5aca2.webp",
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
