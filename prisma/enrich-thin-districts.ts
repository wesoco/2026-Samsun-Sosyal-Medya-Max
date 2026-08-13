/**
 * İnce ilçe sayfalarını zenginleştirir (opsiyonel).
 * Samsun seed-districts zaten dolu; bu script yalnızca eksik/kısa sayfalar için.
 *   npx tsx prisma/enrich-thin-districts.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** slug → ek HTML bloğu (seed-districts gövdesine append) */
const EXTRA: Record<string, string> = {
  terme: `<h2>Terme’de sezon ve yerel ritim</h2><p>Terme’de sosyal medya yönetimi; sahil ve tarım ekonomisinin ritmine göre içerik stoğu ve dönüşüm reklamını dengeler. Yazlık talep yükselmeden stok hazırlanır. <a href="/#iletisim">Teklif al</a></p>`,
  havza: `<h2>Havza’da termal ve yerel işletme</h2><p>Kaplıca ve yerel hizmet işletmeleri için güven dili + rezervasyon CTA’sı öne çıkar. Komşu ilçe spillover kontrollü test edilir. <a href="/sektorler">Sektörler</a> · <a href="/#iletisim">Teklif al</a></p>`,
  yakakent: `<h2>Yakakent’te yazlık tempo</h2><p>Batı sahilde düşük sezonda bilinirlik, yüksek sezonda hızlı yanıt ve rezervasyon Ads. Aynı ritim 12 ay dayatılmaz. <a href="/#iletisim">Teklif al</a></p>`,
};

async function main() {
  for (const [slug, html] of Object.entries(EXTRA)) {
    const row = await prisma.district.findUnique({ where: { slug } });
    if (!row) continue;
    if ((row.bodyHtml || "").length > 2500) continue;
    await prisma.district.update({
      where: { slug },
      data: { bodyHtml: `${row.bodyHtml}\n${html}` },
    });
    console.log("enriched", slug);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
