"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

interface LiveEvent {
  id: number;
  name: string;
  date: string;
  venue: string;
  image: string;
  buttonText: string;
}

const liveEventsData: LiveEvent[] = [
  {
    id: 1,
    name: "Fashion Show Music Runway",
    date: "24 - 28 OCT 2026",
    venue: "Metropolitan Pavilion, NY",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80",
    buttonText: "Pre Order",
  },
  {
    id: 2,
    name: "Lakme Fashion Week '26",
    date: "12 - 16 NOV 2026",
    venue: "Jio Convention Centre, Mumbai",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
    buttonText: "Pre Order",
  },
  {
    id: 3,
    name: "Paris Street Haute Couture",
    date: "05 - 09 DEC 2026",
    venue: "Palais de Tokyo, Paris",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=80",
    buttonText: "Pre Order",
  },
  {
    id: 4,
    name: "Tokyo Cyberpunk Runway",
    date: "18 - 22 JAN 2027",
    venue: "Shibuya Sky, Tokyo",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    buttonText: "Pre Order",
  },
  {
    id: 5,
    name: "London Avant-Garde Showcase",
    date: "04 - 08 FEB 2027",
    venue: "The Somerset House, London",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
    buttonText: "Pre Order",
  },
];

export function LiveEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [animatingEventId, setAnimatingEventId] = React.useState<number | null>(null);
  const [animationStep, setAnimationStep] = React.useState<'idle' | 'bag-in' | 'drop' | 'fly'>('idle');
  const [flyingItems, setFlyingItems] = React.useState<{ id: string; src: string; startX: number; startY: number; endX: number; endY: number }[]>([]);

  const handlePreOrderClick = (item: LiveEvent, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const buttonEl = e.currentTarget;
    const cardEl = buttonEl.closest(".flex-shrink-0"); // gets the card element container

    // Step 1: Slide up bag overlay
    setAnimatingEventId(item.id);
    setAnimationStep('bag-in');

    // Step 2: Drop image inside bag
    setTimeout(() => {
      setAnimationStep('drop');

      // Step 3: Trigger flying bag animation
      setTimeout(() => {
        setAnimationStep('fly');

        const bagContainer = cardEl?.querySelector(".animate-slide-up-bag");

        if (bagContainer) {
          const rect = bagContainer.getBoundingClientRect();
          const cartEl = document.getElementById("navbar-cart-icon");
          const cartRect = cartEl 
            ? cartEl.getBoundingClientRect() 
            : { left: window.innerWidth - 100, top: 24, width: 40, height: 40 };

          const flightId = Math.random().toString(36).substring(2, 9);
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          const endX = cartRect.left + cartRect.width / 2;
          const endY = cartRect.top + cartRect.height / 2;

          setFlyingItems(prev => [...prev, {
            id: flightId,
            src: "bag",
            startX,
            startY,
            endX,
            endY
          }]);
        }

        const cartIcon = document.getElementById("navbar-cart-icon");
        if (cartIcon) {
          cartIcon.classList.add("animate-bounce");
          setTimeout(() => cartIcon.classList.remove("animate-bounce"), 800);
        }

        // Step 4: Reset card animations after flight finishes
        setTimeout(() => {
          setAnimatingEventId(null);
          setAnimationStep('idle');
        }, 800);

      }, 350);

    }, 350);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 344; // width (320px) + gap (24px)
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-zinc-50 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <SectionHeader
          title="Live Events"
          align="left"
        />

        {/* Carousel Container Wrapper */}
        <div className="relative px-0 sm:px-12">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-[-8px] sm:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-zinc-900 hover:bg-black text-yellow-400 flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer border border-zinc-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-[-8px] sm:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-zinc-900 hover:bg-black text-yellow-400 flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer border border-zinc-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Scrolling Cards Area */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {liveEventsData.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[290px] sm:w-[320px] bg-white border border-zinc-200 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Event Image with rounded top corners to fit parent rounded border */}
                <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden rounded-t-[22px]">
                  
                  {/* Bag Back Layer */}
                  {animatingEventId === item.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center z-5 animate-slide-up-bag">
                      <div className="relative w-36 h-28 bg-[#18181b] rounded-b-xl border border-zinc-800 shadow-inner">
                        {/* Back handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-zinc-700 rounded-t-full" />
                      </div>
                    </div>
                  )}

                  {/* Image Wrapper */}
                  <div
                    className={`w-full h-full transition-all duration-300 z-10 relative ${
                      animatingEventId === item.id && animationStep === "drop" ? "scale-40 translate-y-24 opacity-0" : ""
                    } ${
                      animatingEventId === item.id && animationStep === "bag-in" ? "scale-90" : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 290px, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Bag Front Layer */}
                  {animatingEventId === item.id && (animationStep === "bag-in" || animationStep === "drop") && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center z-15 animate-slide-up-bag">
                      <div className="relative w-36 h-28 bg-[#09090b] rounded-b-xl border-t border-zinc-700 shadow-lg flex flex-col justify-center items-center">
                        {/* Front handle string */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-zinc-600 rounded-t-full" />
                        {/* Gold brand text */}
                        <span className="text-[7px] font-mono text-zinc-500 font-black tracking-widest uppercase mt-4">
                          DRIP HUNTER
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="bg-black/85 backdrop-blur-md text-yellow-400 border border-yellow-400/20 text-[10px] font-black tracking-widest uppercase py-3 px-6 rounded-full flex items-center gap-1.5 shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-350 ease-out">
                      Get Tickets
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* White Ticket Box */}
                <div className="relative bg-white p-5 border-t border-dashed border-zinc-200 flex flex-col gap-4">
                  {/* Perforation Notches */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-zinc-50 rounded-full border-r border-zinc-200 z-10" />
                  <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-zinc-50 rounded-full border-l border-zinc-200 z-10" />

                  {/* Title */}
                  <h3 className="text-base font-bold text-zinc-950 uppercase tracking-tight line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Details block */}
                  <div className="flex flex-col gap-2">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-zinc-600 font-mono font-medium">
                        {item.date}
                      </span>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-zinc-600 font-mono font-medium truncate">
                        {item.venue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pre Order Button with rounded bottom corners */}
                <button 
                  onClick={(e) => handlePreOrderClick(item, e)}
                  className="w-full bg-zinc-900 hover:bg-black text-yellow-400 text-xs font-black uppercase tracking-widest py-4 transition-colors cursor-pointer border-t border-zinc-800 rounded-b-[22px]"
                >
                  {item.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic styles injected for flight path coordinates */}
      <style>{`
        @keyframes flyItemToCart {
          0% {
            transform: translate(0, 0) scale(1.0) rotate(0deg);
            opacity: 1;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
          }
          50% {
            opacity: 0.85;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0.08) rotate(180deg);
            opacity: 0.05;
            filter: drop-shadow(0 0px 0px rgba(0,0,0,0));
          }
        }
        .animate-flying-item {
          animation: flyItemToCart 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes slideUpBag {
          0% { transform: translateY(120px) scale(0.8); }
          60% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-slide-up-bag {
          animation: slideUpBag 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Fly-to-Cart Portal Overlay */}
      {flyingItems.map(item => {
        const dx = item.endX - item.startX;
        const dy = item.endY - item.startY;
        return (
          <div
            key={item.id}
            className="animate-flying-item"
            onAnimationEnd={() => setFlyingItems(prev => prev.filter(f => f.id !== item.id))}
            style={{
              position: "fixed",
              left: item.startX - 24, // centers 48px frame
              top: item.startY - 24,
              width: "48px",
              height: "48px",
              zIndex: 99999,
              pointerEvents: "none",
              "--dx": `${dx}px`,
              "--dy": `${dy}px`
            } as any}
          >
            <div className="relative w-12 h-12 flex flex-col justify-end">
              {/* Loop handles */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 border border-zinc-600 rounded-t-full" />
              {/* Bag Body */}
              <div className="w-12 h-9 bg-[#0d0d0d] rounded-b-md border-t border-zinc-700 shadow-lg flex flex-col items-center justify-center">
                <span className="text-[3px] font-mono text-zinc-550 font-extrabold tracking-widest">DRIP</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
