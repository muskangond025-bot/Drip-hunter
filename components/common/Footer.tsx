"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// Social SVG Icons (re-styled to match the image layout)
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full font-sans select-none bg-[#2d2d2d] text-white border-t border-zinc-700 py-12 md:py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: LOGO, CONTACT, SOCIALS */}
        {/* ========================================== */}
        <div className="md:col-span-5 space-y-6 text-left">
          
          {/* Premium Text-based Logo (No button capsule) */}
          <div className="flex flex-col items-start gap-1 select-none">
            <div className="text-[26px] font-heading font-black tracking-widest text-white leading-none">
              <span className="text-[#ebd26b]">DRIP</span>
              <span className="text-white relative ml-1">
                HUNTER
                <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-gradient-to-r from-[#ebd26b] to-orange-500 rounded-full animate-pulse" />
              </span>
            </div>
            <span className="text-[8px] font-mono tracking-[0.4em] text-zinc-400 uppercase font-black ml-0.5 mt-2">
              STREETWEAR ARCHIVE
            </span>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-[#ebd26b] uppercase font-bold border-b border-[#ebd26b]/80 pb-0.5 inline-block">
              CONTACT
            </span>
            <p className="text-xs text-zinc-300 max-w-sm pt-1 leading-relaxed font-medium">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
              Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut
              Enim Ad Minim Veniam
            </p>
          </div>

          {/* Social Follow (Moved further down with larger margin-top) */}
          <div className="flex items-center gap-4 pt-10 sm:pt-14 border-t border-zinc-800/30">
            <span className="text-sm font-black text-[#ebd26b] uppercase tracking-wider">
              Follow Us
            </span>
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-[#ebd26b] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-[#ebd26b] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-white hover:text-[#ebd26b] transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: LINKS AND SUBSCRIPTION */}
        {/* ========================================== */}
        <div className="md:col-span-7 space-y-10 flex flex-col justify-between h-full md:min-h-[220px]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 text-sm sm:text-base font-bold text-white text-left pt-2 md:pt-4">
            <div className="flex flex-col gap-3">
              <a href="/" className="hover:text-[#ebd26b] transition-colors">Home</a>
              <a href="/about" className="hover:text-[#ebd26b] transition-colors">About us</a>
              <a href="/explore" className="hover:text-[#ebd26b] transition-colors">Explore</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="/terms" className="hover:text-[#ebd26b] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#ebd26b] transition-colors">Terms and conditions</a>
              <a href="/affiliate" className="hover:text-[#ebd26b] transition-colors">Become an affiliate</a>
              <a href="#" className="hover:text-[#ebd26b] transition-colors">Manage preferences</a>
            </div>
          </div>

          {/* Subscription Capsule */}
          <div className="space-y-3.5 text-left w-full max-w-lg mt-auto">
            <p className="text-xs sm:text-sm font-semibold text-zinc-200">
              Don&apos;t miss out exciting deals &amp; events at Driphunter
            </p>
            
            {subscribed ? (
              <p className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest pt-2">
                ✓ Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center h-12 overflow-visible relative">
                <div className={cn(
                  "flex items-center h-full bg-[#1e1e1e] transition-all duration-500 ease-out overflow-hidden",
                  showInput 
                    ? "w-64 sm:w-80 opacity-100 px-4 border-y-2 border-l-2 border-[#ebd26b] rounded-l-2xl" 
                    : "w-0 opacity-0 px-0 border-transparent border-none"
                )}>
                  <input 
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white outline-none text-xs sm:text-sm placeholder-zinc-500 font-medium"
                  />
                </div>
                <button
                  type={showInput ? "submit" : "button"}
                  onClick={(e) => {
                    if (!showInput) {
                      e.preventDefault();
                      setShowInput(true);
                    }
                  }}
                  className={cn(
                    "bg-[#facc15] hover:bg-[#eab308] text-black font-black text-xs uppercase tracking-widest px-8 cursor-pointer transition-all duration-300 flex items-center justify-center shrink-0 h-full border-[#ebd26b]",
                    showInput ? "rounded-r-2xl border-y-2 border-r-2 border-l-0" : "rounded-2xl border-2"
                  )}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Underline Copyright details */}
      <div className="max-w-7xl mx-auto border-t border-zinc-700/60 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-400 gap-4">
        <p>&copy; {new Date().getFullYear()} DRIPHUNTER. All rights reserved.</p>
        <p className="font-mono text-zinc-500">[ SYSTEM: v0.1.0-ACTIVE ]</p>
      </div>

    </footer>
  );
}
