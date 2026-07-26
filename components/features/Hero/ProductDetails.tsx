"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProductItem } from "./ProductData";

interface ProductDetailsProps {
  product: ProductItem;
  selectedColorIdx: number;
  setSelectedColorIdx: (idx: number) => void;
  selectedSizeIdx: number;
  setSelectedSizeIdx: (idx: number) => void;
  sizeSystem: "EU" | "US";
  setSizeSystem: (sys: "EU" | "US") => void;
  onBuy: () => void;
}

export function ProductDetails({
  product,
  selectedColorIdx,
  setSelectedColorIdx,
  selectedSizeIdx,
  setSelectedSizeIdx,
  sizeSystem,
  setSizeSystem,
  onBuy
}: ProductDetailsProps) {
  const activeSizes = sizeSystem === "EU" ? product.sizes.EU : product.sizes.US;

  return (
    <div className="space-y-6 text-left text-white max-w-sm pointer-events-auto">
      
      {/* 1. Brand & Title */}
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-5xl font-sans font-extrabold tracking-tight uppercase leading-none text-white transition-all duration-300">
          {product.name}
        </h1>
        <p className="text-sm font-mono text-zinc-400 font-bold uppercase tracking-wider transition-all duration-300">
          {product.subtitle}
        </p>
      </div>

      {/* 2. Price */}
      <div className="text-3xl font-mono font-black text-white transition-all duration-300">
        {product.price}
      </div>

      {/* 3. Color Option Dots */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
          Color
        </span>
        <div className="flex items-center gap-2.5">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColorIdx(idx)}
              className={cn(
                "w-5 h-5 rounded-full border transition-all cursor-pointer",
                selectedColorIdx === idx 
                  ? "scale-120 ring-2" 
                  : "border-zinc-700 hover:scale-110"
              )}
              style={{ 
                backgroundColor: color.value,
                borderColor: selectedColorIdx === idx ? product.accent : "rgba(63, 63, 70, 1)",
                // Add a glow ring using the product's accent color
                boxShadow: selectedColorIdx === idx ? `0 0 10px ${product.accent}` : "none"
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* 4. Size Options */}
      <div className="space-y-2">
        <div className="flex items-center justify-between max-w-[200px]">
          <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
            Size
          </span>
          <button
            onClick={() => {
              setSizeSystem(sizeSystem === "EU" ? "US" : "EU");
              setSelectedSizeIdx(0); // Reset selection bubble
            }}
            className="text-[9px] font-sans text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <span className={cn(sizeSystem === "EU" ? "text-white font-bold" : "text-zinc-500")}>EU</span>
            {" | "}
            <span className={cn(sizeSystem === "US" ? "text-white font-bold" : "text-zinc-500")}>US</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {activeSizes.map((size, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSizeIdx(idx)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer border",
                selectedSizeIdx === idx
                  ? "bg-white text-black border-white shadow"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-650 hover:text-white"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Solid Red Buy Button */}
      <div className="pt-2">
        <button
          onClick={onBuy}
          className="w-full max-w-[200px] py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase text-xs tracking-widest transition-all cursor-pointer border-none rounded shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:scale-102"
        >
          BUY
        </button>
      </div>

    </div>
  );
}
