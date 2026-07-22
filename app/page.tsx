"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { CategorySelector } from "@/components/catalog/CategorySelector";
import { CategoryTabs } from "@/components/catalog/CategoryTabs";
import { HeroSection } from "@/components/features/HeroSection";
import { TShirtGridSection } from "@/components/catalog/TShirtGridSection";
import { NewArrivals } from "@/components/catalog/NewArrivals";
import { TemplatesShowcase } from "@/components/features/TemplatesShowcase";
import { BrandCollabTeasers } from "@/components/features/BrandCollabTeasers";
import { BrandShowcase } from "@/components/catalog/BrandShowcase";
import { FeaturedLookbook } from "@/components/features/FeaturedLookbook";
import { RecentlyViewed } from "@/components/catalog/RecentlyViewed";
import { MediaCollage } from "@/components/features/MediaCollage";
import { LiveEvents } from "@/components/features/LiveEvents";
import { TikTokReels } from "@/components/features/TikTokReels";
import { NoticeBoard } from "@/components/common/NoticeBoard";
import { RetroTechBanner } from "@/components/common/RetroTechBanner";
import { SupervekShowcase } from "@/components/features/SupervekShowcase";
import { UrbanPromoGrid } from "@/components/features/UrbanPromoGrid";
import { UrbanTrendingSection } from "@/components/catalog/UrbanTrendingSection";
import { UrbanBlogSection } from "@/components/features/UrbanBlogSection";
import { UrbanStreetStyleCreators } from "@/components/features/UrbanStreetStyleCreators";
import { UrbanSystemsHeroShowcase } from "@/components/features/UrbanSystemsHeroShowcase";
import { Footer } from "@/components/common/Footer";
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
        {/* Sub-Navbar (Categories Row) */}
        <div className="border-y border-zinc-200 bg-zinc-50/90 sticky top-20 z-30 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-6 text-xs font-bold font-mono overflow-x-auto no-scrollbar">
            <span className="text-zinc-400 uppercase tracking-widest font-black shrink-0">SHOP &gt;</span>
            {[
              { label: "OG", href: "/shop" },
              { label: "Bags", href: "/shop?category=Bags" },
              { label: "Headwear", href: "/shop?category=Headwear" },
              { label: "Clothing", href: "/shop?category=Clothing" },
              { label: "Wallets", href: "/shop?category=Wallets" },
              { label: "Accessories", href: "/shop?category=Accessories" },
              { label: "Blog", href: "/blog" },
              { label: "SALE ⚡", href: "/shop?sale=true" },
            ].map((nav) => (
              <a
                key={nav.label}
                href={nav.href}
                className={`uppercase tracking-wider cursor-pointer transition-colors shrink-0 text-[#15803d] hover:text-[#0b4d26] ${
                  nav.label.includes("SALE") ? "text-amber-600 font-extrabold" : ""
                }`}
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>

        {/* Horizontal Category Slider */}
        <CategorySelector 
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={(categoryName) => {
            if (categoryName) {
              window.location.href = `/shop?category=${encodeURIComponent(categoryName)}`;
            }
          }}
        />

        {/* Category Filter Tabs */}
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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

        {/* Urban Systems Hero Showcase (From Reference Screenshot) */}
        <UrbanSystemsHeroShowcase 
          onShopCollection={() => {
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

        {/* Urban Essentials & Streetwear Showcase (From Reference Images) */}
        <SupervekShowcase 
          onAddToCart={handleAddToCart} 
          favorites={wishlist.map((item) => item.id)}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Urban Promo Banners Grid */}
        <UrbanPromoGrid />

        {/* Urban Trending Products Section */}
        <UrbanTrendingSection 
          onAddToCart={handleAddToCart} 
          favorites={wishlist.map((item) => item.id)}
          onToggleFavorite={handleToggleFavorite}
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

        {/* Urban Streetwear Blog Section */}
        <UrbanBlogSection />

        {/* Urban Redefining Street Style Creators Section */}
        <UrbanStreetStyleCreators onAddToCart={handleAddToCart} />

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

