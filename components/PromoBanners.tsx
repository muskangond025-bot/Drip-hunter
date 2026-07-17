"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Gift, Tag, Clock } from "lucide-react";

export function PromoBanners() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });

  // Countdown timer logic for a realistic deal ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const deals = [
    {
      title: "DEAL OF THE DAY",
      badge: "LIMITED HOURS",
      desc: "Get an extra 25% off all graphic tees using checkout code:",
      code: "DRIPDAY",
      gradient: "from-indigo-600 to-purple-600",
      textColor: "text-white",
      icon: <Sparkles className="w-6 h-6 text-yellow-300" />,
      action: "Claim Deal",
    },
    {
      title: "DEAL OF THE WEEK",
      badge: "WEEKLY DROPS",
      desc: "Up to 50% off selection of winter hoodies, cargos, and outerwear.",
      code: "DRIPWEEK",
      gradient: "from-rose-600 to-red-700",
      textColor: "text-white",
      icon: <Gift className="w-6 h-6 text-yellow-300" />,
      action: "Shop Collection",
      showTimer: true,
    },
    {
      title: "FLASH WEEKEND SALE",
      badge: "LAUNCHING SOON",
      desc: "Sign up to get early access password to the limited caps and bags drop.",
      code: "DRIPFLASH",
      gradient: "from-amber-500 to-orange-600",
      textColor: "text-white",
      icon: <Tag className="w-6 h-6 text-black" />,
      action: "Register Now",
    },
  ];

  return (
    <section className="bg-zinc-50 border-t border-b border-zinc-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl sm:text-5xl font-chaney-title tracking-tight uppercase">
            Deal Of The Day
          </h2>
          <p className="text-sm font-mono text-zinc-500 max-w-xl mx-auto uppercase">
            Grab these limited-time drop discounts before they lock back in the vault.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${deal.gradient} ${deal.textColor} rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              {/* Background Shapes */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black/25 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                    {deal.badge}
                  </span>
                  {deal.icon}
                </div>

                <h3 className="text-2xl font-chaney-title uppercase leading-tight pt-2">
                  {deal.title}
                </h3>

                <p className="text-sm opacity-90 leading-relaxed max-w-xs">
                  {deal.desc}
                </p>

                <div className="bg-black/15 border border-white/10 rounded-xl p-3 inline-flex items-center gap-2 font-mono text-xs select-all cursor-pointer">
                  <span>CODE:</span>
                  <strong className="text-yellow-300 font-extrabold tracking-wider">{deal.code}</strong>
                </div>

                {/* Countdown Timer if applicable */}
                {deal.showTimer && (
                  <div className="flex items-center gap-2 pt-2">
                    <Clock className="w-4 h-4 text-yellow-300 animate-spin" />
                    <div className="flex items-center gap-1 font-mono text-sm font-black">
                      <span className="bg-black/35 px-2 py-1 rounded">{formatTime(timeLeft.hours)}</span>
                      <span>:</span>
                      <span className="bg-black/35 px-2 py-1 rounded">{formatTime(timeLeft.minutes)}</span>
                      <span>:</span>
                      <span className="bg-black/35 px-2 py-1 rounded">{formatTime(timeLeft.seconds)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button className="w-full bg-white hover:bg-yellow-300 hover:text-black text-black font-extrabold uppercase text-xs tracking-wider py-3.5 rounded-xl transition-all cursor-pointer">
                  {deal.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3, 4, 5].map(dot => (
            <button
              key={dot}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                dot === 2 ? "bg-black w-8" : "bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${dot}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
