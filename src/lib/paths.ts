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

export const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://trabzonsosyalmedya.com";

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
