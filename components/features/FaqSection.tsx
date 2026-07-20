"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

const faqItems = [
  {
    question: "What makes Drip Hunter different from other façade streetwear brands?",
    answer: "Drip Hunter bridges premium street aesthetics with community-driven limited releases. Each capsule features custom heavyweight fabrics and high-fidelity screenprinted designs."
  },
  {
    question: "Does Drip Hunter offer custom design solutions for unique garments?",
    answer: "Yes, Drip Hunter provides tailored façade streetwear engineering solutions to meet specific fit, fabric, and sizing requirements, ensuring both style silhouette and functional comfort."
  },
  {
    question: "How does Drip Hunter ensure sustainability in its capsule releases?",
    answer: "We utilize organic ring-spun cotton and low-impact dyes. Our drop-model reduces deadstock waste, ensuring both environmental responsibility and premium collector rarity."
  },
  {
    question: "What is your return policy for limited edition drop articles?",
    answer: "We support returns within 14 days for standard releases. However, limited collaborative drops are final sale to preserve capsule rarity and structural collector value."
  }
];

export function FaqSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [defaultIndex, setDefaultIndex] = useState(1); // Second card expanded by default matching Dribbble screenshot

  const activeIndex = hoveredIndex !== null ? hoveredIndex : defaultIndex;

  const handlePrev = () => {
    setDefaultIndex((prev) => (prev - 1 + faqItems.length) % faqItems.length);
  };

  const handleNext = () => {
    setDefaultIndex((prev) => (prev + 1) % faqItems.length);
  };

  return (
    <section className="bg-white py-24 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Navigation controls */}
        <SectionHeader
          subtitle="INFORMATION DESK"
          title="Frequently Asked Questions"
          titleHighlight="Questions"
          titleClassName="font-sans font-bold tracking-tight text-zinc-950"
          description="Project process, fit guides, and technical expertise."
          align="left"
        >
          <div className="flex gap-2">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer bg-white"
              aria-label="Previous question"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#121214] text-white hover:bg-black flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              aria-label="Next question"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </SectionHeader>

        {/* Horizontal Accordion Expandable Grid */}
        <div className="flex flex-col md:flex-row gap-6 w-full items-stretch min-h-[460px] md:h-[460px]">
          {faqItems.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setDefaultIndex(idx)}
                className={cn(
                  "rounded-3xl p-8 flex flex-col justify-end relative cursor-pointer overflow-hidden transition-all duration-600 ease-out border shadow-xs select-none",
                  isActive
                    ? "bg-[#133e7c] border-[#133e7c] text-white shadow-lg"
                    : "bg-[#e8ebed] border-transparent text-[#333d47] hover:bg-[#e0e3e5]"
                )}
                style={{
                  flex: isActive ? "3.5 1 0%" : "1 1 0%"
                }}
              >
                {/* Background active overlay glow */}
                <div 
                  className={cn(
                    "absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full transition-opacity duration-700 pointer-events-none",
                    isActive ? "opacity-100" : "opacity-0"
                  )} 
                />

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  {/* Top Index Indicator */}
                  <span 
                    className={cn(
                      "text-xs font-mono font-bold tracking-widest block uppercase",
                      isActive ? "text-[#a5bcdb]" : "text-zinc-400"
                    )}
                  >
                    0{idx + 1}
                  </span>

                  {/* Question and Answer block */}
                  <div className="mt-12">
                    {/* Question Text */}
                    <h3 
                      className={cn(
                        "font-sans font-bold leading-tight tracking-tight transition-all duration-500",
                        isActive 
                          ? "text-xl sm:text-2xl text-white mb-4" 
                          : "text-base sm:text-[17px] text-[#333d47]"
                      )}
                    >
                      {item.question}
                    </h3>

                    {/* Answer Text - Slide down and Fade Reveal */}
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-550 ease-out",
                        isActive ? "max-h-[220px] opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 translate-y-6 pointer-events-none"
                      )}
                    >
                      <p className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#a5bcdb] max-w-xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
