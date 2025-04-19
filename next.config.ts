import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Set the base path to the repository name for GitHub Pages
  // Remove this line if deploying to a custom domain or to the root domain
  basePath: process.env.NODE_ENV === 'production' ? '/quran-quiz' : '',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Disable server-side features since GitHub Pages is static
  trailingSlash: true,
};

export default nextConfig;