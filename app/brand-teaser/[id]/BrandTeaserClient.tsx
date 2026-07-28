"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Shield, Compass, Calendar, AlertCircle } from "lucide-react";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { cn } from "@/lib/utils";

interface TeaserProduct {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface TeaserDetails {
  id: number;
  brandName: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  products?: TeaserProduct[];
}

const teasersData: Record<number, TeaserDetails> = {
  1: {
    id: 1,
    brandName: "PUMA SELECT",
    title: "The Clyde Capsule",
    tag: "Collab Teaser",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    description: "A premium retro collaboration blending classic heritage basketball shapes with luxury lifestyle materials. Designed for the street collectors.",
    products: [
      {
        id: 9001,
        name: "PUMA Clyde 'OG Drip' Sneaker",
        price: "₹8,499",
        priceNum: 8499,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        description: "Classic suede upper shoe featuring gold foil Clyde branding, custom fat laces, and premium vulcanized honey gum cupsole.",
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        colors: ["Classic Suede", "Midnight Blue", "Crimson Red"]
      },
      {
        id: 9002,
        name: "Select Street Hoodie - Heather Grey",
        price: "₹4,999",
        priceNum: 4999,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        description: "Heavyweight 450GSM loopback cotton fleece hoodie featuring embroidered collaboration logos and drop-shoulder streetwear fit.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Heather Grey", "Off-Black", "Forest Green"]
      },
      {
        id: 9003,
        name: "Archive Graphic Tee - Off-White",
        price: "₹2,499",
        priceNum: 2499,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        description: "Organic combed cotton tee with soft-touch vintage graphic print details on front chest and oversized back profile.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Off-White", "Washed Slate"]
      }
    ]
  },
  2: {
    id: 2,
    brandName: "RECKLESS DRIP",
    title: "Back In Stock Deal",
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description: "The crowd favorites are returning. All limited archives restocked soon."
  },
  3: {
    id: 3,
    brandName: "NEON DIVISION",
    title: "Cyber Shield Tech",
    tag: "Limited Drop",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    description: "Technical utility shells and windbreakers built with weather-resistant custom nylon shells, heavy cargo straps, and neon graphic seals.",
    products: [
      {
        id: 9004,
        name: "Division Utility Shield Jacket",
        price: "₹12,999",
        priceNum: 12999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        description: "Windproof and highly water-resistant shell jacket featuring 8 pockets layout, adjustable velcro straps, and high-guard helmet hood.",
        sizes: ["M", "L", "XL"],
        colors: ["Tech Black", "Division Orange"]
      },
      {
        id: 9005,
        name: "Cyber Cargo Pant - Weatherproof Carbon",
        price: "₹7,499",
        priceNum: 7499,
        image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
        description: "Weather-resistant nylon utility trousers with adjustable buckle straps, dual cargo bellows, and premium elasticated ankles.",
        sizes: ["30", "32", "34", "36"],
        colors: ["Carbon Black", "Utility Khaki"]
      }
    ]
  },
  4: {
    id: 4,
    brandName: "RETRO RULERS",
    title: "Heritage Bomber Kit",
    tag: "Teaser Product",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
    description: "Vintage-inspired varsity bombers with chain-stitched custom lettering patches."
  }
};

export default function BrandTeaserClient({ teaserId }: { teaserId: number }) {
  const teaser = teasersData[teaserId];
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("drip-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddToCart = (product: TeaserProduct) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0];
    const itemKey = `${product.id}-${size}-${color}`;

    setCart((prev) => {
      let updated = [...prev];
      const existIdx = updated.findIndex((item) => `${item.id}-${item.size}-${item.color}` === itemKey);
      
      if (existIdx > -1) {
        updated[existIdx] = {
          ...updated[existIdx],
          quantity: updated[existIdx].quantity + 1
        };
      } else {
        updated.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          size,
          color,
          brand: teaser.brandName
        });
      }
      
      localStorage.setItem("drip-cart", JSON.stringify(updated));
      // Dispatch storage event to notify header cart icon
      window.dispatchEvent(new Event("storage"));
      return updated;
    });
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistJoined(true);
      setWaitlistEmail("");
    }
  };

  if (!teaser) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold text-zinc-900">Brand teaser not found</h1>
        <Link href="/" className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-[#ff5a00] border-b border-[#ff5a00] pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  // Check if we have product items to show, otherwise display COMING SOON
  const hasProducts = teaser.products && teaser.products.length > 0;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans select-none pb-20">
      
      {/* 1. Header Area */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-zinc-150/80 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-zinc-800 hover:text-black">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Catalog</span>
          </Link>

          {/* Premium Logo typography */}
          <div className="flex flex-col items-center select-none leading-none">
            <span className="text-sm font-heading font-black tracking-widest text-zinc-950">
              DRIP<span className="text-[#ebd26b] ml-0.5">HUNTER</span>
            </span>
          </div>

          <div className="w-12" /> {/* spacing placeholder */}
        </div>
      </header>

      {/* 2. Hero Section Banner */}
      <section className="bg-white border-b border-zinc-200 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-left">
            <span className="bg-[#ff5a00]/5 text-[#ff5a00] border border-[#ff5a00]/10 px-3 py-1 rounded-lg text-[9px] font-mono tracking-widest uppercase font-bold inline-block">
              {teaser.tag}
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-zinc-950 uppercase tracking-tight leading-none">
              {teaser.title}
            </h1>
            <p className="text-zinc-550 text-xs sm:text-sm font-medium leading-relaxed max-w-md pt-2">
              {teaser.description}
            </p>
          </div>

          <div className="relative aspect-video sm:aspect-[1.6] rounded-[24px] overflow-hidden border border-zinc-150 shadow-sm bg-zinc-50">
            <Image
              src={teaser.image}
              alt={teaser.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Main Detail Content */}
      <main className="max-w-5xl mx-auto px-6 mt-16">
        {hasProducts ? (
          <div className="space-y-16">
            <div className="text-left border-b border-zinc-200 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black">
                CURATED CAPSULE DETAILS
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-zinc-900 mt-1">
                Collab Pieces Preview
              </h2>
            </div>

            {/* Curated Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teaser.products!.map((product) => {
                const activeSize = selectedSizes[product.id] || product.sizes[0];
                const activeColor = selectedColors[product.id] || product.colors[0];

                return (
                  <div 
                    key={product.id}
                    className="bg-white border border-zinc-200 rounded-[28px] p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow select-none group text-left"
                  >
                    <div>
                      {/* Framed Image */}
                      <div className="relative aspect-[4/5] bg-zinc-50 rounded-[20px] overflow-hidden border border-zinc-100 flex items-center justify-center p-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain transition-transform duration-500 group-hover:scale-103"
                        />
                      </div>

                      {/* Header details */}
                      <div className="mt-4 space-y-1">
                        <span className="text-[9px] text-[#ff5a00] font-mono tracking-widest block uppercase font-bold">
                          {teaser.brandName}
                        </span>
                        <h3 className="text-base font-extrabold uppercase text-zinc-950 tracking-tight leading-snug">
                          {product.name}
                        </h3>
                        <span className="text-sm font-mono font-black text-zinc-600 block pt-0.5">
                          {product.price}
                        </span>
                        <p className="text-zinc-500 text-[11px] leading-relaxed pt-1.5 border-t border-zinc-100 mt-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Selectors */}
                      <div className="space-y-3.5 mt-4 pt-3 border-t border-zinc-100">
                        {/* Size Picker */}
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase font-black block mb-2">
                            Select Size: {activeSize}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s }))}
                                className={cn(
                                  "px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase tracking-wider transition-all cursor-pointer",
                                  activeSize === s
                                    ? "bg-zinc-950 text-white border-zinc-950"
                                    : "bg-zinc-50 hover:bg-zinc-100 text-zinc-650 border-zinc-200"
                                )}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Picker */}
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase font-black block mb-2">
                            Select Option: {activeColor}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.colors.map((c) => (
                              <button
                                key={c}
                                onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: c }))}
                                className={cn(
                                  "px-2.5 py-1 text-[9px] font-mono rounded-lg border font-bold transition-all cursor-pointer",
                                  activeColor === c
                                    ? "bg-[#ff5a00] text-white border-[#ff5a00]"
                                    : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200"
                                )}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <div className="mt-6 pt-4 border-t border-zinc-100">
                      <InteractiveAddToCartButton
                        onClick={() => handleAddToCart(product)}
                        buttonText="ADD TO CART"
                        addedText="ADDED TO CART"
                        className="w-full py-3 text-[10px] font-black uppercase tracking-widest shadow-xs rounded-full border-none"
                      />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Coming Soon Page Template */
          <div className="flex flex-col items-center justify-center py-20 text-center select-none bg-white border border-zinc-200 rounded-[32px] p-8 max-w-2xl mx-auto shadow-sm">
            <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse mb-4" />
            
            <span className="text-[10px] font-mono tracking-widest text-[#ff5a00] uppercase font-black">
              DROP ARCHIVE LOCK
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-zinc-950 uppercase tracking-tight leading-none mt-2">
              Coming Soon
            </h2>
            <p className="text-zinc-550 text-xs sm:text-sm max-w-sm mt-4 leading-relaxed font-medium">
              The {teaser.brandName} &ldquo;{teaser.title}&rdquo; streetwear release capsule is under locked archive preview. Sign up below to unlock notifications and receive exclusive early-access purchase codes.
            </p>

            <div className="w-full max-w-md mt-10">
              {waitlistJoined ? (
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-left">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black uppercase tracking-wider font-mono">You are on the list!</p>
                    <p className="text-[10px] opacity-90 leading-tight">We will email early access tokens as soon as the collection drops.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex items-stretch w-full border-2 border-zinc-900 rounded-2xl overflow-hidden bg-white shadow-xs h-12">
                  <input 
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-grow bg-transparent text-zinc-900 px-4 outline-none text-xs sm:text-sm placeholder-zinc-400 font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-950 hover:bg-black text-yellow-400 font-black text-xs uppercase tracking-widest px-6 border-none cursor-pointer transition-colors shrink-0 h-full flex items-center justify-center"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>

            <Link href="/" className="mt-8 text-[10px] font-mono font-black uppercase tracking-widest text-[#ff5a00] hover:text-black border-b border-[#ff5a00] pb-0.5 transition-colors">
              Return to Catalog
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
