import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { paths } from "@/lib/paths";

export default function NotFound() {
  return (
    <SiteChrome variant="inner" className="site-page page">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <span className="section-label">404</span>
            <h1>Sayfa bulunamadı.</h1>
            <p className="lead">
              Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Ana sayfadan hizmetler, blog veya iletişime
              dönebilirsiniz.
            </p>
            <div className="page-hero-actions">
              <Link href={paths.home} className="btn btn-primary">
                Ana sayfa
              </Link>
              <Link href={paths.hash.contact} className="btn btn-outline-dark">
                İletişim
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
