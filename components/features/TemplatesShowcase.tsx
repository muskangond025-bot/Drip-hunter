"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Star, X, Zap, Flame, Clock, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { masterProducts, Product } from "@/app/product/[id]/data";
import { cn } from "@/lib/utils";

interface TemplatesShowcaseProps {
  onAddToCart?: (product: any) => void;
  favorites?: number[];
  onToggleFavorite?: (product: any) => void;
}

export function TemplatesShowcase({
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}: TemplatesShowcaseProps) {
  const [activeTab, setActiveTab] = useState("Men");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sale Clock State
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 22 });
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

  const dealProducts: Product[] = [
    {
      id: 901,
      brand: "SAVANA WOMEN",
      name: "Minimalist Cream Contrast A-Line Dress",
      price: "From $49",
      image: "/images/women_dress_cream.png",
      rating: 4.9,
      color: "Cream/Black",
      category: "Dresses",
      gender: "Women",
      discount: 50,
      description: "A chic, minimalist cream A-line dress detailed with stark black collars and a fitted waist belt. Vintage elegance redefined.",
      sizes: ["S", "M", "L", "XL"],
      specifications: [{ label: "Fabric", value: "Premium Crepe Blend" }],
      colorVariants: [{ color: "Cream/Black", colorHex: "#FAF6EE", image: "/images/women_dress_cream.png" }]
    },
    {
      id: 902,
      brand: "SAVANA MAN",
      name: "Premium Maroon Formal Shirt",
      price: "From $29",
      image: "/images/men_shirt_maroon.jpg",
      rating: 4.8,
      color: "Maroon",
      category: "Outerwear",
      gender: "Men",
      discount: 40,
      description: "A premium slim fit burgundy dress shirt crafted with long-staple cotton for unmatched breathability and sophistication.",
      sizes: ["M", "L", "XL"],
      specifications: [
        { label: "Fabric", value: "100% Giza Cotton" },
        { label: "Fit", value: "Slim Fit" },
        { label: "Collar", value: "Spread Collar" }
      ],
      colorVariants: [{ color: "Maroon", colorHex: "#800020", image: "/images/men_shirt_maroon.jpg" }]
    },
    {
      id: 903,
      brand: "SAVANA WOMEN",
      name: "Aesthetic Yellow Strap Floral Dress",
      price: "From $59",
      image: "/images/women_dress_yellow_1.png",
      rating: 4.9,
      color: "Pastel Yellow",
      category: "Clothing",
      gender: "Women",
      discount: 30,
      description: "A breezy pastel yellow summer dress featuring thin shoulder strap ties and a ruched fitted bodice. Perfect for warm sunny days.",
      sizes: ["S", "M", "L"],
      specifications: [{ label: "Detail", value: "Ruched Bodice & Tiered Hem" }],
      colorVariants: [{ color: "Pastel Yellow", colorHex: "#FEF08A", image: "/images/women_dress_yellow_1.png" }]
    },
    {
      id: 904,
      brand: "SAVANA WOMEN",
      name: "Premium Brown Drape Top",
      price: "From $39",
      image: "/images/women_top_brown.png",
      rating: 4.7,
      color: "Espresso Brown",
      category: "Clothing",
      gender: "Women",
      discount: 45,
      description: "An elegant espresso brown sleeveless top featuring a sophisticated cowl neck drape and clean, fitted silhouette.",
      sizes: ["S", "M", "L"],
      specifications: [{ label: "Fabric", value: "Premium Drape Satin Blend" }],
      colorVariants: [{ color: "Espresso Brown", colorHex: "#6F4E37", image: "/images/women_top_brown.png" }]
    },
    {
      id: 905,
      brand: "SAVANA MAN",
      name: "Classic Navy Slim Fit Shirt",
      price: "From $69",
      image: "/images/men_shirt_navy.jpg",
      rating: 4.9,
      color: "Navy Blue",
      category: "Outerwear",
      gender: "Men",
      discount: 35,
      description: "An elegant navy blue formal shirt featuring a structured camp collar and premium stretch weave canvas.",
      sizes: ["M", "L", "XL"],
      specifications: [
        { label: "Fabric", value: "Cotton-Elastane Stretch Blend" },
        { label: "Fit", value: "Semi-Formal Comfort Fit" }
      ],
      colorVariants: [{ color: "Navy", colorHex: "#000080", image: "/images/men_shirt_navy.jpg" }]
    }
  ];

  // Filter and decorate products with custom high-impact deals
  const getDeals = (): Product[] => {
    let list = dealProducts;
    if (activeTab === "Men") {
      list = dealProducts.filter(p => p.gender.toLowerCase() === "men");
    } else if (activeTab === "Women") {
      list = dealProducts.filter(p => p.gender.toLowerCase() === "women");
    } else if (activeTab === "Footwear") {
      list = dealProducts;
    } else if (activeTab === "Accessories") {
      list = dealProducts;
    }

    return list;
  };

  const deals = getDeals();
  const featuredDeal = deals[0] || dealProducts[0]; // First item is the large highlight
  const gridDeals = deals.slice(1, 5).length > 0 ? deals.slice(1, 5) : dealProducts.slice(1, 5); // Next 4 items form the dynamic uneven grid

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
    <section className="bg-[#FAF9F5] py-20 w-full relative overflow-hidden select-none border-t border-zinc-200">
      {/* Visual Design Elements: Funky curved shapes, gradient blobs, dotted grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 z-0 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100/40 via-orange-100/20 to-transparent blur-3xl rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[450px] h-[450px] bg-gradient-to-br from-red-100/30 via-yellow-100/20 to-transparent blur-3xl rounded-full z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* 1. SECTION HEADER: Bold Title + Live Countdown Clock */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-200/80 pb-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Limited Drop</span>
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-950 font-chaney-title uppercase leading-none">
              Deals of <span className="text-zinc-500">the Day</span>
            </h2>
          </div>

          {/* Funky Countdown Timer Block */}
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 text-white rounded-3xl p-4 md:px-6 md:py-4 shadow-xl shrink-0">
            <div className="flex items-center gap-2 text-zinc-400 shrink-0">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-[10px] font-black uppercase tracking-widest font-mono">Offer Ends In:</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xl font-black text-white">
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15 min-w-[36px] text-center">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-yellow-400 font-bold">:</span>
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15 min-w-[36px] text-center">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-yellow-400 font-bold">:</span>
              <div className="bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15 min-w-[36px] text-center">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {["Men", "Women", "Footwear", "Accessories"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border border-zinc-200 shadow-2xs hover:scale-102",
                  isActive 
                    ? "bg-yellow-400 text-black border-yellow-400" 
                    : "bg-white text-zinc-600 hover:bg-zinc-50 hover:text-black"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3. DYNAMIC EDITORIAL DEALS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Highlight Featured Banner (5 Cols) */}
          {featuredDeal && (
            <div className="lg:col-span-5 w-full">
              <div 
                onClick={() => setQuickViewProduct(featuredDeal)}
                className="relative w-full aspect-[3/4.2] rounded-[36px] overflow-hidden shadow-2xl border border-zinc-200/50 bg-[#F5EFE6] p-8 flex flex-col justify-between text-left group cursor-pointer"
              >
                {/* Background Blobs/Visual Gradients inside banner */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-yellow-300/40 rounded-full blur-2xl z-0 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

                {/* Stickers at the Top */}
                <div className="relative z-20 flex flex-wrap items-center gap-2">
                  <span className="bg-red-500 text-white font-mono text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
                    {featuredDeal.discount}% OFF
                  </span>
                  <span className="bg-black text-white font-mono text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-zinc-800">
                    Hot Deal
                  </span>
                </div>

                {/* Large Visual Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={featuredDeal.image}
                    alt={featuredDeal.name}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom details & Stock Progress Bar */}
                <div className="relative z-20 text-white space-y-4 pt-32">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-350 uppercase tracking-widest block">
                      {featuredDeal.brand}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight font-chaney-title">
                      {featuredDeal.name}
                    </h3>
                  </div>

                  {/* Stock progress levels indicator */}
                  <div className="space-y-1 bg-black/40 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase font-mono text-yellow-400">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Selling Fast!</span>
                      </span>
                      <span>Only 4 left</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-[80%] h-full bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Pricing details */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-baseline gap-2">
                      <strong className="text-xl font-black text-white">{featuredDeal.price}</strong>
                      <span className="text-xs text-zinc-400 line-through font-medium">
                        ₹{(parseFloat(featuredDeal.price.replace(/[^0-9.]/g, "")) * (1 + featuredDeal.discount / 100)).toFixed(0)}
                      </span>
                    </div>
                    
                    <button 
                      onClick={(e) => handleAddToCartClick(e, featuredDeal)}
                      className="bg-[#facc15] hover:bg-[#ebd26b] text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer transition-colors shadow-md border-none flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Claim Deal</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Right Column: Uneven, Dynamic Small Deals Grid (7 Cols) */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {gridDeals.map((p, idx) => {
                const isFavorite = favorites.includes(p.id);
                // Stagger cards visually with an uneven margins to give a funky layout
                const isOffset = idx % 2 === 1;

                return (
                  <div
                    key={p.id}
                    className={cn(
                      "relative rounded-[28px] overflow-hidden group cursor-pointer border border-zinc-200 bg-white shadow-3xs hover:shadow-lg transition-all duration-500",
                      isOffset ? "sm:mt-6 aspect-[3/4.2]" : "aspect-[3/4]"
                    )}
                  >
                    {/* Image visual container */}
                    <div className="absolute inset-0 z-0 bg-zinc-50">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="300px"
                        className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    </div>

                    {/* Stickers/Badges at top */}
                    <div className="absolute inset-x-0 top-0 p-4 z-10 flex items-start justify-between">
                      <span className="bg-[#4EF5D6] text-black font-mono text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm transform -rotate-6 group-hover:rotate-0 transition-transform">
                        {p.discount}% OFF
                      </span>

                      {/* Wishlist Toggle Button */}
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

                    {/* Product Details Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-white select-none">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1">
                        {p.name}
                      </h4>

                      {/* Pricing block */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-baseline gap-1.5">
                          <strong className="text-sm font-extrabold text-white">{p.price}</strong>
                          <span className="text-[10px] text-zinc-400 line-through">
                            ₹{(parseFloat(p.price.replace(/[^0-9.]/g, "")) * (1 + p.discount / 100)).toFixed(0)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[9px] text-[#facc15] font-bold font-mono bg-[#facc15]/10 px-1.5 py-0.5 rounded border border-[#facc15]/20">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{p.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Interactions Action Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center gap-2.5 p-5 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(p);
                        }}
                        className="w-full bg-white hover:bg-black hover:text-white text-black text-xs font-black uppercase tracking-widest py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer border-none"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={(e) => handleAddToCartClick(e, p)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black uppercase tracking-widest py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer border-none"
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

        {/* 4. SHOP ALL DEALS FOOTER CALL TO ACTION */}
        <div className="mt-16 text-center">
          <a
            href="/shop?sort=discount"
            className="inline-flex items-center justify-center bg-black hover:bg-zinc-900 text-[#FAF9F5] font-sans font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-0.5"
          >
            <span>Shop All Flash Deals</span>
            <Percent className="w-4 h-4 ml-2 animate-bounce" />
          </a>
        </div>

      </div>

      {/* 5. INTERACTIVE QUICK VIEW MODAL COMPONENT */}
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

export default TemplatesShowcase;
