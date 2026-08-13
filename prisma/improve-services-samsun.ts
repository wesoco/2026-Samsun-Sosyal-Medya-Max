/**
 * Her hizmet sayfasına "Samsun'da bu hizmet nasıl uygulanır?" bölümü ekler.
 * bodyHtml'de bölüm yoksa appends; varsa geçirir.
 * npm run db:improve-services
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SECTION_MARKER = "Samsun'da bu hizmet nasıl uygulanır?";

const SAMSUN_SECTIONS: Record<string, { section: string; newLead?: string }> = {
  "sosyal-medya-yonetimi": {
    newLead:
      "Samsun sosyal medya yönetimi; Instagram, Facebook ve gerektiğinde TikTok'ta içerik takvimi, yayın, topluluk yanıtları ve aylık skor kartını tek operasyonda birleştirir. Amaç beğeni değil; mesaj, randevu ve mağaza ziyareti gibi ölçülebilir temas.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>İlkadım'da faaliyet gösteren bir klinik ile Atakum'daki bir restoran aynı sosyal medya yönetim çerçevesini paylaşır ama içerik ritmi ve dil tonu tamamen ayrışır. İlkadım kliniği için içerik; uzmanlık, randevu yolu ve güven sinyali üzerine kurulur. Sabah story'si klinik saatlerini gösterir, haftanın iki-üç gönderisi bir prosedürü veya uzmanlık alanını açıklar, reels ise doktor veya uzmanın yüzüyle güven oluşturur.</p>
<p>Atakum'daki bir restoran ise farklı bir ritimle çalışır: öğle öncesi yemek görseli, akşam menü duyurusu ve hafta sonu "bugün masa doldu, yer kaldı mı?" story'si anlık karar alma sürecini destekler. Sezon menüsü değiştiğinde yeni çekim stoğu hazırlanır, tatil dönemlerinde rezervasyon CTA'sı öne çıkar. Her iki durumda da onay hattı hafta başı taslak → işletme onayı → yayın şeklinde net işler; son dakika "bir şey atsanıza" talebi devre dışı kalır.</p>
<p>Uzaktan yönetim Bafra'dan Terme'ye tüm Samsun ilçelerinde aynı standartla yürür. Yerinde çekim günü gereken ilçelerde ekip planlanarak gider; seyahat saatini değil, çekim kalitesini ön plana alırız. 17 ilçenin her birinde mahalle rekabetini ve sezon dinamiklerini bilen bir ekip olmasının farkı aylık raporlara yansır.</p>
`,
  },

  "sosyal-medya-ajansi": {
    newLead:
      "Samsun sosyal medya ajansı arayan markalar için Wesoco bünyesinde yerel ortaklık: strateji, üretim, reklam ve rapor tek çatıda. Bu sayfa «neden ajans?» sorusunu cevaplar; günlük paket kotası ayrı üründür.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Samsun'da sosyal medya ajansı seçimi çoğu zaman "en ucuz kim?" sorusuna indirgenir. Oysa kritik soru şudur: hangi ajans Samsun'un 17 ilçesini gerçekten tanıyor, sözleşmeyi şeffaf yazıyor ve reklam medya bütçesini kendi faturasına gömmüyor? Wesoco bu çerçeveyi İlkadım ofisinden yürütür; uzaktan operasyon ve planlı yerinde çekim günleri birlikte planlanır.</p>
<p>Ajans ilişkisi birkaç ay sonra değil, keşif görüşmesinden itibaren netleşmeli. Hangi sektörde, hangi ilçede, hangi hedefle çalışıyorsunuz? Canik'te açılan yeni bir eğitim kurumu ile Tekkeköy'deki köklü bir endüstriyel tedarikçi aynı ajans ürününü kullanabilir ama stratejileri bambaşkadır. Wesoco her keşifte ürün seçimini birlikte yapar: kimi için yalnızca içerik yönetimi yetiyorken kimi için Meta Ads + Google Ads + çekim kombinasyonu gerekir.</p>
<p>Samsun genelinde 17 ilçede aktif müşteri profiliyle sezon takvimi, bayram hazırlığı ve yerel rakip hareketleri büyük şehir kalıplarıyla değil, yerel gözlemle okunur. Bafra ilçesindeki turizm işletmesi ile Havza'daki termal otel aynı ayda farklı içerik setine ihtiyaç duyar. Bu dinamiği görmek; şablondan değil, Samsun'u bilerek strateji üretmekten geçer.</p>
`,
  },

  "instagram-yonetimi": {
    newLead:
      "Samsun Instagram yönetimi; grid düzeni, story ritmi ve reels stratejisini tek tutarlı operasyonda birleştirir. Hedef beğeni sayısı değil, profil ziyareti, mesaj ve randevu gibi gerçek temas.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Samsun Instagram yönetiminde grid estetiği, ilk izlenimi belirler. Atakum'da sahil temalı bir otel için mavi-beyaz, doğal ton bir grid; İlkadım'daki modern bir güzellik merkezinde temiz, minimalist bir tasarım dili kullanılır. Her işletmenin grid'i, profil ziyaretçisine 3 saniyede "buraya güvenebilir miyim?" sorusunun yanıtını vermelidir.</p>
<p>Story ritmi günlük temas sağlar. Samsun'daki bir güzellik merkezi için sabah "bugün açığız" story'si, öğlen "bu haftanın öne çıkan hizmeti" ve akşam "randevu için DM" akışı, takipçiyi alıcıya dönüştüren yolculuğu tamamlar. Canik'teki bir spa merkezi için ise hafta sonu "sınırlı slot" story'si doluluk oranını doğrudan etkiler. Hazır şablon değil, sektöre ve ilçeye özgü ritim çalışır.</p>
<p>Reels ise keşfet algoritmasının kapısıdır. Atakum kumsalındaki bir kafe için "gün batımı kahvesi" reels'i binlerce görüntülemeye ulaşabilir çünkü hem yerel hem evrensel bir deneyimi gösterir. İlkadım'daki bir butik için "bu sezon en çok satan parça" reels'i ise doğrudan satın alma niyetiyle izlenir. İki format, iki farklı hedef: biri keşif, diğeri dönüşüm.</p>
`,
  },

  "meta-ads": {
    newLead:
      "Samsun Meta Ads yönetimi; İlkadım, Atakum, Canik ve tüm ilçelerde mahalle bazlı hedefleme, test edilen kreatifler ve dönüşüm odaklı kampanya yapısıyla çalışır. Medya bütçesi ayrı satırda; şeffaf raporlama standarttır.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Samsun'da Meta Ads hedeflemesi coğrafi kesinliğe dayanır. İlkadım'da açılan yeni bir klinik için reklam kitlesi; İlkadım merkezi, Kale Mahallesi ve komşu semtleri kapsayan 2-3 km'lik bir yarıçapla kurulur. "Samsun geneli" hedefleme marka bilinirliği için işe yarayabilir ama randevu ve müşteri kazanımı hedefinde bütçeyi seyrekleştirir. Atakum'daki bir restoran için ise sahil aksı boyunca akşam saatlerinde gösterilen "bugün masa var" reklamı, anlık masa doldurma için güçlü bir araçtır.</p>
<p>Canik ve Tekkeköy gibi gelişmekte olan ilçelerde rekabetin henüz tam oturmadığı sektörlerde Meta Ads erken avantaj sağlar. Tıklama başı maliyet, merkez ilçelere göre daha düşük olabilir; bu fırsatı gören işletmeler marka bilinirliğini düşük bütçeyle kurabilir. İlk 2 hafta veri toplama, 3. haftada kazanan kreatifi ölçeklendirme standart yaklaşımımızdır.</p>
<p>Reklam, organik içerik yoksa tek başına çalışmaz: ziyaretçi profil sayfasına geçtiğinde boş veya dağınık bir hesap görürse reklamın getirdiği ilgiyi heba eder. Bu yüzden Meta Ads'i her zaman aktif bir Instagram ve Facebook hesabıyla birlikte yürütür, gerektiğinde sosyal medya yönetimi ile paketleriz.</p>
`,
  },

  "google-ads": {
    newLead:
      "Samsun Google Ads yönetimi; aktif arama niyetini yakalayan, dönüşüm izlemeli ve anahtar kelime optimize kampanyalar kurar. Marka aramalarından yerel hizmet aramalarına kadar niyetli trafiği işletmeye yönlendirir.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Google'da "Samsun diş klinikleri", "İlkadım'da kafe" veya "Atakum inşaat şirketi" arayan biri aktif bir niyetle klavyeye bakmıştır. Meta Ads'teki keşif davranışından farklıdır; bu kişi zaten karar vermiş, seçenekleri karşılaştırıyor demektir. Google Ads tam bu anda devreye girer: doğru anahtar kelime, net bir başlık ve "hemen ara" veya "teklif al" gibi bir CTA ile sorguyu işletmeye yönlendirir.</p>
<p>Samsun merkezindeki yoğun rekabetli sektörlerde (klinik, avukatlık, emlak) tıklama başı maliyetler daha yüksektir. Bu durumda anahtar kelime negatif listesi, coğrafi daraltma ve gün/saat bazlı teklif stratejisi verimliliği artırır. Bafra veya Çarşamba gibi ilçelerde ise aynı sektörde rekabet daha seyrek olduğundan düşük bütçeyle görünür olmak mümkündür; bu ilçelerde bölgeye özel kampanya ayrı kurulur.</p>
<p>Dönüşüm izleme kurulmadan Google Ads optimizasyonu körü körüne yürür. "Kaç kişi aradı?", "hangi kelimeden form geldi?" soruları ancak Google Tag Manager + Ads dönüşüm aksiyonu düzgün kurulunca yanıt bulur. Biz kampanya açmadan önce bu altyapıyı mutlaka kurar; var olup olmadığını keşifte kontrol ederiz.</p>
`,
  },

  "reklam-ajansi": {
    newLead:
      "Samsun reklam ajansı hizmeti; Meta Ads, Google Ads ve içerik üretimini tek strateji altında birleştirerek marka bilinirliğini ve dönüşümü aynı anda büyütür. Wesoco ile ajans ilişkisi şeffaf kapsam, ayrı medya bütçesi ve aylık skor üzerine kurulur.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Gerçek anlamda bir reklam ajansı ilişkisi Meta ve Google'ı ayrı silolar olarak değil, birbirini tamamlayan kanallar olarak yönetir. Samsun'da bunun pratik karşılığı şudur: Instagram'da Atakum sahil şeridindeki bir otele yönelik ilgi yaratma reklamı çalışırken, Google Ads aynı oteli "Samsun otel rezervasyon" sorgusunda yakalar. Meta keşif yolunu açar, Google niyetli aramayı dönüşüme taşır. İki kanal, iki farklı rol, tek strateji.</p>
<p>Tekkeköy'deki bir sanayi işletmesi için tablo farklıdır: görsel sosyal medya içeriğinin önemi daha düşük, Google Ads'teki "tedarikçi" ve "toptan" arama niyeti ise çok daha değerlidir. LinkedIn kurumsal içeriğiyle birleşince karar alıcıya birden fazla dokunuş noktasından ulaşılır. İlkadım'daki perakende mağaza ise tam tersine Instagram reels + Meta retargeting ile çalışır; Google Ads yalnızca marka kelimesinde devreye girer.</p>
<p>Reklam ajansı ilişkisinin şeffaflığı, medya bütçesinin nereye gittiğinin her ay yazılı görülmesiyle ölçülür. Wesoco'da reklam harcaması her zaman müşteri hesabında kalır, ajans yönetim ücreti ayrı satırda faturalanır. "Reklama harcadık ama nasıl kullandılar bilmiyorum" sorusu burada geçersizdir.</p>
`,
  },

  "icerik-uretimi-cekim": {
    newLead:
      "Samsun içerik üretimi ve çekim hizmeti; fotoğraf, video ve reels'i işletmenin kendi mekanında, gerçek atmosferle üretir. Stok görüntü değil, Samsun'a özgü özgün içerik.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>İçerik üretiminde "yerinde çekim" farkı en çok restoranlar ve kafeler için hissedilir. Müşterinin kendi tabağını çektiği bulanık telefon fotoğrafı yerine profesyonel gıda fotoğrafı; İlkadım'daki bir restoranın sosyal medya performansını doğrudan etkiler. Sabah erken saatte, yemek hazır ve ışık doğal haldeyken gerçekleştirilen çekim, hem içerik kalitesini hem çekim verimliliğini en üst noktaya taşır.</p>
<p>Atakum'daki güzellik merkezleri için çekim günü genellikle ekibin mekanın aydınlatmasını kontrol etmesiyle başlar; doğal ışık varsa pencere önü, yoksa taşınabilir ekipman kullanılır. Uygulama süreçleri, ürün yakın çekimleri ve ekip portreleri tek gün içinde tamamlanır, böylece birkaç aylık içerik stoğu elde edilir. Aynı gün hem fotoğraf hem reels formatları çekilir; post-prodüksiyon sonrasında editöryal içerik teslim edilir.</p>
<p>Çekim planlaması; içerik takviminden geriye doğru yapılır. Ocak ortasında çekilen kış menüsü, Şubat'ta yayınlanacak içerik setini oluşturur. Yazın Tekkeköy veya Bafra gibi ilçelerde açık hava çekimleri için yaz sezonuna üç-dört hafta kala stok hazırlanır. Son güne bırakılan içerik hem kaliteden hem hızdan taviz verir; biz sezon öncesi planlı çekim takvimini önerip uygularız.</p>
`,
  },

  "drone-cekimi": {
    newLead:
      "Samsun drone çekimi hizmeti; inşaat proje takibinden otel ve turizm tanıtımına, kıyı manzarasından sanayi tesisi belgelemeye kadar kuşbakışı görsel içerik üretir. Hava sahası izinli ve sigortalı operasyon.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Tekkeköy ve çevresindeki inşaat projeleri için drone çekimi iki işlev taşır: hem proje ilerlemesinin belgelenmesi hem de potansiyel alıcıya veya iş ortağına gösterilecek tanıtım materyali. Şantiye genelinde haftalık veya aylık periyotlarla gerçekleştirilen çekimler; projenin fiziksel büyümesini, tamamlanan aşamaları ve çevre altyapısıyla ilişkisini netleştirir. Bu içerik hem sosyal medyada hem kurumsal sunumlarda değer taşır.</p>
<p>Ladik, Havza ve çevresi için drone çekimi turizm amaçlıdır: doğal peyzaj, göl manzarası ve kaplıca tesislerinin çevresindeki orman dokusu, yalnızca zemin seviyesinden asla yakalanamayacak görseller sunar. Bir termal otelin "bizi ziyaret edin" kampanyası için çekilen kuşbakışı görüntü, sezon öncesinde sosyal medya reklamına entegre edildiğinde erişim ve tıklama oranlarını belirgin biçimde artırır. Bölgenin coğrafi zenginliği; ancak havadan fotoğraflanınca tam değerine ulaşır.</p>
<p>Sahil şeridindeki otel ve tatil köyleri için Atakum, Canik ve Bafra kıyısında gün batımı saatlerinde gerçekleştirilen drone çekimleri, tesis tanıtımının en güçlü görsel materyalini oluşturur. Zemin fotoğrafının asla veremeyeceği ölçek ve bağlam hissi, "neden bu oteli seçmeliyim?" sorusunu görsel dille yanıtlar. Havadan çekim izinleri, yerel uçuş düzenlemeleriyle uyumlu olarak alınır; sigortalı operasyon standarttır.</p>
`,
  },

  "dijital-pazarlama-ajansi": {
    newLead:
      "Samsun dijital pazarlama ajansı olarak Wesoco; SEO, sosyal medya, reklam ve içeriği tek strateji altında birleştirir. Omni-kanal yaklaşımla her temas noktasında marka tutarlılığı ve ölçülebilir büyüme.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Dijital pazarlama; birden fazla kanalın tek strateji altında çalıştırılmasıdır. Samsun'da bunun pratik anlamı şudur: organik Instagram içeriği marka bilinirliğini besler, Meta Ads retargeting bu kitleyi sıcak müşteriye dönüştürür, Google Ads ise arama niyetini anında karşılar. Üçü birlikte çalışmadığında "Instagram'dan çok beğeni geliyor ama satış yok" veya "Google'a reklam veriyoruz ama pahalı" şikayetlerine düşülür. Omni-kanal yaklaşım tam bu boşluğu kapatır.</p>
<p>İlkadım ve Atakum gibi merkezi ilçelerde dijital rekabet en yoğun haldedir; reklam maliyetleri yüksek, organik erişim rekabetli. Bu ilçelerdeki bir işletme için uzun vadeli organik SEO + orta vadeli Meta reklamı + kısa vadeli Google Ads kombinasyonu oluşturup her birini farklı zaman dilimine çözüm üretecek şekilde konumlandırırız. Havza veya Vezirköprü gibi ilçelerde ise rekabet daha seyrek; düşük bütçeyle dominant pozisyon kurmak mümkündür.</p>
<p>Dijital pazarlamanın omni-kanal boyutu yalnızca reklam platformlarını kapsamaz: web sitesi kullanıcı deneyimi, Google Benim İşletmem, e-posta veya WhatsApp otomasyonu ve içerik SEO da aynı strateji çatısı altında değerlendirilir. Samsun'da gerçekten büyümek isteyen işletme için "tek kanal" yeterli değildir; ancak "her şeyi aynı anda" da sürdürülebilir değildir. Başlangıç noktası ve büyüme yolu keşif görüşmesinde birlikte çizilir.</p>
`,
  },

  "kurumsal-sosyal-medya-yonetimi": {
    newLead:
      "Samsun kurumsal sosyal medya yönetimi; çok katmanlı onay hattı, kriz protokolü ve LinkedIn ile Instagram'ı birlikte kurgulayan B2B odaklı bir operasyon modelidir. Tekkeköy sanayi bölgesinden İlkadım finans kuruluşlarına kadar kurumsal dili koruyarak büyütür.",
    section: `
<h2>Samsun'da bu hizmet nasıl uygulanır?</h2>
<p>Tekkeköy'deki sanayi kuruluşları ve B2B hizmet şirketleri için kurumsal sosyal medyada LinkedIn omurgası önceliklidir. Tedarikçi ilişkileri, ihale süreçleri ve kurumsal ortaklıklar LinkedIn'de güven zeminine dayanır. Şirket sayfasından paylaşılan proje haberleri, mühendislik uzmanlığını öne çıkaran yazılar ve yönetim ekibinin bireysel gönderileri; karar alıcı profilini çeker. "Tekkeköy'de kim çalışıyor?" sorusuna verilen dijital yanıt, iş geliştirme sürecini hızlandırır.</p>
<p>İlkadım'daki bir finans kuruluşu veya hukuk bürosu için sosyal medya dili son derece dikkatli çizilmeli. Yanlış bir paylaşım veya teyit edilmemiş bir bilgi, kurumsal itibar açısından uzun süre zararlı kalabilir. Çok katmanlı onay hattı bu riski bertaraf eder: içerik → avukat veya compliance incelemesi → yönetici onayı → yayın. Onay kademe sayısı kuruma göre belirlenir; sistem esnektir.</p>
<p>LinkedIn ile Instagram bir arada yönetildiğinde sinerji ortaya çıkar: Instagram'daki "mekan ve ekip" görselleri insani boyutu gösterirken LinkedIn'deki "proje ve uzmanlık" içerikleri kurumsal güveni pekiştirir. Kanik veya Atakum'da kurulan yeni bir ofis için iki platform birden devreye girerek hem B2C hem B2B kitleye eş zamanlı ulaşılabilir. Kriz anında ise önceden yazılmış protokol; panik değil, kontrollü iletişim sağlar.</p>
`,
  },
};

async function improveOne(slug: string, data: { section: string; newLead?: string }) {
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) {
    console.log(`⚠ Service not found: ${slug}`);
    return "not-found";
  }

  const alreadyHasSection = service.bodyHtml?.includes(SECTION_MARKER) ?? false;
  if (alreadyHasSection) {
    console.log(`⏭ Skipped (already has section): ${slug}`);
    return "skipped";
  }

  const newBody = (service.bodyHtml ?? "") + "\n" + data.section.trim();
  const updateData: { bodyHtml: string; lead?: string } = { bodyHtml: newBody };
  if (data.newLead && service.lead !== data.newLead) {
    const leadIsGeneric =
      !service.lead || service.lead.length < 80 || service.lead.includes("pratik rehber");
    if (leadIsGeneric) {
      updateData.lead = data.newLead;
    }
  }

  await prisma.service.update({ where: { slug }, data: updateData });
  console.log(`✓ Updated: ${slug}`);
  return "updated";
}

async function main() {
  const slugs = Object.keys(SAMSUN_SECTIONS);
  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const slug of slugs) {
    const result = await improveOne(slug, SAMSUN_SECTIONS[slug]);
    if (result === "updated") updated++;
    else if (result === "skipped") skipped++;
    else notFound++;
  }

  console.log(JSON.stringify({ updated, skipped, notFound }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
