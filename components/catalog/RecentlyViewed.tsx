"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { PremiumProductCard } from "@/components/ui/PremiumProductCard";
import { masterProducts } from "@/app/product/[id]/data";

interface RecentProduct {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  discount?: number;
  gender?: string;
  category?: string;
  colorVariants?: {
    color: string;
    image: string;
    colorHex: string;
  }[];
}

const recentProducts = [101, 102, 103, 104].map(id => {
  const p = masterProducts.find(prod => prod.id === id);
  if (p) {
    return {
      id: p.id,
      brand: p.brand,
      name: p.name,
      price: p.price,
      image: p.image,
      hoverImage: p.hoverImage,
      discount: p.discount,
      gender: p.gender,
      category: p.category,
      colorVariants: p.colorVariants
    };
  }
  return null;
}).filter(Boolean) as RecentProduct[];

interface RecentlyViewedProps {
  onAddToCart: (product: RecentProduct) => void;
  favorites: number[];
  onToggleFavorite: (product: RecentProduct) => void;
}

export function RecentlyViewed({
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}: RecentlyViewedProps) {
  if (recentProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-secondary/20 border border-border rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(16,29,24,0.015)]">
        {/* Title */}
        <SectionHeader
          title="Recently Viewed"
          subtitle="Your History"
          description="Premium items you reviewed in this session. Click to continue your drip."
          align="center"
        />

        {/* Grid of Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {recentProducts.map((prod, idx) => {
            const isFav = favorites.includes(prod.id);
            return (
              <PremiumProductCard
                key={idx}
                id={prod.id}
                brand={prod.brand}
                name={prod.name}
                price={prod.price}
                image={prod.image}
                hoverImage={prod.hoverImage}
                badge={prod.discount ? `${prod.discount}% OFF` : undefined}
                discount={prod.discount}
                gender={prod.gender}
                category={prod.category}
                colorVariants={prod.colorVariants}
                isFavorite={isFav}
                onFavoriteToggle={() => onToggleFavorite(prod)}
                onAddToCart={() => onAddToCart(prod)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
