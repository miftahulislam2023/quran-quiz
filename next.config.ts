import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Set the base path to the repository name for GitHub Pages
  // Remove this line if deploying to a custom domain or to the root domain
  basePath: '/quran-quiz',
};

export default nextConfig;