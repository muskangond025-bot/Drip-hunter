"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface PromoItem {
  id: number;
  tag: string;
  title: string;
  description: string;
  offer: string;
  image: string;
  buttonText: string;
  link: string;
}

const promoDeals: PromoItem[] = [
  {
    id: 1,
    tag: "FOOTWEAR SPECIAL",
    title: "SHOES STORE",
    description: "Choose from flats & statement heels",
    offer: "BUY 3 FOR ₹999",
    image: "/images/slay_streets_walking.png",
    buttonText: "SHOP SHOES",
    link: "/shop?category=Shoes"
  },
  {
    id: 2,
    tag: "EDITORIAL ATTITUDE",
    title: "CLOTHING STORE",
    description: "Sleek tees, hoodies & tactical dresses",
    offer: "BUY 3 FOR ₹1099",
    image: "/images/special_plans.png",
    buttonText: "SHOP APPAREL",
    link: "/shop?category=Clothing"
  },
  {
    id: 3,
    tag: "MIX & MATCH",
    title: "COMBO STORE",
    description: "Assemble your complete streetwear look",
    offer: "3 ITEMS FOR ₹1299",
    image: "/images/slay_streets_model.png",
    buttonText: "EXPLORE DEALS",
    link: "/discounted-offers"
  }
];

export function CategoryPromoGrid() {
  return (
    <section className="bg-[#FBF9F4] py-14 border-b border-[#2B1B17]/10 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Header */}
        <div className="text-center mb-10 relative">
          <span className="font-mono text-[#5C4033] text-xs uppercase tracking-widest mb-1.5 block">
            Limited Combinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-wider text-[#0A0A0A] uppercase">
            Shop By Deal Store
          </h2>
          <div className="w-12 h-0.5 bg-[#5C4033] mx-auto mt-3" />
        </div>

        {/* 3-Column Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {promoDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => window.location.href = deal.link}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-[#2B1B17]/15 bg-[#FAF6EE] flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-[0_12px_40px_rgba(43,27,23,0.04)] transition-all hover:-translate-y-1.5 duration-300 select-none"
            >
              {/* Widescreen Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
                
                {/* Visual Vignette Overlays matching Coffee/Latte tones */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/90 via-[#2B1B17]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10" />
              </div>

              {/* Tag at Top Left */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#FAF6EE]/95 border border-[#2B1B17]/10 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#5C4033] font-bold uppercase shadow-xs">
                  {deal.tag}
                </span>
              </div>

              {/* Arrow Indicator Top Right */}
              <div className="absolute top-4 right-4 z-20 opacity-0 transform translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#2B1B17]/10 flex items-center justify-center text-[#2B1B17]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Deal Info Overlay Content */}
              <div className="relative z-20 text-left text-white space-y-2">
                <h3 className="font-heading font-black text-xl tracking-wide uppercase leading-tight drop-shadow-sm">
                  {deal.title}
                </h3>
                
                <p className="font-sans font-medium text-xs text-white/80 leading-relaxed max-w-[90%]">
                  {deal.description}
                </p>

                {/* Offer Highlight Box */}
                <div className="pt-2 border-t border-white/15 mt-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FAF6EE] font-black uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                    {deal.offer}
                  </span>
                  
                  <span className="font-sans text-[10px] font-bold text-white/90 underline tracking-wider uppercase group-hover:text-white transition-colors">
                    {deal.buttonText}
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
