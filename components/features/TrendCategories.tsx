"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/ui/category-card";

const categories = [
  {
    name: "Oversized Tees",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    desc: "Relaxed drops & heavyweight graphics",
    gradient: "from-zinc-900 to-neutral-800",
  },
  {
    name: "Loose Cargo Pants",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80",
    desc: "Multi-pocket tactical trousers",
    gradient: "from-zinc-900 to-neutral-700",
  },
  {
    name: "Heavy Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    desc: "Double-lined boxy fit cuts",
    gradient: "from-zinc-900 to-stone-800",
  },
  {
    name: "Caps & Beanies",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
    desc: "Street utility headwear caps",
    gradient: "from-zinc-900 to-zinc-800",
  },
];

export function TrendCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Title */}
      <SectionHeader
        subtitle="COLLECTIONS"
        title="Trend Categories"
        description="Curated streetwear categories compiled for modern urban environments."
        align="left"
      />

      {/* Categories Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            title={cat.name}
            desc={cat.desc}
            image={cat.image}
            gradient={cat.gradient}
            badge={`Style ${idx + 1}`}
            variant="gradient"
          />
        ))}
      </div>

    </section>
  );
}
