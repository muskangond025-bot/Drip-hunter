"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "HOW TO STYLE CARGO PANTS: 5 LOOKS FOR EVERY OCCASION",
    excerpt:
      "Cargo pants have evolved from utilitarian workwear to an essential streetwear staple. Here's how to style them with oversized graphic tees, hoodies, and tactical accessories.",
    date: "JUL 18, 2026",
    readTime: "4 MIN READ",
    category: "STYLE GUIDE",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800",
    slug: "how-to-style-cargo-pants",
  },
  {
    id: 2,
    title: "WHY HIGH QUALITY FABRIC MATTERS FOR STREETWEAR",
    excerpt:
      "Understanding fabric weight, GSM, and weave structure is key to choosing streetwear that holds its shape, resists wear, and feels premium wash after wash.",
    date: "JUL 15, 2026",
    readTime: "5 MIN READ",
    category: "CRAFT & FABRIC",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800",
    slug: "why-high-quality-fabric-matters",
  },
  {
    id: 3,
    title: "HOW TO CHOOSE THE PERFECT HAT FOR YOUR FACE SHAPE",
    excerpt:
      "From snapbacks and dad hats to buckets and beanies, find out which headwear silhouette best complements your face shape and elevates your everyday outfit.",
    date: "JUL 10, 2026",
    readTime: "3 MIN READ",
    category: "HEADWEAR GUIDE",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800",
    slug: "perfect-hat-for-face-shape",
  },
];

export function UrbanBlogSection() {
  return (
    <section className="w-full bg-zinc-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-zinc-300 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase mb-1">
              <BookOpen className="w-4 h-4 text-zinc-800" />
              STORIES & JOURNAL
            </div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 uppercase font-mono">
              OUR BLOG
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors"
          >
            <span>VIEW ALL POSTS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-zinc-200 hover:border-zinc-900 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-400" />
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-zinc-900 font-mono uppercase tracking-tight group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-600 mt-3 line-clamp-3 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <a
                    href={`/blog#${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black group-hover:text-amber-600 transition-colors uppercase tracking-wider"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
