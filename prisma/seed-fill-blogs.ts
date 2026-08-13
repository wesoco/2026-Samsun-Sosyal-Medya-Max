/**
 * Plan bloglarını doğal Türkçe + GEO yapıyla doldurur.
 * Okuyucuya JSON / şablon dil yok. Özgün SEO yazılarını ezmez.
 * npm run db:seed-fill-blogs
 */
import { PrismaClient } from "@prisma/client";
import { BLOG_CONTENT_PLAN, type BlogPlanItem } from "./content-plan-blogs";

const prisma = new PrismaClient();

const BLOG_COVER = "/assets/Samsun-sosyal-medya.webp";

const DISTRICTS = [
  "İlkadım",
  "Atakum",
  "Canik",
  "Tekkeköy",
  "Bafra",
  "Çarşamba",
  "Vezirköprü",
  "Terme",
  "Havza",
  "Kavak",
  "Alaçam",
  "19 Mayıs",
  "Salıpazarı",
  "Asarcık",
  "Ladik",
  "Ayvacık",
  "Yakakent",
];

const PROTECTED_PUBLISHED = new Set([
  "samsun-sosyal-medya-ajansi",
  "samsun-sosyal-medya-yonetimi",
  "samsun-dijital-pazarlama-ajansi",
  "samsun-reklam-ajansi",
  "samsun-instagram-yonetimi",
  "samsun-meta-reklam-ajansi",
  "samsun-kurumsal-sosyal-medya-yonetimi",
  "samsun-sosyal-medya-uzmani",
  "samsun-icerik-uretimi",
  "samsun-profesyonel-cekim-hizmetleri",
  "restoran-sosyal-medya-yonetimi-samsun",
  "klinik-guzellik-sosyal-medya-samsun",
  "samsun-sosyal-medya-danismanligi",
  "samsun-isletmeler-icin-sosyal-medya-yonetimi",
]);

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function topicLabel(title: string) {
  let t = title.replace(/\?$/u, "").trim();
  t = t.replace(/\s+Nasıl\s+\S+$/iu, "").trim();
  t = t.replace(/\s+Nedir$/iu, "").trim();
  t = t.replace(/\s+Neden\s+Önemlidir$/iu, "").trim();
  t = t.split(":")[0].trim();
  return t || title.replace(/\?$/u, "").trim();
}

// -------------------------------------------------------------------
// Cluster gruplaması
// -------------------------------------------------------------------
const META_ADS_CLUSTERS = new Set(["Meta Ads", "Reklam", "Kampanya", "Performans", "Fiyat"]);
const REELS_CLUSTERS = new Set(["Reels", "Prodüksiyon", "İçerik"]);
const INSTAGRAM_CLUSTERS = new Set(["Instagram", "TikTok", "Marka", "Tasarım"]);
const LINKEDIN_CLUSTERS = new Set(["LinkedIn", "Web", "E-ticaret"]);
const LOCAL_SEO_CLUSTERS = new Set(["Yerel SEO", "SEO", "Dijital Pazarlama", "Strateji", "Ölçüm"]);
const AJANS_CLUSTERS = new Set(["Ajans", "Genel"]);
const TURIZM_CLUSTERS = new Set(["Turizm", "Otel"]);
const RESTORAN_CLUSTERS = new Set(["Restoran", "Kafe", "Fırın", "Butik", "Perakende", "Eczane"]);
const KLINIK_CLUSTERS = new Set(["Klinik", "Diş Kliniği", "Güzellik Merkezi", "Spor Salonu"]);
const B2B_CLUSTERS = new Set(["İnşaat", "Emlak", "Avukat", "Muhasebe", "Oto Galeri", "Eğitim"]);
const DISTRICT_NAMES = new Set(DISTRICTS);

// -------------------------------------------------------------------
// buildLead
// -------------------------------------------------------------------
function buildLead(item: BlogPlanItem): string {
  const t = topicLabel(item.title);
  const c = item.cluster;
  const seed = hash(item.slug);

  if (META_ADS_CLUSTERS.has(c)) {
    return pick([
      `${t} için bütçeyi açmadan önce hedef, dönüşüm izleme ve mesaj testi hazır olmalıdır. Samsun'daki işletmelerin reklam kurarken sıklıkla takıldığı noktaları ve çıkış yollarını burada anlattık.`,
      `${t} konusu Samsun'da giderek daha kritik: organik erişim düştükçe reklamın payı artıyor. Bu yazıda bütçe mantığından hedeflemeye, A/B testinden raporlamaya kadar işe yarar bir çerçeve sunduk.`,
      `Samsun işletmesi olarak ${t.toLowerCase()} alanında ne kadar harcamalı, kimi hedeflemeli, hangisi daha iyi sonuç verir? Somut sorulara somut cevaplar burada.`,
    ], seed);
  }

  if (REELS_CLUSTERS.has(c)) {
    return pick([
      `${t} meselesi çoğu zaman ekipman değil kurgudur. Samsun'da klinikten restoranakadar işe yaradığını gördüğümüz yaklaşımları derlediğimiz bu yazıda ilk saniyeden son karede ne yapılması gerektiğini netleştirdik.`,
      `${t} için uzun prodüksiyon listelerine gerek yok. Doğru kurgu, yerinde ışık ve net bir çağrı çoğu işletme için yeterlidir. Samsun pratiğinden örneklerle anlattık.`,
      `Samsun'da ${t.toLowerCase()} konusunda işletmelerin sorduğu sorular genellikle aynı: ne sıklıkta, ne uzunlukta, hangi format? Yanıtlar bu yazıda.`,
    ], seed);
  }

  if (INSTAGRAM_CLUSTERS.has(c)) {
    return pick([
      `${t} konusunda Samsun işletmeleri için en işe yarayan pratikler; grid düzeni, story temposu ve takipçiyi alıcıya dönüştüren dil burada.`,
      `${t} artık sadece içerik atmak değil. Doğru sıklık, format çeşitliliği ve yerel dil  -  bunların birlikte nasıl çalıştığını Samsun perspektifinden aktardık.`,
      `Samsun'da ${t.toLowerCase()} için net bir çerçeve: ne yayınlanmalı, hangi saatlerde, nasıl ölçülmeli. Gereksiz teori yok; uygulanabilir adımlar var.`,
    ], seed);
  }

  if (LINKEDIN_CLUSTERS.has(c)) {
    return pick([
      `${t}, Samsun'daki B2B ve kurumsal markaların çoğu zaman göz ardı ettiği fırsatların başında gelir. Ne yapılması gerektiğini, neden işe yaradığını ve nasıl başlanacağını bu yazıda özetledik.`,
      `${t} için Samsun'dan örnekler ve adımlar: platformun nasıl çalıştığından içerik ritmine, hedef kitleden dönüşüme kadar pratik bir rehber.`,
    ], seed);
  }

  if (LOCAL_SEO_CLUSTERS.has(c)) {
    return pick([
      `${t} meselesi Samsun'da çoğu işletme için hem önemli hem belirsizdir. Google'da ne zaman görünürsünüz, hangi sinyal sayılır, ölçüm nasıl yapılır  -  hepsini sade şekilde aktardık.`,
      `${t} konusunda Samsun işletmelerinin sıklıkla sorduğu "nereden başlayalım?" sorusuna adım adım cevap verdik. Teknik olmayan bir dil, pratik çıktılar.`,
      `Samsun'da ${t.toLowerCase()}: yerel rekabeti aşmak için neyin önemli olduğunu, hangi adımların önce atılması gerektiğini ve sonucun nasıl okunduğunu bu yazıda bulabilirsiniz.`,
    ], seed);
  }

  if (AJANS_CLUSTERS.has(c)) {
    return pick([
      `${t} seçimi Samsun'daki işletmeler için çoğunlukla "hangisi ucuz?" sorusuna dönüşür. Oysa asıl soru şu: hangi ajans referans gösterilebilir, şeffaf sözleşme sunar ve ölçeği sizinle büyür?`,
      `Samsun'da ${t.toLowerCase()} konusunda net bilgi bulmak güçtür. Bu yazıda doğru soruları, yanıt verme kriterlerini ve çalışma modelini açıkladık.`,
    ], seed);
  }

  if (TURIZM_CLUSTERS.has(c)) {
    return pick([
      `${t} için Samsun turizminin mevsimsel ritmi belirleyicidir. Yaz öncesi çekim stoğu, sezon içi reklam ve sezon sonu analiz  -  üçünü birden nasıl kurgulamalı? Burada anlattık.`,
      `Samsun'da ${t.toLowerCase()} kıyı, orman ve kültür turizmi gibi farklı başlıkları barındırır. Dijital anlatının her biri için nasıl şekillendiğini örneklerle aktardık.`,
    ], seed);
  }

  if (RESTORAN_CLUSTERS.has(c)) {
    return pick([
      `${t} için Samsun'daki restoran ve kafe işletmelerinin en çok boğulduğu yer; her gün menü postu yetiştirmeye çalışmaktır. Sürdürülebilir bir içerik ritmi nasıl kurulur, burada anlattık.`,
      `Samsun'da ${t.toLowerCase()} alanında işe yarayan pratikler: sezon menüsünden story'ye, teslimat reklamından yorum yönetimine kadar adım adım bir çerçeve.`,
      `${t} için kural basittir: özgün fotoğraf + net çağrı + düzenli ritim. Samsun'daki işletmelerin bunu pratikte nasıl hayata geçirdiğini bu yazıda özetledik.`,
    ], seed);
  }

  if (KLINIK_CLUSTERS.has(c)) {
    return pick([
      `${t} söz konusu olduğunda Samsun'daki klinik ve güzellik işletmeleri için önce güven, sonra içerik ritmi gelir. Hasta veya müşteri adayı profili ziyaret ettiğinde ne görüyor olmalı? Burada yanıtladık.`,
      `${t} için Samsun klinik pratiğinden örnekler: uzmanlık içeriği, randevu CTA'sı ve yerel dil uyumu nasıl bir araya gelir.`,
    ], seed);
  }

  if (B2B_CLUSTERS.has(c)) {
    return pick([
      `${t} konusunda Samsun'daki inşaat, emlak ve B2B işletmeler için en büyük sorun dijital sahnede yeterince güven oluşturamamaktır. Bu yazıda ne yapılması gerektiğini netleştirdik.`,
      `Samsun'da ${t.toLowerCase()} alanında sosyal medyanın rolü büyüyor. Hangi platform, ne sıklıkla, nasıl ölçülür  -  sektöre özgü bir rehber.`,
    ], seed);
  }

  if (DISTRICT_NAMES.has(c)) {
    return pick([
      `${c} ilçesinde faaliyet gösteren işletmeler için sosyal medya ve dijital reklamın yerel dinamiklerle nasıl çalıştığını bu yazıda anlattık. Mahalle örüntüsü, rakipler ve hedef kitle aynı ilçeden okunur.`,
      `${t}: ${c} pazarında görünürlük kazanmak için pratik adımlar, platform tercihleri ve içerik mantığı. Kuram değil, uygulama odaklı bir rehber.`,
      `${c}'da işletme sahibiyseniz bu yazı size özeldir: neyin işe yaradığı, nereden başlanacağı ve hangi metriklerin okunacağı sade bir dille açıklandı.`,
    ], seed);
  }

  // fallback
  return pick([
    `${t} konusunda Samsun'daki işletmeler çoğu zaman aynı noktada takılır: neyin işe yaradığı belirsiz, içerik dağınık, reklam ölçülmüyor. Bu yazıda süreci sade ve uygulanabilir şekilde anlattık.`,
    `${t} için net bir çerçeve isteyenler buraya. Hedef kitle, içerik ritmi, reklam ve raporlamanın Samsun'da nasıl bir araya geldiğini adım adım özetledik.`,
    `Samsun'da ${t.toLowerCase()} arayan işletmeler için pratik bir rehber: ne yapılmalı, ne kadar sürer, fiyat neye göre değişir, kimler için mantıklıdır.`,
  ], seed);
}

// -------------------------------------------------------------------
// Comparison tables by cluster
// -------------------------------------------------------------------
function buildTable(item: BlogPlanItem): string {
  const c = item.cluster;

  if (META_ADS_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Meta Ads ile Google Ads farkı (Samsun perspektifi)</caption>
<thead><tr><th>Ölçüt</th><th>Meta Ads</th><th>Google Ads</th></tr></thead>
<tbody>
<tr><td>Niyet</td><td>Keşif ve hatırlatma</td><td>Aktif arama niyeti</td></tr>
<tr><td>Format</td><td>Görsel, video, carousel</td><td>Metin, alışveriş, görüntülü</td></tr>
<tr><td>Hedefleme</td><td>İlgi alanı + davranış</td><td>Anahtar kelime + konum</td></tr>
<tr><td>Sonuç hızı</td><td>Hızlı marka bilinirliği</td><td>Hızlı niyetli dönüşüm</td></tr>
</tbody></table></div>`;
  }

  if (REELS_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Reels formatları karşılaştırması</caption>
<thead><tr><th>Format</th><th>Uzunluk</th><th>En iyi kullanım</th></tr></thead>
<tbody>
<tr><td>Kısa (7-15 sn)</td><td>Hook + tek mesaj</td><td>Tanıtım, teklif duyurusu</td></tr>
<tr><td>Orta (20-30 sn)</td><td>Hook + içerik + CTA</td><td>Süreç, mutfak arkası, ipucu</td></tr>
<tr><td>Uzun (45-60 sn)</td><td>Eğitici veya hikâye</td><td>Vaka, soru-cevap, tanıklık</td></tr>
</tbody></table></div>`;
  }

  if (INSTAGRAM_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Instagram içerik türleri ve hedefler</caption>
<thead><tr><th>Tür</th><th>Amacı</th><th>Sıklık</th></tr></thead>
<tbody>
<tr><td>Gönderi (kare/dikey)</td><td>Grid kimliği, kalıcı mesaj</td><td>Haftada 3-4</td></tr>
<tr><td>Story</td><td>Günlük temas, CTA</td><td>Günlük veya 2 günde bir</td></tr>
<tr><td>Reels</td><td>Keşif, erişim büyütme</td><td>Haftada 1-3</td></tr>
<tr><td>Canlı</td><td>Güven, Q&amp;A</td><td>Ayda 1-2</td></tr>
</tbody></table></div>`;
  }

  if (DISTRICT_NAMES.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>İlçe odaklı dijital strateji özeti</caption>
<thead><tr><th>Bileşen</th><th>Yerel strateji</th><th>Genel strateji</th></tr></thead>
<tbody>
<tr><td>Hedef kitle</td><td>İlçe + mahalle filtresi</td><td>Geniş Samsun</td></tr>
<tr><td>Dil tonu</td><td>Mahalleye özgü samimi</td><td>Genel markalaşma</td></tr>
<tr><td>İçerik</td><td>Yerel referans, tanınan yer</td><td>Genel hizmet anlatısı</td></tr>
<tr><td>Reklam hedefleme</td><td>Posta kodu / pin radius</td><td>Samsun geneli</td></tr>
</tbody></table></div>`;
  }

  if (KLINIK_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Klinik / sağlık hesabı içerik yapısı</caption>
<thead><tr><th>İçerik türü</th><th>Amacı</th><th>Ağırlık</th></tr></thead>
<tbody>
<tr><td>Uzmanlık paylaşımı</td><td>Güven ve E-E-A-T</td><td>%40</td></tr>
<tr><td>Süreç / hizmet tanıtımı</td><td>Randevu niyeti</td><td>%30</td></tr>
<tr><td>Hasta deneyimi (anonim)</td><td>Sosyal kanıt</td><td>%20</td></tr>
<tr><td>Arka plan / ekip</td><td>İnsani bağ</td><td>%10</td></tr>
</tbody></table></div>`;
  }

  if (RESTORAN_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Restoran / kafe içerik mix önerisi</caption>
<thead><tr><th>İçerik</th><th>Hedef</th><th>Oran</th></tr></thead>
<tbody>
<tr><td>Yemek / içecek görseli</td><td>İştah açma, takipçi kazanma</td><td>%35</td></tr>
<tr><td>Mekan atmosferi</td><td>Gelme kararını destekleme</td><td>%25</td></tr>
<tr><td>Mutfak arkası / story</td><td>Güven, samimiyet</td><td>%25</td></tr>
<tr><td>Teklif / kampanya</td><td>Anlık dönüşüm</td><td>%15</td></tr>
</tbody></table></div>`;
  }

  if (B2B_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>B2B dijital kanallar ve işlevleri</caption>
<thead><tr><th>Kanal</th><th>Birincil işlev</th><th>Ölçüt</th></tr></thead>
<tbody>
<tr><td>LinkedIn</td><td>Güven + iş bağlantısı</td><td>Profil ziyareti, DM</td></tr>
<tr><td>Google Ads</td><td>Niyetli arama</td><td>Teklif formu, arama</td></tr>
<tr><td>Instagram</td><td>Marka bilinirliği</td><td>Erişim, kaydetme</td></tr>
<tr><td>Web SEO</td><td>Uzun vadeli organik</td><td>Organik tıklama</td></tr>
</tbody></table></div>`;
  }

  if (LOCAL_SEO_CLUSTERS.has(c)) {
    return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Organik ile ücretli büyüme karşılaştırması</caption>
<thead><tr><th>Ölçüt</th><th>SEO / Organik</th><th>Reklam / Ücretli</th></tr></thead>
<tbody>
<tr><td>Sonuç hızı</td><td>3-6 ay</td><td>Gün içi</td></tr>
<tr><td>Maliyet yapısı</td><td>Sabit, uzun vadeli düşen</td><td>Tıklama başı, sürekli</td></tr>
<tr><td>Güvenilirlik algısı</td><td>Yüksek</td><td>Orta</td></tr>
<tr><td>Kontrol</td><td>Sınırlı (Google kararı)</td><td>Tam açma/kapatma</td></tr>
</tbody></table></div>`;
  }

  // default
  return `<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Plansız paylaşım ile planlı çalışma</caption>
<thead><tr><th></th><th>Plansız</th><th>Planlı</th></tr></thead>
<tbody>
<tr><td>Hedef</td><td>Belirsiz</td><td>Yazılı ve net</td></tr>
<tr><td>İçerik</td><td>Günübirlik</td><td>Takvimli ve onaylı</td></tr>
<tr><td>Reklam</td><td>Ara sıra</td><td>Test edip ölçekleme</td></tr>
<tr><td>Rapor</td><td>Yok veya geç</td><td>Aylık, aksiyonlu</td></tr>
</tbody></table></div>`;
}

// -------------------------------------------------------------------
// Cluster-specific "kimler için" paragrafı
// -------------------------------------------------------------------
function buildWhoFor(item: BlogPlanItem, d: string): string {
  const c = item.cluster;

  if (META_ADS_CLUSTERS.has(c)) {
    return `<p>Hızlı sonuç isteyen ve bütçesini ölçmek isteyen işletmeler için uygundur. ${d}'daki restoran ve kafe sahipleri, klinik doktorları, emlakçılar ve e-ticaret yapan perakendeciler en hızlı ROI'yi görenler arasındadır. Organik içerik henüz yoksa reklam bütçeyi tüketir; ikisini birlikte yürütmek gerekir.</p>`;
  }
  if (REELS_CLUSTERS.has(c)) {
    return `<p>Reels en çok; mutfağı, stüdyosu, ofisi veya hizmet ortamı olan işletmelere yarar. ${d}'daki restoranlar, güzellik merkezleri, klinikler, spor salonları ve küçük üreticiler bu formatın gücünü en hızlı hisseder. Masa başı ofis hizmetleri için de vaka ve süreç reels'i işe yarar.</p>`;
  }
  if (INSTAGRAM_CLUSTERS.has(c)) {
    return `<p>Instagram'dan en iyi sonucu alan işletmeler görsel ürün veya hizmet sunanlardır: ${d}'daki kafeler, güzellik merkezleri, butikler, oteller ve klinikler. B2B markaların da profil kurmak için Instagram'ı göz ardı etmemesi gerekir, ancak LinkedIn omurgası onlar için daha kritiktir.</p>`;
  }
  if (LINKEDIN_CLUSTERS.has(c)) {
    return `<p>Samsun'daki B2B, inşaat, hukuk bürosu, muhasebe ofisi, yazılım şirketi ve eğitim kurumları için özellikle değerlidir. ${d} gibi sanayi veya ticaret ağırlıklı ilçelerde kurum ve karar alıcıya ulaşmak LinkedIn'de daha hızlıdır.</p>`;
  }
  if (DISTRICT_NAMES.has(c)) {
    return `<p>${c} ilçesinde faaliyet gösteren her büyüklükteki işletme için uygundur. Küçük esnaf yerel bilinirlik ve yorum yönetimi ile başlar; orta ölçekli işletmeler içerik + reklam kombinasyonuyla büyür; kurumsal yapılar itibar yönetimi ve onay hattı ister. Sektör fark etmeksizin ${c}'da yerel dil ve konum hedefleme içeriği güçlendirir.</p>`;
  }
  if (KLINIK_CLUSTERS.has(c)) {
    return `<p>Diş kliniklerinden estetik cerrahiye, güzellik merkezlerinden fizyoterapiste kadar sağlık ve güzellik alanındaki tüm işletmeler için geçerlidir. ${d}'da açılan yeni bir klinik için ilk üç ay bilinirlik önceliklidir; yerleşik klinikte randevu akışını desteklemek öne geçer.</p>`;
  }
  if (RESTORAN_CLUSTERS.has(c)) {
    return `<p>Masa rezervasyonu, paket sipariş veya gel-al modeliyle çalışan her restoran, kafe ve yeme-içme noktası için geçerlidir. ${d}'daki küçük mahalle kahvesinden zincir restorana kadar ritim ve format değişir ama temel kural aynıdır: sürekli görünürlük satışı destekler.</p>`;
  }
  if (B2B_CLUSTERS.has(c)) {
    return `<p>Samsun'daki inşaat firmaları, emlak ofisleri, avukatlık büroları ve B2B hizmet şirketleri için uygundur. ${d} gibi ticaret ve sanayi odaklı ilçelerde karar alıcıya ulaşmak için içerik kalitesi, platform seçimi ve hedefleme birlikte çalışmalıdır.</p>`;
  }
  return `<p>Restoran, kafe, klinik, otel, emlak, inşaat, güzellik ve perakende işletmeleri için özellikle işe yarar. Küçük ekiplerde içerik yükünü almak, kurumsal yapılarda ise onaylı ve tutarlı bir dil kurmak hedef olur. ${d}'daki işletmeler keşif görüşmesini ücretsiz yapabilir.</p>`;
}

// -------------------------------------------------------------------
// Cluster-specific "pratik notlar" paragrafları
// -------------------------------------------------------------------
function buildPratikNot(item: BlogPlanItem, d2: string, d3: string, seed: number): string {
  const c = item.cluster;

  const notes: Record<string, string[]> = {
    metaads: [
      `Reklam açmadan önce Meta Pixel veya Conversions API kurulu olmalıdır; aksi hâlde dönüşüm verisi kaybolur ve optimizasyon yavaşlar.`,
      `${d2}'daki bir işletme için reklam kitlesi oluştururken konum yarıçapını 3-5 km ile sınırlamak yerel israfı önler. Geniş Samsun hedeflemesi yalnızca marka bilinirliği aşamasında mantıklıdır.`,
      `A/B testi küçük bütçede de yapılır: aynı ilan, farklı başlık veya görsel. ${d3}'da açılan kampanyada ilk hafta veri toplamak için bütçeyi kısmak, sonraki haftada kazananı ölçeklendirmek standart yoldur.`,
    ],
    reels: [
      `İlk 1,5 saniye izleyiciyi tutmalıdır; hareket, soru veya güçlü bir görsel hook en iyi çalışır. ${d2}'daki bir kafe reels'i için "nasıl yapıldığını" görmek seyircinin merakını besler.`,
      `Altyazı eklemek izlenme süresini uzatır; ses kapayanlara da mesaj ulaşır. ${d3}'da çekilen drone görüntüsüne metin overlay eklenince paylaşım oranı yükselir.`,
      `Reels'te müzik seçimi trend takibinden gelir. Telif sorunu yaratmamak için Instagram ses kütüphanesi veya lisanslı müzik tercih edilmeli.`,
    ],
    instagram: [
      `Hikâye (Story) kısa ömürlü ama günlük temas için güçlüdür. ${d2}'daki bir butik her sabah ürünü gösterirse takipçi hesabı "alışkanlık" olarak açmaya başlar.`,
      `Keşfet algoritması kaydetmeyi ödüllendirir. ${d3}'daki bir güzellik merkezinin "evde bakım ipuçları" içeriği kaydetme hedefli yazılırsa erişim organik büyür.`,
      `Grid estetik bütünlüğü marka güvenini artırır. Yeni profil ziyaretçisi ilk 9 kareye bakarak "bu işletmeye güvenebilir miyim?" kararını verir.`,
    ],
    linkedin: [
      `LinkedIn gönderileri uzun formatta daha iyi performans gösterir; 3-5 paragraf, gerçek deneyim veya veri içeriyorsa 10 kat daha fazla erişime ulaşabilir.`,
      `${d2}'daki inşaat veya emlak firması için proje tamamlanma anını ve süreci anlatan bir gönderi, reklam vermeden sektör ağından gelen dönüşümleri tetikleyebilir.`,
      `Şirket sayfasına ek olarak kurucu veya yöneticinin kişisel profilinden içerik üretmek B2B güvenini önemli ölçüde artırır.`,
    ],
    seo: [
      `Google Benim İşletmem profili; adres, çalışma saatleri ve fotoğraflar güncel olmadan yerel SEO çalışması eksik kalır. ${d2}'daki bir işletme için bu profil ilk adımdır.`,
      `Sayfa içi SEO; başlık etiketi, meta açıklama ve yükleme hızından oluşur. ${d3}'da açılan yeni bir şube için hızlı bir teknik inceleme aylarca zaman kazandırabilir.`,
      `Yorum sayısı ve kalitesi yerel sıralama için sinyal gönderir. ${d2}'daki rakiplerinizin yorumlarını okumak hem iyileştirme fırsatını hem müşteri dilini gösterir.`,
    ],
    restoran: [
      `Sabah erken saatlerde veya öğle öncesi yayınlanan yemek görseli, anlık "nerede yiyeceğim?" kararlarını etkiler. ${d2}'daki bir restoran için zamanlama içerik kadar önemlidir.`,
      `Story'de "bugünkü menü" veya "sınırlı stok" mesajı acillik hissi yaratır. ${d3}'daki kafe için hafta sonu özel menüsü story'den duyurulduğunda rezervasyon dolabilir.`,
      `Google Maps yorumlarına kısa ve samimi yanıt vermek hem algoritma hem müşteri güveni için kritiktir. Yanıtsız bırakılan şikâyet potansiyel müşteriyi uzaklaştırır.`,
    ],
    klinik: [
      `Medikal içerikte iddia yerine bilgi paylaşmak hem hukuki hem etik açıdan daha doğrudur. "Bu probleminizi çözeriz" değil, "bu süreç böyle işler" anlatısı güveni artırır.`,
      `${d2}'daki hastalar randevuyu çoğunlukla Instagram DM veya WhatsApp ile alır; profilde bu yolların net gösterilmesi kayıp randevuyu azaltır.`,
      `Ekibin yüzünü gösteren gerçek fotoğraflar stok görüntüden çok daha fazla tık alır. ${d3}'daki güzellik merkezi için bu küçük fark büyük güven farkı yaratır.`,
    ],
    district: [
      `${d2} mahallesinde yerel takipçiyi çekmek için konum etiketleri, yerel hashtag'ler ve tanınan yerlere referans vermek erişimi artırır.`,
      `${d3} ilçesinde yoğun rakip varsa reklam kitlesini mahalle düzeyinde daraltmak hem bütçeyi hem alaka düzeyini iyileştirir.`,
      `Google Benim İşletmem'de yeni fotoğraf yüklemek ve güncelleme paylaşmak ${d2}'da yerel aramada sıralamayı destekler. Profili aktif tutmak pasif SEO çalışmasıdır.`,
    ],
  };

  let key = "default";
  if (META_ADS_CLUSTERS.has(item.cluster)) key = "metaads";
  else if (REELS_CLUSTERS.has(item.cluster)) key = "reels";
  else if (INSTAGRAM_CLUSTERS.has(item.cluster)) key = "instagram";
  else if (LINKEDIN_CLUSTERS.has(item.cluster)) key = "linkedin";
  else if (LOCAL_SEO_CLUSTERS.has(item.cluster)) key = "seo";
  else if (RESTORAN_CLUSTERS.has(item.cluster)) key = "restoran";
  else if (KLINIK_CLUSTERS.has(item.cluster)) key = "klinik";
  else if (DISTRICT_NAMES.has(item.cluster)) key = "district";

  const pool = notes[key] ?? [
    `Reels'te ilk saniyeler kritiktir; altyazı ve net bir çağrı (ara, yaz, randevu al) dönüşümü kolaylaştırır.`,
    `Reklama başlamadan önce mesaj veya form takibini kurmak gerekir; aksi hâlde "kaç kişi aradı?" sorusu yanıtsız kalır.`,
    `Google'da niyetli arama, Instagram'da keşif ve hatırlatma daha güçlüdür. İkisini iş modelinize göre dengeleriz.`,
    `Yorum ve mesajlara hızlı dönüş yerel güveni artırır. ${d3} gibi ilçelerde samimi dil abartısız olmalıdır.`,
  ];

  const secondPool = [
    `Sezon (yaz, eğitim, bayram) içerik stoğunu öne çeker. Son güne bırakılan iş hem kaliteyi hem hızı düşürür.`,
    `Ajans ücreti, çekim ve reklam bütçesini ayrı satırlarda görmek şeffaflık sağlar.`,
    `Kriz veya şikâyet anında ne söyleneceği önceden yazılıysa panik azalır.`,
    `${d2}'daki sektör rakiplerini periyodik olarak izlemek hem içerik hem teklif güncelleme için yol gösterir.`,
  ];

  return `<p>${pick(pool, seed)}</p>\n<p>${pick(secondPool, seed + 1)}</p>`;
}

// -------------------------------------------------------------------
// Main buildBody
// -------------------------------------------------------------------
function buildBody(item: BlogPlanItem): string {
  const seed = hash(item.slug);
  const d1 = pick(DISTRICTS, seed);
  const d2 = pick(DISTRICTS, seed + 3);
  const d3 = pick(DISTRICTS, seed + 7);
  const d4 = pick(DISTRICTS, seed + 11);
  const topic = topicLabel(item.title);
  const cluster = item.cluster;

  // h2 sıralaması seed'e göre: bazen Nasıl önce gelir
  const flipOrder = seed % 3 === 0;

  // ------- Cluster-specific intro paragraph (Nedir bölümü) --------
  let nedir = "";
  if (META_ADS_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; doğru hedef kitleye doğru mesajı, ölçülebilir bütçeyle iletmenin sistematik yoludur. Instagram ve Facebook reklamlarında kreatif, hedefleme ve teklif stratejisi üç ayrı değişkendir ve birinin zayıflığı diğerlerinin katkısını siler. ${d1}'da bir klinik açılışını duyuracaksanız mahalle bazlı hedefleme, güven odaklı kreatif ve "randevu al" CTA'sı aynı anda çalışmalıdır.</p>
<p>Meta Ads Manager'da kampanya hedefi, reklam seti hedeflemesi ve reklam kreatifleri birbirinden bağımsızdır. Başarısız kampanyaların büyük çoğunluğu iyi kreatif + kötü hedefleme veya kötü kreatif + iyi hedefleme karışımından kaynaklanır. ${d2}'daki bir restoran için ise aynı görselin farklı başlıklarla nasıl test edileceğini bilmek, reklam bütçesini ikiye katlamaktan daha değerlidir.</p>`;
  } else if (REELS_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; kısa video formatında dikkat çekme, mesaj iletme ve dönüşüm sağlama sanatıdır. Ekipman tek başına belirleyici değildir; kurgu, aydınlatma ve ilk saniyelerdeki hook daha fazla fark yaratır. ${d1}'da yerinde çekilen 30 saniyelik bir reels, stüdyoda hazırlanmış ama bağlamını yitirmiş içerikten çoğu zaman daha yüksek etkileşim alır.</p>
<p>Reels algoritması izlenme süresini, kaydetmeleri ve paylaşımları ödüllendirir. ${d2}'daki bir güzellik merkezi için "nasıl yapıldı?" formatı merak yaratırken ${d3}'daki bir kafe için "sezon menüsü açılışı" anlık ziyaret kararını tetikler. Her ikisinde de temel kural aynıdır: ilk 1,5 saniyede izleyiciyi tutun.</p>`;
  } else if (INSTAGRAM_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; İlkadım'dan Yakakent'e Samsun'daki işletmelerin müşteriyle sürekli temas noktası oluşturmasını sağlar. Beğeni artık öncelikli ölçüt değildir; kaydetme, DM ve profil ziyareti daha gerçek sinyallerdir. ${d1}'daki bir butik için grid estetiği güveni inşa eder, story ritmi günlük temas sağlar, reels ise yeni kitleye ulaştırır.</p>
<p>Algoritma samimiyeti ödüllendirir. ${d2}'da belirli bir ürün veya hizmet için gerçek deneyimi aktaran içerik, kurumsal reklam havasındaki gönderiden daha fazla etkileşim alır. Hedef; takipçiyi alışkanlıkla dönen, markayla bağ kuran bir topluluğa dönüştürmektir.</p>`;
  } else if (DISTRICT_NAMES.has(cluster)) {
    nedir = `<p>${cluster} ilçesinde dijital görünürlük; yalnızca Samsun genelinde değil, mahalle ölçeğinde de kurulmalıdır. ${topic} bu gerçeği göz önünde bulundurur: konum hedeflemeli reklam, yerel dile uygun içerik ve Google Benim İşletmem optimizasyonu birlikte çalışır. ${cluster}'da faaliyet gösteren bir işletme için aynı mahalledeki rakipler çoğu zaman en kritik rekabet alanıdır.</p>
<p>${cluster} farklı sektörleri barındırır. Sahil işletmeleri, merkez esnafı, sanayi bölgesi tedarikçileri ve hizmet sektörü aynı coğrafyada farklı dijital ihtiyaçlarla karşımıza çıkar. ${d1}'daki stratejinin ${cluster}'a uyarlanması; dil, hedefleme ve içerik formatında yerel düzenlemeler gerektirir.</p>`;
  } else if (KLINIK_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; Samsun'daki klinik ve güzellik işletmelerinin dijital sahnede güven inşa ederken randevu akışını sürdürmesi demektir. Hastanın veya müşterinin sosyal medyada "bu klinikteki uzman gerçekten biliyor mu?" sorusunu sormadan önce cevabı bulması hedeflenir. ${d1}'da yeni açılan bir diş kliniği için ilk aylardaki içerik; uzmanlık, ekip ve süreç tanıtımına odaklanır.</p>
<p>Sağlık ve güzellik içeriğinde güven önce gelir, promosyon sonra. ${d2}'daki bir estetik merkezi "işte bu hafta yaptığımız işlemler" demek yerine "bu işlemi yaparken nelere dikkat ediyoruz?" sorusunu yanıtladığında uzun vadeli marka güveni inşa eder.</p>`;
  } else if (RESTORAN_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; menüden masaya, teslimatten rezervasyona kadar tüm temas noktalarını dijital kanallarla desteklemenin pratik yoludur. ${d1}'daki bir restoran için Instagram sabah yemek görseli, öğle "bugünkü menü" story'si ve akşam rezervasyon hatırlatması birbirini tamamlar. Tek post değil, ritim işe yarar.</p>
<p>${d2}'daki kafeler için kahve görseli kadar mekan atmosferi de önemlidir. Rakipler görsel üretiyorsa siz de üretmeniz gerekir; ancak daha sık değil, daha anlam yüklü üretmek daha iyi sonuç verir. ${d3}'daki bir fırın için "sabah çıkan sıcak ekmek" reels'i binlerce erişime ulaşabilir çünkü herkesin deneyimlediği ama nadiren görüntülediği bir anı gösterir.</p>`;
  } else if (B2B_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; Samsun'daki inşaat, emlak, hukuk ve diğer B2B sektörlerin dijital güven inşa ederek müşteri veya iş ortağı kazanmasının sistematik yoludur. ${d1}'daki bir inşaat firması için proje portföyü, mühendislik ekibi ve sertifikasyon bilgisi LinkedIn'de güven sinyali gönderir; Google Ads ise hızlı teklif alma niyetini karşılar.</p>
<p>B2B satın alma süreleri uzundur; bu yüzden içerik güveni sürekli besler. ${d2}'daki bir emlak ofisi için yalnızca ilanları paylaşmak yetmez: mahalle rehberleri, fiyat analizi ve yasal süreç bilgisi hedef kitlenin güvenini kazanır ve karar aşamasında sizi akla getirir.</p>`;
  } else if (LOCAL_SEO_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; Samsun'daki bir işletmenin Google'da, haritalarda ve AI araçlarında doğru arama niyetiyle karşılaşmasını sağlar. ${d1}'da restoran, klinik veya hizmet işletmesi arayan biri telefona bakıyorsa ilk üç sonuca giremiyorsanız o müşteriyi kaybediyorsunuz demektir. Yerel SEO bu boşluğu kapatır.</p>
<p>${d2}'daki rakiplerinizin Google Benim İşletmem profili daha fazla fotoğraf, daha güncel bilgi ve daha fazla yorum içeriyorsa sıralamada önde olmaları tesadüf değildir. ${d3}'da yeni açılan şube için teknik temel ve içerik birlikte kurulduğunda ilk 3-6 ay organik büyüme görülmeye başlar.</p>`;
  } else if (TURIZM_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; Samsun'un kıyı, dağ ve kültür turizm potansiyelini dijital platformlarda gerçek ziyaretçiye dönüştürme stratejisidir. ${d1}'daki bir otel için yaz öncesi çekim stoğu, sezon reklamı ve sezon sonu analiz birbirini izleyen üç fazı oluşturur. Sezon ortasında içerik üretmeye çalışmak hem maliyetli hem verimsizdir.</p>
<p>${d2}'daki turizm işletmesi için Google Haritalar yorumları ile Instagram keşfet algoritması ikisi ayrı ancak tamamlayıcı kanaldır. Yorumu yüksek otel aramalarda önce çıkar; reels izlenen otel ise seyahat planı aşamasında akla gelir. ${d3} ve çevresindeki doğal güzellikler drone çekimi için özellikle değerlidir.</p>`;
  } else if (AJANS_CLUSTERS.has(cluster)) {
    nedir = `<p>${topic}; Samsun'daki işletmenin içerik, reklam, çekim ve raporlamayı tek çatı altında profesyonelce yönetmesidir. Wesoco'nun Samsun ayağı 17 ilçeye uzaktan yönetim ve planlı yerinde çekim sunar. ${d1}'daki küçük işletmeden ${d2}'daki kurumsal markaya kadar strateji kurgusu değişir ama disiplin aynı kalır.</p>
<p>Ajans ilişkisinde en sık karşılaşılan sorun şeffaflıktır: ne kadar medya bütçesi harcandı, hangi içerik işe yaradı, neden değiştirildi? Wesoco bünyesinde her müşteri aylık skor kartı ve ayrı medya bütçesi raporu alır. ${d3}'da da ${d4}'da da aynı hesap verebilirlik standardı geçerlidir.</p>`;
  } else {
    nedir = `<p>${topic}; Samsun'daki bir işletmenin sosyal medya ve dijital pazarlama tarafını plansız bırakmak yerine ölçülebilir hale getirmesidir. Instagram, gerektiğinde TikTok veya LinkedIn, içerik üretimi ve reklam aynı masada konuşulur.</p>
<p>${d1}, ${d2} veya ${d3} fark etmeksizin temel mantık aynıdır: kime konuştuğunuzu bilin, ne sıklıkla üreteceğinizi netleştirin, sonucu ay sonunda okuyun. Wesoco bünyesindeki Samsun Sosyal Medya ekibi de keşfe bu sorularla başlar.</p>`;
  }

  // ------- Neden ve Nasıl bölümleri (sıra seed'e göre) --------
  const nedenBlock = `<h2>Neden önemli?</h2>
<p>Organik erişim eskisi kadar cömert değil. Düzenli içerik olmadan hesap "var ama konuşmuyor" gibi durur; reklamı plansız açınca bütçe erir. ${cluster} tarafında doğru kurgu; marka bilinirliği, mesaj ve randevu gibi somut çıktılara bağlanır.</p>
<p>Yerel rekabet gerçektir: ${d1}'da benzer hizmet veren birkaç işletme birden Instagram'da görünmeye çalışır. Diliniz ve görselleriniz ${d2} müşterisine hitap etmiyorsa reklam bile zorlar.</p>`;

  const nasilBlock = `<h2>Nasıl yapılır?</h2>
<ol>
<li>Mevcut hesabı ve ${d1} / ${d2} rakiplerini birlikte inceleriz.</li>
<li>Hedef kitle, mesaj ve yayın takvimini yazarız.</li>
<li>Fotoğraf, reels veya gerektiğinde drone ile içerik üretiriz.</li>
<li>Onayınızdan sonra yayınlar; ihtiyaç varsa Meta Ads veya Google Ads ile destekleriz.</li>
<li>Ay sonunda sade bir raporla neyin çalıştığını konuşuruz.</li>
</ol>
<p>Onay hattı nettir. "Paylaşıldı mı?" belirsizliği olmaz. Acil kampanya gerektiğinde hızlı onay yolu da tanımlanır.</p>`;

  const nedenNasil = flipOrder
    ? `${nasilBlock}\n\n${nedenBlock}`
    : `${nedenBlock}\n\n${nasilBlock}`;

  return `
<h2>${topic} nedir?</h2>
${nedir}

${nedenNasil}

<h2>Kimler için uygun?</h2>
${buildWhoFor(item, d3)}

<h2>Ne kazandırır?</h2>
<ul>
<li>Samsun ve ilçe dinamiklerine uygun içerik dili</li>
<li>İçerik + reklamın aynı planda yürümesi</li>
<li>Şeffaf sözleşme ve ayrı medya bütçesi raporu</li>
<li>İlgili <a href="/hizmetler">hizmet</a> ve <a href="/bolgeler">ilçe</a> sayfalarına doğal geçiş</li>
<li>WhatsApp veya form ile hızlı dönüş</li>
</ul>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, ayda kaç içerik üretileceği, yerinde çekim olup olmayacağı ve reklam yönetiminin kapsama girip girmediği fiyatı değiştirir. Reklam medya harcaması ajans ücretinden ayrıdır; faturada karışmaz.</p>
<p>Burada sabit bir "herkese aynı paket" rakamı yazmıyoruz. Ücretsiz keşifte hesabınıza bakıp size özel teklif çıkarıyoruz.</p>

<h2>Süreç nasıl işler?</h2>
<p>İlk hafta hesap ve rakip özeti, ilk ay dil ve içerik seti, sonraki aylarda kazanan formatların çoğaltılması. ${d2} turizm işletmesiyle ${d3} klinik aynı takvimi kullanmaz; aynı disiplinle ilerler.</p>
<p>Raporda erişim, etkileşim, mesaj/arama ve maliyet gibi karar vermenizi sağlayan rakamlar yer alır. Gereksiz tablo kalabalığı yoktur.</p>

${buildTable(item)}

<h2>Kısa örnekler</h2>
<p>${d1}'da hizmet veren bir işletme, düzenli reels ve konum odaklı reklamla mesaj sayısını artırabilir. ${d4}'daki bir konaklama işletmesi sezon öncesi çekim stoğu yapıp sezon içinde reklamı açarak doluluğu destekleyebilir. Her iki durumda da ölçüm olmadan büyütmek risklidir.</p>

<h2>Pratik notlar</h2>
${buildPratikNot(item, d2, d3, seed)}

<h2>Sonuç</h2>
<p>${topic} için doğru yol; acele reklam değil, net plan + ölçüm + sabırlı iyileştirmedir. Samsun Sosyal Medya ile ücretsiz keşif alın, mevcut hesabınıza birlikte bakalım.</p>
<p><a href="/#iletisim">Teklif formu</a> · <a href="/hizmetler">Hizmetler</a> · <a href="/bolgeler">İlçeler</a> · <a href="/blog">Blog</a></p>
`.trim();
}

// -------------------------------------------------------------------
// buildFaqs  -  konu + ilçe içeren özgün sorular
// -------------------------------------------------------------------
function buildFaqs(item: BlogPlanItem) {
  const topic = topicLabel(item.title);
  const seed = hash(item.slug);
  const districtQ = pick(DISTRICTS, seed + 5);
  const c = item.cluster;

  // cluster-specific ilk iki soru
  let q1: { q: string; a: string };
  let q2: { q: string; a: string };

  if (META_ADS_CLUSTERS.has(c)) {
    q1 = {
      q: `${topic} için minimum bütçe ne olmalıdır?`,
      a: `Test aşamasında günlük 50-100 TL bile veri toplar; ancak anlamlı öğrenme için aylık 1.500 TL ve üzeri önerilir. ${districtQ}'da yerel hedefleme ile bütçe daha verimli kullanılır.`,
    };
    q2 = {
      q: `${districtQ}'da meta reklam hedeflemesi nasıl yapılır?`,
      a: `Konum olarak ${districtQ} merkezi seçilip 3-5 km yarıçap eklenmesi, yerel niyet taşıyan kitleyi yakalar. Geniş Samsun hedeflemesi yalnızca marka farkındalığı kampanyalarında tercih edilmelidir.`,
    };
  } else if (REELS_CLUSTERS.has(c)) {
    q1 = {
      q: `${topic} için profesyonel ekipman şart mı?`,
      a: `Hayır. Günümüz telefonları yeterlidir. ${districtQ}'daki işletmeler için kararlı tripod, iyi ışık ve sessiz ortam ekipmandan daha kritiktir.`,
    };
    q2 = {
      q: `${districtQ}'da çekilen reels'te hangi hashtag'ler kullanılmalı?`,
      a: `Genel büyük hashtag'lerden ziyade nişe özel ve ${districtQ}'ya bağlı etiketler keşfet'te alaka sağlar. 3-5 hedefli hashtag, 20 genel hashtag'den daha iyi sonuç verir.`,
    };
  } else if (DISTRICT_NAMES.has(c)) {
    q1 = {
      q: `${c} ilçesinde sosyal medya yönetimi ne kadara mal olur?`,
      a: `İçerik hacmi, çekim gerekliliği ve reklam yönetimine göre değişir. ${c}'da yerel odaklı paket ücretsiz keşifle netleşir; medya bütçesi ayrıdır.`,
    };
    q2 = {
      q: `${c}'da Google Benim İşletmem optimizasyonu yapıyor musunuz?`,
      a: `Evet. ${c} ve Samsun genelinde yerel SEO kapsamına GBİ profil optimizasyonu, fotoğraf yenileme ve yorum yönetimi dahil edilebilir.`,
    };
  } else if (KLINIK_CLUSTERS.has(c)) {
    q1 = {
      q: `Klinik için hangi içerik türleri güven oluşturur?`,
      a: `Uzmanlık paylaşımı, süreç anlatımı ve ekip tanıtımı en güçlü güven sinyalleridir. ${districtQ}'daki kliniğiniz için sahte testimonial yerine gerçek vaka açıklaması tercih edilmeli.`,
    };
    q2 = {
      q: `${districtQ}'da klinik reklamı verebilir miyiz?`,
      a: `Evet, Meta ve Google Ads sağlık reklamlarına özel politika gerektirir. Doğru kategori ve içerik seçildiğinde ${districtQ} randevu bazlı kampanyalar başarılı sonuç verir.`,
    };
  } else if (RESTORAN_CLUSTERS.has(c)) {
    q1 = {
      q: `${topic} için içerik ne sıklıkla üretilmeli?`,
      a: `Restoran ve kafe için haftada 3-4 gönderi + günlük story ritmi idealdir. ${districtQ}'daki rakiplerinize göre sıklığı değil, kaliteyi önceliklendirin.`,
    };
    q2 = {
      q: `${districtQ}'daki restoranlar için hangi reklam türü işe yarar?`,
      a: `Konum bazlı Meta Ads ile "şu an yakınındaki" hedefleme, öğle ve akşam saatlerinde anlık karar alanları için en etkili yoldur. Google Ads ise "Samsun'da restoran" gibi aktif aramalar için güçlüdür.`,
    };
  } else {
    q1 = {
      q: `${topic} ne işe yarar?`,
      a: `${topic}; görünürlük, düzenli içerik ve gerektiğinde reklamla müşteriye ulaşmayı planlı hale getirir. Wesoco / Samsun Sosyal Medya keşifle başlar.`,
    };
    q2 = {
      q: `${districtQ}'da bu hizmeti alabilir miyiz?`,
      a: `Evet. ${districtQ} dahil Samsun'un 17 ilçesinde uzaktan yönetim ve planlı yerinde çekim ile hizmet verilir.`,
    };
  }

  return [
    q1,
    q2,
    {
      q: "Ne kadar sürede sonuç görülür?",
      a: "İlk plan genelde 1-2 haftada netleşir. Anlamlı öğrenme çoğu işletmede 30-90 gün içinde konuşulur; sektör ve bütçeye göre değişir.",
    },
    {
      q: "Fiyat sabit mi?",
      a: "Hayır. İçerik hacmi, çekim ve reklam yönetimine göre tekliflenir. Reklam medya bütçesi ayrıdır.",
    },
    {
      q: "Hangi ilçelerde çalışıyorsunuz?",
      a: "Samsun'un 17 ilçesinde: İlkadım, Atakum, Canik, Tekkeköy, Bafra, Çarşamba, Vezirköprü, Terme, Havza, Kavak, Alaçam, 19 Mayıs, Salıpazarı, Asarcık, Ladik, Ayvacık ve Yakakent'te.",
    },
    {
      q: "Nasıl başlarız?",
      a: "Ücretsiz keşif formu veya WhatsApp yeterli. Genelde 24 saat içinde dönüş yapıyoruz.",
    },
  ];
}

// -------------------------------------------------------------------
// fillOne + main
// -------------------------------------------------------------------
async function fillOne(item: BlogPlanItem, index: number) {
  const existing = await prisma.blogPost.findUnique({ where: { slug: item.slug } });
  if (existing?.published && PROTECTED_PUBLISHED.has(item.slug)) {
    return "skip-published";
  }

  const lead = buildLead(item);
  const bodyHtml = buildBody(item);
  const faqs = buildFaqs(item);
  const publishedAt = new Date(Date.UTC(2025, 0, 1 + (index % 350)));

  const data = {
    title: item.title,
    lead,
    bodyHtml,
    coverUrl: BLOG_COVER,
    category: item.category,
    published: true,
    publishedAt: existing?.publishedAt && existing.published ? existing.publishedAt : publishedAt,
    seoTitle: `${item.title} | Samsun Sosyal Medya`,
    seoDesc: lead.slice(0, 155),
    faqJson: faqs,
  };

  if (existing) {
    await prisma.blogPost.update({ where: { slug: item.slug }, data });
    return "updated";
  }
  await prisma.blogPost.create({ data: { slug: item.slug, ...data } });
  return "created";
}

async function main() {
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < BLOG_CONTENT_PLAN.length; i++) {
    const r = await fillOne(BLOG_CONTENT_PLAN[i], i);
    if (r === "created") created++;
    else if (r === "updated") updated++;
    else skipped++;
    if ((i + 1) % 50 === 0) console.log(`processed ${i + 1}/${BLOG_CONTENT_PLAN.length}`);
  }

  const published = await prisma.blogPost.count({ where: { published: true } });
  const drafts = await prisma.blogPost.count({ where: { published: false } });
  console.log(JSON.stringify({ created, updated, skipped, published, drafts }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
