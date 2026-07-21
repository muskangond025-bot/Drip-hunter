"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { RetroTechBanner } from "@/components/common/RetroTechBanner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Play, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight,
  Sparkles,
  Layers,
  Check,
  X,
  ThumbsUp,
  Share,
  Send
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

interface BlogPost {
  id: number;
  title: string;
  category: "Trends" | "Lookbook" | "Editorial" | "Dance" | "Subcultures";
  readTime: string;
  date: string;
  image: string;
  author: string;
  authorAvatar: string;
  summary: string;
  content: string[];
}

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "FASHION IS AN ART OF IMAGINATION",
    category: "Editorial",
    readTime: "7 MIN READ",
    date: "July 21, 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    author: "Misha&apos;s Fashion Author",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    summary: "In the ever-evolving world of streetwear and high fashion, true style is born from self-expression and unbridled creativity.",
    content: [
      "Fashion isn't merely what we wear; it is an extension of our inner consciousness and imagination.",
      "The streets have always been the real runway where authentic trends are born, distilled, and celebrated.",
      "By blending vintage Japanese denim with technical German outerwear, modern youth create an entirely new visual lexicon."
    ]
  },
  {
    id: 2,
    title: "Pellentesque Habitant Morbi Tristique Senectus",
    category: "Trends",
    readTime: "5 MIN READ",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    summary: "Exploring sunset streetwear aesthetic silhouettes across coastal cities.",
    content: [
      "Golden hour lighting paired with boxy cotton tees brings out subtle textures in vintage dyes.",
      "We inspect how oversized fits provide both comfort and artistic presence."
    ]
  },
  {
    id: 3,
    title: "Greenhouse Aesthetics & Heavyweight Textiles",
    category: "Lookbook",
    readTime: "4 MIN READ",
    date: "July 19, 2026",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    author: "Marcus Vance",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    summary: "Natural light, organic cotton, and earth-tone cargo wear in modern street editorials.",
    content: [
      "Heavyweight textiles absorb light differently, giving green and olive tones a rich muted depth.",
      "Functional utility pockets make these garments both practical and visually striking."
    ]
  },
  {
    id: 4,
    title: "Black & White Portraiture in Urban Culture",
    category: "Subcultures",
    readTime: "6 MIN READ",
    date: "July 18, 2026",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    author: "Alex Rivera",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    summary: "Monochrome photography highlights shape, structure, and graphic contrast.",
    content: [
      "Without color distraction, viewers focus entirely on the garment's cut, stitching, and silhouette.",
      "High-contrast black and white photos have defined streetwear lookbooks since the 1990s."
    ]
  },
  {
    id: 5,
    title: "Movement & Dance Studio Style Guide",
    category: "Dance",
    readTime: "4 MIN READ",
    date: "July 17, 2026",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=80",
    author: "Sophia Chen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    summary: "Fluid draping fabrics engineered for dance studio rehearsals and dynamic motion.",
    content: [
      "When fabric moves in harmony with human body mechanics, clothing transforms into performance art.",
      "Breathable French terry weaves allow maximum flexibility without losing structure."
    ]
  }
];

export default function BlogPage() {
  const [activeSequence, setActiveSequence] = useState<"all" | "layout1" | "layout2" | "layout3" | "layout4">("all");
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Blog posts list with dynamic "More Posts" loading
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [pageCount, setPageCount] = useState(1);

  // Active modal article for reading
  const [activeArticleModal, setActiveArticleModal] = useState<BlogPost | null>(null);

  // Video Reel Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Digital Magazine Flipbook Modal State
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [flipbookPage, setFlipbookPage] = useState(1);

  // Social counters state
  const [likesCount, setLikesCount] = useState(3420);
  const [tweetsCount, setTweetsCount] = useState(1280);
  const [pinsCount, setPinsCount] = useState(15400);

  // User comments on article modal
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState<string[]>([
    "This editorial perspective is mind-blowing! Absolutely love the drop-shoulder breakdown.",
    "The 90s vintage subculture history was so informative. Great read!"
  ]);

  // Saved bookmarks set
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([1, 3]);

  // Cart & Wishlist sync states
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

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLoadMorePosts = () => {
    const newItems: BlogPost[] = [
      {
        id: posts.length + 1,
        title: "Tactical Utility & Cargo Wear Breakdown",
        category: "Trends",
        readTime: "5 MIN READ",
        date: "July 16, 2026",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        author: "Marcus Vance",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        summary: "Exploring modern water-resistant fabrics and 3x expandable pocket systems.",
        content: ["Utility meets high street in this season's tactical vest and cargo drop."]
      },
      {
        id: posts.length + 2,
        title: "Japanese Graphic Denim & Indigo Dyes",
        category: "Editorial",
        readTime: "6 MIN READ",
        date: "July 15, 2026",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        author: "Sophia Chen",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        summary: "How traditional indigo dyeing processes are reinvented by Tokyo streetwear labels.",
        content: ["Selvedge denim remains an irreplaceable canvas for custom embroidery and graphic patches."]
      }
    ];
    setPosts((prev) => [...prev, ...newItems]);
    setPageCount((prev) => prev + 1);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategoryFilter !== "All" && post.category !== selectedCategoryFilter) {
        return false;
      }
      if (blogSearch && !post.title.toLowerCase().includes(blogSearch.toLowerCase()) && !post.summary.toLowerCase().includes(blogSearch.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [posts, selectedCategoryFilter, blogSearch]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setCommentsList((prev) => [newComment.trim(), ...prev]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-between selection:bg-[#facc15] selection:text-black font-sans select-none relative">
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

      {/* Sticky Sequence Switcher Sub-Navbar */}
      <div className="bg-black text-white py-3 px-4 sticky top-20 z-40 border-b border-zinc-800 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="w-4 h-4 text-[#facc15]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-zinc-300">
              BLOG SEQUENCES:
            </span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shrink-0">
            {[
              { id: "all", label: "ALL SEQUENCES" },
              { id: "layout1", label: "1. MASONRY GALLERY" },
              { id: "layout2", label: "2. EDITORIAL MAGAZINE" },
              { id: "layout3", label: "3. FULL STORY ARTICLE" },
              { id: "layout4", label: "4. DIGITAL MAGAZINE" },
            ].map((seq) => (
              <button
                key={seq.id}
                onClick={() => {
                  setActiveSequence(seq.id as any);
                  if (seq.id !== "all") {
                    const el = document.getElementById(seq.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border-none ${
                  activeSequence === seq.id
                    ? "bg-[#facc15] text-black shadow-md font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {seq.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-grow w-full">

        {/* ========================================================================= */}
        {/* LAYOUT 1: MASONRY IMAGE GRID BLOG LAYOUT (Ref Image Left Column) */}
        {/* ========================================================================= */}
        {(activeSequence === "all" || activeSequence === "layout1") && (
          <section id="layout1" className="py-16 border-b border-zinc-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Header Title & Interactive Blog Search */}
              <div className="text-center space-y-4 max-w-xl mx-auto">
                <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                  LAYOUT 1 • MASONRY GALLERY
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 font-sans">
                  MISHA&apos;S FASHION JOURNAL
                </h1>

                <div className="relative max-w-md mx-auto pt-2">
                  <input
                    type="text"
                    placeholder="Find your favorite blog..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-full px-5 py-3 pr-12 text-xs font-mono text-zinc-900 outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black border-none bg-transparent cursor-pointer">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-xs font-mono">
                  {["All", "Trends", "Lookbook", "Editorial", "Dance", "Subcultures"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-3.5 py-1 rounded-full border transition-all cursor-pointer ${
                        selectedCategoryFilter === cat
                          ? "bg-black text-white border-black font-bold shadow-xs"
                          : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Featured Overlay Card */}
              {filteredPosts.length > 0 && (
                <div
                  onClick={() => setActiveArticleModal(filteredPosts[0])}
                  className="relative aspect-[21/9] sm:aspect-[24/9] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-zinc-200 bg-zinc-900"
                >
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => toggleBookmark(filteredPosts[0].id, e)}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-sm text-white hover:text-[#facc15] transition-colors border-none cursor-pointer"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(filteredPosts[0].id) ? "fill-[#facc15] text-[#facc15]" : ""}`} />
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-left space-y-3">
                    <span className="text-xs font-mono text-[#facc15] font-black uppercase tracking-widest">
                      FEATURED STORY • {filteredPosts[0].category}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-xl leading-relaxed hidden sm:block">
                      {filteredPosts[0].summary}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 bg-[#facc15] text-black font-extrabold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider group-hover:bg-yellow-400 transition-colors">
                        Read Story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Masonry Post Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {filteredPosts.slice(1, 4).map((post, idx) => (
                  <div
                    key={post.id}
                    onClick={() => setActiveArticleModal(post)}
                    className={`relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-zinc-200 bg-zinc-900 ${
                      idx === 0 ? "md:col-span-7 aspect-[16/10]" : idx === 1 ? "md:col-span-5 aspect-[4/5]" : "md:col-span-12 aspect-[21/8]"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => toggleBookmark(post.id, e)}
                        className="p-2 rounded-full bg-black/60 text-white hover:text-[#facc15] transition-colors border-none cursor-pointer"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(post.id) ? "fill-[#facc15] text-[#facc15]" : ""}`} />
                      </button>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 text-left space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                        {post.category} • {post.readTime}
                      </span>
                      <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-xs text-zinc-300 font-medium line-clamp-2 hidden sm:block">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* More Posts Button */}
              <div className="text-center pt-4">
                <button
                  onClick={handleLoadMorePosts}
                  className="bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-md transition-all active:scale-95 border-none cursor-pointer"
                >
                  MORE POSTS → (Page {pageCount})
                </button>
              </div>

              {/* Bottom Author Profile & Interactive Social Counter Bar */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                <div className="md:col-span-7 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-200 overflow-hidden relative shrink-0 border border-zinc-300">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Author Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-955 font-sans">Misha&apos;s Fashion Author</h4>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-0.5">
                      Curating top streetwear looks, vintage aesthetic guides, and modern runway reviews daily.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-2.5 text-[11px] font-mono font-bold">
                  <button
                    onClick={() => setLikesCount((prev) => prev + 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-2xs cursor-pointer transition-all active:scale-95 border-none flex items-center gap-1.5"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {(likesCount / 1000).toFixed(1)}K Likes
                  </button>
                  <button
                    onClick={() => setTweetsCount((prev) => prev + 1)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl shadow-2xs cursor-pointer transition-all active:scale-95 border-none flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> {(tweetsCount / 1000).toFixed(1)}K Tweets
                  </button>
                  <button
                    onClick={() => setPinsCount((prev) => prev + 1)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl shadow-2xs cursor-pointer transition-all active:scale-95 border-none flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> {(pinsCount / 1000).toFixed(1)}K Pins
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 2: EDITORIAL MAGAZINE DARK & LIGHT HYBRID (Ref Image Middle Column) */}
        {/* ========================================================================= */}
        {(activeSequence === "all" || activeSequence === "layout2") && (
          <section id="layout2" className="py-16 bg-[#0c0c0e] text-white border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Header Title */}
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono font-black text-[#facc15] uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/30">
                  LAYOUT 2 • EDITORIAL MAGAZINE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
                  DRIP FASHION JOURNAL
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-lg mx-auto">
                  High-fashion editorial journalism, street photography, and vintage archive culture.
                </p>
              </div>

              {/* Monitor Mockup Header Showcase */}
              <div 
                onClick={() => setActiveArticleModal(posts[0])}
                className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl text-center space-y-6 cursor-pointer group"
              >
                <div className="max-w-3xl mx-auto relative aspect-video rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                    alt="Editorial Desktop Showcase"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#facc15] font-black uppercase tracking-widest">
                        ISSUE #42 • SUMMER 2026
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                        Fashion Fashionable Life: Style, Beauty &amp; Drip
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Cards Editorial Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Oversized Beige Suit */}
                <div 
                  onClick={() => setActiveArticleModal(posts[1])}
                  className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 space-y-3 group cursor-pointer hover:border-zinc-600 transition-all text-left"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800">
                    <Image
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                      alt="Editorial Model"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase group-hover:text-[#facc15] transition-colors leading-snug">
                    Minimalist Tailoring &amp; Street Outerwear
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 block">5 MIN READ</span>
                </div>

                {/* Card 2: Yellow Highlight Quote Card */}
                <div className="bg-[#facc15] text-black rounded-3xl p-6 flex flex-col justify-between shadow-xl space-y-4 text-left">
                  <span className="text-4xl font-serif leading-none block">“</span>
                  <p className="text-base font-black uppercase tracking-tight leading-snug font-sans">
                    Fashion is an expression of everyday life and street culture.
                  </p>
                  <span className="text-xs font-mono font-bold uppercase text-black/70">
                    — DRIP EDITORIAL TEAM
                  </span>
                </div>

                {/* Card 3: Dark Streetwear Jacket */}
                <div 
                  onClick={() => setActiveArticleModal(posts[2])}
                  className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 space-y-3 group cursor-pointer hover:border-zinc-600 transition-all text-left"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800">
                    <Image
                      src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80"
                      alt="Dark Streetwear Jacket"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase group-hover:text-[#facc15] transition-colors leading-snug">
                    Subcultures in Modern Streetwear
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 block">8 MIN READ</span>
                </div>

                {/* Card 4: Vintage Photography */}
                <div 
                  onClick={() => setActiveArticleModal(posts[3])}
                  className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 space-y-3 group cursor-pointer hover:border-zinc-600 transition-all text-left"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800">
                    <Image
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
                      alt="Vintage Photography"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase group-hover:text-[#facc15] transition-colors leading-snug">
                    The Resurgence of 90s Vintage Aesthetics
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 block">4 MIN READ</span>
                </div>

              </div>

              {/* Video Journal Section */}
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative aspect-video max-h-[420px] w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 flex items-center justify-center cursor-pointer group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                  alt="Fashion Video Reel"
                  fill
                  className="object-cover brightness-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="relative z-10 text-center space-y-3 px-4">
                  <div className="w-16 h-16 bg-[#facc15] group-hover:bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-mono">
                    WATCH DRESSING JOURNAL REEL
                  </h3>
                </div>
              </div>

              {/* ARTICLES & FEATURED POST SECTION (Matching Screenshot 2 Column 2) */}
              <div className="pt-8 space-y-8 text-left">
                <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#facc15] uppercase tracking-widest block">
                      RECOMMENDED READS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                      ARTICLES
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-bold hidden sm:block">
                    4 NEW ARTICLES THIS WEEK
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Yellow Featured Block */}
                  <div 
                    onClick={() => setActiveArticleModal(posts[0])}
                    className="lg:col-span-5 bg-[#facc15] text-black rounded-3xl p-8 flex flex-col justify-between shadow-2xl border border-yellow-400 space-y-6 cursor-pointer group hover:scale-[1.01] transition-transform"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-black uppercase text-black/70 bg-black/10 px-3 py-1 rounded-full inline-block">
                        FEATURED ESSAY
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight font-sans">
                        Art is a lie that makes us realize the truth.
                      </h4>
                      <p className="text-xs font-medium text-black/80 leading-relaxed">
                        An in-depth manifesto on how streetwear graphics translate painterly surrealism into everyday street apparel.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                          DR
                        </div>
                        <div className="text-xs font-mono">
                          <span className="font-bold block">Alex Rivera</span>
                          <span className="text-black/60 text-[10px]">Editor-in-Chief</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-black uppercase group-hover:underline flex items-center gap-1">
                        READ <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: 3 Compact News Article Cards */}
                  <div className="lg:col-span-7 space-y-4">
                    {[
                      {
                        id: 101,
                        title: "The Architecture of Drop-Shoulder Heavyweight Tees",
                        cat: "DESIGN & FIT",
                        time: "4 MIN READ",
                        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80"
                      },
                      {
                        id: 102,
                        title: "Streetwear & High Luxury Crossovers in 2026",
                        cat: "RUNWAY REPORT",
                        time: "6 MIN READ",
                        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
                      },
                      {
                        id: 103,
                        title: "Sustainable Denim Dyeing & Eco-Friendly Textiles",
                        cat: "SUSTAINABILITY",
                        time: "5 MIN READ",
                        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80"
                      }
                    ].map((art) => (
                      <div
                        key={art.id}
                        onClick={() => setActiveArticleModal(posts[0])}
                        className="bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-all group"
                      >
                        <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                          <Image
                            src={art.img}
                            alt={art.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-1 text-left flex-grow">
                          <span className="text-[9px] font-mono font-black text-[#facc15] uppercase tracking-wider block">
                            {art.cat} • {art.time}
                          </span>
                          <h5 className="text-sm font-bold text-white group-hover:text-[#facc15] transition-colors leading-snug">
                            {art.title}
                          </h5>
                        </div>

                        <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 3: FULL ARTICLE STORY READING LAYOUT (Ref Image Right Column) */}
        {/* ========================================================================= */}
        {(activeSequence === "all" || activeSequence === "layout3") && (
          <section id="layout3" className="py-16 bg-white text-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
              
              {/* Header Title & Meta */}
              <div className="space-y-4 border-b border-zinc-200 pb-8 text-center sm:text-left">
                <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
                  LAYOUT 3 • FULL STORY ARTICLE
                </span>
                
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 font-sans leading-tight">
                  SUBCULTURES IN STREET FASHION: HOW SKATE, HIP-HOP &amp; PUNK DEFINED MODERN LUXURY
                </h1>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-zinc-500 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 relative overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Author"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-zinc-900">By Alex Rivera</span>
                  </div>

                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> July 21, 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 MIN READ</span>
                </div>
              </div>

              {/* Main Article Hero Image */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                  alt="Streetwear Culture Story"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Article Content with Drop Cap */}
              <div className="space-y-6 text-base text-zinc-800 leading-relaxed font-sans">
                <p className="first-letter:float-left first-letter:text-6xl first-letter:font-black first-letter:font-mono first-letter:mr-3 first-letter:text-black">
                  Streetwear isn&apos;t just clothing; it&apos;s a living movement born on the pavement. What began as a rebellious counter-culture in skate parks and underground hip-hop venues has evolved into the defining pillar of global luxury fashion. Today, high fashion houses look to the streets for authenticity and inspiration.
                </p>

                <p>
                  From heavyweight graphic tees with drop shoulders to tactical sling bags and vintage distressed denim, every garment tells a story of identity. The fusion of utilitarian function and high-concept aesthetics allows wearers to make a statement without uttering a word.
                </p>

                {/* Full-width Highlight Quote Banner */}
                <div className="bg-[#ffd500] text-black rounded-3xl p-8 my-8 shadow-lg space-y-2 border border-yellow-400">
                  <p className="text-xl sm:text-2xl font-black uppercase tracking-tight font-sans">
                    &ldquo;Fashion is what you buy, style is what you do with it.&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold block opacity-80 uppercase">
                    — DRIP HUNTER STYLE MANIFESTO
                  </span>
                </div>

                <p>
                  As we look toward the future of fashion, streetwear continues to democratize style. It proves that luxury is no longer defined by price tags, but by cultural relevance, community, and unyielding self-expression.
                </p>
              </div>

              {/* Author Bio Box */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-zinc-300 relative overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Alex Rivera"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 font-sans">Alex Rivera</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-0.5">
                    Senior Fashion Journalist specializing in streetwear subcultures, sneaker history, and luxury streetwear crossovers.
                  </p>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* LAYOUT 4: DIGITAL MAGAZINE & LOOKBOOK (Matching Uploaded Image) */}
        {/* ========================================================================= */}
        {(activeSequence === "all" || activeSequence === "layout4") && (
          <section id="layout4" className="py-16 bg-zinc-950 text-white border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
              
              {/* Header Title */}
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono font-black text-[#facc15] uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/30">
                  LAYOUT 4 • DIGITAL MAGAZINE &amp; LOOKBOOK
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
                  LOOKBOOK MAGAZINE
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-lg mx-auto">
                  Quarterly print catalog &amp; interactive digital flipbook issues.
                </p>
              </div>

              {/* Digital Magazine Booklet Covers Grid */}
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                  <h3 className="text-xl font-bold uppercase tracking-wider font-mono text-[#facc15]">
                    DIGITAL ISSUES &amp; PRINT COVERS
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 font-bold hidden sm:block">
                    SELECT AN ISSUE TO READ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      issue: "ISSUE #42",
                      title: "URBAN DRIP & STREET CULTURE",
                      date: "SUMMER 2026",
                      bg: "from-yellow-500 to-amber-600",
                      text: "text-black",
                      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80"
                    },
                    {
                      issue: "ISSUE #41",
                      title: "REVOLUTION OF 90s DENIM",
                      date: "SPRING 2026",
                      bg: "from-red-600 to-rose-700",
                      text: "text-white",
                      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80"
                    },
                    {
                      issue: "ISSUE #40",
                      title: "HIGH LUXURY & CARGO WEAR",
                      date: "WINTER 2025",
                      bg: "from-blue-600 to-indigo-700",
                      text: "text-white",
                      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80"
                    },
                    {
                      issue: "ISSUE #39",
                      title: "MONOCHROME ARCHIVE LOOKS",
                      date: "FALL 2025",
                      bg: "from-emerald-600 to-teal-700",
                      text: "text-white",
                      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    }
                  ].map((mag, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setIsFlipbookOpen(true);
                        setFlipbookPage(1);
                      }}
                      className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800 space-y-4 group cursor-pointer hover:border-yellow-400 transition-all shadow-xl"
                    >
                      {/* Booklet Cover Mockup */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 bg-zinc-800">
                        <Image
                          src={mag.img}
                          alt={mag.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between">
                          <span className="text-[10px] font-mono font-black uppercase text-[#facc15] bg-black/60 px-2.5 py-1 rounded-full w-fit">
                            {mag.issue}
                          </span>
                          <div>
                            <span className="text-[9px] font-mono text-zinc-300 font-bold block">{mag.date}</span>
                            <h4 className="text-base font-black uppercase text-white tracking-tight leading-tight">
                              {mag.title}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-zinc-800 group-hover:bg-[#facc15] group-hover:text-black text-white font-mono font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all border-none cursor-pointer">
                        READ DIGITAL EDITION
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terracotta Red Featured Issue Spotlight Banner */}
              <div className="bg-[#c2410c] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-orange-600 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-mono font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full inline-block">
                    SPOTLIGHT ISSUE • SUMMER 2026
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans leading-tight">
                    DRIP MAGAZINE • ISSUE #42: THE FUTURE OF STREETWEAR
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-orange-100 leading-relaxed max-w-2xl">
                    120 pages of high-resolution editorial spreads, designer interviews, Japanese raw denim breakdowns, and vintage archive culture.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        setIsFlipbookOpen(true);
                        setFlipbookPage(1);
                      }}
                      className="bg-black hover:bg-zinc-900 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg transition-all border-none cursor-pointer"
                    >
                      VIEW FULL SPREAD
                    </button>
                    <button
                      onClick={() => alert("⬇ Downloading PDF Issue #42 (120 MB)...")}
                      className="bg-white hover:bg-orange-50 text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg transition-all border-none cursor-pointer"
                    >
                      DOWNLOAD PDF ISSUE
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80"
                      alt="Spotlight Cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ========================================================================= */}
      {/* DIGITAL MAGAZINE FLIPBOOK READER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFlipbookOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 text-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 border border-zinc-800 relative text-left"
            >
              <button
                onClick={() => setIsFlipbookOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 hover:bg-white hover:text-black transition-colors cursor-pointer border-none"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#facc15] uppercase tracking-wider block">
                    INTERACTIVE MAGAZINE FLIPBOOK
                  </span>
                  <h3 className="text-lg font-black uppercase text-white font-mono">
                    DRIP MAGAZINE • ISSUE #42
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400 font-bold">
                  Page {flipbookPage} of 24
                </span>
              </div>

              {/* Flipbook Page Viewer */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
                <Image
                  src={
                    flipbookPage % 2 === 1
                      ? "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                      : "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={`Page ${flipbookPage}`}
                  fill
                  className="object-cover opacity-90"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-6 text-center">
                  <p className="text-sm font-mono text-white font-bold uppercase tracking-wider">
                    FEATURED EDITORIAL SPREAD — PAGE {flipbookPage}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setFlipbookPage((prev) => Math.max(1, prev - 1))}
                  disabled={flipbookPage === 1}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-mono font-bold transition-all cursor-pointer border-none"
                >
                  ← Previous Page
                </button>

                <span className="text-xs font-mono text-zinc-400">
                  Use controls to flip pages
                </span>

                <button
                  onClick={() => setFlipbookPage((prev) => Math.min(24, prev + 1))}
                  disabled={flipbookPage === 24}
                  className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-black font-mono font-extrabold text-xs transition-all cursor-pointer border-none"
                >
                  Next Page →
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FULL ARTICLE READER MODAL (Triggers when clicking any blog post) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-black rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 select-none p-6 sm:p-8 space-y-6 relative text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black transition-colors cursor-pointer border-none"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <span className="text-[10px] font-mono font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {activeArticleModal.category} • {activeArticleModal.readTime}
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight font-sans leading-tight">
                {activeArticleModal.title}
              </h2>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 border-b border-zinc-200 pb-4">
                <span>By {activeArticleModal.author}</span>
                <span>•</span>
                <span>{activeArticleModal.date}</span>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100">
                <Image
                  src={activeArticleModal.image}
                  alt={activeArticleModal.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-zinc-800 leading-relaxed font-sans">
                <p className="font-semibold text-base text-zinc-950">
                  {activeArticleModal.summary}
                </p>
                {activeArticleModal.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Comments Section */}
              <div className="border-t border-zinc-200 pt-6 space-y-4">
                <h4 className="text-sm font-bold text-zinc-950 font-sans uppercase">
                  Community Discussion ({commentsList.length})
                </h4>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2.5 text-xs text-zinc-900 outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer border-none shrink-0"
                  >
                    Post Comment
                  </button>
                </form>

                <div className="space-y-2 text-xs font-sans">
                  {commentsList.map((c, i) => (
                    <div key={i} className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-zinc-700">
                      <strong className="text-black font-bold block">Verified Drip Hunter Member</strong>
                      <p className="mt-0.5">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO REEL PLAYER MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex items-center justify-center"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer border-none"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <Image
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
                alt="Video Reel"
                fill
                className="object-cover opacity-80"
              />

              <div className="relative z-10 text-center space-y-3">
                <span className="text-xs font-mono font-black text-[#facc15] bg-black/80 px-4 py-1.5 rounded-full border border-yellow-400 uppercase tracking-widest">
                  ▶ PLAYING OFFICIAL DRESSING JOURNAL REEL
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Social Banner & Footer */}
      <RetroTechBanner />
      <Footer />
    </div>
  );
}
