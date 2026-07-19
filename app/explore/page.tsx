"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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
  ArrowRight,
  X
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
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80" },
      { name: "Hat", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&q=80" },
      { name: "Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80" }
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
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80" },
      { name: "Short", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Utility Vest", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80" },
      { name: "Track Pants", image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Camo Jacket", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300&q=80" },
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80" }
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
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&w=300&q=80" },
      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
      { name: "Sock", image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" },
      { name: "Denim Pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Sneakers", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" }
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
      { name: "T-Shirt", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=300&q=80" },
      { name: "Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Work Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80" },
      { name: "Cargos", image: "https://images.unsplash.com/photo-1550928431-ee0ec6db1ad7?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Trackies", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80" },
      { name: "Knit Cap", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Jacket", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300&q=80" },
      { name: "Belt", image: "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?auto=format&fit=crop&w=300&q=80" }
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
      { name: "Box Logo Tee", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=300&q=80" },
      { name: "Camp Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80" }
    ]
  }
];

const spotlightProducts = [
  {
    id: 1,
    title: "White Classic Oversized Tee",
    collection: "Slay the Streets Custom Collection",
    price: "₹1,499",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
    similars: [
      { name: "Raw Box Tee", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80", price: "₹999" },
      { name: "Signature Fit", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=150&q=80", price: "₹1,199" }
    ]
  },
  {
    id: 2,
    title: "Distressed Denim Pants",
    collection: "Slay the Streets Denim Collection",
    price: "₹2,199",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
    similars: [
      { name: "Tactical Cargo Lower", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80", price: "₹1,899" },
      { name: "Mesh Athletic Shorts", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80", price: "₹799" }
    ]
  },
  {
    id: 3,
    title: "Tactical Cargo Lower",
    collection: "Slay the Streets Cargo Collection",
    price: "₹1,899",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
    similars: [
      { name: "Distressed Denim Pants", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&q=80", price: "₹2,199" },
      { name: "Oversized Flannel Shirt", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=150&q=80", price: "₹1,299" }
    ]
  }
];

const TShirtIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M25,25 L35,18 C38,20 42,21 46,20 C50,21 54,20 57,18 L67,25 L75,37 L66,41 L66,82 L26,82 L26,41 L17,37 Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LongSleeveIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-zinc-950" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M30,20 L40,15 L50,22 L60,15 L70,20 L85,45 L75,48 L70,35 L70,85 L30,85 L30,35 L25,48 L15,45 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50,22 L50,85" strokeLinecap="round" />
    <circle cx="50" cy="35" r="1.5" fill="#000" />
    <circle cx="50" cy="50" r="1.5" fill="#000" />
    <circle cx="50" cy="65" r="1.5" fill="#000" />
  </svg>
);

const PantsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-zinc-955" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M30,15 L70,15 L78,85 L54,85 L50,45 L46,85 L22,85 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30,15 L35,28 L65,28 L70,15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShortSleeveIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-zinc-950" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M30,20 L40,15 L50,22 L60,15 L70,20 L80,35 L70,38 L70,85 L30,85 L30,38 L20,35 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50,22 L50,85" strokeLinecap="round" />
    <circle cx="50" cy="35" r="1.5" fill="#000" />
    <circle cx="50" cy="50" r="1.5" fill="#000" />
    <circle cx="50" cy="65" r="1.5" fill="#000" />
  </svg>
);

const ShortsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-zinc-955" fill="none" stroke="#000000" strokeWidth="1.5">
    <path d="M30,15 L70,15 L75,55 L53,55 L50,35 L47,55 L25,55 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30,15 L33,23 L67,23 L70,15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Explore() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<"Blogs" | "Stories" | "DripSpot" | "DripVision">("Blogs");
  const [showLaundryBlogPage, setShowLaundryBlogPage] = useState<boolean>(true);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "Blogs" || tab === "Stories" || tab === "DripSpot" || tab === "DripVision") {
        setActiveSubTab(tab);
        
        // Scroll on load
        setTimeout(() => {
          let sectionId = "";
          if (tab === "Blogs") sectionId = "blogs-section";
          else if (tab === "Stories") sectionId = "stories-section";
          else if (tab === "DripSpot") sectionId = "dripspot-section";
          else if (tab === "DripVision") sectionId = "dripvision-section";

          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 140;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 300);
      }
    }
  }, []);

  const handleSubTabChange = (tabId: "Blogs" | "Stories" | "DripSpot" | "DripVision") => {
    setActiveSubTab(tabId);
    if (tabId === "Blogs") {
      setShowLaundryBlogPage(true);
      setActiveBlogFilter("All");
    }
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.pushState({}, "", url.toString());

      // Scroll smoothly to the target section
      setTimeout(() => {
        let sectionId = "";
        if (tabId === "Blogs") sectionId = "blogs-section";
        else if (tabId === "Stories") sectionId = "stories-section";
        else if (tabId === "DripSpot") sectionId = "dripspot-section";
        else if (tabId === "DripVision") sectionId = "dripvision-section";

        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 140; // offset for navbar + sub-tabs sticky row
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 50);
    }
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
  const [activeLetter, setActiveLetter] = useState<string>("ALL");

  // Affiliate tab states
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => [
    { image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1200&q=80" },
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" }
  ], []);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Blogs tab states
  const [activeBlogFilter, setActiveBlogFilter] = useState("Trends");
  const [dripSpotView, setDripSpotView] = useState<"A" | "B" | "C">("A");
  const [selectedVariantImage, setSelectedVariantImage] = useState<string>("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80");
  const [dripVisionLayout, setDripVisionLayout] = useState<"row" | "stack">("row");
  const [instaOffset, setInstaOffset] = useState(0);
  const [activeSpotlightId, setActiveSpotlightId] = useState<number>(1);
  const [likedPosts, setLikedPosts] = useState<boolean[]>(Array(6).fill(false));
  const [bookmarkedPosts, setBookmarkedPosts] = useState<boolean[]>(Array(6).fill(false));

  // DripSpot Pagination states & data memoizations
  const [dripSpotOrangePage, setDripSpotOrangePage] = useState<number>(1);
  const [dripSpotPurplePage, setDripSpotPurplePage] = useState<number>(1);

  const activeOrangeImages = useMemo(() => {
    const orangeImages = [
      "/images/dripspot_sim_1.png",
      "/images/dripspot_sim_2.png",
      "/images/dripspot_sim_3.png",
      "/images/dripspot_sim_4.png"
    ];
    const shift = (dripSpotOrangePage - 1) % 4;
    return [
      ...orangeImages.slice(shift),
      ...orangeImages.slice(0, shift)
    ];
  }, [dripSpotOrangePage]);

  const activeCelebrityModels = useMemo(() => {
    const celebrityModels = [
      { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-purple-700 to-indigo-600 border-purple-800", name: "Travis Scott" },
      { img: "/images/dripspot_cel_2.png", bg: "bg-gradient-to-tr from-blue-600 to-sky-500 border-blue-700", name: "Kanye West" },
      { img: "/images/dripspot_sim_4.png", bg: "bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-700", name: "A$AP Rocky" },
      { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-rose-600 to-pink-500 border-rose-700", name: "Tyler the Creator" },
      { img: "/images/dripspot_cel_2.png", bg: "bg-gradient-to-tr from-indigo-700 to-purple-600 border-indigo-800", name: "Billie Eilish" },
      { img: "/images/dripspot_sim_4.png", bg: "bg-gradient-to-tr from-cyan-600 to-blue-500 border-cyan-700", name: "Kendrick Lamar" },
      { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-fuchsia-600 to-pink-500 border-fuchsia-700", name: "Jack Harlow" },
      { img: "/images/dripspot_cel_2.png", bg: "bg-gradient-to-tr from-violet-600 to-purple-500 border-violet-700", name: "Drake" }
    ];
    const startIndex = ((dripSpotPurplePage - 1) * 2) % celebrityModels.length;
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push(celebrityModels[(startIndex + i) % celebrityModels.length]);
    }
    return items;
  }, [dripSpotPurplePage]);

  const [brandProductsPage, setBrandProductsPage] = useState<number>(1);

  const activeBrandProducts = useMemo(() => {
    const products = [
      [
        { name: "Oxford Long Shirt", price: "₹1,899", type: "long" },
        { name: "Cargo Pants Lower", price: "₹2,499", type: "pants" },
        { name: "Cuban Collar Shirt", price: "₹1,499", type: "short" },
        { name: "Denim Fit Shorts", price: "₹1,299", type: "shorts" }
      ],
      [
        { name: "Flannel Plaid Shirt", price: "₹1,699", type: "long" },
        { name: "Chino Slim Pants", price: "₹2,199", type: "pants" },
        { name: "Camp Summer Shirt", price: "₹1,399", type: "short" },
        { name: "Sweat Casual Shorts", price: "₹999", type: "shorts" }
      ],
      [
        { name: "Denim Heavy Jacket", price: "₹2,999", type: "long" },
        { name: "Jogger Stretch Pants", price: "₹1,799", type: "pants" },
        { name: "Polo Knit Shirt", price: "₹1,199", type: "short" },
        { name: "Cargo Utility Shorts", price: "₹1,399", type: "shorts" }
      ],
      [
        { name: "Corduroy Retro Shirt", price: "₹1,999", type: "long" },
        { name: "Relaxed Indigo Jeans", price: "₹2,299", type: "pants" },
        { name: "Hawaiian Flower Shirt", price: "₹1,599", type: "short" },
        { name: "Utility Swim Shorts", price: "₹1,199", type: "shorts" }
      ],
      [
        { name: "Linen Breathable Shirt", price: "₹1,799", type: "long" },
        { name: "Wide Leg Trousers", price: "₹2,599", type: "pants" },
        { name: "Striped Resort Shirt", price: "₹1,299", type: "short" },
        { name: "Beach Board Shorts", price: "₹1,099", type: "shorts" }
      ]
    ];
    return products[(brandProductsPage - 1) % 5];
  }, [brandProductsPage]);

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
              className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all active:scale-95 ${activeSubTab === tab.id
                  ? "bg-[#f05a28] border-[#f05a28] text-white shadow-xs"
                  : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-100 hover:text-[#f05a28]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONDITION 1: Blogs or Stories Tab */}
        {(activeSubTab === "Blogs" || activeSubTab === "Stories" || activeSubTab === "DripSpot" || activeSubTab === "DripVision") && (
          <div className="space-y-16">
            <section id="blogs-section" className="mb-20 pt-2 max-w-7xl mx-auto">
              <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">
                Blogs
              </h2>

              {/* Subcategory & Sort by Default Row */}
              {!showLaundryBlogPage && (
                <div className="relative flex items-center justify-center border-b border-zinc-150 pb-6 mb-10 select-none">
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {["All", "Trends", "How To", "Celebs", "Opinion"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveBlogFilter(cat);
                          setShowLaundryBlogPage(false);
                        }}
                        className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${!showLaundryBlogPage && activeBlogFilter === cat
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
              )}

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
                          className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${activeBlogFilter === cat
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

              {/* Added Stories, DripSpot, DripVision, and Instagram under the Blogs tab's "All" filter */}
              {((!showLaundryBlogPage && activeBlogFilter === "All") || activeSubTab === "Stories" || activeSubTab === "DripSpot" || activeSubTab === "DripVision") && (
                <div className="space-y-16 pt-16 border-t border-zinc-200 mt-16">
                  {/* Stories Section */}
                  <section id="stories-section" className="mb-20 text-center">
                    <h2 className="text-4xl font-black text-center text-zinc-955 uppercase tracking-widest mb-10">Stories</h2>
                    <div className="relative max-w-4xl mx-auto flex items-center">
                      <button className="absolute left-[-15px] z-10 p-2.5 bg-white border border-zinc-200 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer flex items-center justify-center">
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
                          <div 
                            key={i} 
                            onClick={() => {
                              setActiveStoryIndex(i);
                              handleSubTabChange("Stories");
                            }}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
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
                      <button className="absolute right-[-15px] z-10 p-2.5 bg-white border border-zinc-200 rounded-full shadow-md hover:bg-zinc-50 transition-colors border-none cursor-pointer flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-zinc-700" />
                      </button>
                    </div>

                    {/* Phone Story Viewer Widget (Visible only under Stories tab) */}
                    {activeSubTab === "Stories" && (
                      <div className="relative max-w-4xl mx-auto flex items-center justify-center py-10 mt-8 animate-in fade-in duration-300">
                        
                        {/* Left Story Preview */}
                        <div className="hidden md:block w-40 h-[280px] rounded-[20px] overflow-hidden opacity-30 blur-[0.5px] mr-4 border border-zinc-250 flex-shrink-0 select-none shadow-sm relative">
                          <Image 
                            src={[
                              "/images/phone_story_girl.png",
                              "/images/blog_sub_1.png",
                              "/images/blog_sub_2.png",
                              "/images/blog_sub_3.png",
                              "/images/blog_ghost.png",
                              "/images/blog_boombox.png",
                              "/images/blog_hero.png",
                              "/images/blog_skater.png"
                            ][(activeStoryIndex - 1 + 8) % 8]} 
                            alt="Previous Story" 
                            fill 
                            className="object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-2">
                            <span className="text-white text-xs font-black uppercase tracking-widest font-mono">Street Stories</span>
                          </div>
                        </div>

                        {/* Left Arrow Button */}
                        <button 
                          onClick={() => setActiveStoryIndex(prev => (prev - 1 + 8) % 8)}
                          className="z-35 w-7 h-7 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md flex items-center justify-center cursor-pointer border-none shadow-md transition-colors mx-3 flex-shrink-0"
                        >
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>

                        {/* Main Phone Story */}
                        <div 
                          style={{
                            width: '300px',
                            minWidth: '300px',
                            height: '533px',
                            minHeight: '533px',
                            flexShrink: 0,
                            borderRadius: '40px',
                            overflow: 'hidden',
                            border: '12px solid #09090b',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            backgroundColor: '#000000',
                            position: 'relative'
                          }}
                        >
                          {/* Notch */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-950 rounded-full z-30 flex items-center justify-center">
                            <div className="w-10 h-1 bg-zinc-800 rounded-full mr-2"></div>
                            <div className="w-2 h-2 bg-zinc-900 rounded-full"></div>
                          </div>

                          {/* Home Bar */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/80 rounded-full z-30"></div>

                          {/* Story Image */}
                          <Image 
                            src={activeStoryIndex === 0 ? "/images/phone_story_girl.png" : [
                              "/images/phone_story_girl.png",
                              "/images/blog_sub_1.png",
                              "/images/blog_sub_2.png",
                              "/images/blog_sub_3.png",
                              "/images/blog_ghost.png",
                              "/images/blog_boombox.png",
                              "/images/blog_hero.png",
                              "/images/blog_skater.png"
                            ][activeStoryIndex]} 
                            alt="Active Story" 
                            fill 
                            className="object-cover" 
                          />
                          
                          {/* Story UI Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 p-4 pt-8 flex flex-col justify-between z-10 text-left">
                            <div>
                              {/* Progress bars (Instagram style) */}
                              <div className="flex gap-1 mb-3">
                                {[0, 1, 2, 3].map((barIdx) => (
                                  <div key={barIdx} className="h-0.5 bg-white/30 rounded-full flex-grow overflow-hidden">
                                    <div className={`h-full bg-white/90 rounded-full ${barIdx === 0 ? "w-[75%]" : "w-0"}`}></div>
                                  </div>
                                ))}
                              </div>

                              {/* Story Header */}
                              <div className="flex justify-between items-center px-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full border border-orange-500 overflow-hidden relative">
                                    <Image 
                                      src={[
                                        "/images/blog_skater.png",
                                        "/images/blog_sub_1.png",
                                        "/images/blog_sub_2.png",
                                        "/images/blog_sub_3.png",
                                        "/images/blog_ghost.png",
                                        "/images/blog_boombox.png",
                                        "/images/blog_hero.png",
                                        "/images/blog_skater.png"
                                      ][activeStoryIndex]} 
                                      alt="Profile" 
                                      fill 
                                      className="object-cover" 
                                    />
                                  </div>
                                  <div>
                                    <span className="text-white text-[10px] font-black uppercase tracking-wider font-mono block leading-none">
                                      {[
                                        "Stussy",
                                        "Burberry",
                                        "BrainDead",
                                        "AlmostGods",
                                        "Supreme",
                                        "OffWhite",
                                        "Palace",
                                        "Acronym"
                                      ][activeStoryIndex]}
                                    </span>
                                    <span className="text-white/60 text-[8px] font-bold block">12h ago</span>
                                  </div>
                                </div>
                              </div>

                              {/* Countdown Card Widget (Mockup Specific) */}
                              <div className="bg-gradient-to-tr from-[#c82af4] to-[#12a0ff] rounded-[18px] p-3 w-[88%] mx-auto shadow-lg mt-10 text-center text-white relative select-none">
                                {/* Top row */}
                                <div className="flex justify-between items-center mb-1.5 px-0.5">
                                  <span className="text-[7px] font-black uppercase tracking-wider font-sans">COUNTDOWN NAME</span>
                                  <div className="w-3 h-3 rounded-full border border-white/60 flex items-center justify-center text-[7px] font-bold font-sans">i</div>
                                </div>
                                {/* Timer grid */}
                                <div className="flex items-center justify-center gap-1.5">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">01</div>
                                    <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">hours</span>
                                  </div>
                                  <span className="text-white font-black text-base mb-3 leading-none">:</span>
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">23</div>
                                    <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">minutes</span>
                                  </div>
                                  <span className="text-white font-black text-base mb-3 leading-none">:</span>
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#d11bb7] font-black text-base shadow-xs">45</div>
                                    <span className="text-[5px] font-black uppercase mt-0.5 text-white/95 font-sans">seconds</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Story Footer */}
                            <div className="flex flex-col items-center gap-2 mb-4 w-full text-center relative">
                              <a 
                                href="/shop"
                                className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg hover:scale-105 transition-transform no-underline inline-block text-center w-max mx-auto font-sans"
                              >
                                Shop Now
                              </a>
                              <div className="absolute right-1 bottom-1 text-white hover:scale-105 transition-transform cursor-pointer">
                                <Send className="w-4 h-4 text-white fill-none stroke-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Arrow Button */}
                        <button 
                          onClick={() => setActiveStoryIndex(prev => (prev + 1) % 8)}
                          className="z-35 w-7 h-7 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md flex items-center justify-center cursor-pointer border-none shadow-md transition-colors mx-3 flex-shrink-0"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>

                        {/* Right Story Preview */}
                        <div className="hidden md:block w-40 h-[280px] rounded-[20px] overflow-hidden opacity-30 blur-[0.5px] ml-4 border border-zinc-250 flex-shrink-0 select-none shadow-sm relative">
                          <Image 
                            src={[
                              "/images/phone_story_girl.png",
                              "/images/blog_sub_1.png",
                              "/images/blog_sub_2.png",
                              "/images/blog_sub_3.png",
                              "/images/blog_ghost.png",
                              "/images/blog_boombox.png",
                              "/images/blog_hero.png",
                              "/images/blog_skater.png"
                            ][(activeStoryIndex + 1) % 8]} 
                            alt="Next Story" 
                            fill 
                            className="object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-2">
                            <span className="text-white text-xs font-black uppercase tracking-widest font-mono">Street Stories</span>
                          </div>
                        </div>

                        {/* Close Button */}
                        <button 
                          onClick={() => handleSubTabChange("Blogs")}
                          className="absolute top-2 right-2 p-2.5 bg-white hover:bg-zinc-100 rounded-full border border-zinc-250 cursor-pointer flex items-center justify-center shadow-md z-30"
                        >
                          <X className="w-4 h-4 text-zinc-800" />
                        </button>
                      </div>
                    )}
                  </section>

                  {/* DripSpot Section */}
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
                                <Image 
                                  src="/images/dripspot_spotlight_orange.png" 
                                  alt="Spotlight outfit walker" 
                                  fill 
                                  className="object-contain" 
                                  priority 
                                />
                              </div>
                            </div>

                            <div className="flex flex-col justify-between p-2">
                              <div className="text-left pb-2 flex items-center gap-1 text-[10px] font-black uppercase text-zinc-400 tracking-wider font-mono">
                                <span>Date of upload</span>
                                <span className="text-zinc-300">•</span>
                                <span>Name of the celebrity</span>
                              </div>

                              <div className="flex flex-col divide-y divide-zinc-100 flex-grow">
                                {spotlightProducts.map((item) => (
                                  <div 
                                    key={item.id} 
                                    onClick={() => {
                                      setActiveSpotlightId(item.id);
                                      setDripSpotView("B");
                                    }}
                                    className="flex justify-between items-center py-4 cursor-pointer hover:bg-zinc-50/50 px-2 rounded-xl transition-colors group"
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className="w-14 h-14 bg-white border border-zinc-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <TShirtIcon />
                                      </div>
                                      <div className="text-left">
                                        <h4 className="text-sm font-black text-zinc-955 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{item.collection}</p>
                                        <span className="text-xs font-black text-zinc-955 font-mono mt-0.5 block">{item.price}</span>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-955 transition-colors" />
                                  </div>
                                ))}
                              </div>

                              <div>
                                <button 
                                  onClick={() => setDripSpotView("C")}
                                  className="text-xs font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest transition-colors cursor-pointer border-none bg-transparent"
                                >
                                  View More
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="max-w-5xl mx-auto space-y-6 pt-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {activeOrangeImages.map((img, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => setDripSpotView("C")}
                                  className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] overflow-hidden aspect-square relative group cursor-pointer shadow-xs hover:shadow-md transition-shadow hover:scale-[1.01]"
                                >
                                  <Image 
                                    src={img} 
                                    alt={`Explore Outfit ${idx + 1}`} 
                                    fill 
                                    className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-center items-center gap-1.5 pt-2">
                              <button 
                                onClick={() => setDripSpotOrangePage(prev => Math.max(1, prev - 1))}
                                className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                              >
                                <ChevronLeft className="w-3 h-3 text-zinc-500" />
                              </button>
                              {[1, 2, 3, 4, 5].map((page) => (
                                <button 
                                  key={page} 
                                  onClick={() => setDripSpotOrangePage(page)}
                                  className={`w-6 h-6 rounded-full font-black text-[10px] border-none cursor-pointer flex items-center justify-center transition-colors ${
                                    dripSpotOrangePage === page 
                                      ? "bg-orange-500 text-white shadow-xs" 
                                      : "bg-transparent hover:bg-zinc-100 text-zinc-655"
                                  }`}
                                >
                                  {page}
                                </button>
                              ))}
                              <button 
                                onClick={() => setDripSpotOrangePage(prev => Math.min(5, prev + 1))}
                                className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                              >
                                <ChevronRight className="w-3 h-3 text-zinc-500" />
                              </button>
                            </div>
                          </div>

                          <div className="max-w-5xl mx-auto space-y-6 pt-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {activeCelebrityModels.map((cel, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3">
                                  <div 
                                    onClick={() => setDripSpotView("C")}
                                    className={`w-full aspect-[4/5] rounded-[24px] overflow-hidden relative border shadow-sm group cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.01] ${cel.bg}`}
                                  >
                                    <Image 
                                      src={cel.img} 
                                      alt={`Celebrity Model ${idx + 1}`} 
                                      fill 
                                      className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                                    />
                                  </div>
                                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider font-mono">
                                    {cel.name}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-center items-center gap-1.5 pt-2">
                              <button 
                                onClick={() => setDripSpotPurplePage(prev => Math.max(1, prev - 1))}
                                className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                              >
                                <ChevronLeft className="w-3 h-3 text-zinc-500" />
                              </button>
                              {[1, 2, 3, 4, 5].map((page) => (
                                <button 
                                  key={page} 
                                  onClick={() => setDripSpotPurplePage(page)}
                                  className={`w-6 h-6 rounded-full font-black text-[10px] border-none cursor-pointer flex items-center justify-center transition-colors ${
                                    dripSpotPurplePage === page 
                                      ? "bg-orange-500 text-white shadow-xs" 
                                      : "bg-transparent hover:bg-zinc-100 text-zinc-655"
                                  }`}
                                >
                                  {page}
                                </button>
                              ))}
                              <button 
                                onClick={() => setDripSpotPurplePage(prev => Math.min(5, prev + 1))}
                                className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                              >
                                <ChevronRight className="w-3 h-3 text-zinc-550" />
                              </button>
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
                            className="space-y-6 max-w-5xl mx-auto"
                          >
                            <div className="text-left">
                              <button 
                                onClick={() => setDripSpotView("A")}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-950 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-sans"
                              >
                                <ArrowLeft className="w-4 h-4 text-zinc-955" />
                                <span>Back to Catalog</span>
                              </button>
                            </div>

                            <div className="bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                                <div className="bg-zinc-50 rounded-2xl p-6 aspect-[1.1] flex items-center justify-center border border-zinc-100 relative group overflow-hidden">
                                  <Image
                                    src={activeProd.img}
                                    alt={activeProd.title}
                                    fill
                                    className="object-contain p-6 group-hover:scale-103 transition-transform duration-350"
                                  />
                                </div>

                                <div className="text-left space-y-5">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Featured Spotlight</span>
                                      <button className="flex items-center gap-1 text-xs text-rose-500 font-bold font-mono border-none bg-transparent cursor-pointer">
                                        <Heart className="w-4 h-4 fill-rose-500" />
                                        <span>100 Likes</span>
                                      </button>
                                    </div>
                                    <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight mt-1 leading-none">
                                      {activeProd.title}
                                    </h3>
                                    <p className="text-[11px] text-zinc-450 uppercase tracking-wider font-mono font-bold mt-1">
                                      {activeProd.collection}
                                    </p>
                                  </div>

                                  <div className="bg-zinc-900 text-white rounded-xl p-3 flex justify-between items-center text-xs font-mono">
                                    <span className="font-black text-yellow-400">{activeProd.price}</span>
                                    <a href="#" className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                                      <span>Product Details/URL</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </a>
                                  </div>

                                  <div className="space-y-2.5">
                                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Explore Similar Products</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      {activeProd.similars.map((sim, i) => (
                                        <div key={i} className="flex gap-2.5 items-center p-2 border border-zinc-150 rounded-xl bg-zinc-50">
                                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-zinc-200">
                                            <Image src={sim.img} alt={sim.name} fill className="object-cover" />
                                          </div>
                                          <div className="text-[10px] min-w-0">
                                            <p className="font-extrabold text-zinc-800 truncate uppercase leading-none">{sim.name}</p>
                                            <span className="font-mono text-zinc-500">{sim.price}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <button className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer border-none shadow-md">
                                      Buy at Driphunter.com
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* More from Brand */}
                            <div className="space-y-6 pt-12 border-t border-zinc-200 mt-12 text-left">
                              <h3 className="text-lg font-black text-zinc-950 uppercase tracking-wide">
                                More from {activeProd.collection.replace("COLLECTION", "").trim() || "Name of the Brand"}
                              </h3>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {activeBrandProducts.map((prod, idx) => {
                                  let IconComponent = TShirtIcon;
                                  if (prod.type === "long") IconComponent = LongSleeveIcon;
                                  else if (prod.type === "pants") IconComponent = PantsIcon;
                                  else if (prod.type === "short") IconComponent = ShortSleeveIcon;
                                  else if (prod.type === "shorts") IconComponent = ShortsIcon;

                                  return (
                                    <div 
                                      key={idx} 
                                      onClick={() => {
                                        let targetImg = "/images/dripspot_sim_1.png";
                                        if (prod.type === "long") targetImg = "/images/dripspot_sim_3.png";
                                        else if (prod.type === "pants") targetImg = "/images/dripspot_sim_2.png";
                                        else if (prod.type === "shorts") targetImg = "/images/dripspot_sim_4.png";
                                        setSelectedVariantImage(targetImg);
                                        setDripSpotView("C");
                                      }}
                                      className="flex flex-col items-center gap-3 text-center group cursor-pointer"
                                    >
                                      <div className="w-full aspect-[4/5] bg-white border border-zinc-200 rounded-[24px] flex items-center justify-center relative shadow-xs hover:shadow-md transition-shadow hover:scale-[1.01]">
                                        <IconComponent />
                                      </div>
                                      <div className="text-center group-hover:text-orange-500 transition-colors">
                                        <h4 className="text-[11px] font-black text-zinc-955 uppercase tracking-tight leading-none group-hover:text-orange-500 transition-colors">{prod.name}</h4>
                                        <span className="text-[10px] text-zinc-400 font-bold font-mono mt-1 block">{prod.price}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="flex justify-center items-center gap-1.5 pt-2">
                                <button 
                                  onClick={() => setBrandProductsPage(prev => Math.max(1, prev - 1))}
                                  className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                                >
                                  <ChevronLeft className="w-3 h-3 text-zinc-500" />
                                </button>
                                {[1, 2, 3, 4, 5].map((page) => (
                                  <button 
                                    key={page} 
                                    onClick={() => setBrandProductsPage(page)}
                                    className={`w-6 h-6 rounded-full font-black text-[10px] border-none cursor-pointer flex items-center justify-center transition-colors ${
                                      brandProductsPage === page 
                                        ? "bg-orange-500 text-white shadow-xs" 
                                        : "bg-transparent hover:bg-zinc-100 text-zinc-655"
                                    }`}
                                  >
                                    {page}
                                  </button>
                                ))}
                                <button 
                                  onClick={() => setBrandProductsPage(prev => Math.min(5, prev + 1))}
                                  className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"
                                >
                                  <ChevronRight className="w-3 h-3 text-zinc-550" />
                                </button>
                              </div>
                            </div>

                            {/* More from category */}
                            <div className="space-y-6 pt-6 text-left">
                              <h3 className="text-lg font-black text-zinc-955 uppercase tracking-wide">
                                More from the category
                              </h3>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                  { name: "White Classic Tee", price: "₹1,499" },
                                  { name: "Graphic Street Tee", price: "₹1,699" },
                                  { name: "Oversized Heavy Tee", price: "₹1,899" },
                                  { name: "Vintage Wash Tee", price: "₹1,599" }
                                ].map((prod, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => {
                                      setSelectedVariantImage("/images/dripspot_sim_1.png");
                                      setDripSpotView("C");
                                    }}
                                    className="flex flex-col items-center gap-3 text-center group cursor-pointer"
                                  >
                                    <div className="w-full aspect-[4/5] bg-white border border-zinc-200 rounded-[24px] flex items-center justify-center relative shadow-xs hover:shadow-md transition-shadow hover:scale-[1.01]">
                                      <div className="scale-125 flex items-center justify-center">
                                        <TShirtIcon />
                                      </div>
                                    </div>
                                    <div className="text-center group-hover:text-orange-500 transition-colors">
                                      <h4 className="text-[11px] font-black text-zinc-955 uppercase tracking-tight leading-none group-hover:text-orange-500 transition-colors">{prod.name}</h4>
                                      <span className="text-[10px] text-zinc-400 font-bold font-mono mt-1 block">{prod.price}</span>
                                    </div>
                                  </div>
                                ))}
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
                          className="space-y-12 max-w-5xl mx-auto"
                        >
                          <div className="text-left">
                            <button 
                              onClick={() => setDripSpotView("A")}
                              className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-650 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-mono"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back to Catalog</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                            <div className="bg-[#fca34d] rounded-2xl flex items-center justify-center p-8 border border-[#e8903c] relative aspect-square md:aspect-auto overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={selectedVariantImage}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.25 }}
                                  className="absolute inset-0 p-4"
                                >
                                  <Image
                                    src={selectedVariantImage}
                                    alt="Active Spotlight Product"
                                    fill
                                    className="object-contain"
                                  />
                                </motion.div>
                              </AnimatePresence>
                            </div>

                            <div className="flex flex-col justify-between text-left space-y-6">
                              <div>
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono block">
                                  Date of upload &bull; Slay the Streets List
                                </span>
                                <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight mt-1 leading-none">
                                  Spotlight Product Variants
                                </h3>
                              </div>

                              <div className="space-y-4 flex-grow flex flex-col justify-between">
                                {[
                                  { title: "Tactical Cargo Lower", category: "Lower Fit", price: "₹1,899", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80" },
                                  { title: "Distressed Denim Pants", category: "Pants Fit", price: "₹2,199", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80" },
                                  { title: "Oversized Flannel Shirt", category: "Shirt Fit", price: "₹1,299", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" }
                                ].map((variant, idx) => (
                                  <div 
                                    key={idx}
                                    onClick={() => setSelectedVariantImage(variant.img)}
                                    className={`flex gap-4 items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                                      selectedVariantImage === variant.img 
                                        ? "border-orange-500 bg-orange-50/25 shadow-xs scale-[1.01]" 
                                        : "border-zinc-150 hover:border-zinc-300 bg-white"
                                    }`}
                                  >
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-zinc-200">
                                      <Image src={variant.img} alt={variant.title} fill className="object-cover" />
                                    </div>
                                    <div className="text-left leading-tight">
                                      <p className="text-xs font-black text-zinc-955 uppercase tracking-tight">{variant.title}</p>
                                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono">{variant.category}</span>
                                      <span className="text-[10px] font-black text-[#f05a28] font-mono mt-0.5 block">{variant.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

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
                          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
                          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80",
                          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
                          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
                          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
                          "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=300&q=80"
                        ].map((imgUrl, i) => (
                          <div key={i} className="w-[180px] sm:w-[200px] flex flex-col gap-2.5 flex-shrink-0 text-left">
                            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group hover:scale-[1.01] transition-transform cursor-pointer">
                              <Image src={imgUrl} alt="Lifestyle post" fill className="object-cover group-hover:scale-103 transition-transform" />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/90 uppercase tracking-widest z-20">@driphunter</div>
                            </div>
                            <div className="flex justify-between items-center px-1">
                              <div className="flex justify-between items-center px-1 w-full">
                                <div className="flex gap-2.5 items-center">
                                  <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleLike(i)} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Heart className={`w-4 h-4 transition-colors ${likedPosts[i] ? "text-red-500 fill-red-500" : "text-zinc-955"}`} /></motion.button>
                                  <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-zinc-955" /></button>
                                  <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Send className="w-4 h-4 text-zinc-955" /></button>
                                </div>
                                <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleBookmark(i)} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Bookmark className={`w-4 h-4 transition-colors ${bookmarkedPosts[i] ? "text-zinc-955 fill-zinc-955" : "text-zinc-955"}`} /></motion.button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </section>
                </div>
              )}
            </section>
          </div>
        )}



        {/* CONDITION 3: DripSpot Tab - DEPRECATED - rendered inline inside main stacked layout */}
        {false && activeSubTab === "DripSpot" && (
          <div className="space-y-16 animate-in fade-in duration-300">
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
                          <Image 
                            src="/images/dripspot_spotlight_orange.png" 
                            alt="Spotlight outfit walker" 
                            fill 
                            className="object-contain" 
                            priority 
                          />
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-2">
                        <div className="text-left pb-2 flex items-center gap-1 text-[10px] font-black uppercase text-zinc-400 tracking-wider font-mono">
                          <span>Date of upload</span>
                          <span className="text-zinc-300">•</span>
                          <span>Name of the celebrity</span>
                        </div>

                        <div className="flex flex-col divide-y divide-zinc-100 flex-grow">
                          {spotlightProducts.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => {
                                setActiveSpotlightId(item.id);
                                setDripSpotView("B");
                              }}
                              className="flex justify-between items-center py-4 cursor-pointer hover:bg-zinc-50/50 px-2 rounded-xl transition-colors group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white border border-zinc-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                                  <TShirtIcon />
                                </div>
                                <div className="text-left">
                                  <h4 className="text-sm font-black text-zinc-955 uppercase tracking-tight">{item.title}</h4>
                                  <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono">{item.collection}</p>
                                  <span className="text-xs font-black text-zinc-955 font-mono mt-0.5 block">{item.price}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-955 transition-colors" />
                            </div>
                          ))}
                        </div>

                        <div>
                          <button 
                            onClick={() => setDripSpotView("C")}
                            className="text-xs font-black text-zinc-800 hover:text-orange-500 uppercase tracking-widest transition-colors cursor-pointer border-none bg-transparent"
                          >
                            View More
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-6 pt-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                          "/images/dripspot_sim_1.png",
                          "/images/dripspot_sim_2.png",
                          "/images/dripspot_sim_3.png",
                          "/images/dripspot_sim_4.png"
                        ].map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setDripSpotView("C")}
                            className="bg-[#fca34d] border border-[#e8903c] rounded-[24px] overflow-hidden aspect-square relative group cursor-pointer shadow-xs hover:shadow-md transition-shadow hover:scale-[1.01]"
                          >
                            <Image 
                              src={img} 
                              alt={`Explore Outfit ${idx + 1}`} 
                              fill 
                              className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center items-center gap-1.5 pt-2">
                        <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronLeft className="w-3 h-3 text-zinc-500" /></button>
                        <button className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[10px] border-none cursor-pointer flex items-center justify-center shadow-xs">1</button>
                        {[2, 3, 4, 5].map((page) => (
                          <button key={page} className="w-6 h-6 rounded-full bg-transparent hover:bg-zinc-100 text-zinc-655 font-black text-[10px] border-none cursor-pointer flex items-center justify-center">{page}</button>
                        ))}
                        <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronRight className="w-3 h-3 text-zinc-500" /></button>
                      </div>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-6 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                          { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-purple-700 to-indigo-600 border-purple-800" },
                          { img: "/images/dripspot_cel_2.png", bg: "bg-gradient-to-tr from-blue-600 to-sky-500 border-blue-700" },
                          { img: "/images/dripspot_sim_4.png", bg: "bg-gradient-to-tr from-emerald-600 to-teal-500 border-emerald-700" },
                          { img: "/images/dripspot_cel_1.png", bg: "bg-gradient-to-tr from-rose-600 to-pink-500 border-rose-700" }
                        ].map((cel, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-3">
                            <div 
                              onClick={() => setDripSpotView("C")}
                              className={`w-full aspect-[4/5] rounded-[24px] overflow-hidden relative border shadow-sm group cursor-pointer hover:shadow-md transition-shadow hover:scale-[1.01] ${cel.bg}`}
                            >
                              <Image 
                                src={cel.img} 
                                alt={`Celebrity Model ${idx + 1}`} 
                                fill 
                                className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-300" 
                              />
                            </div>
                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider font-mono">
                              Name of the celebrity
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center items-center gap-1.5 pt-2">
                        <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronLeft className="w-3 h-3 text-zinc-500" /></button>
                        <button className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[10px] border-none cursor-pointer flex items-center justify-center shadow-xs">1</button>
                        {[2, 3, 4, 5].map((page) => (
                          <button key={page} className="w-6 h-6 rounded-full bg-transparent hover:bg-zinc-100 text-zinc-655 font-black text-[10px] border-none cursor-pointer flex items-center justify-center">{page}</button>
                        ))}
                        <button className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 border-none cursor-pointer flex items-center justify-center"><ChevronRight className="w-3 h-3 text-zinc-550" /></button>
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
                      className="space-y-6 max-w-5xl mx-auto"
                    >
                      <div className="text-left">
                        <button 
                          onClick={() => setDripSpotView("A")}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-955 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-sans"
                        >
                          <ArrowLeft className="w-4 h-4 text-zinc-955" />
                          <span>Back to Catalog</span>
                        </button>
                      </div>

                      <div className="bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                          <div className="bg-zinc-50 rounded-2xl p-6 aspect-[1.1] flex items-center justify-center border border-zinc-100 relative group overflow-hidden">
                            <Image
                              src={activeProd.img}
                              alt={activeProd.title}
                              fill
                              className="object-contain p-6 group-hover:scale-103 transition-transform duration-350"
                            />
                          </div>

                          <div className="text-left space-y-5">
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Featured Spotlight</span>
                                <button className="flex items-center gap-1 text-xs text-rose-500 font-bold font-mono border-none bg-transparent cursor-pointer">
                                  <Heart className="w-4 h-4 fill-rose-500" />
                                  <span>100 Likes</span>
                                </button>
                              </div>
                              <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight mt-1 leading-none">
                                {activeProd.title}
                              </h3>
                              <p className="text-[11px] text-zinc-450 uppercase tracking-wider font-mono font-bold mt-1">
                                {activeProd.collection}
                              </p>
                            </div>

                            <div className="bg-zinc-900 text-white rounded-xl p-3 flex justify-between items-center text-xs font-mono">
                              <span className="font-black text-yellow-400">{activeProd.price}</span>
                              <a href="#" className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                                <span>Product Details/URL</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </a>
                            </div>

                            <div className="space-y-2.5">
                              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">Explore Similar Products</h4>
                              <div className="grid grid-cols-2 gap-4">
                                {activeProd.similars.map((sim, i) => (
                                  <div key={i} className="flex gap-2.5 items-center p-2 border border-zinc-150 rounded-xl bg-zinc-50">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-zinc-200">
                                      <Image src={sim.img} alt={sim.name} fill className="object-cover" />
                                    </div>
                                    <div className="text-[10px] min-w-0">
                                      <p className="font-extrabold text-zinc-800 truncate uppercase leading-none">{sim.name}</p>
                                      <span className="font-mono text-zinc-500">{sim.price}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <button className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors cursor-pointer border-none shadow-md">
                                Buy at Driphunter.com
                              </button>
                            </div>
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
                    className="space-y-12 max-w-5xl mx-auto"
                  >
                    <div className="text-left">
                      <button 
                        onClick={() => setDripSpotView("A")}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase text-zinc-650 hover:text-orange-500 transition-colors border-none bg-transparent cursor-pointer font-mono"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Catalog</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-white border border-zinc-200 rounded-[32px] p-6 sm:p-8 shadow-sm">
                      <div className="bg-[#fca34d] rounded-2xl flex items-center justify-center p-8 border border-[#e8903c] relative aspect-square md:aspect-auto overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedVariantImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 p-4"
                          >
                            <Image
                              src={selectedVariantImage}
                              alt="Active Spotlight Product"
                              fill
                              className="object-contain"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col justify-between text-left space-y-6">
                        <div>
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono block">
                            Date of upload &bull; Slay the Streets List
                          </span>
                          <h3 className="text-2xl font-black text-zinc-955 uppercase tracking-tight mt-1 leading-none">
                            Spotlight Product Variants
                          </h3>
                        </div>

                        <div className="space-y-4 flex-grow flex flex-col justify-between">
                          {[
                            { title: "Tactical Cargo Lower", category: "Lower Fit", price: "₹1,899", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80" },
                            { title: "Distressed Denim Pants", category: "Pants Fit", price: "₹2,199", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80" },
                            { title: "Oversized Flannel Shirt", category: "Shirt Fit", price: "₹1,299", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" }
                          ].map((variant, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedVariantImage(variant.img)}
                              className={`flex gap-4 items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                                selectedVariantImage === variant.img 
                                  ? "border-orange-500 bg-orange-50/25 shadow-xs scale-[1.01]" 
                                  : "border-zinc-150 hover:border-zinc-300 bg-white"
                              }`}
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-zinc-200">
                                <Image src={variant.img} alt={variant.title} fill className="object-cover" />
                              </div>
                              <div className="text-left leading-tight">
                                <p className="text-xs font-black text-zinc-955 uppercase tracking-tight">{variant.title}</p>
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono">{variant.category}</span>
                                <span className="text-[10px] font-black text-[#f05a28] font-mono mt-0.5 block">{variant.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        )}

        {/* CONDITION 4: DripVision Tab - DEPRECATED - rendered inline inside main stacked layout */}
        {false && activeSubTab === "DripVision" && (
          <div className="space-y-16 animate-in fade-in duration-300">
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
                    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
                    "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=300&q=80"
                  ].map((imgUrl, i) => (
                    <div key={i} className="w-[180px] sm:w-[200px] flex flex-col gap-2.5 flex-shrink-0 text-left">
                      <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-zinc-150 shadow-xs group hover:scale-[1.01] transition-transform cursor-pointer">
                        <Image src={imgUrl} alt="Lifestyle post" fill className="object-cover group-hover:scale-103 transition-transform" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/90 uppercase tracking-widest z-20">@driphunter</div>
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <div className="flex justify-between items-center px-1 w-full">
                          <div className="flex gap-2.5 items-center">
                            <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleLike(i)} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Heart className={`w-4 h-4 transition-colors ${likedPosts[i] ? "text-red-500 fill-red-500" : "text-zinc-955"}`} /></motion.button>
                            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-zinc-955" /></button>
                            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Send className="w-4 h-4 text-zinc-955" /></button>
                          </div>
                          <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleBookmark(i)} className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"><Bookmark className={`w-4 h-4 transition-colors ${bookmarkedPosts[i] ? "text-zinc-955 fill-zinc-955" : "text-zinc-955"}`} /></motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
