import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import { masterProducts } from "./data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = masterProducts.map((p) => ({
    id: p.id.toString(),
  }));
  
  // Guaranteed fallback list to satisfy Turbopack development compilation and literal [id] checks
  const fallbackList = [
    { id: "[id]" },
    { id: "201" }, { id: "202" }, { id: "203" }, { id: "204" }, { id: "205" },
    { id: "206" }, { id: "207" }, { id: "208" }, { id: "209" }, { id: "210" },
    { id: "211" }, { id: "212" }, { id: "213" }, { id: "214" }, { id: "215" },
    { id: "216" }, { id: "217" }, { id: "218" }, { id: "231" }, { id: "232" },
    { id: "241" }, { id: "242" }, { id: "101" }, { id: "102" }, { id: "103" },
    { id: "104" }, { id: "105" }, { id: "106" }, { id: "107" }, { id: "108" },
    { id: "851" }, { id: "852" }, { id: "853" }, { id: "854" }, { id: "855" },
    { id: "856" }, { id: "857" }, { id: "858" }, { id: "861" }, { id: "862" },
    { id: "863" }, { id: "901" }, { id: "902" }, { id: "903" }, { id: "801" },
    { id: "802" }, { id: "803" }, { id: "804" }, { id: "805" }, { id: "811" }
  ];

  const uniqueIds = new Set<string>();
  const mergedPaths: { id: string }[] = [];

  for (const p of [...paths, ...fallbackList]) {
    if (!uniqueIds.has(p.id)) {
      uniqueIds.add(p.id);
      mergedPaths.push(p);
    }
  }

  return mergedPaths;
}

// Force route re-compilation to clear Next.js stale dev SSR caches
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const productId = parseInt(unwrappedParams.id);
  
  return <ProductDetailClient productId={productId} />;
}
