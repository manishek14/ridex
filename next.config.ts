// next.config.ts — Next.js 15.3.3 / 16.x
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // دسترسی از شبکه محلی در development
  allowedDevOrigins: [
    "192.168.254.6",
    "192.168.43.47",
    "192.168.1.255",
    "192.168.0.255",
  ],

  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "localhost" },
      { protocol: "https", hostname: "api.ridex.ir" },
      { protocol: "https", hostname: "cdn.ridex.ir" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "recharts"],
  },
};

export default nextConfig;
