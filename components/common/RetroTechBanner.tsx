"use client";

import React from "react";
import Image from "next/image";

export function RetroTechBanner() {
  return (
    <section className="relative w-full aspect-[1.65/1] overflow-hidden select-none border-t border-b border-zinc-100 my-16 sm:my-24">
      <Image
        src="/images/retro_tv_banner.png"
        alt="Retro CRT TV Curation Banner"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </section>
  );
}
