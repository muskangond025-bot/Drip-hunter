"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";

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
          "relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden select-none",
          isPadded || isCatalog ? "rounded-xl" : "rounded-t-[22px]",
          id ? "cursor-pointer" : ""
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle();
          }}
          className={cn(
            "absolute flex items-center justify-center transition-all cursor-pointer z-10",
            isPadded || isCatalog
              ? "top-2 right-2 w-7 h-7 bg-white/85 hover:bg-white rounded-full shadow-xs"
              : "top-4 right-4 hover:scale-110"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "transition-colors",
              isPadded || isCatalog
                ? cn("w-3.5 h-3.5", isFavorite ? "fill-red-500 text-red-500" : "text-zinc-600")
                : cn("w-5 h-5", isFavorite ? "fill-[#FF5A35] text-[#FF5A35]" : "text-zinc-400 hover:text-red-500")
            )}
          />
        </button>
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

          <button 
            onClick={() => onAddToCart && onAddToCart()}
            className="w-full bg-[#121214] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-colors mt-2 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {buttonText}
          </button>
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
            <strong className="text-sm font-bold text-zinc-950 block mt-0.5">
              {price}
            </strong>
          </div>

          <button 
            onClick={() => onAddToCart && onAddToCart()}
            className="w-full bg-[#3F3F46] hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider py-3.5 transition-colors cursor-pointer rounded-b-[22px] flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}
