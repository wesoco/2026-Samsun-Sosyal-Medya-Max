/**
 * 18 ilçe - master SEO/GEO/AEO uyumlu, birbirinden bağımsız içerik.
 * Ortak şablon cümle YOK. Her sayfa kendi yerel niyetiyle yazıldı.
 *
 *   npm run db:seed-districts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Faq = { q: string; a: string };

type DistrictPage = {
  slug: string;
  name: string;
  regionLabel: string;
  /** Answer-first 40-60 kelime → lead + AnswerBox */
  answer: string;
  seoTitle: string;
  seoDesc: string;
  bodyHtml: string;
  faqs: Faq[];
};

const PAGES: DistrictPage[] = [
  {
    slug: "ortahisar",
    name: "Ortahisar",
    regionLabel: "Trabzon merkez",
    answer:
      "Ortahisar sosyal medya yönetimi; Trabzon merkezindeki klinik, perakende, kafe ve bayi işletmeleri için Instagram, reels ve mahalle hedeflemeli Meta Ads’i aynı planda yürütmektir. Wesoco bünyesinde Trabzon Sosyal Medya, cadde rekabetine göre içerik takvimi ve ölçülebilir dönüşüm kurar.",
    seoTitle: "Ortahisar Sosyal Medya Yönetimi | Trabzon Merkez Ajans",
    seoDesc:
      "Ortahisar’da Instagram yönetimi, reels ve Meta Ads. Klinik, perakende ve cadde işletmeleri için yerel sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Ortahisar’da sosyal medya yönetimi nedir?</h2>
<p>Ortahisar’da sosyal medya yönetimi; hesapları rastgele doldurmak değil, merkez müşterisinin karar anına (randevu, mağaza ziyareti, mesaj) göre içerik ve reklam üretmektir. Instagram vitrini, story ritmi ve gerektiğinde Meta Ads aynı hedefle ilerler. Google Benim İşletmem bilgileriyle NAP tutarlılığı da güveni güçlendirir.</p>

<h2>Neden Ortahisar’da kritik?</h2>
<p>Merkezde aynı cadde üzerinde onlarca rakip hesap vardır. Yalnızca “güzel post” yetmez; kimlik, teklif ve konum hedeflemesi net olmalıdır. Kliniklerde güven, perakendede ürün grid’i, otomotivde lansman/reels seti ayrı dil ister. Akçaabat ve Yomra spillover’ı da reklam planına girebilir.</p>
<ul>
<li>Cadde + dijital keşif birlikte satın alma kararı verir.</li>
<li>Rakip hesaplar sık sık aynı mahalle kitlesine reklam açar.</li>
<li>Yanlış kreatif = yükselen mesaj maliyeti.</li>
</ul>

<h2>Ortahisar’da nasıl çalışırız?</h2>
<ol>
<li><strong>Cadde audit:</strong> Rakip hesaplar, mevcut reklam geçmişi, bio/vitrin.</li>
<li><strong>Dil + takvim:</strong> Sektöre özel mesaj, haftalık reels/story planı.</li>
<li><strong>Üretim:</strong> Yerinde veya planlı çekim; stok şablon yok.</li>
<li><strong>Yayın + Ads:</strong> Mahalle ve ilgi alanı testleri; medya ayrı rapor.</li>
<li><strong>Aylık skor:</strong> Erişim, mesaj/arama, üç net aksiyon.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Uzun Sk. / Gazipaşa hattı perakendesi, güzellik klinikleri, kafeler, bayiler ve kurumsal ofisler. Küçük ekiplerde onay hattı WhatsApp ile hızlı kurulur; kurumsalda yazılı onay katmanı eklenir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Ortahisar: dağınık paylaşım vs planlı yönetim</caption>
<thead><tr><th>Ölçüt</th><th>Dağınık</th><th>Planlı (bizim model)</th></tr></thead>
<tbody>
<tr><td>Vitrin</td><td>Tutarsız</td><td>Sektöre özel grid</td></tr>
<tr><td>Reklam</td><td>Tesadüfi</td><td>Mahalle + test. ölçek</td></tr>
<tr><td>Rapor</td><td>Yok / geç</td><td>Aksiyonlu aylık</td></tr>
</tbody></table></div>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, içerik hacmi, yerinde çekim ve reklam yönetimine göre keşif sonrası tekliflenir. Medya harcaması ajans ücretinden ayrıdır; uydurma paket fiyatı yazılmaz.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Ortahisar işletmeniz için ücretsiz keşif.</h2>
  <p>Mevcut hesaplarınıza bakalım; merkeze özel net bir yol haritası çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Ortahisar’da hangi sektörlere odaklanıyorsunuz?",
        a: "Klinik, perakende, kafe/restoran, otomotiv bayi ve kurumsal ofisler. Her sektörün içerik dili ayrı kurulur.",
      },
      {
        q: "Merkezde Meta Ads maliyeti neden yükselir?",
        a: "Rekabet yoğundur. Doğru kitle, kreatife dinlenme ve mahalle katmanlarıyla maliyet kontrol edilir; medya şeffaf raporlanır.",
      },
      {
        q: "Sadece Instagram yeterli mi?",
        a: "Çoğu B2C için omurgadır. Form/arama hedefi varsa Meta Ads veya Google Ads eklenir.",
      },
      {
        q: "Keşif ücretli mi?",
        a: "Hayır. Ortahisar işletmeniz için ücretsiz keşif planlanır; 24 saat içinde dönüş yapılır.",
      },
    ],
  },

  {
    slug: "akcaabat",
    name: "Akçaabat",
    regionLabel: "Batı koridoru",
    answer:
      "Akçaabat sosyal medya yönetimi; sahil esnafı ve restoranlar için iştah görselleri, usta hikâyesi ve konum odaklı reklam demektir. Menü/story ritmiyle mahalle güvenini dijitalde büyütürüz. Wesoco güvencesiyle Trabzon Sosyal Medya.",
    seoTitle: "Akçaabat Sosyal Medya Yönetimi | Restoran & Yerel Esnaf",
    seoDesc:
      "Akçaabat’ta Instagram, reels ve konum reklamı. Restoran, kafe ve yerel işletmeler için sosyal medya ajansı · Wesoco Trabzon.",
    bodyHtml: `
<h2>Akçaabat sosyal medya yönetimi nedir?</h2>
<p>Akçaabat’ta yönetim; lezzet ve mahalle sadakatini görsele çevirip rezervasyon veya paket servise bağlamaktır. Instagram story temposu yüksektir; reels keşfeti, Meta Ads ise Akçaabat + batı sahil kuşağını hedefler. Abartılı “şehir ajansı” dili tutmaz. samimi ve yerel anlatım işe yarar.</p>

<h2>Neden Akçaabat’ta farklı yapılır?</h2>
<p>İlçe kimliği lezzetle özdeşleşir. Stok tabak fotoğrafı yerine gerçek mutfak, usta ve günün ürünü etkileşimi artırır. Çarşıbaşı. Vakfıkebir hattı hem rekabet hem müşteri havuzudur; reklam coğrafyası buna göre açılır.</p>

<h2>Restoran ve esnaf için nasıl ilerleriz?</h2>
<ol>
<li>Menü ve servis CTA’sını netleştiririz (rezervasyon / paket / adres).</li>
<li>Haftalık story + reels seti: iştah, ekip, kampanya.</li>
<li>Yoğun akşam/hafta sonu için önceden stoğa alınmış içerik.</li>
<li>Konum reklamı ile mahalle ve komşu sahil testi.</li>
</ol>

<h2>Kimler için?</h2>
<p>Restoran, kafe, market, tarım/yerel ürün ve mahalle hizmet işletmeleri. Küçük mutfak ekiplerinde çekim sakin saatlere alınır; onay hızlı tutulur.</p>

<h2>Fiyat mantığı</h2>
<p>Çekim günü sayısı, reels hacmi ve reklam yönetimine göre değişir. Keşif sonrası net teklif; medya ayrı satırdır.</p>

<h2>Bağlantılar</h2>
<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik & çekim</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/carsibasi">Çarşıbaşı</a></p>

<div class="page-cta">
  <h2>Akçaabat için ücretsiz keşif.</h2>
  <p>Menü ve hesabınıza bakalım; sahile özel ritim çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Akçaabat restoranında öncelik nedir?",
        a: "İştah görseli, düzenli reels ve konum odaklı reklam. Rezervasyon/paket CTA’sı bio ve story’de net olmalı.",
      },
      {
        q: "Yerel ağız / dil kullanılır mı?",
        a: "Evet, abartısız ve samimi. Kopya slogan tutmaz; Akçaabat’a özgü anlatım etkileşimi artırır.",
      },
      {
        q: "Çekim ne zaman yapılır?",
        a: "İşletme yoğunluğuna göre sabah veya hafta içi sakin saatler tercih edilir.",
      },
      {
        q: "Ücretsiz keşif var mı?",
        a: "Var. Form veya WhatsApp ile planlanır.",
      },
    ],
  },

  {
    slug: "yomra",
    name: "Yomra",
    regionLabel: "Doğu koridoru",
    answer:
      "Yomra sosyal medya yönetimi; büyüyen konut ve ticaret koridorunda emlak, inşaat ve yeni işletmeler için proje güveni, drone/geniş açı ve niyetli Google Ads’i birleştirir. Lansman takvimini içerik + reklam aynı haftada kurarız.",
    seoTitle: "Yomra Sosyal Medya Yönetimi | Emlak, İnşaat & Lansman",
    seoDesc:
      "Yomra’da proje lansmanı, drone, Instagram ve Google Ads. Emlak ve inşaat için Trabzon doğu koridoru sosyal medya ajansı.",
    bodyHtml: `
<h2>Yomra’da sosyal medya yönetimi nedir?</h2>
<p>Yomra’da amaç; yeni yerleşim ve hizmet talebini proje veya işletme güvenine bağlamaktır. Şantiye/süreç anlatımı, drone veya geniş plan, kliniklerde güven içerikleri ve Google’da “Yomra + hizmet” aramaları aynı stratejide birleşebilir.</p>

<h2>Neden Yomra koridoru özel plan ister?</h2>
<p>Hızlı büyüyen talep, sık lansman ve Ortahisar. Arsin. Araklı hattında hareketli bir kitle demektir. “Cadde esnafı” şablonu yetmez; karar vericiye ölçek ve konum göstermek gerekir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Yomra lansman iletişimi</caption>
<thead><tr><th>Kanal</th><th>Rol</th></tr></thead>
<tbody>
<tr><td>Instagram / reels</td><td>Görünürlük, şantiye/ürün hikâyesi</td></tr>
<tr><td>Meta Ads</td><td>Proje ilgi alanı + remarketing</td></tr>
<tr><td>Google Ads</td><td>Niyetli arama (“Yomra emlak”, hizmet)</td></tr>
<tr><td>Drone</td><td>Ölçek ve konum avantajı</td></tr>
</tbody></table></div>

<h2>Nasıl ilerleriz?</h2>
<ol>
<li>Lansman tarihi ve teklif mesajını kilitleriz.</li>
<li>2. 3 hafta öncesinden görsel stok (drone dahil) üretiriz.</li>
<li>Açılış haftasında organik + reklam ölçeği açılır.</li>
<li>Remarketing, site/form ziyaretçilerine ayrı satırda tutulur.</li>
</ol>

<h2>Kimler için?</h2>
<p>Emlak ofisleri, inşaat firmaları, yeni kafe/klinik ve yerel hizmetler. Yeni açılan işletmelerde ilk 90 gün kimlik + test reklamı önerilir.</p>

<h2>Fiyat</h2>
<p>Drone, lansman hacmi ve Google Ads yönetimine göre keşif sonrası. Medya ayrıdır.</p>

<p><a href="/hizmetler/drone-cekimi">Drone çekimi</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/arsin">Arsin</a></p>

<div class="page-cta">
  <h2>Yomra projesi için keşif.</h2>
  <p>Lansman takviminize göre net plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Yomra’da drone şart mı?",
        a: "Zorunlu değil; konum ve ölçek anlatımında güçlü fark yaratır. Pakete göre planlanır.",
      },
      {
        q: "Yeni işletme için ne önerirsiniz?",
        a: "İlk 90 günde kimlik, içerik stoğu ve düşük bütçeli test reklamı.",
      },
      {
        q: "Google Ads ne zaman eklenir?",
        a: "Arama niyeti (randevu, satış, keşif) netse. Dönüşüm izleme olmadan ölçeklenmez.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "of",
    name: "Of",
    regionLabel: "Doğu sahil",
    answer:
      "Of sosyal medya yönetimi; doğu sahil ticaret temposuna uygun düzenli Instagram vitrini ve Of + sahil kuşağı Meta Ads demektir. Restoran, perakende ve hizmet işletmelerine uzaktan yönetim veya periyodik çekim sunarız.",
    seoTitle: "Of Sosyal Medya Yönetimi | Doğu Sahil Trabzon",
    seoDesc:
      "Of’ta Instagram yönetimi, story ritmi ve konum reklamı. Doğu sahil işletmeleri için Trabzon sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Of’ta sosyal medya yönetimi nedir?</h2>
<p>Of’ta yönetim; günlük ticaret ve sahil işletme ritmine ayak uyduran yayın disiplinidir. Story ile anlık duyuru, reels ile keşfet, reklamda Of. Sürmene. Araklı kuşağı düşünülür. Turizm sezonunda Çaykara spillover’ı dikkatli test edilir; Of sayfası yayla oteli diline öykünmez.</p>

<h2>Neden Of’ta düzenli vitrin şart?</h2>
<p>Geçiş ve ticaret noktası olduğu için müşteri hem yerelden hem komşu ilçelerden gelir. Eksik NAP, eski menü görseli veya ölü hesap güveni düşürür. Taze ürün ve hızlı duyuru özellikle balık/sahil işletmelerinde dönüşüm üretir.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Uzaktan onaylı yayın + gerektiğinde Of’ta çekim günü</li>
<li>Haftalık story temposu; aylık reels seti</li>
<li>Konum reklamı: Of merkez, sonra komşu sahil</li>
<li>Aylık sade rapor: erişim ve mesaj/arama</li>
</ul>

<h2>Kimler için?</h2>
<p>Sahil işletmeleri, restoranlar, perakende ve yerel hizmet. Balıkçı restoranda taze ürün görseli ve aynı gün story kritiktir.</p>

<h2>Fiyat</h2>
<p>Uzaktan paket ile yerinde çekimli paket ayrılır. Keşif sonrası netleşir; medya ayrıdır.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/surmene">Sürmene</a> · <a href="/bolgeler/arakli">Araklı</a></p>

<div class="page-cta">
  <h2>Of işletmeniz için yazın.</h2>
  <p>Hesabınıza bakıp sahile uygun ritim önerelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Of’tan uzaktan yönetim olur mu?",
        a: "Evet. İçerik onaylı yayınlanır; gerektiğinde yerinde çekim planlanır.",
      },
      {
        q: "Balıkçı / sahil işletmesi için ne önemli?",
        a: "Taze ürün görseli, hızlı story ve konum hedeflemeli reklam.",
      },
      {
        q: "Çaykara turizmine reklam verilir mi?",
        a: "İşletme tipine göre dikkatli test edilir; Of ticaret kimliği bozulmaz.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "arakli",
    name: "Araklı",
    regionLabel: "Doğu sahil",
    answer:
      "Araklı sosyal medya yönetimi; mahalle güveni ve tutarlı dijital vitrinle küçük-orta esnafı büyütmektir. Önce sürdürülebilir Instagram ritmi, sonra düşük bütçeli konum reklamı. abartılı 360 paket dayatması yok.",
    seoTitle: "Araklı Sosyal Medya Yönetimi | Esnaf & Yerel İşletme",
    seoDesc:
      "Araklı’da Instagram vitrini, reels ve konum reklamı. Küçük esnaf için ölçeklenebilir Trabzon sosyal medya yönetimi · Wesoco.",
    bodyHtml: `
<h2>Araklı’da sosyal medya yönetimi nedir?</h2>
<p>Araklı’da hedef; tanıdık yüz + dijitalde düzenli vitrin kombinasyonudur. İşletme hikâyesi, ürün yakın planı ve haftalık kampanya story’si omurgadır. Sürmene. Yomra. Of üçgeni reklamda genişletilebilir.</p>

<h2>Neden sade paketle başlanır?</h2>
<p>Küçük ekiplerde sürdürülemeyen “her gün viral” planı zarar verir. Önce bio, grid ve net CTA; organik ritim oturunca reklam eklenir. Kurumsal jargon yerine anlaşılır dil kullanılır.</p>

<h2>Nasıl ilerleriz?</h2>
<ol>
<li>Hesap ve rakip hızlı audit</li>
<li>Haftalık sürdürülebilir takvim</li>
<li>Planlı çekim veya mevcut görsellerle tasarım</li>
<li>İsteğe bağlı Araklı + komşu sahil Ads testi</li>
</ol>

<h2>Kimler için?</h2>
<p>Perakende, kafe/restoran, atölye ve hizmet işletmeleri.</p>

<h2>Fiyat</h2>
<p>İçerik hacmine göre ölçeklenir. Büyüdükçe çekim ve reklam katmanı eklenir.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/bolgeler/of">Of</a></p>

<div class="page-cta">
  <h2>Araklı için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Küçük esnaf paketi var mı?",
        a: "Evet. Platform ve hacme göre başlanır; büyüdükçe reklam/çekim eklenir.",
      },
      {
        q: "Çekim Araklı’da yapılır mı?",
        a: "Evet. Planlı yerinde çekim veya mevcut görsellerle üretim mümkün.",
      },
      {
        q: "Reklam şart mı?",
        a: "Hayır. Organik ritim sonrası düşük test çoğu zaman yeterlidir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "surmene",
    name: "Sürmene",
    regionLabel: "Doğu sahil",
    answer:
      "Sürmene sosyal medya yönetimi; zanaat ve imalat hikâyesini B2B güven diline çevirmektir. Atölye sahneleri, ürün detayı ve referans anlatımıyla markayı güçlendiririz. sahil restoran şablonuna indirgemeyiz.",
    seoTitle: "Sürmene Sosyal Medya Yönetimi | İmalat & Zanaat",
    seoDesc:
      "Sürmene’de üretim hikâyesi, kurumsal Instagram ve B2B görünürlük. İmalat ve atölye için Trabzon sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Sürmene’de sosyal medya yönetimi nedir?</h2>
<p>Sürmene’de yönetim; üretim kalitesi ve güveni görünür kılmaktır. Atölye videosu, makro ürün çekimi, ekip ve teslim hikâyeleri öne çıkar. LinkedIn veya daha kurumsal Instagram dili seçilebilir; Meta Ads’te yerel + sektörel katman kullanılır.</p>

<h2>Neden üretim görseli kritik?</h2>
<p>Stok fotoğraf B2B’de güven üretmez. Of. Araklı. Köprübaşı hattı iş ve müşteri ağıdır; referans ve süreç şeffaflığı dönüşüm metrikleridir.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Kurumsal onay hattı ve kriz protokolü netleştirilir.</li>
<li>Üretim gününe göre çekim planlanır.</li>
<li>İçerik dili abartılı vaatten uzak tutulur.</li>
<li>Aylık skor kartı: erişim + nitelikli mesaj/form.</li>
</ol>

<h2>Kimler için?</h2>
<p>İmalat, atölye, perakende ve yerel hizmet; B2B görünürlük isteyen firmalar.</p>

<h2>Fiyat</h2>
<p>Onay katmanı, çekim ve kanal sayısına göre. Keşif sonrası teklif.</p>

<p><a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">Kurumsal sosyal medya</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/bolgeler/koprubasi">Köprübaşı</a></p>

<div class="page-cta">
  <h2>Sürmene firmanız için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "İmalat firması için sosyal medya işe yarar mı?",
        a: "Evet. Üretim kalitesi, referans ve B2B görünürlük için güçlü kanaldır.",
      },
      {
        q: "Kurumsal paket nasıl işler?",
        a: "Yazılı onay, kriz protokolü ve aylık skor kartı ile yönetilir.",
      },
      {
        q: "LinkedIn şart mı?",
        a: "Zorunlu değil; B2B’de sık eklenir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "arsin",
    name: "Arsin",
    regionLabel: "Doğu koridoru",
    answer:
      "Arsin sosyal medya yönetimi; OSB ve B2B güven iletişimidir. Referans, süreç ve standartlar; tüketici reels trendlerinden ayrı bir editoryal ritim ister. LinkedIn, Instagram ve Google Ads ihtiyaca göre seçilir.",
    seoTitle: "Arsin Sosyal Medya Yönetimi | OSB & B2B",
    seoDesc:
      "Arsin’de kurumsal sosyal medya, LinkedIn ve Google Ads. OSB firmaları için Trabzon B2B dijital iletişim · Wesoco.",
    bodyHtml: `
<h2>Arsin’de sosyal medya yönetimi nedir?</h2>
<p>Arsin’de amaç karar vericiye güven vermektir. Fabrika/saha görselleri, ekip, sertifika/standart ve proje teslimi anlatılır. “Viral reels” hedefi dayatılmaz; form ve arama odaklı kampanyalar öne çıkar.</p>

<h2>Neden B2B dili ayrıdır?</h2>
<p>Sanayi ve lojistik çevresi tüketici dilinden farklıdır. Yomra. Ortahisar hattı tedarik ve görünürlük alanıdır. Abartılı vaat kurumsal itibarı zedeler.</p>

<h2>Nasıl ilerleriz?</h2>
<ol>
<li>Onay hatları ve mesaj kısıtları yazılır.</li>
<li>Kanal karışımı: LinkedIn ve/veya Instagram + Google Ads.</li>
<li>Saha çekimi planlı; güvenlik kurallarına uygun.</li>
<li>Rapor: nitelikli lead / form, değil vanity like.</li>
</ol>

<h2>Kimler için?</h2>
<p>Sanayi, lojistik, B2B hizmet ve lokal ticaret firmaları.</p>

<h2>Fiyat</h2>
<p>Kanal sayısı ve onay derinliğine göre. Medya ayrıdır.</p>

<p><a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">Kurumsal yönetim</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/bolgeler/yomra">Yomra</a></p>

<div class="page-cta">
  <h2>Arsin OSB / firmanız için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "OSB için LinkedIn şart mı?",
        a: "Zorunlu değil ama B2B görünürlükte çok etkilidir.",
      },
      {
        q: "B2B reklam nasıl çalışır?",
        a: "Mesaj/form ve arama odaklı; karar verici kitleye göre hedefleme.",
      },
      {
        q: "Saha çekimi güvenli mi planlanır?",
        a: "Evet. Firma kurallarına göre shot list ve izinle ilerlenir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "vakfikebir",
    name: "Vakfıkebir",
    regionLabel: "Batı sahil",
    answer:
      "Vakfıkebir sosyal medya yönetimi; fırın, gastronomi ve pazar kültürünü ürün kahramanı görsellerle satışa bağlamaktır. Coğrafi işaret çağrışımları abartılmadan, hijyen ve iştah dengesiyle işlenir.",
    seoTitle: "Vakfıkebir Sosyal Medya Yönetimi | Gastronomi & Fırın",
    seoDesc:
      "Vakfıkebir’de ürün fotoğrafı, reels ve konum reklamı. Fırın ve gıda işletmeleri için Trabzon sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Vakfıkebir’de sosyal medya yönetimi nedir?</h2>
<p>Vakfıkebir’de yönetim; ekmek ve gastronomi kimliğini güncel satış kanalına (tezgahtan DM’ye) taşımaktır. Fırın arkası, ürün yakın planı ve pazar günü story’si doğal kampanya üretir. Beşikdüzü. Çarşıbaşı hattı müşteri ve tedarik bağını taşır.</p>

<h2>Neden ürün kahramanı kritik?</h2>
<p>Turistik nostalji tek başına sipariş getirmez. Hijyen algısı, taze çıkış anı ve net CTA (paket, adres, saat) dönüşümü büyütür.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Ürün makro + üretim videosu</li>
<li>Sezonluk/bayram öncesi stok artışı</li>
<li>Batı sahil konum + ilgi Ads testi</li>
<li>Pazar yoğunluğuna özel story planı</li>
</ul>

<h2>Kimler için?</h2>
<p>Fırın, market, restoran ve yerel gıda ticareti.</p>

<h2>Fiyat</h2>
<p>Çekim ve kampanya yoğunluğuna göre. Keşif sonrası teklif.</p>

<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik & çekim</a> · <a href="/bolgeler/besikduzu">Beşikdüzü</a> · <a href="/bolgeler/akcaabat">Akçaabat</a></p>

<div class="page-cta">
  <h2>Vakfıkebir işletmeniz için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Fırın için neye odaklanıyorsunuz?",
        a: "İştah, hijyen algısı, düzenli story ve konum reklamı.",
      },
      {
        q: "Pazar günü özel içerik olur mu?",
        a: "Evet. Yoğun günler için story ve kısa reels planı çıkarılır.",
      },
      {
        q: "Coğrafi işaret dili nasıl kullanılır?",
        a: "Abartısız ve doğru; yanıltıcı iddia üretilmez.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "besikduzu",
    name: "Beşikdüzü",
    regionLabel: "Batı sahil",
    answer:
      "Beşikdüzü sosyal medya yönetimi; yazlık ve sahil turizminde sezonu kaçırmayan erken içerik + rezervasyon reklamıdır. Kışın bilinirlik, yazın dönüşüm. 12 ay aynı ritim dayatılmaz.",
    seoTitle: "Beşikdüzü Sosyal Medya Yönetimi | Sahil & Konaklama",
    seoDesc:
      "Beşikdüzü’nde sezonluk Instagram, drone ve rezervasyon Ads. Otel, pansiyon ve sahil işletmeleri için Trabzon ajansı · Wesoco.",
    bodyHtml: `
<h2>Beşikdüzü’nde sosyal medya yönetimi nedir?</h2>
<p>Beşikdüzü’nde yönetim; sezon dalgalanmasına göre içerik ve reklam ağırlığını değiştirmektir. Sahil/drone, oda turu ve menü setleri sezon öncesi stoğa alınır; yazın Meta/Google ile erken rezervasyon ölçeklenir.</p>

<h2>Neden sezon planı şart?</h2>
<p>Yazlık talep ani yükselir. Kışın sessiz hesap, yazın yetişmeyen içerik demektir. Vakfıkebir. Şalpazarı komşuluğu hem müşteri hem tedarik bağını etkiler.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Beşikdüzü sezon dengesi</caption>
<thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Kış / düşük sezon</td><td>Marka, stok, erken rezervasyon mesajı</td></tr>
<tr><td>Yaz / yüksek sezon</td><td>Dönüşüm Ads, hızlı yanıt, story hızı</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Sezon takvimi keşifte çıkarılır.</li>
<li>Drone ve konaklama çekimi planlanır.</li>
<li>Sezon öncesi organik stok tamamlanır.</li>
<li>Sezon içi reklam ve yanıt süresi artırılır.</li>
</ol>

<h2>Kimler için?</h2>
<p>Otel, pansiyon, kafe, restoran ve sahil hizmetleri.</p>

<h2>Fiyat</h2>
<p>Sezonluk hacim farkı teklifte şeffaf gösterilir. Medya ayrıdır.</p>

<p><a href="/hizmetler/drone-cekimi">Drone</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/google-ads">Google Ads</a></p>

<div class="page-cta">
  <h2>Beşikdüzü sezon planı için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Sezonluk paket nasıl olur?",
        a: "Yoğun sezonda içerik/reklam artar; düşük sezonda temel ritim korunur.",
      },
      {
        q: "Drone yapılır mı?",
        a: "Evet. Sahil ve konaklama için planlı drone sunuyoruz.",
      },
      {
        q: "Kışın reklam gerekir mi?",
        a: "Çoğunlukla bilinirlik ve erken rezervasyon için düşük ölçek yeterlidir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "macka",
    name: "Maçka",
    regionLabel: "Yayla ve turizm",
    answer:
      "Maçka sosyal medya yönetimi; Sümela ve yayla deneyimini konaklama işletmesine özel görsel dille anlatmaktır. Sezon takvimi, drone/reels ve erken rezervasyon Ads birlikte planlanır. jenerik yayla stoğu kullanılmaz.",
    seoTitle: "Maçka Sosyal Medya Yönetimi | Yayla & Turizm",
    seoDesc:
      "Maçka’da otel/pansiyon için drone, reels ve sezon reklamı. Sümela hattı turizm işletmeleri · Trabzon Sosyal Medya · Wesoco.",
    bodyHtml: `
<h2>Maçka’da sosyal medya yönetimi nedir?</h2>
<p>Maçka’da yönetim; doğa, kültür ve konforu işletmenin kendi farkıyla göstermektir. Manzara/drone, oda turu, kahvaltı ve etkinlik içerikleri sezon öncesi üretilir. Sümela ve doğal alanlar etik çerçevede, markanın deneyimine bağlı kullanılır.</p>

<h2>Neden özgün dil şart?</h2>
<p>Aynı manzara stoğu herkesde vardır. Fark; hijyen, yemek, erişim ve misafir yolu anlatımındadır. Ortahisar çıkışlı günübirlik + konaklamalı kitle ayrı hedeflenebilir.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Sezon ve hafta sonu yoğunluğu takvime işlenir.</li>
<li>Hava/ışık penceresine göre çekim planlanır.</li>
<li>Sezon öncesi stok; sezon içi dönüşüm Ads.</li>
<li>Remarketing site ziyaretçilerine açılır.</li>
</ol>

<h2>Kimler için?</h2>
<p>Otel, pansiyon, restoran ve doğa deneyimi işletmeleri.</p>

<h2>Fiyat</h2>
<p>Drone ve sezon hacmine göre. Keşif sonrası teklif.</p>

<p><a href="/hizmetler/drone-cekimi">Drone</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/caykara">Çaykara</a> · <a href="/bolgeler/duzkoy">Düzköy</a></p>

<div class="page-cta">
  <h2>Maçka konaklamanız için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Sümela görseli kullanır mısınız?",
        a: "Etik çerçevede ve işletme deneyimine bağlı özgün içerikle. Şablon stoğa yaslanmayız.",
      },
      {
        q: "Hangi platform öncelikli?",
        a: "Çoğunlukla Instagram + Meta Ads; isteğe Google arama eklenir.",
      },
      {
        q: "Hafta sonu yoğunluğu nasıl yönetilir?",
        a: "Önceden stok + hızlı story ritmi ve rezervasyon CTA’sı.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "caykara",
    name: "Çaykara",
    regionLabel: "Yayla turizmi",
    answer:
      "Çaykara (Uzungöl hattı) sosyal medya yönetimi; yüksek rekabette özgün konaklama dili ve erken rezervasyondur. Şablon göl fotoğrafı yarışı yerine oda detayı, ekip ve misafir deneyimiyle öne çıkarırız.",
    seoTitle: "Çaykara Sosyal Medya Yönetimi | Uzungöl Konaklama",
    seoDesc:
      "Çaykara / Uzungöl’de otel ve bungalov için reels, kapak görseli ve sezon öncesi reklam. Trabzon yayla turizmi ajansı · Wesoco.",
    bodyHtml: `
<h2>Çaykara’da sosyal medya yönetimi nedir?</h2>
<p>Çaykara’da yönetim; Uzungöl rekabetinde işletmeyi ayırt edilebilir kılmaktır. Oda/ortak alan reels’i, kahvaltı, yağmur-güneş atmosferi ve rezervasyon kolaylığı anlatılır. Sezon öncesi stok + retargeting doluluk için kritiktir.</p>

<h2>Neden “daha güzel göl” yetmez?</h2>
<p>Görsel rekabet yoğundur. Kazanan; hijyen, oda detayı ve net rezervasyon yoludur. Of. Dernekpazarı. Hayrat kuşağı lojistik ve müşteri taşır.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Rakip taraması ve kapak görseli yenileme</li>
<li>Oda/ortam reels seti</li>
<li>Sezon öncesi Ads + retargeting</li>
<li>Yoğun sezonda yanıt süresi ve story hızı artışı</li>
<li>Kış: marka + erken rezervasyon mesajı</li>
</ol>

<h2>Kimler için?</h2>
<p>Otel, bungalov, restoran, tur ve yerel hizmet.</p>

<h2>Fiyat</h2>
<p>Sezon öncesi üretim yoğunluğu teklifte belirtilir. Medya ayrıdır.</p>

<p><a href="/hizmetler/drone-cekimi">Drone</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/dernekpazari">Dernekpazarı</a></p>

<div class="page-cta">
  <h2>Çaykara / Uzungöl için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Uzungöl otelleri için ne önerirsiniz?",
        a: "Güçlü kapak, oda reels’leri ve sezon öncesi reklam. Keşifte rakip taraması yapılır.",
      },
      {
        q: "Çok rakip varken nasıl öne çıkılır?",
        a: "Şablon manzara yerine işletmeye özgü detay, ekip ve deneyimle.",
      },
      {
        q: "Kış planı nedir?",
        a: "Marka bilinirliği ve erken rezervasyon; yazda dönüşüm ölçeği.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "tonya",
    name: "Tonya",
    regionLabel: "İç kesim",
    answer:
      "Tonya sosyal medya yönetimi; süt, tarım ve yerel üretim hikâyesini güvenle anlatmaktır. Küçük üreticiye sade Instagram vitrini ve üretim günü çekimi. şehir restoran reels şablonu dayatılmaz.",
    seoTitle: "Tonya Sosyal Medya Yönetimi | Yerel Üretim & Gıda",
    seoDesc:
      "Tonya’da üretim hikâyesi, ürün fotoğrafı ve sade Instagram yönetimi. Tarım/gıda üreticileri için Trabzon ajansı · Wesoco.",
    bodyHtml: `
<h2>Tonya’da sosyal medya yönetimi nedir?</h2>
<p>Tonya’da yönetim; üretim süreci, ürün makro ve aile/işletme hikâyesini görünür kılmaktır. Samimi dil; gerektiğinde Vakfıkebir. Düzköy. Maçka hattına düşük bütçeli Ads açılır.</p>

<h2>Neden üretim günü çekimi önemli?</h2>
<p>Stok görsel güven üretmez. Dağıtım ve sipariş hedefi varsa reklam eklenir; yoksa organik vitrin çoğu zaman yeterlidir.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Sade haftalık ritim</li>
<li>Üretim gününe göre çekim</li>
<li>Net sipariş/iletişim CTA’sı</li>
<li>İsteğe bağlı iç kesim Ads</li>
</ul>

<h2>Kimler için?</h2>
<p>Gıda, tarım, yerel üretim ve küçük ticaret.</p>

<h2>Fiyat</h2>
<p>Minimal paketle başlanır. Keşif sonrası netleşir.</p>

<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/vakfikebir">Vakfıkebir</a></p>

<div class="page-cta">
  <h2>Tonya üretiminiz için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Gıda üreticisi reklam kullanmalı mı?",
        a: "Organikle başlanabilir; sipariş/dağıtım hedefi varsa düşük test eklenir.",
      },
      {
        q: "Tonya’da çekim olur mu?",
        a: "Evet. Üretim gününe göre planlanır.",
      },
      {
        q: "Ne sıklıkta içerik?",
        a: "Sürdürülebilir haftalık ritim; keşifte netleşir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "carsibasi",
    name: "Çarşıbaşı",
    regionLabel: "Batı sahil",
    answer:
      "Çarşıbaşı sosyal medya yönetimi; taze ürün ve balık/sahil esnaf temposuna uygun hızlı story + dürüst vitrindir. Günlük ürün anlatımı, yavaş kurumsal dilden daha çok işe yarar.",
    seoTitle: "Çarşıbaşı Sosyal Medya Yönetimi | Sahil Esnafı",
    seoDesc:
      "Çarşıbaşı’nda günlük story, reels ve konum reklamı. Balık restoranı ve sahil esnafı için Trabzon sosyal medya · Wesoco.",
    bodyHtml: `
<h2>Çarşıbaşı’nda sosyal medya yönetimi nedir?</h2>
<p>Çarşıbaşı’nda yönetim; günün ürününü aynı gün anlatmaktır. Tezgâh/mutfak sahneleri, kısa reels ve yüksek story temposu omurgadır. Onay hattı hızlı; telefon + kurgu hibriti sık kullanılır. Akçaabat. Vakfıkebir geçiş müşterisi için konum hedeflemesi kritiktir.</p>

<h2>Neden “lüks restoran” dili tutmaz?</h2>
<p>İlçe temposu taze, net fiyat/CTA ve samimi yüz ister. Yavaş kurumsal takvim ürünü bayatlatır.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Günün ürünü story formatı</li>
<li>Haftalık kısa reels stoğu</li>
<li>Düşük bütçeli mahalle Ads</li>
<li>Hızlı onay hattı</li>
</ol>

<h2>Kimler için?</h2>
<p>Balık restoranı, kafe, perakende ve yerel hizmet.</p>

<h2>Fiyat</h2>
<p>Story yoğunluğu ve çekim sıklığına göre. Keşif sonrası.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/akcaabat">Akçaabat</a> · <a href="/bolgeler/vakfikebir">Vakfıkebir</a></p>

<div class="page-cta">
  <h2>Çarşıbaşı için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Her gün story gerekir mi?",
        a: "İşletmeye göre değişir. Taze ürün anlatan yoğun ritm çoğu zaman işe yarar.",
      },
      {
        q: "Reklam şart mı?",
        a: "Organik oturduktan sonra düşük test çoğu zaman dönüşümü hızlandırır.",
      },
      {
        q: "Çekim nasıl olur?",
        a: "Haftalık kısa çekim veya telefon + kurgu hibriti.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "salpazari",
    name: "Şalpazarı",
    regionLabel: "İç kesim",
    answer:
      "Şalpazarı sosyal medya yönetimi; sakin tempo ve yerel güvenle sürdürülebilir dijital vitrindir. Uzaktan yönetim + aralıklı çekim yeterlidir. viral reels dayatması yok.",
    seoTitle: "Şalpazarı Sosyal Medya Yönetimi | Yerel Esnaf",
    seoDesc:
      "Şalpazarı’nda sade Instagram yönetimi ve komşu ilçe görünürlüğü. Küçük esnaf için Trabzon sosyal medya · Wesoco.",
    bodyHtml: `
<h2>Şalpazarı’nda sosyal medya yönetimi nedir?</h2>
<p>Şalpazarı’nda yönetim; abartısız dil, hizmet süreci ve müşteri güvenini düzenli göstermektir. Beşikdüzü. Tonya spillover’ı reklamda kullanılabilir. WhatsApp onay hattı küçük ekiplerde hız kazandırır.</p>

<h2>Neden süreklilik kampanyadan önemli?</h2>
<p>İç kesimde ani kampanya dili yerine güvenilir vitrin ve net iletişim bilgisi daha çok işe yarar.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Minimal haftalık ritim</li>
<li>Uzaktan yayın + aralıklı çekim</li>
<li>İsteğe bağlı komşu kuşak Ads</li>
</ul>

<h2>Kimler için?</h2>
<p>Yerel esnaf, hizmet ve küçük üretim.</p>

<h2>Fiyat</h2>
<p>Ölçeklenebilir küçük paket. Keşif sonrası.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/besikduzu">Beşikdüzü</a> · <a href="/bolgeler/tonya">Tonya</a></p>

<div class="page-cta">
  <h2>Şalpazarı için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Küçük ilçede sosyal medya işe yarar mı?",
        a: "Evet. Yerel görünürlük, güven ve komşu ilçe müşterisi için etkilidir.",
      },
      {
        q: "Ne sıklıkta içerik?",
        a: "Sürdürülebilir ritim keşifte belirlenir.",
      },
      {
        q: "Viral hedef koyuyor musunuz?",
        a: "Hayır. Güvenilir vitrin önceliklidir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "duzkoy",
    name: "Düzköy",
    regionLabel: "İç kesim",
    answer:
      "Düzköy sosyal medya yönetimi; sakin yayla/doğa deneyimini net görsellerle anlatıp hafta sonu talebini erken planlamaktır. Uzungöl diline öykünmeden yakın kaçış vaadi kurulur.",
    seoTitle: "Düzköy Sosyal Medya Yönetimi | Doğa & Konaklama",
    seoDesc:
      "Düzköy’de doğa reels, konaklama turu ve hafta sonu duyurusu. Maçka hattı turizm işletmeleri · Trabzon Sosyal Medya · Wesoco.",
    bodyHtml: `
<h2>Düzköy’de sosyal medya yönetimi nedir?</h2>
<p>Düzköy’de yönetim; doğa, konaklama ve yerel lezzeti sakin ama güçlü karelerle anlatmaktır. Hafta sonu öncesi story/reels dalgası; sezon dışı marka stoğu. Maçka koridoru hem fırsat hem rekabettir.</p>

<h2>Neden Uzungöl kopyası yapılmaz?</h2>
<p>Düzköy’ün vaadi yakın kaçış ve sakinliktir. Yanlış konumlandırma beklenti yaratır, dönüşümü düşürür.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Hafta sonu odaklı takvim</li>
<li>Işık/hava penceresine göre çekim</li>
<li>Sezon dışı stok</li>
<li>Günübirlik Ortahisar çıkışlı ilgi Ads (ihtiyaca göre)</li>
</ol>

<h2>Kimler için?</h2>
<p>Konaklama, kafe, yerel ürün ve turizm.</p>

<h2>Fiyat</h2>
<p>Sezon ve çekim planına göre. Keşif sonrası.</p>

<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/bolgeler/macka">Maçka</a> · <a href="/bolgeler/tonya">Tonya</a></p>

<div class="page-cta">
  <h2>Düzköy için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Sezon dışında ne yapılır?",
        a: "Marka bilinirliği, içerik stoğu ve erken rezervasyon mesajları.",
      },
      {
        q: "Yerinde çekim var mı?",
        a: "Evet. Işık ve hava uygunluğuna göre planlanır.",
      },
      {
        q: "Maçka ile aynı dil mi kullanılır?",
        a: "Hayır. Düzköy’e özgü sakin kaçış vaadi kurulur.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "hayrat",
    name: "Hayrat",
    regionLabel: "Doğu iç kesim",
    answer:
      "Hayrat sosyal medya yönetimi; Of/Çaykara komşuluğundan da müşteri açan sade dijital varlıktır. Küçük bütçede organik ritim + isteğe bağlı düşük test reklamı önerilir.",
    seoTitle: "Hayrat Sosyal Medya Yönetimi | Küçük İşletme",
    seoDesc:
      "Hayrat’ta sade Instagram ve komşu ilçe hedeflemesi. Küçük işletmeler için Trabzon sosyal medya yönetimi · Wesoco.",
    bodyHtml: `
<h2>Hayrat’ta sosyal medya yönetimi nedir?</h2>
<p>Hayrat’ta yönetim; hizmet anlatımı, ekip güveni ve sade vitrindir. Reklamda Hayrat + Of; Çaykara spillover işletme tipine göre açılır. Turizm oteli dili kullanılmaz.</p>

<h2>Neden komşu kuşak önemli?</h2>
<p>Küçük ölçekli yerleşimde büyüme çoğu zaman komşu ilçe görünürlüğünden gelir. Of hattı lojistik ve görünürlük köprüsüdür.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Organik ritim ve net CTA</li>
<li>İsteğe bağlı düşük Ads testi</li>
<li>Uzaktan yönetim veya planlı çekim</li>
</ul>

<h2>Kimler için?</h2>
<p>Yerel esnaf, hizmet ve küçük işletmeler.</p>

<h2>Fiyat</h2>
<p>Küçük bütçeye uygun sade paket. Keşif sonrası.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/of">Of</a> · <a href="/bolgeler/caykara">Çaykara</a></p>

<div class="page-cta">
  <h2>Hayrat için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Hayrat’ta ajans hizmeti var mı?",
        a: "Evet. 18 ilçede uzaktan veya yerinde çekimle hizmet veriyoruz.",
      },
      {
        q: "Bütçe küçükse ne yapılır?",
        a: "Önce organik ve net CTA; reklam isteğe bağlı düşük testle eklenir.",
      },
      {
        q: "Çaykara’ya reklam verilir mi?",
        a: "İşletme tipine göre spillover test edilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "dernekpazari",
    name: "Dernekpazarı",
    regionLabel: "Doğu iç kesim",
    answer:
      "Dernekpazarı sosyal medya yönetimi; mahalle güveni, düzenli vitrin ve gerektiğinde Çaykara turizm spillover hedeflemesidir. Çoğu işletmede Instagram omurga yeterlidir.",
    seoTitle: "Dernekpazarı Sosyal Medya Yönetimi",
    seoDesc:
      "Dernekpazarı’nda Instagram vitrini ve Çaykara hattı görünürlüğü. Yerel esnaf için Trabzon sosyal medya · Wesoco.",
    bodyHtml: `
<h2>Dernekpazarı’nda sosyal medya yönetimi nedir?</h2>
<p>Dernekpazarı’nda yönetim; işletmeye özel ürün/hizmet görselleri, samimi dil ve haftalık ritimdir. Çaykara turizm trafiği doğru konum hedeflemesiyle fırsata dönebilir; sayfa Uzungöl otel kopyası değildir.</p>

<h2>Neden sade takvim?</h2>
<p>Küçük işletme temposu abartılı içerik planını taşımaz. Sürdürülebilirlik dönüşümden önce gelir.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Keşif sonrası minimal takvim</li>
<li>Gerektiğinde Dernekpazarı veya Çaykara hattında çekim</li>
<li>Instagram öncelikli; Facebook/Ads ihtiyaca göre</li>
</ol>

<h2>Kimler için?</h2>
<p>Yerel esnaf, kafe/market ve hizmet.</p>

<h2>Fiyat</h2>
<p>Minimal paket. Keşif sonrası.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/caykara">Çaykara</a> · <a href="/bolgeler/hayrat">Hayrat</a></p>

<div class="page-cta">
  <h2>Dernekpazarı için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Hangi kanal öncelikli?",
        a: "Çoğu işletme için Instagram yeterlidir.",
      },
      {
        q: "Çaykara turizminden nasıl faydalanılır?",
        a: "Konum ve ilgi alanı hedeflemesiyle komşu kuşağa görünürlük planlanabilir.",
      },
      {
        q: "Çekim nerede yapılır?",
        a: "Dernekpazarı veya ihtiyaç halinde Çaykara hattında.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "koprubasi",
    name: "Köprübaşı",
    regionLabel: "Doğu iç kesim",
    answer:
      "Köprübaşı sosyal medya yönetimi; Sürmene/Of sahil ilçelerine de erişim sağlayan yerel hizmet vitrinidir. Uzaktan yönetim ve sade aylık raporla ilerleriz.",
    seoTitle: "Köprübaşı Sosyal Medya Yönetimi",
    seoDesc:
      "Köprübaşı’nda uzaktan Instagram yönetimi ve Sürmene/Of kuşak reklamı. Yerel hizmet işletmeleri · Trabzon Sosyal Medya · Wesoco.",
    bodyHtml: `
<h2>Köprübaşı’nda sosyal medya yönetimi nedir?</h2>
<p>Köprübaşı’nda yönetim; hizmet süreci, güven ve yerel referansı anlatıp yakındaki sahil kuşağına görünürlük açmaktır. Sahil restoran şablonuna girilmez.</p>

<h2>Neden Sürmene/Of hedeflemesi?</h2>
<p>İç kesim işletmesi için büyüme çoğu zaman komşu sahil hareketinden gelir. Reklam coğrafyası buna göre kurulur.</p>

<h2>Nasıl çalışırız?</h2>
<ul>
<li>Uzaktan onaylı yayın</li>
<li>İhtiyaç halinde planlı çekim</li>
<li>Köprübaşı + Sürmene/Of Ads (hedefe göre)</li>
<li>Sade, anlaşılır aylık rapor</li>
</ul>

<h2>Kimler için?</h2>
<p>Yerel hizmet, esnaf ve küçük işletmeler.</p>

<h2>Fiyat</h2>
<p>Uzaktan paket öncelikli. Keşif sonrası.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/surmene">Sürmene</a> · <a href="/bolgeler/of">Of</a></p>

<div class="page-cta">
  <h2>Köprübaşı için keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Yerinde çekim olur mu?",
        a: "Evet. İhtiyaç halinde planlı; uzaktan üretim de mümkün.",
      },
      {
        q: "Komşu ilçelere reklam verilir mi?",
        a: "Evet. Hedefe göre Sürmene/Of kuşağı eklenebilir.",
      },
      {
        q: "Rapor nasıl olur?",
        a: "Sade ve anlaşılır; erişim + mesaj/arama odaklı.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },
];

async function main() {
  for (let i = 0; i < PAGES.length; i++) {
    const d = PAGES[i];
    await prisma.district.upsert({
      where: { slug: d.slug },
      create: {
        slug: d.slug,
        name: d.name,
        regionLabel: d.regionLabel,
        lead: d.answer,
        bodyHtml: d.bodyHtml,
        faqJson: d.faqs,
        seoTitle: d.seoTitle,
        seoDesc: d.seoDesc,
        sortOrder: i + 1,
        published: true,
      },
      update: {
        name: d.name,
        regionLabel: d.regionLabel,
        lead: d.answer,
        bodyHtml: d.bodyHtml,
        faqJson: d.faqs,
        seoTitle: d.seoTitle,
        seoDesc: d.seoDesc,
        sortOrder: i + 1,
        published: true,
      },
    });
    const words = d.bodyHtml.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    console.log("ok", d.slug, "words~", words, "faqs", d.faqs.length);
  }
  console.log("Districts seeded:", PAGES.length);
  // İnce sayfaları derinleştir (deepen-districts.ts)
  const { spawnSync } = await import("child_process");
  spawnSync("npx", ["tsx", "prisma/deepen-districts.ts"], { stdio: "inherit", cwd: process.cwd() });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
