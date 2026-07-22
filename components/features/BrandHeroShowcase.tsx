"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { UmenOrbit } from "./UmenOrbit";
import { CollectionShowcase } from "./CollectionShowcase";
import { CollaborationsSection } from "./CollaborationsSection";
import { SlayStreetsSection } from "./SlayStreetsSection";
import { useCarousel } from "@/hooks/useCarousel";

export function BrandHeroShowcase() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroBanners = [
    "/images/brand_hero_new.jpg",
    "/images/collab_header.png",
    "/images/brand_hero_new.jpg",
  ];

  const heroCarousel = useCarousel({
    itemsCount: heroBanners.length,
    autoPlay: true,
    intervalMs: 4000,
  });

  const allBestSellers = [
    { id: 1, name: "Street Oversized Tee", price: "$49.99", image: "/images/bestseller_model_1.png" },
    { id: 2, name: "Urban Cargo Joggers", price: "$69.99", image: "/images/bestseller_model_2.png" },
    { id: 3, name: "Tactical Vest Hoodie", price: "$89.99", image: "/images/bestseller_model_3.png" },
    { id: 4, name: "Graphic Drop Cap", price: "$29.99", image: "/images/bestseller_model_4.png" },
    { id: 5, name: "Vintage Wash Crewneck", price: "$59.99", image: "/images/collab_thumb_2.png" },
    { id: 6, name: "Heavyweight Track Pants", price: "$74.99", image: "/images/collab_thumb_4.png" },
    { id: 7, name: "Embossed Barstool Hoodie", price: "$84.99", image: "/images/collab_bot_2.png" },
    { id: 8, name: "NFL Limited Collab Jacket", price: "$119.99", image: "/images/collection_hero.png" },
  ];

  const bestSellersCarousel = useCarousel({
    itemsCount: Math.ceil(allBestSellers.length / 4),
  });

  const visibleBestSellers = allBestSellers.slice(
    bestSellersCarousel.currentIndex * 4,
    bestSellersCarousel.currentIndex * 4 + 4
  );

  const faqs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full space-y-10 mb-12 select-none">
      {/* Top Label */}
      <div className="text-xs font-bold text-zinc-500 font-mono tracking-wider uppercase pl-1">
        Vendor Info
      </div>

      {/* 1. Top Banner Carousel */}
      <div
        className="space-y-4 relative group"
        onMouseEnter={() => heroCarousel.setIsHovered(true)}
        onMouseLeave={() => heroCarousel.setIsHovered(false)}
      >
        <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 shadow-lg bg-zinc-900">
          <Image
            src={heroBanners[heroCarousel.currentIndex]}
            alt="Streetwear Banner"
            fill
            priority
            className="object-cover transition-opacity duration-500"
          />

          {/* Previous Arrow */}
          <button
            onClick={heroCarousel.prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white hover:text-[#facc15] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={heroCarousel.nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white hover:text-[#facc15] w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer shadow-lg active:scale-95"
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Clickable Overlay for top-right 'Visit Our Website' button */}
          <a
            href="https://www.yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-[28%] max-w-[190px] h-[18%] max-h-[44px] z-20 cursor-pointer rounded-full hover:ring-2 hover:ring-yellow-400/50 transition-all"
            title="Visit Our Website"
            aria-label="Visit Our Website"
          />
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 pt-1">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => heroCarousel.goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                heroCarousel.currentIndex === idx ? "w-6 bg-[#f05a28]" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Slay The Streets / Our Story Section */}
      <SlayStreetsSection />

      {/* 3. Best Sellers Section */}
      <div className="space-y-6 pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-[#facc15] tracking-tight">
          Best Sellers
        </h2>

        <div className="relative flex items-center gap-3 sm:gap-5">
          {/* Left Nav Arrow */}
          <button
            onClick={bestSellersCarousel.prevSlide}
            className="shrink-0 bg-zinc-800 hover:bg-black text-white hover:text-[#facc15] p-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer z-10 border border-zinc-700"
            aria-label="Previous best sellers"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 flex-grow">
            {visibleBestSellers.map((item) => (
              <div
                key={item.id}
                className="bg-[#ebebeb] rounded-2xl sm:rounded-3xl p-4 flex flex-col justify-between border border-zinc-200 shadow-xs hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="block text-zinc-800 font-bold text-xs tracking-wide group-hover:text-[#f05a28] transition-colors">
                    {item.name}
                  </span>
                  <span className="block text-[#f05a28] font-extrabold text-sm tracking-wide">
                    {item.price}
                  </span>
                </div>

                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mt-3 bg-zinc-100/80">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Nav Arrow */}
          <button
            onClick={bestSellersCarousel.nextSlide}
            className="shrink-0 bg-zinc-800 hover:bg-black text-white hover:text-[#facc15] p-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer z-10 border border-zinc-700"
            aria-label="Next best sellers"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Dark Footer / Header & FAQ Container */}
      <div className="bg-[#4e4e50] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-zinc-600/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Header & Paragraphs */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Header
            </h3>

            <div className="space-y-4 text-zinc-300 text-xs sm:text-[13px] leading-relaxed font-normal opacity-90">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed odio morbi quis commodo odio aenean sed adipiscing diam. Bibendum neque egestas congue quisque egestas diam in arcu. Commodo ullamcorper a lacus vestibulum sed arcu non. Condimentum lacinia quis vel eros. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Pellentesque habitant morbi tristique senectus. Pellentesque habitant morbi tristique senectus et netus. Lorem ipsum dolor sit amet, consectetur adipiscing. Porta nibh venenatis cras sed felis eget velit aliquet. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. In cursus turpis massa tincidunt dui ut ornare. In dictum non consectetur a erat nam at. Ut ornare lectus sit amet est placerat. Morbi enim nunc faucibus a pellentesque sit amet. Orci phasellus egestas tellus rutrum.
              </p>
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions* */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#facc15] tracking-tight">
              Frequently Asked Questions*
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#3e3e40] border border-zinc-500/40 rounded-lg overflow-hidden transition-colors"
                >
                  <div
                    onClick={() => toggleFaq(index)}
                    className="p-3.5 sm:p-4 flex justify-between items-center cursor-pointer select-none hover:bg-[#464648]"
                  >
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium pr-2">
                      {faq}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180 text-[#facc15]" : ""
                        }`}
                    />
                  </div>

                  {openFaq === index && (
                    <div className="px-3.5 pb-3.5 text-xs text-zinc-300 font-normal border-t border-zinc-500/20 pt-2 animate-in fade-in duration-200">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. UNRL x NFL Expansion Drop Galaxy Orbit Section */}
      <UmenOrbit brandText="UNRL" title="NFL EXPANSION DROP" subtitle="LIMITED EDITION" />

      {/* 5. Name of Collection Showcase Section */}
      <CollectionShowcase title="Name of Collection" />

      {/* 6. Brand Categories Section */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-[#facc15] tracking-tight">
          Brand Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Office Drip", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=500&q=80" },
            { title: "Street Athletic", img: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=500&q=80" },
            { title: "Urban Commute", img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=500&q=80" },
            { title: "Court Looks", img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=500&q=80" },
          ].map((cat, idx) => (
            <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-zinc-200">
              <Image src={cat.img} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <span className="text-white font-extrabold text-sm uppercase tracking-wider font-mono drop-shadow-sm">
                  {cat.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Collaborations Showcase Section */}
      <CollaborationsSection />
    </div>
  );
}
