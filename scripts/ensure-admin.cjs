/**
 * Konteyner açılışında tek panel girişi. Coolify ortam değişkenleri:
 * - ADMIN_EMAIL + ADMIN_PASSWORD: kullanıcıyı ADMIN olarak upsert eder (bcrypt).
 * - ADMIN_EXCLUSIVE=1: bu kullanıcı dışındaki tüm panel kullanıcılarını siler.
 * Değişkenler yoksa hiçbir şey yapmaz. Şifre ya da hash asla loglanmaz.
 *
 * User modelinin başka tablolarla ilişkisi yok (yazar/oluşturan alanı tutulmuyor) ve
 * oturumlar JWT; DB'de oturum tablosu yok. Silinen kullanıcıların açık oturumlarını
 * auth.ts'teki jwt callback'i kapatır (kullanıcı DB'de yoksa token geçersiz).
 */
/* eslint-disable @typescript-eslint/no-require-imports -- runner imajında derleme yok, düz CommonJS */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const DEFAULT_COST = 12;

/** Mevcut hash'in maliyeti ($2b$12$…) korunur; hiç kullanıcı yoksa 12 */
function costOf(hash) {
  const m = /^\$2[aby]\$(\d{2})\$/.exec(hash || "");
  return m ? Number(m[1]) : null;
}

async function main(prisma) {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || !password) {
    console.log("ensure-admin: atlandı (ADMIN_EMAIL / ADMIN_PASSWORD yok)");
    return;
  }

  const existing =
    (await prisma.user.findUnique({ where: { email }, select: { passwordHash: true } })) ||
    (await prisma.user.findFirst({ orderBy: { createdAt: "asc" }, select: { passwordHash: true } }));
  const cost = costOf(existing?.passwordHash) || DEFAULT_COST;
  const passwordHash = await bcrypt.hash(password, cost);

  const exclusive = process.env.ADMIN_EXCLUSIVE === "1";
  const ops = [
    prisma.user.upsert({
      where: { email },
      update: { passwordHash, role: "ADMIN" },
      create: { email, name: "Admin", passwordHash, role: "ADMIN" },
    }),
  ];
  if (exclusive) ops.push(prisma.user.deleteMany({ where: { email: { not: email } } }));
  const [, removed] = await prisma.$transaction(ops);

  console.log(`ensure-admin: ok → ${email}, silinen: ${removed ? removed.count : 0}`);
}

const prisma = new PrismaClient();
main(prisma)
  .catch((e) => {
    console.error("ensure-admin başarısız:", e instanceof Error ? e.message : "bilinmeyen hata");
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
