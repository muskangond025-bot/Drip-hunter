"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Flame, ArrowUpRight, Sparkles, ShieldCheck, Tag } from "lucide-react";

interface UrbanHeroSectionShowcaseProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORY_RIBBON = [
  { label: "NEW DROPS", icon: Flame, category: "All", isHot: true },
  { label: "CAPS", icon: Tag, category: "Headwear" },
  { label: "TEES", icon: Tag, category: "Clothing" },
  { label: "SHIRTS", icon: Tag, category: "Clothing" },
  { label: "CARGOS", icon: Tag, category: "Clothing" },
  { label: "ACCESSORIES", icon: Tag, category: "Accessories" },
  { label: "BACKPACKS", icon: Tag, category: "Bags" },
  { label: "SLINGS", icon: Tag, category: "Bags" },
  { label: "WALLETS", icon: Tag, category: "Wallets" },
  { label: "GLASSES", icon: Tag, category: "Accessories" },
];

const HERO_SLIDES = [
  {
    id: 1,
    tag: "TACTICAL UTILITY DROP // 2026",
    headline: "MODULAR STREET BAGS & WALLETS",
    description: "Engineered with weatherproof nylon, industrial hardware, and multi-compartment utility storage for the city.",
    mainImage: "/images/urban-essentials/fanny_pack.png",
    leftImage: "/images/urban-essentials/bifold_wallet.png",
    rightImage: "/images/urban-essentials/sling_bag.png",
    primaryActionText: "SHOP ALL DROPS",
    primaryCategory: "Bags",
    secondaryActionText: "VIEW UTILITY BAGS",
    secondaryCategory: "Bags",
  },
  {
    id: 2,
    tag: "SIGNATURE OUTERWEAR // DROP 02",
    headline: "PATCHWORK DENIM & OVERSIZED SHIRTS",
    description: "Heavyweight indigo denim featuring custom embroidered patches, contrast stitching, and boxy silhouette.",
    mainImage: "/images/urban-essentials/denim_jacket.png",
    leftImage: "/images/urban-essentials/full_sleeve_shirt.png",
    rightImage: "/images/urban-essentials/short_sleeve_shirt.png",
    primaryActionText: "SHOP ALL DROPS",
    primaryCategory: "Clothing",
    secondaryActionText: "VIEW CLOTHING",
    secondaryCategory: "Clothing",
  },
  {
    id: 3,
    tag: "STREET ESSENTIALS // DROP 03",
    headline: "RIPSTOP CARGO PANTS & ACCS",
    description: "Durable ripstop cargo pants with utility buckled straps paired with compact coin card holders.",
    mainImage: "/images/urban-essentials/cargo_pants.png",
    leftImage: "/images/urban-essentials/coin_card_holder.png",
    rightImage: "/images/urban-essentials/bifold_wallet.png",
    primaryActionText: "SHOP ALL DROPS",
    primaryCategory: "Clothing",
    secondaryActionText: "VIEW CARGOS",
    secondaryCategory: "Clothing",
  },
];

export function UrbanHeroSectionShowcase({ onSelectCategory }: UrbanHeroSectionShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide cycle every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const element = document.getElementById("tshirt-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/shop?category=${encodeURIComponent(category)}`;
    }
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="w-full bg-zinc-100 text-black border-y border-zinc-300 py-6 px-4 sm:px-6 lg:px-8 select-none overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. TOP CATEGORY RIBBON ROW (Icons bar right under hero banner) */}
        {/* ========================================================================= */}
        <div className="bg-white border border-zinc-200 rounded-xl p-2.5 shadow-xs overflow-x-auto no-scrollbar flex items-center justify-between gap-4">
          {CATEGORY_RIBBON.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer border ${
                  cat.isHot
                    ? "bg-black text-amber-400 border-black hover:bg-zinc-800"
                    : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:bg-black hover:text-white hover:border-black"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${cat.isHot ? "animate-pulse text-amber-400" : ""}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO BANNER CAROUSEL SHOWCASE (Urban Watermark Banner & Product Cards) */}
        {/* ========================================================================= */}
        <div className="relative bg-white border border-zinc-300 rounded-2xl p-6 sm:p-10 shadow-md overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Watermark Background Graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
            <span className="text-[120px] sm:text-[180px] font-black tracking-tighter font-mono uppercase text-black select-none whitespace-nowrap">
              URBAN MONKEY // DRIP
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white text-zinc-800 border border-zinc-300 flex items-center justify-center transition-all shadow-md cursor-pointer"
            aria-label="Previous Hero Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white text-zinc-800 border border-zinc-300 flex items-center justify-center transition-all shadow-md cursor-pointer"
            aria-label="Next Hero Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Main Slide Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3 Product Cards Feature Grid */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4 items-center">
              
              {/* Left Secondary Card */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-2xs group cursor-pointer hover:border-black transition-colors"
                   onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}>
                <Image
                  src={activeSlideData.leftImage}
                  alt="Feature Left"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="20vw"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                  // 001
                </div>
              </div>

              {/* Center Main Spotlight Card */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border-2 border-black shadow-lg group cursor-pointer scale-105 z-10"
                   onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}>
                <Image
                  src={activeSlideData.mainImage}
                  alt="Feature Center Main"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="30vw"
                />
                <span className="absolute top-2 left-2 bg-black text-amber-400 text-[9px] font-black font-mono px-2 py-0.5 uppercase tracking-widest z-10">
                  FEATURED DROP
                </span>
              </div>

              {/* Right Secondary Card */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-2xs group cursor-pointer hover:border-black transition-colors"
                   onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}>
                <Image
                  src={activeSlideData.rightImage}
                  alt="Feature Right"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="20vw"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                  // 002
                </div>
              </div>

            </div>

            {/* Slide Information & Action Buttons */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {activeSlideData.tag}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-zinc-900 leading-tight">
                {activeSlideData.headline}
              </h2>

              <p className="text-xs sm:text-sm font-sans text-zinc-600 leading-relaxed">
                {activeSlideData.description}
              </p>

              {/* Working Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}
                  className="bg-black hover:bg-zinc-800 text-white font-mono font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all shadow-md hover:scale-105 cursor-pointer border border-black flex items-center gap-2"
                >
                  <span>{activeSlideData.primaryActionText}</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => handleCategoryClick(activeSlideData.secondaryCategory)}
                  className="bg-white hover:bg-zinc-100 text-black font-mono font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-lg transition-all cursor-pointer border border-zinc-300 hover:border-black"
                >
                  {activeSlideData.secondaryActionText}
                </button>
              </div>
            </div>

          </div>

          {/* Slider Pagination Dots at Bottom */}
          <div className="relative z-10 flex items-center justify-center gap-2 pt-6">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-black" : "w-2 bg-zinc-300 hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
