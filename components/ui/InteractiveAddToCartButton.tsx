"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
}

export interface InteractiveAddToCartButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  animationStyle?: "truck" | "box-drop" | "sleek-loader";
  successDuration?: number;
  buttonText?: string;
  addedText?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
}

const PARTICLE_COLORS = ["#ff5a35", "#ebd26b", "#10b981", "#3b82f6", "#ec4899", "#f59e0b"];

export function InteractiveAddToCartButton({
  onClick,
  className,
  disabled = false,
  animationStyle = "truck",
  successDuration = 2200,
  buttonText = "Add To Cart",
  addedText = "Added!",
  size = "md",
  wrapperClassName,
}: InteractiveAddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "animating" | "success">("idle");
  const [particles, setParticles] = useState<Particle[]>([]);

  // Local state for truck animation phases
  const [truckPhase, setTruckPhase] = useState<"none" | "enter" | "load" | "exit">("none");

  // Ref to track timeouts for cleanup on unmount / refresh
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (cb: () => void, delay: number) => {
    const timer = setTimeout(cb, delay);
    timeoutsRef.current.push(timer);
    return timer;
  };

  // Trigger confetti burst
  const triggerConfetti = () => {
    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => {
      const angle = (i * 360) / 20 + (Math.random() * 15 - 7.5);
      return {
        id: Math.random() + i,
        x: 0,
        y: 0,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: Math.random() * 6 + 3,
        angle: (angle * Math.PI) / 180,
        speed: Math.random() * 6 + 5,
      };
    });
    setParticles(newParticles);
  };

  useEffect(() => {
    if (state === "success") {
      const timer = setTimeout(() => {
        setState("idle");
        setTruckPhase("none");
        setParticles([]);
      }, successDuration);
      return () => clearTimeout(timer);
    }
  }, [state, successDuration]);

  // Clean up all click timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || state !== "idle") return;

    if (onClick) {
      onClick(e);
    }

    setState("animating");

    if (animationStyle === "truck") {
      // Step 1: Morph button to road, slide truck in
      setTruckPhase("enter");
      
      // Step 2: Truck stops at center, drop the package
      addTimeout(() => {
        setTruckPhase("load");
      }, 700);

      // Step 3: Truck accelerates and drives out to the right
      addTimeout(() => {
        setTruckPhase("exit");
      }, 1400);

      // Step 4: Truck exits, transition to success checkmark & confetti
      addTimeout(() => {
        triggerConfetti();
        setState("success");
      }, 2000);

    } else if (animationStyle === "box-drop") {
      // Box drop animation runs for 950ms
      addTimeout(() => {
        triggerConfetti();
        setState("success");
      }, 950);
    } else {
      // Sleek loader runs for 1200ms
      addTimeout(() => {
        triggerConfetti();
        setState("success");
      }, 1200);
    }
  };

  // Dimension classes based on size prop
  const sizeClasses = {
    sm: "h-9 px-4 text-[10px] rounded-lg",
    md: "h-11 px-6 text-xs rounded-xl",
    lg: "h-13 px-8 text-sm rounded-2xl",
  };

  const currentSizeClass = sizeClasses[size];

  // Width states for morphing animation to prevent text squeezing/wrapping
  const getButtonWidth = () => {
    if (state === "animating") {
      if (animationStyle === "truck") return "180px";
      if (animationStyle === "box-drop") return "110px";
      if (animationStyle === "sleek-loader") return "48px";
    }
    return "100%"; // normal width
  };

  return (
    <div className={`relative inline-block ${wrapperClassName || "w-full"}`}>
      <motion.button
        disabled={disabled || state !== "idle"}
        onClick={handleAction}
        className={`
          relative flex items-center justify-center font-black uppercase tracking-wider overflow-hidden cursor-pointer select-none border-none outline-none mx-auto
          ${currentSizeClass}
          ${state === "success"
            ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
            : "bg-zinc-950 text-white hover:bg-zinc-900 shadow-md shadow-zinc-950/15"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        style={{
          width: getButtonWidth(),
          maxWidth: "100%",
          transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s, border-radius 0.3s",
          borderRadius: state === "animating" && animationStyle === "sleek-loader" ? "9999px" : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {state === "idle" && (
            <motion.div
              key="idle-state"
              className="flex items-center justify-center gap-2 w-full h-full whitespace-nowrap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <span className="whitespace-nowrap select-none shrink-0">{buttonText}</span>
              <ShoppingCart className="w-4 h-4 shrink-0" />
            </motion.div>
          )}

          {/* TRUCK ANIMATION STATE */}
          {state === "animating" && animationStyle === "truck" && (
            <motion.div
              key="truck-state"
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Road / Track line */}
              <div className="absolute bottom-2 left-2 right-2 h-[2px] bg-zinc-700/80 rounded" />
              
              {/* Animation Group wrapper */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Truck Container */}
                <motion.div
                  className="absolute left-0 flex items-center"
                  animate={
                    truckPhase === "enter"
                      ? { x: ["-100%", "20%"] }
                      : truckPhase === "load"
                      ? { x: "20%" }
                      : truckPhase === "exit"
                      ? { x: ["20%", "110%"] }
                      : { x: "-100%" }
                  }
                  transition={
                    truckPhase === "enter"
                      ? { duration: 0.7, ease: "easeOut" }
                      : truckPhase === "exit"
                      ? { duration: 0.6, ease: "easeIn" }
                      : { duration: 0.1 }
                  }
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* SVG Shopping Cart Basket */}
                    <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-200">
                      {/* Cart Handle & Frame */}
                      <path d="M2 3H7L10 16H31L35 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Cart Mesh lines */}
                      <line x1="15" y1="6" x2="15" y2="13" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="20" y1="6" x2="20" y2="13" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="25" y1="6" x2="25" y2="13" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="30" y1="6" x2="30" y2="13" stroke="currentColor" strokeWidth="1.2" />
                    </svg>

                    {/* Rear Wheel */}
                    <motion.svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      className="absolute -bottom-1 left-[11px] text-zinc-950"
                      animate={{
                        rotate: truckPhase === "none" ? 0 : 360 * 6
                      }}
                      transition={{
                        duration: truckPhase === "exit" ? 0.6 : 2.0,
                        ease: truckPhase === "exit" ? "easeIn" : "linear",
                        repeat: truckPhase === "none" ? 0 : Infinity,
                      }}
                    >
                      {/* Wheel outer rim */}
                      <circle cx="4" cy="4" r="3.5" fill="#27272a" stroke="#71717a" strokeWidth="1" />
                      {/* Spokes to visually see it spin */}
                      <line x1="4" y1="1.5" x2="4" y2="6.5" stroke="#a1a1aa" strokeWidth="1" />
                      <line x1="1.5" y1="4" x2="6.5" y2="4" stroke="#a1a1aa" strokeWidth="1" />
                    </motion.svg>

                    {/* Front Wheel */}
                    <motion.svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      className="absolute -bottom-1 right-[12px] text-zinc-950"
                      animate={{
                        rotate: truckPhase === "none" ? 0 : 360 * 6
                      }}
                      transition={{
                        duration: truckPhase === "exit" ? 0.6 : 2.0,
                        ease: truckPhase === "exit" ? "easeIn" : "linear",
                        repeat: truckPhase === "none" ? 0 : Infinity,
                      }}
                    >
                      {/* Wheel outer rim */}
                      <circle cx="4" cy="4" r="3.5" fill="#27272a" stroke="#71717a" strokeWidth="1" />
                      {/* Spokes to visually see it spin */}
                      <line x1="4" y1="1.5" x2="4" y2="6.5" stroke="#a1a1aa" strokeWidth="1" />
                      <line x1="1.5" y1="4" x2="6.5" y2="4" stroke="#a1a1aa" strokeWidth="1" />
                    </motion.svg>

                    {/* Dropping Box Package relative to Cart basket */}
                    {truckPhase !== "none" && (
                      <motion.div
                        className="absolute w-3.5 h-3.5 bg-amber-600 rounded-sm border border-amber-800 flex items-center justify-center shadow-sm"
                        initial={{ y: -30, x: -1, opacity: 0, scale: 0.9 }}
                        animate={
                          truckPhase === "enter"
                            ? { y: -30, x: -1, opacity: 0 }
                            : { y: 2, x: -1, opacity: 1 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                          delay: 0.1,
                        }}
                      >
                        {/* Box ribbon accent */}
                        <div className="absolute w-[1.5px] h-full bg-amber-800" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* BOX DROP ANIMATION STATE */}
          {state === "animating" && animationStyle === "box-drop" && (
            <motion.div
              key="box-drop-state"
              className="relative flex items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative flex items-center justify-center w-10 h-10">
                {/* SVG Shopping Cart icon */}
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                  animate={{
                    y: [0, 2, -1.5, 0],
                    scaleX: [1, 1.15, 0.9, 1],
                    scaleY: [1, 0.85, 1.1, 1],
                  }}
                  transition={{
                    delay: 0.65,
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </motion.svg>

                {/* Dropping Box Package */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-600 rounded-sm border border-amber-800 flex items-center justify-center shadow-md"
                  initial={{ y: -45, x: "-50%", opacity: 0, rotate: -15 }}
                  animate={{
                    y: [-45, -5, -8, -6],
                    opacity: [0, 1, 1, 1],
                    rotate: [-15, 0, 5, 0],
                  }}
                  transition={{
                    duration: 0.7,
                    times: [0, 0.75, 0.88, 1],
                    ease: [0.25, 1, 0.5, 1],
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* SLEEK LOADER STATE */}
          {state === "animating" && animationStyle === "sleek-loader" && (
            <motion.div
              key="sleek-loader-state"
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Spinner ring */}
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {state === "success" && (
            <motion.div
              key="success-state"
              className="flex items-center justify-center gap-1.5 w-full h-full font-bold whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-4 h-4 text-white stroke-[3.5] shrink-0" />
              <span className="whitespace-nowrap select-none shrink-0">{addedText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Confetti Explosion Overlay */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            left: "50%",
            top: "50%",
            zIndex: 50,
          }}
          animate={{
            x: [0, Math.cos(p.angle) * p.speed * 20],
            y: [0, Math.sin(p.angle) * p.speed * 20 - 10, Math.sin(p.angle) * p.speed * 20 + 16],
            opacity: [1, 1, 0],
            scale: [1, 1.25, 0.3],
          }}
          transition={{
            duration: 0.95,
            times: [0, 0.45, 1],
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
