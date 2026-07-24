"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ShoppingBag, ArrowRight, ShieldCheck, Zap, Layers, Sparkles, Star, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { InteractiveBuyNowButton } from "@/components/ui/InteractiveBuyNowButton";
import { InteractiveHeartButton } from "@/components/ui/InteractiveHeartButton";

interface SupervekShowcaseProps {
  onAddToCart?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
  favorites?: number[];
  onToggleFavorite?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
}

export function SupervekShowcase({ onAddToCart, favorites = [], onToggleFavorite }: SupervekShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"BEST SELLERS" | "NEW RELEASES" | "SALE">("BEST SELLERS");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeEssentialTab, setActiveEssentialTab] = useState<"ALL" | "CROSSBODY BAGS" | "CLOTHING" | "HEADWEAR" | "WALLETS" | "ACCESSORIES">("ALL");
  const [selectedColor, setSelectedColor] = useState<Record<number, string>>({});
  const [wishlistState, setWishlistState] = useState<Record<number, boolean>>({});
  const [addedState, setAddedState] = useState<Record<number, boolean>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const toggleFav = (item: { id: number; name: string; price: string; image: string }) => {
    if (onToggleFavorite) {
      onToggleFavorite({
        id: item.id,
        brand: "URBAN MONKEY",
        name: item.name,
        price: item.price,
        image: item.image,
      });
    } else {
      setWishlistState((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    }
  };

  const handleAddEssential = (item: { id: number; name: string; price: string; image: string }) => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        brand: "URBAN MONKEY",
        name: item.name,
        price: item.price,
        image: item.image,
      });
    }
    setAddedState((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedState((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const bestSellers = [
    {
      id: 801,
      name: "Classic Slinger",
      badge: "SAVE 40%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 1,499.00",
      originalPrice: "Rs. 2,499.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
      colors: ["#99f6e4", "#fbcfe8", "#fef08a", "#c084fc"],
    },
    {
      id: 802,
      name: "Carbon Black Slinger",
      badge: "BEST SELLER | SAVE 20%",
      badgeColor: "bg-[#18181b]",
      price: "Rs. 1,999.00",
      originalPrice: "Rs. 2,499.00",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80",
      colors: ["#18181b"],
    },
    {
      id: 803,
      name: "Super Shark Camo Wallet",
      badge: "LIMITED",
      badgeColor: "bg-[#15803d]",
      price: "Rs. 1,599.00",
      originalPrice: "Rs. 1,999.00",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
      colors: ["#3f6212"],
    },
    {
      id: 804,
      name: "OG Thunder Oversized T-Shirt",
      badge: "OVERSIZE | SAVE 52%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 1,199.00",
      originalPrice: "Rs. 2,499.00",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
      colors: ["#18181b", "#2563eb", "#dc2626", "#eab308", "#16a34a"],
    },
    {
      id: 805,
      name: "Oni Oversized Graphic Tee",
      badge: "OVERSIZE | SAVE 50%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 1,999.00",
      originalPrice: "Rs. 3,995.00",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
      colors: ["#18181b"],
    },
  ];

  const newReleases = [
    {
      id: 811,
      name: "Cyber Shield Sunglasses",
      badge: "NEW",
      badgeColor: "bg-blue-600",
      price: "Rs. 1,299.00",
      originalPrice: "Rs. 1,999.00",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
      colors: ["#000000", "#ffffff"],
    },
    {
      id: 812,
      name: "Stealth Tactical Chest Rig",
      badge: "NEW",
      badgeColor: "bg-blue-600",
      price: "Rs. 2,499.00",
      originalPrice: "Rs. 3,499.00",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80",
      colors: ["#18181b"],
    },
    {
      id: 813,
      name: "Utility Cargo Shorts",
      badge: "NEW",
      badgeColor: "bg-blue-600",
      price: "Rs. 1,899.00",
      originalPrice: "Rs. 2,599.00",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=500&q=80",
      colors: ["#3f6212", "#18181b"],
    },
    {
      id: 814,
      name: "Heavyweight Graphic Tee",
      badge: "NEW",
      badgeColor: "bg-blue-600",
      price: "Rs. 1,499.00",
      originalPrice: "Rs. 2,199.00",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
      colors: ["#ffffff", "#18181b"],
    },
    {
      id: 815,
      name: "Retro Tech Beanie",
      badge: "NEW",
      badgeColor: "bg-blue-600",
      price: "Rs. 899.00",
      originalPrice: "Rs. 1,299.00",
      image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=500&q=80",
      colors: ["#dc2626", "#18181b", "#ffffff"],
    },
  ];

  const saleItems = [
    {
      id: 821,
      name: "Urban Utility Sling",
      badge: "SAVE 50%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 1,249.00",
      originalPrice: "Rs. 2,499.00",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80",
      colors: ["#18181b"],
    },
    {
      id: 822,
      name: "Reflective Street Vest",
      badge: "SAVE 30%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 2,799.00",
      originalPrice: "Rs. 3,999.00",
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=500&q=80",
      colors: ["#eab308"],
    },
    {
      id: 823,
      name: "Classic Skate Deck",
      badge: "SAVE 25%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 2,999.00",
      originalPrice: "Rs. 3,999.00",
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=500&q=80",
      colors: ["#ffffff"],
    },
    {
      id: 824,
      name: "Minimalist Card Wallet",
      badge: "SAVE 40%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 599.00",
      originalPrice: "Rs. 999.00",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
      colors: ["#3f3f46"],
    },
    {
      id: 825,
      name: "Corduroy Dad Hat",
      badge: "SAVE 60%",
      badgeColor: "bg-[#d92626]",
      price: "Rs. 799.00",
      originalPrice: "Rs. 1,999.00",
      image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=500&q=80",
      colors: ["#b45309"],
    },
  ];

  const urbanEssentials = [
    {
      id: 851,
      name: "DENIM JACKET // 001",
      price: "RS.2,200.00",
      category: "CLOTHING",
      sizes: ["S", "M", "L", "XL", "2XL"],
      image: "/images/urban-essentials/denim_jacket.png",
    },
    {
      id: 852,
      name: "FANNY PACK // 001",
      price: "RS.1,900.00",
      category: "CROSSBODY BAGS",
      image: "/images/urban-essentials/fanny_pack.png",
    },
    {
      id: 853,
      name: "FULL SLEEVE SHIRT // BLACK",
      price: "RS.1,400.00",
      category: "CLOTHING",
      sizes: ["S", "M", "L", "XL", "2XL"],
      rating: 5,
      reviews: 5,
      image: "/images/urban-essentials/full_sleeve_shirt.png",
    },
    {
      id: 854,
      name: "RIPSTOP CARGO PANTS // BLACK",
      price: "RS.2,850.00",
      category: "CLOTHING",
      sizes: ["XS/S(26-28)", "M/L(30-32)", "XL/2XL(34-36)"],
      rating: 5,
      reviews: 3,
      image: "/images/urban-essentials/cargo_pants.png",
    },
    {
      id: 855,
      name: "BIFOLD WALLET // 001",
      price: "RS.1,300.00",
      category: "WALLETS",
      image: "/images/urban-essentials/bifold_wallet.png",
    },
    {
      id: 856,
      name: "COIN AND CARD HOLDER // 001",
      price: "RS.1,000.00",
      category: "WALLETS",
      image: "/images/urban-essentials/coin_card_holder.png",
    },
    {
      id: 857,
      name: "SHORT SLEEVE SHIRT // BLACK",
      price: "RS.1,200.00",
      category: "CLOTHING",
      sizes: ["S", "M", "L", "XL", "2XL"],
      rating: 5,
      reviews: 4,
      image: "/images/urban-essentials/short_sleeve_shirt.png",
    },
    {
      id: 858,
      name: "SLING BAG // 001",
      price: "RS.1,900.00",
      category: "CROSSBODY BAGS",
      image: "/images/urban-essentials/sling_bag.png",
    },
  ];

  const streetGallery = [
    { id: 1, title: "Tennis Court Drip", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Mountain Peak Utility", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Beach Bucket Style", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Starry Night Art Wallet", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="w-full space-y-16 py-12 select-none font-sans bg-white text-black">
      
      {/* ========================================================================= */}
      {/* SECTION 1: BEST SELLERS / NEW RELEASES / SALE TABBED SHOWCASE */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header Tabs */}
        <div className="flex justify-center items-center gap-8 border-b border-zinc-200 pb-3">
          {(["BEST SELLERS", "NEW RELEASES", "SALE"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm font-black tracking-widest font-mono uppercase cursor-pointer transition-all relative pb-2 border-none bg-transparent ${
                activeTab === tab ? "text-black" : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {tab === "SALE" ? "SALE ⚡" : tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {((activeTab === "BEST SELLERS" ? bestSellers : activeTab === "NEW RELEASES" ? newReleases : saleItems)).map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              brand="Supervek"
              name={item.name}
              price={item.price}
              image={item.image}
              badge={item.badge}
              isFavorite={wishlistState[item.id] || favorites.includes(item.id)}
              onFavoriteToggle={() => toggleFav(item)}
              onAddToCart={() => handleAddEssential(item)}
              variant="catalog"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => (window.location.href = "/shop")}
            className="bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl cursor-pointer shadow-md transition-all active:scale-95 border-none"
          >
            VIEW ALL {activeTab}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: SHOP CATEGORIES DARK GRID */}
      {/* ========================================================================= */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest font-mono text-white">
              SHOP CATEGORIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "SLING BAGS",
                img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
                href: "/shop?category=Sling+Bags",
              },
              {
                title: "CLOTHING",
                img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
                href: "/shop?category=Clothing",
              },
              {
                title: "WALLETS",
                img: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
                href: "/shop?category=Wallets",
              },
              {
                title: "ACCESSORIES",
                img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
                href: "/shop?category=Accessories",
              },
            ].map((cat, idx) => (
              <a
                key={idx}
                href={cat.href}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group border border-zinc-800 cursor-pointer block"
              >
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center p-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest drop-shadow-md text-center font-sans group-hover:text-[#facc15] transition-colors">
                    {cat.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: URBAN ESSENTIALS & FEATURED BEST SELLER SPOTLIGHT */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top: Urban Essentials */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-widest text-zinc-950 font-mono">
              URBAN ESSENTIALS
            </h2>

            {/* Sub Category Filters */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-zinc-500 pt-1">
              {(["ALL", "CROSSBODY BAGS", "CLOTHING", "WALLETS", "ACCESSORIES"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveEssentialTab(t)}
                  className={`pb-1 uppercase tracking-wider font-mono cursor-pointer border-none bg-transparent transition-colors ${
                    activeEssentialTab === t ? "text-black border-b-2 border-black font-extrabold" : "hover:text-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Essentials Cards - Exact 4 Columns Grid matching reference screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {urbanEssentials
              .filter((item) => activeEssentialTab === "ALL" || item.category === activeEssentialTab)
              .map((item) => {
                const isFav = favorites.includes(item.id) || !!wishlistState[item.id];
                const isAdded = addedState[item.id];

                return (
                  <a
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between p-3 cursor-pointer block no-underline text-black"
                  >
                    <div>
                      {/* Product Image Box with Heart Icon & Size Pills */}
                      <div className="relative aspect-square w-full bg-zinc-50 mb-2 overflow-hidden border border-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top-Right Heart Wishlist Trigger */}
                        <InteractiveHeartButton
                          isFavorite={!!isFav}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFav(item);
                          }}
                          className="absolute top-2 right-2 border border-zinc-200 shadow-2xs"
                          size="sm"
                        />

                        {/* Size pills overlay - Appears ON HOVER ONLY matching request */}
                        {item.sizes && (
                          <div className="absolute bottom-2 inset-x-2 flex items-center justify-center gap-1 flex-wrap bg-white/95 backdrop-blur-xs py-1.5 px-1.5 rounded border border-zinc-200 text-[9px] font-mono font-bold text-zinc-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-10 shadow-sm">
                            {item.sizes.map((s, idx) => {
                              const isSelected = selectedSizes[item.id] === s;
                              return (
                                <span
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedSizes((prev) => ({ ...prev, [item.id]: s }));
                                  }}
                                  className={`px-1.5 py-0.5 border rounded-2xs cursor-pointer transition-colors ${
                                    isSelected
                                      ? "bg-black text-white border-black"
                                      : "bg-zinc-50 text-zinc-800 border-zinc-300 hover:border-black hover:bg-zinc-100"
                                  }`}
                                >
                                  {s}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1 py-1 text-left">
                        <h4 className="text-xs font-mono font-bold text-zinc-900 tracking-tight uppercase line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-zinc-900">
                          {item.price}
                        </div>

                        {/* Rating Stars & Reviews */}
                        {item.reviews && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 pt-0.5">
                            <div className="flex text-black">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-black text-black" />
                              ))}
                            </div>
                            <span>{item.reviews} reviews</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <InteractiveAddToCartButton
                      onClick={() => {
                        handleAddEssential(item);
                      }}
                      buttonText={isAdded ? "ADDED TO CART" : "ADD TO CART"}
                      addedText="ADDED TO CART"
                      animationStyle="truck"
                      size="sm"
                      className="mt-3 font-mono text-[10px] py-2.5 rounded-none font-bold"
                    />
                  </a>
                );
              })}
          </div>
        </div>

        {/* Bottom: Featured Best Seller Spotlight Box */}
        <div className="bg-[#f8f8fa] border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 uppercase">
              FEATURED BEST SELLER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Product Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white shadow-md border border-zinc-200">
                <Image
                  src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
                  alt="Carbon Black Slinger"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Product Details & Buy Controls */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-emerald-600 font-sans">
                  CARBON BLACK SLINGER
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xl font-mono">
                  <span className="font-extrabold text-[#d92626]">Rs. 1,999.00</span>
                  <span className="text-zinc-400 line-through text-sm">Rs. 2,499.00</span>
                  <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded font-mono uppercase">
                    SAVE 20%
                  </span>
                </div>
              </div>

              {/* PayLater callout */}
              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 font-medium shadow-2xs">
                or Pay <strong className="text-black font-bold">Rs.666</strong> now &amp; rest later via <span className="bg-black text-[#facc15] text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase">SUPERVEK PAYLATER ⓘ</span>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 text-xs text-zinc-800 font-medium">
                <li className="flex items-center gap-2">
                  <span>🏕️</span> <span>All Terrain Adventure Gear</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🌊</span> <span>Water-Resistant YKK® Zipper &amp; Fabric</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🎒</span> <span>In-Built Organizer | 3x Expandable</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🎒</span> <span>Shoulder, Waist, or Cross-Body - You Decide</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🛡️</span> <span>Mfg. Warranty and Lifetime Easy Repairs</span>
                </li>
              </ul>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <InteractiveAddToCartButton
                  onClick={() =>
                    onAddToCart?.({
                      id: 802,
                      brand: "Supervek",
                      name: "Carbon Black Slinger",
                      price: "Rs. 1,999.00",
                      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
                    })
                  }
                  buttonText="ADD TO CART"
                  addedText="ADDED!"
                  animationStyle="truck"
                  size="lg"
                  className="w-full !bg-[#d92626] hover:!bg-red-700 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-md transition-all border-none"
                />

                <InteractiveBuyNowButton
                  onClick={() =>
                    onAddToCart?.({
                      id: 802,
                      brand: "Supervek",
                      name: "Carbon Black Slinger",
                      price: "Rs. 1,999.00",
                      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
                    })
                  }
                  buttonText="BUY IT NOW"
                  size="lg"
                  className="w-full font-black text-sm uppercase tracking-widest py-4 rounded-xl border-none cursor-pointer"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: WORD ON THE STREET & CAMPAIGN VIDEO BANNER */}
      {/* ========================================================================= */}
      <div className="bg-black text-white py-16 space-y-16">
        
        {/* Word On The Street Instagram Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest font-mono text-white">
              WORD ON THE STREET
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {streetGallery.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-zinc-800"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-mono text-white font-bold truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width Video Campaign Hero Banner */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] max-h-[500px] overflow-hidden bg-zinc-900 flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
            alt="Supervek Streetwear Campaign Banner"
            fill
            sizes="100vw"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

          <div className="relative z-10 text-center space-y-4 max-w-xl px-4">
            <span className="text-xs font-mono font-black text-[#facc15] tracking-widest uppercase bg-black/60 px-4 py-1.5 rounded-full border border-yellow-400">
              OFFICIAL STREET CAMPAIGN
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white font-sans drop-shadow-lg">
              SUPERVEK VIBES
            </h2>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="w-16 h-16 bg-[#facc15] hover:bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 border-none active:scale-95"
              aria-label="Play Campaign Video"
            >
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Campaign Video Modal Overlay */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full cursor-pointer transition-all border-none"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Loop video loop embed */}
              <iframe
                className="w-full h-full border-none"
                src="https://www.youtube.com/embed/9GzBszhJ014?autoplay=1&mute=0&controls=1&loop=1&playlist=9GzBszhJ014"
                title="Supervek Campaign Streetwear Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
