"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Modular Hero sub-components
import { BackgroundEffects } from "./Hero/BackgroundEffects";
import { ProductDetails } from "./Hero/ProductDetails";
import { HeroSneaker } from "./Hero/HeroSneaker";
import { CircularCarousel } from "./Hero/CircularCarousel";
import { HERO_PRODUCTS } from "./Hero/ProductData";

interface HeroSectionProps {
  onShopTheLook?: (category: string) => void;
  onExploreCollections?: () => void;
  onAddToCart?: (product: any) => void;
}

export function HeroSection({ onShopTheLook, onExploreCollections, onAddToCart }: HeroSectionProps) {
  // Navigation between the 2 main Hero layouts (0: Studio Lookbook, 1: Kicks Showcase)
  const [activeHeroTab, setActiveHeroTab] = useState(1); // Default to Kicks Showcase

  // --- Slide 1 (Studio Lookbook) States ---
  const [lookbookClothingIdx, setLookbookClothingIdx] = useState(0);
  const [lookbookGlassesIdx, setLookbookGlassesIdx] = useState(0);
  const [lookbookShoesIdx, setLookbookShoesIdx] = useState(0);
  const [flash1, setFlash1] = useState(false);
  const [flash2, setFlash2] = useState(false);
  const [flash3, setFlash3] = useState(false);

  // --- Slide 2 (Circular Kicks Showcase) States ---
  const [activeProductIdx, setActiveProductIdx] = useState(1); // Default to Cyber 720
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [sizeSystem, setSizeSystem] = useState<"EU" | "US">("EU");
  
  // Hover state to pause auto-cycles
  const [isHovered, setIsHovered] = useState(false);

  // Local state for interactive navbar counts
  const [cartCount, setCartCount] = useState(1);
  const [wishlistCount, setWishlistCount] = useState(0);

  // --- Slide 1 (Lookbook) Auto Cycles ---
  useEffect(() => {
    if (activeHeroTab !== 0 || isHovered) return;
    const timer = setInterval(() => {
      setFlash1(true);
      setTimeout(() => setFlash1(false), 150);
      setLookbookClothingIdx((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeHeroTab, isHovered]);

  useEffect(() => {
    if (activeHeroTab !== 0 || isHovered) return;
    const timer = setInterval(() => {
      setFlash2(true);
      setTimeout(() => setFlash2(false), 150);
      setLookbookGlassesIdx((prev) => (prev + 1) % 3);
    }, 3300);
    return () => clearInterval(timer);
  }, [activeHeroTab, isHovered]);

  useEffect(() => {
    if (activeHeroTab !== 0 || isHovered) return;
    const timer = setInterval(() => {
      setFlash3(true);
      setTimeout(() => setFlash3(false), 150);
      setLookbookShoesIdx((prev) => (prev + 1) % 3);
    }, 3600);
    return () => clearInterval(timer);
  }, [activeHeroTab, isHovered]);

  // --- Slide 2 (Circular Showcase) Auto Cycle (4 Seconds) ---
  useEffect(() => {
    if (activeHeroTab !== 1 || isHovered) return;
    const timer = setInterval(() => {
      handleNextProduct();
    }, 4000);
    return () => clearInterval(timer);
  }, [activeHeroTab, isHovered]);

  // Reset colors/sizes when main product index changes
  const handleProductSelect = (idx: number) => {
    setActiveProductIdx(idx);
    setSelectedColorIdx(0);
    setSelectedSizeIdx(0);
  };

  const handleNextProduct = () => {
    setActiveProductIdx((prev) => (prev + 1) % HERO_PRODUCTS.length);
    setSelectedColorIdx(0);
    setSelectedSizeIdx(0);
  };

  const handlePrevProduct = () => {
    setActiveProductIdx((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
    setSelectedColorIdx(0);
    setSelectedSizeIdx(0);
  };

  const activeProduct = HERO_PRODUCTS[activeProductIdx];
  const activeColor = activeProduct.colors[selectedColorIdx];

  const handleBuy = () => {
    const selectedSize = sizeSystem === "EU" ? activeProduct.sizes.EU[selectedSizeIdx] : activeProduct.sizes.US[selectedSizeIdx];
    
    // Increment cart badge count locally
    setCartCount((prev) => prev + 1);

    if (onAddToCart) {
      onAddToCart({
        id: activeProduct.id + selectedColorIdx * 10,
        brand: "Drip Kicks",
        name: `${activeProduct.name} (${activeColor.name})`,
        price: activeProduct.price,
        image: activeColor.img,
        size: `${selectedSize} (${sizeSystem})`,
        buttonText: "Add To Cart"
      });
    } else {
      alert(`Added ${activeProduct.name} (${activeColor.name}) Size ${selectedSize} to cart!`);
    }
  };

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full lg:h-[82vh] lg:max-h-[720px] min-h-[600px] flex items-center overflow-hidden bg-zinc-950 text-white select-none pt-12 lg:pt-14"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Dynamic CSS styles for animations */}
      <style>{`
        @keyframes kenBurnsHero {
          0% { transform: scale(1.02) translateY(0); }
          100% { transform: scale(1.15) translateY(-5px); }
        }
        .animate-hero-zoom {
          animation: kenBurnsHero 6s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Dynamic Neon Background Glow & Outlined Outlines */}
      <BackgroundEffects accentColor={activeHeroTab === 1 ? activeProduct.accent : "#eab308"} />



      {/* ==================== HERO VIEW 1: STUDIO LOOKBOOK SPLIT SCREEN ==================== */}
      {activeHeroTab === 0 && (
        <div className="absolute inset-0 w-full h-full z-10 flex select-none pointer-events-none opacity-45 sm:opacity-60 transition-opacity duration-1000">
          
          {/* Panel 1: Clothing (Men's wear) */}
          <div className="relative w-1/3 h-full border-r border-white/5 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
            ].map((img, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-800 ease-in-out",
                  lookbookClothingIdx === index ? "opacity-100 z-0" : "opacity-0 -z-10"
                )}
              >
                <img
                  src={img}
                  alt="Clothing lookbook"
                  className={cn(
                    "w-full h-full object-cover",
                    lookbookClothingIdx === index ? "animate-hero-zoom" : ""
                  )}
                />
              </div>
            ))}
            {/* Flash overlay */}
            <div className={cn(
              "absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none z-10",
              flash1 ? "opacity-35" : "opacity-0"
            )} />
          </div>

          {/* Panel 2: Glasses */}
          <div className="relative w-1/3 h-full border-r border-white/5 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80"
            ].map((img, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-800 ease-in-out",
                  lookbookGlassesIdx === index ? "opacity-100 z-0" : "opacity-0 -z-10"
                )}
              >
                <img
                  src={img}
                  alt="Glasses lookbook"
                  className={cn(
                    "w-full h-full object-cover",
                    lookbookGlassesIdx === index ? "animate-hero-zoom" : ""
                  )}
                />
              </div>
            ))}
            {/* Flash overlay */}
            <div className={cn(
              "absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none z-10",
              flash2 ? "opacity-35" : "opacity-0"
            )} />
          </div>

          {/* Panel 3: Shoes */}
          <div className="relative w-1/3 h-full overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
            ].map((img, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-800 ease-in-out",
                  lookbookShoesIdx === index ? "opacity-100 z-0" : "opacity-0 -z-10"
                )}
              >
                <img
                  src={img}
                  alt="Shoes lookbook"
                  className={cn(
                    "w-full h-full object-cover",
                    lookbookShoesIdx === index ? "animate-hero-zoom" : ""
                  )}
                />
              </div>
            ))}
            {/* Flash overlay */}
            <div className={cn(
              "absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none z-10",
              flash3 ? "opacity-35" : "opacity-0"
            )} />
          </div>

        </div>
      )}

      {/* Studio Lookbook Copy Overlay text */}
      {activeHeroTab === 0 && (
        <div className="relative z-20 w-full px-4 sm:px-10 lg:px-16 xl:px-24 pointer-events-none">
          <div className="max-w-xl space-y-6 text-white text-left pointer-events-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-black tracking-widest px-4 py-2 rounded shadow-sm">
              ⚡ NEW DROP
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-chaney-title leading-[1.05] uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                URBAN DRIP 2026
              </h1>
              <h2 className="text-sm sm:text-lg font-mono text-zinc-300 font-bold tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                STREETWEAR FOR THE UNCONVENTIONAL
              </h2>
              <p className="text-white text-sm sm:text-[15px] max-w-md leading-relaxed font-sans font-semibold drop-shadow-sm bg-black/40 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/5">
                Explore our latest curation of oversized fits, bold graphics, and industrial outerwear.
              </p>
            </div>


          </div>
        </div>
      )}

      {/* ==================== HERO VIEW 2: INTERACTIVE KICKS CIRCULAR MENU SHOWCASE ==================== */}
      {activeHeroTab === 1 && (
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[48vh] pointer-events-none mt-2">
          
          {/* Left Column: Product Selection Details */}
          <div className="md:col-span-4">
            <ProductDetails
              product={activeProduct}
              selectedColorIdx={selectedColorIdx}
              setSelectedColorIdx={setSelectedColorIdx}
              selectedSizeIdx={selectedSizeIdx}
              setSelectedSizeIdx={setSelectedSizeIdx}
              sizeSystem={sizeSystem}
              setSizeSystem={setSizeSystem}
              onBuy={handleBuy}
            />
          </div>

          {/* Center Column: Big Floating Sneaker Image */}
          <div className="md:col-span-5 flex items-center justify-center">
            <HeroSneaker
              imageSrc={activeColor.img}
              name={activeProduct.name}
              activeProductIdx={activeProductIdx}
              selectedColorIdx={selectedColorIdx}
            />
          </div>

          {/* Right Column: Glowing Neon Circular Carousel Menu */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end">
            <CircularCarousel
              products={HERO_PRODUCTS}
              activeProductIdx={activeProductIdx}
              setActiveProductIdx={handleProductSelect}
              onPrev={handlePrevProduct}
              onNext={handleNextProduct}
            />
          </div>

        </div>
      )}

      {/* Sleek Tab Switcher (Pill design at bottom center to toggle between Slide 1 and Slide 2) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 flex items-center gap-1 shadow-lg pointer-events-auto">
        <button
          onClick={() => setActiveHeroTab(0)}
          className={cn(
            "px-4 py-2 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-full transition-all cursor-pointer border-none",
            activeHeroTab === 0 ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
          )}
        >
          Studio Lookbook
        </button>
        <button
          onClick={() => setActiveHeroTab(1)}
          className={cn(
            "px-4 py-2 text-[9px] sm:text-xs font-black uppercase tracking-wider rounded-full transition-all cursor-pointer border-none",
            activeHeroTab === 1 ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
          )}
        >
          Kicks Showcase
        </button>
      </div>

    </section>
  );
}

export default HeroSection;
