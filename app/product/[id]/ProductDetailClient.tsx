"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, MapPin, Truck, Star, Sparkles, RotateCw, RefreshCw, Folder, X, Share2, Info, Tag, Check, Mail, HandCoins, ArrowLeftRight, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { InteractiveHeartButton } from "@/components/ui/InteractiveHeartButton";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StarRating } from "@/components/ui/star-rating";
import { motion, AnimatePresence } from "framer-motion";
import { masterProducts, Product } from "./data";
import CompleteYourDrip from "@/components/features/CompleteYourDrip";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { PremiumProductCard } from "@/components/ui/PremiumProductCard";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

const DRIP_ITEMS_BY_CATEGORY: Record<string, Array<{ title: string; img: string; price: string }>> = {
  top: [
    { title: "Blue Drip Essential Tee", img: "/images/drip_tshirt_exact.png", price: "₹1,899" },
    { title: "Black Oversized Graphic Tee", img: "/images/drip_tshirt_exact.png", price: "₹2,199" },
    { title: "Neon Volt Streetwear Tee", img: "/images/drip_tshirt_exact.png", price: "₹1,999" },
    { title: "Crimson Red Vintage Tee", img: "/images/drip_tshirt_exact.png", price: "₹1,799" },
  ],
  outerwear: [
    { title: "Blue Drip Varsity Jacket", img: "/images/drip_jacket_exact.png", price: "₹4,999" },
    { title: "Black Stealth Biker Jacket", img: "/images/drip_jacket_exact.png", price: "₹5,999" },
    { title: "Olive Tactical Bomber", img: "/images/drip_jacket_exact.png", price: "₹4,499" },
    { title: "Grey Distressed Denim", img: "/images/drip_jacket_exact.png", price: "₹3,899" },
  ],
  cap: [
    { title: "Blue Drip Snapback Cap", img: "/images/drip_cap_exact.png", price: "₹1,299" },
    { title: "Black Streetwear Beanie", img: "/images/drip_cap_exact.png", price: "₹999" },
    { title: "White Minimalist Bucket Hat", img: "/images/drip_cap_exact.png", price: "₹1,199" },
    { title: "Crimson Red Dad Hat", img: "/images/drip_cap_exact.png", price: "₹1,099" },
  ],
  shoes: [
    { title: "Black / Pink Puma Nitro", img: "/images/puma_black_pink_exact.png", price: "₹6,999" },
    { title: "Black / Neon Green Puma", img: "/images/puma_black_neon_exact.png", price: "₹7,499" },
    { title: "Red Puma Running Nitro", img: "/images/puma_red_exact.png", price: "₹6,499" },
    { title: "Yellow / Orange Flame Puma", img: "/images/puma_yellow_orange_exact.png", price: "₹7,999" },
  ],
};

// Swipable lookbook items for Dressing-up the Mannequin
interface LookbookItem {
  id: string;
  name: string;
  price: string;
  category: "top" | "shorts" | "cap" | "shoes" | "socks";
  color: string;
  image: string;
}

const lookbookItems: LookbookItem[] = [
  {
    id: "item-top",
    name: "Puma Classic Tee - Blue",
    price: "₹1,899",
    category: "top",
    color: "Blue",
    image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp"
  },
  {
    id: "item-shorts",
    name: "Puma Classic Shorts - Black",
    price: "₹1,499",
    category: "shorts",
    color: "Black",
    image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp"
  },
  {
    id: "item-cap",
    name: "Streetwear Snapback Cap - Royal",
    price: "₹799",
    category: "cap",
    color: "Blue",
    image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp"
  },
  {
    id: "item-socks",
    name: "Active Crew Socks - Red",
    price: "₹299",
    category: "socks",
    color: "Red",
    image: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp"
  },
  {
    id: "item-shoes",
    name: "Puma RS-X Running Shoes",
    price: "₹4,200",
    category: "shoes",
    color: "Red",
    image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp"
  }
];

export default function ProductDetailClient({ productId }: { productId: number }) {
  // Find product by id (hoisted to the top for React hook requirements)
  const product = masterProducts.find((p) => p.id === productId) || masterProducts[0];

  // Navigation view modes (Step 1, Steps 2-3, Step 4)
  const [viewMode, setViewMode] = useState<"pdp" | "drip" | "rotate">("pdp");

  // Sync state with localStorage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [galleryMode, setGalleryMode] = useState<"grid" | "zoom">("grid");

  // Selection states
  const [selectedColor, setSelectedColor] = useState(product.color || "Black");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Sync selectedSize to product's available sizes
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Derive the active variant image
  const activeColorVariant = product.colorVariants?.find(v => v.color === selectedColor) || {
    color: product.color,
    image: product.image,
    colorHex: "#18181b"
  };
  const displayImage = activeColorVariant.image;

  // Dynamically query 4 other items from masterProducts database for the Recently Viewed section
  const recentlyViewedItems = masterProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // All Media & 3D Interactive Modal States
  const [showAllMediaModal, setShowAllMediaModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const [threeDRotationAngle, setThreeDRotationAngle] = useState(0);
  const [mediaFilter, setMediaFilter] = useState<"all" | "lookbook" | "fabric">("all");
  const [activeDetailsTab, setActiveDetailsTab] = useState<"details" | "reviews" | "tech">("details");
  const [selectedDripCategory, setSelectedDripCategory] = useState<"top" | "outerwear" | "cap" | "shoes">("shoes");
  const [selectedDripItemIndex, setSelectedDripItemIndex] = useState(0);
  const [isMannequinFlipped, setIsMannequinFlipped] = useState(false);
  const [equippedOutfit, setEquippedOutfit] = useState<{
    top?: { title: string; img: string; price: string } | null;
    outerwear?: { title: string; img: string; price: string } | null;
    cap?: { title: string; img: string; price: string } | null;
    shoes?: { title: string; img: string; price: string } | null;
  }>({
    shoes: { title: "Black / Pink Puma Nitro", img: "/images/puma_black_pink_exact.png", price: "₹6,999" },
    top: { title: "Blue Drip Essential Tee", img: "/images/drip_tshirt_exact.png", price: "₹1,899" },
    cap: { title: "Blue Drip Snapback Cap", img: "/images/drip_cap_exact.png", price: "₹1,299" }
  });

  // Touch & drag swipe gesture state handlers on main zoom image
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [mouseDownX, setMouseDownX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 40;
    if (diffX > swipeThreshold) {
      // Swiped left -> show next view
      setActiveThumbnailIndex((prev) => (prev + 1) % 4);
    } else if (diffX < -swipeThreshold) {
      // Swiped right -> show previous view
      setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDownX) return;
    const diffX = mouseDownX - e.clientX;
    const swipeThreshold = 40;
    if (diffX > swipeThreshold) {
      setActiveThumbnailIndex((prev) => (prev + 1) % 4);
    } else if (diffX < -swipeThreshold) {
      setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
    }
    setMouseDownX(0);
  };

  // Selection states
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeDeliveryText, setPincodeDeliveryText] = useState("");

  // Dynamic pincode delivery calculation
  useEffect(() => {
    const code = pincode || "400615";
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    setPincodeDeliveryText(`Expected delivery by ${date.toLocaleDateString('en-IN', options)}`);
    setPincodeChecked(true);
  }, [pincode]);

  // Live Mannequin Outfit equipped state
  const [equippedItems, setEquippedItems] = useState<{ [key: string]: boolean }>({
    top: false,
    shorts: false,
    cap: false,
    shoes: false,
    socks: false
  });

  // 360° Drag rotation states
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDraggingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startAngleRef = useRef(0);

  // Active sub-info tabs
  const [activeInfoTab, setActiveInfoTab] = useState<"story" | "fit" | "features">("story");

  // Expandable section states
  const [showFullBrandStory, setShowFullBrandStory] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Size chart modal states
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [sizeChartUnit, setSizeChartUnit] = useState<"in" | "cm">("in");

  // Premium dialogue overlay states
  const [policyOpen, setPolicyOpen] = useState(false);
  const [offersDrawerOpen, setOffersDrawerOpen] = useState(false);
  const [selectedOfferTerms, setSelectedOfferTerms] = useState<string | null>(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Newest review");

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Find product by id (hoisted to component start)

  // Derive pricing details
  const parsedPrice = parseInt(product.price.replace(/[^0-9]/g, "")) || 7999;
  const originalMrp = Math.round(parsedPrice / (1 - (product.discount / 100)));

  const handleAddRelatedToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          brand: item.brand,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          size: item.sizes?.[0] || "M",
          color: item.color || "Default"
        } as any
      ];
    });
    alert(`Added ${item.name} to your bag!`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    setCart((prev) => {
      const itemKey = `${product.id}-${selectedColor}-${selectedSize}`;
      const existing = prev.find((item) => `${item.id}-${(item as any).color}-${(item as any).size}` === itemKey);
      
      if (existing) {
        return prev.map((item) =>
          `${item.id}-${(item as any).color}-${(item as any).size}` === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          brand: product.brand,
          name: `${product.name} (${selectedColor} / Size: ${selectedSize})`,
          price: product.price,
          image: displayImage,
          quantity: 1,
          size: selectedSize,
          color: selectedColor
        } as any
      ];
    });
    alert(`Added ${product.name} (${selectedColor} / Size: ${selectedSize}) to your bag!`);
  };

  const handleMannequinAddToCart = () => {
    const itemsToAdd: any[] = [];
    if (equippedOutfit.top) {
      itemsToAdd.push({
        id: 8881,
        brand: "URBAN MONKEY",
        name: equippedOutfit.top.title,
        price: equippedOutfit.top.price,
        image: equippedOutfit.top.img,
      });
    }
    if (equippedOutfit.outerwear) {
      itemsToAdd.push({
        id: 8882,
        brand: "URBAN MONKEY",
        name: equippedOutfit.outerwear.title,
        price: equippedOutfit.outerwear.price,
        image: equippedOutfit.outerwear.img,
      });
    }
    if (equippedOutfit.cap) {
      itemsToAdd.push({
        id: 8883,
        brand: "URBAN MONKEY",
        name: equippedOutfit.cap.title,
        price: equippedOutfit.cap.price,
        image: equippedOutfit.cap.img,
      });
    }
    if (equippedOutfit.shoes) {
      itemsToAdd.push({
        id: 8884,
        brand: "PUMA",
        name: equippedOutfit.shoes.title,
        price: equippedOutfit.shoes.price,
        image: equippedOutfit.shoes.img,
      });
    }

    if (itemsToAdd.length === 0) {
      alert("No items are currently equipped on the statue!");
      return;
    }

    setCart((prev) => {
      let updatedCart = [...prev];
      itemsToAdd.forEach((newItem) => {
        const itemKey = `${newItem.id}-M`;
        const existingIdx = updatedCart.findIndex((item) => `${item.id}-${(item as any).size}` === itemKey);
        if (existingIdx > -1) {
          updatedCart[existingIdx] = {
            ...updatedCart[existingIdx],
            quantity: updatedCart[existingIdx].quantity + 1,
          };
        } else {
          updatedCart.push({
            ...newItem,
            quantity: 1,
            size: "M"
          });
        }
      });
      return updatedCart;
    });

    alert("Mannequin outfit items have been added to your bag!");
  };

  const handleToggleFavorite = () => {
    setWishlist((prev) => {
      const isFav = prev.some((item) => item.id === product.id);
      if (isFav) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        { id: product.id, name: product.name, brand: product.brand, price: product.price, image: displayImage }
      ];
    });
  };

  const handleToggleItemWishlist = (item: { id: number; brand: string; title: string; price: string; img: string }) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        return prev.filter((w) => w.id !== item.id);
      }
      return [
        ...prev,
        { id: item.id, brand: item.brand, name: item.title, price: item.price, image: item.img }
      ];
    });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      alert("Please enter a valid 6-digit Pincode!");
      return;
    }
    setPincodeChecked(true);
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    setPincodeDeliveryText(`Expected delivery by ${date.toLocaleDateString('en-IN', options)}`);
  };

  const isProductInWishlist = wishlist.some((item) => item.id === product.id);

  // Alternate images zoom/detail views for PDP
  const imageViews = [
    { label: "Front Profile", class: "object-cover object-center" },
    { label: "Back Logo Branding", class: "object-cover object-bottom scale-110" },
    { label: "Zipper Ribbing Close-Up", class: "object-cover scale-150 object-top" },
    { label: "Embroidered Scuderia Emblem", class: "object-cover scale-[1.75] object-center" },
    { label: "Lifestyle Walker Model", class: "object-cover object-top filter contrast-[1.05]" }
  ];

  // 360° Drag rotation handlers
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    startDragXRef.current = clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startDragXRef.current;
    // Map drag pixel offset to degrees of rotation
    const multiplier = 0.8;
    setRotationAngle(startAngleRef.current + deltaX * multiplier);
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const toggleEquipped = (category: string) => {
    setEquippedItems(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between select-none">
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={(id) => setCart((prev) => prev.filter((item) => item.id !== id))}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={(id, qty) => {
          if (qty <= 0) {
            setCart((prev) => prev.filter((item) => item.id !== id));
            return;
          }
          setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
        }}
        onAddToCart={(p) => {
          setCart((prev) => {
            const existing = prev.find((item) => item.id === p.id);
            if (existing) {
              return prev.map((item) => (item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prev, { ...p, quantity: 1 }];
          });
        }}
      />



      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full font-sans">
        
        {/* Navigation Breadcrumbs */}
        <Breadcrumb 
          items={[
            { label: "Shop", href: "/shop" },
            { label: `${product.brand} Scuderia` }
          ]}
          className="mb-8"
        />

        {/* Dynamic Interface based on step state */}
        <AnimatePresence mode="wait">
          {viewMode === "pdp" && (
            <motion.div
              key="pdp-default"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 w-full"
            >
              {/* Top Hero Section: Left Gallery (col-span-7) + Right Buy Panel (col-span-5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
              
              {/* LEFT SIDE: Grid mode vs. Zoom mode (Figma Layouts) */}
              <div className="lg:col-span-7 w-full">
                {galleryMode === "grid" ? (
                  /* 2x2 Grid Layout (Figma Image 1 Layout) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {imageViews.map((view, index) => (
                      <div 
                        key={index} 
                        className={`relative aspect-[3/4] bg-zinc-50 rounded-[24px] overflow-hidden border border-zinc-150 group cursor-pointer ${
                          index === 4 ? "sm:col-span-2 aspect-[16/10]" : ""
                        }`}
                        onClick={() => {
                          setActiveThumbnailIndex(index >= 4 ? 0 : index);
                          setGalleryMode("zoom");
                        }}
                      >
                        <Image
                          src={displayImage}
                          alt={`${product.name} - ${view.label}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className={`transition-transform duration-500 group-hover:scale-105 ${view.class}`}
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          🔍 Click to zoom detail
                        </div>
                        <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity bg-black/40 text-white font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                          {view.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Zoomed Thumbnail + Main Image Layout (Figma Image 2 Layout) */
                  <div className="space-y-4">
                    {/* Back to Grid Link */}
                    <div className="flex justify-start">
                      <button
                        onClick={() => setGalleryMode("grid")}
                        className="text-xs font-mono font-black uppercase text-zinc-500 hover:text-black transition-colors cursor-pointer border-none bg-transparent flex items-center gap-1 hover:underline"
                      >
                        ← Back to Grid View
                      </button>
                    </div>

                    <div className="flex gap-4 items-start w-full">
                      {/* Vertical Thumbnails Stack (Left) */}
                      <div className="w-20 flex-shrink-0 flex flex-col gap-3">
                        {imageViews.slice(0, 4).map((view, index) => {
                          const isActive = activeThumbnailIndex === index;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveThumbnailIndex(index)}
                              className={`relative w-full aspect-[3/4] bg-zinc-50 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                isActive ? "border-orange-500 ring-2 ring-orange-500/25 scale-[1.03]" : "border-zinc-200 hover:border-zinc-450"
                              }`}
                            >
                              <Image
                                src={displayImage}
                                alt={view.label}
                                fill
                                sizes="80px"
                                className={`${view.class}`}
                              />
                            </button>
                          );
                        })}
                        {/* Down Arrow Indicator button */}
                        <button 
                          onClick={() => setActiveThumbnailIndex(prev => (prev + 1) % 4)}
                          className="w-full aspect-square border border-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-50 text-zinc-500 transition-colors cursor-pointer bg-white"
                        >
                          <span className="text-xs font-bold font-mono">▼</span>
                        </button>
                      </div>

                      {/* Main Display Image Container (Right) */}
                      <div className="flex-grow flex flex-col items-center gap-4">
                        <div className="w-full relative aspect-[3/4] bg-zinc-50 rounded-[32px] overflow-hidden border border-zinc-150 shadow-xs select-none">
                          <motion.div
                            key={activeThumbnailIndex}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.4}
                            onDragEnd={(e, info) => {
                              const swipeThreshold = 50;
                              if (info.offset.x < -swipeThreshold) {
                                // Dragged left -> show next
                                setActiveThumbnailIndex((prev) => (prev + 1) % 4);
                              } else if (info.offset.x > swipeThreshold) {
                                // Dragged right -> show previous
                                setActiveThumbnailIndex((prev) => (prev - 1 + 4) % 4);
                              }
                            }}
                            className="relative w-full h-full cursor-ew-resize active:cursor-grabbing"
                          >
                            <Image
                              src={displayImage}
                              alt={product.name}
                              fill
                              priority
                              draggable="false"
                              sizes="(max-width: 1024px) 80vw, 50vw"
                              className={`transition-transform duration-500 pointer-events-none ${imageViews[activeThumbnailIndex].class}`}
                            />
                          </motion.div>
                          
                          {/* Image view mode tag */}
                          <div className="absolute bottom-4 left-4 bg-black/60 text-white font-mono text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold z-10 select-none pointer-events-none">
                            {imageViews[activeThumbnailIndex].label}
                          </div>
                        </div>

                        {/* Interactive Pagination Dot/Bar Indicator */}
                        <div className="flex items-center gap-1.5 select-none pt-1">
                          {Array.from({ length: 4 }).map((_, idx) => {
                            const isActive = activeThumbnailIndex === idx;
                            return (
                              <button
                                key={idx}
                                onClick={() => setActiveThumbnailIndex(idx)}
                                className={`h-1.5 transition-all duration-300 cursor-pointer border-none ${
                                  isActive ? "bg-[#f05a28] w-6 rounded-full" : "bg-zinc-300 w-1.5 rounded-full hover:bg-zinc-400"
                                }`}
                                aria-label={`View image ${idx + 1}`}
                              />
                            );
                          })}
                        </div>

                        {/* Interactive Action Buttons: All media & View in 3D (Shown ONLY in Zoom View Mode) */}
                        <div className="flex items-center justify-center gap-3 pt-4 select-none w-full">
                          {/* All media button */}
                          <button
                            onClick={() => {
                              setShowAllMediaModal(!showAllMediaModal);
                              if (!showAllMediaModal) setShow3DModal(false);
                            }}
                            className={`font-extrabold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-all transform active:scale-95 cursor-pointer border-none ${
                              showAllMediaModal 
                                ? "bg-amber-500 text-black ring-2 ring-amber-400" 
                                : "bg-[#ffe500] hover:bg-[#ffd600] text-black"
                            }`}
                          >
                            <Folder className="w-4 h-4 fill-black/30 text-black" />
                            <span className="tracking-wide">{showAllMediaModal ? "Hide Media" : "All media"}</span>
                          </button>

                          {/* View in 3D button */}
                          <button
                            onClick={() => {
                              setShow3DModal(!show3DModal);
                              if (!show3DModal) setShowAllMediaModal(false);
                            }}
                            className={`border font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-all transform active:scale-95 cursor-pointer ${
                              show3DModal 
                                ? "bg-zinc-900 text-white border-zinc-900" 
                                : "bg-white hover:bg-zinc-50 text-black border-zinc-250"
                            }`}
                          >
                            <RotateCw className={`w-4 h-4 ${show3DModal ? "text-amber-400 animate-spin-slow" : "text-zinc-700"}`} />
                            <span className="tracking-wide">{show3DModal ? "Hide 3D View" : "View in 3D"}</span>
                          </button>
                        </div>

                        {/* INLINE ALL MEDIA & GALLERY CONTAINER (Opens directly below the buttons) */}
                        <AnimatePresence>
                          {showAllMediaModal && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full bg-white rounded-[28px] overflow-hidden border border-zinc-200 shadow-xl select-none"
                            >
                              {/* Header */}
                              <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-150 bg-zinc-50">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-[#ffe500] flex items-center justify-center">
                                    <Folder className="w-4 h-4 text-black" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-zinc-955 uppercase tracking-wide font-sans">
                                      All Media & Gallery
                                    </h4>
                                    <p className="text-[10px] text-zinc-500 font-medium font-sans">
                                      {product.brand} - {product.name} (6 media files available)
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setShowAllMediaModal(false)}
                                  className="p-1.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer text-zinc-600 hover:text-black border-none bg-transparent"
                                  aria-label="Close All Media"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Media Grid Content */}
                              <div className="p-4 sm:p-5 space-y-4 max-h-[480px] overflow-y-auto">
                                {/* Category Filter Pills */}
                                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                                  {[
                                    { id: "all", label: "All Photos (6)" },
                                    { id: "lookbook", label: "Lookbook Shots (4)" },
                                    { id: "fabric", label: "Fabric Zoom (2)" }
                                  ].map((tab) => (
                                    <button
                                      key={tab.id}
                                      onClick={() => setMediaFilter(tab.id as "all" | "lookbook" | "fabric")}
                                      className={`text-[10px] font-bold px-3.5 py-1 rounded-full cursor-pointer transition-all border-none ${
                                        mediaFilter === tab.id
                                          ? "bg-black text-white shadow-xs"
                                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                      }`}
                                    >
                                      {tab.label}
                                    </button>
                                  ))}
                                </div>

                                {/* Media Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {[
                                    { id: 0, title: "Front Studio View", img: displayImage, cat: "lookbook", tag: "Photo", class: "" },
                                    { id: 1, title: "Back Graphic View", img: displayImage, cat: "lookbook", tag: "Photo", class: "scale-110" },
                                    { id: 2, title: "Fabric Zoom Detail", img: displayImage, cat: "fabric", tag: "Macro", class: "scale-150" },
                                    { id: 3, title: "On-Model Street Style", img: displayImage, cat: "lookbook", tag: "Lookbook", class: "scale-125" },
                                    { id: 4, title: "Collab Patch Close-up", img: displayImage, cat: "fabric", tag: "Detail", class: "scale-140" },
                                    { id: 5, title: "Studio Outfit Profile", img: displayImage, cat: "lookbook", tag: "Style", class: "scale-105" }
                                  ]
                                    .filter((item) => mediaFilter === "all" || item.cat === mediaFilter)
                                    .map((media, idx) => (
                                      <div
                                        key={idx}
                                        onClick={() => {
                                          setActiveThumbnailIndex(media.id % 4);
                                        }}
                                        className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-black transition-all hover:shadow-md"
                                      >
                                        <Image
                                          src={media.img}
                                          alt={media.title}
                                          fill
                                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${media.class}`}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                                          {media.tag}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                          <p className="text-[11px] font-bold truncate">{media.title}</p>
                                          <p className="text-[9px] text-zinc-300 font-mono">Click to inspect</p>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {/* Footer */}
                              <div className="p-3 px-4 bg-zinc-50 border-t border-zinc-150 flex items-center justify-between">
                                <p className="text-[10px] text-zinc-500 font-mono">
                                  Showing 6 media assets for {product.name}
                                </p>
                                <button
                                  onClick={() => setShowAllMediaModal(false)}
                                  className="bg-black text-white text-[11px] font-bold px-4 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer border-none"
                                >
                                  Close Gallery
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* INLINE 3D 360° INTERACTIVE PRODUCT VIEWER (Opens directly below the button) */}
                        <AnimatePresence>
                          {show3DModal && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full bg-white rounded-[28px] overflow-hidden border border-zinc-200 shadow-xl select-none"
                            >
                              {/* 3D Header Bar */}
                              <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-150 bg-zinc-50">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                                    <RotateCw className="w-4 h-4 animate-spin-slow" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-zinc-955 uppercase tracking-wide font-sans">
                                      3D 360° Interactive Product Viewer
                                    </h4>
                                    <p className="text-[10px] text-zinc-500 font-medium font-sans">
                                      Drag cursor or finger left/right to rotate product 360°
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setShow3DModal(false)}
                                  className="p-1.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer text-zinc-600 hover:text-black border-none bg-transparent"
                                  aria-label="Close 3D View"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              {/* 3D Canvas / Interactive Rotation Viewport */}
                              <div 
                                className="relative w-full aspect-[4/3] bg-gradient-to-b from-zinc-100 via-zinc-50 to-white flex items-center justify-center overflow-hidden p-6 cursor-ew-resize active:cursor-grabbing"
                                onMouseDown={(e) => {
                                  isDraggingRef.current = true;
                                  startDragXRef.current = e.clientX;
                                  startAngleRef.current = threeDRotationAngle;
                                }}
                                onMouseMove={(e) => {
                                  if (!isDraggingRef.current) return;
                                  const deltaX = e.clientX - startDragXRef.current;
                                  setThreeDRotationAngle((startAngleRef.current + deltaX * 0.8) % 360);
                                }}
                                onMouseUp={() => { isDraggingRef.current = false; }}
                                onMouseLeave={() => { isDraggingRef.current = false; }}
                                onTouchStart={(e) => {
                                  isDraggingRef.current = true;
                                  startDragXRef.current = e.touches[0].clientX;
                                  startAngleRef.current = threeDRotationAngle;
                                }}
                                onTouchMove={(e) => {
                                  if (!isDraggingRef.current) return;
                                  const deltaX = e.touches[0].clientX - startDragXRef.current;
                                  setThreeDRotationAngle((startAngleRef.current + deltaX * 0.8) % 360);
                                }}
                                onTouchEnd={() => { isDraggingRef.current = false; }}
                              >
                                {/* Rotating Image Container */}
                                <div className="relative w-64 sm:w-80 aspect-[3/4] flex items-center justify-center">
                                  <motion.div 
                                    className="relative w-full h-full"
                                    style={{ transform: `rotateY(${threeDRotationAngle}deg)` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                  >
                                    <Image
                                      src={displayImage}
                                      alt={`${product.name} 3D Rotation`}
                                      fill
                                      priority
                                      className="object-contain filter drop-shadow-2xl pointer-events-none"
                                    />
                                  </motion.div>
                                </div>

                                {/* Drag Indicator Badge */}
                                <div className="absolute bottom-4 bg-black/75 backdrop-blur-xs text-white px-4 py-1.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                                  <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                                  <span>Angle: {Math.round((threeDRotationAngle % 360 + 360) % 360)}° • Drag horizontally to spin</span>
                                </div>
                              </div>

                              {/* 3D Bottom Controls */}
                              <div className="p-3 px-4 bg-zinc-50 border-t border-zinc-150 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => setThreeDRotationAngle(prev => prev - 45)}
                                    className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[10px] font-mono font-bold hover:bg-zinc-100 cursor-pointer"
                                  >
                                    ⟲ Left 45°
                                  </button>
                                  <button
                                    onClick={() => setThreeDRotationAngle(prev => prev + 45)}
                                    className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[10px] font-mono font-bold hover:bg-zinc-100 cursor-pointer"
                                  >
                                    ⟳ Right 45°
                                  </button>
                                  <button
                                    onClick={() => setThreeDRotationAngle(0)}
                                    className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[10px] font-mono font-bold hover:bg-zinc-100 cursor-pointer text-zinc-500"
                                  >
                                    Reset 0°
                                  </button>
                                </div>

                                <button
                                  onClick={() => setShow3DModal(false)}
                                  className="bg-black text-white text-[11px] font-bold px-4 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer border-none"
                                >
                                  Close 3D View
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Buy specs panel (EXACT MATCH FOR FIGMA IMAGE 1) */}
              <div className="lg:col-span-5 space-y-6 text-left select-none font-sans">
                
                {/* Brand Title Row + ID & Share */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-heading text-base font-black text-zinc-900 uppercase tracking-wider">
                      {product.brand}
                    </h1>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 font-mono border border-amber-200/50">
                        <Info className="w-3.5 h-3.5 text-amber-600" /> ID: 2S46FF
                      </span>
                      <button 
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Product link copied to clipboard!");
                          }
                        }}
                        aria-label="Share product"
                        className="text-zinc-400 hover:text-zinc-900 transition-colors p-1.5 rounded-lg hover:bg-zinc-50 border-none bg-transparent cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-2 text-sm text-zinc-800 font-medium">
                  <span className="bg-zinc-900 text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md">
                    {product.rating.toFixed(1)}
                  </span>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const ratingValue = i + 1;
                      const isHalf = product.rating > i && product.rating < ratingValue;
                      const isFull = product.rating >= ratingValue;
                      return (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            isFull ? "fill-amber-400 text-amber-400" : isHalf ? "fill-amber-400/50 text-amber-400" : "text-zinc-200 fill-zinc-100"
                          }`} 
                        />
                      );
                    })}
                  </div>
                  <span className="text-zinc-400 text-xs font-medium">| 2.3K reviews</span>
                </div>

                {/* Sold by seller */}
                <p className="text-sm text-zinc-600 font-medium">
                  Sold by: <span className="text-zinc-900 font-semibold">Drip Hunter Authorized Retailer</span>
                </p>

                {/* Pricing Block */}
                <div className="space-y-1 bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs text-zinc-400 font-bold line-through font-mono">
                      ₹{originalMrp.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-900 font-mono tracking-tight">
                        {product.price}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 font-mono">
                    {product.discount}% OFF
                  </span>
                </div>

                {/* Colour Options */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Color: <span className="text-zinc-500 font-normal font-mono normal-case capitalize">{selectedColor}</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    {(product.colorVariants || [
                      {
                        color: product.color,
                        image: product.image,
                        colorHex: "#18181b"
                      }
                    ]).map((variant) => {
                      const isSelected = selectedColor === variant.color;
                      return (
                        <button
                          key={variant.color}
                          onClick={() => setSelectedColor(variant.color)}
                          aria-label={`Select color ${variant.color}`}
                          className={`w-12 h-16 relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-zinc-50 ${
                            isSelected 
                              ? "border-black ring-2 ring-black/10 scale-105 shadow-sm" 
                              : "border-zinc-200 hover:border-zinc-400 hover:scale-102"
                          }`}
                        >
                          <Image
                            src={variant.image}
                            alt={`${product.name} in ${variant.color}`}
                            fill
                            sizes="50px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Options & Size chart link */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Size Options
                    </h3>
                    <button 
                      onClick={() => setShowSizeChart(true)}
                      className="text-xs font-semibold text-[#d4af37] hover:text-[#b3922e] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Size chart
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-black border-black text-white font-extrabold shadow-sm scale-105" 
                              : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Add to Wishlist */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <InteractiveAddToCartButton
                      onClick={handleAddToCart}
                      buttonText="Add to Cart"
                      addedText="Added to Cart"
                      animationStyle="truck"
                      size="md"
                      className="w-full !bg-black hover:!bg-zinc-900 text-white font-bold text-xs py-4 rounded-xl border-none tracking-widest uppercase cursor-pointer"
                      wrapperClassName="flex-1"
                    />

                    <button
                      onClick={handleToggleFavorite}
                      className={`flex-1 border text-xs font-bold py-4 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest ${
                        isProductInWishlist
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300"
                      }`}
                    >
                      <span>{isProductInWishlist ? "Wishlisted" : "Add to Wishlist"}</span>
                    </button>
                  </div>

                  {/* Warranty Subtext */}
                  <p className="text-[10px] text-center text-zinc-450 font-mono uppercase tracking-wider font-semibold">
                    1 Year Brand Warranty*
                  </p>
                </div>

                {/* Complete Your Look Banner Button */}
                <button
                  onClick={() => setViewMode("drip")}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-[#fbc02d] font-bold text-xs uppercase tracking-widest py-4 rounded-xl border border-zinc-850 shadow-md transition-all cursor-pointer font-sans"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse fill-yellow-400" />
                  <span>Complete Your Look (Fitting Customizer)</span>
                </button>

                {/* Delivery Options Box */}
                <div className="space-y-3 pt-3 border-t border-zinc-150">
                  <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                    Delivery Options <Truck className="w-4 h-4 text-zinc-700" />
                  </h3>

                  {/* Pincode Input */}
                  <div className="border border-zinc-200 rounded-lg p-1.5 pl-4 flex items-center justify-between max-w-xs bg-white">
                    <span className="text-xs font-mono text-zinc-700 font-semibold">{pincode || "400615"}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <button 
                        onClick={() => {
                          const code = prompt("Enter 6-digit Pincode:", pincode || "400615");
                          if (code) setPincode(code);
                        }}
                        className="text-xs font-semibold text-[#f05a28] hover:underline bg-transparent border-none cursor-pointer pr-1"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Feature Rows */}
                  <div className="space-y-3 pt-2 text-xs text-zinc-800">
                    {/* Mailbox / Estimate Delivery */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-800">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-zinc-900">
                        Estimate Delivery, May 17
                      </span>
                    </div>

                    {/* Pay on delivery */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-800">
                        <HandCoins className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-zinc-900">
                        Pay on delivery available
                      </span>
                    </div>

                    {/* Return & Exchange */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-800">
                          <ArrowLeftRight className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-zinc-900">
                          Easy 12 days return &amp; exchange available
                        </span>
                      </div>
                      <button 
                        onClick={() => setPolicyOpen(true)}
                        className="text-xs font-semibold text-[#fbc02d] hover:underline bg-transparent border-none cursor-pointer flex-shrink-0"
                      >
                        More Info
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 text-center font-medium pt-1">
                    100% Original Product
                  </p>
                </div>

                {/* Best Offers Section */}
                <div className="space-y-3 pt-3 border-t border-zinc-150">
                  <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                    Best Offers <Tag className="w-3.5 h-3.5 text-zinc-800 fill-zinc-800" />
                  </h3>

                  {/* Offer Cards */}
                  <div className="space-y-2.5">
                    {[1, 2, 3].map((idx) => (
                      <div 
                        key={idx}
                        className="border border-zinc-200 rounded-lg p-3 bg-white space-y-1 hover:border-zinc-350 transition-colors"
                      >
                        <h4 className="text-xs font-bold text-zinc-900">
                          {idx === 1 ? "7.5% Discount on Myntra Kotak Credit Card" : idx === 2 ? "10% Instant Discount on HDFC Cards" : "Flat ₹500 Cashback on UPI Transactions"}
                        </h4>
                        <p className="text-[11px] text-zinc-500 font-medium">
                          {idx === 1 ? "Max Discount Up to ₹750 on every spends." : idx === 2 ? "Max Discount Up to ₹1,500 on fashion purchase." : "Min transaction of ₹2,499 required."}
                        </p>
                        <button 
                          onClick={() => setSelectedOfferTerms(
                            idx === 1 
                              ? "Offer Terms & Conditions (Kotak Card):\n- Valid on transactions above ₹1,999.\n- Maximum discount capped at ₹750.\n- Applicable once per user per month." 
                              : idx === 2 
                                ? "Offer Terms & Conditions (HDFC Card):\n- Valid on transactions above ₹4,999.\n- Maximum discount capped at ₹1,500.\n- Applicable on Credit Card EMI only." 
                                : "Offer Terms & Conditions (UPI Cashback):\n- Valid on transactions above ₹2,499.\n- Flat ₹500 cashback credited within 48 hours.\n- Applicable on GPay and PhonePe payments."
                          )}
                          className="text-[11px] font-semibold text-[#f05a28] hover:underline bg-transparent border-none cursor-pointer pt-0.5 block"
                        >
                          Terms &amp; Condition
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* View More Link */}
                  <div className="text-center pt-1">
                    <button 
                      onClick={() => setOffersDrawerOpen(true)}
                      className="text-xs font-semibold text-[#fbc02d] hover:underline bg-transparent border-none cursor-pointer"
                    >
                      View More
                    </button>
                  </div>
                </div>

              </div>
              </div>

              {/* NEW SECTION: Tabbed Specs & Details + Brand Story Banner (EXACT MATCH FOR FIGMA SCREENSHOT) */}
              <div className="w-full mt-10 pt-8 border-t border-zinc-200 text-left font-sans select-none space-y-8">
                
                {/* Tab Navigation Header (Yellow Pill active indicator) */}
                <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-6 border-b border-zinc-200 pb-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveDetailsTab("details")}
                    className={`text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-all cursor-pointer border-none ${
                      activeDetailsTab === "details"
                        ? "bg-accent text-accent-foreground shadow-xs font-black"
                        : "bg-transparent text-muted-foreground hover:text-foreground font-semibold"
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveDetailsTab("reviews")}
                    className={`text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-all cursor-pointer border-none ${
                      activeDetailsTab === "reviews"
                        ? "bg-accent text-accent-foreground shadow-xs font-black"
                        : "bg-transparent text-muted-foreground hover:text-foreground font-semibold"
                    }`}
                  >
                    Product Reviews
                  </button>
                  <button
                    onClick={() => setActiveDetailsTab("tech")}
                    className={`text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg transition-all cursor-pointer border-none ${
                      activeDetailsTab === "tech"
                        ? "bg-accent text-accent-foreground shadow-xs font-black"
                        : "bg-transparent text-muted-foreground hover:text-foreground font-semibold"
                    }`}
                  >
                    Technical Information
                  </button>
                </div>

                {/* Tab Content 1: Product Details (Exact Match for Screenshot) */}
                {activeDetailsTab === "details" && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    
                    {/* Product Story Paragraph */}
                    <div className="space-y-2 max-w-5xl">
                      <h3 className="text-base font-bold text-zinc-950">
                        Product Story
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                        Crafted with a stretchy elasticated waistband, you'll get an effortless fit for maximum comfort in PUMA x one8 Men's Knitted 8" Training Shorts. The slip pockets provide a convenient place to store your essentials, while the PUMA Cat logo adds a subtle branding element. Whether you're hitting the gym or running errands around town, these shorts are the perfect addition to your wardrobe.
                      </p>
                    </div>

                    {/* 3 Columns Grid: Material Information, Care Instructions, FEATURES & BENEFITS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                      
                      {/* Column 1: Material Information */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-zinc-950">
                          Material Information
                        </h4>
                        <ul className="text-xs sm:text-sm text-zinc-600 space-y-1 list-disc list-inside">
                          <li>Shell: 87% polyester, 13% elastane</li>
                          <li>Pocket Bag: 100% polyester</li>
                        </ul>
                      </div>

                      {/* Column 2: Care Instructions */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-zinc-955">
                          Care Instructions
                        </h4>
                        <ul className="text-xs sm:text-sm text-zinc-600 space-y-1 list-disc list-inside">
                          <li>Do not use fabric softener</li>
                          <li>Exclusive of Decoration</li>
                          <li>Do not iron print</li>
                          <li>Wash with similar colours</li>
                          <li>Use only mild detergent</li>
                        </ul>
                      </div>

                      {/* Column 3: FEATURES & BENEFITS */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-zinc-955 uppercase tracking-wide">
                          FEATURES &amp; BENEFITS
                        </h4>
                        <ul className="text-xs sm:text-sm text-zinc-600 space-y-1 list-disc list-inside">
                          <li>CLOUDSPUN: Custom-milled performance poly/spandex blend, for optimal performance</li>
                        </ul>
                      </div>

                    </div>

                  </div>
                )}

                {/* Tab Content 2: Product Reviews (EXACT MATCH FOR FIGMA SCREENSHOT) */}
                {activeDetailsTab === "reviews" && (
                  <div className="space-y-10 animate-in fade-in duration-300 w-full font-sans select-none">
                    
                    {/* Top Sort By Dropdown */}
                    <div className="flex justify-end relative">
                      <button
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="border border-zinc-300 rounded-lg px-4 py-2 bg-white flex items-center gap-3 text-xs font-semibold text-zinc-800 shadow-2xs cursor-pointer hover:border-zinc-400 active:scale-98 transition-all"
                      >
                        <span>Sort by : <strong className="font-bold text-zinc-950">{selectedSortOption}</strong></span>
                        <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isSortDropdownOpen ? "-rotate-90" : "rotate-90"}`} />
                      </button>

                      {isSortDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                          {["Newest review", "Oldest review", "Highest rating", "Lowest rating"].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSelectedSortOption(option);
                                setIsSortDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors border-none bg-transparent cursor-pointer ${
                                selectedSortOption === option 
                                  ? "text-zinc-950 bg-zinc-100" 
                                  : "text-[#4b5563] hover:bg-zinc-50 hover:text-zinc-900"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Left Score + Right Progress Rating Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-zinc-150 pb-8">
                      
                      {/* Left: Overall Score (4.7) & Stars */}
                      <div className="md:col-span-4 space-y-1">
                        <span className="text-xs font-bold text-zinc-800">Reviews</span>
                        <h2 className="text-5xl font-black text-zinc-950 font-sans leading-none">
                          4.7
                        </h2>
                        <div className="flex items-center gap-1 text-[#ffeb3b] pt-1">
                          <Star className="w-5 h-5 fill-[#ffeb3b]" />
                          <Star className="w-5 h-5 fill-[#ffeb3b]" />
                          <Star className="w-5 h-5 fill-[#ffeb3b]" />
                          <Star className="w-5 h-5 fill-[#ffeb3b]" />
                          <Star className="w-5 h-5 fill-[#ffeb3b]" />
                        </div>
                        <p className="text-xs text-zinc-400 font-medium font-sans">
                          (578 Reviews)
                        </p>
                      </div>

                      {/* Right: Stars Progress Bars Stack */}
                      <div className="md:col-span-8 space-y-2 font-sans text-xs">
                        {[
                          { stars: "5 stars", count: 488, percent: 85 },
                          { stars: "4 stars", count: 74, percent: 30 },
                          { stars: "3 stars", count: 14, percent: 8 },
                          { stars: "2 stars", count: 0, percent: 0 },
                          { stars: "1 star", count: 0, percent: 0 }
                        ].map((row, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <span className="w-12 text-zinc-600 font-medium text-right">{row.stars}</span>
                            <div className="flex-grow h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#ffeb3b] rounded-full transition-all duration-500"
                                style={{ width: `${row.percent}%` }}
                              />
                            </div>
                            <span className="w-8 text-zinc-500 font-mono font-medium text-left">{row.count}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Review Item Cards List (Left Review Text + Right 4 Donut Gauges) */}
                    <div className="space-y-12 divide-y divide-zinc-150">
                      {[
                        { date: "May 17, 2024", timestamp: 1715904000000, score: 5, name: "Emily R.", avatar: "ER", comment: "The fabric quality and athletic fit on these shorts are top tier! Perfect for workout sessions and street style.", quality: 85, comfort: 90, fit: 80, value: 95 },
                        { date: "May 14, 2024", timestamp: 1715644800000, score: 5, name: "Marcus T.", avatar: "MT", comment: "Super breathable materials with classic Puma T7 stripe branding. High-grade stitching that lasts.", quality: 90, comfort: 85, fit: 85, value: 90 },
                        { date: "May 10, 2024", timestamp: 1715302400000, score: 5, name: "Sarah K.", avatar: "SK", comment: "Fast delivery and 100% authentic Puma gear. Size fits true to chart with great flex.", quality: 95, comfort: 95, fit: 90, value: 85 },
                        { date: "May 02, 2024", timestamp: 1714608000000, score: 4, name: "David L.", avatar: "DL", comment: "Scuderia Ferrari accents look premium in person. Worth every rupee!", quality: 80, comfort: 90, fit: 85, value: 90 },
                        { date: "Apr 28, 2024", timestamp: 1714262400000, score: 5, name: "Ananya S.", avatar: "AS", comment: "Looks amazing paired with oversized graphic tees. High comfort waistband.", quality: 90, comfort: 95, fit: 90, value: 95 },
                        { date: "Apr 21, 2024", timestamp: 1713657600000, score: 4, name: "Vikram P.", avatar: "VP", comment: "Heavyweight comfort and lightweight breathability combined perfectly.", quality: 85, comfort: 85, fit: 85, value: 85 }
                      ]
                      .sort((a, b) => {
                        if (selectedSortOption === "Newest review") {
                          return b.timestamp - a.timestamp;
                        } else if (selectedSortOption === "Oldest review") {
                          return a.timestamp - b.timestamp;
                        } else if (selectedSortOption === "Highest rating") {
                          return b.score - a.score || b.timestamp - a.timestamp;
                        } else if (selectedSortOption === "Lowest rating") {
                          return a.score - b.score || b.timestamp - a.timestamp;
                        }
                        return 0;
                      })
                      .slice(0, showAllReviews ? 6 : 2)
                      .map((review, itemIdx) => (
                        <div key={itemIdx} className="pt-8 first:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                          
                          {/* Left Column: Date, Rating Stars, Avatar, Name & Review Comment */}
                          <div className="lg:col-span-7 space-y-3">
                            <p className="text-xs text-zinc-400 font-medium font-sans">
                              {review.date}
                            </p>

                            <div className="flex items-center gap-1 text-[#ffeb3b]">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.score ? "fill-[#ffeb3b]" : "text-zinc-200 fill-zinc-200"}`} 
                                />
                              ))}
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                              <div className="w-8 h-8 rounded-full bg-[#9bb2ff] text-[#2e4ec6] font-extrabold text-xs flex items-center justify-center font-mono">
                                {review.avatar}
                              </div>
                              <span className="text-sm font-bold text-zinc-955">
                                {review.name}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-xl">
                              {review.comment}
                            </p>
                          </div>

                          {/* Right Column: 4 Circular Donut Gauges (Quality, Comfort, Fit, Value for Money) */}
                          <div className="lg:col-span-5 grid grid-cols-4 gap-2 sm:gap-4 items-center justify-items-center">
                            {/* Quality Gauge */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-zinc-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path className="text-[#ffeb3b]" strokeDasharray={`${review.quality}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                              </div>
                              <span className="text-xs font-semibold text-zinc-700">Quality</span>
                            </div>

                            {/* Comfort Gauge */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-zinc-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path className="text-[#ffeb3b]" strokeDasharray={`${review.comfort}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                              </div>
                              <span className="text-xs font-semibold text-zinc-700">Comfort</span>
                            </div>

                            {/* Fit Gauge */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-zinc-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path className="text-[#ffeb3b]" strokeDasharray={`${review.fit}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                              </div>
                              <span className="text-xs font-semibold text-zinc-700">Fit</span>
                            </div>

                            {/* Value for Money Gauge */}
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path className="text-zinc-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  <path className="text-[#ffeb3b]" strokeDasharray={`${review.value}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                              </div>
                              <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">Value for Money</span>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Bottom Expand Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => setShowAllReviews((prev) => !prev)}
                        className="w-full border border-zinc-400 hover:border-black rounded-xl py-3.5 text-center text-xs font-bold text-zinc-800 bg-white hover:bg-zinc-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>{showAllReviews ? "Show less reviews" : "View all the reviews (27)"}</span>
                        <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform duration-300 ${showAllReviews ? "-rotate-90" : "rotate-90"}`} />
                      </button>
                    </div>

                  </div>
                )}

                {/* Tab Content 3: Technical Information (EXACT MATCH FOR FIGMA SCREENSHOT) */}
                {activeDetailsTab === "tech" && (
                  <div className="space-y-6 animate-in fade-in duration-300 w-full max-w-4xl font-sans select-none">
                    <div className="space-y-4 pt-2">
                      {[
                        { label: "Product Dimensions", value: "22 x 34 x 5 cm" },
                        { label: "Item Weight", value: "135 g" },
                        { label: "Material type", value: "Polyester" },
                        { label: "Style", value: "Bermuda Shorts" },
                        { label: "Length", value: "Standard Length" },
                        { label: "Care instructions", value: "Machine Wash" },
                        { label: "Manufacturer", value: "Puma, Sin Joo Bo International Limited Hung Dao Commune Duong Kinh District 18671 Hai Phong City" },
                        { label: "Country of Origin", value: "India" }
                      ].map((row, idx) => (
                        <div 
                          key={idx} 
                          className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-2.5 items-start text-xs sm:text-sm font-sans"
                        >
                          <div className="sm:col-span-4 font-bold text-zinc-950">
                            {row.label}
                          </div>
                          <div className="sm:col-span-8 font-normal text-zinc-600 leading-relaxed">
                            {row.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BRAND STORY BANNER: DARK RED / MAROON PUMA BANNER (Exact Match for Leaping Puma Barcode Vector Watermark) */}
                <div className="relative w-full rounded-[24px] overflow-hidden bg-[#450505] text-white p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-xl select-none mt-10 min-h-[230px]">
                  
                  {/* Top Row of 7 Barcode-Striped Puma Cat (Tiger) Watermarks */}
                  <div className="absolute top-2 inset-x-0 flex items-center justify-between opacity-50 pointer-events-none px-2 sm:px-6">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <svg key={`top-${i}`} className="w-16 sm:w-20 h-10 sm:h-12 text-zinc-300" viewBox="0 0 90 60" fill="currentColor">
                        <g opacity="0.95">
                          {/* Front Paws / Legs */}
                          <rect x="4" y="24" width="2" height="6" rx="1" />
                          <rect x="7" y="22" width="2" height="10" rx="1" />
                          <rect x="10" y="20" width="2" height="14" rx="1" />
                          <rect x="13" y="18" width="2" height="18" rx="1" />

                          {/* Head & Ear */}
                          <rect x="16" y="10" width="2" height="26" rx="1" />
                          <rect x="19" y="8" width="2" height="24" rx="1" />
                          <rect x="22" y="12" width="2" height="18" rx="1" />

                          {/* High Arched Back & Body */}
                          <rect x="25" y="10" width="2" height="18" rx="1" />
                          <rect x="28" y="9" width="2" height="17" rx="1" />
                          <rect x="31" y="8" width="2" height="16" rx="1" />
                          <rect x="34" y="8" width="2" height="15" rx="1" />
                          <rect x="37" y="9" width="2" height="14" rx="1" />
                          <rect x="40" y="10" width="2" height="13" rx="1" />
                          <rect x="43" y="12" width="2" height="13" rx="1" />
                          <rect x="46" y="14" width="2" height="14" rx="1" />

                          {/* Extended Hind Leg */}
                          <rect x="49" y="17" width="2" height="18" rx="1" />
                          <rect x="52" y="21" width="2" height="22" rx="1" />
                          <rect x="55" y="25" width="2" height="24" rx="1" />
                          <rect x="58" y="29" width="2" height="22" rx="1" />
                          <rect x="61" y="33" width="2" height="16" rx="1" />
                          <rect x="64" y="37" width="2" height="10" rx="1" />

                          {/* Rising Tail */}
                          <rect x="67" y="20" width="2" height="12" rx="1" />
                          <rect x="70" y="15" width="2" height="12" rx="1" />
                          <rect x="73" y="11" width="2" height="11" rx="1" />
                          <rect x="76" y="7" width="2" height="10" rx="1" />
                          <rect x="79" y="5" width="2" height="8" rx="1" />
                        </g>
                      </svg>
                    ))}
                  </div>

                  {/* Bottom Row of 7 Barcode-Striped Puma Cat (Tiger) Watermarks */}
                  <div className="absolute bottom-2 inset-x-0 flex items-center justify-between opacity-50 pointer-events-none px-2 sm:px-6">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <svg key={`bot-${i}`} className="w-16 sm:w-20 h-10 sm:h-12 text-zinc-300" viewBox="0 0 90 60" fill="currentColor">
                        <g opacity="0.95">
                          {/* Front Paws / Legs */}
                          <rect x="4" y="24" width="2" height="6" rx="1" />
                          <rect x="7" y="22" width="2" height="10" rx="1" />
                          <rect x="10" y="20" width="2" height="14" rx="1" />
                          <rect x="13" y="18" width="2" height="18" rx="1" />

                          {/* Head & Ear */}
                          <rect x="16" y="10" width="2" height="26" rx="1" />
                          <rect x="19" y="8" width="2" height="24" rx="1" />
                          <rect x="22" y="12" width="2" height="18" rx="1" />

                          {/* High Arched Back & Body */}
                          <rect x="25" y="10" width="2" height="18" rx="1" />
                          <rect x="28" y="9" width="2" height="17" rx="1" />
                          <rect x="31" y="8" width="2" height="16" rx="1" />
                          <rect x="34" y="8" width="2" height="15" rx="1" />
                          <rect x="37" y="9" width="2" height="14" rx="1" />
                          <rect x="40" y="10" width="2" height="13" rx="1" />
                          <rect x="43" y="12" width="2" height="13" rx="1" />
                          <rect x="46" y="14" width="2" height="14" rx="1" />

                          {/* Extended Hind Leg */}
                          <rect x="49" y="17" width="2" height="18" rx="1" />
                          <rect x="52" y="21" width="2" height="22" rx="1" />
                          <rect x="55" y="25" width="2" height="24" rx="1" />
                          <rect x="58" y="29" width="2" height="22" rx="1" />
                          <rect x="61" y="33" width="2" height="16" rx="1" />
                          <rect x="64" y="37" width="2" height="10" rx="1" />

                          {/* Rising Tail */}
                          <rect x="67" y="20" width="2" height="12" rx="1" />
                          <rect x="70" y="15" width="2" height="12" rx="1" />
                          <rect x="73" y="11" width="2" height="11" rx="1" />
                          <rect x="76" y="7" width="2" height="10" rx="1" />
                          <rect x="79" y="5" width="2" height="8" rx="1" />
                        </g>
                      </svg>
                    ))}
                  </div>

                  {/* Brand Title */}
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight relative z-10 text-white font-sans mt-2">
                    Puma
                  </h2>

                  {/* Brand Description Text (Exact Text from Screenshot) */}
                  <p className="text-xs sm:text-sm text-zinc-200 max-w-4xl leading-relaxed font-normal relative z-10 mt-3">
                    Puma is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel, and accessories. It was founded in 1948 by brothers Rudolf and Adolf Dassler in Herzogenaurach, Germany, which is known as the world capital of sports shoes. Puma is the third largest sportswear manufacturer in the world.
                  </p>

                  <AnimatePresence>
                    {showFullBrandStory && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-xs sm:text-sm text-amber-200 max-w-4xl leading-relaxed font-normal relative z-10 border-t border-red-900/60 pt-3"
                      >
                        Known for iconic heritage lines including the T7 Tracksuit, Suede Classic, and official Formula 1 motorsport partnerships with Scuderia Ferrari and Mercedes-AMG Petronas. Puma continues to push streetwear boundaries with cutting-edge athletic ergonomics and high-octane aesthetic design.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Read More Yellow Pill Link (Exact from Screenshot) */}
                  <button 
                    onClick={() => setShowFullBrandStory((prev) => !prev)}
                    className="relative z-10 mt-4 text-[11px] font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer border-none bg-transparent"
                  >
                    <span>{showFullBrandStory ? "Read Less" : "Read More"}</span>
                    <span className={`w-4 h-4 rounded-full bg-[#ffeb3b] text-black flex items-center justify-center text-[10px] font-black transition-transform duration-300 ${showFullBrandStory ? "rotate-90" : ""}`}>
                      ➔
                    </span>
                  </button>
                </div>
              </div>

                {/* COMPLETE YOUR DRIP: INTERACTIVE OUTFIT CUSTOMIZER (EXACT STATUE DESIGN WITH PERFECT WEARABLE FITTING) */}
                <div className="w-full space-y-4 pt-6 select-none font-sans">
                  
                  {/* Header */}
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-955 text-center font-sans tracking-tight">
                    Complete your Drip
                  </h3>

                  {/* Customizer Layout (3-Column Layout Matching Exact Screenshot) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch font-sans bg-white border border-zinc-200 rounded-[24px] p-3 shadow-xs lg:h-[420px]">
                    
                    {/* COLUMN 1: Category Selection Sidebar (Far Left Stack - 4 Item Cards) */}
                    <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between gap-2 h-full">
                      {[
                        { id: "top", name: "T-shirt", img: "/images/drip_tshirt_exact.png" },
                        { id: "outerwear", name: "Jacket", img: "/images/drip_jacket_exact.png" },
                        { id: "cap", name: "Cap", img: "/images/drip_cap_exact.png" },
                        { id: "shoes", name: "Shoes", img: "/images/drip_shoes_exact.png" }
                      ].map((cat) => {
                        const isSelected = selectedDripCategory === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => {
                              setSelectedDripCategory(cat.id as any);
                              setSelectedDripItemIndex(0);
                            }}
                            className={`relative w-full h-[85px] sm:h-[95px] lg:h-full rounded-xl overflow-hidden cursor-pointer transition-all border-2 flex items-center justify-center bg-white ${
                              isSelected 
                                ? "border-[#ffeb3b] ring-2 ring-amber-300/40 shadow-sm" 
                                : "border-zinc-200 hover:border-zinc-350"
                            }`}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={cat.img}
                                alt={cat.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* COLUMN 2: 2x2 Swatches Grid for Selected Category (Middle 4 Cards Dynamically Change) */}
                    <div className="lg:col-span-4 grid grid-cols-2 grid-rows-2 gap-2 h-full">
                      {((DRIP_ITEMS_BY_CATEGORY[selectedDripCategory]) || DRIP_ITEMS_BY_CATEGORY.shoes).map((item, idx) => {
                        const isSelected = selectedDripItemIndex === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedDripItemIndex(idx);
                              setEquippedOutfit((prev) => ({
                                ...prev,
                                [selectedDripCategory]: item,
                              }));
                            }}
                            className={`relative w-full h-[140px] lg:h-full rounded-xl overflow-hidden bg-white cursor-pointer transition-all border-2 p-1.5 flex items-center justify-center ${
                              isSelected 
                                ? "border-[#ffeb3b] ring-2 ring-amber-300/40 shadow-sm" 
                                : "border-zinc-200 hover:border-zinc-350"
                            }`}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* COLUMN 3: Silver Wireframe Mannequin Statue Viewport with Seamless Wearable Fitting */}
                    <div className="lg:col-span-6 relative bg-[#f8f9fa] border border-zinc-200 rounded-2xl overflow-hidden h-[340px] lg:h-full flex items-center justify-center p-3 select-none">
                      
                      {/* Top Left Reset Rotation Button (Reset 0°) */}
                      <button
                        onClick={() => {
                          setRotationAngle(0);
                          setIsMannequinFlipped(false);
                        }}
                        className="absolute top-3 left-3 z-30 px-2.5 py-1 bg-white border border-zinc-200 hover:border-black rounded-lg text-[10px] font-mono font-bold text-zinc-700 hover:text-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                        title="Reset Rotation to 0°"
                      >
                        <RotateCw className="w-3 h-3 text-amber-500" />
                        <span>Reset 0°</span>
                      </button>

                      {/* Mannequin Statue Container with Seamless Wearable Apparel Layering */}
                      <div 
                        className="relative w-full h-full max-h-[370px] flex items-center justify-center transition-all duration-500 ease-in-out"
                        style={{ 
                          transform: `scaleX(${isMannequinFlipped ? -1 : 1}) rotate(${rotationAngle}deg)`
                        }}
                      >
                        {/* Base Silver Wireframe Mannequin Statue Image */}
                        <Image
                          src="/images/drip_mannequin_statue_exact.png"
                          alt="3D Silver Wireframe Mannequin Statue"
                          fill
                          priority
                          className="object-contain filter drop-shadow-md pointer-events-none p-2"
                        />

                        {/* 1. EQUIPPED CAP / HEADWEAR (Perfectly Centered on Mannequin Head) */}
                        {equippedOutfit.cap && (
                          <div 
                            className="absolute top-[3.5%] left-[53.5%] -translate-x-1/2 w-[18%] h-[12%] z-20 pointer-events-none transition-all duration-300 drop-shadow-md"
                          >
                            <Image
                              src={equippedOutfit.cap.img}
                              alt={equippedOutfit.cap.title}
                              fill
                              className="object-contain mix-blend-multiply"
                            />
                          </div>
                        )}

                        {/* 2. EQUIPPED TORSO (T-SHIRT / JACKET) (Perfectly Centered on Shoulders & Chest) */}
                        {(equippedOutfit.outerwear || equippedOutfit.top) && (
                          <div 
                            className="absolute top-[18%] left-[52.5%] -translate-x-1/2 w-[37%] h-[34%] z-20 pointer-events-none transition-all duration-300 drop-shadow-lg"
                          >
                            <Image
                              src={(equippedOutfit.outerwear || equippedOutfit.top)!.img}
                              alt={(equippedOutfit.outerwear || equippedOutfit.top)!.title}
                              fill
                              className="object-contain mix-blend-multiply"
                            />
                          </div>
                        )}

                        {/* 3. EQUIPPED SHOES (Perfectly Centered on Left & Right Feet) */}
                        {equippedOutfit.shoes && (
                          <div 
                            className="absolute bottom-[3.5%] left-[52.5%] -translate-x-1/2 w-[28%] h-[14%] z-20 pointer-events-none transition-all duration-300 flex justify-between items-center px-1 drop-shadow-md"
                          >
                            <div className="relative w-[45%] h-full transform scale-x-[-1] -rotate-6">
                              <Image
                                src={equippedOutfit.shoes.img}
                                alt={equippedOutfit.shoes.title}
                                fill
                                className="object-contain mix-blend-multiply"
                              />
                            </div>
                            <div className="relative w-[45%] h-full transform rotate-6">
                              <Image
                                src={equippedOutfit.shoes.img}
                                alt={equippedOutfit.shoes.title}
                                fill
                                className="object-contain mix-blend-multiply"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Left & Right Rotation Arrow Buttons (< and >) */}
                      <button
                        onClick={() => {
                          setIsMannequinFlipped(prev => !prev);
                          setRotationAngle(prev => prev - 45);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#222222] hover:bg-black text-white flex items-center justify-center font-bold shadow-md cursor-pointer border-none transition-colors text-lg z-30"
                        aria-label="Rotate Left"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => {
                          setIsMannequinFlipped(prev => !prev);
                          setRotationAngle(prev => prev + 45);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#222222] hover:bg-black text-white flex items-center justify-center font-bold shadow-md cursor-pointer border-none transition-colors text-lg z-30"
                        aria-label="Rotate Right"
                      >
                        ›
                      </button>

                      {/* Bottom Right Floating "Like the outfit, Buy it Now!" Card */}
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-2xl p-2.5 px-3.5 shadow-xl flex flex-col items-end gap-1 font-sans z-30">
                        <span className="text-[10px] text-zinc-600 font-medium tracking-tight">
                          Like the outfit, <strong className="text-zinc-955 font-extrabold">Buy it Now!</strong>
                        </span>
                        <InteractiveAddToCartButton
                          onClick={handleMannequinAddToCart}
                          buttonText="Add to Cart"
                          addedText="Added!"
                          animationStyle="truck"
                          size="sm"
                          className="w-full !bg-[#222222] hover:!bg-black text-white font-extrabold text-[10px] py-2 rounded-xl shadow-md border-none tracking-wide"
                          wrapperClassName="w-[110px]"
                        />
                      </div>

                    </div>

                  </div>
                </div>

                {/* BOTTOM LINKS BAR: More Shorts By brand / More Shorts of same color / More Shorts */}
                <div className="flex items-center justify-center gap-8 sm:gap-14 pt-8 pb-4 text-xs sm:text-sm font-bold text-zinc-800 font-sans border-t border-zinc-200">
                  <button 
                    onClick={() => {
                      window.location.href = `/brands?search=${encodeURIComponent(product.brand)}`;
                    }}
                    className="hover:text-[#f05a28] hover:underline cursor-pointer border-none bg-transparent"
                  >
                    More Shorts By brand
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = `/shop?search=${encodeURIComponent(product.color || "white")}`;
                    }}
                    className="hover:text-[#f05a28] hover:underline cursor-pointer border-none bg-transparent"
                  >
                    More Shorts of same color
                  </button>
                </div>

                {/* RECENTLY VIEWED SECTION (EXACT MATCH FOR FIGMA SCREENSHOT) */}
                <div className="pt-14 pb-8 space-y-8 select-none font-sans border-t border-zinc-200 mt-10">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-zinc-100 pb-4">
                    <div className="text-left">
                      <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">
                        Your History
                      </span>
                      <h2 className="text-xl sm:text-2xl font-heading font-black text-zinc-900 tracking-wider uppercase mt-1">
                        Recently Viewed
                      </h2>
                    </div>
                    <div className="h-[1px] flex-grow mx-8 bg-zinc-100 hidden md:block" />
                    <span className="text-xs font-mono font-semibold text-zinc-400">
                      04 ITEMS SHOWCASED
                    </span>
                  </div>
{/* 4 Cards Carousel Grid + Right Arrow */}
                  <div className="relative flex items-center">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
                      {recentlyViewedItems.map((item) => {
                        const isWishlisted = wishlist.some((w) => w.id === item.id);
                        return (
                          <PremiumProductCard
                            key={item.id}
                            id={item.id}
                            brand={item.brand}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            hoverImage={item.hoverImage}
                            badge={item.discount ? `${item.discount}% OFF` : undefined}
                            discount={item.discount}
                            gender={item.gender}
                            category={item.category}
                            colorVariants={item.colorVariants}
                            isFavorite={isWishlisted}
                            onFavoriteToggle={() => handleToggleItemWishlist({
                              id: item.id,
                              brand: item.brand,
                              title: item.name,
                              price: item.price,
                              img: item.image
                            })}
                            onAddToCart={() => handleAddRelatedToCart(item)}
                          />
                        );
                      })}
                    </div>

                    {/* Far-Right Carousel Navigation Arrow */}
                    <button
                      onClick={() => alert("Showing more recently viewed items...")}
                      className="hidden xl:flex absolute -right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-zinc-200 shadow-md text-zinc-800 items-center justify-center font-bold hover:bg-black hover:text-white transition-colors cursor-pointer text-lg z-20"
                      aria-label="Next items"
                    >
                      {"›"}
                    </button>
                </div>
              </div>

            </motion.div>
          )}

          {viewMode === "drip" && (
            <motion.div
              key="fitting-split"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Back navigation button */}
              <div className="flex justify-start">
                <button
                  onClick={() => setViewMode("pdp")}
                  className="flex items-center gap-2 text-xs font-mono font-black uppercase text-[#f05a28] hover:text-orange-650 transition-colors border-none bg-transparent cursor-pointer font-bold"
                >
                  ← Back to Product Details
                </button>
              </div>

              {/* Product Asset Compression Indicator Banner */}
              <div className="bg-gradient-to-r from-red-600 via-[#f05a28] to-yellow-500 text-white rounded-[24px] p-5 flex flex-col sm:flex-row justify-between items-center text-left gap-4 shadow-md">
                <div>
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Scuderia Fitting Lab</span>
                  <h3 className="text-lg font-black uppercase mt-1 leading-none font-sans">Complete Your Look</h3>
                  <p className="text-xs text-white/80 font-mono mt-1">Mix & Match active streetwear elements directly on the mannequin canvas.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-white/45 bg-white/10 flex-shrink-0">
                    <Image src={displayImage} alt={product.name} fill className="object-cover" />
                  </div>
                  <button 
                    onClick={() => setViewMode("rotate")}
                    className="px-5 py-2.5 bg-white text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow hover:bg-zinc-50 transition-all cursor-pointer border-none"
                  >
                    View Customized Outfit in 3D &gt;
                  </button>
                </div>
              </div>

              {/* Split Fitting screen layout (Step 2 and 3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* LEFT SIDE: Swipable clothing container boxes panel */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">Swipable Streetwear Boxes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lookbookItems.map((item) => {
                      const isEquipped = equippedItems[item.category];
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleEquipped(item.category)}
                          className={`flex gap-4 items-center p-4 rounded-3xl border transition-all cursor-pointer ${
                            isEquipped 
                              ? "border-orange-500 bg-orange-50/25 scale-[1.02] shadow-sm" 
                              : "border-zinc-150 bg-white hover:border-zinc-300 shadow-xs"
                          }`}
                        >
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="text-left flex-grow">
                            <span className="text-[8px] font-mono font-black uppercase tracking-widest text-[#f05a28] block mb-0.5">{item.category} element</span>
                            <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            <strong className="text-xs font-mono font-black text-zinc-800 mt-1 block">{item.price}</strong>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[9px] font-bold ${
                            isEquipped ? "border-orange-500 bg-orange-500 text-white" : "border-zinc-300 text-zinc-400"
                          }`}>
                            {isEquipped ? "✓" : "+"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SIDE: Interactive Mannequin Canvas */}
                <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200/80 rounded-[32px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[460px]">
                  
                  {/* Outfit Stats Header overlay */}
                  <div className="w-full flex justify-between items-start z-15">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">Avatar customization</span>
                      <h4 className="text-xs font-black uppercase text-zinc-950 mt-0.5">Scuderia Model Alpha</h4>
                    </div>
                    <button 
                      onClick={() => setEquippedItems({ top: false, shorts: false, cap: false, shoes: false, socks: false })}
                      className="text-[10px] font-mono text-zinc-500 hover:text-red-500 uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer"
                    >
                      Reset Outfit
                    </button>
                  </div>

                  {/* Interactive Mannequin Outfit Overlay Canvas */}
                  <div className="relative w-64 h-[350px] flex items-center justify-center select-none">
                    
                    {/* Athletic Mannequin Body Vector */}
                    <svg className="w-full h-full text-zinc-300" viewBox="0 0 200 400" fill="currentColor">
                      <circle cx="100" cy="50" r="18" fill="#d4d4d8" />
                      <rect x="96" y="68" width="8" height="10" fill="#c4c4c7" />
                      <path d="M 80,78 L 120,78 L 125,180 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 78,78 L 65,170 L 58,170 L 68,78 Z" fill="#c4c4c7" />
                      <path d="M 122,78 L 135,170 L 142,170 L 132,78 Z" fill="#c4c4c7" />
                      <path d="M 78,180 L 85,320 L 75,320 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 122,180 L 115,320 L 125,320 L 125,180 Z" fill="#d4d4d8" />
                      <path d="M 75,320 L 65,335 C 65,335 85,335 85,335 Z" fill="#b4b4b7" />
                      <path d="M 125,320 L 135,335 C 135,335 115,335 115,335 Z" fill="#b4b4b7" />
                    </svg>

                    {/* Cap Overlay Layer */}
                    {equippedItems.cap && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[16px] w-[50px] h-[25px] z-20 pointer-events-none"
                      >
                        <svg viewBox="0 0 100 50" fill="#1e3a8a">
                          <path d="M 10,40 C 20,10 80,10 90,40 C 90,40 100,45 100,40 L 70,30 L 10,40 Z" />
                        </svg>
                      </motion.div>
                    )}
                    
                    {/* Top T-Shirt Layer */}
                    {equippedItems.top && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[68px] w-[110px] h-[115px] z-20 pointer-events-none"
                      >
                        <svg viewBox="0 0 110 115" fill="#2563eb">
                          <path d="M 15,10 C 35,0 75,0 95,10 L 105,45 L 85,50 L 80,110 L 30,110 L 25,50 L 5,45 Z" />
                          <circle cx="55" cy="40" r="10" fill="#facc15" />
                          <path d="M 50,40 L 60,40 L 55,30 Z" fill="#000" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Bottom Shorts Layer */}
                    {equippedItems.shorts && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-[162px] w-[90px] h-[65px] z-19 pointer-events-none"
                      >
                        <svg viewBox="0 0 90 65" fill="#18181b">
                          <path d="M 10,0 L 80,0 L 85,55 L 50,55 L 45,20 L 40,55 L 5,55 Z" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Shoes Layer */}
                    {equippedItems.shoes && (
                      <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[28px] left-[55px] w-[35px] h-[22px] z-20 pointer-events-none">
                          <svg viewBox="0 0 50 30" fill="#f43f5e">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[28px] right-[55px] w-[35px] h-[22px] z-20 pointer-events-none">
                          <svg viewBox="0 0 50 30" fill="#f43f5e" className="scale-x-[-1] origin-center">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </motion.div>
                      </>
                    )}
                  </div>

                  <div className="w-full bg-zinc-900 text-white rounded-2xl p-4 flex justify-between items-center text-xs font-mono">
                    <span className="font-extrabold text-orange-500">Live fitting complete</span>
                    <span>Ready to checkout</span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {viewMode === "rotate" && (
            <motion.div
              key="rotate-360"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {/* Back navigation buttons */}
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => setViewMode("drip")}
                  className="flex items-center gap-2 text-xs font-mono font-black uppercase text-[#f05a28] hover:text-orange-650 transition-colors border-none bg-transparent cursor-pointer font-bold"
                >
                  ← Back to Fitting Lab
                </button>
                <button
                  onClick={() => setViewMode("pdp")}
                  className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-500 hover:text-black transition-colors border-none bg-transparent cursor-pointer"
                >
                  Product Details ×
                </button>
              </div>
              
              {/* Rotation Canvas Container (Step 4) */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-[32px] p-8 flex flex-col items-center justify-center relative shadow-sm min-h-[500px]">
                
                {/* 360° Instructions header */}
                <div className="text-center space-y-1.5 select-none mb-6">
                  <span className="inline-flex items-center gap-1 bg-yellow-400 text-black font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded shadow-xs">
                    <RotateCw className="w-3 h-3 animate-spin" /> Interactive 3D Rotation
                  </span>
                  <h3 className="text-2xl font-black uppercase text-zinc-950 font-sans tracking-tight">Mannequin 360 Viewer</h3>
                  <p className="text-xs text-zinc-500 font-mono">Click and drag horizontally to spin the model and review outfit custom fitting.</p>
                </div>

                {/* 360° interactive drag viewport */}
                <div 
                  className="relative w-80 h-[380px] flex items-center justify-center cursor-ew-resize overflow-hidden border border-zinc-200/60 bg-white rounded-2xl shadow-inner select-none"
                  onMouseDown={(e) => handleDragStart(e.clientX)}
                  onMouseMove={(e) => handleDragMove(e.clientX)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                  onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                  onTouchEnd={handleDragEnd}
                >
                  
                  {/* Real-time 3D CSS Perspective Transform Box */}
                  <div 
                    style={{
                      perspective: "800px",
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${rotationAngle}deg)`,
                      transition: isDraggingRef.current ? "none" : "transform 0.3s cubic-bezier(0.1, 0.8, 0.3, 1)"
                    }}
                    className="relative w-64 h-[320px] flex items-center justify-center"
                  >
                    
                    {/* Athletic Mannequin Body Vector */}
                    <svg className="w-full h-full text-zinc-300" viewBox="0 0 200 400" fill="currentColor">
                      <circle cx="100" cy="50" r="18" fill="#d4d4d8" />
                      <rect x="96" y="68" width="8" height="10" fill="#c4c4c7" />
                      <path d="M 80,78 L 120,78 L 125,180 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 78,78 L 65,170 L 58,170 L 68,78 Z" fill="#c4c4c7" />
                      <path d="M 122,78 L 135,170 L 142,170 L 132,78 Z" fill="#c4c4c7" />
                      <path d="M 78,180 L 85,320 L 75,320 L 75,180 Z" fill="#d4d4d8" />
                      <path d="M 122,180 L 115,320 L 125,320 L 125,180 Z" fill="#d4d4d8" />
                      <path d="M 75,320 L 65,335 C 65,335 85,335 85,335 Z" fill="#b4b4b7" />
                      <path d="M 125,320 L 135,335 C 135,335 115,335 115,335 Z" fill="#b4b4b7" />
                    </svg>

                    {/* Cap Overlay (Rotates in 3D space with the body!) */}
                    {equippedItems.cap && (
                      <div className="absolute top-[8px] w-[50px] h-[25px] z-20 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                        <svg viewBox="0 0 100 50" fill="#1e3a8a">
                          <path d="M 10,40 C 20,10 80,10 90,40 C 90,40 100,45 100,40 L 70,30 L 10,40 Z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Top T-Shirt (Rotates in 3D space with the body!) */}
                    {equippedItems.top && (
                      <div className="absolute top-[60px] w-[110px] h-[115px] z-20 pointer-events-none" style={{ transform: "translateZ(8px)" }}>
                        <svg viewBox="0 0 110 115" fill="#2563eb">
                          <path d="M 15,10 C 35,0 75,0 95,10 L 105,45 L 85,50 L 80,110 L 30,110 L 25,50 L 5,45 Z" />
                          <circle cx="55" cy="40" r="10" fill="#facc15" />
                          <path d="M 50,40 L 60,40 L 55,30 Z" fill="#000" />
                        </svg>
                      </div>
                    )}

                    {/* Shorts (Rotates in 3D space with the body!) */}
                    {equippedItems.shorts && (
                      <div className="absolute top-[152px] w-[90px] h-[65px] z-19 pointer-events-none" style={{ transform: "translateZ(6px)" }}>
                        <svg viewBox="0 0 90 65" fill="#18181b">
                          <path d="M 10,0 L 80,0 L 85,55 L 50,55 L 45,20 L 40,55 L 5,55 Z" />
                        </svg>
                      </div>
                    )}

                    {/* Shoes (Rotates in 3D space with the body!) */}
                    {equippedItems.shoes && (
                      <>
                        <div className="absolute bottom-[22px] left-[55px] w-[35px] h-[22px] z-20 pointer-events-none" style={{ transform: "translateZ(12px)" }}>
                          <svg viewBox="0 0 50 30" fill="#f43f5e">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-[22px] right-[55px] w-[35px] h-[22px] z-20 pointer-events-none" style={{ transform: "translateZ(12px)" }}>
                          <svg viewBox="0 0 50 30" fill="#f43f5e" className="scale-x-[-1] origin-center">
                            <path d="M 10,10 L 45,5 L 50,25 L 5,28 Z" />
                          </svg>
                        </div>
                      </>
                    )}

                  </div>

                </div>

                {/* 360° status indicator tag */}
                <div className="mt-4 flex gap-1 items-center text-[10px] text-zinc-400 font-mono">
                  <span>Current Angle: {Math.round(rotationAngle)}°</span>
                  <span>&bull;</span>
                  <span>Drag left or right</span>
                </div>

              </div>

              {/* Exact matching bottom details tabs (Figma Screen 4 tabs) */}
              <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden p-6 sm:p-8 text-left space-y-6">
                
                {/* Tabs selection header */}
                <div className="flex border-b border-zinc-150 pb-3 gap-6 font-sans text-xs font-black uppercase tracking-widest text-zinc-500">
                  <button 
                    onClick={() => setActiveInfoTab("story")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "story" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Product Story
                  </button>
                  <button 
                    onClick={() => setActiveInfoTab("fit")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "fit" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Size & Fit
                  </button>
                  <button 
                    onClick={() => setActiveInfoTab("features")}
                    className={`transition-colors cursor-pointer border-none bg-transparent ${
                      activeInfoTab === "features" ? "text-zinc-950 border-b-2 border-[#f05a28] pb-3" : "hover:text-zinc-800"
                    }`}
                  >
                    Core Features
                  </button>
                </div>

                {/* Active Tab Panel */}
                <div className="text-xs text-zinc-500 leading-relaxed font-sans min-h-[100px]">
                  {activeInfoTab === "story" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <p>
                        The Puma Scuderia Ferrari Heritage Zip Sweatshirt pays homage to vintage motorsport racing. Inspired directly by the team wear worn on the tracks in Maranello during the golden age of grand prix racing, it features classic badges and colorblocking panels.
                      </p>
                      <p className="font-mono text-[10px] text-zinc-400">
                        Design archives catalog: Ferrari Heritage teamwear.
                      </p>
                    </div>
                  )}
                  {activeInfoTab === "fit" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <p>
                        This sweatshirt is cut with a relaxed, dropped-shoulder fit reminiscent of classic 90s streetwear. We recommend buying your standard size for the intended relaxed fit, or sizing down if you prefer a regular regular profile.
                      </p>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Model is wearing size M (Height: 6'1", Chest: 40")</li>
                        <li>Ribbed hem and cuffs to maintain structure</li>
                      </ul>
                    </div>
                  )}
                  {activeInfoTab === "features" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-zinc-900 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Heavyweight Comfort</strong>
                          <span>Constructed with a premium double-knit cotton blend structure for lasting warmth.</span>
                        </div>
                        <div>
                          <strong className="text-zinc-900 block uppercase font-bold text-[10px] tracking-wider mb-0.5">Motorsport Accents</strong>
                          <span>Features officially licensed Scuderia Ferrari crest and sponsor embroidered details on the sleeves.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE SIZE CHART MODAL */}
        <AnimatePresence>
          {showSizeChart && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-zinc-200 select-none"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 px-6 border-b border-zinc-150 bg-zinc-50">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-950 font-sans tracking-tight">
                      SIZE GUIDE & MEASUREMENTS
                    </h2>
                    <p className="text-xs text-zinc-500 font-medium font-sans">
                      Puma Scuderia Heritage Oversized Fit
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Unit Toggle (in vs cm) */}
                    <div className="flex bg-zinc-200 p-0.5 rounded-lg text-xs font-bold font-mono">
                      <button
                        onClick={() => setSizeChartUnit("in")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer border-none ${
                          sizeChartUnit === "in" ? "bg-black text-white shadow-2xs" : "text-zinc-700 hover:text-black"
                        }`}
                      >
                        IN
                      </button>
                      <button
                        onClick={() => setSizeChartUnit("cm")}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer border-none ${
                          sizeChartUnit === "cm" ? "bg-black text-white shadow-2xs" : "text-zinc-700 hover:text-black"
                        }`}
                      >
                        CM
                      </button>
                    </div>

                    <button
                      onClick={() => setShowSizeChart(false)}
                      className="w-8 h-8 rounded-full bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer border-none"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  {/* Size Chart Table */}
                  <div className="overflow-x-auto border border-zinc-200 rounded-xl">
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider">
                          <th className="p-3.5 px-4">Size</th>
                          <th className="p-3.5 px-4">Chest</th>
                          <th className="p-3.5 px-4">Front Length</th>
                          <th className="p-3.5 px-4">Shoulder</th>
                          <th className="p-3.5 px-4">Sleeve Length</th>
                          <th className="p-3.5 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-zinc-800">
                        {[
                          { size: "XS", chest: sizeChartUnit === "in" ? "36.0" : "91.4", length: sizeChartUnit === "in" ? "27.0" : "68.5", shoulder: sizeChartUnit === "in" ? "18.5" : "47.0", sleeve: sizeChartUnit === "in" ? "23.5" : "59.6" },
                          { size: "S", chest: sizeChartUnit === "in" ? "38.0" : "96.5", length: sizeChartUnit === "in" ? "28.0" : "71.1", shoulder: sizeChartUnit === "in" ? "19.5" : "49.5", sleeve: sizeChartUnit === "in" ? "24.0" : "61.0" },
                          { size: "M", chest: sizeChartUnit === "in" ? "40.0" : "101.6", length: sizeChartUnit === "in" ? "29.0" : "73.6", shoulder: sizeChartUnit === "in" ? "20.5" : "52.0", sleeve: sizeChartUnit === "in" ? "24.5" : "62.2" },
                          { size: "L", chest: sizeChartUnit === "in" ? "42.0" : "106.7", length: sizeChartUnit === "in" ? "30.0" : "76.2", shoulder: sizeChartUnit === "in" ? "21.5" : "54.6", sleeve: sizeChartUnit === "in" ? "25.0" : "63.5" },
                          { size: "XL", chest: sizeChartUnit === "in" ? "44.0" : "111.8", length: sizeChartUnit === "in" ? "31.0" : "78.7", shoulder: sizeChartUnit === "in" ? "22.5" : "57.1", sleeve: sizeChartUnit === "in" ? "25.5" : "64.7" }
                        ].map((row) => {
                          const isSelected = selectedSize === row.size;
                          return (
                            <tr 
                              key={row.size}
                              className={`hover:bg-amber-50/50 transition-colors cursor-pointer ${
                                isSelected ? "bg-amber-100/60 font-bold" : ""
                              }`}
                              onClick={() => {
                                setSelectedSize(row.size);
                              }}
                            >
                              <td className="p-3.5 px-4 font-mono font-bold flex items-center gap-2">
                                {row.size}
                                {isSelected && (
                                  <span className="text-[9px] bg-[#ffeb3b] text-black font-extrabold px-1.5 py-0.5 rounded uppercase font-mono">
                                    Selected
                                  </span>
                                )}
                              </td>
                              <td className="p-3.5 px-4 font-mono">{row.chest} {sizeChartUnit}</td>
                              <td className="p-3.5 px-4 font-mono">{row.length} {sizeChartUnit}</td>
                              <td className="p-3.5 px-4 font-mono">{row.shoulder} {sizeChartUnit}</td>
                              <td className="p-3.5 px-4 font-mono">{row.sleeve} {sizeChartUnit}</td>
                              <td className="p-3.5 px-4 text-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSize(row.size);
                                    setShowSizeChart(false);
                                  }}
                                  className={`text-[11px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer border-none ${
                                    isSelected ? "bg-black text-amber-300 font-extrabold" : "bg-zinc-200 text-zinc-800 hover:bg-black hover:text-white"
                                  }`}
                                >
                                  {isSelected ? "Selected" : "Select"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Model Fit Recommendation Box */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center gap-3 text-xs text-zinc-700">
                    <Info className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-zinc-900 block">Model Fit Advice</span>
                      <span>Model is 6&apos;1&quot; (185 cm) wearing size <strong className="font-bold text-black">M</strong>. Fits true to size for an intentional relaxed streetwear drop-shoulder aesthetic.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* STICKY BOTTOM QUICK PURCHASE BAR (Matching Reference Screenshot) */}
        <div className="sticky bottom-0 z-40 bg-zinc-900/95 backdrop-blur-md text-white border-t border-zinc-800 py-3 px-4 sm:px-8 shadow-2xl transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Product Thumbnail & Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-700">
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                  {product.name}
                </h4>
                <span className="text-xs font-mono text-red-500 font-black">
                  {product.price}
                </span>
              </div>
            </div>

            {/* Right: Selectors & Add To Cart Button */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs font-mono">
                <select
                  value={selectedSize || "M"}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-black border border-zinc-700 text-white text-xs font-mono py-1.5 px-3 rounded-lg outline-none cursor-pointer"
                >
                  {["S", "M", "L", "XL", "XXL", "XXXL"].map((sz) => (
                    <option key={sz} value={sz}>Size: {sz}</option>
                  ))}
                </select>

                <select
                  className="bg-black border border-zinc-700 text-white text-xs font-mono py-1.5 px-3 rounded-lg outline-none cursor-pointer"
                >
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                </select>
              </div>

              <InteractiveAddToCartButton
                onClick={handleAddToCart}
                buttonText="ADD TO CART"
                addedText="ADDED!"
                animationStyle="truck"
                size="sm"
                className="w-full !bg-[#d92626] hover:!bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-lg border-none"
                wrapperClassName="w-[120px] shrink-0"
              />
            </div>

          </div>
        </div>

      </main>

      {/* Return & Exchange Policy Modal */}
      <AnimatePresence>
        {policyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-sans text-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-zinc-200 text-left space-y-6"
            >
              <button
                onClick={() => setPolicyOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                  Return & Exchange Policy
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Hassle-free 12-day window for all domestic orders
                </p>
              </div>

              {/* Progress Steps Illustration */}
              <div className="grid grid-cols-4 gap-2 text-center select-none py-2">
                {[
                  { step: "1", label: "Request", desc: "Via portal" },
                  { step: "2", label: "Pickup", desc: "In 48 hours" },
                  { step: "3", label: "Verify", desc: "Quality check" },
                  { step: "4", label: "Refund", desc: "Instant credit" }
                ].map((item) => (
                  <div key={item.step} className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-zinc-955 bg-zinc-900 text-[#facc15] font-black text-xs flex items-center justify-center mx-auto shadow-sm">
                      {item.step}
                    </div>
                    <div className="text-[10px] font-bold text-zinc-900">{item.label}</div>
                    <div className="text-[8px] text-zinc-400 font-medium leading-tight">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 bg-zinc-550/5 bg-zinc-50 p-4 rounded-2xl border border-zinc-150 text-xs text-zinc-750 leading-relaxed font-medium">
                <p>● Items must be returned in their original condition: unworn, unwashed, with all original tags attached and packaging intact.</p>
                <p>● Footwear must be returned in the original branded box without any postage stickers or tape applied directly to it.</p>
                <p>● Innerwear, face masks, socks, and limited collaboration collectibles are non-returnable due to hygiene and rarity guidelines.</p>
              </div>

              <button
                onClick={() => setPolicyOpen(false)}
                className="w-full bg-zinc-950 hover:bg-black text-[#facc15] font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer border-none"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offers & Coupons Slider Drawer */}
      <AnimatePresence>
        {offersDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex justify-end font-sans text-black"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md h-full shadow-2xl p-6 relative flex flex-col justify-between text-left"
            >
              <button
                onClick={() => setOffersDrawerOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-1 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6 flex-1 overflow-y-auto pr-2 pt-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-950 flex items-center gap-2">
                    Available Offers <Tag className="w-5 h-5 text-red-500 fill-red-500" />
                  </h3>
                  <p className="text-xs text-zinc-500 font-semibold">
                    Apply these promo codes at checkout for maximum savings!
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { code: "KOTAK7.5", title: "7.5% Kotak Credit Card Discount", desc: "Flat 7.5% off on transactions above ₹1,999.", terms: "Max discount ₹750. Valid on Credit Cards." },
                    { code: "HDFC10", title: "10% HDFC Instant Discount", desc: "Get 10% off instantly on purchases above ₹4,999.", terms: "Max discount ₹1,500. EMI transactions only." },
                    { code: "UPI500", title: "Flat ₹500 UPI Cashback", desc: "Flat cashback when paying via UPI apps.", terms: "Minimum order of ₹2,499. One usage per customer." },
                    { code: "FREESHIP", title: "Free Express Shipping", desc: "No delivery charges on your order.", terms: "Automatically applicable on orders above ₹999." }
                  ].map((coupon) => (
                    <div key={coupon.code} className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50/50 space-y-3 relative overflow-hidden group">
                      <div className="space-y-1 pr-20">
                        <span className="text-[9px] font-bold bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-full font-mono uppercase">
                          PROMO
                        </span>
                        <h4 className="text-sm font-bold text-zinc-950">{coupon.title}</h4>
                        <p className="text-xs text-zinc-505 font-medium leading-relaxed">{coupon.desc}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">*{coupon.terms}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          navigator.clipboard.writeText(coupon.code);
                          const btn = e.currentTarget;
                          btn.innerText = "COPIED!";
                          btn.classList.add("bg-emerald-500", "text-white");
                          setTimeout(() => {
                            btn.innerText = "COPY CODE";
                            btn.classList.remove("bg-emerald-500", "text-white");
                          }, 1500);
                        }}
                        className="absolute right-4 top-4 bg-zinc-950 hover:bg-black text-[#facc15] font-extrabold text-[10px] uppercase py-2 px-3.5 rounded-xl cursor-pointer transition-all border-none font-mono tracking-wider active:scale-95"
                      >
                        COPY CODE
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200 mt-4">
                <button
                  onClick={() => setOffersDrawerOpen(false)}
                  className="w-full bg-zinc-955 bg-zinc-900 hover:bg-black text-[#facc15] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-colors cursor-pointer border-none"
                >
                  Back To Product Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Offer Terms Alert Modal */}
      <AnimatePresence>
        {selectedOfferTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-sans text-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative border border-zinc-200 text-left space-y-4"
            >
              <button
                onClick={() => setSelectedOfferTerms(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-black uppercase tracking-tight text-zinc-950">
                Terms & Conditions
              </h3>

              <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-4 font-mono text-[10px] text-zinc-700 leading-relaxed font-medium whitespace-pre-line">
                {selectedOfferTerms}
              </div>

              <button
                onClick={() => setSelectedOfferTerms(null)}
                className="w-full bg-zinc-950 hover:bg-black text-[#facc15] font-extrabold text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer border-none"
              >
                Accept & Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
