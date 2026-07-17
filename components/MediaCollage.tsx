"use client";

import React from "react";
import Image from "next/image";
import { Megaphone, ArrowUpRight } from "lucide-react";

export function MediaCollage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-yellow-500 font-bold uppercase tracking-widest">
          #DRIPHUNTER COMMUNITY
        </span>
        <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight mt-2">
          Drip Collage
        </h2>
      </div>

      {/* Grid Layout representing the layout in image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Megaphone Ad Box (Blue) */}
        <div className="bg-blue-600 text-white rounded-3xl p-8 flex flex-col justify-between min-h-[400px] shadow-lg group relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-700/50 rounded-full blur-3xl" />
          
          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
            <h3 className="text-3xl font-chaney-title uppercase leading-tight">
              Facebook Ads Curation
            </h3>
            <p className="text-sm opacity-90 font-mono">
              See the items trending across social media. Curated streetwear fits chosen directly by our Facebook and Instagram community circles.
            </p>
          </div>

          <a href="#" className="relative z-10 font-mono text-xs font-black uppercase text-yellow-300 flex items-center gap-1.5 hover:underline mt-8">
            Shop the Feed <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Middle Column: Model Outfit 1 */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col justify-end min-h-[400px] shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80"
              alt="Duo Street Jacket"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-20">
            <span className="bg-yellow-400 text-black text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">TRENDING</span>
            <h3 className="text-xl font-chaney-title uppercase mt-2">Duo Street Jacket</h3>
            <p className="text-xs text-zinc-300 font-mono mt-1">Multi-toned camouflage heavy canvas fit.</p>
          </div>
        </div>

        {/* Right Column: Model Outfit 2 */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col justify-end min-h-[400px] shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
            <Image
              src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=80"
              alt="Dystopian Graphic Tee"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-20">
            <span className="bg-yellow-400 text-black text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">POPULAR</span>
            <h3 className="text-xl font-chaney-title uppercase mt-2">Dystopian Graphic Tee</h3>
            <p className="text-xs text-zinc-300 font-mono mt-1">Oversized acid wash fit with signature block typography.</p>
          </div>
        </div>

      </div>

      {/* Row of 4 Grid Boxes Below */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {[
          { name: "Neon Blue Tee", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
          { name: "Graphic Red Fit", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
          { name: "Camo Green Tee", image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=400&q=80" },
          { name: "Urban Logo Tee", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-900 text-white rounded-2xl p-6 flex flex-col justify-end min-h-[220px] shadow-md relative overflow-hidden group border border-zinc-800"
          >
            <div className="absolute inset-0 bg-black/35 z-10" />
            <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover opacity-60 group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="relative z-20">
              <h4 className="text-xs font-black tracking-wider uppercase text-yellow-400">{item.name}</h4>
              <p className="text-[10px] text-zinc-300 font-mono mt-0.5">Archive fit series</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
