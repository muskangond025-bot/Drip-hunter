"use client";

import React, { useState } from "react";
import { Flame } from "lucide-react";
import { ProductItem } from "@/app/page";
import { ProductCard } from "@/components/ui/product-card";

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
  const [localFavorites, setLocalFavorites] = useState<number[]>([]);

  const favorites = propFavorites || localFavorites;

  const handleAdd = (product: ProductItem) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
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
            const isFav = favorites.includes(product.id);

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                price={product.price}
                image={product.image}
                badge={product.badge}
                isFavorite={isFav}
                rating={4.9}
                onFavoriteToggle={() => toggleFav(product)}
                onAddToCart={() => handleAdd(product)}
                variant="catalog"
              />
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
