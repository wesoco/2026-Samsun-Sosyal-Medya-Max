import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hizmet Bölgeleri | Samsun Sosyal Medya",
    description: "Samsun'un 17 ilçesinde sosyal medya yönetimi.",
    path: paths.regions,
  });
}

export default async function RegionsIndexPage() {
  const districts = await prisma.district.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <SiteShell bodyClass="page page-district">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>Bölgeler</span>
            </nav>
            <span className="section-label">Bölgeler</span>
            <h1>Samsun ve 17 ilçesinde sosyal medya yönetimi.</h1>
            <p className="lead">Atakum&apos;tan Bafra&apos;a yerel işletmeler için aynı kalitede hizmet.</p>
          </div>
        </section>
        <section className="page-block soft">
          <div className="container">
            <ul className="district-grid">
              {districts.map((d) => (
                <li key={d.id}>
                  <Link href={paths.region(d.slug)}>
                    <strong>{d.name}</strong>
                    <span>{d.regionLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
