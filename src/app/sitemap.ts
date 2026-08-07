import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, paths } from "@/lib/paths";

/** Her istekte DB’den üret — yeni blog/hizmet anında sitemap’e girer */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, districts, services, cases, sectors] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.district.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.caseStudy.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.sectorPage.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl(paths.home), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl(paths.about), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(paths.services), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl(paths.regions), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl(paths.sectors), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl(paths.cases), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl(paths.blog), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl(paths.contact), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl(paths.faq), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(paths.kvkk), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl(paths.privacy), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl(paths.cookies), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl(paths.disclosure), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: absoluteUrl(paths.blogPost(p.slug)),
      lastModified: p.updatedAt || p.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(paths.service(s.slug)),
      lastModified: s.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...districts.map((d) => ({
      url: absoluteUrl(paths.region(d.slug)),
      lastModified: d.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...sectors.map((s) => ({
      url: absoluteUrl(paths.sector(s.slug)),
      lastModified: s.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...cases.map((c) => ({
      url: absoluteUrl(paths.caseStudy(c.slug)),
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
