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
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#0A0A0A] tracking-tight leading-none">
              Brand Teasers
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
              className="bg-white border border-[#2B1B17]/10 rounded-[28px] p-4 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_40px_rgba(43,27,23,0.03)] transition-all duration-300 cursor-pointer group select-none text-left"
            >
              <div>
                {/* Frame/Container for background image */}
                <div className="relative aspect-[4/5] bg-zinc-50 rounded-[20px] overflow-hidden">
                  <Image
                    src={teaser.image}
                    alt={teaser.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-white/95 backdrop-blur-sm border border-[#2B1B17]/10 px-2.5 py-0.5 rounded-lg text-[8px] font-mono tracking-widest text-[#5C4033] font-black uppercase shadow-xs">
                      {teaser.tag}
                    </span>
                  </div>
                </div>

                {/* Text Details beneath image */}
                <div className="mt-4 space-y-1">
                  <span className="text-[9px] text-[#5C4033] font-mono tracking-widest block uppercase font-black">
                    {teaser.brandName}
                  </span>
                  <h3 className="text-base font-extrabold uppercase text-[#0A0A0A] tracking-tight leading-tight group-hover:text-[#5C4033] transition-colors">
                    {teaser.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Link/Arrow */}
              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-400 group-hover:text-[#5C4033] transition-colors">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest">
                  Explore Drop
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

export default BrandCollabTeasers;
