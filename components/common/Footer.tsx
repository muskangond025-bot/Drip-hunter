"use client";

import React, { useState } from "react";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { Check } from "lucide-react";

// Social SVG Icons
const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const submitAction = useAsyncAction(600);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      submitAction.execute(() => {
        setSubscribed(true);
        setEmail("");
      });
    }
  };

  return (
    <footer className="w-full font-sans select-none">
      
      {/* ========================================================================= */}
      {/* 1. TOP NEWSLETTER CARD BANNER ("JOIN THE FAM!") */}
      {/* ========================================================================= */}
      <div className="relative bg-[#18181b] text-black py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-zinc-800">
        {/* Decorative Graffiti / Doodle Pattern Overlay SVG */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Center White Subscription Box */}
        <div className="relative z-10 max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5 border border-zinc-200">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-zinc-950 font-mono">
            JOIN THE FAM!
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-md mx-auto">
            Get exclusive early access to Limited Edition Collabs, New Products &amp; Surprise Deals!
          </p>

          {subscribed ? (
            <div className="bg-emerald-50 border border-emerald-500 text-emerald-700 rounded-xl p-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <Check className="w-4 h-4 stroke-[3]" /> You&apos;re officially part of the fam!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                placeholder="Your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
              <button
                type="submit"
                disabled={submitAction.isLoading}
                className="bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer transition-all active:scale-95 border-none shrink-0 disabled:opacity-60"
              >
                {submitAction.isLoading ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RICH DARK FOOTER LINKS SECTION */}
      {/* ========================================================================= */}
      <div className="bg-black text-white py-14 px-4 sm:px-6 lg:px-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 text-left">
          
          {/* Column 1: TOP SEARCHED */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider font-mono text-zinc-200">
              TOP SEARCHED
            </h3>
            <ul className="space-y-2 text-xs font-medium text-emerald-400">
              <li><a href="/shop?query=Sling+Bag" className="hover:text-emerald-300 transition-colors">Sling Bag for Men</a></li>
              <li><a href="/shop?query=Caps" className="hover:text-emerald-300 transition-colors">Caps for Men</a></li>
              <li><a href="/shop?query=Bucket+Hat" className="hover:text-emerald-300 transition-colors">Bucket Cap Hat</a></li>
              <li><a href="/shop?query=Beanie" className="hover:text-emerald-300 transition-colors">Beanie Cap</a></li>
              <li><a href="/shop?query=Baseball" className="hover:text-emerald-300 transition-colors">Baseball Cap</a></li>
              <li><a href="/shop?query=Wallets" className="hover:text-emerald-300 transition-colors">Wallets for men</a></li>
              <li><a href="/shop?query=T-Shirt" className="hover:text-emerald-300 transition-colors">Urban Streetwear T Shirt</a></li>
            </ul>
          </div>

          {/* Column 2: SHOP > */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider font-mono text-zinc-200">
              SHOP &gt;
            </h3>
            <ul className="space-y-2 text-xs font-medium text-emerald-400">
              <li><a href="/shop" className="hover:text-emerald-300 transition-colors">OG</a></li>
              <li><a href="/shop?category=Bags" className="hover:text-emerald-300 transition-colors">Bags</a></li>
              <li><a href="/shop?category=Headwear" className="hover:text-emerald-300 transition-colors">Headwear</a></li>
              <li><a href="/shop?category=Clothing" className="hover:text-emerald-300 transition-colors">Clothing</a></li>
              <li><a href="/shop?category=Wallets" className="hover:text-emerald-300 transition-colors">Wallets</a></li>
              <li><a href="/shop?category=Accessories" className="hover:text-emerald-300 transition-colors">Accessories</a></li>
              <li><a href="/shop?sale=true" className="hover:text-emerald-300 transition-colors font-bold text-yellow-400">SALE ⚡</a></li>
            </ul>
          </div>

          {/* Column 3: SUPPORT */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider font-mono text-zinc-200">
              SUPPORT
            </h3>
            <ul className="space-y-2 text-xs font-medium text-emerald-400">
              <li><a href="/login" className="hover:text-emerald-300 transition-colors">Login</a></li>
              <li><a href="/wishlist?tab=orders" className="hover:text-emerald-300 transition-colors">Track Order</a></li>
              <li><a href="/terms" className="hover:text-emerald-300 transition-colors">Return/ Exchange</a></li>
              <li><a href="/about" className="hover:text-emerald-300 transition-colors">Recycle</a></li>
              <li><a href="/faq" className="hover:text-emerald-300 transition-colors">FAQ&apos;s</a></li>
              <li><a href="/contact" className="hover:text-emerald-300 transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider font-mono text-zinc-200">
              ABOUT
            </h3>
            <ul className="space-y-2 text-xs font-medium text-emerald-400">
              <li><a href="/about" className="hover:text-emerald-300 transition-colors">Brand</a></li>
              <li><a href="/blog" className="hover:text-emerald-300 transition-colors">News</a></li>
              <li><a href="/careers" className="hover:text-emerald-300 transition-colors">Careers</a></li>
              <li><a href="/seller" className="hover:text-[#facc15] font-bold text-white transition-colors">Become a seller</a></li>
              <li><a href="/affiliate" className="hover:text-[#facc15] font-bold text-white transition-colors">Become an affiliate</a></li>
              <li><a href="/terms" className="hover:text-emerald-300 transition-colors">Our Policies</a></li>
              <li><a href="/terms" className="hover:text-emerald-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 5: JOIN THE FAM (Social Icon Squares) */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider font-mono text-zinc-200">
              JOIN THE FAM
            </h3>
            <div className="flex items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 border border-zinc-800 hover:border-[#facc15] rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#facc15] transition-all bg-zinc-950"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 border border-zinc-800 hover:border-[#facc15] rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#facc15] transition-all bg-zinc-950"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 border border-zinc-800 hover:border-[#facc15] rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#facc15] transition-all bg-zinc-950"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 border border-zinc-800 hover:border-[#facc15] rounded-xl flex items-center justify-center text-zinc-400 hover:text-[#facc15] transition-all bg-zinc-950"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>

            <p className="text-[10px] text-zinc-600 font-mono pt-4">
              &copy; {new Date().getFullYear()} DRIP HUNTER. All rights reserved.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
