"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface UseCarouselOptions {
  itemsCount: number;
  autoPlay?: boolean;
  intervalMs?: number;
}

export function useCarousel({
  itemsCount,
  autoPlay = false,
  intervalMs = 4000,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Next slide with seamless infinite loop back to index 0
  const nextSlide = useCallback(() => {
    if (itemsCount <= 0) return;
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
  }, [itemsCount]);

  // Previous slide with seamless infinite loop back to final slide
  const prevSlide = useCallback(() => {
    if (itemsCount <= 0) return;
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
  }, [itemsCount]);

  // Jump directly to specific slide index
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < itemsCount) {
        setCurrentIndex(index);
      }
    },
    [itemsCount]
  );

  // Auto-play timer logic (pauses when user hovers over carousel)
  useEffect(() => {
    if (!autoPlay || isHovered || itemsCount <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, intervalMs, isHovered, itemsCount, nextSlide]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    isFirstSlide: currentIndex === 0,
    isLastSlide: currentIndex === itemsCount - 1,
    setIsHovered,
  };
}
