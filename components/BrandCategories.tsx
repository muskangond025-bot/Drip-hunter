"use client";

import React from "react";
import { SectionHeader } from "./ui/section-header";
import { CategoryCard } from "./ui/category-card";

const categories = [
  {
    title: "Office Drip",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80",
    desc: "Premium tech-commute wear"
  },
  {
    title: "Street Athletic",
    image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=400&q=80",
    desc: "High-performance jog garments"
  },
  {
    title: "Urban Commute",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80",
    desc: "Outerwear for city transit"
  },
  {
    title: "Court Looks",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=400&q=80",
    desc: "Luxury athletic golf sets"
  }
];

export function BrandCategories() {
  return (
    <section className="bg-white py-16 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <SectionHeader
          subtitle="EXPLORE STYLES"
          title="Brand Categories"
        />

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={idx}
              title={cat.title}
              desc={cat.desc}
              image={cat.image}
              variant="overlay"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
