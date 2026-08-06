import Link from "next/link";
import type { Metadata } from "next";
import { redirectMissingToHome } from "@/lib/redirect-missing";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  howToJsonLd,
  jsonLdScript,
  serviceJsonLd,
  type FaqPair,
  type SiteNap,
} from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox, ComparisonTable } from "@/components/seo/GeoBlocks";
import { TopicCluster } from "@/components/seo/TopicCluster";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await prisma.service.findUnique({ where: { slug } });
  if (!s || !s.published) return {};
  return buildMetadata({
    title: s.seoTitle || s.title,
    description: s.seoDesc || s.lead,
    path: paths.service(s.slug),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [s, settings, otherServices, districts, posts] = await Promise.all([
    prisma.service.findUnique({ where: { slug } }),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.service.findMany({
      where: { published: true, NOT: { slug } },
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
  ]);
  if (!s || !s.published) redirectMissingToHome();

  const faqs = (s.faqJson as FaqPair[]) || [];
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
      { name: "Hizmetler", path: paths.services },
      { name: s.title, path: paths.service(s.slug) },
    ]),
    serviceJsonLd({
      name: s.title,
      description: s.seoDesc || s.lead,
      path: paths.service(s.slug),
      nap,
    }),
    faqPageJsonLd(faqs),
    howToJsonLd({
      name: `${s.title} süreci`,
      description: s.seoDesc || s.lead,
      steps: [
        { name: "Keşif", text: "Hedef kitle, rakip ve mevcut sosyal hesaplar birlikte incelenir." },
        { name: "Strateji", text: "Kanal, dil, takvim ve KPI’lar netleştirilir." },
        { name: "Üretim ve yayın", text: "İçerik, reels ve gerektiğinde yerinde çekim planlanır." },
        { name: "Reklam ve ölçüm", text: "Meta Ads / Google Ads ile büyüme; aylık raporla optimizasyon." },
      ],
    }),
  ].filter(Boolean);

  return (
    <SiteChrome variant="inner" className="site-page page page-hizmet">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ))}
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link href={paths.services}>Hizmetler</Link>
              <span aria-hidden="true">/</span>
              <span>{s.title}</span>
            </nav>
            <span className="section-label">Hizmet</span>
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
              <p>{s.seoDesc || s.lead}</p>
            </AnswerBox>
            <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />
            <ComparisonTable
              caption={
                slug === "sosyal-medya-yonetimi"
                  ? "Sektöre göre planlama örnekleri"
                  : `${s.title}: organik ve reklam destekli`
              }
              headers={
                slug === "sosyal-medya-yonetimi"
                  ? ["Sektör", "İçerik planı odağı", "İzlediğimiz sinyal"]
                  : ["Kapsam", "Yalnızca organik", "Organik + reklam"]
              }
              rows={
                slug === "sosyal-medya-yonetimi"
                  ? [
                      ["Restoran / kafe", "Menü, story temposu, rezervasyon CTA", "Mesaj / rezervasyon"],
                      ["Klinik / güzellik", "Güven, uzmanlık, randevu yolu", "Randevu talebi"],
                      ["Otel / turizm", "Konum, deneyim, sezon takvimi", "Rezervasyon / DM"],
                      ["Otomotiv / emlak", "Lansman, showroom veya proje ölçeği", "Arama / form"],
                      ["Perakende / B2B", "Ürün vitrini veya LinkedIn güveni", "Trafik / lead"],
                    ]
                  : [
                      ["Görünürlük", "Kademeli organik büyüme", "Hızlı test ve ölçek"],
                      ["Hedefleme", "Takipçi / keşfet", "Konum, ilgi ve remarketing"],
                      ["Bütçe", "Zaman ağırlıklı", "Medya ayrı; şeffaf rapor"],
                    ]
              }
            />
            <TopicCluster
              title="Bunlara da bakın"
              services={otherServices.slice(0, 3).map((x) => ({
                href: paths.service(x.slug),
                label: x.title.replace(/^Trabzon\s+/i, ""),
              }))}
              regions={districts.slice(0, 3).map((d) => ({
                href: paths.region(d.slug),
                label: d.name,
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
