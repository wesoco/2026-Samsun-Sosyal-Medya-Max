/**
 * Plan bloglarını doğal Türkçe + GEO yapıyla doldurur.
 * Okuyucuya JSON / şablon dil yok. Özgün SEO yazılarını ezmez.
 * npm run db:seed-fill-blogs
 */
import { PrismaClient } from "@prisma/client";
import { BLOG_CONTENT_PLAN, type BlogPlanItem } from "./content-plan-blogs";

const prisma = new PrismaClient();

const BLOG_COVER = "/assets/Trabzon-sosyal-medya.webp";

const DISTRICTS = [
  "Ortahisar",
  "Akçaabat",
  "Yomra",
  "Of",
  "Araklı",
  "Sürmene",
  "Arsin",
  "Vakfıkebir",
  "Beşikdüzü",
  "Maçka",
];

const PROTECTED_PUBLISHED = new Set([
  "trabzon-sosyal-medya-ajansi",
  "trabzon-sosyal-medya-yonetimi",
  "trabzon-dijital-pazarlama-ajansi",
  "trabzon-reklam-ajansi",
  "trabzon-instagram-yonetimi",
  "trabzon-meta-reklam-ajansi",
  "trabzon-kurumsal-sosyal-medya-yonetimi",
  "trabzon-sosyal-medya-uzmani",
  "trabzon-icerik-uretimi",
  "trabzon-profesyonel-cekim-hizmetleri",
  "restoran-sosyal-medya-yonetimi-trabzon",
  "klinik-guzellik-sosyal-medya-trabzon",
  "trabzon-sosyal-medya-danismanligi",
  "trabzon-isletmeler-icin-sosyal-medya-yonetimi",
]);

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number) {
  return arr[seed % arr.length];
}

/** Başlıktan kısa, okunabilir konu adı (soru kalıplarını temizler) */
function topicLabel(title: string) {
  let t = title.replace(/\?$/u, "").trim();
  t = t.replace(/\s+Nasıl\s+\S+$/iu, "").trim();
  t = t.replace(/\s+Nedir$/iu, "").trim();
  t = t.replace(/\s+Neden\s+Önemlidir$/iu, "").trim();
  t = t.split(":")[0].trim();
  return t || title.replace(/\?$/u, "").trim();
}

function buildLead(item: BlogPlanItem) {
  const t = topicLabel(item.title);
  const leads = [
    `${t} konusunda Trabzon’daki işletmeler çoğu zaman aynı noktada takılır: neyin işe yaradığı belirsiz, içerik dağınık, reklam ise ölçülmüyor. Bu yazıda süreci sade ve uygulanabilir şekilde anlatıyoruz.`,
    `${t} için net bir çerçeve isteyenler buraya. Hedef kitle, içerik ritmi, reklam ve raporlamanın Trabzon’da nasıl bir araya geldiğini adım adım özetledik.`,
    `Trabzon’da ${t} arayan işletmeler için pratik bir rehber: ne yapılmalı, ne kadar sürer, fiyat neye göre değişir, kimler için mantıklıdır.`,
  ];
  return pick(leads, hash(item.slug));
}

function buildBody(item: BlogPlanItem) {
  const seed = hash(item.slug);
  const d1 = pick(DISTRICTS, seed);
  const d2 = pick(DISTRICTS, seed + 3);
  const d3 = pick(DISTRICTS, seed + 7);
  const topic = topicLabel(item.title);
  const cluster = item.cluster;

  return `
<h2>${topic} nedir?</h2>
<p>${topic}; Trabzon’daki bir işletmenin sosyal medya ve dijital pazarlama tarafını plansız bırakmak yerine ölçülebilir hale getirmesidir. Instagram, gerektiğinde TikTok veya LinkedIn, içerik üretimi ve reklam aynı masada konuşulur.</p>
<p>${d1}, ${d2} veya ${d3} fark etmeksizin temel mantık aynıdır: kime konuştuğunuzu bilin, ne sıklıkla üreteceğinizi netleştirin, sonucu ay sonunda okuyun. Wesoco bünyesindeki Trabzon Sosyal Medya ekibi de keşfe bu sorularla başlar.</p>

<h2>Neden önemli?</h2>
<p>Organik erişim eskisi kadar cömert değil. Düzenli içerik olmadan hesap “var ama konuşmuyor” gibi durur; reklamı da plansız açınca bütçe erir. ${cluster} tarafında doğru kurgu; marka bilinirliği, mesaj ve randevu gibi somut çıktılara bağlanır.</p>
<p>Yerel rekabet de gerçek: aynı mahallede benzer hizmet veren birkaç işletme birden Instagram’da görünmeye çalışır. Diliniz ve görselleriniz ${d1} müşterisine hitap etmiyorsa reklam bile zorlar.</p>

<h2>Nasıl yapılır?</h2>
<ol>
<li>Mevcut hesabı ve rakipleri birlikte inceleriz.</li>
<li>Hedef kitle, mesaj ve yayın takvimini yazarız.</li>
<li>Fotoğraf, reels veya gerektiğinde drone ile içerik üretiriz.</li>
<li>Onayınızdan sonra yayınlar; ihtiyaç varsa Meta Ads veya Google Ads ile destekleriz.</li>
<li>Ay sonunda sade bir raporla neyin çalıştığını konuşuruz.</li>
</ol>
<p>Onay hattı net olur. “Paylaşıldı mı?” belirsizliği olmaz. Acil kampanya gerektiğinde hızlı bir onay yolu da tanımlanır.</p>

<h2>Kimler için uygun?</h2>
<p>Restoran, kafe, klinik, otel, emlak, inşaat, güzellik ve perakende işletmeleri için özellikle işe yarar. Küçük ekiplerde içerik yükünü almak, kurumsal yapılarda ise onaylı ve tutarlı bir dil kurmak hedef olur.</p>
<ul>
<li>Düzenli içerik üretemeyenler</li>
<li>Reklama para verip sonuç göremeyenler</li>
<li>Marka dilini toparlamak isteyenler</li>
<li>Mesaj, arama veya randevu sayısını artırmak isteyenler</li>
</ul>

<h2>Ne kazandırır?</h2>
<ul>
<li>Trabzon ve ilçe dinamiklerine uygun dil</li>
<li>İçerik + reklamın aynı planda yürümesi</li>
<li>Şeffaf sözleşme ve ayrı medya bütçesi raporu</li>
<li>İlgili <a href="/hizmetler">hizmet</a> ve <a href="/bolgeler">ilçe</a> sayfalarına doğal geçiş</li>
<li>WhatsApp veya form ile hızlı dönüş</li>
</ul>

<h2>Fiyat neye göre değişir?</h2>
<p>Platform sayısı, ayda kaç içerik üretileceği, yerinde çekim olup olmayacağı ve reklam yönetiminin kapsama girip girmediği fiyatı değiştirir. Reklam medya harcaması ajans ücretinden ayrıdır; faturada karışmaz.</p>
<p>Burada sabit bir “herkese aynı paket” rakamı yazmıyoruz. Ücretsiz keşifte hesabınıza bakıp size özel teklif çıkarıyoruz.</p>

<h2>Süreç nasıl işler?</h2>
<p>İlk hafta hesap ve rakip özeti, ilk ay dil ve içerik seti, sonraki aylarda kazanan formatların çoğaltılması. ${d2} turizm işletmesiyle ${d3} klinik aynı takvimi kullanmaz; aynı disiplinle ilerler.</p>
<p>Raporda erişim, etkileşim, mesaj/arama ve maliyet gibi karar vermenizi sağlayan rakamlar yer alır. Gereksiz tablo kalabalığı yok.</p>

<div class="seo-table-wrap">
<table class="seo-comparison-table">
<caption>Plansız paylaşım ile planlı çalışma</caption>
<thead>
<tr><th></th><th>Plansız</th><th>Planlı</th></tr>
</thead>
<tbody>
<tr><td>Hedef</td><td>Belirsiz</td><td>Yazılı ve net</td></tr>
<tr><td>İçerik</td><td>Günübirlik</td><td>Takvimli ve onaylı</td></tr>
<tr><td>Reklam</td><td>Ara sıra</td><td>Test edip ölçekleme</td></tr>
<tr><td>Rapor</td><td>Yok veya geç</td><td>Aylık, aksiyonlu</td></tr>
</tbody>
</table>
</div>

<h2>Kısa örnekler</h2>
<p>${d1}’da hizmet veren bir işletme, düzenli reels ve konum odaklı reklamla mesaj sayısını artırabilir. ${d2}’daki bir konaklama işletmesi sezon öncesi çekim stoğu yapıp sezon içinde reklamı açarak doluluğu destekleyebilir. Her iki durumda da ölçüm olmadan büyütmek risklidir.</p>

<h2>Pratik notlar</h2>
<p>${pick(
    [
      `Reels’te ilk saniyeler kritiktir; altyazı ve net bir çağrı (ara, yaz, randevu al) dönüşümü kolaylaştırır.`,
      `Reklama başlamadan önce mesaj veya form takibini kurmak gerekir; aksi halde “kaç kişi aradı?” sorusu yanıtsız kalır.`,
      `Google’da niyetli arama, Instagram’da keşif ve hatırlatma daha güçlüdür. İkisini iş modelinize göre dengeleriz.`,
      `Yorum ve mesajlara hızlı dönüş, yerel güveni artırır. ${d3} gibi ilçelerde samimi dil abartısız olmalıdır.`,
    ],
    seed,
  )}</p>
<p>${pick(
    [
      `Sezon (yaz, eğitim, bayram) içerik stoğunu öne çeker. Son güne bırakılan iş hem kaliteyi hem hızı düşürür.`,
      `Ajans ücreti, çekim ve reklam bütçesini ayrı satırlarda görmek şeffaflık sağlar.`,
      `Kriz veya şikâyet anında ne söyleneceği önceden yazılıysa panik azalır.`,
    ],
    seed + 1,
  )}</p>

<h2>Sonuç</h2>
<p>${topic} için doğru yol; acele reklam değil, net plan + ölçüm + sabırlı iyileştirmedir. Trabzon Sosyal Medya ile ücretsiz keşif alın, mevcut hesabınıza birlikte bakalım.</p>
<p><a href="/#iletisim">Teklif formu</a> · <a href="/hizmetler">Hizmetler</a> · <a href="/bolgeler">İlçeler</a> · <a href="/blog">Blog</a></p>
`.trim();
}

function buildFaqs(item: BlogPlanItem) {
  const topic = topicLabel(item.title);
  return [
    {
      q: `${topic} ne işe yarar?`,
      a: `${topic}; görünürlük, düzenli içerik ve gerektiğinde reklamla müşteriye ulaşmayı planlı hale getirir. Wesoco / Trabzon Sosyal Medya keşifle başlar.`,
    },
    {
      q: "Ne kadar sürede sonuç görülür?",
      a: "İlk plan genelde 1. 2 haftada netleşir. Anlamlı öğrenme çoğu işletmede 30. 90 gün içinde konuşulur; sektör ve bütçeye göre değişir.",
    },
    {
      q: "Fiyat sabit mi?",
      a: "Hayır. İçerik hacmi, çekim ve reklam yönetimine göre tekliflenir. Reklam medya bütçesi ayrıdır.",
    },
    {
      q: "Hangi ilçelerde çalışıyorsunuz?",
      a: "Trabzon’un 18 ilçesinde: Ortahisar, Akçaabat, Yomra, Of ve diğerlerinde uzaktan yönetim veya yerinde çekimle.",
    },
    {
      q: "Nasıl başlarız?",
      a: "Ücretsiz keşif formu veya WhatsApp yeterli. Genelde 24 saat içinde dönüş yapıyoruz.",
    },
  ];
}

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
    seoTitle: `${item.title} | Trabzon Sosyal Medya`,
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
