"use client";

import React from "react";
import Image from "next/image";

export function CollaborationsSection() {
  const bottomCards = [
    { id: 1, img: "/images/collab_bot_1.png", alt: "Barstool Golf Cap" },
    { id: 2, img: "/images/collab_bot_2.png", alt: "Barstool Sports Hoodie" },
    { id: 3, img: "/images/collab_bot_3.png", alt: "UNRL Minnesota Wild Patch" },
    { id: 4, img: "/images/collab_bot_4.png", alt: "Row The Boat Athlete Hoodie" },
  ];

  return (
    <section className="w-full py-8 space-y-6 select-none">
      {/* 1. Top Header Widescreen Banner */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 shadow-lg bg-zinc-900 group">
        <Image
          src="/images/collab_header.png"
          alt="COLLABORATIONS"
          width={1200}
          height={280}
          priority
          className="w-full h-auto object-contain block group-hover:scale-101 transition-transform duration-500"
        />
      </div>

      {/* 2. Middle 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Portrait Card */}
        <div className="md:col-span-3 relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-zinc-200/80 bg-zinc-100 group cursor-pointer">
          <Image
            src="/images/collab_card_1.png"
            alt="Freedom Cap Hoodie Model"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Center Main Topo Map Card */}
        <div className="md:col-span-6 relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-zinc-200/80 bg-[#545456] min-h-[300px] sm:min-h-[360px] flex items-center justify-center group cursor-pointer">
          <Image
            src="/images/collab_card_center.png"
            alt="UNRL Leave A Legacy"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* Right Portrait Card */}
        <div className="md:col-span-3 relative w-full aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-zinc-200/80 bg-zinc-100 group cursor-pointer">
          <Image
            src="/images/collab_card_3.png"
            alt="Iron Sharpens Iron Athlete"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* 3. Bottom 4-Column Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {bottomCards.map((card) => (
          <div
            key={card.id}
            className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-zinc-200/80 bg-zinc-100 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <Image
              src={card.img}
              alt={card.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
