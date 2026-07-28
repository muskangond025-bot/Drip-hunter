"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, RotateCcw, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onShopTheLook?: (category: string) => void;
  onExploreCollections?: () => void;
}

export function HeroSection({ onShopTheLook, onExploreCollections }: HeroSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Dynamic Google Font Injection
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Montserrat:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Scroll listener to toggle animation state
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      const handleScroll = () => {
        if (window.scrollY > 25) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      // Run once on mount
      handleScroll();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      id="hero"
      className="relative w-full h-[88vh] min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] xl:min-h-[580px] lg:max-h-[850px] flex items-center justify-center overflow-hidden bg-[#051119] text-white select-none pt-12"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Morphing Image Container (Fullscreen Zoom at top/scroll-up -> Shrinks to small preview box on scroll-down) */}
      <div 
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 overflow-hidden shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] select-none pointer-events-none",
          isScrolled 
            ? "w-[240px] h-[310px] sm:w-[320px] sm:h-[420px] rounded-3xl border border-white/5"
            : "w-full h-full rounded-none"
        )}
      >
        <img
          src="/images/hero_models_clean.png"
          alt="Drip Hunter Luxury Campaign Models"
          style={{ objectPosition: "center 15%" }}
          className={cn(
            "w-full h-full object-cover origin-center transition-transform duration-[4000ms] ease-out",
            isScrolled ? "scale-[1.01]" : "scale-[1.05]"
          )}
        />

        {/* Vignette Spotlight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051119]/80 via-transparent to-[#051119]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#051119/70%)]" />
      </div>

      {/* 2. Transition Dark Navy screen overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-[#051119] transition-opacity duration-[1000ms] ease-in-out pointer-events-none z-10",
          isScrolled ? "opacity-35" : "opacity-0"
        )}
      />

      {/* 3. Typography Split Reveal Layer */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
        
        {/* Subtle luxurious serif tagline (positioned independently above the left text baseline to prevent push-up) */}
        <span 
          className={cn(
            "absolute left-[4%] md:left-[6%] lg:left-[8%] xl:left-[10%] top-[33%] md:top-[32%] lg:top-[34%] font-serif italic text-amber-100/70 text-sm md:text-lg transition-all duration-1000 z-20 pointer-events-none",
            isScrolled ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Made from luxurious material
        </span>

        {/* Standalone Left Heading ("STEP BACK") centered on baseline */}
        <h1 
          className={cn(
            "absolute text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] xl:text-[5.2vw] font-black text-[#DFD7C7] tracking-tighter leading-none select-none whitespace-nowrap transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-20 pointer-events-none",
            isScrolled
              ? "left-1/2 -translate-x-[102%] scale-[1.03]"
              : "left-[4%] md:left-[6%] lg:left-[8%] xl:left-[10%] translate-x-0 scale-100"
          )}
          style={{ 
            top: "50%", 
            transform: isScrolled ? "translate(-102%, -50%)" : "translate(0, -50%)",
            fontFamily: "'Bodoni Moda', serif" 
          }}
        >
          STEP BACK
        </h1>

        {/* Standalone Right Heading ("INTO STYLE") centered on baseline */}
        <h1 
          className={cn(
            "absolute text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] xl:text-[5.2vw] font-black text-[#DFD7C7] tracking-tighter leading-none select-none text-right whitespace-nowrap transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-20 pointer-events-none",
            isScrolled
              ? "left-1/2 translate-x-[2%] scale-[1.03]"
              : "right-[4%] md:right-[6%] lg:right-[8%] xl:right-[10%] translate-x-0 scale-100"
          )}
          style={{ 
            top: "50%", 
            transform: isScrolled ? "translate(2%, -50%)" : "translate(0, -50%)",
            fontFamily: "'Bodoni Moda', serif" 
          }}
        >
          INTO STYLE
        </h1>

        {/* Luxury marketing body copy (positioned independently below the left text baseline to prevent push-down) */}
        <p 
          className={cn(
            "absolute left-[4%] md:left-[6%] lg:left-[8%] xl:left-[10%] top-[60%] lg:top-[62%] text-[10px] sm:text-xs text-zinc-300/80 max-w-[240px] md:max-w-[280px] leading-relaxed font-normal transition-all duration-1000 z-20 pointer-events-none",
            isScrolled ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
          )}
        >
          Explore timeless pieces that blend classic elegance with a modern streetwear twist. Embrace iconic styles and discover your perfect look.
        </p>

      </div>

      {/* 4. Luxury E-Commerce Interactive Product Tag - Placed higher inside center gap to prevent viewport bottom crop */}
      <div 
        className={cn(
          "absolute left-1/2 bottom-[18%] md:bottom-[20%] lg:bottom-[22%] xl:bottom-[24%] -translate-x-1/2 z-30 transition-all duration-[1000ms] ease-out pointer-events-auto",
          isScrolled ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
        )}
      >
        <div 
          onClick={() => window.location.href = "/shop"}
          className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 shadow-xl hover:bg-black/85 hover:border-accent/40 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Round Mini Jacket Icon */}
          <div className="relative w-8 h-8 rounded-full bg-[#DFD7C7] overflow-hidden flex items-center justify-center shadow-inner">
            <img 
              src="/images/supreme_flame_tee_red.png" 
              alt="Product thumbnail" 
              className="w-6 h-6 object-contain"
            />
          </div>
          {/* Product Details */}
          <div className="flex flex-col text-left">
            <span className="text-[7px] font-bold text-accent uppercase tracking-widest leading-none">CAMPAIGN HIGHLIGHT</span>
            <span className="text-[10px] font-bold text-white tracking-tight uppercase mt-0.5 leading-none font-sans">FAUX LEATHER COAT</span>
            <span className="text-[8px] font-medium text-zinc-300 font-mono mt-0.5 leading-none">₹8,999</span>
          </div>
          <ArrowRight className="w-3 h-3 text-zinc-400" />
        </div>
      </div>

      {/* 5. Replay Control (Top Right Overlay) */}
      <div 
        className={cn(
          "absolute top-6 right-6 z-30 flex items-center gap-3 transition-opacity duration-1000",
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-70 hover:opacity-100"
        )}
      >
        <button
          onClick={handleReplay}
          aria-label="Replay experience"
          className="flex items-center gap-2 bg-black/40 hover:bg-black/75 border border-white/10 rounded-full px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay Cinematic</span>
        </button>
      </div>

    </section>
  );
}

export default HeroSection;
