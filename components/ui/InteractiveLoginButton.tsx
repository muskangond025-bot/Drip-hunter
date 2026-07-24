"use client";

import React, { useState, useEffect, useRef } from "react";

export interface InteractiveLoginButtonProps {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => boolean | void | Promise<boolean | void>;
  onAnimationComplete?: () => void;
  className?: string;
  disabled?: boolean;
  buttonText?: string;
  successText?: string;
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

export function InteractiveLoginButton({
  type = "button",
  onClick,
  onAnimationComplete,
  className,
  disabled = false,
  buttonText = "LOG IN",
  successText = "LOGGED IN",
  wrapperClassName,
}: InteractiveLoginButtonProps) {
  const [btnState, setBtnState] = useState<"idle" | "loading" | "success">("idle");
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

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Only intercept for submission flows
    if (disabled || btnState !== "idle") return;

    let shouldProceed = true;
    if (onClick) {
      const res = await onClick(e);
      if (res === false) {
        shouldProceed = false;
      }
    }

    if (!shouldProceed) return;

    // Start loading transition (contracts button to circle)
    setBtnState("loading");

    // Simulate authentication processing for 1.8s
    addTimeout(() => {
      setBtnState("success");
      triggerConfetti();

      // Trigger redirect or completion callback after a short success screen pause
      addTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1200);
    }, 1800);
  };

  return (
    <div className={`relative w-full ${wrapperClassName || ""}`}>
      <style>{`
        .login-btn-wrapper {
          width: 100%;
          height: 52px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-btn {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          background: #18181b;
          color: #ebd26b;
          border: none;
          outline: none;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 15px rgba(24, 24, 27, 0.15);
          transition: width 0.35s cubic-bezier(0.6, -0.28, 0.735, 0.045), 
                      border-radius 0.35s, 
                      background-color 0.3s, 
                      box-shadow 0.3s,
                      transform 0.15s;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }

        .login-btn:active {
          transform: scale(0.98);
        }

        .login-btn.btn-loading {
          width: 52px;
          border-radius: 50%;
          background: #18181b;
          box-shadow: 0 4px 15px rgba(24, 24, 27, 0.3);
          pointer-events: none;
        }

        .login-btn.btn-success {
          width: 52px;
          border-radius: 50%;
          background: #10b981;
          color: #fff;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          pointer-events: none;
        }

        .login-btn .btn-text {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .login-btn.btn-loading .btn-text,
        .login-btn.btn-success .btn-text {
          opacity: 0;
        }

        /* Spinner style */
        .login-btn .loader-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .login-btn.btn-loading .loader-container {
          opacity: 1;
        }

        .login-btn .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(235, 210, 107, 0.2);
          border-top-color: #ebd26b;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Success checkmark style */
        .login-btn .check-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .login-btn.btn-success .check-container {
          opacity: 1;
        }

        .login-btn .check-container svg {
          width: 22px;
          height: 22px;
          stroke: #fff;
          stroke-width: 3.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          stroke-dasharray: 24px;
          stroke-dashoffset: 24px;
          animation: drawCheck 0.4s ease-out forwards 0.15s;
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Confetti particles */
        .login-confetti-particle {
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

      <div className="login-btn-wrapper">
        <button
          type={type}
          disabled={disabled || btnState !== "idle"}
          onClick={handleAction}
          className={`login-btn ${
            btnState === "loading" ? "btn-loading" : btnState === "success" ? "btn-success" : ""
          } ${className || ""}`}
        >
          {/* Default Label */}
          <span className="btn-text">{buttonText}</span>

          {/* Loading Spinner */}
          <div className="loader-container">
            <div className="spinner" />
          </div>

          {/* Success Checkmark */}
          <div className="check-container">
            <svg viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1.5" />
            </svg>
          </div>

          {/* Confetti Explosion */}
          {particles.map((p) => {
            const tx = Math.cos(p.angle) * p.speed * 12;
            const ty = Math.sin(p.angle) * p.speed * 12;
            return (
              <div
                key={p.id}
                className="login-confetti-particle"
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
    </div>
  );
}
