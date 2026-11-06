import { prisma } from "@/lib/prisma";
import { absoluteUrl, paths } from "@/lib/paths";
import { listSeoPosts } from "@/lib/seo-posts";

/**
 * llms.txt'in tamamlayıcısı: yapay zekâ motorları için tüm blog yazılarının başlık, özet ve
 * adresi. llms.txt elle yazılmış bir site özeti; yeni yazılar buraya kendiliğinden düşer.
 */
/** Derleme sırasında DB yok: önceden üretilirse boş liste önbelleğe girer */
export const dynamic = "force-dynamic";

export async function GET() {
  const [dbPosts, agentPosts] = await Promise.all([
    prisma.blogPost
      .findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: { slug: true, title: true, lead: true },
      })
      .catch(() => []),
    listSeoPosts().catch(() => []),
  ]);
  const seen = new Set<string>();
  const posts = [
    ...agentPosts.map((p) => ({ slug: p.slug, title: p.title, summary: p.metaDescription })),
    ...dbPosts.map((p) => ({ slug: p.slug, title: p.title, summary: p.lead })),
  ].filter((p) => !seen.has(p.slug) && seen.add(p.slug));

  const body = [
    `# Blog — ${absoluteUrl(paths.home).replace(/^https?:\/\//, "").replace(/\/$/, "")}`,
    "",
    `> Site özeti: ${absoluteUrl("/llms.txt")}`,
    "",
    ...posts.flatMap((p) => [
      `## [${p.title}](${absoluteUrl(paths.blogPost(p.slug))})`,
      ...(p.summary ? ["", p.summary.replace(/\s+/g, " ").trim()] : []),
      "",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
