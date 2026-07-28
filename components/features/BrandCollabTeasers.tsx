"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// Framer-motion entrance variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function BrandCollabTeasers({ onAddToCart }: BrandCollabTeasersProps = {}) {
  const router = useRouter();
  const [hoveredLookCard, setHoveredLookCard] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (lookId: number) => {
    setIsLiked((prev) => ({ ...prev, [lookId]: !prev[lookId] }));
  };

  const handleGetThisLook = (look: CuratedLookItem) => {
    if (onAddToCart) {
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
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4.5">
            <button 
              onClick={() => toggleLike(99)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer text-zinc-650"
            >
              <Heart className={cn("w-5 h-5", isLiked[99] ? "fill-red-500 stroke-red-500" : "")} />
            </button>
            <div className="text-left space-y-0.5">
              <span className="text-[9px] font-sans font-extrabold tracking-widest text-[#ff5a00] uppercase block">
                LOOKS THAT WE LOVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-zinc-900 tracking-tight leading-none uppercase">
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 px-1 scroll-smooth"
        >
          {curatedLooks.map((look) => (
            <motion.div
              key={look.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex-shrink-0 w-full max-w-[530px] rounded-[32px] overflow-hidden border border-zinc-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all relative group"
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
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
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
              <div className="px-4 pb-4 mt-4">
                <button
                  onClick={() => handleGetThisLook(look)}
                  className="w-full py-3.5 bg-[#121824] hover:bg-black text-yellow-400 font-extrabold uppercase text-[10px] tracking-widest transition-all cursor-pointer border border-zinc-850 rounded-full active:scale-98 shadow-xs"
                >
                  Get this look
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ==================== 2. BRAND TEASERS SECTION ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Awwwards style Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 mb-12">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#ff5a00] uppercase font-black block">
              SEASON PREVIEWS
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-black tracking-tight leading-none">
              Brand Teasers
            </h2>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans font-medium max-w-sm mt-4 md:mt-0 leading-relaxed text-left md:text-right">
            Exclusive insights, upcoming concepts, and high-fashion previews on the street horizons.
          </p>
        </div>

        {/* Dynamic 4-Column Grid (Editorial Bright Theme) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {brandTeasers.map((teaser) => (
            <motion.div
              key={teaser.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => router.push(`/brand-teaser/${teaser.id}`)}
              className="bg-white border border-zinc-200 rounded-[28px] p-4 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer group select-none text-left"
            >
              <div>
                {/* Frame/Container for background image */}
                <div className="relative aspect-[4/5] bg-zinc-50 rounded-[20px] overflow-hidden">
                  <Image
                    src={teaser.image}
                    alt={teaser.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-white/95 backdrop-blur-sm border border-zinc-200/50 px-2.5 py-0.5 rounded-lg text-[8px] font-mono tracking-widest text-[#ff5a00] font-black uppercase shadow-xs">
                      {teaser.tag}
                    </span>
                  </div>
                </div>

                {/* Text Details beneath image */}
                <div className="mt-4 space-y-1">
                  <span className="text-[9px] text-[#ff5a00] font-mono tracking-widest block uppercase font-black">
                    {teaser.brandName}
                  </span>
                  <h3 className="text-base font-extrabold uppercase text-zinc-900 tracking-tight leading-tight group-hover:text-[#ff5a00] transition-colors">
                    {teaser.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Link/Arrow */}
              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-400 group-hover:text-[#ff5a00] transition-colors">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest">
                  Explore Drop
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

export default BrandCollabTeasers;
