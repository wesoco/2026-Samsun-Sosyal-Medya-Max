/**
 * İnce ilçe sayfalarını (~80-180 kelime) master SEO/GEO seviyesine çıkarır.
 * Her sayfa yerel niyet + karşılaştırma + süreç + SSS bağlantısı taşır.
 *
 *   npx tsx prisma/deepen-districts.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UPDATES: Record<string, string> = {
  carsamba: `
<h2>Çarşamba'da sosyal medya yönetimi nedir?</h2>
<p>Çarşamba sosyal medya yönetimi; mahallede tanınan esnafı dijitalde de güvenilir ve güncel gösteren düzenli bir vitrin kurmaktır. Amaç "her gün viral" değil: bio, grid, story ritmi ve net CTA (telefon, konum, WhatsApp) aynı dilde ilerlesin. Perakende, kafe ve atölyelerde ürün yakın planı + işletme hikâyesi dönüşümü büyütür. Meta Ads gerektiğinde Çarşamba merkezden Terme, Bafra, Alaçam üçgenine kontrollü açılır.</p>

<h2>Neden Çarşamba'da sade ama tutarlı plan şart?</h2>
<p>Küçük-orta ekiplerde aşırı üretim planı iki haftada çöker. Çarşamba'da kazanan model; sürdürülebilir haftalık ritim, abartısız dil ve rakip hesaplardan daha taze görünen bir vitrindir. İlkadım ajans dili veya büyükşehir turizm şablonu Çarşamba esnafına uymaz; yerel ağız, net fiyat/teklif ve mahalle güveni öne çıkar.</p>
<ul>
<li>Önce hesap temizliği (eski kapak, boş highlight, karışık grid)</li>
<li>Sonra içerik stoğu; reklam en son ve düşük testle</li>
<li>Komşu sahil spillover'ı işletme tipine göre seçilir</li>
</ul>

<h2>Çarşamba'da nasıl çalışırız?</h2>
<ol>
<li><strong>Hızlı audit:</strong> Bio, NAP, rakip 5 hesap, mevcut reklam geçmişi.</li>
<li><strong>Takvim:</strong> Haftada sürdürülebilir story + aylık reels seti.</li>
<li><strong>Üretim:</strong> Planlı yerinde çekim veya mevcut görsellerle kurgu.</li>
<li><strong>Yayın:</strong> WhatsApp onay hattı; kriz/yanlış bilgi protokolü kısa tutulur.</li>
<li><strong>Ads (isteğe bağlı):</strong> Çarşamba + komşu ilçe; mesaj/arama hedefi.</li>
<li><strong>Rapor:</strong> Erişim, mesaj, üç aksiyon; vanity like listesi yok.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Çarşamba: dağınık paylaşım vs planlı vitrin</caption>
<thead><tr><th>Ölçüt</th><th>Dağınık</th><th>Planlı</th></tr></thead>
<tbody>
<tr><td>Görünüm</td><td>Tutarsız grid</td><td>Markaya özel sade dil</td></tr>
<tr><td>Tempo</td><td>Ara sıra / unutulur</td><td>Haftalık sürdürülebilir</td></tr>
<tr><td>Reklam</td><td>Tesadüfi</td><td>Düşük test → ölçek</td></tr>
</tbody></table></div>

<h2>Kimler için uygun?</h2>
<p>Perakende, kafe/restoran, atölye, mahalle hizmetleri ve büyümek isteyen küçük işletmeler. "360 ajans paketi" dayatılmaz; ihtiyaç büyüdükçe çekim ve reklam katmanı eklenir.</p>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, içerik hacmi ve yerinde çekim gününe göre keşif sonrası tekliflenir. Medya harcaması ajans ücretinden ayrı satırdır; uydurma paket fiyatı yazılmaz.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik üretimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/bafra">Bafra</a> · <a href="/bolgeler/terme">Terme</a></p>

<div class="page-cta">
  <h2>Çarşamba işletmeniz için ücretsiz keşif.</h2>
  <p>Mevcut hesabınıza bakalım; mahalleye uygun net bir ritim çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  terme: `
<h2>Terme'de sosyal medya yönetimi nedir?</h2>
<p>Terme sosyal medya yönetimi; ticaret, tarım ve sahil dinamiğini dengeleyen güven odaklı dijital iletişimdir. B2B'ye yakın işletmelerde süreç ve ürün güveni; B2C'de sade mahalle dili tercih edilir. Instagram kurumsal tutulabilir; form veya sektörel mesajlaşma gerektiğinde eklenir. Meta Ads'te yerel + sektörel ilgi katmanları kullanılır.</p>

<h2>Neden yerel dil Terme'de kritik?</h2>
<p>Büyükşehir ajans şablonu yerel müşteriyle rezonans kurmaz. Çarşamba, Bafra, Alaçam hattı hem iş ağı hem müşteri taşır; içerik dili abartılı vaatten uzak, ölçülebilir ve onaylı olmalıdır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Terme iletişim tercihleri</caption>
<thead><tr><th>İhtiyaç</th><th>Kanal / format</th></tr></thead>
<tbody>
<tr><td>Ürün/hizmet güveni</td><td>Süreç videosu, gerçek ekip</td></tr>
<tr><td>Referans</td><td>Proje / teslim hikâyesi</td></tr>
<tr><td>Lead</td><td>Form, WhatsApp, mesaj</td></tr>
<tr><td>Yerel bilinirlik</td><td>Instagram + konum Ads</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Onay hattı ve yasak mesajlar yazılır.</li>
<li>Üretim gününe göre shot list hazırlanır.</li>
<li>İçerik takvimi aylık skor kartına bağlanır.</li>
<li>İsteğe bağlı Google Ads (niyetli arama) eklenir.</li>
</ol>

<h2>Kimler için?</h2>
<p>Ticaret, hizmet, kafe/restoran ve yerel perakende. Sektöre göre dil ayrıca sadeleştirilir; jenerik ajans postu kullanılmaz.</p>

<h2>Fiyat</h2>
<p>Onay derinliği, çekim ve kanal sayısına göre keşif sonrası. Medya ayrıdır.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik & çekim</a> · <a href="/bolgeler/carsamba">Çarşamba</a> · <a href="/bolgeler/bafra">Bafra</a></p>

<div class="page-cta">
  <h2>Terme işletmeniz için ücretsiz keşif.</h2>
  <p>Yerel dilinize uygun güven odaklı bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  tekkekoy: `
<h2>Tekkeköy'de sosyal medya yönetimi nedir?</h2>
<p>Tekkeköy sosyal medya yönetimi; sanayi ve OSB ortamında karar vericiye güven veren kurumsal iletişimdir. Fabrika/saha görselleri, ekip, standartlar, proje teslimi ve referans anlatımı omurgadır. "Viral reels" hedefi dayatılmaz; form, arama ve nitelikli görüşme metrikleri öne çıkar. LinkedIn, Instagram ve Google Ads ihtiyaca göre seçilir.</p>

<h2>Neden B2B dili Tekkeköy'de ayrı kurulur?</h2>
<p>Sanayi ve lojistik çevresi tüketici dilinden farklıdır. Abartılı vaat itibarı zedeler. İlkadım ve Canik hattı tedarik ve görünürlük alanıdır; içerik hem yerel hem sektörel okunabilir olmalıdır. Güvenlik kuralları çekimde yazılı shot list ile yönetilir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Tekkeköy kanal seçimi</caption>
<thead><tr><th>Hedef</th><th>Önerilen kanal</th></tr></thead>
<tbody>
<tr><td>Karar verici görünürlük</td><td>LinkedIn + kurumsal Instagram</td></tr>
<tr><td>Niyetli arama</td><td>Google Ads (dönüşüm izlemeli)</td></tr>
<tr><td>Yerel bilinirlik</td><td>Meta Ads / konum</td></tr>
<tr><td>Süreç güveni</td><td>Saha videosu, standart anlatımı</td></tr>
</tbody></table></div>

<h2>Nasıl ilerleriz?</h2>
<ol>
<li>Mesaj kısıtları ve onay hatları yazılı hale getirilir.</li>
<li>Kanal karışımı keşifte netleşir (gereksiz kanal açılmaz).</li>
<li>Saha çekimi planlı; PPE ve firma kurallarına uygun.</li>
<li>Rapor: nitelikli lead / form; vanity like listesi yok.</li>
</ol>

<h2>Kimler için?</h2>
<p>Sanayi, lojistik, B2B hizmet, tedarik ve lokal ticaret firmaları. Yerel B2C işletmelerde dil sadeleştirilir ama OSB şablonu kopyalanmaz.</p>

<h2>Fiyat</h2>
<p>Kanal sayısı, onay derinliği ve saha çekimine göre. Medya ayrı satırdır.</p>

<p><a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">Kurumsal yönetim</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/canik">Canik</a></p>

<div class="page-cta">
  <h2>Tekkeköy OSB / firmanız için keşif.</h2>
  <p>Karar vericiye hitap eden sade bir iletişim planı kuralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  bafra: `
<h2>Bafra'da sosyal medya yönetimi nedir?</h2>
<p>Bafra sosyal medya yönetimi; tarım, gıda ve yerel üretim kimliğini ürün kahramanı görsellerle satışa bağlamaktır. Üretim süreci, ürün makro ve aile/işletme yüzü ön plandadır. Şehir restoran reels şablonu dayatılmaz; samimi dil, net sipariş CTA'sı ve sürdürülebilir haftalık ritim yeterlidir. Dağıtım/sipariş hedefi varsa Çarşamba, Terme, Alaçam hattına düşük bütçeli Ads açılır.</p>

<h2>Neden "nostalji postu" yetmez?</h2>
<p>Turistik nostalji tek başına sipariş getirmez. Dönüşüm; taze ürün, net saat/adres, paket CTA'sı ve tutarlı ürün grid'inden gelir. Yanlış iddia veya abartılı "organik" dili güveni düşürür; doğru ve ölçülü anlatım tercih edilir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Bafra gıda iletişimi</caption>
<thead><tr><th>İçerik</th><th>İşlev</th></tr></thead>
<tbody>
<tr><td>Makro ürün</td><td>İştah + ürün kahramanı</td></tr>
<tr><td>Üretim videosu</td><td>Hijyen ve ustalık algısı</td></tr>
<tr><td>Pazar story</td><td>Aynı gün trafik</td></tr>
<tr><td>Konum Ads</td><td>Doğu sahil + mahalle</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Ürün listesi ve haftalık yoğun günler (pazar/bayram) takvime işlenir.</li>
<li>Makro + üretim çekimi planlanır; ışık ve hijyen görünümü korunur.</li>
<li>Sezonluk/bayram öncesi stok artırılır.</li>
<li>Doğu sahil konum + ilgi Ads testi; medya ayrı raporlanır.</li>
</ol>

<h2>Kimler için?</h2>
<p>Tarım ürünü, fırın, market, restoran, yerel gıda ticareti ve gastronomi işletmeleri.</p>

<h2>Fiyat</h2>
<p>Çekim günü ve kampanya yoğunluğuna göre keşif sonrası teklif. Medya ayrıdır.</p>

<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik & çekim</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/carsamba">Çarşamba</a> · <a href="/bolgeler/alacam">Alaçam</a></p>

<div class="page-cta">
  <h2>Bafra işletmeniz için keşif.</h2>
  <p>Ürün dilinize özel iştah odaklı bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  havza: `
<h2>Havza'da sosyal medya yönetimi nedir?</h2>
<p>Havza sosyal medya yönetimi; kaplıca ve termal turizm deneyimini konaklama işletmesine özel görsel dille anlatmaktır. Termal tesis, oda turu, kahvaltı ve konaklama atmosferi içerikleri sezon öncesi stoğa alınır. Jenerik "kaplıca stoğu" kullanılmaz; fark hijyen, yemek, erişim ve işletmenin kendi ortamındadır. Erken rezervasyon için Meta Ads ve gerektiğinde Google arama eklenir.</p>

<h2>Neden özgün dil Havza'da zorunlu?</h2>
<p>Kaplıca görüntüsü pek çok işletmede ortaktır. Kazanan; tesis detayı, kahvaltı masası, termal havuz atmosferi ve net rezervasyon yoludur. İlkadım çıkışlı günübirlik ile konaklamalı kitle ayrı hedeflenebilir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Havza turizm iletişimi</caption>
<thead><tr><th>Dönem</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Sezon öncesi</td><td>Tesis/oda stok, kapak yenileme, erken Ads</td></tr>
<tr><td>Yoğun sezon</td><td>Story hızı, rezervasyon CTA, yanıt süresi</td></tr>
<tr><td>Düşük sezon</td><td>Marka, hafta sonu kaçış, remarketing</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Sezon ve hafta sonu yoğunluğu takvime işlenir.</li>
<li>Işık/hava penceresine göre çekim planlanır.</li>
<li>Sezon öncesi organik stok tamamlanır.</li>
<li>Sezon içi dönüşüm Ads + site ziyaretçisine remarketing.</li>
</ol>

<h2>Kimler için?</h2>
<p>Termal oteller, pansiyonlar, kafe ve doğa deneyimi işletmeleri. Havza'ya özel dil; genel kaplıca kopyası yapılmaz.</p>

<h2>Fiyat</h2>
<p>Sezon hacmi ve reklam yönetimine göre. Medya ayrıdır.</p>

<p><a href="/hizmetler/drone-cekimi">Drone çekimi</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/vezirkopru">Vezirköprü</a> · <a href="/bolgeler/ladik">Ladik</a></p>

<div class="page-cta">
  <h2>Havza konaklamanız için keşif.</h2>
  <p>İşletmenize özgü sezon planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  vezirkopru: `
<h2>Vezirköprü'de sosyal medya yönetimi nedir?</h2>
<p>Vezirköprü sosyal medya yönetimi; doğa, elma bahçeleri ve yerel turizm potansiyelini özgün konaklama dili ve erken rezervasyonla desteklemektir. Şablon doğa fotoğrafı yarışı yerine ürün/konaklama detayı, ortak alan, ekip ve misafir deneyimiyle ayırt edilirsiniz. Sezon öncesi stok + retargeting, doluluk için kritiktir.</p>

<h2>Neden "daha güzel manzara" yetmez?</h2>
<p>Görsel rekabet yoğundur. Kazanan; tesis kalitesi, oda turu, net rezervasyon yolu ve atmosfer detayıdır. Havza, Ladik komşuluğu hem fırsat hem rekabettir; içerik dili Vezirköprü'ye özgü tutulur.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Vezirköprü turizm rekabeti</caption>
<thead><tr><th>Yanlış yaklaşım</th><th>Doğru yaklaşım</th></tr></thead>
<tbody>
<tr><td>Şablon doğa stoğu</td><td>Tesis / ekip / deneyim reels</td></tr>
<tr><td>Sezon içi panik içerik</td><td>Sezon öncesi stok + Ads</td></tr>
<tr><td>Belirsiz rezervasyon</td><td>Net CTA + hızlı yanıt</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Rakip taraması ve kapak görseli yenileme</li>
<li>Tesis/ortam reels seti + drone (ihtiyaca göre)</li>
<li>Sezon öncesi Ads + retargeting</li>
<li>Yoğun sezonda story hızı ve yanıt SLA</li>
<li>Kış: marka + erken rezervasyon mesajı</li>
</ol>

<h2>Kimler için?</h2>
<p>Otel, bungalov, restoran, tur ve yerel hizmet. Her işletmeye aynı şablon giydirilmez.</p>

<h2>Fiyat</h2>
<p>Sezon öncesi üretim yoğunluğu teklifte şeffaf gösterilir. Medya ayrıdır.</p>

<p><a href="/hizmetler/drone-cekimi">Drone</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler/havza">Havza</a></p>

<div class="page-cta">
  <h2>Vezirköprü için keşif.</h2>
  <p>Rekabet taramasıyla size özel konumlandırma çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  kavak: `
<h2>Kavak'ta sosyal medya yönetimi nedir?</h2>
<p>Kavak sosyal medya yönetimi; süt, tarım ve yerel üretim hikâyesini güvenle anlatmaktır. Üretim süreci, ürün makro ve aile/işletme yüzü ön plandadır. Şehir restoran reels şablonu dayatılmaz; samimi dil, net sipariş CTA'sı ve sürdürülebilir haftalık ritim yeterlidir. Dağıtım/sipariş hedefi varsa Samsun merkezi ve komşu ilçelere düşük bütçeli Ads açılır.</p>

<h2>Neden üretim günü çekimi önemli?</h2>
<p>Stok görsel güven üretmez. Alıcı "nerede, nasıl, kim" görmek ister. Kavak'ta çoğu işletme için organik vitrin ilk adımdır; reklam ikinci katmandır. Abartılı "doğal/organik" iddiaları doğru değilse kullanılmaz.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Kavak üretim iletişimi</caption>
<thead><tr><th>İhtiyaç</th><th>Çözüm</th></tr></thead>
<tbody>
<tr><td>Güven</td><td>Üretim günü videosu</td></tr>
<tr><td>Sipariş</td><td>Net CTA + WhatsApp</td></tr>
<tr><td>Bölgesel görünürlük</td><td>İç kesim konum Ads</td></tr>
<tr><td>Süreklilik</td><td>Minimal haftalık ritim</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Ürün ve sezon takvimi çıkarılır.</li>
<li>Üretim gününe göre çekim planlanır.</li>
<li>Sade Instagram vitrini + story ritmi kurulur.</li>
<li>İsteğe bağlı iç kesim Ads testi eklenir.</li>
</ol>

<h2>Kimler için?</h2>
<p>Gıda, tarım, yerel üretim ve küçük ticaret. Büyük 360 paket dayatılmaz.</p>

<h2>Fiyat</h2>
<p>Minimal paketle başlanır; büyüdükçe çekim/reklam eklenir. Keşif sonrası netleşir.</p>

<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/bolgeler/bafra">Bafra</a> · <a href="/bolgeler/asarcik">Asarcık</a></p>

<div class="page-cta">
  <h2>Kavak üretiminiz için keşif.</h2>
  <p>Ürününüzü güvenle anlatan sade bir plan kuralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  alacam: `
<h2>Alaçam'da sosyal medya yönetimi nedir?</h2>
<p>Alaçam sosyal medya yönetimi; taze ürün ve sahil esnaf temposuna uygun hızlı story + dürüst vitrindir. Günün ürününü aynı gün anlatmak, yavaş kurumsal dilden daha çok işe yarar. Kısa reels ve yüksek story temposu omurgadır. Onay hattı hızlı tutulur; telefon + kurgu hibriti sık kullanılır. Bafra, Çarşamba geçiş müşterisi için konum hedeflemesi kritiktir.</p>

<h2>Neden "lüks restoran" dili tutmaz?</h2>
<p>İlçe temposu taze, net fiyat/CTA ve samimi yüz ister. Yavaş kurumsal takvim ürünü bayatlatır. Abartılı stok görseli yerine gerçek ürün ve tezgâh güven üretir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Alaçam sahil temposu</caption>
<thead><tr><th>Format</th><th>Rol</th></tr></thead>
<tbody>
<tr><td>Story</td><td>Günün ürünü / anlık duyuru</td></tr>
<tr><td>Kısa reels</td><td>Keşfet + iştah</td></tr>
<tr><td>Konum Ads</td><td>Mahalle + batı sahil</td></tr>
<tr><td>Hızlı onay</td><td>WhatsApp / telefon</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Günün ürünü story formatı netleştirilir.</li>
<li>Haftalık kısa reels stoğu üretilir.</li>
<li>Düşük bütçeli mahalle Ads testi açılır.</li>
<li>Yoğun akşam/hafta sonu için önceden stok tutulur.</li>
</ol>

<h2>Kimler için?</h2>
<p>Restoran, kafe, perakende ve yerel hizmet işletmeleri.</p>

<h2>Fiyat</h2>
<p>Story yoğunluğu ve çekim sıklığına göre. Keşif sonrası teklif; medya ayrıdır.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/bolgeler/bafra">Bafra</a> · <a href="/bolgeler/19-mayis">19 Mayıs</a></p>

<div class="page-cta">
  <h2>Alaçam için ücretsiz keşif.</h2>
  <p>Sahil temposunuza uygun hızlı bir yayın planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  salipazari: `
<h2>Salıpazarı'nda sosyal medya yönetimi nedir?</h2>
<p>Salıpazarı sosyal medya yönetimi; sakin tempo ve yerel güvenle sürdürülebilir dijital vitrindir. Abartısız dil, hizmet süreci ve müşteri yüzü düzenli gösterilir. Uzaktan yönetim + aralıklı çekim çoğu işletme için yeterlidir; viral reels dayatması yoktur. Komşu ilçe spillover'ı reklamda ihtiyaca göre kullanılır.</p>

<h2>Neden süreklilik kampanyadan önemli?</h2>
<p>İç kesimde ani "kampanya dili" yerine güvenilir vitrin, güncel iletişim bilgisi ve net hizmet anlatımı daha çok işe yarar. WhatsApp onay hattı küçük ekiplerde hız kazandırır. Büyük şehir ajans jargonu güveni düşürür.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Salıpazarı küçük işletme modeli</caption>
<thead><tr><th>Yaklaşım</th><th>Sonuç</th></tr></thead>
<tbody>
<tr><td>Ara sıra post</td><td>Unutulan hesap</td></tr>
<tr><td>Minimal haftalık ritim</td><td>Güvenilir vitrin</td></tr>
<tr><td>Komşu kuşak Ads</td><td>Kontrollü büyüme</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Hesap temizliği ve bio/CTA netleştirme</li>
<li>Minimal haftalık içerik ritmi</li>
<li>Uzaktan yayın + aralıklı yerinde çekim</li>
<li>İsteğe bağlı komşu kuşak Ads testi</li>
</ol>

<h2>Kimler için?</h2>
<p>Yerel esnaf, hizmet ve küçük üretim. Ölçeklenebilir küçük paketle başlanır.</p>

<h2>Fiyat</h2>
<p>Küçük bütçeye uygun; keşif sonrası netleşir. Medya ayrıdır.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/vezirkopru">Vezirköprü</a> · <a href="/bolgeler/kavak">Kavak</a></p>

<div class="page-cta">
  <h2>Salıpazarı için ücretsiz keşif.</h2>
  <p>İşletmenize uygun sakin ve sürdürülebilir bir plan kuralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  asarcik: `
<h2>Asarcık'ta sosyal medya yönetimi nedir?</h2>
<p>Asarcık sosyal medya yönetimi; sakin yerleşimde organik vitrini güçlü tutup komşu kuşaktan da müşteri açan sade dijital varlıktır. Hizmet anlatımı, ekip güveni ve güncel iletişim bilgisi omurgadır. Küçük bütçede organik ritim + isteğe bağlı düşük test reklamı önerilir.</p>

<h2>Neden komşu kuşak kritik?</h2>
<p>Küçük ölçekli yerleşimde büyüme çoğu zaman komşu ilçe görünürlüğünden gelir. Kavak, Bafra hattı lojistik ve görünürlük köprüsüdür. Boş hesap veya eski kapak, yerel güveni dijitalde zayıflatır.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Asarcık büyüme katmanları</caption>
<thead><tr><th>Katman</th><th>Ne zaman</th></tr></thead>
<tbody>
<tr><td>Organik vitrin</td><td>İlk adım, her zaman</td></tr>
<tr><td>Asarcık + Kavak Ads</td><td>Organik oturunca</td></tr>
<tr><td>Bafra spillover</td><td>İşletme tipine göre test</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Bio, NAP ve CTA temizliği</li>
<li>Sürdürülebilir organik ritim</li>
<li>Uzaktan yönetim veya planlı çekim</li>
<li>İsteğe bağlı düşük Ads testi</li>
</ol>

<h2>Kimler için?</h2>
<p>Yerel esnaf, hizmet ve küçük işletmeler. Büyük paket dayatılmaz.</p>

<h2>Fiyat</h2>
<p>Küçük bütçeye uygun sade paket. Keşif sonrası netleşir.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/kavak">Kavak</a> · <a href="/bolgeler/bafra">Bafra</a></p>

<div class="page-cta">
  <h2>Asarcık için ücretsiz keşif.</h2>
  <p>Komşu kuşak dahil net ve küçük bir plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  ladik: `
<h2>Ladik'te sosyal medya yönetimi nedir?</h2>
<p>Ladik sosyal medya yönetimi; göl, doğa ve termal potansiyeli olan bu ilçede mahalle güveni ve Havza turizm koridoruna yakın ama kendi kimliğini koruyan sade bir dijital vitrindir. Amaç abartılı turizm vaadi değil; hizmet, konaklama veya yerel ticaretin dürüst anlatımıdır. Organik ritim önceliklidir.</p>

<h2>Neden kendi dili korunmalı?</h2>
<p>Havza kaplıca şablonu her işletmeye uymaz. Yanlış vaat şikâyet ve düşük dönüşüm üretir. Ladik'te kazanan; net konum, net hizmet ve güvenilir yüzdür. Küçük ekiplerde WhatsApp onay hattı yeterlidir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Ladik konumlandırma</caption>
<thead><tr><th>Yanlış</th><th>Doğru</th></tr></thead>
<tbody>
<tr><td>Şablon kaplıca dili</td><td>İşletmeye özgü hizmet anlatımı</td></tr>
<tr><td>Ara sıra paylaşım</td><td>Minimal ama düzenli ritim</td></tr>
<tr><td>Hedefsiz reklam</td><td>Havza, Vezirköprü kontrollü test</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Hesap ve konumlandırma audit'i</li>
<li>Minimal haftalık içerik planı</li>
<li>Aralıklı çekim veya mevcut görsellerle üretim</li>
<li>İsteğe bağlı koridor Ads testi</li>
</ol>

<h2>Kimler için?</h2>
<p>Konaklama, yerel hizmet, esnaf ve küçük işletmeler.</p>

<h2>Fiyat</h2>
<p>Ölçeklenebilir küçük paket. Keşif sonrası; medya ayrıdır.</p>

<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/havza">Havza</a> · <a href="/bolgeler/vezirkopru">Vezirköprü</a></p>

<div class="page-cta">
  <h2>Ladik için keşif.</h2>
  <p>Kimliğinizi bozmayan sade bir plan kuralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),

  yakakent: `
<h2>Yakakent'te sosyal medya yönetimi nedir?</h2>
<p>Yakakent sosyal medya yönetimi; batı sahil hattında yerel işletmeyi görünür ve güvenilir kılmaktır. Perakende, hizmet ve turizmde ürün/süreç anlatımı öne çıkar. Uzaktan yönetim + planlı çekim modeli çoğu zaman yeterlidir. Reklamda Yakakent + Alaçam, 19 Mayıs kuşağı düşünülür; turizm şablonu dayatılmaz.</p>

<h2>Neden sahil hattı görünürlüğü önemli?</h2>
<p>Müşteri ve tedarik ağı komşu ilçelerle iç içedir. Boş veya tutarsız hesap, yerel güveni dijitalde zayıflatır. Sahil konumlu işletmelerde konum etiketi ve görsel doğruluk önemlidir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Yakakent kanal dengesi</caption>
<thead><tr><th>İşletme tipi</th><th>Öncelik</th></tr></thead>
<tbody>
<tr><td>Esnaf / perakende</td><td>Instagram vitrin + konum Ads</td></tr>
<tr><td>Konaklama / turizm</td><td>Sahil drone + sezon stok</td></tr>
<tr><td>Hizmet</td><td>Net CTA + yorum/mesaj yönetimi</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li>Hızlı audit ve rakip taraması</li>
<li>Sürdürülebilir içerik takvimi</li>
<li>Planlı çekim veya uzaktan kurgu</li>
<li>İsteğe bağlı Alaçam, 19 Mayıs Ads testi</li>
<li>Aylık sade rapor: erişim + mesaj</li>
</ol>

<h2>Kimler için?</h2>
<p>Yerel esnaf, hizmet, konaklama ve küçük-orta işletmeler.</p>

<h2>Fiyat</h2>
<p>İçerik hacmi ve çekime göre. Keşif sonrası; medya ayrıdır.</p>

<p><a href="/hizmetler/instagram-yonetimi">Instagram</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik</a> · <a href="/bolgeler/alacam">Alaçam</a> · <a href="/bolgeler/19-mayis">19 Mayıs</a></p>

<div class="page-cta">
  <h2>Yakakent işletmeniz için keşif.</h2>
  <p>Sahil hattına uygun net bir görünürlük planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Teklif al</a>
</div>
`.trim(),
};

async function main() {
  let updated = 0;
  for (const [slug, bodyHtml] of Object.entries(UPDATES)) {
    const words = bodyHtml.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    const res = await prisma.district.updateMany({
      where: { slug },
      data: { bodyHtml },
    });
    console.log(`${slug}: ${res.count} updated, ~${words} words`);
    updated += res.count;
  }
  console.log(`Done. ${updated} districts deepened.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
