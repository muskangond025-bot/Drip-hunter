"use client";

import React, { useState } from "react";

// Compile-guaranteed vector SVG icons
const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

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
    <footer className="bg-[#5e5e5e] text-white py-12 px-4 sm:px-8 lg:px-16 border-t border-[#4d4d4d] select-none font-sans">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/20 pb-5 mb-8 text-left">
          <h2 className="text-lg font-bold tracking-tight text-white font-sans">
            DripHunter
          </h2>
          
          <div className="flex items-center gap-2.5 text-xs font-semibold text-white font-sans">
            <a href="/privacy-policy" className="hover:underline transition-all">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:underline transition-all">Terms and conditions</a>
            <span>•</span>
            <a href="/contact" className="text-[#ebd26b] hover:underline transition-all">Contact Us</a>
          </div>
        </div>

        {/* Bottom Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Left Column: Logo & Description */}
          <div className="space-y-6 text-left">
            {/* Retro styled bold futuristic logo */}
            <div className="bg-black/90 px-5 py-2.5 rounded-xl border-2 border-[#bf5aff] shadow-[0_0_12px_rgba(191,90,255,0.5)] inline-block">
              <span className="font-extrabold text-xl tracking-wider text-[#d946ef] uppercase font-mono italic">
                DRIPHUNTER
              </span>
            </div>
            
            <div className="space-y-3.5">
              <div className="inline-block border-b border-[#ebd26b] pb-1">
                <span className="text-[10px] font-mono tracking-widest text-[#ebd26b] uppercase font-extrabold">
                  CONTACT
                </span>
              </div>
              
              <p className="text-xs text-white/90 leading-relaxed font-sans max-w-md font-medium">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam
              </p>
            </div>
          </div>

          {/* Right Column: Socials & Subscription */}
          <div className="space-y-5 text-left md:pl-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-white">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <InstagramIcon />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <FacebookIcon />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <TwitterIcon />
              </a>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-white font-medium font-sans">
                Don’t miss out exciting deals & events at Driphunter
              </p>

              {subscribed ? (
                <div className="bg-white/10 border border-[#ebd26b] text-[#ebd26b] rounded-xl p-3.5 text-xs font-mono font-bold tracking-wide uppercase">
                  ✓ Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex rounded-xl overflow-hidden border border-[#ebd26b] max-w-sm w-full bg-[#525252]">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-transparent border-none outline-none px-4 py-3.5 text-xs text-white placeholder-white font-medium w-full"
                  />
                  <button
                    type="submit"
                    className="bg-[#ebd26b] hover:bg-[#ebd26b]/90 text-zinc-900 font-extrabold text-xs px-6 py-3.5 transition-colors cursor-pointer border-none shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
