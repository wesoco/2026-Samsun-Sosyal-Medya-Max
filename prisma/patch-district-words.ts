/**
 * 400 kelimenin altında kalan ilçelere anlamlı ek paragraf ekler.
 * page-cta div'in hemen öncesine yerleştirilir.
 *   npx tsx prisma/patch-district-words.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADDITIONS: Record<string, string> = {
  ayvacik: `
<h2>Yerel arama görünürlüğü ve Google profili</h2>
<p>Ayvacık'ta müşteri karar öncesinde sıklıkla Google'da işletme adını arar ya da haritadan konuma bakar. Google Benim İşletmem profilinin fotoğraf, çalışma saati ve telefon bilgisiyle eksiksiz doldurulması bu arama anında güven üretir. Instagram vitriniyle birlikte çalışan doğru bir yerel arama profili, görünürlüğü organik biçimde artırır. Wesoco bünyesinde sosyal medya yönetimiyle birlikte bu temel kurulum da sağlanır; müşteri bulmak için ayrıca reklam zorunlu değildir.</p>`,

  asarcik: `
<h2>Büyükşehir hattının dijital kaldıraç etkisi</h2>
<p>Asarcık, Samsun büyükşehir bölgesinin iç kesime açılan kapısında yer alır. Bu coğrafi konum reklam hedeflemesinde stratejik bir avantaj sunar: Samsun merkez kitlesiyle örtüşen alan, merkez ilçelere kıyasla çoğunlukla daha az rekabetli ve daha uygun maliyetli bir reklam ortamı anlamına gelir. Organik içerik güven zeminini kurarken düşük bütçeli reklam katmanı erişimi Canik ve İlkadım hattına kadar taşır. Bu kombinasyon küçük işletmeler için gerçek bir kaldıraç etkisi yaratır.</p>`,

  salipazari: `
<h2>Uzun vadeli güven inşası: birikim etkisi</h2>
<p>Salıpazarı'nda müşteri güveni tek bir paylaşımla değil, haftalar içinde biriken tutarlı içerikle oluşur. Her paylaşım küçük bir güven katkısıdır: bu hafta ürün detayı, gelecek hafta hizmet sahnesi, ardından müşteri sorusunun dürüst yanıtı. Bu birikim zamanla işletmeyi mahallede "tanınan ve güvenilen" bir marka haline getirir. Sosyal medya yönetiminin uzun vadeli etkisi bu birikimde yatar; anlık viral içerik değil, süreklilik değer üretir ve kalıcı müşteri bağı kurar.</p>`,

  "19-mayis": `
<h2>Tarım kimliğini dijitalde anlatmak</h2>
<p>19 Mayıs'ta tarım işletmeleri için dijital görünürlük yalnızca satış kanalı değil, ürünün hikâyesini anlatma fırsatıdır. Doğrudan tüketiciye ulaşmak isteyen üretici; hasadı, tarlayı ve ürünün mevsimselliğini paylaşarak güven ve sadık müşteri tabanı oluşturabilir. Bu anlatı hem yerel talebi hem de şehir merkezinden gelen bilinçli tüketici ilgisini çeker. Komşu Bafra ile birlikte batı ova tarım kimliği, özgün ve sürdürülebilir bir içerik zemini sunar.</p>`,

  kavak: `
<h2>Merzifon yolu ve geçiş kitlesinin değeri</h2>
<p>Kavak, Samsun-Merzifon karayolunun üzerinde konumlanması nedeniyle hem yerel müşteriye hem de hattan geçen kitleye ulaşma avantajına sahip. Google Haritalar'da doğru profil ve sosyal medyada aktif yayın bu geçiş kitlesini işletmeye yönlendirir. Yol güzergâhı konumu Meta Ads coğrafi hedeflemesinde de değerlendirilir: dar kuşakta yüksek alaka ve düşük tıklama maliyeti sağlanır.</p>`,

  alacam: `
<h2>Batı sahil rekabetinde ayrışma</h2>
<p>Alaçam, Yakakent ve Bafra komşuluğuyla yazlık sezon müşterisi için doğrudan rekabet eden bir sahil ilçesidir. Aynı kıyıyı paylaşan tesisler arasında fark yaratan unsur özgün atmosfer içeriği, dürüst anlatım ve tutarlı vitrindir. Şablon görsel ve standart kampanya dili bu rekabette hızla geride kalır; işletmenin gerçek sahnesini öne çıkarmak en güçlü ayrışma aracıdır.</p>`,

  vezirkopru: `
<h2>Bölgesel kimlik ve coğrafi içerik avantajı</h2>
<p>Vezirköprü ormanları ve tahıl tarımı ilçeye özgün bir dijital anlatım zemini sunar. Orman ürünleri, mobilya veya tarım işletmeleri için bu bölgesel kimliği kullanan içerik hem yerel hem de şehir içinden organik ilgi çeker. Coğrafi işaret veya yöresel üretim hikâyesi arama motorlarında bölgesel niyete karşılık verir; stok görsel hiçbir zaman bu güveni üretemez.</p>`,

  terme: `
<h2>Pazar günleri ve anlık içerik ritmi</h2>
<p>Terme'nin düzenli pazar geleneği sosyal medya için doğal bir içerik ritmi sunar: pazar sabahı taze ürün duyurusu, akşam değerlendirmesi, hafta içi hazırlık sahneleri. Bu ritmi takip eden hesaplar hem düzenli hem de anlık kitleyi kazanır; "bu işletme aktif ve güncel" mesajı sürekli verilmiş olur. Pazar esnafı için bu döngüyü destekleyen hızlı story içeriği oluşturmak en verimli yayın yöntemidir.</p>`,

  carsamba: `
<h2>Karma ekonominin dijital fırsatı</h2>
<p>Çarşamba'daki ekonomik çeşitlilik — tarım, sanayi, lojistik ve ticaret — her sektörün birbiriyle doğrudan rekabet etmeden büyüyebileceği bir ortam yaratır. Doğru sektör anlatımı ve hedefleme bu avantajı dijitale taşır. Havalimanı bölgesindeki kurumsal müşteri segmenti içerik dilini biraz daha resmi tutmayı gerektirirken yerel esnaf içinse samimi, özgün ve sade anlatım önceliklidir.</p>`,

  tekkekoy: `
<h2>B2B içerikte güven sinyalleri ne işe yarar?</h2>
<p>Tekkeköy'de sanayi firmalarının sosyal medya başarısı büyük bütçeli reklama değil, güven sinyallerine dayanır. Teslim edilmiş projeler, kalite belgeleri, saha ekibi ve gerçek referanslar — bu içerikler karar vericinin zihninde uzun vadeli yer edinir. Karar süreci uzun olan B2B sektöründe düzenli içerik birikimi; rakiplerden önce akılda kalmanın en güçlü yoludur.</p>`,

  yakakent: `
<h2>Sezon öncesi hazırlık neden ayrışma yaratır?</h2>
<p>Yakakent'te batı sahil kuşağındaki rekabette öne çıkmanın yolu hazırlıktan geçer. Alaçam ve Bafra'nın komşu baskısında özgün sahil atmosferi, samimi mekan sahneleri ve erken rezervasyon kampanyası fark yaratır. Sezon başında hâlâ içerik üretenler ile sezon öncesinde stoğu hazır olanlar arasındaki kalite farkı müşteri kararını doğrudan etkiler.</p>`,

  havza: `
<h2>Termal turizm geleneğinin marka değeri</h2>
<p>Havza kaplıcaları yüzyıllık bir termal turizm geleneğine sahip. Bu tarihi miras konaklama işletmelerine jenerik rakiplerinden ayrışabileceği güçlü bir anlatım altyapısı sunar. Kaplıcanın geçmişini ve tesisin günümüz konforunu bir arada aktaran içerik hem yerel güveni pekiştirir hem de şehirden gelen ziyaretçiye doğru beklentiyi kurar.</p>`,

  ladik: `
<h2>Göl, yayla ve termal üçgeni</h2>
<p>Ladik Gölü, çevre yaylaları ve Havza kaplıcalarına yakın konumu bir arada düşünüldüğünde ilçe; doğa, dinlenme ve termal deneyimi iç içe sunan nadir destinasyonlardan biridir. Bu üçlü anlatımı kullanan konaklama işletmeleri tek başına göl veya yalnızca yayla anlatımından çok daha geniş bir kitleye hitap eder. İçerik planı bu zenginliği sezona göre vurgular.</p>`,
};

async function main() {
  let updated = 0;

  for (const [slug, addition] of Object.entries(ADDITIONS)) {
    const district = await prisma.district.findUnique({ where: { slug } });
    if (!district?.bodyHtml) {
      console.warn(`⚠  Not found or empty bodyHtml: ${slug}`);
      continue;
    }

    const marker = '<div class="page-cta">';
    if (!district.bodyHtml.includes(marker)) {
      console.warn(`⚠  No page-cta marker in: ${slug}`);
      continue;
    }

    // Idempotency: h2 başlığı zaten varsa tekrar ekleme
    const firstH2 = addition.match(/<h2>[^<]+<\/h2>/)?.[0] ?? "";
    const firstSentence = addition.match(/<p>[^.]{10,}/)?.[0] ?? "";
    const alreadyPatched =
      (firstH2 && district.bodyHtml.includes(firstH2)) ||
      (firstSentence && district.bodyHtml.includes(firstSentence));
    if (alreadyPatched) {
      console.log(`  Already patched: ${slug}`);
      continue;
    }

    const newBody = district.bodyHtml.replace(
      marker,
      `${addition}\n\n${marker}`
    );

    await prisma.district.update({
      where: { slug },
      data: { bodyHtml: newBody },
    });

    const wordCount = newBody
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;

    console.log(`✓  ${slug.padEnd(14)} words~ ${wordCount}`);
    updated++;
  }

  console.log(`\nPatched: ${updated}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
