"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import { InteractiveAddToCartButton } from "./InteractiveAddToCartButton";
import { InteractiveHeartButton } from "./InteractiveHeartButton";

export interface ProductCardProps {
  id?: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  discount?: string;
  rating?: number;
  buttonText?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
  variant?: "padded" | "full-width" | "catalog";
  className?: string;
}

export function ProductCard({
  id,
  brand,
  name,
  price,
  image,
  badge,
  discount,
  rating,
  buttonText = "Add To Cart",
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  variant = "padded",
  className,
}: ProductCardProps) {
  const isPadded = variant === "padded";
  const isCatalog = variant === "catalog";

  const [animating, setAnimating] = React.useState(false);
  const [animationStep, setAnimationStep] = React.useState<'idle' | 'bag-in' | 'drop' | 'fly'>('idle');
  const [flyingItems, setFlyingItems] = React.useState<{ id: string; src: string; startX: number; startY: number; endX: number; endY: number }[]>([]);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onAddToCart) return;

    const buttonEl = e.currentTarget;
    const cardEl = buttonEl.closest(".group");
    
    // Step 1: Slide up bag overlay
    setAnimating(true);
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

        onAddToCart();

        // Step 4: Reset card animations after flight finishes
        setTimeout(() => {
          setAnimating(false);
          setAnimationStep('idle');
        }, 800);

      }, 350);

    }, 350);
  };

  return (
    <div
      className={cn(
        "bg-white flex flex-col justify-between transition-all duration-300 relative group",
        isPadded
          ? "rounded-2xl p-4 shadow-xs hover:shadow-xl hover:-translate-y-1 border border-zinc-150"
          : isCatalog
          ? "rounded-2xl p-3 shadow-xs hover:shadow-lg hover:-translate-y-0.5 border border-zinc-200"
          : "border border-zinc-200 rounded-3xl shadow-xs hover:shadow-md hover:border-zinc-400",
        className
      )}
    >
      {/* Image container */}
      <div
        onClick={() => id && (window.location.href = `/product/${id}`)}
        className={cn(
          "relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden select-none product-image-container",
          isPadded || isCatalog ? "rounded-xl" : "rounded-t-[22px]",
          id ? "cursor-pointer" : ""
        )}
      >
        {/* Bag Back Layer */}
        {animating && (animationStep === "bag-in" || animationStep === "drop") && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center z-5 animate-slide-up-bag">
            <div className="relative w-28 h-20 bg-[#1e1e1e] rounded-b-xl border border-zinc-800 shadow-inner">
              {/* Back handle string */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-zinc-700 rounded-t-full" />
            </div>
          </div>
        )}

        {/* Product Image Wrapper */}
        <div 
          className={cn(
            "w-full h-full transition-all duration-300 z-10 relative",
            animating && animationStep === "drop" ? "scale-40 translate-y-12 opacity-0" : "",
            animating && animationStep === "bag-in" ? "scale-90" : ""
          )}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes={isPadded ? "(max-width: 768px) 50vw, 200px" : "(max-width: 768px) 100vw, 250px"}
            className={cn(
              "object-cover transition-transform duration-500",
              isPadded || isCatalog ? "group-hover:scale-105" : "group-hover:scale-103"
            )}
          />
        </div>

        {/* Bag Front Layer */}
        {animating && (animationStep === "bag-in" || animationStep === "drop") && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center z-15 animate-slide-up-bag">
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
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {badge && (
            <span className="bg-yellow-400 text-black text-[9px] font-black tracking-wider px-2 py-0.5 rounded uppercase">
              {badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase">
              {discount}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <InteractiveHeartButton
          isFavorite={!!isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle();
          }}
          className={cn(
            "absolute z-10",
            isPadded || isCatalog ? "top-2 right-2" : "top-4 right-4"
          )}
          size={isPadded || isCatalog ? "sm" : "md"}
        />
      </div>

      {/* Product Details & Action Button */}
      {isPadded || isCatalog ? (
        <div className="mt-3 flex flex-col gap-1.5 flex-grow justify-between">
          <div
            onClick={() => id && (window.location.href = `/product/${id}`)}
            className={cn("flex flex-col gap-0.5", id ? "cursor-pointer" : "")}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-mono uppercase">
                {brand}
              </span>
              {rating !== undefined && (
                <StarRating rating={rating} size="sm" />
              )}
            </div>

            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight line-clamp-1 hover:text-orange-500 transition-colors">
              {name}
            </h4>

            <strong className="text-sm font-bold text-zinc-950 mt-0.5 block">
              {price}
            </strong>
          </div>

          <InteractiveAddToCartButton
            onClick={handleAddToCartClick}
            buttonText={buttonText}
            animationStyle="truck"
            size="sm"
            className="mt-2"
          />
        </div>
      ) : (
        <>
          <div 
            onClick={() => id && (window.location.href = `/product/${id}`)}
            className={cn("p-5 bg-white flex flex-col gap-1 flex-grow", id ? "cursor-pointer" : "")}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider block">
                {brand}
              </span>
              {rating !== undefined && (
                <StarRating rating={rating} size="sm" />
              )}
            </div>
            <h4 className="text-xs font-bold text-zinc-700 tracking-tight uppercase line-clamp-1 hover:text-orange-500 transition-colors">
              {name}
            </h4>
            <strong className="text-sm font-bold text-zinc-955 block mt-0.5">
              {price}
            </strong>
          </div>

          <InteractiveAddToCartButton
            onClick={handleAddToCartClick}
            buttonText={buttonText}
            animationStyle="truck"
            size="md"
            className="rounded-t-none rounded-b-[22px]"
          />
        </>
      )}
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
                <span className="text-[3px] font-mono text-zinc-500 font-extrabold tracking-widest">DRIP</span>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
}
