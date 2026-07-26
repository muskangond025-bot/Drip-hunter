"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Global layout components
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

// Curated outfit look data structure
interface LookProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CuratedLookItem {
  id: number;
  modelImage: string;
  title: string;
  desc: string;
  products: LookProduct[];
}

const curatedLooks: CuratedLookItem[] = [
  {
    id: 1,
    title: "Casual Core Suit",
    desc: "A sleek combination of dark navy linen shirts and minimal sandals for relaxed street style.",
    modelImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: 101,
        name: "Classic Mercer Shirt – Midnight Navy",
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 102,
        name: "Hermes Chypre Sandal (Beige Galet)",
        price: "₹98,878",
        image: "/images/sneaker-5.png"
      },
      {
        id: 103,
        name: "Linen Pants White",
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 104,
        name: "Tag Heuer Carrera War201d.Fc6291",
        price: "₹2,24,400",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: 2,
    title: "Stealth Techwear Outfit",
    desc: "An industrial look featuring heavy multi-pocket cargo utility pants and high-top sneakers.",
    modelImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: 201,
        name: "Air Jordan 5 RETRO Wolf Grey 2026",
        price: "₹18,954",
        image: "/images/sneaker-2.png"
      },
      {
        id: 202,
        name: "Cassette Cargo Pants [24 Exclusive]",
        price: "₹6,999",
        image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 203,
        name: "Royal Seikoak Skeleton Full Black",
        price: "₹20,279",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 204,
        name: "Forfksake Walkout Shirt",
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: 3,
    title: "Vaporwave Summer Kit",
    desc: "Neon highlights matched with breathable lightweight shorts and reflective eyewear.",
    modelImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: 301,
        name: "Airmax Heritage Red Premium Fit",
        price: "₹16,499",
        image: "/images/sneaker-1.png"
      },
      {
        id: 302,
        name: "Linen Drawstring Shorts White",
        price: "₹2,999",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 303,
        name: "Stealth Fly Future Grey Special",
        price: "₹22,999",
        image: "/images/sneaker-6.png"
      },
      {
        id: 304,
        name: "Cyber Aviator Polarized Glasses",
        price: "₹8,999",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];

export default function ShopTheLookPage() {
  // Local active shopping lists
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  
  // Search parameters states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (lookId: number) => {
    setIsLiked((prev) => {
      const active = !prev[lookId];
      if (active) {
        // Add model jacket to wishlist
        setWishlist((prevList) => [
          ...prevList,
          { id: lookId * 1000, brand: "Styled Outfit", name: `Curated Look Collection #${lookId}`, price: "₹20,000", image: curatedLooks.find(l => l.id === lookId)?.modelImage || "" }
        ]);
      } else {
        setWishlist((prevList) => prevList.filter((item) => item.id !== lookId * 1000));
      }
      return { ...prev, [lookId]: active };
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Added "${product.name}" to cart!`);
  };

  const handleGetThisLook = (look: CuratedLookItem) => {
    // Add all 4 products inside this outfit look to the cart
    look.products.forEach((prod) => {
      handleAddToCart({
        id: prod.id,
        brand: "Styled Outfit",
        name: prod.name,
        price: prod.price,
        image: prod.image
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 select-none">
      
      {/* 1. Global Navigation Navbar with correct state handlers */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Main Page Layout */}
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Breadcrumb & Go Back link */}
          <div className="mb-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-1 text-zinc-500 hover:text-black text-xs font-mono font-bold uppercase transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Page Heading */}
          <div className="text-left border-b border-zinc-200 pb-8 mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-zinc-900 tracking-tight uppercase leading-none mb-3">
              Shop the Look
            </h1>
            <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed font-sans font-medium">
              Explore streetwear style outfits compiled by our designers. Shop individual elements directly or tap the checkout CTA below each outfit block to buy the complete look instantly.
            </p>
          </div>

          {/* Outfit collections grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
            {curatedLooks.map((look) => (
              <div
                key={look.id}
                className="w-full rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
              >
                
                {/* Visual split layout body */}
                <div className="flex items-stretch min-h-[340px]">
                  
                  {/* Left Outfit Model Photo */}
                  <div className="relative w-[38%] border-r border-zinc-150 overflow-hidden">
                    <Image
                      src={look.modelImage}
                      alt={look.title}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                    {/* Floating Heart like trigger */}
                    <button
                      onClick={() => toggleLike(look.id)}
                      className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border border-zinc-150 flex items-center justify-center text-zinc-700 shadow-sm transition-all active:scale-90 cursor-pointer"
                    >
                      <Heart className={cn("w-4 h-4", isLiked[look.id] ? "fill-red-500 stroke-red-500" : "")} />
                    </button>
                  </div>

                  {/* Right Products items list */}
                  <div className="w-[62%] p-4 grid grid-cols-2 gap-3 items-start bg-zinc-50/20">
                    {look.products.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleAddToCart({
                          id: item.id,
                          brand: "Styled Outfit",
                          name: item.name,
                          price: item.price,
                          image: item.image
                        })}
                        className="group/product flex flex-col justify-between h-full cursor-pointer bg-white border border-zinc-150 hover:border-zinc-350 p-2 rounded-xl transition-all hover:shadow-xs"
                      >
                        {/* Square product thumb */}
                        <div className="relative aspect-square w-full bg-zinc-50/50 rounded-lg overflow-hidden flex items-center justify-center p-1.5 border border-zinc-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="85px"
                            className="object-contain transition-transform group-hover/product:scale-105"
                          />
                        </div>
                        
                        {/* Text labels */}
                        <div className="text-left mt-2 space-y-0.5">
                          <h4 className="text-[9px] font-sans font-bold text-zinc-800 tracking-tight leading-snug line-clamp-2 uppercase">
                            {item.name}
                          </h4>
                          <span className="text-[9px] font-mono font-black text-zinc-500 block">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom checkout full-width bar */}
                <button
                  onClick={() => handleGetThisLook(look)}
                  className="w-full py-4.5 bg-black hover:bg-zinc-850 text-white font-black uppercase text-[10px] tracking-widest transition-all cursor-pointer border-t border-zinc-200"
                >
                  Get this look
                </button>

              </div>
            ))}
          </div>

        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />

    </div>
  );
}
