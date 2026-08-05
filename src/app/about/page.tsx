import type { Metadata } from "next";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AnswerBox, ComparisonTable } from "@/components/seo/GeoBlocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hakkımızda | Trabzon Sosyal Medya Ajansı. Wesoco",
    description:
      "Trabzon Sosyal Medya, Wesoco bünyesinde yerel işletmelere Instagram yönetimi, içerik, Meta Ads ve raporlama sunar. Neden ajans, kim yönetir, nasıl çalışırız.",
    path: paths.about,
  });
}

export default function AboutPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Ana sayfa", path: paths.home },
    { name: "Hakkımızda", path: paths.about },
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
              <span>Hakkımızda</span>
            </nav>
            <span className="section-label">Hakkımızda</span>
            <h1>Trabzon&apos;da sosyal medya denince akla ilk biz.</h1>
            <p className="lead">
              Wesoco bünyesinde Trabzon Sosyal Medya; 18 ilçede Instagram, içerik üretimi, Meta Ads ve Google Ads ile
              yerel markaları büyütür.
            </p>
          </div>
        </section>

        <section className="page-block">
          <div className="container narrow">
            <AnswerBox title="Kısa cevap">
              <p>
                Trabzon Sosyal Medya, Wesoco güvencesiyle çalışan yerel sosyal medya ajansıdır. Strateji, içerik, yayın,
                reklam yönetimi ve aylık rapor tek çatıdadır. İçerikleri ekip hazırlar; onayınızdan sonra yayınlanır.
              </p>
            </AnswerBox>

            <h2>Bu firma kim? Wesoco ilişkisi</h2>
            <p>
              Trabzon Sosyal Medya, Wesoco’nun Trabzon’daki sosyal medya ve performans odaklı yüzüdür. Yerel işletmeler
              için sade dil, yerinde çekim ve şeffaf medya raporlaması sunarız. Amaç abartılı vaat değil; ölçülebilir
              mesaj, arama ve mağaza trafiği.
            </p>

            <h2>İçerikleri kim hazırlıyor?</h2>
            <p>
              Brief, takvim, tasarım/kurgu ve yayın Wesoco bünyesindeki ekip tarafından yürütülür. Taslaklar size
              sunulur; onay hattı (e-posta veya WhatsApp) ile ilerlenir. Marka diliniz yazılı olarak korunur.
            </p>

            <h2>Nasıl çalışıyoruz?</h2>
            <ol>
              <li>Ücretsiz keşif: hesap, rakip, hedef</li>
              <li>Marka ve sektöre özel strateji + içerik planı</li>
              <li>Üretim, onay, yayın</li>
              <li>İsteğe bağlı Meta/Google Ads (medya ayrı)</li>
              <li>Aylık skor kartı ve üç aksiyon</li>
            </ol>

            <h2>Hangi sektörlerde deneyimliyiz?</h2>
            <p>
              Restoran &amp; kafe, klinik &amp; güzellik, otel &amp; turizm, otomotiv, inşaat &amp; emlak, perakende ve
              B2B/OSB. Sektöre özel sayfalar:{" "}
              <Link href={paths.sectors}>Tüm sektörler</Link>. Seçilmiş süreç özetleri:{" "}
              <Link href={paths.cases}>Vaka çalışmaları</Link>.
            </p>

            <h2>Neden sizi tercih etmeliyim?</h2>
            <ComparisonTable
              caption="Kendi yönetmek vs freelance vs ajans (Trabzon)"
              headers={["Ölçüt", "Kendi yönetmek", "Freelance", "Ajans (biz)"]}
              rows={[
                ["Süreklilik", "Zamana bağlı", "Tek kişi riski", "Ekip + yedek"],
                ["Strateji + üretim", "Dağınık", "Değişken", "Tek çatı"],
                ["Onay / kriz", "Yok / ad hoc", "Kişisel", "Yazılı süreç"],
                ["Reklam şeffaflığı", "Zor", "Değişken", "Medya ayrı rapor"],
                ["Ölçek", "Sınırlı", "Kişisel kapasite", "Sektöre göre plan"],
              ]}
            />
            <p>
              “En iyi ajans” iddiası yerine keşifte kapsam, referans ve teklifi yan yana koymanızı öneririz.{" "}
              <Link href={paths.hash.approach}>Yaklaşımımız</Link> ve <Link href={paths.faq}>SSS</Link> sayfalarına
              bakın.
            </p>

            <h2>Nerede hizmet veriyoruz?</h2>
            <p>
              Ortahisar merkez ofis; Trabzon’un 18 ilçesinde uzaktan yönetim veya yerinde çekim.{" "}
              <Link href={paths.regions}>Hizmet bölgeleri</Link>.
            </p>

            <div className="page-cta" style={{ marginTop: 32 }}>
              <h2>Ücretsiz keşif planlayalım.</h2>
              <p>Form veya WhatsApp. 24 saat içinde dönüş hedeflenir.</p>
              <Link href={paths.hash.contact} className="btn btn-primary">
                Teklif al
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
