/**
 * Wesoco.com referanslarını (post / reels / tanıtım) DB'ye aktarır.
 * Kaynak: scripts/data/wesoco-refs-prepared.json
 *
 *   npx tsx prisma/seed-wesoco-refs.ts
 */
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Prepared = {
  title: string;
  lead: string;
  filter: string;
  imageUrl: string;
  videoUrl: string | null;
  sortOrder: number;
  published: boolean;
};

function polishTitle(title: string, fullTitle: string, filter: string): string {
  let t = title.trim();
  // Çok kesilmiş / yarım kalan başlıkları fullTitle'dan toparla
  if (t.endsWith("…") || t.endsWith(" ve") || t.length < 4) {
    t = fullTitle
      .replace(/^Trabzon\s+/i, "")
      .replace(/^Tanıtım Filmi:\s*/i, "")
      .replace(/^Sosyal Medya İçerik(?: Yönetimi|i):\s*/i, "")
      .replace(/^Sosyal Medya İçeriği:\s*/i, "");
    const cut = t.split(/\s+[. |]\s+|:\s+/)[0]?.trim() || t;
    t = cut.length <= 60 ? cut : cut.slice(0, 57).replace(/\s+\S*$/, "") + "…";
  }
  if (filter === "reels" && !/reels/i.test(t) && t.length < 40) {
    // kısa kalsın; etiket zaten Reels
  }
  return t;
}

async function main() {
  const file = join(process.cwd(), "scripts/data/wesoco-refs-prepared.json");
  const raw = JSON.parse(readFileSync(file, "utf8")) as Array<
    Prepared & { fullTitle?: string; sourceUrl?: string }
  >;

  const data = raw.map((r, i) => ({
    title: polishTitle(r.title, r.fullTitle || r.title, r.filter),
    lead: r.lead || r.fullTitle || "",
    filter: r.filter,
    imageUrl: r.imageUrl,
    videoUrl: r.videoUrl || null,
    sortOrder: i + 1,
    published: true,
  }));

  await prisma.referenceItem.deleteMany();
  // createMany in chunks
  const chunk = 40;
  for (let i = 0; i < data.length; i += chunk) {
    await prisma.referenceItem.createMany({ data: data.slice(i, i + chunk) });
  }

  const counts = await prisma.referenceItem.groupBy({
    by: ["filter"],
    _count: true,
  });
  console.log(`Seeded ${data.length} references:`, counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
