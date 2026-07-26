"use client";

import React, { useEffect, useRef } from "react";
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
    id: "skate-shop",
    name: "Skate Shop",
    subCategories: [
      { name: "Accessories", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=150&q=80" },
      { name: "Apparel", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=150&q=80" },
      { name: "Bearings", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&q=80" },
      { name: "Cruisers", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80" },
      { name: "Face Mask", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=150&q=80" },
      { name: "Grip Tape", image: "https://images.unsplash.com/photo-1547447134-cd3f5c71752e?auto=format&fit=crop&w=150&q=80" },
      { name: "Handbags, Wallets & Cases", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=150&q=80" },
      { name: "Headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=150&q=80" },
      { name: "Keychains", image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=150&q=80" },
      { name: "Misc. Hardgood Items", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Skateboard", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Skateboard Complete", image: "https://images.unsplash.com/photo-1547447134-cd3f5c71752e?auto=format&fit=crop&w=150&q=80" },
      { name: "Skateboard Deck", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Skateboard Decks", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Truck Accessories", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Trucks", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
      { name: "Wheels", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=150&q=80" },
    ],
  },
];

interface CategorySelectorProps {
  selectedSubCategory?: string | null;
  onSelectSubCategory?: (subCategoryName: string | null) => void;
}

export function CategorySelector({ selectedSubCategory, onSelectSubCategory }: CategorySelectorProps) {
  const allSubCategories = categoriesData.flatMap((cat) => cat.subCategories);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const scrollPos = useRef(0);

  // Auto-scroll loop effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.035; // px per millisecond (approx 35px per second)

    // Wait a brief tick for layout to fully render and have width, then initialize middle position
    const initTimer = setTimeout(() => {
      const halfWidth = container.scrollWidth / 2;
      container.scrollLeft = halfWidth;
      scrollPos.current = halfWidth;
    }, 150);

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (container) {
        if (!isHovered.current && !isMouseDown.current && !isDragging.current) {
          // If container's scrollLeft was modified outside our loop (e.g. native scroll/swipe),
          // sync scrollPos to it first to avoid jumps
          if (Math.abs(scrollPos.current - container.scrollLeft) > 5) {
            scrollPos.current = container.scrollLeft;
          }

          scrollPos.current += speed * delta;

          const halfWidth = container.scrollWidth / 2;
          if (scrollPos.current >= 1.5 * halfWidth) {
            scrollPos.current -= halfWidth;
          }

          container.scrollLeft = Math.round(scrollPos.current);
        } else {
          // Sync scrollPos during manual hover, scroll, drag
          scrollPos.current = container.scrollLeft;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Desktop Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isMouseDown.current = true;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeftStart.current = container.scrollLeft;
    container.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      dragMoved.current = true;
    }
    container.scrollLeft = scrollLeftStart.current - walk;
    scrollPos.current = container.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
    isDragging.current = false;
    const container = scrollContainerRef.current;
    if (container) {
      container.style.scrollBehavior = "auto";
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    
    // Wrap scroll position between [0.5 * halfWidth, 1.5 * halfWidth] to keep it looping seamlessly
    if (container.scrollLeft >= 1.5 * halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0.5 * halfWidth) {
      container.scrollLeft += halfWidth;
    }
    scrollPos.current = container.scrollLeft;
  };

  return (
    <section className="w-full bg-zinc-50 border-y border-zinc-200 py-6 select-none overflow-hidden relative">
      <div 
        className="w-full px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
        onTouchStart={() => { isHovered.current = true; }}
        onTouchEnd={() => { isHovered.current = false; }}
      >
        {/* Horizontal scrollable wrapper for all subcategories combined */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onScroll={handleScroll}
          style={{ scrollBehavior: "auto" }}
          className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1 -my-1 w-full flex-nowrap justify-start cursor-grab active:cursor-grabbing select-none"
        >
          {/* First set of items */}
          {allSubCategories.map((sub, idx) => {
            const isSelected = selectedSubCategory === sub.name;
            return (
              <button
                key={`first-${idx}`}
                onClick={(e) => {
                  if (dragMoved.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    dragMoved.current = false;
                    return;
                  }
                  if (onSelectSubCategory) {
                    onSelectSubCategory(isSelected ? null : sub.name);
                  }
                }}
                className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer min-w-[80px] sm:min-w-[100px] focus:outline-none"
              >
                {/* Premium Floating Item Container */}
                <div className={`w-14 h-14 sm:w-20 sm:h-20 relative transition-all duration-300 ${
                  isSelected 
                    ? "scale-110 filter drop-shadow-md" 
                    : "opacity-85 group-hover:opacity-100 group-hover:scale-105"
                }`}>
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    sizes="80px"
                    className="object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Subcategory Name */}
                <span className={`text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-center leading-tight mt-1 line-clamp-1 max-w-full ${
                  isSelected 
                    ? "text-black font-extrabold tracking-widest underline underline-offset-4" 
                    : "text-zinc-500 group-hover:text-zinc-950"
                }`}>
                  {sub.name}
                </span>
              </button>
            );
          })}

          {/* Second set of items for seamless loop */}
          {allSubCategories.map((sub, idx) => {
            const isSelected = selectedSubCategory === sub.name;
            return (
              <button
                key={`second-${idx}`}
                onClick={(e) => {
                  if (dragMoved.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    dragMoved.current = false;
                    return;
                  }
                  if (onSelectSubCategory) {
                    onSelectSubCategory(isSelected ? null : sub.name);
                  }
                }}
                className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer min-w-[80px] sm:min-w-[100px] focus:outline-none"
              >
                {/* Premium Floating Item Container */}
                <div className={`w-14 h-14 sm:w-20 sm:h-20 relative transition-all duration-300 ${
                  isSelected 
                    ? "scale-110 filter drop-shadow-md" 
                    : "opacity-85 group-hover:opacity-100 group-hover:scale-105"
                }`}>
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    sizes="80px"
                    className="object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Subcategory Name */}
                <span className={`text-[9px] sm:text-[10px] font-black tracking-wider uppercase text-center leading-tight mt-1 line-clamp-1 max-w-full ${
                  isSelected 
                    ? "text-black font-extrabold tracking-widest underline underline-offset-4" 
                    : "text-zinc-500 group-hover:text-zinc-950"
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
