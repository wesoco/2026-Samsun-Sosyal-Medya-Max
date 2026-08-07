import { prisma } from "@/lib/prisma";
import { listSeoPosts, type AgentPost } from "@/lib/seo-posts";

export type PublicBlogCard = {
  id: string;
  slug: string;
  title: string;
  lead: string;
  category: string;
  coverUrl: string | null;
  publishedAt: Date;
};

/** Prisma + SEO Agent yazılarını birleştirir; en son yayınlanan en üstte. */
export async function listPublicBlogPosts(opts?: {
  take?: number;
}): Promise<PublicBlogCard[]> {
  const [dbPosts, seoPosts] = await Promise.all([
    prisma.blogPost.findMany({ where: { published: true } }),
    listSeoPosts().catch((): AgentPost[] => []),
  ]);

  const bySlug = new Map<string, PublicBlogCard>();

  for (const p of dbPosts) {
    bySlug.set(p.slug, {
      id: p.id,
      slug: p.slug,
      title: p.title,
      lead: p.lead,
      category: p.category,
      coverUrl: p.coverUrl,
      publishedAt: p.publishedAt,
    });
  }

  for (const p of seoPosts) {
    const publishedAt = new Date(p.publishedAt || p.createdAt);
    if (Number.isNaN(publishedAt.getTime())) continue;

    const existing = bySlug.get(p.slug);
    if (existing && existing.publishedAt.getTime() > publishedAt.getTime()) {
      continue;
    }

    const bodyImg = (p.bodyHtml || "").match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
    bySlug.set(p.slug, {
      id: p.id,
      slug: p.slug,
      title: p.title,
      lead: p.metaDescription || existing?.lead || "",
      category: "SEO",
      coverUrl:
        p.coverImageUrl ||
        bodyImg ||
        existing?.coverUrl ||
        "/assets/Trabzon-sosyal-medya.webp",
      publishedAt,
    });
  }

  const cards = [...bySlug.values()].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );

  return typeof opts?.take === "number" ? cards.slice(0, opts.take) : cards;
}
