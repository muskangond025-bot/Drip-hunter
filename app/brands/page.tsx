"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { RetroTechBanner } from "@/components/common/RetroTechBanner";
import { BrandHeroShowcase } from "@/components/features/BrandHeroShowcase";
import { VendorOnboardingModal } from "@/components/features/VendorOnboardingModal";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveAddToCartButton } from "@/components/ui/InteractiveAddToCartButton";
import { useRouter } from "next/navigation";
import { InteractiveHeartButton } from "@/components/ui/InteractiveHeartButton";
import {
  Search,
  Compass,
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ArrowLeft,
  MessageCircle,
  Send,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";

interface CartItem {/*  */
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

interface BlogPost {
  category?: string;
  date?: string;
  title?: string;
  desc?: string;
  img?: string;
}

interface BrandProduct {
  name: string;
  image: string;
}

interface BrandItem {
  id: number;
  name: string;
  letter: string;
  category: 'Luxury' | 'Techwear' | 'Skate' | 'Archive';
  origin: string;
  founded: string;
  description: string;
  logoSvg: React.ReactNode;
  products: BrandProduct[];
}

// Mock list of top global streetwear brands with clean logo SVGs
const brandsList: BrandItem[] = [
  {
    id: 301,
    name: "ALMOST GODS",
    letter: "A",
    category: "Luxury",
    origin: "India",
    founded: "2018",
    description: "Indian art history meets oversized silhouettes and rich jacquards.",
    logoSvg: (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <Image
          src="/images/almost_gods_logo.png"
          alt="Almost Gods"
          fill
          className="object-contain"
        />
      </div>
    ),
    products: [
      { name: "T-Shirt", image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp" },
      { name: "Hat", image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp" },
      { name: "Cap", image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp" }
    ]
  },
  {
    id: 302,
    name: "ACRONYM",
    letter: "A",
    category: "Techwear",
    origin: "Germany",
    founded: "1999",
    description: "Uncompromising functional utility apparel and tactical streetwear design.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Industrial geometric logo */}
        <rect x="20" y="20" width="60" height="60" rx="4" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="4" />
        <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="2" />
        <rect x="42" y="42" width="16" height="16" fill="currentColor" />
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://img105.savana.com/156220e3ccb24d899323dae724a3951b.webp" },
      { name: "Short", image: "https://img105.savana.com/fd912543884c43c892a39219b2f63738.webp" }
    ]
  },
  {
    id: 303,
    name: "A-COLD-WALL*",
    letter: "A",
    category: "Luxury",
    origin: "UK",
    founded: "2015",
    description: "Samuel Ross' material studies exploring architecture and social barriers.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ACW industrial rectangle block */}
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="5" />
        <rect x="35" y="35" width="30" height="10" fill="currentColor" />
        <text x="50" y="65" fill="currentColor" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ACW*</text>
      </svg>
    ),
    products: [
      { name: "Utility Vest", image: "https://img105.savana.com/5e08c0285d82474ea9d0278e33deb10e.webp" },
      { name: "Track Pants", image: "https://img105.savana.com/b624019e62da430f8e7c88b4f8c5aca2.webp" }
    ]
  },
  {
    id: 304,
    name: "A BATHING APE",
    letter: "A",
    category: "Archive",
    origin: "Japan",
    founded: "1993",
    description: "Harajuku icon famous for camo patterns and the Ape Head insignia.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Camo Ape head silhouette */}
        <path d="M50 15 C30 15 25 35 25 50 C25 68 35 85 50 85 C65 85 75 68 75 50 C75 35 70 15 50 15 Z" fill="#27272a" />
        <ellipse cx="40" cy="45" rx="4" ry="7" fill="currentColor" />
        <ellipse cx="60" cy="45" rx="4" ry="7" fill="currentColor" />
        <path d="M42 62 C45 68 55 68 58 62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    products: [
      { name: "Camo Jacket", image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp" },
      { name: "T-Shirt", image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp" }
    ]
  },
  {
    id: 305,
    name: "BLUE BREW",
    letter: "B",
    category: "Skate",
    origin: "US",
    founded: "2020",
    description: "Artisan distressed denim washes and vintage skate wear elements.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Denim wave banner */}
        <path d="M20 30 Q50 60 80 30 Q50 90 20 30 Z" fill="#3b82f6" opacity="0.8" />
        <text x="50" y="80" fill="currentColor" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">BLUE BREW</text>
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp" },
      { name: "Jeans", image: "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp" },
      { name: "Hoodie", image: "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp" },
      { name: "Sock", image: "https://img105.savana.com/0e94be63baf046ea9f09de69c7f4741e.webp" }
    ]
  },
  {
    id: 306,
    name: "BILLIONAIRE BOYS CLUB",
    letter: "B",
    category: "Archive",
    origin: "US",
    founded: "2003",
    description: "Pharrell Williams' legacy merging graphic streetwear with space themes.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Astronaut head contour */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <rect x="42" y="32" width="16" height="12" rx="3" fill="currentColor" />
        <path d="M35 60 C35 70 65 70 65 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    products: [
      { name: "Hoodie", image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp" },
      { name: "Denim Pants", image: "https://img105.savana.com/4b8e375e990c4f80ba1c1b79546897bd.webp" }
    ]
  },
  {
    id: 307,
    name: "BALENCIAGA",
    letter: "B",
    category: "Luxury",
    origin: "Italy",
    founded: "1919",
    description: "Oversized extreme couture proportions and cyber goth aesthetics.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bold minimal BB monogram */}
        <text x="50" y="60" fill="currentColor" fontSize="24" fontWeight="950" textAnchor="middle" fontFamily="sans-serif">BB</text>
        <line x1="20" y1="68" x2="80" y2="68" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    products: [
      { name: "Sneakers", image: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp" },
      { name: "Hoodie", image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp" }
    ]
  },
  {
    id: 308,
    name: "BRAIN DEAD",
    letter: "B",
    category: "Skate",
    origin: "US",
    founded: "2014",
    description: "Post-punk graphics, comics, and subculture-led collective design.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain profile outline */}
        <path d="M40 25 C55 10 75 25 70 45 C75 55 65 75 50 75 C40 75 30 65 30 50 C30 35 35 25 40 25 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M42 35 C48 38 52 38 58 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="55" r="6" fill="#a855f7" />
      </svg>
    ),
    products: [
      { name: "T-Shirt", image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp" },
      { name: "Hoodie", image: "https://img105.savana.com/cecdb44ed30148609593d9750cffff01.webp" }
    ]
  },
  {
    id: 309,
    name: "CARHARTT WIP",
    letter: "C",
    category: "Skate",
    origin: "US",
    founded: "1989",
    description: "Robust workwear classics adapted for metropolitan skate cultures.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wave motif */}
        <path d="M30 45 Q50 20 70 45 T70 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="70" r="6" fill="#f59e0b" />
      </svg>
    ),
    products: [
      { name: "Work Jacket", image: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp" },
      { name: "Cargos", image: "https://img105.savana.com/75e5d27d3e52464d9e57586d7078fcdb.webp" }
    ]
  },
  {
    id: 310,
    name: "CORTEIZ",
    letter: "C",
    category: "Archive",
    origin: "UK",
    founded: "2018",
    description: "London underground rule-breakers defined by guerrilla drops.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Alcatraz island outline symbol */}
        <rect x="25" y="35" width="50" height="30" rx="3" fill="#18181b" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="45" x2="70" y2="45" stroke="#ef4444" strokeWidth="2" />
        <line x1="30" y1="55" x2="70" y2="55" stroke="#ef4444" strokeWidth="2" />
      </svg>
    ),
    products: [
      { name: "Trackies", image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp" },
      { name: "Knit Cap", image: "https://img105.savana.com/d1203111e08244adb4fe6ffc6bb21043.webp" }
    ]
  },
  {
    id: 311,
    name: "OFF-WHITE",
    letter: "O",
    category: "Luxury",
    origin: "Italy",
    founded: "2013",
    description: "Virgil Abloh's dialogue between high luxury and raw street diagnostics.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diagonal crossing stripes */}
        <path d="M20 20 L40 20 L20 40 Z" fill="currentColor" />
        <path d="M50 20 L70 20 L20 70 Z" fill="currentColor" />
        <path d="M80 20 L80 40 L40 80 L20 80 Z" fill="currentColor" />
        <path d="M80 50 L80 70 L70 80 L50 80 Z" fill="currentColor" />
      </svg>
    ),
    products: [
      { name: "Jacket", image: "https://img105.savana.com/98f5af05efc74e51805c7e729b1f7be3.webp" },
      { name: "Belt", image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp" }
    ]
  },
  {
    id: 312,
    name: "SUPREME",
    letter: "S",
    category: "Archive",
    origin: "US",
    founded: "1994",
    description: "NYC skate box logo classic, driving global hype and collab archives.",
    logoSvg: (
      <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red Box Logo */}
        <rect x="10" y="35" width="80" height="30" fill="#ef4444" rx="2" />
        <text x="50" y="55" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">Supreme</text>
      </svg>
    ),
    products: [
      { name: "Box Logo Tee", image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp" },
      { name: "Camp Cap", image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp" }
    ]
  }
];

const spotlightProducts = [
  {
    id: 1,
    title: "White Classic Oversized Tee",
    collection: "Slay the Streets Custom Collection",
    price: "₹1,499",
    img: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
    similars: [
      { name: "Raw Box Tee", img: "https://img105.savana.com/990190ec202a45a7be49d65961a83e75.webp", price: "₹999" },
      { name: "Signature Fit", img: "https://img105.savana.com/f64269193867428aaa81923d2a683436.webp", price: "₹1,199" }
    ]
  },
  {
    id: 2,
    title: "Distressed Denim Pants",
    collection: "Slay the Streets Denim Collection",
    price: "₹2,199",
    img: "https://img105.savana.com/ed88b6e2e77f461b913d3cecb8f1c215.webp",
    similars: [
      { name: "Tactical Cargo Lower", img: "https://img105.savana.com/9104562de9d541b1ae03530cd8a58275.webp", price: "₹1,899" },
      { name: "Mesh Athletic Shorts", img: "https://img105.savana.com/e5894d9178604542927c68e0d847de47.webp", price: "₹799" }
    ]
  },
  {
    id: 3,
    title: "Tactical Cargo Lower",
    collection: "Slay the Streets Cargo Collection",
    price: "₹1,899",
    img: "https://img105.savana.com/b1f965b1c47f4aeb9324aae4a983d71e.webp",
    similars: [
      { name: "Distressed Denim Pants", img: "https://img105.savana.com/82f87913d0814f9083297cfb44303ef9.webp", price: "₹2,199" },
      { name: "Oversized Flannel Shirt", img: "https://img105.savana.com/4a98999a637a41fba333a1881f09c60c.webp", price: "₹1,299" }
    ]
  }
];

const TShirtIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M25,25 L35,18 C38,20 42,21 46,20 C50,21 54,20 57,18 L67,25 L75,37 L66,41 L66,82 L26,82 L26,41 L17,37 Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function BrandsDirectory() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<"Blogs" | "Brand" | "Affiliate" | "Organisers" | "Stories" | "DripSpot" | "DripVision">("Brand");
  const [showLaundryBlogPage, setShowLaundryBlogPage] = useState<boolean>(true);

  const handleSubTabChange = (tabId: "Blogs" | "Stories" | "DripSpot" | "DripVision") => {
    router.push(`/explore?tab=${tabId}`);
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-cart");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-wishlist");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [loginOpen, setLoginOpen] = useState(false);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string>("ALL");

  // Affiliate tab states
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => [
    { image: "https://img105.savana.com/156220e3ccb24d899323dae724a3951b.webp" },
    { image: "https://img105.savana.com/fd912543884c43c892a39219b2f63738.webp" }
  ], []);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Blogs tab states
  const [activeBlogFilter, setActiveBlogFilter] = useState("Trends");
  const [dripSpotView, setDripSpotView] = useState<"A" | "B" | "C">("A");
  const [selectedVariantImage, setSelectedVariantImage] = useState<string>("https://img105.savana.com/5e08c0285d82474ea9d0278e33deb10e.webp");
  const [dripVisionLayout, setDripVisionLayout] = useState<"row" | "stack">("row");
  const [instaOffset, setInstaOffset] = useState(0);
  const [activeSpotlightId, setActiveSpotlightId] = useState<number>(1);
  const [likedPosts, setLikedPosts] = useState<boolean[]>(Array(6).fill(false));
  const [bookmarkedPosts, setBookmarkedPosts] = useState<boolean[]>(Array(6).fill(false));

  const toggleLike = (idx: number) => {
    setLikedPosts(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const toggleBookmark = (idx: number) => {
    setBookmarkedPosts(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };



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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setSearchQuery(searchParam);
      }
    }
  }, []);

  // Affiliate FAQ data
  const faqData = [
    {
      q: "How does the Associates Program work?",
      a: "You can share Drip Hunter streetwear catalogs with your audience using custom link generators. When your referrals complete purchases on our store, you earn a 10% commission on the order value."
    },
    {
      q: "How do I qualify for this program?",
      a: "Bloggers, social media influencers, fashion content creators, and publishers with active audiences matching the streetwear demographic are welcome to sign up for instant onboarding reviews."
    },
    {
      q: "How do I earn in this program?",
      a: "You earn commissions on all qualifying sales. Conversion tracking cookies persist for 30 days, giving you credit even if your audience returns later to complete their cart."
    },
    {
      q: "How do I sign up to the program?",
      a: "Click any 'Sign Up' button on this page to log in or create your Drip Hunter store account. Next, navigate to your dashboard settings and check the 'Become an Associate' checkbox to get your affiliate tags."
    }
  ];

  // Auto slide effect for Affiliate slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const alphabet = ["ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"];

  const squareBrands = brandsList.slice(0, 4);
  const circleBrands = brandsList.slice(4, 8);

  // Cart / Wishlist Handlers
  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Header */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Brand Hero Showcase Section (as shown in image) */}
        <BrandHeroShowcase />

        {/* Sub-tabs Row */}
        <div className="flex justify-center items-center gap-2.5 py-6 bg-zinc-50 border-b border-zinc-200 sticky top-20 z-40 select-none mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {([
            { label: "Blogs", id: "Blogs" },
            { label: "Stories", id: "Stories" },
            { label: "DripSpot", id: "DripSpot" },
            { label: "DripVision", id: "DripVision" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSubTabChange(tab.id)}
              className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all active:scale-95 ${
                activeSubTab === tab.id
                  ? "bg-[#f05a28] border-[#f05a28] text-white shadow-xs"
                  : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-100 hover:text-[#f05a28]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONDITION 1: Blogs Tab */}
        {activeSubTab === "Blogs" && (
          <div className="space-y-16">
            <section id="blogs-section" className="mb-20 pt-2 max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">
                Blogs
              </h2>

              {/* Subcategory & Sort by Default Row */}
              <div className="relative flex items-center justify-center border-b border-zinc-150 pb-6 mb-10 select-none">
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {["All", "Trends", "How To", "Celebs", "Opinion"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveBlogFilter(cat);
                        setShowLaundryBlogPage(false);
                      }}
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                        !showLaundryBlogPage && activeBlogFilter === cat
                          ? "bg-[#f05a28] border-[#f05a28] text-white shadow-xs"
                          : "bg-white border-zinc-200 text-zinc-650 hover:border-zinc-350"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                
                <div className="absolute right-0 flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest hidden sm:inline">Sort by:</span>
                  <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-black text-zinc-800 outline-none focus:border-zinc-400 cursor-pointer">
                    <option>Default</option>
                    <option>Newest</option>
                    <option>Most Read</option>
                  </select>
                </div>
              </div>

              {showLaundryBlogPage ? (
                /* LAUNDRY BLOG POST DETAILS VIEW (2nd image) */
                <div className="space-y-10 animate-in fade-in duration-300 select-none text-left">
                  {/* Blog Header Title */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black uppercase text-zinc-955">Title</h3>
                    <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">
                      <span>Company</span>
                      <span>&bull;</span>
                      <span>Date of Upload</span>
                    </div>
                  </div>

                  {/* Main Landscape Image */}
                  <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden border border-zinc-200 shadow-sm">
                    <Image
                      src="/images/laundry_orange.png"
                      alt="Featured Post Banner"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Two Column Layout (Content & Frame Card) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-6">
                    {/* Left Column: Text (takes 2 cols) */}
                    <div className="lg:col-span-2 space-y-6 font-medium text-zinc-650 leading-relaxed text-sm">
                      <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#f05a28] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Streetwear culture has always been about pushing boundaries and finding your own voice. Each piece, from hoodies to sneakers, acts as a canvas of self-expression.
                      </p>
                      <p>
                        Driphunter continues to catalog and showcase the very best archives of custom designs, helping creators and enthusiasts stay ahead of trends.
                      </p>
                    </div>

                    {/* Right Column: Frame Card */}
                    <div className="space-y-6 bg-zinc-50 p-6 rounded-[28px] border border-zinc-200/80 shadow-xs">
                      <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-zinc-150">
                        <Image
                          src="/images/laundry_blue.png"
                          alt="Detailed View"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-tight text-center">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                      </p>
                      
                      <div className="border-t border-zinc-200/80 pt-4 flex items-center justify-between">
                        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
                          <span>Author</span>
                          <span>&bull;</span>
                          <span>Date of Upload</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-800">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          <span className="text-[10px] font-bold">120</span>
                        </div>
                      </div>

                      <button className="w-full bg-[#f05a28] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer border-none shadow-xs">
                        Recommend
                      </button>
                    </div>
                  </div>

                  {/* Recommended Section (centered) */}
                  <div className="pt-16 border-t border-zinc-250/50">
                    <h4 className="text-3xl font-black text-center text-zinc-955 uppercase tracking-widest mb-8">
                      Recommended
                    </h4>

                    {/* Category Tabs for Recommended */}
                    <div className="flex flex-wrap gap-2.5 justify-center mb-10 select-none">
                      {["All", "Trends", "How To", "Celebs", "Opinion"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveBlogFilter(cat);
                            setShowLaundryBlogPage(false);
                          }}
                          className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                            activeBlogFilter === cat
                              ? "bg-[#f05a28] border-[#f05a28] text-white shadow-xs"
                              : "bg-white border-zinc-200 text-zinc-650 hover:border-zinc-350"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* 3 cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 select-none">
                      {[
                        { category: "Trends", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: "/images/blog_sub_1.png" },
                        { category: "How To", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: "/images/blog_sub_2.png" },
                        { category: "Celebs", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: "/images/blog_sub_3.png" }
                      ].map((card, idx) => (
                        <div key={idx} className="space-y-4">
                          <div 
                            className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group cursor-pointer"
                            onClick={() => setShowLaundryBlogPage(true)}
                          >
                            <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                              <span>{card.category}</span>
                              <span>&bull;</span>
                              <span>{card.date}</span>
                            </div>
                            <h4 
                              className="text-xl font-black text-zinc-955 uppercase tracking-tight cursor-pointer hover:text-orange-500"
                              onClick={() => setShowLaundryBlogPage(true)}
                            >
                              {card.title}
                            </h4>
                            <p className="text-zinc-500 text-xs leading-relaxed font-medium">{card.desc}</p>
                            <button 
                              onClick={() => setShowLaundryBlogPage(true)}
                              className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                            >
                              <span>Read more</span>
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeBlogFilter === "Trends" ? (
                /* TRENDS VIEW (12 cards with Ad banner) */
                <div className="space-y-12 select-none animate-in fade-in duration-300">
                  {/* Grid 1: First 6 cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                      { img: "/images/blog_sub_2.png", title: "Title", category: "Trends", date: "Date of Upload" },
                      { img: "/images/blog_sub_1.png", title: "Title", category: "Trends", date: "Date of Upload" },
                      { img: "/images/blog_sub_2.png", title: "Title", category: "Trends", date: "Date of Upload" },
                      { img: "/images/blog_sub_1.png", title: "Title", category: "Trends", date: "Date of Upload" },
                      { img: "/images/blog_sub_2.png", title: "Title", category: "Trends", date: "Date of Upload" },
                      { img: "/images/blog_sub_1.png", title: "Title", category: "Trends", date: "Date of Upload" }
                    ].map((card, idx) => (
                      <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div 
                          className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group cursor-pointer"
                          onClick={() => setShowLaundryBlogPage(true)}
                        >
                          <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                            <span>{card.category}</span>
                            <span>&bull;</span>
                            <span>{card.date}</span>
                          </div>
                          <h4 
                            className="text-xl font-black text-zinc-955 uppercase tracking-tight cursor-pointer hover:text-orange-500"
                            onClick={() => setShowLaundryBlogPage(true)}
                          >
                            {card.title}
                          </h4>
                          <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                          </p>
                          <button 
                            onClick={() => setShowLaundryBlogPage(true)}
                            className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                          >
                            <span>Read more</span>
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Facebook Ad Banner */}
                  <div className="w-full bg-[#3b5998] rounded-[24px] py-12 flex flex-col items-center justify-center text-white select-none my-12 border border-[#2e477e] shadow-md">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight lowercase font-sans">facebook</span>
                    <span className="text-xs uppercase tracking-widest font-mono opacity-80 mt-1">advertising</span>
                  </div>

                  {/* Grid 2: Second 6 cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                      { type: "cartoon", img: "/images/blog_sub_3.png" },
                      { type: "split" },
                      { type: "cartoon", img: "/images/blog_sub_3.png" },
                      { type: "split" },
                      { type: "cartoon", img: "/images/blog_sub_3.png" },
                      { type: "split" }
                    ].map((card, idx) => {
                      if (card.type === "split") {
                        return (
                          <div key={idx + 6} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div 
                              className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs flex bg-zinc-950 cursor-pointer"
                              onClick={() => setShowLaundryBlogPage(true)}
                            >
                              <div className="w-1/2 relative h-full">
                                <Image src="/images/blog_skater.png" fill className="object-cover" alt="Fashion Blog" />
                              </div>
                              <div className="w-1/2 bg-[#5d3fd3] p-4 flex flex-col justify-center text-white space-y-1">
                                <span className="text-[8px] font-bold uppercase tracking-widest font-mono opacity-80">Trends</span>
                                <h5 className="text-xs font-black uppercase leading-tight font-sans">Fashion Blog</h5>
                                <p className="text-[9px] opacity-90 leading-tight">Explore the hottest drops, stylings, and subcultures.</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                                <span>Trends</span>
                                <span>&bull;</span>
                                <span>Date of Upload</span>
                              </div>
                              <h4 
                                className="text-xl font-black text-zinc-955 uppercase tracking-tight cursor-pointer hover:text-orange-500"
                                onClick={() => setShowLaundryBlogPage(true)}
                              >
                                Title
                              </h4>
                              <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                              </p>
                              <button 
                                onClick={() => setShowLaundryBlogPage(true)}
                                className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                              >
                                <span>Read more</span>
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={idx + 6} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div 
                              className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group cursor-pointer"
                              onClick={() => setShowLaundryBlogPage(true)}
                            >
                              <Image src={card.img!} alt="Title" fill className="object-cover group-hover:scale-103 transition-transform" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                                <span>Trends</span>
                                <span>&bull;</span>
                                <span>Date of Upload</span>
                              </div>
                              <h4 
                                className="text-xl font-black text-zinc-955 uppercase tracking-tight cursor-pointer hover:text-orange-500"
                                onClick={() => setShowLaundryBlogPage(true)}
                              >
                                Title
                              </h4>
                              <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                              </p>
                              <button 
                                onClick={() => setShowLaundryBlogPage(true)}
                                className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                              >
                                <span>Read more</span>
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ) : (
                /* NORMAL VIEW (Hero + 3 cards) */
                <div className="space-y-16 animate-in fade-in duration-300">
                  {/* Hero Blog Section */}
                  <div className="space-y-6 text-left mb-16 select-none">
                    <div className="relative w-full aspect-[16/9] lg:aspect-[20/9] flex items-stretch">
                      {/* Large Image Card */}
                      <div 
                        className="w-[88%] relative h-full rounded-[32px] overflow-hidden border border-zinc-200 shadow-sm group cursor-pointer"
                        onClick={() => setShowLaundryBlogPage(true)}
                      >
                        <Image
                          src="/images/blog_hero.png"
                          alt="Today Feature Blog"
                          fill
                          className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                        />
                      </div>
                      {/* Overlapping thumbnail stack */}
                      <div className="absolute right-0 top-0 bottom-0 w-[16%] flex flex-col justify-center gap-4 z-20">
                        {[
                          "/images/blog_ghost.png",
                          "/images/blog_boombox.png",
                          "/images/blog_skater.png"
                        ].map((img, idx) => (
                          <div 
                            key={idx}
                            className="relative w-full aspect-square rounded-[20px] overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform hover:z-30 cursor-pointer"
                            onClick={() => setShowLaundryBlogPage(true)}
                          >
                            <Image src={img} alt={`Thumbnail stack ${idx + 1}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Hero Text */}
                    <div className="max-w-5xl space-y-3 pt-2">
                      <div className="flex items-center gap-2.5 text-[10px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                        <span>Category</span>
                        <span>&bull;</span>
                        <span>Date of upload</span>
                      </div>
                      <h3 
                        className="text-2xl sm:text-3xl font-black text-zinc-955 uppercase tracking-tight font-sans leading-none cursor-pointer hover:text-orange-500"
                        onClick={() => setShowLaundryBlogPage(true)}
                      >
                        Title
                      </h3>
                      <p className="text-zinc-550 text-xs sm:text-sm leading-relaxed max-w-4xl pt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <button 
                        onClick={() => setShowLaundryBlogPage(true)}
                        className="flex items-center gap-1.5 text-xs font-black text-zinc-800 hover:text-[#f05a28] transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                      >
                        <span>Read more</span>
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 3 cards row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 select-none">
                    {[
                      { category: "Category", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", img: "/images/blog_sub_1.png" },
                      { category: "Category", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", img: "/images/blog_sub_2.png" },
                      { category: "Category", date: "Date of Upload", title: "Title", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", img: "/images/blog_sub_3.png" }
                    ].map((card, idx) => (
                      <div key={idx} className="space-y-4">
                        <div 
                          className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group cursor-pointer"
                          onClick={() => setShowLaundryBlogPage(true)}
                        >
                          <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[9px] text-zinc-455 font-bold uppercase tracking-wider font-mono">
                            <span>{card.category}</span>
                            <span>&bull;</span>
                            <span>{card.date}</span>
                          </div>
                          <h4 
                            className="text-xl font-black text-zinc-955 uppercase tracking-tight cursor-pointer hover:text-orange-500"
                            onClick={() => setShowLaundryBlogPage(true)}
                          >
                            {card.title}
                          </h4>
                          <p className="text-zinc-500 text-xs leading-relaxed font-medium">{card.desc}</p>
                          <button 
                            onClick={() => setShowLaundryBlogPage(true)}
                            className="flex items-center gap-1 text-[10px] font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest border-none bg-transparent cursor-pointer font-sans"
                          >
                            <span>Read more</span>
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-1.5 pt-8 border-t border-zinc-100">
                <button className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 border-none cursor-pointer flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-zinc-600" />
                </button>
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-xs border-none cursor-pointer flex items-center justify-center shadow-xs">
                  1
                </button>
                {[2, 3, 4, 5].map((page) => (
                  <button key={page} className="w-8 h-8 rounded-full bg-transparent hover:bg-zinc-50 text-zinc-600 font-black text-xs border-none cursor-pointer flex items-center justify-center transition-colors">
                    {page}
                  </button>
                ))}
                <button className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 border-none cursor-pointer flex items-center justify-center transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              </div>
            </section>

            {/* Stories Section (Hidden in Trends view) */}
            {activeBlogFilter !== "Trends" && (
              <section id="stories-section" className="mb-20 text-center">
                <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">Stories</h2>
                <div className="relative max-w-4xl mx-auto flex items-center">
                  <button className="absolute left-[-15px] z-10 p-2.5 bg-white border border-zinc-250 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer">
                    <ChevronLeft className="w-4 h-4 text-zinc-700" />
                  </button>
                  <div className="flex gap-6 overflow-x-auto py-4 px-2 w-full justify-between scrollbar-hide">
                    {[
                      { name: "Stussy", img: "/images/blog_skater.png" },
                      { name: "Burberry", img: "/images/blog_sub_1.png" },
                      { name: "BrainDead", img: "/images/blog_sub_2.png" },
                      { name: "AlmostGods", img: "/images/blog_sub_3.png" },
                      { name: "Supreme", img: "/images/blog_ghost.png" },
                      { name: "OffWhite", img: "/images/blog_boombox.png" },
                      { name: "Palace", img: "/images/blog_hero.png" },
                      { name: "Acronym", img: "/images/blog_skater.png" }
                    ].map((story, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                        <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-500 via-orange-500 to-rose-500 transition-transform duration-300 group-hover:rotate-45">
                          <div className="w-full h-full rounded-full bg-white p-[2px]">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                              <Image src={story.img} alt={story.name} fill className="object-cover" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-700 tracking-wider font-mono">{story.name}</span>
                      </div>
                    ))}
                  </div>
                  <button className="absolute right-[-15px] z-10 p-2.5 bg-white border border-zinc-250 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-zinc-700" />
                  </button>
                </div>
              </section>
            )}

            {/* DripSpot Section (Hidden in Trends view) */}
            {activeBlogFilter !== "Trends" && (
              <section id="dripspot-section" className="mb-20 text-center">
                <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">DripSpot</h2>
                <AnimatePresence mode="wait">
                  {dripSpotView === "A" && (
                    <motion.div
                      key="state-a"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-16"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm max-w-5xl mx-auto">
                        <div className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[350px]">
                          <div className="relative w-full flex-grow">
                            <Image src="/images/dripspot_spotlight_orange.png" alt="Spotlight outfit walker" fill className="object-contain" priority />
                          </div>
                        </div>
                        <div className="flex flex-col justify-between text-left py-2 space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight font-sans">
                              Slick styling of - Name of the celebrity
                            </h3>
                            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                              Explore details of individual components styled on high-profile creators. Select items to see matching drops.
                            </p>
                          </div>
                          <div className="space-y-3 font-mono">
                            {[
                              { label: "White Oversized Tee", name: "Slay the streets custom collection", price: "₹1,499", id: 1 },
                              { label: "Distressed Denim Pants", name: "Slay the streets denim collection", price: "₹2,199", id: 2 },
                              { label: "Tactical Cargo Lower", name: "Slay the streets cargo collection", price: "₹1,899", id: 3 }
                            ].map((prod) => (
                              <div 
                                key={prod.id} 
                                onClick={() => {
                                  setActiveSpotlightId(prod.id);
                                  setDripSpotView("B");
                                }}
                                className="flex justify-between items-center p-4 border border-zinc-200 rounded-2xl bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 border border-zinc-200 bg-white rounded-xl flex items-center justify-center"><TShirtIcon /></div>
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-zinc-900 leading-tight block">{prod.label}</span>
                                    <span className="text-[9px] text-zinc-400 font-bold block uppercase">{prod.name}</span>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {dripSpotView === "B" && (() => {
                    const activeProd = spotlightProducts.find(p => p.id === activeSpotlightId) || spotlightProducts[0];
                    return (
                      <motion.div
                        key="state-b"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-5xl mx-auto"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                          <div className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[350px]">
                            <button onClick={() => setDripSpotView("A")} className="absolute top-4 left-4 bg-white/90 hover:bg-white text-zinc-800 p-2.5 rounded-full shadow-md transition-all cursor-pointer border-none flex items-center justify-center z-10"><ArrowLeft className="w-4 h-4" /></button>
                            <div className="relative w-full flex-grow">
                              <Image src={activeProd.img} alt={activeProd.title} fill className="object-contain rounded-xl" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-between text-left py-2 space-y-6">
                            <div className="space-y-4">
                              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight font-sans leading-none">{activeProd.title}</h3>
                              <span className="text-[10px] text-zinc-450 font-black uppercase tracking-wider font-mono block">{activeProd.collection}</span>
                              <strong className="text-lg font-black text-zinc-950 block font-sans">{activeProd.price}</strong>
                            </div>
                            <div className="space-y-3 font-mono">
                              <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Similar Items</span>
                              {activeProd.similars.map((sim, idx) => (
                                <div key={idx} onClick={() => { setSelectedVariantImage(sim.img); setDripSpotView("C"); }} className="flex justify-between items-center p-4 border border-zinc-200 rounded-2xl bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 bg-zinc-100 rounded-xl overflow-hidden"><Image src={sim.img} alt={sim.name} fill className="object-cover" /></div>
                                    <div>
                                      <span className="text-[10px] font-black uppercase text-zinc-900 leading-tight block">{sim.name}</span>
                                      <span className="text-[9px] text-zinc-400 font-bold block uppercase">{sim.price}</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {dripSpotView === "C" && (
                    <motion.div
                      key="state-c"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-5xl mx-auto"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                        <div className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[350px]">
                          <button onClick={() => setDripSpotView("B")} className="absolute top-4 left-4 bg-white/90 hover:bg-white text-zinc-800 p-2.5 rounded-full shadow-md transition-all cursor-pointer border-none flex items-center justify-center z-10"><ArrowLeft className="w-4 h-4" /></button>
                          <div className="relative w-full flex-grow aspect-square">
                            <Image src={selectedVariantImage} alt="Selected Variant" fill className="object-cover rounded-xl" />
                          </div>
                        </div>
                        <div className="text-left space-y-6">
                          <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight font-sans">Styled Variant Option</h3>
                          <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                            Previewing detailed product shots for our selected look-alike variants. Shop or register matching items.
                          </p>
                          <InteractiveAddToCartButton
                            onClick={() => {
                              handleAddToCart({ id: 999, brand: "Celebrity Fit", name: "Styled Variant", price: "₹1,299", image: selectedVariantImage });
                            }}
                            buttonText="Add to cart"
                            addedText="Added to cart"
                            animationStyle="truck"
                            size="lg"
                            className="w-full !bg-[#f05a28] hover:!bg-orange-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-colors border-none font-sans"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )}

            {/* DripVision Section */}
            <section id="dripvision-section" className="mb-20">
              <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">DripVision</h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
                <div className={`lg:col-span-4 flex ${dripVisionLayout === "row" ? "flex-col" : "flex-row flex-wrap"} gap-4 select-none justify-between`}>
                  {[1, 2, 3].map((num) => (
                    <div 
                      key={num} 
                      onClick={() => setDripVisionLayout("stack")}
                      className={`relative aspect-[16/10] bg-[#2a93fc] border border-blue-400 rounded-[20px] flex items-center justify-center cursor-pointer shadow-sm hover:scale-[1.01] transition-transform ${dripVisionLayout === "row" ? "w-full" : "w-[30%]"}`}
                    >
                      <div className="w-10 h-10 rounded-full border border-black bg-white flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-black text-black" />
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div 
                  layout
                  className="lg:col-span-8 bg-[#ffd52c] border border-yellow-400 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[300px]"
                >
                  <div className="relative w-full flex-grow min-h-[220px] flex items-center justify-center bg-black/5 rounded-2xl border border-black/10">
                    <div className="w-16 h-16 rounded-full border-2 border-black bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-red-500 text-red-500 ml-1" />
                    </div>
                  </div>
                  {dripVisionLayout === "stack" && (
                    <div className="flex gap-4 pt-4 w-full justify-center">
                      {[4, 5].map((num) => (
                        <div 
                          key={num} 
                          className="bg-[#2a93fc] border-2 border-[#197be3] rounded-[20px] px-6 py-3 flex items-center justify-center gap-3 cursor-pointer hover:bg-blue-600 transition-colors"
                          onClick={() => setDripVisionLayout("row")}
                        >
                          <Play className="w-4 h-4 fill-white text-white" />
                          <span className="text-xs font-black uppercase text-white tracking-wider font-sans">PLAY DIRECT</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </section>

            {/* Instagram Posts Section */}
            <section id="instagram-section" className="mb-20 max-w-7xl mx-auto text-center">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black uppercase tracking-widest text-zinc-955">Instagram Posts</h2>
                <div className="flex gap-2">
                  <button onClick={() => setInstaOffset(prev => Math.max(0, prev - 1))} className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors border-none cursor-pointer"><ChevronLeft className="w-4 h-4 text-zinc-700" /></button>
                  <button onClick={() => setInstaOffset(prev => Math.min(3, prev + 1))} className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors border-none cursor-pointer"><ChevronRight className="w-4 h-4 text-zinc-700" /></button>
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <motion.div animate={{ x: -instaOffset * 220 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="flex gap-4 w-max py-2">
                  {[
                    "https://img105.savana.com/b624019e62da430f8e7c88b4f8c5aca2.webp",
                    "https://img105.savana.com/5b128d15efd948c983868a1302c463f7.webp",
                    "https://img105.savana.com/768828d8de3647fab3593c91587cec6c.webp",
                    "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp",
                    "https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp",
                    "https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp"
                  ].map((imgUrl, i) => (
                    <div key={i} className="w-[180px] sm:w-[200px] flex flex-col gap-2.5 flex-shrink-0 text-left">
                      <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group hover:scale-[1.01] transition-transform cursor-pointer">
                        <Image src={imgUrl} alt="Lifestyle post" fill className="object-cover group-hover:scale-103 transition-transform" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/90 uppercase tracking-widest z-20">@driphunter</div>
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <div className="flex gap-2.5 items-center">
                          <InteractiveHeartButton
                            isFavorite={!!likedPosts[i]}
                            onClick={() => toggleLike(i)}
                            plain={true}
                            className="text-zinc-955"
                          />
                          <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-zinc-955" /></button>
                          <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Send className="w-4 h-4 text-zinc-955" /></button>
                        </div>
                        <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleBookmark(i)} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Bookmark className={`w-4 h-4 transition-colors ${bookmarkedPosts[i] ? "text-zinc-955 fill-zinc-955" : "text-zinc-955"}`} /></motion.button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>
        )}

        {/* CONDITION 2: Brand Tab */}
        {activeSubTab === "Brand" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Alphabet filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none w-full border-b border-zinc-100 justify-start md:justify-center font-mono mb-8">
              {alphabet.map((letter) => {
                const isActive = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={`min-w-[32px] h-[32px] rounded-full text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center ${isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                      }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Split container for Sidebar and Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* LEFT SIDEBAR PANEL */}
              <aside className="hidden md:flex md:w-52 flex-col space-y-6 shrink-0 select-none text-left">
                <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Brand</h3>
                  <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                    {["A-C", "D-F", "G-I", "J-L", "M-O", "P-R", "S-U", "V-X", "Y-Z", "#"].map((item) => (
                      <li key={item}><button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer border-none bg-transparent">{item}</button></li>
                    ))}
                  </ul>
                </div>
                <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Tags</h3>
                  <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                    {["New", "Sales", "Collabs", "Exclusive", "Rare"].map((item) => (
                      <li key={item}><button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer border-none bg-transparent">{item}</button></li>
                    ))}
                  </ul>
                </div>
                <div className="border border-zinc-200 rounded-2xl p-4.5 bg-white shadow-xs">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 font-mono">Category</h3>
                  <ul className="space-y-2 text-xs font-bold text-zinc-800 font-mono">
                    {["T-Shirt", "Hoodie", "Jacket", "Pants", "Shoes", "Accessories", "Others"].map((item) => (
                      <li key={item}><button className="hover:text-orange-500 hover:translate-x-0.5 transition-all text-left w-full uppercase cursor-pointer border-none bg-transparent">{item}</button></li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* RIGHT MAIN PANEL */}
              <div className="flex-grow w-full">
                {/* Search Bar */}
                <div className="max-w-2xl mb-12">
                  <div className="flex items-center border border-zinc-200 rounded-full px-4 py-2.5 bg-zinc-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition-all">
                    <Search className="w-5 h-5 text-zinc-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-black placeholder-zinc-400"
                    />
                  </div>
                </div>

                {/* LAYOUT 1: MINIMAL GRID */}
                <div className="py-12 border-b border-zinc-200">
                  <div className="text-center mb-8"><h2 className="text-3xl font-chaney-title text-black">A</h2></div>
                  <div className="space-y-8 max-w-3xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {squareBrands.map((brand) => (
                        <div key={brand.id} className="aspect-square bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md p-4 hover:scale-102 transition-transform">{brand.logoSvg}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                      {[1, 2, 3, 4].map((idx) => (
                        <div key={idx} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-md p-4 hover:scale-102 transition-transform relative overflow-hidden">
                          <Image src="/images/ac_logo.png" alt="ac logo" fill className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LAYOUT 2: GRID WITH DESCRIPTIONS */}
                <div className="py-12 border-b border-zinc-200">
                  <div className="text-center mb-8"><h2 className="text-3xl font-chaney-title text-black">A</h2></div>
                  <div className="space-y-12 max-w-3xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {squareBrands.map((brand) => (
                        <div key={brand.id} className="flex flex-col items-center text-center">
                          <div className="w-full aspect-square bg-zinc-950 rounded-2xl flex items-center justify-center shadow-md p-4 mb-3">{brand.logoSvg}</div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">{brand.name}</h4>
                          <p className="text-[9px] text-zinc-500 font-mono leading-tight max-w-[150px]">{brand.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                      {[1, 2, 3, 4].map((idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-md p-4 mb-3 relative overflow-hidden">
                            <Image src="/images/ac_logo.png" alt="ac logo" fill className="object-contain" />
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">{circleBrands[0].name}</h4>
                          <p className="text-[9px] text-zinc-500 font-mono leading-tight max-w-[150px]">{circleBrands[0].description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LAYOUT 3: ROW LIST */}
                <div className="py-12 border-b border-zinc-200">
                  <div className="text-center mb-8"><h2 className="text-3xl font-chaney-title text-black">A</h2></div>
                  <div className="max-w-3xl space-y-6">
                    {[0, 1, 2, 3].map((idx) => {
                      const isEven = idx % 2 === 0;
                      const brand = isEven ? squareBrands[0] : circleBrands[0];
                      return (
                        <div key={idx} className="flex items-center gap-6 p-4 border border-zinc-200 rounded-2xl bg-white shadow-xs text-left">
                          {isEven ? (
                            <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm">{brand.logoSvg}</div>
                          ) : (
                            <div className="w-20 h-20 rounded-full border-4 border-black bg-white flex-shrink-0 flex items-center justify-center shadow-sm relative overflow-hidden">
                              <Image src="/images/ac_logo.png" alt="ac logo" fill className="object-contain" />
                            </div>
                          )}
                          <div className="space-y-1">
                            <h4 className="text-sm font-extrabold uppercase tracking-wide text-black">{brand.name}</h4>
                            <p className="text-xs text-zinc-500 font-mono leading-relaxed">{brand.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* LAYOUT 4: PRODUCT SHOWCASE GRID */}
                <div className="py-12">
                  <div className="text-center mb-8"><h2 className="text-3xl font-chaney-title text-black">A</h2></div>
                  <div className="max-w-3xl space-y-12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0"><div className="scale-60">{squareBrands[0].logoSvg}</div></div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-black">{squareBrands[0].name}</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[{ name: "T-Shirt", image: "/images/mock_tee.png" }, { name: "Hat", image: "/images/mock_hat.png" }, { name: "Cap", image: "/images/mock_cap.png" }].map((prod, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2"><Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" /></div>
                            <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 relative overflow-hidden"><Image src="/images/ac_logo.png" alt="ac logo" fill className="object-contain" /></div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-black">{circleBrands[0].name}</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[{ name: "T-Shirt", image: "https://img105.savana.com/7db1623f0bb74829afb406bcdc8cf703.webp" }, { name: "Short", image: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp" }].map((prod, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-full aspect-[4/5] bg-zinc-50 rounded-2xl overflow-hidden relative border border-zinc-100 shadow-xs mb-2"><Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="200px" /></div>
                            <span className="text-xs font-bold text-zinc-800">{prod.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION 3: Affiliate Tab */}
        {activeSubTab === "Affiliate" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Hero Banner */}
            <section className="relative h-[200px] sm:h-[300px] md:h-[350px] w-full flex items-center justify-center overflow-hidden rounded-3xl">
              <Image src="/images/affiliate_hero.png" alt="Recommend Drip, Earn Ad Fees" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 text-center px-4 space-y-4">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-chaney-title text-white tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Recommend Drip, <br /> Earn Ad Fees*
                </h1>
                <button onClick={() => setLoginOpen(true)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold uppercase tracking-widest text-[9px] sm:text-xs py-3 px-6 rounded-xl transition-all shadow-lg cursor-pointer border-none">Start Today*</button>
              </div>
            </section>

            {/* Intro */}
            <section className="text-left max-w-5xl mx-auto space-y-3 font-mono">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-950">Driphunter Associates - Driphunter&apos;s affiliate marketing program</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-4xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim, natoque penatibus et magnis dis parturient montes nascetur.
              </p>
            </section>

            {/* Steps */}
            <section className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Step 1: Sign up", desc: "Join our affiliate community instantly. Review custom access keys, onboard with our team, and receive immediate setup approval.", img: "/images/step1_signup.png" },
                  { title: "Step 2: Recommend", desc: "Recommend millions of premium streetwear jackets, tees, and cargos to your audience. Access easy linking tools to build referrals.", img: "/images/step2_recommend.png" },
                  { title: "Step 3: Earn", desc: "Earn up to 10% in advertising fees from qualifying orders. High average cart values maximize your passive profit payout.", img: "/images/step3_earn.png" }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-6 bg-white border border-zinc-200 rounded-3xl shadow-xs">
                    <div className="w-full h-32 relative mb-4"><Image src={step.img} alt={step.title} fill className="object-contain" /></div>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight mb-2">{step.title}</h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-mono max-w-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Slider */}
            <section className="max-w-5xl mx-auto">
              <div className="relative aspect-[16/9] md:aspect-[2.4/1] w-full rounded-3xl overflow-hidden border border-zinc-200">
                <Image src={slides[currentSlide].image} alt="Streetwear Lifestyle" fill className="object-cover transition-all duration-700 ease-in-out" />
              </div>
              <div className="flex justify-center items-center gap-3 mt-4 text-xs font-mono font-bold text-zinc-400">
                <button onClick={() => setCurrentSlide(0)} className={`cursor-pointer transition-colors border-none bg-transparent ${currentSlide === 0 ? "text-red-500 font-extrabold" : "hover:text-black"}`}>1</button>
                <span className="text-zinc-300">|</span>
                <button onClick={() => setCurrentSlide(1)} className={`cursor-pointer transition-colors border-none bg-transparent ${currentSlide === 1 ? "text-red-500 font-extrabold" : "hover:text-black"}`}>2</button>
              </div>
            </section>

            {/* Accordion FAQ */}
            <section className="max-w-5xl mx-auto border-t border-zinc-200 pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                <div className="lg:col-span-6 space-y-4 font-mono">
                  <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900">Header</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim, natoque penatibus et magnis dis parturient montes nascetur.
                  </p>
                </div>
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-950 font-mono mb-4">Frequently Asked Questions*</h3>
                  <div className="space-y-3.5 font-mono">
                    {faqData.map((item, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div key={idx} className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                          <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-4 text-left font-bold text-[10px] uppercase tracking-tight text-zinc-800 cursor-pointer border-none bg-transparent">
                            <span>{item.q}</span>
                            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[160px] border-t border-zinc-200" : "max-h-0"}`}>
                            <p className="p-4 text-[11px] text-zinc-500 leading-relaxed bg-white">{item.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Join Banner */}
            <section className="max-w-5xl mx-auto mb-12">
              <div className="bg-white border border-zinc-200 rounded-[36px] p-6 text-black grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100 shadow-xs border border-zinc-100"><Image src="/images/join_us.png" alt="Join Us" fill className="object-cover" /></div>
                <div className="flex flex-col justify-center space-y-4 text-left">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 leading-none uppercase">Become an <br /> Driphunter Affiliate</h2>
                  <p className="text-xs text-zinc-650 leading-relaxed font-sans max-w-sm">Start your affiliate journey on Driphunter and become a part of our marketing community.</p>
                  <button onClick={() => setLoginOpen(true)} className="w-max bg-[#ffd426] hover:bg-[#ebd024] text-black font-extrabold text-xs uppercase py-3.5 px-8 rounded-xl shadow-xs transition-colors cursor-pointer border-none">Sign up*</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CONDITION 4: Organisers Tab */}
        {activeSubTab === "Organisers" && (
          <div className="py-16 text-center space-y-6 max-w-xl mx-auto font-mono animate-in fade-in duration-300">
            <Compass className="w-12 h-12 text-zinc-400 mx-auto animate-spin" style={{ animationDuration: '3s' }} />
            <h2 className="text-xl font-black uppercase tracking-wider text-zinc-900 leading-none">Driphunter Organisers</h2>
            <p className="text-xs text-zinc-500 leading-relaxed font-mono">
              Connect with our local streetwear event and convention organizers around the globe. Learn about streetwear popups, product drop events, and local designer runway showcases.
            </p>
            <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 border-b border-zinc-100 pb-1.5 tracking-widest font-mono">Upcoming Events</h4>
              <ul className="space-y-3.5 text-xs text-zinc-800">
                <li className="flex justify-between items-center">
                  <span className="font-bold uppercase tracking-tight">DripCon Tokyo 2026</span>
                  <span className="bg-[#f05a28] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-sans">October</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold uppercase tracking-tight">Mumbai Streetwear Summit</span>
                  <span className="bg-black text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-sans">December</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Retro Tech & Social Collage Banner before Footer */}
      <RetroTechBanner />

      {/* Multi-Step Vendor Onboarding Modal */}
      <VendorOnboardingModal isOpen={vendorModalOpen} onClose={() => setVendorModalOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
