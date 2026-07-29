"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  slogan: string;
  image: string;
  video: string;
  link: string;
  textColorLine1?: string;
  textColorLine2?: string;
}

const brandsData: BrandItem[] = [
  {
    id: "unrl",
    name: "UNRL",
    slogan: "CITY OF SAINTS",
    image: "/images/neo_matrix.png",
    video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c051a8d84451000676472491b10a4e76&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=UNRL",
    textColorLine1: "text-[#FFE082]",
    textColorLine2: "text-[#FFD54F]"
  },
  {
    id: "burberry",
    name: "BURBERRY",
    slogan: "LONDON HERITAGE",
    image: "/images/slay_streets_model.png",
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f5c093a8d9b152d11979ca847424d1264c9d54e&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=BURBERRY",
    textColorLine1: "text-[#EF9A9A]",
    textColorLine2: "text-[#EF5350]"
  },
  {
    id: "stussy",
    name: "STÜSSY",
    slogan: "LAGUNA SURF & STREET",
    image: "/images/retro_chic.png",
    video: "https://player.vimeo.com/external/403816781.sd.mp4?s=d7e35b71db30737a6b8ef981de8fa538e1a6be8b&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=STUSSY",
    textColorLine1: "text-[#80DEEA]",
    textColorLine2: "text-[#26C6DA]"
  },
  {
    id: "essentials",
    name: "ESSENTIALS",
    slogan: "FEAR OF GOD MINIMALISM",
    image: "/images/special_plans.png",
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=8c3a33ca3d41f021e149ef3879ef796ee2b3e839&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=ESSENTIALS",
    textColorLine1: "text-[#CE93D8]",
    textColorLine2: "text-[#AB47BC]"
  },
  {
    id: "bape",
    name: "BAPE",
    slogan: "HARAPEKU CAMOUFLAGE",
    image: "/images/savana_flame_tee.png",
    video: "https://player.vimeo.com/external/482200194.sd.mp4?s=12049e0f119be9e65839062eb1d1bbdcd688849b&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=BAPE",
    textColorLine1: "text-[#C5E1A5]",
    textColorLine2: "text-[#9CCC65]"
  },
  {
    id: "prada",
    name: "PRADA",
    slogan: "MILANO TRADITION",
    image: "/images/deal_banner_1.png",
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f5c093a8d9b152d11979ca847424d1264c9d54e&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=PRADA",
    textColorLine1: "text-[#F48FB1]",
    textColorLine2: "text-[#EC407A]"
  },
  {
    id: "puma",
    name: "PUMA SELECT",
    slogan: "SPORT MEETING STYLE",
    image: "/images/puma_t7_sweatshirt_worn.png",
    video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c051a8d84451000676472491b10a4e76&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=PUMA",
    textColorLine1: "text-[#FFF59D]",
    textColorLine2: "text-[#FBC02D]"
  },
  {
    id: "kith",
    name: "KITH",
    slogan: "ELEVATED UTILITY DESIGN",
    image: "/images/slay_streets_walking.png",
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=8c3a33ca3d41f021e149ef3879ef796ee2b3e839&profile_id=139&oauth2_token_id=57447761",
    link: "/shop?brand=KITH",
    textColorLine1: "text-[#A7FFEB]",
    textColorLine2: "text-[#1DE9B6]"
  }
];

function BrandCard({ brand }: { brand: BrandItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch((err) => {
        console.log("Video auto-play interrupted:", err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsVideoPlaying(false);
      }}
      onClick={() => window.location.href = brand.link}
      className="group relative flex-shrink-0 w-[170px] sm:w-[200px] md:w-[220px] h-[280px] sm:h-[320px] md:h-[350px] rounded-[24px] overflow-hidden border border-[#2B1B17]/15 bg-[#FAF6EE] flex flex-col justify-end p-4 sm:p-5 cursor-pointer shadow-sm hover:shadow-[0_12px_32px_rgba(43,27,23,0.05)] hover:-translate-y-1 transition-all duration-500 ease-out select-none snap-start"
    >
      {/* Background Video (Muted, Loops, Plays Inline) */}
      <video
        ref={videoRef}
        src={brand.video}
        muted
        loop
        playsInline
        onPlaying={() => setIsVideoPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Default Cover Image Overlay (Fades out smoothly on hover only after video starts playing) */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out overflow-hidden ${
          isHovered && isVideoPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 180px"
          priority
        />
      </div>

      {/* Coffee/Black Vignette overlay for text contrast (Always visible on top of video/image) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/95 via-[#2B1B17]/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none" />

      {/* Brand card indicators */}
      <div className="absolute top-4 right-4 z-30 opacity-0 transform translate-x-1.5 -translate-y-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
        <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#2B1B17]/10 flex items-center justify-center text-[#2B1B17] shadow-xs">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Brand text details */}
      <div className="relative z-30 space-y-0.5 text-left w-full overflow-hidden">
        <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-widest block font-bold leading-none mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${brand.textColorLine1 || 'text-white/70'}`}>
          {brand.slogan}
        </span>
        <h3 className={`font-heading font-black text-lg sm:text-xl tracking-wider uppercase leading-none transform group-hover:scale-102 transition-transform duration-500 truncate max-w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${brand.textColorLine2 || 'text-white'}`}>
          {brand.name}
        </h3>
      </div>
    </div>
  );
}

export function BrandShowcase() {
  return (
    <section className="bg-[#FAF6EE] py-20 border-b border-[#2B1B17]/10 select-none w-full overflow-hidden">
      
      {/* Centered Header container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek Header block consistent with brand guidelines */}
        <div className="text-center mb-12 relative">
          <span className="font-mono text-[#5C4033] text-xs uppercase tracking-widest mb-1.5 block">
            Curated Icons
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#2B1B17] font-heading leading-none">
            Featured <span className="text-[#5C4033]">Brands</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#5C4033] mx-auto mt-3" />
        </div>
      </div>

      {/* Edge-to-edge scrollable container */}
      <div className="w-full px-4 sm:px-12 lg:px-20">
        <div className="flex gap-6 overflow-x-auto scrollbar-none pb-8 pt-4 select-none snap-x snap-mandatory scroll-smooth">
          {brandsData.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>

    </section>
  );
}
