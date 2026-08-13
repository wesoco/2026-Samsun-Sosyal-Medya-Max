/**
 * 17 ilçe  -  Samsun master SEO/GEO/AEO uyumlu, birbirinden bağımsız içerik.
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
    slug: "ilkadim",
    name: "İlkadım",
    regionLabel: "Samsun merkez",
    answer:
      "İlkadım sosyal medya yönetimi; şehrin yoğun cadde dokusunda klinik, perakende ve kurumsal işletmelerin Instagram vitrini, story ritmi ve mahalle odaklı Meta Ads'ini aynı planda kurmaktır. Wesoco olarak Samsun Sosyal Medya bünyesinde ölçülebilir sonuçlara bağlarız.",
    seoTitle: "İlkadım Sosyal Medya Yönetimi | Samsun Merkez Ajans",
    seoDesc:
      "İlkadım'da Instagram yönetimi, reels ve Meta Ads. Klinik, perakende ve cadde işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>İlkadım'da sosyal medya yönetimi nedir?</h2>
<p>İlkadım'da yönetim; Cumhuriyet Caddesi ve çevresi gibi yoğun rekabetli bir alanda işletmeyi sıradan "güzel post" döngüsünden çıkarıp müşteri kararına  -  randevu, mağaza ziyareti, DM  -  yönlendirmektir. Instagram vitrini, story temposu ve Meta Ads aynı hedef doğrultusunda birlikte çalışır. Google Benim İşletmem NAP tutarlılığı da güven sinyali üretir.</p>

<h2>Neden İlkadım'da kritik?</h2>
<p>Merkezdeki kliniklerde güven içerikleri, perakendede ürün grid'i, kafelerde atmosfer ve kampanya ayrı diller ister. Aynı cadde üzerinde onlarca rakip hesap varken hatalı kreatif mesaj maliyetini anında artırır. Atakum ve Canik spillover'ı da reklam coğrafyasına dahil edilebilir.</p>
<ul>
<li>Cadde içi rekabet dijital + fiziksel karar anında buluşur.</li>
<li>Kliniklerde güven sinyali, perakendede net ürün görseli dönüşümü belirler.</li>
<li>Yanlış hedefleme = yüksek tıklama, düşük dönüşüm.</li>
</ul>

<h2>İlkadım'da nasıl çalışırız?</h2>
<ol>
<li><strong>Hesap audit:</strong> Mevcut içerik, rakip profilleri, bio ve vitrin değerlendirmesi.</li>
<li><strong>Dil + takvim:</strong> Sektöre özel mesaj, haftalık reels/story planı.</li>
<li><strong>Üretim:</strong> Yerinde veya planlı çekim; stok şablon kullanılmaz.</li>
<li><strong>Yayın + Ads:</strong> Mahalle ve ilgi alanı testleri; medya şeffaf raporlanır.</li>
<li><strong>Aylık skor:</strong> Erişim, mesaj/arama ve üç net aksiyon.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Diş ve estetik klinikleri, güzellik merkezleri, cadde perakendesi, kafeler, bayiler ve kurumsal ofisler. Küçük ekiplerde onay WhatsApp'la hızlı kurulur; kurumsalda yazılı onay katmanı eklenir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>İlkadım: dağınık paylaşım vs planlı yönetim</caption>
<thead><tr><th>Ölçüt</th><th>Dağınık</th><th>Planlı (bizim model)</th></tr></thead>
<tbody>
<tr><td>Vitrin</td><td>Tutarsız grid</td><td>Sektöre özel düzen</td></tr>
<tr><td>Reklam</td><td>Tesadüfi bütçe</td><td>Mahalle + test ölçek</td></tr>
<tr><td>Rapor</td><td>Yok / geç</td><td>Aksiyonlu aylık özet</td></tr>
</tbody></table></div>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, içerik hacmi, yerinde çekim ve reklam yönetimine göre keşif sonrası tekliflenir. Medya harcaması ajans ücretinden ayrıdır; sabit paket fiyatı yazılmaz.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>İlkadım işletmeniz için ücretsiz keşif.</h2>
  <p>Mevcut hesaplarınıza bakalım; merkeze özel yol haritası çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "İlkadım'da hangi sektörlere odaklanıyorsunuz?",
        a: "Klinik, estetik, perakende, kafe/restoran ve kurumsal ofisler. Her sektörün içerik dili ayrı kurulur.",
      },
      {
        q: "Merkez'de Meta Ads maliyeti neden yükselir?",
        a: "Rekabet yoğundur. Doğru kitle, kreatifte dinlenme ve mahalle katmanlarıyla maliyet kontrol edilir; medya şeffaf raporlanır.",
      },
      {
        q: "Sadece Instagram yeterli mi?",
        a: "Çoğu B2C için omurgadır. Form/arama hedefi varsa Meta Ads veya Google Ads eklenir.",
      },
      {
        q: "Keşif ücretli mi?",
        a: "Hayır. İlkadım işletmeniz için ücretsiz keşif planlanır; 24 saat içinde dönüş yapılır.",
      },
    ],
  },

  {
    slug: "atakum",
    name: "Atakum",
    regionLabel: "Sahil / batı",
    answer:
      "Atakum sosyal medya yönetimi; sahil kafelerinden denize bakan restoranlar ve butik otellere uzanan çizgide atmosfer içerikleri, iştah görselleri ve konum reklamını birleştirmektir. Yazın rezervasyon kalabalığı, kışın marka sürekliliği  -  ikisi de ayrı ritim ister.",
    seoTitle: "Atakum Sosyal Medya Yönetimi | Sahil & Restoran",
    seoDesc:
      "Atakum'da Instagram, reels ve konum reklamı. Sahil kafesi, restoran ve otel işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Atakum'da sosyal medya yönetimi nedir?</h2>
<p>Atakum'da yönetim; sahil atmosferini ve müşteri deneyimini tutarlı bir görsel dile çevirip rezervasyon veya masa doluluk hedefine bağlamaktır. Story ritmi yüksektir; reels keşfete taşır, Meta Ads Atakum sahil kuşağını ve İlkadım spillover'ını hedefler. Menü güncellemeleri, yeni sezon kampanyaları ve özel günler aynı takvimde tutulur.</p>

<h2>Neden Atakum'da sahil dili fark yaratır?</h2>
<p>Stok tabak fotoğrafı veya şablon plaj görseli yarışta geride kalır. Gerçek mutfak, gün batımı anı, kadro ve menü detayı etkileşimi artırır. Yazın hafta sonu yoğunluğuna önceden hazırlıklı içerik stoğu kritiktir; son dakika üretimi kalite düşürür.</p>
<ul>
<li>Yazın story temposu en az 5-7 gün/hafta olmalıdır.</li>
<li>Konum + "yemek" ilgi alanı çakışması dönüşüm maliyetini düşürür.</li>
<li>Kışın bilinirlik içerikleri yazın dönüşüm zeminini hazırlar.</li>
</ul>

<h2>Atakum için nasıl çalışırız?</h2>
<ol>
<li>Menü ve rezervasyon CTA'sını netleştiririz.</li>
<li>Haftalık story + aylık reels setini hazırlarız: atmosfer, iştah, ekip.</li>
<li>Yoğun sezon öncesi içerik stoğa alınır.</li>
<li>Konum reklamı Atakum merkezden komşu mahallelere kademeli açılır.</li>
<li>Sade aylık rapor: erişim, mesaj/rezervasyon, üç aksiyon.</li>
</ol>

<h2>Kimler için?</h2>
<p>Sahil kafeleri, balık restoranları, brunch mekânları, butik oteller ve plaj işletmeleri. Küçük mutfak ekiplerinde çekim sakin saatlere planlanır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Atakum: sezonluk denge</caption>
<thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Yaz / yüksek sezon</td><td>Dönüşüm Ads, story hızı, rezervasyon CTA</td></tr>
<tr><td>Kış / düşük sezon</td><td>Marka bilinirliği, stok üretimi, sadık müşteri</td></tr>
</tbody></table></div>

<h2>Fiyat mantığı</h2>
<p>Çekim günü sayısı, reels hacmi ve reklam yönetimine göre değişir. Sezonluk yoğunluk farkı teklifte şeffaf gösterilir; medya ayrı satırdır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik & çekim</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Atakum işletmeniz için ücretsiz keşif.</h2>
  <p>Sahile özel içerik ritminizi birlikte planlayalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Atakum restoranında öncelik nedir?",
        a: "İştah görseli, düzenli reels ve konum odaklı reklam. Rezervasyon/paket CTA'sı bio ve story'de net olmalı.",
      },
      {
        q: "Yazın içerik hızı nasıl artırılır?",
        a: "Sezon öncesi stok üretimi yapılır; sahada hızlı onay ve telefon destekli story ile tempo korunur.",
      },
      {
        q: "Kışın neden yayına devam edilmeli?",
        a: "Kış bilinirliği yazın dönüşüm zeminini kurar. Tamamen susmak sadık müşteriyi de kaybettirir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet. Form veya WhatsApp ile planlanır.",
      },
    ],
  },

  {
    slug: "canik",
    name: "Canik",
    regionLabel: "Merkez doğu",
    answer:
      "Canik sosyal medya yönetimi; İlkadım'ın doğusunda hızla gelişen konut ve ticaret alanında esnaf, klinik ve yeni işletmelerin güvenilir dijital varlığını kurmaktır. Cadde rekabetine göre içerik takvimi, mahalle hedeflemeli Meta Ads ve Google Benim İşletmem uyumu aynı planda yürür.",
    seoTitle: "Canik Sosyal Medya Yönetimi | Samsun Merkez Doğu",
    seoDesc:
      "Canik'te Instagram yönetimi, reels ve Meta Ads. Klinik, esnaf ve yeni işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Canik'te sosyal medya yönetimi nedir?</h2>
<p>Canik'te yönetim; büyüyen yerleşim alanında işletmenin ilçe sakinlerine düzenli ve güvenilir görünmesidir. Yeni açılan mekânlarda kimlik inşası, köklü esnafta ise müşteri tabanını dijitale taşımak ön plana çıkar. Meta Ads'te İlkadım ve Canik çakışma bölgesi sık kullanılan bir hedefleme katmanıdır.</p>

<h2>Neden Canik'te içerik sürekliliği şart?</h2>
<p>İlçe nüfusu büyüdükçe rekabet de artıyor. Aynı mahallede iki kafe veya iki klinik varken düzenli vitrin ve net teklif fark yaratır. Yanlış konumlandırma bütçeyi boşa harcar.</p>
<ul>
<li>Yeni açılan işletmelerde ilk 90 gün kimlik + test reklamı kritiktir.</li>
<li>Klinik ve güzellik merkezlerinde güven içeriği dönüşüm üretir.</li>
<li>Gıda/kafe işletmelerinde hızlı story ve menü güncellemesi önemlidir.</li>
</ul>

<h2>Canik için nasıl çalışırız?</h2>
<ol>
<li>Hesap ve rakip audit; CTA'yı netleştiririz.</li>
<li>Haftalık sürdürülebilir içerik takvimi kurulur.</li>
<li>Planlı çekim veya mevcut görsellerle üretim yapılır.</li>
<li>Mahalle + komşu ilçe Ads testi açılır.</li>
<li>Aylık rapor: erişim, mesaj/arama, üç aksiyon önerisi.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Klinik, güzellik merkezi, kafe/restoran, perakende ve yeni açılan tüm işletmeler. WhatsApp onay hattıyla küçük ekiplerde süreç hızlı tutulur.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Canik: pasif varlık vs aktif yönetim</caption>
<thead><tr><th>Ölçüt</th><th>Pasif</th><th>Aktif (bizim model)</th></tr></thead>
<tbody>
<tr><td>Grid</td><td>Karmaşık, tutarsız</td><td>Marka rengine uygun</td></tr>
<tr><td>Reklam</td><td>Yok / denemeli</td><td>Test + ölçek planı</td></tr>
<tr><td>Müşteri verisi</td><td>Birikmez</td><td>Aylık raporda izlenir</td></tr>
</tbody></table></div>

<h2>Fiyat neye göre değişir?</h2>
<p>İçerik hacmi, çekim sıklığı ve reklam kanallarına göre. Keşif sonrası net teklif; medya harcaması ayrıdır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Canik işletmeniz için ücretsiz keşif.</h2>
  <p>Hesabınıza bakalım; mahalle odaklı net plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Canik'te yeni açılan işletme için ne önerirsiniz?",
        a: "İlk 90 günde kimlik, içerik stoğu ve düşük bütçeli test reklamı.",
      },
      {
        q: "İlkadım reklamıyla Canik aynı anda hedeflenebilir mi?",
        a: "Evet. Çakışma bölgesi verimli bir kitle katmanı sunar; coğrafi sınırlar bütçeyle ayarlanır.",
      },
      {
        q: "Klinik için içerik stratejisi nasıl farklılaşır?",
        a: "Güven öne çıkar: ekip tanıtımı, süreç şeffaflığı, hasta dönüşüm hikâyesi. Sahte yorum veya rating kullanılmaz.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet. 24 saat içinde dönüş yapılır.",
      },
    ],
  },

  {
    slug: "tekkekoy",
    name: "Tekkeköy",
    regionLabel: "Sanayi / doğu",
    answer:
      "Tekkeköy sosyal medya yönetimi; OSB ve sanayi hattındaki B2B firmaların güven iletişimidir. Fabrika sahneleri, referans ve standart belgeler tüketici reels trendinden farklı bir ritim ister. LinkedIn, kurumsal Instagram ve Google Ads hedefe göre seçilir.",
    seoTitle: "Tekkeköy Sosyal Medya Yönetimi | OSB & Sanayi",
    seoDesc:
      "Tekkeköy'de kurumsal sosyal medya, LinkedIn ve Google Ads. Sanayi ve B2B firmalar için Samsun dijital iletişim ajansı · Wesoco.",
    bodyHtml: `
<h2>Tekkeköy'de sosyal medya yönetimi nedir?</h2>
<p>Tekkeköy'de amaç karar vericiye güven vermektir. Saha/fabrika görselleri, ekip, kalite belgesi ve proje teslimi anlatılır. "Viral reels" hedefi dayatılmaz; form ve arama odaklı kampanyalar öne çıkar. Samsun merkez köprüsü hem tedarik hem müşteri hattıdır.</p>

<h2>Neden B2B dili ayrı tutulur?</h2>
<p>Sanayi ve lojistik çevresi tüketici içeriğinin dilinden farklı konuşur. Abartılı vaat kurumsal itibarı zedeler; somut referans ve süreç şeffaflığı daha iyi dönüşüm sağlar.</p>
<ul>
<li>Saha çekimleri güvenlik protokolüne göre planlanır.</li>
<li>Kurumsal onay hattı ve kriz protokolü önceden yazılır.</li>
<li>Rapor: nitelikli lead/form, vanity like değil.</li>
</ul>

<h2>Tekkeköy için nasıl çalışırız?</h2>
<ol>
<li>Onay hatları ve mesaj kısıtları netleştirilir.</li>
<li>Kanal karışımı belirlenir: LinkedIn ve/veya kurumsal Instagram + Google Ads.</li>
<li>Saha çekimi güvenlik kurallarıyla planlanır.</li>
<li>İçerik; referans, süreç, standart ve ekip odaklı üretilir.</li>
<li>Aylık rapor nitelikli mesaj/form üzerine kurulur.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Üretim, lojistik, inşaat malzemeleri, metal-makine ve B2B hizmet firmaları.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Tekkeköy B2B kanalları</caption>
<thead><tr><th>Kanal</th><th>Rol</th></tr></thead>
<tbody>
<tr><td>LinkedIn</td><td>Karar verici görünürlüğü, B2B ağ</td></tr>
<tr><td>Kurumsal Instagram</td><td>Referans, ekip, süreç sahneleri</td></tr>
<tr><td>Google Ads</td><td>Niyetli arama ("Tekkeköy üretim", hizmet adı)</td></tr>
</tbody></table></div>

<h2>Fiyat neye göre değişir?</h2>
<p>Kanal sayısı, onay derinliği ve çekim koşullarına göre. Medya harcaması ayrı satırdadır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Kurumsal Instagram</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Tekkeköy firmanız için ücretsiz keşif.</h2>
  <p>B2B iletişim hedefinizi birlikte netleştirelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "OSB firması için LinkedIn şart mı?",
        a: "Zorunlu değil ama B2B görünürlükte oldukça etkilidir; hedefe göre eklenir.",
      },
      {
        q: "Saha çekimi güvenli planlanır mı?",
        a: "Evet. Firma güvenlik kurallarına göre shot list ve izin alınarak ilerlenir.",
      },
      {
        q: "B2B reklam nasıl çalışır?",
        a: "Mesaj/form ve arama odaklı; karar verici kitleye göre hedefleme yapılır, medya şeffaf raporlanır.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "bafra",
    name: "Bafra",
    regionLabel: "Batı ovalar",
    answer:
      "Bafra sosyal medya yönetimi; pirinç, tarım ve batı ova ticaretinin dijital vitrinini kurmaktır. Yerel üretim hikâyesi, pazar temposu ve bölge esnafı için sürdürülebilir Instagram ritmi + isteğe bağlı konum reklamı öneririz. Samsun şehir ajansı dili dayatılmaz.",
    seoTitle: "Bafra Sosyal Medya Yönetimi | Tarım & Yerel Ticaret",
    seoDesc:
      "Bafra'da üretim hikâyesi, Instagram yönetimi ve konum reklamı. Tarım, gıda ve yerel işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Bafra'da sosyal medya yönetimi nedir?</h2>
<p>Bafra'da yönetim; tarım ve gıda üretiminin güçlü yerel kimliğini dijitalde görünür kılmaktır. Pirinç hasadı, tarladan sofraya süreç anlatımı ve pazar günü hikâyeleri samimi dille işlenir. Ticaret esnafı içinse hizmet süreci, net CTA ve haftalık vitrin omurga oluşturur.</p>

<h2>Neden yerel kimlik korunmalı?</h2>
<p>Bafra pirinç ve tarım kültürüyle özdeşleşen bir ilçedir. Şehir kafe şablonları yerine gerçek üretim sahnesi, ürün detayı ve yerel referans hem güven hem keşfet trafiği üretir. Çarşamba ile birlikte doğu-batı ova hattında reklam testi yapılabilir.</p>
<ul>
<li>Ürün makro görseli stok fotoğraftan çok daha güçlüdür.</li>
<li>Hasat/sezon dönemleri önceden takvime işlenir.</li>
<li>Pazar ve ticaret günleri story temposunu doğal olarak artırır.</li>
</ul>

<h2>Bafra için nasıl çalışırız?</h2>
<ol>
<li>İşletme türüne göre sezon ve pazar takvimi çıkarılır.</li>
<li>Üretim veya hizmet gününe göre çekim planlanır.</li>
<li>Haftalık sürdürülebilir ritim kurulur; abartılı vaat yazılmaz.</li>
<li>İsteğe bağlı Bafra + ova kuşağı Meta Ads testi açılır.</li>
<li>Sipariş/iletişim CTA'sı her içerikte net tutulur.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Tarım ve gıda üreticileri, yerel perakende, restoran/kafe, market ve hizmet işletmeleri.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Bafra işletme türlerine göre öncelikler</caption>
<thead><tr><th>İşletme türü</th><th>Öncelikli içerik</th></tr></thead>
<tbody>
<tr><td>Tarım / gıda üretimi</td><td>Üretim süreci, ürün detayı, hasat anı</td></tr>
<tr><td>Perakende / esnaf</td><td>Ürün vitrin, kampanya, story duyurusu</td></tr>
<tr><td>Restoran / kafe</td><td>Menü, atmosfer, günün önerisi</td></tr>
</tbody></table></div>

<h2>Fiyat mantığı</h2>
<p>Çekim sıklığı ve içerik hacmine göre minimal paketle başlanır; büyüdükçe reklam katmanı eklenir. Keşif sonrası net teklif.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Bafra işletmeniz için ücretsiz keşif.</h2>
  <p>Üretim veya ticaret ritminize uygun plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Tarım işletmesi için sosyal medya işe yarar mı?",
        a: "Evet. Üretim sürecini görünür kılmak, doğrudan sipariş ve dağıtım kanalı kurar.",
      },
      {
        q: "Bafra'da yerinde çekim yapılır mı?",
        a: "Evet. Hasat veya üretim gününe göre planlanır.",
      },
      {
        q: "Şehir dışı ilçeden uzaktan yönetim olur mu?",
        a: "Evet. İçerik onaylı yayınlanır; ihtiyaç halinde planlı yerinde çekim eklenir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "carsamba",
    name: "Çarşamba",
    regionLabel: "Doğu ovalar",
    answer:
      "Çarşamba sosyal medya yönetimi; doğu ovasının ticaret ve sanayi yoğunluğuna uygun kurumsal vitrin ve dönüşüm odaklı reklamdır. Ticaret işletmeleri için net teklif dili, gıda ve perakende için ürün kahramanı içerik, B2B için güven iletişimi ayrı planlanır.",
    seoTitle: "Çarşamba Sosyal Medya Yönetimi | Ticaret & Sanayi",
    seoDesc:
      "Çarşamba'da Instagram yönetimi, Meta Ads ve kurumsal içerik. Ticaret ve sanayi işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Çarşamba'da sosyal medya yönetimi nedir?</h2>
<p>Çarşamba'da yönetim; Samsun doğusundaki ticaret yoğunluğuna  -  havalimanı, sanayi ve ovalar  -  uygun içerik ve reklam stratejisidir. Perakende ve gıda işletmelerinde ürün görseli ve günlük story öne çıkar; kurumsal ve B2B'de referans, süreç ve güven iletişimi baskındır.</p>

<h2>Neden Çarşamba için ayrı plan?</h2>
<p>İlçe hem tarım/gıda hem sanayi hem de ticaret aksı üzerindedir. Aynı şablonla tüm sektörlere ulaşılmaz. Havalimanı yakınlığı lojistik ve kurumsal müşteriler için coğrafi avantaj sunar; reklam coğrafyası buna göre planlanabilir.</p>
<ul>
<li>Ticaret işletmeleri için net CTA ve fiyat şeffaflığı güven üretir.</li>
<li>Gıda/tarım için üretim ve taze ürün hikâyesi işe yarar.</li>
<li>Sanayi/B2B için referans ve standart belgeler öne çıkar.</li>
</ul>

<h2>Çarşamba için nasıl çalışırız?</h2>
<ol>
<li>İşletme türüne göre öncelikli mesaj ve kanal belirlenir.</li>
<li>Haftalık yayın takvimi ve içerik üretim planı kurulur.</li>
<li>Yerinde veya uzaktan çekim planlanır.</li>
<li>Çarşamba merkez + bölge kuşağı reklam testi açılır.</li>
<li>Aylık sade rapor: erişim, mesaj/form ve aksiyon önerileri.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Perakende ve ticaret işletmeleri, gıda/tarım, sanayi firmaları, kafe/restoran ve kurumsal hizmetler.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Çarşamba: sektöre göre içerik önceliği</caption>
<thead><tr><th>Sektör</th><th>Öncelikli içerik</th></tr></thead>
<tbody>
<tr><td>Gıda / tarım</td><td>Üretim, taze ürün, hikâye</td></tr>
<tr><td>Perakende</td><td>Ürün vitrin, kampanya story</td></tr>
<tr><td>B2B / sanayi</td><td>Referans, ekip, süreç</td></tr>
</tbody></table></div>

<h2>Fiyat neye göre değişir?</h2>
<p>Kanal sayısı, içerik hacmi ve reklam yönetimine göre. Keşif sonrası net teklif; medya ayrıdır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Çarşamba işletmeniz için ücretsiz keşif.</h2>
  <p>Sektörünüze özel dil ve plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Çarşamba'da hangi sektörlere hizmet veriyorsunuz?",
        a: "Perakende, gıda/tarım, sanayi/B2B ve kafe/restoran. Her sektörün içerik dili ayrı kurulur.",
      },
      {
        q: "B2B firma için Instagram mı LinkedIn mi?",
        a: "Hedefe göre belirlenir. B2B görünürlük için LinkedIn, müşteri tanıtımı için kurumsal Instagram önerilir; ikisi birlikte de çalışabilir.",
      },
      {
        q: "Havalimanı yakınlığı reklamda kullanılır mı?",
        a: "Lojistik veya kurumsal müşteri hedefinde konum katmanı olarak değerlendirilebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "vezirkopru",
    name: "Vezirköprü",
    regionLabel: "İç kesim",
    answer:
      "Vezirköprü sosyal medya yönetimi; iç kesimdeki tarım, ormancılık ve yerel ticaretin dijital vitrinini sade ama güçlü bir dille kurmaktır. Uzaktan yönetim yeterlidir; ihtiyaç halinde periyodik çekim planlanır. viral hedef dayatılmaz.",
    seoTitle: "Vezirköprü Sosyal Medya Yönetimi | İç Kesim & Tarım",
    seoDesc:
      "Vezirköprü'de Instagram yönetimi ve bölge görünürlüğü. Tarım, esnaf ve yerel işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Vezirköprü'de sosyal medya yönetimi nedir?</h2>
<p>Vezirköprü'de yönetim; tarım, orman ürünleri ve yerel ticaret kimliğini abartısız bir dille dijitale taşımaktır. Büyük şehir reklamcılığı dili yerine samimi ürün ve hizmet anlatımı, net iletişim bilgisi ve haftalık sürdürülebilir ritim önceliklidir.</p>

<h2>Neden süreklilik önce gelir?</h2>
<p>İç kesim işletmelerinde ani kampanya dili uyumsuz görünür. Güvenilir vitrin ve düzenli NAP (isim, adres, telefon) yerel müşterinin güvenini kazanır. Havza ve Ladik hattı komşu kuşak olarak reklamda değerlendirilebilir.</p>
<ul>
<li>Ürün hikâyesi stok görselden çok daha etkilidir.</li>
<li>Hızlı onay için WhatsApp hattı tercih edilir.</li>
<li>Organik ritim oturduktan sonra düşük bütçeli test eklenebilir.</li>
</ul>

<h2>Vezirköprü için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve sürdürülebilir takvim kurulur.</li>
<li>Uzaktan onaylı yayın başlatılır.</li>
<li>İhtiyaç halinde yerinde çekim planlanır.</li>
<li>İsteğe bağlı komşu kuşak Ads testi açılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Tarım ve orman ürünleri, yerel esnaf, perakende ve hizmet işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>Uzaktan sade paketle başlanır; çekim ve reklam ihtiyaç halinde eklenir. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Vezirköprü işletmeniz için ücretsiz keşif.</h2>
  <p>İçinizi rahatlatacak sade bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Vezirköprü'den uzaktan yönetim olur mu?",
        a: "Evet. İçerik onaylı yayınlanır; gerektiğinde planlı yerinde çekim eklenir.",
      },
      {
        q: "Tarım ürünleri için hangi platform?",
        a: "Instagram öncelikli; sipariş hedefi varsa Facebook ve Ads testi eklenir.",
      },
      {
        q: "Komşu ilçelere reklam verilir mi?",
        a: "Evet. Havza, Ladik ve Bafra hattı hedefe göre coğrafi katman olarak eklenebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "terme",
    name: "Terme",
    regionLabel: "Doğu sahil",
    answer:
      "Terme sosyal medya yönetimi; doğu sahil ticaret temposuna uygun düzenli Instagram vitrini, taze ürün ve konum odaklı reklamdır. Restoran, perakende ve hizmet işletmelerinde aynı gün story ve haftalık reels ritmi güveni artırır.",
    seoTitle: "Terme Sosyal Medya Yönetimi | Doğu Sahil",
    seoDesc:
      "Terme'de Instagram yönetimi, story ritmi ve konum reklamı. Doğu sahil işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Terme'de sosyal medya yönetimi nedir?</h2>
<p>Terme'de yönetim; günlük ticaret ve sahil işletme ritmine ayak uyduran yayın disiplinidir. Story ile anlık duyuru, reels ile keşfet, reklamda Terme + Çarşamba kuşağı düşünülür. Sahil restoranlarında taze ürün görseli ve aynı gün duyurusu dönüşümü doğrudan etkiler.</p>

<h2>Neden düzenli vitrin şart?</h2>
<p>Terme hem geçiş hem ticaret noktasıdır; müşteri yerelden ve komşu ilçelerden gelir. Ölü hesap veya eski menü görseli güveni düşürür. Hızlı duyuru ve konum hedeflemeli reklam bu gap'i kapatır.</p>
<ul>
<li>Taze ürün duyurusu aynı gün yapılmalıdır.</li>
<li>Story temposu restoranlar için en az 4-5 gün/hafta olmalıdır.</li>
<li>Konum reklamında Terme + Çarşamba geçiş kuşağı test edilebilir.</li>
</ul>

<h2>Terme için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve CTA netleştirilir.</li>
<li>Haftalık story temposu ve aylık reels seti planlanır.</li>
<li>Uzaktan onaylı yayın; gerektiğinde yerinde çekim.</li>
<li>Konum reklamı Terme merkezden komşu sahile açılır.</li>
<li>Sade aylık rapor: erişim ve mesaj/arama.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Sahil restoranları, kafeler, perakende ve yerel hizmet işletmeleri.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Uzaktan ve yerinde çekimli paket ayrı tekliflenir. Medya harcaması ayrı satırdadır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Terme işletmeniz için ücretsiz keşif.</h2>
  <p>Sahile uygun ritim önerelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Terme'den uzaktan yönetim olur mu?",
        a: "Evet. İçerik onaylı yayınlanır; gerektiğinde yerinde çekim günü planlanır.",
      },
      {
        q: "Sahil restoranı için ne önemli?",
        a: "Taze ürün görseli, hızlı story ve konum hedeflemeli reklam birlikte çalışmalıdır.",
      },
      {
        q: "Çarşamba hattına reklam verilir mi?",
        a: "Evet. İşletme tipine göre komşu sahil kuşağı test edilebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "havza",
    name: "Havza",
    regionLabel: "İç kesim",
    answer:
      "Havza sosyal medya yönetimi; kaplıca turizmi ve yerel ticaretin dijital görünürlüğünü sade bir dille kurmaktır. Konaklama işletmelerinde termal deneyim anlatımı, esnafta ise hizmet sürecinin tutarlı paylaşımı omurga oluşturur.",
    seoTitle: "Havza Sosyal Medya Yönetimi | Kaplıca & Yerel Ticaret",
    seoDesc:
      "Havza'da Instagram yönetimi, konaklama içeriği ve konum reklamı. Kaplıca oteli ve yerel esnaf için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Havza'da sosyal medya yönetimi nedir?</h2>
<p>Havza'da yönetim; kaplıca ve termal turizmin özgün deneyim anlatımıyla konaklama doluluk hedefine bağlanmasıdır. Jenerik "sağlıklı yaşam" stoğu yerine tesisin kendi atmosferi, havuz ortamı, ekip ve erişim kolaylığı öne çıkar. Yerel esnaf içinse haftalık düzenli vitrin yeterlidir.</p>

<h2>Neden termal oteliçin özgün içerik şart?</h2>
<p>Kaplıca işletmelerinde birbirinin kopyası görseller kitleyi karıştırır. İşletmeye özel oda, havuz atmosferi ve konum avantajı  -  Samsun'a yakınlık, erişim kolaylığı  -  ayrıştırıcı mesajlardır. Sezon öncesi stok ve retargeting doluluk için kritiktir.</p>
<ul>
<li>Termal + dinlenme deneyimi görsel + metin olarak birlikte anlatılır.</li>
<li>Sezon öncesi içerik stoğu üretilir; sezon içi reklam ölçeklenir.</li>
<li>Yerel esnaf için minimal haftalık ritim önerilir.</li>
</ul>

<h2>Havza için nasıl çalışırız?</h2>
<ol>
<li>İşletme türüne göre öncelikli mesaj belirlenir.</li>
<li>Konaklama: sezon takvimi, çekim planı, sezon öncesi stok.</li>
<li>Yerel esnaf: sade takvim, uzaktan yönetim, isteğe bağlı Ads.</li>
<li>Meta Ads Havza + Vezirköprü/Ladik kuşağında test edilir.</li>
<li>Sade aylık rapor.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Kaplıca ve termal oteller, pansiyon, kafe ve yerel hizmet işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>Konaklama için sezonluk yoğunluk farkı teklifte gösterilir. Yerel esnaf için sade paket yeterlidir. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Havza işletmeniz için ücretsiz keşif.</h2>
  <p>Kaplıca deneyimini veya yerel ticaret vitrinini birlikte planlayalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Kaplıca oteli için hangi platform öncelikli?",
        a: "Instagram + Meta Ads önceliklidir. Google arama hedefi varsa Google Ads eklenir.",
      },
      {
        q: "Sezon dışında ne yapılır?",
        a: "Marka bilinirliği ve erken rezervasyon mesajları; yüksek sezonda dönüşüm ölçeği açılır.",
      },
      {
        q: "Yerel esnaf için büyük paket şart mı?",
        a: "Hayır. Minimal haftalık ritimle başlanır; büyüdükçe reklam/çekim eklenir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "kavak",
    name: "Kavak",
    regionLabel: "İç kesim",
    answer:
      "Kavak sosyal medya yönetimi; iç kesim esnafının dijital vitrinini abartısız dil ve sürdürülebilir içerik temposuyla kurmaktır. Küçük bütçeye uygun organik ritim önce gelir; dönüşüm hedefi netleşince düşük test reklamı eklenir.",
    seoTitle: "Kavak Sosyal Medya Yönetimi | Yerel Esnaf & Hizmet",
    seoDesc:
      "Kavak'ta sade Instagram yönetimi ve bölge görünürlüğü. Küçük işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Kavak'ta sosyal medya yönetimi nedir?</h2>
<p>Kavak'ta yönetim; işletmeye özgü hizmet ve ürün anlatımının düzenli ve güvenilir şekilde paylaşılmasıdır. Anlaşılır dil, net CTA ve sade vitrin yerel müşterinin güvenini kazanır. Komşu ilçelere görünürlük için düşük bütçeli reklam ihtiyaç halinde planlanır.</p>

<h2>Neden sürdürülebilir ritim?</h2>
<p>Aşırı içerik taahhüdü küçük ekiplerde tutulmaz ve hesabın ölmesine yol açar. Haftada birkaç kaliteli paylaşım, günde zoraki post'tan çok daha değerlidir.</p>
<ul>
<li>Önce bio, grid ve net iletişim bilgisi düzenlenir.</li>
<li>Organik ritim oturduğunda reklam eklenir.</li>
<li>Uzaktan yönetim ve WhatsApp onay hattıyla tempo korunur.</li>
</ul>

<h2>Kavak için nasıl çalışırız?</h2>
<ol>
<li>Hesap ve rakip hızlı audit.</li>
<li>Haftalık sürdürülebilir takvim kurulur.</li>
<li>Planlı çekim veya mevcut görsellerle üretim.</li>
<li>İsteğe bağlı komşu kuşak Ads testi.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Perakende, kafe, atölye ve yerel hizmet işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>İçerik hacmine göre ölçeklenir. Büyüdükçe çekim ve reklam katmanı eklenir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Kavak işletmeniz için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Küçük işletme paketi var mı?",
        a: "Evet. Platform ve hacme göre başlanır; büyüdükçe reklam/çekim eklenir.",
      },
      {
        q: "Çekim Kavak'ta yapılır mı?",
        a: "Evet. Planlı yerinde çekim veya mevcut görsellerle üretim mümkündür.",
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
    slug: "alacam",
    name: "Alaçam",
    regionLabel: "Batı sahil",
    answer:
      "Alaçam sosyal medya yönetimi; yazlık ve sahil işletmelerin sezon öncesi içerik stoğunu hazırlayıp yaz aylarında rezervasyon ve doluluğa bağlamaktır. Kışın marka bilinirliği, yazın dönüşüm reklamı  -  12 ay aynı yoğunluk dayatılmaz.",
    seoTitle: "Alaçam Sosyal Medya Yönetimi | Sahil & Konaklama",
    seoDesc:
      "Alaçam'da sezonluk Instagram yönetimi ve rezervasyon reklamı. Otel, pansiyon ve sahil işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Alaçam'da sosyal medya yönetimi nedir?</h2>
<p>Alaçam'da yönetim; sezon dalgalanmasına göre içerik ve reklam ağırlığını doğru zamanda değiştirmektir. Sahil ve yazlık atmosfer görsellerı, oda/konaklama turu ile menü setleri sezon öncesi üretilir; yaz aylarında Meta Ads ile erken rezervasyon hedeflenir.</p>

<h2>Neden sezon planı şart?</h2>
<p>Yazlık talep ani yükselir. Kışın sessiz hesap, yazın yetişemeyen içerik demektir. Yakakent ve Bafra komşuluğu hem müşteri hem kıyaslama alanıdır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Alaçam sezon dengesi</caption>
<thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Kış / düşük sezon</td><td>Marka, stok üretimi, erken rezervasyon mesajı</td></tr>
<tr><td>Yaz / yüksek sezon</td><td>Dönüşüm Ads, hızlı story, rezervasyon CTA</td></tr>
</tbody></table></div>

<h2>Alaçam için nasıl çalışırız?</h2>
<ol>
<li>Sezon takvimi keşifte çıkarılır.</li>
<li>Sahil ve konaklama çekimi planlanır.</li>
<li>Sezon öncesi organik stok tamamlanır.</li>
<li>Sezon içi Meta Ads ve yanıt süresi artırılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Otel, pansiyon, yazlık kiralama, kafe, restoran ve sahil hizmetleri.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Sezonluk hacim farkı teklifte şeffaf gösterilir. Medya ayrı satırdadır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Alaçam sezon planı için ücretsiz keşif.</h2>
  <p>Sezon öncesi ne hazırlanmalı, birlikte bakalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Sezonluk paket nasıl olur?",
        a: "Yoğun sezonda içerik/reklam artırılır; düşük sezonda temel ritim ve marka çalışması korunur.",
      },
      {
        q: "Kışın reklam gerekir mi?",
        a: "Çoğunlukla bilinirlik ve erken rezervasyon için düşük bütçe yeterlidir.",
      },
      {
        q: "Yazlık kiralama işletmeleri için ne önerirsiniz?",
        a: "Sezon öncesi ilan görseli, süreç anlatımı ve hedefli Ads testi.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "19-mayis",
    name: "19 Mayıs",
    regionLabel: "Batı",
    answer:
      "19 Mayıs sosyal medya yönetimi; batı Samsun'da tarım ve ticaret ağırlıklı yerel işletmeler için sade ve sürdürülebilir dijital varlıktır. Komşu Bafra ve Alaçam hattında görünürlük artırmak isteyen işletmelere özel reklam planı sunulur.",
    seoTitle: "19 Mayıs Sosyal Medya Yönetimi | Batı Samsun",
    seoDesc:
      "19 Mayıs ilçesinde Instagram yönetimi ve bölge görünürlüğü. Yerel esnaf ve işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>19 Mayıs'ta sosyal medya yönetimi nedir?</h2>
<p>19 Mayıs'ta yönetim; yerel işletmenin dijitalde güvenilir ve düzenli görünmesidir. Tarım, ticaret veya hizmet sektörü olsun; samimi ürün/hizmet anlatımı ve net iletişim bilgisi yerel müşteriyi çeker. Bafra ve Alaçam hattı reklam coğrafyasında değerlendirilebilir.</p>

<h2>Neden sade başlamak daha iyi?</h2>
<p>Küçük ekiplerde sürdürülemeyen içerik planı hesabın ölmesine yol açar. Önce bio düzenlemesi, tutarlı grid ve net CTA kurulur; organik ritim oturduğunda reklam eklenir.</p>
<ul>
<li>Haftada az ama kaliteli paylaşım, günde zoraki içerikten değerlidir.</li>
<li>Uzaktan yönetim büyük şehire ihtiyaç duymadan mümkündür.</li>
<li>Komşu ilçe hedeflemesiyle erişim alanı genişletilebilir.</li>
</ul>

<h2>19 Mayıs için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve öncelikli mesaj netleştirmesi.</li>
<li>Haftalık minimal takvim kurulur.</li>
<li>Uzaktan yayın; ihtiyaç halinde çekim planı yapılır.</li>
<li>İsteğe bağlı komşu kuşak Ads testi.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Tarım, perakende, kafe ve yerel hizmet işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>Minimal paketle başlanır; büyüdükçe çekim ve reklam katmanı eklenir. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>19 Mayıs işletmeniz için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Küçük ilçede sosyal medya işe yarar mı?",
        a: "Evet. Yerel görünürlük, güven ve komşu ilçe müşterisi için etkilidir.",
      },
      {
        q: "Ne sıklıkta içerik paylaşılmalı?",
        a: "Sürdürülebilir ritim keşifte belirlenir; abartılı taahhüt verilmez.",
      },
      {
        q: "Bafra hattına reklam verilir mi?",
        a: "Evet. Hedefe göre komşu kuşak coğrafi katman olarak eklenebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "salipazari",
    name: "Salıpazarı",
    regionLabel: "Doğu iç",
    answer:
      "Salıpazarı sosyal medya yönetimi; doğu iç kesimde yerel güven ve hizmet sürekliliğini dijital vitrinle desteklemektir. Uzaktan yönetim ve aralıklı çekim yeterlidir; viral hedef dayatılmaz.",
    seoTitle: "Salıpazarı Sosyal Medya Yönetimi | Doğu İç Kesim",
    seoDesc:
      "Salıpazarı'nda sade Instagram yönetimi ve komşu ilçe görünürlüğü. Yerel esnaf için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Salıpazarı'nda sosyal medya yönetimi nedir?</h2>
<p>Salıpazarı'nda yönetim; abartısız dil, hizmet süreci ve müşteri güvenini haftalık düzenli paylaşımla göstermektir. Terme ve Çarşamba komşuluğu reklam coğrafyasında değerlendirilebilir. WhatsApp onay hattı küçük ekiplerde süreci hızlandırır.</p>

<h2>Neden süreklilik kampanyadan önce gelir?</h2>
<p>İç kesim işletmelerinde ani büyük kampanya dili uyumsuz görünür. Güvenilir vitrin ve net iletişim bilgisi zaman içinde daha sağlam dönüşüm üretir.</p>
<ul>
<li>Uzaktan yönetim ile yerinde çekime gerek duymadan başlanabilir.</li>
<li>Organik ritim oturduktan sonra düşük test reklamı eklenir.</li>
<li>Komşu sahil kuşağı spillover test edilebilir.</li>
</ul>

<h2>Salıpazarı için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve sade takvim kurulur.</li>
<li>Uzaktan onaylı yayın başlatılır.</li>
<li>İhtiyaç halinde yerinde çekim planlanır.</li>
<li>İsteğe bağlı komşu kuşak Ads testi açılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Yerel esnaf, hizmet ve küçük üretim işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>Ölçeklenebilir küçük paket. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Salıpazarı için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Küçük ilçede sosyal medya yönetimi mümkün mü?",
        a: "Evet. Uzaktan yönetim ve sade içerik planıyla kolayca başlanır.",
      },
      {
        q: "Ne sıklıkta içerik?",
        a: "Sürdürülebilir ritim keşifte belirlenir.",
      },
      {
        q: "Viral hedef koyuyor musunuz?",
        a: "Hayır. Güvenilir vitrin ve yerel görünürlük önceliklidir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "asarcik",
    name: "Asarcık",
    regionLabel: "İç kesim",
    answer:
      "Asarcık sosyal medya yönetimi; iç Samsun'daki yerel işletmelerin güvenilir dijital varlığını minimal maliyetle sürdürmektir. Uzaktan yönetim ve düşük bütçeli test reklamıyla başlanır; büyüdükçe katman eklenir.",
    seoTitle: "Asarcık Sosyal Medya Yönetimi | İç Kesim Yerel",
    seoDesc:
      "Asarcık'ta sade Instagram yönetimi ve bölge görünürlüğü. Yerel işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Asarcık'ta sosyal medya yönetimi nedir?</h2>
<p>Asarcık'ta yönetim; hizmet anlatımı, ekip güveni ve tutarlı vitrindir. Canik ve İlkadım hattı hem müşteri havuzu hem de reklam coğrafyası olarak değerlendirilebilir. Turizm otel dili kullanılmaz; işletmeye özgü sade ve samimi anlatım tercih edilir.</p>

<h2>Neden komşu ilçe görünürlüğü önemli?</h2>
<p>İç kesim yerleşiminde büyüme çoğunlukla komşu ilçe kitlesiyle başlar. Doğru konum hedeflemesi küçük bütçeyle etki alanını genişletir.</p>
<ul>
<li>Organik ritim güven zeminini kurar.</li>
<li>Düşük test reklamı isteğe bağlı eklenir.</li>
<li>Uzaktan yönetim ve WhatsApp onay hattıyla süreç basitleşir.</li>
</ul>

<h2>Asarcık için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve öncelikli mesaj netleştirmesi.</li>
<li>Haftalık minimal takvim kurulur.</li>
<li>Uzaktan yayın; ihtiyaç halinde çekim günü planlanır.</li>
<li>İsteğe bağlı komşu ilçe Ads testi.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Yerel esnaf, hizmet ve küçük işletmeler.</p>

<h2>Fiyat mantığı</h2>
<p>Küçük bütçeye uygun sade paket. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Asarcık için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Asarcık'ta ajans hizmeti var mı?",
        a: "Evet. 17 ilçede uzaktan veya yerinde çekimle hizmet veriyoruz.",
      },
      {
        q: "Bütçe küçükse ne yapılır?",
        a: "Önce organik ritim ve net CTA; reklam isteğe bağlı düşük testle eklenir.",
      },
      {
        q: "Canik veya İlkadım'a reklam verilir mi?",
        a: "İşletme tipine göre komşu ilçe coğrafi katman olarak eklenebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "ladik",
    name: "Ladik",
    regionLabel: "Göl / yayla",
    answer:
      "Ladik sosyal medya yönetimi; göl ve yayla turizm deneyimini işletmeye özgün bir dille anlatıp hafta sonu ve sezon rezervasyonuna bağlamaktır. Jenerik doğa stoğu yerine tesisin kendi atmosferi, gölün mevsimsel değişimi ve erişim kolaylığı öne çıkarılır.",
    seoTitle: "Ladik Sosyal Medya Yönetimi | Göl & Yayla Turizmi",
    seoDesc:
      "Ladik'te göl ve yayla konaklama için Instagram, reels ve sezon reklamı. Turizm işletmeleri için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Ladik'te sosyal medya yönetimi nedir?</h2>
<p>Ladik'te yönetim; gölün ve yaylanın işletmenin kendi penceresiyle görünmesidir. Oda turu, sabah sisi, göl kenarı atmosfer ve mevsimsel değişim sahneleri sezon öncesi üretilir. Hafta sonu önce Samsun, sezon içi daha geniş kuşak hedeflenir.</p>

<h2>Neden özgün içerik şart?</h2>
<p>Göl manzarası fotoğrafı her işletmede benzerdir. Fark; hijyen, konum rahatlığı, erişim ve konuk deneyimi anlatımındadır. Havza komşuluğu termal + doğa paketi kombinasyonu için fırsat sunar.</p>
<ul>
<li>Hafta sonu odaklı yayın takvimi kurulur.</li>
<li>Sezon öncesi stok; sezon içi dönüşüm Ads.</li>
<li>Kış: marka bilinirliği + erken rezervasyon mesajı.</li>
</ul>

<h2>Ladik için nasıl çalışırız?</h2>
<ol>
<li>Sezon ve hafta sonu yoğunluğu takvime işlenir.</li>
<li>Hava/ışık penceresine göre çekim planlanır.</li>
<li>Sezon öncesi stok tamamlanır; sezon içi reklam ölçeklenir.</li>
<li>Retargeting site/profil ziyaretçilerine açılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Otel, pansiyon, bungalov, kafe ve doğa deneyimi işletmeleri.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Sezon hacmi ve çekim planına göre. Keşif sonrası net teklif; medya ayrıdır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Ladik konaklamanız için ücretsiz keşif.</h2>
  <p>Göl deneyiminizi ayrıştıran bir içerik planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Ladik göl oteli için hangi platform öncelikli?",
        a: "Instagram + Meta Ads önceliklidir. Google arama hedefi varsa Google Ads eklenir.",
      },
      {
        q: "Sezon dışında ne yapılır?",
        a: "Marka bilinirliği ve erken rezervasyon içerikleri; yazda dönüşüm ölçeği açılır.",
      },
      {
        q: "Havza kaplıca turizmiyle birlikte hedefleme yapılır mı?",
        a: "İki ilçeyi kapsayan bir doğa + termal paketiyle işletme tipine göre değerlendirilebilir.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "ayvacik",
    name: "Ayvacık",
    regionLabel: "Doğu iç",
    answer:
      "Ayvacık sosyal medya yönetimi; doğu iç Samsun'daki küçük işletmelerin mahalle güveni ve yerel görünürlüğünü dijitalde sürdürmektir. Sade ritim, uzaktan yönetim ve isteğe bağlı komşu kuşak reklamıyla başlanır.",
    seoTitle: "Ayvacık Sosyal Medya Yönetimi | Doğu İç Samsun",
    seoDesc:
      "Ayvacık'ta sade Instagram yönetimi ve bölge görünürlüğü. Küçük işletmeler için Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Ayvacık'ta sosyal medya yönetimi nedir?</h2>
<p>Ayvacık'ta yönetim; işletme hikâyesini ve hizmet sürecini net, samimi bir dille dijitale taşımaktır. Terme ve Salıpazarı komşuluğu reklam coğrafyasında değerlendirilebilir. Büyük ajans jargonu ve sahte vaat kullanılmaz.</p>

<h2>Neden güvenilirlik önce gelir?</h2>
<p>Küçük ölçekli yerleşimde müşteri güveni kişisel tavsiyeden gelir; dijital varlık bunu destekler. Tutarsız veya ölü hesap bu güveni zedeler.</p>
<ul>
<li>Haftalık sade ritim sürdürülebilirdir.</li>
<li>WhatsApp onay hattı küçük ekiplerde hız kazandırır.</li>
<li>Organik vitrin oturduğunda düşük test reklamı eklenir.</li>
</ul>

<h2>Ayvacık için nasıl çalışırız?</h2>
<ol>
<li>Hesap audit ve minimal takvim kurulur.</li>
<li>Uzaktan onaylı yayın başlatılır.</li>
<li>İhtiyaç halinde yerinde çekim planlanır.</li>
<li>İsteğe bağlı komşu kuşak Ads testi açılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Yerel esnaf, kafe/market ve hizmet işletmeleri.</p>

<h2>Fiyat mantığı</h2>
<p>Minimal paket. Keşif sonrası netleşir.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Ayvacık için ücretsiz keşif.</h2>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Hangi kanal öncelikli?",
        a: "Çoğu işletme için Instagram yeterlidir.",
      },
      {
        q: "Terme veya Salıpazarı kitlesine nasıl ulaşılır?",
        a: "Konum ve ilgi alanı hedeflemesiyle komşu kuşağa görünürlük planlanabilir.",
      },
      {
        q: "Çekim nerede yapılır?",
        a: "Ayvacık'ta veya ihtiyaç halinde yakın ilçede planlanır.",
      },
      {
        q: "Keşif ücretsiz mi?",
        a: "Evet.",
      },
    ],
  },

  {
    slug: "yakakent",
    name: "Yakakent",
    regionLabel: "Batı sahil",
    answer:
      "Yakakent sosyal medya yönetimi; yazlık ve sahil konaklama işletmelerinin sezon boyunca doluluk hedefine ulaşması için erken içerik stoğu ve Meta Ads'tir. Kışın sessiz hesap, yazın yetişemeyen içerik anlamına gelir; iki dönem ayrı planlanır.",
    seoTitle: "Yakakent Sosyal Medya Yönetimi | Batı Sahil & Yazlık",
    seoDesc:
      "Yakakent'te yazlık ve sahil konaklama için sezonluk Instagram ve rezervasyon reklamı. Samsun sosyal medya ajansı · Wesoco.",
    bodyHtml: `
<h2>Yakakent'te sosyal medya yönetimi nedir?</h2>
<p>Yakakent'te yönetim; sahil ve yazlık atmosfer görsellerini sezon öncesi hazırlayıp yaz aylarında dönüşüme bağlamaktır. Oda turu, sahil görüntüsü, menü ve konaklama süreci; sezon başlamadan stoğa alınır. Sezon içinde Meta Ads ile erken rezervasyon ölçeklenir.</p>

<h2>Neden sezon planlaması kritik?</h2>
<p>Batı sahil kuşağında yazlık talep ani yükselir. Alaçam ve Bafra komşuluğu hem rekabet hem müşteri havuzudur. Son dakika içerik üretimi kaliteyi düşürür ve fırsatı kaçırır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Yakakent sezon dengesi</caption>
<thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Kış / düşük sezon</td><td>Stok üretimi, marka, erken rezervasyon mesajı</td></tr>
<tr><td>Yaz / yüksek sezon</td><td>Dönüşüm Ads, hızlı story, rezervasyon CTA</td></tr>
</tbody></table></div>

<h2>Yakakent için nasıl çalışırız?</h2>
<ol>
<li>Sezon takvimi keşifte çıkarılır.</li>
<li>Sahil ve konaklama çekimi sezon öncesi planlanır.</li>
<li>Organik stok tamamlanır; sezon içi reklam açılır.</li>
<li>Yanıt süresi ve story hızı yoğun sezonda artırılır.</li>
</ol>

<h2>Kimler için uygun?</h2>
<p>Otel, pansiyon, yazlık kiralama, kafe, restoran ve sahil hizmetleri.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Sezonluk hacim farkı teklifte şeffaf gösterilir. Medya ayrı satırdadır.</p>

<h2>İlgili hizmetler</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/bolgeler">Tüm ilçeler</a></p>

<div class="page-cta">
  <h2>Yakakent sezon planı için ücretsiz keşif.</h2>
  <p>Sahil sezonunu birlikte hazırlayalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
    faqs: [
      {
        q: "Sezonluk paket nasıl çalışır?",
        a: "Yoğun sezonda içerik/reklam artırılır; düşük sezonda temel ritim ve stok üretimi korunur.",
      },
      {
        q: "Kışın reklam gerekli mi?",
        a: "Çoğunlukla bilinirlik ve erken rezervasyon için düşük ölçek yeterlidir.",
      },
      {
        q: "Alaçam ile aynı hedefleme yapılır mı?",
        a: "Her işletme için ayrı plan kurulur; coğrafi örtüşme bütçe dengesiyle yönetilir.",
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
  // Tüm ilçeleri zengin içerikle güncelle (improve-districts-samsun.ts + patch)
  const { spawnSync } = await import("child_process");
  spawnSync("npx", ["tsx", "prisma/improve-districts-samsun.ts"], { stdio: "inherit", cwd: process.cwd() });
  spawnSync("npx", ["tsx", "prisma/patch-district-words.ts"], { stdio: "inherit", cwd: process.cwd() });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
