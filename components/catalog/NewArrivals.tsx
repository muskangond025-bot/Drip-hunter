"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCard {
  id: number;
  title: string;
  description: string;
  image: string;
  stickerBg: string;
  stickerStyle: string;
  link: string;
  price: string;
  stickerType?: "ice-blue" | "lace-layer";
}

const campaignCards: CampaignCard[] = [
  {
    id: 101,
    title: "SPECIAL PLANS",
    description: "WEEKEND CAPSULE COLLECTION",
    image: "/images/special_plans.png",
    stickerBg: "bg-[#2B1B17] text-[#FAF6EE]",
    stickerStyle: "rounded-2xl rotate-[-3deg] uppercase font-bold",
    link: "/shop?category=outfits",
    price: "From $49"
  },
  {
    id: 102,
    title: "STACK & SHINE",
    description: "PREMIUM ACCESSORIES DROP",
    image: "/images/stack_shine.png",
    stickerBg: "bg-[#FAF6EE] text-[#2B1B17] border-2 border-[#2B1B17]",
    stickerStyle: "rounded-sm rotate-[4deg] font-heading text-[10px] tracking-tight",
    link: "/shop?category=accessories",
    price: "From $19"
  },
  {
    id: 103,
    title: "ICE BLUE EDIT",
    description: "SHEER MESH TOPS",
    image: "/images/ice_blue_edit.png",
    stickerBg: "",
    stickerStyle: "",
    stickerType: "ice-blue",
    link: "/shop?category=tops",
    price: "From $39"
  },
  {
    id: 104,
    title: "Lace LAYER",
    description: "SHEER LACE DRESSES",
    image: "/images/lace_layer.png",
    stickerBg: "",
    stickerStyle: "",
    stickerType: "lace-layer",
    link: "/shop?category=dresses",
    price: "From $59"
  },
  {
    id: 105,
    title: "RETRO CHIC",
    description: "OVERSIZED GRAPHIC COLLECTION",
    image: "/images/retro_chic.png",
    stickerBg: "bg-[#2B1B17] text-[#FAF6EE] border border-[#2B1B17]/20",
    stickerStyle: "rounded-xl rotate-[3deg] font-heading font-black tracking-tight",
    link: "/shop?category=tees",
    price: "From $35"
  },
  {
    id: 106,
    title: "NEO MATRIX",
    description: "TECHWEAR UTILITY DROPS",
    image: "/images/neo_matrix.png",
    stickerBg: "bg-[#0A0A0A] text-[#FAF6EE] border border-[#5C4033]",
    stickerStyle: "rounded-md rotate-[-3deg] font-mono tracking-widest font-bold",
    link: "/shop?category=utility",
    price: "From $59"
  }
];

interface NewArrivalsProps {
  activeTab?: string;
  onAddToCart?: (product: any) => void;
  favorites?: number[];
  onToggleFavorite?: (product: any) => void;
  searchQuery?: string;
  searchCategory?: string;
  selectedSubCategory?: string | null;
}

export function NewArrivals({
  activeTab,
  onAddToCart,
  favorites = [],
  onToggleFavorite,
  searchQuery,
  searchCategory,
  selectedSubCategory,
}: NewArrivalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Translate vertical wheel scroll to horizontal scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const isAtRightEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
    const isAtLeftEnd = container.scrollLeft <= 0;

    if (e.deltaY > 0 && !isAtRightEnd) {
      e.preventDefault();
      container.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" });
    } else if (e.deltaY < 0 && !isAtLeftEnd) {
      e.preventDefault();
      container.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" });
    }
  };

  // Drag scroll logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeftState(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  // Filter campaigns depending on subcategory/tab if user interacted
  let filteredCampaigns = campaignCards;
  if (selectedSubCategory) {
    const sub = selectedSubCategory.toLowerCase();
    filteredCampaigns = campaignCards.filter(c => 
      c.title.toLowerCase().includes(sub) || 
      c.description.toLowerCase().includes(sub) ||
      c.link.toLowerCase().includes(sub)
    );
    if (filteredCampaigns.length === 0) {
      filteredCampaigns = campaignCards; // fallback to all
    }
  }

  return (
    <section id="new-arrivals" className="bg-[#FBF9F4] text-[#0A0A0A] py-14 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block matching the screenshot style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#2B1B17]/10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0A0A0A] font-heading leading-none">
              NEW <span className="text-[#5C4033]">ARRIVALS</span>
            </h2>
            <p className="text-[10px] font-mono tracking-widest text-[#5C4033] uppercase mt-2.5 max-w-xl">
              Swipe or scroll horizontally to explore this week's key drops, capsule collections, and styled brand campaigns.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => containerRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
              className="w-10 h-10 rounded-full border border-[#2B1B17]/10 hover:border-[#2B1B17] flex items-center justify-center text-[#2B1B17] hover:bg-[#FAF6EE] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => containerRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
              className="w-10 h-10 rounded-full border border-[#2B1B17]/10 hover:border-[#2B1B17] flex items-center justify-center text-[#2B1B17] hover:bg-[#FAF6EE] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Container with overflow-x-auto, scrollbar-none, wheel listener and drag triggers */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-8 pt-4 px-2 select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth"
        >
          {filteredCampaigns.map((card) => (
            <div
              key={card.id}
              className="min-w-[280px] sm:min-w-[310px] h-[390px] sm:h-[450px] relative rounded-[32px] overflow-hidden group cursor-pointer border border-[#2B1B17]/10 bg-[#FAF6EE] shadow-[0_8px_30px_rgba(43,27,23,0.02)] hover:shadow-[0_20px_50px_rgba(43,27,23,0.08)] transition-all duration-500 snap-start"
              onClick={() => {
                if (!isDown) {
                  window.location.href = card.link;
                }
              }}
            >
              {/* Product Background Image and Gradient Shadow */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85" />
              </div>

              {/* Card Contents Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end items-start text-white">
                <p className="text-[9px] font-mono tracking-widest text-[#FBF9F4]/80 uppercase mb-1">
                  {card.description}
                </p>
                
                {/* Rotated sticker label styled premium matching the screenshot design */}
                {card.stickerType === "ice-blue" ? (
                  <div className="px-5 py-2 text-xs font-black tracking-tight bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] select-none transform transition-transform duration-300 group-hover:scale-105 mb-4 rounded-none font-sans relative">
                    ICE BLUE EDIT
                    <div className="absolute right-[-10px] bottom-[-10px] w-6 h-6 rounded-full bg-yellow-400 text-black border border-black flex items-center justify-center text-[7px] font-black rotate-[15deg]">
                      NEW
                    </div>
                  </div>
                ) : card.stickerType === "lace-layer" ? (
                  <div className="flex flex-col items-start gap-0.5 transform rotate-[-2deg] mb-4 select-none group-hover:scale-105 transition-transform">
                    <span className="bg-pink-500 text-white font-serif italic font-black text-xs px-3.5 py-1 rounded-full shadow-xs">
                      Lace
                    </span>
                    <span className="bg-white text-[#0A0A0A] font-sans font-black text-[9px] px-3.5 py-1 tracking-widest border border-[#0A0A0A] uppercase">
                      LAYER
                    </span>
                  </div>
                ) : (
                  <div className={cn(
                    "px-4 py-2 text-xs font-black tracking-tight shadow-md select-none transform transition-transform duration-300 group-hover:scale-105 mb-4",
                    card.stickerBg,
                    card.stickerStyle
                  )}>
                    {card.title}
                  </div>
                )}

                {/* Card footer details */}
                <div className="flex items-center justify-between w-full border-t border-white/10 pt-3.5 mt-1">
                  <span className="text-xs font-mono font-bold tracking-tight text-white/95">
                    {card.price}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#FAF6EE]/95 uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    EXPLORE <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;
