import Link from "next/link";
import type { Metadata } from "next";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { listPublicBlogPosts } from "@/lib/blog-posts";
import { SiteShell } from "@/components/site/SiteShell";
import { SafeImage } from "@/components/site/SafeImage";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog | Trabzon Sosyal Medya Ajansı",
    description: "Instagram, Meta Ads, Google Ads, drone ve içerik üretimi yazıları.",
    path: paths.blog,
  });
}

export default async function BlogIndexPage() {
  const cards = await listPublicBlogPosts();

  return (
    <SiteShell bodyClass="page page-blog">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>Blog</span>
            </nav>
            <span className="section-label">Blog</span>
            <h1>Trabzon sosyal medya üzerine yazılar.</h1>
            <p className="lead">Ajans seçimi, Instagram, Meta Ads, Google Ads, drone ve içerik rehberleri.</p>
          </div>
        </section>
        <section className="page-block soft">
          <div className="container">
            <div className="blog-grid">
              {cards.map((p) => (
                <article className="blog-card reveal" key={p.id}>
                  <Link
                    href={paths.blogPost(p.slug)}
                    className="blog-card-media"
                    aria-label={p.title}
                  >
                    {p.coverUrl ? (
                      <SafeImage
                        src={p.coverUrl}
                        alt={p.title}
                        width={800}
                        height={520}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{p.category}</span>
                      <time dateTime={p.publishedAt.toISOString()}>
                        {p.publishedAt.toLocaleDateString("tr-TR")}
                      </time>
                    </div>
                    <h3>
                      <Link href={paths.blogPost(p.slug)}>{p.title}</Link>
                    </h3>
                    <p>{p.lead}</p>
                    <Link href={paths.blogPost(p.slug)} className="blog-card-link">
                      Devamını oku →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
