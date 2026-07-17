"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./ui/section-header";
import { ProductCard } from "./ui/product-card";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  buttonText: string;
}

const productsData: Product[] = [
  {
    id: 1,
    brand: "Name of the brand",
    name: "Oversized Heavy Hoodie",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80",
    badge: "Limited Edition",
    buttonText: "Pre Order",
  },
  {
    id: 2,
    brand: "Name of the brand",
    name: "Classic Cotton Crewneck",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=80",
    badge: "Limited Edition",
    buttonText: "Pre Order",
  },
  {
    id: 3,
    brand: "Name of the brand",
    name: "Retro Box Graphic Tee",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 4,
    brand: "Name of the brand",
    name: "Utility Bomber Jacket",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 5,
    brand: "Name of the brand",
    name: "Reflective Technical Jacket",
    price: "$125.00",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 6,
    brand: "Name of the brand",
    name: "Cream Workwear Jacket",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    buttonText: "Add To Cart",
  },
];

const productsByCategory: Record<string, Product[]> = {
  "All Products": productsData,
  "New Arrivals": [
    productsData[0], // Oversized Heavy Hoodie
    productsData[1], // Classic Cotton Crewneck
    productsData[4], // Reflective Technical Jacket
  ],
  "Best Selling": [
    productsData[2], // Retro Box Graphic Tee
    productsData[3], // Utility Bomber Jacket
    productsData[5], // Cream Workwear Jacket
  ],
  "Discounted Offers": [
    { ...productsData[2], price: "$35.00", badge: "20% OFF" },
    { ...productsData[5], price: "$85.00", badge: "25% OFF" }
  ],
  "Winter Collection": [
    productsData[0], // Oversized Heavy Hoodie
    productsData[3], // Utility Bomber Jacket
    productsData[4], // Reflective Technical Jacket
  ]
};

interface HeroSlide {
  tag: string;
  title: string;
  desc: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    tag: "SEASON CRUISE '26",
    title: "Slay the streets",
    desc: "Featured short-sleeve workwear shirt in raw blue denim washes.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "ARCHIVE COLLECTION",
    title: "Urban Cargo Fit",
    desc: "Heavyweight utility cargo pants styled with modular technical harness.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "LIMITED RELEASES",
    title: "Varsity Yellow Vibes",
    desc: "Styling oversized graphic varsity jackets with relaxed cargo wear.",
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
  },
];

interface NewArrivalsProps {
  activeTab?: string;
  onAddToCart: (product: Product) => void;
  favorites: number[];
  onToggleFavorite: (product: Product) => void;
  searchQuery?: string;
  searchCategory?: string;
}

export function NewArrivals({
  activeTab = "All Products",
  onAddToCart,
  favorites = [],
  onToggleFavorite,
  searchQuery = "",
  searchCategory = "All",
}: NewArrivalsProps) {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  let displayProducts = productsByCategory[activeTab] || productsData;

  // Filter by category dropdown select
  if (searchCategory && searchCategory !== "All") {
    displayProducts = displayProducts.filter(item => {
      const cat = searchCategory.toLowerCase();
      const name = item.name.toLowerCase();
      if (cat === "tees") return name.includes("tee");
      if (cat === "hoodies") return name.includes("hoodie") || name.includes("crewneck");
      if (cat === "pants") return name.includes("pants") || name.includes("cargo") || name.includes("trouser");
      return true;
    });
  }

  // Filter by text search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    displayProducts = displayProducts.filter(
      item => item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q)
    );
  }

  const nextHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Subtitle */}
        <SectionHeader
          title="New Arrival"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
        />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Injecting dynamic CSS for Ken Burns and Fade In Up animations */}
          <style>{`
            @keyframes kenBurns {
              0% { transform: scale(1.02); }
              100% { transform: scale(1.10); }
            }
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(16px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-ken-burns {
              animation: kenBurns 16s ease-in-out infinite alternate;
            }
            .animate-fade-in-up {
              animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          {/* Left Column: 1 Large Hero Card */}
          <div className="lg:col-span-5 relative bg-zinc-950 rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-end p-6 md:p-8 min-h-[500px] lg:min-h-[640px]">
            {/* Background Model Photos with smooth crossfade */}
            <div className="absolute inset-0 z-0 select-none">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                    activeHeroSlide === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    priority={index === 0}
                    className={cn(
                      "object-cover transition-transform duration-[1000ms]",
                      activeHeroSlide === index ? "animate-ken-burns" : ""
                    )}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevHeroSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs flex items-center justify-center border border-white/10 opacity-85 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextHeroSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-xs flex items-center justify-center border border-white/10 opacity-85 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Gradient Overlay for Text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Left Card text details inside a floating glassmorphic tray */}
            <div 
              key={activeHeroSlide} 
              className="relative z-20 w-full bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl animate-fade-in-up text-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-[10px] font-mono text-yellow-400 font-extrabold uppercase tracking-widest">
                  {heroSlides[activeHeroSlide].tag}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-chaney-title uppercase leading-tight text-white tracking-tight">
                {heroSlides[activeHeroSlide].title}
              </h3>
              <p className="text-[11px] text-zinc-200 mt-2 font-mono leading-relaxed max-w-sm">
                {heroSlides[activeHeroSlide].desc}
              </p>
            </div>
            
            {/* Dots indicator at the bottom-right/bottom-center for active slide status */}
            <div className="absolute bottom-4 right-4 z-20 flex gap-1.5 pointer-events-none">
              {heroSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeHeroSlide === idx ? "w-4 bg-yellow-400" : "w-1.5 bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 self-stretch">
            {displayProducts.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <ProductCard
                  key={item.id}
                  brand={item.brand}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  badge={item.badge}
                  buttonText={item.buttonText}
                  isFavorite={isFav}
                  onFavoriteToggle={() => onToggleFavorite(item)}
                  onAddToCart={() => onAddToCart(item)}
                  variant="padded"
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
