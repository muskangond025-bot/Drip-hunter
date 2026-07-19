"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface FeaturedLookbookProps {
  onSelectCategory?: (category: string | null) => void;
}

export function FeaturedLookbook({ onSelectCategory }: FeaturedLookbookProps) {
  return (
    <section className="bg-zinc-950 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <span className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest">
            STREET LOOKBOOK
          </span>
          <h2 className="text-3xl sm:text-6xl font-chaney-title uppercase tracking-tight leading-none mt-2">
            Street Style<br />Vibes &apos;26
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all duration-500" />
            <div className="space-y-6">
              <span className="font-chaney-title text-4xl text-yellow-400 select-none block">
                VIBES
              </span>
              <h3 className="text-xl font-bold uppercase">
                The Archive Edition
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                A visual journey through concrete alleys, retro tech displays, and high-contrast styling layers. The Archive collection captures raw urban expressions without constraints.
              </p>
            </div>
            <div className="mt-12">
              <button 
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("Graphic Tees");
                }}
                className="w-full bg-white hover:bg-yellow-400 hover:text-black text-black font-extrabold uppercase text-xs tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all group-hover:shadow-lg cursor-pointer"
              >
                View Lookbook
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-900 rounded-3xl overflow-hidden min-h-[450px] relative group flex flex-col justify-end p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/35 z-10" />
            <div className="absolute inset-0 z-0 select-none transition-transform duration-700 group-hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80"
                alt="Varsity Yellow Look"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-20">
              <span className="bg-black text-yellow-400 font-mono text-[9px] font-black tracking-widest px-2.5 py-1 rounded mb-3 inline-block">
                LOOK 01 • OUTDOOR
              </span>
              <h3 className="text-2xl sm:text-3xl font-chaney-title uppercase leading-none">
                VARSITY YELLOW
              </h3>
              <p className="text-xs text-zinc-200 mt-2 font-mono max-w-xs">
                Styling oversized graphic varsity jackets with relaxed cargo wear.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"
                  alt="Industrial Crop Top"
                  fill
                  className="object-cover opacity-35 group-hover:opacity-45 transition-opacity"
                />
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">LOOK 02</span>
                <h4 className="text-sm font-black uppercase mt-1">Industrial Crop Top</h4>
              </div>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectCategory) onSelectCategory("Graphic Tees");
                }}
                className="relative z-10 text-xs font-mono text-yellow-400 font-bold hover:underline mt-4 flex items-center gap-1"
              >
                View Outfit <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80"
                  alt="Wide Cargo Pants"
                  fill
                  className="object-cover opacity-35 group-hover:opacity-45 transition-opacity"
                />
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">LOOK 03</span>
                <h4 className="text-sm font-black uppercase mt-1">Wide Cargo Pants</h4>
              </div>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectCategory) onSelectCategory("Tactical Cargo");
                }}
                className="relative z-10 text-xs font-mono text-yellow-400 font-bold hover:underline mt-4 flex items-center gap-1"
              >
                View Outfit <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80"
                  alt="Tactical Mesh Cap"
                  fill
                  className="object-cover opacity-35 group-hover:opacity-45 transition-opacity"
                />
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">LOOK 04</span>
                <h4 className="text-sm font-black uppercase mt-1">Tactical Mesh Cap</h4>
              </div>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectCategory) onSelectCategory("Utility Caps");
                }}
                className="relative z-10 text-xs font-mono text-yellow-400 font-bold hover:underline mt-4 flex items-center gap-1"
              >
                View Outfit <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
