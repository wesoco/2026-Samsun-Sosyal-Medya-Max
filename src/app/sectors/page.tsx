import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";

export const dynamic = "force-dynamic";

const FOCUS: Record<string, string> = {
  "restoran-kafe": "Rezervasyon & menü ritmi",
  "klinik-guzellik": "Güven dili & randevu",
  "otel-turizm": "Sezon & erken rezervasyon",
  otomotiv: "Lansman & showroom",
  "insaat-emlak": "Proje ölçeği & drone",
  perakende: "Vitrin & mağaza trafiği",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sektörler | Trabzon Sosyal Medya",
    description:
      "Restoran, klinik, otel, otomotiv, inşaat ve perakende için sektöre özel sosyal medya yönetimi.",
    path: paths.sectors,
  });
}

export default async function SectorsIndexPage() {
  const sectors = await prisma.sectorPage.findMany({
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
              <span>Sektörler</span>
            </nav>
            <span className="section-label">Sektörler</span>
            <h1>Trabzon’da sektöre özel sosyal medya.</h1>
            <p className="lead">
              Her sektörün kendi dili, temposu ve satış yolu vardır. Şablon paket yok; markanıza göre içerik planı
              kurulur.
            </p>
            <div className="page-hero-actions">
              <Link href={paths.hash.contact} className="btn btn-primary">
                Teklif al
              </Link>
              <Link href={paths.cases} className="btn btn-outline-dark">
                Vakaları gör
              </Link>
            </div>
          </div>
        </section>
        <section className="page-block soft">
          <div className="container">
            <div className="hub-editorial" role="list">
              {sectors.map((s, i) => (
                <Link
                  key={s.id}
                  href={paths.sector(s.slug)}
                  className="hub-editorial-item"
                  role="listitem"
                >
                  <span className="hub-editorial-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="hub-editorial-body">
                    <p className="hub-editorial-tag">{FOCUS[s.slug] || "Sektöre özel plan"}</p>
                    <h2>{s.name}</h2>
                    <p className="hub-editorial-lead">{s.lead}</p>
                  </div>
                  <span className="hub-editorial-go">
                    İncele
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
