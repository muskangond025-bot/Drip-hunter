"use client";

import React from "react";
import { X, CheckCircle2, ChevronLeft, ChevronRight, Loader2, Store, User, CreditCard } from "lucide-react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useAsyncAction } from "@/hooks/useAsyncAction";

interface VendorFormData extends Record<string, any> {
  storeName: string;
  category: string;
  fullName: string;
  email: string;
  phone: string;
  payoutMethod: string;
  accountNumber: string;
}

const initialVendorData: VendorFormData = {
  storeName: "",
  category: "",
  fullName: "",
  email: "",
  phone: "",
  payoutMethod: "Bank Transfer",
  accountNumber: "",
};

const validationRules = [
  {
    step: 1,
    validate: (data: VendorFormData) => {
      const errs: Record<string, string> = {};
      if (!data.storeName.trim()) errs.storeName = "Store name is required.";
      if (!data.category) errs.category = "Please select a clothing category.";
      return errs;
    },
  },
  {
    step: 2,
    validate: (data: VendorFormData) => {
      const errs: Record<string, string> = {};
      if (!data.fullName.trim()) errs.fullName = "Full name is required.";
      if (!data.email.trim() || !data.email.includes("@")) errs.email = "Valid email address is required.";
      if (!data.phone.trim()) errs.phone = "Phone number is required.";
      return errs;
    },
  },
  {
    step: 3,
    validate: (data: VendorFormData) => {
      const errs: Record<string, string> = {};
      if (!data.accountNumber.trim()) errs.accountNumber = "Payout account number or UPI ID is required.";
      return errs;
    },
  },
];

interface VendorOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VendorOnboardingModal({ isOpen, onClose }: VendorOnboardingModalProps) {
  const {
    currentStep,
    totalSteps,
    formData,
    errors,
    isFirstStep,
    isLastStep,
    updateField,
    nextStep,
    prevStep,
    isSubmitted,
    setIsSubmitted,
  } = useMultiStepForm<VendorFormData>({
    initialData: initialVendorData,
    totalSteps: 3,
    validationRules,
  });

  const submitAction = useAsyncAction(800);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      submitAction.execute(() => {
        setIsSubmitted(true);
      });
    } else {
      nextStep();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-100 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-black p-2 rounded-full hover:bg-zinc-100 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#f05a28]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 space-y-1">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#f05a28] uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            DripHunter Vendor Program
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 pt-1">
            Become a Verified Vendor
          </h2>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Application Submitted!</h3>
            <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-zinc-900">{formData.fullName}</strong>. Your store request for <strong className="text-[#f05a28]">{formData.storeName}</strong> is under review. Our team will verify your account within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 px-4 relative">
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-zinc-200 -translate-y-1/2 -z-0" />
              {[
                { step: 1, label: "Store Details", icon: Store },
                { step: 2, label: "Personal Info", icon: User },
                { step: 3, label: "Payout Account", icon: CreditCard },
              ].map(({ step, label, icon: Icon }) => {
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;
                return (
                  <div key={step} className="flex flex-col items-center relative z-10 bg-white px-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs transition-all ${
                        isActive
                          ? "bg-[#f05a28] text-white shadow-lg ring-4 ring-orange-100 scale-110"
                          : isCompleted
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${isActive ? "text-[#f05a28]" : "text-zinc-400"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* STEP 1: Store Info */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Store / Brand Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Urban Drip Co."
                      value={formData.storeName}
                      onChange={(e) => updateField("storeName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.storeName ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {errors.storeName && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.storeName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Primary Apparel Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.category ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Streetwear Tops">Streetwear Tops & Hoodies</option>
                      <option value="Bottoms & Joggers">Bottoms & Joggers</option>
                      <option value="Headwear & Accessories">Headwear & Accessories</option>
                      <option value="Footwear">Footwear & Kicks</option>
                    </select>
                    {errors.category && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.category}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Contact */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Hunter"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.fullName ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="vendor@driphunter.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.email ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.phone ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: Payout Details */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Payout Method
                    </label>
                    <select
                      value={formData.payoutMethod}
                      onChange={(e) => updateField("payoutMethod", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 bg-zinc-50 outline-none focus:bg-white focus:ring-2 focus:ring-[#f05a28]"
                    >
                      <option value="Bank Transfer">Direct Bank Transfer</option>
                      <option value="Stripe Connect">Stripe Connect Account</option>
                      <option value="PayPal / UPI">PayPal / UPI ID</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Account / IBAN / UPI ID *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number or UPI ID"
                      value={formData.accountNumber}
                      onChange={(e) => updateField("accountNumber", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs text-zinc-900 bg-zinc-50 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#f05a28] ${
                        errors.accountNumber ? "border-red-500 bg-red-50/50" : "border-zinc-200"
                      }`}
                    />
                    {errors.accountNumber && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        {errors.accountNumber}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                {/* Previous Button (Disabled on Step 1, stores entered data when navigating backwards) */}
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isFirstStep}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                    isFirstStep
                      ? "opacity-0 pointer-events-none"
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 active:scale-95"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {/* Next / Submit CTA with double-submit prevention loading state */}
                <button
                  type="submit"
                  disabled={submitAction.isLoading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#f05a28] hover:bg-[#d94819] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-orange-200"
                >
                  {submitAction.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : isLastStep ? (
                    "Submit Application"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
