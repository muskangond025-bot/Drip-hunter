"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CollectionShowcaseProps {
  title?: string;
  heroImage?: string;
  thumbnails?: string[];
}

export function CollectionShowcase({
  title = "Name of Collection",
  heroImage = "/images/collection_hero.png",
  thumbnails = [
    "/images/collection_thumb_1.png",
    "/images/collection_thumb_2.png",
    "/images/collection_thumb_3.png",
    "/images/collection_thumb_4.png",
  ],
}: CollectionShowcaseProps) {
  const [activeImage, setActiveImage] = useState(heroImage);

  return (
    <section className="w-full space-y-6 sm:space-y-8 py-6 select-none">
      {/* Yellow Collection Header Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-[#facc15] tracking-tight">
        {title}
      </h2>

      {/* Main Grid Showcase Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch w-full">
        {/* Left Column: Large Hero Feature Card */}
        <div className="lg:col-span-9 relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-100 min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] group">
          <Image
            src={activeImage}
            alt="Collection Main Feature"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Right Column: 4 Thumbnails Stack */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3 sm:gap-4 h-full justify-between">
          {thumbnails.map((thumbSrc, idx) => {
            const isActive = activeImage === thumbSrc;

            return (
              <div
                key={idx}
                onClick={() => setActiveImage(thumbSrc)}
                className={`relative w-full aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-[128px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md border-2 cursor-pointer transition-all duration-300 transform active:scale-95 group ${
                  isActive
                    ? "border-[#facc15] ring-2 ring-[#facc15]/40 scale-[1.02]"
                    : "border-transparent hover:border-zinc-300 hover:scale-[1.01]"
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={`Collection item thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
