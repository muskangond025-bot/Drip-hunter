"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2 select-none", className)}>
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer",
          currentPage === 1
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-50"
            : "border-zinc-300 text-zinc-700 hover:border-black hover:bg-black hover:text-white"
        )}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10 h-10 rounded-full font-bold text-xs transition-all cursor-pointer",
                isActive
                  ? "bg-black text-white shadow-md scale-105"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer",
          currentPage === totalPages
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-50"
            : "border-zinc-300 text-zinc-700 hover:border-black hover:bg-black hover:text-white"
        )}
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
