"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CollaborationsSection } from "./CollaborationsSection";

// Section 2 Data
interface ProductLineItem {
  id: number;
  title: string;
  subTitle?: string;
  image: string;
  logoBadge?: string;
  logoColor?: string;
}

const productLines: ProductLineItem[] = [
  {
    id: 1,
    title: "Product Line",
    subTitle: "Casual Core",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Product Line",
    subTitle: "Marvel Collection",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Product Line",
    subTitle: "Disney Collection",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Product Line",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
    logoBadge: "NARUTO",
    logoColor: "text-orange-600 border-orange-600 bg-orange-50",
  },
  {
    id: 5,
    title: "Product Line",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    logoBadge: "BATMAN",
    logoColor: "text-yellow-500 border-yellow-500 bg-black",
  },
];

// Section 3 Data
interface BrandTeaserItem {
  id: number;
  brandName: string;
  title: string;
  image: string;
  isSpecialTitle?: boolean;
}

const brandTeasers: BrandTeaserItem[] = [
  {
    id: 1,
    brandName: "brand name",
    title: "Teaser Title",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    brandName: "brand name",
    title: "Back In Stock",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isSpecialTitle: true,
  },
  {
    id: 3,
    brandName: "brand name",
    title: "Teaser Title",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    brandName: "brand name",
    title: "Teaser Title",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80",
  },
];

const brandColors: Record<number, { border: string; pillBorder: string; pillText: string; pillName: string }> = {
  1: { border: "hover:border-zinc-400", pillBorder: "border-zinc-500", pillText: "text-zinc-800", pillName: "CASUAL CORE" },
  2: { border: "hover:border-red-600", pillBorder: "border-red-600", pillText: "text-red-600", pillName: "MARVEL" },
  3: { border: "hover:border-blue-500", pillBorder: "border-blue-500", pillText: "text-blue-500", pillName: "DISNEY" },
  4: { border: "hover:border-orange-500", pillBorder: "border-orange-500", pillText: "text-orange-600", pillName: "NARUTO" },
  5: { border: "hover:border-yellow-500", pillBorder: "border-yellow-500", pillText: "text-yellow-600", pillName: "BATMAN" },
};

export function BrandCollabTeasers() {
  const productLineRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [collabRevealed, setCollabRevealed] = useState(false);
  const [shakeDirection, setShakeDirection] = useState<"left" | "right" | null>(null);

  // Trigger collab animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCollabRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (collabRef.current) {
      observer.observe(collabRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Core slide transition that applies physical inertia shake
  const transitionToCard = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    // Shake in opposite direction of scrolling movement
    const direction = nextIndex > activeIndex ? "left" : "right";
    setShakeDirection(direction);
    setActiveIndex(nextIndex);

    // Scroll card into horizontal viewport center
    if (productLineRef.current) {
      const container = productLineRef.current;
      const card = container.children[nextIndex] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
          behavior: "smooth"
        });
      }
    }

    // Spring back to normal after transition duration
    setTimeout(() => {
      setShakeDirection(null);
    }, 450);
  }, [activeIndex]);

  // Autoplay auto scroll logic for "Other Product Line"
  useEffect(() => {
    if (hoveredCardIndex !== null) return; // Pause autoplay on hover

    const interval = setInterval(() => {
      const next = (activeIndex + 1) % productLines.length;
      transitionToCard(next);
    }, 2000); // Auto scroll every 2 seconds

    return () => clearInterval(interval);
  }, [activeIndex, hoveredCardIndex, transitionToCard]);

  const scrollToProductLine = (index: number) => {
    transitionToCard(index);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + productLines.length) % productLines.length;
    transitionToCard(prev);
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % productLines.length;
    transitionToCard(next);
  };

  const handleTeaserScroll = (direction: "left" | "right") => {
    if (teaserRef.current) {
      const cardWidth = 300; // Width + gap approx
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      teaserRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <CollaborationsSection />
      </div>
      
      {/* Responsive variables for small card stack deals */}
      <style>{`
        :root {
          --collab-stack-x: 0px;
          --collab-stack-y: 60px;
          --collab-stack-rotate: 0deg;
        }
        @media (min-width: 1024px) {
          :root {
            --collab-stack-x: calc(-300% - 24px);
            --collab-stack-y: 0px;
            --collab-stack-rotate: -6deg;
          }
        }
      `}</style>

      {/* 1. BONKERS CORNER Collaboration Highlight Grid */}
      <div ref={collabRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 overflow-hidden lg:overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Collab Banner */}
          <div className="lg:col-span-9 relative bg-zinc-950 text-white rounded-3xl overflow-hidden h-[400px] lg:h-[450px] flex flex-col justify-end p-8 md:p-12 shadow-xl group z-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
              <Image
                src="https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=900&q=80"
                alt="Bonkers Corner Varsity Collab"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
              {/* Dark Overlay for typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
            </div>

            {/* Bonkers Corner Logo Badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-4 shadow-lg z-20">
              <span className="font-chaney-title text-[9px] md:text-[11px] font-black text-black leading-none text-center uppercase tracking-tighter">
                BONKERS<br />CORNER
              </span>
            </div>

            {/* Info details */}
            <div className="relative z-20 max-w-xl">
              <span className="text-yellow-400 font-mono text-xs font-black uppercase tracking-wider block mb-2">
                Out now
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-zinc-800 hover:bg-black text-yellow-400 border border-zinc-700 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95">
                  Buy Now
                </button>
                <button className="text-white hover:text-yellow-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                  <PlusCircle className="w-5 h-5 text-white/80" />
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar SpongeBob Thumbnails with dealing stack animations */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:h-[450px] lg:justify-between relative z-10">
            {[
              { id: 1, img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=300&q=80" },
              { id: 2, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80" },
              { id: 3, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
              { id: 4, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80" },
            ].map((thumb, index) => {
              const delay = collabRevealed ? `${index * 120}ms` : "0ms";
              const cardStyle: React.CSSProperties = {
                transitionProperty: "transform, opacity, border-color",
                transitionDuration: "800ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: delay,
                transform: collabRevealed
                  ? "translate(0, 0) rotate(0deg) scale(1)"
                  : "translate(var(--collab-stack-x), var(--collab-stack-y)) rotate(var(--collab-stack-rotate)) scale(0.9)",
                opacity: collabRevealed ? 1 : 0,
                pointerEvents: collabRevealed ? "auto" : "none",
                zIndex: collabRevealed ? 10 : 0,
              };

              return (
                <div
                  key={thumb.id}
                  style={cardStyle}
                  className="bg-zinc-100 rounded-2xl relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[100px] border border-transparent hover:border-black/20 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <Image
                    src={thumb.img}
                    alt={`Collaboration product ${thumb.id}`}
                    fill
                    sizes="(max-width: 1024px) 150px, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Other Product Line Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-chaney-title uppercase tracking-tight text-black">
            Other Product line
          </h2>
        </div>

        <div className="relative group/carousel">
          {/* Scrollable Container */}
          <div
            ref={productLineRef}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {productLines.map((item, index) => {
              const theme = brandColors[item.id] || brandColors[1];
              const isActive = index === activeIndex || index === hoveredCardIndex;
              const isCurrentlyHovered = index === hoveredCardIndex;
              
              // Handle lightweight 3D rotation per card without heavy state renders
              const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                setHoveredCardIndex(index);
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Calculate rotation (max 12deg)
                const rotX = (y / rect.height) * -12;
                const rotY = (x / rect.width) * 12;
                
                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04) translateY(-8px)`;
                card.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.4)";
                card.style.borderColor = theme.border.replace("hover:border-", ""); // extract dynamic border color
              };

              const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                setHoveredCardIndex(null);
                const card = e.currentTarget;
                
                // If it is still active index, keep active styling but no rotation
                if (index === activeIndex) {
                  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.04, 1.04, 1.04) translateY(-8px)`;
                  card.style.boxShadow = "0 20px 40px -10px rgba(0, 0, 0, 0.35)";
                  card.style.borderColor = theme.border.replace("hover:border-", "");
                } else {
                  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)`;
                  card.style.boxShadow = "none";
                  card.style.borderColor = "transparent";
                }
              };

              // Determine active transform & add shake offsets if scrolling/shaking
              let baseTransform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)";
              if (isActive) {
                baseTransform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.04, 1.04, 1.04) translateY(-8px)";
              }

              if (shakeDirection === "left") {
                baseTransform = isActive
                  ? "perspective(1000px) rotate(-4deg) skewX(-3deg) translateX(-18px) scale3d(1.02, 1.02, 1.02) translateY(-8px)"
                  : "perspective(1000px) rotate(-4deg) skewX(-3deg) translateX(-18px) scale3d(0.96, 0.96, 0.96) translateY(0)";
              } else if (shakeDirection === "right") {
                baseTransform = isActive
                  ? "perspective(1000px) rotate(4deg) skewX(3deg) translateX(18px) scale3d(1.02, 1.02, 1.02) translateY(-8px)"
                  : "perspective(1000px) rotate(4deg) skewX(3deg) translateX(18px) scale3d(0.96, 0.96, 0.96) translateY(0)";
              }

              const activeBorderColor = theme.border.replace("hover:border-", "");
              const activeBoxShadow = "0 20px 40px -10px rgba(0, 0, 0, 0.35)";

              const cardStyle: React.CSSProperties = {
                transform: isCurrentlyHovered ? undefined : baseTransform,
                borderColor: isCurrentlyHovered ? undefined : isActive ? activeBorderColor : "transparent",
                boxShadow: isCurrentlyHovered ? undefined : isActive ? activeBoxShadow : "none",
                zIndex: isActive ? 20 : 10,
                transition: isCurrentlyHovered
                  ? "border-color 0.2s"
                  : "transform 550ms cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 550ms, box-shadow 550ms",
              };

              return (
                <div
                  key={item.id}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={cn(
                    "flex-shrink-0 w-[240px] sm:w-[270px] aspect-[3/4] rounded-3xl overflow-hidden relative group border-2 transition-all flex flex-col justify-end p-6 cursor-pointer bg-black"
                  )}
                  style={{ scrollSnapAlign: "start", ...cardStyle }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.image}
                      alt={item.subTitle || "Product Line"}
                      fill
                      sizes="270px"
                      className={cn(
                        "object-cover transition-all duration-500",
                        isActive ? "scale-108" : "scale-100"
                      )}
                    />
                    <div className={cn(
                      "absolute inset-0 transition-all duration-500 z-10",
                      isActive
                        ? "bg-gradient-to-t from-black/65 via-black/20 to-transparent"
                        : "bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                    )} />
                  </div>

                  {/* Content */}
                  <div className="relative z-20 text-white w-full flex flex-col justify-between h-full pointer-events-none">
                    
                    {/* Top Tag indicator */}
                    <div className={cn(
                      "transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="text-[8px] font-mono tracking-widest text-yellow-400 bg-black/60 px-2 py-0.5 rounded uppercase">
                        Product
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div>
                      {item.subTitle ? (
                        <span className={cn(
                          "text-[10px] font-mono tracking-wider block uppercase mb-1 transition-colors duration-300",
                          isActive ? "text-zinc-200" : "text-zinc-400"
                        )}>
                          {item.subTitle}
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-400 font-mono tracking-wider block uppercase mb-1">
                          Collection
                        </span>
                      )}
                      
                      <h3 className="text-base font-bold uppercase tracking-tight text-white leading-none">
                        {item.title}
                      </h3>

                      {/* Sliding Pill Badge at bottom center */}
                      <div className={cn(
                        "w-full flex justify-center mt-3 transform transition-all duration-350 ease-out",
                        isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      )}>
                        <div className={cn(
                          "py-2 px-6 rounded-full border text-[9px] font-black tracking-widest uppercase leading-none shadow-md bg-white",
                          theme.pillBorder,
                          theme.pillText
                        )}>
                          {theme.pillName}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white hover:text-yellow-400 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous product line"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white hover:text-yellow-400 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next product line"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {productLines.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToProductLine(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === idx ? "w-8 bg-zinc-950" : "w-2 bg-zinc-300 hover:bg-zinc-400"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Brand Teasers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-chaney-title uppercase tracking-tight text-black">
            Brand Teasers
          </h2>
        </div>

        <div className="relative px-0 sm:px-12">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleTeaserScroll("left")}
            className="absolute left-[-10px] sm:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-zinc-900 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer border border-zinc-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
          </button>
          <button
            onClick={() => handleTeaserScroll("right")}
            className="absolute right-[-10px] sm:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-lg bg-zinc-900 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer border border-zinc-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>

          {/* Scrolling Teaser Cards Container */}
          <div
            ref={teaserRef}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {brandTeasers.map((teaser) => (
              <div
                key={teaser.id}
                className="flex-shrink-0 w-[240px] sm:w-[280px] aspect-[9/16] rounded-3xl overflow-hidden relative group shadow-md hover:shadow-lg border border-zinc-200 transition-all flex flex-col justify-end p-6 cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 select-none">
                  <Image
                    src={teaser.image}
                    alt={teaser.title}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10" />
                </div>

                {/* Text Details overlay */}
                <div className="relative z-20 text-white w-full">
                  <span className="text-[9px] text-zinc-400 font-mono tracking-widest block uppercase mb-1">
                    {teaser.brandName}
                  </span>

                  {teaser.isSpecialTitle ? (
                    <h3 className="text-2xl font-black uppercase text-yellow-400 leading-tight tracking-tight drop-shadow-xs transform -rotate-1 skew-x-1 origin-left animate-pulse">
                      {teaser.title}
                    </h3>
                  ) : (
                    <h3 className="text-xl font-bold uppercase text-yellow-400 leading-none tracking-tight">
                      {teaser.title}
                    </h3>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
