import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  titleHighlight?: string; // Optional text to highlight/colorize
  description?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "center" | "left" | "right";
  children?: ReactNode; // Optional right-side controls or actions
}

export function SectionHeader({
  subtitle,
  title,
  titleHighlight,
  description,
  className,
  titleClassName,
  subtitleClassName,
  align = "center",
  children,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!titleHighlight) return title;

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-[#133e7c] dark:text-blue-400">{titleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" && "text-center items-center justify-center",
        align === "left" && "text-left items-start md:flex-row md:items-end md:justify-between",
        align === "right" && "text-right items-end md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn(align === "center" ? "w-full" : "flex-grow")}>
        {subtitle && (
          <span
            className={cn(
              "font-mono text-xs text-yellow-400 font-extrabold uppercase tracking-widest block mb-2",
              subtitleClassName
            )}
          >
            {subtitle}
          </span>
        )}
        <h2
          className={cn(
            "text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black dark:text-white mt-1",
            titleClassName
          )}
        >
          {renderTitle()}
        </h2>
        {description && align === "center" && (
          <p className="text-xs sm:text-sm font-sans text-zinc-500 max-w-2xl mx-auto mt-3">
            {description}
          </p>
        )}
      </div>

      {/* Description on the side (for left/right aligned sections) or custom controls */}
      {align !== "center" && (description || children) && (
        <div className="flex items-center gap-4 mt-2 md:mt-0 select-none">
          {description && (
            <p className="hidden md:block text-xs font-mono text-zinc-500 max-w-[200px] leading-tight text-right uppercase">
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
