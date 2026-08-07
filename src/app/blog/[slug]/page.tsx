import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { redirectMissingToHome } from "@/lib/redirect-missing";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  jsonLdScript,
  type FaqPair,
  type SiteNap,
} from "@/lib/seo";
import { getSeoPost } from "@/lib/seo-posts";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox } from "@/components/seo/GeoBlocks";
import { TopicCluster } from "@/components/seo/TopicCluster";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

type UnifiedPost = {
  slug: string;
  title: string;
  lead: string;
  bodyHtml: string;
  coverUrl: string | null;
  category: string;
  seoTitle: string | null;
  seoDesc: string | null;
  publishedAt: Date;
  updatedAt: Date;
  faqJson: FaqPair[];
  source: "db" | "seo-agent";
};

async function loadPost(slug: string): Promise<UnifiedPost | null> {
  const db = await prisma.blogPost.findUnique({ where: { slug } });
  if (db?.published) {
    return {
      slug: db.slug,
      title: db.title,
      lead: db.lead,
      bodyHtml: db.bodyHtml,
      coverUrl: db.coverUrl,
      category: db.category,
      seoTitle: db.seoTitle,
      seoDesc: db.seoDesc,
      publishedAt: db.publishedAt,
      updatedAt: db.updatedAt,
      faqJson: (db.faqJson as FaqPair[]) || [],
      source: "db",
    };
  }

  const agent = await getSeoPost(slug).catch(() => null);
  if (!agent) return null;

  const faqs: FaqPair[] = (agent.faq || []).map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  return {
    slug: agent.slug,
    title: agent.title,
    lead: agent.metaDescription || "",
    bodyHtml: agent.bodyHtml,
    coverUrl: agent.coverImageUrl || "/images/cover.webp",
    category: "SEO",
    seoTitle: agent.title,
    seoDesc: agent.metaDescription || null,
    publishedAt: new Date(agent.publishedAt || agent.createdAt),
    updatedAt: new Date(agent.updatedAt || agent.createdAt),
    faqJson: faqs,
    source: "seo-agent",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.lead,
    path: paths.blogPost(post.slug),
    image: post.coverUrl,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings, relatedDb, services, districts] = await Promise.all([
    loadPost(slug),
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.blogPost.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: { slug: true, title: true, category: true, coverUrl: true, lead: true },
    }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 5,
      select: { slug: true, title: true },
    }),
    prisma.district.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      take: 5,
      select: { slug: true, name: true },
    }),
  ]);
  if (!post) redirectMissingToHome();

  const faqs = post.faqJson;
  const nap: SiteNap = {
    siteName: settings?.siteName || "Trabzon Sosyal Medya",
    phone: settings?.phone || "+905380581122",
    email: settings?.email || "info@wesoco.com",
    addressLine1: settings?.addressLine1 || "Gazipaşa Mah. Uzun Sk.",
    addressLine2: settings?.addressLine2 || "Can Bakkal İş Merkezi, Ortahisar / Trabzon",
  };
  const wa = settings?.whatsapp || "905380581122";

  const schemas = [
    breadcrumbJsonLd([
      { name: "Ana sayfa", path: paths.home },
      { name: "Blog", path: paths.blog },
      { name: post.title, path: paths.blogPost(post.slug) },
    ]),
    blogPostingJsonLd({
      title: post.title,
      description: post.seoDesc || post.lead,
      path: paths.blogPost(post.slug),
      image: post.coverUrl,
      datePublished: post.publishedAt.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      nap,
      keywords: [post.category, "Trabzon", "sosyal medya", "Wesoco"],
    }),
    faqPageJsonLd(faqs),
  ].filter(Boolean);

  return (
    <SiteChrome variant="inner" className="site-page page page-blog">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ))}
      <main id="main">
        <article className="blog-article">
          <header className="blog-top">
            <div className="container blog-wide">
              <Link className="blog-back" href={paths.blog}>
                ← Blog
              </Link>
              <p className="blog-meta">
                <time dateTime={post.publishedAt.toISOString()}>
                  {post.publishedAt.toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>{" "}
                · {post.category}
              </p>
              <h1>{post.title}</h1>
              <p className="blog-lead">{post.lead}</p>
            </div>
          </header>

          <div className="container blog-wide blog-layout">
            <div className="blog-main">
              {post.coverUrl ? (
                <div className="blog-cover">
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    width={1200}
                    height={675}
                    priority
                    sizes="(max-width: 1120px) 100vw, 800px"
                  />
                </div>
              ) : null}
              <AnswerBox title="Özet">
                <p>{post.seoDesc || post.lead}</p>
              </AnswerBox>
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
              {faqs.length > 0 ? (
                <div className="blog-faq">
                  <h2>Sıkça sorulanlar</h2>
                  {faqs.map((f) => (
                    <details className="faq-item" key={f.q}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              ) : null}

              <TopicCluster
                title="Bunlara da bakın"
                variant="compact"
                services={services.slice(0, 3).map((x) => ({
                  href: paths.service(x.slug),
                  label: x.title.replace(/^Trabzon\s+/i, ""),
                }))}
                regions={districts.slice(0, 3).map((d) => ({
                  href: paths.region(d.slug),
                  label: d.name,
                }))}
                showDefaults
              />

              <aside className="blog-cta-band" aria-label="Ücretsiz keşif">
                <div className="blog-cta-copy">
                  <span className="blog-cta-label">Ücretsiz keşif</span>
                  <h2>Birlikte kısa bir bakış atalım.</h2>
                  <p>Mevcut hesabınıza bakalım; sektöre özel planı ve süreci netleştirelim. 24 saat içinde dönüş yapıyoruz.</p>
                </div>
                <div className="blog-cta-actions">
                  <Link href={paths.hash.contact} className="btn btn-primary">
                    Ücretsiz keşif
                  </Link>
                  <a
                    href={`https://wa.me/${wa}`}
                    className="btn btn-outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </aside>
            </div>

            {relatedDb.length > 0 ? (
              <aside className="blog-aside" aria-label="Diğer yazılar">
                <div className="blog-aside-card">
                  <p className="blog-related-label">Diğer yazılar</p>
                  <ul className="blog-aside-list">
                    {relatedDb.map((r) => (
                      <li key={r.slug}>
                        <Link href={paths.blogPost(r.slug)} className="blog-aside-item">
                          {r.coverUrl ? (
                            <span className="blog-aside-thumb">
                              <Image src={r.coverUrl} alt="" width={120} height={80} loading="lazy" />
                            </span>
                          ) : null}
                          <span className="blog-aside-body">
                            <span className="blog-aside-cat">{r.category}</span>
                            <strong>{r.title}</strong>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={paths.blog} className="blog-aside-all">
                    Tüm yazılar →
                  </Link>
                </div>
              </aside>
            ) : null}
          </div>
        </article>
      </main>
    </SiteChrome>
  );
}
