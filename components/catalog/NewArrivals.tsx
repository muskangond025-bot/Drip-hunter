"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/components/ui/product-card";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  buttonText: string;
}

const productsData: Product[] = [
  {
    id: 1,
    brand: "Name of the brand",
    name: "Oversized Heavy Hoodie",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    badge: "Limited Edition",
    buttonText: "Pre Order",
  },
  {
    id: 2,
    brand: "Name of the brand",
    name: "Classic Cotton Crewneck",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    badge: "Limited Edition",
    buttonText: "Pre Order",
  },
  {
    id: 3,
    brand: "Name of the brand",
    name: "Retro Box Graphic Tee",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 4,
    brand: "Name of the brand",
    name: "Utility Bomber Jacket",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 5,
    brand: "Name of the brand",
    name: "Reflective Technical Jacket",
    price: "$125.00",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    buttonText: "Add To Cart",
  },
  {
    id: 6,
    brand: "Name of the brand",
    name: "Cream Workwear Jacket",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
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

const SPOTLIGHT_PRODUCTS = [
  {
    name: "Oversized Graphic Tee",
    brand: "Drip Monkey",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    color: "amber",
    glowClass: "shadow-[0_12px_36px_rgba(245,158,11,0.06)] border-zinc-200",
    pedestalGlow: "from-amber-400/25 via-yellow-300/15 to-amber-400/25 border-yellow-300/10",
    scanColor: "via-yellow-400/40",
    ambientGlow: "bg-amber-500/5"
  },
  {
    name: "Modular Sling Bag",
    brand: "Drip Utility",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    color: "emerald",
    glowClass: "shadow-[0_12px_36px_rgba(16,185,129,0.06)] border-zinc-200",
    pedestalGlow: "from-emerald-400/25 via-green-300/15 to-emerald-400/25 border-green-300/10",
    scanColor: "via-green-400/40",
    ambientGlow: "bg-emerald-500/5"
  },
  {
    name: "Retro Street Shades",
    brand: "Drip Accs",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    color: "pink",
    glowClass: "shadow-[0_12px_36px_rgba(244,63,94,0.06)] border-zinc-200",
    pedestalGlow: "from-pink-400/25 via-fuchsia-300/15 to-pink-400/25 border-fuchsia-300/10",
    scanColor: "via-fuchsia-400/40",
    ambientGlow: "bg-pink-500/5"
  },
  {
    name: "Hybrid Platform Kicks",
    brand: "Drip Footwear",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    color: "cyan",
    glowClass: "shadow-[0_12px_36px_rgba(6,182,212,0.06)] border-zinc-200",
    pedestalGlow: "from-cyan-400/25 via-blue-300/15 to-cyan-400/25 border-blue-300/10",
    scanColor: "via-cyan-400/40",
    ambientGlow: "bg-cyan-500/5"
  }
];

interface NewArrivalsProps {
  activeTab?: string;
  onAddToCart: (product: Product) => void;
  favorites: number[];
  onToggleFavorite: (product: Product) => void;
  searchQuery?: string;
  searchCategory?: string;
  selectedSubCategory?: string | null;
}

export function NewArrivals({
  activeTab = "All Products",
  onAddToCart,
  favorites = [],
  onToggleFavorite,
  searchQuery = "",
  searchCategory = "All",
  selectedSubCategory,
}: NewArrivalsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateXSpacing, setTranslateXSpacing] = useState(190);
  
  // Interactive Custom Card Tilt & Hover Arrow States
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [leftArrowY, setLeftArrowY] = useState(130);
  const [rightArrowY, setRightArrowY] = useState(130);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle slide every 2 seconds - Pauses on Hover!
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_PRODUCTS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Responsive translation spacing adjustments for card columns on Laptop/Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTranslateXSpacing(110);
      } else if (window.innerWidth < 1024) {
        setTranslateXSpacing(150);
      } else {
        setTranslateXSpacing(200);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let displayProducts = productsByCategory[activeTab] || productsData;

  // Filter by selected subcategory (from CategorySelector)
  if (selectedSubCategory) {
    const sub = selectedSubCategory.toLowerCase();
    displayProducts = displayProducts.filter(item => {
      const name = item.name.toLowerCase();
      const brand = item.brand.toLowerCase();
      
      if (sub.includes("tee") || sub.includes("t-shirt")) {
        return name.includes("tee") || name.includes("t-shirt");
      }
      if (sub.includes("hoodie")) {
        return name.includes("hoodie");
      }
      if (sub.includes("shirt")) {
        return name.includes("shirt");
      }
      if (sub.includes("vest")) {
        return name.includes("vest");
      }
      if (sub.includes("sweater") || sub.includes("crewneck")) {
        return name.includes("sweater") || name.includes("crewneck");
      }
      if (sub.includes("cargo")) {
        return name.includes("cargo");
      }
      if (sub.includes("shorts")) {
        return name.includes("shorts") || name.includes("short");
      }
      if (sub.includes("denim") || sub.includes("jeans")) {
        return name.includes("denim") || name.includes("jeans");
      }
      if (sub.includes("sweatpants")) {
        return name.includes("sweatpants") || name.includes("pants");
      }
      if (sub.includes("jogger")) {
        return name.includes("jogger");
      }
      if (sub.includes("cap") || sub.includes("beanie") || sub.includes("shades") || sub.includes("bag") || sub.includes("socks") || sub.includes("utility")) {
        return name.includes("cap") || name.includes("beanie") || name.includes("shades") || name.includes("bag") || name.includes("socks") || name.includes("utility") || name.includes("hat");
      }
      return name.includes(sub) || brand.includes(sub);
    });
  }

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

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_PRODUCTS.length) % SPOTLIGHT_PRODUCTS.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_PRODUCTS.length);
  };

  const getOffset = (idx: number) => {
    let diff = idx - activeIndex;
    const len = SPOTLIGHT_PRODUCTS.length;
    while (diff < -len / 2) diff += len;
    while (diff > len / 2) diff -= len;
    return diff;
  };

  // Card Parallax Tilt Event Handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt calculations (capped at 10 deg rotation)
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    
    setTiltX(rotateX);
    setTiltY(rotateY);
  };

  const handleCardMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
    setIsHovered(false);
  };

  // Vertical arrow tracking within relative height
  const handleLeftMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setLeftArrowY(relativeY);
  };

  const handleRightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setRightArrowY(relativeY);
  };

  return (
    <section id="new-arrivals" className="bg-background text-foreground py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Subtitle */}
        <SectionHeader
          title={selectedSubCategory ? `New Arrival: ${selectedSubCategory}` : "New Arrival"}
          description={selectedSubCategory ? `Showing premium streetwear items related to "${selectedSubCategory}"` : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"}
        />

        {/* Dynamic CSS for transitions */}
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 0 0 rgba(95, 140, 109, 0.4); }
            70% { box-shadow: 0 0 0 8px rgba(95, 140, 109, 0); }
            100% { box-shadow: 0 0 0 0 rgba(95, 140, 109, 0); }
          }
          @keyframes sheenSweep {
            0% { transform: translate(-100%, -100%) rotate(45deg); }
            100% { transform: translate(100%, 100%) rotate(45deg); }
          }
          @keyframes scanSweep {
            0% { top: 0%; opacity: 0; }
            8% { opacity: 1; }
            92% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-glow-button {
            animation: pulseGlow 2s infinite;
          }
          .animate-sheen-button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: translate(-100%, -100%) rotate(45deg);
            animation: sheenSweep 2.5s infinite ease-in-out;
          }
          .animate-sheen-button {
            position: relative;
            overflow: hidden;
          }
          .animate-scan {
            animation: scanSweep 3s infinite linear;
          }
        `}</style>

        {/* 1. BRIGHT THEME LAPTOP COMPACT COVER-FLOW HORIZONTAL CAROUSEL */}
        <div className="relative w-full bg-secondary/40 border border-border rounded-[32px] p-4 sm:p-8 overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] mb-10 select-none">
          
          {/* Ambient center radial soft glow */}
          <div className={cn(
            "absolute w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] rounded-full blur-[90px] opacity-15 transition-all duration-1000 ease-in-out z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            SPOTLIGHT_PRODUCTS[activeIndex].ambientGlow
          )} />

          {/* Floating Product Cards Carousel - Compact for Laptop Screen resolutions */}
          <div className="relative w-full max-w-2xl h-[240px] sm:h-[300px] flex items-center justify-center overflow-visible z-10">
            {SPOTLIGHT_PRODUCTS.map((prod, idx) => {
              const offset = getOffset(idx);
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;
              
              const isCenter = offset === 0;
              
              return (
                <div
                  key={idx}
                  className="absolute transition-all duration-600 ease-in-out flex flex-col items-center justify-center overflow-visible"
                  style={{
                    transform: `translateX(${offset * translateXSpacing}px) scale(${isCenter ? 1.08 : 0.74})`,
                    zIndex: 30 - Math.abs(offset) * 10,
                    opacity: isCenter ? 1 : offset === 1 || offset === -1 ? 0.65 : 0.22,
                    filter: isCenter ? "none" : `blur(${Math.abs(offset) * 1.5}px)`,
                  }}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => isCenter && setIsHovered(true)}
                  onMouseLeave={isCenter ? handleCardMouseLeave : undefined}
                >
                  
                  {/* Card Container holding image and details with 3D Tilt responsiveness */}
                  <div 
                    onMouseMove={isCenter ? handleCardMouseMove : undefined}
                    className={cn(
                      "relative rounded-[24px] overflow-hidden p-5 transition-all duration-500 flex flex-col justify-between border text-black select-none",
                      isCenter 
                        ? cn("w-[230px] sm:w-[280px] h-[330px] sm:h-[400px] bg-card border-border", prod.glowClass)
                        : "w-[150px] sm:w-[190px] h-[190px] sm:h-[230px] bg-card/70 border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
                    )}
                    style={isCenter ? {
                      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                      transition: "transform 0.1s ease-out"
                    } : undefined}
                  >
                    
                    {/* Laser Scanner sweep line - runs only on active center card */}
                    {isCenter && (
                      <div className={cn(
                        "absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 pointer-events-none animate-scan z-10",
                        prod.scanColor
                      )} />
                    )}

                    {/* Corner Tech crosshairs on center card */}
                    {isCenter && (
                      <>
                        <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-zinc-200 opacity-55 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-1.5 h-1.5 border-t border-r border-zinc-200 opacity-55 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 border-b border-l border-zinc-200 opacity-55 pointer-events-none" />
                        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 border-b border-r border-zinc-200 opacity-55 pointer-events-none" />
                      </>
                    )}

                    {/* Favorite Heart Button - active card only */}
                    {isCenter && (
                      <button className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors cursor-pointer z-25">
                        <Heart className="w-4 h-4" />
                      </button>
                    )}

                    {/* Product Cutout Image container with relative heights to hide details */}
                    <div className={cn(
                      "relative flex items-center justify-center transition-all duration-500 overflow-visible w-full",
                      isCenter 
                        ? (isHovered ? "h-[160px] sm:h-[210px]" : "h-[250px] sm:h-[310px]")
                        : "h-full"
                    )}>
                      
                      {/* Holographic Pedestal base */}
                      <div className={cn(
                        "absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-3.5 rounded-full bg-gradient-to-r blur-md border opacity-35 transition-all duration-700",
                        isCenter ? prod.pedestalGlow : "from-transparent to-transparent border-transparent"
                      )} />

                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.06)] pointer-events-none"
                      />

                    </div>

                    {/* Product details and CTA - slides and fades up only when hovered */}
                    {isCenter && (
                      <div className={cn(
                        "transition-all duration-500 overflow-hidden text-left",
                        isHovered 
                          ? "max-h-[140px] opacity-100 pt-2.5 border-t border-zinc-100 animate-fade-in-up" 
                          : "max-h-0 opacity-0 pointer-events-none border-t-0"
                      )}>
                        <div>
                          <span className="text-[7.5px] font-mono text-accent font-extrabold uppercase tracking-widest block mb-0.5">
                            {prod.brand}
                          </span>
                          <h3 className="text-xs sm:text-sm font-sans font-extrabold uppercase leading-snug tracking-tight text-foreground pr-5">
                            {prod.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3 pt-0.5">
                          <span className="text-xs sm:text-sm font-mono font-black text-foreground">
                            {prod.price}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card trigger
                              const matchingProd = displayProducts.find(
                                (p) => p.name.toLowerCase() === prod.name.toLowerCase()
                              );
                              if (matchingProd) {
                                onAddToCart(matchingProd);
                              } else {
                                onAddToCart({
                                  id: 999 + idx,
                                  brand: prod.brand,
                                  name: prod.name,
                                  price: prod.price,
                                  image: prod.image,
                                  buttonText: "Add To Cart",
                                });
                              }
                            }}
                            className="animate-sheen-button animate-glow-button relative overflow-hidden bg-accent text-white hover:bg-hover-green font-black uppercase text-[8px] sm:text-[9px] tracking-wider px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer border-none shadow-md flex items-center gap-0.5 z-30"
                          >
                            Buy Now
                            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>

                  {/* Hover Arrow Overlay Zones - Positioned on the outer wrapper to prevent card border cutting */}
                  {isCenter && (
                    <>
                      {/* Left half hover zone for previous arrow */}
                      <div 
                        className="absolute top-0 bottom-[100px] left-0 w-1/2 z-20 group/left pointer-events-auto cursor-pointer"
                        onMouseMove={handleLeftMouseMove}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevSlide();
                        }}
                      >
                        <div 
                          className="absolute left-[-26px] opacity-0 group-hover/left:opacity-100 transition-opacity duration-300 pointer-events-none w-11 h-11 rounded-full bg-card text-foreground shadow-[0_4px_16px_rgba(16,29,24,0.12)] border border-border flex items-center justify-center -translate-y-1/2"
                          style={{ top: `${leftArrowY}px` }}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Right half hover zone for next arrow */}
                      <div 
                        className="absolute top-0 bottom-[100px] right-0 w-1/2 z-20 group/right pointer-events-auto cursor-pointer"
                        onMouseMove={handleRightMouseMove}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextSlide();
                        }}
                      >
                        <div 
                          className="absolute right-[-26px] opacity-0 group-hover/right:opacity-100 transition-opacity duration-300 pointer-events-none w-11 h-11 rounded-full bg-card text-foreground shadow-[0_4px_16px_rgba(16,29,24,0.12)] border border-border flex items-center justify-center -translate-y-1/2"
                          style={{ top: `${rightArrowY}px` }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* 2. MAIN NEW ARRIVALS PRODUCT GRID (underneath the slider section) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {displayProducts.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                brand={item.brand}
                name={item.name}
                price={item.price}
                image={item.image}
                hoverImage={item.hoverImage}
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
    </section>
  );
}

export default NewArrivals;
