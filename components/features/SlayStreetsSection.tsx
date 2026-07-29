"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const orbitNodes = [
  {
    id: 1,
    name: "Red Nike Sneaker",
    img: "https://img105.savana.com/4854347d98424cebac4b9b890f1d97fe.webp",
    pos: "top-0", // 12 o'clock
  },
  {
    id: 2,
    name: "Streetwear Cap",
    img: "https://img105.savana.com/76a4b6083ba741079a8ef16e2c7a73e8.webp",
    pos: "right-0", // 3 o'clock
  },
  {
    id: 3,
    name: "Urban Sweatshirt",
    img: "https://img105.savana.com/799cbf906744487086647c6a0ab5f8d8.webp",
    pos: "bottom-0", // 6 o'clock
  },
  {
    id: 4,
    name: "Fashion Look",
    img: "https://img105.savana.com/5610cf369ccf415a911f4db271e1da9d.webp",
    pos: "left-0", // 9 o'clock
  },
];

export function SlayStreetsSection() {
  const [hoveredNode, setHoveredNode] = useState<typeof orbitNodes[0] | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <section className="w-full py-12 sm:py-20 select-none bg-white overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center overflow-visible">
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-6 space-y-6">
            {/* Massive Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black uppercase tracking-tight leading-[0.88] font-sans">
                SLAY<br />
                THE<br />
                STREETS
              </h1>
            </div>

            {/* Subheading */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                Our Story
              </h3>
            </div>

            {/* Paragraph Text */}
            <div className="space-y-4 max-w-xl text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
              <p className="font-semibold text-zinc-800">
                Main mission is to build a website-building platform that is affordable for everyone around the world.
              </p>

              <p className="text-zinc-600 font-normal leading-relaxed">
                Combining the ease-of-use and flexibility to make it possible for anyone from any corner of the world to build a website We took the name from the word &quot;Doric&quot; which was one of the three orders of ancient Greek and later Roman architecture We have started getting requests for early access from the day we launched our landing page.
              </p>
            </div>
          </div>

          {/* Right Column: Feature Model Card with Dynamic Orbit Badges */}
          <div
            className="lg:col-span-6 relative pt-10 pr-10 sm:pt-14 sm:pr-14 overflow-visible group/card"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => {
              setIsCardHovered(false);
              setHoveredNode(null);
            }}
          >
            {/* Main Rounded Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-100 cursor-pointer">
              <Image
                src="/images/slay_streets_model.png"
                alt="Slay The Streets Lookbook Model"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover group-hover/card:scale-103 transition-transform duration-700"
              />
            </div>

            {/* Floating Orbit Node Cluster: Hidden when not hovering over card */}
            <div
              className={`absolute top-0 right-0 z-30 w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center transition-all duration-500 ease-out ${
                isCardHovered
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              {/* Center Black Circle Badge: Shows Nike Swoosh by default, or hovered image */}
              <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black text-white flex items-center justify-center shadow-2xl border-2 border-white overflow-hidden transition-all duration-300">
                <AnimatePresence mode="wait">
                  {hoveredNode ? (
                    <motion.div
                      key={hoveredNode.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={hoveredNode.img}
                        alt={hoveredNode.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-logo"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                        aria-label="Nike Logo"
                      >
                        <path d="M21.71 6.33c-3.79 3.53-7.51 6.84-11.23 10.23-1.42 1.3-2.92 2.5-4.73 3.01-1.62.45-3.23.09-4.43-1.04-1.07-1.01-1.39-2.39-.99-3.74.45-1.5 1.48-2.61 2.76-3.48 2.05-1.39 4.34-2.43 6.66-3.37 2.92-1.18 5.92-2.12 8.95-2.96 1.05-.29 2.04-.64 3.01-1.04.01.8-.02 1.58-.01 2.38z" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4 Outer Orbit Circles containing product images */}
              {orbitNodes.map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute ${node.pos} w-11 h-11 sm:w-15 sm:h-15 rounded-full border-2 border-white shadow-lg overflow-hidden bg-zinc-100 cursor-pointer transition-all duration-300 hover:scale-115 hover:z-30 hover:ring-2 hover:ring-black/50`}
                >
                  <Image
                    src={node.img}
                    alt={node.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
