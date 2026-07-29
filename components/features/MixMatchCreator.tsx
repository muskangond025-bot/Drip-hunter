"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface WishlistItem {
  id: number | string;
  brand?: string;
  name: string;
  price: string;
  image: string;
}

interface MixMatchCreatorProps {
  wishlist: WishlistItem[];
}

interface OutfitItem {
  id: string;
  name: string;
  image: string;
  category: "T-Shirt" | "Pants" | "Accessories";
  filter: string;
}

// Parse helper to categorize wishlist items
const getCategory = (name: string): "T-Shirt" | "Pants" | "Accessories" => {
  const n = name.toLowerCase();
  if (n.includes("tee") || n.includes("t-shirt") || n.includes("hoodie") || n.includes("jacket") || n.includes("shirt")) {
    return "T-Shirt";
  }
  if (n.includes("pant") || n.includes("cargo") || n.includes("jogger") || n.includes("short")) {
    return "Pants";
  }
  return "Accessories";
};

export function MixMatchCreator({ wishlist = [] }: MixMatchCreatorProps) {
  const [activeTab, setActiveTab] = useState("Tag A");
  const [allCreatorItems, setAllCreatorItems] = useState<OutfitItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectionCategory, setSelectionCategory] = useState<"T-Shirt" | "Pants" | "Accessories" | null>(null);

  // Slots state representing: Tops (top), Bottoms (bottom), Accessories (accessory)
  // Initially populated to match the Figma layout exactly
  const [slots, setSlots] = useState<{
    top: OutfitItem | null;
    bottom: OutfitItem | null;
    accessory: OutfitItem | null;
  }>({
    top: {
      id: "blue-tee",
      name: "Blue T-shirt",
      image: "/images/blue_3d_tshirt.png",
      category: "T-Shirt",
      filter: "none"
    },
    bottom: {
      id: "yellow-shorts",
      name: "Yellow Shorts",
      image: "/images/yellow_shorts_3d.png",
      category: "Pants",
      filter: "none"
    },
    accessory: {
      id: "pink-cap",
      name: "Pink Cap",
      image: "/images/pink_cap_3d.png",
      category: "Accessories",
      filter: "none"
    }
  });

  // Sync wishlist prop and default items
  useEffect(() => {
    // 1. Convert real wishlist items
    const parsedWishlist = wishlist.map((item) => ({
      id: String(item.id),
      name: item.name,
      image: item.image,
      category: getCategory(item.name),
      filter: "none",
    }));

    // 2. Default starting items (Blue tee, Yellow shorts, Pink cap)
    const defaults = [
      {
        id: "blue-tee",
        name: "Blue T-shirt",
        image: "/images/blue_3d_tshirt.png",
        category: "T-Shirt" as const,
        filter: "none",
      },
      {
        id: "yellow-shorts",
        name: "Yellow Shorts",
        image: "/images/yellow_shorts_3d.png",
        category: "Pants" as const, // Map to slot 2/Bottoms
        filter: "none",
      },
      {
        id: "pink-cap",
        name: "Pink Cap",
        image: "/images/pink_cap_3d.png",
        category: "Accessories" as const, // Map to slot 3/Accessories
        filter: "none",
      },
    ];

    // Combine them without duplicates
    const combined: OutfitItem[] = [...defaults];
    parsedWishlist.forEach((item) => {
      if (!combined.some((c) => c.id === item.id)) {
        combined.push(item);
      }
    });

    setAllCreatorItems(combined);
  }, [wishlist]);

  // Toggle grid item into the correct category slot
  const handleToggleSlot = (item: OutfitItem) => {
    setSlots((prev) => {
      // If already in slot, remove it
      if (prev.top?.id === item.id) return { ...prev, top: null };
      if (prev.bottom?.id === item.id) return { ...prev, bottom: null };
      if (prev.accessory?.id === item.id) return { ...prev, accessory: null };

      // Place in appropriate category slot
      if (item.category === "T-Shirt") {
        return { ...prev, top: item };
      }
      if (item.category === "Pants") {
        return { ...prev, bottom: item };
      }
      return { ...prev, accessory: item };
    });
  };

  // Helper check if item is currently mapped to a slot
  const isSelectedInSlot = (id: string) => {
    return slots.top?.id === id || slots.bottom?.id === id || slots.accessory?.id === id;
  };

  // Tag filter logic
  const filteredGridItems = allCreatorItems.filter((item) => {
    if (activeTab === "Tag A") return true; // Tag A: All items
    if (activeTab === "Tag B") return item.category === "T-Shirt"; // Tag B: T-Shirts
    if (activeTab === "Tag C") return item.category === "Pants" || item.category === "Accessories"; // Tag C: Accessories/Pants
    return true;
  });

  // Simulated items list for modal selection
  const extraItems = [
    { id: "extra-1", name: "Cyberpunk Tactical Vest", image: "https://img105.savana.com/9d519fb69e394f14b7b7f59513a40fcd.webp", category: "T-Shirt" as const, filter: "none" },
    { id: "extra-2", name: "Acid Wash Jogger Cargo", image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp", category: "Pants" as const, filter: "none" },
    { id: "extra-3", name: "Premium Knit Cap", image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp", category: "Accessories" as const, filter: "none" },
  ];

  const addExtraItem = (item: OutfitItem) => {
    setAllCreatorItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
    setShowAddModal(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wider text-zinc-950 uppercase">
          MIX & MATCH OUTFIT CREATOR
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1.5 max-w-lg leading-relaxed">
          Combine pieces from your wishlist to visualize custom streetwear lookbooks
        </p>
      </div>

      {/* Main Outer Container */}
      <div className="bg-white border border-zinc-100 rounded-[32px] shadow-2xl p-6 sm:p-10 max-w-3xl w-full flex flex-col items-center">
        
        {/* Top Preview Bar Container */}
        <div className="w-full max-w-md bg-[#fafafa] border border-zinc-200/60 rounded-3xl p-5 flex items-center justify-center gap-4 mb-8 shadow-3xs">
          
          {/* Slot 1: Tops (Top Wear) */}
          <div 
            className="w-28 h-16 rounded-xl relative overflow-hidden flex items-center justify-center cursor-pointer shadow-3xs hover:scale-[1.02] transition-transform"
            onClick={() => setSlots(prev => ({ ...prev, top: null }))}
            title="Click to clear Top Wear slot"
          >
            {/* Plus button to add from wishlist */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectionCategory("T-Shirt");
              }}
              className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/95 hover:bg-white text-zinc-800 rounded-full flex items-center justify-center text-[10px] shadow-sm font-bold border border-zinc-200/60 cursor-pointer z-20"
              title="Add item from Wishlist"
            >
              +
            </button>

            <AnimatePresence mode="popLayout">
              {slots.top ? (
                <motion.div
                  key={slots.top.id}
                  layoutId={`img-${slots.top.id}`}
                  className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center border border-zinc-800"
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                >
                  <div className="relative w-9 h-9 flex items-center justify-center -translate-y-1.5">
                    <Image 
                      src={slots.top.image} 
                      alt="Top preview" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <span className="absolute bottom-1.5 text-[8px] font-black text-yellow-400 font-mono tracking-widest uppercase">
                    Top Wear
                  </span>
                </motion.div>
              ) : (
                <div className="w-full h-full border border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center bg-white text-zinc-400 hover:border-zinc-400 transition-colors">
                  <span className="text-xs font-bold font-mono">+</span>
                  <span className="text-[8px] font-bold text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Top Wear</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Slot 2: Bottoms (Bottom Wear) */}
          <div 
            className="w-28 h-16 rounded-xl relative overflow-hidden flex items-center justify-center cursor-pointer shadow-3xs hover:scale-[1.02] transition-transform"
            onClick={() => setSlots(prev => ({ ...prev, bottom: null }))}
            title="Click to clear Bottom Wear slot"
          >
            {/* Plus button to add from wishlist */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectionCategory("Pants");
              }}
              className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/95 hover:bg-white text-zinc-800 rounded-full flex items-center justify-center text-[10px] shadow-sm font-bold border border-zinc-200/60 cursor-pointer z-20"
              title="Add item from Wishlist"
            >
              +
            </button>

            <AnimatePresence mode="popLayout">
              {slots.bottom ? (
                <motion.div
                  key={slots.bottom.id}
                  layoutId={`img-${slots.bottom.id}`}
                  className="w-full h-full bg-gradient-to-b from-zinc-200 to-zinc-300 border border-zinc-200 flex flex-col items-center justify-center"
                  style={{ filter: slots.bottom.filter }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                >
                  <div className="relative w-9 h-9 flex items-center justify-center -translate-y-1.5">
                    <Image 
                      src={slots.bottom.image} 
                      alt="Bottom preview" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <span className="absolute bottom-1.5 text-[8px] font-black text-zinc-800 font-mono tracking-widest uppercase">
                    Bottom Wear
                  </span>
                </motion.div>
              ) : (
                <div className="w-full h-full border border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center bg-white text-zinc-400 hover:border-zinc-400 transition-colors">
                  <span className="text-xs font-bold font-mono">+</span>
                  <span className="text-[8px] font-bold text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Bottom Wear</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Slot 3: Accessories */}
          <div 
            className="w-28 h-16 rounded-xl relative overflow-hidden flex items-center justify-center cursor-pointer shadow-3xs hover:scale-[1.02] transition-transform"
            onClick={() => setSlots(prev => ({ ...prev, accessory: null }))}
            title="Click to clear Accessories slot"
          >
            {/* Plus button to add from wishlist */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectionCategory("Accessories");
              }}
              className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/95 hover:bg-white text-zinc-800 rounded-full flex items-center justify-center text-[10px] shadow-sm font-bold border border-zinc-200/60 cursor-pointer z-20"
              title="Add item from Wishlist"
            >
              +
            </button>

            <AnimatePresence mode="popLayout">
              {slots.accessory ? (
                <motion.div
                  key={slots.accessory.id}
                  layoutId={`img-${slots.accessory.id}`}
                  className="w-full h-full bg-cyan-400 border border-cyan-300 flex flex-col items-center justify-center"
                  style={{ filter: slots.accessory.filter }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                >
                  <div className="relative w-9 h-9 flex items-center justify-center -translate-y-1.5">
                    <Image 
                      src={slots.accessory.image} 
                      alt="Accessory preview" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <span className="absolute bottom-1.5 text-[8px] font-black text-white font-mono tracking-widest uppercase">
                    Accessories
                  </span>
                </motion.div>
              ) : (
                <div className="w-full h-full border border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center bg-white text-zinc-400 hover:border-zinc-400 transition-colors">
                  <span className="text-xs font-bold font-mono">+</span>
                  <span className="text-[8px] font-bold text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Accessories</span>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-3 mb-10">
          {["Tag A", "Tag B", "Tag C"].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTab(tag)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                activeTab === tag
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                  : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Outfit Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredGridItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className={`bg-white border rounded-2xl p-5 flex flex-col justify-between items-center shadow-3xs cursor-pointer transition-all duration-300 relative ${
                  isSelectedInSlot(item.id) ? "border-yellow-400 ring-2 ring-yellow-400/20" : "border-zinc-200 hover:border-zinc-300"
                }`}
                onClick={() => handleToggleSlot(item)}
              >
                {isSelectedInSlot(item.id) && (
                  <span className="absolute -top-2.5 left-4 bg-yellow-400 text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 animate-pulse">
                    Active
                  </span>
                )}

                {/* Circular Plus/Cross icon button on Top Right corner of the card */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSlot(item);
                  }}
                  className={`absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md font-bold transition-all cursor-pointer z-20 ${
                    isSelectedInSlot(item.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-zinc-950 text-white hover:bg-zinc-800"
                  }`}
                  title={isSelectedInSlot(item.id) ? "Remove from Outfit" : "Add to Outfit"}
                >
                  {isSelectedInSlot(item.id) ? "✕" : "+"}
                </button>
                
                {/* Floating Antigravity Image container */}
                <div 
                  className="relative w-36 aspect-square bg-[#fafafa] border border-zinc-150/50 rounded-xl overflow-hidden mb-6 flex items-center justify-center"
                >
                  {isSelectedInSlot(item.id) ? (
                    <div className="opacity-20 flex items-center justify-center w-28 h-28 relative">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2 grayscale" 
                        style={{ filter: item.filter }}
                      />
                    </div>
                  ) : (
                    <motion.div 
                      layoutId={`img-${item.id}`}
                      className="relative w-28 h-28 flex items-center justify-center"
                      style={{ filter: item.filter }}
                      transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    >
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2" 
                      />
                    </motion.div>
                  )}
                </div>

                <h3 className="text-[10px] font-mono font-bold text-zinc-700 tracking-tight text-center line-clamp-1 mb-4 w-full uppercase">
                  {item.name}
                </h3>

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#18181b", borderColor: "#18181b" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-zinc-950 text-white font-extrabold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-zinc-950 transition-all cursor-pointer text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelectedInSlot(item.id)) {
                      alert(`${item.name} moved to Cart!`);
                    } else {
                      handleToggleSlot(item);
                    }
                  }}
                >
                  {isSelectedInSlot(item.id) ? "Move to Cart" : "Add More"}
                </motion.button>
              </motion.div>
            ))}

            {/* Card 3: Dashboard Add More */}
            <motion.div 
              key="add-more-card"
              layout
              whileHover={{ y: -8 }}
              className="border border-dashed border-zinc-300 rounded-2xl p-5 flex flex-col justify-between items-center bg-[#fafafa]/50 shadow-3xs cursor-pointer hover:bg-zinc-50 transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <div className="my-auto flex flex-col items-center justify-center py-6">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-400 font-extrabold text-xl mb-3 shadow-3xs">
                  +
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  Outfit item
                </span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#18181b", borderColor: "#18181b" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-zinc-950 text-white font-extrabold text-[10px] uppercase tracking-wider py-3.5 rounded-xl border border-zinc-950 transition-all cursor-pointer text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddModal(true);
                }}
              >
                Add More
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Add More Items Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-zinc-100 flex flex-col animate-fade-in-up">
            <button 
              onClick={() => setShowAddModal(false)} 
              className="absolute top-5 right-5 text-zinc-400 hover:text-black cursor-pointer font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-lg font-black font-mono tracking-wide text-zinc-950 uppercase mb-4 text-center">
              Add Streetwear Item
            </h3>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {extraItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => addExtraItem(item)}
                  className="flex items-center gap-4 p-3 border border-zinc-150 rounded-xl hover:border-zinc-400 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all"
                >
                  <div className="relative w-12 h-12 bg-white rounded-lg border border-zinc-200 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
                  </div>
                  <div className="flex-grow text-left">
                    <h4 className="text-xs font-bold text-zinc-950 line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{item.category}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-orange-500 hover:underline">Add +</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Wise Wishlist Selection Modal */}
      {selectionCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectionCategory(null)} />
          
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-zinc-100 flex flex-col">
            <button 
              onClick={() => setSelectionCategory(null)} 
              className="absolute top-5 right-5 text-zinc-400 hover:text-black cursor-pointer font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-sm font-black font-mono tracking-wide text-zinc-950 uppercase mb-4 text-center">
              Select {selectionCategory === "T-Shirt" ? "Top Wear" : selectionCategory === "Pants" ? "Bottom Wear" : "Accessories"}
            </h3>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {allCreatorItems
                .filter((item) => {
                  if (selectionCategory === "T-Shirt") return item.category === "T-Shirt";
                  if (selectionCategory === "Pants") return item.category === "Pants";
                  return item.category === "Accessories";
                })
                .map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSlots((prev) => {
                        if (selectionCategory === "T-Shirt") return { ...prev, top: item };
                        if (selectionCategory === "Pants") return { ...prev, bottom: item };
                        return { ...prev, accessory: item };
                      });
                      setSelectionCategory(null);
                    }}
                    className="flex items-center gap-4 p-2.5 border border-zinc-150 rounded-xl hover:border-zinc-400 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all"
                  >
                    <div className="relative w-10 h-10 bg-white rounded-lg border border-zinc-200 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" style={{ filter: item.filter }} />
                    </div>
                    <div className="flex-grow text-left">
                      <h4 className="text-xs font-bold text-zinc-950 line-clamp-1">{item.name}</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-orange-500 hover:underline">Select</span>
                  </div>
                ))}
              {allCreatorItems.filter((item) => {
                if (selectionCategory === "T-Shirt") return item.category === "T-Shirt";
                if (selectionCategory === "Pants") return item.category === "Pants";
                return item.category === "Accessories";
              }).length === 0 && (
                <p className="text-xs text-zinc-400 text-center py-4">No items available in this category. Click &quot;Add More&quot; to add items.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
