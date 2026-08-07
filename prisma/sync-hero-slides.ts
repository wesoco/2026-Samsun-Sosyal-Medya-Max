/**
 * Wesoco'dan alınan hero görsellerine göre HomeContent.heroSlidesJson günceller.
 * Çalıştır: npm run db:sync-hero
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLIDES = [
  {
    signal: "Sosyal Medya & Dijital Pazarlama",
    title: "Trabzon sosyal medya yönetimi ile markanızı büyütecek ajans.",
    lead: "Instagram, Facebook, TikTok ve LinkedIn'de strateji, içerik ve reklam yönetimi. Ortahisar'dan 18 ilçeye ölçülebilir büyüme.",
    image: "/assets/hero/01.webp",
    alt: "Trabzon sosyal medya ajansı ekip ve prodüksiyon",
    href: "/hizmetler/sosyal-medya-yonetimi",
    cta: "Sosyal medya yönetimi",
  },
  {
    signal: "Instagram Yönetimi",
    title: "Trabzon Instagram yönetimi: hesabı büyüten değil dönüşüm üreten ajans.",
    lead: "Grid, reels, story ve topluluk yönetimi tek sistemde. Yerel işletmeler için net CTA ve düzenli yayın ritmi.",
    image: "/assets/hero/02.webp",
    alt: "Trabzon Instagram yönetimi ve içerik üretimi",
    href: "/hizmetler/instagram-yonetimi",
    cta: "Instagram yönetimi",
  },
  {
    signal: "Meta Ads",
    title: "Trabzon Meta Ads ile Instagram ve Facebook'ta ölçülebilir sonuç.",
    lead: "Doğru kitle, kreatif test ve şeffaf raporlama. Bütçenizi boşa harcamadan mesaj ve satış odaklı reklam.",
    image: "/assets/hero/03.webp",
    alt: "Trabzon Meta Ads reklam yönetimi",
    href: "/hizmetler/meta-ads",
    cta: "Meta Ads hizmeti",
  },
  {
    signal: "Google Ads",
    title: "Trabzon Google Ads ile arayan müşteriye ulaşın.",
    lead: "Arama, Display ve YouTube reklamlarıyla niyetli müşteriye ulaşın. Anahtar kelime, dönüşüm izleme ve şeffaf medya satırı.",
    image: "/assets/hero/04.webp",
    alt: "Trabzon Google Ads yönetimi",
    href: "/hizmetler/google-ads",
    cta: "Google Ads hizmeti",
  },
  {
    signal: "İçerik & Çekim",
    title: "Trabzon içerik üretimi: reels, fotoğraf ve profesyonel çekim.",
    lead: "Yerinde çekim, kurgu ve sosyal formatlara kırılmış stok. Markanızın gerçek yüzünü ekrana taşıyoruz.",
    image: "/assets/hero/05.webp",
    alt: "Trabzon içerik üretimi ve profesyonel çekim",
    href: "/hizmetler/icerik-uretimi-cekim",
    cta: "İçerik üretimi",
  },
  {
    signal: "Drone Çekimi",
    title: "Trabzon drone çekimi ile markanızı havadan anlatın.",
    lead: "Otel, inşaat, turizm ve kurumsal projeler için profesyonel drone video ve fotoğraf. Sosyal medya ve tanıtım filmine hazır.",
    image: "/assets/hero/06.webp",
    alt: "Trabzon drone çekimi ve havadan görüntüleme",
    href: "/hizmetler/drone-cekimi",
    cta: "Drone çekimi",
  },
];

const DEFAULT_PROCESS = [
  { num: "01", title: "Keşif", desc: "Markanızı, hedef kitlenizi ve rakiplerinizi dinliyoruz." },
  { num: "02", title: "Strateji", desc: "İçerik dili, takvim ve kanal planını birlikte netleştiriyoruz." },
  { num: "03", title: "Üretim", desc: "Çekim, kurgu, tasarım ve onaylı yayın." },
  { num: "04", title: "Büyüme", desc: "Reklam, optimizasyon ve aylık rapor." },
];

async function main() {
  const existing = await prisma.homeContent.findUnique({ where: { id: "default" } });
  if (existing) {
    await prisma.homeContent.update({
      where: { id: "default" },
      data: { heroSlidesJson: SLIDES },
    });
  } else {
    await prisma.homeContent.create({
      data: {
        id: "default",
        heroSlidesJson: SLIDES,
        processJson: DEFAULT_PROCESS,
      },
    });
  }

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W",
    },
    update: {},
  });

  // GTM boşsa varsayılanı yaz
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (settings && !settings.gtmId) {
    await prisma.siteSetting.update({
      where: { id: "default" },
      data: { gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W" },
    });
  }

  console.log("Hero slides synced:", SLIDES.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
