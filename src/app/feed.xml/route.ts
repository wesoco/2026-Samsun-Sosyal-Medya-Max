import { prisma } from "@/lib/prisma";
import { absoluteUrl, paths, siteUrl } from "@/lib/paths";

export const dynamic = "force-dynamic";

export async function GET() {
  const [settings, posts] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 50,
      select: { slug: true, title: true, lead: true, publishedAt: true, updatedAt: true },
    }),
  ]);

  const title = settings?.siteName || "Samsun Sosyal Medya";
  const desc = settings?.defaultDesc || "Samsun sosyal medya ajansı blog";
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${absoluteUrl(paths.blogPost(p.slug))}</link>
      <guid isPermaLink="true">${absoluteUrl(paths.blogPost(p.slug))}</guid>
      <pubDate>${p.publishedAt.toUTCString()}</pubDate>
      <description><![CDATA[${p.lead}]]></description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title} Blog</title>
    <link>${siteUrl()}</link>
    <description><![CDATA[${desc}]]></description>
    <language>tr-TR</language>
    <atom:link href="${absoluteUrl(paths.feed)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
