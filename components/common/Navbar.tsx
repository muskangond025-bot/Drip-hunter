"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Eye, EyeOff, ChevronDown, Mic, Camera } from "lucide-react";
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

const CATEGORY_MENU_ITEMS = [
  "All Categories",
  "Accessories",
  "Apparel",
  "Bearings",
  "Cruisers",
  "Eyewear",
  "Face Mask",
  "Grip Tape",
  "Handbags, Wallets & Cases",
  "Headwear",
  "Keychains",
  "Misc. Hardgood Items",
  "Skateboard",
  "Skateboard Complete",
  "Skateboard Deck",
  "Skateboard Decks",
  "Truck Accessories",
  "Trucks",
  "Wheels",
];

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
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchCategoryOpen, setSearchCategoryOpen] = useState(false);
  const [localSearchCategory, setLocalSearchCategory] = useState(searchCategory || "All");

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
    <header className="w-full bg-white text-black border-b border-zinc-200 sticky top-0 z-50" suppressHydrationWarning>
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-[10px] py-1.5 px-4 flex items-center justify-center font-mono overflow-hidden tracking-wider select-none" suppressHydrationWarning>
        <div className="animate-pulse flex items-center space-x-2">
          <span>⚡ SUMMER DRIP IS HERE: USE CODE <strong className="text-yellow-400 font-bold">DRIP10</strong> FOR 10% OFF ⚡</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6" suppressHydrationWarning>
        {/* Left: Brand Logo & All Categories Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0" suppressHydrationWarning>
          <a href="/" className="font-chaney-title text-xl md:text-2xl tracking-tighter hover:opacity-85 transition-opacity">
            DRIP HUNTER
          </a>

          {/* All Categories Dropdown Menu Tab */}
          <div 
            className="relative hidden sm:block"
            onMouseEnter={() => setAllCategoriesOpen(true)}
            onMouseLeave={() => setAllCategoriesOpen(false)}
          >
            <button
              onClick={() => setAllCategoriesOpen(!allCategoriesOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold font-sans text-zinc-800 hover:text-black bg-zinc-100 hover:bg-zinc-200/80 rounded-md transition-all cursor-pointer border border-zinc-200"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${allCategoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* All Categories Dropdown Menu List matching reference screenshot */}
            <AnimatePresence>
              {allCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 top-full pt-1 z-50 min-w-[220px]"
                >
                  <div className="bg-white border border-zinc-200 rounded-md shadow-2xl py-1 max-h-[360px] overflow-y-auto font-sans text-xs">
                    {CATEGORY_MENU_ITEMS.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setAllCategoriesOpen(false);
                            onCategoryChange?.(cat === "All Categories" ? "All" : cat);
                            if (typeof window !== "undefined") {
                              if (cat === "All Categories") {
                                window.location.href = "/shop";
                              } else {
                                window.location.href = `/shop?category=${encodeURIComponent(cat)}`;
                              }
                            }
                          }}
                          className={`w-full text-left px-3.5 py-1.5 cursor-pointer transition-colors flex items-center justify-between ${
                            isSelected
                              ? "bg-blue-600 text-white font-medium"
                              : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
                          }`}
                        >
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

          {/* Search Bar with Category Dropdown Arrow & Overlay Trigger */}
          <div 
            onClick={() => setSearchOverlayOpen(true)}
            className="flex items-center gap-2 border border-zinc-300 rounded-full bg-zinc-50 hover:bg-white px-3.5 py-1.5 w-64 cursor-pointer hover:border-black transition-all shadow-2xs group"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors shrink-0" />
            <input
              type="text"
              readOnly
              value={localSearch}
              placeholder="Find your perfect streetwear..."
              className="bg-transparent outline-none text-[11px] w-full text-zinc-800 placeholder-zinc-400 cursor-pointer pointer-events-none"
            />
            <div className="flex items-center gap-1 border-l border-zinc-200 pl-2 text-[10px] font-bold text-zinc-500 group-hover:text-black shrink-0">
              <span>Category</span>
              <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-black transition-transform duration-200" />
            </div>
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
                            href="/subscription" 
                            className="flex items-center justify-between py-2 px-2 hover:bg-yellow-50 rounded-lg cursor-pointer text-zinc-900 font-bold transition-colors text-[11px] font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <span>Subscription</span>
                            <span className="text-[9px] bg-[#facc15] text-black font-black px-1.5 py-0.5 rounded font-mono uppercase">VIP</span>
                          </a>
                          <a 
                            href="/seller" 
                            className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors text-[11px] font-semibold font-sans"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <span>Become a Seller</span>
                            <span className="text-[9px] bg-[#f05a28] text-white font-bold px-1.5 py-0.5 rounded font-mono uppercase">Sell</span>
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
                          href="/subscription" 
                          className="flex items-center justify-between py-2 px-2 hover:bg-yellow-50 rounded-lg cursor-pointer text-zinc-900 font-bold transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span>Subscription</span>
                          <span className="text-[9px] bg-[#facc15] text-[#000] font-black px-1.5 py-0.5 rounded font-mono uppercase">VIP Perks</span>
                        </a>
                        <a 
                          href="/seller" 
                          className="flex items-center justify-between py-2 px-2 hover:bg-zinc-50 rounded-lg cursor-pointer text-zinc-700 hover:text-zinc-955 transition-colors animate-fade-in"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <span>Become a Seller</span>
                          <span className="text-[9px] bg-[#f05a28] text-white font-bold px-1.5 py-0.5 rounded font-mono uppercase">Earn</span>
                        </a>
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

      {/* Full-bleed Interactive Search Overlay Drawer matching reference screenshot */}
      <AnimatePresence>
        {searchOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto font-sans text-black"
          >
            {/* Top Search Bar Header */}
            <div className="w-full border-b border-zinc-200 bg-white sticky top-0 z-10 py-4 px-4 sm:px-8 shadow-2xs">
              <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                
                {/* Search Bar Input Box */}
                <div className="flex-1 max-w-2xl mx-auto flex items-center gap-3 bg-zinc-100 border border-zinc-300 rounded-full px-4 py-2 shadow-2xs focus-within:border-black focus-within:bg-white transition-all">
                  <Search className="w-4 h-4 text-zinc-600 shrink-0" />
                  
                  <input
                    type="text"
                    autoFocus
                    value={localSearch}
                    onChange={(e) => {
                      setLocalSearch(e.target.value);
                      onSearchChange?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSearchOverlayOpen(false);
                        handleSearchSubmit();
                      }
                    }}
                    placeholder="Find your perfect streetwear..."
                    className="bg-transparent outline-none text-xs sm:text-sm w-full text-zinc-900 placeholder-zinc-500 font-medium"
                  />

                  {/* Category Dropdown Pill */}
                  <div className="relative shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchCategoryOpen(!searchCategoryOpen);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-zinc-800 hover:text-black border-l border-zinc-300 pl-3 cursor-pointer bg-transparent border-y-0 border-r-0"
                    >
                      <span>{localSearchCategory === "All" ? "Category" : localSearchCategory}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {searchCategoryOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-zinc-200 rounded-xl shadow-xl py-1.5 z-50 text-xs font-mono">
                        {["All", "T-Shirts", "Hoodies", "Shirts", "Eyewear", "Headwear", "Bottoms", "Bags", "Wallets", "Skateboards"].map((cat) => (
                          <button
                            key={cat}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLocalSearchCategory(cat);
                              onCategoryChange?.(cat);
                              setSearchCategoryOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 cursor-pointer transition-colors ${
                              localSearchCategory === cat ? "bg-black text-white font-bold" : "hover:bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mic & Camera Action Icons */}
                  <div className="flex items-center gap-2 border-l border-zinc-300 pl-3 text-zinc-600 shrink-0">
                    <button
                      onClick={() => alert("Voice Search active... Speak your query.")}
                      className="hover:text-black transition-colors cursor-pointer p-0.5 border-none bg-transparent"
                      title="Voice Search"
                    >
                      <Mic className="w-4 h-4 text-zinc-700 hover:text-black" />
                    </button>
                    <button
                      onClick={() => alert("Visual Search active: Upload an image to find matching streetwear.")}
                      className="hover:text-black transition-colors cursor-pointer p-0.5 border-none bg-transparent"
                      title="Search by Image"
                    >
                      <Camera className="w-4 h-4 text-zinc-700 hover:text-black" />
                    </button>
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => setSearchOverlayOpen(false)}
                  className="text-xs font-bold text-zinc-500 hover:text-black cursor-pointer border-none bg-transparent transition-colors"
                >
                  Cancel
                </button>

              </div>
            </div>

            {/* Overlay Body Grid (3 Columns matching screenshot) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* LEFT COLUMN: Top Suggestions & Popular Brands */}
                <div className="lg:col-span-3 space-y-8 text-left">
                  {/* Top Suggestions */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                      Top Suggestions
                    </h3>

                    <div className="space-y-2.5 font-sans text-xs pt-1">
                      {[
                        "Graphic Tees",
                        "Varsity Jackets",
                        "Oversized Hoodies",
                        "Tactical Sling Bags",
                        "Street Shades",
                        "Cargo Pants"
                      ].map((sugg) => (
                        <button
                          key={sugg}
                          onClick={() => {
                            setLocalSearch(sugg);
                            setSearchOverlayOpen(false);
                            window.location.href = `/shop?search=${encodeURIComponent(sugg)}`;
                          }}
                          className="block w-full text-left py-1 text-zinc-600 hover:text-black hover:font-bold transition-all cursor-pointer border-none bg-transparent"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-zinc-400" />

                  {/* Popular Brands */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                      Popular Brands
                    </h3>

                    {/* Circle Brand Icons Row */}
                    <div className="flex items-center gap-3">
                      {[
                        { name: "Arlo", logo: "Arlo" },
                        { name: "Supervek", logo: "SV" },
                        { name: "Puma", logo: "Puma" },
                      ].map((b, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchOverlayOpen(false);
                            window.location.href = `/shop?brand=${encodeURIComponent(b.name)}`;
                          }}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center font-mono font-bold text-xs group-hover:border-black group-hover:bg-zinc-50 transition-all shadow-2xs">
                            {b.logo}
                          </div>
                          <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black">{b.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Brand Pill Cards matching screenshot */}
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-8 rounded-lg bg-[#cff4fc] flex items-center justify-center font-bold text-[10px] text-[#055160] font-mono">
                          Arlo
                        </div>
                        <div className="px-3.5 py-1 bg-[#cff4fc] text-[#055160] rounded-lg text-xs font-bold font-mono">
                          Brand
                        </div>
                      </div>

                      <div 
                        className="p-2 border border-zinc-200 rounded-xl flex items-center gap-3 bg-zinc-50 hover:bg-white transition-colors cursor-pointer"
                        onClick={() => {
                          setSearchOverlayOpen(false);
                          window.location.href = "/product/853";
                        }}
                      >
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-black flex-shrink-0">
                          <Image src="/images/urban-essentials/full_sleeve_shirt.png" alt="Arlo" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold font-mono">Arlo Streetwear Hoodie</p>
                          <p className="text-[10px] text-zinc-500 font-mono">RS. 1,400.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CENTER COLUMN: 2x2 Photo Grid matching screenshot */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 1"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-zinc-200">
                    <Image
                      src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=600&q=80"
                      alt="Streetwear Look 4"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Related Blogs matching screenshot */}
                <div className="lg:col-span-4 space-y-4 text-left">
                  <h3 className="text-2xl font-bold font-serif text-zinc-950 tracking-tight">
                    Related Blogs
                  </h3>

                  <div className="space-y-3">
                    {[
                      { title: "Elevate Your Streetwear Drip With Oversized Tees", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
                      { title: "Top 10 Varsity Jackets & Bomber Essentials", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
                      { title: "How to Style Tactical Sling Bags & Accessories", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
                      { title: "Skate Culture & Underground Urban Fashion", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80" },
                      { title: "The Ultimate Guide to Premium Headwear & Caps", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80" },
                      { title: "Ripstop Cargo Pants: Utility Meets High Street", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80" },
                    ].map((blog, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSearchOverlayOpen(false);
                          window.location.href = "/#blog";
                        }}
                        className="flex items-center gap-3 p-2 bg-[#ffe082]/70 hover:bg-[#ffe082] rounded-2xl transition-colors cursor-pointer group shadow-2xs border border-amber-200"
                      >
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-amber-200">
                          <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <h4 className="text-xs font-mono font-bold text-zinc-900 group-hover:text-black line-clamp-2 leading-tight">
                          {blog.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

