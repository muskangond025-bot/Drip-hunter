"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Star, X, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { masterProducts, Product } from "@/app/product/[id]/data";
import { cn } from "@/lib/utils";

interface NewArrivalsProps {
  activeTab?: string;
  onAddToCart?: (product: any) => void;
  favorites?: number[];
  onToggleFavorite?: (product: any) => void;
  searchQuery?: string;
  searchCategory?: string;
  selectedSubCategory?: string | null;
}

export function NewArrivals({
  activeTab,
  onAddToCart,
  favorites = [],
  onToggleFavorite,
  searchQuery,
  searchCategory,
  selectedSubCategory,
}: NewArrivalsProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Ref for the horizontal slider scroll
  const sliderRef = useRef<HTMLDivElement>(null);

  // Time remaining countdown states
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slider navigation helpers
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter products based on selected tab/pill and existing subcategory filter
  const getFilteredProducts = (): Product[] => {
    let list = masterProducts;
    
    // Applying tab filter
    if (activeFilter === "Tops") {
      list = masterProducts.filter(p => ["Top Wear", "Sweatshirts", "Shirts"].includes(p.category));
    } else if (activeFilter === "Bottoms") {
      list = masterProducts.filter(p => ["Bottom Wear", "Cargo", "Bottoms"].includes(p.category));
    } else if (activeFilter === "Footwear") {
      list = masterProducts.filter(p => p.category === "Footwear");
    } else if (activeFilter === "Accessories") {
      list = masterProducts.filter(p => ["Caps", "Accessories", "Bags", "Wallets"].includes(p.category));
    }

    // Apply subcategory prop filter if any
    if (selectedSubCategory) {
      const sub = selectedSubCategory.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(sub) ||
        p.brand.toLowerCase().includes(sub) ||
        p.category.toLowerCase().includes(sub)
      );
    }

    return list.slice(0, 10);
  };

  const filteredProducts = getFilteredProducts();

  const handleFavoriteClick = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite({ id: p.id, brand: p.brand, name: p.name, price: p.price, image: p.image });
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id: p.id, brand: p.brand, name: p.name, price: p.price, image: p.image });
    }
  };

  return (
    <section id="new-arrivals" className="bg-[#FAF9F5] text-[#0A0A0A] py-16 w-full select-none overflow-hidden relative border-t border-zinc-200/50">
      
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-zinc-200/60 pb-6">
          <div className="text-left space-y-2 max-w-xl">
            <span className="text-[10px] font-black tracking-[0.25em] text-orange-500 uppercase font-mono block">Just Dropped</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-950 font-chaney-title leading-tight">
              Fresh New <span className="text-zinc-500">Arrivals</span>
            </h2>
            <p className="text-xs text-zinc-500 font-medium font-sans leading-relaxed">
              Added in the last 7 days. Discover the latest edit of premium streetwear drops and season picks.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <a 
              href="/shop?sort=newest" 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black hover:text-orange-500 transition-colors group/btn"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 2. CATEGORY FILTER CHIPS */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {["All", "Tops", "Bottoms", "Footwear", "Accessories"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border border-zinc-200 shadow-3xs",
                  isActive 
                    ? "bg-black text-white border-black scale-102" 
                    : "bg-white text-zinc-600 hover:bg-zinc-50 hover:text-black hover:border-zinc-300"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. EDITORIAL GRID & STORYTELLING */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Premium Style Story Campaign Banner (4 Cols) */}
        <div className="lg:col-span-4 w-full">
          <div className="relative w-full aspect-[3/4.5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200/50 bg-zinc-950 p-8 flex flex-col justify-between text-left text-white group/campaign animate-fade-in">
            {/* Background Model Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://img105.savana.com/768828d8de3647fab3593c91587cec6c.webp" 
                alt="New Season Campaign" 
                fill 
                className="object-cover opacity-85 group-hover/campaign:scale-103 transition-transform duration-[1.2s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Campaign details */}
            <div className="relative z-10 space-y-1">
              <span className="text-[9px] font-black font-mono tracking-widest text-[#facc15] bg-[#facc15]/10 border border-[#facc15]/30 px-2 py-0.5 rounded-full uppercase inline-block">
                The Latest Edit
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none pt-2 font-chaney-title">
                NEW SEASON<br />PICKS
              </h3>
            </div>

            {/* Countdown Drop Clock & CTA */}
            <div className="relative z-10 space-y-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300 font-mono block">Drop Clock Ends In</span>
                <div className="flex gap-3 text-white font-mono text-base font-black">
                  <div>
                    <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[8px] text-zinc-400 font-bold block">HRS</span>
                  </div>
                  <span>:</span>
                  <div>
                    <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[8px] text-zinc-400 font-bold block">MINS</span>
                  </div>
                  <span>:</span>
                  <div>
                    <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[8px] text-zinc-400 font-bold block">SECS</span>
                  </div>
                </div>
              </div>
              <a 
                href="/shop?sort=newest"
                className="w-full bg-[#facc15] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-transform block text-center cursor-pointer active:scale-98"
              >
                Shop the Drop
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Horizontal Slider of Asymmetrical Cards (8 Cols) */}
        <div className="lg:col-span-8 w-full relative group/slider">
          
          {/* Slider controls */}
          <div className="absolute -top-16 right-0 hidden md:flex items-center gap-2 z-10">
            <button 
              onClick={() => scrollSlider("left")}
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:border-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button 
              onClick={() => scrollSlider("right")}
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:border-black transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Cards container with drag/scroll options */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-none pb-8 pt-2 select-none scroll-smooth snap-x snap-mandatory"
          >
            {filteredProducts.map((p, idx) => {
              const isLarge = idx % 3 === 1; // Create an editorial rhythm: 1 large, 2 standard
              const isFavorite = favorites.includes(p.id);

              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex-shrink-0 relative rounded-3xl overflow-hidden group cursor-pointer border border-zinc-200 bg-white shadow-3xs transition-all duration-500 snap-start",
                    isLarge 
                      ? "w-[280px] sm:w-[310px] aspect-[3/4.5]" 
                      : "w-[240px] sm:w-[270px] aspect-[3/4]"
                  )}
                >
                  {/* Image Background Container */}
                  <div className="absolute inset-0 z-0 bg-zinc-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="350px"
                      className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  </div>

                  {/* Top Overlays: Badges & Wishlist Heart */}
                  <div className="absolute inset-x-0 top-0 p-4 sm:p-5 z-10 flex items-start justify-between">
                    {/* Badge */}
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-black font-mono border border-black/10",
                      idx % 2 === 0 ? "bg-yellow-400" : "bg-[#4EF5D6]"
                    )}>
                      {idx % 2 === 0 ? "JUST IN" : "TRENDING"}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleFavoriteClick(e, p)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer backdrop-blur-md shadow-sm border-white/20",
                        isFavorite 
                          ? "bg-red-500 border-red-500 text-white fill-white scale-110" 
                          : "bg-white/70 text-zinc-700 hover:bg-white hover:text-black hover:scale-110"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
                    </button>
                  </div>

                  {/* Card Details Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left text-white select-none">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">
                      {p.brand}
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1">
                      {p.name}
                    </h4>

                    {/* Pricing, Discount, Rating */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-2">
                        <strong className="text-sm font-extrabold text-white">{p.price}</strong>
                        {p.discount > 0 && (
                          <span className="text-[10px] text-zinc-400 line-through">
                            ₹{(parseFloat(p.price.replace(/[^0-9.]/g, "")) * (1 + p.discount / 100)).toFixed(0)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-[10px] text-[#facc15] font-bold font-mono bg-[#facc15]/10 px-2 py-0.5 rounded border border-[#facc15]/20">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{p.rating}</span>
                      </div>
                    </div>

                    {/* Color variants circle dots */}
                    {p.colorVariants && p.colorVariants.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-3">
                        {p.colorVariants.slice(0, 3).map((variant, vIdx) => (
                          <div
                            key={vIdx}
                            className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                            title={variant.color}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* HOVER OVERLAY INTERACTIONS */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center gap-3 p-6 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(p);
                      }}
                      className="w-full bg-white hover:bg-black hover:text-white text-black text-xs font-black uppercase tracking-widest py-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-97 cursor-pointer border-none"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => handleAddToCartClick(e, p)}
                      className="w-full bg-[#facc15] hover:bg-[#ebd26b] text-black text-xs font-black uppercase tracking-widest py-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-97 cursor-pointer border-none"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. PREMIUM QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 select-none">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual */}
              <div className="w-full sm:w-1/2 aspect-[4/5] relative rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    {quickViewProduct.brand}
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-950 tracking-tight leading-tight">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{quickViewProduct.rating} Rating</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Description</span>
                  <p className="text-[11px] text-zinc-650 leading-relaxed font-sans font-medium line-clamp-4">
                    {quickViewProduct.description}
                  </p>
                </div>

                {/* Available Sizes & Colors */}
                <div className="space-y-3">
                  {quickViewProduct.sizes && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Available Sizes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {quickViewProduct.sizes.map((s) => (
                          <span key={s} className="px-2.5 py-1 text-[10px] font-mono font-bold bg-zinc-100 rounded-md border border-zinc-200 animate-fade-in">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {quickViewProduct.colorVariants && quickViewProduct.colorVariants.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-405 font-bold uppercase tracking-wider block">Colors</span>
                      <div className="flex gap-1.5">
                        {quickViewProduct.colorVariants.map((v, vIdx) => (
                          <div
                            key={vIdx}
                            className="w-4 h-4 rounded-full border border-zinc-300 shadow-2xs cursor-help"
                            style={{ backgroundColor: v.colorHex }}
                            title={v.color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-zinc-100 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Price</span>
                    <strong className="text-lg font-black text-zinc-950 leading-tight">{quickViewProduct.price}</strong>
                  </div>

                  <button
                    onClick={() => {
                      if (onAddToCart) {
                        onAddToCart({ 
                          id: quickViewProduct.id, 
                          brand: quickViewProduct.brand, 
                          name: quickViewProduct.name, 
                          price: quickViewProduct.price, 
                          image: quickViewProduct.image 
                        });
                      }
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-black hover:bg-zinc-900 text-[#facc15] text-xs font-black uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer border-none text-center"
                  >
                    Add to Bag
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default NewArrivals;
