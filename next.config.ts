import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * GTM üzerinden gelen etiketler (GA4, Ads) ve YouTube/Maps gömüleri https
 * kaynaklarından yüklenir; asıl kazanım frame-ancestors, object-src ve base-uri kısıtı.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "media-src 'self' blob: https:",
  "frame-src 'self' https:",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Kardeş sitelerle birebir aynı kalıp blog yazıları yayından kaldırıldı (Google'da toplu / kapı
 * sayfası riski, son 28 günde tıklama yoktu). Eski adresler en yakın hizmet / ilçe sayfasına 301.
 */
const RETIRED_BLOG_POSTS: Record<string, string> = JSON.parse(
  readFileSync(path.join(process.cwd(), "scripts/retired-blog-posts.json"), "utf8"),
);

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
      { protocol: "https", hostname: "wesolog.com", pathname: "/**" },
      { protocol: "https", hostname: "www.wesolog.com", pathname: "/**" },
      { protocol: "https", hostname: "**.wesoco.com.tr", pathname: "/**" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    /** İletişim formu: CV (5 MB) + portfolyo (15 MB) + metin alanları */
    proxyClientMaxBodySize: "25mb",
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return Object.entries(RETIRED_BLOG_POSTS).map(([slug, destination]) => ({
      source: `/blog/${slug}`,
      destination,
      permanent: true,
    }));
  },
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
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
