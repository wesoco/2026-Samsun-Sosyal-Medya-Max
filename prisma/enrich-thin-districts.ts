/**
 * 250 kelimenin altındaki ilçe gövdelerine yerel zenginleştirme ekler.
 *   npx tsx prisma/enrich-thin-districts.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EXTRA: Record<string, string> = {
  of: `<h2>Of’ta sık sorulan ticari sorular</h2><p>Of’ta sosyal medya yönetimi alan işletmeler genelde “uzaktan olur mu?”, “balıkçı/restoran için aynı gün story şart mı?”, “Çaykara reklamı Of kimliğini bozar mı?” diye sorar. Uzaktan onaylı yayın mümkündür; sahil işletmelerinde taze ürün görseli kritiktir. Çaykara spillover işletme tipine göre dikkatli test edilir.</p><div class="seo-table-wrap"><table class="seo-comparison-table"><caption>Of sahil temposu</caption><thead><tr><th>İhtiyaç</th><th>Öneri</th></tr></thead><tbody><tr><td>Ticaret duyurusu</td><td>Story + konum</td></tr><tr><td>Keşfet</td><td>Haftalık reels</td></tr><tr><td>Komşu ilçe</td><td>Kontrollü Ads</td></tr></tbody></table></div><p><a href="/sektorler/restoran-kafe">Restoran &amp; kafe</a> · <a href="/vakalar">Vakalar</a> · <a href="/#iletisim">Teklif al</a></p>`,
  akcaabat: `<h2>Akçaabat’ta satın alma niyeti</h2><p>Restoran ve esnaf “ayda kaç reels?”, “çekim ne zaman?”, “reklam şart mı?” diye sorar. Kota keşifte yazılır; organik ritim oturmadan yüksek Ads açılmaz. Batı sahil spillover (Çarşıbaşı. Vakfıkebir) reklam coğrafyasına girer.</p><p>Lezzet kimliği stok tabakla değil; usta, günün ürünü ve samimi dille anlatılır. <a href="/sektorler/restoran-kafe">Restoran sektör sayfası</a> ve <a href="/vakalar/restoran-story-rezervasyon">restoran vakası</a> örnek süreç sunar.</p><p><a href="/#paketler">Paket kapsamı</a> · <a href="/#iletisim">Teklif al</a></p>`,
  yomra: `<h2>Yomra’da lansman ve niyetli arama</h2><p>Emlak ve yeni işletmeler “drone şart mı?”, “Google Ads ne zaman?”, “ilk 90 gün ne yapılır?” diye sorar. Drone zorunlu değildir ama ölçek anlatımında fark yaratır. Arama niyeti varsa Google Ads dönüşüm izlemeli açılır.</p><div class="seo-table-wrap"><table class="seo-comparison-table"><caption>Yomra kanal seçimi</caption><thead><tr><th>Hedef</th><th>Kanal</th></tr></thead><tbody><tr><td>Görünürlük</td><td>IG / reels</td></tr><tr><td>Proje ilgisi</td><td>Meta</td></tr><tr><td>Niyetli arama</td><td>Google Ads</td></tr></tbody></table></div><p><a href="/sektorler/insaat-emlak">İnşaat &amp; emlak</a> · <a href="/vakalar/emlak-drone-lansman">Emlak vakası</a></p>`,
  besikduzu: `
<h2>Beşikdüzü’nde sosyal medya yönetimi nedir?</h2>
<p>Beşikdüzü sosyal medya yönetimi; yazlık ve sahil turizminde sezonu kaçırmayan erken içerik + rezervasyon reklamıdır. Kışın bilinirlik, yazın dönüşüm. 12 ay aynı ritim dayatılmaz. Otel, pansiyon, kafe ve sahil hizmetleri için drone/sahil setleri sezon öncesi stoğa alınır.</p>
<h2>Neden sezon planı şart?</h2>
<p>Yazlık talep ani yükselir. Kışın sessiz hesap, yazın yetişmeyen içerik demektir. Vakfıkebir. Şalpazarı komşuluğu hem müşteri hem tedarik bağını etkiler.</p>
<div class="seo-table-wrap"><table class="seo-comparison-table"><caption>Beşikdüzü sezon dengesi</caption><thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead><tbody><tr><td>Düşük sezon</td><td>Marka, stok, erken mesaj</td></tr><tr><td>Yüksek sezon</td><td>Dönüşüm Ads, hızlı yanıt</td></tr></tbody></table></div>
<h2>Nasıl çalışırız?</h2>
<ol><li>Sezon takvimi keşifte çıkarılır.</li><li>Drone ve konaklama çekimi planlanır.</li><li>Sezon öncesi organik stok.</li><li>Sezon içi reklam ve yanıt süresi artar.</li></ol>
<h2>Kimler için?</h2>
<p>Otel, pansiyon, kafe, restoran ve sahil hizmetleri. <a href="/sektorler/otel-turizm">Otel &amp; turizm</a> sayfasına bakın.</p>
<h2>Fiyat</h2>
<p>Sezonluk hacim farkı teklifte şeffaf gösterilir. Medya ayrıdır. Uydurma sabit fiyat yazılmaz.</p>
<div class="page-cta"><h2>Beşikdüzü sezon planı için keşif.</h2><a href="/#iletisim" class="btn btn-primary">Teklif al</a></div>
`.trim(),
};

const GENERIC_EXTRA = (name: string, slug: string) => `
<h2>${name} işletmeleri sık ne soruyor?</h2>
<p>${name}’da sosyal medya yönetimi alan işletmeler fiyat mantığını, aylık içerik kotasını, yerinde çekim olup olmadığını ve reklam bütçesinin ayrı olup olmadığını sorar. Cevaplar nettir: kota keşifte yazılır; medya ajans ücretinden ayrıdır; çekim planlı yapılır. Detay için <a href="/#paketler">paket kapsamı</a> ve <a href="/sss">SSS</a>.</p>
<h2>Yerel güven ve CTA</h2>
<p>${name} müşterisi tanıdık yüz + güncel dijital vitrin ister. Bio’da telefon, konum ve WhatsApp net olmalıdır. İlçe sayfamız (${slug}) bu yerel niyeti hizmet ve vaka linkleriyle destekler.</p>
<p><a href="/sektorler">Sektörler</a> · <a href="/vakalar">Vakalar</a> · <a href="/bolgeler">Tüm ilçeler</a> · <a href="/#iletisim">Teklif al</a></p>
`;

async function main() {
  const all = await prisma.district.findMany({ select: { slug: true, name: true, bodyHtml: true } });
  for (const d of all) {
    let body = d.bodyHtml || "";
    let words = body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    if (EXTRA[d.slug]) {
      if (d.slug === "besikduzu" && words < 200) {
        body = EXTRA.besikduzu;
      } else if (d.slug !== "besikduzu") {
        body = `${body}\n${EXTRA[d.slug]}`;
      } else {
        body = EXTRA.besikduzu;
      }
    } else if (words < 260) {
      body = `${body}\n${GENERIC_EXTRA(d.name, d.slug)}`;
    } else {
      continue;
    }
    words = body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    await prisma.district.update({ where: { slug: d.slug }, data: { bodyHtml: body } });
    console.log("enriched", d.slug, "words~", words);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
