"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// Mock sticky notes config representing streetwear announcements & custom codes
const notesData = [
  {
    id: 1,
    title: "⚡ Drip Drop Code",
    text: "Use code DRIP20 for 20% off our graphic hoodies. Limited to first 100 uses. Hurry!",
    color: "bg-yellow-100 border-yellow-300 text-yellow-900",
    rotation: "-rotate-2 hover:-rotate-1",
    top: "top-[15%]",
    left: "left-[10%]",
  },
  {
    id: 2,
    title: "💬 Client Review",
    text: "The tech vest quality is incredible. Multi-pockets are very functional, heavy canvas feel! - Alex M.",
    color: "bg-pink-100 border-pink-300 text-pink-900",
    rotation: "rotate-3 hover:rotate-1",
    top: "top-[25%]",
    left: "left-[40%]",
  },
  {
    id: 3,
    title: "🔥 Next Drop Preview",
    text: "Summer heavy caps drop coming on 08.24. Includes mesh side panels and quick-dry industrial adjusters.",
    color: "bg-green-100 border-green-300 text-green-900",
    rotation: "-rotate-3 hover:-rotate-2",
    top: "top-[18%]",
    left: "left-[70%]",
  },
  {
    id: 4,
    title: "📌 Shipping Update",
    text: "International deliveries now fully active in UK, EU, and Asia! Free express shipping on all orders over $150.",
    color: "bg-blue-100 border-blue-300 text-blue-900",
    rotation: "rotate-2 hover:rotate-0",
    top: "top-[55%]",
    left: "left-[15%]",
  },
  {
    id: 5,
    title: "💎 Drip Hunter Motto",
    text: "Style is a reflection of your attitude and your personality. Wear it with pride. No rules applied.",
    color: "bg-purple-100 border-purple-300 text-purple-900",
    rotation: "-rotate-1 hover:rotate-1",
    top: "top-[50%]",
    left: "left-[50%]",
  },
  {
    id: 6,
    title: "🎁 Birthday Curation",
    text: "Join our club. Register your birthday on the profile panel to get a special $25 coupon drop annually!",
    color: "bg-orange-100 border-orange-300 text-orange-900",
    rotation: "rotate-3 hover:rotate-2",
    top: "top-[52%]",
    left: "left-[78%]",
  },
];

export function NoticeBoard() {
  const [selectedNote, setSelectedNote] = useState<typeof notesData[0] | null>(null);

  return (
    <section className="relative w-full min-h-[720px] py-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background Corkboard Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/corkboard_notes.png"
          alt="Corkboard Background"
          fill
          className="object-cover"
        />
        {/* Dark vignette overlay to tone down the corkboard slightly */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center pointer-events-none mb-10">
        <span className="bg-black text-yellow-400 font-mono text-xs font-black tracking-widest px-3 py-1 rounded uppercase">
          COMMUNITY BOARD
        </span>
        <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-white drop-shadow-lg mt-2">
          Drip Notice Board
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-100 uppercase tracking-wider drop-shadow-md mt-1">
          Click any note to read the full community announcement.
        </p>
      </div>

      {/* Notice Board Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto min-h-[540px]">
        {notesData.map(note => (
          <button
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className={`absolute ${note.top} ${note.left} w-48 sm:w-56 p-5 border shadow-lg cursor-pointer transform ${note.rotation} transition-all duration-300 hover:scale-105 hover:z-20`}
            style={{ pointerEvents: "auto" }}
          >
            {/* Red pin graphic representation */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 border border-red-800 rounded-full shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            </div>
            
            <h3 className="font-bold text-xs uppercase tracking-wider border-b border-black/10 pb-1.5 mb-2 font-mono">
              {note.title}
            </h3>
            <p className="text-[11px] font-mono leading-relaxed line-clamp-3">
              {note.text}
            </p>
          </button>
        ))}
      </div>

      {/* Note Detailed Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className={`w-full max-w-md p-8 border-2 shadow-2xl rounded-2xl relative transform scale-100 transition-all ${selectedNote.color}`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 p-1 bg-black/10 rounded-full hover:bg-black/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Red Pinned Pin Representation */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 border-2 border-red-800 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
            </div>

            <span className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-70">
              BOARD NOTE #{selectedNote.id}
            </span>
            <h3 className="text-xl font-chaney-title uppercase tracking-tight mt-2 pb-3 border-b border-black/10">
              {selectedNote.title}
            </h3>
            <p className="text-sm font-mono leading-relaxed mt-4">
              {selectedNote.text}
            </p>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedNote(null)}
                className="bg-black text-white hover:bg-black/80 font-bold uppercase text-[10px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
