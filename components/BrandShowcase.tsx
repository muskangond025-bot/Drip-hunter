"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridItem {
  id: number;
  name: string;
  image: string;
  isCenterCard?: boolean;
}

interface BrandData {
  name: string;
  logoText: string;
  description: string;
  gridItems: GridItem[];
}

const brandCollections: Record<string, BrandData> = {
  UNRL: {
    name: "UNRL",
    logoText: "UNRL",
    description: "Raw street performance. Heavy graphic panels and athletic silhouettes.",
    gridItems: [
      { id: 1, name: "Sport Cap", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Neon Shades", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Brazil Jersey", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Split Cargo Pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "UNRL BRAND CARD", image: "", isCenterCard: true },
      { id: 6, name: "Sitting Model Fit", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
      { id: 7, name: "Street Sneakers", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80" },
      { id: 8, name: "Red Utility Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
      { id: 9, name: "Tactical Shorts", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  BURBERRY: {
    name: "BURBERRY",
    logoText: "BURBERRY",
    description: "British luxury meets modern utility. Iconic checks, clean cuts, and beige highlights.",
    gridItems: [
      { id: 1, name: "Beige Bucket Hat", image: "https://images.unsplash.com/photo-1589831377283-33cb1cc6bd5d?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Classic Gold Shades", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Beige Check Trench", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Pleated Trousers", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "BURBERRY BRAND CARD", image: "", isCenterCard: true },
      { id: 6, name: "Trench Coat Model", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" },
      { id: 7, name: "Leather Brogues", image: "https://images.unsplash.com/photo-1614252329309-dec701a24d52?auto=format&fit=crop&w=400&q=80" },
      { id: 8, name: "Classic Scarf", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80" },
      { id: 9, name: "Burberry Duffel Bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  STUSSY: {
    name: "STUSSY",
    logoText: "STUSSY",
    description: "SoCal surf and skate style. Relaxed graphic fits, beach vibes, and retro prints.",
    gridItems: [
      { id: 1, name: "8-Ball Cap", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Retro Sunglasses", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Stussy Print Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Baggy Denim Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "STUSSY BRAND CARD", image: "", isCenterCard: true },
      { id: 6, name: "Skater Boy Model", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
      { id: 7, name: "Retro Skate Shoe", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80" },
      { id: 8, name: "Bright Knit Vest", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80" },
      { id: 9, name: "Canvas Totebag", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  ESSENTIALS: {
    name: "ESSENTIALS",
    logoText: "ESSENTIALS",
    description: "Minimalist Fear of God cuts. Neutrals, oversized crop sweats, and clean loungewear.",
    gridItems: [
      { id: 1, name: "Sage Knit Beanie", image: "https://images.unsplash.com/photo-1608892478985-29c47818b76a?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Minimalist Glasses", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Taupe Sweatshirt", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Oversized Sweatpants", image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "ESSENTIALS BRAND CARD", image: "", isCenterCard: true },
      { id: 6, name: "Monochrome Cozy Model", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
      { id: 7, name: "Cream Slides", image: "https://images.unsplash.com/photo-1603487988353-c8e4b3ff6d62?auto=format&fit=crop&w=400&q=80" },
      { id: 8, name: "Oversized Beige Tee", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
      { id: 9, name: "Sage Duffel Bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    ],
  },
  BAPE: {
    name: "BAPE",
    logoText: "BAPE",
    description: "A Bathing Ape Tokyo streetwear. Harajuku camo patterns and vibrant shark aesthetics.",
    gridItems: [
      { id: 1, name: "Camo Mesh Cap", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Futuristic Visor", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Shark Camo Tee", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Military Cargo Pants", image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "BAPE BRAND CARD", image: "", isCenterCard: true },
      { id: 6, name: "Bright Streetwear Model", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80" },
      { id: 7, name: "Bapesta Sneaker", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80" },
      { id: 8, name: "Camo Shark Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
      { id: 9, name: "Camo Chest Bag", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=400&q=80" },
    ],
  },
};

const cardOffsets = [
  { x: -1, y: -1, rotate: -6 },
  { x: 0, y: -1, rotate: 4 },
  { x: 1, y: -1, rotate: -3 },
  { x: -1, y: 0, rotate: 8 },
  { x: 0, y: 0, rotate: 0 }, // Center Card
  { x: 1, y: 0, rotate: -5 },
  { x: -1, y: 1, rotate: 6 },
  { x: 0, y: 1, rotate: -2 },
  { x: 1, y: 1, rotate: 5 },
];

export function BrandShowcase() {
  const [activeBrand, setActiveBrand] = useState<string>("UNRL");
  const [isSpreaded, setIsSpreaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentBrandData = brandCollections[activeBrand];

  // Trigger deal animation when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSpreaded(true);
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

  const handleBrandChange = (brandKey: string) => {
    if (brandKey === activeBrand) return;

    // Fly back to center stack
    setIsSpreaded(false);

    // Swap data while stacked, then deal back out
    setTimeout(() => {
      setActiveBrand(brandKey);
      
      // Delay dealing out slightly so the image swap is hidden inside the stack
      setTimeout(() => {
        setIsSpreaded(true);
      }, 50);
    }, 450); // duration of collapse transition
  };

  return (
    <section ref={containerRef} className="bg-white text-black py-16 border-t border-b border-zinc-200 overflow-hidden">
      
      {/* Inject custom variables for layout gaps */}
      <style>{`
        :root {
          --brand-showcase-gap: 12px;
        }
        @media (min-width: 768px) {
          :root {
            --brand-showcase-gap: 20px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-yellow-500 font-bold uppercase tracking-widest">
            COLLECTIONS SPOTLIGHT
          </span>
          <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight mt-2">
            Brand Showcase
          </h2>
        </div>

        {/* Tab selection menu */}
        <div className="w-full overflow-x-auto scrollbar-none mb-12 border-b border-zinc-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between md:justify-center gap-6 md:gap-12 py-4">
            {Object.keys(brandCollections).map((brandKey) => {
              const brand = brandCollections[brandKey];
              const isActive = activeBrand === brandKey;
              return (
                <button
                  key={brandKey}
                  onClick={() => handleBrandChange(brandKey)}
                  className={cn(
                    "text-xl sm:text-2xl font-chaney-title uppercase tracking-tighter transition-all duration-300 pb-2 relative cursor-pointer",
                    isActive ? "text-black border-b-4 border-black" : "text-zinc-400 hover:text-black hover:scale-105"
                  )}
                >
                  {brand.logoText}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Layout Grid with dealing cards animations */}
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-5 relative min-h-[350px] sm:min-h-[580px] md:min-h-[760px] p-2">
          {currentBrandData.gridItems.map((item, index) => {
            const offset = cardOffsets[index];
            const isCenter = offset.x === 0 && offset.y === 0;
            const delay = isSpreaded ? `${index * 45}ms` : `${(8 - index) * 25}ms`;

            const cardStyle: React.CSSProperties = {
              transitionProperty: "transform, opacity, box-shadow",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              transitionDelay: delay,
              transform: isSpreaded
                ? "translate(0, 0) rotate(0deg) scale(1)"
                : `translate(
                    calc(-1 * ${offset.x} * (100% + var(--brand-showcase-gap))), 
                    calc(-1 * ${offset.y} * (100% + var(--brand-showcase-gap)))
                  ) rotate(${offset.rotate}deg) scale(0.95)`,
              opacity: isSpreaded ? 1 : isCenter ? 1 : 0,
              zIndex: isCenter ? 20 : 10,
            };

            if (item.isCenterCard) {
              return (
                <div
                  key={item.id}
                  style={cardStyle}
                  className="bg-black text-white rounded-xl md:rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group select-none min-h-[110px] sm:min-h-[180px] md:min-h-[240px] transition-all duration-350"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none" />
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-chaney-title uppercase leading-none tracking-tighter text-white animate-pulse group-hover:scale-105 transition-transform duration-300">
                    {currentBrandData.logoText}
                  </h3>
                  <p className="hidden md:block text-[9px] font-mono text-zinc-400 mt-3 uppercase tracking-widest max-w-[150px]">
                    {currentBrandData.description}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                style={cardStyle}
                className="bg-zinc-100 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm group hover:shadow-xl hover:border-black border border-transparent transition-all min-h-[110px] sm:min-h-[180px] md:min-h-[240px]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-[8px] md:text-[10px] font-mono text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
