import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { breadcrumbJsonLd, buildMetadata, jsonLdScript } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox } from "@/components/seo/GeoBlocks";
import { TopicCluster } from "@/components/seo/TopicCluster";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!c || !c.published) return {};
  return buildMetadata({
    title: c.seoTitle || c.title,
    description: c.seoDesc || c.lead,
    path: paths.caseStudy(c.slug),
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [c, services, posts] = await Promise.all([
    prisma.caseStudy.findUnique({ where: { slug } }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, title: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { slug: true, title: true },
    }),
  ]);
  if (!c || !c.published) notFound();

  const relatedSlugs = Array.isArray(c.relatedServices)
    ? (c.relatedServices as string[])
    : [];
  const related = relatedSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((x): x is { slug: string; title: string } => Boolean(x));

  const schemas = [
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: paths.home },
      { name: "Vakalar", path: paths.cases },
      { name: c.title, path: paths.caseStudy(c.slug) },
    ]),
  ].filter(Boolean);

  return (
    <SiteChrome variant="inner" className="site-page page page-district">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ))}
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link href={paths.cases}>Vakalar</Link>
              <span aria-hidden="true">/</span>
              <span>{c.sector}</span>
            </nav>
            <span className="section-label">{c.sector}</span>
            <h1>{c.title}</h1>
            <p className="lead">{c.lead}</p>
            <div className="page-hero-actions">
              <Link href={paths.hash.contact} className="btn btn-primary">
                Teklif al
              </Link>
            </div>
          </div>
        </section>
        <section className="page-block">
          <div className="container">
            <AnswerBox title="Kısa cevap">
              <p>{c.lead}</p>
            </AnswerBox>

            <h2>Zorluk</h2>
            <p>{c.challenge}</p>

            <h2>Ne yaptık?</h2>
            <p>{c.workDone}</p>

            <h2>Sonuç</h2>
            <p>{c.result}</p>

            <div dangerouslySetInnerHTML={{ __html: c.bodyHtml }} />

            {related.length > 0 ? (
              <div className="page-related-services">
                <h2>İlgili hizmetler</h2>
                <ul>
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link href={paths.service(s.slug)}>
                        {s.title.replace(/^Trabzon\s+/i, "")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="page-cta">
              <h2>Benzer bir proje için keşif.</h2>
              <p>Hesabınıza bakalım; sektöre özel net bir yol haritası çıkaralım.</p>
              <Link href={paths.hash.contact} className="btn btn-primary">
                Teklif al
              </Link>
            </div>

            <TopicCluster
              title="Bunlara da bakın"
              services={related.slice(0, 3).map((x) => ({
                href: paths.service(x.slug),
                label: x.title.replace(/^Trabzon\s+/i, ""),
              }))}
              posts={posts.map((p) => ({
                href: paths.blogPost(p.slug),
                label: p.title,
              }))}
            />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
