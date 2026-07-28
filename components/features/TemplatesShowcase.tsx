"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LookbookData {
  logoTitle: string;
  logoSubtitle: string;
  images: {
    cap: string;
    pants: string;
    sneakers: string;
    shades: string;
    prod1: string;
    prod2: string;
    jersey: string;
    model: string;
    sweatshirt: string;
  };
}

const brandLookbooks: Record<string, LookbookData> = {
  UNRL: {
    logoTitle: "UNRL",
    logoSubtitle: "City of Saints",
    images: {
      cap: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80",
      pants: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
      sneakers: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
      shades: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
      prod1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80",
      prod2: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
      jersey: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80",
      model: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
      sweatshirt: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80"
    }
  },
  BURBERRY: {
    logoTitle: "BURBERRY",
    logoSubtitle: "London, England",
    images: {
      cap: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
      pants: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=400&q=80",
      sneakers: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80",
      shades: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
      prod1: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80",
      prod2: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80",
      jersey: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80",
      model: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
      sweatshirt: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80"
    }
  },
  STUSSY: {
    logoTitle: "STÜSSY",
    logoSubtitle: "Laguna Beach, CA",
    images: {
      cap: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=400&q=80",
      pants: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80",
      sneakers: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80",
      shades: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80",
      prod1: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=200&q=80",
      prod2: "https://images.unsplash.com/photo-1621951753015-740c699ab970?auto=format&fit=crop&w=200&q=80",
      jersey: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80",
      model: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      sweatshirt: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80"
    }
  },
  ESSENTIALS: {
    logoTitle: "ESSENTIALS",
    logoSubtitle: "Fear of God",
    images: {
      cap: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80",
      pants: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80",
      sneakers: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80",
      shades: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
      prod1: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80",
      prod2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80",
      jersey: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80",
      model: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      sweatshirt: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=400&q=80"
    }
  },
  BAPE: {
    logoTitle: "A BATHING APE",
    logoSubtitle: "Tokyo Harajuku",
    images: {
      cap: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
      pants: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
      sneakers: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
      shades: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
      prod1: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80",
      prod2: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80",
      jersey: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      model: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
      sweatshirt: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80"
    }
  }
};

interface DealSlide {
  id: number;
  title: string;
  subtitle: string;
  slogan: string;
  image: string;
  buttonText: string;
  link: string;
  bgStyle: string;
  offers: {
    category: string;
    items: string[];
  }[];
}

const dealSlides: DealSlide[] = [
  {
    id: 1,
    title: "BUY MORE SAVE MORE",
    subtitle: "TOPS & HEELS",
    slogan: "More styles. Bigger savings.",
    image: "/images/deal_banner_1.png",
    buttonText: "View Offers",
    link: "/shop?category=outfits",
    bgStyle: "bg-[#FAF6EE]",
    offers: [
      {
        category: "TOPS",
        items: ["Buy 1 Save ₹100", "Buy 2 Save ₹300", "Buy 3 Save ₹720"]
      },
      {
        category: "HEELS",
        items: ["Buy 1 Save ₹100", "Buy 2 Save ₹598"]
      }
    ]
  },
  {
    id: 2,
    title: "MID SEASON STEAL",
    subtitle: "HOODIES & KICKS",
    slogan: "Premium comfort. Heavy discounts.",
    image: "/images/deal_banner_2.png",
    buttonText: "Shop Collection",
    link: "/shop?category=hoodies",
    bgStyle: "bg-[#F5F2EB]",
    offers: [
      {
        category: "HOODIES",
        items: ["Buy 1 Save ₹200", "Buy 2 Save ₹500", "Buy 3 Save ₹900"]
      },
      {
        category: "KICKS",
        items: ["Flat 30% Off on Sneakers", "Free Shipping Included"]
      }
    ]
  },
  {
    id: 3,
    title: "EXCLUSIVE LOOKBOOK",
    subtitle: "JACKETS & BAGS",
    slogan: "Luxury utility. Elevate your everyday.",
    image: "/images/deal_banner_3.png",
    buttonText: "Claim Offer",
    link: "/shop?category=outerwear",
    bgStyle: "bg-[#FAF6EE]",
    offers: [
      {
        category: "JACKETS",
        items: ["Flat 20% Off on Outerwear", "Limited Edition Drops"]
      },
      {
        category: "BAGS",
        items: ["Save ₹400 on Sling Bags", "Combo Offers Available"]
      }
    ]
  }
];

export function TemplatesShowcase() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
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

  const handleBrandClick = (brandName: string) => {
    if (activeBrand === brandName) {
      setActiveBrand(null); // Clicked second time -> hide it
    } else {
      setActiveBrand(brandName); // First time -> show it
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dealSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dealSlides.length) % dealSlides.length);
  };

  // Get current active lookbook data
  const currentLookbook = activeBrand ? brandLookbooks[activeBrand] : null;

  return (
    <section className="bg-[#FBF9F4] text-[#0A0A0A] py-20 border-t border-b border-[#2B1B17]/10 font-sans select-none">
      
      {/* 1. DEAL OF THE DAY/WEEK SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative">
        <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-wider text-[#0A0A0A] uppercase">
          Deal Of The Day/Week
        </h2>
        <p className="text-[#5C4033] text-xs sm:text-sm max-w-2xl mx-auto mt-3 leading-relaxed font-sans uppercase tracking-wider">
          Discover exclusive limited offers and hot seasonal discount drops across our custom street aesthetic selection.
        </p>
      </div>

      {/* Unified Slideshow Banner Wrapper (Full Width Edge-to-Edge like Hero Banner) */}
      <div 
        onMouseEnter={() => setIsHoveringBanner(true)}
        onMouseLeave={() => setIsHoveringBanner(false)}
        className="relative w-full overflow-hidden border-t border-b border-[#2B1B17]/10 bg-[#FAF6EE] shadow-[0_8px_30px_rgba(43,27,23,0.01)] min-h-[500px] md:h-[540px]"
      >
        {/* Inner slideshow using absolute fade transitions */}
        {dealSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none",
                slide.bgStyle
              )}
            >
              {/* Right Column: Background Image spanning to edge */}
              <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-[240px] md:h-full z-0 overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-transparent to-transparent hidden md:block" />
              </div>

              {/* Centered Content container to align text perfectly with grid */}
              <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row justify-between relative z-10 pointer-events-none">
                {/* Left Column: Promotion Details */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-14 flex flex-col justify-center text-left pointer-events-auto">
                  
                  <span className="font-mono text-[#5C4033] text-xs md:text-sm uppercase tracking-widest mb-1.5 block">
                    {slide.subtitle}
                  </span>
                  
                  <h3 className="font-serif text-[#2B1B17] font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight uppercase mb-2">
                    {slide.title}
                  </h3>
                  
                  <p className="font-serif italic text-zinc-500 text-xs md:text-sm mb-8 block">
                    {slide.slogan}
                  </p>

                  {/* Offers Grid */}
                  <div className="grid grid-cols-2 gap-6 md:gap-8 mb-8 border-t border-[#2B1B17]/10 pt-6">
                    {slide.offers.map((offer, oIdx) => (
                      <div key={oIdx} className="flex flex-col">
                        <span className="font-serif text-[#2B1B17] text-sm md:text-md uppercase tracking-wider border-b border-[#2B1B17]/20 pb-1.5 mb-2.5 font-bold">
                          {offer.category}
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {offer.items.map((item, iIdx) => (
                            <span key={iIdx} className="font-sans font-bold text-zinc-700 text-[11px] md:text-xs tracking-tight">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Button CTA */}
                  <div className="mt-2">
                    <button
                      onClick={() => window.location.href = slide.link}
                      className="bg-[#2B1B17] text-white hover:bg-[#5C4033] hover:scale-102 border border-[#2B1B17] font-sans font-black text-xs uppercase px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      {slide.buttonText}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Left/Right Arrows (Aligned with max-w-6xl boundaries for visual neatness) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pointer-events-none flex justify-between">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white border border-[#2B1B17]/10 flex items-center justify-center text-[#2B1B17] shadow-md pointer-events-auto active:scale-95 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white border border-[#2B1B17]/10 flex items-center justify-center text-[#2B1B17] shadow-md pointer-events-auto active:scale-95 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slider dots pagination */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {dealSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                index === currentSlide ? "bg-[#2B1B17] w-6" : "bg-[#2B1B17]/35"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* 2. BRAND SHOW-CASE SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border pt-16 mt-16 text-center">
        <h3 className="text-xl sm:text-2xl font-heading font-black tracking-widest text-foreground/80 mb-12 uppercase">
          Brand Show-Case
        </h3>

        {/* Brand Logos Row (Single line, circular buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
          
          {/* 1. UNRL */}
          <div 
            onClick={() => handleBrandClick("UNRL")}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 bg-white text-zinc-950 shadow-xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none ${
              activeBrand === "UNRL" 
                ? "border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)] ring-2 ring-[#facc15]/20 font-black" 
                : "border-zinc-200/80 hover:border-zinc-400"
            }`}
          >
            <span className="font-sans font-black text-xs sm:text-sm tracking-tighter uppercase leading-none">
              UNRL<span className="text-[8px] sm:text-[9px] align-super font-black ml-0.5">®</span>
            </span>
          </div>

          {/* 2. BURBERRY */}
          <div 
            onClick={() => handleBrandClick("BURBERRY")}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 bg-white text-zinc-950 shadow-xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none ${
              activeBrand === "BURBERRY" 
                ? "border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)] ring-2 ring-[#facc15]/20 font-black" 
                : "border-zinc-200/80 hover:border-zinc-400"
            }`}
          >
            <span className="font-sans font-extrabold text-[8px] sm:text-[9px] tracking-[0.12em] uppercase leading-none text-center px-1">
              BURBERRY
            </span>
          </div>

          {/* 3. STUSSY */}
          <div 
            onClick={() => handleBrandClick("STUSSY")}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 bg-white text-zinc-950 shadow-xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none ${
              activeBrand === "STUSSY" 
                ? "border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)] ring-2 ring-[#facc15]/20 font-black" 
                : "border-zinc-200/80 hover:border-zinc-400"
            }`}
          >
            <span className="font-serif font-black italic text-xs sm:text-sm tracking-tighter uppercase leading-none">
              STÜSSY
            </span>
          </div>

          {/* 4. ESSENTIALS */}
          <div 
            onClick={() => handleBrandClick("ESSENTIALS")}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 bg-white text-zinc-955 shadow-xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none ${
              activeBrand === "ESSENTIALS" 
                ? "border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)] ring-2 ring-[#facc15]/20 font-black" 
                : "border-zinc-200/80 hover:border-zinc-400"
            }`}
          >
            <span className="font-sans font-bold text-[7.5px] sm:text-[8.5px] tracking-[0.2em] uppercase leading-none">
              ESSENTIALS
            </span>
          </div>

          {/* 5. BAPE */}
          <div 
            onClick={() => handleBrandClick("BAPE")}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-2 bg-white text-zinc-950 shadow-xs hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none ${
              activeBrand === "BAPE" 
                ? "border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)] ring-2 ring-[#facc15]/20 font-black" 
                : "border-zinc-200/80 hover:border-zinc-400"
            }`}
          >
        <span className="font-mono font-black text-xs sm:text-sm tracking-tight uppercase leading-none">
              BAPE
            </span>
          </div>

        </div>
      </div>

      {/* Brand Details & Lookbook Collage Section (Inline Dynamic Expansion) */}
      {activeBrand && currentLookbook && (
        <div className="max-w-4xl mx-auto mt-12 bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-md relative animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setActiveBrand(null)} 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-150/80 hover:bg-zinc-200 text-foreground flex items-center justify-center font-bold text-sm cursor-pointer z-30 transition-colors border-none"
            aria-label="Close brand page"
          >
            ✕
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              {/* Cap */}
              <div className="relative aspect-[4/3] bg-amber-400 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.cap} alt="Cap" fill className="object-cover" sizes="300px" />
              </div>
              {/* Bib pants */}
              <div className="relative aspect-[3/4] bg-orange-55 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.pants} alt="Pants" fill className="object-cover" sizes="300px" />
              </div>
              {/* Sneakers */}
              <div className="relative aspect-square bg-amber-100 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.sneakers} alt="Sneakers" fill className="object-cover" sizes="300px" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {/* Sunglasses */}
              <div className="relative aspect-[4/3] bg-teal-50 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.shades} alt="Sunglasses" fill className="object-cover" sizes="300px" />
              </div>
              {/* Central Logo */}
              <div className="bg-black text-white p-6 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center text-center relative border border-zinc-800 shadow-sm select-none">
                <h4 className="font-black text-4xl tracking-tighter italic uppercase border-b-2 border-white pb-1 mb-1 leading-none">
                  {currentLookbook.logoTitle}
                </h4>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-80 leading-none">
                  {currentLookbook.logoSubtitle}
                </p>
              </div>
              {/* Bottom row items */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square bg-rose-50 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                  <Image src={currentLookbook.images.prod1} alt="Product 1" fill className="object-cover" sizes="150px" />
                </div>
                <div className="relative aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                  <Image src={currentLookbook.images.prod2} alt="Product 2" fill className="object-cover" sizes="150px" />
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              {/* Jersey */}
              <div className="relative aspect-[3/4] bg-cyan-100 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.jersey} alt="Jersey" fill className="object-cover" sizes="300px" />
              </div>
              {/* Model */}
              <div className="relative aspect-square bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.model} alt="Model" fill className="object-cover" sizes="300px" />
              </div>
              {/* Sweatshirt */}
              <div className="relative aspect-[4/3] bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-150 shadow-xs">
                <Image src={currentLookbook.images.sweatshirt} alt="Sweatshirt" fill className="object-cover" sizes="300px" />
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
