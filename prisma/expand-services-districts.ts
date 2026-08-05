/**
 * Eski şablon genişletici - hizmet body’lerini ARTIK EZMEZ.
 * Hizmet tek kaynak: npx tsx prisma/seed-services-unique.ts
 * İlçe özgün küme: npm run db:seed-districts
 * npm run db:expand-pages
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function words(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

/** Slug’a özel tek seferlik ek paragraflar - tekrar döngüsü yok */
const SERVICE_EXTRA: Record<string, string[]> = {
  "sosyal-medya-yonetimi": [
    "Yönetim paketinde içerik takvimi, yayınlama, topluluk yönetimi ve aylık skor kartı birlikte ilerler. Marka dili oturmadan reklam açmak bütçeyi boşa harcar.",
    "Trabzon’da yönetim; sezon (turizm, eğitim, bayram) takvimine işlenir. Ortahisar temposu ile Of veya Maçka ritmi aynı değildir.",
  ],
  "instagram-yonetimi": [
    "Instagram’da bio, vitrin grid, reels hook ve story CTA’sı tek sistemdir. Yalnızca post atmak yönetim sayılmaz.",
    "Keşfet algoritması için tutarlı yayın + izlenme süresi kritiktir; yerel konum etiketleri Trabzon işletmelerinde fark yaratır.",
  ],
  "meta-ads": [
    "Meta Ads’te önce Pixel ve dönüşüm olayları, sonra yaratıcı test, sonra ölçekleme gelir. Erken ölçekleme öğrenmeyi bozar.",
    "Konum (ilçe) + ilgi alanı + remarketing katmanları ayrı bütçe satırlarında izlenir; medya ajans ücretinden ayrı raporlanır.",
  ],
  "google-ads": [
    "Google Ads arama niyetini yakalar; ‘Trabzon + hizmet’ uzun kuyrukları yerel işletmeler için değerlidir.",
    "Search, Performance Max veya YouTube seçimi keşifte netleşir. Dönüşüm izleme olmadan optimizasyon yapılmaz.",
  ],
  "icerik-uretimi-cekim": [
    "Yerinde çekim, reels kurgu ve marka diline uygun stok; stok görsel tek başına güven üretmez.",
    "Çekim günü öncesi brief ve shot list hazırlanır; onay sonrası sosyal formatlara kırılır.",
  ],
  "drone-cekimi": [
    "Drone; otel, inşaat, turizm ve sahil işletmelerinde ölçek ve konum avantajı gösterir.",
    "Uçuş planı, izinler ve kurgu sosyal + web formatlarına göre yapılır; tek ham dosya yetmez.",
  ],
  "dijital-pazarlama-ajansi": [
    "Grafik ve marka dili sosyal şablonlara oturmazsa hesap dağınık görünür. Renk, tipografi ve logo alanı sabittir.",
    "Kampanya kreatifleri dönüşüm odaklıdır: özellik listesi değil, sonuç ve net CTA.",
  ],
  "kurumsal-sosyal-medya-yonetimi": [
    "Kurumsal yönetimde onay katmanı, kriz protokolü ve LinkedIn düşünce liderliği öne çıkar.",
    "B2B’de güven ve uzmanlık; B2C hızından farklı bir editoryal ritim ister.",
  ],
  "reklam-ajansi": [
    "Reklam ajansı rolünde medya planı, kreatif test ve şeffaf maliyet raporu birlikte sunulur.",
    "Meta ve Google aynı anda açılabilir; kanal fanatizmi yoktur, iş modeline göre karışım seçilir.",
  ],
  "sosyal-medya-ajansi": [
    "Ajans seçiminde referans, süreç şeffaflığı ve rapor disiplini vaatten daha önemlidir.",
    "Wesoco bünyesinde Trabzon Sosyal Medya; keşiften rapora kadar yazılı ilerler.",
  ],
};

const DISTRICT_PROFILE: Record<
  string,
  { character: string; sectors: string; neighbors: string; angle: string; process: string }
> = {
  ortahisar: {
    character: "perakende, klinik, restoran ve kurumsal ofislerin yoğunlaştığı Trabzon merkezi",
    sectors: "cadde mağazaları, klinikler, kafeler, bayi ve ofisler",
    neighbors: "Akçaabat ve Yomra",
    angle:
      "Vitrin, ekip ve kampanya aynı haftada yer bulur. Reels ile keşfet, story ile günlük temas, Meta Ads ile mahalle hedeflemesi birleşir.",
    process: "Keşifte rakip cadde hesapları incelenir; ilk ay kimlik ve takvim, ikinci aydan reklam testleri.",
  },
  akcaabat: {
    character: "sahil hattı ve güçlü yerel kimlikle bilinen batı ilçesi",
    sectors: "restoran, kafe, market ve yerel hizmet",
    neighbors: "Ortahisar, Çarşıbaşı ve Vakfıkebir",
    angle: "Lezzet ve mahalle güveni öne çıkar; yemek görselleri ve usta hikâyeleri etkileşimi artırır.",
    process: "Çekimler işletme yoğunluğuna göre planlanır; organik ritim sonrası mesaj kampanyaları açılır.",
  },
  yomra: {
    character: "hızlı büyüyen konut ve ticaret koridoru",
    sectors: "emlak, inşaat, kafe ve klinik",
    neighbors: "Ortahisar, Arsin ve Araklı",
    angle: "Proje ve şantiye hikâyesi, drone ve geniş açı ile ölçek gösterilir; Google Ads niyeti yakalar.",
    process: "Lansman takvimi içerik + reklam birlikte kurulur; hedef kitle doğu koridoru odaklıdır.",
  },
  of: {
    character: "doğu sahilinde ticaret ve hizmetin güçlü olduğu ilçe",
    sectors: "ticaret, restoran, hizmet ve turizm bağlantılı işletmeler",
    neighbors: "Sürmene, Araklı ve Hayrat",
    angle: "Sahil ve ticaret ritmi içerikte hız ister; konum etiketleri ve yerel kampanyalar kritiktir.",
    process: "Uzaktan yönetim + periyodik çekim; reklamda Of + komşu sahil kuşağı düşünülür.",
  },
  arakli: {
    character: "doğu sahil kuşağında yerel işletmelerin yoğun olduğu ilçe",
    sectors: "esnaf, restoran, hizmet",
    neighbors: "Yomra, Sürmene ve Of",
    angle: "Mahalle güveni ve hizmet süreci anlatımı öne çıkar.",
    process: "Sade takvim, net CTA; gerektiğinde komşu ilçe hedeflemesi.",
  },
  surmene: {
    character: "sahil ve iç kesim bağlantılı ticaret ilçesi",
    sectors: "ticaret, üretim ve hizmet",
    neighbors: "Of, Araklı ve Köprübaşı",
    angle: "Ürün/hizmet güveni ve yerel referans içerikte işlenir.",
    process: "Keşif sonrası kanal seçimi; Instagram öncelikli, reklam ihtiyaca göre.",
  },
  arsin: {
    character: "doğu koridorunda sanayi ve yerleşimin iç içe geçtiği ilçe",
    sectors: "sanayi çevresi hizmetleri, lokal ticaret",
    neighbors: "Yomra ve Araklı",
    angle: "B2B ve yerel hizmet mesajları dengelenir.",
    process: "LinkedIn veya Google Ads ihtiyacı keşifte netleşir.",
  },
  vakfikebir: {
    character: "batı sahilinde marka ve yerel lezzet kimliği güçlü ilçe",
    sectors: "gıda, restoran, ticaret",
    neighbors: "Beşikdüzü, Çarşıbaşı ve Akçaabat",
    angle: "Ürün hikâyesi ve coğrafi işaret çağrışımları içerikte dikkatli kullanılır.",
    process: "Görsel üretim öncelikli; reklam konum + ilgi ile test edilir.",
  },
  besikduzu: {
    character: "batı ucunda liman ve ticaret bağlantılı ilçe",
    sectors: "ticaret, lojistik çevresi, hizmet",
    neighbors: "Vakfıkebir ve Şalpazarı",
    angle: "Kurumsal güven ve hizmet hızı mesajları öne çıkar.",
    process: "Uzaktan yönetim uygundur; çekim planlı yapılır.",
  },
  macka: {
    character: "turizm ve doğa ile öne çıkan iç kesim ilçesi",
    sectors: "turizm, konaklama, kafe, yerel ürün",
    neighbors: "Ortahisar ve Tonya",
    angle: "Doğa, sezon ve deneyim içeriği; drone ve reels güçlüdür.",
    process: "Sezon öncesi stok üretim; sezon içi reklam ölçeği.",
  },
  carsibasi: {
    character: "batı sahilinde yerleşim ve esnaf yapısı olan ilçe",
    sectors: "esnaf, yerel hizmet, gıda",
    neighbors: "Akçaabat ve Vakfıkebir",
    angle: "Mahalle dili ve samimi görsel anlatım tutar.",
    process: "Haftalık story ritmi + aylık reels seti.",
  },
  caykara: {
    character: "yayla ve turizm odaklı doğu iç kesim",
    sectors: "turizm, konaklama, yerel ürün",
    neighbors: "Of, Dernekpazarı ve Hayrat",
    angle: "Yayla sezonu ve doğa görselleri planın merkezindedir.",
    process: "Sezon takvimi kritik; erken içerik stoğu önerilir.",
  },
  tonya: {
    character: "iç kesimde tarım ve yerel ticaretin sürdüğü ilçe",
    sectors: "tarım ürünü, esnaf, yerel hizmet",
    neighbors: "Maçka ve Düzköy",
    angle: "Ürün ve güven anlatımı; sade ve net CTA.",
    process: "Uzaktan üretim ağırlıklı; gerektiğinde çekim günü.",
  },
  duzkoy: {
    character: "yayla turizmi ve doğa ile bilinen ilçe",
    sectors: "turizm, kafe, yerel işletmeler",
    neighbors: "Maçka ve Tonya",
    angle: "Doğa ve deneyim reels’leri dönüşümü destekler.",
    process: "Sezon öncesi plan; reklamda konum genişletmesi dikkatli yapılır.",
  },
  salpazari: {
    character: "batı iç kesimde yerel kimliği güçlü ilçe",
    sectors: "yerel ürün, esnaf, hizmet",
    neighbors: "Beşikdüzü ve Vakfıkebir",
    angle: "Kültürel ve yerel ürün hikâyesi abartısız işlenir.",
    process: "Instagram odaklı sade paket çoğu işletmeye yeter.",
  },
  hayrat: {
    character: "doğu iç kesimde sakin yerleşim ve yerel hizmet",
    sectors: "yerel hizmet, esnaf",
    neighbors: "Of, Dernekpazarı ve Çaykara",
    angle: "Güven ve yakınlık mesajı; abartılı şehir dili kullanılmaz.",
    process: "Küçük ekiple hızlı onay hattı kurulur.",
  },
  dernekpazari: {
    character: "doğu iç kesimde küçük ölçekli işletmelerin olduğu ilçe",
    sectors: "yerel hizmet ve esnaf",
    neighbors: "Çaykara ve Hayrat",
    angle: "Sade vitrin ve net iletişim bilgisi önceliklidir.",
    process: "Minimal takvim + gerektiğinde komşu turizm kuşağı reklamı.",
  },
  koprubasi: {
    character: "doğu iç kesimde yerel ticaretin sürdüğü ilçe",
    sectors: "yerel hizmet, esnaf, küçük işletmeler",
    neighbors: "Sürmene ve Of",
    angle: "Yakın sahil ilçelerine erişim için dijital vitrin kritiktir.",
    process: "Uzaktan yönetim; rapor sade ve anlaşılır tutulur.",
  },
};

function serviceBody(title: string, lead: string, slug: string) {
  const extras = SERVICE_EXTRA[slug] || [
    `${title} kapsamında kanal seçimi, kreatif dil ve ölçüm aynı planda ilerler.`,
    `Trabzon ve 18 ilçede aynı kalite standardı; farklı yerel açı uygulanır.`,
  ];

  return `
<h2>${title} nedir?</h2>
<p>${lead}</p>
<p>Trabzon Sosyal Medya (Wesoco) olarak ${title.toLowerCase()} hizmetini Ortahisar’dan 18 ilçeye planlı sunarız. Instagram, Facebook, TikTok, LinkedIn ve gerektiğinde YouTube; içerik, Meta Ads, Google Ads ve raporlama aynı stratejide birleşebilir. Amaç vanity metrik değil; mesaj, randevu, rezervasyon veya satış gibi ölçülebilir sonuçtur.</p>

<h2>Neden önemlidir?</h2>
<ul>
<li>Yerel rekabet (Akçaabat, Yomra, Of, Sürmene…) dijitalde de yoğundur.</li>
<li>Organik erişim tek başına yetmez; performans pazarlaması ve remarketing gerekir.</li>
<li>Marka bilinirliği, lead generation ve dönüşüm oranı birlikte ölçülmelidir.</li>
<li>Google Benim İşletmem ve tutarlı NAP güveni güçlendirir.</li>
</ul>
<p>Doğru yaklaşım: 30. 90 günlük öğrenme penceresi, yazılı KPI ve şeffaf medya raporu. ${title} bu disiplinin parçasıdır.</p>

<h2>Nasıl yapılır?</h2>
<ol>
<li><strong>Keşif:</strong> Hedef kitle, rakip, mevcut hesap ve reklam geçmişi.</li>
<li><strong>Strateji:</strong> Mesaj, takvim, KPI ve kanal karışımı.</li>
<li><strong>Üretim:</strong> Fotoğraf, reels, video; gerekirse drone.</li>
<li><strong>Yayın + reklam:</strong> Test. öğren. ölçekle.</li>
<li><strong>Ölçüm:</strong> Analytics, Search Console ve aksiyonlu aylık rapor.</li>
</ol>
<p>Onay hattı yazılıdır. Taslaklar size gelir; onay sonrası yayınlanır. Kreatif yorgunluğu takip edilir.</p>
${extras.map((p) => `<p>${p}</p>`).join("\n")}

<h2>Kimler yaptırmalıdır?</h2>
<p>Restoran, kafe, otel, klinik, emlak, inşaat, güzellik, eğitim, perakende ve kurumsal B2B markalar. ${title}; düzenli üretim veya reklam disiplini eksik ekipler için özellikle kritiktir.</p>

<h2>Avantajları</h2>
<ul>
<li>Yerel dil ve 18 ilçe bilgisi</li>
<li>Şeffaf sözleşme; medya bütçesi ayrı rapor</li>
<li>Hizmet ↔ blog ↔ ilçe iç linkleri</li>
<li>WhatsApp + form ile hızlı iletişim</li>
<li>Ücretsiz keşif</li>
</ul>

<h2>Fiyatı neye göre değişir?</h2>
<p>Platform sayısı, içerik hacmi, yerinde çekim, reklam yönetimi ve rapor derinliği. Uydurma paket fiyatı yazılmaz; keşif sonrası tekliflenir. Medya harcaması ajans ücretinden ayrıdır.</p>

<h2>Süreç özeti</h2>
<p>İlk 7 günde audit, ilk 30 günde dil + kreatif set, 60. 90 günde kazanan formatların ölçeklenmesi. Raporlarda erişim, etkileşim, mesaj/arama, maliyet ve sonraki ayın üç aksiyonu yer alır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>${title}: dağınık vs planlı</caption>
<thead><tr><th>Ölçüt</th><th>Dağınık</th><th>Planlı</th></tr></thead>
<tbody>
<tr><td>Takvim</td><td>Yok</td><td>Aylık onaylı</td></tr>
<tr><td>KPI</td><td>Belirsiz</td><td>Yazılı</td></tr>
<tr><td>Reklam</td><td>Tesadüfi</td><td>Test. ölçek</td></tr>
<tr><td>Rapor</td><td>Geç / yok</td><td>Aksiyonlu</td></tr>
</tbody></table></div>

<h2>Sonuç</h2>
<p>${title} için <a href="/#iletisim">ücretsiz keşif</a> alın. <a href="/hizmetler">Tüm hizmetler</a>, <a href="/bolgeler">ilçeler</a> ve <a href="/blog">blog</a> ile devam edebilirsiniz.</p>
`.trim();
}

function serviceFaqs(title: string) {
  return [
    { q: `${title} nedir?`, a: `${title}; Trabzon işletmeleri için planlı üretim, yayın, reklam ve ölçümle büyümeyi hedefler.` },
    { q: "Süreç ne kadar sürer?", a: "Strateji 1. 2 haftada netleşir; anlamlı öğrenme genelde 30. 90 günde görülür." },
    { q: "Fiyat nasıl belirlenir?", a: "Kapsam ve medya ihtiyacına göre keşif sonrası. Medya bütçesi ayrıdır." },
    { q: "Hangi ilçelerde?", a: "Trabzon’un 18 ilçesinde uzaktan yönetim veya yerinde çekim ile." },
    { q: "Nasıl başlarız?", a: "Ücretsiz keşif formu veya WhatsApp. 24 saat içinde dönüş." },
  ];
}

function districtBody(name: string, regionLabel: string, slug: string) {
  const p = DISTRICT_PROFILE[slug] || {
    character: `${regionLabel} bölgesinde yerel işletmelerin bulunduğu Trabzon ilçesi`,
    sectors: "yerel esnaf, hizmet ve ticaret",
    neighbors: "komşu Trabzon ilçeleri",
    angle: "Yerel dil, tutarlı görsel ve ölçülebilir reklam bir arada planlanır.",
    process: "Keşif → strateji → onaylı üretim → yayın → aylık rapor.",
  };

  return `
<h2>${name} sosyal medya yönetimi nedir?</h2>
<p>${name}, ${p.character}. Trabzon Sosyal Medya (Wesoco) olarak ${name} işletmelerine Instagram yönetimi, içerik üretimi, reels, Meta Ads ve gerektiğinde Google Ads ile yerel büyüme planı sunarız. Amaç rastgele paylaşım değil; doğru kitleye tutarlı mesaj ve ölçülebilir dönüşümdür.</p>

<h2>Neden ${name}’da kritik?</h2>
<ul>
<li>Cadde trafiği kadar dijital vitrin müşteri kararını etkiler.</li>
<li>Komşu bölgeler (${p.neighbors}) rekabet ve fırsat alanıdır.</li>
<li>Google Benim İşletmem + sosyal kanıt güveni artırır.</li>
<li>Organik keşfet tek başına yetmez; gerektiğinde reklam desteklenir.</li>
</ul>

<h2>${name} için içerik yaklaşımı</h2>
<p>Öne çıkan sektörler: ${p.sectors}. ${p.angle}</p>
<p>İçerikte mahalle/konum etiketleri, gerçek mekân ve ekip görselleri tercih edilir. Stok görsel tek başına güven üretmez; özgün çekim fark yaratır.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Keşif: hesap audit, rakip, hedef kitle.</li>
<li>Strateji: ${name}’a özel dil, takvim, KPI.</li>
<li>Üretim: yerinde veya planlı stok; reels öncelikli.</li>
<li>Yayın + reklam: konum ve ilgi alanı testleri.</li>
<li>Rapor: erişim, mesaj/arama, sonraki ay aksiyonları.</li>
</ol>
<p>${p.process} Medya bütçesi ajans ücretinden ayrı ve şeffaf raporlanır.</p>

<h2>Kimler için?</h2>
<p>${p.sectors} başta olmak üzere dijitalden müşteri, randevu veya marka güveni arayan ${name} işletmeleri. Uzaktan yönetim + planlı çekim günleri pratiktir.</p>

<h2>Fiyat mantığı</h2>
<p>Platform, içerik hacmi, çekim ve reklam yönetimine göre keşif sonrası tekliflenir. Uydurma fiyat listesi yoktur.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>${name}: organik vs destekli</caption>
<thead><tr><th>Ölçüt</th><th>Yalnız organik</th><th>Organik + reklam</th></tr></thead>
<tbody>
<tr><td>Hız</td><td>Kademeli</td><td>Daha hızlı öğrenme</td></tr>
<tr><td>Hedefleme</td><td>Sınırlı</td><td>${name} + çevre</td></tr>
<tr><td>Ölçek</td><td>Yavaş</td><td>Kazanan kreatif ile</td></tr>
</tbody></table></div>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a>, <a href="/hizmetler/meta-ads">Meta Ads</a>, <a href="/bolgeler">diğer ilçeler</a>, <a href="/blog">blog</a>.</p>

<h2>Sonuç</h2>
<p>${name} için <a href="/#iletisim">ücretsiz keşif</a> alın. 24 saat içinde dönüş yapılır.</p>
`.trim();
}

function districtFaqs(name: string, neighbors: string) {
  return [
    { q: `${name}’da sosyal medya yönetimi yapıyor musunuz?`, a: `Evet. ${name} ve tüm Trabzon ilçelerinde hizmet veriyoruz.` },
    { q: "Yerinde çekim olur mu?", a: `Evet. ${name} ve çevresinde (${neighbors}) planlı çekim yapılabilir.` },
    { q: "Ne kadar sürer?", a: "Strateji 1. 2 haftada netleşir; anlamlı sonuçlar genelde 30. 90 günde görülür." },
    { q: "Fiyat nedir?", a: "Kapsama göre keşif sonrası teklif. Medya ayrıdır." },
    { q: "Nasıl başlarız?", a: "Form veya WhatsApp ile ücretsiz keşif." },
  ];
}

async function main() {
  // Hizmet içerikleri şablonla EZİLMEZ  özgün üretim: npx tsx prisma/seed-services-unique.ts
  // (serviceBody / serviceFaqs aşağıda referans olarak durur; DB’ye yazılmaz)
  console.log("Services skipped (use prisma/seed-services-unique.ts as source of truth).");

  // İlçe içerikleri kopya şablonla EZİLMEZ  özgün üretim: npm run db:seed-districts
  console.log("Districts skipped (use db:seed-districts for unique cluster content).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
