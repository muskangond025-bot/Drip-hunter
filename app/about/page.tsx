"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Play, ChevronLeft, ChevronRight, Mail, Eye, Heart, ArrowLeft, MessageCircle, Send, Bookmark, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface ProductItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

const TShirtIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M25,25 L35,18 C38,20 42,21 46,20 C50,21 54,20 57,18 L67,25 L75,37 L66,41 L66,82 L26,82 L26,41 L17,37 Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const spotlightProducts = [
  {
    id: 1,
    title: "White Classic Oversized Tee",
    collection: "Slay the Streets Custom Collection",
    price: "₹1,499",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
    similars: [
      { name: "Raw Box Tee", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80", price: "₹999" },
      { name: "Signature Fit", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=150&q=80", price: "₹1,199" }
    ]
  },
  {
    id: 2,
    title: "Distressed Denim Pants",
    collection: "Slay the Streets Denim Collection",
    price: "₹2,199",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
    similars: [
      { name: "Tactical Cargo Lower", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80", price: "₹1,899" },
      { name: "Mesh Athletic Shorts", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80", price: "₹799" }
    ]
  },
  {
    id: 3,
    title: "Tactical Cargo Lower",
    collection: "Slay the Streets Cargo Collection",
    price: "₹1,899",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
    similars: [
      { name: "Distressed Denim Pants", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&q=80", price: "₹2,199" },
      { name: "Oversized Flannel Shirt", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=150&q=80", price: "₹1,299" }
    ]
  }
];

export default function About() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  // Blog filter category state
  const [activeBlogFilter, setActiveBlogFilter] = useState("All");

  // DripSpot, DripVision & Instagram interaction states
  const [dripSpotView, setDripSpotView] = useState<"A" | "B" | "C">("A");
  const [selectedVariantImage, setSelectedVariantImage] = useState<string>("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80");
  const [dripVisionLayout, setDripVisionLayout] = useState<"row" | "stack">("row");
  const [activeDripVisionIndex, setActiveDripVisionIndex] = useState<number>(0);
  const [isDripVisionPlaying, setIsDripVisionPlaying] = useState<boolean>(false);
  const [instaOffset, setInstaOffset] = useState(0);
  const [activeSpotlightId, setActiveSpotlightId] = useState<number>(1);

  // Stories state & refs
  const storiesRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyLiked, setStoryLiked] = useState<boolean>(false);

  const storiesData = [
    { name: "Stussy", img: "/images/blog_skater.png", storyImg: "/images/phone_story_girl.png", time: "2h ago", tag: "@stussy" },
    { name: "Burberry", img: "/images/blog_sub_1.png", storyImg: "/images/blog_sub_1.png", time: "4h ago", tag: "@burberry" },
    { name: "BrainDead", img: "/images/blog_sub_2.png", storyImg: "/images/blog_sub_2.png", time: "5h ago", tag: "@braindead" },
    { name: "AlmostGods", img: "/images/blog_sub_3.png", storyImg: "/images/blog_sub_3.png", time: "7h ago", tag: "@almostgods" },
    { name: "Supreme", img: "/images/blog_ghost.png", storyImg: "/images/blog_ghost.png", time: "9h ago", tag: "@supreme" },
    { name: "OffWhite", img: "/images/blog_boombox.png", storyImg: "/images/blog_boombox.png", time: "12h ago", tag: "@offwhite" },
    { name: "Palace", img: "/images/blog_hero.png", storyImg: "/images/blog_hero.png", time: "14h ago", tag: "@palaceskateboards" },
    { name: "Acronym", img: "/images/blog_skater.png", storyImg: "/images/blog_skater.png", time: "18h ago", tag: "@acronym" }
  ];

  const [likedPosts, setLikedPosts] = useState<boolean[]>(Array(6).fill(false));
  const [bookmarkedPosts, setBookmarkedPosts] = useState<boolean[]>(Array(6).fill(false));

  const toggleLike = (idx: number) => {
    setLikedPosts(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const toggleBookmark = (idx: number) => {
    setBookmarkedPosts(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

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


        <div className="flex justify-center items-center gap-2.5 py-6 bg-zinc-50 border-b border-zinc-200 sticky top-20 z-40 select-none">
          {[
            { label: "Terms & Conditions", id: "terms-section" },
            { label: "Blogs", id: "blogs-section" },
            { label: "Stories", id: "stories-section" },
            { label: "DripSpot", id: "dripspot-section" },
            { label: "DripVision", id: "dripvision-section" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 rounded-full border border-zinc-200 text-[10px] font-black uppercase tracking-widest bg-white hover:bg-zinc-100 hover:text-[#f05a28] cursor-pointer transition-all active:scale-95"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: Blogs */}
        <section id="blogs-section" className="mb-20 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">
            Blogs
          </h2>

          {/* Subcategory & Sort by Default Row */}
          <div className="relative flex items-center justify-center border-b border-zinc-150 pb-6 mb-10 select-none">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {["All", "Trends", "How To", "Celebs", "Opinion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveBlogFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                    activeBlogFilter === cat
                      ? "bg-[#f05a28] border-[#f05a28] text-white shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-650 hover:border-zinc-350"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="absolute right-0 flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest hidden sm:inline">Sort by:</span>
              <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-black text-zinc-800 outline-none focus:border-zinc-400 cursor-pointer">
                <option>Default</option>
                <option>Newest</option>
                <option>Most Read</option>
              </select>
            </div>
          </div>

          {/* Hero Blog Section: Overlapping Stack of 3 Thumbnails on the Right of Large Image */}
          <div className="space-y-6 text-left mb-16 select-none">
            <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] lg:aspect-[2.6/1] max-h-[380px] sm:max-h-[420px] lg:max-h-[440px] flex items-stretch">
              
              {/* Large Image Card (Left side, takes 89% width) */}
              <div className="w-[89%] sm:w-[90%] relative h-full rounded-[28px] sm:rounded-[32px] overflow-hidden border border-zinc-200 shadow-sm group">
                <Image
                  src="/images/blog_hero.png"
                  alt="Today Feature Blog"
                  fill
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Stack of 3 overlapping thumbnails on the right with distinct gaps */}
              <div className="absolute right-0 top-0 bottom-0 w-[15%] sm:w-[14%] lg:w-[13%] flex flex-col justify-between py-2 sm:py-3 z-20">
                {[
                  "/images/blog_ghost.png",
                  "/images/blog_boombox.png",
                  "/images/blog_skater.png"
                ].map((img, idx) => (
                  <div 
                    key={idx}
                    className="relative w-full max-h-[30%] aspect-square rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden border-[3px] sm:border-4 border-white shadow-xl hover:scale-105 transition-transform hover:z-30 cursor-pointer"
                  >
                    <Image 
                      src={img} 
                      alt={`Thumbnail stack ${idx + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* Hero text description under images */}
            <div className="max-w-5xl space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-[10px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                <span>Category</span>
                <span>&bull;</span>
                <span>Date of upload</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-955 uppercase tracking-tight font-sans leading-none">
                Title
              </h3>

              <p className="text-zinc-550 text-xs sm:text-sm leading-relaxed max-w-4xl pt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <button className="flex items-center gap-1.5 text-xs font-black text-zinc-800 hover:text-[#f05a28] transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans">
                <span>Read more</span>
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Secondary Cards Row using exact illustration cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 select-none">
            {[
              { 
                category: "Category", 
                date: "Date of Upload", 
                title: "Title", 
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", 
                img: "/images/blog_sub_1.png" // Blue sculpture head
              },
              { 
                category: "Category", 
                date: "Date of Upload", 
                title: "Title", 
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", 
                img: "/images/blog_sub_2.png" // Yellow runner
              },
              { 
                category: "Category", 
                date: "Date of Upload", 
                title: "Title", 
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", 
                img: "/images/blog_sub_3.png" // Cartoon illustration
              }
            ].map((card, idx) => (
              <div key={idx} className="space-y-4">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group cursor-pointer">
                  <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                    <span>{card.category}</span>
                    <span>&bull;</span>
                    <span>{card.date}</span>
                  </div>

                  <h4 className="text-xl font-black text-zinc-955 uppercase tracking-tight">
                    {card.title}
                  </h4>

                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                    {card.desc}
                  </p>

                  <button className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer">
                    <span>Read more</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1.5 pt-8 border-t border-zinc-100">
            <button className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 border-none cursor-pointer flex items-center justify-center transition-colors">
              <ChevronLeft className="w-3.5 h-3.5 text-zinc-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs border-none cursor-pointer flex items-center justify-center shadow-xs">
              1
            </button>
            {[2, 3, 4, 5].map((page) => (
              <button key={page} className="w-8 h-8 rounded-full bg-transparent hover:bg-zinc-50 text-zinc-600 font-black text-xs border-none cursor-pointer flex items-center justify-center transition-colors">
                {page}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 border-none cursor-pointer flex items-center justify-center transition-colors">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            </button>
          </div>
        </section>

        {/* SECTION 2: Stories */}
        <section id="stories-section" className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-24">
          <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">
            Stories
          </h2>

          <div className="relative max-w-4xl mx-auto flex items-center">
            {/* Scroll Left Button */}
            <button 
              onClick={() => storiesRef.current?.scrollBy({ left: -260, behavior: "smooth" })}
              className="absolute left-[-15px] z-10 p-2.5 bg-white border border-zinc-250 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Previous Stories"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-700" />
            </button>

            {/* Stories Horizontal Scroll Container */}
            <div ref={storiesRef} className="flex gap-6 overflow-x-auto py-4 px-2 w-full justify-start sm:justify-between scrollbar-hide scroll-smooth">
              {storiesData.map((story, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    setActiveStoryIndex(activeStoryIndex === i ? null : i);
                    setStoryLiked(false);
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
                >
                  <div className={`relative w-16 h-16 rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-12 shadow-sm ${
                    activeStoryIndex === i 
                      ? "bg-gradient-to-tr from-orange-600 via-rose-600 to-yellow-400 ring-2 ring-orange-500 ring-offset-2 scale-105" 
                      : "bg-gradient-to-tr from-yellow-500 via-orange-500 to-rose-500"
                  }`}>
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src={story.img} alt={story.name} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider font-mono ${
                    activeStoryIndex === i ? "text-orange-600" : "text-zinc-700"
                  }`}>
                    {story.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button 
              onClick={() => storiesRef.current?.scrollBy({ left: 260, behavior: "smooth" })}
              className="absolute right-[-15px] z-10 p-2.5 bg-white border border-zinc-250 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
              aria-label="Next Stories"
            >
              <ChevronRight className="w-4 h-4 text-zinc-700" />
            </button>
          </div>

          {/* Inline Story Viewer Widget (Opens directly below story circle icons when clicked) */}
          <AnimatePresence>
            {activeStoryIndex !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative max-w-4xl mx-auto flex items-center justify-center pt-8 mt-6 overflow-hidden select-none"
              >
                {/* Close Button on top-right of the inline viewer */}
                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="absolute top-2 right-2 sm:right-6 w-9 h-9 rounded-full bg-zinc-900 hover:bg-black text-white flex items-center justify-center cursor-pointer border border-zinc-700 shadow-lg z-50 transition-transform hover:scale-110"
                  title="Close Story Viewer"
                >
                  <X className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                </button>

                <div className="relative flex items-center justify-center w-full py-4">
                  {/* Left Story Preview */}
                  <div className="hidden md:block w-40 h-[280px] rounded-[20px] overflow-hidden opacity-30 blur-[0.5px] mr-4 border border-zinc-250 flex-shrink-0 select-none shadow-sm relative">
                    <Image 
                      src={storiesData[(activeStoryIndex - 1 + storiesData.length) % storiesData.length].storyImg} 
                      alt="Previous Story" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-2">
                      <span className="text-white text-xs font-black uppercase tracking-widest font-mono">
                        {storiesData[(activeStoryIndex - 1 + storiesData.length) % storiesData.length].name}
                      </span>
                    </div>
                  </div>

                  {/* Left Arrow Button */}
                  <button 
                    onClick={() => {
                      setActiveStoryIndex((prev) => (prev! - 1 + storiesData.length) % storiesData.length);
                      setStoryLiked(false);
                    }}
                    className="z-35 w-7 h-7 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md flex items-center justify-center cursor-pointer border border-zinc-700 shadow-md transition-colors mx-3 flex-shrink-0 hover:scale-105"
                    title="Previous Story"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>

                  {/* Main Phone Story Container */}
                  <div 
                    style={{
                      width: '300px',
                      minWidth: '300px',
                      height: '533px',
                      minHeight: '533px',
                      flexShrink: 0,
                      borderRadius: '40px',
                      overflow: 'hidden',
                      border: '12px solid #09090b',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      backgroundColor: '#000000',
                      position: 'relative'
                    }}
                  >
                    {/* Phone Notch */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-950 rounded-full z-30 flex items-center justify-center">
                      <div className="w-10 h-1 bg-zinc-800 rounded-full mr-2" />
                      <div className="w-2 h-2 bg-zinc-900 rounded-full" />
                    </div>

                    {/* Home Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/80 rounded-full z-30 pointer-events-none" />

                    {/* Story Image */}
                    <Image 
                      src={storiesData[activeStoryIndex].storyImg} 
                      alt={storiesData[activeStoryIndex].name} 
                      fill 
                      className="object-cover" 
                      priority
                    />
                    
                    {/* Story UI Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 p-4 pt-8 flex flex-col justify-between z-10 text-left">
                      <div>
                        {/* Progress bars (Instagram style) */}
                        <div className="flex gap-1 mb-3">
                          {[0, 1, 2, 3].map((barIdx) => (
                            <div key={barIdx} className="h-0.5 bg-white/30 rounded-full flex-grow overflow-hidden">
                              <div className={`h-full bg-white/90 rounded-full ${barIdx === 0 ? "w-[75%]" : "w-0"}`} />
                            </div>
                          ))}
                        </div>

                        {/* Story Header */}
                        <div className="flex justify-between items-center px-1">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-orange-500 overflow-hidden relative">
                              <Image 
                                src={storiesData[activeStoryIndex].img} 
                                alt={storiesData[activeStoryIndex].name} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                            <div>
                              <span className="text-white text-[10px] font-black uppercase tracking-wider font-mono block leading-none">
                                {storiesData[activeStoryIndex].name}
                              </span>
                              <span className="text-white/60 text-[8px] font-bold block mt-0.5">{storiesData[activeStoryIndex].time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Countdown Card Widget */}
                        <div className="bg-gradient-to-tr from-[#c82af4] to-[#12a0ff] rounded-[18px] p-3 w-[88%] mx-auto shadow-lg mt-10 text-center text-white relative select-none">
                          {/* Top row */}
                          <div className="flex justify-between items-center mb-1.5 px-0.5">
                            <span className="text-[7px] font-black uppercase tracking-wider font-sans">COUNTDOWN NAME</span>
                            <div className="w-3 h-3 rounded-full border border-white/60 flex items-center justify-center text-[7px] font-bold font-sans">i</div>
                          </div>
                          {/* Timer grid */}
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">01</div>
                              <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">hours</span>
                            </div>
                            <span className="text-white font-black text-base mb-3 leading-none">:</span>
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">23</div>
                              <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">minutes</span>
                            </div>
                            <span className="text-white font-black text-base mb-3 leading-none">:</span>
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">45</div>
                              <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">seconds</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Footer */}
                      <div className="flex flex-col items-center gap-2 mb-4 w-full text-center relative">
                        <a 
                          href="/shop"
                          className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-transform no-underline inline-block text-center w-max mx-auto font-sans"
                        >
                          Shop Now
                        </a>
                        <div 
                          onClick={() => setStoryLiked(!storyLiked)}
                          className="absolute right-1 bottom-1 text-white hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Send className="w-4 h-4 text-white fill-none stroke-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Arrow Button */}
                  <button 
                    onClick={() => {
                      setActiveStoryIndex((prev) => (prev! + 1) % storiesData.length);
                      setStoryLiked(false);
                    }}
                    className="z-35 w-7 h-7 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md flex items-center justify-center cursor-pointer border border-zinc-700 shadow-md transition-colors mx-3 flex-shrink-0 hover:scale-105"
                    title="Next Story"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  {/* Right Story Preview */}
                  <div className="hidden md:block w-40 h-[280px] rounded-[20px] overflow-hidden opacity-30 blur-[0.5px] ml-4 border border-zinc-700 flex-shrink-0 select-none shadow-sm relative">
                    <Image 
                      src={storiesData[(activeStoryIndex + 1) % storiesData.length].storyImg} 
                      alt="Next Story" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-2">
                      <span className="text-white text-xs font-black uppercase tracking-widest font-mono">
                        {storiesData[(activeStoryIndex + 1) % storiesData.length].name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SECTION 3: DripSpot */}
        <section id="dripspot-section" className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-24">
          <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">
            DripSpot
          </h2>

          <AnimatePresence mode="wait">
            {dripSpotView === "A" && (
              <motion.div
                key="state-a"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm max-w-5xl mx-auto">
                  <div className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[350px]">
                    <div className="relative w-full flex-grow">
                      <Image 
                        src="/images/dripspot_spotlight_orange.png" 
                        alt="Spotlight outfit walker" 
                        fill 
                        className="object-contain" 
                        priority 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-2">
                    <div className="text-left pb-2 flex items-center gap-1 text-[10px] font-black uppercase text-zinc-400 tracking-wider font-mono">
                      <span>Date of upload</span>
                      <span className="text-zinc-300">•</span>
                      <span>Name of the celebrity</span>
                    </div>

                    <div className="flex flex-col divide-y divide-zinc-100 flex-grow">
                      {spotlightProducts.map((item) => (
                        <div 
                          key={item.id} 
                          onClick={() => {
                            setActiveSpotlightId(item.id);
                            setDripSpotView("B");
                          }}
                          className="flex justify-between items-center py-4 cursor-pointer hover:bg-zinc-50/50 px-2 rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white border border-zinc-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                              <TShirtIcon />
                            </div>
                            <div className="text-left">
                              <h4 className="text-sm font-black text-zinc-955 uppercase tracking-tight">{item.title}</h4>
                              <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{item.collection}</p>
                              <span className="text-xs font-black text-zinc-955 font-mono mt-0.5 block">{item.price}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                        </div>
                      ))}
                    </div>

                    <div>
                      <button 
                        onClick={() => setDripSpotView("C")}
                        className="text-xs font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest transition-colors cursor-pointer border-none bg-transparent"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-w-5xl mx-auto space-y-6 pt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      "/images/dripspot_sim_1.png",
                      "/images/dripspot_sim_2.png",
                      "/images/dripspot_sim_3.png",
                      "/images/dripspot_sim_4.png"
                    ].map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setDripSpotView("C")}
                        className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] overflow-hidden aspect-square relative group cursor-pointer shadow-xs hover:shadow-md transition-shadow hover:scale-[1.01]"
                      >
                        <Image 
                          src={img} 
                          alt={`Explore Outfit ${idx + 1}`} 
                          fill 
                          className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center gap-1.5 pt-2">
                    <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronLeft className="w-3 h-3 text-zinc-500" /></button>
                    <button className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[10px] border-none cursor-pointer flex items-center justify-center shadow-xs">1</button>
                    {[2, 3, 4, 5].map((page) => (
                      <button key={page} className="w-6 h-6 rounded-full bg-transparent hover:bg-zinc-100 text-zinc-650 font-black text-[10px] border-none cursor-pointer flex items-center justify-center">{page}</button>
                    ))}
                    <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronRight className="w-3 h-3 text-zinc-500" /></button>
                  </div>
                </div>

                <div className="max-w-5xl mx-auto space-y-6 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-purple-700 to-indigo-600 border-purple-800" },
                      { img: "/images/dripspot_cel_2.png", bg: "bg-gradient-to-tr from-blue-600 to-sky-500 border-blue-700" },
                      { img: "/images/dripspot_sim_4.png", bg: "bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-700" },
                      { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-rose-600 to-pink-500 border-rose-700" }
                    ].map((cel, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div 
                          onClick={() => setDripSpotView("C")}
                          className={`w-full aspect-[4/5] rounded-[24px] overflow-hidden relative border shadow-sm group cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.01] ${cel.bg}`}
                        >
                          <Image 
                            src={cel.img} 
                            alt={`Celebrity Model ${idx + 1}`} 
                            fill 
                            className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                          />
                        </div>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider font-mono">
                          Name of the celebrity
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center gap-1.5 pt-2">
                    <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronLeft className="w-3 h-3 text-zinc-500" /></button>
                    <button className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[10px] border-none cursor-pointer flex items-center justify-center shadow-xs">1</button>
                    {[2, 3, 4, 5].map((page) => (
                      <button key={page} className="w-6 h-6 rounded-full bg-transparent hover:bg-zinc-100 text-zinc-650 font-black text-[10px] border-none cursor-pointer flex items-center justify-center">{page}</button>
                    ))}
                    <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronRight className="w-3 h-3 text-zinc-550" /></button>
                  </div>
                </div>
              </motion.div>
            )}

            {dripSpotView === "B" && (() => {
              const activeProd = spotlightProducts.find(p => p.id === activeSpotlightId) || spotlightProducts[0];
              return (
                <motion.div
                  key="state-b"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-5xl mx-auto"
                >
                  <div className="text-left">
                    <button 
                      onClick={() => setDripSpotView("A")}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-950 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-sans"
                    >
                      <ArrowLeft className="w-4 h-4 text-zinc-955" />
                      <span>Back to Catalog</span>
                    </button>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                      <div className="bg-zinc-50 rounded-2xl p-6 aspect-[1.1] flex items-center justify-center border border-zinc-100 relative group overflow-hidden">
                        <Image
                          src={activeProd.img}
                          alt={activeProd.title}
                          fill
                          className="object-contain p-6 group-hover:scale-103 transition-transform duration-350"
                        />
                      </div>

                      <div className="text-left space-y-5">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Featured Spotlight</span>
                            <button className="flex items-center gap-1 text-xs text-rose-500 font-bold font-mono border-none bg-transparent cursor-pointer">
                              <Heart className="w-4 h-4 fill-rose-500" />
                              <span>100 Likes</span>
                            </button>
                          </div>
                          <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight mt-1 leading-none">
                            {activeProd.title}
                          </h3>
                          <p className="text-[11px] text-zinc-450 uppercase tracking-wider font-mono font-bold mt-1">
                            {activeProd.collection}
                          </p>
                        </div>

                        <div className="bg-zinc-900 text-white rounded-xl p-3 flex justify-between items-center text-xs font-mono">
                          <span className="font-black text-yellow-400">{activeProd.price}</span>
                          <a href="#" className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                            <span>Product Details/URL</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Explore Similar Products</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {activeProd.similars.map((sim, i) => (
                              <div key={i} className="flex gap-2.5 items-center p-2 border border-zinc-150 rounded-xl bg-zinc-50">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-zinc-200">
                                  <Image src={sim.img} alt={sim.name} fill className="object-cover" />
                                </div>
                                <div className="text-[10px] min-w-0">
                                  <p className="font-extrabold text-zinc-800 truncate uppercase leading-none">{sim.name}</p>
                                  <span className="font-mono text-zinc-500">{sim.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <button className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer border-none shadow-md">
                            Buy at Driphunter.com
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {dripSpotView === "C" && (
              <motion.div
                key="state-c"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 max-w-5xl mx-auto"
              >
                <div className="text-left">
                  <button 
                    onClick={() => setDripSpotView("A")}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-650 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-mono"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Catalog</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                  <div className="bg-[#fca34d] rounded-2xl flex items-center justify-center p-8 border border-[#e8903c] relative aspect-square md:aspect-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedVariantImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 p-4"
                      >
                        <Image
                          src={selectedVariantImage}
                          alt="Active Spotlight Product"
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col justify-between text-left space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono block">
                        Date of upload &bull; Slay the Streets List
                      </span>
                      <h3 className="text-2xl font-black text-zinc-950 uppercase tracking-tight mt-1 leading-none">
                        Spotlight Product Variants
                      </h3>
                    </div>

                    <div className="space-y-4 flex-grow flex flex-col justify-between">
                      {[
                        { title: "Tactical Cargo Lower", category: "Lower Fit", price: "₹1,899", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80" },
                        { title: "Distressed Denim Pants", category: "Pants Fit", price: "₹2,199", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80" },
                        { title: "Oversized Flannel Shirt", category: "Shirt Fit", price: "₹1,299", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" }
                      ].map((variant, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedVariantImage(variant.img)}
                          className={`flex gap-4 items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                            selectedVariantImage === variant.img 
                              ? "border-orange-500 bg-orange-50/25 shadow-xs scale-[1.01]" 
                              : "border-zinc-150 hover:border-zinc-300 bg-white"
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-50 border border-zinc-100">
                            <Image src={variant.img} alt={variant.title} fill className="object-cover" />
                          </div>
                          <div className="text-left space-y-0.5 flex-grow min-w-0">
                            <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest font-mono block">
                              {variant.category}
                            </span>
                            <h4 className="text-[11px] font-black text-zinc-900 uppercase leading-none truncate">
                              {variant.title}
                            </h4>
                            <span className="text-[10px] text-zinc-500 font-mono font-bold block pt-0.5">
                              {variant.price}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                      <button className="text-[10px] font-black text-orange-500 hover:text-orange-600 hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer">
                        View More Outfits
                      </button>
                      <button 
                        onClick={() => setDripSpotView("A")}
                        className="bg-zinc-950 hover:bg-zinc-800 text-white font-black text-[10px] uppercase tracking-widest py-2.5 px-6 rounded-full transition-colors cursor-pointer border-none"
                      >
                        Return to Grid
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-left border-b border-zinc-100 pb-3">
                    <h3 className="text-lg font-black uppercase text-zinc-955 tracking-tight">Explore More Outfits By Slay the Streets List</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
                      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80",
                      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
                      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80"
                    ].map((imgUrl, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedVariantImage(imgUrl)}
                        className={`aspect-[4/5] rounded-2xl overflow-hidden relative cursor-pointer group border-2 ${
                          selectedVariantImage === imgUrl ? "border-orange-500 shadow-md" : "border-transparent"
                        }`}
                      >
                        <Image src={imgUrl} alt="Thumbnail Outfit" fill className="object-cover" />
                        <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-transparent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: "Grave skater", bg: "bg-purple-600 text-purple-100", label: "Slay the Streets List", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80" },
                    { title: "Ape Head", bg: "bg-blue-600 text-blue-100", label: "Slay the Streets List", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
                    { title: "Core crew", bg: "bg-green-600 text-green-100", label: "Slay the Streets List", img: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=300&q=80" },
                    { title: "Signature", bg: "bg-orange-600 text-orange-100", label: "Slay the Streets List", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=80" }
                  ].map((card, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative shadow-md group">
                        <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                        <div className="absolute inset-0 bg-black/35 z-10" />
                        <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                          <span className="font-chaney-title text-sm uppercase text-white tracking-widest text-center">{card.title}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">{card.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SECTION 4: DripVision */}
        <section id="dripvision-section" className="mb-20 max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-24 select-none">
          <h2 className="text-4xl font-black text-center text-zinc-950 uppercase tracking-widest mb-10 font-sans">
            DripVision
          </h2>

          <div className="flex flex-col gap-5">
            {/* Top Row: 2 Vertically Stacked Blue Cards on Left (4 cols) + 1 Featured Yellow Video Player on Right (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: 2 Vertically Stacked Blue Video Cards */}
              <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
                {[0, 1].map((cardIdx) => (
                  <div
                    key={cardIdx}
                    onClick={() => setActiveDripVisionIndex(cardIdx)}
                    className={`relative w-full flex-1 min-h-[140px] bg-[#2995fc] border-2 border-[#187ee0] rounded-[24px] flex items-center justify-center cursor-pointer shadow-sm hover:scale-[1.01] transition-all overflow-hidden ${
                      activeDripVisionIndex === cardIdx ? "ring-4 ring-yellow-400/80 shadow-md" : ""
                    }`}
                  >
                    {/* Pattern texture background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:14px_14px] opacity-70 pointer-events-none" />
                    
                    {/* Play Circle Button */}
                    <div className="relative z-10 w-16 h-16 rounded-full border-2 border-black bg-[#84c6ff]/90 backdrop-blur-xs flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 fill-black text-black ml-1" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: 1 Large Featured Yellow Card containing Main Video Player */}
              <div className="lg:col-span-8 bg-[#ffc324] border-2 border-[#e6ab0e] rounded-[28px] p-5 sm:p-7 flex flex-col items-center justify-center relative shadow-sm min-h-[340px]">
                {/* Main Video Screen Container */}
                <div className="relative w-full h-full min-h-[280px] bg-[#1a1836] border border-[#2b2754] rounded-[20px] p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
                  
                  {/* Top Right Share Icon */}
                  <div className="flex justify-end z-20">
                    <button className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer">
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </button>
                  </div>

                  {/* Center Red Play Button */}
                  <div className="my-auto flex justify-center items-center z-20 py-4">
                    <button 
                      onClick={() => setIsDripVisionPlaying(!isDripVisionPlaying)}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#f0324c] hover:bg-[#ff3b56] text-white flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 transition-all border-none cursor-pointer group"
                    >
                      <Play className="w-9 h-9 fill-white text-white ml-1.5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Bottom Video Player Control Bar */}
                  <div className="w-full space-y-2.5 z-20 pt-2 select-none">
                    {/* Timeline Bar */}
                    <div className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden flex items-center">
                      <div className="h-full bg-[#f0324c] rounded-full w-[45%]" />
                      <div className="w-3 h-3 rounded-full bg-white shadow-md -ml-1 flex-shrink-0" />
                    </div>

                    {/* Control Icons */}
                    <div className="flex items-center justify-between text-white/90 text-xs px-1 font-mono">
                      <div className="flex items-center gap-3">
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-sm">▶</button>
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-xs font-bold">❚❚</button>
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-xs">■</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-xs">🔊</button>
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-xs">⚙</button>
                        <button className="hover:text-white border-none bg-transparent cursor-pointer text-xs">⛶</button>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Floor Glow Effect */}
                  <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[85%] h-12 bg-[#ffc324]/20 blur-xl pointer-events-none rounded-full" />
                </div>
              </div>

            </div>

            {/* Bottom Row: 3 Horizontal Blue Video Cards side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[2, 3, 4].map((cardIdx) => (
                <div
                  key={cardIdx}
                  onClick={() => setActiveDripVisionIndex(cardIdx)}
                  className={`relative w-full aspect-[16/10] bg-[#2995fc] border-2 border-[#187ee0] rounded-[24px] flex items-center justify-center cursor-pointer shadow-sm hover:scale-[1.01] transition-all overflow-hidden ${
                    activeDripVisionIndex === cardIdx ? "ring-4 ring-yellow-400/80 shadow-md" : ""
                  }`}
                >
                  {/* Pattern texture background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:14px_14px] opacity-70 pointer-events-none" />
                  
                  {/* Play Circle Button */}
                  <div className="relative z-10 w-16 h-16 rounded-full border-2 border-black bg-[#84c6ff]/90 backdrop-blur-xs flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 fill-black text-black ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Instagram Posts */}
        <section id="instagram-section" className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-black uppercase tracking-widest text-zinc-955">
              Instagram Posts
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setInstaOffset(prev => Math.max(0, prev - 1))}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors border-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700" />
              </button>
              <button 
                onClick={() => setInstaOffset(prev => Math.min(3, prev + 1))}
                className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors border-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-zinc-700" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <motion.div 
              animate={{ x: -instaOffset * 220 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="flex gap-4 w-max py-2"
            >
              {[
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=300&q=80"
              ].map((imgUrl, i) => (
                <div key={i} className="w-[180px] sm:w-[200px] flex flex-col gap-2.5 flex-shrink-0 text-left">
                  <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group hover:scale-[1.01] transition-transform cursor-pointer">
                    <Image src={imgUrl} alt="Lifestyle post" fill className="object-cover group-hover:scale-103 transition-transform" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/90 uppercase tracking-widest z-20">
                      @driphunter
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <div className="flex gap-2.5 items-center">
                      <motion.button 
                        whileTap={{ scale: 1.3 }}
                        onClick={() => toggleLike(i)}
                        className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${likedPosts[i] ? "text-red-500 fill-red-500" : "text-zinc-950"}`} />
                      </motion.button>
                      <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-zinc-950" />
                      </button>
                      <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center">
                        <Send className="w-4 h-4 text-zinc-950" />
                      </button>
                    </div>
                    <motion.button 
                      whileTap={{ scale: 1.2 }}
                      onClick={() => toggleBookmark(i)}
                      className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
                    >
                      <Bookmark className={`w-4 h-4 transition-colors ${bookmarkedPosts[i] ? "text-zinc-955 fill-zinc-955" : "text-zinc-950"}`} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: Subscribe Banner */}
        <section className="mb-20 max-w-5xl mx-auto px-4 sm:px-6">
          <div 
            className="rounded-[32px] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-zinc-800"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/65 z-0" />
            
            <div className="relative z-10 max-w-md mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide font-sans text-white">
                Subscribe now
              </h2>
              
              <div className="flex flex-col gap-3.5 mt-4">
                <input 
                  type="text" 
                  placeholder="Name"
                  className="bg-[#fcfaf2] border-none rounded-full px-6 py-3 text-sm w-full outline-none text-zinc-900 font-extrabold placeholder-zinc-500 shadow-inner"
                />
                <input 
                  type="email" 
                  placeholder="Mail address"
                  className="bg-[#fcfaf2] border-none rounded-full px-6 py-3 text-sm w-full outline-none text-zinc-900 font-extrabold placeholder-zinc-500 shadow-inner"
                />
                <button className="bg-[#f05a28] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest py-3 px-12 rounded-full transition-colors cursor-pointer border-none shadow-md mt-1 w-full sm:w-auto mx-auto">
                  Subscribe Now
                </button>
              </div>
              <p className="text-[10px] text-zinc-300 font-medium tracking-wide leading-relaxed pt-2">
                By signing up, you agree to Driphunter&apos;s <a href="#" className="underline text-white hover:text-orange-400">Privacy Policy</a> and <a href="#" className="underline text-white hover:text-orange-400">Terms of Use</a>
              </p>
            </div>
          </div>
        </section>

        {/* SLAY THE STREETS & OUR STORY + TERMS AND CONDITION SECTION */}
        <section id="terms-section" className="border-t border-zinc-150 pt-16 pb-20">
          {/* SLAY THE STREETS & OUR STORY */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-zinc-150">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Yellow/Orange Card with Blue Outer Border & Guy Vector Art */}
              <div className="lg:col-span-6 w-full">
                <div className="relative w-full aspect-square max-w-[540px] mx-auto rounded-[28px] overflow-hidden bg-gradient-to-br from-[#ffd54f] via-[#ffa726] to-[#ff9800] p-1.5 shadow-xl border-[3px] border-[#0084ff]">
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                    <Image
                      src="/images/about_slay_exact.png"
                      alt="SLAY THE STREETS - Our Story Vector Artwork"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: SLAY THE STREETS Title & Exact Our Story Text */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-6 select-none">
                <div>
                  <h1 className="text-6xl sm:text-7xl lg:text-[92px] font-slay-ultra-bold font-black text-black uppercase tracking-tighter leading-[0.88]">
                    SLAY<br />THE<br />STREETS
                  </h1>
                </div>

                <div className="space-y-3 pt-2">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight font-sans">
                    Our Story
                  </h2>
                  <div className="space-y-3 font-sans max-w-xl text-xs sm:text-[13px] leading-relaxed">
                    <p className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-relaxed">
                      Main mission is to build a website-building platform that is affordable for everyone around the world.
                    </p>
                    <p className="text-zinc-700 font-medium text-xs sm:text-[13px] leading-relaxed">
                      Combining the ease-of-use and flexibility to make it possible for anyone from any corner of the world to build a website We took the name from the word &quot;Doric&quot; which was one of the three orders of ancient Greek and later Roman architecture We have started getting requests for early access from the day we launched our landing page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TERMS AND CONDITION & PLATFORM SHOWCASE */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            
            {/* Top Orange Pill Badge */}
            <div className="flex justify-center mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-md tracking-wide">
                Terms and Condition
              </span>
            </div>

            {/* Center Main Heading */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 text-center tracking-tight font-sans max-w-3xl mx-auto mb-10 leading-tight">
              Over trillions pixels showcased. What are you working on?
            </h2>

            {/* Paragraph Copy Text */}
            <div className="space-y-6 text-zinc-700 text-xs sm:text-[13px] leading-relaxed font-sans select-text">
              <p>
                Hundreds of millions of people look for design inspiration and feedback on Dribbble. We help players like you share small screenshots (shots) to show off your current projects, boost your portfolio, and love what you do—no matter what kind of creative professional you are. Founded in 2009, we are a bootstrapped and profitable company helping design talent share, grow, and get hired by over tens of thousands of today&apos;s most innovative brands around the world.
              </p>

              <p>
                Practically every single website worth anything out there has a Privacy Policy page that it can turn to whenever issues about privacy come up with users. That&apos;s why you really need to have a privacy policy, but it&apos;s not exactly that easy to make one, not if you really want to cover all of your bases. This is why you may want to look into the matter of privacy policy template generator (like ours here!) since it comes with quite a few benefits. A privacy policy is a legal document that details how a website gathers, stores, shares, and sells data about its visitors. This data typically includes items such as a user&apos;s name, address, birthday, marital status, medical history, and consumer behavior.
              </p>

              <p>
                The specific contents of a privacy policy document depend upon the laws in the legal jurisdiction in which your business operates. Most countries have their own set of guidelines regarding what information is eligible for collection, and how that information may be used. Privacy laws include GDPR, CCPA, CalOPPA, PIPEDA, Australia Privacy Act and many more.
              </p>

              <p>
                When it comes to legal documents, it is best not to take chances. Fortunately, it&apos;s easy to get a free privacy policy in just a few minutes. All you have to do is fill up the blank spaces on the right and we will create help you create your own personalized privacy policy template for your business.
              </p>

              {/* Types of technologies subheading */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                  Types of technologies that we use
                </h3>
                
                <p>
                  <strong className="text-zinc-900 font-semibold">Cookies:</strong> A cookie is a small piece of data (text file) that a website – when visited by a user – asks your browser to store on your device in order to remember information about you, such as your language preference or log in information. These cookies are set by us and called &quot;first-party cookies&quot;. We also use &quot;third-party cookies&quot; – which are cookies originating from a domain different from the domain of the website you are visiting (e.g., one of our Sites) – generally for our advertising and marketing efforts. More specifically, we use cookies and other tracking technologies for the following purposes: to enable our Sites to function and maintain security (for example, shopping cart functionality, security, customer support); to track, measure, and improve performance of our Sites; allow personalization of our Sites; and to target our own ads to prior visitors of our Sites on third party websites (see below on &quot;Why We Use Cookies and Similar Technologies&quot;).
                </p>

                {/* Bullet points list */}
                <ul className="space-y-2.5 pl-4 text-zinc-700 list-disc marker:text-zinc-400 pt-2">
                  <li>
                    A persistent cookie remains on your hard drive after you close your browser. Persistent cookies may be used by your browser on subsequent visits to one of our Sites until you choose to delete them, and otherwise typically delete themselves at expiration. Persistent cookies can be removed by following your web browser&apos;s directions.
                  </li>
                  <li>
                    A session cookie is temporary and disappears after you close your browser.
                  </li>
                  <li>
                    A third-party cookie is placed by someone other than the Dribbble Group, and may gather browsing activity across multiple websites and across multiple sessions. They are usually a type of persistent cookie and are stored until you delete them or they expire based on the time set in each third-party cookie.
                  </li>
                </ul>

                <p className="pt-2">
                  You can reset your web browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our service may not function properly if the ability to accept cookies is disabled. For more information about cookies, you may visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">http://www.allaboutcookies.org</a>.
                </p>
              </div>
            </div>

            {/* Bottom Image Banner */}
            <div className="mt-12 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-200 shadow-lg">
              <Image
                src="/images/about_terms_conditions.png"
                alt="Terms and Conditions Document and Pen"
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
