/**
 * Eski Wesoco staging sitesinden blog yazılarını Prisma'ya aktarır.
 *
 * Kaynak: GET {SOURCE}/api/blog  (299 yazı: title, excerpt, content, category…)
 * Kapak: yeni sitede sabit marka görseli (eski sitede de çoğu aynı banner’dı).
 *
 * Çalıştır:
 *   npm run db:import-old-blogs
 *
 * Ortam:
 *   OLD_BLOG_SOURCE  (varsayılan: aşağıdaki staging URL)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_SOURCE = "https://v0so0o884wo4ksckkow4ssc0.wesoco.com";
const SOURCE = (process.env.OLD_BLOG_SOURCE || DEFAULT_SOURCE).replace(/\/$/, "");
/** Tüm yazılar için marka kapak — çeşitlilik istenirse sonradan admin’den değiştirilir */
const BRAND_COVER = "/assets/Samsun-sosyal-medya.webp";

type LegacyPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  imageUrl: string | null;
  isPublished?: boolean;
  publishedAt?: string | null;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Düz metin içeriği → güvenli paragraph HTML */
function contentToHtml(title: string, content: string) {
  let text = content.replace(/\r\n/g, "\n").trim();
  // İçerik genelde başlıkla başlıyor — tekrarlamayı kırp
  const titleNorm = title.trim().toLowerCase();
  const firstLine = text.split("\n")[0]?.trim().toLowerCase() || "";
  if (
    firstLine &&
    (firstLine === titleNorm ||
      firstLine.replace(/[?.!]+$/, "") === titleNorm.replace(/[?.!]+$/, ""))
  ) {
    text = text.slice(text.indexOf("\n") + 1).trim();
  }

  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (!blocks.length) return "<p></p>";

  return blocks
    .map((block) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      // Madde listesi (• / - / 1.)
      if (lines.length > 1 && lines.every((l) => /^([•\-*]|\d+[.)])\s+/.test(l))) {
        const items = lines
          .map((l) => l.replace(/^([•\-*]|\d+[.)])\s+/, ""))
          .map((l) => `<li>${escapeHtml(l)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      // Kısa tek satır + nokta yok → alt başlık
      if (
        lines.length === 1 &&
        lines[0].length <= 80 &&
        !/[.!?…]$/.test(lines[0]) &&
        !lines[0].includes(":")
      ) {
        return `<h2>${escapeHtml(lines[0])}</h2>`;
      }
      const inner = lines.map(escapeHtml).join("<br />");
      return `<p>${inner}</p>`;
    })
    .join("\n");
}

async function main() {
  console.log("Kaynak:", SOURCE);
  const res = await fetch(`${SOURCE}/api/blog`, {
    headers: {
      "User-Agent": "SamsunSosyalMedya-Importer/1.0",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${SOURCE}/api/blog`);
  const posts = (await res.json()) as LegacyPost[];
  if (!Array.isArray(posts)) throw new Error("Beklenen dizi değil");

  console.log("Toplam yazı:", posts.length);

  let created = 0;
  let updated = 0;

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const slug = (p.slug || "").trim();
    if (!slug) {
      console.warn("slug yok, atlandı", p.id);
      continue;
    }

    const title = (p.title || slug).trim();
    const lead = (p.excerpt || "").trim() || title;
    const bodyHtml = contentToHtml(title, p.content || "");
    const category = (p.category || "Sosyal Medya").trim() || "Sosyal Medya";
    const publishedAt = p.publishedAt ? new Date(p.publishedAt) : new Date();
    const published = p.isPublished !== false;
    const coverUrl = BRAND_COVER;

    const seoTitle = `${title} | Samsun Sosyal Medya`;
    const seoDesc = lead.slice(0, 160);

    const existing = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });

    await prisma.blogPost.upsert({
      where: { slug },
      create: {
        slug,
        title,
        lead,
        bodyHtml,
        coverUrl,
        category,
        publishedAt,
        published,
        seoTitle,
        seoDesc,
        faqJson: [],
      },
      update: {
        title,
        lead,
        bodyHtml,
        coverUrl,
        category,
        publishedAt,
        published,
        seoTitle,
        seoDesc,
      },
    });

    if (existing) updated += 1;
    else created += 1;

    if ((i + 1) % 25 === 0 || i === posts.length - 1) {
      console.log(`… ${i + 1}/${posts.length} (yeni ${created}, güncellenen ${updated})`);
    }
  }

  const total = await prisma.blogPost.count();
  console.log("Bitti.", { created, updated, cover: BRAND_COVER, dbTotal: total });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
