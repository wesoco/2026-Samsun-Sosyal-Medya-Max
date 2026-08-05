import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, districts, services, cases, sectors] = await Promise.all([
    prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.district.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.service.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.caseStudy.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.sectorPage.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    paths.home,
    paths.about,
    paths.services,
    paths.regions,
    paths.sectors,
    paths.cases,
    paths.blog,
    paths.contact,
    paths.faq,
    paths.kvkk,
    paths.privacy,
    paths.cookies,
    paths.disclosure,
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === paths.home ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: absoluteUrl(paths.blogPost(p.slug)),
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...districts.map((d) => ({
      url: absoluteUrl(paths.region(d.slug)),
      lastModified: d.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(paths.service(s.slug)),
      lastModified: s.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
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
      priority: 0.75,
    })),
  ];
}
