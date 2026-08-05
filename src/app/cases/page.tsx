import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Vaka Çalışmaları | Trabzon Sosyal Medya",
    description:
      "Trabzon’da restoran, otomotiv, otel, emlak ve B2B sosyal medya vaka özetleri. Süreç ve ölçülebilir sonuç; sahte yıldız yok.",
    path: paths.cases,
  });
}

export default async function CasesIndexPage() {
  const cases = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <SiteChrome variant="inner" className="site-page page page-district">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>Vakalar</span>
            </nav>
            <span className="section-label">Vakalar</span>
            <h1>Trabzon sosyal medya vaka çalışmaları.</h1>
            <p className="lead">
              Süreç, yapılan iş ve ölçülebilir sonuç özeti. Sahte yıldız veya AggregateRating yok; abartısız kanıt.
            </p>
            <div className="page-hero-actions">
              <Link href={paths.hash.contact} className="btn btn-primary">
                Teklif al
              </Link>
              <Link href={paths.sectors} className="btn btn-outline-dark">
                Sektörleri gör
              </Link>
            </div>
          </div>
        </section>
        <section className="page-block soft">
          <div className="container">
            <div className="hub-editorial hub-editorial-cases" role="list">
              {cases.map((c, i) => (
                <Link
                  key={c.id}
                  href={paths.caseStudy(c.slug)}
                  className="hub-editorial-item"
                  role="listitem"
                >
                  <span className="hub-editorial-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="hub-editorial-body">
                    <p className="hub-editorial-tag">{c.sector}</p>
                    <h2>{c.title}</h2>
                    <p className="hub-editorial-lead">{c.lead}</p>
                    <p className="hub-editorial-result">
                      <span>Sonuç</span>
                      {c.result}
                    </p>
                  </div>
                  <span className="hub-editorial-go">
                    Vakayı oku
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
