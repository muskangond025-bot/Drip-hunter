"use client";

import React, { useState, useEffect, useRef } from "react";

export interface InteractivePlaceOrderButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => boolean | void;
  onAnimationComplete?: () => void;
  className?: string;
  disabled?: boolean;
  buttonText?: string;
  addedText?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
}

const PARTICLE_COLORS = ["#ff5a35", "#ebd26b", "#10b981", "#3b82f6", "#ec4899", "#f59e0b"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
}

export function InteractivePlaceOrderButton({
  onClick,
  onAnimationComplete,
  className,
  disabled = false,
  buttonText = "PLACE ORDER",
  addedText = "ORDER PLACED!",
  size = "md",
  wrapperClassName,
}: InteractivePlaceOrderButtonProps) {
  const [animationClass, setAnimationClass] = useState(""); // "", "animation", or "animation done"
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (cb: () => void, delay: number) => {
    const timer = setTimeout(cb, delay);
    timeoutsRef.current.push(timer);
    return timer;
  };

  const triggerConfetti = () => {
    const newParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24 + (Math.random() * 15 - 7.5);
      return {
        id: Math.random() + i,
        x: 0,
        y: 0,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: Math.random() * 5 + 3,
        angle: (angle * Math.PI) / 180,
        speed: Math.random() * 5 + 4,
      };
    });
    setParticles(newParticles);
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || animationClass !== "") return;

    let shouldProceed = true;
    if (onClick) {
      const res = onClick(e);
      if (res === false) {
        shouldProceed = false;
      }
    }

    if (!shouldProceed) return;

    // Start moped ride animation
    setAnimationClass("animation");

    // After 2.0s, scooter has driven off-screen. Display success check & confetti
    addTimeout(() => {
      setAnimationClass("animation done");
      triggerConfetti();

      // Trigger redirect or callback after success display pause
      addTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1200);
    }, 2000);
  };

  const isDone = animationClass === "animation done";
  const isAnimating = animationClass === "animation";

  return (
    <div className={`relative inline-block ${wrapperClassName || "w-full"}`}>
      <style>{`
        .moped-button {
          --color: #fff;
          --bg-idle: linear-gradient(135deg, #00d2ff 0%, #0066eb 100%);
          --bg-done: #10b981;
          --tick: #fff;
          
          padding: 12px 0;
          width: 100%;
          min-height: 48px;
          cursor: pointer;
          text-align: center;
          position: relative;
          border: none;
          outline: none;
          color: var(--color);
          background: var(--bg-idle);
          border-radius: var(--br, 12px);
          appearance: none;
          -webkit-tap-highlight-color: transparent;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 102, 235, 0.25);
          transition: background 0.3s, box-shadow 0.3s, transform 0.15s;
          overflow: hidden;
        }

        .moped-button:active {
          transform: scale(0.98);
        }

        .moped-button.done {
          background: var(--bg-done);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .moped-button .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 1;
          transition: opacity 0.25s, transform 0.25s;
        }

        .moped-button.animation .btn-content {
          opacity: 0;
          transform: scale(0.9);
          pointer-events: none;
        }

        .moped-button .success-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
          pointer-events: none;
        }

        .moped-button.done .success-message {
          opacity: 1;
          transform: scale(1);
        }

        .moped-button .success-message svg {
          width: 14px;
          height: 14px;
          stroke: var(--tick);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          stroke-dasharray: 20px;
          stroke-dashoffset: ${isDone ? "0px" : "20px"};
          transition: stroke-dashoffset 0.4s ease 0.2s;
        }

        /* Scooter Wrapper styling */
        .scooter-wrapper {
          position: absolute;
          width: 84px;
          height: 56px;
          top: 50%;
          margin-top: -28px;
          left: -100px;
          opacity: 0;
          pointer-events: none;
        }

        .moped-button.animation .scooter-wrapper {
          animation: rideAcross 2.0s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .scooter {
          width: 100%;
          height: 100%;
          animation: mopedBobble 0.15s ease-in-out infinite alternate;
        }

        @keyframes rideAcross {
          0% {
            left: -100px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 105%;
            opacity: 0;
          }
        }

        @keyframes mopedBobble {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-2.5px) rotate(1deg);
          }
        }

        /* Speed/Wind Lines */
        .speed-lines {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }

        .moped-button.animation .speed-lines {
          opacity: 1;
        }

        .speed-lines svg {
          width: 100%;
          height: 100%;
        }

        .speed-lines path {
          stroke: rgba(255, 255, 255, 0.45);
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-dasharray: 30 120;
          stroke-dashoffset: 0;
          animation: windFlow 0.6s linear infinite;
        }

        .speed-lines path.line-2 {
          animation-delay: 0.2s;
          stroke-dasharray: 45 100;
        }

        .speed-lines path.line-3 {
          animation-delay: 0.4s;
          stroke-dasharray: 25 140;
        }

        @keyframes windFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -150;
          }
        }

        /* Confetti particle elements */
        .confetti-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--size);
          height: var(--size);
          background-color: var(--color);
          border-radius: 50%;
          pointer-events: none;
          animation: burst 0.8s ease-out forwards;
        }

        @keyframes burst {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(calc(var(--tx) * 1px), calc(var(--ty) * 1px)) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      <button
        type="button"
        disabled={disabled || isAnimating}
        onClick={handleAction}
        className={`moped-button ${animationClass} ${className || ""}`}
      >
        {/* Default / Idle State */}
        <span className="btn-content">
          {buttonText}
        </span>

        {/* Moped Rider Animation Frame */}
        <div className="scooter-wrapper">
          <svg className="scooter" viewBox="0 0 84 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Delivery Box on the back */}
            <rect x="4" y="14" width="16" height="16" rx="2.5" fill="#FFFFFF" stroke="#003566" strokeWidth="2.5"/>
            <line x1="4" y1="20" x2="20" y2="20" stroke="#CCCCCC" strokeWidth="2"/>
            <line x1="4" y1="26" x2="20" y2="26" stroke="#CCCCCC" strokeWidth="2"/>
            
            {/* Scooter Body Frame */}
            <path d="M18 36H52L58 26H64" stroke="#0077B6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M52 36L56 22H62" stroke="#0077B6" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M22 36L20 22H36" stroke="#0077B6" strokeWidth="2.5" strokeLinecap="round"/>

            {/* Front Shield & Mudguard */}
            <path d="M60 22C60 22 63 32 64 36" stroke="#0096C7" strokeWidth="4" strokeLinecap="round"/>
            <path d="M58 40C58 38 66 38 66 40" stroke="#0096C7" strokeWidth="3" strokeLinecap="round"/>
            <path d="M12 40C12 38 20 38 20 40" stroke="#0096C7" strokeWidth="3" strokeLinecap="round"/>

            {/* Wheels */}
            <circle cx="16" cy="40" r="7" fill="#1E293B" stroke="#F8FAFC" strokeWidth="2"/>
            <circle cx="16" cy="40" r="2.5" fill="#F8FAFC"/>
            <circle cx="61" cy="40" r="7" fill="#1E293B" stroke="#F8FAFC" strokeWidth="2"/>
            <circle cx="61" cy="40" r="2.5" fill="#F8FAFC"/>

            {/* Seat */}
            <rect x="22" y="29" width="18" height="4" rx="1.5" fill="#0F172A"/>

            {/* Rider - Body & Clothes */}
            <path d="M30 30C30 25 35 20 38 20C40 20 44 24 46 28" stroke="#0054a6" strokeWidth="8" strokeLinecap="round"/>
            {/* Rider - Arm reaching handlebars */}
            <path d="M36 24C38 24 48 24 54 23" stroke="#0054a6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M35 32C36 36 38 38 41 38" stroke="#718096" strokeWidth="4" strokeLinecap="round"/> {/* Leg */}

            {/* Rider - Face and Helmet */}
            <circle cx="36" cy="12" r="5.5" fill="#FFE4E6"/> {/* Face */}
            <path d="M31 12C31 7 36 6 41 8C42 10 42 14 39 15C36 16 31 16 31 12Z" fill="#002970"/> {/* Helmet */}
            <path d="M38 10H42" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/> {/* Visor stripe */}
          </svg>
        </div>

        {/* Speed Wind Lines */}
        <div className="speed-lines">
          <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="line-1" d="M 0 10 Q 30 15 50 10 T 100 12" />
            <path className="line-2" d="M 5 20 Q 35 12 55 22 T 95 18" />
            <path className="line-3" d="M 0 30 Q 25 35 45 28 T 100 32" />
          </svg>
        </div>

        {/* Success Tick State */}
        <span className="success-message">
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1.5" />
          </svg>
          <span>{addedText}</span>
        </span>

        {/* Confetti Particles */}
        {particles.map((p) => {
          const tx = Math.cos(p.angle) * p.speed * 12;
          const ty = Math.sin(p.angle) * p.speed * 12;
          return (
            <div
              key={p.id}
              className="confetti-particle"
              style={
                {
                  "--size": `${p.size}px`,
                  "--color": p.color,
                  "--tx": tx,
                  "--ty": ty,
                } as React.CSSProperties
              }
            />
          );
        })}
      </button>
    </div>
  );
}
