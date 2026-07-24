"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UrbanSystemsHeroShowcaseProps {
  onShopCollection?: () => void;
}

const SYSTEM_SLIDES = [
  {
    id: 1,
    dropCode: "DROP003",
    year: "2K26",
    systemTitle: "_URBANMONKEYSYSTEMS",
    subTitle: "THE FUTURE OF URBAN UTILITY GEAR IS HERE.",
    specsLine: "[ URBN-MNKEY-SYSTMS ] FANNY PACK_{ MED EDC } , SML003_{ BIFOLD WALLET } , +_-V9-_{ PATCH } , +_-PLR_{ ZIP PULLER }",
    centerImage: "/images/urban-systems/sling_bag.png",
    patchImage: "/images/urban-systems/v9_patch.png",
    walletFrontBackImage: "/images/urban-systems/wallet_front_back.png",
    unfoldedWalletImage: "/images/urban-systems/unfolded_wallet.png",
  },
  {
    id: 2,
    dropCode: "DROP004",
    year: "2K26",
    systemTitle: "_STREETOUTERWEARSYSTEMS",
    subTitle: "HEAVYWEIGHT DENIM & MODULAR TACTICAL FITS.",
    specsLine: "[ STRT-OTRWR-SYSTMS ] DENIM JACKET_{ HEAVY EDC } , SML004_{ SHIRT } , +_-V10-_{ EMBROIDERY }",
    centerImage: "/images/urban-essentials/denim_jacket.png",
    patchImage: "/images/urban-systems/v9_patch.png",
    walletFrontBackImage: "/images/urban-systems/wallet_front_back.png",
    unfoldedWalletImage: "/images/urban-systems/unfolded_wallet.png",
  },
];

export function UrbanSystemsHeroShowcase({ onShopCollection }: UrbanSystemsHeroShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlide = SYSTEM_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SYSTEM_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SYSTEM_SLIDES.length) % SYSTEM_SLIDES.length);
  };

  const handleButtonClick = () => {
    if (onShopCollection) {
      onShopCollection();
    }
    const element = document.getElementById("tshirt-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/shop";
    }
  };

  return (
    <section className="relative w-full bg-[#f4f4f2] text-black border-y border-zinc-350 py-16 px-4 sm:px-6 lg:px-8 select-none font-mono overflow-hidden">
      
      {/* 1. Technical Draftsman Grid Paper Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.5] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:8px_8px] opacity-[0.25] pointer-events-none z-0" />
      
      {/* CAD Diagnostic Reticles & Blueprint Markings */}
      <div className="absolute top-4 left-6 text-zinc-400 font-sans text-xs select-none pointer-events-none opacity-60">{"[ SYS_ALIGN_01 ]"}</div>
      <div className="absolute top-4 right-6 text-zinc-400 font-sans text-xs select-none pointer-events-none opacity-60">{"[ SYS_ALIGN_02 ]"}</div>
      <div className="absolute bottom-4 left-6 text-zinc-400 font-sans text-xs select-none pointer-events-none opacity-60">{"[ LAT: 34.0522° N ]"}</div>
      <div className="absolute bottom-4 right-6 text-zinc-400 font-sans text-xs select-none pointer-events-none opacity-60">{"[ LON: 118.2437° W ]"}</div>

      <div className="absolute top-1/2 left-4 text-zinc-300 font-sans text-lg select-none pointer-events-none opacity-40">+</div>
      <div className="absolute top-1/2 right-4 text-zinc-300 font-sans text-lg select-none pointer-events-none opacity-40">+</div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Carousel Navigation Arrow (Left Floating Glass Circle) */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/3 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-zinc-300 bg-white/70 backdrop-blur-md text-zinc-800 hover:text-white hover:bg-black hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Previous System Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Navigation Arrow (Right Floating Glass Circle) */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/3 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-zinc-300 bg-white/70 backdrop-blur-md text-zinc-800 hover:text-white hover:bg-black hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Next System Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* MAIN PRODUCT BLUEPRINT CARDS SHOWCASE GRID */}
        {/* ========================================================================= */}
        <div className="relative min-h-[480px] flex items-center justify-center">
          
          {/* Giant Watermark Typography Background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
            <span className="text-[100px] sm:text-[180px] lg:text-[230px] font-black tracking-tighter leading-none text-black font-sans uppercase text-center">
              URBAN
            </span>
            <span className="text-[100px] sm:text-[180px] lg:text-[230px] font-black tracking-tighter leading-none text-black font-sans uppercase text-center -mt-8 sm:-mt-16">
              MONKEY
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20"
            >
              
              {/* Left Column: V9 Patch & Zip Puller Blueprint Cards */}
              <div className="md:col-span-4 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Patch Spec Card 1 */}
                  <div className="bg-white/95 backdrop-blur-xs border border-zinc-300/80 p-3 hover:border-zinc-950 transition-all duration-300 relative overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,0.03)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.06)] cursor-pointer">
                    {/* Technical Card Accents */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-zinc-400 group-hover:border-black" />
                    
                    {/* Diagonal Sweep Reflection */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" />

                    <div className="flex justify-between items-center text-[7px] font-bold text-zinc-450 tracking-wider mb-2">
                      <span>{"[ SPEC // 01-A ]"}</span>
                      <span>V9_PATCH</span>
                    </div>
                    <div className="relative aspect-square w-full bg-[#fafaf8] overflow-hidden border border-zinc-200/60 rounded">
                      <Image
                        src={activeSlide.patchImage}
                        alt="V9 Patch Spec 1"
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Patch Spec Card 2 */}
                  <div className="bg-white/95 backdrop-blur-xs border border-zinc-300/80 p-3 hover:border-zinc-950 transition-all duration-300 relative overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,0.03)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.06)] cursor-pointer">
                    {/* Technical Card Accents */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-zinc-400 group-hover:border-black" />
                    
                    {/* Diagonal Sweep Reflection */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" />

                    <div className="flex justify-between items-center text-[7px] font-bold text-zinc-450 tracking-wider mb-2">
                      <span>{"[ SPEC // 01-B ]"}</span>
                      <span>V9_PATCH</span>
                    </div>
                    <div className="relative aspect-square w-full bg-[#fafaf8] overflow-hidden border border-zinc-200/60 rounded">
                      <Image
                        src={activeSlide.patchImage}
                        alt="V9 Patch Spec 2"
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Zip Puller cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/95 border border-zinc-350 p-2.5 text-[8px] text-zinc-600 font-bold text-center tracking-widest relative overflow-hidden shadow-2xs">
                    <div className="absolute top-0 left-0 w-1 h-[1px] bg-zinc-600" />
                    <div className="absolute top-0 left-0 w-[1px] h-1 bg-zinc-600" />
                    ZIP_PULLER // 01
                  </div>
                  <div className="bg-white/95 border border-zinc-350 p-2.5 text-[8px] text-zinc-600 font-bold text-center tracking-widest relative overflow-hidden shadow-2xs">
                    <div className="absolute top-0 right-0 w-1 h-[1px] bg-zinc-600" />
                    <div className="absolute top-0 right-0 w-[1px] h-1 bg-zinc-600" />
                    ZIP_PULLER // 02
                  </div>
                </div>
              </div>

              {/* Center Column: Rotating Compass + Center Showcase Gear */}
              <div className="md:col-span-4 flex justify-center items-center py-6 relative">
                
                {/* Rotating Engineering / Compass circle markings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-zinc-300/80 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-[340px] h-[340px] rounded-full border border-zinc-250/50 animate-[spin_90s_linear_infinite_reverse]" />
                  <div className="absolute w-[390px] h-[390px] rounded-full border border-zinc-200/30" />
                </div>

                {/* Main Product Container */}
                <div className="relative w-72 sm:w-80 aspect-[3/4] transition-all duration-500 transform hover:scale-105 cursor-pointer z-10">
                  <Image
                    src={activeSlide.centerImage}
                    alt={activeSlide.subTitle}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </div>

              {/* Right Column: Front/Back Wallet & Unfolded Wallet Spec Cards */}
              <div className="md:col-span-4 space-y-5">
                
                {/* Top Row: Front & Back Bifold Wallet Spec Cards */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Front Spec Card */}
                  <div className="bg-white/95 backdrop-blur-xs border border-zinc-300/80 p-3 hover:border-zinc-950 transition-all duration-300 relative overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,0.03)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.06)] cursor-pointer">
                    {/* Technical Card Accents */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-zinc-400 group-hover:border-black" />
                    
                    {/* Diagonal Sweep Reflection */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" />

                    <div className="flex justify-between items-center text-[7px] font-bold text-zinc-450 tracking-wider mb-2">
                      <span>{"[ SPEC // 02-F ]"}</span>
                      <span>FRONT</span>
                    </div>
                    <div className="relative aspect-square w-full bg-[#fafaf8] overflow-hidden border border-zinc-200/60 rounded">
                      <Image
                        src={activeSlide.walletFrontBackImage}
                        alt="Front Wallet Spec"
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Back Spec Card */}
                  <div className="bg-white/95 backdrop-blur-xs border border-zinc-300/80 p-3 hover:border-zinc-950 transition-all duration-300 relative overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,0.03)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.06)] cursor-pointer">
                    {/* Technical Card Accents */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-zinc-400 group-hover:border-black" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-zinc-400 group-hover:border-black" />
                    
                    {/* Diagonal Sweep Reflection */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" />

                    <div className="flex justify-between items-center text-[7px] font-bold text-zinc-450 tracking-wider mb-2">
                      <span>{"[ SPEC // 02-B ]"}</span>
                      <span>BACK</span>
                    </div>
                    <div className="relative aspect-square w-full bg-[#fafaf8] overflow-hidden border border-zinc-200/60 rounded">
                      <Image
                        src={activeSlide.walletFrontBackImage}
                        alt="Back Wallet Spec"
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Wide Unfolded Wallet Spec Card */}
                <div className="bg-white/95 backdrop-blur-xs border border-zinc-300/80 p-3 hover:border-zinc-950 transition-all duration-300 relative overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,0.03)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.06)] cursor-pointer">
                  {/* Technical Card Accents */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-zinc-400 group-hover:border-black" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-zinc-400 group-hover:border-black" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-zinc-400 group-hover:border-black" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-zinc-400 group-hover:border-black" />
                  
                  {/* Diagonal Sweep Reflection */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" />

                  <div className="flex justify-between items-center text-[7px] font-bold text-zinc-450 tracking-wider mb-2">
                    <span>{"[ SPEC // 02-U ]"}</span>
                    <span>UNFOLDED_VIEW</span>
                  </div>
                  <div className="relative aspect-[16/7] w-full bg-[#fafaf8] overflow-hidden border border-zinc-200/60 rounded">
                    <Image
                      src={activeSlide.unfoldedWalletImage}
                      alt="Unfolded Wallet Spec"
                      fill
                      sizes="360px"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM TECHNICAL SPECIFICATIONS & WORKING BUTTON BAR */}
        {/* ========================================================================= */}
        <div className="text-center space-y-6 pt-8 border-t border-zinc-300">
          
          {/* Header Line with Year, System Title, and Drop Code */}
          <div className="flex items-center justify-between text-xs font-extrabold text-zinc-500 px-4">
            <span className="font-mono tracking-widest">{`[ ${activeSlide.year} // SYSTEM_D ]`}</span>
            <h2 className="text-xl sm:text-2xl font-black text-black font-sans tracking-[0.1em] uppercase">
              {activeSlide.systemTitle}
            </h2>
            <span className="font-mono tracking-widest">{`[ ${activeSlide.dropCode} ]`}</span>
          </div>

          {/* Subtitle */}
          <p className="text-xs font-extrabold tracking-[0.2em] text-zinc-700 uppercase">
            {activeSlide.subTitle}
          </p>

          {/* Technical Specs Ticker with Blueprint tags & Highlighted Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[9px] text-zinc-600 font-mono py-1.5 max-w-3xl mx-auto uppercase">
            <span className="border border-zinc-350 text-zinc-800 bg-zinc-200/60 px-2 py-0.5 rounded font-black tracking-widest">
              [ STATUS: ACTIVE ]
            </span>
            <span className="border border-zinc-350 text-zinc-800 bg-zinc-200/60 px-2 py-0.5 rounded font-black tracking-widest">
              [ CLASSIFICATION: EDC ]
            </span>
            <span className="border border-blue-600 text-blue-800 bg-blue-50/70 px-2.5 py-0.5 rounded font-black tracking-widest">
              URBN-MNKEY-SYSTMS
            </span>
            <span className="text-zinc-500 tracking-wider">
              {activeSlide.specsLine}
            </span>
          </div>

          {/* Working Primary SHOP THE COLLECTION Button */}
          <div className="pt-2">
            <button
              onClick={handleButtonClick}
              className="relative inline-flex items-center justify-center gap-3 px-12 py-4 bg-zinc-950 text-white font-mono font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-zinc-950 hover:bg-white hover:text-zinc-950 cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,0.15)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,0.15)] overflow-hidden group"
            >
              <span>SHOP THE COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Slider Pagination Dots at Bottom */}
          <div className="flex items-center justify-center gap-2.5 pt-4">
            {SYSTEM_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-zinc-950" : "w-2.5 bg-zinc-300 hover:bg-zinc-500"
                }`}
                aria-label={`Go to system slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

