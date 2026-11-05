/**
 * Konteyner açılışında (docker-entrypoint.sh): kardeş sitelerle birebir aynı olan kalıp blog
 * yazılarını yayından kaldırır. Adresler next.config.ts'te ilgili hizmet / ilçe sayfasına 301.
 * Liste: scripts/retired-blog-posts.json. İdempotent; yalnızca hâlâ yayında olanlara dokunur.
 * Geri almak: yazıyı listeden çıkarıp admin panelinden yeniden yayınla.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- standalone konteynerde düz node ile çalışan CommonJS betik */
const { PrismaClient } = require("@prisma/client");
const retired = require("./retired-blog-posts.json");

async function main() {
  const slugs = Object.keys(retired);
  if (!slugs.length) return;
  const prisma = new PrismaClient();
  try {
    const res = await prisma.blogPost.updateMany({
      where: { slug: { in: slugs }, published: true },
      data: { published: false },
    });
    console.log(`retire-blog-posts: ${res.count} kopya yazı yayından kaldırıldı (liste: ${slugs.length})`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  // Açılışı engellemesin: yönlendirmeler next.config.ts'te zaten çalışır
  console.error("retire-blog-posts: atlandı", err?.message || err);
});
