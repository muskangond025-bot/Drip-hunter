"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Star, Flame, Check } from "lucide-react";
import { ProductItem } from "@/app/page";

interface UrbanTrendingSectionProps {
  onAddToCart?: (product: ProductItem) => void;
  favorites?: number[];
  onToggleFavorite?: (product: ProductItem) => void;
}

const TRENDING_PRODUCTS: ProductItem[] = [
  {
    id: 901,
    name: "GHOST GRAPHIC OVERSIZED TEE",
    brand: "URBAN MONKEY",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    badge: "TRENDING #1",
  },
  {
    id: 902,
    name: "DAILY COMMUTER TACTICAL BACKPACK",
    brand: "URBAN MONKEY",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    badge: "HOT SELLER",
  },
  {
    id: 903,
    name: "RETRO WIREFRAME GOLD SPECTACLES",
    brand: "URBAN MONKEY",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
    badge: "RESTOCKED",
  },
  {
    id: 904,
    name: "URBAN MONKEY SIGNATURE EMBLEM CAP",
    brand: "URBAN MONKEY",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
    badge: "ICONIC",
  },
];

export function UrbanTrendingSection({ onAddToCart, favorites: propFavorites, onToggleFavorite }: UrbanTrendingSectionProps) {
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [localFavorites, setLocalFavorites] = useState<number[]>([]);

  const favorites = propFavorites || localFavorites;

  const handleAdd = (product: ProductItem) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1800);
  };

  const toggleFav = (product: ProductItem) => {
    if (onToggleFavorite) {
      onToggleFavorite(product);
    } else {
      setLocalFavorites((prev) =>
        prev.includes(product.id) ? prev.filter((item) => item !== product.id) : [...prev, product.id]
      );
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Title Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-300 rounded-full text-xs font-mono font-bold tracking-widest text-zinc-800 uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            MOST WANTED DROPS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase font-mono">
            TRENDING
          </h2>
          <div className="w-16 h-1 bg-zinc-900 mx-auto mt-3" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_PRODUCTS.map((product) => {
            const isAdded = addedIds.includes(product.id);
            const isFav = favorites.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-zinc-50 border border-zinc-200 hover:border-zinc-900 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-wider z-10">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleFav(product)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
                      isFav
                        ? "bg-red-500 text-white"
                        : "bg-white/80 hover:bg-white text-zinc-700 hover:text-black"
                    }`}
                    aria-label="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                  </button>

                  {/* Quick Overlay Action */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-full bg-white text-black hover:bg-amber-400 font-mono font-bold text-xs py-2 px-3 uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ADDED TO BAG
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          ADD TO CART
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                      {product.brand}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 mt-1 uppercase line-clamp-1 font-mono">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2">
                    <span className="text-sm font-black text-zinc-900 font-mono">
                      {product.price}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered VIEW ALL Button */}
        <div className="mt-10 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-3 bg-black hover:bg-zinc-800 text-white font-mono font-black text-xs uppercase tracking-widest transition-all duration-200 border border-black hover:scale-105"
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </section>
  );
}
