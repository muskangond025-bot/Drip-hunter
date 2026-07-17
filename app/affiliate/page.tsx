"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySelector } from "@/components/CategorySelector";
import { 
  Coins, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export default function AffiliatePage() {
  // Navbar states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [loginOpen, setLoginOpen] = useState(false);

  // Carousel states
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1200&q=80", // Teenager with headphones on laptop
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  // FAQ states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Cart / Wishlist Handlers
  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const faqData = [
    {
      q: "How does the Associates Program work?",
      a: "You can share Drip Hunter streetwear catalogs with your audience using custom link generators. When your referrals complete purchases on our store, you earn a 10% commission on the order value."
    },
    {
      q: "How do I qualify for this program?",
      a: "Bloggers, social media influencers, fashion content creators, and publishers with active audiences matching the streetwear demographic are welcome to sign up for instant onboarding reviews."
    },
    {
      q: "How do I earn in this program?",
      a: "You earn commissions on all qualifying sales. Conversion tracking cookies persist for 30 days, giving you credit even if your audience returns later to complete their cart."
    },
    {
      q: "How do I sign up to the program?",
      a: "Click any 'Sign Up' button on this page to log in or create your Drip Hunter store account. Next, navigate to your dashboard settings and check the 'Become an Associate' checkbox to get your affiliate tags."
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      {/* Header */}
      <Navbar 
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
      />

      <main className="flex-grow">
        <CategorySelector />

        {/* Hero Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/affiliate_hero.png"
            alt="Recommend Drip, Earn Ad Fees"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative z-10 text-center px-4 space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-chaney-title text-white tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Recommend Drip, <br /> Earn Ad Fees*
            </h1>
            <div>
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold uppercase tracking-widest text-[10px] sm:text-xs py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-yellow-400/20 hover:scale-102 cursor-pointer"
              >
                Start Today*
              </button>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-950 font-mono">
              Driphunter Associates - Driphunter's affiliate marketing program
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-mono max-w-5xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim, natoque penatibus et magnis dis parturient montes nascetur. Eu lobortis elementum nibh tellus.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white border border-zinc-200 rounded-3xl shadow-xs">
              <div className="w-full h-40 relative mb-4">
                <Image
                  src="/images/step1_signup.png"
                  alt="Step 1: Sign up"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight mb-2">Step 1: Sign up</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono max-w-xs">
                Join our affiliate community instantly. Review custom access keys, onboard with our team, and receive immediate setup approval.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white border border-zinc-200 rounded-3xl shadow-xs">
              <div className="w-full h-40 relative mb-4">
                <Image
                  src="/images/step2_recommend.png"
                  alt="Step 2: Recommend"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight mb-2">Step 2: Recommend</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono max-w-xs">
                Recommend millions of premium streetwear jackets, tees, and cargos to your audience. Access easy linking tools to build referrals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white border border-zinc-200 rounded-3xl shadow-xs">
              <div className="w-full h-40 relative mb-4">
                <Image
                  src="/images/step3_earn.png"
                  alt="Step 3: Earn"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight mb-2">Step 3: Earn</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono max-w-xs">
                Earn up to 10% in advertising fees from qualifying orders. High average cart values maximize your passive profit payout.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Lifestyle Slider Section */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] md:aspect-[2.4/1] w-full rounded-3xl overflow-hidden shadow-sm border border-zinc-200">
            <Image 
              src={slides[currentSlide].image} 
              alt="Streetwear Lifestyle" 
              fill 
              className="object-cover transition-all duration-700 ease-in-out"
              sizes="100vw"
            />
          </div>
          
          {/* Slider Controls */}
          <div className="flex justify-center items-center gap-3 mt-4 text-xs font-mono font-bold text-zinc-400">
            <button 
              onClick={() => setCurrentSlide(0)} 
              className={`cursor-pointer transition-colors ${currentSlide === 0 ? "text-red-500 font-extrabold" : "hover:text-black"}`}
            >
              1
            </button>
            <span className="text-zinc-300">|</span>
            <button 
              onClick={() => setCurrentSlide(1)} 
              className={`cursor-pointer transition-colors ${currentSlide === 1 ? "text-red-500 font-extrabold" : "hover:text-black"}`}
            >
              2
            </button>
          </div>
        </section>

        {/* Text grid: FAQ and Details */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left text panel */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 font-mono">
                Header
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 font-mono leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim, natoque penatibus et magnis dis parturient montes nascetur. Eu lobortis elementum nibh tellus.
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 font-mono leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sint animi vel illum iste unde. Consequatur facilis praesentium possimus, ullam sapiente error architecto! Consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>

            {/* Right FAQ Accordion panel */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-950 font-mono mb-6">
                Frequently Asked Questions*
              </h3>

              <div className="space-y-3 font-mono">
                {faqData.map((item, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
                    >
                      <button 
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-xs uppercase tracking-tight text-zinc-800 cursor-pointer"
                      >
                        <span>{item.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? "max-h-[160px] border-t border-zinc-200" : "max-h-0"
                        }`}
                      >
                        <p className="p-5 text-xs text-zinc-500 leading-relaxed bg-white">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Join Us Banner Section */}
        <section id="join-us" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white border border-zinc-200 rounded-[36px] p-6 sm:p-10 text-black grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center shadow-sm">
            {/* Left side illustration */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100 flex items-center justify-center select-none shadow-sm border border-zinc-100">
              <Image
                src="/images/join_us.png"
                alt="Join Us"
                fill
                className="object-cover"
              />
            </div>

            {/* Content panel on right side */}
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 leading-[1.15]">
                Become an <br />
                Driphunter Affiliate
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-md">
                Start your affiliate journey on Driphunter and become a part of our marketing community.
              </p>

              <div className="pt-2">
                <button 
                  onClick={() => setLoginOpen(true)}
                  className="bg-[#ffd426] hover:bg-[#ebd024] text-black font-extrabold text-sm py-4 px-10 rounded-2xl transition-all shadow-xs cursor-pointer"
                >
                  Sign up*
                </button>
              </div>
              <p className="text-xs text-zinc-500 font-sans font-medium tracking-wide">
                It takes only few minutes to setup your account
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
