"use client";

import React from "react";
import Image from "next/image";

interface SubCategory {
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

const categoriesData: Category[] = [
  {
    id: "topwear",
    name: "Top Wear",
    subCategories: [
      { name: "Graphic Tees", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80" },
      { name: "Heavy Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=150&q=80" },
      { name: "Flannel Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=150&q=80" },
      { name: "Tactical Vests", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=150&q=80" },
      { name: "Sweaters", image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=150&q=80" },
    ],
  },
  {
    id: "bottomwear",
    name: "Bottom Wear",
    subCategories: [
      { name: "Tactical Cargo", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=150&q=80" },
      { name: "Loose Shorts", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80" },
      { name: "Relaxed Denim", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&q=80" },
      { name: "Tech Sweatpants", image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=150&q=80" },
      { name: "Track Joggers", image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=150&q=80" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    subCategories: [
      { name: "Utility Caps", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=150&q=80" },
      { name: "Knit Beanies", image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=150&q=80" },
      { name: "Street Shades", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80" },
      { name: "Chest Bags", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=150&q=80" },
      { name: "Socks", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=150&q=80" },
    ],
  },
];

interface CategorySelectorProps {
  selectedSubCategory?: string | null;
  onSelectSubCategory?: (subCategoryName: string | null) => void;
}

export function CategorySelector({ selectedSubCategory, onSelectSubCategory }: CategorySelectorProps) {
  const allSubCategories = categoriesData.flatMap((cat) => cat.subCategories);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm overflow-hidden">
        {/* Horizontal scrollable wrapper for all subcategories combined */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1 -my-1 w-full flex-nowrap justify-start lg:justify-between">
          {allSubCategories.map((sub, idx) => {
            const isSelected = selectedSubCategory === sub.name;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (onSelectSubCategory) {
                    onSelectSubCategory(isSelected ? null : sub.name);
                  }
                }}
                className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer min-w-[75px] sm:min-w-[85px] focus:outline-none"
              >
                {/* Circular Image Container */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 relative bg-white border rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
                  isSelected 
                    ? "border-black ring-2 ring-black scale-105 shadow-md" 
                    : "border-zinc-200 shadow-sm group-hover:border-black"
                }`}>
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                {/* Subcategory Name */}
                <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight group-hover:underline line-clamp-1 max-w-full ${
                  isSelected 
                    ? "text-black underline font-black" 
                    : "text-zinc-700 group-hover:text-black"
                }`}>
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
