"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Heart, MessageCircle, X, ShoppingBag, Volume2, VolumeX, CheckCircle } from "lucide-react";

const reels = [
  {
    id: 1,
    views: "1.2M views",
    likes: "85K",
    comments: "420",
    text: "Oversized Tee styling tip ✨ #streetwear #drip #fashion",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    bgGradient: "from-purple-900 via-zinc-900 to-black",
    videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf702c2e646271c77f0a6727289efcb59eb1b6&profile_id=165&oauth2_token_id=57447761",
    products: [
      { id: 101, name: "Season Cruise Oversized Tee", price: "$28.00", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=150&q=80" },
      { id: 102, name: "Wide Cargo Pants (Raw Denim)", price: "$45.00", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: 2,
    views: "890K views",
    likes: "62K",
    comments: "310",
    text: "How to style cargo pants for winter ❄️ #utility #cargopants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    bgGradient: "from-amber-950 via-zinc-900 to-black",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f2086e3f05d006c9a35e461a6b0c&profile_id=165&oauth2_token_id=57447761",
    products: [
      { id: 201, name: "Utility Combat Cargo Pants", price: "$49.00", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&q=80" },
      { id: 202, name: "Heavyknit Sweatshirt (Cream)", price: "$39.00", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: 3,
    views: "2.4M views",
    likes: "155K",
    comments: "890",
    text: "Unboxing the limited techwear jacket drop 🔥 #unboxing #cyber",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
    bgGradient: "from-indigo-950 via-zinc-900 to-black",
    videoUrl: "https://player.vimeo.com/external/517602126.sd.mp4?s=d0a1b02b5e28a50e50f5800ec9a35d97f2e1a3bc&profile_id=165&oauth2_token_id=57447761",
    products: [
      { id: 301, name: "Tactical Techwear Jacket", price: "$79.00", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=150&q=80" },
      { id: 302, name: "Cyber Shield Chest Bag", price: "$24.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=150&q=80" }
    ]
  },
  {
    id: 4,
    views: "640K views",
    likes: "48K",
    comments: "150",
    text: "Minimalist cap style collection details 🧢 #minimalist #headwear",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80",
    bgGradient: "from-emerald-950 via-zinc-900 to-black",
    videoUrl: "https://player.vimeo.com/external/340058564.sd.mp4?s=cf9d9b4eb9eddb80fa511fcf26402edc5df1d4f2&profile_id=165&oauth2_token_id=57447761",
    products: [
      { id: 401, name: "Minimalist Palm Tree Cap", price: "$19.00", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=150&q=80" },
      { id: 402, name: "Washed Black Premium Tee", price: "$25.00", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80" }
    ]
  }
];

export function TikTokReels() {
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartNotification(`Added "${productName}" to cart!`);
    setTimeout(() => {
      setCartNotification(null);
    }, 2000);
  };

  const selectedReel = openModalIndex !== null ? reels[openModalIndex] : null;

  return (
    <section className="bg-black text-white py-16 border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest">
              SOCIAL MEDIA FEED
            </span>
            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight mt-2">
              Drip TikToks / Reels
            </h2>
          </div>
          <p className="text-sm font-mono text-zinc-400 max-w-xs uppercase">
            Real lookbooks from real creators in the community. Tap to play.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveReel(idx)}
              onMouseLeave={() => setActiveReel(null)}
              onClick={() => setOpenModalIndex(idx)}
              className={`bg-gradient-to-b ${reel.bgGradient} rounded-3xl overflow-hidden min-h-[440px] relative flex flex-col justify-between p-6 shadow-2xl border border-zinc-800 group cursor-pointer transition-all duration-300 ${
                activeReel === idx ? "scale-102 border-yellow-400" : ""
              }`}
            >
              {/* Fake Video Player Graphic */}
              <div className="absolute inset-0 z-0 select-none transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={reel.image}
                  alt="Reel Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover opacity-35 group-hover:opacity-50 transition-opacity"
                />
              </div>

              {/* Top View Counter */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-black/45 backdrop-blur-sm text-[10px] font-mono tracking-wider px-3 py-1 rounded-full uppercase">
                  {reel.views}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <Play className={`w-3.5 h-3.5 ${activeReel === idx ? "fill-current text-black" : "text-white"}`} />
                </div>
              </div>

              {/* Bottom Interactive Feed Info */}
              <div className="relative z-10 space-y-3 pt-12 bg-gradient-to-t from-black/85 via-black/40 to-transparent -mx-6 -mb-6 p-6">
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-mono">
                  {reel.text}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    {reel.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
                    {reel.comments}
                  </span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click triggers modal twice
                    setOpenModalIndex(idx);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold uppercase text-[10px] py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Shop Outfit Items
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Shoppable Social Video Modal Overlay */}
      {selectedReel && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          
          {/* Modal Container */}
          <div className="bg-[#0e0e10] border border-zinc-800 w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setOpenModalIndex(null)}
              className="absolute top-4 right-4 bg-zinc-950/70 border border-zinc-700 text-white rounded-full p-2.5 hover:bg-yellow-400 hover:text-black hover:border-transparent transition-all z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Video Player */}
            <div className="w-full md:w-[45%] bg-black relative flex items-center justify-center min-h-[350px] md:min-h-[500px]">
              <video
                src={selectedReel.videoUrl}
                className="w-full h-full object-cover absolute inset-0"
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
              />

              {/* Mute/Unmute Floating Button */}
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="absolute bottom-4 left-4 bg-black/50 border border-white/10 text-white rounded-full p-2 hover:bg-white hover:text-black transition-colors z-20 cursor-pointer"
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Live Overlay Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-md uppercase z-20 animate-pulse">
                TAP TO UNMUTE
              </div>
            </div>

            {/* Right Side: Featured Shoppable Outfit Products */}
            <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh] bg-[#121214]">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
                      SHOP THE LOOK
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white mt-1 leading-snug">
                      Outfit Items
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                    {selectedReel.views}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 font-mono mb-6 leading-relaxed">
                  {selectedReel.text}
                </p>

                {/* Products List */}
                <div className="space-y-4">
                  {selectedReel.products.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center justify-between bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-3 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900">
                          <Image 
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-bold text-white leading-tight">
                            {product.name}
                          </h4>
                          <span className="text-yellow-400 font-mono text-xs font-bold block mt-1">
                            {product.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.name)}
                        className="bg-zinc-900 border border-zinc-700 text-white hover:bg-yellow-400 hover:text-black hover:border-transparent text-[10px] font-black uppercase tracking-wider py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Checkout Notice */}
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Likes: {selectedReel.likes}</span>
                  <span>Comments: {selectedReel.comments}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Added to Cart Success Toast Notification */}
          {cartNotification && (
            <div className="fixed bottom-6 right-6 bg-zinc-950 border-2 border-yellow-400 rounded-2xl py-4 px-6 flex items-center gap-3 shadow-2xl z-50 animate-bounce">
              <CheckCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <span className="text-white text-xs font-bold font-mono uppercase block">Success</span>
                <span className="text-zinc-300 text-[10px] font-mono leading-none">{cartNotification}</span>
              </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
}
