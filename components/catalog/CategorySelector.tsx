"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export interface CategoryCircleItem {
  id: string;
  name: string;
  image: string;
  filterCategory: string;
}

// MAIN HOMEPAGE CATEGORIES
const CATEGORY_CIRCLE_ITEMS: CategoryCircleItem[] = [
  {
    id: "tshirts",
    name: "Tshirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Tshirts",
  },
  {
    id: "eyewear",
    name: "Eyewear",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Eyewear",
  },
  {
    id: "headwear",
    name: "Headwear",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Headwear",
  },
  {
    id: "bottoms",
    name: "All Bottoms",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=200&q=80",
    filterCategory: "All Bottoms",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Accessories",
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Clothing",
  },
  {
    id: "backpack",
    name: "Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Backpack",
  },
  {
    id: "wallets",
    name: "Wallets",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Wallets",
  },
  {
    id: "shirts",
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Shirts",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Hoodies",
  },
  {
    id: "skateboards",
    name: "Skateboards",
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Skateboards",
  },
];

// T-SHIRTS DEDICATED VARIETIES
const TSHIRT_VARIETIES: CategoryCircleItem[] = [
  {
    id: "all-tshirts",
    name: "All T-Shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Tshirts",
  },
  {
    id: "graphic-tees",
    name: "Graphic Tees",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Graphic Tees",
  },
  {
    id: "oversized-tees",
    name: "Oversized Tees",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Oversized Tees",
  },
  {
    id: "full-sleeve-tees",
    name: "Full Sleeve Tees",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Full Sleeve Tees",
  },
  {
    id: "polo-tees",
    name: "Polo Tees",
    image: "https://images.unsplash.com/photo-1625910513413-5627252f4477?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Polo Tees",
  },
  {
    id: "printed-tees",
    name: "Printed Tees",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Printed Tees",
  },
  {
    id: "basic-tees",
    name: "Basic Tees",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Basic Tees",
  },
  {
    id: "crop-tees",
    name: "Crop Tees",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=200&q=80",
    filterCategory: "Crop Tees",
  },
];

// SHIRTS DEDICATED VARIETIES
const SHIRTS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-shirts", name: "All Shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80", filterCategory: "Shirts" },
  { id: "flannel-shirts", name: "Flannel Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80", filterCategory: "Flannel Shirts" },
  { id: "casual-shirts", name: "Casual Shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=200&q=80", filterCategory: "Casual Shirts" },
  { id: "oversized-shirts", name: "Oversized Shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80", filterCategory: "Oversized Shirts" },
  { id: "denim-shirts", name: "Denim Shirts", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=200&q=80", filterCategory: "Denim Shirts" },
  { id: "short-sleeve-shirts", name: "Short Sleeve Shirts", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80", filterCategory: "Short Sleeve Shirts" },
  { id: "full-sleeve-shirts", name: "Full Sleeve Shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=200&q=80", filterCategory: "Full Sleeve Shirts" },
  { id: "corduroy-shirts", name: "Corduroy Shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=200&q=80", filterCategory: "Corduroy Shirts" },
];

// HOODIES & SWEATSHIRTS DEDICATED VARIETIES
const HOODIES_VARIETIES: CategoryCircleItem[] = [
  { id: "all-hoodies", name: "All Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80", filterCategory: "Hoodies" },
  { id: "heavy-hoodies", name: "Heavy Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80", filterCategory: "Heavy Hoodies" },
  { id: "zip-up-hoodies", name: "Zip-Up Hoodies", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=200&q=80", filterCategory: "Zip-Up Hoodies" },
  { id: "oversized-hoodies", name: "Oversized Hoodies", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80", filterCategory: "Oversized Hoodies" },
  { id: "graphic-hoodies", name: "Graphic Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80", filterCategory: "Graphic Hoodies" },
  { id: "pullover-sweatshirts", name: "Sweatshirts", image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=200&q=80", filterCategory: "Sweatshirts" },
  { id: "fleece-hoodies", name: "Fleece Hoodies", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=200&q=80", filterCategory: "Fleece Hoodies" },
  { id: "cropped-hoodies", name: "Crop Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80", filterCategory: "Crop Hoodies" },
];

// EYEWEAR DEDICATED VARIETIES
const EYEWEAR_VARIETIES: CategoryCircleItem[] = [
  { id: "all-eyewear", name: "All Eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80", filterCategory: "Eyewear" },
  { id: "street-shades", name: "Street Shades", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80", filterCategory: "Street Shades" },
  { id: "aviators", name: "Aviators", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", filterCategory: "Aviators" },
  { id: "wireframe", name: "Wireframe Spectacles", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80", filterCategory: "Wireframe" },
  { id: "round-frames", name: "Round Frames", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=200&q=80", filterCategory: "Round Frames" },
];

// HEADWEAR DEDICATED VARIETIES
const HEADWEAR_VARIETIES: CategoryCircleItem[] = [
  { id: "all-headwear", name: "All Headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&q=80", filterCategory: "Headwear" },
  { id: "snapbacks", name: "Snapbacks", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&q=80", filterCategory: "Snapbacks" },
  { id: "dad-caps", name: "Dad Caps", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=200&q=80", filterCategory: "Dad Caps" },
  { id: "bucket-hats", name: "Bucket Hats", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", filterCategory: "Bucket Hats" },
  { id: "beanies", name: "Knit Beanies", image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=200&q=80", filterCategory: "Knit Beanies" },
];

// BOTTOMS DEDICATED VARIETIES
const BOTTOMS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-bottoms", name: "All Bottoms", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=200&q=80", filterCategory: "All Bottoms" },
  { id: "tactical-cargo", name: "Tactical Cargo", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80", filterCategory: "Tactical Cargo" },
  { id: "track-joggers", name: "Track Joggers", image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=200&q=80", filterCategory: "Track Joggers" },
  { id: "relaxed-denim", name: "Relaxed Denim", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=200&q=80", filterCategory: "Relaxed Denim" },
  { id: "shorts", name: "Loose Shorts", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80", filterCategory: "Loose Shorts" },
];

// BAGS & WALLETS DEDICATED VARIETIES
const BAGS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-bags", name: "All Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80", filterCategory: "Bags" },
  { id: "tactical-slings", name: "Tactical Slings", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=200&q=80", filterCategory: "Tactical Slings" },
  { id: "backpacks", name: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80", filterCategory: "Backpacks" },
  { id: "wallets-pouches", name: "Wallets & Pouches", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80", filterCategory: "Wallets" },
];

// SKATEBOARDS DEDICATED VARIETIES
const SKATEBOARD_VARIETIES: CategoryCircleItem[] = [
  { id: "all-skateboards", name: "All Skateboards", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=200&q=80", filterCategory: "Skateboards" },
  { id: "skateboard-decks", name: "Decks", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=200&q=80", filterCategory: "Decks" },
  { id: "completes", name: "Completes", image: "https://images.unsplash.com/photo-1547447134-cd3f5c71752e?auto=format&fit=crop&w=200&q=80", filterCategory: "Completes" },
  { id: "cruisers", name: "Cruisers", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=200&q=80", filterCategory: "Cruisers" },
];

interface CategorySelectorProps {
  selectedSubCategory?: string | null;
  onSelectSubCategory?: (categoryName: string | null) => void;
}

export function CategorySelector({ selectedSubCategory, onSelectSubCategory }: CategorySelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Dynamically choose varieties based on current page/category context
  const circleItems = useMemo(() => {
    if (!selectedSubCategory || selectedSubCategory === "All") {
      return CATEGORY_CIRCLE_ITEMS;
    }

    const catLower = selectedSubCategory.toLowerCase();

    if (catLower.includes("tshirt") || catLower.includes("t-shirt") || catLower.includes("tee")) {
      return TSHIRT_VARIETIES;
    }
    if (catLower === "shirts" || catLower === "shirt") {
      return SHIRTS_VARIETIES;
    }
    if (catLower.includes("hoodie") || catLower.includes("sweatshirt")) {
      return HOODIES_VARIETIES;
    }
    if (catLower.includes("eyewear") || catLower.includes("shades") || catLower.includes("glasses")) {
      return EYEWEAR_VARIETIES;
    }
    if (catLower.includes("headwear") || catLower.includes("cap") || catLower.includes("hat")) {
      return HEADWEAR_VARIETIES;
    }
    if (catLower.includes("bottom") || catLower.includes("cargo") || catLower.includes("jogger")) {
      return BOTTOMS_VARIETIES;
    }
    if (catLower.includes("bag") || catLower.includes("backpack") || catLower.includes("wallet")) {
      return BAGS_VARIETIES;
    }
    if (catLower.includes("skateboard") || catLower.includes("deck")) {
      return SKATEBOARD_VARIETIES;
    }

    return CATEGORY_CIRCLE_ITEMS;
  }, [selectedSubCategory]);

  const handleClick = (item: CategoryCircleItem) => {
    const isAlreadySelected = selectedSubCategory === item.name || selectedSubCategory === item.filterCategory;
    const targetName = isAlreadySelected ? null : item.name;

    if (pathname !== "/shop") {
      // Immediate clean SPA navigation from homepage to shop page using Next Router
      const destination = targetName ? `/shop?category=${encodeURIComponent(targetName)}` : "/shop";
      router.push(destination);
      return;
    }

    // On shop page: STAY ON SAME PAGE, update filter locally without scrolling or page reload!
    if (onSelectSubCategory) {
      onSelectSubCategory(targetName);
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (targetName) {
        params.set("category", targetName);
      } else {
        params.delete("category");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none font-sans">
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 shadow-xs">
        {/* Context-aware Story Style Circular Category Icons Bar */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 px-1 w-full justify-start lg:justify-between flex-nowrap">
          {circleItems.map((item) => {
            const isSelected = selectedSubCategory === item.name || selectedSubCategory === item.filterCategory;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className="flex flex-col items-center gap-2.5 group flex-shrink-0 cursor-pointer min-w-[72px] sm:min-w-[85px] focus:outline-none"
              >
                {/* Circular Avatar Image Frame */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 relative bg-zinc-50 rounded-full overflow-hidden transition-all duration-300 transform group-hover:scale-108 group-hover:shadow-md border-2 ${
                    isSelected
                      ? "border-black ring-2 ring-black scale-108 shadow-md"
                      : "border-zinc-200 shadow-2xs group-hover:border-black"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Category Label text right below circle icon */}
                <span
                  className={`text-[11px] sm:text-xs font-bold text-center leading-tight font-mono uppercase tracking-tight line-clamp-1 max-w-[90px] transition-colors ${
                    isSelected
                      ? "text-black underline font-black"
                      : "text-zinc-700 group-hover:text-black group-hover:underline"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
