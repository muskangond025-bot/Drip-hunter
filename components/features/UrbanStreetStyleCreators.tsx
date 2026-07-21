"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, ShoppingBag, Sparkles, ExternalLink, Check } from "lucide-react";
import { ProductItem } from "@/app/page";

interface CreatorProps {
  id: number;
  name: string;
  handle: string;
  role: string;
  outfitTag: string;
  productPrice: string;
  image: string;
  productId: number;
}

const CREATORS: CreatorProps[] = [
  {
    id: 1,
    name: "BABA SEHGAL",
    handle: "@babasehgal",
    role: "RAPPER & POP ICON",
    outfitTag: "RETRO AVIATOR SPECTACLES",
    productPrice: "₹1,299",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    productId: 903,
  },
  {
    id: 2,
    name: "TANMAY BHAT",
    handle: "@tanmaybhat",
    role: "CREATOR & COMEDIAN",
    outfitTag: "OVERSIZED DENIM SHIRT",
    productPrice: "₹3,499",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    productId: 901,
  },
  {
    id: 3,
    name: "GULLY GANG",
    handle: "@gullygangcypher",
    role: "HIP-HOP COLLECTIVE",
    outfitTag: "TACTICAL CROSSBODY BAG",
    productPrice: "₹1,499",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    productId: 902,
  },
  {
    id: 4,
    name: "SIDHARTH MALHOTRA",
    handle: "@sidmalhotra",
    role: "ACTOR & STYLE ICON",
    outfitTag: "SIGNATURE MONKEY SNAPBACK",
    productPrice: "₹999",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    productId: 904,
  },
];

interface UrbanStreetStyleCreatorsProps {
  onAddToCart?: (product: ProductItem) => void;
}

export function UrbanStreetStyleCreators({ onAddToCart }: UrbanStreetStyleCreatorsProps) {
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const handleBuyLook = (creator: CreatorProps) => {
    if (onAddToCart) {
      onAddToCart({
        id: creator.productId,
        name: creator.outfitTag,
        brand: "URBAN MONKEY",
        price: creator.productPrice,
        image: creator.image,
      });
    }
    setAddedIds((prev) => [...prev, creator.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== creator.id));
    }, 1800);
  };

  return (
    <section className="w-full bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            COMMUNITY & INFLUENCERS
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-mono">
            REDEFINING STREET STYLE WITH URBAN MONKEY!
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-400 mt-2 max-w-xl mx-auto">
            See how the community, creators, and icons are styling their favorite drip.
          </p>
        </div>

        {/* 4 Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATORS.map((creator) => {
            const isAdded = addedIds.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="group relative bg-zinc-900 border border-zinc-800 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Photo Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                  {/* Top Social Handle Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-zinc-700 text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5 z-10">
                    <Camera className="w-3 h-3 text-amber-400" />
                    <span>{creator.handle}</span>
                  </div>
                </div>

                {/* Info & Buy Button */}
                <div className="p-4 bg-zinc-900 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight font-mono">
                      {creator.name}
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mt-0.5">
                      {creator.role}
                    </p>

                    <div className="mt-3 p-2 bg-zinc-950 border border-zinc-800 rounded">
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase">WEARING:</span>
                      <span className="text-xs font-bold text-zinc-200 line-clamp-1 font-mono">
                        {creator.outfitTag}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-xs font-black font-mono text-white">
                      {creator.productPrice}
                    </span>
                    <button
                      onClick={() => handleBuyLook(creator)}
                      className="bg-white hover:bg-amber-400 text-black font-mono font-bold text-[10px] py-1.5 px-3 uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-700" />
                          ADDED
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          BUY THIS LOOK
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
