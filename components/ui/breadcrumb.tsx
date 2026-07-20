import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-xs text-zinc-500 font-mono uppercase tracking-wider", className)}>
      <Link href="/" className="hover:text-black transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-zinc-400 flex-shrink-0" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-black transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={cn("font-bold text-zinc-900 truncate max-w-[200px]", isLast && "text-black")}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
