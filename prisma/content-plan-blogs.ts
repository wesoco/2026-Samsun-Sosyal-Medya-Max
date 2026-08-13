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
    "slug": "samsun-instagram-reklami-nasil-verilir",
    "title": "Samsun'da Instagram Reklamı Nasıl Verilir?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Samsun'da Instagram Reklamı Nasıl Verilir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-sosyal-medya-ajansi-secimi",
    "title": "Samsun'da Sosyal Medya Ajansı Seçerken Nelere Dikkat Edilmeli?",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Samsun'da Sosyal Medya Ajansı Seçerken Nelere Dikkat Edilmeli?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "reels-izlenmesi-nasil-artirilir",
    "title": "Reels İzlenmesi Nasıl Artırılır?",
    "category": "Reels",
    "cluster": "Reels",
    "lead": "Reels İzlenmesi Nasıl Artırılır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "meta-reklamlari-nedir",
    "title": "Meta Reklamları Nedir?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Meta Reklamları Nedir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "google-ads-mi-meta-ads-mi",
    "title": "Google Reklamları mı Meta Reklamları mı?",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Google Reklamları mı Meta Reklamları mı?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kurumsal-kimlik-neden-onemli",
    "title": "Kurumsal Kimlik Neden Önemlidir?",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Kurumsal Kimlik Neden Önemlidir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kucuk-isletmeler-icin-sosyal-medya",
    "title": "Küçük İşletmeler İçin Sosyal Medya",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Küçük İşletmeler İçin Sosyal Medya. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-dijital-pazarlama",
    "title": "Samsun'da Dijital Pazarlama",
    "category": "Dijital Pazarlama",
    "cluster": "Dijital Pazarlama",
    "lead": "Samsun'da Dijital Pazarlama. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "facebook-reklam-butcesi",
    "title": "Facebook Reklam Bütçesi Nasıl Planlanır?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Facebook Reklam Bütçesi Nasıl Planlanır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "instagram-hikaye-stratejisi",
    "title": "Instagram Hikâye Stratejisi",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "Instagram Hikâye Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "tiktok-samsun-isletmeler",
    "title": "Samsun İşletmeleri İçin TikTok",
    "category": "TikTok",
    "cluster": "TikTok",
    "lead": "Samsun İşletmeleri İçin TikTok. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "linkedin-b2b-samsun",
    "title": "Samsun'da LinkedIn ile B2B Büyüme",
    "category": "LinkedIn",
    "cluster": "LinkedIn",
    "lead": "Samsun'da LinkedIn ile B2B Büyüme. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "google-benim-isletmem-optimizasyonu",
    "title": "Google Benim İşletmem Optimizasyonu",
    "category": "Yerel SEO",
    "cluster": "Yerel SEO",
    "lead": "Google Benim İşletmem Optimizasyonu. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "sosyal-medya-raporlama",
    "title": "Sosyal Medya Raporlama Nasıl Olmalı?",
    "category": "Ölçüm",
    "cluster": "Ölçüm",
    "lead": "Sosyal Medya Raporlama Nasıl Olmalı?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "icerik-takvimi-nasil-yapilir",
    "title": "İçerik Takvimi Nasıl Yapılır?",
    "category": "İçerik",
    "cluster": "İçerik",
    "lead": "İçerik Takvimi Nasıl Yapılır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "drone-cekimi-sosyal-medya",
    "title": "Drone Çekimi Sosyal Medyada Nasıl Kullanılır?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Drone Çekimi Sosyal Medyada Nasıl Kullanılır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "profesyonel-fotograf-marka",
    "title": "Profesyonel Fotoğraf Markayı Nasıl Güçlendirir?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Profesyonel Fotoğraf Markayı Nasıl Güçlendirir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "video-prodüksiyon-maliyeti",
    "title": "Video Prodüksiyon Maliyeti Neye Göre Değişir?",
    "category": "Prodüksiyon",
    "cluster": "Prodüksiyon",
    "lead": "Video Prodüksiyon Maliyeti Neye Göre Değişir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "remarketing-nedir",
    "title": "Remarketing Nedir, Nasıl Çalışır?",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Remarketing Nedir, Nasıl Çalışır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "lead-generation-sosyal-medya",
    "title": "Sosyal Medyada Lead Generation",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Sosyal Medyada Lead Generation. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "donusum-orani-artirma",
    "title": "Dönüşüm Oranı Nasıl Artırılır?",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Dönüşüm Oranı Nasıl Artırılır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "marka-bilinirligi-yerel",
    "title": "Yerel Marka Bilinirliği Nasıl Artar?",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Yerel Marka Bilinirliği Nasıl Artar?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "wesoco-sosyal-medya-sureci",
    "title": "Wesoco Sosyal Medya Yönetim Süreci",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Wesoco Sosyal Medya Yönetim Süreci. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ucretsiz-kesif-gorusmesi",
    "title": "Ücretsiz Keşif Görüşmesinde Neler Konuşulur?",
    "category": "Ajans",
    "cluster": "Ajans",
    "lead": "Ücretsiz Keşif Görüşmesinde Neler Konuşulur?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "sosyal-medya-paket-fiyatlari",
    "title": "Sosyal Medya Paket Fiyatları Neye Göre Değişir?",
    "category": "Fiyat",
    "cluster": "Fiyat",
    "lead": "Sosyal Medya Paket Fiyatları Neye Göre Değişir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "instagram-bio-optimizasyonu",
    "title": "Instagram Bio Optimizasyonu",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "Instagram Bio Optimizasyonu. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "hashtag-stratejisi-2026",
    "title": "2026 Hashtag Stratejisi",
    "category": "Instagram",
    "cluster": "Instagram",
    "lead": "2026 Hashtag Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ugc-icerik-uretimi",
    "title": "UGC İçerik Üretimi Nedir?",
    "category": "İçerik",
    "cluster": "İçerik",
    "lead": "UGC İçerik Üretimi Nedir?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "influencer-mi-ajans-mi",
    "title": "Influencer mı Ajans mı?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Influencer mı Ajans mı?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kriz-yonetimi-sosyal-medya",
    "title": "Sosyal Medyada Kriz Yönetimi",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Sosyal Medyada Kriz Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "seo-sosyal-medya-iliskisi",
    "title": "SEO ve Sosyal Medya İlişkisi",
    "category": "SEO",
    "cluster": "SEO",
    "lead": "SEO ve Sosyal Medya İlişkisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "search-console-yerel",
    "title": "Search Console Yerel İşletmeler İçin",
    "category": "SEO",
    "cluster": "SEO",
    "lead": "Search Console Yerel İşletmeler İçin. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "google-analytics-4-temeller",
    "title": "Google Analytics 4 Temelleri",
    "category": "Ölçüm",
    "cluster": "Ölçüm",
    "lead": "Google Analytics 4 Temelleri. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "meta-pixel-kurulumu",
    "title": "Meta Pixel Kurulumu ve Olaylar",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Meta Pixel Kurulumu ve Olaylar. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "katalog-reklamlari",
    "title": "Katalog Reklamları Ne Zaman Mantıklı?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Katalog Reklamları Ne Zaman Mantıklı?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "mesaj-reklamlari",
    "title": "Mesaj / WhatsApp Reklamları",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Mesaj / WhatsApp Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "carousel-vs-reels-ads",
    "title": "Carousel mi Reels Ads mi?",
    "category": "Meta Ads",
    "cluster": "Meta Ads",
    "lead": "Carousel mi Reels Ads mi?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "organik-erisim-dustu",
    "title": "Organik Erişim Düştüyse Ne Yapmalı?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Organik Erişim Düştüyse Ne Yapmalı?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "rakip-analizi-sosyal-medya",
    "title": "Sosyal Medyada Rakip Analizi",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Sosyal Medyada Rakip Analizi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "hedef-kitle-tanimi",
    "title": "Hedef Kitle Nasıl Tanımlanır?",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Hedef Kitle Nasıl Tanımlanır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "brand-voice-yerel",
    "title": "Yerel Marka Dili (Brand Voice)",
    "category": "Marka",
    "cluster": "Marka",
    "lead": "Yerel Marka Dili (Brand Voice). Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "logo-tasarimi-dijital",
    "title": "Logo Tasarımı Dijitalde Neden Kritik?",
    "category": "Tasarım",
    "cluster": "Tasarım",
    "lead": "Logo Tasarımı Dijitalde Neden Kritik?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "grafik-tasarim-sosyal",
    "title": "Sosyal Medya Grafik Tasarım İpuçları",
    "category": "Tasarım",
    "cluster": "Tasarım",
    "lead": "Sosyal Medya Grafik Tasarım İpuçları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "web-sitesi-sosyal-medya",
    "title": "Web Sitesi ve Sosyal Medya Uyumu",
    "category": "Web",
    "cluster": "Web",
    "lead": "Web Sitesi ve Sosyal Medya Uyumu. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "landing-page-lead",
    "title": "Lead İçin Landing Page",
    "category": "Performans",
    "cluster": "Performans",
    "lead": "Lead İçin Landing Page. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "e-ticaret-samsun",
    "title": "Samsun'da E-ticaret ve Sosyal Satış",
    "category": "E-ticaret",
    "cluster": "E-ticaret",
    "lead": "Samsun'da E-ticaret ve Sosyal Satış. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "sezonluk-kampanya-karadeniz",
    "title": "Karadeniz Sezonluk Kampanya Takvimi",
    "category": "Strateji",
    "cluster": "Strateji",
    "lead": "Karadeniz Sezonluk Kampanya Takvimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-sezonu-sosyal-medya",
    "title": "Turizm Sezonunda Sosyal Medya",
    "category": "Turizm",
    "cluster": "Turizm",
    "lead": "Turizm Sezonunda Sosyal Medya. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-donemi-reklam",
    "title": "Eğitim Dönemi Reklam Planı",
    "category": "Reklam",
    "cluster": "Reklam",
    "lead": "Eğitim Dönemi Reklam Planı. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "bayram-kampanyasi",
    "title": "Bayram Kampanyası Nasıl Kurgulanır?",
    "category": "Kampanya",
    "cluster": "Kampanya",
    "lead": "Bayram Kampanyası Nasıl Kurgulanır?. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "restoran-sosyal-medya-yonetimi",
    "title": "Restoran Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Restoran",
    "lead": "Restoran Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-restoran-instagram",
    "title": "Samsun'da Restoran İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Restoran",
    "lead": "Samsun'da Restoran İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "restoran-meta-ads",
    "title": "Restoran İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Restoran",
    "lead": "Restoran İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kafe-sosyal-medya-yonetimi",
    "title": "Kafe Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Kafe",
    "lead": "Kafe Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-kafe-instagram",
    "title": "Samsun'da Kafe İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Kafe",
    "lead": "Samsun'da Kafe İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kafe-meta-ads",
    "title": "Kafe İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Kafe",
    "lead": "Kafe İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "otel-sosyal-medya-yonetimi",
    "title": "Otel Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Otel",
    "lead": "Otel Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-otel-instagram",
    "title": "Samsun'da Otel İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Otel",
    "lead": "Samsun'da Otel İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "otel-meta-ads",
    "title": "Otel İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Otel",
    "lead": "Otel İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "klinik-sosyal-medya-yonetimi",
    "title": "Klinik Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Klinik",
    "lead": "Klinik Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-klinik-instagram",
    "title": "Samsun'da Klinik İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Klinik",
    "lead": "Samsun'da Klinik İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "klinik-meta-ads",
    "title": "Klinik İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Klinik",
    "lead": "Klinik İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "dis-klinigi-sosyal-medya-yonetimi",
    "title": "Diş Kliniği Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Diş Kliniği",
    "lead": "Diş Kliniği Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-dis-klinigi-instagram",
    "title": "Samsun'da Diş Kliniği İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Diş Kliniği",
    "lead": "Samsun'da Diş Kliniği İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "dis-klinigi-meta-ads",
    "title": "Diş Kliniği İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Diş Kliniği",
    "lead": "Diş Kliniği İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "guzellik-merkezi-sosyal-medya-yonetimi",
    "title": "Güzellik Merkezi Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Güzellik Merkezi",
    "lead": "Güzellik Merkezi Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-guzellik-merkezi-instagram",
    "title": "Samsun'da Güzellik Merkezi İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Güzellik Merkezi",
    "lead": "Samsun'da Güzellik Merkezi İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "guzellik-merkezi-meta-ads",
    "title": "Güzellik Merkezi İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Güzellik Merkezi",
    "lead": "Güzellik Merkezi İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "emlak-sosyal-medya-yonetimi",
    "title": "Emlak Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Emlak",
    "lead": "Emlak Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-emlak-instagram",
    "title": "Samsun'da Emlak İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Emlak",
    "lead": "Samsun'da Emlak İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "emlak-meta-ads",
    "title": "Emlak İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Emlak",
    "lead": "Emlak İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "i-nsaat-sosyal-medya-yonetimi",
    "title": "İnşaat Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "İnşaat",
    "lead": "İnşaat Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-i-nsaat-instagram",
    "title": "Samsun'da İnşaat İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "İnşaat",
    "lead": "Samsun'da İnşaat İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "i-nsaat-meta-ads",
    "title": "İnşaat İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "İnşaat",
    "lead": "İnşaat İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "avukat-sosyal-medya-yonetimi",
    "title": "Avukat Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Avukat",
    "lead": "Avukat Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-avukat-instagram",
    "title": "Samsun'da Avukat İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Avukat",
    "lead": "Samsun'da Avukat İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "avukat-meta-ads",
    "title": "Avukat İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Avukat",
    "lead": "Avukat İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "muhasebe-sosyal-medya-yonetimi",
    "title": "Muhasebe Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Muhasebe",
    "lead": "Muhasebe Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-muhasebe-instagram",
    "title": "Samsun'da Muhasebe İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Muhasebe",
    "lead": "Samsun'da Muhasebe İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "muhasebe-meta-ads",
    "title": "Muhasebe İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Muhasebe",
    "lead": "Muhasebe İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "spor-salonu-sosyal-medya-yonetimi",
    "title": "Spor Salonu Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Spor Salonu",
    "lead": "Spor Salonu Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-spor-salonu-instagram",
    "title": "Samsun'da Spor Salonu İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Spor Salonu",
    "lead": "Samsun'da Spor Salonu İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "spor-salonu-meta-ads",
    "title": "Spor Salonu İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Spor Salonu",
    "lead": "Spor Salonu İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-sosyal-medya-yonetimi",
    "title": "Eğitim Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Eğitim",
    "lead": "Eğitim Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-egitim-instagram",
    "title": "Samsun'da Eğitim İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Eğitim",
    "lead": "Samsun'da Eğitim İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "egitim-meta-ads",
    "title": "Eğitim İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Eğitim",
    "lead": "Eğitim İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "perakende-sosyal-medya-yonetimi",
    "title": "Perakende Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Perakende",
    "lead": "Perakende Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-perakende-instagram",
    "title": "Samsun'da Perakende İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Perakende",
    "lead": "Samsun'da Perakende İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "perakende-meta-ads",
    "title": "Perakende İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Perakende",
    "lead": "Perakende İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "oto-galeri-sosyal-medya-yonetimi",
    "title": "Oto Galeri Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Oto Galeri",
    "lead": "Oto Galeri Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-oto-galeri-instagram",
    "title": "Samsun'da Oto Galeri İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Oto Galeri",
    "lead": "Samsun'da Oto Galeri İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "oto-galeri-meta-ads",
    "title": "Oto Galeri İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Oto Galeri",
    "lead": "Oto Galeri İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-sosyal-medya-yonetimi",
    "title": "Turizm Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Turizm",
    "lead": "Turizm Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-turizm-instagram",
    "title": "Samsun'da Turizm İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Turizm",
    "lead": "Samsun'da Turizm İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "turizm-meta-ads",
    "title": "Turizm İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Turizm",
    "lead": "Turizm İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "firin-sosyal-medya-yonetimi",
    "title": "Fırın Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Fırın",
    "lead": "Fırın Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-firin-instagram",
    "title": "Samsun'da Fırın İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Fırın",
    "lead": "Samsun'da Fırın İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "firin-meta-ads",
    "title": "Fırın İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Fırın",
    "lead": "Fırın İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "butik-sosyal-medya-yonetimi",
    "title": "Butik Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Butik",
    "lead": "Butik Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-butik-instagram",
    "title": "Samsun'da Butik İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Butik",
    "lead": "Samsun'da Butik İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "butik-meta-ads",
    "title": "Butik İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Butik",
    "lead": "Butik İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "eczane-sosyal-medya-yonetimi",
    "title": "Eczane Sosyal Medya Yönetimi",
    "category": "Sektör",
    "cluster": "Eczane",
    "lead": "Eczane Sosyal Medya Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-eczane-instagram",
    "title": "Samsun'da Eczane İçin Instagram Stratejisi",
    "category": "Sektör",
    "cluster": "Eczane",
    "lead": "Samsun'da Eczane İçin Instagram Stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "eczane-meta-ads",
    "title": "Eczane İçin Meta Ads Rehberi",
    "category": "Meta Ads",
    "cluster": "Eczane",
    "lead": "Eczane İçin Meta Ads Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ilkadim-sosyal-medya-yonetimi-rehber",
    "title": "İlkadım Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "İlkadım",
    "lead": "İlkadım Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ilkadim-instagram-yonetimi",
    "title": "İlkadım'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "İlkadım",
    "lead": "İlkadım'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ilkadim-meta-reklam",
    "title": "İlkadım'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "İlkadım",
    "lead": "İlkadım'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "atakum-sosyal-medya-yonetimi-rehber",
    "title": "Atakum Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Atakum",
    "lead": "Atakum Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "atakum-instagram-yonetimi",
    "title": "Atakum'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Atakum",
    "lead": "Atakum'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "atakum-meta-reklam",
    "title": "Atakum'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Atakum",
    "lead": "Atakum'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "canik-sosyal-medya-yonetimi-rehber",
    "title": "Canik Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Canik",
    "lead": "Canik Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "canik-instagram-yonetimi",
    "title": "Canik'te Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Canik",
    "lead": "Canik'te Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "canik-meta-reklam",
    "title": "Canik'te Meta Reklamları",
    "category": "İlçe",
    "cluster": "Canik",
    "lead": "Canik'te Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "tekkekoy-sosyal-medya-yonetimi-rehber",
    "title": "Tekkeköy Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Tekkeköy",
    "lead": "Tekkeköy Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "tekkekoy-instagram-yonetimi",
    "title": "Tekkeköy'de Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Tekkeköy",
    "lead": "Tekkeköy'de Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "tekkekoy-meta-reklam",
    "title": "Tekkeköy'de Meta Reklamları",
    "category": "İlçe",
    "cluster": "Tekkeköy",
    "lead": "Tekkeköy'de Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "bafra-sosyal-medya-yonetimi-rehber",
    "title": "Bafra Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Bafra",
    "lead": "Bafra Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "bafra-instagram-yonetimi",
    "title": "Bafra'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Bafra",
    "lead": "Bafra'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "bafra-meta-reklam",
    "title": "Bafra'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Bafra",
    "lead": "Bafra'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "carsamba-sosyal-medya-yonetimi-rehber",
    "title": "Çarşamba Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Çarşamba",
    "lead": "Çarşamba Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "carsamba-instagram-yonetimi",
    "title": "Çarşamba'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Çarşamba",
    "lead": "Çarşamba'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "carsamba-meta-reklam",
    "title": "Çarşamba'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Çarşamba",
    "lead": "Çarşamba'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "vezirkopru-sosyal-medya-yonetimi-rehber",
    "title": "Vezirköprü Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Vezirköprü",
    "lead": "Vezirköprü Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "vezirkopru-instagram-yonetimi",
    "title": "Vezirköprü'de Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Vezirköprü",
    "lead": "Vezirköprü'de Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "vezirkopru-meta-reklam",
    "title": "Vezirköprü'de Meta Reklamları",
    "category": "İlçe",
    "cluster": "Vezirköprü",
    "lead": "Vezirköprü'de Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "terme-sosyal-medya-yonetimi-rehber",
    "title": "Terme Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Terme",
    "lead": "Terme Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "terme-instagram-yonetimi",
    "title": "Terme'de Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Terme",
    "lead": "Terme'de Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "terme-meta-reklam",
    "title": "Terme'de Meta Reklamları",
    "category": "İlçe",
    "cluster": "Terme",
    "lead": "Terme'de Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "havza-sosyal-medya-yonetimi-rehber",
    "title": "Havza Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Havza",
    "lead": "Havza Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "havza-instagram-yonetimi",
    "title": "Havza'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Havza",
    "lead": "Havza'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "havza-meta-reklam",
    "title": "Havza'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Havza",
    "lead": "Havza'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kavak-sosyal-medya-yonetimi-rehber",
    "title": "Kavak Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Kavak",
    "lead": "Kavak Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kavak-instagram-yonetimi",
    "title": "Kavak'ta Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Kavak",
    "lead": "Kavak'ta Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "kavak-meta-reklam",
    "title": "Kavak'ta Meta Reklamları",
    "category": "İlçe",
    "cluster": "Kavak",
    "lead": "Kavak'ta Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "alacam-sosyal-medya-yonetimi-rehber",
    "title": "Alaçam Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Alaçam",
    "lead": "Alaçam Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "alacam-instagram-yonetimi",
    "title": "Alaçam'da Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Alaçam",
    "lead": "Alaçam'da Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "alacam-meta-reklam",
    "title": "Alaçam'da Meta Reklamları",
    "category": "İlçe",
    "cluster": "Alaçam",
    "lead": "Alaçam'da Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "19-mayis-sosyal-medya-yonetimi-rehber",
    "title": "19 Mayıs Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "19 Mayıs",
    "lead": "19 Mayıs Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "19-mayis-instagram-yonetimi",
    "title": "19 Mayıs'ta Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "19 Mayıs",
    "lead": "19 Mayıs'ta Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "19-mayis-meta-reklam",
    "title": "19 Mayıs'ta Meta Reklamları",
    "category": "İlçe",
    "cluster": "19 Mayıs",
    "lead": "19 Mayıs'ta Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "salipazari-sosyal-medya-yonetimi-rehber",
    "title": "Salıpazarı Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Salıpazarı",
    "lead": "Salıpazarı Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "salipazari-instagram-yonetimi",
    "title": "Salıpazarı'nda Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Salıpazarı",
    "lead": "Salıpazarı'nda Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "salipazari-meta-reklam",
    "title": "Salıpazarı'nda Meta Reklamları",
    "category": "İlçe",
    "cluster": "Salıpazarı",
    "lead": "Salıpazarı'nda Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "asarcik-sosyal-medya-yonetimi-rehber",
    "title": "Asarcık Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Asarcık",
    "lead": "Asarcık Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "asarcik-instagram-yonetimi",
    "title": "Asarcık'ta Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Asarcık",
    "lead": "Asarcık'ta Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "asarcik-meta-reklam",
    "title": "Asarcık'ta Meta Reklamları",
    "category": "İlçe",
    "cluster": "Asarcık",
    "lead": "Asarcık'ta Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ladik-sosyal-medya-yonetimi-rehber",
    "title": "Ladik Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Ladik",
    "lead": "Ladik Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ladik-instagram-yonetimi",
    "title": "Ladik'te Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Ladik",
    "lead": "Ladik'te Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ladik-meta-reklam",
    "title": "Ladik'te Meta Reklamları",
    "category": "İlçe",
    "cluster": "Ladik",
    "lead": "Ladik'te Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ayvacik-sosyal-medya-yonetimi-rehber",
    "title": "Ayvacık Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Ayvacık",
    "lead": "Ayvacık Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ayvacik-instagram-yonetimi",
    "title": "Ayvacık'ta Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Ayvacık",
    "lead": "Ayvacık'ta Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "ayvacik-meta-reklam",
    "title": "Ayvacık'ta Meta Reklamları",
    "category": "İlçe",
    "cluster": "Ayvacık",
    "lead": "Ayvacık'ta Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "yakakent-sosyal-medya-yonetimi-rehber",
    "title": "Yakakent Sosyal Medya Yönetimi Rehberi",
    "category": "İlçe",
    "cluster": "Yakakent",
    "lead": "Yakakent Sosyal Medya Yönetimi Rehberi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "yakakent-instagram-yonetimi",
    "title": "Yakakent'te Instagram Yönetimi",
    "category": "İlçe",
    "cluster": "Yakakent",
    "lead": "Yakakent'te Instagram Yönetimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "yakakent-meta-reklam",
    "title": "Yakakent'te Meta Reklamları",
    "category": "İlçe",
    "cluster": "Yakakent",
    "lead": "Yakakent'te Meta Reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-stories-reklamlari-ne-zaman-ise-yarar",
    "title": "Samsun: Stories reklamları ne zaman işe yarar",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Stories reklamları ne zaman işe yarar. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-carousel-icerik-fikirleri",
    "title": "Samsun: Carousel içerik fikirleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Carousel içerik fikirleri. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-before-after-icerik-formati",
    "title": "Samsun: Before after içerik formatı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Before after içerik formatı. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-musteri-yorumunu-icerige-cevirmek",
    "title": "Samsun: Müşteri yorumunu içeriğe çevirmek",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Müşteri yorumunu içeriğe çevirmek. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-canli-yayin-stratejisi",
    "title": "Samsun: Canlı yayın stratejisi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Canlı yayın stratejisi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-youtube-shorts-vs-reels",
    "title": "Samsun: YouTube Shorts vs Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: YouTube Shorts vs Reels. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-kapak-fotografi-optimizasyonu",
    "title": "Samsun: Kapak fotoğrafı optimizasyonu",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Kapak fotoğrafı optimizasyonu. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-cta-butonlari-sosyal-medyada",
    "title": "Samsun: CTA butonları sosyal medyada",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: CTA butonları sosyal medyada. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-form-doldurma-reklamlari",
    "title": "Samsun: Form doldurma reklamları",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Form doldurma reklamları. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-lookalike-kitleler",
    "title": "Samsun: Lookalike kitleler",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Lookalike kitleler. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-ozel-kitle-olusturma",
    "title": "Samsun: Özel kitle oluşturma",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Özel kitle oluşturma. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-frekans-ve-yorgunluk",
    "title": "Samsun: Frekans ve yorgunluk",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Frekans ve yorgunluk. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-a-b-test-kreatif",
    "title": "Samsun: A/B test kreatif",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: A/B test kreatif. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-hook-ilk-3-saniye",
    "title": "Samsun: Hook ilk 3 saniye",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Hook ilk 3 saniye. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-altyazili-video-neden-sart",
    "title": "Samsun: Altyazılı video neden şart",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Altyazılı video neden şart. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-muzik-hakki-ve-reels",
    "title": "Samsun: Müzik hakkı ve Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Müzik hakkı ve Reels. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-marka-isbirligi-sozlesmesi",
    "title": "Samsun: Marka işbirliği sözleşmesi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Marka işbirliği sözleşmesi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-ajans-brief-nasil-yazilir",
    "title": "Samsun: Ajans brief nasıl yazılır",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Ajans brief nasıl yazılır. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-aylik-rapor-ornegi",
    "title": "Samsun: Aylık rapor örneği",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Aylık rapor örneği. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-kpi-secimi-yerel-isletme",
    "title": "Samsun: KPI seçimi yerel işletme",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: KPI seçimi yerel işletme. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-roas-vs-cpa",
    "title": "Samsun: ROAS vs CPA",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: ROAS vs CPA. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-marka-guveni-sinyalleri",
    "title": "Samsun: Marka güveni sinyalleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Marka güveni sinyalleri. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-seffaf-sozlesme-maddeleri",
    "title": "Samsun: Şeffaf sözleşme maddeleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Şeffaf sözleşme maddeleri. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-i-lk-ay-cayma-hakki-neden-onemli",
    "title": "Samsun: İlk ay cayma hakkı neden önemli",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: İlk ay cayma hakkı neden önemli. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-ilkadim-vs-ilce-hedefleme",
    "title": "Samsun: İlkadım vs ilçe hedefleme",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: İlkadım vs ilçe hedefleme. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-karadeniz-gorsel-dili",
    "title": "Samsun: Karadeniz görsel dili",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Karadeniz görsel dili. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-yagmurlu-gun-icerik-fikirleri",
    "title": "Samsun: Yağmurlu gün içerik fikirleri",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Yağmurlu gün içerik fikirleri. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-sahil-isletmeleri-icin-icerik",
    "title": "Samsun: Sahil işletmeleri için içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Sahil işletmeleri için içerik. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-yayla-turizmi-sosyal-medya",
    "title": "Samsun: Yayla turizmi sosyal medya",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Yayla turizmi sosyal medya. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-balik-restorani-icerik",
    "title": "Samsun: Balık restoranı içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Balık restoranı içerik. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-kahve-dukkani-reels",
    "title": "Samsun: Kahve dükkanı Reels",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Kahve dükkanı Reels. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-klinik-randevu-lead",
    "title": "Samsun: Klinik randevu lead",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Klinik randevu lead. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-dis-klinigi-guven-icerigi",
    "title": "Samsun: Diş kliniği güven içeriği",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Diş kliniği güven içeriği. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-emlak-portfoy-vitrini",
    "title": "Samsun: Emlak portföy vitrini",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Emlak portföy vitrini. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-i-nsaat-proje-tanitimi",
    "title": "Samsun: İnşaat proje tanıtımı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: İnşaat proje tanıtımı. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-avukat-linkedin-icerik",
    "title": "Samsun: Avukat LinkedIn içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Avukat LinkedIn içerik. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-spor-salonu-uyelik-kampanyasi",
    "title": "Samsun: Spor salonu üyelik kampanyası",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Spor salonu üyelik kampanyası. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-ozel-okul-kayit-donemi",
    "title": "Samsun: Özel okul kayıt dönemi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Özel okul kayıt dönemi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-butik-urun-cekimi",
    "title": "Samsun: Butik ürün çekimi",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Butik ürün çekimi. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-eczane-bilgilendirici-icerik",
    "title": "Samsun: Eczane bilgilendirici içerik",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Eczane bilgilendirici içerik. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-oto-galeri-video-tur",
    "title": "Samsun: Oto galeri video tur",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Oto galeri video tur. Samsun işletmeleri için pratik rehber."
  },
  {
    "slug": "samsun-tur-acentesi-paket-tanitimi",
    "title": "Samsun: Tur acentesi paket tanıtımı",
    "category": "Rehber",
    "cluster": "Genel",
    "lead": "Samsun: Tur acentesi paket tanıtımı. Samsun işletmeleri için pratik rehber."
  }
];

export const BLOG_PLAN_TARGET = 150;
