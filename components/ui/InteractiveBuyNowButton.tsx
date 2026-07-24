"use client";

import React, { useState, useEffect, useRef } from "react";

export interface InteractiveBuyNowButtonProps {
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

export function InteractiveBuyNowButton({
  onClick,
  onAnimationComplete,
  className,
  disabled = false,
  buttonText = "BUY IT NOW",
  addedText = "ORDER PLACED!",
  size = "md",
  wrapperClassName,
}: InteractiveBuyNowButtonProps) {
  const [animationClass, setAnimationClass] = useState(""); // "", "animation", or "animation done"
  const [particles, setParticles] = useState<Particle[]>([]);

  // Animation CSS variable states
  const [boxS, setBoxS] = useState(0.5);
  const [boxO, setBoxO] = useState(0);
  const [boxX, setBoxX] = useState(-24);
  const [boxY, setBoxY] = useState(-6);
  const [hx, setHx] = useState(0);
  const [bx, setBx] = useState(0);
  const [truckX, setTruckX] = useState(4);
  const [truckY, setTruckY] = useState(0);
  const [truckYN, setTruckYN] = useState(-26);
  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState(16);

  // Transition parameters controlled dynamically
  const [truckD, setTruckD] = useState("0s");
  const [truckEase, setTruckEase] = useState("ease-out");
  const [boxD, setBoxD] = useState("0s");

  // Track timeouts for cleanup on unmount
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

    // 0ms: Start button rotation (-90deg)
    setAnimationClass("animation");

    // 500ms: box scale & opacity appear
    addTimeout(() => {
      setBoxS(1);
      setBoxO(1);
    }, 500);

    // 700ms: box translates X to 0 (aligns above truck bed)
    addTimeout(() => {
      setBoxD("0.4s");
      setBoxX(0);
    }, 700);

    // 920ms: tape horizontal line appears
    addTimeout(() => {
      setHx(-5);
      setBx(50);
    }, 920);

    // 1150ms: drop box Y to 0 (lands in truck bed)
    addTimeout(() => {
      setBoxY(0);
    }, 1150);

    // 1250ms: truck bed bounces on impact
    addTimeout(() => {
      setTruckY(1);
      setTruckYN(-25);
    }, 1250);

    // 1450ms: truck starts driving!
    addTimeout(() => {
      // Reset truck bed impact bounce
      setTruckY(0);
      setTruckYN(-26);

      // Start street progress bar filling
      setProgress(1);

      // GSAP step 1: truck x to 0 (takes 400ms)
      setTruckX(0);
      setTruckD("0.4s");
      setTruckEase("ease-out");

      // GSAP step 2: truck x to 40 (takes 1.0s)
      addTimeout(() => {
        setTruckX(40);
        setTruckD("1.0s");
        setTruckEase("linear");
      }, 400);

      // GSAP step 3: truck x to 20 (takes 600ms)
      addTimeout(() => {
        setTruckX(20);
        setTruckD("0.6s");
        setTruckEase("ease-in-out");
      }, 1400);

      // GSAP step 4: truck x to 96 (takes 400ms, drives off-screen)
      addTimeout(() => {
        setTruckX(96);
        setTruckD("0.4s");
        setTruckEase("ease-in");
      }, 2000);

      // GSAP onComplete: success checkmark & confetti
      addTimeout(() => {
        setAnimationClass("animation done");
        setOffset(0);
        triggerConfetti();

        // Redirect or trigger callback after success text pause
        addTimeout(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          } else {
            window.location.href = "/checkout";
          }
        }, 1200);
      }, 2400);

    }, 1450);
  };

  return (
    <div className={`relative inline-block ${wrapperClassName || "w-full"}`}>
      <style>{`
        .truck-button {
          --color: #fff;
          --background: #18181b;
          --tick: #10b981;
          --base: #09090b;
          --wheel: #18181b;
          --wheel-inner: #71717a;
          --wheel-dot: #fff;
          --back: #ffffff;
          --back-inner: #f4f4f5;
          --back-inner-shadow: #e4e4e7;
          --front: #3b82f6;
          --front-shadow: #2563eb;
          --front-light: #facc15;
          --window: #18181b;
          --window-shadow: #27272a;
          --street: #3f3f46;
          --street-fill: #10b981;
          --box: #d97706;
          --box-shadow: #b45309;
          
          padding: 12px 0;
          width: 100%;
          min-height: 48px;
          cursor: pointer;
          text-align: center;
          position: relative;
          border: none;
          outline: none;
          color: var(--color);
          background: var(--background);
          border-radius: var(--br, 12px);
          appearance: none;
          -webkit-tap-highlight-color: transparent;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx, 0deg)) translateZ(0);
          transition: transform .5s, border-radius .3s linear var(--br-d, 0s), background-color 0.3s;
        }

        .truck-button::before,
        .truck-button::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 6px;
          display: block;
          background: var(--b, var(--street));
          transform-origin: 0 100%;
          transform: rotateX(90deg) scaleX(var(--sy, 1));
        }

        .truck-button::after {
          --sy: var(--progress, 0);
          --b: var(--street-fill);
          transition: transform 2.4s linear 1.45s;
        }

        .truck-button .default,
        .truck-button .success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: var(--o, 1);
          transition: opacity .3s;
        }

        .truck-button .success {
          --o: 0;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }

        .truck-button .success svg {
          width: 12px;
          height: 10px;
          display: inline-block;
          vertical-align: middle;
          fill: none;
          stroke: var(--tick);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: var(--offset, 16px);
          transition: stroke-dashoffset .4s ease .45s;
        }

        .truck-button .truck {
          position: absolute;
          width: 72px;
          height: 28px;
          left: 50%;
          margin-left: -36px;
          transform: rotateX(90deg) translate3d(calc(var(--truck-x) * 1px), calc(var(--truck-y-n) * 1px), 12px);
          transition: transform var(--truck-d, 0s) var(--truck-ease, ease-out);
        }

        .truck-button .truck::before,
        .truck-button .truck::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: var(--l, 18px);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          z-index: 2;
          box-shadow: inset 0 0 0 2px var(--wheel), inset 0 0 0 4px var(--wheel-inner);
          background: var(--wheel-dot);
          transform: translateY(calc(var(--truck-y) * -1px)) translateZ(0);
        }

        .truck-button .truck::after {
          --l: 54px;
        }

        .truck-button .truck .wheel,
        .truck-button .truck .wheel::before {
          position: absolute;
          bottom: var(--b, -6px);
          left: var(--l, 6px);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--wheel);
          transform: translateZ(0);
        }

        .truck-button .truck .wheel {
          transform: translateY(calc(var(--truck-y) * -1px)) translateZ(0);
        }

        .truck-button .truck .wheel::before {
          --l: 35px;
          --b: 0;
          content: '';
        }

        .truck-button .truck .front,
        .truck-button .truck .back,
        .truck-button .truck .box {
          position: absolute;
        }

        .truck-button .truck .back {
          left: 0;
          bottom: 0;
          z-index: 1;
          width: 47px;
          height: 28px;
          border-radius: 1px 1px 0 0;
          background: linear-gradient(68deg, var(--back-inner) 0%, var(--back-inner) 22%, var(--back-inner-shadow) 22.1%, var(--back-inner-shadow) 100%);
        }

        .truck-button .truck .back::before,
        .truck-button .truck .back::after {
          content: '';
          position: absolute;
        }

        .truck-button .truck .back::before {
          left: 11px;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          border-radius: 0 1px 0 0;
          background: var(--back);
        }

        .truck-button .truck .back::after {
          border-radius: 1px;
          width: 73px;
          height: 2px;
          left: -1px;
          bottom: -2px;
          background: var(--base);
        }

        .truck-button .truck .front {
          left: 47px;
          bottom: -1px;
          height: 22px;
          width: 24px;
          clip-path: polygon(55% 0, 72% 44%, 100% 58%, 100% 100%, 0 100%, 0 0);
          background: linear-gradient(84deg, var(--front-shadow) 0%, var(--front-shadow) 10%, var(--front) 12%, var(--front) 100%);
        }

        .truck-button .truck .front::before,
        .truck-button .truck .front::after {
          content: '';
          position: absolute;
        }

        .truck-button .truck .front::before {
          width: 7px;
          height: 8px;
          left: 7px;
          top: 2px;
          clip-path: polygon(0 0, 60% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(59deg, var(--window) 0%, var(--window) 57%, var(--window-shadow) 55%, var(--window-shadow) 100%)
        }

        .truck-button .truck .front::after {
          width: 3px;
          height: 2px;
          right: 0;
          bottom: 3px;
          background: var(--front-light);
        }

        .truck-button .truck .box {
          width: 13px;
          height: 13px;
          right: 56px;
          bottom: 0;
          z-index: 1;
          border-radius: 1px;
          overflow: hidden;
          transform: translate(calc(var(--box-x) * 1px), calc(var(--box-y) * 1px)) scale(var(--box-s));
          opacity: var(--box-o);
          background: linear-gradient(68deg, var(--box) 0%, var(--box) 50%, var(--box-shadow) 50.2%, var(--box-shadow) 100%);
          background-size: 250% 100%;
          background-position-x: calc(var(--bx) * 1%);
        }

        .truck-button .truck .box::before,
        .truck-button .truck .box::after {
          content: '';
          position: absolute;
        }

        .truck-button .truck .box::before {
          background: rgba(255, 255, 255, 0.2);
          left: 0;
          right: 0;
          top: 6px;
          height: 1px;
        }

        .truck-button .truck .box::after {
          width: 6px;
          left: 100%;
          top: 0;
          bottom: 0;
          background: var(--back);
          transform: translateX(calc(var(--hx) * 1px));
        }

        .truck-button.animation {
          --rx: -90deg;
          --br: 0px;
        }

        .truck-button.animation .default {
          --o: 0;
        }

        .truck-button.animation.done {
          --rx: 0deg;
          --br: 12px;
          --br-d: .2s;
        }

        .truck-button.animation.done .success {
          --o: 1;
        }
        
        @keyframes rotateWheel {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .truck-button.animation .truck .wheel {
          animation: rotateWheel 0.6s linear infinite;
        }
      `}</style>

      <button
        disabled={disabled || animationClass !== ""}
        onClick={handleAction}
        className={`truck-button ${animationClass} ${className}`}
        style={{
          "--progress": progress,
          "--hx": hx,
          "--bx": bx,
          "--box-s": boxS,
          "--box-o": boxO,
          "--box-x": boxX,
          "--box-y": boxY,
          "--truck-x": truckX,
          "--truck-y": truckY,
          "--truck-y-n": truckYN,
          "--truck-d": truckD,
          "--truck-ease": truckEase,
          "--offset": `${offset}px`,
          transition: "transform .5s, border-radius .3s linear var(--br-d, 0s), background-color 0.3s",
        } as React.CSSProperties}
      >
        <span className="default">{buttonText}</span>
        <span className="success">
          {addedText}
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        <div className="truck">
          <div className="wheel" />
          <div className="back" />
          <div className="front" />
          <div
            className="box"
            style={{
              transition: `transform ${boxD} ease, opacity 0.3s ease`,
            }}
          />
        </div>
      </button>

      {/* Confetti Particle Overlays */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            zIndex: 50,
            transform: `translate(${Math.cos(p.angle) * p.speed * 20}px, ${Math.sin(p.angle) * p.speed * 20 + 20}px)`,
            opacity: 0,
            transition: "transform 1.0s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.0s",
          }}
          ref={(el) => {
            if (el) {
              // trigger animate on mount
              requestAnimationFrame(() => {
                el.style.transform = `translate(${Math.cos(p.angle) * p.speed * 20}px, ${Math.sin(p.angle) * p.speed * 20 + 20}px)`;
                el.style.opacity = "1";
              });
            }
          }}
        />
      ))}
    </div>
  );
}
