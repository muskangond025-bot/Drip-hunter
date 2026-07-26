"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Eye, EyeOff, ChevronDown, Mic, Camera, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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


interface NavbarProps {
  cart: CartItem[];
  wishlist: WishlistItem[];
  searchQuery?: string;
  searchCategory?: string;
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onRemoveFromCart: (id: number) => void;
  onRemoveFromWishlist: (id: number) => void;
  onUpdateCartQuantity: (id: number, qty: number) => void;
  onAddToCart: (product: { id: number; brand: string; name: string; price: string; image: string }) => void;
  loginOpen?: boolean;
  setLoginOpen?: (open: boolean) => void;
}

const SUBNAV_CATEGORIES = [
  "Topwear",
  "Indian & Festive Wear",
  "Bottomwear",
  "Innerwear & Sleepwear",
  "Plus Size",
  "Footwear",
  "Personal Care & Grooming",
  "Sunglasses & Frames",
  "Watches",
  "Sports & Active Wear",
  "Gadgets",
  "Fashion Accessories",
  "Bags & Backpacks",
  "Luggages & Trolleys"
];

const GENDER_TABS = ["Men", "Women"];

const MEGA_MENU_DATA: Record<string, {
  subcategories: string[];
  promotions: { title: string; image: string; tag: string }[];
}> = {
  "Topwear": {
    subcategories: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"],
    promotions: [
      { title: "KANJI GRAPHIC TEES", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", tag: "STREETWEAR DROP" },
      { title: "HEAVY COTTON JACKETS", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80", tag: "WINTER COLLECTION" }
    ]
  },
  "Indian & Festive Wear": {
    subcategories: ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis"],
    promotions: [
      { title: "MODERN FESTIVE STYLES", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=400&q=80", tag: "LIMITED CURATION" }
    ]
  },
  "Bottomwear": {
    subcategories: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"],
    promotions: [
      { title: "UTILITY CARGO PANTS", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80", tag: "DAILY CARGOS" }
    ]
  },
  "Innerwear & Sleepwear": {
    subcategories: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"],
    promotions: [
      { title: "ORGANIC COMBED COTTON", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80", tag: "LOUNGE IN COMFORT" }
    ]
  },
  "Plus Size": {
    subcategories: ["Oversized Tees", "Big & Tall Bottoms", "Coats & Jackets"],
    promotions: [
      { title: "XXL OVERSIZED COAT", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", tag: "PLUS SIZE DRIP" }
    ]
  },
  "Footwear": {
    subcategories: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"],
    promotions: [
      { title: "LIMITED EDITION SNEAKERS", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", tag: "HYBRID FOOTWEAR" },
      { title: "CHUNKY PLATFORM KICKS", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", tag: "RETRO TWINS" }
    ]
  },
  "Personal Care & Grooming": {
    subcategories: ["Perfumes & Body Mists", "Deodorants", "Trimmers", "Shaving Care", "Skin Care"],
    promotions: [
      { title: "STREET INDULGENCE COLOGNE", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80", tag: "SIGNATURE SCENT" }
    ]
  },
  "Sunglasses & Frames": {
    subcategories: ["Classic Aviators", "Wayfarers", "Round Frames", "Sports Shades"],
    promotions: [
      { title: "CYBER FRAME SHADES", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", tag: "SUNGLASSES" }
    ]
  },
  "Watches": {
    subcategories: ["Smart Watches", "Analogue Watches", "Digital Watches", "Chronograph Watches"],
    promotions: [
      { title: "CHRONOGRAPH SPECIAL EDITION", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80", tag: "TIMEPIECES" }
    ]
  },
  "Sports & Active Wear": {
    subcategories: ["Sports Shoes", "Sports Sandals", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Sports Accessories", "Swimwear"],
    promotions: [
      { title: "PERFORMANCE MESH DRIP", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80", tag: "SPORTS GEAR" }
    ]
  },
  "Gadgets": {
    subcategories: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
    promotions: [
      { title: "NOISE CANCELLING PHONES", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", tag: "GADGET LAB" }
    ]
  },
  "Fashion Accessories": {
    subcategories: ["Wallets", "Belts", "Perfumes & Body Mists", "Trimmers", "Deodorants", "Ties, Cufflinks & Pocket Squares", "Accessory Gift Sets", "Caps & Hats", "Mufflers, Scarves & Gloves", "Phone Cases", "Rings & Wristwear", "Helmets"],
    promotions: [
      { title: "UTILITY CAP CAPSULE", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80", tag: "ACCESSORIES" }
    ]
  },
  "Bags & Backpacks": {
    subcategories: ["Backpacks", "Messenger Bags", "Duffle Bags", "Sling Bags"],
    promotions: [
      { title: "MODULAR UTILITY CHEST BAG", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=400&q=80", tag: "STREET BACKPACK" }
    ]
  },
  "Luggages & Trolleys": {
    subcategories: ["Hard Suitcases", "Soft Suitcases", "Travel Duffles", "Cabin Bags"],
    promotions: [
      { title: "NEO-GRID CABIN TROLLEY", image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=400&q=80", tag: "DRIP TRAVEL" }
    ]
  }
};

const MEGA_MENU_WOMEN_DATA: Record<string, string[]> = {
  "Topwear": ["Dresses", "Tops", "Tshirts", "Co-ords", "Playsuits", "Jumpsuits", "Shrugs", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers & Waistcoats"],
  "Indian & Festive Wear": ["Kurtas & Suits", "Kurtis, Tunics & Tops", "Sarees", "Ethnic Wear", "Leggings, Salwars & Churidars", "Skirts & Palazzos", "Dress Materials", "Lehenga Cholis", "Dupattas & Shawls", "Jackets"],
  "Bottomwear": ["Jeans", "Trousers & Capris", "Shorts & Skirts"],
  "Innerwear & Sleepwear": ["Bra", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Swimwear", "Camisoles & Thermals"],
  "Plus Size": ["Maternity Dresses", "Maternity Tops", "Maternity Bottoms", "Plus Size Dresses", "Plus Size Tops"],
  "Footwear": ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"],
  "Personal Care & Grooming": ["Makeup", "Skincare", "Premium Beauty", "Lipsticks", "Fragrances"],
  "Sunglasses & Frames": ["Classic Sunglasses", "Cat-Eye Glasses", "Oversized Shades"],
  "Watches": ["Smart Wearables", "Analogue Watches", "Digital Watches"],
  "Sports & Active Wear": ["Clothing", "Footwear", "Sports Accessories", "Sports Equipment"],
  "Gadgets": ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
  "Fashion Accessories": ["Fashion Jewellery", "Fine Jewellery", "Earrings", "Belts", "Scarves & More", "Hair Accessories"],
  "Bags & Backpacks": ["Backpacks", "Handbags", "Wallets", "Clutches", "Tote Bags"],
  "Luggages & Trolleys": ["Hard Suitcases", "Soft Suitcases", "Travel Bags"]
};

const SUBCATEGORY_PREVIEWS: Record<string, Record<string, { image: string; tag: string; title: string; description: string }>> = {
    "Men": {
        // --- TOPWEAR (MEN) ---
        "T-Shirts": {
            image: "/images/streetwear_tshirt_preview.png",
            tag: "STREETWEAR CORE",
            title: "T-Shirts",
            description: "Heavyweight drop-shoulder graphic tees and oversized premium essentials."
        },
        "Tshirts": {
            image: "/images/streetwear_tshirt_preview.png",
            tag: "STREETWEAR CORE",
            title: "T-Shirts",
            description: "Heavyweight drop-shoulder graphic tees and oversized premium essentials."
        },
        "Casual Shirts": {
            image: "/images/urban-essentials/short_sleeve_shirt.png",
            tag: "EVERYDAY DRIP",
            title: "Casual Shirts",
            description: "Relaxed fit button-downs, resort collars, and premium utility shirts."
        },
        "Formal Shirts": {
            image: "/images/urban-essentials/full_sleeve_shirt.png",
            tag: "SHARP ESSENTIALS",
            title: "Formal Shirts",
            description: "Tailored fit premium cotton shirts for a modern, sophisticated dress code."
        },
        "Sweatshirts": {
            image: "/images/streetwear_sweatshirt_preview.png",
            tag: "WINTER UTILITY",
            title: "Sweatshirts",
            description: "Ultra-soft heavy fleece hoodies and crewnecks styled for the streets."
        },
        "Sweaters": {
            image: "/images/mens_sweaters_preview.jpg",
            tag: "LUXURY KNITS",
            title: "Sweaters",
            description: "Premium chunky knitted sweaters and textured cardigans for layering."
        },
        "Sweaters & Sweatshirts": {
            image: "/images/streetwear_sweatshirt_preview.png",
            tag: "WINTER CORES",
            title: "Sweaters & Hoodies",
            description: "Heavy knit sweaters and oversized warm hoodies built for layering."
        },
        "Jackets": {
            image: "/images/urban-essentials/denim_jacket.png",
            tag: "OUTERWEAR DROP",
            title: "Jackets",
            description: "Utility cargos, bomber jackets, and heavy denim pieces for perfect layering."
        },
        "Jackets & Coats": {
            image: "/images/urban-essentials/denim_jacket.png",
            tag: "OUTERWEAR DROP",
            title: "Jackets & Coats",
            description: "Utility cargos, bomber jackets, and heavy denim pieces for perfect layering."
        },
        "Blazers & Coats": {
            image: "/images/streetwear_blazer_preview.png",
            tag: "MODERN TAILORING",
            title: "Blazers & Coats",
            description: "Oversized blazers and structured trench coats designed to stand out."
        },
        "Blazers & Waistcoats": {
            image: "/images/streetwear_blazer_preview.png",
            tag: "MODERN TAILORING",
            title: "Blazers & Waistcoats",
            description: "Oversized blazers and structured waistcoats designed to stand out."
        },
        "Suits": {
            image: "/images/streetwear_blazer_preview.png",
            tag: "SHARP CUTS",
            title: "Suits",
            description: "Tailored modern fit suits crafted from premium fabrics for special occasions."
        },
        "Rain Jackets": {
            image: "/images/streetwear_rain_jacket_preview.png",
            tag: "TECHNICAL GEAR",
            title: "Rain Jackets",
            description: "Waterproof, wind-resistant technical shells with utility zip pockets."
        },
        // --- INDIAN & FESTIVE (MEN) ---
        "Kurtas & Kurta Sets": {
            image: "/images/mens_kurta_preview.png",
            tag: "FESTIVE COUTURE",
            title: "Kurtas & Kurta Sets",
            description: "Elegant, premium-cut Indian kurtas and matching pajama sets for men."
        },
        "Sherwanis": {
            image: "/images/mens_sherwani_preview.png",
            tag: "GRAND COUTURE",
            title: "Sherwanis",
            description: "Opulent fabrics, hand-crafted zardozi, and royal sherwanis for celebrations."
        },
        "Nehru Jackets": {
            image: "/images/mens_nehru_jacket_preview.png",
            tag: "TRADITIONAL VESTS",
            title: "Nehru Jackets",
            description: "Fine linen and woven silk waistcoats to add class to your ethnic look."
        },
        "Dhotis": {
            image: "/images/mens_dhoti_preview.png",
            tag: "HERITAGE CORES",
            title: "Heritage Dhotis",
            description: "Pure cotton and silk dhotis finished with luxurious gold zari borders."
        },
        // --- BOTTOMWEAR (MEN) ---
        "Jeans": {
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
            tag: "STREETWEAR CORE",
            title: "Premium Denim",
            description: "Mens heavyweight wide-leg jeans, distressed finishes, and classic straight cuts."
        },
        "Casual Trousers": {
            image: "/images/urban-essentials/cargo_pants.png",
            tag: "EVERYDAY UTILITY",
            title: "Casual Trousers",
            description: "Relaxed fit cargo pants, utility joggers, and versatile daily bottoms."
        },
        "Trousers & Capris": {
            image: "/images/urban-essentials/cargo_pants.png",
            tag: "EVERYDAY UTILITY",
            title: "Trousers & Capris",
            description: "Relaxed fit cargo pants, utility joggers, and versatile daily bottoms."
        },
        "Formal Trousers": {
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
            tag: "SHARP ESSENTIALS",
            title: "Formal Trousers",
            description: "Premium tailored fit trousers for sharp business and corporate wear."
        },
        "Shorts": {
            image: "/images/yellow_shorts_3d.png",
            tag: "SUMMER DROP",
            title: "Utility Shorts",
            description: "Comfortable mesh, fleece, and lightweight cargo shorts for high-temp drip."
        },
        "Shorts & Skirts": {
            image: "/images/yellow_shorts_3d.png",
            tag: "SUMMER DROP",
            title: "Shorts & Skirts",
            description: "Comfortable mesh, fleece, and lightweight cargo shorts for high-temp drip."
        },
        "Track Pants & Joggers": {
            image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80",
            tag: "ATHLETIC LOUNGE",
            title: "Track Pants & Joggers",
            description: "Heavy fleece joggers, zip-cuffed tracksuits, and active running pants."
        },
        // --- INNERWEAR & SLEEPWEAR (MEN) ---
        "Briefs & Trunks": {
            image: "/images/mens_briefs_trunks_preview.png",
            tag: "INNER COMFORT",
            title: "Briefs & Trunks",
            description: "Organic combed cotton trunks and performance stretch athletic briefs."
        },
        "Boxers": {
            image: "/images/mens_boxers_preview.png",
            tag: "RELAXED LOUNGE",
            title: "Boxers",
            description: "Pure cotton loose fit woven boxers and jersey boxers for daily breathing room."
        },
        "Vests": {
            image: "/images/mens_vests_preview.png",
            tag: "LAYER BASICS",
            title: "Vests",
            description: "Sleeveless fine ribbed vests and lightweight tank tops for summer layering."
        },
        "Sleepwear & Loungewear": {
            image: "/images/mens_sleepwear_preview.png",
            tag: "SLUMBER DRIP",
            title: "Sleep & Loungewear",
            description: "Soft flannel pajama sets, coordinates, and oversized cozy modal tees."
        },
        "Thermals": {
            image: "/images/mens_sleepwear_preview.png",
            tag: "WINTER SHIELDS",
            title: "Thermals",
            description: "Merino wool and heat-locking inner thermals to stay warm in the winter."
        },
        // --- PLUS SIZE (MEN) ---
        "Oversized Tees": {
            image: "/images/streetwear_tshirt_preview.png",
            tag: "PLUS DRIP",
            title: "Oversized Tees",
            description: "Heavyweight drop-shoulder streetwear tees built for relaxed fits."
        },
        "Big & Tall Bottoms": {
            image: "/images/urban-essentials/cargo_pants.png",
            tag: "PLUS UTILITY",
            title: "Big & Tall Bottoms",
            description: "Wide-leg heavy cargos and elasticated comfort waist trousers."
        },
        "Coats & Jackets": {
            image: "/images/urban-essentials/denim_jacket.png",
            tag: "PLUS LAYER",
            title: "Coats & Jackets",
            description: "Structured oversized utility jackets and warm heavy coats."
        },
        // --- FOOTWEAR (MEN) ---
        "Casual Shoes": {
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
            tag: "FOOTWEAR CORE",
            title: "Casual Shoes",
            description: "Minimalist leather sneakers, suede slip-ons, and canvas trainers."
        },
        "Sports Shoes": {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
            tag: "ATHLETIC DRIP",
            title: "Sports Shoes",
            description: "High-performance running kicks, sports trainers, and workout sneakers."
        },
        "Formal Shoes": {
            image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80",
            tag: "CLASSIC SHARP",
            title: "Formal Shoes",
            description: "Handcrafted leather Oxfords, Brogues, and premium dress loafers."
        },
        "Sneakers": {
            image: "/images/puma_black_neon_exact.png",
            tag: "GRAIL KICKS",
            title: "Sneakers",
            description: "Limited drops, urban skate shoes, and high-top vintage trainers."
        },
        "Sandals & Floaters": {
            image: "/images/mens_sandals_preview.jpg",
            tag: "SUMMER STRAPS",
            title: "Sandals & Floaters",
            description: "Utility hiking sandals and cushion straps for comfortable urban walking."
        },
        "Flip Flops": {
            image: "/images/mens_slides_preview.png",
            tag: "POOL SIDE",
            title: "Flip Flops",
            description: "Waterproof EVA slides and classic beach slip-ons for direct comfort."
        },
        "Socks": {
            image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=400&q=80",
            tag: "SOCK DRAWER",
            title: "Premium Socks",
            description: "Thick combed cotton socks for daily styling."
        },
        // --- OTHER COMMON CATEGORIES (MEN) ---
        "Smart Watches": {
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
            tag: "SMART TECH",
            title: "Smart Watches",
            description: "AMOLED touch displays, heart-rate monitors, and multi-day battery life."
        },
        "Analogue Watches": {
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
            tag: "TIMEPIECES",
            title: "Analogue Watches",
            description: "Swiss movements, premium leather straps, and structural steel casings."
        },
        "Digital Watches": {
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
            tag: "RETRO CASINGS",
            title: "Digital Watches",
            description: "Vintage metal digital watches, alarms, and technical stopwatch systems."
        },
        "Chronograph Watches": {
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
            tag: "LUXURY TIMERS",
            title: "Chronograph Watches",
            description: "Sub-dial tachymeters, water-resistant crowns, and elegant solid gold casings."
        },
        "Smart Wearables": {
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
            tag: "SMART TECH",
            title: "Smart Wearables",
            description: "Aesthetic fitness bands, smart rings, and connected notifications."
        },
        "Fitness Gadgets": {
            image: "/images/mens_fitness_gadgets_preview.jpg",
            tag: "FITNESS LAB",
            title: "Smart Fitness Gadgets",
            description: "Advanced home training equipment including smart mirrors, scales, and workout trackers."
        },
        "Headphones": {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
            tag: "AUDIO GEAR",
            title: "Grail Headphones",
            description: "Active noise-cancelling over-ear headphones with studio sound profile."
        },
        "Speakers": {
            image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
            tag: "AUDIO GRID",
            title: "Portable Speakers",
            description: "Waterproof Bluetooth speakers with deep bass grids and ambient lights."
        },
        "Wallets": {
            image: "/images/urban-essentials/bifold_wallet.png",
            tag: "ACCESSORIES",
            title: "Leather Wallets",
            description: "Sleek cardholders and genuine leather bifold wallets with RFID protection."
        },
        "Belts": {
            image: "/images/mens_belts_preview.jpg",
            tag: "ACCESSORIES",
            title: "Leather Belts",
            description: "Handcrafted full-grain leather belts with brush metal buckles."
        },
        "Perfumes & Body Mists": {
            image: "/images/mens_perfume_preview.jpg",
            tag: "FRAGRANCE GALAXY",
            title: "Twilight for Men Fragrance Mist",
            description: "Premium Twilight for Men body fragrance mist with warm amber tones."
        },
        "Ties, Cufflinks & Pocket Squares": {
            image: "/images/mens_tie_cufflinks_preview.jpg",
            tag: "FORMAL DRIP",
            title: "Tie & Cufflinks Set",
            description: "Elegant maroon necktie, matching pocket square, polished silver cufflinks, and lapel pin."
        },
        "Accessory Gift Sets": {
            image: "/images/mens_accessory_gifts_preview.jpg",
            tag: "GIFT SETS",
            title: "Premium Men's Gift Sets",
            description: "Customized gift cases featuring leather wallets, belts, pens, and white cologne."
        },
        "Caps & Hats": {
            image: "/images/pink_cap_3d.png",
            tag: "HEADWEAR",
            title: "Drip Caps",
            description: "Streetwear bucket hats, distressed snapbacks, and classic baseball caps."
        },
        "Mufflers, Scarves & Gloves": {
            image: "/images/mens_mufflers_gloves_preview.jpg",
            tag: "WINTER SHIELD",
            title: "Winter Mufflers & Gloves",
            description: "Cozy knit beanies, striped mufflers, and warm patterned gloves."
        },
        "Phone Cases": {
            image: "/images/mens_phone_cases_preview.jpg",
            tag: "TECH DRIP",
            title: "Men's Phone Cases",
            description: "Sleek and durable printed phone covers with modern masculine prints."
        },
        "Rings": {
            image: "/images/mens_rings_preview.jpg",
            tag: "JEWELLERY CORE",
            title: "Men's Lion Signet Rings",
            description: "Bold gold signet rings featuring a carved lion motif surrounded by brilliant diamonds."
        },
        "Wristwear": {
            image: "/images/mens_wristwear_preview.jpg",
            tag: "JEWELLERY CORE",
            title: "Platinum & Rose Gold Bracelets",
            description: "Premium textured platinum wristwear with elegant rose gold accents."
        },
        "Helmets": {
            image: "/images/mens_helmet_preview.jpg",
            tag: "RIDER GEAR",
            title: "Sports & Motocross Helmets",
            description: "Aerodynamic professional blue motocross helmet with glossy visor protection."
        },
        "Backpacks": {
            image: "/images/urban-essentials/sling_bag.png",
            tag: "UTILITY BAGS",
            title: "Street Backpacks",
            description: "Heavy duty techwear backpacks with multi-compartment modular storage."
        },
        "Sling Bags": {
            image: "/images/mens_sling_bag_preview.jpg",
            tag: "UTILITY BAGS",
            title: "Sling & Chest Bags",
            description: "Compact water-resistant sling packs designed for urban exploration."
        },
        "Messenger Bags": {
            image: "/images/mens_messenger_bag_preview.jpg",
            tag: "UTILITY BAGS",
            title: "Laptop Messenger Bags",
            description: "Premium navy blue structured messenger bag with shoulder straps and pocket storage."
        },
        "Duffle Bags": {
            image: "/images/mens_duffle_bag_preview.jpg",
            tag: "UTILITY BAGS",
            title: "Premium Duffle Bags",
            description: "Black and grey patterned weekend duffle bags with adjustable red-blue webbed straps."
        },
        "Hard Suitcases": {
            image: "/images/mens_hard_suitcase_preview.jpg",
            tag: "TRAVEL LUGGAGE",
            title: "Hard Suitcase Trolleys",
            description: "Durable black hard-shell trolley suitcase featuring yellow highlights and spinner wheels."
        },
        "Soft Suitcases": {
            image: "/images/mens_soft_suitcase_preview.jpg",
            tag: "TRAVEL LUGGAGE",
            title: "Soft Suitcase Trolleys",
            description: "Lightweight and flexible blue Safari fabric trolley suitcase on spinner wheels."
        },
        "Travel Duffles": {
            image: "/images/mens_travel_duffles_preview.jpg",
            tag: "TRAVEL LUGGAGE",
            title: "Weekend Travel Duffles",
            description: "Stylish patterned canvas travel duffle bag with premium brown leather straps."
        },
        "Cabin Bags": {
            image: "/images/mens_cabin_bags_preview.jpg",
            tag: "TRAVEL LUGGAGE",
            title: "Cabin Travel Backpacks",
            description: "Sleek navy blue cabin backpack featuring white carry handles and laptop sleeve."
        },
        "Deodorants": {
            image: "/images/mens_deodorant_preview.jpg",
            tag: "SIGNATURE SCENT",
            title: "Denver Hamilton Deodorant",
            description: "Fresh masculine Denver Hamilton green body spray for daily confidence and long-lasting protection."
        },
        "Trimmers": {
            image: "/images/mens_trimmer_preview.jpg",
            tag: "GROOMING TOOL",
            title: "Vega Beard Trimmer",
            description: "Precision Vega beard trimmer with adjustable comb settings and long-lasting power series battery."
        },
        "Shaving Care": {
            image: "/images/mens_shaving_care_preview.jpg",
            tag: "SHAVE SHIELD",
            title: "Shaving Essentials",
            description: "Nivea Men shaving gel, Van Der Hagen Shave Butter, and premium Kiehl's Close-Shavers squadron."
        },
        "Skin Care": {
            image: "/images/mens_skincare_preview.jpg",
            tag: "SKIN DEFENSE",
            title: "RHONE Men's Skincare",
            description: "Premium RHONE Men's Care blue clay mask, face cleanser, and nourishing beard oil."
        },
        "Classic Aviators": {
            image: "/images/mens_aviators_preview.jpg",
            tag: "SHADES GRID",
            title: "Classic Aviator Sunglasses",
            description: "Timeless black metal frame aviators with dark tinted polarized lenses."
        },
        "Wayfarers": {
            image: "/images/mens_wayfarers_preview.jpg",
            tag: "MATTE SHADES",
            title: "Wayfarer Sunglasses",
            description: "Sleek matte black wayfarers featuring grey polarized lenses and signature red tips."
        },
        "Round Frames": {
            image: "/images/mens_round_frames_preview.jpg",
            tag: "RETRO ROUND",
            title: "Round Frame Sunglasses",
            description: "Aesthetic gold thick circular frame sunglasses with warm brown gradient tinted lenses."
        },
        "Sports Shades": {
            image: "/images/mens_sports_shades_preview.jpg",
            tag: "ACTIVE GEAR",
            title: "Sports Sunglasses",
            description: "Aerodynamic silver metal frame rectangular sports sunglasses with dark polarized lenses."
        },
        "Sports Sandals": {
            image: "/images/mens_sports_sandals_preview.png",
            tag: "OUTDOOR DRIP",
            title: "Sports Sandals",
            description: "Athletic technical sports sandals with neon details and robust adjustable straps."
        },
        "Active T-Shirts": {
            image: "/images/mens_active_tshirts_preview.png",
            tag: "PERFORMANCE CORE",
            title: "Active T-Shirts",
            description: "Premium breathable performance mesh athletic t-shirts designed for maximum ventilation."
        },
        "Track Pants & Shorts": {
            image: "/images/mens_track_pants_shorts_preview.png",
            tag: "TRAINING PANTS",
            title: "Track Pants & Shorts",
            description: "Premium techwear athletic track pants and sports shorts with minimalist zippers."
        },
        "Tracksuits": {
            image: "/images/mens_tracksuits_preview.png",
            tag: "ATHLETIC MATCH",
            title: "Premium Tracksuits",
            description: "Cohesive minimalist olive green athletic tracksuit sets with matching jacket and joggers."
        },
        "Jackets & Sweatshirts": {
            image: "/images/mens_sports_jackets_preview.png",
            tag: "WEATHER CONTROL",
            title: "Sports Jackets & Hoodies",
            description: "Water-resistant athletic windbreaker jackets and cozy technical sports sweatshirts."
        },
        "Sports Accessories": {
            image: "/images/mens_sports_accessories_preview.png",
            tag: "GEAR BAGS",
            title: "Sports Accessories",
            description: "Premium training accessories including steel water bottles, gym duffle bags, and sweatbands."
        },
        "Swimwear": {
            image: "/images/mens_swimwear_preview.png",
            tag: "AQUA DROP",
            title: "Athletic Swimwear",
            description: "Quick-dry athletic swim shorts with minimalist style and secure drawstrings."
        }
    },
    "Women": {
        // --- TOPWEAR (WOMEN) ---
        "T-Shirts": {
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
            tag: "STREETWEAR CORE",
            title: "Women's Tees",
            description: "Premium oversized drop-shoulder tees and graphic prints for women."
        },
        "Tshirts": {
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
            tag: "STREETWEAR CORE",
            title: "Women's Tees",
            description: "Premium oversized drop-shoulder tees and graphic prints for women."
        },
        "Sweaters & Sweatshirts": {
            image: "/images/womens_sweaters_preview.jpg",
            tag: "WINTER CORES",
            title: "Sweaters & Hoodies",
            description: "Womens heavy knit sweaters and oversized warm hoodies built for layering."
        },
        "Jackets & Coats": {
            image: "/images/womens_jackets_preview.jpg",
            tag: "OUTERWEAR DROP",
            title: "Jackets & Coats",
            description: "Utility cargos, bomber jackets, and heavy denim pieces for perfect layering."
        },
        "Blazers & Waistcoats": {
            image: "/images/womens_blazers_preview.jpg",
            tag: "MODERN TAILORING",
            title: "Blazers & Waistcoats",
            description: "Oversized blazers and structured waistcoats designed to stand out."
        },
        "Dresses": {
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
            tag: "FASHION FORWARD",
            title: "Dresses",
            description: "Elegant silhouettes, slip dresses, and minimal modern shapes."
        },
        "Tops": {
            image: "/images/womens_tops_preview.jpg",
            tag: "ESSENTIAL TOPS",
            title: "Tops",
            description: "Elegant long sleeve wrap styles, ribbed crop tops, structured corsets, and summer blouses."
        },
        "Co-ords": {
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
            tag: "MATCHING SETS",
            title: "Co-ord Sets",
            description: "Monochrome rib knit sets, cozy utility shorts-tees, and tailored matching sets."
        },
        "Playsuits": {
            image: "/images/womens_playsuits_preview.jpg",
            tag: "SUMMER JUMPS",
            title: "Playsuits",
            description: "Chic short-sleeved playsuits and rompers for casual sun-soaked weekends."
        },
        "Jumpsuits": {
            image: "/images/womens_jumpsuits_preview.jpg",
            tag: "ONE-PIECE DRIP",
            title: "Jumpsuits",
            description: "Stunning pleated wide-leg jumpsuits, structured boiler suits, and utility wear."
        },
        "Shrugs": {
            image: "/images/womens_shrugs_preview.jpg",
            tag: "LIGHT LAYERS",
            title: "Shrugs & Cardigans",
            description: "Elegant long black shrugs, cardigans, and duster coats for layering."
        },
        // --- INDIAN & FESTIVE (WOMEN) ---
        "Kurtas & Suits": {
            image: "/images/womens_kurta_preview.jpg",
            tag: "TRADITIONAL WEAR",
            title: "Kurtas & Salwar Suits",
            description: "Traditional salwar sets and embroidered kurtas with georgette dupattas."
        },
        "Kurtis, Tunics & Tops": {
            image: "/images/womens_kurta_tunics_preview.jpg",
            tag: "DAILY ETHNIC",
            title: "Kurtis & Tunics",
            description: "Breezy printed kurtis, everyday tunics, and modern indo-western fusion wear."
        },
        "Sarees": {
            image: "/images/womens_saree_preview.jpg",
            tag: "HANDLOOM GRACE",
            title: "Sarees",
            description: "Exquisite Banarasi silk, Kanjeevaram weaves, and lightweight organza sarees."
        },
        "Ethnic Wear": {
            image: "/images/womens_ethnic_wear_preview.jpg",
            tag: "FESTIVE DRIP",
            title: "Ethnic Wear",
            description: "Beautifully styled anarkali gowns, fusion wear sets, and festive silhouettes."
        },
        "Leggings, Salwars & Churidars": {
            image: "/images/womens_leggings_salwar_preview.jpg",
            tag: "ETHNIC BOTTOMS",
            title: "Ethnic Bottoms",
            description: "Comfortable stretch leggings, cotton salwars, and silk-blend churidars."
        },
        "Skirts & Palazzos": {
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
            tag: "BOHO CORES",
            title: "Skirts & Palazzos",
            description: "Wide-leg flared palazzo trousers and handblock printed cotton long skirts."
        },
        "Dress Materials": {
            image: "/images/womens_dress_material_preview.jpg",
            tag: "UNSTITCHED FABRICS",
            title: "Dress Materials",
            description: "Premium unstitched cotton, georgette, and chanderi dress material sets."
        },
        "Lehenga Cholis": {
            image: "/images/womens_lehenga_preview.jpg",
            tag: "BRIDAL & CELEBRATION",
            title: "Lehenga Cholis",
            description: "Heavily embellished lehengas, mirror work designs, and modern pastel cuts."
        },
        "Dupattas & Shawls": {
            image: "/images/womens_dupatta_preview.jpg",
            tag: "ETHNIC ACCESSORIES",
            title: "Dupattas & Shawls",
            description: "Fine phulkari dupattas, banarasi silk stoles, and warm pashmina shawls."
        },
        "Jackets": {
            image: "/images/womens_sports_jackets_preview.jpg",
            tag: "ETHNIC JACKETS",
            title: "Ethnic Jackets",
            description: "Beautifully styled jackets, capes, and ethnic waistcoats to pair with your outfits."
        },
        // --- BOTTOMWEAR (WOMEN) ---
        "Jeans": {
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80",
            tag: "STREETWEAR CORE",
            title: "Womens Denim",
            description: "Womens heavyweight wide-leg jeans, distressed finishes, and classic straight cuts."
        },
        "Trousers & Capris": {
            image: "/images/womens_trousers_preview.jpg",
            tag: "EVERYDAY UTILITY",
            title: "Trousers & Capris",
            description: "Relaxed fit cargo pants, utility joggers, and versatile daily bottoms."
        },
        "Shorts & Skirts": {
            image: "/images/womens_shorts_skirts_preview.jpg",
            tag: "SUMMER DROP",
            title: "Shorts & Skirts",
            description: "Comfortable mesh, fleece, and lightweight cargo shorts for high-temp drip."
        },
        // --- INNERWEAR & SLEEPWEAR (WOMEN) ---
        "Bra": {
            image: "/images/womens_bra_preview.jpg",
            tag: "DAILY COMFORT",
            title: "Bra & Lingerie",
            description: "Premium seamless wireless sports bras, bralettes, and comfortable daily wear."
        },
        "Briefs": {
            image: "/images/womens_briefs_preview.png",
            tag: "COZY BASICS",
            title: "Briefs & Panties",
            description: "Ultra-soft seamless microfibre and hypoallergenic organic cotton briefs sets."
        },
        "Shapewear": {
            image: "/images/womens_shapewear_preview.png",
            tag: "SCULPTED CORE",
            title: "Shapewear",
            description: "High-waisted tummy control shaping shorts, bodysuits, and seamless contours."
        },
        "Sleepwear & Loungewear": {
            image: "/images/womens_sleepwear_preview.png",
            tag: "SLUMBER DRIP",
            title: "Sleep & Loungewear",
            description: "Luxury satin silk pajama sets, cozy modal stoles, and nightwear coordinates."
        },
        "Swimwear": {
            image: "/images/womens_swimwear_preview.png",
            tag: "RESORT WEAR",
            title: "Swimwear",
            description: "Chic modern one-piece active swimsuits, resort cover-ups, and beachwear."
        },
        "Camisoles & Thermals": {
            image: "/images/womens_camisoles_preview.png",
            tag: "ESSENTIAL LAYERS",
            title: "Camisoles & Thermals",
            description: "Premium modal spaghetti strap camisoles and warm base layer winter thermals."
        },
        // --- PLUS SIZE (WOMEN) ---
        "Maternity Dresses": {
            image: "/images/womens_maternity_dresses_preview.png",
            tag: "MATERNITY WEAR",
            title: "Maternity Dresses",
            description: "Flowy, elasticated empire-waist maternity dresses to style comfortably."
        },
        "Maternity Tops": {
            image: "/images/womens_maternity_tops_preview.png",
            tag: "MATERNITY LOUNGE",
            title: "Maternity Tops",
            description: "Ruched sides maternity tees and loose drape linen pregnancy shirts."
        },
        "Maternity Bottoms": {
            image: "/images/womens_maternity_bottoms_preview.png",
            tag: "MATERNITY COMFORT",
            title: "Maternity Bottoms",
            description: "Over-the-belly support leggings and ultra-soft comfort waistband joggers."
        },
        "Plus Size Dresses": {
            image: "/images/womens_plus_size_dresses_preview.png",
            tag: "CURVE STYLES",
            title: "Plus Size Dresses",
            description: "Beautifully draped statement dresses designed for flattering curves."
        },
        "Plus Size Tops": {
            image: "/images/womens_plus_size_tops_preview.png",
            tag: "CURVE ESSENTIALS",
            title: "Plus Size Tops",
            description: "Structured shirts, oversized casual tees, and premium knitted tops."
        },
        // --- FOOTWEAR (WOMEN) ---
        "Flats": {
            image: "/images/womens_flats_preview.jpg",
            tag: "EASY FLAT",
            title: "Flats & Ballerinas",
            description: "Premium white Aldo slip-on sandals, pointed flats, and comfortable mules."
        },
        "Casual Shoes": {
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80",
            tag: "FOOTWEAR CORE",
            title: "Casual Shoes",
            description: "Comfortable leather slip-ons, minimal loafers, and flats."
        },
        "Heels": {
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
            tag: "HIGH HEELS",
            title: "Heels & Stilettos",
            description: "Sleek block heels, pumps, and strapped party stilettos."
        },
        "Boots": {
            image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=80",
            tag: "STREET LEATHER",
            title: "Leather Boots",
            description: "Rugged lace-up leather boots and sleek Chelsea boot silhouettes."
        },
        "Sports Shoes & Floaters": {
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80",
            tag: "ATHLETIC GEAR",
            title: "Sports Shoes",
            description: "Lightweight trail-runners and cushioned training footwear."
        },
        // --- OTHER COMMON CATEGORIES (WOMEN) ---
        "Smart Watches": {
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
            tag: "SMART TECH",
            title: "Smart Watches",
            description: "AMOLED touch displays, heart-rate monitors, and multi-day battery life."
        },
        "Analogue Watches": {
            image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80",
            tag: "TIMEPIECES",
            title: "Analogue Watches",
            description: "Swiss movements, premium leather straps, and structural steel casings."
        },
        "Digital Watches": {
            image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=400&q=80",
            tag: "RETRO CASINGS",
            title: "Digital Watches",
            description: "Vintage metal digital watches, alarms, and technical stopwatch systems."
        },
        "Smart Wearables": {
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=400&q=80",
            tag: "SMART TECH",
            title: "Smart Wearables",
            description: "Aesthetic fitness bands, smart rings, and connected notifications."
        },
        "Headphones": {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
            tag: "AUDIO GEAR",
            title: "Grail Headphones",
            description: "Active noise-cancelling over-ear headphones with studio sound profile."
        },
        "Speakers": {
            image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
            tag: "AUDIO GRID",
            title: "Portable Speakers",
            description: "Waterproof Bluetooth speakers with deep bass grids and ambient lights."
        },
        "Handbags": {
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
            tag: "CARRY ACCESSORY",
            title: "Handbags",
            description: "Luxury leather satchels, designer shoulder bags, and structured top-handles."
        },
        "Clutches": {
            image: "/images/womens_clutches_preview.jpg",
            tag: "PARTY GRAB",
            title: "Clutches & Pouches",
            description: "Elegant silk embroidered clutches with floral details and sequins."
        },
        "Tote Bags": {
            image: "/images/womens_tote_bag_preview.jpg",
            tag: "DAILY CANVAS",
            title: "Tote Bags",
            description: "Chic butterfly print canvas tote bags with premium leather handles."
        },
        "Caps & Hats": {
            image: "/images/pink_cap_3d.png",
            tag: "HEADWEAR",
            title: "Drip Caps",
            description: "Streetwear bucket hats, distressed snapbacks, and classic baseball caps."
        },
        "Backpacks": {
            image: "/images/urban-essentials/sling_bag.png",
            tag: "UTILITY BAGS",
            title: "Street Backpacks",
            description: "Heavy duty techwear backpacks with multi-compartment modular storage."
        },
        "Makeup": {
            image: "/images/womens_makeup_preview.png",
            tag: "BEAUTY CARE",
            title: "Makeup Essentials",
            description: "Premium luxury makeup cosmetics set, palettes, and brushes."
        },
        "Skincare": {
            image: "/images/womens_skincare_preview.png",
            tag: "SKIN ESSENTIALS",
            title: "Skincare Essentials",
            description: "Luxury skincare serum bottle, cream jar, and hydrating toner."
        },
        "Premium Beauty": {
            image: "/images/womens_premium_beauty_preview.png",
            tag: "PREMIUM BEAUTY",
            title: "Premium Beauty Care",
            description: "Premium high-end beauty products and luxury cosmetics collection."
        },
        "Lipsticks": {
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80",
            tag: "LIP GLOW",
            title: "Luxury Lipsticks",
            description: "High-end luxury matte lipsticks set featuring rich red and nude shades."
        },
        "Fragrances": {
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80",
            tag: "LUXURY SCENTS",
            title: "Women's Fragrances",
            description: "Elegant glass perfume spray bottles featuring soft floral notes."
        },
        "Classic Sunglasses": {
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
            tag: "CLASSIC SHADES",
            title: "Classic Sunglasses",
            description: "Timeless polarized sunglasses designed with premium acetate frames."
        },
        "Cat-Eye Glasses": {
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
            tag: "RETRO CHIC",
            title: "Cat-Eye Glasses",
            description: "Chic vintage cat-eye glasses for a bold statement look."
        },
        "Oversized Shades": {
            image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80",
            tag: "STATEMENT DRIP",
            title: "Oversized Shades",
            description: "Elegant oversized designer sunglasses with dark tinted UV protection lenses."
        },
        "Clothing": {
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80",
            tag: "SPORTSWEAR",
            title: "Sports Clothing",
            description: "Premium performance compression tees, leggings, and active wear."
        },
        "Footwear": {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
            tag: "ATHLETIC GEAR",
            title: "Sports Footwear",
            description: "Lightweight trail-runners and cushioned training athletic shoes."
        },
        "Sports Accessories": {
            image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
            tag: "ACTIVE GEAR",
            title: "Sports Accessories",
            description: "High-quality gym bags, sweatbands, and leakproof water bottles."
        },
        "Sports Equipment": {
            image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80",
            tag: "HOME WORKOUT",
            title: "Sports Equipment",
            description: "Anti-slip yoga mats, dumbbells, and adjustable training resistance bands."
        },
        "Fitness Gadgets": {
            image: "/images/womens_fitness_gadgets_preview.jpg",
            tag: "HEALTH TECH",
            title: "Fitness Gadgets",
            description: "Smart bands, smart rings, dumbbells, and active training gear."
        },
        "Fashion Jewellery": {
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
            tag: "TRENDY GLOW",
            title: "Fashion Jewellery",
            description: "Chic layered necklaces, trendy chain bracelets, and statement rings."
        },
        "Fine Jewellery": {
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
            tag: "LUXURY STONES",
            title: "Fine Jewellery",
            description: "Elegant diamond solitaire rings and platinum pendant necklaces."
        },
        "Earrings": {
            image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80",
            tag: "EARRING DROP",
            title: "Earrings",
            description: "Premium gold-plated hoops, pearl studs, and elegant drop earrings."
        },
        "Belts": {
            image: "/images/womens_belts_preview.jpg",
            tag: "LEATHER ACCESSORIES",
            title: "Belts",
            description: "Premium pack of slim black, brown, and white leather fashion belts with square buckles."
        },
        "Scarves & More": {
            image: "/images/womens_scarves_preview.jpg",
            tag: "WRAPS & STOLES",
            title: "Scarves & More",
            description: "Premium blue, white, and teal geometric patterned fashion scarves."
        },
        "Hair Accessories": {
            image: "/images/womens_hair_accessories_preview.jpg",
            tag: "HAIR STYLES",
            title: "Hair Accessories",
            description: "Elegant rhinestone-studded claw hair clips and aesthetic headbands."
        },
        "Wallets": {
            image: "/images/womens_wallet_preview.jpg",
            tag: "LEATHER POUCH",
            title: "Wallets",
            description: "Premium quilted light blue zip wallets, cardholders, and coin pouches."
        },
        "Hard Suitcases": {
            image: "/images/womens_hard_suitcase_preview.jpg",
            tag: "TRAVEL LUGGAGE",
            title: "Hard Suitcases",
            description: "Premium blue-to-pink gradient ombre hard-shell travel suitcases."
        },
        "Soft Suitcases": {
            image: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=400&q=80",
            tag: "SOFT LUGGAGE",
            title: "Soft Suitcases",
            description: "Premium lightweight fabric travel suitcases with expandable pockets."
        },
        "Travel Bags": {
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
            tag: "TRAVEL DRIP",
            title: "Travel Bags",
            description: "Luxury travel weekend duffle bags and water-resistant cabin luggage."
        }
    }
};


const getPreviewData = (gender: string, category: string, subcategory: string) => {
  const genderKey = gender === "Women" ? "Women" : "Men";
  if (SUBCATEGORY_PREVIEWS[genderKey]?.[subcategory]) {
    return SUBCATEGORY_PREVIEWS[genderKey][subcategory];
  }
  const parentPromo = MEGA_MENU_DATA[category]?.promotions?.[0];
  if (parentPromo) {
    return {
      image: parentPromo.image,
      tag: parentPromo.tag || "COLLECTION",
      title: subcategory,
      description: `Explore the latest arrivals in our curated ${subcategory} range.`
    };
  }
  return {
    image: "/images/hero_streetwear.png",
    tag: "DRIP EXCLUSIVES",
    title: subcategory,
    description: `Shop our premium selection of ${subcategory}.`
  };
};

interface NavbarProps {
  cart: CartItem[];
  wishlist: WishlistItem[];
  searchQuery?: string;
  searchCategory?: string;
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onRemoveFromCart: (id: number) => void;
  onRemoveFromWishlist: (id: number) => void;
  onUpdateCartQuantity: (id: number, qty: number) => void;
  onAddToCart: (product: { id: number; brand: string; name: string; price: string; image: string }) => void;
  loginOpen?: boolean;
  setLoginOpen?: (open: boolean) => void;
}

export function Navbar({
  cart = [],
  wishlist = [],
  searchQuery = "",
  searchCategory = "All",
  onSearchChange,
  onCategoryChange,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onUpdateCartQuantity,
  onAddToCart,
  loginOpen: propLoginOpen,
  setLoginOpen: propSetLoginOpen,
}: NavbarProps) {
  const [activeHoverGender, setActiveHoverGender] = useState<string | null>(null);
  const [activeHoverCategory, setActiveHoverCategory] = useState<string>("Topwear");
  const [activeHoverSubcategory, setActiveHoverSubcategory] = useState<string | null>(null);
  const hoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActiveHoverSubcategory(null);
  }, [activeHoverCategory, activeHoverGender]);

  const handleCategoryMouseEnter = (gender: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveHoverGender(gender);
  };

  const handleCategoryMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setActiveHoverGender(null);
    }, 150);
  };

  const handlePanelMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  const handlePanelMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setActiveHoverGender(null);
    }, 150);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [localLoginOpen, setLocalLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'login' | 'register' | 'verify'>('home');
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [userEmail, setUserEmail] = useState("user@driphunter.com");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [mounted, setMounted] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchCategoryOpen, setSearchCategoryOpen] = useState(false);
  const [localSearchCategory, setLocalSearchCategory] = useState(searchCategory || "All");

  // Voice & Visual Search simulation states
  const [voiceSearchOpen, setVoiceSearchOpen] = useState(false);
  const [voiceSearchStatus, setVoiceSearchStatus] = useState("Listening...");
  const [voiceSearchTranscript, setVoiceSearchTranscript] = useState("");
  
  const [visualSearchOpen, setVisualSearchOpen] = useState(false);
  const [visualSearchScanning, setVisualSearchScanning] = useState(false);
  const [visualSearchImage, setVisualSearchImage] = useState<string | null>(null);

  const startVoiceSearch = () => {
    setVoiceSearchOpen(true);
    setVoiceSearchStatus("Listening...");
    setVoiceSearchTranscript("");
    
    // Simulate speech recognition
    setTimeout(() => {
      setVoiceSearchStatus("Transcribing...");
      setVoiceSearchTranscript("Kanji Oversized Tee");
    }, 1200);

    // Complete speech recognition
    setTimeout(() => {
      setVoiceSearchStatus("Done!");
      setLocalSearch("Kanji");
      onSearchChange?.("Kanji");
      setVoiceSearchOpen(false);
      setSearchOverlayOpen(false);
      if (typeof window !== "undefined") {
        window.location.href = `/shop?search=${encodeURIComponent("Kanji")}`;
      }
    }, 2400);
  };

  const handleVisualFileSelect = (imgSrc: string, queryText: string) => {
    setVisualSearchImage(imgSrc);
    setVisualSearchScanning(true);
    
    // Simulate image scanning line animation
    setTimeout(() => {
      setVisualSearchScanning(false);
      setVisualSearchOpen(false);
      setSearchOverlayOpen(false);
      setLocalSearch(queryText);
      onSearchChange?.(queryText);
      if (typeof window !== "undefined") {
        window.location.href = `/shop?search=${encodeURIComponent(queryText)}&category=T-Shirts`;
      }
    }, 2000);
  };

  useEffect(() => {
    setMounted(true);
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/shop") {
        const params = new URLSearchParams(window.location.search);
        if (localSearch) {
          params.set("search", localSearch);
        } else {
          params.delete("search");
        }
        window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
        
        // Dispatch popstate event to notify ShopCatalog of query changes
        window.dispatchEvent(new Event("popstate"));
      } else {
        window.location.href = `/shop?search=${encodeURIComponent(localSearch)}`;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
      setIsLoggedIn(localStorage.getItem("isRegistered") === "true");
      const savedEmail = localStorage.getItem("registeredEmail");
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
      const handleAuth = () => {
        setIsLoggedIn(localStorage.getItem("isRegistered") === "true");
        const freshEmail = localStorage.getItem("registeredEmail");
        if (freshEmail) {
          setUserEmail(freshEmail);
        }
      };
      window.addEventListener("auth-change", handleAuth);
      return () => window.removeEventListener("auth-change", handleAuth);
    }
  }, []);

  const handleSignInSimulate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("registeredEmail", "user@driphunter.com");
      setIsLoggedIn(true);
      window.dispatchEvent(new Event("auth-change"));
      alert("Sign In / Sign Up simulated successfully!");
    }
  };

  const handleLogOutSimulate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "false");
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("auth-change"));
      setCurrentScreen("home");
      alert("Logged out successfully!");
    }
  };

  const loginOpen = propLoginOpen !== undefined ? propLoginOpen : localLoginOpen;
  const setLoginOpen = propSetLoginOpen !== undefined ? propSetLoginOpen : setLocalLoginOpen;

  const cartTotalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger bounce effect on cartTotalQuantity change
  useEffect(() => {
    if (cartTotalQuantity > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 800);
      return () => clearTimeout(timer);
    }
  }, [cartTotalQuantity]);

  const cartSubtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <header className="w-full bg-white text-black border-b border-zinc-200 sticky top-0 z-50" suppressHydrationWarning>
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-[10px] py-1.5 px-4 flex items-center justify-center font-mono overflow-hidden tracking-wider select-none" suppressHydrationWarning>
        <div className="animate-pulse flex items-center space-x-2">
          <span>ÔÜí SUMMER DRIP IS HERE: USE CODE <strong className="text-yellow-400 font-bold">DRIP10</strong> FOR 10% OFF ÔÜí</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6" suppressHydrationWarning>
        {/* Left: Brand Logo & All Categories Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0" suppressHydrationWarning>
          <a href="/" className="font-chaney-title text-xl md:text-2xl tracking-tighter hover:opacity-85 transition-opacity">
            DRIP HUNTER
          </a>


        </div>

        {/* Center: Centered Navigation Links & Sleek Search Bar */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-semibold tracking-wide">
          </nav>

          {/* Search Bar with Category Dropdown Arrow & Overlay Trigger */}
          <div 
            onClick={() => setSearchOverlayOpen(true)}
            className="flex items-center gap-2 border border-zinc-300 rounded-full bg-zinc-50 hover:bg-white px-3.5 py-1.5 w-64 cursor-pointer hover:border-black transition-all shadow-2xs group"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors shrink-0" />
            <input
              type="text"
              readOnly
              value={localSearch}
              placeholder="Find your perfect streetwear..."
              className="bg-transparent outline-none text-[11px] w-full text-zinc-800 placeholder-zinc-400 cursor-pointer pointer-events-none"
            />
            <div className="flex items-center gap-1 border-l border-zinc-200 pl-2 text-[10px] font-bold text-zinc-500 group-hover:text-black shrink-0">
              <span>Category</span>
              <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-black transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Right: Preserved Action Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Account Icon with Hover/Click Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer block border-none bg-transparent" 
              aria-label="Account"
            >
              <User className="w-5.5 h-5.5" />
            </button>
            
            <AnimatePresence>
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="w-64 bg-white border border-zinc-200 rounded-2xl shadow-xl p-5 text-left select-none"
                  >
                    {!isLoggedIn ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-zinc-900 font-sans uppercase tracking-wider">Welcome</h4>
                        <p className="text-[11px] text-zinc-505 font-medium font-sans">To access your wishlist and orders</p>
                        <button
                          onClick={() => {
                            window.location.href = "/login";
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full bg-zinc-950 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center transition-colors border-none"
                        >
                          Sign In / Sign Up
                        </button>
                        <div className="border-t border-zinc-100 pt-2 space-y-1">
                          <a 
                            href="/subscription" 
                            className="flex items-center justify-between py-2 px-2 hover:bg-yellow-50 rounded-lg cursor-pointer text-zinc-900 font-bold transition-colors text-[11px] font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <span>Subscription</span>
                            <span className="text-[9px] bg-[#facc15] text-black font-black px-1.5 py-0.5 rounded font-mono uppercase">VIP</span>
                          </a>
                          <a 
                            href="/seller" 
                            className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors text-[11px] font-semibold font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <span>Become a Seller</span>
                            <span className="text-[9px] bg-[#f05a28] text-white font-bold px-1.5 py-0.5 rounded font-mono uppercase">Sell</span>
                          </a>
                          <a 
                            href="/brands" 
                            className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors text-[11px] font-semibold font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            Brand
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs font-semibold text-zinc-700 font-sans">
                        <div className="pb-2.5 border-b border-zinc-100">
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">Logged in as</span>
                          <strong className="text-zinc-900 text-sm font-bold block truncate">{userEmail}</strong>
                        </div>
                        <a 
                          href="/subscription" 
                          className="flex items-center justify-between py-2 px-2 hover:bg-yellow-50 rounded-lg cursor-pointer text-zinc-900 font-bold transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span>Subscription</span>
                          <span className="text-[9px] bg-[#facc15] text-[#000] font-black px-1.5 py-0.5 rounded font-mono uppercase">VIP Perks</span>
                        </a>
                        <a 
                          href="/seller" 
                          className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span>Become a Seller</span>
                          <span className="text-[9px] bg-[#f05a28] text-white font-bold px-1.5 py-0.5 rounded font-mono uppercase">Earn</span>
                        </a>
                        <a 
                          href="/wishlist?tab=profile" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          My Profile
                        </a>
                        <a 
                          href="/wishlist?tab=orders" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Orders
                        </a>
                        <a 
                          href="/wishlist?tab=wishlist" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Wishlist
                        </a>
                        <a 
                          href="/brands" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Brand
                        </a>
                        <button
                          onClick={() => {
                            handleLogOutSimulate();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 py-2.5 px-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg cursor-pointer font-bold mt-2 bg-transparent border-none"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Icon */}
          <a 
            href="/wishlist"
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Wishlist"
          >
            <Heart className="w-5.5 h-5.5" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Cart Icon */}
          <button 
            id="navbar-cart-icon"
            onClick={() => setCartOpen(true)}
            className={`p-2 hover:bg-zinc-100 rounded-full transition-all relative cursor-pointer ${
              animateCart ? "scale-125 rotate-12 text-orange-500 bg-orange-50 duration-200" : "duration-350"
            }`} 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {mounted && cartTotalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-extrabold">
                {cartTotalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>
      {/* Category Sub-Navbar */}
      <div 
        className="w-full bg-zinc-50 border-t border-b border-zinc-200 select-none relative"
        onMouseLeave={handleCategoryMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center gap-12 py-3">
          {GENDER_TABS.map((gender, idx) => (
            <a
              key={idx}
              href={`/shop?gender=${gender.toLowerCase()}`}
              onMouseEnter={() => handleCategoryMouseEnter(gender)}
              className={`text-[11px] font-black tracking-widest uppercase transition-colors py-1 cursor-pointer border-b-2 ${
                activeHoverGender === gender 
                  ? "text-black border-black font-extrabold" 
                  : "text-zinc-500 hover:text-black border-transparent"
              }`}
            >
              {gender}
            </a>
          ))}
        </div>

        {/* Interactive Mega Menu Panel */}
        <AnimatePresence>
          {activeHoverGender && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handlePanelMouseLeave}
              className="absolute left-0 right-0 top-full bg-zinc-50 border-b border-zinc-200 shadow-xl z-40 select-none w-full"
            >
              <div className="max-w-7xl mx-auto flex divide-x divide-zinc-200 min-h-[380px] bg-zinc-50">
                {/* Left Side: Categories Drawer Column (Gray backdrop) */}
                <div 
                  onMouseLeave={() => setActiveHoverSubcategory(null)}
                  className="w-1/4 min-w-[250px] bg-zinc-50 p-5 flex flex-col gap-2 overflow-y-auto max-h-[440px] no-scrollbar"
                >
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-2 select-none">
                    Categories
                  </h4>
                  {SUBNAV_CATEGORIES.map((cat, idx) => {
                    const isExpanded = activeHoverCategory === cat;
                    const subList = activeHoverGender === "Men" 
                      ? MEGA_MENU_DATA[cat]?.subcategories 
                      : MEGA_MENU_WOMEN_DATA[cat];

                    return (
                      <div key={idx}>
                        <button
                          onClick={() => {
                            if (isExpanded) {
                              setActiveHoverCategory("");
                            } else {
                              setActiveHoverCategory(cat);
                            }
                          }}
                          className={`w-full flex items-center justify-between py-2 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-200/60 cursor-pointer focus:outline-none transition-colors ${
                            isExpanded ? "text-black font-black" : "text-zinc-650 hover:text-black"
                          }`}
                        >
                          <span>{cat}</span>
                          <ChevronDown 
                            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && subList && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden flex flex-col gap-1 pl-2 pt-2"
                            >
                              {subList.map((sub, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={`/shop?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(sub)}&gender=${activeHoverGender.toLowerCase()}`}
                                  onMouseEnter={() => setActiveHoverSubcategory(sub)}
                                  className="text-[11px] font-semibold text-zinc-500 hover:text-black hover:translate-x-1.5 transition-all flex items-center justify-between py-1.5 font-sans"
                                >
                                  <span>{sub}</span>
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Right Side: Premium Promotions Panel (White backdrop) or Hover Preview */}
                <div className="flex-1 bg-white relative overflow-hidden min-h-[380px] max-h-[440px]">
                  <AnimatePresence mode="wait">
                    {activeHoverSubcategory ? (
                      <motion.div
                        key={`preview-${activeHoverSubcategory}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute inset-0 p-8 flex flex-col md:flex-row gap-8 items-center justify-center bg-white"
                      >
                        {/* Visual Preview Image */}
                        <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-lg border border-zinc-150 group/preview bg-zinc-50 flex-shrink-0">
                          <Image
                            src={getPreviewData(activeHoverGender || "Men", activeHoverCategory, activeHoverSubcategory).image}
                            alt={activeHoverSubcategory}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/preview:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center text-left space-y-4">
                          <span className="text-[9px] font-black font-mono tracking-widest text-orange-500 uppercase">
                            {getPreviewData(activeHoverGender || "Men", activeHoverCategory, activeHoverSubcategory).tag}
                          </span>
                          <h3 className="text-xl font-black font-chaney-title uppercase tracking-wide text-zinc-900 leading-tight">
                            {getPreviewData(activeHoverGender || "Men", activeHoverCategory, activeHoverSubcategory).title}
                          </h3>
                          <p className="text-xs text-zinc-500 font-sans font-medium leading-relaxed max-w-[280px]">
                            {getPreviewData(activeHoverGender || "Men", activeHoverCategory, activeHoverSubcategory).description}
                          </p>
                          <div className="pt-2">
                            <a
                              href={`/shop?category=${encodeURIComponent(activeHoverCategory)}&search=${encodeURIComponent(activeHoverSubcategory)}&gender=${activeHoverGender.toLowerCase()}`}
                              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-zinc-650 transition-colors group/btn select-none"
                            >
                              <span>Shop Collection</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 select-none"
                      >
                        <div className="text-center space-y-2">
                          <p className="text-[10px] font-black tracking-widest text-zinc-300 uppercase font-sans">
                            DRIP PREVIEW ACTIVE
                          </p>
                          <p className="text-[9px] font-medium tracking-wide text-zinc-400 font-sans">
                            Hover over a subcategory to view the collection drop
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-zinc-200 p-4 space-y-4">
          <div className="flex items-center border border-zinc-300 rounded-full px-4 py-2 bg-zinc-50">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                const val = e.target.value;
                setLocalSearch(val);
                onSearchChange?.(val);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm"
            />
            <Search 
              className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-black transition-colors" 
              onClick={handleSearchSubmit}
            />
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-sm">
          </nav>
        </div>
      )}

      {/* Cart Drawer Panel */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="text-lg font-bold tracking-tight">Shopping Bag ({cartTotalQuantity})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-[310px] flex flex-col items-center gap-5 select-none text-center">
                      
                      {/* Santa Comic Image */}
                      <div className="relative w-full aspect-[347/330] overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-sm">
                        <Image 
                          src="/images/santa_comic.png" 
                          alt="Your Cart is Waiting Comic" 
                          fill 
                          sizes="300px"
                          className="object-cover" 
                        />
                      </div>

                      {/* Text layout */}
                      <div className="space-y-1">
                        <h4 className="text-lg font-extrabold text-zinc-900 tracking-tight">Your Cart is waiting!</h4>
                        <p className="text-xs text-zinc-500 font-medium">Let&apos;s add some items</p>
                      </div>

                      {/* Start Shopping Button */}
                      <button 
                        onClick={() => setCartOpen(false)} 
                        className="w-full max-w-[200px] bg-black hover:bg-zinc-900 text-yellow-400 border border-yellow-400 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                      >
                        Start Shopping
                      </button>

                    </div>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${(item as any).size || idx}`} className="flex gap-4 border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                      <div className="relative w-20 aspect-[4/5] bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase">{item.brand}</span>
                              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            </div>
                            <button onClick={() => onRemoveFromCart(item.id)} className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer">
                              <X className="w-4.5 h-4.5" />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-zinc-950 mt-1 block">{item.price}</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 font-bold text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal and checkout */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-100 p-6 bg-zinc-50 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-zinc-950">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Shipping & taxes calculated at checkout</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = "/checkout";
                    }}
                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-zinc-950 transition-colors shadow-lg cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer Panel */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <h3 className="text-lg font-bold tracking-tight">Favorites ({wishlist.length})</h3>
                </div>
                <button onClick={() => setWishlistOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    {/* Add keyframe style definitions directly inside */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                      }
                      @keyframes splitLeft {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(-6px, 1.5px) rotate(-8deg); }
                      }
                      @keyframes splitRight {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(6px, 1.5px) rotate(8deg); }
                      }
                    `}} />

                    {/* Illustration Container */}
                    <div className="relative w-full aspect-[4/3.5] flex items-center justify-center select-none bg-[#f7f8fa] border border-zinc-200 rounded-[32px] max-w-[290px] overflow-hidden mb-6 p-4">
                      
                      {/* Checklist sheet */}
                      <div className="relative w-[136px] h-[176px] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4.5 flex flex-col gap-3.5 translate-y-3.5 border border-zinc-100/50">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <span className="w-4 h-4 rounded-md border border-zinc-200 flex-shrink-0 bg-zinc-50/50" />
                            <span 
                              className="h-1.5 bg-zinc-100 rounded-full" 
                              style={{ width: `${30 + (idx % 3) * 20}%` }} 
                            />
                          </div>
                        ))}

                        {/* Top float bubble */}
                        <div className="absolute -top-3.5 left-13 w-11 h-5.5 bg-zinc-200/80 rounded-full flex items-center justify-center shadow-2xs border border-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        </div>
                      </div>

                      {/* Floating Split Heart */}
                      <div className="absolute bottom-5 right-5 w-24 h-24 drop-shadow-lg animate-[float_2.8s_ease-in-out_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ff4b1f" />
                              <stop offset="100%" stopColor="#ff007f" />
                            </linearGradient>
                          </defs>
                          
                          {/* Left Half (Group for future additions if needed) */}
                          <g className="origin-[50px_56px] animate-[splitLeft_2.2s_ease-in-out_infinite]">
                            <path 
                              d="M 50 25 C 32 10, 12 25, 12 48 C 12 68, 32 81, 50 88 L 47 65 L 53 50 L 48 40 Z" 
                              fill="url(#heartGrad)" 
                            />
                          </g>

                          {/* Right Half (With glossy reflection highlight) */}
                          <g className="origin-[50px_56px] animate-[splitRight_2.2s_ease-in-out_infinite]">
                            <path 
                              d="M 50 25 C 68 10, 88 25, 88 48 C 88 68, 68 81, 50 88 L 47 65 L 53 50 L 48 40 Z" 
                              fill="url(#heartGrad)" 
                            />
                            {/* Glossy Reflection Highlight Curve */}
                            <path 
                              d="M 64 28 C 72 29, 78 35, 80 43 C 80.5 44.5, 79 45, 78 44 C 76 38, 71 33, 64 31 C 63 30.8, 63 28.2, 64 28 Z" 
                              fill="white" 
                              fillOpacity="0.65" 
                            />
                          </g>
                        </svg>
                      </div>

                    </div>

                    {/* Text content matching the Dribbble mockup */}
                    <div className="text-center">
                      <h4 className="text-xl font-extrabold text-[#2d3142] tracking-tight">Your wishlist is empty</h4>
                      <p className="text-xs text-zinc-500 mt-1.5 font-medium">Create your first wishlist request</p>
                    </div>

                    {/* Button matching mockup */}
                    <button 
                      onClick={() => setWishlistOpen(false)} 
                      className="bg-[#f05a28] hover:bg-[#d84e20] text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01] flex items-center justify-center gap-1.5 mt-6 w-full max-w-[220px]"
                    >
                      <span className="text-sm font-semibold">+</span> Create new wish
                    </button>

                  </div>
                ) : (
                  wishlist.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4 border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                      <div className="relative w-20 aspect-[4/5] bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase">{item.brand}</span>
                              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            </div>
                            <button onClick={() => onRemoveFromWishlist(item.id)} className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer">
                              <X className="w-4.5 h-4.5" />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-zinc-950 mt-1 block">{item.price}</span>
                        </div>

                        {/* Add to cart from favorites */}
                        <button 
                          onClick={() => {
                            onAddToCart({ id: item.id, brand: item.brand, name: item.name, price: item.price, image: item.image });
                            onRemoveFromWishlist(item.id);
                          }}
                          className="bg-zinc-100 hover:bg-black hover:text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition-colors cursor-pointer w-full text-center mt-2 border border-zinc-200 hover:border-black"
                        >
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Page Authentication Flows Screen Overlay */}
      {currentScreen !== "home" && (
        <div className="fixed top-[112px] inset-x-0 bottom-0 bg-white z-[60] overflow-y-auto flex flex-col justify-center select-none">
          <div className="flex-grow flex items-center justify-center py-16 px-4">
            
            <AnimatePresence mode="wait">
              {currentScreen === "login" && (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Login</h2>
                  <p className="text-xs text-zinc-505 mt-3 mb-6 font-medium">
                    Please enter your e-mail and password:
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      localStorage.setItem("isRegistered", "true");
                      localStorage.setItem("registeredEmail", authEmail || "user@driphunter.com");
                      setIsLoggedIn(true);
                      window.dispatchEvent(new Event("auth-change"));
                      setCurrentScreen("home");
                      alert("Logged in successfully!");
                    }}
                    className="space-y-4"
                  >
                    <input 
                      type="email" 
                      required 
                      placeholder="Email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <div className="relative">
                      <input 
                        type="password" 
                        required 
                        placeholder="Password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <button 
                        type="button"
                        onClick={() => alert("Forgot password link sent!")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-0 font-bold"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Log In
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-zinc-505 font-semibold font-sans">
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => {
                        setCurrentScreen("register");
                        setCodeError("");
                      }} 
                      className="font-bold text-black hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Sign Up
                    </button>
                  </div>
                </motion.div>
              )}

              {currentScreen === "register" && (
                <motion.div 
                  key="register"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Register</h2>
                  <p className="text-xs text-zinc-500 mt-3 mb-6 font-medium">
                    Please fill in the information below:
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCurrentScreen("verify");
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required 
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <input 
                        type="text" 
                        required 
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                    </div>

                    <input 
                      type="email" 
                      required 
                      placeholder="Email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <input 
                      type="password" 
                      required 
                      placeholder="Password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Create My Account
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-zinc-505 font-semibold font-sans">
                    Already have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => {
                        setCurrentScreen("login");
                        setCodeError("");
                      }} 
                      className="font-bold text-black hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Log in
                    </button>
                  </div>
                </motion.div>
              )}

              {currentScreen === "verify" && (
                <motion.div 
                  key="verify"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Enter Code</h2>
                  <p className="text-xs text-zinc-505 mt-3 mb-6 font-medium">
                    Sent to {authEmail || "user@driphunter.com"}
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!verificationCode.trim()) {
                        setCodeError("Verification code cannot be empty!");
                        return;
                      }
                      localStorage.setItem("isRegistered", "true");
                      localStorage.setItem("registeredEmail", authEmail || "user@driphunter.com");
                      setIsLoggedIn(true);
                      window.dispatchEvent(new Event("auth-change"));
                      setCurrentScreen("home");
                      alert("Account verified and logged in successfully!");
                    }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input 
                        type="text" 
                        maxLength={6}
                        required 
                        placeholder="6-digit code"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          setCodeError("");
                        }}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <button 
                        type="button"
                        onClick={() => alert("Verification code resent!")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 hover:text-black cursor-pointer bg-transparent border-none p-0 font-bold"
                      >
                        Verify
                      </button>
                    </div>

                    {codeError && (
                      <p className="text-[10px] text-red-500 font-mono font-bold text-left">{codeError}</p>
                    )}

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Create My Account
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      )}

      {/* Full-bleed Interactive Search Overlay Drawer matching reference screenshot */}
      <AnimatePresence>
        {searchOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto font-sans text-black"
          >
            {/* Top Search Bar Header */}
            <div className="w-full border-b border-zinc-200 bg-white sticky top-0 z-10 py-4 px-4 sm:px-8 shadow-2xs">
              <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                
                {/* Search Bar Input Box */}
                <div className="flex-1 max-w-2xl mx-auto flex items-center gap-3 bg-zinc-100 border border-zinc-300 rounded-full px-4 py-2 shadow-2xs focus-within:border-black focus-within:bg-white transition-all">
                  <Search className="w-4 h-4 text-zinc-600 shrink-0" />
                  
                  <input
                    type="text"
                    autoFocus
                    value={localSearch}
                    onChange={(e) => {
                      setLocalSearch(e.target.value);
                      onSearchChange?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSearchOverlayOpen(false);
                        handleSearchSubmit();
                      }
                    }}
                    placeholder="Find your perfect streetwear..."
                    className="bg-transparent outline-none text-xs sm:text-sm w-full text-zinc-900 placeholder-zinc-500 font-medium"
                  />

                  {/* Category Dropdown Pill */}
                  <div className="relative shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchCategoryOpen(!searchCategoryOpen);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-zinc-800 hover:text-black border-l border-zinc-300 pl-3 cursor-pointer bg-transparent border-y-0 border-r-0"
                    >
                      <span>{localSearchCategory === "All" ? "Category" : localSearchCategory}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {searchCategoryOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-zinc-200 rounded-xl shadow-xl py-1.5 z-50 text-xs font-mono">
                        {["All", "T-Shirts", "Hoodies", "Shirts", "Eyewear", "Headwear", "Bottoms", "Bags", "Wallets", "Skateboards"].map((cat) => (
                          <button
                            key={cat}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLocalSearchCategory(cat);
                              onCategoryChange?.(cat);
                              setSearchCategoryOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 cursor-pointer transition-colors ${
                              localSearchCategory === cat ? "bg-black text-white font-bold" : "hover:bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mic & Camera Action Icons */}
                  <div className="flex items-center gap-2 border-l border-zinc-300 pl-3 text-zinc-600 shrink-0">
                    <button
                      onClick={() => startVoiceSearch()}
                      className="hover:text-black transition-colors cursor-pointer p-0.5 border-none bg-transparent"
                      title="Voice Search"
                    >
                      <Mic className="w-4 h-4 text-zinc-700 hover:text-black" />
                    </button>
                    <button
                      onClick={() => {
                        setVisualSearchOpen(true);
                        setVisualSearchImage(null);
                        setVisualSearchScanning(false);
                      }}
                      className="hover:text-black transition-colors cursor-pointer p-0.5 border-none bg-transparent"
                      title="Search by Image"
                    >
                      <Camera className="w-4 h-4 text-zinc-700 hover:text-black" />
                    </button>
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => setSearchOverlayOpen(false)}
                  className="text-xs font-bold text-zinc-500 hover:text-black cursor-pointer border-none bg-transparent transition-colors"
                >
                  Cancel
                </button>

              </div>
            </div>

            {/* Overlay Body Grid (3 Columns matching screenshot) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* LEFT COLUMN: Top Suggestions & Popular Brands */}
                <div className="lg:col-span-3 space-y-8 text-left">
                  {/* Top Suggestions */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                      Top Suggestions
                    </h3>

                    <div className="space-y-2.5 font-sans text-xs pt-1">
                      {[
                        "Graphic Tees",
                        "Varsity Jackets",
                        "Oversized Hoodies",
                        "Tactical Sling Bags",
                        "Street Shades",
                        "Cargo Pants"
                      ].map((sugg) => (
                        <button
                          key={sugg}
                          onClick={() => {
                            setLocalSearch(sugg);
                            setSearchOverlayOpen(false);
                            window.location.href = `/shop?search=${encodeURIComponent(sugg)}`;
                          }}
                          className="block w-full text-left py-1 text-zinc-600 hover:text-black hover:font-bold transition-all cursor-pointer border-none bg-transparent"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-zinc-400" />

                  {/* Popular Brands */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                      Popular Brands
                    </h3>

                    {/* Circle Brand Icons Row */}
                    <div className="flex items-center gap-3">
                      {[
                        { name: "Arlo", logo: "Arlo" },
                        { name: "Supervek", logo: "SV" },
                        { name: "Puma", logo: "Puma" },
                      ].map((b, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchOverlayOpen(false);
                            window.location.href = `/shop?brand=${encodeURIComponent(b.name)}`;
                          }}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center font-mono font-bold text-xs group-hover:border-black group-hover:bg-zinc-50 transition-all shadow-2xs">
                            {b.logo}
                          </div>
                          <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black">{b.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Brand Pill Cards matching screenshot */}
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-8 rounded-lg bg-[#cff4fc] flex items-center justify-center font-bold text-[10px] text-[#055160] font-mono">
                          Arlo
                        </div>
                        <div className="px-3.5 py-1 bg-[#cff4fc] text-[#055160] rounded-lg text-xs font-bold font-mono">
                          Brand
                        </div>
                      </div>

                      <div 
                        className="p-2 border border-zinc-200 rounded-xl flex items-center gap-3 bg-zinc-50 hover:bg-white transition-colors cursor-pointer"
                        onClick={() => {
                          setSearchOverlayOpen(false);
                          window.location.href = "/product/853";
                        }}
                      >
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-black flex-shrink-0">
                          <Image src="/images/urban-essentials/full_sleeve_shirt.png" alt="Arlo" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold font-mono">Arlo Streetwear Hoodie</p>
                          <p className="text-[10px] text-zinc-500 font-mono">RS. 1,400.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CENTER COLUMN: 2x2 Photo Grid matching screenshot */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 4"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Related Blogs matching screenshot */}
                <div className="lg:col-span-4 space-y-4 text-left">
                  <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                    Related Blogs
                  </h3>

                  <div className="space-y-3">
                    {[
                      { title: "Elevate Your Streetwear Drip With Oversized Tees", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
                      { title: "Top 10 Varsity Jackets & Bomber Essentials", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
                      { title: "How to Style Tactical Sling Bags & Accessories", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
                      { title: "Skate Culture & Underground Urban Fashion", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80" },
                      { title: "The Ultimate Guide to Premium Headwear & Caps", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80" },
                      { title: "Ripstop Cargo Pants: Utility Meets High Street", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80" },
                    ].map((blog, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSearchOverlayOpen(false);
                          window.location.href = "/#blog";
                        }}
                        className="flex items-center gap-3 p-2 bg-[#ffe082]/70 hover:bg-[#ffe082] rounded-2xl transition-colors cursor-pointer group shadow-2xs border border-amber-200"
                      >
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-amber-200">
                          <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <h4 className="text-xs font-mono font-bold text-zinc-900 group-hover:text-black line-clamp-2 leading-tight">
                          {blog.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Search Modal Overlay */}
            <AnimatePresence>
              {voiceSearchOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center text-white space-y-6 shadow-2xl relative"
                  >
                    <button
                      onClick={() => setVoiceSearchOpen(false)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer bg-transparent border-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex justify-center py-4">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 w-24 h-24 bg-red-500/20 rounded-full animate-ping" />
                        <div className="absolute inset-0 w-20 h-20 bg-red-500/40 rounded-full animate-pulse" />
                        <div className="relative w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                          <Mic className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black uppercase tracking-widest font-mono text-yellow-400">
                        {voiceSearchStatus}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium">
                        {voiceSearchStatus === "Listening..." 
                          ? "Try saying: 'Kanji Oversized Tee'"
                          : "Processing audio signal..."
                        }
                      </p>
                    </div>

                    {voiceSearchTranscript && (
                      <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-4 font-mono text-xs text-green-400 tracking-wider text-left min-h-[3.5rem] flex items-center gap-2">
                        <span className="shrink-0 animate-pulse">ÔùÅ</span>
                        <span className="text-zinc-200">"{voiceSearchTranscript}"</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Visual Search Modal Overlay */}
            <AnimatePresence>
              {visualSearchOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-zinc-950 text-left space-y-6 shadow-2xl relative"
                  >
                    <style>{`
                      @keyframes scan {
                        0%, 100% { top: 0%; }
                        50% { top: 100%; }
                      }
                    `}</style>
                    <button
                      onClick={() => setVisualSearchOpen(false)}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-black cursor-pointer bg-transparent border-none"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black uppercase tracking-wider font-mono text-black">
                        Visual Search
                      </h3>
                      <p className="text-xs text-zinc-500 font-medium">
                        Search by uploading an image or selecting a sample style
                      </p>
                    </div>

                    {visualSearchScanning ? (
                      <div className="relative bg-zinc-900 rounded-2xl aspect-video flex flex-col items-center justify-center overflow-hidden border border-zinc-800">
                        {visualSearchImage && (
                          <img
                            src={visualSearchImage}
                            alt="Scanning Preview"
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                          />
                        )}
                        <div 
                          className="absolute left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]" 
                          style={{ animation: "scan 2s infinite ease-in-out" }}
                        />
                        
                        <div className="relative z-10 flex flex-col items-center gap-2 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-xs">
                          <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                          <span className="text-xs text-green-400 font-bold uppercase tracking-wider font-mono">
                            Analyzing Garment...
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <label className="border-2 border-dashed border-zinc-300 hover:border-zinc-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-50 hover:bg-zinc-100/50 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  handleVisualFileSelect(reader.result as string, "Retro");
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Camera className="w-8 h-8 text-zinc-400" />
                          <span className="text-xs font-bold text-zinc-700">Upload streetwear photo</span>
                          <span className="text-[10px] text-zinc-400">PNG, JPG or WEBP up to 5MB</span>
                        </label>

                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                            Or test with a sample look:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: "Retro", query: "Retro Graphic", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80" },
                              { label: "Classic", query: "Kanji Oversized", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80" },
                              { label: "Cargo", query: "Cargo Utility", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=150&q=80" }
                            ].map((sample) => (
                              <button
                                key={sample.label}
                                onClick={() => handleVisualFileSelect(sample.img, sample.query)}
                                className="flex flex-col gap-1 items-center p-1.5 border border-zinc-200 hover:border-black rounded-xl hover:bg-zinc-50 transition-all cursor-pointer text-[10px] font-bold"
                              >
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-100">
                                  <img src={sample.img} alt={sample.label} className="w-full h-full object-cover" />
                                </div>
                                <span>{sample.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

