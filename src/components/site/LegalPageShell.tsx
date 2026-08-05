import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { paths } from "@/lib/paths";

type Props = {
  title: string;
  description: string;
  path: string;
  heading: string;
  children: ReactNode;
};

export function buildLegalMetadata(title: string, description: string, path: string): Metadata {
  return buildMetadata({ title, description, path });
}

export function LegalPageShell({ title, description, path, heading, children }: Props) {
  const crumbs = breadcrumbJsonLd([
    { name: "Ana sayfa", path: paths.home },
    { name: heading, path },
  ]);

  return (
    <SiteChrome variant="inner" className="site-page page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(crumbs)} />
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>{heading}</span>
            </nav>
            <span className="section-label">Yasal</span>
            <h1>{heading}</h1>
            <p className="lead">{description}</p>
          </div>
        </section>
        <section className="page-block">
          <div className="container narrow legal-prose">
            {children}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
