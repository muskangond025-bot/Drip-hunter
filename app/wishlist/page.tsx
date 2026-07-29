"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/ui/product-card";
import { Heart, X, User, ShoppingBag, Check, Save, LogOut, Sparkles } from "lucide-react";
import { MixMatchCreator } from "@/components/features/MixMatchCreator";
import { motion, AnimatePresence } from "framer-motion";

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

export default function WishlistPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  // Registration & User states
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null); // null during hydration
  const [authScreen, setAuthScreen] = useState<'register' | 'verify'>('register');
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // Tab Dashboard State
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "subscription">("wishlist");

  // Subscription inner states
  const [subBillingCycle, setSubBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [subSelectedPlan, setSubSelectedPlan] = useState<"Basic" | "Super" | "Premium">("Super");
  const [subViewStyle, setSubViewStyle] = useState<"cards" | "comparison">("cards");

  // Subscription states
  const [activeSubscription, setActiveSubscription] = useState<string | null>(null);
  const [subSuccessModalOpen, setSubSuccessModalOpen] = useState(false);
  const [subSuccessPlan, setSubSuccessPlan] = useState("");

  // Review states
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewItemName, setReviewItemName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const handleSubscribe = (planName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user-subscription", planName);
    }
    setActiveSubscription(planName);
    setSubSuccessPlan(planName);
    setSubSuccessModalOpen(true);
  };

  const handleCancelSubscription = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-subscription");
    }
    setActiveSubscription(null);
    alert("Subscription cancelled successfully.");
  };

  // Profile fields state
  const [profileFirstName, setProfileFirstName] = useState("Drip");
  const [profileLastName, setProfileLastName] = useState("Hunter");
  const [profileEmail, setProfileEmail] = useState("user@driphunter.com");
  const [profileMobile, setProfileMobile] = useState("+1 234 567 8900");
  const [profileGender, setProfileGender] = useState("Male");

  // Load state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check registration state
      const loggedIn = localStorage.getItem("isRegistered") === "true";
      setIsRegistered(loggedIn);
      
      const email = localStorage.getItem("registeredEmail") || "user@driphunter.com";
      setProfileEmail(email);

      // Read current tab parameter
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "profile" || tabParam === "orders" || tabParam === "wishlist" || tabParam === "subscription") {
        setActiveTab(tabParam as any);
      }

      // 2. Load cart and wishlist from localStorage
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }

      // Load user subscription
      const savedSub = localStorage.getItem("user-subscription");
      if (savedSub) {
        setActiveSubscription(savedSub);
      }

      // 3. Listen to auth changes
      const handleAuthChange = () => {
        const loggedInNow = localStorage.getItem("isRegistered") === "true";
        setIsRegistered(loggedInNow);
        if (loggedInNow) {
          const freshEmail = localStorage.getItem("registeredEmail") || "user@driphunter.com";
          setProfileEmail(freshEmail);
        }
      };

      // 4. Periodically poll query parameter tab transitions
      const interval = setInterval(() => {
        const activeParams = new URLSearchParams(window.location.search);
        const activeTabParam = activeParams.get("tab");
        if (activeTabParam === "profile" || activeTabParam === "orders" || activeTabParam === "wishlist" || activeTabParam === "subscription") {
          setActiveTab(activeTabParam as any);
        }
      }, 400);

      window.addEventListener("auth-change", handleAuthChange);
      return () => {
        window.removeEventListener("auth-change", handleAuthChange);
        clearInterval(interval);
      };
    }
  }, []);

  // Save cart & wishlist state changes
  useEffect(() => {
    if (typeof window !== "undefined" && isRegistered !== null) {
      localStorage.setItem("drip-cart", JSON.stringify(cart));
    }
  }, [cart, isRegistered]);

  useEffect(() => {
    if (typeof window !== "undefined" && isRegistered !== null) {
      localStorage.setItem("drip-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isRegistered]);

  // Cart & Wishlist actions
  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const handleTabChange = (tab: "profile" | "orders" | "wishlist" | "subscription") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/wishlist?tab=${tab}`);
    }
  };

  const handleLogOutSimulate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "false");
      window.dispatchEvent(new Event("auth-change"));
      alert("Logged out successfully!");
      window.location.href = "/";
    }
  };

  if (isRegistered === null) {
    return <div className="min-h-screen bg-background" />; // Avoid hydration flicker
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none">
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
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center items-center py-10 px-4 md:py-16">
        {!isRegistered ? (
          /* Authentication/Register card centered in full screen width */
          <div className="relative bg-white rounded-[24px] shadow-2xl border border-zinc-100 max-w-[420px] w-full p-8 md:p-10 flex flex-col justify-center animate-fade-in-up my-auto">
            {/* Close Button redirects to Home Page */}
            <a 
              href="/"
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </a>

            {authScreen === 'register' && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setAuthScreen('verify');
                  setCodeError("");
                }}
              >
                <h2 className="text-3xl font-bold text-zinc-800 tracking-tight leading-none text-left">Register</h2>
                <p className="text-[13px] text-zinc-500 text-center mt-6 mb-8 font-medium">
                  Please fill in the information below:
                </p>

                <div className="space-y-4 mb-6">
                  <input 
                    type="text" 
                    required 
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg px-4 py-3.5 text-sm bg-white outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-400 text-zinc-800"
                  />
                  <input 
                    type="text" 
                    required 
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg px-4 py-3.5 text-sm bg-white outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-400 text-zinc-800"
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg px-4 py-3.5 text-sm bg-white outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-400 text-zinc-800"
                  />
                  <input 
                    type="password" 
                    required 
                    placeholder="Password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg px-4 py-3.5 text-sm bg-white outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-400 text-zinc-800"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#2a2a2a] hover:bg-black text-[#ebd26b] font-bold text-sm py-4 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Create My Account
                </button>
              </form>
            )}

            {authScreen === 'verify' && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!verificationCode.trim()) {
                    setCodeError("Code can't be blank. Enter the authentication code sent to your email.");
                    return;
                  }
                  alert("Account created and logged in successfully!");
                  if (typeof window !== "undefined") {
                    localStorage.setItem("isRegistered", "true");
                    localStorage.setItem("registeredEmail", authEmail || "user@driphunter.com");
                    window.dispatchEvent(new Event("auth-change"));
                  }
                  setIsRegistered(true);
                }}
              >
                <h2 className="text-3xl font-bold text-zinc-800 tracking-tight leading-none text-left">Enter Code</h2>
                <p className="text-[13px] text-zinc-500 text-left mt-2 mb-6 font-medium">
                  Sent to {authEmail || "abcd123@gmail.com"}
                </p>

                <div className="relative mb-3">
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="6-digit code"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (e.target.value.trim() !== "") {
                        setCodeError("");
                      }
                    }}
                    className="w-full border border-zinc-200 rounded-lg pl-4 pr-20 py-3.5 text-sm bg-white outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-400 text-zinc-800"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      alert("Code verified successfully! (Simulation)");
                      setCodeError("");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-800 hover:text-black cursor-pointer bg-transparent border-none p-0"
                  >
                    Verify
                  </button>
                </div>

                {codeError && (
                  <div className="flex items-center gap-2 mb-6 text-left">
                    <div className="w-4 h-4 rounded-full bg-[#ff5252] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                      !
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">
                      {codeError}
                    </p>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-[#2a2a2a] hover:bg-black text-[#ebd26b] font-bold text-sm py-4 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Create My Account
                </button>

                <div className="text-center mt-6 space-y-4">
                  <div>
                    <button 
                      type="button" 
                      onClick={() => {
                        setAuthScreen('register');
                        setCodeError("");
                      }} 
                      className="text-xs text-zinc-500 hover:text-black font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Log in with a different email
                    </button>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Privacy Policy (Simulation)");
                      }}
                      className="text-xs text-zinc-400 hover:text-black font-medium cursor-pointer"
                    >
                      Privacy
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Profile Account Dashboard (if logged in) */
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 select-none">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              
              {/* Left Sidebar Menu */}
              <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                
                {/* Profile card summary */}
                <div className="bg-zinc-50 border border-zinc-200/70 rounded-2xl p-5 text-center flex flex-col items-center gap-2.5">
                  <div className="w-14 h-14 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-650 text-xl font-bold uppercase border border-zinc-300">
                    {profileFirstName.charAt(0)}{profileLastName.charAt(0)}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-black text-zinc-900 font-sans tracking-tight">
                      {profileFirstName} {profileLastName}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-400 mt-0.5 truncate max-w-[180px]">
                      {profileEmail}
                    </p>
                  </div>
                </div>

                {/* Sidebar Navigation buttons */}
                <div className="flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-3xs">
                  <button
                    onClick={() => handleTabChange("profile")}
                    className={`flex items-center gap-3 px-5 py-4 text-xs font-semibold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activeTab === "profile" ? "bg-zinc-950 text-white font-bold" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  
                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`flex items-center gap-3 px-5 py-4 text-xs font-semibold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activeTab === "orders" ? "bg-zinc-950 text-white font-bold" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" /> Orders
                  </button>

                  <button
                    onClick={() => handleTabChange("wishlist")}
                    className={`flex items-center gap-3 px-5 py-4 text-xs font-semibold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activeTab === "wishlist" ? "bg-zinc-950 text-white font-bold" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <Heart className="w-4 h-4" /> Wishlist
                  </button>

                  <button
                    onClick={() => handleTabChange("subscription")}
                    className={`flex items-center justify-between px-5 py-4 text-xs font-semibold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activeTab === "subscription" ? "bg-zinc-950 text-white font-bold" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-yellow-400" /> Subscription</span>
                    <span className="text-[9px] bg-[#facc15] text-black font-black px-1.5 py-0.5 rounded font-mono uppercase">VIP</span>
                  </button>

                  <button
                    onClick={handleLogOutSimulate}
                    className="flex items-center gap-3 px-5 py-4 text-xs font-semibold tracking-wider uppercase text-left text-red-500 hover:bg-red-50 hover:text-red-750 transition-all cursor-pointer bg-white border-none"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>

              </div>

              {/* Right Panel Body Content */}
              <div className="flex-grow bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 min-h-[520px] w-full text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    
                    {/* TAB: MY PROFILE */}
                    {activeTab === "profile" && (
                      <div className="space-y-6">
                        <div className="border-b border-zinc-100 pb-4">
                          <h1 className="text-xl font-black uppercase tracking-wider text-zinc-950 font-mono">
                            My Profile
                          </h1>
                          <p className="text-xs text-zinc-400 mt-1 font-sans">
                            Manage and update your personal details and settings.
                          </p>
                        </div>

                        <form onSubmit={(e) => {
                          e.preventDefault();
                          alert("Profile updated successfully!");
                        }} className="space-y-5 max-w-xl">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase text-zinc-400">First Name</label>
                              <input 
                                type="text"
                                value={profileFirstName}
                                onChange={(e) => setProfileFirstName(e.target.value)}
                                className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase text-zinc-400">Last Name</label>
                              <input 
                                type="text"
                                value={profileLastName}
                                onChange={(e) => setProfileLastName(e.target.value)}
                                className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase text-zinc-400">Email Address</label>
                              <input 
                                type="email"
                                value={profileEmail}
                                onChange={(e) => setProfileEmail(e.target.value)}
                                className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase text-zinc-400">Mobile Number</label>
                              <input 
                                type="text"
                                value={profileMobile}
                                onChange={(e) => setProfileMobile(e.target.value)}
                                className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase text-zinc-400 block mb-1">Gender</label>
                            <div className="flex gap-4">
                              {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-700">
                                  <input 
                                    type="radio" 
                                    name="gender" 
                                    value={g} 
                                    checked={profileGender === g}
                                    onChange={() => setProfileGender(g)}
                                    className="accent-black w-4 h-4"
                                  />
                                  <span>{g}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <button
                              type="submit"
                              className="bg-zinc-955 bg-zinc-950 text-[#ebd26b] font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center gap-2 border-none" style={{ background: '#09090b' }}
                            >
                              <Save className="w-4 h-4" /> Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* TAB: ORDERS */}
                    {activeTab === "orders" && (
                      <div className="space-y-6">
                        <div className="border-b border-zinc-100 pb-4">
                          <h1 className="text-xl font-black uppercase tracking-wider text-zinc-955 font-mono">
                            Order History
                          </h1>
                          <p className="text-xs text-zinc-400 mt-1 font-sans">
                            Track recent shipments, verify statuses, or write product reviews.
                          </p>
                        </div>

                        {/* Order Cards List */}
                        <div className="space-y-5">
                          
                          {/* Order 1 */}
                          <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs flex flex-col gap-4">
                            
                            {/* Card status row */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-100 pb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-150 flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-green-700" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider text-green-800 font-sans">
                                  Delivered
                                </span>
                                <span className="text-xs text-zinc-400 font-mono">on Oct 25, 2026</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-400">Order ID: #DH-948271</span>
                            </div>

                            {/* Product flex details */}
                            <div className="flex gap-4">
                              <div className="relative w-16 h-20 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-200/50">
                                <Image 
                                  src="https://img105.savana.com/6d46ad99d345403bb27750081709f298.webp" 
                                  alt="Acme Kanji Graphic Tee" 
                                  fill 
                                  sizes="60px"
                                  className="object-cover" 
                                />
                              </div>

                              <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">ALMOST GODS</span>
                                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight">Acme Kanji Graphic Tee</h4>
                                  <div className="flex gap-3 text-[10px] text-zinc-500 font-mono pt-1.5">
                                    <span>Size: <strong className="text-zinc-800 font-bold">L</strong></span>
                                    <span>Qty: <strong className="text-zinc-800 font-bold">1</strong></span>
                                  </div>
                                </div>

                                <div className="text-left sm:text-right flex flex-col justify-between items-start sm:items-end">
                                  <strong className="text-sm font-black text-zinc-955">$42.00</strong>
                                  
                                  <button
                                    onClick={() => {
                                      setReviewItemName("Acme Kanji Graphic Tee");
                                      setReviewRating(5);
                                      setReviewTitle("");
                                      setReviewComment("");
                                      setReviewModalOpen(true);
                                    }}
                                    className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer pt-2"
                                  >
                                    Write a Product Review
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Order 2 */}
                          <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs flex flex-col gap-4">
                            
                            {/* Card status row */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-100 pb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-150 flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-green-700" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider text-green-800 font-sans">
                                  Delivered
                                </span>
                                <span className="text-xs text-zinc-400 font-mono">on Oct 18, 2026</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-400">Order ID: #DH-948160</span>
                            </div>

                            {/* Product flex details */}
                            <div className="flex gap-4">
                              <div className="relative w-16 h-20 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-200/50">
                                <Image 
                                  src="https://img105.savana.com/d247c54bb1e84d00ac32a0d2ee340180.webp" 
                                  alt="Downtown Oversized Hoodie" 
                                  fill 
                                  sizes="60px"
                                  className="object-cover" 
                                />
                              </div>

                              <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">ACME</span>
                                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight">Downtown Oversized Hoodie</h4>
                                  <div className="flex gap-3 text-[10px] text-zinc-500 font-mono pt-1.5">
                                    <span>Size: <strong className="text-zinc-800 font-bold">M</strong></span>
                                    <span>Qty: <strong className="text-zinc-800 font-bold">1</strong></span>
                                  </div>
                                </div>

                                <div className="text-left sm:text-right flex flex-col justify-between items-start sm:items-end">
                                  <strong className="text-sm font-black text-zinc-955">$75.00</strong>
                                  
                                  <button
                                    onClick={() => {
                                      setReviewItemName("Downtown Oversized Hoodie");
                                      setReviewRating(5);
                                      setReviewTitle("");
                                      setReviewComment("");
                                      setReviewModalOpen(true);
                                    }}
                                    className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer pt-2"
                                  >
                                    Write a Product Review
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    )}

                    {/* TAB: WISHLIST / MIX-AND-MATCH */}
                    {activeTab === "wishlist" && (
                      <div>
                        {/* Header: Title and item count */}
                        <div className="flex items-baseline gap-3 mb-8 border-b border-zinc-100 pb-4">
                          <h1 className="text-xl font-black uppercase tracking-wider text-zinc-955 font-mono">
                            My Wishlist
                          </h1>
                          <span className="text-orange-500 text-xs font-mono lowercase">
                            ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
                          </span>
                        </div>

                        {wishlist.length === 0 ? (
                          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[350px] select-none gap-5">
                            {/* Cat Comic Image */}
                            <div className="relative w-full aspect-[347/300] overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-sm max-w-[280px]">
                              <Image 
                                src="/images/empty-wishlist-premium.png" 
                                alt="Why is it empty cat comic" 
                                fill 
                                sizes="300px"
                                className="object-cover" 
                              />
                            </div>

                            {/* Text layout */}
                            <div className="space-y-1">
                              <h4 className="text-lg font-extrabold text-zinc-900 tracking-tight">Your Wishlist is waiting!</h4>
                              <p className="text-xs text-zinc-500 font-medium">Let&apos;s add some items</p>
                            </div>

                            {/* Start Shopping Button */}
                            <a 
                              href="/shop" 
                              className="w-full max-w-[200px] bg-[#2a2a2a] hover:bg-black text-[#ebd26b] border border-[#ebd26b]/20 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02] text-center"
                            >
                              Start Shopping
                            </a>
                          </div>
                        ) : (
                          <>
                            {/* Wishlist Items Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
                              {wishlist.map((item) => (
                                <ProductCard
                                  key={item.id}
                                  id={item.id}
                                  brand={item.brand}
                                  name={item.name}
                                  price={item.price}
                                  image={item.image}
                                  buttonText="Move to Bag"
                                  isFavorite={true}
                                  onFavoriteToggle={() => handleRemoveFromWishlist(item.id)}
                                  onAddToCart={() => {
                                    handleAddToCart({ id: item.id, brand: item.brand, name: item.name, price: item.price, image: item.image });
                                    handleRemoveFromWishlist(item.id);
                                  }}
                                  variant="padded"
                                />
                              ))}
                            </div>

                            {/* Interactive Mix & Match Outfit Creator */}
                            <div className="mt-16 w-full">
                              <MixMatchCreator wishlist={wishlist} />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* TAB: SUBSCRIPTION */}
                    {activeTab === "subscription" && (
                      <div className="space-y-6">
                        {activeSubscription ? (
                          <div className="bg-black text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-zinc-800 text-left relative overflow-hidden font-sans">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                  Active Membership
                                </span>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-2">
                                  Drip Hunter {activeSubscription}
                                </h2>
                                <p className="text-xs text-zinc-400 font-medium">
                                  Billing Cycle: <strong className="text-zinc-200 capitalize">{subBillingCycle}</strong>
                                </p>
                              </div>

                              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-indigo-400 fill-indigo-500 animate-pulse" />
                                <div className="text-xs font-mono text-left">
                                  <div>Next Renewal:</div>
                                  <div className="text-zinc-300 font-bold">Aug 22, 2026</div>
                                </div>
                              </div>
                            </div>

                            {/* Active Benefits Dashboard */}
                            <div className="space-y-4 pt-1">
                              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300">
                                Your Active Member Benefits:
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                  "Welcome discount: Save 15% off first purchase",
                                  "Double points multiplier (2x) in your birthday month",
                                  "Complimentary express shipping on orders over ₹999",
                                  activeSubscription === "Premium" ? "Exclusive surprise collectibles gift pack" : "Early access to select streetwear drops"
                                ].map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/40 font-medium">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Actions bar */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
                              <button
                                onClick={() => {
                                  alert("Access Token: DH-MEMB-783921. Member Partner Perks unlocked! Present this token at checkout for partner discounts.");
                                }}
                                className="flex-1 bg-white hover:bg-zinc-100 text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer border-none text-center shadow-md active:scale-95"
                              >
                                Access Partner Perks
                              </button>
                              <button
                                onClick={handleCancelSubscription}
                                className="bg-transparent hover:bg-red-500/10 border border-red-500/30 text-red-500 hover:text-red-400 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer active:scale-95"
                              >
                                Cancel Subscription
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <h1 className="text-xl font-black uppercase tracking-wider text-zinc-955 font-mono flex items-center gap-2">
                                  VIP Subscription <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                                </h1>
                                <p className="text-xs text-zinc-400 mt-1 font-sans">
                                  Unlock exclusive perks, early access to drops, and birthday rewards.
                                </p>
                              </div>

                              <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 shrink-0">
                                <button
                                  onClick={() => setSubViewStyle("cards")}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subViewStyle === "cards"
                                      ? "bg-black text-[#facc15] shadow-xs"
                                      : "text-zinc-500 hover:text-black"
                                  }`}
                                >
                                  Cards View
                                </button>
                                <button
                                  onClick={() => setSubViewStyle("comparison")}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subViewStyle === "comparison"
                                      ? "bg-black text-[#facc15] shadow-xs"
                                      : "text-zinc-500 hover:text-black"
                                  }`}
                                >
                                  Matrix View
                                </button>
                              </div>
                            </div>

                            {/* CARDS VIEW */}
                            {subViewStyle === "cards" ? (
                              <div className="bg-[#ffd500] text-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-md border border-yellow-400 font-sans">
                                <div className="text-center space-y-2">
                                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                                    Subscribe now, for more benefits*
                                  </h2>
                                  
                                  <div className="flex items-center justify-center gap-3 text-xs font-bold pt-2">
                                    <span>Monthly</span>
                                    <button
                                      onClick={() => setSubBillingCycle(subBillingCycle === "monthly" ? "yearly" : "monthly")}
                                      className="w-12 h-6 bg-blue-700 rounded-full p-1 flex items-center transition-all cursor-pointer relative"
                                    >
                                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${subBillingCycle === "yearly" ? "translate-x-6" : "translate-x-0"}`} />
                                    </button>
                                    <span>Yearly <span className="bg-black text-[#ffd500] text-[9px] px-1.5 py-0.5 rounded font-mono">SAVE 20%</span></span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                  {/* Basic */}
                                  <div className="bg-[#4f46e5] text-white rounded-2xl p-5 flex flex-col justify-between shadow-lg text-left">
                                    <div className="space-y-3">
                                      <div className="text-center">
                                        <h4 className="font-bold">Basic</h4>
                                        <div className="text-3xl font-black font-mono mt-1">₹0.00</div>
                                      </div>
                                      <ul className="space-y-2 text-xs">
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Welcome offer on first purchase</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> 2x points in Birthday Month</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Exclusive Partner Perks</li>
                                      </ul>
                                    </div>
                                    <button onClick={() => handleSubscribe("Basic")} className="mt-6 w-full bg-white text-black font-extrabold text-xs py-2.5 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors border-none">
                                      Get Started Now
                                    </button>
                                  </div>

                                  {/* Super */}
                                  <div className="bg-[#4338ca] text-white rounded-2xl p-5 flex flex-col justify-between shadow-xl text-left border-2 border-white/40 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[#ffd500] font-black text-[9px] px-3 py-0.5 rounded-full font-mono uppercase">POPULAR</div>
                                    <div className="space-y-3 pt-1">
                                      <div className="text-center">
                                        <h4 className="font-bold">Super</h4>
                                        <div className="text-3xl font-black font-mono mt-1">{subBillingCycle === "monthly" ? "₹149" : "₹1,499"}</div>
                                      </div>
                                      <ul className="space-y-2 text-xs">
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Welcome offer on first purchase</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Early access to sales</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> 2x points in Birthday Month</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Special Birthday Benefit</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Exclusive Partner Perks</li>
                                      </ul>
                                    </div>
                                    <button onClick={() => handleSubscribe("Super")} className="mt-6 w-full bg-white text-black font-extrabold text-xs py-2.5 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors border-none">
                                      Get Started Now
                                    </button>
                                  </div>

                                  {/* Premium */}
                                  <div className="bg-[#4f46e5] text-white rounded-2xl p-5 flex flex-col justify-between shadow-lg text-left">
                                    <div className="space-y-3">
                                      <div className="text-center">
                                        <h4 className="font-bold">Premium</h4>
                                        <div className="text-3xl font-black font-mono mt-1">{subBillingCycle === "monthly" ? "₹219" : "₹2,199"}</div>
                                      </div>
                                      <ul className="space-y-2 text-xs">
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> All Super Benefits</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Welcome gift when you reach Premium</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Surprise experience</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white shrink-0" /> Exclusive Partner Perks</li>
                                      </ul>
                                    </div>
                                    <button onClick={() => handleSubscribe("Premium")} className="mt-6 w-full bg-white text-black font-extrabold text-xs py-2.5 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors border-none">
                                      Get Started Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* MATRIX VIEW */
                              <div className="bg-black text-white rounded-3xl p-6 space-y-6 shadow-md border border-zinc-800 font-sans">
                                <h2 className="text-2xl font-black text-center text-[#facc15] uppercase">
                                  Subscribe now*
                                </h2>

                                <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center">
                                  <div className="bg-white text-black p-3 rounded-xl text-left space-y-3">
                                    <span className="text-blue-700 font-extrabold">Features</span>
                                    <div className="text-[10px] space-y-2 border-t pt-2 text-zinc-700">
                                      <div>Welcome offer</div>
                                      <div>Early access</div>
                                      <div>2x points</div>
                                      <div>Birthday benefit</div>
                                      <div>Surprise gift</div>
                                    </div>
                                  </div>

                                  <div className="bg-white text-black p-3 rounded-xl space-y-3">
                                    <span className="text-blue-700 font-extrabold">Basic</span>
                                    <div className="text-xs space-y-2 border-t pt-2">
                                      <div>✓</div>
                                      <div className="text-zinc-400">✕</div>
                                      <div>✓</div>
                                      <div className="text-zinc-400">✕</div>
                                      <div className="text-zinc-400">✕</div>
                                    </div>
                                  </div>

                                  <div className="bg-[#facc15] text-black p-3 rounded-xl space-y-3 border-2 border-yellow-400">
                                    <span className="font-extrabold">Super</span>
                                    <div className="text-xs space-y-2 border-t border-black/20 pt-2 font-bold">
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div className="text-black/40">✕</div>
                                    </div>
                                  </div>

                                  <div className="bg-white text-black p-3 rounded-xl space-y-3">
                                    <span className="text-blue-700 font-extrabold">Premium</span>
                                    <div className="text-xs space-y-2 border-t pt-2">
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div>✓</div>
                                      <div>✓</div>
                                    </div>
                                  </div>
                                </div>

                                <button onClick={() => handleSubscribe(subSelectedPlan)} className="w-full bg-[#0052cc] hover:bg-[#0043a8] text-[#facc15] font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer text-center uppercase tracking-wide border-none">
                                  Continue with {subSelectedPlan} &gt;
                                </button>
                              </div>
                            )}
                          </>
                        )}           </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Subscription Success Modal */}
      <AnimatePresence>
        {subSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-sans text-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative border border-zinc-200 space-y-6"
            >
              <button
                onClick={() => setSubSuccessModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner text-emerald-600">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                  Welcome to the Club!
                </h3>
                <p className="text-xs text-zinc-505 font-medium">
                  You have successfully subscribed to the **Drip Hunter {subSuccessPlan}** membership tier.
                </p>
              </div>

              <div className="border-t border-b border-zinc-150 py-3 text-xs space-y-2 font-mono text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Membership Tier:</span>
                  <span className="font-bold text-zinc-900">{subSuccessPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Renewal Cycle:</span>
                  <span className="font-bold text-zinc-900 capitalize">{subBillingCycle}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-zinc-150 pt-2 text-sm">
                  <span className="text-zinc-900 font-bold">Total Paid:</span>
                  <span className="font-black text-[#15803d]">
                    {subSuccessPlan === "Basic" 
                      ? "₹0.00" 
                      : subSuccessPlan === "Super"
                        ? (subBillingCycle === "monthly" ? "₹149.00" : "₹1,499.00")
                        : (subBillingCycle === "monthly" ? "₹219.00" : "₹2,199.00")
                    }
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSubSuccessModalOpen(false)}
                className="w-full bg-zinc-955 bg-zinc-900 hover:bg-black text-[#facc15] font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer border-none shadow-md"
              >
                Go to VIP Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Writer Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-sans text-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-zinc-200 text-left space-y-5"
            >
              <button
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-955">
                  Write Product Review
                </h3>
                <p className="text-xs font-black uppercase tracking-tight text-zinc-500">
                  Product: {reviewItemName}
                </p>
              </div>

              {/* Star Picker */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                  Your Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer bg-transparent border-none p-0.5"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-7 h-7 stroke-current ${
                          star <= reviewRating ? "text-[#fbc02d] fill-[#fbc02d]" : "text-zinc-300"
                        }`}
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                    Review Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Summarize your experience (e.g. Amazing fit & print!)"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 transition-all text-zinc-900 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                    Detailed Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How does it feel? Share details about style, fabric, and design..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full border border-zinc-250 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-500 transition-all text-zinc-900 font-medium resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="flex-1 border border-zinc-300 text-zinc-700 hover:text-black font-bold text-xs uppercase py-3 rounded-xl cursor-pointer text-center bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!reviewTitle || !reviewComment) {
                      alert("Please fill in all fields!");
                      return;
                    }
                    alert("Thank you! Your product review has been submitted and is processing quality review.");
                    setReviewModalOpen(false);
                  }}
                  className="flex-grow bg-zinc-955 bg-zinc-900 hover:bg-black text-[#facc15] font-extrabold text-xs uppercase py-3 rounded-xl cursor-pointer text-center border-none active:scale-95 transition-all"
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
