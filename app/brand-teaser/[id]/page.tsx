import React from "react";
import BrandTeaserClient from "./BrandTeaserClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: "[id]" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" }
  ];
}

export default async function BrandTeaserPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const teaserId = parseInt(unwrappedParams.id);
  
  return <BrandTeaserClient teaserId={teaserId} />;
}
