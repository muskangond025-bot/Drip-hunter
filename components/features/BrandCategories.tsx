"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/ui/category-card";

const categories = [
  {
    title: "Office Drip",
    image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
    desc: "Premium tech-commute wear"
  },
  {
    title: "Street Athletic",
    image: "https://img105.savana.com/b778ce7f97cc4b8dacb8fc6b3f5a2f2f.webp",
    desc: "High-performance jog garments"
  },
  {
    title: "Urban Commute",
    image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
    desc: "Outerwear for city transit"
  },
  {
    title: "Court Looks",
    image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp",
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
