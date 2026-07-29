"use client";

import React from "react";
import Image from "next/image";
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
  titleLine1: string;
  titleLine2: string;
  classLine1: string;
  classLine2: string;
  showNewBadge?: boolean;
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
    price: "From $49",
    titleLine1: "SPECIAL",
    titleLine2: "PLANS",
    classLine1: "font-sans font-black text-xs tracking-widest uppercase text-[#FF8F59] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-heading font-black text-2xl uppercase text-[#FFD25A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
  },
  {
    id: 102,
    title: "STACK & SHINE",
    description: "PREMIUM ACCESSORIES DROP",
    image: "/images/stack_shine.png",
    stickerBg: "bg-[#FAF6EE] text-[#2B1B17] border-2 border-[#2B1B17]",
    stickerStyle: "rounded-sm rotate-[4deg] font-heading text-[10px] tracking-tight",
    link: "/shop?category=accessories",
    price: "From $19",
    titleLine1: "STACK &",
    titleLine2: "SHINE",
    classLine1: "font-sans font-black text-xs tracking-wider uppercase text-[#4EF5D6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-heading font-black text-2xl uppercase text-[#34D399] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
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
    price: "From $39",
    titleLine1: "ICE BLUE",
    titleLine2: "EDIT",
    classLine1: "font-sans font-black text-xs tracking-widest uppercase text-[#5FE3F5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-heading font-black text-2xl uppercase text-[#60A5FA] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    showNewBadge: true,
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
    price: "From $59",
    titleLine1: "Lace",
    titleLine2: "LAYER",
    classLine1: "font-serif italic font-black text-2xl text-[#F472B6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-sans font-black text-xs tracking-widest uppercase text-[#FCD34D] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
  },
  {
    id: 105,
    title: "RETRO CHIC",
    description: "OVERSIZED GRAPHIC COLLECTION",
    image: "/images/retro_chic.png",
    stickerBg: "bg-[#2B1B17] text-[#FAF6EE] border border-[#2B1B17]/20",
    stickerStyle: "rounded-xl rotate-[3deg] font-heading font-black tracking-tight",
    link: "/shop?category=tees",
    price: "From $35",
    titleLine1: "RETRO",
    titleLine2: "CHIC",
    classLine1: "font-heading font-extrabold text-2xl uppercase text-[#C084FC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-sans font-black text-xs tracking-widest uppercase text-[#E879F9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
  },
  {
    id: 106,
    title: "NEO MATRIX",
    description: "TECHWEAR UTILITY DROPS",
    image: "/images/neo_matrix.png",
    stickerBg: "bg-[#0A0A0A] text-[#FAF6EE] border border-[#5C4033]",
    stickerStyle: "rounded-md rotate-[-3deg] font-mono tracking-widest font-bold",
    link: "/shop?category=utility",
    price: "From $59",
    titleLine1: "NEO",
    titleLine2: "MATRIX",
    classLine1: "font-mono font-black text-xs tracking-widest uppercase text-[#A3E635] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
    classLine2: "font-heading font-black text-2xl uppercase text-[#34D399] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
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
    <section id="new-arrivals" className="bg-[#FBF9F4] text-[#0A0A0A] py-14 select-none w-full overflow-hidden">
      
      {/* Centered Header container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block matching the screenshot style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#2B1B17]/10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#2B1B17] font-heading leading-none">
              NEW <span className="text-[#5C4033]">ARRIVALS</span>
            </h2>
            <p className="text-[10px] font-mono tracking-widest text-[#5C4033] uppercase mt-2.5 max-w-xl">
              Explore this week's key drops, capsule collections, and styled brand campaigns.
            </p>
          </div>
        </div>
      </div>

      {/* Edge-to-edge scrollable container */}
      <div className="w-full px-4 sm:px-12 lg:px-20">
        <div className="flex gap-6 overflow-x-auto scrollbar-none pb-8 pt-4 select-none snap-x snap-mandatory scroll-smooth">
          {filteredCampaigns.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[170px] sm:w-[200px] md:w-[220px] h-[280px] sm:h-[320px] md:h-[350px] relative rounded-[24px] overflow-hidden group cursor-pointer border border-[#2B1B17]/10 bg-[#FAF6EE] shadow-[0_8px_30px_rgba(43,27,23,0.02)] hover:shadow-[0_20px_50px_rgba(43,27,23,0.08)] transition-all duration-500 snap-start"
              onClick={() => {
                window.location.href = card.link;
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
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end items-start text-white">
                
                <div className="flex flex-col items-start gap-0.5 select-none group-hover:scale-105 transition-transform relative">
                  <span className={card.classLine1}>
                    {card.titleLine1}
                  </span>
                  <span className={card.classLine2}>
                    {card.titleLine2}
                  </span>
                  {card.showNewBadge && (
                    <div className="absolute right-[-14px] bottom-[-6px] w-6 h-6 rounded-full bg-yellow-400 text-black border border-black flex items-center justify-center text-[7px] font-black rotate-[15deg]">
                      NEW
                    </div>
                  )}
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
