"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

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
    <section className="relative w-full bg-[#f2f2f0] text-black border-y border-zinc-300 py-10 px-4 sm:px-6 lg:px-8 select-none font-mono overflow-hidden">
      
      {/* Background Alignment Crosshairs (+) */}
      <div className="absolute top-4 left-6 text-zinc-400 font-sans text-xl select-none">+</div>
      <div className="absolute top-4 right-6 text-zinc-400 font-sans text-xl select-none">+</div>
      <div className="absolute top-1/2 left-6 text-zinc-400 font-sans text-xl select-none">+</div>
      <div className="absolute top-1/2 right-6 text-zinc-400 font-sans text-xl select-none">+</div>
      <div className="absolute bottom-4 left-6 text-zinc-400 font-sans text-xl select-none">+</div>
      <div className="absolute bottom-4 right-6 text-zinc-400 font-sans text-xl select-none">+</div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* Carousel Navigation Arrow (Left Circular Button) */}
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:-left-4 top-1/3 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black text-white hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer border-none"
          aria-label="Previous System Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel Navigation Arrow (Right Circular Button) */}
        <button
          onClick={handleNext}
          className="absolute right-0 sm:-right-4 top-1/3 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black text-white hover:bg-zinc-800 flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer border-none"
          aria-label="Next System Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* ========================================================================= */}
        {/* MAIN PRODUCT BLUEPRINT CARDS SHOWCASE GRID */}
        {/* ========================================================================= */}
        <div className="relative min-h-[460px] flex items-center justify-center">
          
          {/* Giant Watermark Typography Background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-90 select-none overflow-hidden">
            <span className="text-[75px] sm:text-[130px] lg:text-[160px] font-black tracking-tighter leading-none text-black font-sans uppercase text-center">
              URBAN
            </span>
            <span className="text-[75px] sm:text-[130px] lg:text-[160px] font-black tracking-tighter leading-none text-black font-sans uppercase text-center -mt-4 sm:-mt-8">
              MONKEY
            </span>
          </div>

          {/* 3 Column Blueprint Spec Layout matching exact screenshot */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-20">
            
            {/* Left Column: V9 Patch & Zip Puller Blueprint Cards */}
            <div className="md:col-span-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-zinc-400 p-2 shadow-xs group cursor-pointer hover:border-black transition-colors">
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold mb-1">
                    <span>V9 PATCH</span>
                  </div>
                  <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden border border-zinc-200">
                    <Image
                      src={activeSlide.patchImage}
                      alt="V9 Patch Spec 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="bg-white border border-zinc-400 p-2 shadow-xs group cursor-pointer hover:border-black transition-colors">
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold mb-1">
                    <span>V9 PATCH</span>
                  </div>
                  <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden border border-zinc-200">
                    <Image
                      src={activeSlide.patchImage}
                      alt="V9 Patch Spec 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Zip Puller cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-zinc-300 p-2 text-[8px] text-zinc-600 font-bold text-center">
                  ZIP PULLER // 001
                </div>
                <div className="bg-white border border-zinc-300 p-2 text-[8px] text-zinc-600 font-bold text-center">
                  ZIP PULLER // 002
                </div>
              </div>
            </div>

            {/* Center Column: Angled Floating Tactical Bag (Main Product) */}
            <div className="md:col-span-4 flex justify-center items-center py-4">
              <div className="relative w-72 sm:w-80 aspect-[3/4] transition-all duration-700 transform hover:scale-105 cursor-pointer">
                <Image
                  src={activeSlide.centerImage}
                  alt="Tactical EDC Bag"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Column: Front/Back Wallet & Unfolded Wallet Spec Cards */}
            <div className="md:col-span-4 space-y-4">
              {/* Top Row: Front & Back Bifold Wallet Spec Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-zinc-400 p-2 shadow-xs group cursor-pointer hover:border-black transition-colors">
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold mb-1">
                    <span>FRONT</span>
                    <span>BIFOLD WALLET SML_003</span>
                  </div>
                  <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden border border-zinc-200">
                    <Image
                      src={activeSlide.walletFrontBackImage}
                      alt="Front Wallet Spec"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="bg-white border border-zinc-400 p-2 shadow-xs group cursor-pointer hover:border-black transition-colors">
                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold mb-1">
                    <span>BACK</span>
                    <span>BIFOLD WALLET SML_003</span>
                  </div>
                  <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden border border-zinc-200">
                    <Image
                      src={activeSlide.walletFrontBackImage}
                      alt="Back Wallet Spec"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Wide Unfolded Wallet Spec Card */}
              <div className="bg-white border border-zinc-400 p-2 shadow-xs group cursor-pointer hover:border-black transition-colors">
                <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold mb-1">
                  <span>UNFOLDED</span>
                  <span>BIFOLD WALLET SML_003</span>
                </div>
                <div className="relative aspect-[16/7] w-full bg-zinc-50 overflow-hidden border border-zinc-200">
                  <Image
                    src={activeSlide.unfoldedWalletImage}
                    alt="Unfolded Wallet Spec"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM TECHNICAL SPECIFICATIONS & WORKING BUTTON BAR */}
        {/* ========================================================================= */}
        <div className="text-center space-y-4 pt-4 border-t border-zinc-300">
          
          {/* Header Line with Year, System Title, and Drop Code */}
          <div className="flex items-center justify-between text-xs font-bold text-zinc-600 px-4">
            <span>{activeSlide.year}</span>
            <h2 className="text-xl sm:text-2xl font-black text-black font-sans tracking-tight">
              {activeSlide.systemTitle}
            </h2>
            <span>{activeSlide.dropCode}</span>
          </div>

          {/* Subtitle */}
          <p className="text-xs font-bold tracking-widest text-zinc-700 uppercase">
            {activeSlide.subTitle}
          </p>

          {/* Technical Specs Ticker with Laundry/Care icons & Highlighted Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono py-1">
            <span className="text-zinc-500">🧺 🧼 🚫 </span>
            <span className="border border-blue-600 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
              URBN-MNKEY-SYSTMS
            </span>
            <span>FANNY PACK_{"{"} MED EDC {"}"} , SML003_{"{"} BIFOLD WALLET {"}"} , +_-V9-_{"{"} PATCH {"}"} , +_-PLR_{"{"} ZIP PULLER {"}"}</span>
          </div>

          {/* Working Primary SHOP THE COLLECTION Button */}
          <div className="pt-2">
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center justify-center px-10 py-3.5 bg-black hover:bg-zinc-800 text-white font-mono font-black text-xs uppercase tracking-widest transition-all duration-200 border border-black hover:scale-105 cursor-pointer shadow-md"
            >
              SHOP THE COLLECTION
            </button>
          </div>

          {/* Slider Pagination Dots at Bottom */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {SYSTEM_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-6 bg-black" : "w-2 bg-zinc-300 hover:bg-zinc-500"
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
