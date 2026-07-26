"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Curated Look Data Structure matching the user's screenshot
interface LookProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CuratedLookItem {
  id: number;
  modelImage: string;
  products: LookProduct[];
}

const curatedLooks: CuratedLookItem[] = [
  {
    id: 1,
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
        name: "Cassette Cargo Pants [24 Exclusive - Limited]",
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

// Brand Teaser Item Data
interface BrandTeaserItem {
  id: number;
  brandName: string;
  title: string;
  image: string;
  tag: string;
}

const brandTeasers: BrandTeaserItem[] = [
  {
    id: 1,
    brandName: "PUMA SELECT",
    title: "The Clyde Capsule",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    tag: "Collab Teaser"
  },
  {
    id: 2,
    brandName: "RECKLESS DRIP",
    title: "Back In Stock Deal",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tag: "Trending"
  },
  {
    id: 3,
    brandName: "NEON DIVISION",
    title: "Cyber Shield Tech",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    tag: "Limited Drop"
  },
  {
    id: 4,
    brandName: "RETRO RULERS",
    title: "Heritage Bomber Kit",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
    tag: "Teaser Product"
  }
];

interface BrandCollabTeasersProps {
  onAddToCart?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
}

export function BrandCollabTeasers({ onAddToCart }: BrandCollabTeasersProps = {}) {
  const [hoveredLookCard, setHoveredLookCard] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (lookId: number) => {
    setIsLiked((prev) => ({ ...prev, [lookId]: !prev[lookId] }));
  };

  const handleGetThisLook = (look: CuratedLookItem) => {
    if (onAddToCart) {
      // Add the primary model look jacket/shoe to the cart
      onAddToCart({
        id: look.id * 1000,
        brand: "Styled Outfit",
        name: `Curated Look Collection #${look.id}`,
        price: look.products[0].price,
        image: look.modelImage
      });
    } else {
      alert(`Getting Look Collection #${look.id}!`);
    }
  };

  return (
    <section className="bg-zinc-50/60 py-20 border-t border-zinc-150 select-none">
      
      {/* ==================== 1. CURATED FOR YOU (OUTFITS) ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        
        {/* Screenshot matching header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4.5">
            {/* Heart selection icon */}
            <button 
              onClick={() => toggleLike(99)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer text-zinc-650"
            >
              <Heart className={cn("w-5 h-5", isLiked[99] ? "fill-red-500 stroke-red-500" : "")} />
            </button>
            <div className="text-left space-y-0.5">
              <span className="text-[9px] font-sans font-extrabold tracking-widest text-zinc-400 uppercase block">
                LOOKS THAT WE
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-black text-zinc-900 tracking-tight leading-none uppercase">
                Shop the Look
              </h2>
              <span className="text-[10px] font-mono text-zinc-500 block">
                Finest Trends. Curated Brands
              </span>
            </div>
          </div>
          
          {/* View All Button */}
          <Link href="/shop-the-look" className="flex items-center gap-1.5 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer">
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Scrolling Card Deck Container */}
        <div className="flex gap-6 overflow-x-auto scrollbar-none pb-6 px-1 scroll-smooth">
          {curatedLooks.map((look) => (
            <div
              key={look.id}
              className="flex-shrink-0 w-full max-w-[530px] rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Top body content grid split (model left / products grid right) */}
              <div className="flex items-stretch min-h-[340px]">
                
                {/* Left Side: Tall Model Photo */}
                <div className="relative w-[38%] border-r border-zinc-150 overflow-hidden">
                  <Image
                    src={look.modelImage}
                    alt={`Model look #${look.id}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>

                {/* Right Side: Grid of 4 catalog items */}
                <div className="w-[62%] p-4 grid grid-cols-2 gap-3 items-start bg-zinc-50/20">
                  {look.products.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        if (onAddToCart) {
                          onAddToCart({
                            id: item.id,
                            brand: "Styled Outfit",
                            name: item.name,
                            price: item.price,
                            image: item.image
                          });
                        } else {
                          alert(`Added ${item.name} to cart!`);
                        }
                      }}
                      className="group/product flex flex-col justify-between h-full cursor-pointer bg-white border border-zinc-150 hover:border-zinc-350 p-2 rounded-xl transition-all hover:shadow-xs"
                    >
                      {/* Square product thumb border */}
                      <div className="relative aspect-square w-full bg-zinc-50/50 rounded-lg overflow-hidden flex items-center justify-center p-1.5 border border-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain transition-transform group-hover/product:scale-105"
                        />
                      </div>
                      
                      {/* Product copy detail text */}
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

              {/* Bottom solid black full width CTA button */}
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

      {/* ==================== 2. BRAND TEASERS SECTION ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Awwwards style Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black block">
              SEASON PREVIEWS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black uppercase text-black tracking-tight leading-none">
              Brand Teasers
            </h2>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans font-medium max-w-sm mt-4 md:mt-0 leading-relaxed">
            Exclusive insights, upcoming concepts, and high-fashion previews on the street horizons.
          </p>
        </div>

        {/* Dynamic 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandTeasers.map((teaser) => (
            <motion.div
              key={teaser.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative aspect-[9/14] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 flex flex-col justify-end p-5 cursor-pointer transition-shadow hover:shadow-xl"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={teaser.image}
                  alt={teaser.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                {/* Subtle Gradient Shadow overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-zinc-950/20 z-10 opacity-35 group-hover:opacity-10 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-20 text-white w-full flex flex-col justify-between h-full">
                
                {/* Top Badge */}
                <div>
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-0.5 rounded text-[8px] font-mono tracking-widest text-white uppercase">
                    {teaser.tag}
                  </span>
                </div>

                {/* Bottom Text details */}
                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] text-zinc-400 font-mono tracking-widest block uppercase font-bold">
                    {teaser.brandName}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black uppercase text-yellow-400 tracking-tight leading-tight">
                    {teaser.title}
                  </h3>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}

export default BrandCollabTeasers;
