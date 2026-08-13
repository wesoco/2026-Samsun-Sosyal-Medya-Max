/**
 * SEO odaklı blog yazıları (~5000 karakter düz metin).
 * Çalıştır: npx tsx prisma/seed-seo-blogs.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Faq = { q: string; a: string };
type Post = {
  slug: string;
  title: string;
  lead: string;
  category: string;
  coverUrl: string;
  keyword: string;
  sections: { h2: string; paras: string[] }[];
  faqs: Faq[];
  publishedAt: string;
};

function buildBody(p: Post): string {
  const parts: string[] = [];
  for (const s of p.sections) {
    parts.push(`<h2>${s.h2}</h2>`);
    for (const para of s.paras) parts.push(`<p>${para}</p>`);
  }
  if (p.faqs.length) {
    parts.push(`<h2>Sıkça sorulanlar</h2>`);
    for (const f of p.faqs) {
      parts.push(
        `<details class="faq-item"><summary>${f.q}</summary><p>${f.a}</p></details>`,
      );
    }
  }
  parts.push(
    `<p><strong>Samsun Sosyal Medya</strong> (Wesoco) ile ${p.keyword.toLowerCase()} sürecinizi netleştirmek için ücretsiz keşif görüşmesi alın. WhatsApp veya iletişim formu üzerinden 24 saat içinde dönüş yapıyoruz.</p>`,
  );
  let html = parts.join("\n");

  // ~5000 karakter düz metin hedefi  özgün ek paragraflarla doldur
  const fillers = [
    `<h2>${p.keyword}: yerel rekabet ve fırsat</h2><p>Samsun'da rekabet yalnızca büyük şehirlerle değil, aynı ilçedeki işletmeler arasındadır. ${p.keyword} arayan müşteri genelde hızlı dönüş, net paket ve ölçülebilir sonuç ister. Bu yüzden içerik ritmi, reklam testi ve raporlama birlikte ilerlemelidir. Wesoco bünyesindeki Samsun Sosyal Medya ekibi İlkadım'dan Bafra'ya, Atakum'dan Çarşamba'ya kadar şehir dinamiklerini bilir; sezonluk talep (turizm, eğitim, tarım dönemleri) içerik planına yansır.</p>`,
    `<h2>Ölçüm ve karar alma</h2><p>${p.keyword} yatırımı "paylaşım sayısı" ile değil; profil ziyareti, mesaj, arama, randevu ve maliyet metrikleriyle yönetilir. Aylık raporda neyin çalıştığı, neyin durduğu ve sonraki ayın üç net aksiyonu yazılır. Böylece bütçe tahmin değil veriye dayanır. İsterseniz keşif görüşmesinde mevcut hesabınızı birlikte açıp kısa bir audit çıkarırız.</p>`,
    `<h2>Yerel SEO ve uzun kuyruk sorgular</h2><p>Organik görünürlük için hizmet sayfaları, ilçe sayfaları ve blog içerikleri uzun kuyruk anahtar kelimeleri hedefler. ${p.keyword} başlığı etrafında sık sorulan sorular, süreç anlatımı ve referans çağrıları hem arama niyetini karşılar hem dönüşümü destekler. Google Haritalar ve tutarlı NAP (isim, adres, telefon) bilgisi de yerel güveni güçlendirir.</p>`,
    `<h2>Neden Samsun Sosyal Medya?</h2><p>Şeffaf sözleşme, ilk ay cayma hakkı, referans portföyü, Meta ve Google tarafında ayrı medya bütçesi yönetimi, yerinde çekim seçeneği ve 17 ilçe hizmet alanı. ${p.keyword} ihtiyacınız danışmanlık düzeyindeyse yol haritası; operasyon istiyorsanız tam yönetim sunarız. Hedef aynıdır: doğru kitleye, doğru mesajla, ölçülebilir büyüme.</p>`,
  ];

  let i = 0;
  while (plainLen(html) < 5000 && i < fillers.length) {
    html += "\n" + fillers[i++];
  }
  while (plainLen(html) < 5000) {
    html += `\n<p>${p.keyword} konusunda Samsun işletmeleri için sürdürülebilir büyüme; tutarlı içerik dili, düzenli üretim, akıllı reklam ve dürüst raporlama ile gelir. Kısa vadeli "patlatma" kampanyaları yerine 90 günlük planlarla ilerlemek hem maliyeti kontrol eder hem marka güvenini korur. Detaylı kapsam için ücretsiz keşif randevusu oluşturabilirsiniz.</p>`;
    if (i++ > 8) break;
  }
  return html;
}

function plainLen(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

const posts: Post[] = [
  {
    slug: "samsun-sosyal-medya-ajansi",
    title: "Samsun sosyal medya ajansı: yerel markalar için doğru seçim",
    lead: "Samsun sosyal medya ajansı arayan işletmeler için süreç, referans, raporlama ve Meta Ads şeffaflığı. Wesoco güvencesiyle yerel büyüme.",
    category: "Ajans",
    keyword: "Samsun sosyal medya ajansı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-08-01",
    sections: [
      {
        h2: "Samsun sosyal medya ajansı nedir?",
        paras: [
          "Samsun sosyal medya ajansı; Instagram, TikTok, Facebook ve LinkedIn'de markanızın görünürlüğünü, etkileşimini ve müşteri dönüşümünü planlı yöneten yerel ekiptir. Sadece paylaşım yapmak değil; hedef kitle analizi, içerik dili, yayın takvimi, topluluk yönetimi ve reklam optimizasyonu tek çatı altında ilerler.",
          "Şehir odaklı aramalarda işletmeler genelde \"Samsun sosyal medya ajansı\", \"Samsun sosyal medya uzmanı\" veya \"en iyi sosyal medya ajansı Samsun\" yazar. Doğru ajans; yerel dili bilen, referans gösteren, raporlayan ve sözleşme şartlarını net anlatan ekiptir.",
          "Samsun Sosyal Medya, Wesoco bünyesinde İlkadım'dan 17 ilçeye hizmet verir. Restoran, klinik, otel, inşaat, kafe ve kurumsal markalar için ölçeklenebilir paketler sunarız.",
        ],
      },
      {
        h2: "Ajans seçerken bakmanız gerekenler",
        paras: [
          "Referans portföyü: Aynı sektörde veya benzer ölçekte üretilmiş işler, vaatlerden daha çok şey söyler. Görsel tasarım, reels ve tanıtım filmlerini birlikte inceleyin.",
          "Süreç şeffaflığı: Keşif, strateji, üretim, onay, yayın ve aylık rapor adımları yazılı olmalı. \"İçerik üretiriz\" demek yetmez; kim onaylar, ne sıklıkla çekim yapılır, reklam bütçesi nasıl yönetilir netleşmeli.",
          "Raporlama disiplini: Erişim, etkileşim, takipçi kalitesi, mesaj/arama dönüşümü ve reklam ROAS'ı sade dilde anlatılmalı. Karmaşık tablolar değil, karar alınabilir özetler önemlidir.",
          "Yerel SEO ve şehir bilgisi: Samsun ilçeleri, sezonluk talep (turizm, tarım, eğitim dönemi) ve yerel rekabeti bilen ekip, içerik ve reklamı daha isabetli kurar.",
        ],
      },
      {
        h2: "Hizmet kapsamı nasıl olmalı?",
        paras: [
          "Kurumsal sosyal medya yönetimi paketinde genelde içerik takvimi, post/story/reels üretimi, yayınlama, yorum-mesaj yönetimi ve aylık performans özeti bulunur. Meta Ads veya Google Ads ayrı medya bütçesiyle yönetilir.",
          "İçerik üretimi ve profesyonel çekim; yerinde fotoğraf, video, reels ve gerektiğinde drone çekimiyle desteklenir. Samsun'da işletmeler için \"stok görsel + tasarım\" da mümkündür; fakat özgün çekim güven ve dönüşümü hızlandırır.",
          "Ajansın Instagram yönetimi, Meta reklam ajansı ve dijital pazarlama hizmetlerini entegre sunması; kanal kanal dağınık çalışmayı azaltır. Tek mesaj, tutarlı görsel dil, ölçülebilir büyüme.",
        ],
      },
      {
        h2: "Fiyat ve sözleşme mantığı",
        paras: [
          "Sosyal medya yönetimi fiyatları Samsun'da platform sayısı, içerik hacmi, çekim günü ve reklam yönetimine göre değişir. En ucuz paket değil; işinize uygun kapsam ve şeffaf faturalama önemlidir.",
          "Standart sözleşme süremiz 12 aydır; ilk ay içinde cayma hakkı net yazılır. Böylece strateji oturur, sonuçlar görünür, devam kararı bilinçli alınır.",
          "Ücretsiz keşif görüşmesinde mevcut hesaplarınıza bakıp size özel yol haritası çıkarırız. WhatsApp veya form yeterli; 24 saat içinde dönüş yaparız.",
        ],
      },
    ],
    faqs: [
      {
        q: "Samsun'da en iyi sosyal medya ajansı hangisi?",
        a: "En iyi ajans; yerel dil bilen, referans gösteren, şeffaf raporlayan ve ölçülebilir büyüyen ekiptir. Samsun Sosyal Medya bu standartta çalışır.",
      },
      {
        q: "Ajans ücreti ile reklam bütçesi aynı mı?",
        a: "Hayır. Ajans ücreti yönetim ve kreatif içindir; Meta/Google medya bütçesi ayrıdır ve raporlanır.",
      },
      {
        q: "Hangi ilçelerde hizmet veriyorsunuz?",
        a: "İlkadım, Atakum, Canik, Tekkeköy, Bafra, Çarşamba ve diğer Samsun ilçelerinde uzaktan yönetim veya yerinde çekim ile hizmet veriyoruz.",
      },
    ],
  },
  {
    slug: "samsun-sosyal-medya-yonetimi",
    title: "Samsun sosyal medya yönetimi: paket, süreç ve fiyat mantığı",
    lead: "Samsun sosyal medya yönetimi nedir, pakete neler girer, ne kadar sürer ve işletmeler için nasıl ölçülür? Pratik rehber.",
    category: "Yönetim",
    keyword: "Samsun sosyal medya yönetimi",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-08-02",
    sections: [
      {
        h2: "Samsun sosyal medya yönetimi nedir?",
        paras: [
          "Samsun sosyal medya yönetimi; markanızın Instagram, Facebook, TikTok ve LinkedIn hesaplarının stratejik planlanması, içerik üretimi, yayınlanması, etkileşim yönetimi ve performans takibidir. Amaç yalnızca \"aktif görünmek\" değil; doğru kitleye ulaşıp randevu, satış veya marka güveni üretmektir.",
          "İşletme için sosyal medya yönetimi Samsun'da özellikle restoran, klinik, otel, emlak, güzellik merkezi ve inşaat firmalarında kritikleşir. Yerel rekabet yüksek; düzenli ve ölçülebilir ritim şarttır.",
          "Profesyonel sosyal medya yönetimi; içerik dilini, görsel kimliği, yayın sıklığını ve reklam desteklerini tek planda birleştirir. Dağınık paylaşımlar yerine sistem kurar.",
        ],
      },
      {
        h2: "Pakete neler girmeli?",
        paras: [
          "Keşif ve konumlandırma: Hedef kitle, rakipler, güçlü yönler ve şehir içi fırsatlar. İlkadım ile Atakum'un dili aynı değildir; içerik buna göre şekillenir.",
          "Aylık içerik takvimi: Post, story ve reels planı; kampanya dönemleri ve sezonluk temalar netleşir.",
          "Üretim ve onay: Taslaklar size sunulur, onay sonrası yayınlanır. Acil içerik için hızlı onay hattı kurulabilir.",
          "Topluluk yönetimi: Yorum, mesaj ve mention'lara marka dilinde dönüş. Kriz anında hızlı müdahale planı.",
          "Raporlama: Aylık erişim, etkileşim, takipçi kalitesi, mesaj/arama ve reklam özeti. Sonraki ay aksiyonları yazılı gelir.",
        ],
      },
      {
        h2: "Süreç nasıl işler?",
        paras: [
          "01 Keşif: Markayı, hedefi ve mevcut hesapları dinleriz. 02 Strateji: Kanal, dil ve takvim netleşir. 03 Üretim: Çekim, kurgu, tasarım. 04 Büyüme: Yayın, reklam, optimizasyon ve rapor.",
          "Organik büyüme genelde 4-8 haftada hissedilir. Meta Ads ile ilk haftadan veri ve optimizasyon başlar. Sonuç süresi sektöre göre değişir; şeffaf beklenti yönetimi önemlidir.",
          "Sosyal medya paketi Samsun işletmeleri için ölçeklenebilir olmalıdır: küçük işletme tek platformla başlar, büyüdükçe reklam ve çekim günü eklenir.",
        ],
      },
      {
        h2: "Fiyat mantığı ve satın alma niyeti",
        paras: [
          "\"Sosyal medya yönetimi fiyatları Samsun\" arayanlar genelde net kapsam ister. Fiyat; içerik sayısı, çekim, platform ve reklam yönetimine bağlıdır. Keşif sonrası size özel teklif sunarız; sürpriz yok.",
          "Satın alma niyetli aramalarda (en iyi sosyal medya ajansı Samsun, tavsiye, fiyat) referans ve süreç netliği dönüşümü artırır. Bu yüzden her teklifte kapsamı madde madde yazarız.",
          "Samsun'da sosyal medya yönetimi yapan firma arıyorsanız; yerel referans, 17 ilçe hizmeti ve Wesoco güvencesiyle Samsun Sosyal Medya'yı inceleyin.",
        ],
      },
    ],
    faqs: [
      {
        q: "Sosyal medya yönetimi ücreti ne kadar?",
        a: "Platform sayısı, içerik hacmi ve reklam yönetimine göre değişir. Keşif sonrası net teklif sunuyoruz.",
      },
      {
        q: "Sözleşme süresi ne kadar?",
        a: "Standart 12 aydır. İlk ay içinde cayma hakkınız vardır; koşullar sözleşmede yazılıdır.",
      },
      {
        q: "Ne kadar sürede sonuç görülür?",
        a: "Organik tarafta genelde 4-8 hafta. Reklamda ilk haftadan veri başlar; sektör ve rekabet etkilidir.",
      },
    ],
  },
  {
    slug: "samsun-dijital-pazarlama-ajansi",
    title: "Samsun dijital pazarlama ajansı nasıl seçilir?",
    lead: "Samsun dijital pazarlama ajansı: sosyal medya, Meta Ads, Google Ads, içerik ve ölçümü tek sistemde kurmak.",
    category: "Dijital",
    keyword: "Samsun dijital pazarlama ajansı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-28",
    sections: [
      {
        h2: "Dijital pazarlama ajansı ne işe yarar?",
        paras: [
          "Samsun dijital pazarlama ajansı; sosyal medya, arama reklamları, içerik üretimi ve ölçümü birbirine bağlar. \"Gönderi paylaşmak\" ile \"müşteri bulmak\" arasındaki fark bu sistemdedir.",
          "Dijital pazarlama hizmeti Samsun'da sık aranan bir ihtiyaçtır çünkü yerel işletmeler hem organik görünürlük hem de reklam ile randevu/satış ister. Doğru ajans, kanal kanal değil hedef odaklı çalışır.",
          "Mesaj (ne söylüyoruz), içerik (nasıl gösteriyoruz), reklam (kime ulaştırıyoruz) ve ölçüm (ne işe yaradı) dört ayak üzerine kurulmalıdır.",
        ],
      },
      {
        h2: "Sosyal medya + reklam entegrasyonu",
        paras: [
          "Instagram yönetimi güçlü içerik üretir; Meta Ads o içeriği doğru kitleye taşır. Google Ads ise \"Samsun Instagram reklamı\", \"reklam ajansı önerisi Samsun\" gibi niyetli aramalardaki müşteriyi yakalar.",
          "Facebook reklamları ve Instagram reklamı aynı Meta ekosisteminde yönetilir; bütçe, kreatif ve hedef kitle birlikte optimize edilir. Medya bütçesi ajans ücretinden ayrıdır.",
          "Web ve sosyal medya ajansı arayanlar genelde hem site hem hesap ister. Bizim odağımız sosyal medya ve performans reklamıdır; gerektiğinde içerik ve landing uyumunu da yönetiriz.",
        ],
      },
      {
        h2: "Seçim kriterleri",
        paras: [
          "Yerel referans ve sektör deneyimi. Klinik ile restoran aynı dilde konuşmaz; ajansın her iki dünyayı da anlaması gerekir.",
          "Şeffaf raporlama: Harcama, tıklama, mesaj, arama, maliyet. \"Beğeni arttı\" tek başına başarı değildir.",
          "Sözleşme ve iletişim: Kim muhatabınız, onaylar nasıl işler, kriz anında kim cevap verir? Net yazılmalı.",
          "Samsun kurumsal ajans arayan B2B markalar için LinkedIn ve kurumsal içerik dili de değerlendirmeye alınmalıdır.",
        ],
      },
      {
        h2: "Samsun için yerel SEO avantajı",
        paras: [
          "Dijital pazarlama yalnızca reklam değildir. İlçe sayfaları, hizmet sayfaları, blog ve Google Haritalar uyumu organik trafiği besler. \"Samsun Meta Ads uzmanı\", \"Samsun Instagram reklam uzmanı\" gibi long-tail sorgular dönüşüm getirir.",
          "Ajansınızın içerik stratejisinde şehir ve ilçe odaklı anahtar kelimeleri bilinçli kullanması, hem SEO hem Ads kalitesini yükseltir.",
        ],
      },
    ],
    faqs: [
      {
        q: "Dijital pazarlama ile sosyal medya yönetimi aynı mı?",
        a: "Sosyal medya yönetimi dijital pazarlamanın parçasıdır. Dijital pazarlama ayrıca arama reklamı, ölçüm ve bazen web uyumunu da kapsar.",
      },
      {
        q: "Google reklam veren firma Samsun'da nasıl seçilir?",
        a: "Hesap yapısı, negatif kelime, dönüşüm takibi ve şeffaf rapor isteyin. Deneme bütçesiyle başlayıp ölçekleyin.",
      },
    ],
  },
  {
    slug: "samsun-reklam-ajansi",
    title: "Samsun reklam ajansı: Meta, Google ve performans odaklı büyüme",
    lead: "Samsun reklam ajansı seçerken bütçe şeffaflığı, kreatif kalite ve ölçülebilir sonuç. En iyi reklam ajansı Samsun için pratik kriterler.",
    category: "Reklam",
    keyword: "Samsun reklam ajansı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-30",
    sections: [
      {
        h2: "Samsun reklam ajansı ne sunmalı?",
        paras: [
          "Samsun reklam ajansı; Meta Ads, Google Ads ve gerektiğinde YouTube ile bütçenizi doğru kitleye ulaştırır. Amaç gösterim değil; mesaj, randevu, satış veya mağaza trafiğidir.",
          "\"Reklam ajansı önerisi Samsun\", \"işletmem için reklam ajansı\", \"en iyi reklam ajansı Samsun\" aramaları satın alma niyeti taşır. Bu yüzden ajans; referans, örnek kampanya ve net rapor sunabilmelidir.",
          "Samsun Meta reklam ajansı olarak Instagram ve Facebook reklamlarını konum, ilgi alanı ve retargeting ile yönetiriz. Medya bütçesi ayrı, ajans ücreti ayrıdır.",
        ],
      },
      {
        h2: "Meta Ads ve Facebook/Instagram reklamları",
        paras: [
          "Samsun Instagram reklamı; görsel/reels kreatif + doğru hedefleme ile çalışır. Zayıf kreatif iyi hedeflemeyi boşa harcar; güçlü kreatif yanlış hedeflemeyi de.",
          "Facebook reklamları hâlâ yerel işletmeler için güçlüdür: mesaj kampanyaları, formlar, mağaza ziyareti. Bütçeyi test-öğren-ölçekle döngüsüyle yönetmek gerekir.",
          "Samsun Meta Ads uzmanı; piksel/API olayları, kitleler, A/B test ve frekans kontrolünü takip eder. \"Reklamı açtık\" yetmez; haftalık optimizasyon şarttır.",
        ],
      },
      {
        h2: "Google Ads ve niyetli trafik",
        paras: [
          "Google reklam veren firma Samsun'da arama niyetini yakalar: \"sosyal medya yönetimi fiyatları Samsun\", \"drone çekimi Samsun\" gibi sorgular dönüşüme yakındır.",
          "Arama, Display ve YouTube kanalları hedefe göre seçilir. Negatif kelime listesi ve dönüşüm takibi olmayan hesaplar bütçe yakar.",
          "Samsun reklam ajansı fiyatları; yönetilen bütçe, kanal sayısı ve kreatif üretimine göre değişir. Keşifte net kapsam yazarız.",
        ],
      },
      {
        h2: "Performans kültürü",
        paras: [
          "Her kuruşun nereye gittiğini görün. Haftalık özet + aylık derin rapor. Hangi kreatif çalıştı, hangi kitle pahalı kaldı, sonraki adım ne?",
          "Profesyonel reklam yönetimi; sosyal medya içerik ajansı ile uyumlu yürür. Organik içerik reklamda yeniden kullanılır, maliyet düşer, mesaj tutarlı kalır.",
        ],
      },
    ],
    faqs: [
      {
        q: "Reklam bütçesi ajans ücretine dahil mi?",
        a: "Hayır. Medya bütçesi platforma ödenir; ajans ücreti yönetim ve kreatif içindir.",
      },
      {
        q: "Ne kadar bütçeyle başlanır?",
        a: "Sektör ve hedefe göre değişir. Test için anlamlı bir başlangıç bütçesi belirleyip veriye göre ölçekleriz.",
      },
    ],
  },
  {
    slug: "samsun-instagram-yonetimi",
    title: "Samsun Instagram yönetimi: hesabı büyüten değil dönüşüm üreten ajans",
    lead: "Samsun Instagram yönetimi; hesabı rastgele doldurmak değil, içerik takvimi, reels, story, topluluk ve gerektiğinde Meta Ads'i aynı hedefe bağlamaktır. Restoran, klinik, otel veya perakende fark etmeksizin markanın diline ve satış yoluna göre plan kurulur. Instagram hesabını büyütmek isteyen Samsun işletmeleri için takipçi sayısından önce profil ziyareti, mesaj, arama ve rezervasyon sinyallerine odaklanan pratik bir rehber.",
    category: "Instagram",
    keyword: "Samsun Instagram yönetimi",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-25",
    sections: [
      {
        h2: "Samsun'da Instagram yönetimi nasıl yapılır?",
        paras: [
          "Samsun Instagram yönetimi keşif ile başlar: hedef kitle, rakip, mevcut içerik kalitesi ve satış/randevu hedefi. Sonra içerik takvimi, üretim, yayın, etkileşim ve gerekirse Meta Ads devreye girer.",
          "\"Samsun'da Instagram hesabı yöneten ajans\" arayanlar genelde takipçi değil müşteri ister. Bu yüzden keşfet trafiği, kaydetme, profil ziyareti, mesaj ve arama metrikleri birlikte izlenir.",
          "Instagram reklam uzmanı perspektifiyle organik + ücretli kanal birlikte planlanır. Sadece organik büyüyen hesaplar rekabette yavaş kalabilir.",
        ],
      },
      {
        h2: "İçerik: post, story, reels",
        paras: [
          "Reels çekimi Samsun işletmeleri için keşfet kapısıdır. Kısa video; menü, hizmet, ekip, mekan ve müşteri deneyimini hızlı anlatır.",
          "Instagram hikâyeleri günlük temas kurar; anket, soru kutusu ve güncel kampanya ile satış kanalına dönüşür.",
          "Sosyal medya içerik üretimi Samsun'da yerinde çekimle güçlenir. Profesyonel fotoğraf çekimi ve video prodüksiyon, stok görsele göre daha yüksek güven üretir.",
        ],
      },
      {
        h2: "Yönetim rutinleri",
        paras: [
          "Haftalık yayın ritmi, onay döngüsü, yorum/mesaj yanıt süreleri ve kriz protokolü yazılı olmalıdır. Sosyal medya hesabımı kim yönetecek diye soran işletmeler için net muhatap kritiktir.",
          "Aylık raporda erişim, etkileşim oranı, kaydetme, paylaşım, mesaj ve reklam sonuçları sade dilde anlatılır. Sonraki ay için 3 net aksiyon önerilir.",
          "Kurumsal sosyal medya yönetimi isteyen markalarda LinkedIn ile uyumlu dil; B2C'de ise daha sıcak, yerel ve hızlı içerik kullanılır.",
        ],
      },
      {
        h2: "Sektörel örnekler",
        paras: [
          "Restoran ve kafe sosyal medya yönetimi Samsun'da yemek görseli + reels + konum etiketleriyle çalışır. Klinik ve güzellik merkezinde güven, ekip ve öncesi-sonrası dili öne çıkar.",
          "Otel sosyal medya yönetimi turizm sezonuna göre planlanır; drone ve mekan çekimleri fark yaratır. Emlak ve inşaatta proje hikâyesi ve güven mesajı kritiktir.",
        ],
      },
    ],
    faqs: [
      {
        q: "Instagram yönetimi pakete neler dahil?",
        a: "Takvim, içerik üretimi/yayın, etkileşim yönetimi ve aylık rapor. Reklam ve ek çekim günü pakete göre eklenir.",
      },
      {
        q: "Reels içerik üretimi dahil mi?",
        a: "Çoğu pakette aylık reels kotası vardır. Ek üretim için ayrı plan çıkarılır.",
      },
    ],
  },
  {
    slug: "samsun-meta-reklam-ajansi",
    title: "Samsun Meta reklam ajansı: Facebook ve Instagram'da ölçülebilir sonuç",
    lead: "Samsun Meta reklam ajansı ile doğru kitle, doğru kreatif, şeffaf bütçe. Meta Ads uzmanı bakış açısıyla yerel işletmeler için rehber.",
    category: "Meta Ads",
    keyword: "Samsun Meta reklam ajansı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-22",
    sections: [
      {
        h2: "Neden Meta Ads?",
        paras: [
          "Samsun işletmeleri için Meta Ads; konum hedefleme, ilgi alanı ve retargeting ile müşteri bulmanın en hızlı yollarından biridir. Organik erişim tek başına yetmez.",
          "Samsun Meta reklam ajansı; kampanya yapısını, kreatifi ve bütçeyi birlikte yönetir. \"Reklamı açmak\" ile \"performans yönetmek\" farklı işlerdir.",
          "Müşteri bulmak için sosyal medya ajansı arayanlar genelde kısa sürede mesaj ve telefon ister. Meta mesaj ve dönüşüm kampanyaları bu hedefe uygundur.",
        ],
      },
      {
        h2: "Kurulum ve ölçüm",
        paras: [
          "İşletme yöneticisi, piksel veya Conversion API, olaylar (mesaj, form, satın alma) ve katalog/ürün seti doğru kurulmalıdır. Ölçüm yoksa optimizasyon kördür.",
          "Kreatif seti: statik görsel, carousel, reels/UGC tarzı video. Samsun sosyal medya içerik ajansı ile üretilen içerikler reklamda yeniden kullanılır.",
          "Haftalık optimizasyon: kaybeden reklam setlerini kapatmak, kazananı ölçeklemek, frekansı dengelemek, yeni kreatif eklemek.",
        ],
      },
      {
        h2: "Bütçe ve şeffaflık",
        paras: [
          "Medya bütçesi ajans ücretine dahil değildir. Her kuruşun nereye gittiğini aylık raporda görürsünüz.",
          "Samsun dijital ajans fiyatları konuşulurken yönetim ücreti ile medya bütçesini ayırmak gerekir. Bu ayrım güven oluşturur.",
          "Küçük işletmeler için sosyal medya paketi + düşük test bütçesiyle başlamak; veri geldikçe büyütmek en sağlıklı yoldur.",
        ],
      },
      {
        h2: "Sık yapılan hatalar",
        paras: [
          "Tek kreatif ile aylarca gitmek, geniş hedef kitleyi sınırsız bırakmak, dönüşüm olayını yanlış kurmak, organik içerik ile reklam mesajını koparmak.",
          "Doğru Meta Ads uzmanı bu hataları erken yakalar. Samsun Sosyal Medya olarak keşifte mevcut reklam hesabınızı da inceleriz.",
        ],
      },
    ],
    faqs: [
      {
        q: "Meta Ads bütçesi ne kadar olmalı?",
        a: "Hedef ve rekabete göre değişir. Anlamlı test bütçesiyle başlayıp kazanan kurguları ölçekleriz.",
      },
      {
        q: "Organik yönetim olmadan sadece reklam olur mu?",
        a: "Olur ama profil zayıfsa dönüşüm düşer. En iyi sonuç organik + reklam birlikte geldiğinde alınır.",
      },
    ],
  },
  {
    slug: "samsun-kurumsal-sosyal-medya-yonetimi",
    title: "Samsun kurumsal sosyal medya yönetimi: B2B ve marka güveni",
    lead: "Samsun kurumsal sosyal medya yönetimi ve kurumsal sosyal medya hizmetleri. LinkedIn, itibar ve tutarlı marka dili.",
    category: "Kurumsal",
    keyword: "Samsun kurumsal sosyal medya yönetimi",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-18",
    sections: [
      {
        h2: "Kurumsal sosyal medya neden farklıdır?",
        paras: [
          "Samsun kurumsal sosyal medya yönetimi; tüketici markasından daha fazla güven, tutarlılık ve itibar yönetimi ister. Mesajlar hukuki ve marka standartlarına uygun olmalıdır.",
          "Samsun kurumsal ajans arayan şirketler genelde LinkedIn + Instagram kombinasyonu, kriz protokolü ve yönetim kurulu onay süreçleri bekler.",
          "İnşaat firması, enerji, lojistik, sanayi ve B2B hizmetlerde içerik; proje hikâyesi, ekip, standartlar ve sosyal sorumluluk etrafında kurulur.",
        ],
      },
      {
        h2: "Kanallar ve içerik dili",
        paras: [
          "LinkedIn yönetimi: düşünce liderliği, işe alım, B2B görünürlük. Instagram: marka yüzü, saha, ekip ve görsel güç. Facebook: topluluk ve yerel duyurular.",
          "Marka danışmanlığı Samsun kapsamında ton of voice, görsel sistem ve yasaklı konular netleşir. Her paylaşım \"kurumsal kimlik dosyasına\" uyar.",
          "Video prodüksiyon ve profesyonel fotoğraf çekimi; fabrika, şantiye, ofis ve etkinliklerde marka algısını yükseltir. Drone çekimi inşaat ve turizmde fark yaratır.",
        ],
      },
      {
        h2: "Yönetişim ve onay",
        paras: [
          "Kurumsal süreçlerde onay katmanları uzayabilir. Takvim erken hazırlanır; kritik içerikler için hızlı hat tanımlanır.",
          "Kriz anında destek: olumsuz yorum, yanlış anlaşılma veya acil açıklama için hazır şablonlar ve yetkili kişi listesi.",
          "Raporlama; erişimin yanında marka güveni göstergeleri (kaydetme, paylaşım, nitelikli yorum, site/trafik) ile yapılır.",
        ],
      },
      {
        h2: "Samsun kurumsal sosyal medya hizmetleri",
        paras: [
          "Strateji, içerik, yayın, reklam (Meta/LinkedIn) ve aylık yönetim kurulu özeti. İsterseniz sadece danışmanlık; isterseniz tam operasyon.",
          "Samsun web ve sosyal medya ajansı arayanlar için sosyal kanalları web mesajıyla hizalarız. Tek vaat, çok kanal.",
        ],
      },
    ],
    faqs: [
      {
        q: "LinkedIn yönetimi de yapıyor musunuz?",
        a: "Evet. Özellikle B2B, inşaat, sanayi ve kurumsal markalar için LinkedIn içerik ve etkileşim yönetimi sunuyoruz.",
      },
      {
        q: "Kriz iletişimi var mı?",
        a: "Evet. Hızlı müdahale ve itibar yönetimi desteği sunuyoruz.",
      },
    ],
  },
  {
    slug: "samsun-sosyal-medya-uzmani",
    title: "Samsun sosyal medya uzmanı ve danışmanı: ajans mı, freelance mı?",
    lead: "Samsun sosyal medya uzmanı, danışmanı ve ajans farkı. İşletmeniz için doğru modeli seçme rehberi.",
    category: "Danışmanlık",
    keyword: "Samsun sosyal medya uzmanı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-15",
    sections: [
      {
        h2: "Uzman, danışman, ajans farkı",
        paras: [
          "Samsun sosyal medya uzmanı genelde operasyonu (içerik, yayın, reklam) yürüten kişidir. Samsun sosyal medya danışmanı ise strateji, denetim ve yol haritası verir; üretimi siz veya ekip yapar.",
          "Ajans modelinde strateji + üretim + reklam + rapor tek çatıdadır. \"Sosyal medya hesabımı kim yönetecek?\" sorusunun net cevabı vardır: ekip ve süreç.",
          "Freelance uygun olabilir; fakat hastalık, yoğunluk veya çok kanallı ihtiyaçta süreklilik riski artar. Ajans yedekli çalışma ve standart süreç sunar.",
        ],
      },
      {
        h2: "Danışmanlık ne zaman yeterli?",
        paras: [
          "İç ekibiniz varsa Samsun sosyal medya danışmanlığı; aylık strateji, içerik denetimi ve reklam kontrolü için yeterlidir. Üretim sizde kalır, kalite çıtasını biz tutarız.",
          "Ekip yoksa profesyonel sosyal medya yönetimi (tam hizmet) daha doğrudur. Aksi halde danışmanlık notları uygulanmadan rafta kalır.",
          "Marka danışmanlığı Samsun kapsamında konumlandırma, vaat ve görsel dil netleşmeden içerik üretmek bütçe israfıdır.",
        ],
      },
      {
        h2: "Doğru sorular",
        paras: [
          "Referanslarınız hangi sektörde? Rapor örneği görebilir miyim? Onay süreci nasıl? Reklam hesabı kimin üzerine? Sözleşme ve cayma nasıl?",
          "En iyi sosyal medya ajansı Samsun aramasında bu sorular filtre görevi görür. Ucuz teklif değil, net süreç kazandırır.",
          "Sosyal medya ajansı tavsiye Samsun arıyorsanız; mevcut müşteri yorumları, Google görünürlüğü ve portföy tutarlılığına bakın.",
        ],
      },
      {
        h2: "Samsun Sosyal Medya yaklaşımı",
        paras: [
          "Keşif → strateji → üretim → büyüme. Wesoco güvencesi, 17 ilçe hizmeti, şeffaf rapor. İsterseniz danışmanlık, isterseniz tam yönetim.",
          "Ücretsiz keşifte mevcut hesabınıza bakıp size özel öneri sunarız. Form veya WhatsApp yeterli.",
        ],
      },
    ],
    faqs: [
      {
        q: "Danışmanlık ile yönetim farkı nedir?",
        a: "Danışmanlık yol haritası ve denetimdir; yönetim ise üretimi ve günlük operasyonu da kapsar.",
      },
      {
        q: "Küçük işletme için hangisi uygun?",
        a: "Çoğu küçük işletme için ölçeklenebilir yönetim paketi daha hızlı sonuç verir.",
      },
    ],
  },
  {
    slug: "samsun-icerik-uretimi",
    title: "Samsun içerik üretimi: reels, fotoğraf ve video ile marka stoğu",
    lead: "Samsun içerik üretimi ve sosyal medya içerik ajansı. Reels çekimi, video prodüksiyon ve profesyonel fotoğraf.",
    category: "İçerik",
    keyword: "Samsun içerik üretimi",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-12",
    sections: [
      {
        h2: "Neden özgün içerik?",
        paras: [
          "Samsun içerik üretimi; stok görselden daha fazla güven ve yerel kimlik üretir. Müşteri mekanı, ekibi ve ürünü gerçek haliyle görmek ister.",
          "Sosyal medya içerik üretimi Samsun'da rekabeti belirler. Aynı şablonu kullanan hesaplar Keşfet'te ve reklamda daha zayıf kalır.",
          "İçerik ajansı; brief, çekim, kurgu, altyazı, kapak ve platform kırılımlarını planlar. Tek çekim gününden post + story + reels stoğu çıkar.",
        ],
      },
      {
        h2: "Reels ve kısa video",
        paras: [
          "Reels çekimi Samsun işletmeleri için erişim motorudur. Menü, hizmet, before-after, ekip ve müşteri deneyimi 15-30 saniyede anlatılır.",
          "Reels içerik üretimi neden önemli? Çünkü takipçisi olmayan kitleye organik kapı açar; reklam kreatifi olarak da yeniden kullanılır.",
          "Video prodüksiyon Samsun kapsamında daha uzun tanıtım, otel/klinik walkthrough veya ürün filmi de üretilebilir.",
        ],
      },
      {
        h2: "Fotoğraf ve mekan",
        paras: [
          "Profesyonel fotoğraf çekimi Samsun'da restoran, klinik, otel ve mağazalar için vitrin gibidir. Işık, açı ve marka dili tutarlı olmalıdır.",
          "Çekim yerinde mi? Evet. Samsun genelinde planlı çekim yapılır. Uzaktan yönetim isteyenler için tasarım + mevcut görsel de mümkündür.",
          "İçerik onayı: taslaklar size gelir, onay sonrası yayın. Marka diliniz korunur.",
        ],
      },
      {
        h2: "Üretim + yönetim birlikteliği",
        paras: [
          "İçerik üretip yönetmeyen marka stoğu boşa yığar. Yönetip üretmeyen marka ise kalitesizleşir. İkisini birlikte sunmak dönüşümü artırır.",
          "Samsun sosyal medya içerik ajansı olarak üretim günlerini yönetim takvimine bağlarız. Her görselin bir işi vardır.",
        ],
      },
    ],
    faqs: [
      {
        q: "Aylık kaç içerik üretilir?",
        a: "Pakete göre değişir. Keşifte hedef ve kanal sayısına göre net kota çıkarırız.",
      },
      {
        q: "Reels kotası var mı?",
        a: "Çoğu pakette vardır. Ek çekim ve kurgu için ayrı plan yapılabilir.",
      },
    ],
  },
  {
    slug: "samsun-profesyonel-cekim-hizmetleri",
    title: "Samsun profesyonel çekim hizmetleri: fotoğraf, video ve drone",
    lead: "Samsun profesyonel çekim hizmetleri; fotoğraf, video prodüksiyon, reels ve drone çekimi ile markanızı güçlendirin.",
    category: "Çekim",
    keyword: "Samsun profesyonel çekim hizmetleri",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-10",
    sections: [
      {
        h2: "Profesyonel çekim neden gerekir?",
        paras: [
          "Telefon ile çekilen içerik her zaman yetmez. Profesyonel fotoğraf çekimi Samsun işletmelerinde ışık, kompozisyon ve marka tutarlılığı sağlar.",
          "Video prodüksiyon Samsun'da otel, klinik, restoran ve kurumsal markalar için güven ve prestij üretir. Kısa reels ile uzun tanıtım birlikte planlanabilir.",
          "Drone çekimi Samsun; deniz kıyısı, yayla, şantiye ve otel cephelerinde havadan bakışla fark yaratır. Turizm ve inşaatta özellikle etkilidir.",
        ],
      },
      {
        h2: "Çekim günü nasıl planlanır?",
        paras: [
          "Brief: hedef platformlar, kullanılacak sahneler, yasaklı alanlar, ürün/hizmet önceliği. Shot list çıkarılır.",
          "Çekim: mekan, ekip, ürün, detay, drone (gerekirse). Ses ve doğal ışık planı yapılır.",
          "Kurgu ve teslim: platform kırılımları (9:16, 1:1, 16:9), altyazı, müzik, logo. Onay sonrası sosyal medya takvimine işlenir.",
        ],
      },
      {
        h2: "Kimler için zorunluya yakın?",
        paras: [
          "Otel ve turizm: mekan ve manzara. Restoran/kafe: yemek ve atmosfer. Klinik/güzellik: hijyen, ekip, güven. İnşaat/emlak: proje ölçeği ve drone.",
          "Doktor sosyal medya ajansı Samsun arayan kliniklerde görsel dil hassastır; iddialı vaatlerden kaçınılır, bilgilendirici ve güven odaklı içerik üretilir.",
        ],
      },
      {
        h2: "Çekim + reklam sinerjisi",
        paras: [
          "İyi çekilmiş içerik Meta Ads ve Google YouTube reklamlarında maliyeti düşürür. Zayıf kreatif bütçeyi yer.",
          "Samsun Sosyal Medya; çekim, kurgu ve yayın yönetimini tek çatıda sunar. Wesoco güvencesiyle 17 ilçede planlı üretim.",
        ],
      },
    ],
    faqs: [
      {
        q: "Drone çekimi Samsun'da yapıyor musunuz?",
        a: "Evet. Otel, inşaat, turizm ve kurumsal markalar için profesyonel drone video/fotoğraf ve kurgu sunuyoruz.",
      },
      {
        q: "Tek gün çekim yeterli mi?",
        a: "Çoğu işletme için aylık/periyodik çekim günü yeterlidir. Kampanya dönemlerinde ek gün planlanır.",
      },
    ],
  },
  {
    slug: "restoran-sosyal-medya-yonetimi-samsun",
    title: "Restoran ve kafe sosyal medya yönetimi Samsun",
    lead: "Restoran sosyal medya yönetimi Samsun ve kafe hesapları için içerik, reels, konum ve reklam stratejisi.",
    category: "Sektör",
    keyword: "Restoran sosyal medya yönetimi Samsun",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-08",
    sections: [
      {
        h2: "Restoran ve kafe için sosyal medya",
        paras: [
          "Restoran sosyal medya yönetimi Samsun'da görsel iştah, hız ve yerel keşifle yürür. Menü, şef, atmosfer ve müşteri deneyimi düzenli ritme oturmalıdır.",
          "Kafe sosyal medya yönetimi Samsun'da hikâye ve reels ile güçlenir: demleme, detay, ekip, sezonluk içecekler. Konum etiketi ve yerel hashtag'ler görünürlük sağlar.",
          "Amaç sadece beğeni değil; rezervasyon, paket servis, mağaza trafiği ve tekrar ziyarettir.",
        ],
      },
      {
        h2: "İçerik formülleri",
        paras: [
          "Yemek kahraman görselleri, 15 sn reels, story'de günlük stok/kampanya, müşteri yorumu paylaşımı, arka plan (mutfak/ekip) içerikleri.",
          "Profesyonel çekim günü ile haftalık stok çıkar; telefon içerikleri günlük sıcaklığı korur. İkisi dengelenmelidir.",
          "Meta Ads ile \"yakınımdaki restoran\", ilgi alanı ve retargeting; öğle/akşam saatlerine göre planlanır.",
        ],
      },
      {
        h2: "Sık hatalar",
        paras: [
          "Düzensiz paylaşım, karanlık fotoğraflar, sadece ürün (hikâye yok), yanıtsız yorumlar, ölçülmeyen reklam.",
          "Doğru ajans bu hataları süreçle çözer: takvim, çekim, yanıt SLA'sı, rapor.",
        ],
      },
      {
        h2: "Samsun'da nasıl başlanır?",
        paras: [
          "Ücretsiz keşifte mevcut hesabınıza ve rakiplerinize bakarız. Size özel içerik + reklam yol haritası çıkarırız.",
          "İlkadım, Atakum, Canik ve diğer ilçelerde yerinde çekim planlanabilir.",
        ],
      },
    ],
    faqs: [
      {
        q: "Haftada kaç post gerekir?",
        a: "Markaya göre değişir. Genelde düzenli reels + story ritmi, seyrek ama kaliteli posttan daha etkilidir.",
      },
      {
        q: "Reklam şart mı?",
        a: "Organikle başlanabilir; büyümeyi hızlandırmak için düşük bütçeli Meta Ads öneririz.",
      },
    ],
  },
  {
    slug: "klinik-guzellik-sosyal-medya-samsun",
    title: "Klinik ve güzellik merkezi sosyal medya yönetimi Samsun",
    lead: "Klinik sosyal medya yönetimi Samsun, doktor ve güzellik merkezi hesapları için güven odaklı içerik ve reklam.",
    category: "Sektör",
    keyword: "Klinik sosyal medya yönetimi Samsun",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-05",
    sections: [
      {
        h2: "Sağlık ve güzellikte sosyal medya",
        paras: [
          "Klinik sosyal medya yönetimi Samsun'da güven, uzmanlık ve şeffaflık üzerine kurulur. Abartılı vaatler yerine bilgilendirici içerik tercih edilir.",
          "Doktor sosyal medya ajansı Samsun arayan hekimler; eğitim içeriği, ekip, klinik turu ve hasta yolculuğu anlatımı ister. Etik sınırlar korunur.",
          "Güzellik merkezi sosyal medya yönetimi Samsun'da before-after, cihaz/hizmet tanıtımı ve randevu odaklı CTA'lar öne çıkar.",
        ],
      },
      {
        h2: "İçerik ve reklam",
        paras: [
          "Eğitim reels'leri, SSS story'leri, klinik atmosfer fotoğrafları, ekip tanıtımı. Profesyonel çekim hijyen ve güven algısını yükseltir.",
          "Meta Ads'te mesaj/randevu kampanyaları; konum ve ilgi alanı ile desteklenir. Medya bütçesi ayrı yönetilir ve raporlanır.",
          "Yorum ve mesajlarda hızlı, sakin, bilgilendirici dil. Kriz veya şikâyette hazır protokol.",
        ],
      },
      {
        h2: "Uyulması gerekenler",
        paras: [
          "İddialı garanti dili, yanıltıcı sonuç vaadi ve hasta mahremiyetine aykırı içerikten kaçınılır. Onaylı görseller kullanılır.",
          "Kurumsal sosyal medya yönetimi disiplinleri klinik markasında da geçerlidir: takvim, onay, rapor.",
        ],
      },
      {
        h2: "Sonuç",
        paras: [
          "Doğru içerik + düzenli ritim + ölçülen reklam = daha nitelikli randevu talebi. Samsun Sosyal Medya ile keşif görüşmesi ücretsizdir.",
        ],
      },
    ],
    faqs: [
      {
        q: "Before-after paylaşılır mı?",
        a: "İzinli ve etik çerçevede, marka politikasına uygun şekilde planlanır.",
      },
      {
        q: "Reklamda neyi hedeflersiniz?",
        a: "Genelde mesaj, form veya arama gibi randevuya yakın dönüşümler.",
      },
    ],
  },
  {
    slug: "samsun-sosyal-medya-danismanligi",
    title: "Samsun sosyal medya danışmanlığı: yol haritası ve denetim",
    lead: "Samsun sosyal medya danışmanlığı ile strateji, içerik denetimi ve reklam kontrolü. Tam yönetim istemeyen markalar için.",
    category: "Danışmanlık",
    keyword: "Samsun sosyal medya danışmanlığı",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-07-02",
    sections: [
      {
        h2: "Danışmanlık kapsamı",
        paras: [
          "Samsun sosyal medya danışmanlığı; mevcut hesabın audit'i, rakip taraması, kanal stratejisi, içerik direksiyonu ve KPI setidir. Üretim sizde veya ekibinizde kalabilir.",
          "Aylık toplantılarla takvim gözden geçirilir, reklam hesabı denetlenir, sonraki ay öncelikleri netleşir.",
          "Marka danışmanlığı Samsun ile birleştiğinde vaat, ton ve görsel sistem de oturur.",
        ],
      },
      {
        h2: "Kime uygun?",
        paras: [
          "İç ekibi olan otel, klinik, perakende ve kurumsal firmalar. Üretimi yaptırıp stratejiyi dışarıdan almak isteyenler.",
          "Ekibi olmayan küçük işletmelerde çoğu zaman tam yönetim daha hızlı sonuç verir.",
        ],
      },
      {
        h2: "Çıktılar",
        paras: [
          "Audit raporu, 90 günlük yol haritası, içerik sütunları, örnek brief'ler, reklam kontrol listesi, aylık skor kartı.",
          "İsterseniz danışmanlık sonrası tam yönetim paketine geçiş sorunsuz yapılır.",
        ],
      },
      {
        h2: "Neden Samsun Sosyal Medya?",
        paras: [
          "Yerel rekabeti bilen ekip, Wesoco güvencesi, şeffaf süreç. Ücretsiz keşifle başlayın; size danışmanlık mı yönetim mi daha uygun netleştirelim.",
        ],
      },
    ],
    faqs: [
      {
        q: "Danışmanlık süresi ne kadar?",
        a: "Genelde aylık retainer veya 90 günlük program. İhtiyaca göre esnetilir.",
      },
      {
        q: "Reklam hesabına girer misiniz?",
        a: "Evet, denetim ve optimizasyon önerisi için erişim alınabilir; yetki sizde kalır.",
      },
    ],
  },
  {
    slug: "samsun-isletmeler-icin-sosyal-medya-yonetimi",
    title: "Samsun işletmeler için sosyal medya yönetimi: nereden başlamalı?",
    lead: "Samsun işletmeler için sosyal medya yönetimi ve müşteri bulmak için ajans seçimi. Adım adım başlangıç rehberi.",
    category: "Yönetim",
    keyword: "Samsun işletmeler için sosyal medya yönetimi",
    coverUrl: "/assets/Samsun-sosyal-medya.webp",
    publishedAt: "2026-06-28",
    sections: [
      {
        h2: "İşletme olarak ilk adımlar",
        paras: [
          "Hedefinizi yazın: randevu, mağaza trafiği, online satış, marka bilinirliği. Hedef yoksa içerik dağılır.",
          "Hesapları toparlayın: kullanıcı adları, görsel kimlik, iletişim CTA, Google İşletme Profili uyumu.",
          "Rakip bakışı: Samsun'da benzer 3-5 işletmenin içerik ritmi ve reklam izleri.",
        ],
      },
      {
        h2: "Ajans mı iç ekip mi?",
        paras: [
          "İç ekip yoksa Samsun'da sosyal medya yönetimi yapan firma ile başlamak daha hızlıdır. \"Instagram hesabımı büyütmek istiyorum\" diyen çoğu işletme operasyon yükünü dışarı verir.",
          "Müşteri bulmak için sosyal medya ajansı seçerken referans, rapor ve sözleşme netliği isteyin.",
        ],
      },
      {
        h2: "90 günlük örnek plan",
        paras: [
          "0-30 gün: keşif, kimlik, takvim, ilk çekim, temel reklam testi. 31-60 gün: ritmi oturtma, kreatif çeşitlendirme. 61-90 gün: ölçekleme, zayıf kanalı eleme, raporla karar.",
          "Bu plan sektör paketine (restoran, klinik, otel, emlak, inşaat) göre uyarlanır.",
        ],
      },
      {
        h2: "Yerel SEO ile destek",
        paras: [
          "Hizmet ve ilçe sayfaları, blog ve Google Haritalar; Ads maliyetini uzun vadede düşürür. SamsunSosyalMedya.com bu yapıyla kuruludur.",
          "Uzun kuyruk sorgular (Samsun'da Instagram hesabı yöneten ajans, Samsun Meta Ads uzmanı) dönüşüm getirir; içerikler buna göre yazılır.",
        ],
      },
    ],
    faqs: [
      {
        q: "Ne kadar sürede başlanır?",
        a: "Keşif sonrası kısa sürede strateji ve ilk içerik planı çıkarılır.",
      },
      {
        q: "Ücretsiz keşif var mı?",
        a: "Evet. Form veya WhatsApp üzerinden planlanır.",
      },
    ],
  },
];

async function main() {
  // Eski kısa/seed yazılarını kapatma: SEO setiyle örtüşmeyenleri unpublished bırakabiliriz
  const keep = new Set(posts.map((p) => p.slug));
  const existing = await prisma.blogPost.findMany({ select: { slug: true } });
  for (const e of existing) {
    if (!keep.has(e.slug)) {
      await prisma.blogPost.update({ where: { slug: e.slug }, data: { published: false } });
      console.log("unpublished", e.slug);
    }
  }

  for (const p of posts) {
    const bodyHtml = buildBody(p);
    const chars = plainLen(bodyHtml);
    if (chars < 4500) {
      console.warn("SHORT", p.slug, chars);
    }
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        title: p.title,
        lead: p.lead,
        bodyHtml,
        coverUrl: p.coverUrl,
        category: p.category,
        publishedAt: new Date(p.publishedAt),
        published: true,
        seoTitle: `${p.title} | Samsun Sosyal Medya`,
        seoDesc: p.lead.slice(0, 160),
        faqJson: p.faqs,
      },
      update: {
        title: p.title,
        lead: p.lead,
        bodyHtml,
        coverUrl: p.coverUrl,
        category: p.category,
        publishedAt: new Date(p.publishedAt),
        published: true,
        seoTitle: `${p.title} | Samsun Sosyal Medya`,
        seoDesc: p.lead.slice(0, 160),
        faqJson: p.faqs,
      },
    });
    console.log("ok", p.slug, "chars", chars);
  }
  console.log("SEO blogs seeded:", posts.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
