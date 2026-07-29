"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ChevronDown, Tag, Check, Heart, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractivePlaceOrderButton } from "@/components/ui/InteractivePlaceOrderButton";

interface CartItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

interface WishlistItem {
  id: number;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<"bag" | "address" | "payment" | "success">("bag");
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [showOffers, setShowOffers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  
  const [orderTotals, setOrderTotals] = useState({ mrp: 0, discount: 0, platform: 0, shipping: 0, giftWrap: 0, total: 0 });
  const [orderedAddressText, setOrderedAddressText] = useState("");
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);

  // Cart Dropdown States
  const [openSizeDropdownId, setOpenSizeDropdownId] = useState<number | null>(null);
  const [openQtyDropdownId, setOpenQtyDropdownId] = useState<number | null>(null);

  // Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Name of the customer",
      type: "Home" as const,
      addressText: "123 Street Wear Ave, Indira Nagar, Nashik, Maharashtra, 422009",
      contact: "1234567890",
      podAvailable: true,
      mapSrc: "/images/checkout_map_mockup.png",
      filter: ""
    },
    {
      id: 2,
      name: "Name of the customer",
      type: "Place" as const,
      addressText: "456 Corporate Tech Park, Satpur MIDC Main Rd, Nashik, Maharashtra, 422007",
      contact: "1234567890",
      podAvailable: false,
      mapSrc: "/images/checkout_map_mockup.png",
      filter: "hue-rotate(90deg)"
    }
  ]);

  // Address Modal States
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [formName, setFormName] = useState("");
  const [formAddressText, setFormAddressText] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formType, setFormType] = useState<"Home" | "Place">("Home");
  const [formPodAvailable, setFormPodAvailable] = useState(true);

  // Gift Card States
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardPin, setGiftCardPin] = useState("");
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);
  const [giftCardError, setGiftCardError] = useState("");
  const [giftCardSuccess, setGiftCardSuccess] = useState("");

  // Coupons States
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCodeApplied, setCouponCodeApplied] = useState("DRIP10");
  const [couponDiscount, setCouponDiscount] = useState(10);
  const [couponInput, setCouponInput] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [couponError, setCouponError] = useState("");

  // Gift Wrap State
  const [hasGiftWrap, setHasGiftWrap] = useState(false);

  // Know More Info Modals State
  const [knowMoreType, setKnowMoreType] = useState<"platform" | "shipping" | "card" | null>(null);

  // Payment states
  const [activePaymentTab, setActivePaymentTab] = useState<"cod" | "upi" | "card" | "wallet" | "netbanking">("cod");
  const [captchaText, setCaptchaText] = useState("CAPTCHA");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [selectedUpi, setSelectedUpi] = useState("phonepe");
  const [selectedWallet, setSelectedWallet] = useState("airtel");
  const [selectedBank, setSelectedBank] = useState("axis");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardError, setCardError] = useState("");

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setCaptchaInput("");
    setCaptchaError("");
  };

  useEffect(() => {
    if (checkoutStep === "payment") {
      refreshCaptcha();
    }
  }, [checkoutStep]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("drip-cart");
      if (savedCart) {
        try { 
          const parsed = JSON.parse(savedCart);
          setCart(parsed.map((item: any) => ({ ...item, size: item.size || "L" }))); 
        } catch (e) { 
          console.error(e); 
        }
      }
      const savedWishlist = localStorage.getItem("drip-wishlist");
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }
    }
  }, []);

  // Save cart changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", JSON.stringify(newCart));
    }
  };

  // Cart actions
  const handleRemoveFromCart = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const handleUpdateCartQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
    saveCart(updated);
  };

  const handleUpdateCartSize = (id: number, size: string) => {
    const updated = cart.map((item) => (item.id === id ? { ...item, size } : item));
    saveCart(updated);
  };

  const handleRemoveFromWishlist = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-wishlist", JSON.stringify(updated));
    }
  };

  const handleAddToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      handleUpdateCartQuantity(product.id, existing.quantity + 1);
    } else {
      saveCart([...cart, { ...product, quantity: 1, size: "L" }]);
    }
  };

  // Address Actions
  const handleRemoveAddress = (id: number) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);
    if (selectedAddress === id && updated.length > 0) {
      setSelectedAddress(updated[0].id);
    }
  };

  const handleEditAddress = (addr: any) => {
    setEditingAddress(addr);
    setFormName(addr.name);
    setFormAddressText(addr.addressText);
    setFormContact(addr.contact);
    setFormType(addr.type);
    setFormPodAvailable(addr.podAvailable);
    setIsAddressModalOpen(true);
  };

  const handleAddNewAddressClick = () => {
    setEditingAddress(null);
    setFormName("");
    setFormAddressText("");
    setFormContact("");
    setFormType("Home");
    setFormPodAvailable(true);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddressText.trim() || !formContact.trim()) {
      alert("All fields are required");
      return;
    }
    
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? {
        ...addr,
        name: formName,
        addressText: formAddressText,
        contact: formContact,
        type: formType,
        podAvailable: formPodAvailable
      } : addr));
    } else {
      const newId = Date.now();
      setAddresses(prev => [...prev, {
        id: newId,
        name: formName,
        type: formType,
        addressText: formAddressText,
        contact: formContact,
        podAvailable: formPodAvailable,
        mapSrc: "/images/checkout_map_mockup.png",
        filter: "hue-rotate(180deg)"
      }]);
      setSelectedAddress(newId);
    }
    setIsAddressModalOpen(false);
  };

  // Gift Card Action (Figma Dialog)
  const handleApplyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    const code = giftCardCode.trim();
    const pin = giftCardPin.trim();

    if (!code || code.length < 16) {
      setGiftCardError("Please enter a valid 16-digit Gift Card number");
      return;
    }
    if (!pin || pin.length < 6) {
      setGiftCardError("Please enter a valid 6-digit Gift Card PIN");
      return;
    }

    if (code === "DRIP50") {
      setGiftCardDiscount(50);
    } else if (code === "FREE20") {
      setGiftCardDiscount(20);
    } else {
      setGiftCardDiscount(30);
    }

    setGiftCardSuccess("successfully saved ₹ 30");
    setGiftCardError("");

    // Clear inputs immediately so numbers do not show
    setGiftCardCode("");
    setGiftCardPin("");
  };

  // Coupons Action
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "DRIP10") {
      setCouponDiscount(10);
      setCouponCodeApplied("DRIP10");
      setCouponSuccess("Coupon code applied successfully! $10.00 saved.");
      setCouponError("");
    } else if (code === "SLAY20") {
      setCouponDiscount(20);
      setCouponCodeApplied("SLAY20");
      setCouponSuccess("Coupon code applied successfully! $20.00 saved.");
      setCouponError("");
    } else {
      setCouponError("Invalid Coupon code! Try 'DRIP10' or 'SLAY20'.");
      setCouponSuccess("");
    }
  };

  // Price calculations
  const totalMrp = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 40;
    return sum + priceNum * item.quantity;
  }, 0);

  const discountOnMrp = totalMrp * 0.15; // 15% discount
  const platformFee = cart.length > 0 ? 2 : 0;
  const shippingFee = cart.length > 0 && totalMrp > 100 ? 0 : 10;
  const giftWrapFee = hasGiftWrap ? 4 : 0;
  const totalAmount = Math.max(0, totalMrp - discountOnMrp - couponDiscount - giftCardDiscount + platformFee + shippingFee + giftWrapFee);

  const handlePlaceOrder = () => {
    const activeAddr = addresses.find(a => a.id === selectedAddress);
    const addrStr = activeAddr 
      ? `${activeAddr.name}, ${activeAddr.addressText}, Contact: ${activeAddr.contact}`
      : "Name of the customer, 123 Street Wear Ave, Indira Nagar, Nashik, Maharashtra, 422009";

    setOrderTotals({
      mrp: totalMrp,
      discount: discountOnMrp + couponDiscount + giftCardDiscount,
      platform: platformFee,
      shipping: shippingFee,
      giftWrap: giftWrapFee,
      total: totalAmount
    });
    setOrderedAddressText(addrStr);
    setOrderedItems(cart);
    setCheckoutStep("success");
    if (typeof window !== "undefined") {
      localStorage.setItem("drip-cart", "[]");
      // Trigger a navbar sync event
      window.dispatchEvent(new Event("storage"));
    }
  };

  const validateCod = () => {
    if (captchaInput.trim().toLowerCase() !== captchaText.toLowerCase()) {
      setCaptchaError("Invalid Captcha code!");
      return false;
    }
    setCaptchaError("");
    return true;
  };

  const validateCard = () => {
    if (!cardNumber || cardNumber.length < 16) {
      setCardError("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardName.trim()) {
      setCardError("Please enter the cardholder's name");
      return false;
    }
    if (!cardExpiry || !cardExpiry.includes("/")) {
      setCardError("Please enter expiry in MM/YY format");
      return false;
    }
    if (!cardCvv || cardCvv.length < 3) {
      setCardError("Please enter a valid 3-digit CVV");
      return false;
    }
    setCardError("");
    return true;
  };

  const validateGeneric = () => {
    if (activePaymentTab === "cod") {
      return validateCod();
    }
    if (activePaymentTab === "card") {
      return validateCard();
    }
    return true;
  };

  // Static recommendations
  const recommendedProducts = [
    { id: 101, name: "Premium Vintage Graphic Tee", price: "$49.00", image: "https://img105.savana.com/4b8e375e990c4f80ba1c1b79546897bd.webp" },
    { id: 102, name: "Retro Tokyo Street Tee", price: "$52.00", image: "https://img105.savana.com/156220e3ccb24d899323dae724a3951b.webp" },
    { id: 103, name: "Downtown Oversized hoodie", price: "$75.00", image: "https://img105.savana.com/fd912543884c43c892a39219b2f63738.webp" },
    { id: 104, name: "Slouchy Acid Cargo Pants", price: "$85.00", image: "https://img104.savana.com/v1/7fc092a1c5374de19f465edcf4fea863_w540_q85.webp" },
    { id: 105, name: "Urban Streetwear Cap", price: "$32.00", image: "https://img105.savana.com/9fd50237d6cc4ff08ede7e37689cf3dc.webp" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground select-none">
      
      {/* Navigation Header */}
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

      {/* Stepper Progress Bar */}
      <div className="w-full bg-white border-b border-zinc-100 sticky top-20 z-40">
        <div className="flex items-center justify-center gap-6 py-6 max-w-xl mx-auto w-full font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-400">
          <span className={checkoutStep === "bag" ? "text-orange-500 underline underline-offset-8 decoration-2" : "text-zinc-800"}>
            1. Bag
          </span>
          <span className="text-zinc-300">--------</span>
          <span className={checkoutStep === "address" ? "text-orange-500 underline underline-offset-8 decoration-2" : "text-zinc-800"}>
            2. Address
          </span>
          <span className="text-zinc-300">--------</span>
          <span className={checkoutStep === "payment" ? "text-orange-500 underline underline-offset-8 decoration-2" : "text-zinc-800"}>
            3. Payment
          </span>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Step 1: BAG View */}
        {checkoutStep === "bag" && (
          <div className="flex flex-col gap-10">
            {cart.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center gap-4 animate-fade-in">
                <h2 className="text-xl font-bold font-mono uppercase text-zinc-800">Your Bag is Empty</h2>
                <a href="/shop" className="px-6 py-3 bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-black transition-colors">
                  Shop Streetwear
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column (Bag Items) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Deliver to address preview */}
                  <div className="border border-zinc-200 rounded-2xl p-5 flex items-center justify-between bg-white shadow-3xs">
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Deliver to :</span>
                      <h4 className="text-sm font-bold text-zinc-955">Name of the Customer</h4>
                      <p className="text-xs text-zinc-500 mt-1 max-w-md line-clamp-1">
                        123 Street Wear Ave, Indira Nagar, Nashik, Maharashtra, 422009
                      </p>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep("address")}
                      className="px-4 py-2 border border-orange-500 text-orange-500 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-orange-50/50 transition-all cursor-pointer bg-transparent"
                    >
                      Change Address
                    </button>
                  </div>

                  {/* Available Offers dropdown */}
                  <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold font-mono">!</div>
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold">Available Offers</h4>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-650 font-medium">
                      <li>• 10% Instant Discount on SBI Credit Cards on min spend of $50.</li>
                      <li>• 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.</li>
                      {showOffers && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-2 space-y-2 text-left"
                        >
                          <li>• Get extra $10 cashback on UPI payment via DripPay.</li>
                          <li>• Free delivery on orders above $100.</li>
                        </motion.div>
                      )}
                    </ul>
                    <button 
                      onClick={() => setShowOffers(!showOffers)}
                      className="text-[10px] font-bold text-orange-500 mt-4 flex items-center gap-1 uppercase tracking-wider cursor-pointer bg-transparent border-none p-0"
                    >
                      {showOffers ? "Show Less" : "Show More"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOffers ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Price drop Alert notice */}
                  <div className="border border-green-200 bg-green-50/30 rounded-2xl p-4 flex items-center justify-between text-left">
                    <div className="flex items-center gap-2.5">
                      <span className="text-green-600 text-sm">💡</span>
                      <p className="text-xs font-medium text-green-800">
                        Price drop alert! You saved an additional $15 on items in your bag.
                      </p>
                    </div>
                    <button 
                      onClick={() => alert("Price Drop Details: A system discount has been successfully applied to your items.")}
                      className="text-[10px] font-mono font-bold text-green-700 uppercase tracking-widest cursor-pointer bg-transparent border-none"
                    >
                      View
                    </button>
                  </div>

                  {/* Items list selection header */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer" />
                      <span className="text-xs font-black font-mono uppercase tracking-wider text-zinc-955 font-bold">{cart.length}/{cart.length} Item Selected</span>
                    </div>
                    <button 
                      onClick={() => saveCart([])}
                      className="text-xs font-bold text-zinc-500 hover:text-red-500 uppercase tracking-wider cursor-pointer bg-transparent border-none"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 40;
                      const oldPrice = priceNum * 1.5;
                      const oldPriceStr = `$${oldPrice.toFixed(0)}`;

                      return (
                        <div key={item.id} className="border border-zinc-200 rounded-2xl p-4 flex gap-4 bg-white shadow-3xs relative text-left">
                          
                          {/* Remove X Button */}
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-black cursor-pointer bg-transparent border-none"
                          >
                            ✕
                          </button>

                          {/* Item Image */}
                          <div className="relative w-24 aspect-[3/4] bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-100">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>

                          {/* Item Details */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{item.brand || "Almost Gods"}</span>
                              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight line-clamp-1 mt-0.5">{item.name}</h4>
                              <span className="text-[10px] text-zinc-500 mt-1 block">Sold by: Sellers Name</span>
                              
                              {/* Dropdowns */}
                              <div className="flex gap-3 mt-3 relative">
                                
                                {/* Size Dropdown Selector */}
                                <div className="relative">
                                  <button
                                    onClick={() => {
                                      setOpenSizeDropdownId(openSizeDropdownId === item.id ? null : item.id);
                                      setOpenQtyDropdownId(null);
                                    }}
                                    className="flex items-center gap-1 border border-zinc-200 px-2.5 py-1 rounded-lg bg-zinc-50 text-[10px] font-bold font-mono cursor-pointer"
                                  >
                                    <span>Size: {item.size || "L"}</span>
                                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                                  </button>
                                  {openSizeDropdownId === item.id && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-250 rounded-lg shadow-md z-30 min-w-[70px] overflow-hidden">
                                      {["S", "M", "L", "XL"].map((sz) => (
                                        <button
                                          key={sz}
                                          onClick={() => {
                                            handleUpdateCartSize(item.id, sz);
                                            setOpenSizeDropdownId(null);
                                          }}
                                          className="w-full text-left px-3 py-2 text-[10px] font-mono hover:bg-zinc-50 font-bold text-zinc-700"
                                        >
                                          {sz}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Qty Dropdown Selector */}
                                <div className="relative">
                                  <button
                                    onClick={() => {
                                      setOpenQtyDropdownId(openQtyDropdownId === item.id ? null : item.id);
                                      setOpenSizeDropdownId(null);
                                    }}
                                    className="flex items-center gap-1 border border-zinc-200 px-2.5 py-1 rounded-lg bg-zinc-50 text-[10px] font-bold font-mono cursor-pointer"
                                  >
                                    <span>Qty: {item.quantity}</span>
                                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                                  </button>
                                  {openQtyDropdownId === item.id && (
                                    <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-250 rounded-lg shadow-md z-30 min-w-[70px] overflow-hidden">
                                      {[1, 2, 3, 4, 5].map((q) => (
                                        <button
                                          key={q}
                                          onClick={() => {
                                            handleUpdateCartQuantity(item.id, q);
                                            setOpenQtyDropdownId(null);
                                          }}
                                          className="w-full text-left px-4 py-2 text-[10px] font-mono hover:bg-zinc-50 font-bold text-zinc-700"
                                        >
                                          {q}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <span className="text-[9px] font-mono font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md uppercase self-center">1 Left</span>
                              </div>
                            </div>

                            {/* Prices row */}
                            <div className="mt-4 border-t border-zinc-100 pt-3 flex flex-col gap-2">
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-black text-zinc-955">{item.price}</span>
                                <span className="text-xs text-zinc-400 line-through">{oldPriceStr}</span>
                                <span className="text-xs font-bold text-orange-500">(33% OFF)</span>
                              </div>

                              <div className="flex flex-col gap-1 text-[10px] text-zinc-555 font-mono">
                                <span className="flex items-center gap-1 text-left">
                                  <Check className="w-3.5 h-3.5 text-zinc-400" /> 14 Days return available
                                </span>
                                <span className="flex items-center gap-1 text-left">
                                  <Check className="w-3.5 h-3.5 text-zinc-400" /> Delivery by 2-3 business days
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add more from Wishlist link */}
                  <a 
                    href="/wishlist" 
                    className="border border-dashed border-zinc-300 rounded-2xl p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs font-black font-mono uppercase tracking-wider text-zinc-700">Add more from Wishlist</span>
                    </div>
                    <span className="text-zinc-400">➔</span>
                  </a>

                </div>

                {/* Right Column (Coupons & Pricing Summary) */}
                <div className="space-y-6">
                  
                  {/* Coupons Section */}
                  <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs text-left">
                    <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold mb-4">Coupons</h4>
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-mono font-bold text-zinc-805">
                          {couponCodeApplied ? `Coupon Applied: ${couponCodeApplied}` : "No. of Coupon applied"}
                        </span>
                      </div>
                      <button 
                        onClick={() => setIsCouponModalOpen(true)}
                        className="text-xs font-bold text-orange-500 hover:underline uppercase tracking-wider cursor-pointer bg-transparent border-none"
                      >
                        Edit
                      </button>
                    </div>
                    {couponDiscount > 0 && (
                      <p className="text-[10px] font-mono text-green-600 mt-2">You saved additional ${couponDiscount.toFixed(2)} on this order!</p>
                    )}
                  </div>

                  {/* Gift Wrap Promo */}
                  <div className="border border-zinc-200 rounded-2xl p-5 bg-[#fafafa]/80 flex gap-4 text-left shadow-3xs relative overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-zinc-200/50 flex items-center justify-center text-lg flex-shrink-0">
                      🎁
                    </div>
                    <div>
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold">Buying for someone special?</h4>
                      <p className="text-[10px] text-zinc-555 mt-1 leading-normal font-mono">
                        Gift wrap and personalized message card only for $4.
                      </p>
                      <button 
                        onClick={() => setHasGiftWrap(!hasGiftWrap)}
                        className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-2 hover:underline cursor-pointer bg-transparent border-none"
                      >
                        {hasGiftWrap ? "Remove Gift wrap" : "Add Gift wrap"}
                      </button>
                    </div>
                  </div>

                  {/* Price Details Block */}
                  <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-3xs text-left">
                    <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold border-b border-zinc-100 pb-3 mb-4">
                      Price Details ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                    </h4>
                    
                    <div className="space-y-3.5 text-xs font-medium text-zinc-655 border-b border-zinc-100 pb-4">
                      <div className="flex justify-between">
                        <span>Total MRP</span>
                        <span className="text-zinc-900 font-bold">${totalMrp.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount on MRP</span>
                        <span className="text-green-600 font-bold">-${discountOnMrp.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coupon Discount Amount</span>
                        <span className="text-green-600 font-bold">-${couponDiscount.toFixed(2)}</span>
                      </div>
                      {hasGiftWrap && (
                        <div className="flex justify-between">
                          <span>Gift Wrap Charge</span>
                          <span className="text-zinc-900 font-bold">${giftWrapFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1 text-left">Platform Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("platform")}>Know More</strong></span>
                        <span className="text-zinc-900 font-bold">${platformFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1 text-left">Shipping Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("shipping")}>Know More</strong></span>
                        <span className="text-zinc-955 font-bold font-mono">
                          {shippingFee === 0 ? <span className="text-green-655 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm font-black text-zinc-955 py-4">
                      <span>Total Amount</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>

                    <button 
                      onClick={() => setCheckoutStep("address")}
                      className="w-full bg-[#f05a28] hover:bg-[#d84e20] text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors shadow-lg cursor-pointer text-center"
                    >
                      Place Order
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* Bottom recommendations layout */}
            <div className="w-full border-t border-zinc-100 pt-12 text-left">
              <h3 className="text-lg font-black font-mono tracking-wider text-zinc-955 uppercase mb-8">
                You may also like:
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {recommendedProducts.map((item) => (
                  <div key={item.id} className="group border border-zinc-200 rounded-2xl p-3 bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div className="relative aspect-[3/4] bg-zinc-50 rounded-xl overflow-hidden mb-3">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-zinc-800 line-clamp-1 uppercase tracking-tight">{item.name}</h4>
                      <p className="text-xs font-black text-zinc-955 mt-1">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => handleAddToCart({ id: item.id, brand: "Almost Gods", name: item.name, price: item.price, image: item.image })}
                      className="w-full bg-zinc-950 hover:bg-black text-[#ebd26b] font-bold text-[9px] uppercase tracking-widest py-2 rounded-lg cursor-pointer mt-3 transition-colors text-center"
                    >
                      Move to Bag
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Step 2: ADDRESS View */}
        {checkoutStep === "address" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column (Address Box Details) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Dynamic addresses mapping */}
              {addresses.length === 0 ? (
                <div className="border border-dashed border-zinc-300 rounded-2xl p-10 text-center bg-white">
                  <p className="text-xs font-mono font-bold text-zinc-400 uppercase">No address details saved</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`border rounded-2xl p-5 flex gap-4 bg-white shadow-3xs cursor-pointer text-left transition-all duration-300 relative ${
                        selectedAddress === addr.id ? "border-yellow-400 ring-2 ring-yellow-400/20" : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {/* Radio button */}
                      <input 
                        type="radio" 
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="w-4 h-4 rounded-full border-zinc-300 accent-black mt-1 cursor-pointer flex-shrink-0"
                      />

                      <div className="flex-grow flex flex-col md:flex-row justify-between gap-5">
                        <div className="flex-grow space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold font-mono text-zinc-500 uppercase">Default Address</span>
                          </div>

                          <div className="flex items-baseline gap-2 pt-2">
                            <h4 className="text-sm font-bold text-zinc-955 font-bold">Name of the customer</h4>
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              addr.type === "Home" ? "text-green-700 bg-green-50" : "text-orange-700 bg-orange-50"
                            }`}>{addr.type}</span>
                          </div>

                          <p className="text-xs text-zinc-555 leading-normal max-w-sm">
                            {addr.addressText}
                          </p>
                          <span className="text-xs text-zinc-655 font-medium block pt-1 font-mono">Contact no : {addr.contact}</span>
                          
                          <div className="flex items-center gap-2.5 pt-2 text-[10px] font-mono">
                            <span className={`w-1.5 h-1.5 rounded-full ${addr.podAvailable ? "bg-green-500" : "bg-red-500"}`} />
                            <span className={`${addr.podAvailable ? "text-green-700" : "text-red-700"} font-bold uppercase tracking-wider`}>
                              Pay on Delivery {addr.podAvailable ? "Available" : "Unavailable"}
                            </span>
                          </div>

                          {/* Actions row */}
                          <div className="flex gap-4 pt-4 border-t border-zinc-100">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveAddress(addr.id);
                              }}
                              className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none p-0"
                            >
                              Remove
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(addr);
                              }}
                              className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline cursor-pointer bg-transparent border-none p-0"
                            >
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Map thumbnail preview */}
                        <div className="relative w-44 h-32 rounded-xl overflow-hidden border border-zinc-200/50 flex-shrink-0 self-center shadow-3xs">
                          <Image src={addr.mapSrc} alt={`map address ${addr.id}`} fill className="object-cover" style={{ filter: addr.filter }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address button */}
              <button 
                onClick={handleAddNewAddressClick}
                className="w-full border border-dashed border-zinc-300 rounded-2xl p-5 flex items-center justify-center gap-2 text-orange-500 font-black font-mono text-xs uppercase tracking-wider hover:bg-zinc-50 transition-colors cursor-pointer bg-transparent"
              >
                <span>+</span> Add new Address
              </button>

            </div>

            {/* Right Column (Delivery estimates & payment price check) */}
            <div className="space-y-6">
              
              {/* Delivery Estimate Box */}
              <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs text-left">
                <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-950 font-bold border-b border-zinc-100 pb-3 mb-4">
                  Delivery Estimate
                </h4>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-12 h-14 bg-zinc-50 rounded-lg overflow-hidden border border-zinc-200/50 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow text-xs font-mono">
                        <span className="text-zinc-400 block text-[10px]">Estimated delivery by</span>
                        <strong className="text-zinc-955 font-bold">2-3 business days</strong>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary block */}
              <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-3xs text-left">
                <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold border-b border-zinc-100 pb-3 mb-4">
                  Price Details ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h4>
                
                <div className="space-y-3.5 text-xs font-medium text-zinc-650 border-b border-zinc-100 pb-4">
                  <div className="flex justify-between">
                    <span>Total MRP</span>
                    <span className="text-zinc-900 font-bold">${totalMrp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount on MRP</span>
                    <span className="text-green-600 font-bold">-${discountOnMrp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon Discount Amount</span>
                    <span className="text-green-600 font-bold">-${couponDiscount.toFixed(2)}</span>
                  </div>
                  {hasGiftWrap && (
                    <div className="flex justify-between">
                      <span>Gift Wrap Charge</span>
                      <span className="text-zinc-900 font-bold">${giftWrapFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-left">Platform Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("platform")}>Know More</strong></span>
                    <span className="text-zinc-900 font-bold">${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-left">Shipping Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("shipping")}>Know More</strong></span>
                    <span className="text-zinc-900 font-bold">
                      {shippingFee === 0 ? <span className="text-green-650 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm font-black text-zinc-955 py-4">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => setCheckoutStep("payment")}
                  className="w-full bg-[#f05a28] hover:bg-[#d84e20] text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors shadow-lg cursor-pointer text-center animate-pulse"
                >
                  Place Order
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Step 3: PAYMENT View */}
        {checkoutStep === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column (Payment Mode Tabs) */}
            <div className="lg:col-span-2 space-y-6 text-left animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-black font-mono tracking-wider uppercase text-zinc-955 font-bold">Mode of payment</span>
              </div>

              {/* Available Offers block */}
              <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-3xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold font-mono">!</span>
                  <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold">Available Offers</h4>
                </div>
                <ul className="space-y-2 text-xs text-zinc-655 font-medium">
                  <li>• Offer Details: 10% Instant Discount on SBI Credit Cards on min spend of $50.</li>
                </ul>
                <button 
                  onClick={() => setShowOffers(!showOffers)}
                  className="text-[10px] font-bold text-orange-500 mt-4 flex items-center gap-1 uppercase tracking-wider cursor-pointer bg-transparent border-none p-0"
                >
                  Show More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOffers ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Tabs Container */}
              <div className="border border-zinc-200 rounded-3xl overflow-hidden bg-white shadow-3xs flex flex-col sm:flex-row min-h-[380px]">
                
                {/* Tabs List */}
                <div className="w-full sm:w-2/5 border-b sm:border-b-0 sm:border-r border-zinc-200 flex flex-col bg-zinc-50/50">
                  <button
                    onClick={() => setActivePaymentTab("cod")}
                    className={`flex items-center gap-3 px-5 py-4.5 text-xs font-mono font-bold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activePaymentTab === "cod" ? "bg-orange-500 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span>💵</span> Cash On Delivery (Cash/UPI)
                  </button>
                  <button
                    onClick={() => setActivePaymentTab("upi")}
                    className={`flex items-center gap-3 px-5 py-4.5 text-xs font-mono font-bold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activePaymentTab === "upi" ? "bg-orange-500 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span>📱</span> Pay By Any UPI App
                  </button>
                  <button
                    onClick={() => setActivePaymentTab("card")}
                    className={`flex items-center gap-3 px-5 py-4.5 text-xs font-mono font-bold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activePaymentTab === "card" ? "bg-orange-500 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span>💳</span> Credit/Debit Card
                  </button>
                  <button
                    onClick={() => setActivePaymentTab("wallet")}
                    className={`flex items-center gap-3 px-5 py-4.5 text-xs font-mono font-bold tracking-wider uppercase text-left transition-all border-b border-zinc-100 cursor-pointer ${
                      activePaymentTab === "wallet" ? "bg-orange-500 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span>👜</span> Digital Wallets
                  </button>
                  <button
                    onClick={() => setActivePaymentTab("netbanking")}
                    className={`flex items-center gap-3 px-5 py-4.5 text-xs font-mono font-bold tracking-wider uppercase text-left cursor-pointer ${
                      activePaymentTab === "netbanking" ? "bg-orange-500 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span>🏛️</span> Net Banking
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="w-full sm:w-3/5 bg-zinc-50 p-6 flex flex-col justify-between">
                  
                  {/* CASH ON DELIVERY TAB */}
                  {activePaymentTab === "cod" && (
                    <div className="space-y-5 text-left">
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-800">Cash on Delivery (Cash/UPI)</h4>
                      
                      <div className="bg-zinc-200/50 border border-zinc-300 rounded-xl p-3.5 text-[10px] font-mono text-zinc-650 leading-relaxed">
                        Extra charges applied for cash on delivery option.
                      </div>

                      {/* Captcha box */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          {/* Stylized Captcha code */}
                          <div className="bg-white border-2 border-zinc-300 rounded-xl px-6 py-2.5 font-chaney-title text-base tracking-widest text-zinc-800 select-none shadow-3xs relative overflow-hidden flex items-center justify-center min-w-[140px] italic font-bold">
                            <span className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
                            {captchaText}
                          </div>
                          
                          {/* Refresh Captcha */}
                          <button 
                            type="button"
                            onClick={refreshCaptcha}
                            className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-650 shadow-3xs cursor-pointer"
                            title="Refresh Captcha"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Input Captcha field */}
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            placeholder="Enter Captcha from above image*"
                            value={captchaInput}
                            onChange={(e) => {
                              setCaptchaInput(e.target.value);
                              setCaptchaError("");
                            }}
                            className="w-full border border-zinc-300 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono"
                          />
                          {captchaError && (
                            <p className="text-[10px] text-red-500 font-mono font-bold text-left">{captchaError}</p>
                          )}
                        </div>

                        <p className="text-[10px] text-zinc-500 font-mono">You can pay via Cash/UPI on delivery</p>
                      </div>

                      <InteractivePlaceOrderButton
                        onClick={validateCod}
                        onAnimationComplete={handlePlaceOrder}
                        buttonText="Place Order"
                        className="w-full"
                        wrapperClassName="w-full"
                      />
                    </div>
                  )}

                  {/* UPI TABS */}
                  {activePaymentTab === "upi" && (
                    <div className="space-y-5 text-left">
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-800">Pay Using UPI</h4>
                      
                      <div className="space-y-3">
                        {/* PhonePe Radio Button with Logo */}
                        <label className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
                          <input 
                            type="radio" 
                            checked={selectedUpi === "phonepe"} 
                            onChange={() => setSelectedUpi("phonepe")} 
                            className="accent-black w-4 h-4 cursor-pointer" 
                          />
                          <div className="w-7 h-7 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center bg-[#5F259F]">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 16.5H11V13.5L9.5 15L8.09 13.59L12 9.68L15.91 13.59L14.5 15L13 13.5V16.5ZM15.5 8.5H8.5V7H15.5V8.5Z" fill="white" />
                            </svg>
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-850">Phonepe</span>
                        </label>

                        {/* Google Pay Radio Button with Logo */}
                        <label className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
                          <input 
                            type="radio" 
                            checked={selectedUpi === "googlepay"} 
                            onChange={() => setSelectedUpi("googlepay")} 
                            className="accent-black w-4 h-4 cursor-pointer" 
                          />
                          <div className="w-7 h-7 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center bg-zinc-50 border border-zinc-200">
                            <svg className="w-5 h-4" viewBox="0 0 40 24" fill="none">
                              <rect width="40" height="24" rx="3" fill="white"/>
                              <path d="M14 6H10V18H14C15.5 18 16.5 17 16.5 15.5C16.5 14 15.5 13 14 13" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="23" cy="12" r="4" fill="#EA4335" />
                              <circle cx="31" cy="12" r="3.5" fill="#FBBC05" />
                              <circle cx="7" cy="12" r="3" fill="#34A853" />
                            </svg>
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-855">Google pay</span>
                        </label>

                        {/* Paytm Radio Button with Logo */}
                        <label className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
                          <input 
                            type="radio" 
                            checked={selectedUpi === "paytm"} 
                            onChange={() => setSelectedUpi("paytm")} 
                            className="accent-black w-4 h-4 cursor-pointer" 
                          />
                          <div className="w-7 h-7 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center bg-sky-50 border border-[#00baf2]/20">
                            <span className="text-[7px] font-black font-mono text-[#002970] italic">Paytm</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-855">Paytm</span>
                        </label>
                      </div>

                      <InteractivePlaceOrderButton
                        onAnimationComplete={handlePlaceOrder}
                        buttonText="Place Order"
                        className="w-full"
                        wrapperClassName="w-full"
                      />
                    </div>
                  )}

                  {/* CREDIT/DEBIT CARD TAB */}
                  {activePaymentTab === "card" && (
                    <div className="space-y-4 text-left">
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-805">Credit/Debit Card</h4>
                      
                      {/* Kotak Discount Card mockup */}
                      <div className="bg-red-50/50 border border-red-200 rounded-xl p-3.5 flex gap-3 text-left">
                        <span className="text-red-500 text-lg">💳</span>
                        <div>
                          <h5 className="text-[10px] font-bold font-mono text-red-700 uppercase">No% Discount</h5>
                          <p className="text-[9px] font-mono text-red-655 mt-0.5">Up to on every spends with Kotak Credit Card. T&C</p>
                        </div>
                      </div>

                      <p className="text-[9px] font-mono text-zinc-555 leading-normal">
                        Please ensure your card can be used for online transactions.{" "}
                        <strong className="text-orange-500 cursor-pointer hover:underline" onClick={() => setKnowMoreType("card")}>
                          Know More
                        </strong>
                      </p>

                      <div className="space-y-3 pt-1">
                        <input 
                          type="text" 
                          placeholder="Card number"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 16));
                            setCardError("");
                          }}
                          className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono"
                        />
                        <input 
                          type="text" 
                          placeholder="Name on card"
                          value={cardName}
                          onChange={(e) => {
                            setCardName(e.target.value);
                            setCardError("");
                          }}
                          className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            placeholder="Valid Thru (MM/YY)"
                            value={cardExpiry}
                            onChange={(e) => {
                              setCardExpiry(e.target.value.slice(0, 5));
                              setCardError("");
                            }}
                            className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono"
                          />
                          <input 
                            type="password" 
                            placeholder="CVV"
                            value={cardCvv}
                            onChange={(e) => {
                              setCardCvv(e.target.value.replace(/[^0-9]/g, "").slice(0, 3));
                              setCardError("");
                            }}
                            className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 transition-all font-mono"
                          />
                        </div>
                        {cardError && (
                          <p className="text-[10px] text-red-500 font-mono font-bold text-left">{cardError}</p>
                        )}
                      </div>

                      <InteractivePlaceOrderButton
                        onClick={validateCard}
                        onAnimationComplete={handlePlaceOrder}
                        buttonText="Place Order"
                        className="w-full"
                        wrapperClassName="w-full"
                      />
                    </div>
                  )}

                  {/* DIGITAL WALLETS TAB */}
                  {activePaymentTab === "wallet" && (
                    <div className="space-y-4 text-left">
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-800">Select wallet to pay</h4>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {[
                          { id: "airtel", name: "Airtel Payment Bank", logo: "🔴", color: "bg-[#e11900] text-white" },
                          { id: "payzapp", name: "PayZapp", logo: "Pz", color: "bg-[#0054a6] text-[#ffdd00]" },
                          { id: "freecharge", name: "Freecharge Wallet", logo: "fc", color: "bg-[#ff5a00] text-white font-black italic" },
                          { id: "mobikwik", name: "MobiKwik ZIP", logo: "MK", color: "bg-[#002f6c] text-[#00baf2]" },
                          { id: "olamoney", name: "OlaMoney Wallet", logo: "ola", color: "bg-black text-[#a4c639]" },
                        ].map((w) => (
                          <label key={w.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
                            <input 
                              type="radio" 
                              checked={selectedWallet === w.id} 
                              onChange={() => setSelectedWallet(w.id)} 
                              className="accent-black w-4 h-4 cursor-pointer" 
                            />
                            <div className={`w-7 h-7 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center text-[9px] font-bold font-mono uppercase ${w.color}`}>
                              {w.logo}
                            </div>
                            <span className="text-xs font-mono font-bold text-zinc-800">{w.name}</span>
                          </label>
                        ))}
                      </div>

                      <InteractivePlaceOrderButton
                        onAnimationComplete={handlePlaceOrder}
                        buttonText="Place Order"
                        className="w-full"
                        wrapperClassName="w-full"
                      />
                    </div>
                  )}

                  {/* NET BANKING TAB */}
                  {activePaymentTab === "netbanking" && (
                    <div className="space-y-4 text-left">
                      <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-800">Net Banking</h4>
                      
                      <div className="space-y-2">
                        {[
                          { 
                            id: "axis", 
                            name: "Axis Bank", 
                            badge: <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#862249] text-white font-bold text-xs">A</div>
                          },
                          { 
                            id: "hdfc", 
                            name: "HDFC Bank", 
                            badge: <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#004c8f] text-white font-black text-xs">H</div>
                          },
                          { 
                            id: "icici", 
                            name: "ICICI Bank", 
                            badge: <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f28520] text-white font-black text-xs">I</div>
                          },
                          { 
                            id: "kotak", 
                            name: "Kotak Bank", 
                            badge: <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#ed1c24] text-white font-bold text-xs">K</div>
                          },
                          { 
                            id: "sbi", 
                            name: "SBI Bank", 
                            badge: (
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-50 border border-zinc-200">
                                <div className="w-4 h-4 rounded-full bg-[#00a9e0] relative flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-50" />
                                  <div className="w-1 h-2 bg-zinc-50 absolute bottom-0 left-1/2 -translate-x-1/2" />
                                </div>
                              </div>
                            )
                          },
                        ].map((b) => (
                          <label key={b.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
                            <input 
                              type="radio" 
                              checked={selectedBank === b.id} 
                              onChange={() => setSelectedBank(b.id)} 
                              className="accent-black w-4 h-4 cursor-pointer" 
                            />
                            {b.badge}
                            <span className="text-xs font-mono font-bold text-zinc-805">{b.name}</span>
                          </label>
                        ))}
                      </div>

                      {/* Other Banks dropdown */}
                      <select 
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-xs bg-white outline-none focus:border-zinc-400 font-mono cursor-pointer"
                        defaultValue="other"
                      >
                        <option value="other">Other Banks</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="union">Union Bank of India</option>
                      </select>

                      <InteractivePlaceOrderButton
                        onAnimationComplete={handlePlaceOrder}
                        buttonText="Place Order"
                        className="w-full"
                        wrapperClassName="w-full"
                      />
                    </div>
                  )}

                </div>

              </div>

              {/* Gift Card bar */}
              <div className="border border-zinc-200 rounded-2xl p-5 bg-[#fafafa]/80 flex items-center justify-between text-left shadow-3xs">
                <div className="flex items-center gap-2">
                  <span>🎁</span>
                  <span className="text-xs font-black font-mono uppercase tracking-wider text-zinc-850">Have a Gift Card?</span>
                </div>
                <button 
                  onClick={() => setIsGiftCardOpen(true)}
                  className="text-xs font-bold text-orange-500 hover:underline uppercase tracking-wider cursor-pointer bg-[#fafafa]/80 border-none p-0"
                >
                  Apply Gift Card
                </button>
              </div>

            </div>

            {/* Right Column (Price details summary and general submit) */}
            <div className="space-y-6">
              <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-3xs text-left">
                <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-955 font-bold border-b border-zinc-100 pb-3 mb-4">
                  Price Details ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h4>
                
                <div className="space-y-3.5 text-xs font-medium text-zinc-650 border-b border-zinc-100 pb-4">
                  <div className="flex justify-between">
                    <span>Total MRP</span>
                    <span className="text-zinc-900 font-bold">${totalMrp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount on MRP</span>
                    <span className="text-green-600 font-bold">-${discountOnMrp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon Discount Amount</span>
                    <span className="text-green-600 font-bold">-${couponDiscount.toFixed(2)}</span>
                  </div>
                  {giftCardDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>Gift Card Discount</span>
                      <span className="text-green-600 font-bold">-${giftCardDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-left">Platform Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("platform")}>Know More</strong></span>
                    <span className="text-zinc-900 font-bold">${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-left">Shipping Fee <strong className="text-[9px] font-mono text-zinc-400 font-normal hover:underline cursor-pointer" onClick={() => setKnowMoreType("shipping")}>Know More</strong></span>
                    <span className="text-zinc-900 font-bold">
                      {shippingFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm font-black text-zinc-955 py-4">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <InteractivePlaceOrderButton
                  onClick={validateGeneric}
                  onAnimationComplete={handlePlaceOrder}
                  buttonText="Place Order"
                  className="w-full"
                  wrapperClassName="w-full"
                />
              </div>
            </div>

          </div>
        )}

        {/* Step 4: SUCCESS View */}
        {checkoutStep === "success" && (
          <div className="max-w-2xl mx-auto border border-zinc-200 rounded-3xl p-6 sm:p-10 bg-white shadow-lg space-y-8 animate-fade-in text-left">
            {/* Banner card */}
            <div className="bg-zinc-950 text-white rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,90,40,0.15),transparent)] pointer-events-none" />
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Check className="w-8 h-8 text-[#ebd26b]" />
              </div>
              <h2 className="text-xl font-black font-mono tracking-widest uppercase text-yellow-400">Order Confirmed</h2>
              <p className="text-xs text-zinc-300 font-mono tracking-tight mt-1 uppercase">Thank you for shopping with DripHunter</p>
            </div>

            {/* Order details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-zinc-100 pb-8 text-left">
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Order Number</span>
                <strong className="text-sm font-mono font-bold text-zinc-800">#DH-7429185</strong>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Total Paid</span>
                <strong className="text-sm font-bold text-zinc-800">${orderTotals.total.toFixed(2)}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Shipping Address</span>
                <p className="text-xs text-zinc-650 font-medium leading-relaxed">
                  {orderedAddressText}
                </p>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Estimated Delivery</span>
                <strong className="text-xs font-mono font-bold text-zinc-800">2-3 Business Days</strong>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">Payment Method</span>
                <strong className="text-xs font-mono font-bold text-zinc-800">
                  {activePaymentTab === "cod" ? "Pay on Delivery (Cash/UPI)" : activePaymentTab === "card" ? "Credit/Debit Card" : activePaymentTab === "upi" ? "UPI" : activePaymentTab === "wallet" ? "Digital Wallet" : "Net Banking"}
                </strong>
              </div>
            </div>

            {/* Order items list */}
            {orderedItems.length > 0 && (
              <div className="border-b border-zinc-100 pb-8 space-y-4 text-left">
                <h4 className="text-xs font-black font-mono tracking-wider uppercase text-zinc-950 font-bold mb-2">Order Items</h4>
                <div className="space-y-3">
                  {orderedItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 bg-zinc-50 rounded overflow-hidden border border-zinc-200/50 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h5 className="font-bold text-zinc-850 line-clamp-1 uppercase tracking-tight">{item.name}</h5>
                          <span className="text-[10px] text-zinc-400 font-mono">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-zinc-900">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons row */}
            <div className="flex flex-col gap-3.5 pt-4">
              <a 
                href="/shop"
                className="w-full bg-[#f05a28] hover:bg-[#d84e20] text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer text-center shadow-md"
              >
                Continue Shopping
              </a>
              <a 
                href="/"
                className="w-full border border-zinc-200 text-zinc-650 hover:text-zinc-955 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer text-center hover:bg-zinc-50"
              >
                Go to Homepage
              </a>
            </div>

          </div>
        )}

      </main>

      {/* Address Edit/Add Modal Overlay */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddressModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-zinc-150 text-left">
            <h3 className="text-sm font-black font-mono tracking-wider uppercase text-zinc-955 font-bold mb-5 border-b border-zinc-100 pb-3">
              {editingAddress ? "Edit Address Details" : "Add New Delivery Address"}
            </h3>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-500">Contact Name</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)} 
                  className="w-full border border-zinc-250 rounded-xl px-4.5 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955" 
                  placeholder="e.g. Name of the customer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-500">Address Location</label>
                <textarea 
                  value={formAddressText} 
                  onChange={(e) => setFormAddressText(e.target.value)} 
                  rows={2}
                  className="w-full border border-zinc-250 rounded-xl px-4.5 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955 resize-none" 
                  placeholder="e.g. 123 Street Wear Ave, Indira Nagar"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-500">Contact Number</label>
                <input 
                  type="text" 
                  value={formContact} 
                  onChange={(e) => setFormContact(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} 
                  className="w-full border border-zinc-250 rounded-xl px-4.5 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955" 
                  placeholder="e.g. 1234567890"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-zinc-500">Location Type</label>
                  <select 
                    value={formType} 
                    onChange={(e) => setFormType(e.target.value as any)} 
                    className="w-full border border-zinc-250 rounded-xl px-3 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955 cursor-pointer"
                  >
                    <option value="Home">Home</option>
                    <option value="Place">Work</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-zinc-500">Pay on Delivery</label>
                  <select 
                    value={formPodAvailable ? "yes" : "no"} 
                    onChange={(e) => setFormPodAvailable(e.target.value === "yes")} 
                    className="w-full border border-zinc-250 rounded-xl px-3 py-3 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955 cursor-pointer"
                  >
                    <option value="yes">Available</option>
                    <option value="no">Unavailable</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3.5 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-zinc-950 hover:bg-black text-white font-extrabold text-[10px] uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center"
                >
                  Save Address
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 border border-zinc-200 text-zinc-500 hover:text-zinc-800 font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupons Edit Modal Overlay */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCouponModalOpen(false)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-zinc-150 text-left">
            <h3 className="text-sm font-black font-mono tracking-wider uppercase text-zinc-955 font-bold mb-5 border-b border-zinc-100 pb-3">
              Apply Coupon
            </h3>
            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-550">Coupon Code</label>
                <input 
                  type="text" 
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponError("");
                    setCouponSuccess("");
                  }}
                  placeholder="Enter code (e.g. DRIP10 or SLAY20)"
                  className="w-full border border-zinc-250 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-555 font-mono text-zinc-955" 
                />
                {couponError && (
                  <p className="text-[10px] text-red-500 font-mono font-bold text-left">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[10px] text-green-600 font-mono font-bold text-left">{couponSuccess}</p>
                )}
              </div>
              <div className="flex gap-3.5 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-zinc-950 hover:bg-black text-white font-extrabold text-[10px] uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center"
                >
                  Apply
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsCouponModalOpen(false)}
                  className="flex-1 border border-zinc-200 text-zinc-500 hover:text-zinc-800 font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-xl cursor-pointer text-center hover:bg-zinc-50"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gift Card Modal Overlay (Matches Figma Screenshot Exactly) */}
      {isGiftCardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsGiftCardOpen(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-zinc-150 text-left">
            
            {giftCardSuccess ? (
              /* Success Popup Mode inside the modal card (Removes all inputs, showing only closeable success alert) */
              <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in relative">
                {/* Close Button: Black circular icon with white X */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsGiftCardOpen(false);
                    setGiftCardSuccess("");
                  }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-black cursor-pointer shadow-md transition-all border-none"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Check className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-base font-black text-zinc-955 mb-3 uppercase font-mono tracking-wider">
                  Success
                </h3>
                
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-black font-mono px-5 py-3.5 rounded-xl flex items-center justify-between gap-3 shadow-3xs">
                  <span>{giftCardSuccess}</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsGiftCardOpen(false);
                      setGiftCardSuccess("");
                    }}
                    className="text-green-600 hover:text-green-800 cursor-pointer bg-transparent border-none p-0 font-black text-sm"
                    title="Dismiss success alert"
                  >
                    ✕
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsGiftCardOpen(false);
                    setGiftCardSuccess("");
                  }}
                  className="mt-6 bg-[#666666] hover:bg-zinc-700 text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-3 px-8 rounded-xl cursor-pointer transition-colors border-none"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Standard Gift Card Inputs Form Mode */
              <>
                {/* Close Button: Black circular icon with white X */}
                <button 
                  type="button"
                  onClick={() => setIsGiftCardOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-black cursor-pointer shadow-md transition-all border-none"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-base font-black text-zinc-955 mb-1 leading-tight">
                  Apply Gift Card
                </h3>
                <p className="text-xs text-zinc-505 font-medium font-sans mb-6">
                  Gift card value will be added to your Driphunter Credit
                </p>

                <form onSubmit={handleApplyGiftCard} className="space-y-4.5">
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      maxLength={16}
                      value={giftCardCode}
                      onChange={(e) => {
                        setGiftCardCode(e.target.value);
                        setGiftCardError("");
                        setGiftCardSuccess("");
                      }}
                      placeholder="16 Digits Gift Card Number"
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955 placeholder-zinc-400" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <input 
                      type="password" 
                      maxLength={6}
                      value={giftCardPin}
                      onChange={(e) => {
                        setGiftCardPin(e.target.value);
                        setGiftCardError("");
                        setGiftCardSuccess("");
                      }}
                      placeholder="6 Digits Gift Card Pin"
                      className="w-full border border-zinc-300 rounded-xl px-4 py-3.5 text-xs bg-white outline-none focus:border-zinc-500 font-mono text-zinc-955 placeholder-zinc-400" 
                    />
                    
                    {giftCardError && (
                      <p className="text-[10px] text-red-500 font-mono font-bold text-left">{giftCardError}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-[#666666] hover:bg-zinc-700 text-[#ebd26b] font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl cursor-pointer text-center transition-colors border-none"
                    >
                      6 DIGITS GIFT CARD PIN
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* Know More Information Modal */}
      {knowMoreType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setKnowMoreType(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-zinc-150 text-left">
            
            {/* Close Button: Black circular icon with white X */}
            <button 
              type="button"
              onClick={() => setKnowMoreType(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-black cursor-pointer shadow-md transition-all border-none"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-zinc-955 mb-2 uppercase font-mono tracking-wider">
              {knowMoreType === "platform" && "Platform Fee Details"}
              {knowMoreType === "shipping" && "Shipping Fee Details"}
              {knowMoreType === "card" && "Online Card Guide"}
            </h3>
            
            <p className="text-xs text-zinc-600 font-medium leading-relaxed font-sans mt-4">
              {knowMoreType === "platform" && "A nominal platform fee of $2.00 is charged on every transaction to support, optimize, and maintain the DripHunter digital marketplace infrastructure, secure payment gateways, and client support operations."}
              {knowMoreType === "shipping" && "We offer FREE shipping on all orders over $100.00! For orders under $100.00, a flat shipping fee of $10.00 is applied to cover quick and safe streetwear delivery logistics directly to your doorstep."}
              {knowMoreType === "card" && "To prevent checkout failures, please ensure that your Credit/Debit Card is active and registered with your banking branch for domestic/international online transactions. Contact your card issuing bank for detailed permissions."}
            </p>

            <button
              type="button"
              onClick={() => setKnowMoreType(null)}
              className="w-full mt-6 bg-zinc-950 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl cursor-pointer text-center transition-colors border-none"
            >
              Okay, Understood
            </button>
          </div>
        </div>
      )}

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
