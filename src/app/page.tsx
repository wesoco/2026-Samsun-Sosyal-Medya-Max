import { ContactForm } from "@/components/site/ContactForm";
import { ContactInfo } from "@/components/site/ContactInfo";
import { ComparisonTable } from "@/components/seo/GeoBlocks";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { listPublicBlogPosts } from "@/lib/blog-posts";
import { jsonLdScript, entityGraphJsonLd, faqPageJsonLd, type SiteNap } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { SafeImage } from "@/components/site/SafeImage";
import { DEFAULT_HERO_SLIDES, type HeroSlide } from "@/lib/hero-slides";
import { HomeRefs } from "@/components/site/HomeRefs";
import { REF_PAGE, type HomeRef } from "@/lib/home-refs";

export const revalidate = 60;

type ProcessStep = { num: string; title: string; desc: string };

const FALLBACK_SLIDES = DEFAULT_HERO_SLIDES;

const FALLBACK_PROCESS: ProcessStep[] = [
  { num: "01", title: "Keşif", desc: "Markanızı, hedef kitlenizi ve rakiplerinizi dinliyoruz." },
  { num: "02", title: "Strateji", desc: "İçerik dili, takvim ve kanal planını birlikte netleştiriyoruz." },
  { num: "03", title: "Üretim", desc: "Çekim, kurgu, tasarım ve onaylı yayın." },
  { num: "04", title: "Büyüme", desc: "Reklam, optimizasyon ve aylık rapor." },
];

export default async function HomePage() {
  const [settings, services, stats, faqs, posts, districts, logos, refs, home] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.faqItem.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    listPublicBlogPosts({ take: 9 }),
    prisma.district.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" }, take: 18 }),
    prisma.brandLogo.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" }, take: 12 }),
    prisma.referenceItem.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.homeContent.findUnique({ where: { id: "default" } }),
  ]);

  /** Yayınlı tanıtıcı / görsel / reels kartları; HTML'e her türün ilk sayfası girer */
  const homeRefs = ["tanitici", "gorsel", "reels"].flatMap((f) => refs.filter((r) => r.filter === f));
  /** HTML'de açık sekmenin ilk REF_PAGE kartı; kalanı istemci /api/refs ile çeker */
  const refTotals: Record<string, number> = {};
  const initialRefs: HomeRef[] = [];
  for (const r of homeRefs) {
    refTotals[r.filter] = (refTotals[r.filter] ?? 0) + 1;
    // HTML'de yalnız açık sekme (Tanıtım Filmi); diğerleri tıklanınca /api/refs
    if (r.filter === "tanitici" && refTotals[r.filter] <= REF_PAGE) {
      initialRefs.push({
        id: r.id,
        title: r.title,
        lead: r.lead,
        filter: r.filter,
        imageUrl: r.imageUrl,
        videoUrl: r.videoUrl,
      });
    }
  }
  /** Sitede görünen SSS ile FAQPage schema birebir aynı olmalı */
  const homeFaqItems = faqs.slice(0, 10);
  const homeFaqs = homeFaqItems.map((f) => ({ q: f.question, a: f.answer }));

  const s = settings || {
    siteName: "Samsun Sosyal Medya",
    phone: "+905380581122",
    phoneDisplay: "+90 (538) 058 11 22",
    email: "info@wesoco.com",
    whatsapp: "905380581122",
    addressLine1: "Gazipaşa Mah. Uzun Sk., Can Bakkal İş Merkezi",
    addressLine2: "Kat:7 Daire:61, Ortahisar / Trabzon",
    formNameLabel: "Ad Soyad",
    formPhoneLabel: "Telefon",
    formEmailLabel: "E-posta",
    formDistrictLabel: "İlçe",
    formServiceLabel: "Hizmet",
    formMessageLabel: "Mesaj",
    formSubmitLabel: "Gönder",
    formSuccessMsg: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
    formErrorMsg: "Gönderilemedi. Lütfen tekrar deneyin veya WhatsApp yazın.",
  };

  const slides = (
    Array.isArray(home?.heroSlidesJson) && (home.heroSlidesJson as unknown[]).length > 0
      ? (home.heroSlidesJson as HeroSlide[]).map((s, i) => {
          const fb = FALLBACK_SLIDES[i % FALLBACK_SLIDES.length];
          const image = String(s.image || "").trim() || fb?.image || "/assets/hero/03.webp";
          return {
            ...fb,
            ...s,
            signal: s.signal ?? fb?.signal ?? "",
            title: String(s.title || fb?.title || ""),
            lead: String(s.lead || fb?.lead || ""),
            image,
            alt: s.alt || fb?.alt || s.title || "Hero",
            href: s.href || fb?.href,
            cta: s.cta || fb?.cta,
            tags: Array.isArray(s.tags) && s.tags.length ? s.tags : fb?.tags || [],
          };
        })
      : FALLBACK_SLIDES
  ) as HeroSlide[];
  const processSteps = (Array.isArray(home?.processJson) ? home.processJson : FALLBACK_PROCESS) as ProcessStep[];
  const wa = s.whatsapp;

  const nap: SiteNap = {
    siteName: s.siteName,
    phone: s.phone,
    email: s.email,
    addressLine1: s.addressLine1,
    addressLine2: s.addressLine2,
  };

  // Referans ItemList şeması kaldırıldı (~10 KB, HTML + RSC'de iki kez); arama değeri düşüktü
  const schemas = [entityGraphJsonLd(nap), faqPageJsonLd(homeFaqs)].filter(Boolean);

  return (
    <SiteChrome variant="home">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(schema)} />
      ))}
      <main id="main">
        <section className="hero" id="anasayfa" aria-label="Samsun sosyal medya ajansı">
          <div className="hero-stage" id="heroStage">
            <div className="hero-slides" aria-roledescription="carousel" aria-label="Öne çıkan hizmetler">
              {slides.map((slide, i) => (
                <article
                  key={i}
                  className={`hero-slide${i === 0 ? " is-active" : ""}`}
                  data-slide={i}
                  aria-hidden={i === 0 ? undefined : true}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${slides.length}: ${slide.title}`}
                >
                  <div className="hero-media">
                    {/* Tüm slaytlarda gerçek src  -  data-src boş 1px gif kalmasın */}
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      width={1280}
                      height={800}
                      decoding={i === 0 ? "async" : "async"}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "low"}
                      className="hero-img"
                    />
                    <div className="hero-gradient" aria-hidden="true" />
                  </div>
                  <div className="hero-content">
                    {slide.signal ? <p className="brand-signal">{slide.signal}</p> : null}
                    {i === 0 ? <h1>{slide.title}</h1> : <h2 className="hero-title">{slide.title}</h2>}
                    <p className="hero-lead">{slide.lead}</p>
                    {slide.tags && slide.tags.length > 0 ? (
                      <ul className="hero-slide-tags" aria-label="Anahtar konular">
                        {slide.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    ) : null}
                    {slide.href ? (
                      <p className="hero-slide-link">
                        <Link href={slide.href}>{slide.cta || "Hizmeti incele"}</Link>
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
            <div className="hero-footer">
              <div className="hero-actions">
                <Link href={paths.hash.contact} className="btn btn-primary">
                  Teklif Al
                </Link>
                <Link href={paths.hash.refs} className="btn btn-ghost">
                  Projelerimizi Gör
                </Link>
              </div>
              <div className="hero-pager" role="tablist" aria-label="Slayt seçimi">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === 0}
                    aria-label={`${String(i + 1).padStart(2, "0")}: ${slide.title}`}
                    className={i === 0 ? "is-active" : undefined}
                    data-slide={i}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {logos.length > 0 ? (
          <section className="logos" aria-label="Referans markalar">
            <div className="logos-track">
              {logos.map((l) => (
                <img
                  key={l.id}
                  src={l.imageUrl}
                  alt={`${l.name} Samsun sosyal medya referansı`}
                  width={120}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ))}
              {logos.map((l) => (
                <img
                  key={`dup-${l.id}`}
                  src={l.imageUrl}
                  alt={l.name}
                  width={120}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  aria-hidden="true"
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="about section" id="hakkimizda">
          <div className="container">
            <div className="about-top">
              <span className="section-label">Hakkımızda</span>
              <h2>{home?.aboutTitle || "Samsun'da sosyal medya denince akla ilk biz gelelim diye buradayız."}</h2>
            </div>
            <div className="about-grid">
              <p className="about-lead-text">
                {home?.aboutLead ||
                  "Samsun Sosyal Medya, Wesoco bünyesinde yerel işletmelere Instagram, TikTok, Facebook ve LinkedIn yönetimi sunan sosyal medya ajansıdır."}
              </p>
              <div className="about-copy">
                <p>
                  {home?.aboutBody ||
                    "İçerik üretimi, reels, topluluk yönetimi ve Meta Ads'i tek çatı altında yönetiyoruz."}
                </p>
              </div>
            </div>
            <dl className="stat-row">
              {stats.map((st, i) => (
                <div className="stat reveal" key={st.id} style={{ transitionDelay: `${i * 50}ms` }}>
                  <span className="stat-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt>{st.value}</dt>
                  <dd>{st.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="services section" id="hizmetler">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">Hizmetler</span>
              <h2>{home?.servicesTitle || "Büyümenin tüm adımları, tek çatıda."}</h2>
              <p className="section-desc">
                {home?.servicesLead ||
                  "Sosyal medya yönetiminden Meta ve Google Ads'e, içerik üretiminden drone çekimine kadar Samsun işletmeleri için uçtan uca büyüme."}
              </p>
            </div>
            <ol className="service-list">
              {services.map((svc, i) => (
                <li className="service-item reveal" key={svc.id}>
                  <Link href={paths.service(svc.slug)} className="service-row">
                    <span className="service-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="service-body">
                      <h3>{svc.title}</h3>
                      <p>{svc.lead}</p>
                    </div>
                    <span className="service-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="process section" id="surec">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">Çalışma Süreci</span>
              <h2>{home?.processTitle || "Nasıl çalışıyoruz?"}</h2>
              <p className="section-desc">
                {home?.processLead ||
                  "Keşiften stratejiye, içerik üretiminden reklam yönetimine ve aylık raporlamaya kadar her adım şeffaf, hızlı ve ölçülebilir."}
              </p>
            </div>
            <ol className="process-track">
              {processSteps.map((step) => (
                <li className="process-step reveal" key={step.num}>
                  <div className="process-rail" aria-hidden="true">
                    <span className="process-dot" />
                  </div>
                  <div className="process-body">
                    <span className="process-num">{step.num}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {homeRefs.length > 0 ? (
          <section className="refs section" id="referanslar">
            <div className="container">
              <div className="section-head section-head-full">
                <span className="section-label">Referanslar</span>
                <h2>{home?.refsTitle || "Samsun sosyal medya referanslarımız."}</h2>
                <p className="section-desc">
                  {home?.refsLead ||
                    "Samsun sosyal medya ajansı olarak otomotiv, gastronomi, inşaat, enerji ve kurumsal markalar için ürettiğimiz Instagram postları, reels içerikleri ve tanıtım filmlerinden seçkiler. Her proje yerel hedef kitleye, sektör diline ve ölçülebilir büyüme hedefine göre planlanır."}
                </p>
              </div>
              <HomeRefs initial={initialRefs} totals={refTotals} />
            </div>
          </section>
        ) : null}

        <section className="blog section" id="blog">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">Blog</span>
              <div className="section-head-row">
                <h2>{home?.blogTitle || "Samsun işletmeleri için pratik yazılar."}</h2>
                <Link href={paths.blog} className="btn btn-primary section-head-cta-btn">
                  Tüm yazılar
                </Link>
              </div>
              <p className="section-desc">Instagram yönetimi, reels üretimi ve Meta Ads hakkında sade rehberler.</p>
            </div>
            <div className="blog-stage blog-overlay-grid">
              {posts.map((p) => (
                <article className="blog-tile reveal" key={p.id}>
                  <Link href={paths.blogPost(p.slug)}>
                    {p.coverUrl ? (
                      <SafeImage
                        src={p.coverUrl}
                        alt={p.title}
                        width={900}
                        height={700}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <div className="blog-tile-content">
                      <p className="blog-card-meta">
                        <span>{p.category}</span>{" "}
                        <time dateTime={p.publishedAt.toISOString()}>
                          {p.publishedAt.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                        </time>
                      </p>
                      <h3>{p.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band section">
          <div className="container">
            <div className="cta-panel reveal">
              <div className="cta-bg" aria-hidden="true">
                <Image
                  src={
                    home?.ctaImage ||
                    "https://images.unsplash.com/photo-1663230812927-dedf2bc78fe9?auto=format&fit=crop&w=1800&q=80"
                  }
                  alt="Samsun sosyal medya ajansı ekibiyle teklif görüşmesi"
                  width={1800}
                  height={1200}
                  loading="lazy"
                  sizes="100vw"
                />
              </div>
              <div className="cta-inner">
                <h2>{home?.ctaTitle || "Samsun sosyal medya teklifi alın."}</h2>
                <p>
                  {home?.ctaText ||
                    "Ücretsiz keşif görüşmesiyle başlayalım. Instagram, TikTok ve Meta Ads için doğru adres burası."}
                </p>
                <div className="cta-actions">
                  <Link href={paths.hash.contact} className="btn btn-primary">
                    Randevu Oluştur
                  </Link>
                  <a href={`https://wa.me/${wa}`} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="packages section" id="yaklasim" aria-labelledby="yaklasim-title">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">Yaklaşım</span>
              <h2 id="yaklasim-title">{home?.approachTitle || "Her marka ve sektöre özel içerik planı."}</h2>
              <p className="section-desc">
                {home?.approachLead ||
                  "Hazır paket dayatmıyoruz. Restoran ile klinik, otel ile otomotiv aynı dilde konuşmaz. Keşifte markanızın hedef kitlesini, sektör ritmini ve satış yolunu dinler; ona göre kanal, içerik takvimi ve ölçüm çerçevesi kurarız. Reklam medya harcaması ajans ücretinden ayrıdır."}
              </p>
            </div>
            <ComparisonTable
              caption="Sektöre göre planlama örnekleri"
              headers={["Sektör", "İçerik planı odağı", "İzlediğimiz sinyal"]}
              rows={
                (Array.isArray(home?.approachTableJson) && (home.approachTableJson as string[][]).length
                  ? (home.approachTableJson as string[][])
                  : [
                      ["Restoran / kafe", "Menü, mutfak hikâyesi, story temposu, rezervasyon CTA", "Mesaj ve rezervasyon"],
                      ["Klinik / güzellik", "Uzmanlık, güven, randevu yolu, sade görsel dil", "Randevu talebi"],
                      ["Otel / turizm", "Konum, deneyim, sezon takvimi, erken rezervasyon", "Rezervasyon / DM"],
                      ["Otomotiv", "Model lansmanı, showroom, test sürüşü çağrısı", "Arama ve mesaj"],
                      ["İnşaat / emlak", "Proje ölçeği, drone, satış ofisi yönlendirmesi", "Keşif formu / arama"],
                      ["Perakende / B2B", "Ürün vitrini, kampanya ritmi veya LinkedIn güveni", "Mağaza trafiği / lead"],
                    ]) as [string, string, string][]
              }
            />
            <div className="packages-cta">
              <p>
                Sizin sektörünüz tabloda olmasa da aynı mantık geçerli: markaya özel brief, onay hattı ve aylık skor.
                Şablon kota listesi yerine keşif sonrası yazılı yol haritası sunarız.
              </p>
              <div className="packages-cta-actions">
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent("Merhaba, markama özel içerik planı için keşif almak istiyorum.")}`}
                  className="btn btn-primary header-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp ile keşif iste
                </a>
                <Link href={paths.sectors} className="btn btn-ghost packages-cta-link">
                  Sektör sayfalarını incele
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="faq section" id="sss">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">S.S.S.</span>
              <h2>{home?.faqTitle || "Samsun sosyal medya hakkında sıkça sorulanlar."}</h2>
              <p className="section-desc">
                {home?.faqLead ||
                  "Fiyat mantığı, sektöre özel planlama, reklam bütçesi, sözleşme ve WhatsApp iletişimi hakkında net cevaplar."}
              </p>
            </div>
            <div className="faq-list">
              {homeFaqItems.map((f) => (
                <details className="faq-item reveal" key={f.id}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
            {faqs.length > homeFaqItems.length ? (
              <p className="faq-more">
                <Link href={paths.faq}>Tüm sorular ve cevaplar</Link>
              </p>
            ) : null}
          </div>
        </section>

        <section className="contact section" id="iletisim">
          <div className="container">
            <div className="section-head section-head-full">
              <span className="section-label">İletişim</span>
              <h2>{home?.contactTitle || "Projenizi konuşalım."}</h2>
              <p className="section-desc">
                {home?.contactLead ||
                  "Formu doldurun ya da WhatsApp’tan yazın. En geç 24 saat içinde size dönüş yapıyoruz."}
              </p>
            </div>
            <div className="contact-layout">
              <ContactInfo
                phone={s.phone}
                phoneDisplay={s.phoneDisplay}
                email={s.email}
                whatsapp={wa}
                addressLine1={s.addressLine1}
                addressLine2={s.addressLine2}
              />
              <ContactForm
                districts={districts.map((d) => d.name)}
                services={services.map((x) => x.title)}
                labels={{
                  name: s.formNameLabel,
                  phone: s.formPhoneLabel,
                  email: s.formEmailLabel,
                  district: s.formDistrictLabel,
                  service: s.formServiceLabel,
                  message: s.formMessageLabel,
                  submit: s.formSubmitLabel,
                  success: s.formSuccessMsg,
                  error: s.formErrorMsg,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
