"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { RetroTechBanner } from "@/components/common/RetroTechBanner";
import { VendorOnboardingModal } from "@/components/features/VendorOnboardingModal";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  FileCheck, 
  Wallet, 
  ShoppingBag,
  Store
} from "lucide-react";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export default function SellerPage() {
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-cart");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-wishlist");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const sellerStories = [
    {
      id: 1,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      author: "Yash Gangwal",
      handle: "@yashgangwal",
      videoThumb: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp",
    },
    {
      id: 2,
      quote: "Selling on Driphunter expanded our streetwear brand reach across India by 300% in under 6 months. Highly recommend their vendor platform!",
      author: "Rohan Verma",
      handle: "@rohanstreetdrip",
      videoThumb: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp",
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-between selection:bg-[#facc15] selection:text-black font-sans select-none">
      {/* Header Navbar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
      />

      <main className="flex-grow w-full">
        
        {/* 1. HERO SECTION: Become an Driphunter Seller */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="md:col-span-6 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-950 font-sans leading-[1.08]">
                Become an Driphunter Seller
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 font-semibold max-w-lg leading-relaxed">
                Start your selling journey on Driphunter and become a part of seller community.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setVendorModalOpen(true)}
                  className="bg-[#facc15] hover:bg-yellow-400 text-black font-black text-sm uppercase tracking-wide px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer active:scale-95 border-none"
                >
                  Start Selling Today
                </button>
                <span className="block text-[10px] text-zinc-400 mt-2 font-mono uppercase tracking-wider">
                  *T&C Apply
                </span>
              </div>
            </div>

            {/* Right Hero Image (3D Anime character / Balaclava streetwear model) */}
            <div className="md:col-span-6 flex justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 group bg-zinc-100">
                <Image
                  src="https://img105.savana.com/b778ce7f97cc4b8dacb8fc6b3f5a2f2f.webp"
                  alt="Become a Driphunter Seller"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-mono text-[#facc15] font-extrabold uppercase tracking-widest block">
                      OFFICIAL VENDOR PARTNER
                    </span>
                    <span className="text-base font-bold uppercase tracking-tight block">
                      Join 500+ Verified Streetwear Brands
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. WHY SELLERS CHOOSE DRIPHUNTER? (6 Gradient Cards Grid) */}
        <section className="bg-zinc-50 py-16 border-y border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <h2 className="text-3xl sm:text-4xl font-black text-center uppercase tracking-tight text-zinc-950">
              Why sellers choose Driphunter?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Card 1: Red to Orange Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 bg-gradient-to-br from-red-500 via-orange-500 to-amber-400">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Card 2: Purple to Cyan Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 bg-gradient-to-br from-purple-600 via-indigo-500 to-cyan-400">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Card 3: Lime to Green Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-black shadow-lg space-y-4 bg-gradient-to-br from-[#d9f99d] via-lime-400 to-emerald-400">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Card 4: Orange to Yellow Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Card 5: Blue to Indigo Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-800">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Card 6: Teal to Dark Green Gradient */}
              <div className="rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900">
                <h3 className="text-xl font-black uppercase tracking-wider">Header</h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. HOW TO SELL ON DRIPHUNTER.COM (4 Steps Row) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl sm:text-4xl font-black text-center uppercase tracking-tight text-zinc-950">
            How to sell on Driphunter.com
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-16 h-16 bg-yellow-100 text-[#f05a28] rounded-2xl flex items-center justify-center mx-auto text-2xl font-black font-mono">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900">Step 1: Header</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black font-mono">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900">Step 2: Header</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black font-mono">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900">Step 3: Header</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black font-mono">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900">Step 4: Header</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>

          </div>
        </section>

        {/* 4. SELLER SUCCESS STORIES (Dark Gray Section) */}
        <section className="bg-[#4a4a4c] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black text-center text-[#facc15] uppercase tracking-tight">
              Seller Success Stories
            </h2>

            <div className="bg-[#3e3e40] border border-zinc-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Testimonial Quote */}
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-6xl text-cyan-400 font-serif leading-none block">“</span>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-200 font-medium">
                    {sellerStories[activeStoryIndex].quote}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-600/40">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#facc15] text-black font-bold flex items-center justify-center text-lg">
                        {sellerStories[activeStoryIndex].author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{sellerStories[activeStoryIndex].author}</h4>
                        <span className="text-xs font-mono text-zinc-400">{sellerStories[activeStoryIndex].handle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveStoryIndex((prev) => (prev === 0 ? sellerStories.length - 1 : prev - 1))}
                        className="w-9 h-9 rounded-lg bg-[#facc15] hover:bg-yellow-400 text-black flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        aria-label="Previous story"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[3]" />
                      </button>
                      <button
                        onClick={() => setActiveStoryIndex((prev) => (prev + 1) % sellerStories.length)}
                        className="w-9 h-9 rounded-lg bg-[#facc15] hover:bg-yellow-400 text-black flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        aria-label="Next story"
                      >
                        <ChevronRight className="w-5 h-5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Video Player Thumbnail */}
                <div className="lg:col-span-6 flex justify-end">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-zinc-500/40 group cursor-pointer">
                    <Image
                      src={sellerStories[activeStoryIndex].videoThumb}
                      alt="Seller Story Video"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-black/70 group-hover:bg-[#facc15] text-white group-hover:text-black rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. POPULAR CATEGORIES TO SELL ON DRIPHUNTER.COM (8 T-Shirt Outlines) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <h2 className="text-3xl sm:text-4xl font-black text-center uppercase tracking-tight text-zinc-950">
            Popular Categories to sell on Driphunter.com
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-24 h-28 relative flex items-center justify-center text-zinc-800 group-hover:scale-105 transition-transform">
                  {/* T-Shirt Vector Line Drawing Icon */}
                  <svg className="w-full h-full stroke-zinc-800 fill-none" strokeWidth="1.5" viewBox="0 0 100 100">
                    <path d="M30,20 L40,28 C45,30 55,30 60,28 L70,20 L90,32 L80,48 L72,44 L72,85 L28,85 L28,44 L20,48 L10,32 Z" />
                    <path d="M40,28 C45,34 55,34 60,28" strokeDasharray="3 3" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-zinc-700 uppercase tracking-wide group-hover:text-[#f05a28] transition-colors">
                  Product Categories
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DRIPHUNTER SUPPLIER SUPPORT (Available 24/7) */}
        <section className="bg-zinc-50 border-y border-zinc-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-6 space-y-2 text-left">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
                  Driphunter Supplier Support
                </h2>
                <span className="text-lg font-black text-[#f05a28] uppercase tracking-wider block">
                  Available 24/7
                </span>
              </div>

              <div className="md:col-span-6 space-y-4 text-left">
                <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-black text-[#facc15] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="text-zinc-500 font-bold block">You can reach out to</span>
                    <strong className="text-[#f05a28] font-extrabold text-sm tracking-wide">xyz@drip.in</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. BOTTOM BANNER: Become an Driphunter Seller */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="md:col-span-7 space-y-4 text-left">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  Become an Driphunter Seller
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-md leading-relaxed">
                  Start your selling journey on Driphunter and become a part of seller community.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setVendorModalOpen(true)}
                    className="bg-[#facc15] hover:bg-yellow-400 text-black font-black text-sm uppercase tracking-wide px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer active:scale-95 border-none"
                  >
                    Start Selling Today
                  </button>
                  <span className="block text-[10px] text-zinc-500 mt-2 font-mono uppercase">
                    *Conditions apply according to website rules
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="w-36 h-36 sm:w-44 sm:h-44 bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-400/30 p-4">
                  <Truck className="w-20 h-20 text-[#facc15]" />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Multi-step Vendor Registration Modal */}
      <VendorOnboardingModal
        isOpen={vendorModalOpen}
        onClose={() => setVendorModalOpen(false)}
      />

      {/* Social Banner & Footer */}
      <RetroTechBanner />
      <Footer />
    </div>
  );
}
