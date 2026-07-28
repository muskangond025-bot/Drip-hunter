"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DealSlide {
  id: number;
  title: string;
  image: string;
  tag: string;
  buttonText: string;
  link: string;
  bgStyle: string;
  imageFit: "object-contain" | "object-cover";
}

const dealSlides: DealSlide[] = [
  {
    id: 1,
    title: "Muslim Fashion",
    image: "/images/deal_banner_1.png?v=4",
    tag: "SPECIAL OFFER | UP TO 50% OFF",
    buttonText: "SHOP THE LOOK",
    link: "/shop?category=Dresses",
    bgStyle: "bg-gradient-to-r from-[#2B1B17] from-50% to-white to-50%",
    imageFit: "object-contain"
  },
  {
    id: 2,
    title: "Coming Soon",
    image: "/images/deal_banner_2.png?v=4",
    tag: "LIMITED EDITION | STAY TUNED",
    buttonText: "VIEW COLLECTION",
    link: "/shop",
    bgStyle: "bg-[#EAE4DC]",
    imageFit: "object-contain"
  },
  {
    id: 3,
    title: "Meet Clothing Collection",
    image: "/images/deal_banner_3.png?v=4",
    tag: "EDITORIAL | DESIGNER COUTURE",
    buttonText: "EXPLORE COUTURE",
    link: "/shop?category=Clothing",
    bgStyle: "bg-[#E6DFDA]",
    imageFit: "object-contain"
  }
];

export function TemplatesShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);

  // Auto-play interval: 2 seconds
  useEffect(() => {
    if (isHoveringBanner) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dealSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHoveringBanner]);

  return (
    <section className="bg-[#FBF9F4] text-[#0A0A0A] py-16 border-t border-b border-[#2B1B17]/10 font-sans select-none w-full overflow-hidden">
      
      {/* Centered Heading Block */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative">
        <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-wider text-[#0A0A0A] uppercase">
          Deal Of The Day/Week
        </h2>
        <div className="w-12 h-0.5 bg-[#5C4033] mx-auto mt-3.5" />
      </div>

      {/* Unified Slideshow Banner Wrapper (Full Width Edge-to-Edge, Responsive Height) */}
      <div 
        onMouseEnter={() => setIsHoveringBanner(true)}
        onMouseLeave={() => setIsHoveringBanner(false)}
        className="relative w-full overflow-hidden border-t border-b border-[#2B1B17]/10 bg-[#FAF6EE] shadow-[0_8px_30px_rgba(43,27,23,0.01)] aspect-[2/1] max-h-[800px]"
      >
        {/* Inner slideshow using absolute fade transitions */}
        {dealSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              onClick={() => window.location.href = slide.link}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer group flex items-center justify-center",
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none",
                slide.bgStyle
              )}
            >
              {/* Full Width designed banner graphic inside relative container */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={cn(
                    "pointer-events-none transition-transform duration-[4000ms] ease-out group-hover:scale-102",
                    slide.imageFit === "object-contain" ? "object-contain object-center" : "object-cover object-center"
                  )}
                  priority
                />
              </div>

              {/* Colorful Badge at Top-Left */}
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-[#5C4033]/90 backdrop-blur-md text-[#FAF6EE] text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-white/10 shadow-md font-bold">
                  {slide.tag}
                </span>
              </div>

              {/* Permanent Premium CTA Button at Bottom Center */}
              <div className="absolute inset-0 flex items-end justify-center pb-12 z-20 pointer-events-none">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = slide.link;
                  }}
                  className="bg-[#2B1B17] hover:bg-[#5C4033] text-[#FAF6EE] hover:text-[#FAF6EE] font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl border border-[#2B1B17] hover:border-[#5C4033] shadow-lg transform transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-105 active:scale-95"
                >
                  {slide.buttonText}
                </button>
              </div>

              {/* Subtle hover gradient/tint overlay */}
              <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-black/[0.08] transition-all duration-500 z-0 pointer-events-none" />
            </div>
          );
        })}

        {/* Slider dots pagination aligned cleanly */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {dealSlides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border border-[#2B1B17]/10",
                index === currentSlide ? "bg-[#2B1B17] w-6" : "bg-[#FAF6EE]/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
