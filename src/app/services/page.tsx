import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hizmetler | Trabzon Sosyal Medya Ajansı",
    description: "Sosyal medya yönetimi, Instagram, Meta Ads, Google Ads, drone ve içerik üretimi.",
    path: paths.services,
  });
}

export default async function ServicesIndexPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <SiteShell bodyClass="page page-hizmet">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>Hizmetler</span>
            </nav>
            <span className="section-label">Hizmetler</span>
            <h1>Trabzon sosyal medya ve dijital pazarlama hizmetleri.</h1>
            <p className="lead">İhtiyacınıza uygun hizmeti seçin.</p>
          </div>
        </section>
        <section className="page-block soft">
          <div className="container">
            <div className="service-hub-grid">
              {services.map((s) => (
                <Link className="service-hub-card" href={paths.service(s.slug)} key={s.id}>
                  <h2>{s.title}</h2>
                  <p>{s.lead}</p>
                  <span>İncele →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
