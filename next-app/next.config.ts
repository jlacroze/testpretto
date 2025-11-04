// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Active le support ISR (Incremental Static Regeneration)
  output: "standalone",

  // Autorise Next.js à gérer les images depuis WordPress
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pretto.fr", // adapter selon ton domaine WP
      },
      {
        protocol: "https",
        hostname: "**.wpengine.com", // si WordPress est hébergé ailleurs
      },
    ],
  },

  // Optimisation build
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
