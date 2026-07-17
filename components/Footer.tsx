"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Logo & About Column (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-chaney-title text-2xl sm:text-3xl text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.2)] uppercase">
              DRIP HUNTER
            </h2>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-sm">
              Premium curated streetwear archive compiled for modern urban culture. Wear your attitude without boundaries or constraints.
            </p>
            <div className="font-mono text-xs text-zinc-500">
              © {new Date().getFullYear()} Drip Hunter Inc. All Rights Reserved.
            </div>
          </div>

          {/* Quick Links Column (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-black tracking-widest uppercase text-zinc-300 font-mono">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li><a href="/shop" className="hover:text-yellow-400 transition-colors">Shop Catalog</a></li>
              <li><a href="/brands" className="hover:text-yellow-400 transition-colors">Explore Brands</a></li>
              <li><a href="/affiliate" className="hover:text-yellow-400 transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Refund Policies</a></li>
            </ul>
          </div>

          {/* Newsletter Column (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black tracking-widest uppercase text-zinc-300 font-mono">
              Subscribe to Newsletter
            </h3>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              Get direct drops on early access passwords, discount tags, and product previews.
            </p>

            {subscribed ? (
              <div className="bg-zinc-900 border border-yellow-400/30 text-yellow-400 rounded-xl p-4 font-mono text-xs uppercase tracking-wider animate-pulse">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 font-mono text-white"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Logo Text Decoration */}
        <div className="pt-12 text-center select-none opacity-10">
          <div className="font-chaney-title text-[7vw] sm:text-[9vw] leading-none tracking-tighter text-zinc-800 uppercase">
            DRIP HUNTER
          </div>
        </div>

      </div>
    </footer>
  );
}
