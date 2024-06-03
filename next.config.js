/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    PRICE_FROM_FETCH_PERIOD_DAYS:
      process.env.PRICE_FROM_FETCH_PERIOD_DAYS || "30",
  },
  output: "standalone",
  images: {
    loader: "custom",
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
  },
  cleanDistDir: true,
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  productionBrowserSourceMaps: process.env.NODE_ENV !== "production",
  poweredByHeader: false,
  compiler: {
    removeConsole: {
      exclude: ["error", "info"],
    },
  },
  outputFileTracing: true,
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: "/:path*",
          destination: `${process.env.BPD_MAIN_BASEPATH}/:path*`, // this is substitued in build time
          basePath: false,
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:countryOrSlug/:city/:productId/amp",
        destination: "/:countryOrSlug/:city/:productId",
        permanent: true,
      },
    ];
  },
  generateBuildId() {
    return process.env.BITBUCKET_COMMIT ?? `dev-${Date.now()}}`;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
