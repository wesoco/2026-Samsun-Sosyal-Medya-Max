/**
 * Satın alma niyeti SSS - üst sıraya alır, eksikleri ekler.
 *   npm run db:seed-purchase-faqs
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Sosyal medya yönetimi ücreti / aylık fiyat ne kadar?",
    answer:
      "Sabit tek fiyat yok; ücret sektör, platform sayısı, içerik planı derinliği, yerinde çekim ve reklam yönetimine göre değişir. Keşif sonrası markanıza özel net teklif sunuyoruz. Medya (reklam) harcaması ajans ücretinden ayrıdır.",
  },
  {
    question: "Ayda kaç paylaşım / post / reels yapılır?",
    answer:
      "Sabit şablon kota dayatmıyoruz. Restoran ile klinik, otel ile perakende aynı tempoda konuşmaz. Keşifte sektörünüze ve hedeflerinize göre aylık feed, story ve reels ritmi yazılı teklifte sabitlenir.",
  },
  {
    question: "Sosyal medya yönetimine neler dahil, neler hariç?",
    answer:
      "Dahil: sektöre özel strateji, içerik takvimi, tasarım/kurgu, yayınlama, topluluk yanıtları, aylık rapor. Yerinde çekim günü ve Meta/Google Ads yönetimi eklenebilir. Hariç: reklam medya bütçesi, üçüncü parti stok lisansları (gerekirse), baskı/outdoor üretim.",
  },
  {
    question: "Hazır paket mi sunuyorsunuz, yoksa markaya özel mi çalışıyorsunuz?",
    answer:
      "Markaya ve sektöre özel çalışıyoruz. Şablon “Başlangıç / Büyüme” listesi dayatılmaz. İçerik dili, kanal seçimi, onay hattı ve ölçüm çerçevesi keşifte markanıza göre kurulur; kapsam yazılı teklifte netleşir.",
  },
  {
    question: "İçerik planı sektöre göre nasıl değişir?",
    answer:
      "Restoran’da menü, story temposu ve rezervasyon; klinikte güven ve randevu yolu; otelde sezon ve deneyim; otomotivde lansman ve showroom çağrısı öne çıkar. Aynı şablon herkese basılmaz. Keşifte sektörünüze özel takvim, dil ve başarı sinyalleri (mesaj, arama, rezervasyon vb.) birlikte yazılır.",
  },
  {
    question: "Meta Ads reklam bütçesi ajans ücretine dahil mi?",
    answer:
      "Hayır. Ajans ücreti ile Meta Ads medya bütçesi ayrıdır. Bütçeyi hedeflerinize göre birlikte planlarız; her kuruşun nereye gittiğini raporlarız.",
  },
  {
    question: "Reels içerik üretimi hizmete dahil mi?",
    answer:
      "Çoğu yönetim kapsamında aylık reels ritmi planlanır. Kota dışı ek çekim ve kurgu ihtiyaçlarında ayrı üretim planı çıkarırız; teklifte satır satır görünür.",
  },
  {
    question: "Profesyonel fotoğraf ve video çekimi yapılıyor mu? Yerinde mi?",
    answer:
      "Evet. Trabzon genelinde yerinde çekim planlanabilir. Uzaktan yönetim isteyen markalar için mevcut görseller + tasarım odaklı üretim de mümkündür.",
  },
  {
    question: "Sözleşme süresi ne kadar?",
    answer:
      "Standart sözleşme süremiz 12 aydır. İlk ay içinde cayma hakkınız vardır; bu dönemde strateji oturur ve devam kararı birlikte netleşir.",
  },
  {
    question: "Sonuçları nasıl raporluyorsunuz?",
    answer:
      "Aylık performans raporu standarttır: erişim, etkileşim, takipçi, mesaj/arama, reklam sonuçları ve sonraki ay üç net aksiyon. İsterseniz ara dönem özetleri de paylaşırız.",
  },
  {
    question: "Ücretsiz keşif görüşmesi var mı? WhatsApp’tan yazabilir miyim?",
    answer:
      "Evet. Formu doldurun veya WhatsApp’tan yazın. Mevcut hesaplarınıza bakıp size özel yol haritası önerelim; 24 saat içinde dönüş hedeflenir.",
  },
  {
    question: "Trabzon'da en iyi sosyal medya ajansı hangisi?",
    answer:
      "“En iyi” sektör ve ihtiyaca göre değişir. Trabzon Sosyal Medya (Wesoco), yerel işletmelere Instagram, içerik, Meta Ads ve raporlamayı tek çatıda sunar. Karar için sektöre özel yaklaşım, referanslar ve keşif teklifini karşılaştırmanızı öneririz.",
  },
  {
    question: "Trabzon Sosyal Medya hangi ilçelerde hizmet verir?",
    answer:
      "Ortahisar, Akçaabat, Of, Yomra, Araklı, Sürmene, Arsin, Vakfıkebir, Beşikdüzü, Maçka, Çaykara, Tonya, Çarşıbaşı, Şalpazarı, Düzköy, Hayrat, Dernekpazarı ve Köprübaşı. Uzaktan yönetim veya yerinde çekim seçenekleri mevcuttur.",
  },
  {
    question: "Hangi sektörlerle çalışıyorsunuz?",
    answer:
      "Restoran/kafe, klinik/güzellik, otel/turizm, otomotiv, inşaat/emlak, perakende, B2B/OSB ve yerel hizmet işletmeleri. Sektöre özel dil ve örnek vakalar için sektör sayfalarımıza bakın.",
  },
  {
    question: "Neden sizi tercih etmeliyim? Freelance yerine ajans mı?",
    answer:
      "Ajans modelinde strateji, üretim, yayın ve reklam aynı çatıda; yedek ekip ve yazılı süreç vardır. Freelance tek kişiye bağlı kalabilir. Bizde onay hattı, aylık skor ve medya şeffaflığı standarttır. keşifte farkı somutlaştırırız.",
  },
  {
    question: "İçerikleri kim hazırlıyor?",
    answer:
      "İçerik stratejisi ve üretimi Wesoco bünyesindeki Trabzon Sosyal Medya ekibi tarafından hazırlanır. Taslaklar onayınıza sunulur; onaydan sonra yayınlanır. Marka diliniz yazılı brief ile korunur.",
  },
  {
    question: "Sosyal medya yönetimi satışları artırır mı?",
    answer:
      "Doğru CTA, tutarlı vitrin ve gerektiğinde reklam ile mesaj, arama ve mağaza trafiği artabilir. Garanti edilen “satış yüzdesi” vaat etmeyiz; ölçülebilir hedefler (mesaj, form, rezervasyon) keşifte birlikte yazılır.",
  },
  {
    question: "Trabzon'da Instagram yönetimi nasıl yapılır?",
    answer:
      "Keşif görüşmesiyle başlanır. Hedef kitle ve rakip analizi sonrası içerik takvimi oluşturulur. Post, story ve reels üretilir; yayınlama, etkileşim ve gerekirse Meta Ads yönetilir. Aylık performans raporu paylaşılır.",
  },
  {
    question: "Hangi sosyal medya platformlarında çalışıyorsunuz?",
    answer:
      "Instagram, Facebook, TikTok ve LinkedIn. Markanıza en uygun kanalları birlikte seçiyoruz; her platforma özel içerik üretiriz.",
  },
  {
    question: "Sosyal medya yönetiminde ne kadar sürede sonuç görülür?",
    answer:
      "Organik büyüme genelde 4 ile 8 hafta arasında hissedilir. Meta Ads kampanyalarında ilk haftadan itibaren veri ve optimizasyon başlar. Süre sektör ve rekabete göre değişir.",
  },
  {
    question: "Trabzon'da TikTok yönetimi yapıyor musunuz?",
    answer:
      "Evet. TikTok için kısa video stratejisi, içerik takvimi, yayınlama ve trend takibi sunuyoruz. Instagram Reels ile koordineli büyüme hedefleriz.",
  },
  {
    question: "Küçük işletmeler için sosyal medya yönetimi var mı?",
    answer:
      "Evet. Restoran, kafe, klinik, mağaza ve yerel hizmet işletmeleri için ölçeğe uygun, sektöre özel planla başlanır. Büyüdükçe kanal ve tempo birlikte artırılır.",
  },
  {
    question: "İçerik onayı nasıl işliyor?",
    answer:
      "Takvim ve taslaklar size sunulur. Onayınızdan sonra yayınlanır. Acil içeriklerde hızlı onay hattı (WhatsApp) kurarız; marka diliniz korunur.",
  },
  {
    question: "Rakip analizi hizmete dahil mi?",
    answer:
      "Keşif ve strateji aşamasında rakip ve sektör taraması yapılır. Konumlanma, içerik frekansı ve reklam yaklaşımı bu analize göre şekillenir.",
  },
  {
    question: "LinkedIn yönetimi de yapıyor musunuz?",
    answer:
      "Evet. Özellikle B2B, inşaat, sanayi ve kurumsal markalar için LinkedIn içerik ve etkileşim yönetimi sunuyoruz.",
  },
  {
    question: "Kriz anında destek veriyor musunuz?",
    answer:
      "Evet. Olumsuz yorum, yanlış anlaşılma veya acil iletişim durumlarında hızlı müdahale ve itibar yönetimi desteği sunuyoruz.",
  },
];

async function main() {
  await prisma.faqItem.deleteMany();
  await prisma.faqItem.createMany({
    data: FAQS.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      sortOrder: i + 1,
      published: true,
    })),
  });
  console.log(`Seeded ${FAQS.length} purchase-intent FAQs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
