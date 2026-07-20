"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/ui/product-card";
import { Heart, X, User, ShoppingBag, Check, Save, LogOut } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist">("wishlist");

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
      if (tabParam === "profile" || tabParam === "orders" || tabParam === "wishlist") {
        setActiveTab(tabParam);
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
        if (activeTabParam === "profile" || activeTabParam === "orders" || activeTabParam === "wishlist") {
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

  const handleTabChange = (tab: "profile" | "orders" | "wishlist") => {
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
    return <div className="min-h-screen bg-white" />; // Avoid hydration flicker
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 select-none">
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
                                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80" 
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
                                    onClick={() => alert("Simulating writing a review for Kanji Tee.")}
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
                                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80" 
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
                                    onClick={() => alert("Simulating writing a review for Downtown Hoodie.")}
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

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
