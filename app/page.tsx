"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { CategorySelector } from "@/components/CategorySelector";
import { CategoryTabs } from "@/components/CategoryTabs";
import { HeroSection } from "@/components/HeroSection";
import { TShirtGridSection } from "@/components/TShirtGridSection";
import { NewArrivals } from "@/components/NewArrivals";
import { TemplatesShowcase } from "@/components/TemplatesShowcase";
import { BrandCollabTeasers } from "@/components/BrandCollabTeasers";
import { BrandShowcase } from "@/components/BrandShowcase";
import { FeaturedLookbook } from "@/components/FeaturedLookbook";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { MediaCollage } from "@/components/MediaCollage";
import { LiveEvents } from "@/components/LiveEvents";
import { TikTokReels } from "@/components/TikTokReels";
import { NoticeBoard } from "@/components/NoticeBoard";
import { RetroTechBanner } from "@/components/RetroTechBanner";
import { Footer } from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Smooth scroll to product grid when a category is selected
  useEffect(() => {
    if (selectedSubCategory) {
      const element = document.getElementById("tshirt-grid");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubCategory]);

  // Sync state with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", JSON.stringify(cart));
    }
  }, [cart]);

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
        {/* Horizontal Category Slider */}
        <CategorySelector 
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={setSelectedSubCategory}
        />

        {/* Category Filter Tabs */}
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hero Slider & Banner */}
        <HeroSection 
          onShopTheLook={(categoryName) => {
            setSelectedSubCategory(categoryName);
          }}
          onExploreCollections={() => {
            const element = document.getElementById("tshirt-grid");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />

        {/* Dynamic T-Shirt Grid Section from Figma */}
        <TShirtGridSection 
          onAddToCart={handleAddToCart}
          selectedSubCategory={selectedSubCategory}
          onClearSubCategory={() => setSelectedSubCategory(null)}
          searchQuery={searchQuery}
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

        {/* Squarespace Style Templates Showcase */}
        <TemplatesShowcase />

        {/* Brand Collabs & Teasers Grid */}
        <BrandCollabTeasers />

        {/* Custom lookbook street vibes */}
        <FeaturedLookbook 
          onSelectCategory={(categoryName) => {
            setSelectedSubCategory(categoryName);
          }}
        />

        {/* User history recently viewed */}
        <RecentlyViewed
          onAddToCart={handleAddToCart}
          favorites={wishlist.map((item) => item.id)}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Facebook ads collage showcase */}
        <MediaCollage />

        {/* Live Events Section */}
        <LiveEvents />

        {/* TikTok / Reels scrolling video list */}
        <TikTokReels />

        {/* Corkboard sticky notice board */}
        <NoticeBoard />

        {/* Cyber retro TV and social highlights */}
        <RetroTechBanner />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}

