/**
 * Sektör sayfaları - sektöre özel sosyal medya hub’ları.
 *   npm run db:seed-sectors
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Faq = { q: string; a: string };

type Sector = {
  slug: string;
  name: string;
  title: string;
  lead: string;
  bodyHtml: string;
  faqJson: Faq[];
  seoTitle: string;
  seoDesc: string;
  sortOrder: number;
};

const SECTORS: Sector[] = [
  {
    slug: "restoran-kafe",
    name: "Restoran & Kafe",
    title: "Trabzon restoran ve kafe sosyal medya yönetimi",
    lead:
      "Trabzon’da restoran ve kafe sosyal medyası; iştah görseli, story ritmi ve rezervasyon CTA’sını aynı planda yürütmektir. Stok tabak fotoğrafı yerine mutfak, ekip ve günün ürünüyle mahalle güvenini büyütürüz. Instagram yönetimi ve konum odaklı Meta Ads birlikte planlanır.",
    seoTitle: "Restoran & Kafe Sosyal Medya Yönetimi | Trabzon",
    seoDesc:
      "Trabzon restoran ve kafeler için Instagram, reels, story ritmi ve konum reklamı. Rezervasyon odaklı sosyal medya yönetimi · Wesoco.",
    sortOrder: 1,
    faqJson: [
      {
        q: "Restoran hesabında ne sıklıkla paylaşım yapılmalı?",
        a: "Çoğu işletmede haftalık feed + günlük/yoğun akşam story ritmi işe yarar. Kota keşifte menü ve ekip kapasitesine göre netleşir; ‘her gün viral’ hedefi dayatılmaz.",
      },
      {
        q: "Sadece fotoğraf yeterli mi, reels şart mı?",
        a: "İştah görseli omurgadır; reels keşif ve yeni müşteri için güçlüdür. Ayda birkaç kısa mutfak/ürün reels’i çoğu kafe ve restoran için yeterlidir.",
      },
      {
        q: "Reklam bütçesi ajans ücretine dahil mi?",
        a: "Hayır. Medya harcaması ayrı satırdır; konum testleri ve sonuçlar şeffaf raporlanır. Uydurma paket TL fiyatı yazılmaz.",
      },
      {
        q: "Akçaabat veya Ortahisar fark eder mi?",
        a: "Evet. Mahalle dili, rakip yoğunluğu ve reklam coğrafyası değişir. Aynı şablonu tüm ilçelere basmayız.",
      },
    ],
    bodyHtml: `
<h2>Restoran ve kafe sosyal medya yönetimi nedir?</h2>
<p>Trabzon’da restoran ve kafe için sosyal medya yönetimi; hesabı rastgele doldurmak değil, rezervasyon, paket servis veya mağaza ziyaretine giden net bir yolu kurmaktır. Instagram vitrini, story temposu ve gerektiğinde <a href="/hizmetler/meta-ads">Meta Ads</a> aynı hedefe bağlanır. Menü güncelliği, bio CTA’sı ve Google Benim İşletmem bilgileriyle tutarlılık güveni güçlendirir. <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> çoğu gastronomi işletmesinde omurgadır; <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> ise takvim, yanıt ve ölçümü tek planda toplar. Wesoco bünyesinde Trabzon Sosyal Medya, sahil ve merkez hattındaki işletmelere aynı kalitede yerel dil kurar.</p>
<p>İştah görseli tek başına yetmez. Usta hikâyesi, tezgâh anı, günün çorbası veya özel menü duyurusu hesabı “canlı” tutar. Yoğun akşamlarda story üzerinden gelen mesajlar rezervasyonu büyütür; hafta içi öğle temposu ayrı bir ritim ister. Paket servis odaklı işletmelerde adres, hazırlık süresi ve teslimat alanı net yazılmalıdır.</p>

<h2>Neden restoranlarda kritik?</h2>
<p>Cadde ve sahil hattında onlarca benzer menü vardır. Stok tabak görseli ayırt edilmez; gerçek mutfak, usta ve günün ürünü etkileşimi artırır. Yanlış kreatif veya dağınık grid, mesaj maliyetini yükseltir. Rakip hesaplar aynı mahalle kitlesine reklam açtığında konum ve teklif netliği şarttır. Akçaabat lezzet kimliğiyle, Ortahisar cadde rekabetiyle farklı plan ister. tek şablon basılmaz.</p>
<ul>
<li>Keşif çoğu zaman Instagram ve harita birlikte olur.</li>
<li>Menü güncelliği güven sinyalidir.</li>
<li>Sezon ve hafta sonu temposu peşin stok ister.</li>
<li>Yanıt süresi kaçan rezervasyonu azaltır.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Keşif:</strong> Mevcut grid, menü CTA’sı, rakip hesaplar ve rezervasyon yolu.</li>
<li><strong>Dil + takvim:</strong> İştah, ekip, kampanya; story formatları sabitlenir.</li>
<li><strong>Üretim:</strong> Yerinde kısa çekim; şablon stok yok.</li>
<li><strong>Yayın + Ads:</strong> İlçe/konum testleri; medya ayrı rapor.</li>
<li><strong>Aylık skor:</strong> Erişim, mesaj/rezervasyon, üç net aksiyon.</li>
</ol>
<p>İlk ayda genelde vitrin toparlanır, story ritmi oturur ve küçük bir konum Ads testi yapılır. Sonraki aylarda reels kotası ve remarketing katmanı eklenir. Abartılı “viral” vaadi yoktur; hedef keşifte yazılan KPI’larla ölçülür.</p>

<h2>Kimler için uygun?</h2>
<p>Ortahisar caddesi restoranları, Akçaabat sahil esnafı, kafe. pastane ve paket servis odaklı işletmeler. Küçük ekiplerde onay WhatsApp ile hızlı kurulur. Zincir veya franchise’ta yazılı onay katmanı eklenir. Benzer süreç örnekleri için <a href="/vakalar">vaka çalışmalarımıza</a> bakabilirsiniz. Turizm sezonunda menü ve dil, yerli müşteriye göre ayrı katmanlanabilir.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, içerik hacmi, yerinde çekim günü ve reklam yönetimine göre keşif sonrası tekliflenir. Medya harcaması ajans ücretinden ayrıdır; sabit “paket TL” listesi yayınlanmaz. Hedef KPI’lar keşifte yazılıdır. Küçük kafe ile çok şubeli restoran aynı kotayı paylaşmaz.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Restoran veya kafeniz için ücretsiz keşif.</h2>
  <p>Mevcut hesabınıza bakalım; rezervasyon odaklı net bir yol haritası çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
  {
    slug: "klinik-guzellik",
    name: "Klinik & Güzellik",
    title: "Trabzon klinik ve güzellik sosyal medya yönetimi",
    lead:
      "Trabzon’da klinik ve güzellik sosyal medyası; güven dili, randevu CTA’sı ve onaylı içerik demektir. Abartılı vaat yerine süreç, ekip ve sonuç odaklı Instagram ile mahalle hedefli Meta Ads planlanır. Wesoco bünyesinde Trabzon Sosyal Medya.",
    seoTitle: "Klinik & Güzellik Sosyal Medya Yönetimi | Trabzon",
    seoDesc:
      "Trabzon klinik ve güzellik merkezleri için güven odaklı Instagram, reels ve Meta Ads. Randevu odaklı sosyal medya · Wesoco.",
    sortOrder: 2,
    faqJson: [
      {
        q: "Klinik içerikte yasal/etik sınır nasıl yönetilir?",
        a: "Abartılı sonuç vaadi ve yanıltıcı before-after dilinden kaçınılır. Onay protokolü ve sektöre uygun mesaj çerçevesi keşifte netleşir.",
      },
      {
        q: "Randevu hedefi için hangi kanal öncelikli?",
        a: "Çoğu B2C klinikte Instagram omurgadır; form veya arama hedefi varsa Meta Ads eklenir. Google Ads niyetli aramada ayrı değerlendirilir.",
      },
      {
        q: "Ekip ve klinik içi çekim şart mı?",
        a: "Güven için ekip ve ortam görselleri güçlüdür. Stok yüz/model görselleri tek başına yetmez; yerinde kısa çekim önerilir.",
      },
      {
        q: "Keşif ücretli mi?",
        a: "Hayır. Klinik veya güzellik işletmeniz için ücretsiz keşif planlanır; 24 saat içinde dönüş yapılır.",
      },
    ],
    bodyHtml: `
<h2>Klinik ve güzellik sosyal medya yönetimi nedir?</h2>
<p>Klinik ve güzellikte sosyal medya; “güzel post” üretmek değil, randevu ve güven kararını hızlandırmaktır. Hesap vitrini, story ritmi ve reklam aynı dilde ilerler. Hasta veya müşteri adayı ekibi, ortamı ve süreci görmek ister. <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> güven vitrinini kurar; <a href="/hizmetler/meta-ads">Meta Ads</a> mahalle ve ilgi alanı testleriyle randevu mesajını büyütür. Tüm plan <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> altında ölçülür. Trabzon merkez ve çevre ilçelerde cadde rekabeti yüksektir; dil sakin, net ve onaylı olmalıdır.</p>
<p>Abartılı sonuç vaadi itibar riskidir. Before-after dilinde etik sınır, yazılı onay ve sektöre uygun çerçeve keşifte netleşir. Bio’da randevu yolu (WhatsApp, form, telefon) tek tıkla bulunmalıdır. Google Benim İşletmem saatleri ve NAP bilgisi sosyal hesaplarla uyumlu tutulur.</p>

<h2>Neden klinikte farklı dil gerekir?</h2>
<p>Cadde rekabeti yüksektir; abartılı vaat güveni kırar. Yanlış kreatif mesaj maliyetini artırır. Onaysız paylaşım kriz riski yaratır. Ortahisar ve komşu ilçelerde aynı mahalle kitlesine birden fazla klinik reklam açar. teklif ve konum netliği şarttır. Güzellik merkezinde “trend” dili ile tıbbi klinikte “süreç” dili ayrı kurulur.</p>
<ul>
<li>Güven: ekip, ortam, süreç anlatımı.</li>
<li>CTA: randevu / WhatsApp / form net olmalı.</li>
<li>Onay: yazılı veya hızlı onay hattı zorunlu.</li>
<li>Rapor: vanity like değil, randevu sinyali.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Audit:</strong> Mevcut grid, bio, rakip dil, reklam geçmişi.</li>
<li><strong>Mesaj çerçevesi:</strong> Vaat sınırı, hizmet paketleri, randevu yolu.</li>
<li><strong>Üretim:</strong> Klinik içi / ekip shot list; stok şablon yok.</li>
<li><strong>Yayın + Ads:</strong> Test. ölçek; medya ayrı satır.</li>
<li><strong>Aylık skor:</strong> Erişim, randevu mesajı, üç aksiyon.</li>
</ol>
<p>İlk haftalarda vitrin ve bio düzeltilir; ardından düzenli story/reels ritmi ve küçük Ads testi gelir. Kurumsal klinikte onay katmanı süreci uzatabilir; buna göre stok peşin alınır. Benzer güven odaklı örnekler için <a href="/vakalar">vaka çalışmaları</a> sayfasına bakın.</p>

<h2>Kimler için uygun?</h2>
<p>Güzellik merkezleri, dermatoloji ve estetik klinikleri, diş ve sağlık odaklı yerel işletmeler. Küçük ekiplerde onay hızlı; kurumsal klinikte yazılı protokol. Zincir markalarda merkez onaylı dil şablonu korunur, yerel görseller Trabzon’a özel üretilir.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>İçerik hacmi, çekim günü, platform sayısı ve reklam yönetimine göre keşif sonrası tekliflenir. Medya ayrıdır; uydurma TL paket fiyatı yoktur. KPI’lar keşifte yazılır. Tek şube ile çok şubeli klinik aynı kota ve onay yükünü paylaşmaz.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Klinik veya güzellik merkeziniz için keşif.</h2>
  <p>Hesabınıza bakalım; güven ve randevu odaklı net bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
  {
    slug: "otel-turizm",
    name: "Otel & Turizm",
    title: "Trabzon otel ve turizm sosyal medya yönetimi",
    lead:
      "Trabzon’da otel ve turizm sosyal medyası; şablon manzara stoğu yerine oda detayı, sezon ritmi ve erken rezervasyon reklamıdır. Uzungöl. Çaykara hattından şehir otellerine kadar Instagram vitrini ile Meta Ads aynı rezervasyon hedefine bağlanır.",
    seoTitle: "Otel & Turizm Sosyal Medya Yönetimi | Trabzon",
    seoDesc:
      "Trabzon otel ve turizm işletmeleri için sezon odaklı Instagram, reels ve erken rezervasyon Meta Ads. Yerel sosyal medya ajansı · Wesoco.",
    sortOrder: 3,
    faqJson: [
      {
        q: "Sezon dışında hesap ne yapmalı?",
        a: "Kışın tamamen susmak yerine marka + erken rezervasyon mesajı sürdürülür. Stok peşin alınır; panik içerik azalır.",
      },
      {
        q: "Herkes aynı göl görselini kullanıyor, ne fark eder?",
        a: "Oda, ekip, kahvaltı ve süreç detayı ayırt eder. Şablon manzara tek başına rezervasyon getirmez.",
      },
      {
        q: "Drone şart mı?",
        a: "Konum ölçeği kritikse drone güçlüdür. Her otelde zorunlu değildir; keşifte ihtiyaç netleşir.",
      },
      {
        q: "Reklam ne zaman açılmalı?",
        a: "Erken rezervasyon için sezon öncesi test. ölçek önerilir. Medya ajans ücretinden ayrı raporlanır.",
      },
    ],
    bodyHtml: `
<h2>Otel ve turizm sosyal medya yönetimi nedir?</h2>
<p>Otel ve turizmde sosyal medya; sezon paniğinde rastgele paylaşım değil, erken rezervasyon ve marka ayrışması için peşin plan demektir. Kapak, oda turu, ekip ve konum hikâyesi Instagram’da kurulur; gerektiğinde <a href="/hizmetler/meta-ads">Meta Ads</a> ile retargeting eklenir. <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> vitrini taşır; <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> takvim, yanıt SLA ve ölçümü birleştirir. Yoğun sezonda mesaj hızı rezervasyonu kaçırmamak için kritiktir. Trabzon’da şehir oteli ile Uzungöl. Çaykara hattı aynı şablonu paylaşmaz.</p>
<p>Şablon göl ve yayla stoğu herkesin elindedir. Ayırt eden şey oda detayı, kahvaltı, ekip ve gerçek konaklama anıdır. Sezon öncesi stok alınır; sezon içinde yalnızca tempo ve yanıt yönetimi öne çıkar. Kışın hesap tamamen susmak yerine erken rezervasyon ve marka mesajıyla canlı kalır.</p>

<h2>Neden otelde kritik?</h2>
<p>Uzungöl ve yayla hattında herkes aynı manzara stoğunu kullanır. Ayırt edilmeyen hesap, fiyat savaşında kaybeder. Sezon içi yetişmeyen içerik; kışın ölü profil bırakır. Rakip oteller aynı coğrafi kitleye reklam açar. teklif (erken rezervasyon, paket, konum) net olmalıdır. Online seyahat siteleriyle rekabet varken doğrudan mesaj ve rezervasyon yolu güçlendirilmelidir.</p>
<ul>
<li>Sezon öncesi stok = sakin üretim.</li>
<li>Oda/detay = manzara yarışından çıkış.</li>
<li>Yanıt süresi = kaçan mesajı azaltır.</li>
<li>Remarketing = siteyi veya profili gezenleri yakalar.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Rakip + kapak audit:</strong> Vitrin ve rezervasyon CTA’sı.</li>
<li><strong>Sezon takvimi:</strong> Öncesi / yoğun / sonrası mesaj katmanları.</li>
<li><strong>Üretim:</strong> Oda, ortam, ekip; gerekirse drone.</li>
<li><strong>Ads:</strong> Erken rezervasyon + remarketing; medya ayrı.</li>
<li><strong>Skor:</strong> Mesaj, rezervasyon sinyali, üç aksiyon.</li>
</ol>
<p>İlk ayda kapak ve oda turu seti önceliklidir. Ads, sezon takvimine göre açılır; medya harcaması şeffaf satırda durur. Yoğun sezonda story hızı artar; mesaj ve rezervasyon sorularına yanıt SLA’sı keşifte yazılır. Örnek süreçler için <a href="/vakalar">vaka çalışmaları</a> sayfasına bakın. Yerel rehberlik, kahvaltı ve oda detayı manzara stoğundan daha çok ayırt eder; bu yüzden çekim planı peşin kilitlenir.</p>

<h2>Kimler için uygun?</h2>
<p>Şehir otelleri, butik pansiyonlar, Uzungöl. Çaykara hattı konaklama ve turizm işletmeleri. Küçük tesislerde hızlı onay; zincirde yazılı katman. Tur operatörü ve transfer hizmetleriyle ortak içerik planı da kurulabilir. Yaz sezonu ile kış erken rezervasyonu ayrı takvim katmanıdır; aynı grid dili iki dönemde farklı tempo ister.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Sezon yoğunluğu, içerik hacmi, çekim (drone dahil) ve reklam yönetimine göre keşif sonrası tekliflenir. Sabit TL paket listesi yok; medya ayrı satırdır. Tek sezonluk kampanya ile yıllık yönetim ayrı tekliflenir.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Otel veya turizm işletmeniz için sezon planı.</h2>
  <p>Hesabınıza bakalım; erken rezervasyon odaklı net bir yol çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
  {
    slug: "otomotiv",
    name: "Otomotiv",
    title: "Trabzon otomotiv sosyal medya yönetimi",
    lead:
      "Trabzon’da otomotiv sosyal medyası; showroom vitrini, lansman reels seti ve konum hedefli Meta Ads demektir. Dağınık grid yerine ürün + ekip + test sürüşü CTA’sı kurulur. mesaj ve showroom ziyareti vanity like’tan önce gelir.",
    seoTitle: "Otomotiv Sosyal Medya Yönetimi | Trabzon Bayi & Galeri",
    seoDesc:
      "Trabzon otomotiv bayi ve galerileri için Instagram grid, lansman reels ve Meta Ads. Showroom odaklı sosyal medya · Wesoco.",
    sortOrder: 4,
    faqJson: [
      {
        q: "Lansman için ne kadar önceden başlanmalı?",
        a: "İdeal olarak 2. 3 hafta içerik stoğu ve reklam testi gerekir. Tarih yakınsa öncelik grid + CTA + kısa Ads testidir.",
      },
      {
        q: "Sadece stok araç fotoğrafı yeter mi?",
        a: "Hayır. Showroom, ekip ve kullanım anı mesajı güven ve ziyaret niyetini güçlendirir. Tek tip stok ayırt edilmez.",
      },
      {
        q: "Reklam coğrafyası nasıl seçilir?",
        a: "Ortahisar + spillover ilçeler keşifte netleşir. Medya ayrı raporlanır; gösterim değil mesaj/ziyaret hedefi yazılır.",
      },
      {
        q: "Aylık rapor ne içerir?",
        a: "Erişim, mesaj/arama, üç net aksiyon. Abartılı yüzde vaadi yoktur; KPI keşifte yazılıdır.",
      },
    ],
    bodyHtml: `
<h2>Otomotiv sosyal medya yönetimi nedir?</h2>
<p>Otomotivde sosyal medya; hesap doldurmak değil, showroom ziyareti ve nitelikli mesaj üretmektir. Instagram grid’i ürün ve marka dilini taşır; lansman haftalarında reels seti tempo verir. <a href="/hizmetler/meta-ads">Meta Ads</a> mahalle ve model ilgisiyle test edilir. <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> vitrini düzeltir; <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> takvim, yanıt ve aylık skoru birleştirir. Dağınık geçmiş reklam “gösterim” odaklıysa hedef yeniden yazılır. Trabzon’da cadde bayileri ile ikinci el galeriler farklı dil ve kota ister.</p>
<p>Stok araç fotoğrafı tek başına yetmez. Showroom, danışman ekibi, teslimat anı ve test sürüşü CTA’sı güveni büyütür. Bio’da iletişim ve konum net olmalıdır. Kampanya dönemlerinde peşin stok alınır; son gün panik içerik azaltılır.</p>

<h2>Neden bayilerde kritik?</h2>
<p>Aynı mahallede birden fazla bayi aynı kitleye reklam açar. Tutarsız grid güven kırar; zayıf hikâye lansmanı boğar. Yanlış kreatif mesaj maliyetini yükseltir. Cadde rekabeti yüksekken bio CTA ve konum hedeflemesi net olmalıdır. Ortahisar spillover’ı Akçaabat ve Yomra’ya açılabilir; coğrafya keşifte yazılır.</p>
<ul>
<li>Lansman = peşin stok + Ads testi.</li>
<li>Ekip ve showroom = güven sinyali.</li>
<li>KPI = mesaj / arama / ziyaret, vanity değil.</li>
<li>Remarketing = modele bakanları yakalar.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Cadde/rakip audit</strong> ve bio CTA netleştirme.</li>
<li><strong>İçerik stoğu:</strong> ürün + ekip + showroom (ör. 3 hafta).</li>
<li><strong>Lansman reels</strong> ve story ritmi.</li>
<li><strong>Konum Ads</strong> + remarketing; medya ayrı.</li>
<li><strong>Aylık skor:</strong> erişim, mesaj, üç aksiyon.</li>
</ol>
<p>Lansman haftasında tempo yükselir; sonraki ay Büyüme veya sürdürme katmanına geçilir. Abartılı yüzde vaadi yoktur. Reklam satırında gösterim değil mesaj, arama ve showroom ziyareti hedefleri izlenir. Remarketing, modele bakan ama iletişime geçmeyen kitleyi yakalar. Benzer lansman özeti için <a href="/vakalar">vaka çalışmaları</a>.</p>

<h2>Kimler için uygun?</h2>
<p>Yetkili bayiler, galeriler ve ikinci el noktaları. Küçük ekiplerde hızlı onay; kurumsal bayide yazılı katman. Servis ve yedek parça iletişimi ayrı içerik hattı olarak eklenebilir. Yeni model lansmanı ile stok eritme kampanyası aynı dilde yürümez; her biri ayrı shot list ve CTA ister. Cadde rekabetinde ekip yüzü ve showroom düzeni güven sinyalidir.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>İçerik hacmi, çekim, lansman yoğunluğu ve reklam yönetimine göre keşif sonrası tekliflenir. Medya ayrıdır; uydurma TL fiyat listesi yok. Tek model lansmanı ile yıllık grid yönetimi ayrı tekliflenir. Çok markalı galeride kota ve onay yükü artar; keşifte netleştirilir.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Bayi veya galeriniz için ücretsiz keşif.</h2>
  <p>Hesabınıza bakalım; lansman veya aylık grid için net bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
  {
    slug: "insaat-emlak",
    name: "İnşaat & Emlak",
    title: "Trabzon inşaat ve emlak sosyal medya yönetimi",
    lead:
      "Trabzon’da inşaat ve emlak sosyal medyası; proje ölçeğini drone ve süreç reels’leriyle anlatıp niyetli talebe bağlamaktır. Organik vitrin ile Meta Ads / arama niyeti aynı lansman planında yürür. garanti satış vaadi yok, ölçülebilir keşif hedefi var.",
    seoTitle: "İnşaat & Emlak Sosyal Medya Yönetimi | Trabzon",
    seoDesc:
      "Trabzon inşaat ve emlak projeleri için drone, Instagram ve Meta Ads. Lansman odaklı sosyal medya yönetimi · Wesoco.",
    sortOrder: 5,
    faqJson: [
      {
        q: "Drone her projede gerekli mi?",
        a: "Ölçek ve konum anlatımı kritikse güçlüdür. Her ilanda zorunlu değildir; keşifte ihtiyaç netleşir.",
      },
      {
        q: "Sadece Instagram yeter mi?",
        a: "Organik vitrin şarttır. Niyetli arama ve form hedefi varsa Meta Ads veya Google Ads eklenir.",
      },
      {
        q: "Şantiye içeriği güvenli mi?",
        a: "Shot list ve onay protokolüyle ilerlenir. Güvenlik ve marka diline uygun kareler seçilir.",
      },
      {
        q: "Sonuç nasıl raporlanır?",
        a: "Form/arama/mesaj sinyalleri ve üç aksiyon. Abartılı satış yüzdesi vaadi yoktur.",
      },
    ],
    bodyHtml: `
<h2>İnşaat ve emlak sosyal medya yönetimi nedir?</h2>
<p>İnşaat ve emlakta sosyal medya; projeyi telefonda anlatılamayan ölçekte göstermek ve nitelikli talep üretmektir. Drone, geniş plan ve şantiye/süreç reels’leri Instagram vitrinini taşır. <a href="/hizmetler/meta-ads">Meta Ads</a> remarketing ve lansman temposunu destekler; <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> düzenli grid kurar. Tüm süreç <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> altında takvimlenir. Yomra. Ortahisar koridoru gibi bölgelerde konum hikâyesi kritiktir. Garanti satış vaadi yoktur; hedef keşifte yazılan form, mesaj veya arama KPI’larıyla ölçülür.</p>
<p>Şablon stok daire görselleri ayırt edilmez. Proje aşaması, malzeme, manzara ve şantiye disiplini güveni büyütür. Lansman öncesi stok peşin alınır; yayın takvimi tarihine kilitlenir. Emlak ofislerinde portföy ritmi ile proje lansmanı ayrı katmanlanır.</p>

<h2>Neden projelerde kritik?</h2>
<p>Organik tek başına lansman tarihine yetişmeyebilir. Niyetli arama boşsa talep kaçırılır. Rakip projeler aynı mahalle kitlesine reklam açar. teklif, konum ve süreç net olmalıdır. Ofis/ticari projelerde B2B dili; konutta aile ve yaşam senaryosu öne çıkar. Drone, ölçeği tek karede anlatır ama her ilanda zorunlu değildir.</p>
<ul>
<li>Ölçek = drone / geniş plan.</li>
<li>Güven = şantiye ve süreç anlatımı.</li>
<li>Talep = form/arama + remarketing.</li>
<li>Onay = şantiye ve marka güvenlik protokolü.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Keşif:</strong> Proje aşaması, hedef kitle, mevcut hesaplar.</li>
<li><strong>Çekim planı:</strong> Drone, iç/dış, süreç reels.</li>
<li><strong>Lansman stoğu:</strong> Yayın takvimi peşin.</li>
<li><strong>Ads:</strong> Meta + gerektiğinde niyetli arama; medya ayrı.</li>
<li><strong>Skor:</strong> Form/mesaj, üç aksiyon.</li>
</ol>
<p>Lansman döneminde tempo yükselir; sonrasında remarketing ve süreç güncellemeleri sürer. Şantiye ilerledikçe yeni kareler takvime eklenir; güvenlik ve marka onayı shot list’te peşin yazılır. Niyetli arama boşsa talep kaçabilir; bu yüzden organik vitrin ile Ads aynı planda düşünülür. Örnekler: <a href="/vakalar">vaka çalışmaları</a>.</p>

<h2>Kimler için uygun?</h2>
<p>Konut projeleri, müteahhit firmalar, emlak ofisleri ve ofis/ticari lansmanlar. Kurumsal onay katmanı sık kullanılır. Küçük ofislerde portföy odaklı Instagram ritmi; büyük projelerde lansman + Ads paketi ayrı tekliflenir. Yomra, Ortahisar veya yayla hattı projelerinde konum hikâyesi farklı kurulur. tek şablon basılmaz. Satış ofisi ekibiyle onay hattı yazılı veya WhatsApp üzerinden netleşir.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Çekim kapsamı (drone dahil), içerik hacmi, lansman süresi ve reklam yönetimine göre keşif sonrası tekliflenir. Uydurma TL paket yok; medya ayrı satırdır. Tek proje lansmanı ile sürekli portföy yönetimi ayrı fiyatlanır. Drone ve geniş plan günü maliyeti keşifte şeffaf satırda gösterilir.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Proje veya emlak ofisiniz için keşif.</h2>
  <p>Mevcut vitrine bakalım; lansman odaklı net bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
  {
    slug: "perakende",
    name: "Perakende",
    title: "Trabzon perakende sosyal medya yönetimi",
    lead:
      "Trabzon’da perakende sosyal medyası; ürün grid’i, vitrin ritmi ve mağaza ziyareti CTA’sıdır. Cadde rekabetinde tutarsız paylaşım yerine sektöre özel Instagram dili ve mahalle hedefli Meta Ads aynı planda yürür.",
    seoTitle: "Perakende Sosyal Medya Yönetimi | Trabzon Mağaza",
    seoDesc:
      "Trabzon perakende ve mağazalar için Instagram ürün grid’i, reels ve konum Ads. Ziyaret odaklı sosyal medya · Wesoco.",
    sortOrder: 6,
    faqJson: [
      {
        q: "Ürün fotoğrafı stok mu, yerinde mi?",
        a: "Mümkünse yerinde veya tutarlı ışıkla üretilmiş set tercih edilir. Karışık stok grid’i markayı zayıflatır.",
      },
      {
        q: "Kampanya haftalarında tempo nasıl?",
        a: "Peşin stok + story hızı. Son gün panik içerik yerine takvimli yayın.",
      },
      {
        q: "Online satış yoksa sosyal medya işe yarar mı?",
        a: "Evet. mağaza ziyareti, mesaj ve yol tarifi hedefleri yazılır. CTA net olmalıdır.",
      },
      {
        q: "Fiyat listesi var mı?",
        a: "Hayır. Hacim, çekim ve reklam yönetimine göre keşif sonrası teklif; medya ayrıdır.",
      },
    ],
    bodyHtml: `
<h2>Perakende sosyal medya yönetimi nedir?</h2>
<p>Perakendede sosyal medya; ürünü rastgele paylaşmak değil, vitrin tutarlılığı ve mağaza ziyareti üretmektir. Instagram grid’i kategori ve kampanya dilini taşır; story ile günün ürünü ve stok uyarısı verilir. <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> omurgadır; <a href="/hizmetler/meta-ads">Meta Ads</a> mahalle ve remarketing ile destekler. <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> takvim, yanıt ve aylık skoru birleştirir. Uzun Sk. / Gazipaşa hattı gibi caddelerde rakip hesap yoğunluğu yüksektir. Online satış olmasa bile yol tarifi ve mesaj dönüşümü ölçülebilir.</p>
<p>Karışık stok fotoğrafı markayı zayıflatır. Tutarlı ışık, kategori disiplini ve ekip/vitrin dengesi güven verir. Kampanya haftalarında peşin stok alınır; son gün panik içerik azalır. Bio’da adres, saat ve iletişim net olmalıdır. Google Benim İşletmem ile NAP tutarlılığı cadde keşfini güçlendirir.</p>

<h2>Neden perakendede kritik?</h2>
<p>Aynı cadde üzerinde onlarca mağaza aynı kitleye seslenir. Tutarsız grid ve gecikmiş kampanya içeriği güveni düşürür. Yanlış kreatif mesaj maliyetini artırır. Sezon (okul, bayram, turizm) temposu peşin plan ister. Remarketing, ürünü gören ama mağazaya gelmeyenleri yakalar.</p>
<ul>
<li>Vitrin = kategori disiplini.</li>
<li>Kampanya = peşin stok.</li>
<li>Ads = mahalle + retargeting.</li>
<li>KPI = mesaj / yol tarifi / ziyaret sinyali.</li>
</ul>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Audit:</strong> Grid, bio, rakip, mevcut Ads.</li>
<li><strong>Dil + kategori planı:</strong> Ürün / ekip / vitrin dengesi.</li>
<li><strong>Üretim:</strong> Tutarlı ışık ve shot list.</li>
<li><strong>Yayın + Ads:</strong> Test. ölçek; medya ayrı.</li>
<li><strong>Skor:</strong> Erişim, mesaj/yol tarifi, üç aksiyon.</li>
</ol>
<p>İlk ayda grid toparlanır ve story ritmi oturur. Sonraki aylarda reels ve remarketing katmanı eklenir. Kampanya haftalarında peşin çekilmiş ürün seti yayına alınır; son gün panik içerik azalır. Cadde keşfinde Instagram ile harita birlikte çalışır; bu yüzden saat, adres ve iletişim tutarlı tutulur. Süreç örnekleri: <a href="/vakalar">vaka çalışmaları</a>.</p>

<h2>Kimler için uygun?</h2>
<p>Giyim, aksesuar, elektronik, hediyelik ve cadde perakendesi. Zincirlerde onay katmanı; butiklerde hızlı WhatsApp hattı. Çok şubeli yapılarda ortak dil + yerel görsel dengesi kurulur. Turizm sezonunda hediyelik ve vitrin temposu ayrı katmanlanabilir. Online satış kanalı olan mağazalarda ürün linki ve stok mesajı grid’e bağlanır; yalnızca fiziksel ziyaret hedefleyenlerde yol tarifi CTA’sı öne çıkar.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Ürün hacmi, çekim sıklığı, platform sayısı ve reklam yönetimine göre keşif sonrası tekliflenir. Sabit TL paket fiyatı yayınlanmaz; medya ayrı satırdır. Tek mağaza ile çok şube aynı kotayı paylaşmaz. Sezonluk yoğun kampanya ile sakin aylık yönetim ayrı tekliflenir; keşifte KPI ve kapsam yazılıdır.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/vakalar">Vakalar</a></p>

<div class="page-cta">
  <h2>Mağazanız için ücretsiz keşif.</h2>
  <p>Mevcut grid’inize bakalım; ziyaret odaklı net bir yol haritası çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
  },
];

async function main() {
  await prisma.sectorPage.deleteMany();
  for (const s of SECTORS) {
    await prisma.sectorPage.create({
      data: {
        slug: s.slug,
        name: s.name,
        title: s.title,
        lead: s.lead,
        bodyHtml: s.bodyHtml,
        faqJson: s.faqJson,
        seoTitle: s.seoTitle,
        seoDesc: s.seoDesc,
        sortOrder: s.sortOrder,
        published: true,
      },
    });
    console.log("sector", s.slug);
  }
  console.log(`Seeded ${SECTORS.length} sector pages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
