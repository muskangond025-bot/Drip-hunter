import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import { masterProducts } from "./data";

export function generateStaticParams() {
  return masterProducts.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const productId = parseInt(unwrappedParams.id);
  
  return <ProductDetailClient productId={productId} />;
}
