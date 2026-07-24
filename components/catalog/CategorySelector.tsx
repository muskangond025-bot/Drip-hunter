"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export interface CategoryCircleItem {
  id: string;
  name: string;
  image: string;
  filterCategory: string;
}

// ----------------------------------------------------
// INLINE TECHNICAL BLUEPRINT SVGS FOR SUUUPPLY CARDS
// ----------------------------------------------------
const TShirtIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M30 20 C35 25, 65 25, 70 20 L88 32 L78 46 L70 42 L70 80 L30 80 L30 42 L22 46 L12 32 Z" 
      initial={{ pathLength: 0.9, strokeDasharray: "0 0" }}
      whileHover={{ pathLength: 1, strokeDashoffset: [0, -10] }}
      transition={{ duration: 0.6 }}
    />
    {/* Collar ribbing details */}
    <path d="M40 22 C45 28, 55 28, 60 22" />
    <path d="M37 20 C42 26, 58 26, 63 20" strokeWidth="1" opacity="0.6" />
    {/* Chest Pocket */}
    <path d="M52 38 L64 38 L64 50 C64 53, 52 53, 52 50 Z" strokeWidth="1.2" />
    <path d="M52 41 L64 41" strokeWidth="0.8" strokeDasharray="2 2" />
    {/* Sleeve seams and cuff stitching */}
    <path d="M30 35 L22 46" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <path d="M70 35 L78 46" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <path d="M15 30 L20 42" strokeWidth="1" opacity="0.5" />
    <path d="M85 30 L80 42" strokeWidth="1" opacity="0.5" />
    {/* Bottom Hem double stitching */}
    <path d="M30 77 L70 77" strokeWidth="0.8" strokeDasharray="2 2" />
    <path d="M30 75 L70 75" strokeWidth="0.8" strokeDasharray="2 2" />
  </svg>
);

const SunglassesIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M15 48 C15 35, 85 35, 85 48 C85 55, 75 58, 68 58 C60 58, 56 50, 50 50 C44 50, 40 58, 32 58 C25 58, 15 55, 15 48 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Frame side arms */}
    <path d="M15 48 L8 42 L10 24" />
    <path d="M85 48 L92 42 L90 24" />
    {/* Detailed lens frames */}
    <path d="M28 48 C28 54, 44 54, 44 48 C44 42, 28 42, 28 48 Z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.2" />
    <path d="M56 48 C56 54, 72 54, 72 48 C72 42, 56 42, 56 48 Z" fill="currentColor" fillOpacity="0.05" strokeWidth="1.2" />
    {/* Lens reflection highlights */}
    <path d="M38 44 L32 50" strokeWidth="0.8" opacity="0.5" />
    <path d="M66 44 L60 50" strokeWidth="0.8" opacity="0.5" />
    {/* Nose pads and bridge lines */}
    <path d="M47 48 C47 46, 53 46, 53 48" strokeWidth="1" />
    <path d="M42 50 L40 53" strokeWidth="1" opacity="0.6" />
    <path d="M58 50 L60 53" strokeWidth="1" opacity="0.6" />
    {/* Small hinge screws */}
    <circle cx="17" cy="40" r="1" fill="currentColor" />
    <circle cx="83" cy="40" r="1" fill="currentColor" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M20 62 C20 40, 80 40, 80 62" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    <path d="M16 62 L84 62 C84 68, 70 76, 50 76 C30 76, 16 68, 16 62 Z" />
    {/* Cap visor stitching rows */}
    <path d="M21 65 C30 71, 70 71, 79 65" strokeWidth="0.8" strokeDasharray="2 2" />
    <path d="M26 68 C35 73, 65 73, 74 68" strokeWidth="0.8" strokeDasharray="2 2" />
    {/* Dome Panel lines */}
    <path d="M50 38 L50 62" strokeWidth="1" opacity="0.6" />
    <path d="M50 38 C38 42, 30 52, 30 62" strokeWidth="1.2" opacity="0.5" />
    <path d="M50 38 C62 42, 70 52, 70 62" strokeWidth="1.2" opacity="0.5" />
    {/* Ventilation Eyelets */}
    <circle cx="38" cy="48" r="1.5" strokeWidth="1" />
    <circle cx="62" cy="48" r="1.5" strokeWidth="1" />
    {/* Top Button */}
    <circle cx="50" cy="37" r="3" fill="currentColor" />
    <path d="M47 37 C47 35, 53 35, 53 37" />
  </svg>
);

const PantsIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M32 20 L68 20 L74 80 L52 80 L50 42 L48 80 L26 80 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Waistband stitching & belt loops */}
    <path d="M32 26 L68 26" strokeWidth="1.2" strokeDasharray="2 2" />
    <path d="M36 20 L36 26" strokeWidth="1.5" />
    <path d="M50 20 L50 26" strokeWidth="1.5" />
    <path d="M64 20 L64 26" strokeWidth="1.5" />
    {/* Fly detailing */}
    <path d="M50 26 L50 35 L45 35" strokeWidth="1.2" />
    {/* Side Cargo Pockets */}
    <path d="M27 45 H17 V58 H28" strokeWidth="1.2" />
    <path d="M73 45 H83 V58 H72" strokeWidth="1.2" />
    <path d="M15 48 H29" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <path d="M71 48 H85" strokeWidth="1" strokeDasharray="1.5 1.5" />
    {/* Knee panelling */}
    <path d="M28 52 C35 53, 45 53, 48 52" strokeWidth="1" opacity="0.6" />
    <path d="M52 52 C55 53, 65 53, 72 52" strokeWidth="1" opacity="0.6" />
    <path d="M27 56 C35 57, 45 57, 48 56" strokeWidth="1" opacity="0.6" />
    <path d="M52 56 C55 57, 65 57, 72 56" strokeWidth="1" opacity="0.6" />
    {/* Cuff double stitching */}
    <path d="M26 77 H48" strokeWidth="0.8" strokeDasharray="2 2" />
    <path d="M52 77 H74" strokeWidth="0.8" strokeDasharray="2 2" />
  </svg>
);

const AccessoryIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M20 40 L80 40 L85 75 L15 75 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Shoulder straps */}
    <path d="M35 40 C35 25, 65 25, 65 40" strokeWidth="2" />
    <path d="M31 28 L39 28" strokeWidth="1.5" />
    <path d="M61 28 L69 28" strokeWidth="1.5" />
    {/* Zipper flap */}
    <path d="M20 48 H80" strokeWidth="1.2" />
    <circle cx="50" cy="48" r="2.5" fill="currentColor" />
    <path d="M50 48 L50 53" strokeWidth="1.5" />
    {/* Tactical webbing loops (MOLLE) */}
    <path d="M28 58 H72" strokeWidth="1" />
    <path d="M28 66 H72" strokeWidth="1" />
    {/* Webbing vertical dividers */}
    <path d="M36 58 V66" strokeWidth="0.8" opacity="0.7" />
    <path d="M48 58 V66" strokeWidth="0.8" opacity="0.7" />
    <path d="M60 58 V66" strokeWidth="0.8" opacity="0.7" />
    {/* Buckle release lock */}
    <rect x="42" y="69" width="16" height="6" rx="1.5" strokeWidth="1" />
    <line x1="47" y1="72" x2="53" y2="72" strokeWidth="0.8" />
  </svg>
);

const ClothingIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M50 25 C50 20, 55 18, 55 22 C55 26, 45 28, 45 32 L15 45 L85 45 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    <path d="M26 45 L26 80 L74 80 L74 45" />
    {/* Folding collar */}
    <path d="M38 23 C38 23, 44 32, 50 32 C56 32, 62 23, 62 23" strokeWidth="1.5" />
    <path d="M50 32 L50 80" strokeWidth="1.2" />
    {/* Buttons on front center */}
    <circle cx="50" cy="40" r="2" fill="currentColor" />
    <circle cx="50" cy="52" r="2" fill="currentColor" />
    <circle cx="50" cy="64" r="2" fill="currentColor" />
    <circle cx="50" cy="74" r="2" fill="currentColor" />
    {/* Side hand pockets */}
    <path d="M28 58 L35 63 V68" strokeWidth="1.2" />
    <path d="M72 58 L65 63 V68" strokeWidth="1.2" />
    {/* Drawstrings at bottom */}
    <path d="M42 80 C42 83, 44 85, 41 87" strokeWidth="1" />
    <path d="M58 80 C58 83, 56 85, 59 87" strokeWidth="1" />
    {/* Sleeve cuff lines */}
    <path d="M15 40 L26 45" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
  </svg>
);

const BackpackIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M28 35 C28 22, 72 22, 72 35 L76 80 L24 80 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Top carry loop */}
    <path d="M35 26 C38 18, 62 18, 65 26" strokeWidth="1.5" />
    {/* Zipper compartment line */}
    <path d="M28 35 C28 35, 50 33, 72 35" strokeWidth="1.2" />
    {/* Front zipper pocket */}
    <path d="M32 50 H68 V76 H32 Z" strokeWidth="1.5" />
    <path d="M32 55 H68" strokeWidth="1" />
    <circle cx="50" cy="55" r="1.5" fill="currentColor" />
    {/* Compression utility straps with buckles */}
    <path d="M36 40 V50" strokeWidth="1.5" />
    <path d="M64 40 V50" strokeWidth="1.5" />
    <rect x="33" y="44" width="6" height="4" fill="currentColor" stroke="none" />
    <rect x="61" y="44" width="6" height="4" fill="currentColor" stroke="none" />
    {/* Side utility netting loops */}
    <path d="M24 55 H20 V68 H24" strokeWidth="1" />
    <path d="M76 55 H80 V68 H76" strokeWidth="1" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M18 28 L82 28 C85 28, 88 31, 88 35 L88 72 C88 76, 85 79, 82 79 L18 79 C15 79, 12 76, 12 72 L12 35 C12 31, 15 28, 18 28 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Bifold crease fold line */}
    <path d="M50 28 V79" strokeWidth="1" strokeDasharray="3 3" />
    {/* Cards peeking out */}
    <path d="M22 28 V20 H42 V28" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
    <path d="M26 23 H38" strokeWidth="1" />
    <rect x="25" y="20" width="4" height="3" fill="currentColor" stroke="none" />
    {/* Horizontal card slots */}
    <path d="M16 44 H44" strokeWidth="1.2" />
    <path d="M16 52 H44" strokeWidth="1.2" />
    <path d="M56 44 H84" strokeWidth="1.2" />
    <path d="M56 52 H84" strokeWidth="1.2" />
    {/* Coin pocket snap button loop */}
    <path d="M64 58 H82 V72 H64 Z" strokeWidth="1.2" />
    <path d="M64 62 H82" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    <circle cx="73" cy="66" r="2.5" fill="currentColor" />
  </svg>
);

const ShirtIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M32 20 L44 28 L50 24 L56 28 L68 20 L84 32 L75 48 L68 44 L68 80 L32 80 L32 44 L25 48 L16 32 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Button Placket center strip */}
    <path d="M47 28 V80" strokeWidth="1" />
    <path d="M53 28 V80" strokeWidth="1" />
    <circle cx="50" cy="38" r="1.8" fill="currentColor" />
    <circle cx="50" cy="50" r="1.8" fill="currentColor" />
    <circle cx="50" cy="62" r="1.8" fill="currentColor" />
    <circle cx="50" cy="74" r="1.8" fill="currentColor" />
    {/* Symmetrical utility chest pockets */}
    <path d="M22 36 H31 V48 H22 Z" strokeWidth="1" opacity="0.3" />
    <path d="M78 36 H69 V48 H78 Z" strokeWidth="1" opacity="0.3" />
    <path d="M34 38 H44 V49 H34 Z" strokeWidth="1.2" />
    <path d="M34 41 H44" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    <circle cx="39" cy="45" r="1.2" fill="currentColor" />
    <path d="M66 38 H56 V49 H66 Z" strokeWidth="1.2" />
    <path d="M66 41 H56" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    <circle cx="61" cy="45" r="1.2" fill="currentColor" />
    {/* Back shoulder yoke line */}
    <path d="M32 30 H68" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
  </svg>
);

const HoodieIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M32 30 C32 12, 68 12, 68 30 L84 40 L76 52 L68 48 L68 80 L32 80 L32 48 L24 52 L16 40 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Hood center seam line */}
    <path d="M50 12 V30" strokeWidth="1" opacity="0.4" />
    {/* Hood overlap opening */}
    <path d="M42 30 L50 36 L58 30" strokeWidth="1.5" />
    {/* Kangaroo front pocket */}
    <path d="M36 58 H64 C66 58, 66 60, 65 62 L61 74 C60 76, 58 76, 56 76 H44 C42 76, 40 76, 39 74 L35 62 C34 60, 34 58, 36 58 Z" strokeWidth="1.5" />
    <path d="M39 60 H61" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    {/* Drawstrings with metal tips */}
    <path d="M46 33 V46" strokeWidth="1.2" />
    <path d="M54 33 V44" strokeWidth="1.2" />
    <circle cx="46" cy="46" r="1.5" fill="currentColor" />
    <circle cx="54" cy="44" r="1.5" fill="currentColor" />
    {/* Waistband and cuffs stitching lines */}
    <path d="M32 76 H68" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const SkateboardIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      d="M15 42 C15 35, 85 35, 85 42 C85 49, 15 49, 15 42 Z" 
      initial={{ pathLength: 0.9 }}
      whileHover={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    {/* Grip tape cutout design line */}
    <path d="M32 35 V49" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M68 35 V49" strokeWidth="1.2" strokeDasharray="3 3" />
    {/* Truck mounts and screws (Nose) */}
    <rect x="25" y="38" width="6" height="8" rx="1" strokeWidth="1" />
    <circle cx="27" cy="40" r="0.6" fill="currentColor" />
    <circle cx="27" cy="44" r="0.6" fill="currentColor" />
    <circle cx="29" cy="40" r="0.6" fill="currentColor" />
    <circle cx="29" cy="44" r="0.6" fill="currentColor" />
    <circle cx="28" cy="56" r="5" strokeWidth="1.2" />
    <circle cx="28" cy="56" r="2" fill="currentColor" />
    <path d="M28 46 V51" strokeWidth="1.5" />
    {/* Truck mounts and screws (Tail) */}
    <rect x="69" y="38" width="6" height="8" rx="1" strokeWidth="1" />
    <circle cx="71" cy="40" r="0.6" fill="currentColor" />
    <circle cx="71" cy="44" r="0.6" fill="currentColor" />
    <circle cx="73" cy="40" r="0.6" fill="currentColor" />
    <circle cx="73" cy="44" r="0.6" fill="currentColor" />
    <circle cx="72" cy="56" r="5" strokeWidth="1.2" />
    <circle cx="72" cy="56" r="2" fill="currentColor" />
    <path d="M72 46 V51" strokeWidth="1.5" />
  </svg>
);

// Fallback Icon for dynamically populated subcategories
const BulletPointIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-current text-zinc-900 group-hover:text-zinc-600 transition-colors" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="16" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>
);

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "tshirts": return <TShirtIcon />;
    case "eyewear": return <SunglassesIcon />;
    case "headwear": return <CapIcon />;
    case "bottoms": return <PantsIcon />;
    case "accessories": return <AccessoryIcon />;
    case "clothing": return <ClothingIcon />;
    case "backpack": return <BackpackIcon />;
    case "wallets": return <WalletIcon />;
    case "shirts": return <ShirtIcon />;
    case "hoodies": return <HoodieIcon />;
    case "skateboards": return <SkateboardIcon />;
    default: return <BulletPointIcon />;
  }
};

// ----------------------------------------------------
// PRODUCT IMAGE REVEAL CYCLES FOR EACH MAIN CATEGORY
// ----------------------------------------------------
const CATEGORY_CYCLE_IMAGES: Record<string, string[]> = {
  tshirts: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80"
  ],
  eyewear: [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=300&q=80"
  ],
  headwear: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=300&q=80"
  ],
  bottoms: [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1524498250077-3a819b566db0?auto=format&fit=crop&w=300&q=80"
  ],
  clothing: [
    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=300&q=80"
  ],
  backpack: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=300&q=80"
  ],
  wallets: [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1506544777-64cfbe1142df?auto=format&fit=crop&w=300&q=80"
  ],
  shirts: [
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80"
  ],
  hoodies: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80"
  ],
  skateboards: [
    "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1547447134-cd3f5c71752e?auto=format&fit=crop&w=300&q=80"
  ]
};

// MAIN HOMEPAGE CATEGORIES
const CATEGORY_CIRCLE_ITEMS: CategoryCircleItem[] = [
  { id: "tshirts", name: "t-shirts", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80", filterCategory: "Tshirts" },
  { id: "shirts", name: "shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80", filterCategory: "Shirts" },
  { id: "hoodies", name: "hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80", filterCategory: "Hoodies" },
  { id: "bottoms", name: "pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80", filterCategory: "All Bottoms" },
  { id: "backpack", name: "bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80", filterCategory: "Backpack" },
  { id: "headwear", name: "headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80", filterCategory: "Headwear" },
  { id: "eyewear", name: "eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80", filterCategory: "Eyewear" },
  { id: "wallets", name: "wallets", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80", filterCategory: "Wallets" },
  { id: "accessories", name: "accessories", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=80", filterCategory: "Accessories" },
  { id: "clothing", name: "clothing", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=300&q=80", filterCategory: "Clothing" },
  { id: "skateboards", name: "skateboards", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80", filterCategory: "Skateboards" }
];

// SUB-CATEGORIES MAPPINGS FOR CONTEXT-AWARE VIEWS
const TSHIRT_VARIETIES: CategoryCircleItem[] = [
  { id: "all-tshirts", name: "all t-shirts", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80", filterCategory: "Tshirts" },
  { id: "graphic-tees", name: "graphic tees", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80", filterCategory: "Graphic Tees" },
  { id: "oversized-tees", name: "oversized tees", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80", filterCategory: "Oversized Tees" },
  { id: "full-sleeve-tees", name: "full sleeve tees", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80", filterCategory: "Full Sleeve Tees" },
  { id: "polo-tees", name: "polo tees", image: "https://images.unsplash.com/photo-1625910513413-5627252f4477?auto=format&fit=crop&w=300&q=80", filterCategory: "Polo Tees" },
  { id: "printed-tees", name: "printed tees", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80", filterCategory: "Printed Tees" }
];

const SHIRTS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-shirts", name: "all shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80", filterCategory: "Shirts" },
  { id: "flannel-shirts", name: "flannel shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80", filterCategory: "Flannel Shirts" },
  { id: "casual-shirts", name: "casual shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80", filterCategory: "Casual Shirts" },
  { id: "oversized-shirts", name: "oversized shirts", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=300&q=80", filterCategory: "Oversized Shirts" },
  { id: "denim-shirts", name: "denim shirts", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=300&q=80", filterCategory: "Denim Shirts" }
];

const HOODIES_VARIETIES: CategoryCircleItem[] = [
  { id: "all-hoodies", name: "all hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80", filterCategory: "Hoodies" },
  { id: "heavy-hoodies", name: "heavy hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80", filterCategory: "Heavy Hoodies" },
  { id: "zip-up-hoodies", name: "zip-up hoodies", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=300&q=80", filterCategory: "Zip-Up Hoodies" },
  { id: "oversized-hoodies", name: "oversized hoodies", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80", filterCategory: "Oversized Hoodies" },
  { id: "pullover-sweatshirts", name: "sweatshirts", image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=300&q=80", filterCategory: "Sweatshirts" }
];

const EYEWEAR_VARIETIES: CategoryCircleItem[] = [
  { id: "all-eyewear", name: "all eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80", filterCategory: "Eyewear" },
  { id: "street-shades", name: "street shades", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80", filterCategory: "Street Shades" },
  { id: "aviators", name: "aviators", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", filterCategory: "Aviators" }
];

const HEADWEAR_VARIETIES: CategoryCircleItem[] = [
  { id: "all-headwear", name: "all headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80", filterCategory: "Headwear" },
  { id: "snapbacks", name: "snapbacks", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80", filterCategory: "Snapbacks" },
  { id: "dad-caps", name: "dad caps", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=300&q=80", filterCategory: "Dad Caps" },
  { id: "bucket-hats", name: "bucket hats", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80", filterCategory: "Bucket Hats" },
  { id: "beanies", name: "knit beanies", image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=300&q=80", filterCategory: "Knit Beanies" }
];

const BOTTOMS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-bottoms", name: "all bottoms", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=300&q=80", filterCategory: "All Bottoms" },
  { id: "tactical-cargo", name: "tactical cargo", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80", filterCategory: "Tactical Cargo" },
  { id: "track-joggers", name: "track joggers", image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=300&q=80", filterCategory: "Track Joggers" },
  { id: "relaxed-denim", name: "relaxed denim", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80", filterCategory: "Relaxed Denim" },
  { id: "shorts", name: "loose shorts", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80", filterCategory: "Loose Shorts" }
];

const BAGS_VARIETIES: CategoryCircleItem[] = [
  { id: "all-bags", name: "all bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80", filterCategory: "Bags" },
  { id: "tactical-slings", name: "tactical slings", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=300&q=80", filterCategory: "Tactical Slings" },
  { id: "backpacks", name: "backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80", filterCategory: "Backpacks" },
  { id: "wallets-pouches", name: "wallets & pouches", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80", filterCategory: "Wallets" }
];

const SKATEBOARD_VARIETIES: CategoryCircleItem[] = [
  { id: "all-skateboards", name: "all skateboards", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80", filterCategory: "Skateboards" },
  { id: "skateboard-decks", name: "decks", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80", filterCategory: "Decks" },
  { id: "completes", name: "completes", image: "https://images.unsplash.com/photo-1547447134-cd3f5c71752e?auto=format&fit=crop&w=300&q=80", filterCategory: "Completes" },
  { id: "cruisers", name: "cruisers", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=300&q=80", filterCategory: "Cruisers" }
];

interface CategorySelectorProps {
  selectedSubCategory?: string | null;
  onSelectSubCategory?: (categoryName: string | null) => void;
}

// ----------------------------------------------------
// INDIVIDUAL CATEGORY CARD COMPONENT (WITH 3D TILT)
// ----------------------------------------------------
interface CategoryCardProps {
  item: CategoryCircleItem;
  isSelected: boolean;
  isMobile: boolean;
  isCentered: boolean;
  index: number;
  onClick: (e: React.MouseEvent) => void;
}

const CategoryCard = ({ item, isSelected, isMobile, isCentered, index, onClick }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Unsplash cycling images fallback (if the category doesn't have an explicit cycle group, use a repeating list of its main image)
  const cycleImages = useMemo(() => {
    const mainKey = item.id.replace("all-", "");
    if (CATEGORY_CYCLE_IMAGES[mainKey]) {
      return CATEGORY_CYCLE_IMAGES[mainKey];
    }
    // Subcategories use their own main image + 2 related images
    return [
      item.image,
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80"
    ];
  }, [item]);

  // Handle image cycling effect on hover (desktop) or active focus (mobile)
  const shouldCycle = (isHovered && !isMobile) || (isMobile && isCentered);
  useEffect(() => {
    if (!shouldCycle) return;
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleImages.length);
    }, 320); // Suuupply matches roughly 300ms speed
    return () => {
      clearInterval(timer);
      setCycleIndex(0);
    };
  }, [shouldCycle, cycleImages]);

  // 3D Parallax Mouse coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tiltSpringX = useSpring(x, { stiffness: 180, damping: 20 });
  const tiltSpringY = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(tiltSpringY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(tiltSpringX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="flex flex-col items-center flex-shrink-0 w-[110px] sm:w-[130px] group cursor-pointer focus:outline-none select-none text-center"
      style={{ perspective: 800 }}
    >
      {/* 3D Tilted Card Body */}
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
        className={`w-full aspect-[4/5] rounded-[20px] overflow-hidden relative transition-all duration-500 bg-gradient-to-b from-zinc-50/95 to-zinc-100/50 ${
          isSelected
            ? "border border-zinc-950 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12)] scale-[1.03] ring-1 ring-zinc-950/10"
            : "border border-zinc-200/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] group-hover:border-zinc-350 group-hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06),_0_0_20px_rgba(0,0,0,0.01)]"
        }`}
      >
        {/* Editorial Index Number */}
        <span className="absolute top-3.5 left-3.5 z-15 font-mono text-[9.5px] font-bold tracking-wider text-zinc-400 select-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          0{index + 1}
        </span>

        {/* Technical Corner Reticle */}
        <div className="absolute top-4 right-4 z-15 opacity-40 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500 pointer-events-none">
          <svg className="w-1.5 h-1.5 text-zinc-400" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 4h8M4 0v8" />
          </svg>
        </div>

        {/* High-end light reflection sheen sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-25 pointer-events-none" />

        {/* SVG Drawing Illustration (Visible by default) */}
        <div className="absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 z-10 bg-transparent">
          <div className="transform group-hover:scale-108 transition-transform duration-500 ease-out flex items-center justify-center w-full h-full">
            {getCategoryIcon(item.id)}
          </div>
        </div>

        {/* Product Images Slideshow Overlay (Displays on Hover) */}
        <AnimatePresence>
          {shouldCycle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-20 bg-white"
            >
              {cycleImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === cycleIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                  style={{ transitionProperty: "opacity, transform" }}
                >
                  <Image
                    src={src}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 130px, 150px"
                    className="object-cover pointer-events-none"
                    priority={index === 0}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Under-card text label */}
      <div className="mt-3.5 flex flex-col items-center">
        <span
          className="text-[10px] sm:text-[11px] font-mono tracking-[0.15em] uppercase font-bold relative overflow-hidden h-[18px] sm:h-[20px] flex flex-col items-center"
        >
          <span
            className={`transition-transform duration-300 ease-out group-hover:-translate-y-full block ${
              isSelected
                ? "text-zinc-950 font-black"
                : "text-zinc-700 group-hover:text-zinc-400"
            }`}
          >
            {item.name}
          </span>
          <span
            className="absolute transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-zinc-950 font-black block whitespace-nowrap"
          >
            {item.name}
          </span>
        </span>
        
        {/* Underline draw animation from center */}
        <span 
          className={`w-3/5 h-[1.5px] bg-zinc-950 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out mt-1 ${
            isSelected ? "scale-x-100 bg-zinc-950" : ""
          }`}
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MAGNETIC BUTTON HOVER COMPONENT
// ----------------------------------------------------
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

const MagneticButton = ({ children, onClick, ariaLabel }: MagneticButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 18 });
  const springY = useSpring(my, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mx.set((e.clientX - centerX) * 0.35); // 35% magnetic pull strength
    my.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      className="w-11 h-11 rounded-full border border-zinc-200 hover:border-zinc-950 bg-white hover:bg-zinc-950 flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none hover:shadow-md shrink-0 group/btn"
    >
      <span className="flex items-center justify-center select-none leading-none">{children}</span>
    </motion.button>
  );
};

// ----------------------------------------------------
// MAIN CATEGORY SELECTOR COMPONENT
// ----------------------------------------------------
export function CategorySelector({ selectedSubCategory, onSelectSubCategory }: CategorySelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Pre-load all fallback cycling product images on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const preloadImage = (url: string) => {
        const img = new window.Image();
        img.src = url;
      };
      // Loop over and cache images
      Object.values(CATEGORY_CYCLE_IMAGES).flat().forEach(preloadImage);
    }
  }, []);

  // Monitor screen size for mobile view snapping logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 749);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Monitor scrolling to update progress bar and mobile viewport centering
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    // Calculate scroll percentage
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      const percentage = (container.scrollLeft / maxScroll) * 100;
      setScrollProgress(percentage);
    } else {
      setScrollProgress(0);
    }

    // Mobile centering logic
    if (isMobile) {
      const children = container.children;
      const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
      setCenteredIndex(closestIndex);
    }
  }, [isMobile]);

  // Set initial scroll progress when items load or resize
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [circleItems, handleScroll]);

  // Drag-and-scroll kinetic scrolling for desktop (similar to Suuupply mouse drag mechanism)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 3) {
      dragMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDown.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleClickItem = (e: React.MouseEvent, item: CategoryCircleItem) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMoved.current = false;
      return;
    }

    const isAlreadySelected = selectedSubCategory === item.name || selectedSubCategory === item.filterCategory;
    const targetName = isAlreadySelected ? null : item.name;

    if (pathname !== "/shop") {
      const destination = targetName ? `/shop?category=${encodeURIComponent(targetName)}` : "/shop";
      router.push(destination);
      return;
    }

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

  const handleScrollButtonClick = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = 280; // Px per click
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="w-full bg-white border-y border-zinc-100 py-12 md:py-20 overflow-hidden relative">
      {/* Subtle grid background details */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (Inspired by Suuupply minimalist header style) */}
        <div className="flex justify-between items-end border-b border-zinc-200/60 pb-6 mb-10 md:mb-14">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-bold">
                Selected Collections
              </span>
              <span className="h-[1px] w-6 bg-zinc-200"></span>
            </div>
            <h2 className="font-sans font-medium text-[28px] md:text-[36px] text-zinc-950 lowercase tracking-tight leading-none">
              our curation
            </h2>
            <p className="font-sans font-normal text-[13px] md:text-[14px] text-zinc-500 max-w-md mt-1 leading-relaxed">
              A carefully curated collection bringing together the best of each category.
            </p>
          </div>
          
          {/* Custom Arrow Scroll Buttons (Magnetic Attraction) */}
          <div className="flex gap-2.5 z-10">
            <MagneticButton onClick={() => handleScrollButtonClick("left")} ariaLabel="scroll left">
              <svg className="w-4 h-4 text-zinc-700 group-hover/btn:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </MagneticButton>
            <MagneticButton onClick={() => handleScrollButtonClick("right")} ariaLabel="scroll right">
              <svg className="w-4 h-4 text-zinc-700 group-hover/btn:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </MagneticButton>
          </div>
        </div>

        {/* Categories Horizontal Carousel Slider Container */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onScroll={handleScroll}
            className={`w-full flex gap-6 md:gap-12 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing ${
              isMobile
                ? "snap-x snap-mandatory px-[calc(50vw-65px)]"
                : "px-2 justify-start md:justify-around"
            }`}
          >
            {circleItems.map((item, idx) => {
              const isSelected = selectedSubCategory === item.name || selectedSubCategory === item.filterCategory;
              const isCentered = centeredIndex === idx;

              return (
                <div key={item.id} className={isMobile ? "snap-center" : ""}>
                  <CategoryCard
                    item={item}
                    isSelected={isSelected}
                    isMobile={isMobile}
                    isCentered={isCentered}
                    index={idx}
                    onClick={(e) => handleClickItem(e, item)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleek Scroll Progress Bar */}
        <div className="max-w-xs mx-auto mt-10 flex items-center justify-between gap-4 px-4">
          <span className="text-[10px] font-mono text-zinc-400 select-none font-bold">01</span>
          <div className="flex-grow h-[2px] bg-zinc-100 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 left-0 bg-zinc-950 transition-all duration-150 ease-out rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-400 select-none font-bold">
            {circleItems.length < 10 ? `0${circleItems.length}` : circleItems.length}
          </span>
        </div>

      </div>
    </section>
  );
}
