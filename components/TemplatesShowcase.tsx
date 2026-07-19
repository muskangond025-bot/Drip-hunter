"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

const dealPages = [
  // Page 1
  [
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#581c87] to-[#3b0764]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none">
          <span className="text-yellow-400 text-3xl sm:text-4xl block uppercase font-mono drop-shadow-md">DEAL</span>
          <span className="text-cyan-300 text-sm block italic my-1.5 font-bold font-sans">of the</span>
          <span className="text-yellow-400 text-4xl sm:text-5xl block uppercase font-mono drop-shadow-md">DAY</span>
        </div>
      )
    },
    {
      bg: "bg-[#e11d48]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center gap-2">
          <span className="bg-yellow-400 text-black text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">DEAL OF THE</span>
          <span className="text-white text-4xl sm:text-5xl uppercase font-mono drop-shadow-md">WEEK</span>
          <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mt-1">SHOP NOW!</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#f59e0b] to-[#ea580c]",
      content: (
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="bg-red-650 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">THIS WEEK ONLY</span>
          <span className="bg-cyan-400 text-white text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wide">BEST DEAL</span>
          <span className="bg-black text-white text-sm font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider">BIG OFFER</span>
          <span className="text-red-600 text-[9px] font-extrabold uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-red-500 mt-1">UP TO 50% OFF</span>
        </div>
      )
    }
  ],
  // Page 2
  [
    {
      bg: "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none">
          <span className="text-orange-455 text-3xl sm:text-4xl block uppercase font-mono drop-shadow-md">FLASH</span>
          <span className="text-white text-sm block italic my-1.5 font-bold font-sans">SALE</span>
          <span className="text-orange-455 text-4xl sm:text-5xl block uppercase font-mono drop-shadow-md">70% OFF</span>
        </div>
      )
    },
    {
      bg: "bg-[#059669]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center gap-2">
          <span className="bg-[#fef08a] text-black text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">MID-SEASON</span>
          <span className="text-white text-4xl sm:text-5xl uppercase font-mono drop-shadow-md">SPECIAL</span>
          <span className="text-[#fef08a] text-[10px] font-bold uppercase tracking-widest mt-1">LIMITED STOCKS</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#be123c] to-[#9f1239]",
      content: (
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="bg-black text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">EXCLUSIVE CODES</span>
          <span className="bg-yellow-400 text-black text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wide">BUY 1 GET 1</span>
          <span className="bg-white text-zinc-900 text-sm font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider">FREE TEES</span>
          <span className="text-yellow-500 text-[9px] font-extrabold uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded-full mt-1">CODE: FREE20</span>
        </div>
      )
    }
  ],
  // Page 3
  [
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#2e1065] to-[#1e1b4b]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none">
          <span className="text-cyan-400 text-3xl sm:text-4xl block uppercase font-mono drop-shadow-md">HOODIE</span>
          <span className="text-yellow-400 text-sm block italic my-1.5 font-bold font-sans">SPECIAL</span>
          <span className="text-cyan-400 text-4xl sm:text-5xl block uppercase font-mono drop-shadow-md">DROP DEALS</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#0d9488] to-[#115e59]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center gap-2">
          <span className="bg-black text-yellow-400 text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">WEEKEND ONLY</span>
          <span className="text-white text-4xl sm:text-5xl uppercase font-mono drop-shadow-md">STEALS</span>
          <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mt-1">Flat 40% Off</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#3f3f46] to-[#18181b]",
      content: (
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="bg-yellow-400 text-black text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">WORLDWIDE</span>
          <span className="bg-white text-black text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wide">FREE SHIPPING</span>
          <span className="bg-zinc-800 text-white text-sm font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider">NO MINIMUM</span>
          <span className="text-yellow-400 text-[9px] font-extrabold uppercase tracking-widest mt-1">AUTOMATIC APPLY</span>
        </div>
      )
    }
  ],
  // Page 4
  [
    {
      bg: "bg-gradient-to-br from-[#365314] via-[#1a2e05] to-[#0f1d02]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none">
          <span className="text-yellow-400 text-3xl sm:text-4xl block uppercase font-mono drop-shadow-md">CARGO</span>
          <span className="text-white text-sm block italic my-1.5 font-bold font-sans">PANTS</span>
          <span className="text-yellow-400 text-4xl sm:text-5xl block uppercase font-mono drop-shadow-md">SAVINGS</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#3730a3] to-[#1e1b4b]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center gap-2">
          <span className="bg-yellow-400 text-black text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">MEMBERS ONLY</span>
          <span className="text-white text-4xl sm:text-5xl uppercase font-mono drop-shadow-md">DRIP CLUB</span>
          <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mt-1">Get Extra 20% Off</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#78350f] to-[#451a03]",
      content: (
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="bg-black text-yellow-500 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">LUCKY BOX</span>
          <span className="bg-white text-black text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wide">MYSTERY BOX</span>
          <span className="bg-yellow-500 text-black text-sm font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider">DROPS ONCE</span>
          <span className="text-white text-[9px] font-extrabold uppercase tracking-widest mt-1">LIMITED 100 PIECES</span>
        </div>
      )
    }
  ],
  // Page 5
  [
    {
      bg: "bg-gradient-to-br from-[#ea580c] via-[#ca8a04] to-[#854d0e]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none">
          <span className="text-white text-3xl sm:text-4xl block uppercase font-mono drop-shadow-md">VINTAGE</span>
          <span className="text-black text-sm block italic my-1.5 font-bold font-sans">TEE</span>
          <span className="text-white text-4xl sm:text-5xl block uppercase font-mono drop-shadow-md">SPECIALS</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#e11d48] to-[#be123c]",
      content: (
        <div className="text-center font-black tracking-tighter leading-none flex flex-col items-center gap-2">
          <span className="bg-black text-[#fecdd3] text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">FINAL CALL</span>
          <span className="text-white text-4xl sm:text-5xl uppercase font-mono drop-shadow-md">CLEANOUT</span>
          <span className="text-[#fecdd3] text-[10px] font-bold uppercase tracking-widest mt-1">Everything Must Go</span>
        </div>
      )
    },
    {
      bg: "bg-gradient-to-br from-[#0284c7] to-[#0369a1]",
      content: (
        <div className="text-center flex flex-col items-center gap-1.5">
          <span className="bg-black text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">FINANCE SUPPORT</span>
          <span className="bg-[#e0f2fe] text-[#0369a1] text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wide">BUY NOW</span>
          <span className="bg-white text-black text-sm font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider">PAY LATER</span>
          <span className="text-yellow-400 text-[9px] font-extrabold uppercase tracking-widest mt-1">INTEREST FREE</span>
        </div>
      )
    }
  ]
];

export function TemplatesShowcase() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [currentDealPage, setCurrentDealPage] = useState(0);

  const handleBrandClick = (brandName: string) => {
    if (activeBrand === brandName) {
      setActiveBrand(null); // Clicked second time -> hide it
    } else {
      setActiveBrand(brandName); // First time -> show it
    }
  };

  // Get current active lookbook data
  const currentLookbook = activeBrand ? brandLookbooks[activeBrand] : null;

  return (
    <section className="bg-white text-black py-20 border-t border-b border-zinc-100 font-sans select-none">
      
      {/* 1. DEAL OF THE DAY/WEEK SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          Deal Of The Day/Week
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto mt-3 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </p>

        {/* Banners Grid */}
        <div className="relative overflow-hidden mt-10 max-w-5xl mx-auto min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDealPage}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.23 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {dealPages[currentDealPage].map((card, i) => (
                <div 
                  key={i} 
                  className={`${card.bg} rounded-3xl aspect-[1.6] flex flex-col items-center justify-center p-6 shadow-md relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300`}
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  {card.content}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots Row */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          <button 
            onClick={() => setCurrentDealPage(prev => (prev === 0 ? dealPages.length - 1 : prev - 1))}
            className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center hover:bg-zinc-200 transition-colors text-xs font-bold font-mono cursor-pointer border-none"
          >
            &lt;
          </button>
          
          {dealPages.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentDealPage(idx)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all cursor-pointer border-none ${
                currentDealPage === idx 
                  ? "bg-orange-500 text-white shadow-xs" 
                  : "bg-zinc-50 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentDealPage(prev => (prev === dealPages.length - 1 ? 0 : prev + 1))}
            className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center hover:bg-zinc-200 transition-colors text-xs font-bold font-mono cursor-pointer border-none"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* 2. BRAND SHOW-CASE SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-150 pt-16 mt-16 text-center">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-800 mb-12 animate-pulse">
          Brand Show-Case
        </h3>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-10 gap-x-6 items-center justify-items-center max-w-4xl mx-auto">
          {/* Row 1 */}
          {/* 1. UNRL */}
          <div 
            onClick={() => handleBrandClick("UNRL")}
            className={`font-black text-xl sm:text-2xl tracking-tighter flex items-baseline font-sans cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "UNRL" ? "text-orange-500 scale-102" : "text-black"
            }`}
          >
            UNRL<span className="text-[10px] align-super font-bold ml-0.5">®</span>
          </div>
          {/* 2. BURBERRY */}
          <div 
            onClick={() => handleBrandClick("BURBERRY")}
            className={`font-extrabold text-[10px] sm:text-xs tracking-[0.25em] font-sans cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "BURBERRY" ? "text-orange-500 scale-102" : "text-black"
            }`}
          >
            BURBERRY
          </div>
          {/* 3. STUSSY */}
          <div 
            onClick={() => handleBrandClick("STUSSY")}
            className={`font-black text-lg sm:text-xl tracking-tighter italic uppercase font-serif cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "STUSSY" ? "text-orange-500 scale-102 font-bold" : "text-zinc-400"
            }`}
          >
            STUSSY
          </div>
          {/* 4. ESSENTIALS */}
          <div 
            onClick={() => handleBrandClick("ESSENTIALS")}
            className={`font-bold text-[9px] sm:text-[10px] tracking-[0.3em] font-sans uppercase cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "ESSENTIALS" ? "text-orange-500 scale-102" : "text-zinc-400"
            }`}
          >
            ESSENTIALS
          </div>
          {/* 5. BAPE */}
          <div 
            onClick={() => handleBrandClick("BAPE")}
            className={`font-black text-base sm:text-lg tracking-tight font-mono uppercase cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "BAPE" ? "text-orange-500 scale-102" : "text-zinc-600"
            }`}
          >
            BAPE
          </div>

          {/* Row 2 */}
          {/* 6. STUSSY */}
          <div 
            onClick={() => handleBrandClick("STUSSY")}
            className={`font-black text-lg sm:text-xl tracking-tighter italic uppercase font-serif cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "STUSSY" ? "text-orange-500 scale-102" : "text-zinc-400"
            }`}
          >
            STUSSY
          </div>
          {/* 7. ESSENTIALS */}
          <div 
            onClick={() => handleBrandClick("ESSENTIALS")}
            className={`font-bold text-[9px] sm:text-[10px] tracking-[0.3em] font-sans uppercase cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "ESSENTIALS" ? "text-orange-500 scale-102" : "text-zinc-400"
            }`}
          >
            ESSENTIALS
          </div>
          {/* 8. STUSSY */}
          <div 
            onClick={() => handleBrandClick("STUSSY")}
            className={`font-black text-lg sm:text-xl tracking-tighter italic uppercase font-serif cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "STUSSY" ? "text-orange-500 scale-102" : "text-zinc-400"
            }`}
          >
            STUSSY
          </div>
          {/* 9. ESSENTIALS */}
          <div 
            onClick={() => handleBrandClick("ESSENTIALS")}
            className={`font-bold text-[9px] sm:text-[10px] tracking-[0.3em] font-sans uppercase cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "ESSENTIALS" ? "text-orange-500 scale-102" : "text-zinc-400"
            }`}
          >
            ESSENTIALS
          </div>
          {/* 10. BAPE */}
          <div 
            onClick={() => handleBrandClick("BAPE")}
            className={`font-black text-base sm:text-lg tracking-tight font-mono uppercase cursor-pointer hover:scale-105 transition-all select-none ${
              activeBrand === "BAPE" ? "text-orange-500 scale-102" : "text-zinc-600"
            }`}
          >
            BAPE
          </div>
        </div>
      </div>

      {/* Brand Details & Lookbook Collage Section (Inline Dynamic Expansion) */}
      {activeBrand && currentLookbook && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-md relative animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setActiveBrand(null)} 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black flex items-center justify-center font-bold text-sm cursor-pointer z-30 transition-colors"
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
