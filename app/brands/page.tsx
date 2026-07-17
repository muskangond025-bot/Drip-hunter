"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Search,
  Filter,
  Compass,
  Tag,
  Globe
} from "lucide-react";

interface CartItem {/*  */
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

interface BrandProduct {
  name: string;
  image: string;
}

interface BrandItem {
  id: number;
  name: string;
  letter: string;
  category: 'Luxury' | 'Techwear' | 'Skate' | 'Archive';
  origin: string;
  founded: string;
  description: string;
  logoSvg: React.ReactNode;
  products: BrandProduct[];
}

// Mock list of top global streetwear brands with clean logo SVGs
const brandsList: BrandItem[] = [
  {
    id: 301,
    name: "ALMOST GODS",
    letter: "A",
    category: "Luxury",
    origin: "India",
    founded: "2018",
    description: "Indian art history meets oversized silhouettes and rich jacquards.",
    logoSvg: (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <Image
          src="/images/almost_gods_logo.png"
          alt="Almost Gods"
          fill
          className="object-contain"
        />
      </div>
    ),
    products: [
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80" },
      { name: "Hat", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&q=80" },
      { name: "Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 302,
    name: "ACRONYM",
    letter: "A",
    category: "Techwear",
    origin: "Germany",
    founded: "1999",
    description: "Uncompromising functional utility apparel and tactical streetwear design.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Industrial geometric logo */}
        <rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="4" />
        <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="2" />
        <rect x="42" y="42" width="16" height="16" fill="currentColor" />
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80" },
      { name: "Short", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 303,
    name: "A-COLD-WALL*",
    letter: "A",
    category: "Luxury",
    origin: "UK",
    founded: "2015",
    description: "Samuel Ross' material studies exploring architecture and social barriers.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ACW industrial rectangle block */}
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="5" />
        <rect x="35" y="35" width="30" height="10" fill="currentColor" />
        <text x="50" y="65" fill="currentColor" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ACW*</text>
      </svg>
    ),
    products: [
      { name: "Utility Vest", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80" },
      { name: "Track Pants", image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 304,
    name: "A BATHING APE",
    letter: "A",
    category: "Archive",
    origin: "Japan",
    founded: "1993",
    description: "Harajuku icon famous for camo patterns and the Ape Head insignia.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Camo Ape head silhouette */}
        <path d="M50 15 C30 15 25 35 25 50 C25 68 35 85 50 85 C65 85 75 68 75 50 C75 35 70 15 50 15 Z" fill="#27272a" />
        <ellipse cx="40" cy="45" rx="4" ry="7" fill="currentColor" />
        <ellipse cx="60" cy="45" rx="4" ry="7" fill="currentColor" />
        <path d="M42 62 C45 68 55 68 58 62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    products: [
      { name: "Camo Jacket", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300&q=80" },
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 305,
    name: "BLUE BREW",
    letter: "B",
    category: "Skate",
    origin: "US",
    founded: "2020",
    description: "Artisan distressed denim washes and vintage skate wear elements.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Denim wave banner */}
        <path d="M20 30 Q50 60 80 30 Q50 90 20 30 Z" fill="#3b82f6" opacity="0.8" />
        <text x="50" y="80" fill="currentColor" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">BLUE BREW</text>
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=300&q=80" },
      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
      { name: "Sock", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 306,
    name: "BILLIONAIRE BOYS CLUB",
    letter: "B",
    category: "Archive",
    origin: "US",
    founded: "2003",
    description: "Pharrell Williams' legacy merging graphic streetwear with space themes.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Astronaut head contour */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <rect x="42" y="32" width="16" height="12" rx="3" fill="currentColor" />
        <path d="M35 60 C35 70 65 70 65 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    products: [
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
      { name: "Denim Pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 307,
    name: "BALENCIAGA",
    letter: "B",
    category: "Luxury",
    origin: "Italy",
    founded: "1919",
    description: "Oversized extreme couture proportions and cyber goth aesthetics.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bold minimal BB monogram */}
        <text x="50" y="60" fill="currentColor" fontSize="24" fontWeight="950" textAnchor="middle" fontFamily="sans-serif">BB</text>
        <line x1="20" y1="68" x2="80" y2="68" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    products: [
      { name: "Sneakers", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 308,
    name: "BRAIN DEAD",
    letter: "B",
    category: "Skate",
    origin: "US",
    founded: "2014",
    description: "Post-punk graphics, comics, and subculture-led collective design.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain profile outline */}
        <path d="M40 25 C55 10 75 25 70 45 C75 55 65 75 50 75 C40 75 30 65 30 50 C30 35 35 25 40 25 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M42 35 C48 38 52 38 58 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="55" r="6" fill="#a855f7" />
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 309,
    name: "CARHARTT WIP",
    letter: "C",
    category: "Skate",
    origin: "US",
    founded: "1989",
    description: "Robust workwear classics adapted for metropolitan skate cultures.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wave motif */}
        <path d="M30 45 Q50 20 70 45 T70 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="70" r="6" fill="#f59e0b" />
      </svg>
    ),
    products: [
      { name: "Work Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80" },
      { name: "Cargos", image: "https://images.unsplash.com/photo-1550928431-ee0ec6db1ad7?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 310,
    name: "CORTEIZ",
    letter: "C",
    category: "Archive",
    origin: "UK",
    founded: "2018",
    description: "London underground rule-breakers defined by guerrilla drops.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Alcatraz island outline symbol */}
        <rect x="25" y="35" width="50" height="30" rx="3" fill="#18181b" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="45" x2="70" y2="45" stroke="#ef4444" strokeWidth="2" />
        <line x1="30" y1="55" x2="70" y2="55" stroke="#ef4444" strokeWidth="2" />
      </svg>
    ),
    products: [
      { name: "Trackies", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80" },
      { name: "Knit Cap", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 311,
    name: "OFF-WHITE",
    letter: "O",
    category: "Luxury",
    origin: "Italy",
    founded: "2013",
    description: "Virgil Abloh's dialogue between high luxury and raw street diagnostics.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diagonal crossing stripes */}
        <path d="M20 20 L40 20 L20 40 Z" fill="currentColor" />
        <path d="M50 20 L70 20 L20 70 Z" fill="currentColor" />
        <path d="M80 20 L80 40 L40 80 L20 80 Z" fill="currentColor" />
        <path d="M80 50 L80 70 L70 80 L50 80 Z" fill="currentColor" />
      </svg>
    ),
    products: [
      { name: "Jacket", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300&q=80" },
      { name: "Belt", image: "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: 312,
    name: "SUPREME",
    letter: "S",
    category: "Archive",
    origin: "US",
    founded: "1994",
    description: "NYC skate box logo classic, driving global hype and collab archives.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red Box Logo */}
        <rect x="10" y="35" width="80" height="30" fill="#ef4444" rx="2" />
        <text x="50" y="55" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">Supreme</text>
      </svg>
    ),
    products: [
      { name: "Box Logo Tee", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=300&q=80" },
      { name: "Camp Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80" }
    ]
  }
];

export default function BrandsDirectory() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string>("ALL");

  const alphabet = ["ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"];

  const squareBrands = brandsList.slice(0, 4);
  const circleBrands = brandsList.slice(4, 8);

  // Cart / Wishlist Handlers
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

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Header */}
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Full-width Alphabet index row at the top of main content */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none w-full border-b border-zinc-100 justify-start md:justify-center font-mono mb-8">
          {alphabet.map((letter) => {
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`min-w-[32px] h-[32px] rounded-full text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center ${isActive
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                  }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Split container for Sidebar and Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT SIDEBAR PANEL */}
          <aside className="hidden md:flex md:w-52 flex-col space-y-6 shrink-0 select-none">
            {/* Card 1: Brand */}
            <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Brand</h3>
              <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                {["A-C", "D-F", "G-I", "J-L", "M-O", "P-R", "S-U", "V-X", "Y-Z", "#"].map((item) => (
                  <li key={item}>
                    <button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Tags */}
            <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Tags</h3>
              <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                {["New", "Sales", "Collabs", "Exclusive", "Rare"].map((item) => (
                  <li key={item}>
                    <button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Category */}
            <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Category</h3>
              <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                {["T-Shirt", "Hoodie", "Jacket", "Pants", "Shoes", "Accessories", "Others"].map((item) => (
                  <li key={item}>
                    <button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT MAIN PANEL */}
          <div className="flex-grow w-full">
            {/* Search Bar */}
            <div className="max-w-2xl mb-12">
              <div className="flex items-center border border-zinc-200 rounded-full px-4 py-2.5 bg-zinc-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition-all">
                <Search className="w-5 h-5 text-zinc-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-black placeholder-zinc-400"
                />
              </div>
            </div>

            {/* ==================== LAYOUT 1: MINIMAL GRID ==================== */}
            <div className="py-12 border-b border-zinc-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-chaney-title text-black">A</h2>
              </div>

              <div className="space-y-8 max-w-3xl">
                {/* Square cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {squareBrands.map((brand) => (
                    <div key={brand.id} className="aspect-square bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md p-4 hover:scale-102 transition-transform">
                      {brand.logoSvg}
                    </div>
                  ))}
                </div>

                {/* Circle cards (ac logo repeated 4 times matching mockup) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-md p-4 hover:scale-102 transition-transform relative overflow-hidden">
                      <Image
                        src="/images/ac_logo.png"
                        alt="ac logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== LAYOUT 2: GRID WITH DESCRIPTIONS ==================== */}
            <div className="py-12 border-b border-zinc-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-chaney-title text-black">A</h2>
              </div>

              <div className="space-y-12 max-w-3xl">
                {/* Square cards with description */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {squareBrands.map((brand) => (
                    <div key={brand.id} className="flex flex-col items-center text-center">
                      <div className="w-full aspect-square bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md p-4 mb-3">
                        {brand.logoSvg}
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">{brand.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-mono leading-tight max-w-[150px]">{brand.description}</p>
                    </div>
                  ))}
                </div>

                {/* Circle cards with description (ac logo repeated 4 times) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-md p-4 mb-3 relative overflow-hidden">
                        <Image
                          src="/images/ac_logo.png"
                          alt="ac logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">{circleBrands[0].name}</h4>
                      <p className="text-[9px] text-zinc-500 font-mono leading-tight max-w-[150px]">{circleBrands[0].description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==================== LAYOUT 3: ROW LIST ==================== */}
            <div className="py-12 border-b border-zinc-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-chaney-title text-black">A</h2>
              </div>

              <div className="max-w-3xl space-y-6">
                {[0, 1, 2, 3].map((idx) => {
                  const isEven = idx % 2 === 0;
                  const brand = isEven ? squareBrands[0] : circleBrands[0];
                  return (
                    <div key={idx} className="flex items-center gap-6 p-4 border border-zinc-200 rounded-2xl bg-white shadow-xs">
                      {isEven ? (
                        <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm">
                          {brand.logoSvg}
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-black bg-white flex-shrink-0 flex items-center justify-center shadow-sm relative overflow-hidden">
                          <Image
                            src="/images/ac_logo.png"
                            alt="ac logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold uppercase tracking-wide text-black">{brand.name}</h4>
                        <p className="text-xs text-zinc-500 font-mono leading-relaxed">{brand.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ==================== LAYOUT 4: PRODUCT SHOWCASE GRID ==================== */}
            <div className="py-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-chaney-title text-black">A</h2>
              </div>

              <div className="max-w-3xl space-y-12">

                {/* Row 1: ALMOST GODS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="scale-60">{squareBrands[0].logoSvg}</div>
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black">{squareBrands[0].name}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: "T-Shirt", image: "/images/mock_tee.png" },
                      { name: "Hat", image: "/images/mock_hat.png" },
                      { name: "Cap", image: "/images/mock_cap.png" },
                    ].map((prod, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: ACRONYM (Circle Logo) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <Image
                        src="/images/ac_logo.png"
                        alt="ac logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black">{circleBrands[0].name}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=300&q=80" },
                      { name: "Short", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=300&q=80" },
                    ].map((prod, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3: BRAIN DEAD (Square Logo) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="scale-60">{brandsList[7].logoSvg}</div>
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black">{brandsList[7].name}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=300&q=80" },
                      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
                    ].map((prod, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 4: BLUE BREW */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="scale-60">{brandsList[4].logoSvg}</div>
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black">{brandsList[4].name}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80" },
                      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80" },
                      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
                      { name: "Sock", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=300&q=80" },
                    ].map((prod, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" />
                        </div>
                        <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
