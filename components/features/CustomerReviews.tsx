"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const reviews = [
  {
    id: 1,
    name: "Brandon K.",
    rating: 5,
    tag: "VERIFIED BUYER",
    comment: "Absolutely in love with the Oversized Cyber Heavy Hoodie. The fabric is extremely thick, fits exactly boxy as described. The custom graphics are holding up perfectly after multiple washes! Will buy again.",
    item: "Purchased: Oversized Cyber Hoodie",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Marcus L.",
    rating: 5,
    tag: "VERIFIED BUYER",
    comment: "These Tech-Cargo Belted Pants are a lifesaver. The adjustable buckle straps make them fit perfectly. I love the tactical pocket layouts. It gives the exact techwear aesthetic I wanted.",
    item: "Purchased: Tech-Cargo Belted Pants",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Sarah T.",
    rating: 5,
    tag: "VERIFIED BUYER",
    comment: "Ordered the Drip Denim Jacket. The wash and distress is high quality. I get compliments every time I wear it. Pockets are roomy, zippers glide smoothly. Highly recommended!",
    item: "Purchased: Drip Denim Utility Jacket",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
];

export function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white text-black py-20 border-t border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <SectionHeader
          subtitle="TESTIMONIALS"
          title="Customer Reviews"
          className="mb-16"
        />

        {/* Carousel Content */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 relative shadow-lg">
          <div className="space-y-6">
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {Array(reviews[activeIndex].rating).fill(0).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="bg-black text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded font-mono ml-2">
                {reviews[activeIndex].tag}
              </span>
            </div>

            {/* Quote Comment */}
            <p className="text-lg sm:text-xl font-medium font-sans italic leading-relaxed text-zinc-900">
              &ldquo;{reviews[activeIndex].comment}&rdquo;
            </p>

            {/* Profile Meta Info */}
            <div className="pt-6 border-t border-zinc-200 flex justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-zinc-300">
                  <Image
                    src={reviews[activeIndex].avatar}
                    alt={reviews[activeIndex].name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <strong className="text-base font-bold uppercase tracking-tight block">
                    {reviews[activeIndex].name}
                  </strong>
                  <span className="text-xs text-zinc-500 font-mono">
                    {reviews[activeIndex].item}
                  </span>
                </div>
              </div>

              {/* Navigation Indicators */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevReview}
                  className="w-10 h-10 border border-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-100 hover:border-black transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextReview}
                  className="w-10 h-10 border border-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-100 hover:border-black transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
