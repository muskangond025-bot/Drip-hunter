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
    if (!titleHighlight) {
      const words = title.trim().split(/\s+/);
      if (words.length > 1) {
        const midIndex = Math.ceil(words.length / 2);
        const firstPart = words.slice(0, midIndex).join(" ");
        const secondPart = words.slice(midIndex).join(" ");
        return (
          <>
            {firstPart} <span className="text-[#5C4033]">{secondPart}</span>
          </>
        );
      }
      return title;
    }

    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-[#5C4033]">{titleHighlight}</span>
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
              "font-mono text-xs text-accent font-extrabold uppercase tracking-widest block mb-2",
              subtitleClassName
            )}
          >
            {subtitle}
          </span>
        )}
        <h2
          className={cn(
            "text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#2B1B17] font-heading leading-none",
            titleClassName
          )}
        >
          {renderTitle()}
        </h2>
        {description && align === "center" && (
          <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl mx-auto mt-3">
            {description}
          </p>
        )}
      </div>

      {/* Description on the side (for left/right aligned sections) or custom controls */}
      {align !== "center" && (description || children) && (
        <div className="flex items-center gap-4 mt-2 md:mt-0 select-none">
          {description && (
            <p className="hidden md:block text-xs font-mono text-muted-foreground max-w-[200px] leading-tight text-right uppercase">
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
