import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/** İngilizce iç path’ler indekslenmesin - TR kanonik URL’ye 301 */
const EN_CANONICAL_REDIRECTS: Array<{ match: RegExp; to: (m: RegExpMatchArray) => string }> = [
  { match: /^\/about\/?$/, to: () => "/hakkimizda" },
  { match: /^\/services\/?$/, to: () => "/hizmetler" },
  { match: /^\/services\/([^/]+)\/?$/, to: (m) => `/hizmetler/${m[1]}` },
  { match: /^\/regions\/?$/, to: () => "/bolgeler" },
  { match: /^\/regions\/([^/]+)\/?$/, to: (m) => `/bolgeler/${m[1]}` },
  { match: /^\/sectors\/?$/, to: () => "/sektorler" },
  { match: /^\/sectors\/([^/]+)\/?$/, to: (m) => `/sektorler/${m[1]}` },
  { match: /^\/cases\/?$/, to: () => "/vakalar" },
  { match: /^\/cases\/([^/]+)\/?$/, to: (m) => `/vakalar/${m[1]}` },
  { match: /^\/contact\/?$/, to: () => "/iletisim" },
  { match: /^\/faq\/?$/, to: () => "/sss" },
  { match: /^\/legal\/kvkk\/?$/, to: () => "/kvkk" },
  { match: /^\/legal\/privacy\/?$/, to: () => "/gizlilik" },
  { match: /^\/legal\/cookies\/?$/, to: () => "/cerez-politikasi" },
  { match: /^\/legal\/disclosure\/?$/, to: () => "/aydinlatma" },
];

const LEGACY_REDIRECTS: Array<{ match: RegExp; to: (m: RegExpMatchArray) => string }> = [
  { match: /^\/hizmet\/?$/, to: () => "/hizmetler" },
  { match: /^\/hizmet\/index\.html$/, to: () => "/hizmetler" },
  { match: /^\/hizmet\/([^/]+)\.html$/, to: (m) => `/hizmetler/${m[1]}` },
  { match: /^\/bolgeler\/index\.html$/, to: () => "/bolgeler" },
  { match: /^\/bolgeler\/([^/]+)\.html$/, to: (m) => `/bolgeler/${m[1]}` },
  { match: /^\/blog\/index\.html$/, to: () => "/blog" },
  { match: /^\/blog\/([^/]+)\.html$/, to: (m) => `/blog/${m[1]}` },
  { match: /^\/index\.html$/, to: () => "/" },
  { match: /^\/home\/?$/i, to: () => "/" },
  { match: /^\/anasayfa\/?$/i, to: () => "/" },
  { match: /^\/index\/?$/i, to: () => "/" },
];

/** Eski CMS/statik uzantılar (bilinen eşleşme yoksa) → ana sayfa 301 */
const LEGACY_FILE_EXT = /\.(html?|php|aspx?|jsp|cgi|cfm)$/i;

export default auth((req) => {
  const { pathname } = req.nextUrl;

  for (const rule of LEGACY_REDIRECTS) {
    const m = pathname.match(rule.match);
    if (m) {
      const url = req.nextUrl.clone();
      url.pathname = rule.to(m);
      return NextResponse.redirect(url, 301);
    }
  }

  // Dışarıdan EN path: 301 TR. (TR→EN rewrite artık next.config.ts’te.)
  for (const rule of EN_CANONICAL_REDIRECTS) {
    const m = pathname.match(rule.match);
    if (m) {
      const url = req.nextUrl.clone();
      url.pathname = rule.to(m);
      return NextResponse.redirect(url, 301);
    }
  }

  // Bilinmeyen .html / .php vb. eski sayfalar → home (SEO: 404 yerine 301)
  if (LEGACY_FILE_EXT.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const role = req.auth?.user && (req.auth.user as { role?: string }).role;
    const isStaff = role === "ADMIN" || role === "EDITOR";
    if (!req.auth || !isStaff) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    const adminOnly =
      pathname === "/admin/settings" ||
      pathname.startsWith("/admin/settings/") ||
      pathname === "/admin/users" ||
      pathname.startsWith("/admin/users/");
    if (adminOnly && role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|api/seo-agent|api/contact|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
