"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "URBAN DRIP 2026",
      subtitle: "STREETWEAR FOR THE UNCONVENTIONAL",
      desc: "Explore our latest curation of oversized fits, bold graphics, and industrial outerwear.",
      tag: "NEW DROP",
      image: "/images/hero_streetwear.png",
    },
    {
      title: "TECH-VEST SYSTEM",
      subtitle: "FUNCTIONAL UTILITY MEETS STREET",
      desc: "Designed with weatherproof nylon, adjustable tactical straps, and modular storage.",
      tag: "COLLECTIONS",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "CYBER ACCESSORIES",
      subtitle: "FUTUREPROOF UTILITY GEAR",
      desc: "Finish the outfit with modular chest bags, custom frame shades, and utility keyclips.",
      tag: "ACCESSORIES",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // Auto-cycle slides every 2 seconds (2000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-zinc-950 text-white min-h-[75vh] flex flex-col justify-end overflow-hidden">
      {/* Background Hero Images with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              activeSlide === index ? "opacity-80 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center select-none transition-transform duration-1000"
            />
          </div>
        ))}
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/10 z-10" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-black tracking-widest px-3 py-1 rounded">
            ⚡ {slides[activeSlide].tag}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-chaney-title leading-none tracking-tighter uppercase transition-all duration-300">
            {slides[activeSlide].title}
          </h1>
          
          <h2 className="text-sm sm:text-lg font-mono text-zinc-300 font-bold tracking-widest uppercase transition-all duration-300">
            {slides[activeSlide].subtitle}
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed transition-all duration-300">
            {slides[activeSlide].desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="bg-white text-black hover:bg-yellow-400 font-extrabold uppercase text-xs tracking-wider px-8 py-4 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-yellow-400/20 group cursor-pointer">
              Shop the Look
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
            <button className="border-2 border-white hover:border-yellow-400 hover:text-yellow-400 text-white font-extrabold uppercase text-xs tracking-wider px-8 py-4 rounded-full transition-all cursor-pointer">
              Explore Collections
            </button>
          </div>
        </div>

        {/* Carousel Slide Switcher */}
        <div className="flex md:flex-col gap-4 self-center md:self-end">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="relative w-8 md:w-12 h-1 bg-zinc-800 rounded overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full bg-white transition-all duration-500 ${
                    activeSlide === index ? "w-full bg-yellow-400" : "w-0"
                  }`}
                />
              </div>
              <span
                className={`hidden md:inline font-mono text-xs font-bold transition-colors ${
                  activeSlide === index ? "text-yellow-400" : "text-zinc-500 group-hover:text-white"
                }`}
              >
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Decorative Brand Ribbons */}
      <div className="w-full bg-yellow-400 py-3 text-black text-xs font-mono font-black overflow-hidden relative z-20 select-none border-t border-b border-black">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {Array(10).fill("DRIP HUNTER STREET STYLE • ARCHIVE 2026 • PREMIUM COUTURE • NO RULES APPLIED •").map((text, idx) => (
            <span key={idx} className="tracking-widest uppercase">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

