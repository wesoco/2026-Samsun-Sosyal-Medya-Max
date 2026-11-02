/**
 * Blog kapak görseli. SEO Agent'ın site geneli kapağı (/uploads/sites/<id>/cover.*)
 * her yazıda aynıydı ve dış sunucu (blog.wesoco.com.tr) çökünce tüm kapaklar kırılıyordu.
 * Genel kapak (her yazıda aynı görsel) / boş kapak → yazının adresine göre sabit, yerel bir görsel.
 */
export const BLOG_COVER_FALLBACKS = [
  "/assets/hero/01.webp",
  "/assets/hero/02.webp",
  "/assets/hero/03.webp",
  "/assets/hero/04.webp",
  "/assets/hero/05.webp",
  "/assets/hero/06.webp",
];

const GENERIC_COVER = /\/uploads\/sites\/[^/]+\/cover\.\w+$|^\/images\/cover\.webp$|^\/assets\/Samsun-sosyal-medya\.webp$/i;

export function fallbackCover(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return BLOG_COVER_FALLBACKS[h % BLOG_COVER_FALLBACKS.length];
}

export function blogCover(slug: string, url: string | null | undefined) {
  const u = (url || "").trim();
  return !u || GENERIC_COVER.test(u) ? fallbackCover(slug) : u;
}
