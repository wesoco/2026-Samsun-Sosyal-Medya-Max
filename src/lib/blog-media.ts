/**
 * Merkezi blog sistemi blog.wesoco.com.tr'den wesolog.com'a taşındı; eski alan adı artık yanıt vermiyor.
 * Veritabanında / SEO Agent deposunda kayıtlı eski mutlak adresler görüntülenirken yeni adrese çevrilir
 * (kayıtlara yazılmaz).
 */
export const BLOG_MEDIA_ORIGIN = "https://wesolog.com";

const LEGACY_BLOG_ORIGIN = /(?:https?:)?\/\/blog\.wesoco\.com\.tr(?=[/"'?#\s]|$)/gi;

/** Tek bir görsel / bağlantı adresi */
export function fixBlogMediaUrl<T extends string | null | undefined>(url: T): T {
  if (!url) return url;
  return url.replace(LEGACY_BLOG_ORIGIN, BLOG_MEDIA_ORIGIN) as T;
}

/** Gövde HTML'i: img src/srcset, a href ve diğer tüm eski adresler */
export function fixBlogHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(LEGACY_BLOG_ORIGIN, BLOG_MEDIA_ORIGIN);
}
