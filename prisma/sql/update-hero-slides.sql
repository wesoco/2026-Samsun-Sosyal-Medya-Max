-- Hero slaytları (prod / Coolify Postgres)
-- Ne yapar: sadece HomeContent.heroSlidesJson yazar. Site kodu DB'den okur.
-- Görseller repoda: /assets/hero/01.webp … 06.webp (deploy ile gelir).
--
-- Coolify:
--   1) Deploy / push bitsin (hero görselleri + kod)
--   2) Postgres terminalinde bu dosyayı çalıştır
--      veya: psql "$DATABASE_URL" -f prisma/sql/update-hero-slides.sql
--
-- Güvenli: BEGIN/COMMIT; diğer tablolara dokunmaz.

BEGIN;

INSERT INTO "HomeContent" ("id", "heroSlidesJson", "processJson", "updatedAt")
VALUES (
  'default',
  '[{"signal": "", "title": "Trabzon Sosyal Medya & Dijital Pazarlama", "lead": "Trabzon''da Instagram, Facebook, TikTok ve LinkedIn''de markanızı büyütmek için strateji ve içerik yönetimi.", "image": "/assets/hero/03.webp", "alt": "Trabzon sosyal medya ve dijital pazarlama", "tags": ["sosyal medya yönetimi", "dijital pazarlama", "Instagram", "Facebook", "TikTok", "LinkedIn", "içerik yönetimi", "community management", "dijital strateji", "marka büyütme"]}, {"signal": "", "title": "Trabzon Web Yazılım & Tasarım", "lead": "Trabzon işletmeleri için markaya özel web siteleri, modern altyapı ve mobil uyumlu tasarımla dijital varlığınızı güçlendiriyoruz.", "image": "/assets/hero/01.webp", "alt": "Trabzon web yazılım ve tasarım", "tags": ["web tasarım", "web yazılım", "web sitesi", "UI/UX", "SEO", "Next.js", "mobil uyumlu", "kurumsal web", "responsive tasarım", "dijital varlık"]}, {"signal": "", "title": "Trabzon Video Prodüksiyon & Reels", "lead": "Trabzon''da tanıtım filmleri, reels ve sosyal medya videolarıyla markanızı hareketle anlatıyoruz.", "image": "/assets/hero/02.webp", "alt": "Trabzon video prodüksiyon ve reels", "tags": ["video prodüksiyon", "reels", "tanıtım filmi", "drone çekim", "sosyal medya video", "reklam filmi", "kurumsal video", "Instagram reels", "TikTok video", "marka hikayesi"]}, {"signal": "", "title": "Trabzon E-Ticaret Web Sitesi", "lead": "Trabzon''daki işletmenizin online mağazası için profesyonel altyapı, ödeme sistemleri ve stok yönetimi çözümleri.", "image": "/assets/hero/04.webp", "alt": "Trabzon e-ticaret web sitesi", "tags": ["e-ticaret", "online mağaza", "ödeme entegrasyonu", "stok yönetimi", "kargo entegrasyonu", "e-ticaret sitesi", "internet mağaza", "e-ticaret yazılımı", "güvenli ödeme", "mobil mağaza"]}, {"signal": "", "title": "Trabzon Kurumsal Kimlik & Grafik Tasarım", "lead": "Trabzon markaları için logo, kurumsal kimlik, katalog ve baskılı ürünlerle tutarlı bir görünüm.", "image": "/assets/hero/05.webp", "alt": "Trabzon kurumsal kimlik ve grafik tasarım", "tags": ["kurumsal kimlik", "logo tasarımı", "marka kimliği", "grafik tasarım", "katalog", "baskılı ürünler", "kurumsal tasarım", "marka rehberi", "broşür", "kurumsal görünüm"]}, {"signal": "", "title": "Wcard & Qretna Dijital Çözümler", "lead": "QR menü, dijital kartvizit ve NFC teknolojisiyle işletmenizi geleceğe taşıyoruz.", "image": "/assets/hero/06.webp", "alt": "Wcard & Qretna Dijital Çözümler", "tags": ["wcard", "qretna", "QR menü", "dijital kartvizit", "NFC", "QR menü sistemi", "restoran menü", "dijital menü", "akıllı kartvizit", "temassız menü"]}]'::jsonb,
  '[{"num": "01", "title": "Keşif", "desc": "Markanızı, hedef kitlenizi ve rakiplerinizi dinliyoruz."}, {"num": "02", "title": "Strateji", "desc": "İçerik dili, takvim ve kanal planını birlikte netleştiriyoruz."}, {"num": "03", "title": "Üretim", "desc": "Çekim, kurgu, tasarım ve onaylı yayın."}, {"num": "04", "title": "Büyüme", "desc": "Reklam, optimizasyon ve aylık rapor."}]'::jsonb,
  NOW()
)
ON CONFLICT ("id") DO UPDATE
SET
  "heroSlidesJson" = EXCLUDED."heroSlidesJson",
  "updatedAt" = NOW();

COMMIT;

-- Kontrol (isteğe bağlı):
-- SELECT jsonb_array_length("heroSlidesJson") AS n,
--        "heroSlidesJson"->0->>'title' AS first_title
-- FROM "HomeContent" WHERE "id" = 'default';
