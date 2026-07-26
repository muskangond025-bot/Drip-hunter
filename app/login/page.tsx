"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { InteractiveLoginButton } from "@/components/ui/InteractiveLoginButton";
import { Mail, Lock, ArrowLeft, Shield, Check } from "lucide-react";

export interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Forgot password flow states
  const [authView, setAuthView] = useState<"login" | "forgot">("login");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // Local state for header sync
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load cart and wishlist to keep badge counts correct in the navbar header
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address (e.g. user@driphunter.com).");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const validateResetForm = () => {
    setResetEmailError("");
    if (!resetEmail) {
      setResetEmailError("Email address is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Enter a valid email address (e.g. user@driphunter.com).");
      return false;
    }
    return true;
  };

  const handleLoginClick = () => {
    return validateForm();
  };

  const handleLoginSuccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("registeredEmail", email);

      // Dispatch authorization state event to update active headers/navbars immediately
      window.dispatchEvent(new Event("auth-change"));

      // Redirect to dashboard/homepage
      window.location.href = "/";
    }
  };

  const handleRemoveFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("drip-cart", JSON.stringify(updated));
  };

  const handleRemoveFromWishlist = (id: number) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("drip-wishlist", JSON.stringify(updated));
  };

  const handleUpdateCartQuantity = (id: number, qty: number) => {
    const updated = cart.map(item => item.id === id ? { ...item, quantity: qty } : item);
    setCart(updated);
    localStorage.setItem("drip-cart", JSON.stringify(updated));
  };

  const handleAddToCart = (product: { id: number; brand: string; name: string; price: string; image: string }) => {
    const existing = cart.find(item => item.id === product.id);
    let updated;
    if (existing) {
      updated = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updated);
    localStorage.setItem("drip-cart", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 flex flex-col relative overflow-hidden select-none">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,90,40,0.06),transparent_60%)] pointer-events-none" />

      <Navbar
        cart={cart}
        wishlist={wishlist}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onAddToCart={handleAddToCart}
        loginOpen={false}
        setLoginOpen={() => { }}
      />

      <main className="flex-grow flex items-center justify-center pt-36 pb-20 px-4 z-10">
        <div className="max-w-md w-full">
          {/* Back button */}
          <button
            onClick={() => {
              if (authView === "forgot") {
                setAuthView("login");
              } else {
                window.location.href = "/";
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 transition-colors mb-6 group cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            {authView === "forgot" ? "BACK TO LOGIN" : "BACK TO STORE"}
          </button>

          {/* Glassmorphic Login Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f05a28]/5 rounded-full blur-2xl pointer-events-none" />

            {authView === "login" ? (
              <>
                <div className="space-y-2 mb-8 text-left">
                  <h1 className="text-3xl font-black tracking-tight font-mono uppercase text-zinc-950">
                    WELCOME BACK
                  </h1>
                  <p className="text-xs text-zinc-505 font-medium">
                    Enter your credentials to access your streetwear account and order history.
                  </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-left">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#f05a28]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="e.g. drip@driphunter.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4.5 py-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-all font-mono outline-none"
                    />
                    {emailError && (
                      <p className="text-[10px] text-red-500 font-mono font-bold">{emailError}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-[#f05a28]" />
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthView("forgot");
                          setResetSuccess(false);
                          setResetEmailError("");
                          setResetEmail("");
                        }}
                        className="text-[9px] font-mono font-bold text-[#f05a28] hover:text-[#d84e20] hover:underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError("");
                      }}
                      placeholder="••••••••"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4.5 py-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-all font-mono outline-none"
                    />
                    {passwordError && (
                      <p className="text-[10px] text-red-500 font-mono font-bold">{passwordError}</p>
                    )}
                  </div>

                  {/* Secure Tip Alert */}
                  <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-3 flex items-start gap-2.5 mt-2">
                    <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-500 font-medium leading-normal">
                      Your credentials are fully encrypted and transmitted securely. Never share your password.
                    </p>
                  </div>

                  {/* Interactive Morphing Button */}
                  <div className="pt-2">
                    <InteractiveLoginButton
                      type="submit"
                      onClick={handleLoginClick}
                      onAnimationComplete={handleLoginSuccess}
                      buttonText="Log In"
                      successText="ACCESS GRANTED"
                      className="w-full"
                    />
                  </div>
                </form>

                {/* Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200" />
                  </div>
                  <span className="relative bg-white px-4 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    OR CONTINUE WITH
                  </span>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => alert("Google Login flow initiating...")}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-xs font-mono font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-center text-zinc-750"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    GOOGLE
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Apple Login flow initiating...")}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-xs font-mono font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-center text-zinc-750"
                  >
                    <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.82M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
                    </svg>
                    APPLE
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-xs text-zinc-500 mt-8 text-center font-medium">
                  New to Drip Hunter?{" "}
                  <button
                    type="button"
                    onClick={() => alert("Please sign up in the quick nav drawer or check back later!")}
                    className="font-black text-[#f05a28] hover:text-[#d84e20] hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Create Account
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="space-y-2 mb-8 text-left">
                  <h1 className="text-3xl font-black tracking-tight font-mono uppercase text-zinc-950">
                    RESET PASSWORD
                  </h1>
                  <p className="text-xs text-zinc-505 font-medium">
                    Enter your email address and we&apos;ll send you a recovery link to restore access.
                  </p>
                </div>

                {resetSuccess ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-md">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                      A password reset link has been successfully sent to <strong className="text-zinc-950 font-bold">{resetEmail}</strong>. Please check your inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthView("login");
                        setResetSuccess(false);
                        setResetEmail("");
                      }}
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none"
                    >
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-left">
                    {/* Reset Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#f05a28]" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          if (resetEmailError) setResetEmailError("");
                        }}
                        placeholder="e.g. drip@driphunter.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4.5 py-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:bg-white transition-all font-mono outline-none"
                      />
                      {resetEmailError && (
                        <p className="text-[10px] text-red-500 font-mono font-bold">{resetEmailError}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <InteractiveLoginButton
                        type="submit"
                        onClick={validateResetForm}
                        onAnimationComplete={() => setResetSuccess(true)}
                        buttonText="Send Reset Link"
                        successText="LINK SENT"
                        className="w-full"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthView("login");
                        setResetEmailError("");
                      }}
                      className="w-full text-center text-xs font-mono font-bold text-zinc-505 hover:text-zinc-900 transition-colors py-2 bg-transparent border-none cursor-pointer"
                    >
                      BACK TO LOGIN
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
