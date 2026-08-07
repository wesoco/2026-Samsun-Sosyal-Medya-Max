import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@wesoco/seo-agent", "@wesoco/seo-core"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "www.wesoco.com" },
      { protocol: "https", hostname: "wesoco.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  compress: true,
  /**
   * TR public URL → EN app directory (middleware rewrite Next 16’da
   * absolute localhost URL + 301 döngüsüne yol açıyordu).
   */
  async rewrites() {
    return [
      { source: "/hakkimizda", destination: "/about" },
      { source: "/hizmetler", destination: "/services" },
      { source: "/hizmetler/:slug", destination: "/services/:slug" },
      { source: "/bolgeler", destination: "/regions" },
      { source: "/bolgeler/:slug", destination: "/regions/:slug" },
      { source: "/sektorler", destination: "/sectors" },
      { source: "/sektorler/:slug", destination: "/sectors/:slug" },
      { source: "/vakalar", destination: "/cases" },
      { source: "/vakalar/:slug", destination: "/cases/:slug" },
      { source: "/iletisim", destination: "/contact" },
      { source: "/sss", destination: "/faq" },
      { source: "/kvkk", destination: "/legal/kvkk" },
      { source: "/gizlilik", destination: "/legal/privacy" },
      { source: "/cerez-politikasi", destination: "/legal/cookies" },
      { source: "/aydinlatma", destination: "/legal/disclosure" },
    ];
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
