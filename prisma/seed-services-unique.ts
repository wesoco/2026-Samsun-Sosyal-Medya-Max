/**
 * 10 hizmet — SEO / GEO / AEO özgün içerik (tek kaynak).
 * Answer-first lead, Nedir/Neden/Nasıl/Kim/Fiyat, tablo, iç link, FAQ.
 * Çalıştır: npm run db:seed-services
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Faq = { q: string; a: string };

type ServiceSeed = {
  slug: string;
  title: string;
  lead: string;
  seoTitle: string;
  seoDesc: string;
  bodyHtml: string;
  faqJson: Faq[];
};

const SERVICES: ServiceSeed[] = [
  {
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    lead:
      "Trabzon sosyal medya yönetimi; Instagram, Facebook ve gerektiğinde TikTok’ta içerik takvimi, yayın, topluluk yanıtları ve aylık skor kartını tek operasyonda birleştirir. Amaç beğeni değil; mesaj, randevu ve mağaza ziyareti gibi ölçülebilir temas.",
    seoTitle: "Sosyal Medya Yönetimi Trabzon | İçerik, Yayın & Rapor · Wesoco",
    seoDesc:
      "Trabzon’da sosyal medya yönetimi: post, story, reels, onay hattı ve aylık rapor. Başlangıç / Büyüme / Kurumsal paket. Wesoco güvencesi.",
    bodyHtml: `
<h2>Sosyal medya yönetimi nedir?</h2>
<p><strong>Sosyal medya yönetimi</strong>, markanın dijital vitrinini haftalık ritimle üreten, yayınlayan, yorum ve mesajları yöneten, ay sonunda hangi içeriğin işe yaradığını yazılı gösteren operasyon disiplinidir. Trabzon Sosyal Medya (Wesoco) olarak Instagram ve Facebook’u aynı takvimde; ihtiyaç halinde TikTok veya LinkedIn’i aynı strateji altında yönetiriz. “Ara sıra post atmak” yönetim değildir; brief → üretim → onay → yayın → topluluk → skor kartı zinciri yönetimdir.</p>
<p>Bu sayfa operasyon ürünüdür. Ajans seçimi ve ortaklık çerçevesi için <a href="/hizmetler/sosyal-medya-ajansi">Trabzon sosyal medya ajansı</a> sayfasına bakın. Yalnız Instagram’a kilitlenmek istiyorsanız <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> daha dar kapsamdadır. Reklam (Meta/Google) bu paketin içine gizlenmez; ihtiyaçta ayrı satır olarak eklenir.</p>

<h2>Trabzon’da neden kritik?</h2>
<p>Ortahisar’dan Of’a, Akçaabat’tan Yomra’ya yerel rekabet artık cadde kadar telefonda da yaşanır. Müşteri menüye, randevuya veya fiyata bakmadan önce profili tarar. Organik erişim düşerken story ve reels ritmi kesilince hesap “kapalı işyeri” gibi görünür. Düzenli yönetim; turizm, eğitim ve bayram sezonlarını takvime işler, mahalle dilini korur, ekip değişse bile süreklilik sağlar.</p>
<p>Küçük işletmede darboğaz zamandır: mutfak veya klinik akşamı bitince içerik kalmaz. Kurumsalda darboğaz onaydıır: kim neyi yayınlayacak belli değilse ay kaybedilir. Paketler bu iki gerçeğe göre ayrılır. Raporlarda vanity like listesi değil; kaydetme, profil ziyareti, DM, arama ve form sinyalleri izlenir.</p>

<h2>Nasıl yönetilir? (adım adım)</h2>
<ol>
<li><strong>Keşif ve audit:</strong> Bio, grid, mevcut stok, rakip hesaplar, hedef CTA (mesaj / rezervasyon / adres / form).</li>
<li><strong>Paket seçimi:</strong> Başlangıç (~8–12 post + story ritmi + 2–4 reels), Büyüme (yüksek kota ve daha sık story), Kurumsal (çok katmanlı onay, kriz protokolü, derin rapor).</li>
<li><strong>Takvim ve üretim:</strong> Ay başında onaylı plan; yerinde çekim veya stoktan kırılım. Senaryo brief’i çekimden önce yazılır.</li>
<li><strong>Yayın + topluluk:</strong> Yorum ve DM ton rehberi; acil konular size eskalasyon.</li>
<li><strong>Aylık skor kartı:</strong> Erişim, kaydetme, mesaj/arama ve sonraki ayın üç net aksiyonu.</li>
</ol>
<p>İlk 7 günde audit özeti; ilk 30 günde dil ve grid oturur. Reklam ihtiyacı doğarsa <a href="/hizmetler/meta-ads">Meta Ads</a> veya <a href="/hizmetler/google-ads">Google Ads</a> ayrı ürün olarak eklenir.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Sosyal medya yönetimi paket karşılaştırması</caption>
<thead><tr><th>Ölçüt</th><th>Başlangıç</th><th>Büyüme</th><th>Kurumsal</th></tr></thead>
<tbody>
<tr><td>Post / ay</td><td>~8–12</td><td>Daha yüksek kota</td><td>Geniş + kampanya setleri</td></tr>
<tr><td>Story</td><td>Haftalık ritim</td><td>Yoğun ritim</td><td>Kampanya + kriz hazırlığı</td></tr>
<tr><td>Reels</td><td>2–4</td><td>Artırılmış set</td><td>Seri + lansman</td></tr>
<tr><td>Onay</td><td>Tek hat</td><td>Tek hat, hızlı tur</td><td>Çok katmanlı yazılı hat</td></tr>
<tr><td>Rapor</td><td>Aylık skor</td><td>Aylık + aksiyon</td><td>Derin skor + yönetim özeti</td></tr>
</tbody></table></div>

<h2>Kimler için uygundur?</h2>
<p>Restoran, kafe, klinik, güzellik, perakende, emlak, otel, eğitim ve yerel hizmet işletmeleri. İçerik üretmek isteyip düzenli yetiştiremeyen ekipler Başlangıç veya Büyüme ile başlar; birden fazla onay mercii olan markalar Kurumsal’a geçer. B2B LinkedIn omurgası için <a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">kurumsal sosyal medya yönetimi</a> ayrıdır.</p>

<h2>Avantajlar</h2>
<ul>
<li>Marka dili tek elden; dağınık “herkes bir şey atsın” kaosu biter.</li>
<li>Sezon ve kampanya takvime işlenir; panik paylaşımı azalır.</li>
<li>Onay hattı yazılıdır; yanlış yayın riski düşer.</li>
<li>Skor kartı vanity metrik değil, CTA sinyallerine bakar.</li>
<li>18 ilçede uzaktan yönetim + planlı yerinde çekim mümkün.</li>
</ul>

<h2>Fiyat mantığı</h2>
<p>Platform sayısı, aylık kota, yerinde çekim günü ve onay derinliği teklifi şekillendirir. Sabit TL listesi yayınlamıyoruz; keşif sonrası paket ve kapsam yazılı gelir. Medya harcaması ajans ücretinden ayrı satırdır. “Yönetim fiyatına reklam dahil” belirsizliği yoktur.</p>

<h2>Sektöre göre planlama</h2>
<p>Restoran ve kafede menü, story temposu ve rezervasyon CTA’sı; klinik ve güzellikte güven, uzmanlık ve randevu yolu; otel ve turizmde konum, deneyim ve sezon takvimi; otomotiv ve emlakta lansman ile showroom ölçeği; perakende ve B2B’de ürün vitrini veya LinkedIn güveni öne çıkar. Tek şablonla tüm sektörleri yönetmek mümkün değildir.</p>
<p>İçerik stoğu yoksa <a href="/hizmetler/icerik-uretimi-cekim">çekim</a> aynı aya eklenir. Reklam ihtiyacı doğduğunda <a href="/hizmetler/meta-ads">Meta Ads</a> veya <a href="/hizmetler/google-ads">Google Ads</a> ayrı satırdır — yönetim paketinin içine “gizli medya” gömülmez. 18 ilçede uzaktan operasyon ve planlı yerinde gün aynı kalite çubuğunda yürür.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">İçerik &amp; çekim</a> · <a href="/hizmetler/sosyal-medya-ajansi">Sosyal medya ajansı</a> · <a href="/bolgeler">İlçeler</a> · <a href="/blog">Blog</a></p>

<div class="page-cta">
  <h2>Yönetim paketini netleştirelim</h2>
  <p>Mevcut hesabınıza bakalım; Başlangıç, Büyüme veya Kurumsal’dan hangisinin size uyduğunu birlikte seçelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Trabzon’da sosyal medya yönetimi ne işe yarar?",
        a: "Hesabı düzenli ritimle besler; içerik, yayın, topluluk ve aylık skor kartını tek operasyonda toplar. Amaç görünürlük + mesaj/randevu gibi ölçülebilir temas.",
      },
      {
        q: "Başlangıç paketinde ne kadar içerik var?",
        a: "Yaklaşık 8–12 post, düzenli story ritmi ve ayda 2–4 reels. Nihai kota keşifte sektöre göre netleşir.",
      },
      {
        q: "Büyüme ile Kurumsal farkı nedir?",
        a: "Büyüme daha yüksek hacim ve tempo demektir. Kurumsal’da onay katmanları, kriz protokolü ve daha derin rapor vardır.",
      },
      {
        q: "Reklam yönetim paketinin içinde mi?",
        a: "Hayır. Organik operasyon ayrıdır; Meta Ads veya Google Ads ihtiyaç halinde ayrı kapsamla eklenir.",
      },
      {
        q: "Hangi platformlar yönetilir?",
        a: "Omurga Instagram ve Facebook’tur. TikTok veya LinkedIn ihtiyaç ve sektöre göre eklenir.",
      },
      {
        q: "Onay süreci nasıl işler?",
        a: "Taslaklar size iletilir; onay sonrası yayınlanır. Kurumsal paketlerde birden fazla onay mercii tanımlanır.",
      },
      {
        q: "Nasıl başlarız?",
        a: "İletişim formundan veya WhatsApp’tan ücretsiz keşif alın; 24 saat içinde dönüş yapılır.",
      },
    ],
  },
  {
    slug: "sosyal-medya-ajansi",
    title: "Trabzon Sosyal Medya Ajansı",
    lead:
      "Trabzon sosyal medya ajansı arayan markalar için Wesoco bünyesinde yerel ortaklık: strateji, üretim, reklam ve rapor tek çatıda. Bu sayfa “neden ajans?” sorusunu cevaplar; günlük paket kotası ayrı üründür.",
    seoTitle: "Trabzon Sosyal Medya Ajansı | Wesoco Yerel Ortak",
    seoDesc:
      "Trabzon’da sosyal medya ajansı seçimi: referans, süreç şeffaflığı, yerel dil ve Wesoco güvencesi. Ortaklık çerçevesi burada anlatılır.",
    bodyHtml: `
<h2>Sosyal medya ajansı nedir?</h2>
<p><strong>Sosyal medya ajansı</strong>; markanın dijital sesini tek seferlik freelance iş gibi değil, uzun dönemli ortaklıkla taşıyan ekiptir. Trabzon Sosyal Medya, Wesoco çatısında Ortahisar merkezli çalışır: keşif, strateji, içerik, gerektiğinde reklam ve aylık skor aynı masada durur. Bu sayfa “kimle çalışmalıyım, neden yerel ajans?” sorusuna yanıt verir — AI ve arama motorlarının alıntılayabileceği net bir tanımdır.</p>
<p>Günlük post kotası, Başlangıç / Büyüme / Kurumsal karşılaştırma ve operasyon detayı için <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> ürün sayfasına gidin. Ajans sayfası ile yönetim sayfasını bilerek ayırdık: biri güven ve çerçeve, diğeri paket ve ritim.</p>

<h2>Trabzon’da ajans nasıl seçilir?</h2>
<p>Referans görmeden vaat dinlemek risklidir. İyi ajans; yazılı kapsam, net onay hattı, medya bütçesini ayrı raporlama ve 30–90 günlük öğrenme penceresi koyar. Trabzon’da restoran ile klinik, otel ile B2B aynı dilde konuşmaz. Uzaktan “büyükşehir şablonu” ile Akçaabat veya Maçka hesabı yönetmek genelde tutmaz; sezon, mahalle ve cadde rekabeti yerelde bilinir.</p>
<p>Ajans görüşmesinde sorulması gerekenler: kim onaylıyor, medya kimin hesabında, rapor hangi KPI’ları içeriyor, 90 günde ne öğrenilecek? Bu sorulara net cevap veremeyen yapıyla uzun dönemli ortaklık kurulmaz.</p>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Ajans seçim kontrol listesi</caption>
<thead><tr><th>Kriter</th><th>Zayıf işaret</th><th>Güçlü işaret</th></tr></thead>
<tbody>
<tr><td>Kapsam</td><td>“Her şeyi yaparız” belirsizliği</td><td>Yazılı dahil/hariç maddeleri</td></tr>
<tr><td>Medya</td><td>Bütçe ajans faturasında kaybolur</td><td>Harcama sizin hesapta, ayrı satır</td></tr>
<tr><td>Rapor</td><td>Sadece beğeni ekran görüntüsü</td><td>CTA + sonraki ayın üç aksiyonu</td></tr>
<tr><td>Yerel dil</td><td>Şablon metin / stok fotoğraf</td><td>Mekân, sezon, ilçe gerçekliği</td></tr>
<tr><td>Süreç</td><td>Onay belirsiz</td><td>Tek veya çok katmanlı yazılı hat</td></tr>
</tbody></table></div>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Ücretsiz keşif:</strong> Hedef, mevcut hesap, rakip durumu, yaklaşık medya bandı (ayrı).</li>
<li><strong>Yol haritası:</strong> İlk 30 günde dil + vitrin; sonra reklam veya hacim artışı.</li>
<li><strong>Ürün seçimi:</strong> Operasyon için yönetim paketi; kanal özelinde Instagram, Meta Ads veya Google Ads.</li>
<li><strong>Aylık değerlendirme:</strong> Vanity metrik değil, CTA sonuçları ve sonraki ayın üç aksiyonu.</li>
</ol>

<h2>Kimler için?</h2>
<p>Ajans arayan yerel işletmeler, franchise / bayi yapıları ve içerik + reklam + ölçümü tek muhatapta toplamak isteyen markalar. Full funnel (içerik + Ads + ölçüm) arıyorsanız <a href="/hizmetler/dijital-pazarlama-ajansi">dijital pazarlama ajansı</a> çerçevesi daha geniştir.</p>

<h2>Fiyat mantığı</h2>
<p>Ajans ücreti kapsam ve ekip yüküne göre keşif sonrası tekliflenir. Uydurma “en ucuz paket” listesi yoktur. Medya harcaması sizin hesabınızda kalır; ajans yönetim ücreti ayrı ve şeffaf yazılır.</p>

<h2>Wesoco ile yerel ortaklık ne demek?</h2>
<p>Wesoco güvencesi; sözleşme disiplini, teslim standardı ve şeffaf iletişim demektir. WhatsApp hızı ile kurumsal mail disiplini aynı anda yönetilebilir. “En ucuz post” yarışına girmeyiz; ölçülebilir temas ve tutarlı marka dili önceliklidir. Ortahisar ofisinden 18 ilçeye planlı çekim ve uzaktan operasyon aynı kalite çubuğunda yürür.</p>
<p>Keşifte “her şeyi yaparız” demek yerine hangi ürünün size yettiğini söyleriz. Bazen yalnızca çekim, bazen yalnızca Ads, bazen tam yönetim doğrudur. Ajansın işi doğru çerçeveyi seçmektir — yanlış ürünle başlamak hem bütçeyi hem motivasyonu eritir.</p>
<p>Referans ve sektör deneyimi vaatten daha değerlidir. Turizm sezonu, bayram takvimi ve mahalle rekabeti Trabzon’a özgüdür; genel Türkiye şablonu çoğu zaman tutmaz. Bu yüzden ilk 30 gün dil ve vitrin oturtmaya, sonraki 60 gün öğrenmeye ayrılır.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/dijital-pazarlama-ajansi">Dijital pazarlama</a> · <a href="/hizmetler/reklam-ajansi">Reklam ajansı</a> · <a href="/blog">Blog</a></p>

<div class="page-cta">
  <h2>Wesoco ile keşif görüşmesi</h2>
  <p>Referans, süreç ve size uygun ürün karışımını 30 dakikada netleştirelim.</p>
  <a href="/#iletisim" class="btn btn-primary">İletişime geç</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Sosyal medya ajansı ile yönetim sayfası neden ayrı?",
        a: "Ajans sayfası ortaklık ve seçim kriterlerini anlatır. Yönetim sayfası paket kotası ve operasyon detayını verir.",
      },
      {
        q: "Wesoco nedir?",
        a: "Trabzon Sosyal Medya’nın bağlı olduğu yapısal güvencedir; süreç, sözleşme ve kalite standardı Wesoco disipliniyle yürür.",
      },
      {
        q: "Sadece danışmanlık olur mu?",
        a: "Evet. Tam operasyon istemeyen markalarda strateji + denetim modeli konuşulabilir; kapsam keşifte yazılır.",
      },
      {
        q: "Hangi ilçelerde hizmet veriyorsunuz?",
        a: "Trabzon’un 18 ilçesinde uzaktan yönetim ve planlı yerinde çekim ile çalışıyoruz.",
      },
      {
        q: "Ajans seçerken en kritik soru nedir?",
        a: "Medya kimin hesabında, rapor hangi KPI’ları içeriyor ve 90 günde ne öğrenilecek — bu üçü net değilse ortaklık risklidir.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Form veya WhatsApp ile ücretsiz keşif. 24 saat içinde dönüş yapılır.",
      },
    ],
  },
  {
    slug: "instagram-yonetimi",
    title: "Trabzon Instagram Yönetimi",
    lead:
      "Trabzon Instagram yönetimi; bio, grid, reels hook, story CTA ve topluluk yanıtlarını tek sistemde tutar. Amaç takipçi satın almak değil; keşfet, profil ziyareti ve mesaj dönüşümüdür.",
    seoTitle: "Instagram Yönetimi Trabzon | Reels, Story & Grid · Wesoco",
    seoDesc:
      "Trabzon’da Instagram hesabı yönetimi: içerik takvimi, reels, story, bio/vitrin ve rapor. Keşfet + mesaj odaklı. Wesoco.",
    bodyHtml: `
<h2>Instagram yönetimi nedir?</h2>
<p><strong>Instagram yönetimi</strong>; profili vitrin gibi kurup haftalık ritimle beslemektir. Bio’daki tek cümlelik teklif, vurgular (highlights), grid dengesi, reels’in ilk saniyesi ve story’deki CTA aynı hedefe bakar. Trabzon Sosyal Medya olarak bu hizmeti bilerek Instagram’a kilitleriz — Facebook duvarı veya LinkedIn burada yan ürün değildir.</p>
<p>Çok platformlu paket arıyorsanız <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> sayfasına gidin. Takipçi satın almak, sahte etkileşim veya “günde 5 rastgele post” yaklaşımı yoktur.</p>

<h2>Neden yalnızca Instagram’a odaklanılır?</h2>
<p>Birçok B2C işletmede müşteri kararı Instagram’da başlar: menü, ekip, mekân, fiyat bandı hissi, WhatsApp’a geçiş. Dağınık platform çabası hem kaliteyi hem onay süresini bozar. Önce Instagram’da dil ve ritim oturur; ihtiyaç halinde <a href="/hizmetler/meta-ads">Meta Ads</a> aynı kreatif setle desteklenir.</p>
<p>Keşfet algoritması izlenme süresi ve tutarlı yayına bakar. Yerel konum etiketleri (Ortahisar, Akçaabat, Yomra, Of…) doğru kullanıldığında mahalle kitlesine sinyal verir; abartılı etiket yağmuru güveni düşürür. Kaydetme ve paylaşım, ham beğeniden daha değerli KPI’lardır. Grid’in ilk dokuz karesi “vitrin vitrini”dir.</p>

<h2>Nasıl yönetilir?</h2>
<ol>
<li><strong>Profil audit:</strong> Bio, kategori, iletişim butonu, vitrin grid, eski içerik temizliği, rakip hesap taraması.</li>
<li><strong>İçerik sistemi:</strong> Reels hook şablonları, story serileri (arka plan, teklif, sosyal kanıt), pin post stratejisi.</li>
<li><strong>Çekim veya kırılım:</strong> Yerinde gün veya mevcut stoktan 4:5 / 9:16 formatları — <a href="/hizmetler/icerik-uretimi-cekim">içerik üretimi</a>.</li>
<li><strong>Yayın takvimi:</strong> Haftalık ritim; dense sezonlarda önceden stoklanmış set.</li>
<li><strong>Topluluk + rapor:</strong> DM/yorum ton rehberi; aylık Instagram skor kartı (erişim, kaydetme, mesaj).</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Instagram KPI önceliği</caption>
<thead><tr><th>Metrik</th><th>Ne söyler?</th><th>Ne yaparız?</th></tr></thead>
<tbody>
<tr><td>Kaydetme</td><td>İçerik değerli bulundu</td><td>Formatı tekrarlar, serileştiririz</td></tr>
<tr><td>Profil ziyareti</td><td>Merak oluştu</td><td>Bio ve CTA’yı netleştiririz</td></tr>
<tr><td>DM / arama</td><td>Dönüşüm sinyali</td><td>Story ve reels CTA güçlendirilir</td></tr>
<tr><td>Ham beğeni</td><td>Zayıf tek başına</td><td>Vanity listesine sıkıştırmayız</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Restoran, kafe, güzellik, klinik, butik, spor salonu ve yerel hizmet işletmeleri. B2B düşünce liderliği öncelikliyse <a href="/hizmetler/kurumsal-sosyal-medya-yonetimi">kurumsal yönetim</a> daha doğrudur.</p>

<h2>Fiyat mantığı</h2>
<p>Aylık reels/post hacmi, story yoğunluğu ve yerinde çekim ihtiyacı fiyatı belirler. Sabit TL tarifesi yok; keşif sonrası Instagram kapsamı yazılı tekliflenir. Reklam bütçesi ayrıdır.</p>

<h2>Bio, highlights ve grid neden önce gelir?</h2>
<p>Reels izlenme getirir; bio dönüştürür. İletişim butonu, konum, WhatsApp veya rezervasyon linki net değilse trafik boşa akar. Highlights (menü, fiyat, sık sorulan, yol) DM yükünü azaltır. Grid’in ilk dokuz karesinde renk, ürün ve insan dengesi bozulursa profil ziyareti düşer — rakip hesabı kopyalamak yerine kendi mekânınızın sesini netleştirmek uzun vadede daha ucuza gelir.</p>
<p>Trabzon’da restoran hesabı ile klinik hesabı aynı template’i paylaşamaz. Restoranda tempo ve iştah; klinikte güven ve uzmanlık öndedir. Hook cümlesi, kapak karesi ve altyazı çekimden önce yazılır; aksi halde reels “güzel ama sonuçsuz” kalır. Story’de “bugün menü / bugün randevu” gibi net CTA’lar tercih edilir.</p>
<p>Konum etiketleri ve yerel işbirlikleri (mikro influencer değilse bile mahalle hesabı) organik keşfi destekler. Abartılı etiket yağmuru veya sahte etkileşim hem algoritmayı hem güveni bozar. Aylık skor kartında kaydetme ve DM, ham beğeniden önce okunur.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/sosyal-medya-yonetimi">Çok platformlu yönetim</a> · <a href="/hizmetler/icerik-uretimi-cekim">Reels &amp; çekim</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/bolgeler">İlçeler</a></p>

<div class="page-cta">
  <h2>Instagram hesabınızı birlikte okuyalım</h2>
  <p>Bio’dan reels’e kadar net bir 30 günlük plan çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Instagram yönetimi nedir?",
        a: "Profili vitrin gibi kurup reels, story, grid ve topluluk yanıtlarını haftalık ritimle yönetmektir. Amaç keşfet + mesaj dönüşümüdür.",
      },
      {
        q: "Sadece Instagram mı yönetiyorsunuz?",
        a: "Bu hizmet Instagram odaklıdır. Diğer platformlar ihtiyaç halinde ayrı kapsam veya yönetim paketine eklenir.",
      },
      {
        q: "Reels zorunlu mu?",
        a: "Keşfet için güçlü bir araçtır. Sektöre göre ayda belirli reels kotası önerilir.",
      },
      {
        q: "Story yönetimi dahil mi?",
        a: "Evet. Story ritmi ve CTA’lar takvimin parçasıdır; yoğunluk pakete göre değişir.",
      },
      {
        q: "Takipçi satın alıyor musunuz?",
        a: "Hayır. Organik ritim, doğru kreatif ve gerektiğinde reklamla büyürüz.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Hesap erişimi ve keşif formu. 24 saat içinde profil audit özeti planlanır.",
      },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    lead:
      "Trabzon Meta Ads yönetimi; Facebook ve Instagram reklamlarında Pixel, kreatif test, konum hedefleme ve şeffaf medya raporu demektir. Organik vitrin ayrı, ücretli erişim ayrı disiplindir.",
    seoTitle: "Meta Ads Trabzon | Facebook & Instagram Reklam Yönetimi",
    seoDesc:
      "Trabzon’da Meta Ads: hedefleme, retargeting, kreatif test ve şeffaf bütçe. Facebook & Instagram reklam yönetimi · Wesoco.",
    bodyHtml: `
<h2>Meta Ads nedir?</h2>
<p><strong>Meta Ads</strong>; Facebook ve Instagram envanterinde ücretli gösterim satın alarak doğru kitleye mesaj iletmektir. Trabzon işletmeleri için tipik hedefler mesaj, arama, form veya mağaza trafiğidir. Yönetim; kampanya mimarisi, kreatif setleri, ilçe/konum katmanları, retargeting ve haftalık öğrenme döngüsünü kapsar.</p>
<p>Medya parası sizin reklam hesabınızda kalır; ajans ücreti ayrı satırdır. Organik hesap yönetimi bu sayfanın konusu değildir. Şemsiye reklam anlatımı için <a href="/hizmetler/reklam-ajansi">reklam ajansı</a>, arama niyeti için <a href="/hizmetler/google-ads">Google Ads</a> sayfalarına bakın.</p>

<h2>Neden Meta reklamı gerekir?</h2>
<p>Organik erişim tek başına yetmez; lansman, sezon ve rekabet yoğun mahallelerde ücretli destek öğrenmeyi hızlandırır. Meta, ilgi alanı ve davranış sinyalleriyle “Trabzon + hizmet” kitlesine ulaşmayı kolaylaştırır. Doğru sıra: önce ölçüm (Pixel / CAPI), sonra 2–3 kreatif test, sonra kazananı ölçekleme. Ortahisar ile Of aynı teklif bile olsa konum ve rekabet farklıdır.</p>
<p>Mesaj kampanyalarında yanıt süresi kritiktir: reklam iyi çalışır, DM geç cevaplanınca lead soğur. Advantage+ körü körüne açılmaz; öğrenme penceresi bitmeden sürekli yapı bozmak maliyeti şişirir.</p>

<h2>Nasıl yönetilir?</h2>
<ol>
<li><strong>Hesap ve ölçüm:</strong> Business Manager, Pixel/CAPI, dönüşüm olayları.</li>
<li><strong>Teklif ve yaratıcı brief:</strong> Tek ana mesaj, net CTA, 2–3 kreatif varyant (statik + reels).</li>
<li><strong>Yapı:</strong> Prospecting + retargeting ayrı; konum (ilçe) ve ilgi alanı testleri.</li>
<li><strong>Öğrenme penceresi:</strong> Erken müdahale yerine veri birikimi; kaybeden kreatif dinlenir.</li>
<li><strong>Rapor:</strong> Harcama, sonuç, birim maliyet, frekans, sonraki haftanın test planı.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Meta Ads ile organik farkı</caption>
<thead><tr><th>Konu</th><th>Organik</th><th>Meta Ads</th></tr></thead>
<tbody>
<tr><td>Hız</td><td>Kademeli</td><td>Test ve ölçek hızlı</td></tr>
<tr><td>Hedefleme</td><td>Takipçi / keşfet</td><td>Konum, ilgi, remarketing</td></tr>
<tr><td>Bütçe</td><td>Zaman ağırlıklı</td><td>Medya ayrı; şeffaf rapor</td></tr>
<tr><td>Önkoşul</td><td>Ritim ve dil</td><td>Ölçüm + kullanılabilir kreatif</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Restoran, klinik, emlak, eğitim, perakende ve randevu/mesaj hedefi olan yerel markalar. Organik hesap dağınıksa önce vitrin düzeltilir. Saf arama niyeti baskınsa Google Ads önceliklidir.</p>

<h2>Fiyat mantığı</h2>
<p>Ajans yönetim ücreti kampanya sayısı, kreatif üretim ihtiyacı ve rapor frekansına göre keşif sonrası belirlenir. Medya bütçesi işletmeye aittir. “Günde X satış garantisi” dili kullanmayız.</p>

<h2>Ölçüm ve kreatif disiplini</h2>
<p>Pixel veya CAPI kurulmadan “reklam çalışmıyor” tartışması spekülasyondur. Dönüşüm olayı (mesaj, arama, form) net tanımlanır; sonra kreatif test başlar. Aynı görsel haftalarca dönünce frekans yükselir, maliyet şişer — kreatif yorgunluğu takip edilir. Yerel dil (“randevu al”, “rezervasyon”, “yol tarifi”) genel “şimdi keşfet” kalıplarından daha iyi çalışır.</p>
<p>Prospecting ve retargeting bütçeleri ayrı satırdadır. Profili veya siteyi ziyaret edenlere ikinci turda daha net CTA taşınır. İlçe bazlı konum katmanları (Ortahisar, Akçaabat, Yomra, Of…) rekabet ve teslimat gerçekliğine göre ayrılır. Erken ölçekleme, öğrenme penceresini bozar; kaybeden kreatif dinlendirilir, kazanan kopyalanır.</p>
<p>Organik vitrin dağınıksa Ads açmak maliyeti yükseltir. Bu yüzden zayıf grid’de önce <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> veya <a href="/hizmetler/icerik-uretimi-cekim">çekim</a> önerilir. Medya hesabı erişimi ve Business Manager düzeni keşifte kontrol edilir.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/reklam-ajansi">Reklam ajansı</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/icerik-uretimi-cekim">Kreatif üretim</a></p>

<div class="page-cta">
  <h2>Meta hesabınızı denetleyelim</h2>
  <p>Pixel, yapı ve kreatif setine bakıp net bir test planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Meta Ads nedir?",
        a: "Facebook ve Instagram’da ücretli reklam yönetmektir. Hedefleme, kreatif test, retargeting ve şeffaf medya raporu kapsar.",
      },
      {
        q: "Medya bütçesi ajans ücretine dahil mi?",
        a: "Hayır. Reklam harcaması sizin Meta hesabınızda kalır; yönetim ücreti ayrı faturalanır.",
      },
      {
        q: "Ne kadar sürede sonuç görülür?",
        a: "Öğrenme genelde 1–2 haftada başlar; anlamlı optimizasyon için 30–90 gün penceresi önerilir.",
      },
      {
        q: "Yalnızca Instagram reklamı açılır mı?",
        a: "Evet, envanter seçilebilir. Çoğu kampanyada Facebook + Instagram birlikte test edilir.",
      },
      {
        q: "Kreatifleri siz mi üretirsiniz?",
        a: "Kapsama göre evet. Mevcut stok varsa optimize ederiz; yoksa çekim veya tasarım eklenir.",
      },
      {
        q: "Sonuç garantisi var mı?",
        a: "Garanti satış vaadi yok. Yazılı KPI, test planı ve şeffaf maliyet disiplini vardır.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Business Manager erişimi ve hedef CTA ile keşif. 24 saat içinde dönüş.",
      },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    lead:
      "Trabzon Google Ads yönetimi; arama niyetindeki müşteriyi Search, gerektiğinde Performance Max veya YouTube ile yakalar. Anahtar kelime, dönüşüm izleme ve şeffaf medya satırı omurgadır.",
    seoTitle: "Google Ads Trabzon | Arama & Performans Reklamı · Wesoco",
    seoDesc:
      "Trabzon’da Google Ads: Search, dönüşüm izleme, yerel niyet kelimeleri ve şeffaf bütçe. Niyet odaklı reklam yönetimi · Wesoco.",
    bodyHtml: `
<h2>Google Ads nedir?</h2>
<p><strong>Google Ads</strong>; Google arama ağı ve bağlı envanterde, kullanıcının yazdığı niyete göre reklam göstermektir. “Trabzon diş kliniği”, “Yomra emlak”, “Of otel” gibi uzun kuyruklar yerel işletmeler için değerlidir. Yönetim; hesap yapısı, negatif kelimeler, uzantılar, dönüşüm izleme ve teklif stratejisini kapsar.</p>
<p>Meta sosyal keşifte güçlüyken Google satın alma anına yakındır. Şemsiye plan için <a href="/hizmetler/reklam-ajansi">reklam ajansı</a>, Facebook/Instagram için <a href="/hizmetler/meta-ads">Meta Ads</a> sayfalarına gidin. Medya harcaması sizin Ads hesabınızda kalır.</p>

<h2>Neden Google reklamı?</h2>
<p>İnsan hizmet ararken Google’a yazar. Organik SEO uzun vadede güçlenirken Ads, hemen görünürlük ve ölçülebilir arama/form sağlar. Yanlış kelime seçimi veya izleme eksikliği bütçeyi boşa yakar. Marka kelimeleri ile genel kategori kelimeleri ayrı yönetilir; konum ve çağrı uzantıları sık kritik fark yaratır.</p>
<p>Kalite skoru; reklam metni, landing uyumu ve beklenen tıklama oranıyla ilişkilidir. “Trabzon + hizmet” uzun kuyrukları çoğu zaman genel tek kelimeden daha verimlidir.</p>

<h2>Nasıl yönetilir?</h2>
<ol>
<li><strong>Ölçüm kurulumu:</strong> Dönüşüm etiketleri, telefon/form hedefleri.</li>
<li><strong>Kelime araştırması:</strong> Yerel niyet, marka, rakip ve negatif listeler.</li>
<li><strong>Kampanya mimarisi:</strong> Search öncelikli; ihtiyaçta Performance Max veya YouTube.</li>
<li><strong>Reklam metinleri:</strong> Net teklif, konum, CTA; A/B başlık testleri.</li>
<li><strong>Optimizasyon:</strong> Arama terimleri raporu, teklif, bütçe dağılımı, aylık skor kartı.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Google Ads vs Meta Ads</caption>
<thead><tr><th>Özellik</th><th>Google Ads</th><th>Meta Ads</th></tr></thead>
<tbody>
<tr><td>Tetikleyici</td><td>Arama niyeti</td><td>İlgi / keşif</td></tr>
<tr><td>Güçlü olduğu yer</td><td>“Şimdi ara / randevu”</td><td>Görsel keşif, remarketing</td></tr>
<tr><td>Örnek</td><td>Trabzon klinik araması</td><td>Menü / mekân keşfi</td></tr>
<tr><td>Önkoşul</td><td>Landing + dönüşüm izleme</td><td>Kreatif + Pixel</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Klinik, avukat, emlak, inşaat, eğitim, B2B hizmet ve “şimdi ara” niyeti yüksek kategoriler. Web sitesi yoksa önce landing veya Google Benim İşletmem senaryosu konuşulur.</p>

<h2>Fiyat mantığı</h2>
<p>Yönetim ücreti hesap karmaşıklığına göre keşif sonrası tekliflenir. Tıklama maliyetleri sektöre göre değişir; sabit TL paket fiyatı vaat etmiyoruz. Medya harcaması reklam hesabınızda şeffaf izlenir.</p>

<h2>Yerel niyet ve kalite skoru</h2>
<p>Search Console ve Analytics ile birlikte bakıldığında hangi soruların gerçekten dönüştürdüğü netleşir. Marka savunma kampanyası (rakipler sizin isminize teklif veriyorsa) ayrı satır olarak konuşulur. Negatif kelime listesi olmadan geniş eşleme bütçeyi dağıtır — “ucuz”, “ücretsiz iş ilanı”, yanlış şehir gibi terimler düzenli temizlenir.</p>
<p>Landing sayfa yavaş veya form bozuksa Ads’i büyütmek anlamsızdır; önce dönüşüm yolu kontrol edilir. Çağrı odaklı işletmelerde arama uzantıları, çalışma saatleri ve NAP tutarlılığı kritik fark yaratır. Google Benim İşletmem ile Ads mesajı çelişmemelidir.</p>
<p>Performance Max veya YouTube ihtiyaç halinde eklenir; herkese varsayılan dayatılmaz. İlk hafta “sihirli satış” beklenmez; öğrenme ve negatif temizliği öndedir. Raporlarda gösterim şişirme değil, birim maliyet ve kaliteli sonuç konuşulur.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/reklam-ajansi">Reklam ajansı</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/dijital-pazarlama-ajansi">Dijital pazarlama</a> · <a href="/blog">Blog</a></p>

<div class="page-cta">
  <h2>Arama niyetinizi haritalayalım</h2>
  <p>Kelime seti ve dönüşüm izlemesine bakıp gerçekçi bir Ads planı çıkaralım.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Google Ads nedir?",
        a: "Google’da arama niyetine göre reklam göstermektir. Anahtar kelime, dönüşüm izleme ve şeffaf medya yönetimi kapsar.",
      },
      {
        q: "Google Ads ile Meta Ads farkı nedir?",
        a: "Google arama niyetini yakalar; Meta keşif ve sosyal ilgide güçlidir. İş modeline göre biri veya ikisi birlikte kullanılır.",
      },
      {
        q: "Minimum bütçe nedir?",
        a: "Sektör ve rekabete göre değişir. Keşifte gerçekçi bir medya bandı önerilir; uydurma sabit fiyat yok.",
      },
      {
        q: "Sadece Search mi çalışıyorsunuz?",
        a: "Öncelik Search’tedir. İhtiyaç halinde Performance Max veya YouTube eklenir.",
      },
      {
        q: "Web sitem zayıfsa Ads olur mu?",
        a: "Olabilir ama dönüşüm düşer. Önce landing veya form deneyimi iyileştirilir.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Google Ads hesabı erişimi ve hedef dönüşümle keşif. 24 saat içinde dönüş.",
      },
    ],
  },
  {
    slug: "reklam-ajansi",
    title: "Trabzon Reklam Ajansı",
    lead:
      "Trabzon reklam ajansı; Meta ve Google’ı kanal fanatizmi olmadan aynı performans çatısında planlar. Bu sayfa ücretli medya şemsiyesidir — derin teknik sayfalar Meta Ads ve Google Ads’tedir.",
    seoTitle: "Trabzon Reklam Ajansı | Meta & Google Performans · Wesoco",
    seoDesc:
      "Trabzon’da reklam ajansı: medya planı, kreatif test, şeffaf maliyet. Meta Ads ve Google Ads’i tek çatıda yöneten performans yaklaşımı.",
    bodyHtml: `
<h2>Reklam ajansı nedir?</h2>
<p><strong>Reklam ajansı</strong>; bütçeyi “bir yerlere harcamak” değil, kanal seçimi, kreatif test, ölçüm ve raporla büyümeyi yönetmektir. Trabzon Sosyal Medya (Wesoco) performans odaklı çalışır: iş modeline göre Meta, Google veya ikisinin karışımı. Bu sayfa şemsiye anlatımdır.</p>
<p>Facebook/Instagram reklam detayı için <a href="/hizmetler/meta-ads">Meta Ads</a>, arama niyeti için <a href="/hizmetler/google-ads">Google Ads</a> sayfalarına gidin. Organik sosyal operasyon burada satılmaz; o kapsam <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> ürünündedir.</p>

<h2>Neden tek çatıda reklam yönetimi?</h2>
<p>Kanallar birbirini tamamlar: Meta keşfettirir, Google niyeti yakalar, remarketing ikisini bağlar. Ayrı ajanslarla çalışmak mesaj ve rapor dilini böler. Şeffaf reklam ajansı; medya satırını ajans ücretinden ayırır, kaybeden kreatifi dinlendirir ve haftalık öğrenmeyi yazılı bırakır. “Garanti satış” vaadi yoktur; yazılı KPI, test hipotezi ve durdurma kriteri konur.</p>

<h2>Nasıl çalışırız?</h2>
<ol>
<li><strong>Hedef ve KPI:</strong> Mesaj, form, arama, rezervasyon — tek ana metrik seçilir.</li>
<li><strong>Kanal karışımı:</strong> Keşifte Meta / Google ağırlığı netleşir.</li>
<li><strong>Kreatif ve teklif:</strong> Ortak mesaj; platforma özel format ve kopya.</li>
<li><strong>Yayın ve öğrenme:</strong> Ayrı bütçe satırları, retargeting, frekans kontrolü.</li>
<li><strong>Skor kartı:</strong> Harcama, sonuç, birim maliyet, sonraki testler.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Reklam ajansı kapsamı</caption>
<thead><tr><th>Katman</th><th>Ne yapılır?</th><th>Derin sayfa</th></tr></thead>
<tbody>
<tr><td>Keşif medyası</td><td>Meta hedefleme &amp; kreatif test</td><td><a href="/hizmetler/meta-ads">Meta Ads</a></td></tr>
<tr><td>Niyet medyası</td><td>Search &amp; dönüşüm izleme</td><td><a href="/hizmetler/google-ads">Google Ads</a></td></tr>
<tr><td>Remarketing</td><td>Ziyaretçiye ikinci tur CTA</td><td>Her iki kanal</td></tr>
<tr><td>Organik vitrin</td><td>Bu sayfanın konusu değil</td><td><a href="/hizmetler/sosyal-medya-yonetimi">Yönetim</a></td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Aylık medya harcaması olan veya yeni başlayacak yerel işletmeler. Yalnızca organik yönetim arıyorsanız reklam ajansı değil, sosyal medya yönetimi ürünü doğrudur. Full funnel için <a href="/hizmetler/dijital-pazarlama-ajansi">dijital pazarlama</a> daha geniş çerçevedir.</p>

<h2>Fiyat mantığı</h2>
<p>Yönetim ücreti kanal sayısı, kampanya karmaşıklığı ve kreatif üretimine göre keşif sonrası tekliflenir. Medya bütçesi işletmeye aittir. Sabit TL “reklam paketi” listesi yayınlamıyoruz.</p>

<h2>Medya planı ve sezon</h2>
<p>Medya planı sezonu dikkate alır: turizm öncesi farkındalık, sezon içi dönüşüm, sezon sonrası remarketing farklı ağırlık ister. Aynı kreatifin hem Meta’da hem Google Display’de körü körüne kullanılması nadiren doğru sonuç verir; format ve niyet farklıdır. Haftalık kontrol, aylık strateji revizyonu ile birleşir.</p>
<p>Küçük bütçede bile yapı doğru kurulursa öğrenme birikir; yanlış yapıda küçük bütçe de boşa gider. Kreatif stoğu yoksa <a href="/hizmetler/icerik-uretimi-cekim">içerik üretimi</a> aynı projeye eklenir. “Garanti lead” dili yerine test hipotezi ve durdurma kriteri yazılır — bu hem etik hem de uzun vadeli performans için şarttır.</p>
<p>Tek muhatap avantajı: mesaj Meta’da bir vaat, Google’da başka vaat olmaz. Skor kartı kanal bazlı ve birim maliyet odaklıdır; vanity gösterim listesi yönetim özeti sayılmaz.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/hizmetler/dijital-pazarlama-ajansi">Dijital pazarlama</a> · <a href="/hizmetler/sosyal-medya-ajansi">Sosyal medya ajansı</a></p>

<div class="page-cta">
  <h2>Medya planınızı sadeleştirelim</h2>
  <p>Hangi kanalın önce açılacağını ve nasıl raporlanacağını netleştirelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Reklam ajansı ne yapar?",
        a: "Kanal seçimi, kreatif test, ölçüm ve şeffaf medya raporuyla ücretli büyümeyi yönetir. Meta ve/veya Google aynı çatıda planlanır.",
      },
      {
        q: "Meta ve Google’ı aynı anda yönetir misiniz?",
        a: "Evet. İş modeline göre karışım seçilir; her kanal ayrı satırda raporlanır.",
      },
      {
        q: "Bu sayfa ile Meta Ads sayfası farkı nedir?",
        a: "Reklam ajansı şemsiye ve kanal seçimini anlatır. Meta Ads sayfası Facebook/Instagram operasyon detayına iner.",
      },
      {
        q: "Kreatif üretimi dahil mi?",
        a: "Kapsama göre evet. Yoksa mevcut varlıklarla başlanır; ihtiyaçta çekim eklenir.",
      },
      {
        q: "Sonuç garantisi veriyor musunuz?",
        a: "Garanti satış vaadi yok. Yazılı KPI, test planı ve şeffaf maliyet disiplini vardır.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Hedef CTA ve yaklaşık medya bandı ile keşif. 24 saat içinde dönüş.",
      },
    ],
  },
  {
    slug: "icerik-uretimi-cekim",
    title: "İçerik ve Reels Üretimi",
    lead:
      "Trabzon içerik üretimi ve çekim; yerinde fotoğraf, reels kurgu ve sosyal formatlara kırılmış kullanılabilir stok demektir. Stok görsel tek başına güven üretmez — mekân, ekip ve ürün gerçekten görünür.",
    seoTitle: "İçerik Üretimi & Çekim Trabzon | Reels, Fotoğraf, Video",
    seoDesc:
      "Trabzon’da içerik üretimi: yerinde çekim, reels kurgu, profesyonel fotoğraf ve sosyal medya formatları. Satışa odaklı stok · Wesoco.",
    bodyHtml: `
<h2>İçerik üretimi ve çekim nedir?</h2>
<p><strong>İçerik üretimi</strong>; markanın anlatacağı hikâyeyi görüntüye çevirmektir. Trabzon’da yerinde çekim günü planlarız: brief, shot list, ışık/mekân, ardından kurgu ve platform kırılımları (post, story, reels, gerektiğinde web/hero). Amaç “güzel kare” koleksiyonu değil; satış, randevu veya rezervasyon mesajını taşıyan kullanılabilir stok.</p>
<p>Ajans yönetimi ayrı üründür; bu sayfa üretim ve prodüksiyon omurgasını anlatır. Çekim sonrası yayın takvimine <a href="/hizmetler/sosyal-medya-yonetimi">yönetim</a> veya <a href="/hizmetler/instagram-yonetimi">Instagram</a> paketi bağlanabilir. Yalnız havadan ölçek için <a href="/hizmetler/drone-cekimi">drone çekimi</a> ayrı hizmettir.</p>

<h2>Neden özgün çekim önemli?</h2>
<p>Hazır stok fotoğraf mahalle güvenini zayıflatır. Restoranda gerçek tabak, klinikte ekip ve mekân, inşaatta şantiye ilerleyişi izleyiciyi ikna eder. Reels izlenme süresi keşfeti açar; zayıf hook’lu video zamanı boşa harcar. Sezon öncesi stok üretmek, yoğun haftada panik paylaşımı önler. Aynı çekim gününden hem organik hem Ads kreatifleri çıkarmak maliyet verimliliğini artırır.</p>

<h2>Nasıl üretilir?</h2>
<ol>
<li><strong>Brief:</strong> Hedef CTA, yasaklar, marka tonu, platformlar, referans örnekler.</li>
<li><strong>Shot list:</strong> Reels senaryoları, fotoğraf setleri, B-roll, ürün/mekân öncelikleri.</li>
<li><strong>Çekim günü:</strong> Trabzon / ilçe lokasyonunda planlı saatler.</li>
<li><strong>Kurgu ve teslim:</strong> Oranlar, altyazı, kapak, sosyal-ready export.</li>
<li><strong>Onay ve arşiv:</strong> Revizyon turu; sonraki aylar için klasör düzeni.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Teslim formatları</caption>
<thead><tr><th>Çıktı</th><th>Oran</th><th>Kullanım</th></tr></thead>
<tbody>
<tr><td>Reels / Shorts</td><td>9:16</td><td>Keşfet, Ads</td></tr>
<tr><td>Feed post</td><td>4:5 veya 1:1</td><td>Grid vitrin</td></tr>
<tr><td>Story</td><td>9:16</td><td>CTA, günlük ritim</td></tr>
<tr><td>Web / hero</td><td>16:9</td><td>Site, sunum</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Restoran, otel, klinik, emlak, perakende, eğitim ve turizm işletmeleri. Açılış veya renovasyon dönemlerinde tek seferlik yoğun çekim seti de talep edilir.</p>

<h2>Fiyat mantığı</h2>
<p>Çekim günü sayısı, lokasyon, reels adedi, kurgu derinliği ve ek ekipman fiyatı etkiler. Keşif sonrası kapsam yazılır; uydurma paket TL listesi yoktur. Ham dosya ile sosyal-ready teslim farkı teklifte net belirtilir.</p>

<h2>Brief ve onay disiplini</h2>
<p>Çekim öncesi mekân hazırlığı (temizlik, ışık, ürün dizimi) sonucu belirler; ekip hazır değilse süre uzar. Müşteri yüzü veya hasta görseli gibi hassas içeriklerde onay ve anonimleştirme peşinen konuşulur. Renk ve tipografi marka diline uymazsa sonradan kurguyla kurtarmak zordur — brief’te renk kodları istenir.</p>
<p>Onay gecikmesi arşivi şişirir; tek muhatap ve yazılı revizyon hakkı teklifte belirtilir. Ses, altyazı ve kapak karesi teslimin parçasıdır; “ham dosya bıraktık” modeli varsayılan değildir. Acil (48 saat) teslim istenirse kurgu önceliği ayrıca konuşulur.</p>
<p>Aynı çekim gününden Ads varyantları da düşünülürse maliyet verimliliği artar. Hook zayıfsa bütçe değil emek boşa gider; bu yüzden senaryo brief’i çekimden önce yazılır. Yayın sonrası yönetim istenirse sosyal medya paketleri bağlanır.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/drone-cekimi">Drone çekimi</a> · <a href="/hizmetler/instagram-yonetimi">Instagram yönetimi</a> · <a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/hizmetler/meta-ads">Meta Ads kreatif</a></p>

<div class="page-cta">
  <h2>Çekim günü planlayalım</h2>
  <p>Brief ve shot list ile bir günde kaç kullanılabilir içerik çıkacağını birlikte hesaplayalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "İçerik üretimi neyi kapsar?",
        a: "Yerinde çekim, reels kurgu, profesyonel fotoğraf ve sosyal medya formatlarına kırılmış kullanılabilir stok.",
      },
      {
        q: "Bir çekim gününde ne kadar içerik çıkar?",
        a: "Brief ve mekâna göre değişir. Tipik günde birden fazla reels + post seti hedeflenir; sayı keşifte netleşir.",
      },
      {
        q: "Kurgu dahil mi?",
        a: "Evet, sosyal-ready teslim varsayılandır. Yalnız ham footage istenirse teklifte ayrılır.",
      },
      {
        q: "İlçeye geliyor musunuz?",
        a: "Evet. Trabzon merkez ve 18 ilçede planlı çekim yapılır.",
      },
      {
        q: "Drone bu paketin içinde mi?",
        a: "Standart yer çekiminden ayrıdır. İhtiyaçta drone hizmeti aynı projeye eklenebilir.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Tarih, mekân ve hedef CTA ile keşif. Shot list onayından sonra çekim günü kilitlenir.",
      },
    ],
  },
  {
    slug: "drone-cekimi",
    title: "Drone Çekimi",
    lead:
      "Trabzon drone çekimi; otel, inşaat, turizm ve sahil işletmelerinde ölçek ve konum avantajını havadan gösterir. Uçuş planı, izinler ve sosyal/web formatlarına kurgu tek pakette düşünülür.",
    seoTitle: "Drone Çekimi Trabzon | Havadan Video & Fotoğraf · Wesoco",
    seoDesc:
      "Trabzon’da profesyonel drone çekimi: otel, inşaat, turizm. Planlı uçuş, kurgu ve sosyal medya formatları · Wesoco.",
    bodyHtml: `
<h2>Drone çekimi nedir?</h2>
<p><strong>Drone çekimi</strong>; markayı yer seviyesinden görülemeyen açı ve ölçekle anlatmaktır. Trabzon Sosyal Medya olarak uçuş öncesi plan, güvenli operasyon, ham kayıt ve ardından reels/web/hero kırılımlarını sunarız. Tek “havadan gezi” dosyası yetmez — sosyal medyada hook’lu kısa kesitler, web’de geniş master ayrı teslim edilir.</p>
<p>Yer çekimi ve ürün detayı için <a href="/hizmetler/icerik-uretimi-cekim">içerik üretimi</a> ayrı hizmettir. Birçok projede ikisi aynı günde veya ardışık günlerde birleştirilir.</p>

<h2>Neden havadan içerik işe yarar?</h2>
<p>Otel ve konaklamada çevre ve manzara, inşaatta proje ölçeği, turizmde rota ve doğa, sahil işletmelerinde konum netleşir. Maçka yaylası, Çaykara hattı veya sahil koridorunda havadan bakış, fotoğrafta kaybolan ölçeği geri getirir. Yanlış hava veya izinsiz uçuş hem kaliteyi hem güvenliği bozar; planlı prodüksiyon “uçup çekelim” yaklaşımını reddeder.</p>

<h2>Nasıl yapılır?</h2>
<ol>
<li><strong>Keşif:</strong> Lokasyon, amaç (sosyal / web / lansman), yasaklı bölgeler.</li>
<li><strong>Uçuş planı:</strong> Saat, ışık, shot list, yedek hava senaryosu, izin ihtiyacı.</li>
<li><strong>Çekim:</strong> Güvenli operasyon; yer ekibi ile senkron.</li>
<li><strong>Kurgu:</strong> Master film + dikey reels kesitleri + fotoğraf stilleri.</li>
<li><strong>Teslim:</strong> Onay turu, arşiv adlandırma, kullanım hakları özeti.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Drone ne zaman gerekir?</caption>
<thead><tr><th>Sektör</th><th>Drone değeri</th><th>Yer çekimi yeterli mi?</th></tr></thead>
<tbody>
<tr><td>Otel / villa</td><td>Manzara, çevre, ölçek</td><td>İç mekân için hayır — ikisi birlikte</td></tr>
<tr><td>İnşaat / emlak</td><td>Proje ölçeği, ilerleme</td><td>Detay daire için yer şart</td></tr>
<tr><td>Restoran</td><td>Konum / sahil</td><td>Menü için yer çekimi öncelik</td></tr>
<tr><td>Klinik</td><td>Genelde düşük</td><td>Ekip ve mekân yer çekimi</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Otel, villa/konaklama, inşaat-emlak lansmanı, turizm işletmeleri, sahil restoranları ve kurumsal tesisler. Yalnızca ürün detayı gereken markalarda drone şart değildir.</p>

<h2>Fiyat mantığı</h2>
<p>Lokasyon, uçuş süresi, kurgu uzunluğu, ek gün ve seyahat lojistiği fiyatı etkiler. Keşif sonrası yazılı teklif; sabit TL katalog fiyatı yoktur.</p>

<h2>Güvenlik, izin ve teslim</h2>
<p>Şantiye ve otel projelerinde güvenlik brifingi zorunludur; uçuş alanı işaretlenir, yaya trafiği dikkate alınır. Gün batımı “golden hour” çoğu lansman için değerlidir ama Trabzon’da ani yağmur senaryosu her zaman yedeklenir. Kısıtlı bölgelerde uçuş yapılmaz — keşifte uygunluk netleşmeden tarih kilitlemeyiz.</p>
<p>Ham footage arşivi müşteriye verilebilir; sosyal-ready kesitler ayrı iş kalemidir ve teklifte ayrılır. Aynı uçuştan birden fazla dil/altyazı versiyonu istenirse kurgu kalemi artar. “Sınırsız footage” vaadi yoktur; shot list’teki hedefler teslimin ölçüsüdür.</p>
<p>Yayın sonrası yönetim veya Ads kreatif ihtiyacı varsa <a href="/hizmetler/sosyal-medya-yonetimi">sosyal medya yönetimi</a> ve <a href="/hizmetler/meta-ads">Meta Ads</a> aynı projeye bağlanabilir. Yatırımcı sunumu için uzun master film ayrı brief ile planlanır.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/icerik-uretimi-cekim">İçerik &amp; yer çekimi</a> · <a href="/hizmetler/sosyal-medya-yonetimi">Sosyal medya yönetimi</a> · <a href="/bolgeler/macka">Maçka</a> · <a href="/bolgeler/caykara">Çaykara</a></p>

<div class="page-cta">
  <h2>Havadan planı konuşalım</h2>
  <p>Lokasyon ve kullanım amacına göre shot list ve teslim formatlarını netleştirelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Drone çekimi nedir?",
        a: "Markayı havadan açı ve ölçekle anlatan profesyonel video/fotoğraf prodüksiyonudur. Planlı uçuş, kurgu ve sosyal formatlar kapsar.",
      },
      {
        q: "Her lokasyonda uçuş mümkün mü?",
        a: "Hayır. Kısıtlı bölgeler ve hava koşulları vardır. Keşifte uygunluk kontrol edilir.",
      },
      {
        q: "Sosyal medya formatı dahil mi?",
        a: "Evet. Master yanında dikey reels/story kırılımları planlanabilir.",
      },
      {
        q: "Yer çekimi olmadan sadece drone olur mu?",
        a: "Olabilir. Çoğu markada yer + havadan kombinasyonu daha güçlü anlatım verir.",
      },
      {
        q: "Teslim süresi ne kadar?",
        a: "Kurgu kapsamına göre değişir. Tipik projelerde çekim sonrası planlı gün aralığı teklifte yazılır.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Harita/pin, tarih aralığı ve kullanım amacı ile keşif formu veya WhatsApp.",
      },
    ],
  },
  {
    slug: "dijital-pazarlama-ajansi",
    title: "Dijital Pazarlama Ajansı",
    lead:
      "Trabzon dijital pazarlama ajansı; mesaj, içerik, ücretli medya ve ölçümü tek hunide birleştirir. Kanal kanal parçalı iş değil — full funnel sistem: farkındalık → değerlendirme → dönüşüm → sadakat.",
    seoTitle: "Dijital Pazarlama Ajansı Trabzon | Full Funnel · Wesoco",
    seoDesc:
      "Trabzon’da dijital pazarlama: sosyal, Meta Ads, Google Ads, içerik ve ölçüm tek sistemde. Full funnel ajans yaklaşımı · Wesoco.",
    bodyHtml: `
<h2>Dijital pazarlama ajansı nedir?</h2>
<p><strong>Dijital pazarlama ajansı</strong>; markayı tek kanala hapsetmeden, müşteri yolculuğunu uçtan uca tasarlayan yapıdır. Trabzon Sosyal Medya (Wesoco) olarak farkındalık (içerik/reels), değerlendirme (site, Google Benim İşletmem, sosyal kanıt), dönüşüm (Meta/Google, form, WhatsApp) ve sadakat (remarketing) aynı planda ilerler.</p>
<p>“Grafik yaptık” veya “reklam açtık” tek başına sistem sayılmaz. <a href="/hizmetler/sosyal-medya-ajansi">Sosyal medya ajansı</a> sayfası güven ve ortaklık çerçevesini anlatır; bu sayfa full funnel mimariyi anlatır. Yalnız Ads için <a href="/hizmetler/reklam-ajansi">reklam ajansı</a>, yalnız operasyon için <a href="/hizmetler/sosyal-medya-yonetimi">yönetim</a> daha sade kapılardır.</p>

<h2>Neden full funnel gerekir?</h2>
<p>Yalnız reklam açmak, vitrin zayıfsa maliyeti yükseltir. Yalnız içerik üretmek, ölçüm yoksa öğrenmeyi engeller. Full funnel; hangi aşamada neyin kırıldığını gösterir — kreatif mi, teklif mi, hız mı, form mu? Google Benim İşletmem, NAP tutarlılığı ve yorum yanıtları huninin “değerlendirme” basamağıdır; sosyal ve Ads bunları yok sayamaz.</p>

<h2>Nasıl kurulur?</h2>
<ol>
<li><strong>Diagnostik:</strong> Hesaplar, site/form, reklam geçmişi, rakip sinyalleri, NAP tutarlılığı.</li>
<li><strong>Mesaj mimarisi:</strong> Tek vaat, segmentlere özel varyantlar.</li>
<li><strong>Kanal haritası:</strong> Organik sosyal, içerik stoğu, Meta, Google, remarketing sırası.</li>
<li><strong>Ölçüm:</strong> Analytics olayları, Ads dönüşümleri, aylık skor kartı.</li>
<li><strong>İterasyon:</strong> 30–90 günde kazananları ölçekle, kaybedenleri kes, üç aksiyon yaz.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Full funnel aşamaları</caption>
<thead><tr><th>Aşama</th><th>Örnek kanal</th><th>Başarı sinyali</th></tr></thead>
<tbody>
<tr><td>Farkındalık</td><td>Reels, Meta keşif</td><td>Erişim, kaydetme</td></tr>
<tr><td>Değerlendirme</td><td>Profil, GBP, site</td><td>Profil ziyareti, yorum</td></tr>
<tr><td>Dönüşüm</td><td>Ads, form, WhatsApp</td><td>Mesaj, arama, randevu</td></tr>
<tr><td>Sadakat</td><td>Remarketing, story</td><td>Tekrar ziyaret, tekrar alım</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Birden fazla kanalı aynı anda yönetmek isteyen büyüyen işletmeler, franchise/bayi yapıları ve “parça parça freelancer”dan tek muhataba geçmek isteyen markalar. Sadece Instagram takvimi yeterliyse yönetim veya Instagram ürünü yeter.</p>

<h2>Fiyat mantığı</h2>
<p>Kapsam (kaç kanal, içerik hacmi, reklam yönetimi, rapor derinliği) keşif sonrası tekliflenir. Medya bütçesi ayrıdır. Full funnel diye şişirilmiş tek fiyat listesi yoktur — ihtiyaca göre modüler yazılır.</p>

<h2>Mesaj tutarlılığı ve ölçüm</h2>
<p>Instagram’da bir vaat, Google’da başka vaat güveni aşındırır. Bu yüzden kanal ekipleri aynı brief’ten beslenir; “herkes kendi işini yapsın” modeli full funnel değildir. Analytics olayları kurulmadan “satış olmadı” tartışması spekülasyondur — önce ölçüm, sonra ölçek.</p>
<p>Modüler ilerleriz: herkese aynı “dev paket” dayatılmaz. Önce en kırılgan aşama onarılır; sonra kanal eklenir. Rapor hem kanal bazlı hem huni bazlı okunur. “Gösterim arttı” tek başına başarı değildir. Üç aylık öğrenme penceresi teklifte varsayılan çerçevedir; daha kısa deneme ayrıca tanımlanır.</p>
<p>Google Benim İşletmem, NAP ve yorum yanıtları değerlendirme basamağının parçasıdır. Sosyal ve Ads bunları yok sayarak sadece “üst huni” şişirmek pahalıya patlar. Remarketing olmadan üst huniden gelen trafik çoğu zaman kaybolur.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/sosyal-medya-ajansi">Sosyal medya ajansı</a> · <a href="/hizmetler/reklam-ajansi">Reklam ajansı</a> · <a href="/hizmetler/meta-ads">Meta Ads</a> · <a href="/hizmetler/google-ads">Google Ads</a></p>

<div class="page-cta">
  <h2>Huninizi birlikte çizelim</h2>
  <p>Hangi aşamanın kırıldığını 30 dakikalık keşifte netleştirelim.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Dijital pazarlama ajansı nedir?",
        a: "İçerik, ücretli medya ve ölçümü full funnel (farkındalık→dönüşüm→sadakat) sisteminde birleştiren ajans modelidir.",
      },
      {
        q: "Dijital pazarlama ile sosyal medya yönetimi farkı nedir?",
        a: "Yönetim operasyonel içerik/yayın ürünüdür. Dijital pazarlama; içerik + reklam + ölçümü full funnel sistem olarak kurar.",
      },
      {
        q: "SEO dahil mi?",
        a: "İçerik ve teknik yönlendirme konuşulabilir. Ağır SEO projeleri keşifte ayrı kapsamlanır.",
      },
      {
        q: "Küçük işletme için ağır olur mu?",
        a: "Modüler ilerleriz. Önce en kırılgan aşama (çoğu zaman vitrin veya ölçüm) onarılır.",
      },
      {
        q: "Rapor nasıl olur?",
        a: "Kanal bazlı metrikler + hunide nerede kayıp olduğu + sonraki ayın üç aksiyonu.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Mevcut kanallar ve hedef CTA ile ücretsiz keşif. 24 saat içinde dönüş.",
      },
    ],
  },
  {
    slug: "kurumsal-sosyal-medya-yonetimi",
    title: "Kurumsal Sosyal Medya Yönetimi",
    lead:
      "Trabzon kurumsal sosyal medya yönetimi; B2B markalar için LinkedIn düşünce liderliği, onaylı editoryal ritim ve itibar protokolü demektir. B2C hızından farklı — güven ve uzmanlık ön planda.",
    seoTitle: "Kurumsal Sosyal Medya Yönetimi Trabzon | LinkedIn B2B · Wesoco",
    seoDesc:
      "Trabzon’da kurumsal sosyal medya: LinkedIn, onay hattı, kriz protokolü ve B2B içerik. Wesoco güvencesiyle itibar odaklı yönetim.",
    bodyHtml: `
<h2>Kurumsal sosyal medya yönetimi nedir?</h2>
<p><strong>Kurumsal sosyal medya yönetimi</strong>; şirketin kamuya açık sesini rastgele stajyer postu olmaktan çıkarıp onaylı, tutarlı ve ölçülebilir hale getirmektir. Trabzon Sosyal Medya olarak omurgayı LinkedIn’e kurarız: şirket sayfası, yönetici düşünce liderliği, sektörel içgörü ve istihdam/itibar dengesi.</p>
<p>Instagram veya diğer kanallar destekleyici olabilir; B2B’de ana sahne LinkedIn’dir. Restoran tipi B2C hızı arıyorsanız <a href="/hizmetler/sosyal-medya-yonetimi">operasyonel yönetim</a> daha uygundur.</p>

<h2>Neden B2B’de farklı yönetilir?</h2>
<p>Satın alma komiteleri “eğlenceli reels” ile ikna olmaz; uzmanlık, referans dili ve tutarlı mesaj ister. Yanlış bir paylaşım itibar riskidir — bu yüzden onay katmanı ve kriz protokolü paketin parçasıdır. Arsin ve benzeri sanayi koridorunda LinkedIn + <a href="/hizmetler/google-ads">Google Ads</a> kombinasyonu sık konuşulur: biri güven, diğeri niyet.</p>

<h2>Nasıl yönetilir?</h2>
<ol>
<li><strong>Paydaş haritası:</strong> Kim onaylar, kim konuşur, yasaklı konular.</li>
<li><strong>Editoryal hat:</strong> Aylık tema (uzmanlık, proje, insan, haber, istihdam).</li>
<li><strong>LinkedIn üretimi:</strong> Şirket + seçilmiş yönetici hesapları; native format.</li>
<li><strong>Onay ve yayın:</strong> Yazılı hat; acil kriz senaryosu (durdur / düzelt / sözcü).</li>
<li><strong>Skor:</strong> Profil ziyareti, takip kalitesi, lead/form sinyalleri — vanity beğeni değil.</li>
</ol>

<div class="seo-table-wrap"><table class="seo-comparison-table">
<caption>Kurumsal vs B2C yönetim</caption>
<thead><tr><th>Ölçüt</th><th>Kurumsal / B2B</th><th>B2C operasyon</th></tr></thead>
<tbody>
<tr><td>Omurga kanal</td><td>LinkedIn</td><td>Instagram</td></tr>
<tr><td>Tempo</td><td>Daha seyrek, daha derin</td><td>Yüksek ritim (reels/story)</td></tr>
<tr><td>Onay</td><td>Çok katmanlı</td><td>Tek hat veya hızlı tur</td></tr>
<tr><td>KPI</td><td>Güven, lead, itibar</td><td>Mesaj, randevu, ziyaret</td></tr>
</tbody></table></div>

<h2>Kimler için?</h2>
<p>Sanayi ve OSB çevresi hizmetleri, mühendislik, lojistik, kurumsal ofisler, B2B yazılım/hizmet ve itibarı kritik şirketler. Saf tüketici markaları için standart yönetim daha doğru kapıdır.</p>

<h2>Fiyat mantığı</h2>
<p>Onay katmanı sayısı, yönetici hesap adedi, içerik derinliği ve kriz hazırlığı kapsamı belirler. Keşif sonrası teklif; sabit TL kurumsal paket listesi yoktur. Medya (LinkedIn Ads vb.) ayrı satırdır.</p>

<h2>Editoryal hat ve kriz hazırlığı</h2>
<p>İşe alım içerikleri ile satış içerikleri aynı feed’de karışırsa hedef kitle bulanıklaşır; editoryal takvimde ayrı bloklar açılır. Hassas sektörlerde (hukuk, sağlık, finans) iddia kontrolü onay hattının parçasıdır. Üç aylık içerik haritası olmadan “her hafta bir şeyler atalım” yaklaşımı kurumsal hesapta tutarsızlık üretir.</p>
<p>Kriz protokolü “olur bir şey” diye ertelenmez: kim neyi kaldırır, kim konuşur, hangi kanalda ne söylenir peşinen yazılır. Çalışan savunuculuğu (employee advocacy) kontrolsüz bırakılırsa marka sesi dağılır; seçilmiş yönetici hesapları yazılı ton rehberiyle ilerler.</p>
<p>Holding içi çok markalı yapıda onay matrisi holding seviyesinde kurulur; her marka ayrı skor kartı alabilir. Rapor yönetim özetine indirgenir — kurul sunumuna uygun dil. Saf B2C tempo arayanlar için bu ürün değil, operasyonel yönetim doğrudur.</p>

<h2>İlgili sayfalar</h2>
<p><a href="/hizmetler/sosyal-medya-yonetimi">Operasyonel yönetim</a> · <a href="/hizmetler/dijital-pazarlama-ajansi">Dijital pazarlama</a> · <a href="/hizmetler/google-ads">Google Ads</a> · <a href="/bolgeler/arsin">Arsin</a></p>

<div class="page-cta">
  <h2>Kurumsal editoryal hattı kuralım</h2>
  <p>Onay matrisi ve LinkedIn temalarını 30 dakikada taslaklayalım.</p>
  <a href="/#iletisim" class="btn btn-primary">Ücretsiz keşif</a>
</div>
`.trim(),
    faqJson: [
      {
        q: "Kurumsal sosyal medya yönetimi nedir?",
        a: "B2B markalar için LinkedIn odaklı, onaylı editoryal ritim ve itibar protokolüyle sosyal medya yönetimidir.",
      },
      {
        q: "Sadece LinkedIn mi yönetiyorsunuz?",
        a: "Kurumsal omurga LinkedIn’dir. İhtiyaç halinde Instagram/şirket sayfaları destekleyici kapsama eklenir.",
      },
      {
        q: "Yönetici hesapları da dahil mi?",
        a: "Evet, seçilmiş yönetici düşünce liderliği pakete eklenebilir; onay ayrı tanımlanır.",
      },
      {
        q: "Kriz protokolü nedir?",
        a: "Yanlış veya hassas durumda kimin neyi durduracağı, silme/düzeltme ve sözcü sırası yazılıdır.",
      },
      {
        q: "B2C yönetimden farkı ne?",
        a: "Tempo, dil, KPI ve onay derinliği farklıdır. Kurumsalda güven ve uzmanlık vanity etkileşimden öndedir.",
      },
      {
        q: "Nasıl başlarız?",
        a: "Paydaş listesi ve mevcut LinkedIn varlıklarıyla ücretsiz keşif. 24 saat içinde dönüş.",
      },
    ],
  }
];

function wordCount(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

async function main() {
  let updated = 0;

  for (const s of SERVICES) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (!existing) {
      console.warn("skip missing slug:", s.slug);
      continue;
    }

    await prisma.service.update({
      where: { slug: s.slug },
      data: {
        title: s.title,
        lead: s.lead,
        bodyHtml: s.bodyHtml,
        faqJson: s.faqJson,
        seoTitle: s.seoTitle,
        seoDesc: s.seoDesc,
      },
    });

    updated += 1;
    console.log("updated", s.slug, "words", wordCount(s.bodyHtml), "faqs", s.faqJson.length);
  }

  console.log("updated count:", updated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
