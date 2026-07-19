"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, MapPin, Truck, Star, Sparkles, RotateCw, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { masterProducts, Product } from "./data";

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

// Swipable lookbook items for Dressing-up the Mannequin
interface LookbookItem {
  id: string;
  name: string;
  price: string;
  category: "top" | "shorts" | "cap" | "shoes" | "socks";
  color: string;
  image: string;
}

const lookbookItems: LookbookItem[] = [
  {
    id: "item-top",
    name: "Puma Classic Tee - Blue",
    price: "₹1,899",
    category: "top",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "item-shorts",
    name: "Puma Classic Shorts - Black",
    price: "₹1,499",
    category: "shorts",
    color: "Black",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "item-cap",
    name: "Streetwear Snapback Cap - Royal",
    price: "₹799",
    category: "cap",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "item-socks",
    name: "Active Crew Socks - Red",
    price: "₹299",
    category: "socks",
    color: "Red",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "item-shoes",
    name: "Puma RS-X Running Shoes",
    price: "₹4,200",
    category: "shoes",
    color: "Red",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&q=80"
  }
];

export default function ProductDetailClient({ productId }: { productId: number }) {
  // Navigation view modes (Step 1, Steps 2-3, Step 4)
  const [viewMode, setViewMode] = useState<"pdp" | "drip" | "rotate">("pdp");

  // Sync state with localStorage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [galleryMode, setGalleryMode] = useState<"grid" | "zoom">("grid");

  // Touch & drag swipe gesture state handlers on main zoom image
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [mouseDownX, setMouseDownX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 40;
    if (diffX > swipeThreshold) {
      // Swiped left -> show next view
      setActiveThumbnailIndex((prev) => (prev + 1) % 4);
    } else if (diffX < -swipeThreshold) {
      // Swiped right -> show previous view
      setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDownX) return;
    const diffX = mouseDownX - e.clientX;
    const swipeThreshold = 40;
    if (diffX > swipeThreshold) {
      setActiveThumbnailIndex((prev) => (prev + 1) % 4);
    } else if (diffX < -swipeThreshold) {
      setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
    }
    setMouseDownX(0);
  };

  // Selection states
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeDeliveryText, setPincodeDeliveryText] = useState("");

  // Live Mannequin Outfit equipped state
  const [equippedItems, setEquippedItems] = useState<{ [key: string]: boolean }>({
    top: false,
    shorts: false,
    cap: false,
    shoes: false,
    socks: false
  });

  // 360° Drag rotation states
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDraggingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startAngleRef = useRef(0);

  // Active sub-info tabs
  const [activeInfoTab, setActiveInfoTab] = useState<"story" | "fit" | "features">("story");

  // Load from local storage on mount
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

  // Save to local storage
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

  // Find product by id
  const product = masterProducts.find((p) => p.id === productId) || masterProducts[0];

  // Derive pricing details
  const parsedPrice = parseInt(product.price.replace(/[^0-9]/g, "")) || 7999;
  const originalMrp = Math.round(parsedPrice / (1 - (product.discount / 100)));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    setCart((prev) => {
      const itemKey = `${product.id}-${selectedSize}`;
      const existing = prev.find((item) => `${item.id}-${(item as any).size}` === itemKey);
      
      if (existing) {
        return prev.map((item) =>
          `${item.id}-${(item as any).size}` === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          brand: product.brand,
          name: `${product.name} (Size: ${selectedSize})`,
          price: product.price,
          image: product.image,
          quantity: 1,
          size: selectedSize
        } as any
      ];
    });
    alert(`Added ${product.name} (Size: ${selectedSize}) to your bag!`);
  };

  const handleToggleFavorite = () => {
    setWishlist((prev) => {
      const isFav = prev.some((item) => item.id === product.id);
      if (isFav) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        { id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image }
      ];
    });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      alert("Please enter a valid 6-digit Pincode!");
      return;
    }
    setPincodeChecked(true);
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    setPincodeDeliveryText(`Expected delivery by ${date.toLocaleDateString('en-IN', options)}`);
  };

  const isProductInWishlist = wishlist.some((item) => item.id === product.id);

  // Alternate images zoom/detail views for PDP
  const imageViews = [
    { label: "Front Profile", class: "object-cover object-center" },
    { label: "Back Logo Branding", class: "object-cover object-bottom scale-110" },
    { label: "Zipper Ribbing Close-Up", class: "object-cover scale-150 object-top" },
    { label: "Embroidered Scuderia Emblem", class: "object-cover scale-[1.75] object-center" },
    { label: "Lifestyle Walker Model", class: "object-cover object-top filter contrast-[1.05]" }
  ];

  // 360° Drag rotation handlers
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    startDragXRef.current = clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startDragXRef.current;
    // Map drag pixel offset to degrees of rotation
    const multiplier = 0.8;
    setRotationAngle(startAngleRef.current + deltaX * multiplier);
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const toggleEquipped = (category: string) => {
    setEquippedItems(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between select-none">
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={(id) => setCart((prev) => prev.filter((item) => item.id !== id))}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={(id, qty) => {
          if (qty <= 0) {
            setCart((prev) => prev.filter((item) => item.id !== id));
            return;
          }
          setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
        }}
        onAddToCart={(p) => {
          setCart((prev) => {
            const existing = prev.find((item) => item.id === p.id);
            if (existing) {
              return prev.map((item) => (item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prev, { ...p, quantity: 1 }];
          });
        }}
      />



      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full font-sans">
        
        {/* Navigation Breadcrumbs */}
        <div className="text-xs text-zinc-400 font-bold mb-8 uppercase tracking-widest font-mono">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span className="mx-2">&bull;</span>
          <a href="/shop" className="hover:text-black transition-colors">Shop</a>
          <span className="mx-2">&bull;</span>
          <span className="text-zinc-800 font-black">{product.brand} Scuderia</span>
        </div>

        {/* Dynamic Interface based on step state */}
        <AnimatePresence mode="wait">
          {viewMode === "pdp" && (
            <motion.div
              key="pdp-default"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              
              {/* LEFT SIDE: Grid mode vs. Zoom mode (Figma Layouts) */}
              <div className="lg:col-span-7 w-full">
                {galleryMode === "grid" ? (
                  /* 2x2 Grid Layout (Figma Image 1 Layout) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {imageViews.map((view, index) => (
                      <div 
                        key={index} 
                        className={`relative aspect-[3/4] bg-zinc-50 rounded-[24px] overflow-hidden border border-zinc-150 group cursor-pointer ${
                          index === 4 ? "sm:col-span-2 aspect-[16/10]" : ""
                        }`}
                        onClick={() => {
                          setActiveThumbnailIndex(index >= 4 ? 0 : index);
                          setGalleryMode("zoom");
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={`${product.name} - ${view.label}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className={`transition-transform duration-500 group-hover:scale-105 ${view.class}`}
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          🔍 Click to zoom detail
                        </div>
                        <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity bg-black/40 text-white font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                          {view.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Zoomed Thumbnail + Main Image Layout (Figma Image 2 Layout) */
                  <div className="space-y-4">
                    {/* Back to Grid Link */}
                    <div className="flex justify-start">
                      <button
                        onClick={() => setGalleryMode("grid")}
                        className="text-xs font-mono font-black uppercase text-zinc-500 hover:text-black transition-colors cursor-pointer border-none bg-transparent flex items-center gap-1 hover:underline"
                      >
                        ← Back to Grid View
                      </button>
                    </div>

                    <div className="flex gap-4 items-start w-full">
                      {/* Vertical Thumbnails Stack (Left) */}
                      <div className="w-20 flex-shrink-0 flex flex-col gap-3">
                        {imageViews.slice(0, 4).map((view, index) => {
                          const isActive = activeThumbnailIndex === index;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveThumbnailIndex(index)}
                              className={`relative w-full aspect-[3/4] bg-zinc-50 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                isActive ? "border-orange-500 ring-2 ring-orange-500/25 scale-[1.03]" : "border-zinc-200 hover:border-zinc-450"
                              }`}
                            >
                              <Image
                                src={product.image}
                                alt={view.label}
                                fill
                                sizes="80px"
                                className={`${view.class}`}
                              />
                            </button>
                          );
                        })}
                        {/* Down Arrow Indicator button */}
                        <button 
                          onClick={() => setActiveThumbnailIndex(prev => (prev + 1) % 4)}
                          className="w-full aspect-square border border-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-50 text-zinc-500 transition-colors cursor-pointer bg-white"
                        >
                          <span className="text-xs font-bold font-mono">▼</span>
                        </button>
                      </div>

                      {/* Main Display Image Container (Right) */}
                      <div className="flex-grow flex flex-col items-center gap-4">
                        <div className="w-full relative aspect-[3/4] bg-zinc-50 rounded-[32px] overflow-hidden border border-zinc-150 shadow-xs select-none">
                          <motion.div
                            key={activeThumbnailIndex}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.4}
                            onDragEnd={(e, info) => {
                              const swipeThreshold = 50;
                              if (info.offset.x < -swipeThreshold) {
                                // Dragged left -> show next
                                setActiveThumbnailIndex((prev) => (prev + 1) % 4);
                              } else if (info.offset.x > swipeThreshold) {
                                // Dragged right -> show previous
                                setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
                              }
                            }}
                            className="relative w-full h-full cursor-ew-resize active:cursor-grabbing"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              priority
                              draggable="false"
                              sizes="(max-width: 1024px) 80vw, 50vw"
                              className={`transition-transform duration-500 pointer-events-none ${imageViews[activeThumbnailIndex].class}`}
                            />
                          </motion.div>
                          
                          {/* Image view mode tag */}
                          <div className="absolute bottom-4 left-4 bg-black/60 text-white font-mono text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold z-10 select-none pointer-events-none">
                            {imageViews[activeThumbnailIndex].label}
                          </div>
                        </div>

                        {/* Interactive Pagination Dot/Bar Indicator */}
                        <div className="flex items-center gap-1.5 select-none pt-1">
                          {Array.from({ length: 4 }).map((_, idx) => {
                            const isActive = activeThumbnailIndex === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => setActiveThumbnailIndex(idx)}
                                className={`h-1.5 transition-all duration-300 cursor-pointer border-none ${
                                  isActive ? "bg-[#f05a28] w-6 rounded-full" : "bg-zinc-300 w-1.5 rounded-full hover:bg-zinc-400"
                                }`}
                                aria-label={`View image ${idx + 1}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Buy specs panel */}
              <div className="lg:col-span-5 space-y-6 text-left select-none">
                
                {/* Brand Logo & Name */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-sm">
                      Ferrari Team wear
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-zinc-950 uppercase leading-none font-sans mt-2.5">
                    {product.brand}
                  </h1>
                  <p className="text-lg font-medium text-zinc-500 mt-1.5 uppercase tracking-wide">
                    {product.name}
                  </p>
                </div>

                {/* Ratings badge */}
                <div className="inline-flex items-center gap-2 border border-zinc-200 rounded-lg px-3 py-1.5 bg-zinc-50 font-mono text-xs font-black text-zinc-800">
                  <span className="flex items-center gap-0.5 text-yellow-500">
                    {product.rating} <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                  </span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-zinc-550 font-bold">4.8k Ratings</span>
                </div>

                <hr className="border-zinc-150" />

                {/* Pricing block */}
                <div className="space-y-1 font-sans">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-zinc-955 font-mono">
                      {product.price}
                    </span>
                    <span className="text-sm text-zinc-400 font-bold line-through font-mono">
                      ₹{originalMrp}
                    </span>
                    <span className="text-base font-black text-[#f05a28] font-mono">
                      ({product.discount}% OFF)
                    </span>
                  </div>
                  <p className="text-xs font-mono text-green-600 font-extrabold uppercase tracking-wide pt-1">
                    inclusive of all taxes
                  </p>
                </div>

                {/* Sizes selection */}
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                      Select Size
                    </h3>
                    <button 
                      onClick={() => alert("Size Chart:\nS - Chest 38 inches\nM - Chest 40 inches\nL - Chest 42 inches\nXL - Chest 44 inches\nXXL - Chest 46 inches")}
                      className="text-xs font-black uppercase tracking-widest text-[#f05a28] hover:text-orange-600 transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Size Chart &gt;
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-full border text-xs font-black uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer ${
                            isSelected 
                              ? "border-[#f05a28] bg-orange-50 text-[#f05a28] scale-[1.05] shadow-xs" 
                              : "border-zinc-200 hover:border-zinc-350 text-zinc-700 hover:bg-zinc-50"
                      }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Purchase trays */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow flex items-center justify-center gap-2 bg-[#f05a28] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-xl shadow-md transition-colors cursor-pointer border-none font-sans"
                  >
                    <ShoppingBag className="w-4 h-4 fill-white" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleToggleFavorite}
                    className={`flex-grow sm:flex-grow-0 sm:px-8 flex items-center justify-center gap-2 border font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all cursor-pointer font-sans ${
                      isProductInWishlist 
                        ? "border-zinc-950 bg-zinc-950 text-white" 
                        : "border-zinc-250 bg-white hover:bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isProductInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                    <span>{isProductInWishlist ? "Wishlisted" : "Wishlist"}</span>
                  </button>
                </div>

                {/* Complete Your Look Banner Button */}
                <button
                  onClick={() => setViewMode("drip")}
                  className="w-full flex items-center justify-center gap-2.5 bg-zinc-950 hover:bg-black text-[#ebd26b] font-black text-xs uppercase tracking-widest py-4.5 rounded-xl border border-zinc-850 shadow-md transition-all cursor-pointer font-sans"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse fill-yellow-400" />
                  <span>Complete Your Look (Interactive Outfit Customizer)</span>
                </button>

                {/* Pincode delivery widget */}
                <div className="space-y-3 font-sans">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5 font-bold">
                    <MapPin className="w-4 h-4 text-zinc-500" /> Delivery Checker
                  </h3>
                  <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="Enter 6-digit Pincode"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-zinc-400 font-mono text-zinc-800"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-black text-[#ebd26b] font-black text-xs uppercase tracking-widest px-5 rounded-xl cursor-pointer transition-colors border-none"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeChecked && (
                    <div className="text-xs font-mono text-zinc-650 bg-zinc-50 p-3 rounded-xl border border-zinc-100 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-zinc-900 font-black">
                        <Truck className="w-4 h-4 text-green-600" /> {pincodeDeliveryText}
                      </span>
                      <span className="text-zinc-400">&bull; Cash on Delivery available</span>
                      <span className="text-zinc-400">&bull; Easy 14 days exchange and returns</span>
                    </div>
                  )}
                </div>

                {/* Specifications details */}
                <div className="space-y-4 font-sans pt-2">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 border border-zinc-100 rounded-2xl p-4 bg-zinc-50/25">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="text-xs leading-normal">
                        <span className="text-zinc-400 block font-semibold">{spec.label}</span>
                        <strong className="text-zinc-850 font-extrabold">{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {viewMode === "drip" && (
            <motion.div
              key="fitting-split"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back navigation button */}
              <div className="flex justify-start">
                <button
                  onClick={() => setViewMode("pdp")}
                  className="flex items-center gap-2 text-xs font-mono font-black uppercase text-[#f05a28] hover:text-orange-650 transition-colors border-none bg-transparent cursor-pointer font-bold"
                >
                  ← Back to Product Details
                </button>
              </div>

              {/* Product Asset Compression Indicator Banner */}
              <div className="bg-gradient-to-r from-red-600 via-[#f05a28] to-yellow-500 text-white rounded-[24px] p-5 flex flex-col sm:flex-row justify-between items-center text-left gap-4 shadow-md">
                <div>
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Scuderia Fitting Lab</span>
                  <h3 className="text-lg font-black uppercase mt-1 leading-none font-sans">Complete Your Look</h3>
                  <p className="text-xs text-white/80 font-mono mt-1">Mix & Match active streetwear elements directly on the mannequin canvas.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-white/45 bg-white/10 flex-shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <button 
                    onClick={() => setViewMode("rotate")}
                    className="px-5 py-2.5 bg-white text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow hover:bg-zinc-50 transition-all cursor-pointer border-none"
                  >
                    View Customized Outfit in 3D &gt;
                  </button>
                </div>
              </div>

              {/* Split Fitting screen layout (Step 2 and 3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* LEFT SIDE: Swipable clothing container boxes panel */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">Swipable Streetwear Boxes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lookbookItems.map((item) => {
                      const isEquipped = equippedItems[item.category];
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleEquipped(item.category)}
                          className={`flex gap-4 items-center p-4 rounded-3xl border transition-all cursor-pointer ${
                            isEquipped 
                              ? "border-orange-500 bg-orange-50/25 scale-[1.02] shadow-sm" 
                              : "border-zinc-150 bg-white hover:border-zinc-300 shadow-xs"
                          }`}
                        >
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="text-left flex-grow">
                            <span className="text-[8px] font-mono font-black uppercase tracking-widest text-[#f05a28] block mb-0.5">{item.category} element</span>
                            <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            <strong className="text-xs font-mono font-black text-zinc-800 mt-1 block">{item.price}</strong>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[9px] font-bold ${
                            isEquipped ? "border-orange-500 bg-orange-500 text-white" : "border-zinc-300 text-zinc-400"
                          }`}>
                            {isEquipped ? "✓" : "+"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SIDE: Interactive Mannequin Canvas */}
                <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200/80 rounded-[32px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[460px]">
                  
                  {/* Outfit Stats Header overlay */}
                  <div className="w-full flex justify-between items-start z-15">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">Avatar customization</span>
                      <h4 className="text-xs font-black uppercase text-zinc-950 mt-0.5">Scuderia Model Alpha</h4>
                    </div>
                    <button 
                      onClick={() => setEquippedItems({ top: false, shorts: false, cap: false, shoes: false, socks: false })}
                      className="text-[10px] font-mono text-zinc-500 hover:text-red-500 uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer"
                    >
                      Reset Outfit
                    </button>
                  </div>

                  {/* Interactive Mannequin Outfit Overlay Canvas */}
                  <div className="relative w-64 h-[350px] flex items-center justify-center select-none">
                    
                    {/* Athletic Mannequin Body Vector */}
                    <svg className="w-full h-full text-zinc-300" viewBox="0 0 200 400" fill="currentColor">
                      <circle cx="100" cy="50" r="18" fill="#d4d4d8" />
                      <rect x="96" y="68" width="8" height="10" fill="#c4c4c7" />
                      <path d="M 80,78 L 120,78 L 125,180 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 78,78 L 65,170 L 58,170 L 68,78 Z" fill="#c4c4c7" />
                      <path d="M 122,78 L 135,170 L 142,170 L 132,78 Z" fill="#c4c4c7" />
                      <path d="M 78,180 L 85,320 L 75,320 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 122,180 L 115,320 L 125,320 L 125,180 Z" fill="#d4d4d8" />
                      <path d="M 75,320 L 65,335 C 65,335 85,335 85,335 Z" fill="#b4b4b7" />
                      <path d="M 125,320 L 135,335 C 135,335 115,335 115,335 Z" fill="#b4b4b7" />
                    </svg>

                    {/* Cap Overlay Layer */}
                    {equippedItems.cap && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[16px] w-[50px] h-[25px] z-20 pointer-events-none"
                      >
                        <svg viewBox="0 0 100 50" fill="#1e3a8a">
                          <path d="M 10,40 C 20,10 80,10 90,40 C 90,40 100,45 100,40 L 70,30 L 10,40 Z" />
                        </svg>
                      </motion.div>
                    )}
                    
                    {/* Top T-Shirt Layer */}
                    {equippedItems.top && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[68px] w-[110px] h-[115px] z-20 pointer-events-none"
                      >
                        <svg viewBox="0 0 110 115" fill="#2563eb">
                          <path d="M 15,10 C 35,0 75,0 95,10 L 105,45 L 85,50 L 80,110 L 30,110 L 25,50 L 5,45 Z" />
                          <circle cx="55" cy="40" r="10" fill="#facc15" />
                          <path d="M 50,40 L 60,40 L 55,30 Z" fill="#000" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Bottom Shorts Layer */}
                    {equippedItems.shorts && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[162px] w-[90px] h-[65px] z-19 pointer-events-none"
                      >
                        <svg viewBox="0 0 90 65" fill="#18181b">
                          <path d="M 10,0 L 80,0 L 85,55 L 50,55 L 45,20 L 40,55 L 5,55 Z" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Shoes Layer */}
                    {equippedItems.shoes && (
                      <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[28px] left-[55px] w-[35px] h-[22px] z-20 pointer-events-none">
                          <svg viewBox="0 0 50 30" fill="#f43f5e">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[28px] right-[55px] w-[35px] h-[22px] z-20 pointer-events-none">
                          <svg viewBox="0 0 50 30" fill="#f43f5e" className="scale-x-[-1] origin-center">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </motion.div>
                      </>
                    )}
                  </div>

                  <div className="w-full bg-zinc-900 text-white rounded-2xl p-4 flex justify-between items-center text-xs font-mono">
                    <span className="font-extrabold text-orange-500">Live fitting complete</span>
                    <span>Ready to checkout</span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {viewMode === "rotate" && (
            <motion.div
              key="rotate-360"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {/* Back navigation buttons */}
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => setViewMode("drip")}
                  className="flex items-center gap-2 text-xs font-mono font-black uppercase text-[#f05a28] hover:text-orange-650 transition-colors border-none bg-transparent cursor-pointer font-bold"
                >
                  ← Back to Fitting Lab
                </button>
                <button
                  onClick={() => setViewMode("pdp")}
                  className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-500 hover:text-black transition-colors border-none bg-transparent cursor-pointer"
                >
                  Product Details ×
                </button>
              </div>
              
              {/* Rotation Canvas Container (Step 4) */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-[32px] p-8 flex flex-col items-center justify-center relative shadow-sm min-h-[500px]">
                
                {/* 360° Instructions header */}
                <div className="text-center space-y-1.5 select-none mb-6">
                  <span className="inline-flex items-center gap-1 bg-yellow-400 text-black font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-xs">
                    <RotateCw className="w-3 h-3 animate-spin" /> Interactive 3D Rotation
                  </span>
                  <h3 className="text-2xl font-black uppercase text-zinc-950 font-sans tracking-tight">Mannequin 360 Viewer</h3>
                  <p className="text-xs text-zinc-500 font-mono">Click and drag horizontally to spin the model and review outfit custom fitting.</p>
                </div>

                {/* 360° interactive drag viewport */}
                <div 
                  className="relative w-80 h-[380px] flex items-center justify-center cursor-ew-resize overflow-hidden border border-zinc-200/60 bg-white rounded-2xl shadow-inner select-none"
                  onMouseDown={(e) => handleDragStart(e.clientX)}
                  onMouseMove={(e) => handleDragMove(e.clientX)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                  onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                  onTouchEnd={handleDragEnd}
                >
                  
                  {/* Real-time 3D CSS Perspective Transform Box */}
                  <div 
                    style={{
                      perspective: "800px",
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${rotationAngle}deg)`,
                      transition: isDraggingRef.current ? "none" : "transform 0.3s cubic-bezier(0.1, 0.8, 0.3, 1)"
                    }}
                    className="relative w-64 h-[320px] flex items-center justify-center"
                  >
                    
                    {/* Athletic Mannequin Body Vector */}
                    <svg className="w-full h-full text-zinc-300" viewBox="0 0 200 400" fill="currentColor">
                      <circle cx="100" cy="50" r="18" fill="#d4d4d8" />
                      <rect x="96" y="68" width="8" height="10" fill="#c4c4c7" />
                      <path d="M 80,78 L 120,78 L 125,180 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 78,78 L 65,170 L 58,170 L 68,78 Z" fill="#c4c4c7" />
                      <path d="M 122,78 L 135,170 L 142,170 L 132,78 Z" fill="#c4c4c7" />
                      <path d="M 78,180 L 85,320 L 75,320 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 122,180 L 115,320 L 125,320 L 125,180 Z" fill="#d4d4d8" />
                      <path d="M 75,320 L 65,335 C 65,335 85,335 85,335 Z" fill="#b4b4b7" />
                      <path d="M 125,320 L 135,335 C 135,335 115,335 115,335 Z" fill="#b4b4b7" />
                    </svg>

                    {/* Cap Overlay (Rotates in 3D space with the body!) */}
                    {equippedItems.cap && (
                      <div className="absolute top-[8px] w-[50px] h-[25px] z-20 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                        <svg viewBox="0 0 100 50" fill="#1e3a8a">
                          <path d="M 10,40 C 20,10 80,10 90,40 C 90,40 100,45 100,40 L 70,30 L 10,40 Z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Top T-Shirt (Rotates in 3D space with the body!) */}
                    {equippedItems.top && (
                      <div className="absolute top-[60px] w-[110px] h-[115px] z-20 pointer-events-none" style={{ transform: "translateZ(8px)" }}>
                        <svg viewBox="0 0 110 115" fill="#2563eb">
                          <path d="M 15,10 C 35,0 75,0 95,10 L 105,45 L 85,50 L 80,110 L 30,110 L 25,50 L 5,45 Z" />
                          <circle cx="55" cy="40" r="10" fill="#facc15" />
                          <path d="M 50,40 L 60,40 L 55,30 Z" fill="#000" />
                        </svg>
                      </div>
                    )}

                    {/* Shorts (Rotates in 3D space with the body!) */}
                    {equippedItems.shorts && (
                      <div className="absolute top-[152px] w-[90px] h-[65px] z-19 pointer-events-none" style={{ transform: "translateZ(6px)" }}>
                        <svg viewBox="0 0 90 65" fill="#18181b">
                          <path d="M 10,0 L 80,0 L 85,55 L 50,55 L 45,20 L 40,55 L 5,55 Z" />
                        </svg>
                      </div>
                    )}

                    {/* Shoes (Rotates in 3D space with the body!) */}
                    {equippedItems.shoes && (
                      <>
                        <div className="absolute bottom-[22px] left-[55px] w-[35px] h-[22px] z-20 pointer-events-none" style={{ transform: "translateZ(12px)" }}>
                          <svg viewBox="0 0 50 30" fill="#f43f5e">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-[22px] right-[55px] w-[35px] h-[22px] z-20 pointer-events-none" style={{ transform: "translateZ(12px)" }}>
                          <svg viewBox="0 0 50 30" fill="#f43f5e" className="scale-x-[-1] origin-center">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </div>
                      </>
                    )}

                  </div>

                </div>

                {/* 360° status indicator tag */}
                <div className="mt-4 flex gap-1 items-center text-[10px] text-zinc-400 font-mono">
                  <span>Current Angle: {Math.round(rotationAngle)}°</span>
                  <span>&bull;</span>
                  <span>Drag left or right</span>
                </div>

              </div>

              {/* Exact matching bottom details tabs (Figma Screen 4 tabs) */}
              <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden p-6 sm:p-8 text-left space-y-6">
                
                {/* Tabs selection header */}
                <div className="flex border-b border-zinc-150 pb-3 gap-6 font-sans text-xs font-black uppercase tracking-widest text-zinc-500">
                  <button 
                    onClick={() => setActiveInfoTab("story")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "story" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Product Story
                  </button>
                  <button 
                    onClick={() => setActiveInfoTab("fit")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "fit" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Size & Fit
                  </button>
                  <button 
                    onClick={() => setActiveInfoTab("features")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "features" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Core Features
                  </button>
                </div>

                {/* Active Tab Panel */}
                <div className="text-xs text-zinc-500 leading-relaxed font-sans min-h-[100px]">
                  {activeInfoTab === "story" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <p>
                        The Puma Scuderia Ferrari Heritage Zip Sweatshirt pays homage to vintage motorsport racing. Inspired directly by the team wear worn on the tracks in Maranello during the golden age of grand prix racing, it features classic badges and colorblocking panels.
                      </p>
                      <p className="font-mono text-[10px] text-zinc-400">
                        Design archives catalog: Ferrari Heritage teamwear.
                      </p>
                    </div>
                  )}
                  {activeInfoTab === "fit" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <p>
                        This sweatshirt is cut with a relaxed, dropped-shoulder fit reminiscent of classic 90s streetwear. We recommend buying your standard size for the intended relaxed fit, or sizing down if you prefer a regular regular profile.
                      </p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Model is wearing size M (Height: 6'1", Chest: 40")</li>
                        <li>Ribbed hem and cuffs to maintain structure</li>
                      </ul>
                    </div>
                  )}
                  {activeInfoTab === "features" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-zinc-900 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Heavyweight Comfort</strong>
                          <span>Constructed with a premium double-knit cotton blend structure for lasting warmth.</span>
                        </div>
                        <div>
                          <strong className="text-zinc-900 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Motorsport Accents</strong>
                          <span>Features officially licensed Scuderia Ferrari crest and sponsor embroidered details on the sleeves.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Recently Viewed section for standard e-commerce page structure */}
        <div className="mt-20 pt-10 border-t border-zinc-150 text-left">
          <h2 className="text-xl font-black uppercase text-zinc-955 tracking-tight mb-8">Recently Viewed Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {masterProducts.slice(0, 4).map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  window.location.href = `/product/${p.id}`;
                }}
                className="group cursor-pointer flex flex-col justify-between bg-white border border-zinc-150 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative w-full aspect-[4/5] bg-zinc-50 rounded-xl overflow-hidden mb-3">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-103 transition-transform" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{p.brand}</span>
                  <h4 className="text-xs font-extrabold text-zinc-900 mt-1 line-clamp-1 group-hover:text-[#f05a28] transition-colors">{p.name}</h4>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-50 font-mono text-xs">
                  <strong className="text-zinc-950 font-black">{p.price}</strong>
                  <span className="text-[10px] text-zinc-450 uppercase">{p.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
