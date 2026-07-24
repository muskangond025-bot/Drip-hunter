"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveBuyNowButton } from "@/components/ui/InteractiveBuyNowButton";

interface VariantColor {
  name: string;
  hex: string;
  image: string;
  bgGlow: string;
  badgeColor: string;
}

const spotlightProduct = {
  brand: "DRIP HUNTER EXCLUSIVE",
  name: "DRIP TRUCKER VARSITY JACKET // 001",
  price: "₹14,999",
  originalPrice: "₹18,999",
  discount: "21% OFF",
  rating: 4.95,
  reviewsCount: 384,
  description: "A premium heavyweight collegiate varsity jacket featuring high-density typography embroidery, vegan leather sleeves, and a custom quilted satin lining. Designed to fit oversized with a drop shoulder silhouette.",
  sizes: ["S", "M", "L", "XL"],
  features: [
    "Premium Heavyweight 480GSM Wool Blend Body",
    "Grained Vegan Leather Sleeves with Double Stitching",
    "High-Density Chenille Embroidery Details",
    "Internal Pocket & Ribbed Elastic Cuffs"
  ],
  colors: [
    {
      name: "Forest Green",
      hex: "#166534",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      bgGlow: "from-green-500/25 via-green-400/5 to-transparent",
      badgeColor: "bg-green-50 text-green-700 border-green-200"
    },
    {
      name: "Carbon Black",
      hex: "#18181b",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80",
      bgGlow: "from-zinc-500/25 via-zinc-400/5 to-transparent",
      badgeColor: "bg-zinc-50 text-zinc-700 border-zinc-200"
    },
    {
      name: "Crimson Red",
      hex: "#991b1b",
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",
      bgGlow: "from-red-500/25 via-red-400/5 to-transparent",
      badgeColor: "bg-red-50 text-red-700 border-red-200"
    }
  ] as VariantColor[]
};

interface SpotlightBuyNowProps {
  onAddToCart?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
    size?: string;
  }) => void;
}

export function SpotlightBuyNow({ onAddToCart }: SpotlightBuyNowProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [imageLoaded, setImageLoaded] = useState(false);

  const activeColor = spotlightProduct.colors[selectedColorIdx];

  const handleColorChange = (idx: number) => {
    if (idx === selectedColorIdx) return;
    setImageLoaded(false);
    setSelectedColorIdx(idx);
  };

  const handleBuyNow = () => {
    onAddToCart?.({
      id: 9991,
      brand: spotlightProduct.brand,
      name: `${spotlightProduct.name} (Size: ${selectedSize})`,
      price: spotlightProduct.price,
      image: activeColor.image,
      size: selectedSize,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative select-none">
      
      {/* Section Header */}
      <div className="flex flex-col mb-12">
        <span className="text-[10px] font-mono text-orange-500 font-black uppercase tracking-widest block mb-2">
          LIMITED SHOWCASE // COLLAB
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest font-sans text-zinc-950">
          SPOTLIGHT ARCHIVE
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-zinc-55/35 border border-zinc-200/80 rounded-[48px] p-8 lg:p-12 items-center relative overflow-hidden">
        
        {/* Dynamic Background Glow */}
        <div className={cn(
          "absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br filter blur-3xl opacity-50 z-0 transition-all duration-700",
          activeColor.bgGlow
        )} />

        {/* Left Column: Product Image */}
        <div className="lg:col-span-6 flex items-center justify-center relative z-10 w-full">
          <div className="relative w-full aspect-[4/5] bg-zinc-150 rounded-[32px] overflow-hidden shadow-2xl border border-zinc-200 transition-transform duration-500 hover:scale-[1.01] group">
            {/* Hover subtle zoom overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
            
            <Image
              src={activeColor.image}
              alt={spotlightProduct.name}
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                imageLoaded ? "scale-100 blur-0" : "scale-105 blur-md"
              )}
              onLoad={() => setImageLoaded(true)}
              priority
            />
            
            {/* Color Tag Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className={cn(
                "border text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm backdrop-blur-xs",
                activeColor.badgeColor
              )}>
                {activeColor.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Configurator & Checkout */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left relative z-10">
          
          {/* Brand Tag */}
          <span className="border border-zinc-200 bg-white/70 text-zinc-550 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase self-start mb-4 shadow-3xs">
            {spotlightProduct.brand}
          </span>

          {/* Product Title */}
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-none mb-3">
            {spotlightProduct.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-6">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wider uppercase ml-1">
              {spotlightProduct.rating} ({spotlightProduct.reviewsCount} reviews)
            </span>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-zinc-950 font-mono tracking-tight">
              {spotlightProduct.price}
            </span>
            <span className="text-sm font-bold text-zinc-450 line-through font-mono">
              {spotlightProduct.originalPrice}
            </span>
            <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-red-100 uppercase tracking-wide">
              {spotlightProduct.discount}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-6 uppercase">
            {spotlightProduct.description}
          </p>

          {/* Specifications Bullets */}
          <div className="flex flex-col gap-2 mb-8">
            {spotlightProduct.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Colors Selector */}
          <div className="mb-6 pt-5 border-t border-zinc-200/80">
            <div className="text-[9px] font-mono text-zinc-400 font-black uppercase tracking-widest mb-3.5">
              Select Colorway
            </div>
            <div className="flex gap-2">
              {spotlightProduct.colors.map((color, i) => {
                const isSelected = i === selectedColorIdx;
                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(i)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all cursor-pointer relative",
                      isSelected ? "border-zinc-950 scale-110 shadow-md" : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isSelected && (
                      <span className="absolute inset-0.5 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="text-[9px] font-mono text-zinc-400 font-black uppercase tracking-widest mb-3.5">
              Select Fitted Size
            </div>
            <div className="flex gap-2 font-mono text-xs font-bold">
              {spotlightProduct.sizes.map((size) => {
                const isSelected = size === selectedSize;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-11 h-11 rounded-xl border flex items-center justify-center uppercase tracking-wider cursor-pointer transition-all",
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-550"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checkout CTAs with Aaron Iker Truck Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Interactive Buy Now Button */}
            <InteractiveBuyNowButton
              onClick={handleBuyNow}
              buttonText="BUY IT NOW"
              addedText="ORDER PLACED!"
              size="lg"
              className="py-4.5 font-black tracking-widest rounded-2xl w-full"
              wrapperClassName="w-full sm:flex-1"
            />

          </div>

          {/* Security & Service Badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-250/50 text-[9px] font-mono text-zinc-450 font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>SECURE PAYMENT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
              <span>FREE IND SHIPPING</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
              <span>7 DAY RETURNS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
