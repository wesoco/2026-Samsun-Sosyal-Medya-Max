import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { breadcrumbJsonLd, buildMetadata, faqPageJsonLd, jsonLdScript } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { FaqBlock } from "@/components/seo/GeoBlocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "S.S.S. | Trabzon Sosyal Medya",
    description: "Instagram, Meta Ads ve ajans süreci hakkında sıkça sorulanlar.",
    path: paths.faq,
  });
}

export default async function FaqPage() {
  const faqs = await prisma.faqItem.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  const pairs = faqs.map((f) => ({ q: f.question, a: f.answer }));
  const schemas = [
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: paths.home },
      { name: "S.S.S.", path: paths.faq },
    ]),
    faqPageJsonLd(pairs),
  ].filter(Boolean);

  return (
    <SiteChrome variant="inner" className="site-page page">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ))}
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>S.S.S.</span>
            </nav>
            <span className="section-label">S.S.S.</span>
            <h1>Sıkça sorulan sorular.</h1>
            <p className="lead">Ajans süreci, sözleşme ve reklam hakkında net cevaplar.</p>
          </div>
        </section>
        <section className="faq section">
          <div className="container">
            <FaqBlock title="Trabzon sosyal medya hakkında SSS" faqs={pairs} />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
