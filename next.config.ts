import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.savana.com",
      },
      {
        protocol: "https",
        hostname: "*.mfrcdn.com",
      },
    ],
  },
};

export default nextConfig;
