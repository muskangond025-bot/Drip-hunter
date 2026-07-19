"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function BrandShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="bg-white text-black py-12 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* COLLABORATIONS Banner (Light Gray Card with low-contrast UNRL text) */}
        <div className="bg-[#f4f4f5] border border-zinc-200 rounded-3xl py-12 px-6 shadow-xs text-center flex flex-col justify-center items-center relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(244,244,245,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[size:100%_4px] pointer-events-none" />
          
          <span className="text-[#ebd26b] font-mono text-[10px] uppercase font-bold tracking-[0.25em] block mb-2 z-10">
            UNRL
          </span>
          <div className="relative z-10">
            <h3 className="text-6xl sm:text-7xl font-sans font-black tracking-tighter text-white uppercase select-none drop-shadow-xs">
              UNRL
            </h3>
          </div>
          <p className="text-zinc-400 font-mono text-[9px] tracking-widest mt-4 uppercase z-10">
            leave a legacy.
          </p>
          
          {/* Small yellow accent dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#ebd26b] mt-6 animate-pulse z-10" />
        </div>

        {/* Vertical Stack of 4 Landscape Banners */}
        <div className="flex flex-col gap-6 w-full">
          {[
            { id: 1, img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80", alt: "Cap back view" },
            { id: 2, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", alt: "Grey hoodie back view" },
            { id: 3, img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80", alt: "Puffer jackets" },
            { id: 4, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80", alt: "Black jeans" }
          ].map((banner) => (
            <div 
              key={banner.id}
              className="w-full h-[140px] md:h-[180px] rounded-2xl overflow-hidden relative border border-zinc-200 shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
            >
              <Image 
                src={banner.img}
                alt={banner.alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
