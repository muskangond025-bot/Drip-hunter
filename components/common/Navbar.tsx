"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Eye, EyeOff, ChevronDown } from "lucide-react";
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

interface NavbarProps {
  cart: CartItem[];
  wishlist: WishlistItem[];
  searchQuery?: string;
  searchCategory?: string;
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onRemoveFromCart: (id: number) => void;
  onRemoveFromWishlist: (id: number) => void;
  onUpdateCartQuantity: (id: number, qty: number) => void;
  onAddToCart: (product: { id: number; brand: string; name: string; price: string; image: string }) => void;
  loginOpen?: boolean;
  setLoginOpen?: (open: boolean) => void;
}

export function Navbar({
  cart = [],
  wishlist = [],
  searchQuery = "",
  searchCategory = "All",
  onSearchChange,
  onCategoryChange,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onUpdateCartQuantity,
  onAddToCart,
  loginOpen: propLoginOpen,
  setLoginOpen: propSetLoginOpen,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [localLoginOpen, setLocalLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'login' | 'register' | 'verify'>('home');
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("user@driphunter.com");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/shop") {
        const params = new URLSearchParams(window.location.search);
        if (localSearch) {
          params.set("search", localSearch);
        } else {
          params.delete("search");
        }
        window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
        
        // Dispatch popstate event to notify ShopCatalog of query changes
        window.dispatchEvent(new Event("popstate"));
      } else {
        window.location.href = `/shop?search=${encodeURIComponent(localSearch)}`;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
      setIsLoggedIn(localStorage.getItem("isRegistered") === "true");
      const savedEmail = localStorage.getItem("registeredEmail");
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
      const handleAuth = () => {
        setIsLoggedIn(localStorage.getItem("isRegistered") === "true");
        const freshEmail = localStorage.getItem("registeredEmail");
        if (freshEmail) {
          setUserEmail(freshEmail);
        }
      };
      window.addEventListener("auth-change", handleAuth);
      return () => window.removeEventListener("auth-change", handleAuth);
    }
  }, []);

  const handleSignInSimulate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("registeredEmail", "user@driphunter.com");
      setIsLoggedIn(true);
      window.dispatchEvent(new Event("auth-change"));
      alert("Sign In / Sign Up simulated successfully!");
    }
  };

  const handleLogOutSimulate = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "false");
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("auth-change"));
      setCurrentScreen("home");
      alert("Logged out successfully!");
    }
  };

  const loginOpen = propLoginOpen !== undefined ? propLoginOpen : localLoginOpen;
  const setLoginOpen = propSetLoginOpen !== undefined ? propSetLoginOpen : setLocalLoginOpen;

  const cartTotalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <header className="w-full bg-white text-black border-b border-zinc-200 sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-[10px] py-1.5 px-4 flex items-center justify-center font-mono overflow-hidden tracking-wider select-none">
        <div className="animate-pulse flex items-center space-x-2">
          <span>⚡ SUMMER DRIP IS HERE: USE CODE <strong className="text-yellow-400 font-bold">DRIP10</strong> FOR 10% OFF ⚡</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="font-chaney-title text-xl md:text-2xl tracking-tighter hover:opacity-85 transition-opacity">
            DRIP HUNTER
          </a>
        </div>

        {/* Center: Centered Navigation Links & Sleek Search Bar */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-semibold tracking-wide">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Explore", href: "/explore" }
            ].map((link) => {
              const isActive = activePath === link.href;
              return (
                <div 
                  key={link.label}
                  className="relative py-2 select-none group"
                >
                  <a 
                    href={link.href}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <motion.span
                      animate={{ color: isActive ? "#f05a28" : "#27272a" }}
                      whileHover={{ color: "#f05a28" }}
                      transition={{ duration: 0.15 }}
                      className="font-sans font-bold"
                    >
                      {link.label}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Compact Sleek Search Bar */}
          <div className="flex items-center border border-zinc-200 rounded-full bg-white px-3 py-1.5 w-52 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400 transition-all">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                const val = e.target.value;
                setLocalSearch(val);
                onSearchChange?.(val);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search..."
              className="bg-transparent outline-none text-xs w-full py-0.5 px-1 text-zinc-800 placeholder-zinc-400"
            />
            <Search 
              className="w-3.5 h-3.5 text-zinc-400 cursor-pointer hover:text-black transition-colors" 
              onClick={handleSearchSubmit}
            />
          </div>
        </div>

        {/* Right: Preserved Action Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Account Icon with Hover/Click Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer block border-none bg-transparent" 
              aria-label="Account"
            >
              <User className="w-5.5 h-5.5" />
            </button>
            
            <AnimatePresence>
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="w-64 bg-white border border-zinc-200 rounded-2xl shadow-xl p-5 text-left select-none"
                  >
                    {!isLoggedIn ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-zinc-900 font-sans uppercase tracking-wider">Welcome</h4>
                        <p className="text-[11px] text-zinc-505 font-medium font-sans">To access your wishlist and orders</p>
                        <button
                          onClick={() => {
                            setCurrentScreen("login");
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full bg-zinc-950 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center transition-colors border-none"
                        >
                          Sign In / Sign Up
                        </button>
                        <div className="border-t border-zinc-100 pt-2 space-y-1">
                          <a 
                            href="/affiliate" 
                            className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors text-[11px] font-semibold font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <span>Affiliate Program</span>
                            <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded font-mono uppercase">Earn 10%</span>
                          </a>
                          <a 
                            href="/brands" 
                            className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors text-[11px] font-semibold font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            Brand
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs font-semibold text-zinc-700 font-sans">
                        <div className="pb-2.5 border-b border-zinc-100">
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">Logged in as</span>
                          <strong className="text-zinc-900 text-sm font-bold block truncate">{userEmail}</strong>
                        </div>
                        <a 
                          href="/wishlist?tab=profile" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          My Profile
                        </a>
                        <a 
                          href="/wishlist?tab=orders" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Orders
                        </a>
                        <a 
                          href="/wishlist?tab=wishlist" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Wishlist
                        </a>
                        <a 
                          href="/affiliate" 
                          className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span>Affiliate Program</span>
                          <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded font-mono uppercase">Earn 10%</span>
                        </a>
                        <a 
                          href="/brands" 
                          className="flex items-center gap-2 py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Brand
                        </a>
                        <button
                          onClick={() => {
                            handleLogOutSimulate();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 py-2.5 px-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg cursor-pointer font-bold mt-2 bg-transparent border-none"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Icon */}
          <a 
            href="/wishlist"
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Wishlist"
          >
            <Heart className="w-5.5 h-5.5" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Cart Icon */}
          <button 
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {mounted && cartTotalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-extrabold">
                {cartTotalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-zinc-200 p-4 space-y-4">
          <div className="flex items-center border border-zinc-300 rounded-full px-4 py-2 bg-zinc-50">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                const val = e.target.value;
                setLocalSearch(val);
                onSearchChange?.(val);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm"
            />
            <Search 
              className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-black transition-colors" 
              onClick={handleSearchSubmit}
            />
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-sm">
            <a href="/" className="block py-2 hover:bg-zinc-50 px-2 rounded">Home</a>
            <a href="/about" className="block py-2 hover:bg-zinc-50 px-2 rounded">About</a>
            <a href="/explore" className="block py-2 hover:bg-zinc-50 px-2 rounded">Explore</a>
          </nav>
        </div>
      )}

      {/* Cart Drawer Panel */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="text-lg font-bold tracking-tight">Shopping Bag ({cartTotalQuantity})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-[310px] flex flex-col items-center gap-5 select-none text-center">
                      
                      {/* Santa Comic Image */}
                      <div className="relative w-full aspect-[347/330] overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-sm">
                        <Image 
                          src="/images/santa_comic.png" 
                          alt="Your Cart is Waiting Comic" 
                          fill 
                          sizes="300px"
                          className="object-cover" 
                        />
                      </div>

                      {/* Text layout */}
                      <div className="space-y-1">
                        <h4 className="text-lg font-extrabold text-zinc-900 tracking-tight">Your Cart is waiting!</h4>
                        <p className="text-xs text-zinc-500 font-medium">Let&apos;s add some items</p>
                      </div>

                      {/* Start Shopping Button */}
                      <button 
                        onClick={() => setCartOpen(false)} 
                        className="w-full max-w-[200px] bg-black hover:bg-zinc-900 text-yellow-400 border border-yellow-400 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                      >
                        Start Shopping
                      </button>

                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                      <div className="relative w-20 aspect-[4/5] bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase">{item.brand}</span>
                              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            </div>
                            <button onClick={() => onRemoveFromCart(item.id)} className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer">
                              <X className="w-4.5 h-4.5" />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-zinc-950 mt-1 block">{item.price}</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 font-bold text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 font-bold text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal and checkout */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-100 p-6 bg-zinc-50 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-zinc-950">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Shipping & taxes calculated at checkout</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = "/checkout";
                    }}
                    className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-zinc-950 transition-colors shadow-lg cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer Panel */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <h3 className="text-lg font-bold tracking-tight">Favorites ({wishlist.length})</h3>
                </div>
                <button onClick={() => setWishlistOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    {/* Add keyframe style definitions directly inside */}
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                      }
                      @keyframes splitLeft {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(-6px, 1.5px) rotate(-8deg); }
                      }
                      @keyframes splitRight {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(6px, 1.5px) rotate(8deg); }
                      }
                    `}} />

                    {/* Illustration Container */}
                    <div className="relative w-full aspect-[4/3.5] flex items-center justify-center select-none bg-[#f7f8fa] border border-zinc-200 rounded-[32px] max-w-[290px] overflow-hidden mb-6 p-4">
                      
                      {/* Checklist sheet */}
                      <div className="relative w-[136px] h-[176px] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4.5 flex flex-col gap-3.5 translate-y-3.5 border border-zinc-100/50">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <span className="w-4 h-4 rounded-md border border-zinc-200 flex-shrink-0 bg-zinc-50/50" />
                            <span 
                              className="h-1.5 bg-zinc-100 rounded-full" 
                              style={{ width: `${30 + (idx % 3) * 20}%` }} 
                            />
                          </div>
                        ))}

                        {/* Top float bubble */}
                        <div className="absolute -top-3.5 left-13 w-11 h-5.5 bg-zinc-200/80 rounded-full flex items-center justify-center shadow-2xs border border-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        </div>
                      </div>

                      {/* Floating Split Heart */}
                      <div className="absolute bottom-5 right-5 w-24 h-24 drop-shadow-lg animate-[float_2.8s_ease-in-out_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ff4b1f" />
                              <stop offset="100%" stopColor="#ff007f" />
                            </linearGradient>
                          </defs>
                          
                          {/* Left Half (Group for future additions if needed) */}
                          <g className="origin-[50px_56px] animate-[splitLeft_2.2s_ease-in-out_infinite]">
                            <path 
                              d="M 50 25 C 32 10, 12 25, 12 48 C 12 68, 32 81, 50 88 L 47 65 L 53 50 L 48 40 Z" 
                              fill="url(#heartGrad)" 
                            />
                          </g>

                          {/* Right Half (With glossy reflection highlight) */}
                          <g className="origin-[50px_56px] animate-[splitRight_2.2s_ease-in-out_infinite]">
                            <path 
                              d="M 50 25 C 68 10, 88 25, 88 48 C 88 68, 68 81, 50 88 L 47 65 L 53 50 L 48 40 Z" 
                              fill="url(#heartGrad)" 
                            />
                            {/* Glossy Reflection Highlight Curve */}
                            <path 
                              d="M 64 28 C 72 29, 78 35, 80 43 C 80.5 44.5, 79 45, 78 44 C 76 38, 71 33, 64 31 C 63 30.8, 63 28.2, 64 28 Z" 
                              fill="white" 
                              fillOpacity="0.65" 
                            />
                          </g>
                        </svg>
                      </div>

                    </div>

                    {/* Text content matching the Dribbble mockup */}
                    <div className="text-center">
                      <h4 className="text-xl font-extrabold text-[#2d3142] tracking-tight">Your wishlist is empty</h4>
                      <p className="text-xs text-zinc-500 mt-1.5 font-medium">Create your first wishlist request</p>
                    </div>

                    {/* Button matching mockup */}
                    <button 
                      onClick={() => setWishlistOpen(false)} 
                      className="bg-[#f05a28] hover:bg-[#d84e20] text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01] flex items-center justify-center gap-1.5 mt-6 w-full max-w-[220px]"
                    >
                      <span className="text-sm font-semibold">+</span> Create new wish
                    </button>

                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                      <div className="relative w-20 aspect-[4/5] bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase">{item.brand}</span>
                              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                            </div>
                            <button onClick={() => onRemoveFromWishlist(item.id)} className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer">
                              <X className="w-4.5 h-4.5" />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-zinc-950 mt-1 block">{item.price}</span>
                        </div>

                        {/* Add to cart from favorites */}
                        <button 
                          onClick={() => {
                            onAddToCart({ id: item.id, brand: item.brand, name: item.name, price: item.price, image: item.image });
                            onRemoveFromWishlist(item.id);
                          }}
                          className="bg-zinc-100 hover:bg-black hover:text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition-colors cursor-pointer w-full text-center mt-2 border border-zinc-200 hover:border-black"
                        >
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Page Authentication Flows Screen Overlay */}
      {currentScreen !== "home" && (
        <div className="fixed top-[112px] inset-x-0 bottom-0 bg-white z-[60] overflow-y-auto flex flex-col justify-center select-none">
          <div className="flex-grow flex items-center justify-center py-16 px-4">
            
            <AnimatePresence mode="wait">
              {currentScreen === "login" && (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Login</h2>
                  <p className="text-xs text-zinc-505 mt-3 mb-6 font-medium">
                    Please enter your e-mail and password:
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      localStorage.setItem("isRegistered", "true");
                      localStorage.setItem("registeredEmail", authEmail || "user@driphunter.com");
                      setIsLoggedIn(true);
                      window.dispatchEvent(new Event("auth-change"));
                      setCurrentScreen("home");
                      alert("Logged in successfully!");
                    }}
                    className="space-y-4"
                  >
                    <input 
                      type="email" 
                      required 
                      placeholder="Email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <div className="relative">
                      <input 
                        type="password" 
                        required 
                        placeholder="Password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <button 
                        type="button"
                        onClick={() => alert("Forgot password link sent!")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none p-0 font-bold"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Log In
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-zinc-505 font-semibold font-sans">
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => {
                        setCurrentScreen("register");
                        setCodeError("");
                      }} 
                      className="font-bold text-black hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Sign Up
                    </button>
                  </div>
                </motion.div>
              )}

              {currentScreen === "register" && (
                <motion.div 
                  key="register"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Register</h2>
                  <p className="text-xs text-zinc-500 mt-3 mb-6 font-medium">
                    Please fill in the information below:
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCurrentScreen("verify");
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required 
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <input 
                        type="text" 
                        required 
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                    </div>

                    <input 
                      type="email" 
                      required 
                      placeholder="Email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <input 
                      type="password" 
                      required 
                      placeholder="Password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                    />

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Create My Account
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-zinc-505 font-semibold font-sans">
                    Already have an account?{" "}
                    <button 
                      type="button" 
                      onClick={() => {
                        setCurrentScreen("login");
                        setCodeError("");
                      }} 
                      className="font-bold text-black hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Log in
                    </button>
                  </div>
                </motion.div>
              )}

              {currentScreen === "verify" && (
                <motion.div 
                  key="verify"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl border border-zinc-200/80 shadow-2xl max-w-md w-full p-8 md:p-10 text-left"
                >
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border-none"
                    aria-label="Close page"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none uppercase font-mono">Enter Code</h2>
                  <p className="text-xs text-zinc-505 mt-3 mb-6 font-medium">
                    Sent to {authEmail || "user@driphunter.com"}
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!verificationCode.trim()) {
                        setCodeError("Verification code cannot be empty!");
                        return;
                      }
                      localStorage.setItem("isRegistered", "true");
                      localStorage.setItem("registeredEmail", authEmail || "user@driphunter.com");
                      setIsLoggedIn(true);
                      window.dispatchEvent(new Event("auth-change"));
                      setCurrentScreen("home");
                      alert("Account verified and logged in successfully!");
                    }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <input 
                        type="text" 
                        maxLength={6}
                        required 
                        placeholder="6-digit code"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          setCodeError("");
                        }}
                        className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono text-zinc-900"
                      />
                      <button 
                        type="button"
                        onClick={() => alert("Verification code resent!")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 hover:text-black cursor-pointer bg-transparent border-none p-0 font-bold"
                      >
                        Verify
                      </button>
                    </div>

                    {codeError && (
                      <p className="text-[10px] text-red-500 font-mono font-bold text-left">{codeError}</p>
                    )}

                    <button 
                      type="submit" 
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none mt-2"
                    >
                      Create My Account
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      )}
    </header>
  );
}

