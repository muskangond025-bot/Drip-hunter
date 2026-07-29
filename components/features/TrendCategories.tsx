"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/ui/category-card";

const categories = [
  {
    name: "Oversized Tees",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    desc: "Relaxed drops & heavyweight graphics",
    gradient: "from-zinc-900 to-neutral-800",
  },
  {
    name: "Loose Cargo Pants",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp",
    desc: "Multi-pocket tactical trousers",
    gradient: "from-zinc-900 to-neutral-700",
  },
  {
    name: "Heavy Hoodies",
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp",
    desc: "Double-lined boxy fit cuts",
    gradient: "from-zinc-900 to-stone-800",
  },
  {
    name: "Caps & Beanies",
    image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp",
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
