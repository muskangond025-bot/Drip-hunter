"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, X, ChevronRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { RetroTechBanner } from "@/components/common/RetroTechBanner";

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

export default function SubscriptionPage() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [authInput, setAuthInput] = useState("");
  const [authError, setCodeError] = useState("");
  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"Basic" | "Super" | "Premium">("Super");
  const [viewStyle, setViewStyle] = useState<"cards" | "comparison">("cards");

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-cart");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drip-wishlist");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isRegistered") === "true";
      setIsRegistered(loggedIn);

      const handleAuthChange = () => {
        setIsRegistered(localStorage.getItem("isRegistered") === "true");
      };
      window.addEventListener("auth-change", handleAuthChange);
      return () => window.removeEventListener("auth-change", handleAuthChange);
    }
  }, []);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput.trim()) {
      setCodeError("Please enter a valid mobile number or email.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("registeredEmail", authInput);
      setIsRegistered(true);
      window.dispatchEvent(new Event("auth-change"));
    }
  };

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

  const prices = {
    Basic: { monthly: "₹0.00", yearly: "₹0.00" },
    Super: { monthly: "₹149", yearly: "₹1,499" },
    Premium: { monthly: "₹219", yearly: "₹2,199" },
  };

  const handleSubscribe = (planName: "Basic" | "Super" | "Premium") => {
    setSelectedPlan(planName);
    alert(`🎉 Welcome to Drip Hunter ${planName} VIP Membership! Your benefits are active.`);
  };

  if (isRegistered === null) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between text-white selection:bg-[#facc15] selection:text-black font-sans select-none">
      {/* Header Navbar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSearchCategory}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        
        {/* IF NOT LOGGED IN: SHOW AMAZON-STYLE SIGN IN OR CREATE ACCOUNT CARD */}
        {!isRegistered ? (
          <div className="min-h-[75vh] flex flex-col justify-center items-center py-10 px-4 bg-white text-zinc-900">
            <div className="relative bg-white rounded-[24px] shadow-2xl border border-zinc-200/80 max-w-[420px] w-full p-8 md:p-10 flex flex-col justify-center my-auto animate-fadeIn">
              {/* Close Button redirects to Home */}
              <a 
                href="/"
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </a>

              {/* Brand Title / Logo Header */}
              <div className="text-center mb-6">
                <a href="/" className="font-chaney-title text-2xl tracking-tight text-black inline-block">
                  DRIP HUNTER
                </a>
              </div>

              {/* Amazon-style Form Box */}
              <div className="border border-zinc-200/80 rounded-2xl p-6 shadow-xs bg-white text-left">
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-4">
                  Sign in or create account
                </h2>

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                      Enter mobile number or email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mobile number or email"
                      value={authInput}
                      onChange={(e) => {
                        setAuthInput(e.target.value);
                        setCodeError("");
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    {authError && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 block">
                        {authError}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#facc15] hover:bg-yellow-400 text-black font-bold text-sm py-3 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 border border-yellow-500"
                  >
                    Continue
                  </button>

                  <p className="text-[11px] text-zinc-500 leading-relaxed pt-2">
                    By continuing, you agree to Drip Hunter&apos;s{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">Conditions of Use</a> and{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">Privacy Notice</a>.
                  </p>
                </form>

                <div className="border-t border-zinc-100 mt-6 pt-4 text-xs">
                  <span className="font-bold text-zinc-800">Buying for business?</span>
                  <a href="/brands" className="block text-blue-600 hover:underline mt-0.5">
                    Create a free vendor account &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* IF LOGGED IN: STANDALONE FULL-WIDTH SUBSCRIPTION PAGE (ORIGINAL DESIGN) */
          <div>
            {/* View Switcher Bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 py-3 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#facc15]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    VIP Membership Plans
                  </span>
                </div>

                <div className="flex items-center bg-zinc-800 p-1 rounded-xl border border-zinc-700">
                  <button
                    onClick={() => setViewStyle("cards")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewStyle === "cards"
                        ? "bg-[#facc15] text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Cards View
                  </button>
                  <button
                    onClick={() => setViewStyle("comparison")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewStyle === "comparison"
                        ? "bg-[#facc15] text-black shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Comparison Matrix
                  </button>
                </div>
              </div>
            </div>

            {/* CARDS VIEW (Image 1 Matching: Bright Yellow Theme with Blue Cards) */}
            {viewStyle === "cards" && (
              <div className="bg-[#ffd500] text-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 min-h-[80vh] flex flex-col justify-center items-center">
                <div className="max-w-5xl mx-auto w-full text-center space-y-8">
                  
                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase font-sans">
                    Subscribe now, for more benefits*
                  </h1>

                  {/* Monthly / Yearly Toggle */}
                  <div className="flex items-center justify-center gap-4 text-sm font-bold font-sans">
                    <span className={billingCycle === "monthly" ? "text-black font-extrabold" : "text-black/70"}>
                      Monthly
                    </span>

                    <button
                      onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                      className="w-14 h-7 bg-blue-700 rounded-full p-1 flex items-center transition-all cursor-pointer relative shadow-inner"
                      aria-label="Toggle Billing Cycle"
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                          billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"
                        }`}
                      />
                    </button>

                    <span className={billingCycle === "yearly" ? "text-black font-extrabold" : "text-black/70"}>
                      Yearly <span className="text-[10px] bg-black text-[#ffd500] px-1.5 py-0.5 rounded font-mono uppercase font-black">Save 20%</span>
                    </span>
                  </div>

                  {/* 3 Pricing Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end pt-4">
                    
                    {/* 1. Basic Card */}
                    <div className="bg-[#4f46e5] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-indigo-400/30 text-left min-h-[420px] transition-transform hover:-translate-y-1">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold font-sans">Basic</h3>
                          <div className="text-4xl font-black tracking-tight mt-2 font-mono">
                            {prices.Basic[billingCycle]}
                          </div>
                        </div>

                        <ul className="space-y-3.5 text-xs sm:text-sm font-medium">
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Welcome offer on first purchase</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>2x points on all orders in your Birthday Month</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Exclusive Partner Perks</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleSubscribe("Basic")}
                          className="w-full bg-white hover:bg-zinc-100 text-black font-extrabold text-sm py-3.5 rounded-2xl transition-all cursor-pointer shadow-md active:scale-95 border-none"
                        >
                          Get Started Now
                        </button>
                      </div>
                    </div>

                    {/* 2. Super Card (Middle Featured) */}
                    <div className="bg-[#4338ca] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-2 border-white/40 text-left min-h-[490px] relative transition-transform hover:-translate-y-1">
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-[#ffd500] font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full border border-yellow-400 font-mono shadow-md">
                        MOST POPULAR
                      </div>

                      <div className="space-y-6 pt-2">
                        <div className="text-center">
                          <h3 className="text-xl font-bold font-sans">Super</h3>
                          <div className="text-4xl sm:text-5xl font-black tracking-tight mt-2 font-mono">
                            {prices.Super[billingCycle]}
                          </div>
                        </div>

                        <ul className="space-y-3 text-xs sm:text-sm font-medium">
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Welcome offer on first purchase</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Early access to sales</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>2x points on orders in your Birthday Month</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Special Birthday Benefit</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Welcome gift when you reach Super</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Exclusive Partner Perks</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleSubscribe("Super")}
                          className="w-full bg-white hover:bg-zinc-100 text-black font-extrabold text-sm py-3.5 rounded-2xl transition-all cursor-pointer shadow-md active:scale-95 border-none"
                        >
                          Get Started Now
                        </button>
                      </div>
                    </div>

                    {/* 3. Premium Card */}
                    <div className="bg-[#4f46e5] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-indigo-400/30 text-left min-h-[510px] transition-transform hover:-translate-y-1">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold font-sans">Premium</h3>
                          <div className="text-4xl sm:text-5xl font-black tracking-tight mt-2 font-mono">
                            {prices.Premium[billingCycle]}
                          </div>
                        </div>

                        <ul className="space-y-3 text-xs sm:text-sm font-medium">
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Welcome offer on first purchase</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Early access to sales</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>2x points on orders in your Birthday Month</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Special Birthday Benefit</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Welcome gift when you reach Premium</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Surprise experience</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </span>
                            <span>Exclusive Partner Perks</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleSubscribe("Premium")}
                          className="w-full bg-white hover:bg-zinc-100 text-black font-extrabold text-sm py-3.5 rounded-2xl transition-all cursor-pointer shadow-md active:scale-95 border-none"
                        >
                          Get Started Now
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* COMPARISON MATRIX VIEW (Image 2 Matching: Dark Mode Matrix) */}
            {viewStyle === "comparison" && (
              <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
                <div className="max-w-5xl mx-auto space-y-10">
                  
                  {/* Title */}
                  <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#facc15] uppercase">
                      Subscribe now*
                    </h1>
                  </div>

                  {/* Comparison Table Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 items-stretch">
                    
                    {/* Column 1: Features Header List */}
                    <div className="bg-white text-black rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                      <div>
                        <h3 className="text-xl font-black text-blue-700 pb-4 border-b border-zinc-200">
                          Features
                        </h3>
                        <div className="divide-y divide-zinc-100 text-xs font-bold leading-relaxed pt-2">
                          <div className="py-3">Welcome offer on first purchase</div>
                          <div className="py-3 flex items-center justify-between">
                            <span>Early access to sales</span>
                            <span className="bg-blue-700 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                              Most Popular
                            </span>
                          </div>
                          <div className="py-3">2x points on orders in your Birthday Month</div>
                          <div className="py-3">Special Birthday Benefit</div>
                          <div className="py-3">Welcome gift when you reach XYZ</div>
                          <div className="py-3">Surprise experience</div>
                          <div className="py-3">Exclusive Partner Perks</div>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Basic */}
                    <div className="bg-white text-black rounded-3xl p-6 flex flex-col justify-between shadow-lg text-center">
                      <div>
                        <h3 className="text-xl font-black text-blue-700 pb-4 border-b border-zinc-200">
                          Basic
                        </h3>
                        <div className="divide-y divide-zinc-100 text-lg pt-2">
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-zinc-400 font-bold">✕</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-zinc-400 font-bold">✕</div>
                          <div className="py-2.5 flex justify-center text-zinc-400 font-bold">✕</div>
                          <div className="py-2.5 flex justify-center text-zinc-400 font-bold">✕</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Super (Highlighted Yellow) */}
                    <div className="bg-[#facc15] text-black rounded-3xl p-6 flex flex-col justify-between shadow-2xl text-center transform scale-102 border-2 border-yellow-300">
                      <div>
                        <h3 className="text-xl font-black text-blue-900 pb-4 border-b border-black/10">
                          Super
                        </h3>
                        <div className="divide-y divide-black/10 text-lg pt-2">
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black/40 font-bold">✕</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                        </div>
                      </div>
                    </div>

                    {/* Column 4: Premium */}
                    <div className="bg-white text-black rounded-3xl p-6 flex flex-col justify-between shadow-lg text-center">
                      <div>
                        <h3 className="text-xl font-black text-blue-700 pb-4 border-b border-zinc-200">
                          Premium
                        </h3>
                        <div className="divide-y divide-zinc-100 text-lg pt-2">
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                          <div className="py-2.5 flex justify-center text-black font-bold">✓</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Toggle & Plan Cards Container */}
                  <div className="pt-6 space-y-6">
                    
                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center justify-center gap-4 text-sm font-bold">
                      <span className={billingCycle === "monthly" ? "text-white" : "text-zinc-400"}>
                        Monthly
                      </span>
                      <button
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                        className="w-14 h-7 bg-blue-700 rounded-full p-1 flex items-center transition-all cursor-pointer relative shadow-inner"
                        aria-label="Toggle Billing Cycle"
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className={billingCycle === "yearly" ? "text-white" : "text-zinc-400"}>
                        Yearly
                      </span>
                    </div>

                    {/* 3 Selectable Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Basic Selectable Card */}
                      <div
                        onClick={() => setSelectedPlan("Basic")}
                        className={`bg-white text-black p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                          selectedPlan === "Basic"
                            ? "border-[#facc15] shadow-lg scale-102 ring-2 ring-yellow-400"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="text-sm font-bold text-zinc-600">Basic</div>
                        <div className="text-2xl font-black mt-1 font-mono">
                          ₹0.00<span className="text-xs font-normal text-zinc-500">/Month</span>
                        </div>
                      </div>

                      {/* Super Selectable Card */}
                      <div
                        onClick={() => setSelectedPlan("Super")}
                        className={`bg-white text-black p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                          selectedPlan === "Super"
                            ? "border-[#facc15] shadow-lg scale-102 ring-2 ring-yellow-400"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="text-sm font-extrabold text-[#f05a28]">Super</div>
                        <div className="text-2xl font-black mt-1 font-mono">
                          ₹149<span className="text-xs font-normal text-zinc-500">/Month</span>
                        </div>
                        <div className="text-[10px] font-mono mt-1 text-zinc-400">
                          <span className="line-through">₹199</span>{" "}
                          <span className="text-blue-600 font-bold">₹50 OFF</span>
                        </div>
                      </div>

                      {/* Premium Selectable Card */}
                      <div
                        onClick={() => setSelectedPlan("Premium")}
                        className={`bg-white text-black p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                          selectedPlan === "Premium"
                            ? "border-[#facc15] shadow-lg scale-102 ring-2 ring-yellow-400"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="text-sm font-bold text-zinc-600">Premium</div>
                        <div className="text-2xl font-black mt-1 font-mono">
                          ₹219<span className="text-xs font-normal text-zinc-500">/Month</span>
                        </div>
                      </div>

                    </div>

                    {/* Continue CTA Button */}
                    <div className="pt-2 max-w-md mx-auto">
                      <button
                        onClick={() => handleSubscribe(selectedPlan)}
                        className="w-full bg-[#0052cc] hover:bg-[#0043a8] text-[#facc15] font-extrabold text-sm sm:text-base py-4 rounded-xl transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 uppercase tracking-wide border-none active:scale-95"
                      >
                        Continue with {selectedPlan} <ChevronRight className="w-5 h-5 stroke-[3]" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Social Banner & Footer */}
      <RetroTechBanner />
      <Footer />
    </div>
  );
}
