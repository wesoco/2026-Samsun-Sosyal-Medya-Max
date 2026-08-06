import Link from "next/link";
import type { Metadata } from "next";
import { redirectMissingToHome } from "@/lib/redirect-missing";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  jsonLdScript,
  type FaqPair,
} from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox } from "@/components/seo/GeoBlocks";
import { TopicCluster } from "@/components/seo/TopicCluster";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await prisma.sectorPage.findUnique({ where: { slug } });
  if (!s || !s.published) return {};
  return buildMetadata({
    title: s.seoTitle || s.title,
    description: s.seoDesc || s.lead,
    path: paths.sector(s.slug),
  });
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const [s, services, districts, posts, otherSectors] = await Promise.all([
    prisma.sectorPage.findUnique({ where: { slug } }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
      select: { slug: true, title: true },
    }),
    prisma.district.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
      select: { slug: true, name: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { slug: true, title: true },
    }),
    prisma.sectorPage.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { sortOrder: "asc" },
      take: 4,
      select: { slug: true, name: true },
    }),
  ]);
  if (!s || !s.published) redirectMissingToHome();

  const faqs = (s.faqJson as FaqPair[]) || [];

  const schemas = [
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: paths.home },
      { name: "Sektörler", path: paths.sectors },
      { name: s.name, path: paths.sector(s.slug) },
    ]),
    faqPageJsonLd(faqs),
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
              <Link href={paths.sectors}>Sektörler</Link>
              <span aria-hidden="true">/</span>
              <span>{s.name}</span>
            </nav>
            <span className="section-label">Sektör</span>
            <h1>{s.title}</h1>
            <p className="lead">{s.lead}</p>
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
              <p>{s.lead}</p>
            </AnswerBox>
            <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />
            <TopicCluster
              title="Bunlara da bakın"
              services={services.slice(0, 3).map((x) => ({
                href: paths.service(x.slug),
                label: x.title.replace(/^Trabzon\s+/i, ""),
              }))}
              regions={[
                ...otherSectors.slice(0, 2).map((x) => ({
                  href: paths.sector(x.slug),
                  label: x.name,
                })),
                ...districts.slice(0, 2).map((x) => ({
                  href: paths.region(x.slug),
                  label: x.name,
                })),
              ]}
              posts={posts.slice(0, 2).map((p) => ({
                href: paths.blogPost(p.slug),
                label: p.title,
              }))}
            />
          </div>
        </section>
        {faqs.length > 0 ? (
          <section className="page-block soft">
            <div className="container">
              <h2>Sıkça sorulanlar</h2>
              <div className="faq-list page-faq">
                {faqs.map((f) => (
                  <details className="faq-item" key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </SiteChrome>
  );
}
