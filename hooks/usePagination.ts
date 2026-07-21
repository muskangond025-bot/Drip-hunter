"use client";

import { useState, useMemo, useCallback } from "react";

export interface UsePaginationOptions<T> {
  items: T[];
  itemsPerPage?: number;
  initialPage?: number;
  scrollToTopId?: string;
}

export function usePagination<T>({
  items,
  itemsPerPage = 8,
  initialPage = 1,
  scrollToTopId,
}: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Total available pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length, itemsPerPage]);

  // Ensure current page remains within valid bounds when items array changes
  const validPage = useMemo(() => {
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);

  // Paginated items for current active page
  const paginatedItems = useMemo(() => {
    const startIndex = (validPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, validPage, itemsPerPage]);

  const scrollToSection = useCallback(() => {
    if (scrollToTopId && typeof window !== "undefined") {
      const element = document.getElementById(scrollToTopId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollToTopId]);

  const goToPage = useCallback(
    (page: number) => {
      const targetPage = Math.min(Math.max(1, page), totalPages);
      setCurrentPage(targetPage);
      scrollToSection();
    },
    [totalPages, scrollToSection]
  );

  const nextPage = useCallback(() => {
    if (validPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToSection();
    }
  }, [validPage, totalPages, scrollToSection]);

  const prevPage = useCallback(() => {
    if (validPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToSection();
    }
  }, [validPage, scrollToSection]);

  // Generate page numbers range for UI buttons
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return {
    currentPage: validPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    canPrev: validPage > 1,
    canNext: validPage < totalPages,
    isFirstPage: validPage === 1,
    isLastPage: validPage === totalPages,
    pageNumbers,
  };
}
