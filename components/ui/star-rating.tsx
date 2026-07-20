import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  showScore?: boolean;
  reviewCount?: number | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  showScore = false,
  reviewCount,
  size = "sm",
  className,
}: StarRatingProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const roundedRating = Math.round(rating);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 select-none">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < roundedRating;
          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300 dark:text-zinc-600 fill-zinc-200 dark:fill-zinc-700"
              )}
            />
          );
        })}
      </div>

      {showScore && (
        <span className={cn("font-bold text-zinc-900 dark:text-zinc-100", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={cn("text-zinc-400 font-sans ml-0.5", textSizes[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
