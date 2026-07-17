"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Eye, EyeOff } from "lucide-react";

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
  searchQuery: string;
  searchCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
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
  const [authScreen, setAuthScreen] = useState<'signin' | 'signup' | 'forgot'>('signin');

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
      <div className="w-full bg-black text-white text-xs py-2 px-4 flex items-center justify-center font-mono overflow-hidden">
        <div className="animate-pulse flex items-center space-x-2">
          <span>⚡ SUMMER DRIP IS HERE: USE CODE <strong className="text-yellow-400 font-bold">DRIP10</strong> FOR 10% OFF ⚡</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="font-chaney-title text-xl md:text-2xl tracking-tighter hover:opacity-85 transition-opacity">
            DRIP HUNTER
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg items-center border-2 border-black rounded-full overflow-hidden px-4 bg-zinc-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition-all">
          <select 
            value={searchCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-sm font-semibold outline-none py-2.5 pr-2 border-r border-zinc-300 mr-2 text-zinc-700 cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Tees">Tees</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Pants">Pants</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search premium streetwear..."
            className="w-full bg-transparent outline-none text-sm py-2 px-1"
          />
          <button className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer">
            <Search className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Action Tools & Menu Trigger */}
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <a href="/shop" className="hover:underline underline-offset-4">Shop</a>
            <a href="/brands" className="hover:underline underline-offset-4">Explore</a>
            <a href="/affiliate" className="hover:underline underline-offset-4 text-yellow-500 font-extrabold uppercase tracking-wide">Affiliate</a>
            <a href="#" className="hover:underline underline-offset-4 text-red-500 font-bold">Sales</a>
            <a href="#" className="hover:underline underline-offset-4">Support</a>
          </nav>

          <div className="h-6 w-px bg-zinc-200 hidden lg:block" />

          {/* Account Icon */}
          <button 
            onClick={() => setLoginOpen(true)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Account"
          >
            <User className="w-5.5 h-5.5" />
          </button>

          {/* Wishlist Icon */}
          <button 
            onClick={() => setWishlistOpen(true)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Wishlist"
          >
            <Heart className="w-5.5 h-5.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer" 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {cartTotalQuantity > 0 && (
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
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm"
            />
            <Search className="w-4 h-4 text-zinc-500" />
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-sm">
            <a href="/shop" className="block py-2 hover:bg-zinc-50 px-2 rounded">Shop</a>
            <a href="/brands" className="block py-2 hover:bg-zinc-50 px-2 rounded">Explore</a>
            <a href="#" className="block py-2 hover:bg-zinc-50 px-2 rounded text-red-500">Sales</a>
            <a href="#" className="block py-2 hover:bg-zinc-50 px-2 rounded">Support</a>
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
                      alert("Order Placed Successfully! (Simulation)");
                      setCartOpen(false);
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

      {/* Account Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity" onClick={() => setLoginOpen(false)} />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-[32px] shadow-2xl border border-zinc-100 max-w-4xl w-full flex overflow-hidden animate-fade-in-up min-h-[560px]">
            
            {/* Left Panel: Graphic & Quote (displays exact cropped screenshot) */}
            <div 
              className="hidden md:block md:w-1/2 relative bg-zinc-950"
              style={{
                backgroundImage: "url('/images/login-bg.png')",
                backgroundSize: "200% 100%",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat"
              }}
            >
              {/* Overlay elements if any, otherwise layout matches mockup perfectly as baked-in */}
            </div>

            {/* Right Panel: Welcome form / Sign Up form */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 relative flex flex-col justify-center bg-white">
              {/* Close Button */}
              <button 
                onClick={() => setLoginOpen(false)} 
                className="absolute top-5 right-5 p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer text-zinc-400 hover:text-zinc-600"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo / Brand Header */}
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-chaney-title tracking-wider uppercase text-zinc-950">Drip Hunter</span>
              </div>

              {authScreen === 'signin' && (
                <>
                  {/* Header Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-extrabold text-zinc-950 tracking-tight">Welcome Back</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">Enter your email and password to access your account</p>
                  </div>

                  {/* Login Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Welcome Back to DRIP HUNTER! Login successful.");
                      setLoginOpen(false);
                    }} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="Enter your email"
                        className="w-full border border-zinc-300 rounded-xl px-4 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required 
                          placeholder="Enter your password"
                          className="w-full border border-zinc-300 rounded-xl px-4 pr-10 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5 bg-transparent border-0"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-zinc-500 cursor-pointer">
                        <input type="checkbox" className="rounded text-black accent-black focus:ring-0 cursor-pointer border-zinc-200" />
                        <span className="font-medium">Remember me</span>
                      </label>
                      <button 
                        type="button"
                        onClick={() => setAuthScreen('forgot')}
                        className="font-semibold text-zinc-800 hover:underline bg-transparent border-none p-0 cursor-pointer text-xs"
                      >
                        Forgot Password
                      </button>
                    </div>

                    {/* Submit button */}
                    <button 
                      type="submit" 
                      className="w-full bg-black hover:bg-zinc-900 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xs mt-4 cursor-pointer"
                    >
                      Sign In
                    </button>

                    {/* Google Sign In button */}
                    <button 
                      type="button"
                      onClick={() => {
                        alert("Google OAuth Login Initialized! (Simulation)");
                        setLoginOpen(false);
                      }}
                      className="w-full bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-xs py-3.5 rounded-xl transition-all cursor-pointer border border-zinc-200 shadow-xs flex items-center justify-center gap-2.5 mt-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.354 0 3.373 2.736 1.5 6.727l3.766 3.038z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.04 15.345c-1.073.71-2.437 1.137-4.04 1.137a7.07 7.07 0 0 1-6.734-4.855L1.5 14.664C3.373 18.655 7.354 21.39 12 21.39c3.055 0 5.864-1.09 7.964-2.973l-3.924-3.072z"
                        />
                        <path
                          fill="#4285F4"
                          d="M23.49 12.273c0-.818-.082-1.609-.218-2.364H12v4.51h6.464a5.53 5.53 0 0 1-2.4 3.636l3.924 3.073c2.29-2.11 3.502-5.21 3.502-8.855z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.266 12.182c0-.437.073-.864.2-1.273L1.7 7.873a11.967 11.967 0 0 0 0 8.618l3.766-3.036a7.043 7.043 0 0 1-.2-1.273z"
                        />
                      </svg>
                      <span>Sign In with Google</span>
                    </button>
                  </form>

                  {/* Sign up link */}
                  <div className="text-center mt-6 text-xs text-zinc-500">
                    <span>Don&apos;t have an account? </span>
                    <button onClick={() => setAuthScreen('signup')} className="font-bold text-black hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Sign Up
                    </button>
                  </div>
                </>
              )}

              {authScreen === 'signup' && (
                <>
                  {/* Header Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-extrabold text-zinc-950 tracking-tight">Create Account</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">Join the Drip Hunter club for premium streetwear drops</p>
                  </div>

                  {/* Sign Up Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Account Created Successfully! Welcome to DRIP HUNTER.");
                      setAuthScreen('signin');
                      setLoginOpen(false);
                    }} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter your name"
                        className="w-full border border-zinc-300 rounded-xl px-4 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="Enter your email"
                        className="w-full border border-zinc-300 rounded-xl px-4 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required 
                          placeholder="Create a password"
                          className="w-full border border-zinc-300 rounded-xl px-4 pr-10 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5 bg-transparent border-0"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Submit button */}
                    <button 
                      type="submit" 
                      className="w-full bg-black hover:bg-zinc-900 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xs mt-6 cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </form>

                  {/* Sign in link */}
                  <div className="text-center mt-6 text-xs text-zinc-500">
                    <span>Already have an account? </span>
                    <button onClick={() => setAuthScreen('signin')} className="font-bold text-black hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Sign In
                    </button>
                  </div>
                </>
              )}

              {authScreen === 'forgot' && (
                <>
                  {/* Header Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-extrabold text-zinc-950 tracking-tight">Reset Password</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">Enter your email address to receive a password reset link</p>
                  </div>

                  {/* Forgot Password Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Password reset link sent successfully!");
                      setAuthScreen('signin');
                    }} 
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="Enter your email"
                        className="w-full border border-zinc-300 rounded-xl px-4 py-3 text-sm bg-zinc-50 outline-none focus:bg-white focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder-zinc-400 text-zinc-800"
                      />
                    </div>

                    {/* Submit button */}
                    <button 
                      type="submit" 
                      className="w-full bg-black hover:bg-zinc-900 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-xs mt-6 cursor-pointer"
                    >
                      Send Reset Link
                    </button>
                  </form>

                  {/* Sign in link */}
                  <div className="text-center mt-6 text-xs text-zinc-500">
                    <button onClick={() => setAuthScreen('signin')} className="font-bold text-black hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Back to Sign In
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

