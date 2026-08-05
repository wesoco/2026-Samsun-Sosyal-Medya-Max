import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  jsonLdScript,
  serviceJsonLd,
  type FaqPair,
  type SiteNap,
} from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox } from "@/components/seo/GeoBlocks";
import { TopicCluster } from "@/components/seo/TopicCluster";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = await prisma.district.findUnique({ where: { slug } });
  if (!d || !d.published) return {};
  return buildMetadata({
    title: d.seoTitle || `${d.name} Sosyal Medya Yönetimi`,
    description: d.seoDesc || d.lead,
    path: paths.region(d.slug),
  });
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const [d, settings, services, otherDistricts, posts] = await Promise.all([
    prisma.district.findUnique({ where: { slug } }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
      select: { slug: true, title: true },
    }),
    prisma.district.findMany({
      where: { published: true, NOT: { slug } },
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
  ]);
  if (!d || !d.published) notFound();

  const faqs = (d.faqJson as FaqPair[]) || [];
  const nap: SiteNap = {
    siteName: settings?.siteName || "Trabzon Sosyal Medya",
    phone: settings?.phone || "+905380581122",
    email: settings?.email || "info@wesoco.com",
    addressLine1: settings?.addressLine1 || "Gazipaşa Mah. Uzun Sk.",
    addressLine2: settings?.addressLine2 || "Can Bakkal İş Merkezi, Ortahisar / Trabzon",
  };

  const schemas = [
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: paths.home },
      { name: "Bölgeler", path: paths.regions },
      { name: d.name, path: paths.region(d.slug) },
    ]),
    serviceJsonLd({
      name: `${d.name} sosyal medya yönetimi`,
      description: d.seoDesc || d.lead,
      path: paths.region(d.slug),
      nap,
    }),
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
              <Link href={paths.regions}>Hizmet bölgeleri</Link>
              <span aria-hidden="true">/</span>
              <span>{d.name}</span>
            </nav>
            <span className="section-label">{d.regionLabel}</span>
            <h1>{d.name} sosyal medya yönetimi.</h1>
            <p className="lead">{d.lead}</p>
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
              <p>{d.lead || d.seoDesc}</p>
            </AnswerBox>
            <div dangerouslySetInnerHTML={{ __html: d.bodyHtml }} />
            <TopicCluster
              title="Bunlara da bakın"
              services={services.slice(0, 3).map((x) => ({
                href: paths.service(x.slug),
                label: x.title.replace(/^Trabzon\s+/i, ""),
              }))}
              regions={otherDistricts.slice(0, 3).map((x) => ({
                href: paths.region(x.slug),
                label: x.name,
              }))}
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
