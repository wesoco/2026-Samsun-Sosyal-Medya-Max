/**
 * Blog topical authority planından unpublished taslak oluşturur.
 * Mevcut published yazıları ezmez; aynı slug varsa yalnızca boş lead/body ise günceller.
 * Çalıştır: npm run db:seed-blog-plan
 */
import { PrismaClient } from "@prisma/client";
import { BLOG_CONTENT_PLAN } from "./content-plan-blogs";

const prisma = new PrismaClient();

const PLACEHOLDER = `<h2>Taslak</h2>
<p>Bu yazı topical authority planındandır. Yayınlanmadan önce 2000-3500 kelime özgün içerik, SSS, tablo ve iç linklerle doldurulmalıdır. Sahte istatistik veya uydurma yorum eklenmez.</p>
<ul>
<li>Nedir / Neden / Nasıl / Kimler / Fiyat mantığı</li>
<li>Samsun ve ilgili ilçe entity'leri</li>
<li>Hizmet + bölge iç linkleri</li>
</ul>`;

async function main() {
  let created = 0;
  let skipped = 0;
  let updated = 0;

  for (const item of BLOG_CONTENT_PLAN) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: item.slug } });
    if (existing) {
      if (existing.published) {
        skipped++;
        continue;
      }
      if (existing.bodyHtml.includes("Bu yazı topical authority")) {
        await prisma.blogPost.update({
          where: { slug: item.slug },
          data: {
            title: item.title,
            lead: item.lead,
            category: item.category,
            seoTitle: `${item.title} | Samsun Sosyal Medya`,
            seoDesc: item.lead.slice(0, 155),
          },
        });
        updated++;
      } else {
        skipped++;
      }
      continue;
    }

    await prisma.blogPost.create({
      data: {
        slug: item.slug,
        title: item.title,
        lead: item.lead,
        bodyHtml: PLACEHOLDER,
        category: item.category,
        published: false,
        seoTitle: `${item.title} | Samsun Sosyal Medya`,
        seoDesc: item.lead.slice(0, 155),
        faqJson: [
          {
            q: `${item.title.replace(/\?$/, "")} nedir?`,
            a: "Bu SSS taslak aşamasındadır. Yayın öncesi özgün cevap yazılmalıdır.",
          },
        ],
      },
    });
    created++;
  }

  console.log(
    JSON.stringify(
      {
        plan: BLOG_CONTENT_PLAN.length,
        created,
        updated,
        skippedPublishedOrCustom: skipped,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
