"use client";

import React, { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}

export function BlurText({ text, delay = 0, stagger = 0.04, className }: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const characters = text.split("");

  return (
    <span ref={containerRef} className={className}>
      {characters.map((char, index) => {
        const visibleChar = char === " " ? "\u00A0" : char;
        return (
          <span
            key={index}
            className="animate-blur-fade opacity-0 inline-block"
            style={{
              animationDelay: inView ? `${delay + index * stagger}s` : "0s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            {visibleChar}
          </span>
        );
      })}
    </span>
  );
}

const brandsRow1 = [
  "UNRULY",
  "WASTED",
  "ESSENTIALS",
  "STUSSY",
  "SUPREME",
  "OFF-WHITE",
  "BAPE",
  "PALACE",
];

const brandsRow2 = [
  "OBEY",
  "KITH",
  "CARHARTT WIP",
  "HUBLOT",
  "STONE ISLAND",
  "BALENCIAGA",
  "AMIRI",
  "VETEMENTS",
];

export function BrandMarquee() {
  return (
    <section className="bg-black text-white py-16 overflow-hidden border-t border-b border-zinc-800">
      
      {/* Dynamic CSS styles for the staggered blur text animation */}
      <style>{`
        @keyframes blurFadeIn {
          0% {
            filter: blur(12px);
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            filter: blur(0px);
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .animate-blur-fade {
          display: inline-block;
          animation: blurFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest block">
          COLLABORATIONS
        </span>
        <h2 className="text-2xl sm:text-4xl font-chaney-title uppercase tracking-tight mt-2 text-white">
          <BlurText text="Brands We Work With" />
        </h2>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="relative py-4 flex overflow-x-hidden border-t border-b border-zinc-900 select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-3xl sm:text-5xl font-chaney-title tracking-widest text-zinc-500 hover:text-white transition-colors">
          {brandsRow1.concat(brandsRow1).map((brand, idx) => (
            <span key={idx} className="cursor-default uppercase transition-all duration-300 hover:scale-105 hover:text-yellow-400">
              <BlurText text={brand} delay={idx * 0.03} />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="relative py-4 flex overflow-x-hidden border-b border-zinc-900 select-none mt-4">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-16 text-3xl sm:text-5xl font-chaney-title tracking-widest text-zinc-600 hover:text-white transition-colors">
          {brandsRow2.concat(brandsRow2).map((brand, idx) => (
            <span key={idx} className="cursor-default uppercase transition-all duration-300 hover:scale-105 hover:text-yellow-400">
              <BlurText text={brand} delay={idx * 0.03} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
