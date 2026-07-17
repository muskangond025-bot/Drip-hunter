import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  desc?: string;
  image: string;
  gradient?: string;
  badge?: string;
  variant?: "overlay" | "gradient";
  className?: string;
}

export function CategoryCard({
  title,
  desc,
  image,
  gradient = "from-zinc-900 to-neutral-800",
  badge,
  variant = "overlay",
  className,
}: CategoryCardProps) {
  const isOverlay = variant === "overlay";

  if (isOverlay) {
    return (
      <div
        className={cn(
          "bg-zinc-100 rounded-3xl overflow-hidden aspect-[3/4] relative group cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 border border-zinc-200/50 hover:border-black/20",
          className
        )}
      >
        {/* Image */}
        <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover brightness-90 group-hover:brightness-95 transition-all duration-500"
          />
        </div>
        {/* Soft black vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Info Box */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex justify-between items-end text-white select-none">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight font-sans">
              {title}
            </h3>
            {desc && (
              <p className="text-[10px] font-mono text-zinc-300 mt-1 uppercase tracking-wide">
                {desc}
              </p>
            )}
          </div>

          <div className="w-10 h-10 bg-white/20 hover:bg-white hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-xs transition-all hover:scale-105 active:scale-95">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  // Gradient layout
  return (
    <div
      className={cn(
        `bg-gradient-to-b ${gradient} text-white rounded-3xl p-6 flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden group border border-zinc-800 cursor-pointer`,
        className
      )}
    >
      {/* Background Accent Graphics */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute inset-0 z-0 select-none transition-transform duration-500 group-hover:scale-105">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover opacity-25 group-hover:opacity-35 transition-opacity"
        />
      </div>
      <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full w-full select-none">
        {/* Top Bar with Icon Arrow */}
        <div className="flex justify-between items-start">
          {badge ? (
            <span className="text-xs font-mono font-bold tracking-widest bg-black/45 px-2 py-0.5 rounded uppercase">
              {badge}
            </span>
          ) : (
            <div />
          )}
          <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Text info at bottom */}
        <div className="relative z-10 space-y-2 mt-auto">
          <h3 className="text-xl font-chaney-title uppercase tracking-tight">
            {title}
          </h3>
          {desc && (
            <p className="text-xs text-zinc-400 font-mono">
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
