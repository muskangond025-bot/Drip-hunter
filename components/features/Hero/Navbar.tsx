"use client";

import React from "react";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
}

export function Navbar({ cartCount = 1, wishlistCount = 0 }: NavbarProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-45 bg-zinc-950/20 backdrop-blur-md border-b border-white/5 px-4 sm:px-10 py-4 flex items-center justify-between select-none">
      
      {/* 1. Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-white font-sans font-black tracking-widest text-lg sm:text-xl uppercase hover:opacity-90">
          DRIP HUNTER
        </Link>
      </div>

      {/* 2. Center Categories & Search */}
      <div className="hidden lg:flex items-center gap-10">
        <nav className="flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
          <Link href="/shop" className="hover:text-white transition-colors">Men</Link>
          <Link href="/shop" className="hover:text-white transition-colors">Women</Link>
          <Link href="/shop" className="hover:text-white transition-colors">Explore</Link>
        </nav>

        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search streetwear..."
            className="w-full bg-zinc-900/50 text-white placeholder-zinc-500 text-xs py-2 pl-9 pr-4 rounded-full border border-white/5 focus:outline-none focus:border-white/20 transition-all font-sans"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. Right Icons */}
      <div className="flex items-center gap-4.5 text-white">
        {/* Search icon for mobile screen */}
        <button className="lg:hidden p-2 hover:bg-white/5 rounded-full cursor-pointer">
          <Search className="w-4 h-4" />
        </button>
        
        <Link href="/login" className="p-2 hover:bg-white/5 rounded-full cursor-pointer transition-colors" title="Account">
          <User className="w-4 h-4" />
        </Link>
        
        <Link href="/wishlist" className="p-2 hover:bg-white/5 rounded-full cursor-pointer relative transition-colors" title="Wishlist">
          <Heart className="w-4 h-4" />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
          )}
        </Link>
        
        <Link href="/checkout" className="p-2 hover:bg-white/5 rounded-full cursor-pointer relative transition-colors" title="Cart">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 text-black text-[9px] font-black rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

    </header>
  );
}
