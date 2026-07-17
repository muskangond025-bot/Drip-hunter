import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  buttonText?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
  variant?: "padded" | "full-width";
  className?: string;
}

export function ProductCard({
  brand,
  name,
  price,
  image,
  badge,
  buttonText = "Add To Cart",
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  variant = "padded",
  className,
}: ProductCardProps) {
  const isPadded = variant === "padded";

  return (
    <div
      className={cn(
        "bg-white flex flex-col justify-between transition-all duration-300 relative group",
        isPadded
          ? "rounded-2xl p-4 shadow-xs hover:shadow-xl hover:-translate-y-1 border border-zinc-150"
          : "border border-zinc-200 rounded-3xl shadow-xs hover:shadow-md hover:border-zinc-400",
        className
      )}
    >
      {/* Image container */}
      <div
        className={cn(
          "relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden select-none",
          isPadded ? "rounded-xl" : "rounded-t-[22px]"
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={isPadded ? "(max-width: 768px) 50vw, 200px" : "(max-width: 768px) 100vw, 250px"}
          className={cn(
            "object-cover transition-transform duration-500",
            isPadded ? "group-hover:scale-105" : "group-hover:scale-103"
          )}
        />

        {/* Badge tag */}
        {badge && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[8px] font-black tracking-wider px-2 py-0.5 rounded uppercase z-10">
            {badge}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle();
          }}
          className={cn(
            "absolute flex items-center justify-center transition-all cursor-pointer z-10",
            isPadded
              ? "top-2 right-2 w-7 h-7 bg-white/85 hover:bg-white rounded-full shadow-xs"
              : "top-4 right-4 hover:scale-110"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "transition-colors",
              isPadded
                ? cn("w-3.5 h-3.5", isFavorite ? "fill-red-500 text-red-500" : "text-zinc-600")
                : cn("w-5 h-5", isFavorite ? "fill-[#FF5A35] text-[#FF5A35]" : "text-zinc-400 hover:text-red-500")
            )}
          />
        </button>
      </div>

      {/* Product Details & Action Button */}
      {isPadded ? (
        <div className="mt-4 flex flex-col gap-1.5 flex-grow justify-between">
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block uppercase">
              {brand}
            </span>
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-tight line-clamp-1 mt-0.5">
              {name}
            </h4>
            <strong className="text-sm font-bold text-zinc-950 mt-1 block">
              {price}
            </strong>
          </div>

          <button 
            onClick={() => onAddToCart && onAddToCart()}
            className="w-full bg-[#121214] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors mt-3 cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <>
          <div className="p-5 bg-white flex flex-col gap-1 flex-grow">
            <span className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider block">
              {brand}
            </span>
            <h4 className="text-xs font-bold text-zinc-700 tracking-tight uppercase line-clamp-1">
              {name}
            </h4>
            <strong className="text-sm font-bold text-zinc-950 block mt-0.5">
              {price}
            </strong>
          </div>

          <button 
            onClick={() => onAddToCart && onAddToCart()}
            className="w-full bg-[#3F3F46] hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider py-4 transition-colors cursor-pointer rounded-b-[22px]"
          >
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}
