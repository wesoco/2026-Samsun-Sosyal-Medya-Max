import DOMPurify from "isomorphic-dompurify";
import { fixBlogHtml } from "@/lib/blog-media";

/** Gömülü videoya izin verilen kaynaklar */
const IFRAME_SRC = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i;

DOMPurify.addHook("uponSanitizeElement", (node, data) => {
  if (data.tagName !== "iframe") return;
  const src = (node as Element).getAttribute?.("src") || "";
  if (!IFRAME_SRC.test(src)) node.parentNode?.removeChild(node);
});

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/**
 * Panelden / SEO Agent'tan gelen gövde HTML'i: script, olay öznitelikleri ve javascript: linkleri
 * temizlenir; tablo, details, görsel, YouTube/Vimeo iframe korunur.
 */
export function sanitizeHtml(html: string | null | undefined) {
  if (!html) return "";
  return DOMPurify.sanitize(fixBlogHtml(html), {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "loading", "allow", "allowfullscreen", "frameborder"],
  });
}
