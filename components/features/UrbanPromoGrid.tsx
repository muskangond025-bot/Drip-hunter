"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Flame, ShieldCheck } from "lucide-react";

interface PromoCardProps {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  tagline: string;
  linkHref?: string;
}

const PROMO_ITEMS: PromoCardProps[] = [
  {
    title: "TACTICAL SLINGS & BAGS",
    subtitle: "Waterproof canvas & modular strap system for utility on the go.",
    badge: "NEW ARRIVALS",
    tagline: "ESSENTIAL ACCESSORIES",
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    linkHref: "/shop?search=Bag",
  },
  {
    title: "OVERSIZED HEAVYWEIGHT TEES",
    subtitle: "280 GSM premium combed cotton with durable dropped shoulder fit.",
    badge: "BESTSELLER",
    tagline: "STREETWEAR CORE",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    linkHref: "/shop?category=Top%20Wear&search=Oversized",
  },
  {
    title: "SIGNATURE HEADWEAR & CAPS",
    subtitle: "Structure snapbacks, dad caps & bucket hats built for the streets.",
    badge: "LIMITED EDITION",
    tagline: "URBAN ICONIC",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    linkHref: "/shop?category=Caps",
  },
];

export function UrbanPromoGrid() {
  return (
    <section className="w-full bg-zinc-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Ticker / Notice Banner matching Urban screenshot */}
        <div className="bg-black border border-zinc-800 rounded-none p-3 mb-8 flex items-center justify-between text-center overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mx-auto">
            <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
            <span>SPECIAL OFFER: FREE NYLON TACTICAL BELT ON ALL ORDERS ABOVE ₹1,999</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
        </div>

        {/* 3 Column Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href={item.linkHref || "/shop"}
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-zinc-500 transition-all duration-300 overflow-hidden flex flex-col justify-between h-96 p-6 cursor-pointer no-underline text-white block"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Card Header Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-white text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                  {item.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-zinc-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED
                </span>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 mt-auto">
                <p className="text-xs font-mono font-bold tracking-widest text-amber-400 mb-1 uppercase">
                  {item.tagline}
                </p>
                <h3 className="text-xl font-black tracking-tight text-white uppercase group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-sans">
                  {item.subtitle}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    SHOP COLLECTION
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
