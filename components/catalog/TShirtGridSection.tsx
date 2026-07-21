"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  rating: number;
  color: "Red" | "Blue" | "Green" | "Black" | "White";
  gender: "Men" | "Women" | "Boys" | "Girls" | "Kids";
  category: "Top Wear" | "Bottom Wear" | "Caps";
  discount: number; // percentage discount (e.g., 20)
  sizes: ("S" | "M" | "L" | "XL" | "XXL")[];
  image: string;
}

interface TShirtGridSectionProps {
  onAddToCart: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
  selectedSubCategory?: string | null;
  onClearSubCategory?: () => void;
  searchQuery?: string;
}

const productsData: Product[] = [
  // Red Top Wear
  { id: 201, brand: "Drip Hustler", name: "Red Classic Oversized Tee", price: "₹999", rating: 4.8, color: "Red", gender: "Men", category: "Top Wear", discount: 20, sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
  { id: 202, brand: "Burberry London", name: "Red Crest Regular Fit Tee", price: "₹1,499", rating: 4.5, color: "Red", gender: "Men", category: "Top Wear", discount: 15, sizes: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80" },
  { id: 203, brand: "Stüssy Beach", name: "Red Stock Logo Tee", price: "₹1,199", rating: 4.7, color: "Red", gender: "Boys", category: "Top Wear", discount: 30, sizes: ["S", "M", "XL"], image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 204, brand: "Essentials Co.", name: "Red Core Crewneck Tee", price: "₹899", rating: 4.2, color: "Red", gender: "Men", category: "Top Wear", discount: 10, sizes: ["L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80" },
  { id: 205, brand: "Bape Streetwear", name: "Red Ape Head Graphic Tee", price: "₹1,999", rating: 4.9, color: "Red", gender: "Boys", category: "Top Wear", discount: 50, sizes: ["S", "L", "XXL"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
  
  { id: 206, brand: "Drip Hustler", name: "Red Signature Logo Tee", price: "₹999", rating: 4.6, color: "Red", gender: "Men", category: "Top Wear", discount: 25, sizes: ["M", "L"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80" },
  { id: 207, brand: "Burberry London", name: "Red Embroidered Icon Tee", price: "₹1,599", rating: 4.4, color: "Red", gender: "Women", category: "Top Wear", discount: 10, sizes: ["S", "XL"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80" },
  { id: 208, brand: "Stüssy Beach", name: "Red 8-Ball Street Tee", price: "₹1,249", rating: 4.8, color: "Red", gender: "Kids", category: "Top Wear", discount: 40, sizes: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80" },
  { id: 209, brand: "Essentials Co.", name: "Red Relaxed Boxy Fit Tee", price: "₹949", rating: 4.3, color: "Red", gender: "Girls", category: "Top Wear", discount: 10, sizes: ["L", "XXL"], image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80" },
  { id: 210, brand: "Bape Streetwear", name: "Red Camo College Tee", price: "₹2,199", rating: 4.9, color: "Red", gender: "Boys", category: "Top Wear", discount: 15, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80" },

  // Red Caps
  { id: 231, brand: "Burberry London", name: "Red Utility Snapback Cap", price: "₹499", rating: 4.6, color: "Red", gender: "Men", category: "Caps", discount: 10, sizes: ["M", "L"], image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80" },
  { id: 232, brand: "Stüssy Beach", name: "Red Knit Beanie Hat", price: "₹399", rating: 4.8, color: "Red", gender: "Kids", category: "Caps", discount: 20, sizes: ["S", "M"], image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=400&q=80" },

  // Red Bottom Wear
  { id: 241, brand: "Drip Hustler", name: "Red Tactical Cargo Pants", price: "₹1,899", rating: 4.7, color: "Red", gender: "Men", category: "Bottom Wear", discount: 30, sizes: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80" },
  { id: 242, brand: "Essentials Co.", name: "Red Relaxed Sweatpants", price: "₹1,299", rating: 4.4, color: "Red", gender: "Women", category: "Bottom Wear", discount: 20, sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80" },

  // Blue
  { id: 211, brand: "Drip Hustler", name: "Blue Classic Oversized Tee", price: "₹999", rating: 4.7, color: "Blue", gender: "Men", category: "Top Wear", discount: 20, sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 212, brand: "Stüssy Beach", name: "Blue Stock Logo Tee", price: "₹1,199", rating: 4.8, color: "Blue", gender: "Boys", category: "Top Wear", discount: 10, sizes: ["M", "XL"], image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },

  // Green
  { id: 213, brand: "Burberry London", name: "Green Regular Fit Tee", price: "₹1,499", rating: 4.5, color: "Green", gender: "Men", category: "Top Wear", discount: 15, sizes: ["L", "XL"], image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80" },
  { id: 214, brand: "Bape Streetwear", name: "Green Camo College Tee", price: "₹2,199", rating: 4.9, color: "Green", gender: "Boys", category: "Top Wear", discount: 20, sizes: ["S", "M"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },

  // Black
  { id: 215, brand: "Drip Hustler", name: "Black Signature Logo Tee", price: "₹999", rating: 4.8, color: "Black", gender: "Men", category: "Top Wear", discount: 30, sizes: ["M", "L", "XXL"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80" },
  { id: 216, brand: "Essentials Co.", name: "Black Core Crewneck Tee", price: "₹899", rating: 4.4, color: "Black", sizes: ["S", "XL"], gender: "Kids", category: "Top Wear", discount: 10, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80" },

  // White
  { id: 217, brand: "Stüssy Beach", name: "White 8-Ball Street Tee", price: "₹1,249", rating: 4.7, color: "White", gender: "Kids", category: "Top Wear", discount: 25, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80" },
  { id: 218, brand: "Burberry London", name: "White Crest Regular Tee", price: "₹1,499", rating: 4.6, color: "White", gender: "Women", category: "Top Wear", discount: 15, sizes: ["M", "L"], image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80" }
];

export function TShirtGridSection({ 
  onAddToCart,
  selectedSubCategory,
  onClearSubCategory,
  searchQuery = ""
}: TShirtGridSectionProps) {
  // Sidebar tab control
  const [activeFilterTab, setActiveFilterTab] = useState<string>("Gender");

  // Temporary States (updated in sidebar before user clicks APPLY)
  const [tempGender, setTempGender] = useState<string>("Men");
  const [tempCategories, setTempCategories] = useState<string[]>(["Top Wear"]);
  const [tempBrands, setTempBrands] = useState<string[]>([]);
  const [tempPriceTier, setTempPriceTier] = useState<string>("all");
  const [tempRatings, setTempRatings] = useState<number[]>([]);
  const [tempDiscounts, setTempDiscounts] = useState<number[]>([]);
  const [tempColors, setTempColors] = useState<string[]>(["Red"]);

  // Applied States (actually used for grid filtering)
  const [appliedGender, setAppliedGender] = useState<string>("Men");
  const [appliedCategories, setAppliedCategories] = useState<string[]>(["Top Wear"]);
  const [appliedBrands, setAppliedBrands] = useState<string[]>([]);
  const [appliedPriceTier, setAppliedPriceTier] = useState<string>("all");
  const [appliedRatings, setAppliedRatings] = useState<number[]>([]);
  const [appliedDiscounts, setAppliedDiscounts] = useState<number[]>([]);
  const [appliedColors, setAppliedColors] = useState<string[]>(["Red"]);

  // Global search & sort state
  const [sortOrder, setSortOrder] = useState<string>("Recommended");
  const itemsPerPage = 8; // 2 rows of 4 cards

  // Search within categories
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");

  // Toggle helpers for temporary filters
  const handleTempCategoryToggle = (cat: string) => {
    setTempCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleTempBrandToggle = (brand: string) => {
    setTempBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleTempColorToggle = (color: string) => {
    setTempColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleTempRatingToggle = (rate: number) => {
    setTempRatings(prev => 
      prev.includes(rate) ? prev.filter(r => r !== rate) : [...prev, rate]
    );
  };

  const handleTempDiscountToggle = (disc: number) => {
    setTempDiscounts(prev => 
      prev.includes(disc) ? prev.filter(d => d !== disc) : [...prev, disc]
    );
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by text search query from navbar
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    // Filter by selected subcategory (from CategorySelector)
    if (selectedSubCategory) {
      const sub = selectedSubCategory.toLowerCase();
      result = result.filter(p => {
        const name = p.name.toLowerCase();
        const brand = p.brand.toLowerCase();
        
        if (sub.includes("tee") || sub.includes("t-shirt")) {
          return name.includes("tee") || name.includes("t-shirt");
        }
        if (sub.includes("hoodie")) {
          return name.includes("hoodie");
        }
        if (sub.includes("shirt")) {
          return name.includes("shirt");
        }
        if (sub.includes("vest")) {
          return name.includes("vest");
        }
        if (sub.includes("sweater") || sub.includes("crewneck")) {
          return name.includes("sweater") || name.includes("crewneck");
        }
        if (sub.includes("cargo")) {
          return name.includes("cargo");
        }
        if (sub.includes("shorts")) {
          return name.includes("shorts") || name.includes("short");
        }
        if (sub.includes("denim") || sub.includes("jeans")) {
          return name.includes("denim") || name.includes("jeans");
        }
        if (sub.includes("sweatpants")) {
          return name.includes("sweatpants") || name.includes("pants");
        }
        if (sub.includes("jogger")) {
          return name.includes("jogger");
        }
        if (sub.includes("cap") || sub.includes("beanie") || sub.includes("shades") || sub.includes("bag") || sub.includes("socks") || sub.includes("utility")) {
          return p.category === "Caps" || name.includes("cap") || name.includes("beanie") || name.includes("shades") || name.includes("bag") || name.includes("socks") || name.includes("utility") || name.includes("hat");
        }
        return name.includes(sub) || brand.includes(sub);
      });
    }

    // Gender
    if (appliedGender) {
      result = result.filter(p => p.gender === appliedGender || p.gender === "Kids");
    }

    // Categories
    if (appliedCategories.length > 0) {
      result = result.filter(p => appliedCategories.includes(p.category));
    }

    // Colors
    if (appliedColors.length > 0) {
      result = result.filter(p => appliedColors.includes(p.color));
    }

    // Brands
    if (appliedBrands.length > 0) {
      result = result.filter(p => appliedBrands.includes(p.brand));
    }

    // Ratings (Minimum threshold)
    if (appliedRatings.length > 0) {
      result = result.filter(p => {
        return appliedRatings.some(r => p.rating >= r);
      });
    }

    // Discounts
    if (appliedDiscounts.length > 0) {
      result = result.filter(p => {
        return appliedDiscounts.some(d => p.discount >= d);
      });
    }

    // Price Tiers
    if (appliedPriceTier !== "all") {
      result = result.filter(p => {
        const val = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
        if (appliedPriceTier === "below-500") return val < 500;
        if (appliedPriceTier === "501-1000") return val >= 501 && val <= 1000;
        if (appliedPriceTier === "1001-2000") return val >= 1001 && val <= 2000;
        if (appliedPriceTier === "above-2001") return val > 2000;
        return true;
      });
    }

    // Sort order
    if (sortOrder === "Price: Low to High") {
      result.sort((a, b) => {
        const ap = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const bp = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return ap - bp;
      });
    } else if (sortOrder === "Price: High to Low") {
      result.sort((a, b) => {
        const ap = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const bp = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return bp - ap;
      });
    } else if (sortOrder === "Ratings") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [appliedGender, appliedCategories, appliedColors, appliedBrands, appliedRatings, appliedDiscounts, appliedPriceTier, sortOrder, selectedSubCategory, searchQuery]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    canPrev,
    canNext,
    pageNumbers,
  } = usePagination<Product>({
    items: filteredProducts,
    itemsPerPage,
    scrollToTopId: "tshirt-grid",
  });

  // APPLY and CLOSE buttons handlers
  const handleApplyFilters = () => {
    setAppliedGender(tempGender);
    setAppliedCategories(tempCategories);
    setAppliedBrands(tempBrands);
    setAppliedPriceTier(tempPriceTier);
    setAppliedRatings(tempRatings);
    setAppliedDiscounts(tempDiscounts);
    setAppliedColors(tempColors);
    goToPage(1);
    alert("Filters applied successfully!");
  };

  const handleCloseOrReset = () => {
    // Reset temporary filters to baseline defaults
    setTempGender("Men");
    setTempCategories(["Top Wear"]);
    setTempBrands([]);
    setTempPriceTier("all");
    setTempRatings([]);
    setTempDiscounts([]);
    setTempColors(["Red"]);
    
    // Copy to applied
    setAppliedGender("Men");
    setAppliedCategories(["Top Wear"]);
    setAppliedBrands([]);
    setAppliedPriceTier("all");
    setAppliedRatings([]);
    setAppliedDiscounts([]);
    setAppliedColors(["Red"]);
    goToPage(1);
    alert("Filters reset to defaults!");
  };

  return (
    <section id="tshirt-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none font-sans bg-white text-black">
      
      {/* 1. Static Path Banner */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-500 py-3.5 border-b border-zinc-100 mb-6">
        <div className="flex items-center gap-1.5 font-sans font-semibold">
          <span>Home</span>
          <span className="text-zinc-300">/</span>
          <span>Clothes</span>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-950 font-bold">Men</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-bold text-xs uppercase tracking-wide">Sort by:</span>
          <select 
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              goToPage(1);
            }}
            className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-black text-zinc-800 outline-none focus:border-zinc-500 cursor-pointer"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Ratings</option>
          </select>
        </div>
      </div>

      {/* 2. Section Title & Banner */}
      <div className="relative rounded-3xl overflow-hidden h-44 sm:h-56 flex flex-col items-center justify-center text-center p-6 mb-8">
        <Image
          src="/images/tshirt_collage_banner.png"
          alt="T-Shirt Collage Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
        <div className="relative z-10 text-white max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest font-mono text-[#ebd26b]">
            T-Shirt
          </h2>
          <p className="text-[10px] sm:text-xs text-zinc-250 mt-3 font-semibold leading-relaxed tracking-wider uppercase">
            Elevate your streetwear drip with our curated selection of premium oversized and graphic red tees.
          </p>
        </div>
      </div>

      {/* Main Layout: Grid (3/4 width) & Tabbed Accordion Filter Sidebar (1/4 width) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Product Grid */}
        <div className="flex-grow w-full lg:w-3/4 order-2 lg:order-1">
          
          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-zinc-50/50 p-4 border border-zinc-150 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mr-2">Active filters:</span>
              
              {selectedSubCategory && (
                <span className="bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-[11px] font-extrabold flex items-center gap-1.5 uppercase animate-pulse">
                  Category: {selectedSubCategory}
                  <button 
                    onClick={() => {
                      if (onClearSubCategory) onClearSubCategory();
                    }}
                    className="ml-1 text-[10px] font-bold text-purple-500 hover:text-purple-800 focus:outline-none cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              )}

              <span className="bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase">
                Gender: {appliedGender}
              </span>

              {appliedColors.map(c => (
                <span key={c} className="bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1 text-[11px] font-extrabold flex items-center gap-1.5 uppercase">
                  Color: {c}
                </span>
              ))}

              {appliedCategories.map(c => (
                <span key={c} className="bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full px-3 py-1 text-[11px] font-extrabold">
                  {c}
                </span>
              ))}

              {appliedBrands.map(b => (
                <span key={b} className="bg-zinc-900 text-white border border-black rounded-full px-3 py-1 text-[11px] font-extrabold">
                  {b}
                </span>
              ))}

              {appliedRatings.map(r => (
                <span key={r} className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-3 py-1 text-[11px] font-extrabold">
                  ★ {r} & Up
                </span>
              ))}

              {appliedDiscounts.map(d => (
                <span key={d} className="bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-[11px] font-extrabold">
                  {d}% & Above
                </span>
              ))}

              {appliedPriceTier !== "all" && (
                <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase">
                  Price: {appliedPriceTier === "below-500" ? "Under ₹500" : appliedPriceTier === "501-1000" ? "₹501 - ₹1K" : appliedPriceTier === "1001-2000" ? "₹1K - ₹2K" : "Over ₹2K"}
                </span>
              )}

              <button onClick={handleCloseOrReset} className="text-[10px] text-zinc-450 hover:text-zinc-800 hover:underline font-extrabold cursor-pointer uppercase tracking-wider bg-transparent border-none">
                Reset
              </button>
            </div>
            <div className="text-xs font-bold text-zinc-450 uppercase tracking-widest">
              {filteredProducts.length} Items
            </div>
          </div>

          {/* Product Grid Layout */}
          {paginatedItems.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-3xl">
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">No matching products found.</p>
              <button onClick={handleCloseOrReset} className="mt-4 bg-zinc-950 text-[#ebd26b] px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-black transition-colors cursor-pointer border-none">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {paginatedItems.map((prod) => (
                <div 
                  key={prod.id}
                  className="group flex flex-col justify-between bg-white border border-zinc-100/80 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="cursor-pointer" onClick={() => window.location.href = `/product/${prod.id}`}>
                    <div className="relative w-full aspect-[4/5] bg-zinc-50 rounded-xl overflow-hidden mb-3">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="(max-w-768px) 150px, 220px"
                        className="object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      {prod.discount > 0 && (
                        <span className="absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded-md text-white uppercase bg-red-650 tracking-wider">
                          {prod.discount}% Off
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      <span>{prod.brand}</span>
                      <span className="flex items-center gap-0.5 text-zinc-500 font-sans font-bold">
                        <span className="text-yellow-500 text-xs">★</span> {prod.rating}
                      </span>
                    </div>

                    <h3 className="text-xs font-extrabold text-zinc-900 mt-1 mb-2 line-clamp-2 uppercase tracking-tight h-8 font-sans hover:text-orange-500 transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-50">
                      <span className="text-xs font-black text-zinc-950 font-mono">
                        {prod.price}
                      </span>
                      
                      <button
                        onClick={() => {
                          onAddToCart({
                            id: prod.id,
                            brand: prod.brand,
                            name: prod.name,
                            price: prod.price,
                            image: prod.image
                          });
                          alert(`${prod.name} added to cart!`);
                        }}
                        className="bg-zinc-950 hover:bg-black text-[#ebd26b] font-black text-[9px] uppercase tracking-wider px-3 py-2 rounded-xl cursor-pointer transition-colors border-none"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {/* Previous Button (disabled/hidden when on Page 1) */}
              <button 
                onClick={prevPage}
                disabled={!canPrev}
                className="px-3.5 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-zinc-700 flex items-center gap-1 border border-zinc-200 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Previous page"
              >
                &lt; Prev
              </button>
              
              {/* Page Number Buttons */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    currentPage === page 
                      ? "bg-[#f05a28] text-white border-[#f05a28] shadow-sm scale-105" 
                      : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button (disabled/hidden when on Last Page) */}
              <button 
                onClick={nextPage}
                disabled={!canNext}
                className="px-3.5 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-zinc-700 flex items-center gap-1 border border-zinc-200 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Next page"
              >
                Next &gt;
              </button>
            </div>
          )}

        </div>

        {/* Right: Vertical Tabbed Accordion Filter Sidebar (1/4 width) */}
        <div className="w-full lg:w-1/4 bg-white border border-zinc-200 rounded-3xl overflow-hidden order-1 lg:order-2 flex flex-col justify-between min-h-[460px] shadow-sm">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">Filters</h3>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">Tabbed Mode</span>
          </div>

          {/* Dual Column Container */}
          <div className="flex-grow flex h-[350px]">
            
            {/* Left Column: Vertical Category List tabs (zinc background) */}
            <div className="w-2/5 bg-zinc-100 border-r border-zinc-200 py-2 overflow-y-auto">
              {[
                "Gender",
                "Categories",
                "Brands",
                "Price",
                "Avg. Customer Review",
                "Discount Range",
                "Colors"
              ].map((tab) => {
                const isActive = activeFilterTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab)}
                    className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none ${
                      isActive 
                        ? "bg-white text-zinc-950 border-l-4 border-orange-500 font-black" 
                        : "bg-transparent text-zinc-500 hover:bg-zinc-200/50"
                    }`}
                  >
                    {tab === "Avg. Customer Review" ? "Rating" : tab === "Discount Range" ? "Discount" : tab}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Tab Content Pane (white background) */}
            <div className="w-3/5 p-4 overflow-y-auto bg-white flex flex-col gap-3">
              
              {/* Tab 1: Gender */}
              {activeFilterTab === "Gender" && (
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Select Gender</h4>
                  {["Men", "Women", "Boys", "Girls", "Kids"].map((g) => (
                    <label key={g} className="flex items-center gap-2.5 text-xs font-bold text-zinc-700 cursor-pointer select-none">
                      <input 
                        type="radio" 
                        name="genderFilter"
                        checked={tempGender === g}
                        onChange={() => setTempGender(g)}
                        className="w-4 h-4 rounded-full accent-orange-500 border-zinc-300"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Tab 2: Categories */}
              {activeFilterTab === "Categories" && (
                <div className="space-y-3 flex flex-col">
                  <div className="flex items-center border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50 mb-1">
                    <Search className="w-3 h-3 text-zinc-400 mr-1.5" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="bg-transparent outline-none text-[10px] w-full text-zinc-800"
                    />
                  </div>
                  
                  {["Top Wear", "Bottom Wear", "Caps"]
                    .filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()))
                    .map((cat) => {
                      const count = productsData.filter(p => p.category === cat).length;
                      return (
                        <label key={cat} className="flex items-center justify-between text-xs font-bold text-zinc-700 cursor-pointer select-none">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={tempCategories.includes(cat)}
                              onChange={() => handleTempCategoryToggle(cat)}
                              className="w-4 h-4 rounded accent-orange-500 border-zinc-350"
                            />
                            <span>{cat}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-mono">({count})</span>
                        </label>
                      );
                    })}
                </div>
              )}

              {/* Tab 3: Brands */}
              {activeFilterTab === "Brands" && (
                <div className="space-y-3 flex flex-col">
                  <div className="flex items-center border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50 mb-1">
                    <Search className="w-3 h-3 text-zinc-400 mr-1.5" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="bg-transparent outline-none text-[10px] w-full text-zinc-800"
                    />
                  </div>

                  {["Drip Hustler", "Burberry London", "Stüssy Beach", "Essentials Co.", "Bape Streetwear"]
                    .filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
                    .map((b) => {
                      const count = productsData.filter(p => p.brand === b).length;
                      return (
                        <label key={b} className="flex items-center justify-between text-xs font-bold text-zinc-700 cursor-pointer select-none">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={tempBrands.includes(b)}
                              onChange={() => handleTempBrandToggle(b)}
                              className="w-4 h-4 rounded accent-orange-500 border-zinc-350"
                            />
                            <span className="truncate max-w-[90px]">{b}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-mono">({count})</span>
                        </label>
                      );
                    })}
                </div>
              )}

              {/* Tab 4: Price */}
              {activeFilterTab === "Price" && (
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Price Tiers</h4>
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "Less than ₹500", value: "below-500" },
                    { label: "₹501 - ₹1000", value: "501-1000" },
                    { label: "₹1001 - ₹2000", value: "1001-2000" },
                    { label: "More than ₹2001", value: "above-2001" }
                  ].map((tier) => (
                    <label key={tier.value} className="flex items-center gap-2.5 text-xs font-bold text-zinc-700 cursor-pointer select-none">
                      <input 
                        type="radio" 
                        name="priceTierFilter"
                        checked={tempPriceTier === tier.value}
                        onChange={() => setTempPriceTier(tier.value)}
                        className="w-4 h-4 rounded-full accent-orange-500 border-zinc-300"
                      />
                      <span>{tier.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Tab 5: Avg. Customer Review */}
              {activeFilterTab === "Avg. Customer Review" && (
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Ratings</h4>
                  {[4.8, 4.5, 4.0].map((rate) => (
                    <label key={rate} className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={tempRatings.includes(rate)}
                        onChange={() => handleTempRatingToggle(rate)}
                        className="w-4 h-4 rounded accent-orange-500 border-zinc-350"
                      />
                      <span className="flex items-center gap-1.5">
                        <span className="text-yellow-500">★</span>
                        <span>{rate} & Up</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Tab 6: Discount Range */}
              {activeFilterTab === "Discount Range" && (
                <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Discount Range</h4>
                  {[10, 20, 30, 40, 50].map((disc) => (
                    <label key={disc} className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={tempDiscounts.includes(disc)}
                        onChange={() => handleTempDiscountToggle(disc)}
                        className="w-4 h-4 rounded accent-orange-500 border-zinc-350"
                      />
                      <span>{disc}% and above</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Tab 7: Colors */}
              {activeFilterTab === "Colors" && (
                <div className="space-y-3 flex flex-col">
                  <div className="flex items-center border border-zinc-200 rounded-lg px-2 py-1 bg-zinc-50 mb-1">
                    <Search className="w-3 h-3 text-zinc-400 mr-1.5" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={colorSearch}
                      onChange={(e) => setColorSearch(e.target.value)}
                      className="bg-transparent outline-none text-[10px] w-full text-zinc-800"
                    />
                  </div>

                  {(["Red", "Blue", "Green", "Black", "White"] as const)
                    .filter(c => c.toLowerCase().includes(colorSearch.toLowerCase()))
                    .map((col) => {
                      const count = productsData.filter(p => p.color === col).length;
                      return (
                        <label key={col} className="flex items-center justify-between text-xs font-bold text-zinc-700 cursor-pointer select-none">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={tempColors.includes(col)}
                              onChange={() => handleTempColorToggle(col)}
                              className="w-4 h-4 rounded accent-orange-500 border-zinc-350"
                            />
                            <span className={`w-2.5 h-2.5 rounded-full border border-zinc-200 shadow-inner inline-block ${
                              col === "Red" ? "bg-red-600" :
                              col === "Blue" ? "bg-blue-600" :
                              col === "Green" ? "bg-green-600" :
                              col === "Black" ? "bg-black" : "bg-white"
                            }`} />
                            <span>{col}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-mono">({count})</span>
                        </label>
                      );
                    })}
                </div>
              )}

            </div>

          </div>

          {/* Footer applying CLOSE / APPLY actions */}
          <div className="border-t border-zinc-200 grid grid-cols-2 text-center text-xs font-black uppercase select-none tracking-widest bg-zinc-50">
            <button 
              onClick={handleCloseOrReset}
              className="py-4 hover:bg-zinc-100 text-zinc-500 font-bold tracking-widest hover:text-black transition-colors cursor-pointer border-none bg-transparent"
            >
              Close
            </button>
            <button 
              onClick={handleApplyFilters}
              className="py-4 bg-[#f05a28]/5 hover:bg-[#f05a28]/10 text-[#f05a28] font-black tracking-widest transition-colors cursor-pointer border-none border-l border-zinc-200"
            >
              Apply
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
