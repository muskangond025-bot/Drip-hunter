"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Brand Teaser Item Data
interface BrandTeaserItem {
  id: number;
  brandName: string;
  title: string;
  image: string;
  tag: string;
}

const brandTeasers: BrandTeaserItem[] = [
  {
    id: 1,
    brandName: "PUMA SELECT",
    title: "The Clyde Capsule",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    tag: "Collab Teaser"
  },
  {
    id: 2,
    brandName: "RECKLESS DRIP",
    title: "Back In Stock Deal",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tag: "Trending"
  },
  {
    id: 3,
    brandName: "NEON DIVISION",
    title: "Cyber Shield Tech",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    tag: "Limited Drop"
  },
  {
    id: 4,
    brandName: "RETRO RULERS",
    title: "Heritage Bomber Kit",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
    tag: "Teaser Product"
  }
];

interface BrandCollabTeasersProps {
  onAddToCart?: (product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    image: string;
  }) => void;
}

// Framer-motion entrance variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function BrandCollabTeasers({ onAddToCart }: BrandCollabTeasersProps = {}) {
  const router = useRouter();

  return (
    <section className="bg-[#FBF9F4] text-[#0A0A0A] py-20 border-t border-b border-[#2B1B17]/10 font-sans select-none">
      
      {/* ==================== 2. BRAND TEASERS SECTION ==================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Awwwards style Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2B1B17]/10 pb-6 mb-12">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#5C4033] uppercase font-black block">
              SEASON PREVIEWS
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#2B1B17] font-heading leading-none">
              Brand <span className="text-[#5C4033]">Teasers</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm font-sans font-medium max-w-sm mt-4 md:mt-0 leading-relaxed text-left md:text-right">
            Exclusive insights, upcoming concepts, and high-fashion previews on the street horizons.
          </p>
        </div>

        {/* Dynamic 4-Column Grid (Editorial Bright Theme) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {brandTeasers.map((teaser) => (
            <motion.div
              key={teaser.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => router.push(`/brand-teaser/${teaser.id}`)}
              className="group relative aspect-[4/5] w-full rounded-[32px] overflow-hidden border border-[#2B1B17]/10 bg-[#FAF6EE] flex flex-col justify-end p-5 cursor-pointer shadow-sm hover:shadow-[0_24px_50px_rgba(43,27,23,0.05)] transition-all duration-500 ease-out select-none text-left"
            >
              {/* Full Card Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={teaser.image}
                  alt={teaser.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-106"
                  priority
                />
                
                {/* Visual Vignette Overlays matching coffee/dark style for high contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/95 via-[#2B1B17]/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none" />
              </div>

              {/* Top Badge (translucent premium badge) */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#FAF6EE]/90 backdrop-blur-md border border-[#2B1B17]/10 px-3.5 py-1.5 rounded-full text-[8px] font-mono tracking-widest text-[#5C4033] font-black uppercase shadow-sm">
                  {teaser.tag}
                </span>
              </div>

              {/* Text Details layered on top of image */}
              <div className="relative z-20 space-y-1 w-full overflow-hidden">
                <span className="text-[9px] text-[#FFE082] font-mono tracking-[0.18em] block uppercase font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {teaser.brandName}
                </span>
                <h3 className="text-base sm:text-lg font-heading font-black uppercase text-white tracking-wider leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transform group-hover:scale-[1.01] transition-transform duration-500 truncate max-w-full">
                  {teaser.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

export default BrandCollabTeasers;
