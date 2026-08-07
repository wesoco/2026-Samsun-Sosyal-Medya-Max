/**
 * Wesoco.com birebir hero slaytlarını HomeContent.heroSlidesJson'a yazar.
 * Çalıştır: npm run db:sync-hero
 */
import { PrismaClient } from "@prisma/client";
import { DEFAULT_HERO_SLIDES } from "../src/lib/hero-slides";

const prisma = new PrismaClient();

const SLIDES = DEFAULT_HERO_SLIDES;

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

  console.log(
    "Hero slides synced (Wesoco 1:1):",
    SLIDES.map((s) => `${s.image} → ${s.title}`).join("\n  "),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
