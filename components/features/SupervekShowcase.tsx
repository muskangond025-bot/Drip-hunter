"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ShoppingBag, ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";

interface SupervekShowcaseProps {
  onAddToCart?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
}

export function SupervekShowcase({ onAddToCart }: SupervekShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"BEST SELLERS" | "NEW RELEASES" | "SALE">("BEST SELLERS");
  const [activeEssentialTab, setActiveEssentialTab] = useState<"CROSSBODY BAGS" | "CLOTHING" | "HEADWEAR" | "WALLETS" | "ACCESSORIES">("CROSSBODY BAGS");
  const [selectedColor, setSelectedColor] = useState<Record<number, string>>({});

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

  const urbanEssentials = [
    {
      id: 810,
      name: "Sling Bag Mini",
      badge: "SAVE 10%",
      price: "Rs. 899.00",
      originalPrice: "Rs. 999.00",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 811,
      name: "Tactical Sling Bag",
      badge: "SAVE 28%",
      price: "Rs. 999.00",
      originalPrice: "Rs. 1,395.00",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 812,
      name: "Messenger Sling Bag",
      badge: "SAVE 15%",
      price: "Rs. 1,699.00",
      originalPrice: "Rs. 1,999.00",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 813,
      name: "Classic Strap Bags",
      badge: "SAVE 40%",
      price: "Rs. 1,199.00",
      originalPrice: "Rs. 1,999.00",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
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
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between bg-[#f8f8f9] rounded-2xl p-3 border border-zinc-100 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Image & Discount Badge */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className={`absolute top-2 left-2 text-[9px] font-black uppercase text-white px-2 py-0.5 rounded ${item.badgeColor} tracking-wider font-mono`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title & Prices */}
                <div className="space-y-1 text-center">
                  <h3 className="text-xs font-bold text-zinc-900 group-hover:text-[#f05a28] transition-colors truncate">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-xs font-mono">
                    <span className="font-extrabold text-[#d92626]">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-zinc-400 line-through text-[11px]">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Color Swatches */}
                  {item.colors && (
                    <div className="flex items-center justify-center gap-1 pt-1.5">
                      {item.colors.map((c, i) => (
                        <span
                          key={i}
                          style={{ backgroundColor: c }}
                          className="w-2.5 h-2.5 rounded-full border border-zinc-300 inline-block shadow-2xs cursor-pointer hover:scale-125 transition-transform"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart Trigger */}
              <button
                onClick={() =>
                  onAddToCart?.({
                    id: item.id,
                    brand: "Supervek",
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  })
                }
                className="mt-4 w-full bg-zinc-950 hover:bg-black text-[#facc15] font-black text-[10px] uppercase tracking-wider py-2.5 rounded-xl cursor-pointer transition-colors border-none"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => (window.location.href = "/shop")}
            className="bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl cursor-pointer shadow-md transition-all active:scale-95 border-none"
          >
            VIEW ALL BEST SELLERS
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

            {/* Sub Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-zinc-500 pt-1">
              {(["CROSSBODY BAGS", "CLOTHING", "HEADWEAR", "WALLETS", "ACCESSORIES"] as const).map((t) => (
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

          {/* Essentials Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {urbanEssentials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 mb-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-black text-white bg-red-600 px-2 py-0.5 rounded font-mono">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-zinc-900 group-hover:text-orange-500 transition-colors truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono mt-1">
                    <span className="font-extrabold text-[#d92626]">{item.price}</span>
                    <span className="text-zinc-400 line-through text-[11px]">{item.originalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onAddToCart?.({
                      id: item.id,
                      brand: "Supervek",
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="mt-4 w-full bg-zinc-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-xl cursor-pointer transition-colors border-none"
                >
                  Add To Cart
                </button>
              </div>
            ))}
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
                <button
                  onClick={() =>
                    onAddToCart?.({
                      id: 802,
                      brand: "Supervek",
                      name: "Carbon Black Slinger",
                      price: "Rs. 1,999.00",
                      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
                    })
                  }
                  className="w-full bg-[#d92626] hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border-none"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border-none"
                >
                  BUY IT NOW
                </button>
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
              onClick={() => alert("Playing Supervek Official Campaign Video...")}
              className="w-16 h-16 bg-[#facc15] hover:bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 border-none active:scale-95"
              aria-label="Play Campaign Video"
            >
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
