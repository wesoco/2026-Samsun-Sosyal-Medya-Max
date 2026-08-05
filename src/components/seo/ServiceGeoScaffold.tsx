import Link from "next/link";
import { paths } from "@/lib/paths";
import { AnswerBox, ComparisonTable, GeoSection } from "@/components/seo/GeoBlocks";
import { TopicCluster, type ClusterLink } from "@/components/seo/TopicCluster";

type Props = {
  serviceTitle: string;
  answer: string;
  /** bodyHtml zaten uzunsa yalnızca cevap + tablo + cluster */
  compact?: boolean;
  services?: ClusterLink[];
  regions?: ClusterLink[];
  posts?: ClusterLink[];
};

/**
 * Hizmet / pillar GEO iskeleti.
 * compact=true: tekrarlayan Nedir/Nasıl bloklarını atlar (body doluysa).
 */
export function ServiceGeoScaffold({
  serviceTitle,
  answer,
  compact = false,
  services,
  regions,
  posts,
}: Props) {
  return (
    <div className="seo-geo-scaffold">
      <AnswerBox>
        <p>{answer}</p>
      </AnswerBox>

      {!compact ? (
        <>
          <GeoSection title={`${serviceTitle} nedir?`}>
            <p>
              {serviceTitle}; Trabzon’daki işletmeler için Instagram, TikTok, Facebook, LinkedIn ve gerektiğinde
              YouTube kanallarında görünürlük, etkileşim ve müşteri dönüşümünü planlı yönetme hizmetidir. İçerik
              üretimi, Meta Ads, Google Ads, reels çekimi ve raporlama aynı strateji altında ilerler.
            </p>
          </GeoSection>

          <GeoSection title="Neden önemlidir?">
            <ul>
              <li>Yerel rekabet (Ortahisar, Akçaabat, Yomra, Of…) dijitalde de yoğundur.</li>
              <li>Organik erişim tek başına yetmez; performans pazarlaması ve remarketing gerekir.</li>
              <li>Marka bilinirliği, lead generation ve dönüşüm oranı birlikte ölçülmelidir.</li>
            </ul>
          </GeoSection>

          <GeoSection title="Nasıl yapılır?">
            <ol>
              <li>Keşif: hedef kitle, rakip, mevcut hesap ve Google Benim İşletmem uyumu.</li>
              <li>Strateji: kanal, dil, takvim, KPI.</li>
              <li>Üretim: profesyonel fotoğraf, reels, video prodüksiyon, drone çekimi.</li>
              <li>Yayın + reklam: Meta Ads / Google Ads optimizasyonu.</li>
              <li>Ölçüm: Google Analytics, Search Console ve aylık rapor.</li>
            </ol>
          </GeoSection>

          <GeoSection title="Kimler yaptırmalıdır?">
            <p>
              Restoran, kafe, klinik, otel, emlak, inşaat, güzellik merkezi ve kurumsal B2B markalar. Her sektöre ve
              markaya özel içerik planı, kanal seçimi ve ölçüm çerçevesi kurulur.
            </p>
          </GeoSection>

          <GeoSection title="Fiyatı neye göre değişir?">
            <p>
              Platform sayısı, içerik hacmi, yerinde çekim, Meta/Google medya yönetimi ve rapor derinliği. Medya
              bütçesi ajans ücretinden ayrıdır. Net teklif için{" "}
              <Link href={paths.hash.contact}>ücretsiz keşif</Link> alın.
            </p>
          </GeoSection>
        </>
      ) : null}

      <ComparisonTable
        caption="Organik yönetim vs reklam destekli büyüme"
        headers={["Ölçüt", "Yalnızca organik", "Organik + Meta/Google Ads"]}
        rows={[
          ["İlk görünürlük", "4. 8 hafta", "İlk haftadan veri"],
          ["Hedef kitle kontrolü", "Sınırlı", "Konum + ilgi + retargeting"],
          ["Maliyet şeffaflığı", "Zaman/emek", "Medya + yönetim ayrı raporlanır"],
          ["Ölçekleme", "Yavaş", "Kazanan kreatif ile hızlanır"],
        ]}
      />

      <TopicCluster services={services} regions={regions} posts={posts} />
    </div>
  );
}
