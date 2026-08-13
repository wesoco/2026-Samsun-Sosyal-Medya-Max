import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { DEFAULT_HERO_SLIDES } from "../src/lib/hero-slides";

const prisma = new PrismaClient();

const districts = [
  ["ilkadim", "İlkadım", "Merkez"],
  ["atakum", "Atakum", "Batı koridoru"],
  ["canik", "Canik", "Güney koridoru"],
  ["tekkekoy", "Tekkeköy", "Doğu koridoru"],
  ["bafra", "Bafra", "Batı koridoru"],
  ["carsamba", "Çarşamba", "Doğu koridoru"],
  ["vezirkopru", "Vezirköprü", "İç kesim"],
  ["terme", "Terme", "Doğu koridoru"],
  ["havza", "Havza", "İç kesim"],
  ["kavak", "Kavak", "İç kesim"],
  ["alacam", "Alaçam", "Batı koridoru"],
  ["19-mayis", "19 Mayıs", "Batı koridoru"],
  ["salipazari", "Salıpazarı", "İç kesim"],
  ["asarcik", "Asarcık", "İç kesim"],
  ["ladik", "Ladik", "İç kesim"],
  ["ayvacik", "Ayvacık", "Batı koridoru"],
  ["yakakent", "Yakakent", "Batı koridoru"],
] as const;

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin123!", 12);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@samsunsosyalmedya.com" },
    update: { passwordHash },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@samsunsosyalmedya.com",
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {
      siteName: "Samsun Sosyal Medya",
      addressLine1: "Gazipaşa Mah. Uzun Sk., Can Bakkal İş Merkezi",
      addressLine2: "Kat:7 Daire:61, Ortahisar / Trabzon",
      defaultTitle: "Samsun Sosyal Medya Ajansı | Instagram, TikTok ve Meta Ads",
      defaultDesc:
        "Samsun sosyal medya ajansı. 17 ilçede Instagram yönetimi, Meta Ads, Google Ads ve içerik üretimi. Wesoco güvencesiyle.",
      email: "info@wesoco.com",
      phone: "+905380581122",
      phoneDisplay: "+90 (538) 058 11 22",
      whatsapp: "905380581122",
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W",
    },
    create: {
      id: "default",
      siteName: "Samsun Sosyal Medya",
      addressLine1: "Gazipaşa Mah. Uzun Sk., Can Bakkal İş Merkezi",
      addressLine2: "Kat:7 Daire:61, Ortahisar / Trabzon",
      defaultTitle: "Samsun Sosyal Medya Ajansı | Instagram, TikTok ve Meta Ads",
      defaultDesc:
        "Samsun sosyal medya ajansı. 17 ilçede Instagram yönetimi, Meta Ads, Google Ads ve içerik üretimi. Wesoco güvencesiyle.",
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W",
    },
  });

  await prisma.homeStat.deleteMany();
  await prisma.homeStat.createMany({
    data: [
      { value: "17", label: "İlçede hizmet", sortOrder: 1 },
      { value: "87", label: "Aktif firma", sortOrder: 2 },
      { value: "%100", label: "Yerel odak", sortOrder: 3 },
      { value: "7/24", label: "İletişim", sortOrder: 4 },
    ],
  });

  const services = [
    {
      slug: "sosyal-medya-yonetimi",
      title: "Samsun Sosyal Medya Yönetimi",
      lead: "Instagram, Facebook, TikTok ve LinkedIn hesaplarınızı düzenli ve markanıza özel yönetiyoruz.",
      bodyHtml:
        "<h2>Kapsam</h2><p>İçerik takvimi, yayınlama, topluluk yönetimi ve aylık rapor. Samsun işletmeleri için ölçülebilir büyüme.</p><h2>Süreç</h2><p>Keşif, strateji, üretim, yayın ve optimizasyon. Wesoco güvencesiyle şeffaf ilerleriz.</p>",
      sortOrder: 1,
    },
    {
      slug: "icerik-uretimi-cekim",
      title: "Samsun İçerik ve Reels Üretimi",
      lead: "Post, story ve reels. Samsun'da çekim, kurgu ve yayın ile satışa odaklı içerik.",
      bodyHtml:
        "<h2>Üretim</h2><p>Yerinde çekim, reels kurgu ve marka diline uygun içerik stoğu.</p>",
      sortOrder: 2,
    },
    {
      slug: "meta-ads",
      title: "Samsun Meta Ads",
      lead: "Facebook ve Instagram reklamlarıyla doğru kitleye, doğru bütçeyle.",
      bodyHtml: "<h2>Performans</h2><p>Hedefleme, kreatif, retargeting ve şeffaf raporlama.</p>",
      sortOrder: 3,
    },
    {
      slug: "google-ads",
      title: "Samsun Google Ads",
      lead: "Arama niyetindeki müşteriye ulaşın. Search, Display ve YouTube.",
      bodyHtml: "<h2>Niyet</h2><p>Anahtar kelime, dönüşüm izleme ve şeffaf medya bütçesi.</p>",
      sortOrder: 4,
    },
    {
      slug: "dijital-pazarlama-ajansi",
      title: "Samsun Dijital Pazarlama Ajansı",
      lead: "İçerik, Meta/Google Ads ve ölçümü full funnel sistemde birleştiren dijital pazarlama.",
      bodyHtml: "<h2>Tasarım</h2><p>Tutarlı marka dili ve dönüşüm odaklı görseller.</p>",
      sortOrder: 5,
    },
    {
      slug: "drone-cekimi",
      title: "Samsun Drone Çekimi",
      lead: "Otel, inşaat, turizm için profesyonel havadan video ve fotoğraf.",
      bodyHtml: "<h2>Havadan içerik</h2><p>Planlama, çekim, kurgu ve sosyal medya formatları.</p>",
      sortOrder: 6,
    },
    {
      slug: "kurumsal-sosyal-medya-yonetimi",
      title: "Samsun Kurumsal Sosyal Medya Yönetimi",
      lead: "B2B ve kurumsal markalar için LinkedIn, Instagram ve itibar odaklı yönetim.",
      bodyHtml:
        "<h2>Kurumsal yönetim</h2><p>Onaylı süreç, LinkedIn düşünce liderliği, kriz protokolü ve aylık skor kartı.</p>",
      sortOrder: 10,
    },
  ];

  for (const s of services) {
    // Uzun SEO içerikleri seed-services-unique ile gelir; stub body ile ezme.
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { title: s.title, sortOrder: s.sortOrder },
      create: { ...s, published: true, seoTitle: `${s.title} | Samsun Sosyal Medya`, seoDesc: s.lead },
    });
  }

  for (let i = 0; i < districts.length; i++) {
    const [slug, name, regionLabel] = districts[i];
    const lead = `${name}'da Instagram, içerik üretimi ve Meta Ads ile işletmenizi büyütün. Samsun Sosyal Medya · Wesoco.`;
    const bodyHtml = `<h2>${name}'da sosyal medya yönetimi neden kritik?</h2><p>${name}, Samsun'un ${regionLabel.toLowerCase()} bölgesinde yerel işletmeler için yoğun bir rekabet alanı sunar. Cadde trafiği kadar Instagram görünürlüğü de müşteri kararını etkiler. Samsun Sosyal Medya olarak ${name} işletmelerine Wesoco güvencesiyle hizmet veriyoruz.</p><h2>İçerik ve reklam yaklaşımı</h2><p>${name}'da içerik planı sektöre göre kurulur. Reels ve story ile keşfet; Meta Ads ile yerel hedefleme birleşir. Aylık raporda erişim ve dönüşüm net görülür.</p><h2>Süreç</h2><p>Keşif, strateji, onaylı içerik, yayınlama ve optimizasyon. Şeffaf kapsam, net iletişim.</p>`;
    await prisma.district.upsert({
      where: { slug },
      update: { name, regionLabel, lead, bodyHtml, sortOrder: i + 1 },
      create: {
        slug,
        name,
        regionLabel,
        lead,
        bodyHtml,
        sortOrder: i + 1,
        published: true,
        seoTitle: `${name} Sosyal Medya Yönetimi | Samsun Sosyal Medya Ajansı`,
        seoDesc: lead,
        faqJson: [
          { q: `${name}'da sosyal medya yönetimi yapıyor musunuz?`, a: `Evet. ${name} ve tüm Samsun ilçelerinde hizmet veriyoruz.` },
          { q: "Yerinde çekim olur mu?", a: `Evet. ${name} ve çevresinde planlı çekim yapılabilir.` },
          { q: "Ücretsiz keşif var mı?", a: "Evet. WhatsApp veya form üzerinden." },
        ],
      },
    });
  }

  const posts = [
    {
      slug: "samsun-sosyal-medya-ajansi-nasil-secilir",
      title: "Samsun Samsun'da sosyal medya ajansı seçerken nelere dikkat etmeli?",
      category: "Ajans",
      lead: "Süreç, raporlama, içerik kalitesi ve Meta Ads şeffaflığı. En iyi ajans kriterleri.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Ajans seçimi</h2><p>Samsun'da sosyal medya ajansı seçerken referans, raporlama disiplini ve yerel dil kritiktir. Wesoco güvencesiyle çalışan Samsun Sosyal Medya, şeffaf süreç sunar.</p><h2>Nelere bakmalı?</h2><p>İçerik kalitesi, reklam şeffaflığı, sözleşme netliği ve iletişim hızı.</p>",
    },
    {
      slug: "samsun-sosyal-medya-yonetimi-rehberi",
      title: "Samsun sosyal medya yönetimi rehberi",
      category: "Yönetim",
      lead: "Paket, süreç ve fiyat mantığı. İşletmeler için pratik rehber.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Yönetim nedir?</h2><p>İçerik takvimi, yayınlama, etkileşim ve raporlama. Ölçülebilir büyüme için düzenli ritim şarttır.</p>",
    },
    {
      slug: "samsun-instagram-yonetimi",
      title: "Samsun Samsun'da Instagram hesabı yöneten ajans: ne sunmalı?",
      category: "Instagram",
      lead: "İçerik takvimi, reels, story, reklam ve raporlama.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Instagram yönetimi</h2><p>Doğru kitleye ulaşıp dönüşüm üreten yönetim; yalnızca takipçi sayısı değil.</p>",
    },
    {
      slug: "meta-ads-samsun-isletmeler",
      title: "Samsun işletmeleri için Meta Ads neden kritik?",
      category: "Meta Ads",
      lead: "Facebook ve Instagram reklamlarıyla doğru kitleye ulaşmak.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Meta Ads</h2><p>Konum hedefleme, retargeting ve şeffaf bütçe. Organik erişim tek başına yetmez.</p>",
    },
    {
      slug: "samsun-google-ads-yonetimi",
      title: "Samsun Google Ads yönetimi: arama reklamıyla müşteri bulmak",
      category: "Google Ads",
      lead: "Search, Display ve YouTube ile satın alma niyetindeki kitleye ulaşın.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Google Ads</h2><p>Niyet odaklı arama reklamları Samsun işletmeleri için güçlü bir kanaldır.</p>",
    },
    {
      slug: "samsun-drone-cekimi",
      title: "Samsun drone çekimi: otel, inşaat ve turizm için havadan içerik",
      category: "Drone",
      lead: "Profesyonel drone çekimi, kurgu ve sosyal medya uyumu.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Drone</h2><p>Havadan bakış markayı büyütür. Planlama, çekim ve kurgu tek çatıda.</p>",
    },
    {
      slug: "samsun-icerik-uretimi-cekim",
      title: "Samsun içerik üretimi ve profesyonel çekim",
      category: "İçerik",
      lead: "Reels, fotoğraf ve video ile aylık içerik stoğu.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>İçerik üretimi</h2><p>Yerinde çekim günü ile post, story ve reels stoğu oluşturun.</p>",
    },
    {
      slug: "reels-icerik-uretimi-neden-onemli",
      title: "Samsun Reels içerik üretimi neden büyümeyi hızlandırır?",
      category: "Reels",
      lead: "Keşfet trafiği, marka bilinirliği ve satış.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Reels</h2><p>Kısa video, takipçi olmayan kitleye ulaşmayı kolaylaştırır.</p>",
    },
    {
      slug: "samsun-dijital-pazarlama-ajansi",
      title: "Samsun dijital pazarlama ajansı nasıl seçilir?",
      category: "Dijital",
      lead: "Sosyal medya, reklam, içerik ve ölçüm. Yerel markalar için rehber.",
      coverUrl: "/assets/Samsun-sosyal-medya.webp",
      bodyHtml: "<h2>Dijital pazarlama</h2><p>Kanal kanal değil, sistem olarak kurun: mesaj, içerik, reklam, ölçüm.</p>",
    },
  ];

  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p,
        published: true,
        seoTitle: `${p.title} | Samsun Sosyal Medya`,
        seoDesc: p.lead,
      },
    });
  }

  await prisma.faqItem.deleteMany();
  await prisma.faqItem.createMany({
    data: [
      {
        question: "Samsun'da en iyi sosyal medya ajansı hangisi?",
        answer:
          "Samsun Sosyal Medya, Wesoco bünyesinde Samsun ve 17 ilçesinde Instagram, TikTok, Facebook ve LinkedIn yönetimi sunan yerel sosyal medya ajansıdır. İçerik üretimi ve Meta Ads reklamlarını tek çatı altında yönetir.",
        sortOrder: 1,
      },
      {
        question: "Samsun Sosyal Medya hangi ilçelerde hizmet verir?",
        answer:
          "İlkadım, Atakum, Canik, Tekkeköy, Bafra, Çarşamba, Vezirköprü, Terme, Havza, Kavak, Alaçam, 19 Mayıs, Salıpazarı, Asarcık, Ladik, Ayvacık ve Yakakent. Uzaktan yönetim veya yerinde çekim seçenekleri mevcuttur.",
        sortOrder: 2,
      },
      {
        question: "Samsun'da Instagram yönetimi nasıl yapılır?",
        answer:
          "Keşif görüşmesiyle başlanır. Hedef kitle ve rakip analizi sonrası içerik takvimi oluşturulur. Post, story ve reels üretilir; yayınlama, etkileşim ve gerekirse Meta Ads yönetilir. Aylık performans raporu paylaşılır.",
        sortOrder: 3,
      },
      {
        question: "Hangi sosyal medya platformlarında çalışıyorsunuz?",
        answer:
          "Instagram, Facebook, TikTok ve LinkedIn. Markanıza en uygun kanalları birlikte seçiyoruz; her platforma özel içerik üretiriz.",
        sortOrder: 4,
      },
      {
        question: "Meta Ads reklam bütçesi ajans ücretine dahil mi?",
        answer:
          "Hayır. Ajans ücretimiz ile Meta Ads medya bütçesi ayrıdır. Bütçeyi hedeflerinize göre birlikte planlarız; her kuruşun nereye gittiğini raporlarız.",
        sortOrder: 5,
      },
      {
        question: "Sosyal medya yönetiminde ne kadar sürede sonuç görülür?",
        answer:
          "Organik büyüme genelde 4 ile 8 hafta arasında hissedilir. Meta Ads kampanyalarında ilk haftadan itibaren veri ve optimizasyon başlar. Süre sektör ve rekabete göre değişir.",
        sortOrder: 6,
      },
      {
        question: "Ücretsiz keşif görüşmesi var mı?",
        answer:
          "Evet. Formu doldurun veya WhatsApp'tan yazın. Mevcut hesaplarınıza bakıp size özel bir yol haritası önerelim.",
        sortOrder: 7,
      },
      {
        question: "Sosyal medya yönetimi ücreti ne kadar?",
        answer:
          "Ücret; platform sayısı, içerik hacmi ve reklam yönetimine göre değişir. Keşif sonrası markanıza özel net bir teklif sunuyoruz. Şeffaf fiyatlandırma, sürpriz yok.",
        sortOrder: 8,
      },
      {
        question: "Reels içerik üretimi hizmete dahil mi?",
        answer:
          "Paket kapsamına göre değişir. Çoğu yönetim paketinde aylık reels kotası bulunur. Ek çekim ve kurgu ihtiyaçlarında ayrı üretim planı çıkarırız.",
        sortOrder: 9,
      },
      {
        question: "Samsun'da TikTok yönetimi yapıyor musunuz?",
        answer:
          "Evet. TikTok için kısa video stratejisi, içerik takvimi, yayınlama ve trend takibi sunuyoruz. Instagram Reels ile koordineli büyüme hedefleriz.",
        sortOrder: 10,
      },
      {
        question: "Küçük işletmeler için sosyal medya paketi var mı?",
        answer:
          "Evet. Restoran, kafe, klinik, mağaza ve yerel hizmet işletmeleri için ölçeklenebilir paketler sunuyoruz. İhtiyaca göre başlayıp büyüdükçe genişletebilirsiniz.",
        sortOrder: 11,
      },
      {
        question: "Sözleşme süresi ne kadar?",
        answer:
          "Standart sözleşme süremiz 12 aydır. İlk ay içinde cayma hakkınız vardır; bu dönemde strateji oturur ve devam kararı birlikte netleşir.",
        sortOrder: 12,
      },
      {
        question: "İçerik onayı nasıl işliyor?",
        answer:
          "Takvim ve taslaklar size sunulur. Onayınızdan sonra yayınlanır. Acil içeriklerde hızlı onay hattı kurarız; marka diliniz korunur.",
        sortOrder: 13,
      },
      {
        question: "Fotoğraf ve video çekimi yerinde mi yapılıyor?",
        answer:
          "Evet. Samsun genelinde yerinde çekim planlanabilir. Uzaktan yönetim isteyen markalar için stok + tasarım odaklı üretim de mümkündür.",
        sortOrder: 14,
      },
      {
        question: "Raporlama ne sıklıkla yapılıyor?",
        answer:
          "Aylık performans raporu standarttır: erişim, etkileşim, takipçi, reklam sonuçları ve sonraki ay önerileri. İsterseniz ara dönem özetleri de paylaşırız.",
        sortOrder: 15,
      },
      {
        question: "Rakip analizi hizmete dahil mi?",
        answer:
          "Keşif ve strateji aşamasında rakip ve sektör taraması yapılır. Konumlanma, içerik frekansı ve reklam yaklaşımı bu analize göre şekillenir.",
        sortOrder: 16,
      },
      {
        question: "LinkedIn yönetimi de yapıyor musunuz?",
        answer:
          "Evet. Özellikle B2B, inşaat, sanayi ve kurumsal markalar için LinkedIn içerik ve etkileşim yönetimi sunuyoruz.",
        sortOrder: 17,
      },
      {
        question: "Kriz anında destek veriyor musunuz?",
        answer:
          "Evet. Olumsuz yorum, yanlış anlaşılma veya acil iletişim durumlarında hızlı müdahale ve itibar yönetimi desteği sunuyoruz.",
        sortOrder: 18,
      },
    ],
  });

  await prisma.homeContent.upsert({
    where: { id: "default" },
    update: {
      aboutTitle: "Samsun'da sosyal medya denince akla ilk biz gelelim diye buradayız.",
      aboutLead:
        "Samsun Sosyal Medya, Wesoco bünyesinde yerel işletmelere Instagram, TikTok, Facebook ve LinkedIn yönetimi sunan sosyal medya ajansıdır.",
      aboutBody:
        "İçerik üretimi, reels, topluluk yönetimi ve Meta Ads'i tek çatı altında yönetiyoruz. Şehrin dilini bilen ekibimizle markaları görünür, tutarlı ve ölçülebilir büyütüyoruz.",
      ctaTitle: "Samsun sosyal medya teklifi alın.",
      ctaText:
        "Ücretsiz keşif görüşmesiyle başlayalım. Instagram, TikTok ve Meta Ads için doğru adres burası.",
      heroSlidesJson: DEFAULT_HERO_SLIDES,
      servicesLead:
        "Sosyal medya yönetiminden Meta ve Google Ads'e, içerik üretiminden drone çekimine kadar Samsun işletmeleri için uçtan uca büyüme.",
      refsTitle: "Samsun sosyal medya referanslarımız.",
      blogTitle: "Samsun işletmeleri için pratik yazılar.",
      faqTitle: "Samsun sosyal medya hakkında sıkça sorulanlar.",
    },
    create: {
      id: "default",
      aboutTitle: "Samsun'da sosyal medya denince akla ilk biz gelelim diye buradayız.",
      aboutLead:
        "Samsun Sosyal Medya, Wesoco bünyesinde yerel işletmelere Instagram, TikTok, Facebook ve LinkedIn yönetimi sunan sosyal medya ajansıdır.",
      aboutBody:
        "İçerik üretimi, reels, topluluk yönetimi ve Meta Ads'i tek çatı altında yönetiyoruz. Şehrin dilini bilen ekibimizle markaları görünür, tutarlı ve ölçülebilir büyütüyoruz.",
      ctaTitle: "Samsun sosyal medya teklifi alın.",
      ctaText:
        "Ücretsiz keşif görüşmesiyle başlayalım. Instagram, TikTok ve Meta Ads için doğru adres burası.",
      heroSlidesJson: DEFAULT_HERO_SLIDES,
      processJson: [
        { num: "01", title: "Keşif", desc: "Markanızı, hedef kitlenizi ve rakiplerinizi dinliyoruz." },
        { num: "02", title: "Strateji", desc: "İçerik dili, takvim ve kanal planını birlikte netleştiriyoruz." },
        { num: "03", title: "Üretim", desc: "Çekim, kurgu, tasarım ve onaylı yayın." },
        { num: "04", title: "Büyüme", desc: "Reklam, optimizasyon ve aylık rapor." },
      ],
    },
  });

  const logos = [
    ["MG", "/assets/logos/mg.webp"],
    ["Peugeot", "/assets/logos/peugeot.webp"],
    ["Citroën", "/assets/logos/citroen.webp"],
    ["Opel", "/assets/logos/opel.webp"],
    ["Suzuki", "/assets/logos/suzuki.webp"],
    ["Altunsoy", "/assets/logos/altunsoy.webp"],
    ["Lider Shipping", "/assets/logos/lider-shipping.webp"],
    ["Chakra", "/assets/logos/chakra.webp"],
    ["Turkcell", "/assets/logos/turkcell.webp"],
    ["Oltan", "/assets/logos/oltan.webp"],
    ["Arz Isı", "/assets/logos/arzisi.webp"],
    ["Mediwali", "/assets/logos/mediwali.webp"],
    ["Olba", "/assets/logos/olba.webp"],
    ["Full Tek", "/assets/logos/ft.webp"],
    ["Kültür Turizm", "/assets/logos/kultur-turizm.webp"],
    ["Zain", "/assets/logos/zain.webp"],
    ["Vcenter", "/assets/logos/vcenter.webp"],
  ] as const;

  await prisma.brandLogo.deleteMany();
  await prisma.brandLogo.createMany({
    data: logos.map(([name, imageUrl], i) => ({
      name,
      imageUrl,
      sortOrder: i + 1,
      published: true,
    })),
  });

  await prisma.referenceItem.deleteMany();
  const refsFile = join(process.cwd(), "scripts/data/wesoco-refs-prepared.json");
  if (existsSync(refsFile)) {
    const prepared = JSON.parse(readFileSync(refsFile, "utf8")) as Array<{
      title: string;
      lead: string;
      filter: string;
      imageUrl: string;
      videoUrl: string | null;
      sortOrder: number;
      published?: boolean;
    }>;
    const chunk = 40;
    for (let i = 0; i < prepared.length; i += chunk) {
      await prisma.referenceItem.createMany({
        data: prepared.slice(i, i + chunk).map((r, j) => ({
          title: r.title,
          lead: r.lead,
          filter: r.filter,
          imageUrl: r.imageUrl,
          videoUrl: r.videoUrl || null,
          sortOrder: r.sortOrder || i + j + 1,
          published: r.published !== false,
        })),
      });
    }
    console.log(`Seeded ${prepared.length} Wesoco references.`);
  } else {
    console.warn("wesoco-refs-prepared.json missing. run npm run db:seed-refs after scraping.");
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
