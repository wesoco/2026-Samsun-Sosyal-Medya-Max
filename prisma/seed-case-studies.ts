/**
 * Vaka çalışmaları - ölçülebilir kanıt (Review/yıldız yok).
 *   npm run db:seed-cases
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Case = {
  slug: string;
  sector: string;
  title: string;
  lead: string;
  challenge: string;
  workDone: string;
  result: string;
  bodyHtml: string;
  relatedServices: string[];
  seoTitle: string;
  seoDesc: string;
};

const CASES: Case[] = [
  {
    slug: "otomotiv-bayi-lansman",
    sector: "Otomotiv",
    title: "Otomotiv bayi lansmanı: grid + Meta Ads aynı haftada",
    lead: "Trabzon otomotiv bayisinde yeni model lansmanı için Instagram vitrini ve konum hedefli Meta Ads aynı haftada kuruldu.",
    challenge:
      "Lansman tarihi yakındı; hesapta tutarsız grid, zayıf hikâye ve dağınık reklam geçmişi vardı. Hedef: gösterim değil, showroom ziyareti ve mesaj.",
    workDone:
      "3 haftalık içerik stoğu (ürün + ekip + showroom), lansman reels seti, bio CTA netleştirme, Ortahisar + komşu ilçe Meta Ads testi ve remarketing.",
    result:
      "Lansman haftasında mesaj ve arama taleplerinde belirgin artış; reklam satırı şeffaf raporlandı. Organik grid tutarlı hale geldi; sonraki ay kotası Büyüme katmanına alındı.",
    relatedServices: ["sosyal-medya-yonetimi", "meta-ads", "icerik-uretimi-cekim"],
    seoTitle: "Otomotiv Sosyal Medya Vaka Çalışması | Trabzon",
    seoDesc:
      "Trabzon otomotiv bayisi lansmanında Instagram yönetimi ve Meta Ads örneği. Süreç, yapılanlar ve ölçülebilir sonuç özeti.",
    bodyHtml: `
<h2>Sorun neydi?</h2>
<p>Lansman yaklaşırken hesap vitrini dağınıktı. Reklam geçmişi “gösterim” odaklıydı; showroom ve mesaj hedefi net değildi. Rakip bayiler aynı mahalle kitlesine açılıyordu.</p>
<h2>Ne yaptık?</h2>
<ol>
<li>Cadde/rakip audit ve bio CTA netleştirme</li>
<li>Ürün + ekip + showroom içerik stoğu (3 hafta)</li>
<li>Lansman reels seti ve story ritmi</li>
<li>Ortahisar + spillover Meta Ads; medya ayrı satır</li>
<li>Aylık skor: erişim, mesaj, üç aksiyon</li>
</ol>
<h2>Sonuç</h2>
<p>Lansman haftasında nitelikli mesaj/arama talebi arttı. Grid marka diline oturdu. Abartılı yüzde vaadi yok; hedef keşifte yazılan KPI’larla ölçüldü.</p>
<p><a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/sektorler/otomotiv">Otomotiv sektörü</a></p>
<div class="page-cta"><h2>Benzer lansman için keşif.</h2><p>Hesabınıza bakalım; net bir lansman takvimi çıkaralım.</p><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
  },
  {
    slug: "restoran-story-rezervasyon",
    sector: "Gastronomi",
    title: "Restoran: story ritmi ve konum reklamıyla rezervasyon",
    lead: "Akçaabat. Ortahisar hattında restoran için iştah görselleri, story temposu ve düşük bütçeli konum Ads ile rezervasyon CTA’sı güçlendirildi.",
    challenge:
      "Stok tabak fotoğrafları ve düzensiz paylaşım; menü güncelliği yoktu. Hedef rezervasyon ve paket servis mesajıydı.",
    workDone:
      "Yerinde kısa çekim, haftalık story formatı, 3. 4 reels/ay, menü CTA, Akçaabat + batı sahil konum Ads testi.",
    result:
      "Yoğun akşamlarda story üzerinden gelen mesajlar arttı; menü görselleri güncel tutuldu. Reklam maliyeti ayrı satırda raporlandı.",
    relatedServices: ["instagram-yonetimi", "icerik-uretimi-cekim", "meta-ads"],
    seoTitle: "Restoran Sosyal Medya Vaka Çalışması | Trabzon",
    seoDesc:
      "Trabzon restoranında Instagram story, reels ve konum reklamı örneği. Rezervasyon odaklı süreç özeti.",
    bodyHtml: `
<h2>Sorun neydi?</h2>
<p>Hesap “güzel ama ölü” görünüyordu. Menü güncel değildi; rezervasyon yolu bio’da kayıptı.</p>
<h2>Ne yaptık?</h2>
<ol>
<li>Mutfak/tezgâh kısa çekim günü</li>
<li>Günün ürünü story formatı</li>
<li>Aylık reels kotası (iştah + ekip)</li>
<li>Konum Ads testi; medya ayrı</li>
</ol>
<h2>Sonuç</h2>
<p>Rezervasyon ve paket mesajlarında artış gözlendi. Sürdürülebilir story ritmi oturdu. “viral” hedefi dayatılmadı.</p>
<p><a href="/sektorler/restoran-kafe">Restoran &amp; kafe</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a></p>
<div class="page-cta"><h2>Restoranınız için keşif.</h2><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
  },
  {
    slug: "emlak-drone-lansman",
    sector: "Emlak / İnşaat",
    title: "Emlak projesi: drone + Google Ads niyetli arama",
    lead: "Yomra. Ortahisar koridorunda proje lansmanı için drone, Instagram ve niyetli Google Ads aynı planda yürütüldü.",
    challenge:
      "Proje ölçeği telefonda anlatılamıyordu. Organik tek başına lansman temposunu karşılamıyordu; arama niyeti (“Yomra emlak”) boştu.",
    workDone:
      "Drone + geniş plan çekim, şantiye/süreç reels’leri, lansman öncesi stok, Meta remarketing ve Google Arama kampanyası (dönüşüm izlemeli).",
    result:
      "Lansman döneminde form/arama talepleri arttı. Drone görselleri hem organik hem reklamda kullanıldı; medya ayrı raporlandı.",
    relatedServices: ["drone-cekimi", "google-ads", "meta-ads", "sosyal-medya-yonetimi"],
    seoTitle: "Emlak Drone ve Google Ads Vaka | Trabzon",
    seoDesc:
      "Trabzon emlak/inşaat projesinde drone çekimi, Instagram ve Google Ads örneği.",
    bodyHtml: `
<h2>Sorun neydi?</h2>
<p>Konum ve ölçek anlatılmadan satış görüşmesi uzuyordu. Organik tempo lansman tarihine yetişmiyordu.</p>
<h2>Ne yaptık?</h2>
<ol>
<li>Drone ve geniş plan çekim</li>
<li>Şantiye/süreç içerik stoğu</li>
<li>Meta + Google niyetli arama</li>
<li>Remarketing ayrı satır</li>
</ol>
<h2>Sonuç</h2>
<p>Niyetli arama ve form taleplerinde artış. Garanti satış vaadi yok; KPI keşifte yazıldı.</p>
<p><a href="/sektorler/insaat-emlak">İnşaat &amp; emlak</a> · <a href="/hizmetler/drone-cekimi">Drone</a></p>
<div class="page-cta"><h2>Proje lansmanı için keşif.</h2><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
  },
  {
    slug: "otel-uzungol-sezon",
    sector: "Turizm / Otel",
    title: "Uzungöl hattı otel: sezon öncesi stok + erken rezervasyon",
    lead: "Çaykara / Uzungöl rekabetinde şablon göl stoğu yerine oda detayı, erken rezervasyon Ads ve sezon ritmi kuruldu.",
    challenge:
      "Herkes aynı manzara stoğunu kullanıyordu. Sezon içi panik içerik; kışın sessiz hesap.",
    workDone:
      "Oda/ortam reels, kapak yenileme, sezon öncesi stok, erken rezervasyon Meta Ads + retargeting, yoğun sezonda yanıt SLA.",
    result:
      "Sezon öncesi rezervasyon mesajlarında artış; kapak ve oda turu rakiplerden ayrıştı. Kış planı marka + erken mesaj olarak kaldı.",
    relatedServices: ["instagram-yonetimi", "meta-ads", "drone-cekimi"],
    seoTitle: "Otel Sosyal Medya Vaka | Çaykara Uzungöl Trabzon",
    seoDesc:
      "Uzungöl hattı otelde sezon öncesi içerik ve erken rezervasyon reklamı örneği.",
    bodyHtml: `
<h2>Sorun neydi?</h2>
<p>Şablon göl görselleri ayırt edilmiyordu. Sezon içi yetişmeyen içerik, kışın ölü hesap.</p>
<h2>Ne yaptık?</h2>
<ol>
<li>Rakip tarama + kapak yenileme</li>
<li>Oda/ortam reels seti</li>
<li>Sezon öncesi Ads + retargeting</li>
<li>Yoğun sezonda story hızı ve yanıt süresi</li>
</ol>
<h2>Sonuç</h2>
<p>Erken rezervasyon taleplerinde artış. Manzara yarışı yerine işletme detayı kazandı.</p>
<p><a href="/sektorler/otel-turizm">Otel &amp; turizm</a> · <a href="/bolgeler/caykara">Çaykara</a></p>
<div class="page-cta"><h2>Sezon planı için keşif.</h2><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
  },
  {
    slug: "kurumsal-b2b-linkedin",
    sector: "Kurumsal / B2B",
    title: "B2B firma: LinkedIn + onaylı Instagram güven dili",
    lead: "Arsin. Ortahisar hattında B2B firmada üretim güveni, LinkedIn ve yazılı onay hattı ile kurumsal sosyal medya kuruldu.",
    challenge:
      "Tüketici reels dili B2B’ye uymuyordu. Onay yoktu; kriz riski yüksekti. Lead kalitesi vanity like’tan önemliydi.",
    workDone:
      "Onay protokolü, saha/üretim shot list, LinkedIn + kurumsal Instagram takvimi, form odaklı mesaj, aylık skor kartı (nitelikli lead).",
    result:
      "Nitelikli mesaj/form artışı; marka dili abartısız güvene oturdu. Like odaklı rapor kaldırıldı.",
    relatedServices: ["kurumsal-sosyal-medya-yonetimi", "sosyal-medya-yonetimi"],
    seoTitle: "Kurumsal B2B Sosyal Medya Vaka | Trabzon",
    seoDesc:
      "Trabzon B2B firmasında LinkedIn ve onaylı Instagram yönetimi örneği.",
    bodyHtml: `
<h2>Sorun neydi?</h2>
<p>Yanlış dil (viral tüketici) ve onay eksikliği itibar riski yaratıyordu.</p>
<h2>Ne yaptık?</h2>
<ol>
<li>Yazılı onay ve kriz protokolü</li>
<li>Üretim/saha içerik planı</li>
<li>LinkedIn + kurumsal IG</li>
<li>Skor: nitelikli lead, vanity değil</li>
</ol>
<h2>Sonuç</h2>
<p>Daha nitelikli görüşme talepleri; süreç şeffaf ve tekrarlanabilir hale geldi.</p>
<p><a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">Kurumsal yönetim</a> · <a href="/bolgeler/arsin">Arsin</a></p>
<div class="page-cta"><h2>B2B keşif.</h2><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
  },
];

async function main() {
  await prisma.caseStudy.deleteMany();
  for (let i = 0; i < CASES.length; i++) {
    const c = CASES[i];
    await prisma.caseStudy.create({
      data: {
        slug: c.slug,
        sector: c.sector,
        title: c.title,
        lead: c.lead,
        challenge: c.challenge,
        workDone: c.workDone,
        result: c.result,
        bodyHtml: c.bodyHtml,
        relatedServices: c.relatedServices,
        seoTitle: c.seoTitle,
        seoDesc: c.seoDesc,
        sortOrder: i + 1,
        published: true,
      },
    });
    console.log("case", c.slug);
  }
  console.log(`Seeded ${CASES.length} case studies`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
