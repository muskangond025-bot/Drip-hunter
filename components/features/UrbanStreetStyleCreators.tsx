"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, ShoppingBag, Sparkles, ExternalLink, Check } from "lucide-react";
import { ProductItem } from "@/app/page";
import { cn } from "@/lib/utils";

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
    image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    productId: 903,
  },
  {
    id: 2,
    name: "TANMAY BHAT",
    handle: "@tanmaybhat",
    role: "CREATOR & COMEDIAN",
    outfitTag: "OVERSIZED DENIM SHIRT",
    productPrice: "₹3,499",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    productId: 901,
  },
  {
    id: 3,
    name: "GULLY GANG",
    handle: "@gullygangcypher",
    role: "HIP-HOP COLLECTIVE",
    outfitTag: "TACTICAL CROSSBODY BAG",
    productPrice: "₹1,499",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    productId: 902,
  },
  {
    id: 4,
    name: "SIDHARTH MALHOTRA",
    handle: "@sidmalhotra",
    role: "ACTOR & STYLE ICON",
    outfitTag: "SIGNATURE MONKEY SNAPBACK",
    productPrice: "₹999",
    image: "https://img105.savana.com/e5894d9178604542927c68e0d847de47.webp",
    productId: 904,
  },
];

interface UrbanStreetStyleCreatorsProps {
  onAddToCart?: (product: ProductItem) => void;
}

export function UrbanStreetStyleCreators({ onAddToCart }: UrbanStreetStyleCreatorsProps) {
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [animatingCreatorId, setAnimatingCreatorId] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState<'idle' | 'bag-in' | 'drop' | 'fly'>('idle');
  const [flyingItems, setFlyingItems] = useState<{ id: string; src: string; startX: number; startY: number; endX: number; endY: number }[]>([]);

  const handleBuyLook = (creator: CreatorProps, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onAddToCart) return;

    const buttonEl = e.currentTarget;
    const cardEl = buttonEl.closest(".group");
    
    // Step 1: Slide up bag overlay
    setAnimatingCreatorId(creator.id);
    setAnimationStep('bag-in');

    // Step 2: Drop image inside bag
    setTimeout(() => {
      setAnimationStep('drop');

      // Step 3: Trigger flying bag animation
      setTimeout(() => {
        setAnimationStep('fly');

        const bagContainer = cardEl?.querySelector(".animate-slide-up-bag");

        if (bagContainer) {
          const rect = bagContainer.getBoundingClientRect();
          const cartEl = document.getElementById("navbar-cart-icon");
          const cartRect = cartEl 
            ? cartEl.getBoundingClientRect() 
            : { left: window.innerWidth - 100, top: 24, width: 40, height: 40 };

          const flightId = Math.random().toString(36).substring(2, 9);
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          const endX = cartRect.left + cartRect.width / 2;
          const endY = cartRect.top + cartRect.height / 2;

          setFlyingItems(prev => [...prev, {
            id: flightId,
            src: "bag",
            startX,
            startY,
            endX,
            endY
          }]);
        }

        onAddToCart({
          id: creator.productId,
          name: creator.outfitTag,
          brand: "URBAN MONKEY",
          price: creator.productPrice,
          image: creator.image,
        });
        setAddedIds((prev) => [...prev, creator.id]);

        // Step 4: Reset card animations after flight finishes
        setTimeout(() => {
          setAnimatingCreatorId(null);
          setAnimationStep('idle');
          setAddedIds((prev) => prev.filter((id) => id !== creator.id));
        }, 800);

      }, 350);

    }, 350);
  };

  return (
    <section className="w-full bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 relative">
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
                <div className="relative aspect-[3/4] w-full bg-zinc-955 overflow-hidden">
                  
                  {/* Bag Back Layer */}
                  {animatingCreatorId === creator.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center z-5 animate-slide-up-bag">
                      <div className="relative w-36 h-28 bg-[#18181b] rounded-b-xl border border-zinc-800 shadow-inner">
                        {/* Back handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-zinc-700 rounded-t-full" />
                      </div>
                    </div>
                  )}

                  {/* Image Wrapper */}
                  <div
                    className={cn(
                      "w-full h-full transition-all duration-300 z-10 relative",
                      animatingCreatorId === creator.id && animationStep === "drop" ? "scale-40 translate-y-24 opacity-0" : "",
                      animatingCreatorId === creator.id && animationStep === "bag-in" ? "scale-90" : ""
                    )}
                  >
                    <Image
                      src={creator.image}
                      alt={creator.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Bag Front Layer */}
                  {animatingCreatorId === creator.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center z-15 animate-slide-up-bag">
                      <div className="relative w-36 h-28 bg-[#09090b] rounded-b-xl border-t border-zinc-700 shadow-lg flex flex-col justify-center items-center">
                        {/* Front handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-zinc-600 rounded-t-full" />
                        {/* Gold brand text */}
                        <span className="text-[7px] font-mono text-zinc-500 font-black tracking-widest uppercase mt-4">
                          DRIP HUNTER
                        </span>
                      </div>
                    </div>
                  )}

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
                      onClick={(e) => handleBuyLook(creator, e)}
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

      {/* Dynamic styles injected for flight path coordinates */}
      <style>{`
        @keyframes flyItemToCart {
          0% {
            transform: translate(0, 0) scale(1.0) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          }
          50% {
            opacity: 0.85;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0.08) rotate(180deg);
            opacity: 0.05;
            filter: drop-shadow(0 0px 0px rgba(0,0,0,0));
          }
        }
        .animate-flying-item {
          animation: flyItemToCart 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes slideUpBag {
          0% { transform: translateY(120px) scale(0.8); }
          60% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-slide-up-bag {
          animation: slideUpBag 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Fly-to-Cart Portal Overlay */}
      {flyingItems.map(item => {
        const dx = item.endX - item.startX;
        const dy = item.endY - item.startY;
        return (
          <div
            key={item.id}
            className="animate-flying-item"
            onAnimationEnd={() => setFlyingItems(prev => prev.filter(f => f.id !== item.id))}
            style={{
              position: "fixed",
              left: item.startX - 24, // centers 48px frame
              top: item.startY - 24,
              width: "48px",
              height: "48px",
              zIndex: 99999,
              pointerEvents: "none",
              "--dx": `${dx}px`,
              "--dy": `${dy}px`
            } as any}
          >
            <div className="relative w-12 h-12 flex flex-col justify-end">
              {/* Loop handles */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 border border-zinc-600 rounded-t-full" />
              {/* Bag Body */}
              <div className="w-12 h-9 bg-[#0d0d0d] rounded-b-md border-t border-zinc-700 shadow-lg flex flex-col items-center justify-center">
                <span className="text-[3px] font-mono text-zinc-550 font-extrabold tracking-widest">DRIP</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
