"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { InteractiveHeartButton } from "@/components/ui/InteractiveHeartButton";

export interface PremiumProductCardProps {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  discount?: number;
  gender?: string;
  category?: string;
  buttonText?: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAddToCart: () => void;
  colorVariants?: {
    color: string;
    image: string;
    colorHex: string;
  }[];
  className?: string;
}

export function PremiumProductCard({
  id,
  brand,
  name,
  price,
  image,
  hoverImage,
  badge,
  discount,
  gender,
  category,
  buttonText = "Add To Cart",
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  colorVariants,
  className,
}: PremiumProductCardProps) {
  // Active color/image states
  const [activeImage, setActiveImage] = React.useState(image);
  const [activeHoverImage, setActiveHoverImage] = React.useState(hoverImage);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);

  // Cart animation states
  const [animating, setAnimating] = React.useState(false);
  const [animationStep, setAnimationStep] = React.useState<'idle' | 'bag-in' | 'drop' | 'fly'>('idle');
  const [flyingItems, setFlyingItems] = React.useState<{ id: string; src: string; startX: number; startY: number; endX: number; endY: number }[]>([]);

  // Update active images if the product changes
  React.useEffect(() => {
    setActiveImage(image);
    setActiveHoverImage(hoverImage);
    setSelectedColorIndex(0);
  }, [image, hoverImage]);

  // Price formatting helper
  const parsedPrice = React.useMemo(() => {
    const numericPart = price.replace(/[^0-9.]/g, "");
    const value = parseFloat(numericPart);
    if (isNaN(value)) return { current: price, original: null };

    const symbol = price.replace(/[0-9.,\s]/g, ""); // e.g. "₹", "Rs.", "$", etc.
    const hasSpace = price.includes(" ");

    // Check if there is a discount or badge that says "X% OFF"
    let pct = discount || 0;
    if (badge && badge.toLowerCase().includes("% off")) {
      const parsedPct = parseFloat(badge.replace(/[^0-9.]/g, ""));
      if (!isNaN(parsedPct)) pct = parsedPct;
    }

    if (pct <= 0) {
      return { current: price, original: null };
    }

    const originalVal = Math.round(value / (1 - (pct / 100)));
    const format = (val: number) => {
      const formattedVal = val.toLocaleString('en-IN');
      return `${symbol}${hasSpace ? " " : ""}${formattedVal}`;
    };

    return {
      current: price,
      original: format(originalVal)
    };
  }, [price, discount, badge]);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Step 1: Slide up bag overlay
    setAnimating(true);
    setAnimationStep('bag-in');

    // Step 2: Drop image inside bag
    setTimeout(() => {
      setAnimationStep('drop');

      // Step 3: Trigger flying bag animation
      setTimeout(() => {
        setAnimationStep('fly');

        const cardEl = document.getElementById(`premium-product-card-${id}`);
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

        onAddToCart();

        // Step 4: Reset card animations after flight finishes
        setTimeout(() => {
          setAnimating(false);
          setAnimationStep('idle');
        }, 800);

      }, 350);

    }, 350);
  };

  const maxThumbnails = 3;
  const hasVariants = colorVariants && colorVariants.length > 0;
  const displayedVariants = hasVariants ? colorVariants.slice(0, maxThumbnails) : [];
  const remainingVariantsCount = hasVariants ? Math.max(0, colorVariants.length - maxThumbnails) : 0;

  // Determine category text (e.g. brand + category)
  const categoryText = React.useMemo(() => {
    if (gender || category) {
      const g = gender ? `${gender}'s` : "";
      const c = category || "Apparel";
      return `${g} ${c}`.trim().toUpperCase();
    }
    // Fallback to brand name
    return brand.toUpperCase();
  }, [gender, category, brand]);

  // Badge text
  const showBadge = React.useMemo(() => {
    if (badge) return badge;
    if (discount && discount > 0) return `${discount}% OFF`;
    return null;
  }, [badge, discount]);

  return (
    <div
      id={`premium-product-card-${id}`}
      className={cn(
        "bg-white border border-zinc-150 rounded-[32px] p-4 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5",
        className
      )}
    >
      <div>
        {/* Dark Showcase Image Container */}
        <div
          onClick={() => id && (window.location.href = `/product/${id}`)}
          className="relative w-full aspect-[4/5] bg-[#121824] rounded-[24px] overflow-hidden select-none cursor-pointer flex items-center justify-center"
        >
          {/* Bag Back Layer */}
          {animating && (animationStep === "bag-in" || animationStep === "drop") && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center z-5 animate-slide-up-bag">
              <div className="relative w-28 h-20 bg-[#1e1e1e] rounded-b-xl border border-zinc-800 shadow-inner">
                {/* Back handle string */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-zinc-700 rounded-t-full" />
              </div>
            </div>
          )}

          {/* Product Image Wrapper */}
          <div 
            className={cn(
              "w-full h-full transition-all duration-300 z-10 relative overflow-hidden flex items-center justify-center p-6",
              animating && animationStep === "drop" ? "scale-40 translate-y-12 opacity-0" : "",
              animating && animationStep === "bag-in" ? "scale-90" : ""
            )}
          >
            {/* Primary Image */}
            <Image
              src={activeImage}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 250px"
              className={cn(
                "object-contain p-4 transition-all duration-700 ease-out",
                activeHoverImage ? "group-hover:opacity-0 group-hover:scale-95" : "group-hover:scale-108"
              )}
            />

            {/* Secondary Hover Image (Outfit-style swap animation) */}
            {activeHoverImage && (
              <Image
                src={activeHoverImage}
                alt={`${name} alternative view`}
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                className="object-contain p-4 absolute inset-0 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out z-10"
              />
            )}
          </div>

          {/* Bag Front Layer */}
          {animating && (animationStep === "bag-in" || animationStep === "drop") && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center z-15 animate-slide-up-bag">
              <div className="relative w-28 h-20 bg-[#0d0d0d] rounded-b-xl border-t border-zinc-700 shadow-lg flex flex-col justify-center items-center">
                {/* Front handle string */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-zinc-650 rounded-t-full" />
                {/* Gold brand text */}
                <span className="text-[5px] font-mono text-zinc-500 font-black tracking-widest uppercase mt-3">
                  DRIP HUNTER
                </span>
              </div>
            </div>
          )}

          {/* Badges & Discount Tags */}
          {showBadge && (
            <div className="absolute top-3 left-3 z-15">
              <span className={cn(
                "text-[9px] font-black tracking-wider px-2.5 py-1 rounded-[8px] uppercase block shadow-xs",
                showBadge.toLowerCase().includes("limited") || showBadge.toLowerCase().includes("pre")
                  ? "bg-[#eab308] text-black"
                  : "bg-[#ff5a00] text-white"
              )}>
                {showBadge}
              </span>
            </div>
          )}
        </div>

        {/* Color Option Thumbnails */}
        <div className="flex items-center gap-1.5 mt-3.5 px-1">
          {hasVariants ? (
            <>
              {displayedVariants.map((variant, vIdx) => (
                <button
                  key={vIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(variant.image);
                    setActiveHoverImage(variant.image);
                    setSelectedColorIndex(vIdx);
                  }}
                  className={cn(
                    "w-9 h-9 rounded-lg overflow-hidden border-2 bg-[#f4f4f5] transition-all p-0.5 cursor-pointer relative",
                    selectedColorIndex === vIdx ? "border-[#ff5a00] scale-105" : "border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={variant.image}
                      alt={variant.color}
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
              {remainingVariantsCount > 0 && (
                <span className="text-xs font-bold text-[#ff5a00] ml-1">
                  +{remainingVariantsCount}
                </span>
              )}
            </>
          ) : (
            // If no variants exist, show primary and hover images as thumbnails
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(image);
                  setActiveHoverImage(hoverImage);
                  setSelectedColorIndex(0);
                }}
                className={cn(
                  "w-9 h-9 rounded-lg overflow-hidden border-2 bg-[#f4f4f5] transition-all p-0.5 cursor-pointer relative",
                  selectedColorIndex === 0 ? "border-[#ff5a00] scale-105" : "border-zinc-200 hover:border-zinc-300"
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt="Main color"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
              {hoverImage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(hoverImage);
                    setActiveHoverImage(image);
                    setSelectedColorIndex(1);
                  }}
                  className={cn(
                    "w-9 h-9 rounded-lg overflow-hidden border-2 bg-[#f4f4f5] transition-all p-0.5 cursor-pointer relative",
                    selectedColorIndex === 1 ? "border-[#ff5a00] scale-105" : "border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={hoverImage}
                      alt="Alt color"
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        {/* Product Details Section */}
        <div 
          onClick={() => id && (window.location.href = `/product/${id}`)}
          className="mt-3 px-1 cursor-pointer select-none text-left"
        >
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
            {categoryText}
          </span>
          <h4 className="text-sm font-extrabold text-zinc-900 uppercase tracking-tight mt-0.5 line-clamp-1 group-hover:text-[#ff5a00] transition-colors">
            {name}
          </h4>
          <div className="flex items-baseline gap-2 mt-1.5">
            <strong className="text-sm font-extrabold text-zinc-950 font-mono">
              {parsedPrice.current}
            </strong>
            {parsedPrice.original && (
              <span className="text-xs text-zinc-400 font-bold line-through font-mono">
                {parsedPrice.original}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer Row (Curved button + Wishlist button) */}
      <div className="flex items-center gap-2 mt-4">
        <InteractiveAddToCartButton
          onClick={handleAddToCartClick}
          buttonText={buttonText.toUpperCase()}
          animationStyle="truck"
          size="md"
          className="flex-grow !rounded-full bg-[#121824] hover:bg-[#1a2333] transition-colors text-white py-3 font-extrabold text-xs tracking-wider"
        />
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
          className="w-12 h-12 flex items-center justify-center border border-zinc-200 hover:border-zinc-300 rounded-[18px] bg-white transition-all shadow-xs cursor-pointer active:scale-90 flex-shrink-0"
        >
          <InteractiveHeartButton
            isFavorite={isFavorite}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
            }}
            plain={true}
            size="md"
          />
        </div>
      </div>

      {/* Portal animations style */}
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
              left: item.startX - 24,
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
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 border border-zinc-600 rounded-t-full" />
              <div className="w-12 h-9 bg-[#0d0d0d] rounded-b-md border-t border-zinc-700 shadow-lg flex flex-col items-center justify-center">
                <span className="text-[3px] font-mono text-zinc-500 font-extrabold tracking-widest">DRIP</span>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
}
