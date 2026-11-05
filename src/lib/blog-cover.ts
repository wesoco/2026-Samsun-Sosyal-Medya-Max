import { fixBlogMediaUrl } from "@/lib/blog-media";

/** Kapak yoksa (ya da yüklenemezse) gösterilen ortak blog görseli */
export const BLOG_FALLBACK_COVER = "https://www.wesoco.com/images/blog-banner.webp";

/** Eski yerel varsayılanlar: kapak sayılmaz */
const PLACEHOLDER_COVER = /^\/images\/cover\.webp$|^\/assets\/Samsun-sosyal-medya\.webp$/i;

/**
 * Blog kapak görseli. Eski blog.wesoco.com.tr adresleri wesolog.com'a çevrilir
 * (blog sistemi taşındı); kapak yoksa ortak blog görseli.
 */
export function blogCover(_slug: string, url: string | null | undefined) {
  const u = fixBlogMediaUrl((url || "").trim());
  return !u || PLACEHOLDER_COVER.test(u) ? BLOG_FALLBACK_COVER : u;
}
