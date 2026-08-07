-- Coolify Postgres Terminal:
--   psql -U postgres -d postgres
-- Sonra bu dosyanın tamamını yapıştır (uzun satırı kesme!).
-- Bitince Coolify'da uygulamayı Restart et (ISR cache temizlensin).

BEGIN;

UPDATE "HomeContent"
SET
  "heroSlidesJson" = $HEROJSON$
[
  {
    "signal": "",
    "title": "Trabzon Sosyal Medya & Dijital Pazarlama",
    "lead": "Trabzon'da Instagram, Facebook, TikTok ve LinkedIn'de markanızı büyütmek için strateji ve içerik yönetimi.",
    "image": "/assets/hero/03.webp",
    "alt": "Trabzon sosyal medya ve dijital pazarlama",
    "tags": [
      "sosyal medya yönetimi",
      "dijital pazarlama",
      "Instagram",
      "Facebook",
      "TikTok",
      "LinkedIn",
      "içerik yönetimi",
      "community management",
      "dijital strateji",
      "marka büyütme"
    ]
  },
  {
    "signal": "",
    "title": "Trabzon Web Yazılım & Tasarım",
    "lead": "Trabzon işletmeleri için markaya özel web siteleri, modern altyapı ve mobil uyumlu tasarımla dijital varlığınızı güçlendiriyoruz.",
    "image": "/assets/hero/01.webp",
    "alt": "Trabzon web yazılım ve tasarım",
    "tags": [
      "web tasarım",
      "web yazılım",
      "web sitesi",
      "UI/UX",
      "SEO",
      "Next.js",
      "mobil uyumlu",
      "kurumsal web",
      "responsive tasarım",
      "dijital varlık"
    ]
  },
  {
    "signal": "",
    "title": "Trabzon Video Prodüksiyon & Reels",
    "lead": "Trabzon'da tanıtım filmleri, reels ve sosyal medya videolarıyla markanızı hareketle anlatıyoruz.",
    "image": "/assets/hero/02.webp",
    "alt": "Trabzon video prodüksiyon ve reels",
    "tags": [
      "video prodüksiyon",
      "reels",
      "tanıtım filmi",
      "drone çekim",
      "sosyal medya video",
      "reklam filmi",
      "kurumsal video",
      "Instagram reels",
      "TikTok video",
      "marka hikayesi"
    ]
  },
  {
    "signal": "",
    "title": "Trabzon E-Ticaret Web Sitesi",
    "lead": "Trabzon'daki işletmenizin online mağazası için profesyonel altyapı, ödeme sistemleri ve stok yönetimi çözümleri.",
    "image": "/assets/hero/04.webp",
    "alt": "Trabzon e-ticaret web sitesi",
    "tags": [
      "e-ticaret",
      "online mağaza",
      "ödeme entegrasyonu",
      "stok yönetimi",
      "kargo entegrasyonu",
      "e-ticaret sitesi",
      "internet mağaza",
      "e-ticaret yazılımı",
      "güvenli ödeme",
      "mobil mağaza"
    ]
  },
  {
    "signal": "",
    "title": "Trabzon Kurumsal Kimlik & Grafik Tasarım",
    "lead": "Trabzon markaları için logo, kurumsal kimlik, katalog ve baskılı ürünlerle tutarlı bir görünüm.",
    "image": "/assets/hero/05.webp",
    "alt": "Trabzon kurumsal kimlik ve grafik tasarım",
    "tags": [
      "kurumsal kimlik",
      "logo tasarımı",
      "marka kimliği",
      "grafik tasarım",
      "katalog",
      "baskılı ürünler",
      "kurumsal tasarım",
      "marka rehberi",
      "broşür",
      "kurumsal görünüm"
    ]
  },
  {
    "signal": "",
    "title": "Wcard & Qretna Dijital Çözümler",
    "lead": "QR menü, dijital kartvizit ve NFC teknolojisiyle işletmenizi geleceğe taşıyoruz.",
    "image": "/assets/hero/06.webp",
    "alt": "Wcard & Qretna Dijital Çözümler",
    "tags": [
      "wcard",
      "qretna",
      "QR menü",
      "dijital kartvizit",
      "NFC",
      "QR menü sistemi",
      "restoran menü",
      "dijital menü",
      "akıllı kartvizit",
      "temassız menü"
    ]
  }
]
$HEROJSON$::jsonb,
  "updatedAt" = NOW()
WHERE "id" = 'default';

COMMIT;

-- Kontrol: image dolu mu?
SELECT
  ordinality AS n,
  slide->>'title' AS title,
  slide->>'image' AS image
FROM "HomeContent",
     jsonb_array_elements("heroSlidesJson") WITH ORDINALITY AS t(slide, ordinality)
WHERE "id" = 'default'
ORDER BY ordinality;
