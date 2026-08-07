import type { AgentPost } from "./storage";

function extractImgSrcs(html: string): string[] {
  return [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function sameImage(a: string, b: string) {
  const na = a.trim().split("?")[0];
  const nb = b.trim().split("?")[0];
  if (!na || !nb) return false;
  if (na === nb) return true;
  const fa = na.split("/").pop() || "";
  const fb = nb.split("/").pop() || "";
  return Boolean(fa && fa === fb);
}

/**
 * Panel kapak + body’de aynı (veya ek) görsel gönderince sitede çift/kırık kapak oluşur.
 * Body’de img varsa coverImageUrl’i temizle.
 */
export function normalizeAgentPostImages(post: AgentPost): AgentPost {
  const cover = (post.coverImageUrl || "").trim();
  if (!cover) return post;
  const srcs = extractImgSrcs(post.bodyHtml || "");
  if (srcs.length === 0) return post;
  return { ...post, coverImageUrl: undefined };
}

export function stripMatchingCoverFromBody(html: string, coverUrl: string): string {
  const cover = coverUrl.trim();
  if (!cover || !html) return html;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/src=["']([^"']+)["']/i)?.[1] || "";
    return sameImage(src, cover) ? "" : tag;
  });
}
