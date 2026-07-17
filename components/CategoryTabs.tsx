"use client";

import React from "react";
import { cn } from "@/lib/utils";

const filterTabs = [
  "All Products",
  "New Arrivals",
  "Best Selling",
  "Discounted Offers",
  "Winter Collection",
];

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CategoryTabs({ activeTab, setActiveTab }: CategoryTabsProps) {
  return (
    <div className="w-full bg-white overflow-x-auto scrollbar-none py-4 border-b border-zinc-100">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between md:justify-center gap-2 md:gap-8">
        {filterTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all whitespace-nowrap cursor-pointer",
              activeTab === tab
                ? "bg-black text-white shadow-sm"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-black"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
