/**
 * Topical authority planı - 150+ blog başlığı.
 * npm run db:seed-blog-plan → published:false taslak upsert
 */
export type BlogPlanItem = {
  slug: string;
  title: string;
  category: string;
  cluster: string;
  lead: string;
};

export const BLOG_CONTENT_PLAN: BlogPlanItem[] = [
  {
    "slug": "trabzon-instagram-reklami-nasil-verilir",
    "title": "Trabzon'da Instagram Reklamı Nasıl Verilir?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Trabzon'da Instagram Reklamı Nasıl Verilir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-sosyal-medya-ajansi-secimi",
    "title": "Trabzon'da Sosyal Medya Ajansı Seçerken Nelere Dikkat Edilmeli?",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Trabzon'da Sosyal Medya Ajansı Seçerken Nelere Dikkat Edilmeli?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "reels-izlenmesi-nasil-artirilir",
    "title": "Reels İzlenmesi Nasıl Artırılır?",
    "category": "Reels",
    "cluster": "Reels",
    "lead": "Reels İzlenmesi Nasıl Artırılır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "meta-reklamlari-nedir",
    "title": "Meta Reklamları Nedir?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Meta Reklamları Nedir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "google-ads-mi-meta-ads-mi",
    "title": "Google Reklamları mı Meta Reklamları mı?",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Google Reklamları mı Meta Reklamları mı?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "kurumsal-kimlik-neden-onemli",
    "title": "Kurumsal Kimlik Neden Önemlidir?",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Kurumsal Kimlik Neden Önemlidir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "kucuk-isletmeler-icin-sosyal-medya",
    "title": "Küçük İşletmeler İçin Sosyal Medya",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Küçük İşletmeler İçin Sosyal Medya. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-dijital-pazarlama",
    "title": "Trabzon'da Dijital Pazarlama",
    "category": "Dijital Pazarlama",
    "cluster": "Dijital Pazarlama",
    "lead": "Trabzon'da Dijital Pazarlama. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "facebook-reklam-butcesi",
    "title": "Facebook Reklam Bütçesi Nasıl Planlanır?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Facebook Reklam Bütçesi Nasıl Planlanır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "instagram-hikaye-stratejisi",
    "title": "Instagram Hikâye Stratejisi",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "Instagram Hikâye Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "tiktok-trabzon-isletmeler",
    "title": "Trabzon İşletmeleri İçin TikTok",
    "category": "TikTok",
    "cluster": "TikTok",
    "lead": "Trabzon İşletmeleri İçin TikTok. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "linkedin-b2b-trabzon",
    "title": "Trabzon'da LinkedIn ile B2B Büyüme",
    "category": "LinkedIn",
    "cluster": "LinkedIn",
    "lead": "Trabzon'da LinkedIn ile B2B Büyüme. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "google-benim-isletmem-optimizasyonu",
    "title": "Google Benim İşletmem Optimizasyonu",
    "category": "Yerel SEO",
    "cluster": "Yerel SEO",
    "lead": "Google Benim İşletmem Optimizasyonu. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "sosyal-medya-raporlama",
    "title": "Sosyal Medya Raporlama Nasıl Olmalı?",
    "category": "Ölçüm",
    "cluster": "Ölçüm",
    "lead": "Sosyal Medya Raporlama Nasıl Olmalı?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "icerik-takvimi-nasil-yapilir",
    "title": "İçerik Takvimi Nasıl Yapılır?",
    "category": "İçerik",
    "cluster": "İçerik",
    "lead": "İçerik Takvimi Nasıl Yapılır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "drone-cekimi-sosyal-medya",
    "title": "Drone Çekimi Sosyal Medyada Nasıl Kullanılır?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Drone Çekimi Sosyal Medyada Nasıl Kullanılır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "profesyonel-fotograf-marka",
    "title": "Profesyonel Fotoğraf Markayı Nasıl Güçlendirir?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Profesyonel Fotoğraf Markayı Nasıl Güçlendirir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "video-prodüksiyon-maliyeti",
    "title": "Video Prodüksiyon Maliyeti Neye Göre Değişir?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Video Prodüksiyon Maliyeti Neye Göre Değişir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "remarketing-nedir",
    "title": "Remarketing Nedir, Nasıl Çalışır?",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Remarketing Nedir, Nasıl Çalışır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "lead-generation-sosyal-medya",
    "title": "Sosyal Medyada Lead Generation",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Sosyal Medyada Lead Generation. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "donusum-orani-artirma",
    "title": "Dönüşüm Oranı Nasıl Artırılır?",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Dönüşüm Oranı Nasıl Artırılır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "marka-bilinirligi-yerel",
    "title": "Yerel Marka Bilinirliği Nasıl Artar?",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Yerel Marka Bilinirliği Nasıl Artar?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "wesoco-sosyal-medya-sureci",
    "title": "Wesoco Sosyal Medya Yönetim Süreci",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Wesoco Sosyal Medya Yönetim Süreci. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "ucretsiz-kesif-gorusmesi",
    "title": "Ücretsiz Keşif Görüşmesinde Neler Konuşulur?",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Ücretsiz Keşif Görüşmesinde Neler Konuşulur?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "sosyal-medya-paket-fiyatlari",
    "title": "Sosyal Medya Paket Fiyatları Neye Göre Değişir?",
    "category": "Fiyat",
    "cluster": "Fiyat",
    "lead": "Sosyal Medya Paket Fiyatları Neye Göre Değişir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "instagram-bio-optimizasyonu",
    "title": "Instagram Bio Optimizasyonu",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "Instagram Bio Optimizasyonu. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "hashtag-stratejisi-2026",
    "title": "2026 Hashtag Stratejisi",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "2026 Hashtag Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "ugc-icerik-uretimi",
    "title": "UGC İçerik Üretimi Nedir?",
    "category": "İçerik",
    "cluster": "İçerik",
    "lead": "UGC İçerik Üretimi Nedir?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "influencer-mi-ajans-mi",
    "title": "Influencer mı Ajans mı?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Influencer mı Ajans mı?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "kriz-yonetimi-sosyal-medya",
    "title": "Sosyal Medyada Kriz Yönetimi",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Sosyal Medyada Kriz Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "seo-sosyal-medya-iliskisi",
    "title": "SEO ve Sosyal Medya İlişkisi",
    "category": "SEO",
    "cluster": "SEO",
    "lead": "SEO ve Sosyal Medya İlişkisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "search-console-yerel",
    "title": "Search Console Yerel İşletmeler İçin",
    "category": "SEO",
    "cluster": "SEO",
    "lead": "Search Console Yerel İşletmeler İçin. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "google-analytics-4-temeller",
    "title": "Google Analytics 4 Temelleri",
    "category": "Ölçüm",
    "cluster": "Ölçüm",
    "lead": "Google Analytics 4 Temelleri. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "meta-pixel-kurulumu",
    "title": "Meta Pixel Kurulumu ve Olaylar",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Meta Pixel Kurulumu ve Olaylar. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "katalog-reklamlari",
    "title": "Katalog Reklamları Ne Zaman Mantıklı?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Katalog Reklamları Ne Zaman Mantıklı?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "mesaj-reklamlari",
    "title": "Mesaj / WhatsApp Reklamları",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Mesaj / WhatsApp Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "carousel-vs-reels-ads",
    "title": "Carousel mi Reels Ads mi?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Carousel mi Reels Ads mi?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "organik-erisim-dustu",
    "title": "Organik Erişim Düştüyse Ne Yapmalı?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Organik Erişim Düştüyse Ne Yapmalı?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "rakip-analizi-sosyal-medya",
    "title": "Sosyal Medyada Rakip Analizi",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Sosyal Medyada Rakip Analizi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "hedef-kitle-tanimi",
    "title": "Hedef Kitle Nasıl Tanımlanır?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Hedef Kitle Nasıl Tanımlanır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "brand-voice-yerel",
    "title": "Yerel Marka Dili (Brand Voice)",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Yerel Marka Dili (Brand Voice). Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "logo-tasarimi-dijital",
    "title": "Logo Tasarımı Dijitalde Neden Kritik?",
    "category": "Tasarım",
    "cluster": "Tasarım",
    "lead": "Logo Tasarımı Dijitalde Neden Kritik?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "grafik-tasarim-sosyal",
    "title": "Sosyal Medya Grafik Tasarım İpuçları",
    "category": "Tasarım",
    "cluster": "Tasarım",
    "lead": "Sosyal Medya Grafik Tasarım İpuçları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "web-sitesi-sosyal-medya",
    "title": "Web Sitesi ve Sosyal Medya Uyumu",
    "category": "Web",
    "cluster": "Web",
    "lead": "Web Sitesi ve Sosyal Medya Uyumu. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "landing-page-lead",
    "title": "Lead İçin Landing Page",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Lead İçin Landing Page. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "e-ticaret-trabzon",
    "title": "Trabzon'da E-ticaret ve Sosyal Satış",
    "category": "E-ticaret",
    "cluster": "E-ticaret",
    "lead": "Trabzon'da E-ticaret ve Sosyal Satış. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "sezonluk-kampanya-karadeniz",
    "title": "Karadeniz Sezonluk Kampanya Takvimi",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Karadeniz Sezonluk Kampanya Takvimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-sezonu-sosyal-medya",
    "title": "Turizm Sezonunda Sosyal Medya",
    "category": "Turizm",
    "cluster": "Turizm",
    "lead": "Turizm Sezonunda Sosyal Medya. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-donemi-reklam",
    "title": "Eğitim Dönemi Reklam Planı",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Eğitim Dönemi Reklam Planı. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "bayram-kampanyasi",
    "title": "Bayram Kampanyası Nasıl Kurgulanır?",
    "category": "Kampanya",
    "cluster": "Kampanya",
    "lead": "Bayram Kampanyası Nasıl Kurgulanır?. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "restoran-sosyal-medya-yonetimi",
    "title": "Restoran Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Restoran",
    "lead": "Restoran Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-restoran-instagram",
    "title": "Trabzon'da Restoran İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Restoran",
    "lead": "Trabzon'da Restoran İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "restoran-meta-ads",
    "title": "Restoran İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Restoran",
    "lead": "Restoran İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "kafe-sosyal-medya-yonetimi",
    "title": "Kafe Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Kafe",
    "lead": "Kafe Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-kafe-instagram",
    "title": "Trabzon'da Kafe İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Kafe",
    "lead": "Trabzon'da Kafe İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "kafe-meta-ads",
    "title": "Kafe İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Kafe",
    "lead": "Kafe İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "otel-sosyal-medya-yonetimi",
    "title": "Otel Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Otel",
    "lead": "Otel Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-otel-instagram",
    "title": "Trabzon'da Otel İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Otel",
    "lead": "Trabzon'da Otel İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "otel-meta-ads",
    "title": "Otel İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Otel",
    "lead": "Otel İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "klinik-sosyal-medya-yonetimi",
    "title": "Klinik Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Klinik",
    "lead": "Klinik Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-klinik-instagram",
    "title": "Trabzon'da Klinik İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Klinik",
    "lead": "Trabzon'da Klinik İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "klinik-meta-ads",
    "title": "Klinik İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Klinik",
    "lead": "Klinik İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "dis-klinigi-sosyal-medya-yonetimi",
    "title": "Diş Kliniği Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Diş Kliniği",
    "lead": "Diş Kliniği Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-dis-klinigi-instagram",
    "title": "Trabzon'da Diş Kliniği İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Diş Kliniği",
    "lead": "Trabzon'da Diş Kliniği İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "dis-klinigi-meta-ads",
    "title": "Diş Kliniği İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Diş Kliniği",
    "lead": "Diş Kliniği İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "guzellik-merkezi-sosyal-medya-yonetimi",
    "title": "Güzellik Merkezi Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Güzellik Merkezi",
    "lead": "Güzellik Merkezi Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-guzellik-merkezi-instagram",
    "title": "Trabzon'da Güzellik Merkezi İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Güzellik Merkezi",
    "lead": "Trabzon'da Güzellik Merkezi İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "guzellik-merkezi-meta-ads",
    "title": "Güzellik Merkezi İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Güzellik Merkezi",
    "lead": "Güzellik Merkezi İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "emlak-sosyal-medya-yonetimi",
    "title": "Emlak Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Emlak",
    "lead": "Emlak Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-emlak-instagram",
    "title": "Trabzon'da Emlak İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Emlak",
    "lead": "Trabzon'da Emlak İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "emlak-meta-ads",
    "title": "Emlak İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Emlak",
    "lead": "Emlak İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "i-nsaat-sosyal-medya-yonetimi",
    "title": "İnşaat Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "İnşaat",
    "lead": "İnşaat Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-i-nsaat-instagram",
    "title": "Trabzon'da İnşaat İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "İnşaat",
    "lead": "Trabzon'da İnşaat İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "i-nsaat-meta-ads",
    "title": "İnşaat İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "İnşaat",
    "lead": "İnşaat İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "avukat-sosyal-medya-yonetimi",
    "title": "Avukat Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Avukat",
    "lead": "Avukat Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-avukat-instagram",
    "title": "Trabzon'da Avukat İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Avukat",
    "lead": "Trabzon'da Avukat İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "avukat-meta-ads",
    "title": "Avukat İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Avukat",
    "lead": "Avukat İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "muhasebe-sosyal-medya-yonetimi",
    "title": "Muhasebe Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Muhasebe",
    "lead": "Muhasebe Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-muhasebe-instagram",
    "title": "Trabzon'da Muhasebe İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Muhasebe",
    "lead": "Trabzon'da Muhasebe İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "muhasebe-meta-ads",
    "title": "Muhasebe İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Muhasebe",
    "lead": "Muhasebe İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "spor-salonu-sosyal-medya-yonetimi",
    "title": "Spor Salonu Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Spor Salonu",
    "lead": "Spor Salonu Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-spor-salonu-instagram",
    "title": "Trabzon'da Spor Salonu İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Spor Salonu",
    "lead": "Trabzon'da Spor Salonu İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "spor-salonu-meta-ads",
    "title": "Spor Salonu İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Spor Salonu",
    "lead": "Spor Salonu İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-sosyal-medya-yonetimi",
    "title": "Eğitim Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Eğitim",
    "lead": "Eğitim Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-egitim-instagram",
    "title": "Trabzon'da Eğitim İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Eğitim",
    "lead": "Trabzon'da Eğitim İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-meta-ads",
    "title": "Eğitim İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Eğitim",
    "lead": "Eğitim İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "perakende-sosyal-medya-yonetimi",
    "title": "Perakende Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Perakende",
    "lead": "Perakende Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-perakende-instagram",
    "title": "Trabzon'da Perakende İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Perakende",
    "lead": "Trabzon'da Perakende İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "perakende-meta-ads",
    "title": "Perakende İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Perakende",
    "lead": "Perakende İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "oto-galeri-sosyal-medya-yonetimi",
    "title": "Oto Galeri Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Oto Galeri",
    "lead": "Oto Galeri Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-oto-galeri-instagram",
    "title": "Trabzon'da Oto Galeri İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Oto Galeri",
    "lead": "Trabzon'da Oto Galeri İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "oto-galeri-meta-ads",
    "title": "Oto Galeri İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Oto Galeri",
    "lead": "Oto Galeri İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-sosyal-medya-yonetimi",
    "title": "Turizm Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Turizm",
    "lead": "Turizm Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-turizm-instagram",
    "title": "Trabzon'da Turizm İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Turizm",
    "lead": "Trabzon'da Turizm İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-meta-ads",
    "title": "Turizm İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Turizm",
    "lead": "Turizm İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "firin-sosyal-medya-yonetimi",
    "title": "Fırın Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Fırın",
    "lead": "Fırın Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-firin-instagram",
    "title": "Trabzon'da Fırın İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Fırın",
    "lead": "Trabzon'da Fırın İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "firin-meta-ads",
    "title": "Fırın İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Fırın",
    "lead": "Fırın İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "butik-sosyal-medya-yonetimi",
    "title": "Butik Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Butik",
    "lead": "Butik Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-butik-instagram",
    "title": "Trabzon'da Butik İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Butik",
    "lead": "Trabzon'da Butik İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "butik-meta-ads",
    "title": "Butik İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Butik",
    "lead": "Butik İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "eczane-sosyal-medya-yonetimi",
    "title": "Eczane Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Eczane",
    "lead": "Eczane Sosyal Medya Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-eczane-instagram",
    "title": "Trabzon'da Eczane İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Eczane",
    "lead": "Trabzon'da Eczane İçin Instagram Stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "eczane-meta-ads",
    "title": "Eczane İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Eczane",
    "lead": "Eczane İçin Meta Ads Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "ortahisar-sosyal-medya-yonetimi-rehber",
    "title": "Ortahisar Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Ortahisar",
    "lead": "Ortahisar Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "ortahisar-instagram-yonetimi",
    "title": "Ortahisar'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Ortahisar",
    "lead": "Ortahisar'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "ortahisar-meta-reklam",
    "title": "Ortahisar'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Ortahisar",
    "lead": "Ortahisar'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "akcaabat-sosyal-medya-yonetimi-rehber",
    "title": "Akçaabat Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Akçaabat",
    "lead": "Akçaabat Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "akcaabat-instagram-yonetimi",
    "title": "Akçaabat'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Akçaabat",
    "lead": "Akçaabat'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "akcaabat-meta-reklam",
    "title": "Akçaabat'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Akçaabat",
    "lead": "Akçaabat'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "yomra-sosyal-medya-yonetimi-rehber",
    "title": "Yomra Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Yomra",
    "lead": "Yomra Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "yomra-instagram-yonetimi",
    "title": "Yomra'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Yomra",
    "lead": "Yomra'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "yomra-meta-reklam",
    "title": "Yomra'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Yomra",
    "lead": "Yomra'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arsin-sosyal-medya-yonetimi-rehber",
    "title": "Arsin Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Arsin",
    "lead": "Arsin Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arsin-instagram-yonetimi",
    "title": "Arsin'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Arsin",
    "lead": "Arsin'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arsin-meta-reklam",
    "title": "Arsin'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Arsin",
    "lead": "Arsin'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "surmene-sosyal-medya-yonetimi-rehber",
    "title": "Sürmene Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Sürmene",
    "lead": "Sürmene Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "surmene-instagram-yonetimi",
    "title": "Sürmene'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Sürmene",
    "lead": "Sürmene'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "surmene-meta-reklam",
    "title": "Sürmene'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Sürmene",
    "lead": "Sürmene'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "of-sosyal-medya-yonetimi-rehber",
    "title": "Of Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Of",
    "lead": "Of Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "of-instagram-yonetimi",
    "title": "Of'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Of",
    "lead": "Of'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "of-meta-reklam",
    "title": "Of'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Of",
    "lead": "Of'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "vakfikebir-sosyal-medya-yonetimi-rehber",
    "title": "Vakfıkebir Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Vakfıkebir",
    "lead": "Vakfıkebir Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "vakfikebir-instagram-yonetimi",
    "title": "Vakfıkebir'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Vakfıkebir",
    "lead": "Vakfıkebir'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "vakfikebir-meta-reklam",
    "title": "Vakfıkebir'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Vakfıkebir",
    "lead": "Vakfıkebir'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "macka-sosyal-medya-yonetimi-rehber",
    "title": "Maçka Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Maçka",
    "lead": "Maçka Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "macka-instagram-yonetimi",
    "title": "Maçka'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Maçka",
    "lead": "Maçka'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "macka-meta-reklam",
    "title": "Maçka'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Maçka",
    "lead": "Maçka'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "besikduzu-sosyal-medya-yonetimi-rehber",
    "title": "Beşikdüzü Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Beşikdüzü",
    "lead": "Beşikdüzü Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "besikduzu-instagram-yonetimi",
    "title": "Beşikdüzü'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Beşikdüzü",
    "lead": "Beşikdüzü'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "besikduzu-meta-reklam",
    "title": "Beşikdüzü'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Beşikdüzü",
    "lead": "Beşikdüzü'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "carsibasi-sosyal-medya-yonetimi-rehber",
    "title": "Çarşıbaşı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Çarşıbaşı",
    "lead": "Çarşıbaşı Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "carsibasi-instagram-yonetimi",
    "title": "Çarşıbaşı'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Çarşıbaşı",
    "lead": "Çarşıbaşı'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "carsibasi-meta-reklam",
    "title": "Çarşıbaşı'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Çarşıbaşı",
    "lead": "Çarşıbaşı'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arakli-sosyal-medya-yonetimi-rehber",
    "title": "Araklı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Araklı",
    "lead": "Araklı Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arakli-instagram-yonetimi",
    "title": "Araklı'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Araklı",
    "lead": "Araklı'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "arakli-meta-reklam",
    "title": "Araklı'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Araklı",
    "lead": "Araklı'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "caykara-sosyal-medya-yonetimi-rehber",
    "title": "Çaykara Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Çaykara",
    "lead": "Çaykara Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "caykara-instagram-yonetimi",
    "title": "Çaykara'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Çaykara",
    "lead": "Çaykara'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "caykara-meta-reklam",
    "title": "Çaykara'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Çaykara",
    "lead": "Çaykara'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "tonya-sosyal-medya-yonetimi-rehber",
    "title": "Tonya Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Tonya",
    "lead": "Tonya Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "tonya-instagram-yonetimi",
    "title": "Tonya'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Tonya",
    "lead": "Tonya'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "tonya-meta-reklam",
    "title": "Tonya'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Tonya",
    "lead": "Tonya'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "duzkoy-sosyal-medya-yonetimi-rehber",
    "title": "Düzköy Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Düzköy",
    "lead": "Düzköy Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "duzkoy-instagram-yonetimi",
    "title": "Düzköy'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Düzköy",
    "lead": "Düzköy'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "duzkoy-meta-reklam",
    "title": "Düzköy'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Düzköy",
    "lead": "Düzköy'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "salpazari-sosyal-medya-yonetimi-rehber",
    "title": "Şalpazarı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Şalpazarı",
    "lead": "Şalpazarı Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "salpazari-instagram-yonetimi",
    "title": "Şalpazarı'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Şalpazarı",
    "lead": "Şalpazarı'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "salpazari-meta-reklam",
    "title": "Şalpazarı'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Şalpazarı",
    "lead": "Şalpazarı'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "hayrat-sosyal-medya-yonetimi-rehber",
    "title": "Hayrat Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Hayrat",
    "lead": "Hayrat Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "hayrat-instagram-yonetimi",
    "title": "Hayrat'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Hayrat",
    "lead": "Hayrat'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "hayrat-meta-reklam",
    "title": "Hayrat'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Hayrat",
    "lead": "Hayrat'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "dernekpazari-sosyal-medya-yonetimi-rehber",
    "title": "Dernekpazarı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Dernekpazarı",
    "lead": "Dernekpazarı Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "dernekpazari-instagram-yonetimi",
    "title": "Dernekpazarı'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Dernekpazarı",
    "lead": "Dernekpazarı'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "dernekpazari-meta-reklam",
    "title": "Dernekpazarı'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Dernekpazarı",
    "lead": "Dernekpazarı'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "koprubasi-sosyal-medya-yonetimi-rehber",
    "title": "Köprübaşı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Köprübaşı",
    "lead": "Köprübaşı Sosyal Medya Yönetimi Rehberi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "koprubasi-instagram-yonetimi",
    "title": "Köprübaşı'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Köprübaşı",
    "lead": "Köprübaşı'da Instagram Yönetimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "koprubasi-meta-reklam",
    "title": "Köprübaşı'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Köprübaşı",
    "lead": "Köprübaşı'da Meta Reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-stories-reklamlari-ne-zaman-ise-yarar",
    "title": "Trabzon: Stories reklamları ne zaman işe yarar",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Stories reklamları ne zaman işe yarar. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-carousel-icerik-fikirleri",
    "title": "Trabzon: Carousel içerik fikirleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Carousel içerik fikirleri. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-before-after-icerik-formati",
    "title": "Trabzon: Before after içerik formatı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Before after içerik formatı. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-musteri-yorumunu-icerige-cevirmek",
    "title": "Trabzon: Müşteri yorumunu içeriğe çevirmek",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Müşteri yorumunu içeriğe çevirmek. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-canli-yayin-stratejisi",
    "title": "Trabzon: Canlı yayın stratejisi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Canlı yayın stratejisi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-youtube-shorts-vs-reels",
    "title": "Trabzon: YouTube Shorts vs Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: YouTube Shorts vs Reels. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-kapak-fotografi-optimizasyonu",
    "title": "Trabzon: Kapak fotoğrafı optimizasyonu",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Kapak fotoğrafı optimizasyonu. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-cta-butonlari-sosyal-medyada",
    "title": "Trabzon: CTA butonları sosyal medyada",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: CTA butonları sosyal medyada. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-form-doldurma-reklamlari",
    "title": "Trabzon: Form doldurma reklamları",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Form doldurma reklamları. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-lookalike-kitleler",
    "title": "Trabzon: Lookalike kitleler",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Lookalike kitleler. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-ozel-kitle-olusturma",
    "title": "Trabzon: Özel kitle oluşturma",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Özel kitle oluşturma. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-frekans-ve-yorgunluk",
    "title": "Trabzon: Frekans ve yorgunluk",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Frekans ve yorgunluk. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-a-b-test-kreatif",
    "title": "Trabzon: A/B test kreatif",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: A/B test kreatif. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-hook-ilk-3-saniye",
    "title": "Trabzon: Hook ilk 3 saniye",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Hook ilk 3 saniye. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-altyazili-video-neden-sart",
    "title": "Trabzon: Altyazılı video neden şart",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Altyazılı video neden şart. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-muzik-hakki-ve-reels",
    "title": "Trabzon: Müzik hakkı ve Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Müzik hakkı ve Reels. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-marka-isbirligi-sozlesmesi",
    "title": "Trabzon: Marka işbirliği sözleşmesi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Marka işbirliği sözleşmesi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-ajans-brief-nasil-yazilir",
    "title": "Trabzon: Ajans brief nasıl yazılır",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Ajans brief nasıl yazılır. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-aylik-rapor-ornegi",
    "title": "Trabzon: Aylık rapor örneği",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Aylık rapor örneği. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-kpi-secimi-yerel-isletme",
    "title": "Trabzon: KPI seçimi yerel işletme",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: KPI seçimi yerel işletme. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-roas-vs-cpa",
    "title": "Trabzon: ROAS vs CPA",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: ROAS vs CPA. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-marka-guveni-sinyalleri",
    "title": "Trabzon: Marka güveni sinyalleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Marka güveni sinyalleri. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-seffaf-sozlesme-maddeleri",
    "title": "Trabzon: Şeffaf sözleşme maddeleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Şeffaf sözleşme maddeleri. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-i-lk-ay-cayma-hakki-neden-onemli",
    "title": "Trabzon: İlk ay cayma hakkı neden önemli",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: İlk ay cayma hakkı neden önemli. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-ortahisar-vs-ilce-hedefleme",
    "title": "Trabzon: Ortahisar vs ilçe hedefleme",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Ortahisar vs ilçe hedefleme. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-karadeniz-gorsel-dili",
    "title": "Trabzon: Karadeniz görsel dili",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Karadeniz görsel dili. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-yagmurlu-gun-icerik-fikirleri",
    "title": "Trabzon: Yağmurlu gün içerik fikirleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Yağmurlu gün içerik fikirleri. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-sahil-isletmeleri-icin-icerik",
    "title": "Trabzon: Sahil işletmeleri için içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Sahil işletmeleri için içerik. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-dag-turizmi-sosyal-medya",
    "title": "Trabzon: Dağ turizmi sosyal medya",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Dağ turizmi sosyal medya. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-balik-restorani-icerik",
    "title": "Trabzon: Balık restoranı içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Balık restoranı içerik. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-kahve-dukkani-reels",
    "title": "Trabzon: Kahve dükkanı Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Kahve dükkanı Reels. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-klinik-randevu-lead",
    "title": "Trabzon: Klinik randevu lead",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Klinik randevu lead. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-dis-klinigi-guven-icerigi",
    "title": "Trabzon: Diş kliniği güven içeriği",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Diş kliniği güven içeriği. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-emlak-portfoy-vitrini",
    "title": "Trabzon: Emlak portföy vitrini",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Emlak portföy vitrini. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-i-nsaat-proje-tanitimi",
    "title": "Trabzon: İnşaat proje tanıtımı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: İnşaat proje tanıtımı. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-avukat-linkedin-icerik",
    "title": "Trabzon: Avukat LinkedIn içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Avukat LinkedIn içerik. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-spor-salonu-uyelik-kampanyasi",
    "title": "Trabzon: Spor salonu üyelik kampanyası",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Spor salonu üyelik kampanyası. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-ozel-okul-kayit-donemi",
    "title": "Trabzon: Özel okul kayıt dönemi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Özel okul kayıt dönemi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-butik-urun-cekimi",
    "title": "Trabzon: Butik ürün çekimi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Butik ürün çekimi. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-eczane-bilgilendirici-icerik",
    "title": "Trabzon: Eczane bilgilendirici içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Eczane bilgilendirici içerik. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-oto-galeri-video-tur",
    "title": "Trabzon: Oto galeri video tur",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Oto galeri video tur. Trabzon işletmeleri için pratik rehber."
  },
  {
    "slug": "trabzon-tur-acentesi-paket-tanitimi",
    "title": "Trabzon: Tur acentesi paket tanıtımı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Trabzon: Tur acentesi paket tanıtımı. Trabzon işletmeleri için pratik rehber."
  }
];

export const BLOG_PLAN_TARGET = 150;
