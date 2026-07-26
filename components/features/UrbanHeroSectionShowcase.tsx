"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flame, ArrowUpRight, ShieldCheck, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeSneakerShowcase } from "@/components/ui/ThreeSneakerShowcase";

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
  {
    id: 4,
    tag: "HYBRID SNEAKERS // DROP 04",
    headline: "INTERACTIVE 3D PLATFORM KICKS",
    description: "Experience our prototype hybrid sneakers in full interactive 3D. Fully rotating sole, tactical lock laces, and mesh weave.",
    mainImage: "3d-sneaker",
    leftImage: "/images/puma_red_exact.png",
    rightImage: "/images/puma_black_pink_exact.png",
    primaryActionText: "SHOP SNEAKERS",
    primaryCategory: "Footwear",
    secondaryActionText: "VIEW FOOTWEAR",
    secondaryCategory: "Footwear",
  },
];

export function UrbanHeroSectionShowcase({ onSelectCategory }: UrbanHeroSectionShowcaseProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide cycle every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
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
      router.push(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="w-full bg-[#f5f5f3] text-black border-y border-zinc-200/80 py-12 px-4 sm:px-6 lg:px-8 select-none overflow-hidden relative">
      {/* Blueprint Grid Background Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. TOP CATEGORY RIBBON ROW (Modular Technical Navigation Bar) */}
        {/* ========================================================================= */}
        <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-2xl p-3 shadow-xs overflow-x-auto no-scrollbar flex items-center justify-between gap-3">
          {CATEGORY_RIBBON.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest shrink-0 transition-all cursor-pointer border group/tab ${
                  cat.isHot
                    ? "bg-zinc-950 text-amber-400 border-zinc-950 hover:bg-zinc-800 shadow-sm"
                    : "bg-zinc-50/50 text-zinc-600 border-zinc-200/60 hover:bg-zinc-950 hover:text-white hover:border-zinc-950"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover/tab:scale-110 ${cat.isHot ? "animate-pulse text-amber-400" : "text-zinc-400 group-hover/tab:text-white"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO BANNER CAROUSEL SHOWCASE (Editorial Layout & Spotlight Collage) */}
        {/* ========================================================================= */}
        <div className="relative bg-white border border-zinc-200/80 rounded-[32px] p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          {/* Watermark Background Graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
            <span className="text-[120px] sm:text-[190px] font-black tracking-tighter font-sans uppercase text-black select-none whitespace-nowrap">
              URBAN MONKEY // SYS
            </span>
          </div>

          {/* Dotted Grid Pattern Details */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Main Slide Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* 3 Product Cards Collage Grid */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-6 items-center">
              <AnimatePresence mode="wait">
                {/* Left Card */}
                <motion.div
                  key={`left-${currentSlide}`}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 border border-zinc-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] group cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}
                >
                  <Image
                    src={activeSlideData.leftImage}
                    alt="Feature Left"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="20vw"
                  />
                  {/* Sheen sheen sweep overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-15" />
                  
                  {/* Technical details */}
                  <div className="absolute top-3 left-3 z-10 opacity-30">
                    <span className="block w-1.5 h-1.5 border-t border-l border-black"></span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/85 text-white text-[8px] font-mono px-2 py-0.5 rounded-md font-bold tracking-wider">
                    {"// SPEC_01"}
                  </div>
                </motion.div>

                {/* Center Spotlight Card */}
                <motion.div
                  key={`center-${currentSlide}`}
                  initial={{ opacity: 0, y: 15, scale: 1.02 }}
                  animate={{ opacity: 1, y: 0, scale: 1.05 }}
                  exit={{ opacity: 0, y: 15, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                  className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white border-2 border-zinc-950 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12)] group cursor-pointer scale-105 z-10 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.18)] transition-all flex items-center justify-center"
                  onClick={() => activeSlideData.mainImage !== "3d-sneaker" && handleCategoryClick(activeSlideData.primaryCategory)}
                >
                  {activeSlideData.mainImage === "3d-sneaker" ? (
                    <div className="w-full h-full bg-zinc-950 relative">
                      <ThreeSneakerShowcase />
                    </div>
                  ) : (
                    <Image
                      src={activeSlideData.mainImage}
                      alt="Feature Center Main"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="30vw"
                      priority
                    />
                  )}
                  {/* Sheen sheen sweep overlay */}
                  {activeSlideData.mainImage !== "3d-sneaker" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-15" />
                  )}

                  {/* Corner crosshairs focus details */}
                  <div className="absolute top-4 left-4 z-10 opacity-60">
                    <span className="block w-2.5 h-2.5 border-t-2 border-l-2 border-black"></span>
                  </div>
                  <div className="absolute top-4 right-4 z-10 opacity-60">
                    <span className="block w-2.5 h-2.5 border-t-2 border-r-2 border-black"></span>
                  </div>
                  
                  <span className="absolute top-4 left-4 right-4 text-center bg-zinc-950 text-amber-400 text-[8.5px] font-black font-mono py-1 rounded-md uppercase tracking-[0.2em] z-10 shadow-sm mx-4">
                    SPOTLIGHT DROP
                  </span>
                </motion.div>

                {/* Right Card */}
                <motion.div
                  key={`right-${currentSlide}`}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative aspect-[4/5] rounded-[20px] overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 border border-zinc-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] group cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}
                >
                  <Image
                    src={activeSlideData.rightImage}
                    alt="Feature Right"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="20vw"
                  />
                  {/* Sheen sheen sweep overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-15" />
                  
                  {/* Technical details */}
                  <div className="absolute top-3 right-3 z-10 opacity-30">
                    <span className="block w-1.5 h-1.5 border-t border-r border-black"></span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/85 text-white text-[8px] font-mono px-2 py-0.5 rounded-md font-bold tracking-wider">
                    {"// SPEC_02"}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Information & Action Buttons */}
            <div className="lg:col-span-5 space-y-6 text-left lg:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentSlide}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-5"
                >
                  {/* Drop ID Badge */}
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-lg uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {activeSlideData.tag}
                  </div>

                  {/* Headline */}
                  <h2 className="text-3xl sm:text-4xl font-black font-sans uppercase tracking-tight text-zinc-950 leading-[1.1] [text-shadow:0_1px_1px_rgba(0,0,0,0.01)]">
                    {activeSlideData.headline}
                  </h2>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm font-sans text-zinc-500 leading-relaxed font-medium">
                    {activeSlideData.description}
                  </p>

                  {/* Working Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => handleCategoryClick(activeSlideData.primaryCategory)}
                      className="bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-[11px] uppercase tracking-[0.18em] px-7 py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer border border-zinc-950 flex items-center gap-2.5 group/btn"
                    >
                      <span>{activeSlideData.primaryActionText}</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={() => handleCategoryClick(activeSlideData.secondaryCategory)}
                      className="bg-white hover:bg-zinc-50 text-zinc-800 font-mono font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-4 rounded-xl transition-all cursor-pointer border border-zinc-200 hover:border-zinc-400"
                    >
                      {activeSlideData.secondaryActionText}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* BOTTOM DOCK (Unified Arrow controls & Slide Progress indicators) */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-8 mt-10 z-15 relative">
            
            {/* Pagination Line / Dots */}
            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? "w-9 bg-zinc-950" : "w-2.5 bg-zinc-200 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Custom Control Dock Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:border-zinc-950 hover:bg-zinc-950 text-zinc-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group/arrow"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover/arrow:-translate-x-0.5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:border-zinc-950 hover:bg-zinc-950 text-zinc-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 group/arrow"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 transition-transform group-hover/arrow:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
