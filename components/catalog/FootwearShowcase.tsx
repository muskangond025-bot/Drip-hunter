"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { InteractiveHeartButton } from "@/components/ui/InteractiveHeartButton";

interface FootwearProduct {
  id: number;
  brand: string;
  name: string;
  price: string;
  rating: number;
  reviewsCount: number;
  defaultColor: string;
  description: string;
  colors: {
    name: string;
    hex: string;
    image: string;
    bgGlow: string;
    accentColor: string;
  }[];
  sizes: string[];
}

const shoeProducts: FootwearProduct[] = [
  {
    id: 901,
    brand: "NIKE SPORTSWEAR",
    name: "AIR MAX INTRLK // HYPER VIBE",
    price: "₹8,999",
    rating: 4.9,
    reviewsCount: 128,
    defaultColor: "Red",
    description: "Futuristic redesign of the classic Air Max silhouette. Dynamic Max Air unit provides ultimate impact protection, paired with a sleek translucent woven upper.",
    colors: [
      {
        name: "Red",
        hex: "#dc2626",
        image: "/images/air-max-intrlk-hyper-vibe.jpg",
        bgGlow: "from-red-300/35 via-red-200/10 to-transparent",
        accentColor: "border-red-500 text-red-500 hover:bg-red-500"
      },
      {
        name: "Blue-Black",
        hex: "#1e3a8a",
        image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
        bgGlow: "from-blue-300/35 via-blue-200/10 to-transparent",
        accentColor: "border-blue-600 text-blue-600 hover:bg-blue-600"
      },
      {
        name: "Neon Yellow",
        hex: "#eab308",
        image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
        bgGlow: "from-yellow-300/35 via-yellow-200/10 to-transparent",
        accentColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500"
      }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"]
  },
  {
    id: 902,
    brand: "PUMA STREET",
    name: "FUTURE RIDER // ELECTRIC CYAN",
    price: "₹6,499",
    rating: 4.8,
    reviewsCount: 94,
    defaultColor: "Cyan",
    description: "Retro running shoe updated with bold neon cyberpunk overlays. Features a shock-absorbing Puma Federbein outsole and lightweight rider foam midsole.",
    colors: [
      {
        name: "Cyan",
        hex: "#06b6d4",
        image: "/images/future-rider-electric-cyan.jpg",
        bgGlow: "from-cyan-300/35 via-cyan-200/10 to-transparent",
        accentColor: "border-cyan-500 text-cyan-500 hover:bg-cyan-500"
      },
      {
        name: "Red-Orange",
        hex: "#ea580c",
        image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
        bgGlow: "from-orange-300/35 via-orange-200/10 to-transparent",
        accentColor: "border-orange-500 text-orange-500 hover:bg-orange-500"
      },
      {
        name: "Lime-Green",
        hex: "#84cc16",
        image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
        bgGlow: "from-lime-300/35 via-lime-200/10 to-transparent",
        accentColor: "border-lime-500 text-lime-500 hover:bg-lime-500"
      }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"]
  },
  {
    id: 903,
    brand: "DRIP HUNTER SPECIAL",
    name: "DRIP MESH RUNNER // VOLT GOLD",
    price: "₹10,999",
    rating: 5.0,
    reviewsCount: 215,
    defaultColor: "Yellow",
    description: "Drip Hunter exclusive luxury runner. Designed for premium street aesthetics, featuring breathable high-density mesh and signature vulcanized shock protection.",
    colors: [
      {
        name: "Yellow",
        hex: "#facc15",
        image: "/images/drip-mesh-runner-volt-gold.jpg",
        bgGlow: "from-yellow-300/35 via-yellow-200/10 to-transparent",
        accentColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500"
      },
      {
        name: "Sunset Orange",
        hex: "#f97316",
        image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
        bgGlow: "from-orange-300/35 via-orange-200/10 to-transparent",
        accentColor: "border-orange-500 text-orange-500 hover:bg-orange-500"
      },
      {
        name: "Stealth Black",
        hex: "#18181b",
        image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
        bgGlow: "from-zinc-400/35 via-zinc-200/10 to-transparent",
        accentColor: "border-zinc-955 text-zinc-955 hover:bg-zinc-955"
      }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"]
  }
];

interface FlyingShoe {
  id: string;
  src: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FootwearShowcaseProps {
  onAddToCart: (product: { id: number; brand: string; name: string; price: string; image: string }) => void;
  favorites?: number[];
  onToggleFavorite?: (product: { id: number; brand: string; name: string; price: string; image: string }) => void;
}

export function FootwearShowcase({ onAddToCart, favorites = [], onToggleFavorite }: FootwearShowcaseProps) {
  // Track selected color, size, and added status per product
  const [selections, setSelections] = useState<Record<number, { colorIndex: number; size: string }>>({
    901: { colorIndex: 0, size: "UK 8" },
    902: { colorIndex: 0, size: "UK 8" },
    903: { colorIndex: 0, size: "UK 8" }
  });


  const [flyingShoes, setFlyingShoes] = useState<FlyingShoe[]>([]);
  const [wishlisted, setWishlisted] = useState<Record<number, boolean>>({});
  const [animatingProdId, setAnimatingProdId] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState<'idle' | 'bag-in' | 'drop' | 'fly'>('idle');
  const [transitioningProd, setTransitioningProd] = useState<Record<number, boolean>>({});

  const handleColorSelect = (productId: number, colorIndex: number) => {
    if (selections[productId].colorIndex === colorIndex) return;

    setTransitioningProd(prev => ({ ...prev, [productId]: true }));

    setTimeout(() => {
      setSelections(prev => ({
        ...prev,
        [productId]: { ...prev[productId], colorIndex }
      }));
      setTransitioningProd(prev => ({ ...prev, [productId]: false }));
    }, 250);
  };

  const handleSizeSelect = (productId: number, size: string) => {
    setSelections(prev => ({
      ...prev,
      [productId]: { ...prev[productId], size }
    }));
  };

  const handleAddToBag = (e: React.MouseEvent<HTMLButtonElement>, prod: FootwearProduct) => {
    e.preventDefault();
    const productSelection = selections[prod.id];
    const currentColor = prod.colors[productSelection.colorIndex];
    const buttonEl = e.currentTarget;
    const cardEl = buttonEl.closest(".group");


    
    // Step 1: Slide up the shopping bag overlay
    setAnimatingProdId(prod.id);
    setAnimationStep('bag-in');

    // Step 2: Scale down and drop the shoe image into the bag
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

          setFlyingShoes(prev => [...prev, {
            id: flightId,
            src: "bag", // Tells flight overlay to render a flying orange bag
            startX,
            startY,
            endX,
            endY
          }]);
        }

        onAddToCart({
          id: prod.id,
          brand: prod.brand,
          name: prod.name,
          price: prod.price,
          image: currentColor.image
        });

        // Step 4: Reset card animations after flight finishes
        setTimeout(() => {
          setAnimatingProdId(null);
          setAnimationStep('idle');
        }, 800);

      }, 350);

    }, 350);
  };

  const removeFlight = (id: string) => {
    setFlyingShoes(prev => prev.filter(f => f.id !== id));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white select-none">
      
      {/* Dynamic styles injected for flight path coordinates */}
      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1.0) rotate(-12deg);
            opacity: 1;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
          }
          30% {
            transform: translate(calc(var(--dx) * 0.25), calc(var(--dy) * 0.2 - 120px)) scale(0.85) rotate(45deg);
            opacity: 0.95;
          }
          70% {
            transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.6 - 80px)) scale(0.4) rotate(180deg);
            opacity: 0.75;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0.05) rotate(360deg);
            opacity: 0.05;
            filter: drop-shadow(0 0px 0px rgba(0,0,0,0));
          }
        }
        .animate-flying-shoe {
          animation: flyToCart 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUpBag {
          0% { transform: translateY(120px) scale(0.8); }
          60% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-slide-up-bag {
          animation: slideUpBag 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes floatShoe {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-on-hover {
          transition: transform 0.3s ease-out;
        }
        .group:hover .animate-float-on-hover {
          animation: floatShoe 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* Fly-to-Cart Portal Overlay */}
      {flyingShoes.map(shoe => {
        const dx = shoe.endX - shoe.startX;
        const dy = shoe.endY - shoe.startY;
        return (
          <div
            key={shoe.id}
            className="animate-flying-shoe"
            onAnimationEnd={() => removeFlight(shoe.id)}
            style={{
              position: "fixed",
              left: shoe.startX - 24, // centers 48px frame
              top: shoe.startY - 24,
              width: "48px",
              height: "48px",
              zIndex: 99999,
              pointerEvents: "none",
              "--dx": `${dx}px`,
              "--dy": `${dy}px`
            } as React.CSSProperties}
          >
            {shoe.src === "bag" ? (
              <div className="relative w-12 h-12 flex flex-col justify-end">
                {/* Loop handles */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 border border-zinc-600 rounded-t-full" />
                {/* Bag Body */}
                <div className="w-12 h-9 bg-[#0d0d0d] rounded-b-md border-t border-zinc-700 shadow-lg flex flex-col items-center justify-center">
                  <span className="text-[3px] font-mono text-zinc-550 font-extrabold tracking-widest">DRIP</span>
                </div>
              </div>
            ) : (
              <img 
                src={shoe.src} 
                alt="Flying Sneaker" 
                className="w-full h-full object-contain"
              />
            )}
          </div>
        );
      })}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="text-left">
          <span className="text-[10px] font-mono text-[#f05a28] font-black uppercase tracking-widest block mb-2">
            FOOTWEAR // HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest font-sans text-zinc-950">
            DRIP FOOTWEAR
          </h2>
        </div>
        <p className="text-xs text-zinc-400 font-mono font-medium max-w-sm text-left md:text-right mt-3 md:mt-0 uppercase leading-relaxed tracking-wider">
          Experience premium traction and streetwear styling with our limited-release sneakers.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shoeProducts.map((prod) => {
          const selection = selections[prod.id];
          const currentColor = prod.colors[selection.colorIndex];
          const isWish = favorites.some((favId) => Number(favId) === Number(prod.id)) || !!wishlisted[prod.id];


          return (
            <div
              key={prod.id}
              className="group relative flex flex-col justify-between bg-zinc-50/45 border border-zinc-150 rounded-[40px] p-6 shadow-xs hover:shadow-2xl hover:bg-white hover:border-zinc-300 transition-all duration-500 overflow-hidden text-left"
            >
              
              {/* Card Radial Background Glow */}
              <div className={cn(
                "absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-br filter blur-3xl opacity-60 z-0 transition-all duration-500 group-hover:scale-125",
                currentColor.bgGlow
              )} />

              <div className="relative z-10">
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="border border-zinc-200 bg-white/70 text-zinc-600 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase backdrop-blur-xs shadow-3xs">
                    {prod.brand}
                  </span>
                  
                  <div
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                  >
                    <InteractiveHeartButton
                      isFavorite={isWish}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setWishlisted(prev => ({ ...prev, [prod.id]: !isWish }));
                        if (onToggleFavorite) {
                          onToggleFavorite({
                            id: prod.id,
                            brand: prod.brand,
                            name: prod.name,
                            price: prod.price,
                            image: currentColor.image
                          });
                        }
                      }}
                      className="border border-zinc-200 shadow-3xs"
                      size="sm"
                    />
                  </div>
                </div>
                {/* Floating Shoe Image Box */}
                <div className="relative w-full aspect-[4/3] flex items-center justify-center my-6 overflow-hidden rounded-2xl">
                  {/* Sneaker Shadow Ellipse */}
                  <div className="absolute bottom-2 inset-x-12 h-3.5 bg-black/10 blur-md rounded-full transition-all duration-500 group-hover:scale-x-110 group-hover:opacity-75 z-0" />
                  
                  {/* Bag Back Layer */}
                  {animatingProdId === prod.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-3 flex justify-center z-5 animate-slide-up-bag">
                      <div className="relative w-32 h-24 bg-[#1e1e1e] rounded-b-xl border border-zinc-800 shadow-inner">
                        {/* Back handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-5 border-2 border-zinc-700 rounded-t-full" />
                      </div>
                    </div>
                  )}

                  {/* Shoe Image */}
                  <div 
                    className={cn(
                       "relative w-full h-full transform transition-all duration-300 ease-out z-10 shoe-image-ref",
                       transitioningProd[prod.id] ? "scale-0 rotate-[180deg] opacity-0 duration-200" : "scale-100 opacity-100 duration-300",
                       animatingProdId === prod.id && animationStep === "drop" ? "scale-30 translate-y-24 opacity-0" : "",
                       animatingProdId === prod.id && animationStep === "bag-in" ? "scale-85" : "",
                       animatingProdId !== prod.id && !transitioningProd[prod.id] ? "animate-float-on-hover" : ""
                    )}
                  >
                    <Image
                      src={currentColor.image}
                      alt={prod.name}
                      fill
                      sizes="(max-w-768px) 300px, 350px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Bag Front Layer */}
                  {animatingProdId === prod.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-3 flex justify-center z-15 animate-slide-up-bag">
                      <div className="relative w-32 h-24 bg-[#0d0d0d] rounded-b-xl border-t border-zinc-700 shadow-lg flex flex-col justify-center items-center">
                        {/* Front handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-5 border-2 border-zinc-650 rounded-t-full" />
                        {/* Brand label text */}
                        <span className="text-[6px] font-mono text-zinc-500 font-black tracking-widest uppercase mt-4">
                          DRIP HUNTER
                        </span>
                      </div>
                    </div>
                  )}
                </div>                {/* Product Title and Rating */}
                <div className="mt-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wider uppercase ml-1">
                      ({prod.reviewsCount} reviews)
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-zinc-955 uppercase tracking-tight line-clamp-1">
                    {prod.name}
                  </h3>
                  
                  <p className="text-[11px] text-zinc-450 mt-2 line-clamp-2 uppercase font-medium leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Sizes Selector Swatches */}
                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <div className="text-[9px] font-mono text-zinc-400 font-black uppercase tracking-widest mb-2.5">
                    Select Size
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono font-bold">
                    {prod.sizes.map((sz) => {
                      const isSel = selection.size === sz;
                      return (
                        <button
                          key={sz}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSizeSelect(prod.id, sz);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseUp={(e) => e.stopPropagation()}
                          className={cn(
                            "px-3 py-1.5 rounded-lg border text-[10px] uppercase tracking-wider cursor-pointer transition-colors",
                            isSel
                              ? "bg-zinc-950 text-white border-zinc-950"
                              : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-550"
                          )}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Swatch Selectors */}
                <div className="mt-4">
                  <div className="text-[9px] font-mono text-zinc-400 font-black uppercase tracking-widest mb-2.5">
                    Select Color
                  </div>
                  <div className="flex items-center gap-2.5">
                    {prod.colors.map((col, idx) => {
                      const isSel = selection.colorIndex === idx;
                      return (
                        <button
                          key={col.name}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleColorSelect(prod.id, idx);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseUp={(e) => e.stopPropagation()}
                          style={{ backgroundColor: col.hex }}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer transition-all shadow-inner relative hover:scale-110",
                            isSel 
                              ? "ring-2 ring-zinc-950 ring-offset-2 scale-105"
                              : "border border-zinc-200/50"
                          )}
                          title={col.name}
                        >
                          {isSel && (
                            <span className="absolute inset-0.5 rounded-full border border-white/30" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Purchase row */}
              <div className="mt-8 pt-5 border-t border-zinc-150 flex items-center justify-between relative z-10">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                    PRICE
                  </span>
                  <span className="text-lg font-black text-zinc-955 font-mono tracking-tight">
                    {prod.price}
                  </span>
                </div>

                <InteractiveAddToCartButton
                  onClick={(e) => handleAddToBag(e, prod)}
                  buttonText="Add To Bag"
                  addedText="Added!"
                  animationStyle="truck"
                  size="sm"
                  className="w-full px-6 py-3 rounded-full !bg-zinc-955 !text-[#ebd26b] hover:!bg-black font-black text-[10px] tracking-widest border-none cursor-pointer"
                  wrapperClassName="w-auto min-w-[135px]"
                />
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
