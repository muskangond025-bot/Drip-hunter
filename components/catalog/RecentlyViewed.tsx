"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/components/ui/product-card";

const recentProducts = [
  {
    id: 101,
    brand: "ESSENTIALS",
    name: "Classic Cream Cargo Pants",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 102,
    brand: "STUSSY",
    name: "Oversized Knit Sweater",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 103,
    brand: "UNRL",
    name: "Minimalist Lounge Crewneck",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 104,
    brand: "BAPE",
    name: "Classic Street Camo Tee",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=400&q=80",
  },
];

interface RecentProduct {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

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
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200">
      
      {/* Title */}
      <SectionHeader
        title="Recently Viewed"
        titleClassName="font-sans font-bold tracking-tight text-zinc-900"
      />

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((prod, idx) => {
          const isFav = favorites.includes(prod.id);
          return (
            <ProductCard
              key={idx}
              id={prod.id}
              brand={prod.brand}
              name={prod.name}
              price={prod.price}
              image={prod.image}
              buttonText="Add To Cart"
              isFavorite={isFav}
              onFavoriteToggle={() => onToggleFavorite(prod)}
              onAddToCart={() => onAddToCart(prod)}
              variant="full-width"
            />
          );
        })}
      </div>

    </section>
  );
}

