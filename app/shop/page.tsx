"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/ui/product-card";
import { StarRating } from "@/components/ui/star-rating";
import { Pagination } from "@/components/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";

import { 
  ShoppingBag, 
  Heart, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus
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

interface ProductItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  rating: number;
  discount?: string;
  color: string;
  gender: 'Men' | 'Women' | 'Boys' | 'Girls' | 'Kids';
  subcategory: 'T-shirts' | 'Sweatshirts' | 'Joggers';
  isSuggested?: boolean;
  isSoldOut?: boolean;
  reviewsCount?: number;
}

import { masterProducts } from "../product/[id]/data";

const products: ProductItem[] = masterProducts.map((p, index) => {
  const subcat = 
    p.category.toLowerCase().includes("top wear") || p.name.toLowerCase().includes("tee") || p.name.toLowerCase().includes("t-shirt") || p.name.toLowerCase().includes("shirt")
      ? "T-shirts" 
      : p.category.toLowerCase().includes("sweatshirt") || p.name.toLowerCase().includes("hoodie") || p.category.toLowerCase().includes("caps")
        ? "Sweatshirts" 
        : "Joggers";

  return {
    id: p.id,
    brand: p.brand || "SUPERVEK INDIA",
    name: p.name,
    price: p.price,
    image: p.image,
    rating: Math.round(p.rating),
    discount: p.discount > 0 ? `SAVE ${p.discount}%` : undefined,
    badge: index % 3 === 0 ? "OVERSIZE" : index % 4 === 0 ? "RELAXED FIT" : undefined,
    color: p.color,
    gender: (p.gender === "Boys" || p.gender === "Girls") ? "Kids" : p.gender as any,
    subcategory: subcat,
    isSuggested: p.color === "Black",
    isSoldOut: index === 3 || index === 7,
    reviewsCount: 7 + (index * 3) % 15,
  };
});

export default function ShopCatalog({ initialTab }: { initialTab?: string }) {
  // Global cart/wishlist sync state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [loginOpen, setLoginOpen] = useState(false);

  // Active sub-nav category selection
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // CHOOSE OPTIONS Side Drawer State
  const [selectedOptionsProduct, setSelectedOptionsProduct] = useState<ProductItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColorName, setSelectedColorName] = useState<string>("Black");
  const [selectedQty, setSelectedQty] = useState<number>(1);

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

  // Listen for search & brand URL parameter changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleUrlChange = () => {
        const params = new URLSearchParams(window.location.search);
        
        const searchParam = params.get("search");
        if (searchParam !== null) {
          setSearchQuery(searchParam);
        } else {
          setSearchQuery("");
        }

        const brandParam = params.get("brand");
        if (brandParam) {
          const matchedBrand = Array.from(new Set(products.map(p => p.brand)))
            .find(b => b.toLowerCase() === brandParam.toLowerCase());
          if (matchedBrand) {
            setSelectedBrands([matchedBrand]);
          }
        } else {
          setSelectedBrands([]);
        }
      };
      
      handleUrlChange();
      window.addEventListener("popstate", handleUrlChange);
      return () => window.removeEventListener("popstate", handleUrlChange);
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

  // Sorting state
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter selection states
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Accordion open/close states
  const [productTypeOpen, setProductTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const toggleFilter = <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    setCurrentPage(1);
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // State-driven filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Sub-navbar category filter
      if (activeCategory !== "All" && activeCategory !== "SALE") {
        if (activeCategory === "T-SHIRTS" && product.subcategory !== "T-shirts") return false;
        if (activeCategory === "HOODIES" && product.subcategory !== "Sweatshirts") return false;
      }
      if (activeCategory === "SALE" && !product.discount) return false;

      // Search Query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Gender Filters
      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
        return false;
      }
      // Subcategories Filters
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
        return false;
      }
      // Brand Filters
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Ratings Filters
      if (selectedRatings.length > 0 && !selectedRatings.includes(product.rating)) {
        return false;
      }
      // Colors Filters
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
        return false;
      }
      // Availability Filter
      if (inStockOnly && product.isSoldOut) {
        return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery, selectedGenders, selectedSubcategories, selectedBrands, selectedRatings, selectedColors, inStockOnly]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === 'price-low') {
      return arr.sort((a, b) => {
        const valA = parseFloat(a.price.replace('$', '').replace('Rs. ', '').replace(',', '')) || 0;
        const valB = parseFloat(b.price.replace('$', '').replace('Rs. ', '').replace(',', '')) || 0;
        return valA - valB;
      });
    }
    if (sortBy === 'price-high') {
      return arr.sort((a, b) => {
        const valA = parseFloat(a.price.replace('$', '').replace('Rs. ', '').replace(',', '')) || 0;
        const valB = parseFloat(b.price.replace('$', '').replace('Rs. ', '').replace(',', '')) || 0;
        return valB - valA;
      });
    }
    if (sortBy === 'rating') {
      return arr.sort((a, b) => b.rating - a.rating);
    }
    return arr; // Featured / default
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedCatalogList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  // Cart operations
  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
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

  const handleToggleFavorite = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setWishlist((prevWishlist) => {
      const isFav = prevWishlist.some((item) => item.id === product.id);
      if (isFav) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, { id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image }];
    });
  };

  const openChooseOptions = (product: ProductItem) => {
    setSelectedOptionsProduct(product);
    setSelectedSize("M");
    setSelectedColorName("Black");
    setSelectedQty(1);
  };

  const colorOptions = [
    { name: "Black", bg: "#000000" },
    { name: "White", bg: "#ffffff" },
    { name: "Blue", bg: "#2563eb" },
    { name: "Red", bg: "#dc2626" },
    { name: "Yellow", bg: "#eab308" },
    { name: "Green", bg: "#16a34a" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans selection:bg-[#facc15] selection:text-black relative">
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
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
      />

      <main className="flex-grow">
        
        {/* 1. TOP ANNOUNCEMENT PROMO BANNER */}
        <div className="bg-black text-[#facc15] text-[11px] font-mono font-black py-2 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2 border-b border-zinc-800">
          <span>⚡ Use PREF10 at the checkout to get 5% Off ⚡</span>
        </div>

        {/* 2. BREADCRUMBS & PAGE TITLE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
          <nav className="text-[11px] font-mono text-zinc-400 mb-2">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-zinc-800 font-bold">T-Shirts</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-zinc-950 font-sans">
            T-SHIRTS
          </h1>
        </div>

        {/* 3. VISUAL SUBCATEGORY CARDS ROW */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-6 justify-center max-w-md mx-auto">
            {/* Subcard 1: T-Shirts */}
            <div 
              onClick={() => setActiveCategory("T-SHIRTS")}
              className="group cursor-pointer text-center space-y-2"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm group-hover:shadow-md transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80"
                  alt="T-Shirts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 block font-mono">
                T-SHIRTS
              </span>
            </div>

            {/* Subcard 2: Hoodies & Sweatshirts */}
            <div 
              onClick={() => setActiveCategory("HOODIES")}
              className="group cursor-pointer text-center space-y-2"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm group-hover:shadow-md transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80"
                  alt="Hoodies & Sweatshirts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 block font-mono">
                HOODIES &amp; SWEATSHIRTS
              </span>
            </div>
          </div>
        </div>

        {/* 4. MAIN PRODUCTS & LEFT SIDEBAR FILTERS SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-zinc-200">
          
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-200 text-xs font-mono">
            <span className="text-zinc-600 font-bold">
              {sortedProducts.length} products
            </span>

            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-zinc-300 text-zinc-900 text-xs font-mono py-1.5 px-3 rounded-lg outline-none cursor-pointer focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 pt-8 items-start">
            
            {/* LEFT SIDEBAR FILTERS PANEL */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6 text-left">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-950 font-mono border-b border-zinc-200 pb-3">
                FILTERS
              </h2>

              {/* Accordion 1: Product type */}
              <div className="border-b border-zinc-200 pb-4 space-y-3">
                <button
                  onClick={() => setProductTypeOpen(!productTypeOpen)}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-zinc-900 cursor-pointer"
                >
                  <span>Product type</span>
                  {productTypeOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>

                {productTypeOpen && (
                  <div className="space-y-2 text-xs font-mono text-zinc-600 pt-1">
                    {['T-Shirt (24)', 'Hoodie (12)', 'Sweatshirt (8)', 'Sling Bag (15)'].map((pt) => (
                      <label key={pt} className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(pt.split(" ")[0])}
                          onChange={() => toggleFilter(pt.split(" ")[0], selectedSubcategories, setSelectedSubcategories)}
                          className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer"
                        />
                        <span>{pt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 2: Price */}
              <div className="border-b border-zinc-200 pb-4 space-y-3">
                <button
                  onClick={() => setPriceOpen(!priceOpen)}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-zinc-900 cursor-pointer"
                >
                  <span>Price</span>
                  {priceOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {priceOpen && (
                  <div className="text-xs font-mono text-zinc-500 pt-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="Rs. 0" className="w-1/2 p-2 border border-zinc-300 rounded text-xs" />
                      <span>to</span>
                      <input type="text" placeholder="Rs. 5,000" className="w-1/2 p-2 border border-zinc-300 rounded text-xs" />
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Color */}
              <div className="border-b border-zinc-200 pb-4 space-y-3">
                <button
                  onClick={() => setColorOpen(!colorOpen)}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-zinc-900 cursor-pointer"
                >
                  <span>Color</span>
                  {colorOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {colorOpen && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['#000000', '#ffffff', '#dc2626', '#2563eb', '#16a34a', '#eab308'].map((hex) => (
                      <span
                        key={hex}
                        style={{ backgroundColor: hex }}
                        className="w-6 h-6 rounded-full border border-zinc-300 cursor-pointer hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Availability */}
              <div className="border-b border-zinc-200 pb-4 space-y-3">
                <button
                  onClick={() => setAvailabilityOpen(!availabilityOpen)}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-zinc-900 cursor-pointer"
                >
                  <span>Availability</span>
                  {availabilityOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {availabilityOpen && (
                  <div className="space-y-2 text-xs font-mono text-zinc-600 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer"
                      />
                      <span>In stock only</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Accordion 5: Size */}
              <div className="border-b border-zinc-200 pb-4 space-y-3">
                <button
                  onClick={() => setSizeOpen(!sizeOpen)}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-zinc-900 cursor-pointer"
                >
                  <span>Size</span>
                  {sizeOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {sizeOpen && (
                  <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
                    {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
                      <button key={s} className="px-3 py-1 bg-zinc-100 hover:bg-black hover:text-white rounded border border-zinc-300 font-bold transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </aside>

            {/* RIGHT PRODUCT GRID (4 Columns Matching Screenshot 2) */}
            <div className="flex-grow space-y-12 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedCatalogList.map((product) => {
                  const isFav = wishlist.some(item => item.id === product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => openChooseOptions(product)}
                      className="group flex flex-col justify-between bg-white rounded-2xl p-3 border border-zinc-200 shadow-2xs hover:shadow-lg transition-all duration-300 text-left relative cursor-pointer"
                    >
                      <div>
                        {/* Image Container with Badges */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-zinc-50">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.isSoldOut ? (
                              <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">
                                SOLD OUT
                              </span>
                            ) : (
                              <>
                                {product.badge && (
                                  <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">
                                    {product.badge}
                                  </span>
                                )}
                                {product.discount && (
                                  <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">
                                    {product.discount}
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          {/* Quick View Hover Button */}
                          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openChooseOptions(product);
                              }}
                              className="w-full bg-white/90 hover:bg-white text-black font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg backdrop-blur-sm shadow-md transition-colors border-none"
                            >
                              Quick view
                            </button>
                          </div>
                        </div>

                        {/* Title, Star Ratings & Price */}
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-[#15803d] hover:text-[#0b4d26] transition-colors truncate">
                            {product.name}
                          </h3>

                          {/* Star Ratings */}
                          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-mono">
                            <span>★★★★★</span>
                            <span className="text-zinc-400 text-[10px]">({product.reviewsCount || 7} reviews)</span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 text-xs font-mono pt-0.5">
                            <span className="font-extrabold text-[#d92626]">{product.price}</span>
                            <span className="text-zinc-400 line-through text-[11px]">Rs. 2,499.00</span>
                          </div>

                          {/* Color Swatch Squares */}
                          <div className="flex items-center gap-1 pt-2">
                            <span className="w-3.5 h-3.5 bg-black rounded-xs border border-zinc-400 inline-block" />
                            <span className="w-3.5 h-3.5 bg-[#2563eb] rounded-xs border border-zinc-400 inline-block" />
                            <span className="w-3.5 h-3.5 bg-[#dc2626] rounded-xs border border-zinc-400 inline-block" />
                            <span className="w-3.5 h-3.5 bg-[#eab308] rounded-xs border border-zinc-400 inline-block" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="pt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 5. BOTTOM PROMO BANNERS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <a
              href="/shop?category=Bags"
              className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl group border border-zinc-200 block bg-zinc-900"
            >
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                alt="Level Up Your Carry Game! Shop Slingers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-left space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans leading-tight">
                  LEVEL UP YOUR CARRY GAME!
                </h3>
                <span className="text-xs font-mono font-black text-[#facc15] uppercase tracking-widest block">
                  SHOP SLINGERS &gt;
                </span>
              </div>
            </a>

            <a
              href="/shop?category=Wallets"
              className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl group border border-zinc-200 block bg-zinc-900"
            >
              <Image
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
                alt="Drip Wallets View Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-left space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans leading-tight">
                  DRIP WALLETS
                </h3>
                <span className="text-xs font-mono font-black text-[#facc15] uppercase tracking-widest block">
                  VIEW COLLECTION &gt;
                </span>
              </div>
            </a>

          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 6. "CHOOSE OPTIONS" SIDE DRAWER SLIDE-OVER MODAL (Matching Uploaded Image) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedOptionsProduct && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOptionsProduct(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Slide-over Right Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-white text-black min-h-screen shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto select-none"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                  <h2 className="text-base font-black uppercase tracking-wider font-mono text-zinc-950">
                    CHOOSE OPTIONS
                  </h2>
                  <button
                    onClick={() => setSelectedOptionsProduct(null)}
                    className="p-1 rounded-full text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer border-none"
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Product Summary Header Card */}
                <div className="flex gap-4 items-start text-left bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-zinc-200">
                    <Image
                      src={selectedOptionsProduct.image}
                      alt={selectedOptionsProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-wider block">
                      {selectedOptionsProduct.brand}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                      {selectedOptionsProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono pt-0.5">
                      <span className="font-extrabold text-[#d92626]">{selectedOptionsProduct.price}</span>
                      <span className="text-zinc-400 line-through text-xs">Rs. 2,499.00</span>
                    </div>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold font-mono text-zinc-700 block">
                    Size: <span className="text-black font-extrabold">{selectedSize}</span>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "XXL", "XXXL"].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[42px] py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? "bg-white border-2 border-black text-black shadow-xs font-black"
                            : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold font-mono text-zinc-700 block">
                    Color: <span className="text-black font-extrabold">{selectedColorName}</span>
                  </label>

                  <div className="flex items-center gap-2">
                    {colorOptions.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorName(c.name)}
                        style={{ backgroundColor: c.bg }}
                        className={`w-7 h-7 rounded-lg border transition-transform cursor-pointer relative ${
                          selectedColorName === c.name
                            ? "scale-110 ring-2 ring-black ring-offset-2 border-transparent"
                            : "border-zinc-300 opacity-90 hover:opacity-100"
                        }`}
                        title={c.name}
                      >
                        {selectedColorName === c.name && (
                          <div className={`absolute inset-0 flex items-center justify-center ${c.bg === "#ffffff" ? "text-black" : "text-white"}`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold font-mono text-zinc-700 block">
                    Quantity:
                  </label>

                  <div className="inline-flex items-center border border-zinc-300 rounded-xl bg-zinc-50 p-1">
                    <button
                      onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <span className="w-10 text-center text-xs font-mono font-extrabold text-black">
                      {selectedQty}
                    </span>
                    <button
                      onClick={() => setSelectedQty((prev) => prev + 1)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedOptionsProduct, selectedQty);
                      setSelectedOptionsProduct(null);
                      alert(`🛒 Added ${selectedQty}x ${selectedOptionsProduct.name} (${selectedSize} / ${selectedColorName}) to cart!`);
                    }}
                    className="w-full bg-[#d92626] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border-none"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedOptionsProduct, selectedQty);
                      setSelectedOptionsProduct(null);
                      window.location.href = "/checkout";
                    }}
                    className="w-full bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border-none"
                  >
                    BUY IT NOW
                  </button>
                </div>

                {/* View Details Link */}
                <div className="text-center pt-2">
                  <a
                    href={`/product/${selectedOptionsProduct.id}`}
                    className="text-xs font-mono text-zinc-500 hover:text-black underline uppercase tracking-wider transition-colors"
                  >
                    View details
                  </a>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Social Banner & Footer */}
      <Footer />
    </div>
  );
}
