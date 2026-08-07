/** Public (Turkish) paths - use in Link href and canonicals */
export const paths = {
  home: "/",
  about: "/hakkimizda",
  services: "/hizmetler",
  service: (slug: string) => `/hizmetler/${slug}`,
  regions: "/bolgeler",
  region: (slug: string) => `/bolgeler/${slug}`,
  sectors: "/sektorler",
  sector: (slug: string) => `/sektorler/${slug}`,
  cases: "/vakalar",
  caseStudy: (slug: string) => `/vakalar/${slug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  contact: "/iletisim",
  faq: "/sss",
  kvkk: "/kvkk",
  privacy: "/gizlilik",
  cookies: "/cerez-politikasi",
  disclosure: "/aydinlatma",
  feed: "/feed.xml",
  admin: "/admin",
  adminLogin: "/admin/login",
  /** Homepage section anchors (Turkish) */
  hash: {
    about: "/#hakkimizda",
    services: "/#hizmetler",
    process: "/#surec",
    refs: "/#referanslar",
    packages: "/#yaklasim",
    approach: "/#yaklasim",
    blog: "/#blog",
    faq: "/#sss",
    contact: "/#iletisim",
  },
} as const;

/** Internal English route segments (app directory) */
export const internal = {
  about: "/about",
  services: "/services",
  regions: "/regions",
  sectors: "/sectors",
  cases: "/cases",
  blog: "/blog",
  contact: "/contact",
  faq: "/faq",
} as const;

/** Sitemap / canonical / schema için sabit production domain */
export const CANONICAL_SITE_URL = "https://trabzonsosyalmedya.com";

/**
 * Public site origin. Asla localhost / Coolify preview / wesoco staging yazmaz
 * (sitemap ve canonical’lar bozulmasın diye).
 */
export function siteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");
  if (raw && isPublicProductionOrigin(raw)) return raw;
  return CANONICAL_SITE_URL;
}

function isPublicProductionOrigin(value: string) {
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    const host = u.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return false;
    // Geçici Coolify / staging hostları
    if (host.includes("wesoco.com") && host !== "trabzonsosyalmedya.com") return false;
    if (/^[a-z0-9]+\.wesoco\.com(\.tr)?$/i.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
