import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Tells Next.js to generate static HTML files (index.html, etc.)
  output: 'export',

  // 2. Disables the Image Optimization API (which needs a server)
  // Required for GitHub Pages unless you use a custom loader
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
