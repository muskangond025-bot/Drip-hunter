"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/common/Navbar";
import { CategorySelector } from "@/components/catalog/CategorySelector";
import { HeroSection } from "@/components/features/HeroSection";
import { NewArrivals } from "@/components/catalog/NewArrivals";
import { TemplatesShowcase } from "@/components/features/TemplatesShowcase";
import { BrandCollabTeasers } from "@/components/features/BrandCollabTeasers";
import { RecentlyViewed } from "@/components/catalog/RecentlyViewed";
import { LiveEvents } from "@/components/features/LiveEvents";
import { Footer } from "@/components/common/Footer";

export interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export interface ProductItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("All Products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);



  // 1. Initial mount effect: scroll to top, set scrollRestoration manual, and load local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const forceTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      };

      forceTop();
      window.addEventListener("popstate", forceTop);

      // Restore cart & wishlist from localStorage
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }

      return () => {
        window.removeEventListener("popstate", forceTop);
      };
    }
  }, []);

  // 2. Sync cart changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", JSON.stringify(cart));
    }
  }, [cart]);

  // 3. Sync wishlist changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleToggleFavorite = (product: ProductItem) => {
    setWishlist((prevWishlist) => {
      const isFav = prevWishlist.some((item) => item.id === product.id);
      if (isFav) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, { id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image }];
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation Header */}
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

      <main className="flex-grow">
        {/* Secondary Sub-Navbar (Home, About Us, Explore) */}
        <div className="border-b border-zinc-200 bg-white select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-center gap-8 text-xs font-bold font-mono tracking-widest uppercase">
            <a href="/" className="hover:text-orange-500 transition-colors text-zinc-700 font-extrabold">
              Home
            </a>
            <span className="text-zinc-300 select-none">•</span>
            <a href="/about" className="hover:text-orange-500 transition-colors text-zinc-700 font-extrabold">
              About Us
            </a>
            <span className="text-zinc-300 select-none">•</span>
            <a href="/explore" className="hover:text-orange-500 transition-colors text-zinc-700 font-extrabold">
              Explore
            </a>
          </div>
        </div>

        {/* Hero Sneaker 3D Canvas Showcase */}
        <HeroSection 
          onShopTheLook={(categoryName) => {
            if (categoryName === "Graphic Tees") {
              window.location.href = `/shop?category=Top%20Wear&search=Tee`;
            } else if (categoryName === "Tactical Vests") {
              window.location.href = `/shop?category=Outerwear&search=Vest`;
            } else if (categoryName === "Utility Caps") {
              window.location.href = `/shop?category=Caps&search=Cap`;
            } else {
              window.location.href = `/shop`;
            }
          }}
          onExploreCollections={() => {
            window.location.href = `/explore`;
          }}
        />

        {/* Horizontal Category Slider (Moved below Hero Banner) */}
        <CategorySelector 
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={(categoryName) => {
            if (categoryName) {
              window.location.href = `/shop?category=${encodeURIComponent(categoryName)}`;
            }
          }}
        />

        {/* New Arrivals Product Showcase */}
        <NewArrivals
          activeTab={activeTab}
          onAddToCart={handleAddToCart}
          favorites={wishlist.map((item) => item.id)}
          onToggleFavorite={handleToggleFavorite}
          searchQuery={searchQuery}
          searchCategory={searchCategory}
          selectedSubCategory={selectedSubCategory}
        />


        {/* Deal of the Day/Week Section */}
        <TemplatesShowcase />

        {/* Brand Collabs & Teasers Grid (renders Product Lines carousel & Brand Teasers grid) */}
        <BrandCollabTeasers onAddToCart={handleAddToCart} />

        {/* User history recently viewed */}
        <RecentlyViewed
          onAddToCart={handleAddToCart}
          favorites={wishlist.map((item) => item.id)}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Live Events Section */}
        <LiveEvents />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}

