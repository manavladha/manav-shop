import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Amazon product images (fetched via Microlink og:image)
      { protocol: "https", hostname: "*.media-amazon.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      // Flipkart product images
      { protocol: "https", hostname: "*.flixcart.com" },
      { protocol: "https", hostname: "rukminim*.flixcdn.com" },
      // Microlink CDN (may proxy/cache images)
      { protocol: "https", hostname: "*.microlink.io" },
      // Catch-all for any other og:image host — safe since unoptimized is set per-card
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
