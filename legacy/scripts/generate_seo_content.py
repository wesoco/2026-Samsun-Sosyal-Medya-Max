#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate SEO blogs, hizmet landings, and enriched district pages."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WA = "https://wa.me/905380581122"
WA_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
WA_FLOAT = WA_ICON.replace('width="16" height="16"', 'width="28" height="28"')

DISTRICTS = [
    ("ortahisar", "Ortahisar", "Trabzon merkez", "perakende, otomotiv, klinik, restoran ve kurumsal ofisler", "Gazipaşa, Kemerkaya, Soğuksu ve merkez çarşı hattı", "Akçaabat ve Yomra"),
    ("akcaabat", "Akçaabat", "Batı koridoru", "restoran, kafe, turizm ve yerel üretim", "Söğütlü, Darıca ve sahil hattı", "Ortahisar ve Çarşıbaşı"),
    ("yomra", "Yomra", "Doğu koridoru", "inşaat, konut, kafe ve hizmet işletmeleri", "Kaşüstü ve yeni yerleşim alanları", "Ortahisar ve Arsin"),
    ("of", "Of", "Doğu sahil", "turizm, restoran, tarım ve yerel ticaret", "merkez ve sahil işletmeleri", "Sürmene ve Çaykara"),
    ("arakli", "Araklı", "Doğu sahil", "esnaf, restoran ve hizmet işletmeleri", "merkez çarşı ve sahil", "Sürmene ve Of"),
    ("surmene", "Sürmene", "Doğu sahil", "balıkçılık, turizm ve yerel ticaret", "merkez ve kıyı işletmeleri", "Araklı ve Of"),
    ("arsin", "Arsin", "Doğu koridoru", "sanayi, lojistik ve yerel hizmetler", "OSB çevresi ve merkez", "Yomra ve Araklı"),
    ("vakfikebir", "Vakfıkebir", "Batı sahil", "gıda, turizm ve yerel markalar", "merkez ve sahil", "Beşikdüzü ve Çarşıbaşı"),
    ("besikduzu", "Beşikdüzü", "Batı sahil", "turizm, konaklama ve restoran", "sahil ve merkez", "Vakfıkebir ve Şalpazarı"),
    ("macka", "Maçka", "Yayla ve turizm", "otel, restoran ve turizm işletmeleri", "Uzungöl güzergâhı ve merkez", "Ortahisar ve Çaykara"),
    ("caykara", "Çaykara", "Yayla turizmi", "otel, kafe ve doğa turizmi", "Uzungöl ve merkez", "Of ve Maçka"),
    ("tonya", "Tonya", "İç kesim", "yerel üretim, esnaf ve hizmet", "merkez yerleşim", "Vakfıkebir ve Düzköy"),
    ("carsibasi", "Çarşıbaşı", "Batı sahil", "balıkçılık, restoran ve yerel ticaret", "sahil ve merkez", "Akçaabat ve Vakfıkebir"),
    ("salpazari", "Şalpazarı", "İç kesim", "yerel üretim, turizm ve esnaf", "merkez ve yayla güzergâhı", "Beşikdüzü ve Tonya"),
    ("duzkoy", "Düzköy", "İç kesim", "yerel işletmeler ve hizmet sektörü", "merkez yerleşim", "Ortahisar ve Tonya"),
    ("hayrat", "Hayrat", "Doğu iç kesim", "tarım, esnaf ve yerel hizmet", "merkez", "Of ve Dernekpazarı"),
    ("dernekpazari", "Dernekpazarı", "Doğu iç kesim", "küçük işletme ve yerel ticaret", "merkez", "Çaykara ve Hayrat"),
    ("koprubasi", "Köprübaşı", "Doğu iç kesim", "yerel işletmeler ve hizmet", "merkez", "Sürmene ve Of"),
]

BLOGS = [
    {
        "slug": "trabzon-sosyal-medya-ajansi-nasil-secilir.html",
        "title": "Trabzon'da sosyal medya ajansı seçerken nelere dikkat etmeli?",
        "desc": "Trabzon'da sosyal medya ajansı seçerken süreç, raporlama, içerik kalitesi ve Meta Ads şeffaflığı. En iyi ajans kriterleri.",
        "date": "2026-07-28",
        "date_tr": "28 Temmuz 2026",
        "cat": "Ajans",
        "img": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
        "lead": "Doğru sosyal medya ajansı, markanın dijitalde profesyonel görünmesini ve reklam bütçesini daha verimli kullanmasını sağlar. Trabzon'da ajans seçerken yalnızca fiyat değil; süreç, raporlama ve yerel dil kritiktir.",
        "hizmet": "../hizmet/sosyal-medya-ajansi.html",
        "sections": [
            ("Trabzon sosyal medya ajansı neden önemli?",
             "Trabzon'da rekabet artık yalnızca cadde ve vitrinde değil; Instagram, TikTok ve Facebook'ta da sürüyor. Restoran, klinik, otomotiv, inşaat ve turizm işletmeleri aynı hedef kitleye dijitalde ulaşmaya çalışıyor. Bu ortamda rastgele içerik paylaşmak yetmez. Trabzon sosyal medya ajansı, markanızın dilini kurar, içerik takvimini yönetir, reklamı ölçer ve büyümeyi raporlar. Yerel bir ajans seçmek, şehrin sezonlarını, ilçe dinamiklerini ve müşteri davranışını bilmek demektir. Ortahisar'daki bir perakende markası ile Of'taki bir restoran veya Maçka'daki bir otel aynı içerik planıyla yönetilemez. Ajans seçimi bu yüzden stratejik bir karardır."),
            ("En iyi sosyal medya ajansı Trabzon: hangi kriterlere bakmalısınız?",
             "«En iyi sosyal medya ajansı Trabzon» araması yapanlar genelde referans, şeffaflık ve sonuç ister. İlk kriter süreçtir: keşif, strateji, üretim, yayınlama ve optimizasyon adımları yazılı mı? İkinci kriter içerik kalitesidir: stok görsel mi, yoksa markanıza özel çekim ve kurgu mu? Üçüncü kriter Meta Ads şeffaflığıdır: medya bütçesi ile ajans ücreti ayrılmış mı, rapor anlaşılır mı? Dördüncü kriter iletişim hızıdır: onaylar, kriz anları ve günlük sorulara ne kadar hızlı dönüş yapılıyor? Beşinci kriter yerel odaktır: Trabzon ve 18 ilçede deneyim var mı? Bu beş madde, reklam ajansı önerisi Trabzon aramalarında da aynı şekilde geçerlidir."),
            ("Süreç şeffaf mı? Onay ve sorumluluk net mi?",
             "İyi bir ajans ilişkisi belirsizlikle başlamaz. Keşif görüşmesinde mevcut hesaplar incelenir, rakip ve hedef kitle netleştirilir. Sonra içerik dili, yayın sıklığı ve reklam hedefleri yazılır. Üretim aşamasında post, story, reels ve gerekirse yerinde çekim planlanır. Yayınlama ve topluluk yönetimi günlük işin parçasıdır. Optimizasyon ise aylık raporla birleşir. Onay sürecinin net olması özellikle kurumsal sosyal medya yönetimi Trabzon taleplerinde kritiktir: kim onaylar, kaç günde döner, acil içerikte ne olur? Kriz anında (olumsuz yorum, yanlış ürün bilgisi) kimin ne yapacağı baştan konuşulmalıdır."),
            ("Raporlama ve Meta Ads şeffaflığı",
             "Rapor olmadan «büyüdük» demek spekülasyondur. Aylık erişim, etkileşim, takipçi değişimi, mesaj/DM hacmi ve reklam dönüşümü görünür olmalı. Meta Ads tarafında kampanya hedefi, hedef kitle, harcama ve sonuç ayrı satırlarda okunabilmeli. Ajans ücreti ile reklam bütçesi karışmamalıdır. Trabzon Meta reklam ajansı veya Instagram reklam uzmanı arayan işletmeler için bu ayrım güvenin temelidir. Ayrıca hangi içeriğin satışa veya randevuya döndüğü konuşulabilmeli; sadece beğeni sayısı yetmez."),
            ("Yerel dil ve sektör bilgisi",
             "Trabzon'un sektörleri ve sezonları farklıdır. Yazın turizm ve sahil işletmeleri hızlanır; kışın yayla ve şehir içi talepler değişir. Restoran sosyal medya yönetimi Trabzon ile klinik sosyal medya yönetimi Trabzon aynı şablonla çözülmez. Menü hikâyesi, doktor güven içeriği, inşaat proje süreci veya emlak portföyü farklı ritim ister. Şehrin dilini bilen ekip, hashtag spam'i yerine anlamlı yerel bağlam kurar. Bu, dijital pazarlama hizmeti Trabzon arayan markalar için de geçerlidir."),
            ("Fiyat, paket ve satın alma niyeti",
             "Sosyal medya yönetimi fiyatları Trabzon'da platform sayısı, içerik hacmi, çekim ihtiyacı ve reklam yönetimine göre değişir. Ucuz paket her zaman doğru çözüm değildir; eksik üretim veya rapor yokluğu uzun vadede daha pahalıya mal olur. Trabzon sosyal medya paketi seçerken içeride ne olduğunu sorun: aylık kaç post/reels, story sıklığı, çekim günü, reklam yönetimi, rapor formatı. Sözleşme süresi, iptal koşulları ve ek iş ücretleri de netleşmeli. Ücretsiz keşif, teklifi spekülasyonsuz almanın en temiz yoludur."),
            ("Sonuç: doğru partner büyümeyi hızlandırır",
             "Trabzon'da sosyal medya yönetimi yapan firma arıyorsanız süreç, içerik, reklam ve raporlamayı tek çatıda toplayan bir yapıya bakın. Trabzon Sosyal Medya, Wesoco bünyesinde 18 ilçede Instagram, TikTok, Facebook ve LinkedIn yönetimi sunar. Amacımız gösterim değil; görünür, tutarlı ve ölçülebilir büyüme. Ücretsiz keşif görüşmesiyle mevcut hesaplarınıza bakıp size özel yol haritası çıkarabiliriz."),
        ],
        "faqs": [
            ("Trabzon'da sosyal medya ajansı nasıl seçilir?", "Süreç şeffaflığı, içerik kalitesi, Meta Ads raporlaması, iletişim hızı ve yerel deneyime bakın. Referans ve örnek iş isteyin."),
            ("Ajans ücreti ile reklam bütçesi aynı mı?", "Hayır. Ajans ücreti hizmet bedelidir; Meta Ads medya bütçesi ayrıdır ve şeffaf raporlanmalıdır."),
            ("Küçük işletmeler için paket var mı?", "Evet. Ölçeklenebilir paketlerle başlayıp ihtiyaç arttıkça genişletebilirsiniz."),
        ],
    },
    {
        "slug": "instagram-hikayeleri-ile-satis.html",
        "title": "Instagram hikâyeleri işletmeler için nasıl satış kanalına dönüşür?",
        "desc": "Instagram story ile kampanya, güven ve satış. Trabzon işletmeleri için pratik hikâye stratejisi ve Instagram yönetimi.",
        "date": "2026-07-20",
        "date_tr": "20 Temmuz 2026",
        "cat": "Instagram",
        "img": "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
        "lead": "Instagram hikâyeleri yalnızca «anlık» içerik değildir. Doğru planlandığında duyuru, güven ve satış kanalına dönüşür. Trabzon işletmeleri için hikâye stratejisi, Instagram yönetiminin vazgeçilmez parçasıdır.",
        "hizmet": "../hizmet/instagram-yonetimi.html",
        "sections": [
            ("Neden hikâyeler satışa etki eder?",
             "Hikâyeler, takipçinin günlük akışında daha samimi ve yakın durur. 24 saatlik format aciliyet yaratır; kampanya, stok ve randevu duyuruları için idealdir. Trabzon Instagram yönetimi yapan ekipler, feed post ile story'yi birlikte planlar: feed marka imajını kurar, story dönüşümü hızlandırır. Anket, soru kutusu ve link çıkışı etkileşimi artırır. Özellikle restoran, kafe, klinik ve perakende için «bugün» mesajı hikâyede daha iyi çalışır."),
            ("Trabzon işletmeleri için hikâye türleri",
             "Ürün/hizmet tanıtımı, müşteri yorumu, arka plan (mutfak, ekip, süreç), kampanya geri sayımı ve sık sorulan sorular en çok işe yarayan formatlardır. Ortahisar'da bir mağaza vitrin hikâyesi paylaşabilir; Akçaabat'ta bir restoran günlük menüyü story ile duyurabilir; Yomra'da bir klinik randevu hatırlatması yapabilir. Önemli olan rastgelelik değil, haftalık ritmdir. Her gün aynı tip içerik yorar; çeşitlilik ve net çağrı (WhatsApp, arama, konum) gerekir."),
            ("Satışa götüren hikâye akışı",
             "Etkili bir satış hikâyesi üç perdelidir: dikkat (görsel veya kısa video), güven (detay, fiyat, sosyal kanıt), eylem (net CTA). «Detay için DM» yerine doğrudan WhatsApp veya telefon yönlendirmesi Trabzon'da daha hızlı sonuç verir. Sticker'lar (anket, quiz) etkileşimi artırır ama asıl işi net teklif yapar. Reels veya post'tan story'ye taşımak da retargeting gibi çalışır: ilgilenen kişiyi ikinci kez yakalarsınız."),
            ("Hikâye + reklam birlikte",
             "Organik hikâye ile Instagram reklamı birleşince erişim artar. Story Ads, özellikle yerel hedeflemede güçlüdür. Trabzon Instagram reklamı planlarken konum, ilgi alanı ve benzer kitle doğru kurulmalı; yaratıcı ise organik hikâyeyle aynı dilde olmalıdır. Aksi halde reklam «yabancı» kalır. Bütçe küçük olsa bile retargeting (profil ziyaretçileri, video izleyenler) dönüşümü yükseltir."),
            ("Ölçüm: hangi metriğe bakmalı?",
             "Hikâye başarısı yalnızca görüntülenme değildir. Çıkış oranı, sticker tıklaması, profil ziyareti, DM ve link tıklaması daha anlamlıdır. Haftalık olarak hangi hikâye tipinin daha çok aksiyon ürettiğini not edin. Bu veri, içerik takvimini ve reklam kreatiflerini iyileştirir. Profesyonel Instagram yönetimi Trabzon paketlerinde bu ölçüm aylık raporun parçası olmalıdır."),
            ("Sık yapılan hatalar",
             "Çok fazla yazı, düşük ışık, tutarsız marka rengi, CTA'sız hikâye ve düzensiz paylaşım en sık hatalardır. Ayrıca yalnızca indirim hikâyesi paylaşmak markayı ucuzlatabilir; değer ve güven içeriği dengelenmelidir. Başka şehirlerden kopyalanan trendler Trabzon müşterisine uymayabilir; yerel bağlam her zaman daha ikna edicidir."),
            ("Sonuç",
             "Instagram hikâyeleri, doğru plan ve ölçümle satış kanalına dönüşür. Trabzon Sosyal Medya olarak hikâye stratejisini feed, reels ve Meta Ads ile birlikte yönetiyoruz. İşletmeniz için ücretsiz keşifte mevcut hikâye performansını da konuşabiliriz."),
        ],
        "faqs": [
            ("Günde kaç hikâye paylaşılmalı?", "Sektöre göre değişir. Genelde 3–7 karelik tutarlı bir akış, rastgele 20 kareden daha etkilidir."),
            ("Hikâye reklamı gerekli mi?", "Organik yetmiyorsa evet. Özellikle kampanya dönemlerinde Story Ads yerel erişimi hızlandırır."),
            ("Hikâyeleri kim hazırlamalı?", "Marka dilini bilen ekip. Ajans + işletme onayı en sağlıklı modeldir."),
        ],
    },
    {
        "slug": "reels-icerik-uretimi-neden-onemli.html",
        "title": "Reels içerik üretimi neden büyümeyi hızlandırır?",
        "desc": "Instagram ve TikTok reels ile keşfet trafiği, marka bilinirliği ve satış. Trabzon'da reels çekimi ve içerik üretimi rehberi.",
        "date": "2026-07-05",
        "date_tr": "5 Temmuz 2026",
        "cat": "Reels",
        "img": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
        "lead": "Kısa video, keşfet algoritmalarının merkezinde. Reels içerik üretimi; görünürlük, güven ve satış için Trabzon işletmelerinin en hızlı büyüme araçlarından biridir.",
        "hizmet": "../hizmet/icerik-uretimi-cekim.html",
        "sections": [
            ("Reels neden büyümeyi hızlandırır?",
             "Reels ve TikTok kısa videoları, takipçi olmayan kitleye ulaşmayı kolaylaştırır. İyi kurgulanmış 15–30 saniyelik bir video, onlarca statik postun erişimini geçebilir. Trabzon'da reels çekimi yaptıran markalar; restoran mutfağı, klinik süreç, otomotiv detay veya inşaat şantiye görüntüsüyle güven inşa eder. Video, ürünü «anlatmak» yerine «göstermek»tir. Bu da özellikle yerel aramalarda ve öneri zincirinde avantaj sağlar."),
            ("Sosyal medya içerik üretimi Trabzon: üretim döngüsü",
             "Profesyonel üretim üç aşamalıdır: brief (mesaj ve CTA), çekim (yerinde veya stüdyo), kurgu (müzik, yazı, tempo). Sosyal medya içerik üretimi Trabzon hizmetinde bu döngü aylık takvime bağlanır. Rastgele çekilen videolar birikir ama marka dili oluşmaz. Haftalık reels kotası, konu başlıkları ve sezon planı net olmalıdır. Video prodüksiyon Trabzon ihtiyacı büyüdüğünde drone çekimi veya profesyonel fotoğraf çekimi Trabzon ile aynı günde planlanabilir; maliyet ve zaman verimli olur."),
            ("Hangi sektörlerde reels daha iyi çalışır?",
             "Restoran ve kafe (yemek, ambiyans), klinik ve güzellik (süreç, ekip, sonuç), otel ve turizm (manzara, deneyim), otomotiv (araç detay, teslimat), emlak ve inşaat (proje turu) reels'ten yüksek verim alır. Doktor sosyal medya ajansı Trabzon arayanlar için bilgilendirici kısa videolar güven artırır; abartılı vaatlerden kaçınılmalıdır. Her sektörde ilk 1–2 saniye kritiktir: izleyici kaybedilirse video bitmez."),
            ("Organik reels + reklam",
             "Organik reels keşfet getirir; reklam ise doğru kitleyi hızlandırır. İyi performans gösteren bir reels, Meta Ads'de video view veya traffic kampanyasına dönüştürülebilir. Trabzon Meta Ads uzmanı ile çalışan markalar, organik yaratıcıyı reklamda yeniden kullanarak maliyet avantajı yakalar. Böylece içerik yatırımı iki kez çalışır."),
            ("Çekim günü nasıl planlanır?",
             "Tek çekim gününde birden fazla reels için ham malzeme toplanabilir. Mekân ışığı, ses, marka ürünleri ve ekip hazırlığı önceden netleşmeli. Drone çekimi Trabzon taleplerinde hava ve izin koşulları kontrol edilir. Sonrasında kurgu takvimi (kaç video, hangi müzik, hangi yazı stili) yazılı olmalıdır. Bu disiplin, «video çektik ama kullanamadık» problemini önler."),
            ("Ölçüm ve iterasyon",
             "İzlenme süresi, yeniden izleme, kaydetme, paylaşım ve profil ziyareti önemli metriklerdir. Hangi açılış karesi tutuyor, hangi CTA DM getiriyor? Aylık olarak en iyi 3 video analiz edilip sonraki üretim buna göre şekillenir. İçerik ajansı yaklaşımı budur: üret, ölç, iyileştir."),
            ("Sonuç",
             "Reels içerik üretimi, Trabzon'da marka görünürlüğünü hızlandırır. Trabzon Sosyal Medya; çekim, kurgu, yayınlama ve reklamı tek süreçte yönetir. Profesyonel çekim ve reels planı için ücretsiz keşif alın."),
        ],
        "faqs": [
            ("Ayda kaç reels yeterli?", "Sektöre göre 4–12 arası yaygın bir aralıktır. Kalite, rastgele yüksek adetten önemlidir."),
            ("Telefonla çekim yeterli mi?", "Bazı içerikler için evet. Profesyonel ışık, ses ve kurgu fark yaratır."),
            ("TikTok da gerekli mi?", "Hedef kitle genç veya keşfet odaklıysa evet. Aynı ham maddeden iki platforma uyarlanabilir."),
        ],
    },
    {
        "slug": "meta-ads-trabzon-isletmeler.html",
        "title": "Trabzon işletmeleri için Meta Ads neden kritik?",
        "desc": "Facebook ve Instagram reklamlarıyla Trabzon'da doğru kitleye ulaşmak. Meta Ads, bütçe, retargeting ve şeffaf raporlama.",
        "date": "2026-07-12",
        "date_tr": "12 Temmuz 2026",
        "cat": "Meta Ads",
        "img": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "lead": "Organik erişim tek başına yetmez. Meta Ads; Facebook ve Instagram'da doğru kişiye, doğru bütçeyle ulaşmanın en ölçülebilir yoludur. Trabzon işletmeleri için reklam ajansı seçiminde şeffaflık şarttır.",
        "hizmet": "../hizmet/meta-ads.html",
        "sections": [
            ("Meta Ads nedir, neden kritik?",
             "Meta Ads, Instagram ve Facebook reklam platformudur. Yerel işletmeler için konum hedefleme güçlü bir avantajdır: Ortahisar, Akçaabat, Yomra veya tüm Trabzon seçilebilir. Mesaj, randevu, web sitesi trafiği veya mağaza ziyareti hedeflenebilir. Trabzon Meta reklam ajansı arayan markalar genelde «gösterim aldık ama satış yok» şikâyetiyle gelir. Sorun çoğu zaman hedef, kreatif veya ölçüm eksikliğidir; platformun kendisi değil."),
            ("Google reklam veren firma Trabzon vs Meta",
             "Google Ads niyet odaklıdır (arama yapan kişi). Meta Ads ilgi ve davranış odaklıdır (keşfeden kişi). Birçok Trabzon işletmesi ikisini karıştırır. Restoran, klinik, güzellik ve perakende için Meta sıkça daha hızlı fark yaratır; yüksek niyetli hizmetlerde Google da kritik olabilir. «İşletmem için reklam ajansı» aramasında her iki kanalı da bilen ekip avantajlıdır. Bu yazı Meta'ya odaklanır çünkü görsel markalar için sosyal dönüşüm güçlüdür."),
            ("Kampanya mimarisi: farkındalık, trafik, dönüşüm",
             "İyi bir yapı katmanlıdır. Önce bilinirlik veya video view, sonra trafik/mesaj, sonra retargeting. Tek kampanyaya her şeyi yüklemek sonuçları bulandırır. Trabzon Instagram reklamı ve Facebook reklamları aynı hesapta yönetilir; kreatif platforma göre uyarlanır. Bütçe küçükse bile retargeting (site ziyaretçisi, video izleyen, etkileşim) öncelikli tutulmalıdır."),
            ("Bütçe ve şeffaflık",
             "Meta Ads reklam bütçesi ajans ücretine dahil değildir. Bu ayrım net yazılmalıdır. Günlük/aylık harcama, CPM, CTR, sonuç maliyeti raporda görünmeli. Trabzon dijital ajans fiyatları konuşulurken «pakete reklam dahil» vaadi çoğu zaman medya bütçesini gizler. Şeffaf ajans, her kuruşun nereye gittiğini gösterir."),
            ("Yerel hedefleme ipuçları",
             "Konum yarıçapı, dışlama alanları, yaş ve ilgi alanları dikkatle kurulur. Çok geniş hedef ucuza gösterim getirir ama dönüşüm düşer; çok dar hedef ise maliyeti şişirir. Sezonluk işlerde (turizm, yayla, okul dönemi) bütçe takvimi değişir. Kreatifte yerel işaretler (mekân, ekip, ürün) güven artırır."),
            ("Ölçüm: ne başarı sayılır?",
             "Sektöre göre başarı DM, telefon, form, randevu veya mağaza trafiğidir. Sadece beğeni ve erişim reklam KPI'sı değildir. Pixel/CAPI kurulumu, dönüşüm olayları ve haftalık optimizasyon şarttır. Profesyonel reklam yönetimi Trabzon hizmetinde bu teknik altyapı da konuşulmalıdır."),
            ("Sonuç",
             "Meta Ads, Trabzon işletmeleri için ölçülebilir büyüme kanalıdır. Trabzon Sosyal Medya; kampanya kurulumu, kreatif, optimizasyon ve raporlamayı Wesoco güvencesiyle sunar. Ücretsiz keşifte mevcut reklam hesabınızı da inceleyebiliriz."),
        ],
        "faqs": [
            ("Küçük bütçeyle Meta Ads olur mu?", "Evet. Net hedef ve iyi kreatifle küçük bütçe de öğrenme ve dönüşüm üretebilir."),
            ("Sonuç ne kadar sürede gelir?", "İlk veriler günler içinde gelir; sağlıklı optimizasyon genelde birkaç hafta ister."),
            ("Ajans reklam hesabına erişir mi?", "Evet, Business Manager üzerinden. Hesap mülkiyeti sizde kalmalıdır."),
        ],
    },
    {
        "slug": "trabzon-sosyal-medya-yonetimi-rehberi.html",
        "title": "Trabzon sosyal medya yönetimi rehberi: paket, süreç ve fiyat mantığı",
        "desc": "Trabzon sosyal medya yönetimi nedir, pakete neler girer, fiyat nasıl oluşur? İşletmeler için pratik rehber.",
        "date": "2026-08-01",
        "date_tr": "1 Ağustos 2026",
        "cat": "Yönetim",
        "img": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        "lead": "Trabzon sosyal medya yönetimi; içerik, yayınlama, etkileşim ve reklamın planlı yürütülmesidir. Bu rehber paket, süreç ve fiyat mantığını netleştirir.",
        "hizmet": "../hizmet/sosyal-medya-yonetimi.html",
        "sections": [
            ("Trabzon sosyal medya yönetimi nedir?",
             "Sosyal medya yönetimi, hesapların «bırakıldığı» bir iş değildir. Hedef kitle analizi, içerik takvimi, görsel/video üretimi, yayınlama, yorum-DM yönetimi ve performans raporunu kapsar. Trabzon'da işletme için sosyal medya yönetimi; yerel dil, sezon ve ilçe dinamikleriyle birleşince anlam kazanır. Profesyonel sosyal medya yönetimi Trabzon arayanlar genelde zaman, tutarlılık ve sonuç ister."),
            ("Pakete neler girmeli?",
             "Tipik bir Trabzon sosyal medya paketi: aylık post/story/reels sayısı, içerik onayı, yayınlama, temel topluluk yönetimi ve aylık rapor içerir. Üst paketlerde yerinde çekim, Meta Ads yönetimi ve kriz desteği eklenir. Kurumsal sosyal medya hizmetleri daha fazla onay katmanı ve LinkedIn içerebilir. Paketi seçerken «kaç içerik» kadar «hangi kalitede» sorusu da kritiktir."),
            ("Süreç nasıl işler?",
             "Keşif → strateji → üretim → yayın → optimizasyon. İlk haftada hesap ve rakip bakılır. Sonra dil ve takvim netleşir. Üretim onaylanır, yayınlanır, etkileşim yönetilir. Ay sonunda raporla sonraki ay iyileştirilir. Bu döngü, «sosyal medya hesabımı kim yönetecek» sorusunun cevabıdır: net rolleri olan bir ekip."),
            ("Fiyat mantığı",
             "Sosyal medya yönetimi fiyatları Trabzon'da sabit tek rakam değildir. Platform sayısı, içerik hacmi, çekim günü, reklam yönetimi ve sektör karmaşıklığı fiyatı etkiler. En ucuz teklif çoğu zaman en az üretimi veya en zayıf raporu getirir. Şeffaf teklif; kalem kalem kapsam yazar. Ücretsiz keşif sonrası net teklif almak en sağlıklısıdır."),
            ("Kimler için zorunluya yakın?",
             "Rekabetin yüksek olduğu sektörler: restoran, kafe, klinik, güzellik, otomotiv, emlak, inşaat, otel. Müşteri bulmak için sosyal medya ajansı arayan markalar genelde organik büyümeyi tek başına yürütemez. Düzenli üretim + reklam kombinasyonu gerekir."),
            ("Kendi yönetmek vs ajans",
             "İçerik üretecek zaman ve yetkinlik varsa kısmi iç kaynak mümkündür. Ama tutarlılık, reklam ve raporlama çoğu KOBİ'de aksar. Ajans; hız, standart ve dış göz kazandırır. Hibrit model de vardır: çekimi ajans, onay işletmede."),
            ("Sonuç",
             "Trabzon sosyal medya yönetimi, doğru paket ve süreçle büyümeyi ölçülebilir kılar. Trabzon Sosyal Medya olarak 18 ilçede Wesoco güvencesiyle hizmet veriyoruz. Keşif için yazın."),
        ],
        "faqs": [
            ("Minimum sözleşme ne kadar?", "Standart sözleşme 12 aydır. İlk ay içinde cayma hakkı vardır; strateji bu dönemde oturur."),
            ("İçerik onayı nasıl?", "Takvim ve taslaklar size sunulur; onaydan sonra yayınlanır."),
            ("Reklam pakete dahil mi?", "Yönetim dahil olabilir; medya bütçesi ayrıdır."),
        ],
    },
    {
        "slug": "trabzon-dijital-pazarlama-ajansi.html",
        "title": "Trabzon dijital pazarlama ajansı nasıl seçilir?",
        "desc": "Trabzon dijital pazarlama ajansı seçimi: sosyal medya, reklam, içerik ve ölçüm. Yerel markalar için rehber.",
        "date": "2026-08-02",
        "date_tr": "2 Ağustos 2026",
        "cat": "Dijital",
        "img": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
        "lead": "Dijital pazarlama ajansı; sosyal medya, reklam ve içeriği ölçülebilir bir sisteme bağlar. Trabzon'da seçim yaparken yerel odak ve şeffaf rapor şarttır.",
        "hizmet": "../hizmet/dijital-pazarlama-ajansi.html",
        "sections": [
            ("Dijital pazarlama ajansı ne işe yarar?",
             "Trabzon dijital pazarlama ajansı, markayı doğru kanallarda büyütür: sosyal medya yönetimi, içerik üretimi, Meta Ads, gerektiğinde web/SEO desteği. Amaç rastgele paylaşım değil; hedef, mesaj, kanal ve ölçüm uyumudur. Dijital pazarlama hizmeti Trabzon arayan işletmeler genelde «görünür olmak» ister; iyi ajans bunu satış/randevu diline çevirir."),
            ("Sosyal medya ajansı ile farkı",
             "Sosyal medya ajansı daha çok hesap yönetimi ve içerik odaklıdır. Dijital pazarlama ajansı daha geniş çerçeve çizer: reklam, dönüşüm, bazen arama ve web. Pratikte birçok yerel ajans ikisini birlikte sunar. Önemli olan vaadin kapsamıdır: ne dahil, ne hariç net yazılmalıdır."),
            ("Seçim kriterleri",
             "Yerel referans, örnek iş, süreç dokümanı, rapor örneği, iletişim modeli. Trabzon kurumsal ajans arayanlar için KVKK, onay ve marka güvenliği de gündeme gelir. Fiyatı sona bırakın; kapsamı önce netleştirin. En iyi reklam ajansı Trabzon aramasında da aynı mantık geçerlidir."),
            ("Kanallar: Instagram, Facebook, TikTok, LinkedIn",
             "Her markaya her kanal gerekmez. B2C'de Instagram/TikTok öne çıkar; B2B ve inşaatta LinkedIn değerli olabilir. Ajans, kanal önerisini veriye ve hedefe dayandırmalıdır. «Herkeste var» gerekçesi strateji değildir."),
            ("Ölçüm kültürü",
             "Aylık rapor, KPI tanımı ve iyileştirme önerisi olmadan dijital pazarlama spekülasyondur. Hangi metriğin başarı sayıldığı baştan yazılmalı. Bu kültür, uzun vadede bütçeyi korur."),
            ("Yerel avantaj",
             "Trabzon'u bilen ekip; sezon, ilçe ve sektör dilini daha hızlı kurar. Uzaktan genel ajanslar şablon üretebilir ama yerel güveni yakalamak zordur. 18 ilçede sahada çekim yapabilmek büyük artıdır."),
            ("Sonuç",
             "Trabzon Sosyal Medya, Wesoco bünyesinde dijital pazarlama ve sosyal medya yönetimini yerel odakta sunar. Ücretsiz keşifte ihtiyaç haritanızı birlikte çıkaralım."),
        ],
        "faqs": [
            ("Sadece reklam mı yaptırıabilirim?", "Evet. Ancak içeriksiz reklam sürdürülebilir değildir; kreatif de planlanmalıdır."),
            ("Web sitesi şart mı?", "Her iş için değil. WhatsApp/telefon dönüşümü de hedef olabilir."),
            ("Rapor ne sıklıkla?", "Standart aylıktır; kampanya dönemlerinde ara özet verilebilir."),
        ],
    },
    {
        "slug": "trabzon-instagram-yonetimi.html",
        "title": "Trabzon'da Instagram hesabı yöneten ajans: ne sunmalı?",
        "desc": "Trabzon Instagram yönetimi: içerik takvimi, reels, story, reklam ve raporlama. Hesap büyütme rehberi.",
        "date": "2026-08-03",
        "date_tr": "3 Ağustos 2026",
        "cat": "Instagram",
        "img": "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
        "lead": "«Instagram hesabımı büyütmek istiyorum» diyen Trabzon işletmeleri için yönetim; yalnızca takipçi değil, doğru takipçi ve dönüşüm demektir.",
        "hizmet": "../hizmet/instagram-yonetimi.html",
        "sections": [
            ("Trabzon Instagram yönetimi kapsamı",
             "Profesyonel yönetim; profil optimizasyonu, içerik takvimi, post/story/reels üretimi, yayınlama, etkileşim ve gerektiğinde Instagram reklamını içerir. Trabzon'da Instagram hesabı yöneten ajans, yerel görseller ve net CTA ile çalışmalıdır. Takipçi satın alma gibi yöntemler güven ve erişimi bozar; kalıcı çözüm değildir."),
            ("Büyüme: organik + reklam",
             "Organik reels ve tutarlı feed keşfet getirir. Reklam ise hız katar. İkisi birlikte planlanmalıdır. Hedef «çok takipçi» değil; mesaj, randevu ve satıştır. Bu ayrım, Instagram reklam uzmanı Trabzon aramalarında da kritiktir."),
            ("İçerik sütunları",
             "Marka/ürün, sosyal kanıt, eğitim/bilgi, kampanya ve arka plan. Sütunlar haftalık döngüye yayılır. Tek tip içerik algoritmayı ve izleyiciyi yorar. Sektöre göre ağırlık değişir: klinikte güven, restoranda iştah, inşaatta süreç."),
            ("Topluluk yönetimi",
             "Yorum ve DM yanıt süresi marka algısını belirler. Kriz anında hızlı ve sakin yanıt şarttır. Ajansın topluluk yönetimi kapsamı sözleşmede yazılmalıdır."),
            ("Raporlama",
             "Erişim, etkileşim, takipçi kalitesi, kaydetme/paylaşım, reklam sonuçları. Aylık yorum: ne işe yaradı, sonraki ay ne denenecek?"),
            ("Yerel örnekler",
             "Ortahisar perakende, Akçaabat restoran, Yomra konut, Maçka otel… Her biri farklı hikâye ritmi ister. Tek şablonla 18 ilçe yönetilmez."),
            ("Sonuç",
             "Trabzon Sosyal Medya, Instagram yönetimini içerik ve Meta Ads ile entegre sunar. Ücretsiz keşifte hesabınızı birlikte inceleyelim."),
        ],
        "faqs": [
            ("Takipçi ne kadar sürede artar?", "Organik büyüme genelde 4–8 haftada hissedilir. Reklamla daha hızlı veri gelir."),
            ("Bio ve highlight önemli mi?", "Evet. Dönüşümün ilk kapısı profil bütünlüğüdür."),
            ("Story yönetimi dahil mi?", "Paketlere göre değişir; çoğu profesyonel pakette dahildir."),
        ],
    },
    {
        "slug": "restoran-kafe-sosyal-medya-trabzon.html",
        "title": "Restoran ve kafe sosyal medya yönetimi Trabzon",
        "desc": "Restoran sosyal medya yönetimi Trabzon ve kafe Instagram stratejisi: menü, reels, story ve yerel reklam.",
        "date": "2026-08-04",
        "date_tr": "4 Ağustos 2026",
        "cat": "Sektör",
        "img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "lead": "Trabzon'da restoran ve kafeler için sosyal medya; menüyü göstermek, ambiyansı hissettirmek ve rezervasyon/trafik üretmektir.",
        "hizmet": "../hizmet/sosyal-medya-yonetimi.html",
        "sections": [
            ("Neden restoran/kafe için ayrı strateji?",
             "Yemek içeriği görseldir; ama her güzel fotoğraf satış getirmez. Işık, tabak stili, tempo ve CTA kritiktir. Restoran sosyal medya yönetimi Trabzon'da sezon (yaz sahil, kış iç mekân), günlük menü ve etkinlik takvimiyle birleşir. Kafe sosyal medya yönetimi Trabzon'da ise atmosfer, çalışan yüzleri ve tekrar ziyaret hikâyesi öne çıkar."),
            ("İçerik formülleri",
             "Ürün kahramanı, mutfak arkası, müşteri tepkisi, kampanya, konum/harita hatırlatması. Reels'te pişirme veya sunum anları; story'de günlük öneri. Haftalık grid planı markayı dağınık göstermez."),
            ("Yerel reklam",
             "Konum hedeflemeli Instagram/Facebook reklamları, yeni açılış ve kampanyalarda hızlı sonuç verir. Retargeting ile profil ziyaretçilerine tekrar ulaşılır. Google'a göre sosyal, «keşif» aşamasında güçlüdür."),
            ("Sık hatalar",
             "Karanlık fotoğraf, aşırı filtre, sadece indirim, düzensiz paylaşım, yorumlara geç dönüş. Menü fiyatı değişince eski postların güncellenmemesi de güven kırar."),
            ("Ölçüm",
             "DM, WhatsApp, telefon, rezervasyon formu, mağaza trafiği. Kaydetme ve paylaşım da menü ürünleri için iyi sinyaldır."),
            ("İlçe farkları",
             "Ortahisar yoğun rekabet; Of/Akçaabat sahil ritmi; Maçka/Çaykara turizm sezonu. İçerik dili buna göre ayarlanır."),
            ("Sonuç",
             "Trabzon Sosyal Medya, restoran ve kafeler için çekim + yönetim + reklam sunar. Keşif görüşmesiyle menü ve mekânınıza özel plan çıkaralım."),
        ],
        "faqs": [
            ("Haftada kaç post?", "Genelde 3–5 post + düzenli story/reels dengesi iyi sonuç verir."),
            ("Çekim yerinde mi?", "Evet. Yemek ve mekân için yerinde çekim önerilir."),
            ("Influencer şart mı?", "Şart değil. Doğru içerik ve yerel reklam çoğu zaman daha ölçülebilirdir."),
        ],
    },
    {
        "slug": "klinik-guzellik-sosyal-medya-trabzon.html",
        "title": "Klinik ve güzellik merkezi sosyal medya yönetimi Trabzon",
        "desc": "Klinik sosyal medya yönetimi Trabzon, doktor ve güzellik merkezi için güven odaklı Instagram ve reklam stratejisi.",
        "date": "2026-08-04",
        "date_tr": "4 Ağustos 2026",
        "cat": "Sektör",
        "img": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
        "lead": "Sağlık ve güzellikte sosyal medya; abartılı vaat değil, güven, bilgilendirme ve randevu üretimi demektir.",
        "hizmet": "../hizmet/sosyal-medya-yonetimi.html",
        "sections": [
            ("Doktor ve klinik için hassas dil",
             "Doktor sosyal medya ajansı Trabzon arayanlar için en kritik konu etik ve doğru bilgilendirmedir. İddialı sonuç garantileri yerine süreç, ekip, hijyen ve hasta deneyimi anlatılmalıdır. Klinik sosyal medya yönetimi Trabzon'da randevu CTA'sı net olmalı; tıbbi içerik uzman onayıyla yayınlanmalıdır."),
            ("Güzellik merkezi içerikleri",
             "Güzellik merkezi sosyal medya yönetimi Trabzon'da önce/sonra, cihaz tanıtımı, ekip ve müşteri yorumu öne çıkar. Işık ve izin (görsel kullanım onayı) şarttır. Reels ile kısa bilgilendirme videoları güven artırır."),
            ("Reklamda dikkat",
             "Meta'nın sağlık/güzellik reklam politikalarına uyum gerekir. Hedefleme ve kreatif metinler politikaya uygun yazılmalıdır. Ajansın bu alanda deneyimi önemli bir seçim kriteridir."),
            ("Güven unsurları",
             "Uzman biyografisi, klinik ortamı, sık sorulan sorular, gerçek hasta deneyimleri (izinli). Abartılı filtre ve yanıltıcı montaj uzun vadede zarar verir."),
            ("Randevu hunisi",
             "İçerik → profil → WhatsApp/telefon/form. Highlight menüleri (hizmetler, SSS, iletişim) dönüşümü kolaylaştırır."),
            ("Yerel konum",
             "Ortahisar klinik yoğunluğu yüksektir; fark içerik kalitesi ve tutarlılıktadır. İlçe kliniklerinde yakın çevre hedeflemesi daha verimli olabilir."),
            ("Sonuç",
             "Trabzon Sosyal Medya, klinik ve güzellik markaları için güven odaklı yönetim sunar. Ücretsiz keşifte hesap ve reklam uyumunu birlikte değerlendirelim."),
        ],
        "faqs": [
            ("Tıbbi içerik kim onaylar?", "Uzman hekim/klinik yetkilisi. Ajans taslak üretir, onay sonrası yayınlanır."),
            ("Önce/sonra paylaşılır mı?", "İzin ve politika uygunsa, etik çerçevede evet."),
            ("Reklam engeli olursa?", "Kreatif ve metin politika uyumuna göre revize edilir."),
        ],
    },
    {
        "slug": "trabzon-reklam-ajansi-nasil-secilir.html",
        "title": "Trabzon reklam ajansı nasıl seçilir? Meta ve performans odaklı rehber",
        "desc": "Trabzon reklam ajansı, Meta Ads ve performans kriterleri. Tavsiye, fiyat ve şeffaflık rehberi.",
        "date": "2026-08-04",
        "date_tr": "4 Ağustos 2026",
        "cat": "Reklam",
        "img": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        "lead": "Reklam ajansı önerisi Trabzon aramalarında doğru soru şudur: bütçem nerede harcanıyor, hangi sonuç geliyor?",
        "hizmet": "../hizmet/reklam-ajansi.html",
        "sections": [
            ("Trabzon reklam ajansı ne sunmalı?",
             "Kurulum, kreatif, hedefleme, optimizasyon ve raporlama. En iyi reklam ajansı Trabzon iddiası referans ve şeffaf raporla kanıtlanır. Sadece «reklam açmak» ajanslık değildir; sürekli iyileştirme gerekir."),
            ("Meta mi, Google mi?",
             "İhtiyaca göre. Keşif ve görsel ürün/hizmette Meta; yüksek niyetli aramada Google. Birçok işletme için önce Meta ile öğrenmek daha hızlıdır. Web ve sosyal medya ajansı Trabzon arayanlar genelde ikisini de konuşmak ister."),
            ("Fiyat ve paket",
             "Trabzon reklam ajansı fiyatları; yönetim ücreti + medya bütçesi olarak ayrılmalıdır. Trabzon dijital ajans fiyatları konuşulurken yüzde mi sabit ücret mi netleşmeli. Gizli kalem olmamalı."),
            ("Seçim kontrol listesi",
             "Business Manager erişim modeli, örnek rapor, sektör tecrübesi, iletişim hızı, kreatif üretimi dahil mi? «Sosyal medya ajansı tavsiye Trabzon» aramalarında da aynı listeyi kullanın."),
            ("Performans kültürü",
             "Haftalık bakış, A/B test, kaybeden reklamı kapatma, kazananı ölçekleme. Duygusal karar değil veri."),
            ("Yerel avantaj",
             "Trabzon hedeflemesi, yerel kreatif ve hızlı çekim desteği maliyeti düşürür. Uzaktan ajanslar bazen genel kreatifle çalışır."),
            ("Sonuç",
             "Trabzon Sosyal Medya, Meta Ads odaklı reklam yönetimini içerik üretimiyle birlikte sunar. Ücretsiz keşifte reklam hesabınızı inceleyelim."),
        ],
        "faqs": [
            ("Minimum reklam bütçesi?", "Hedefe göre değişir. Keşifte gerçekçi aralık konuşulur."),
            ("Hesap bana mı ait?", "Evet. Erişim paylaşılır, mülkiyet sizde kalır."),
            ("Rapor ne zaman?", "Kampanya süresince ara özet + aylık detay."),
        ],
    },
]


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def char_count(sections, lead, faqs) -> int:
    t = lead + "".join(h + p for h, p in sections)
    t += "".join(q + a for q, a in faqs)
    return len(t)


def pad_section(text: str, need: int) -> str:
    extras = [
        " Bu yaklaşım Trabzon'daki yerel markalar için özellikle kritiktir çünkü rekabet cadde kadar dijitalde de yoğundur.",
        " Wesoco güvencesiyle çalışan Trabzon Sosyal Medya ekibi, süreci ölçülebilir ve şeffaf tutmayı hedefler.",
        " Ortahisar'dan Of'a, Akçaabat'tan Yomra'ya kadar farklı ilçe dinamikleri aynı şablonla yönetilemez; plan yerelleştirilir.",
        " Düzenli raporlama olmadan bütçe ve emek boşa gidebilir; bu yüzden aylık değerlendirme standarttır.",
        " Ücretsiz keşif görüşmesi, ihtiyacı netleştirip doğru paketi seçmenin en pratik yoludur.",
    ]
    i = 0
    while len(text) < need and i < 40:
        text += extras[i % len(extras)]
        i += 1
    return text


def ensure_blog_length(blog: dict) -> dict:
    total = char_count(blog["sections"], blog["lead"], blog["faqs"])
    if total >= 5000:
        return blog
    need = 5000 - total
    # distribute padding into last 3 body sections
    secs = list(blog["sections"])
    per = max(need // 3, 200)
    for idx in range(max(0, len(secs) - 3), len(secs)):
        h, p = secs[idx]
        secs[idx] = (h, pad_section(p, len(p) + per))
    blog = dict(blog)
    blog["sections"] = secs
    # final check
    total2 = char_count(blog["sections"], blog["lead"], blog["faqs"])
    if total2 < 5000:
        h, p = blog["sections"][-1]
        blog["sections"][-1] = (h, pad_section(p, len(p) + (5000 - total2 + 50)))
    return blog


def blog_shell(blog: dict, related: list[dict]) -> str:
    blog = ensure_blog_length(blog)
    body_parts = []
    for h, p in blog["sections"]:
        body_parts.append(f"        <h2>{esc(h)}</h2>\n        <p>{esc(p)}</p>")
    faq_html = ['        <h2>Sıkça sorulanlar</h2>\n        <div class="blog-faq">']
    for q, a in blog["faqs"]:
        faq_html.append(
            f'          <details class="faq-item"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>'
        )
    faq_html.append("        </div>")
    body_parts.extend(faq_html)
    body_parts.append(
        f'        <p>İlgili hizmet: <a href="{blog["hizmet"]}">detaylı inceleyin</a>. '
        f'Bölgeler: <a href="../bolgeler/index.html">Trabzon ilçeleri</a>.</p>'
    )
    related_lis = "\n".join(
        f'          <li><a href="{r["slug"]}">{esc(r["title"])}</a></li>' for r in related
    )
    schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog["title"],
        "description": blog["desc"],
        "datePublished": blog["date"],
        "image": blog["img"],
        "author": {"@type": "Organization", "name": "Trabzon Sosyal Medya"},
        "publisher": {
            "@type": "Organization",
            "name": "Trabzon Sosyal Medya",
            "logo": {
                "@type": "ImageObject",
                "url": "https://trabzonsosyalmedya.com/assets/wesoco-logo-navy.svg",
            },
        },
        "mainEntityOfPage": f"https://trabzonsosyalmedya.com/blog/{blog['slug']}",
    }
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{esc(blog["title"])} | Trabzon Sosyal Medya</title>
  <meta name="description" content="{esc(blog["desc"])}" />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/blog/{blog["slug"]}" />
  <meta property="og:title" content="{esc(blog["title"])}" />
  <meta property="og:description" content="{esc(blog["desc"])}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="{blog["img"]}" />
  <meta property="article:published_time" content="{blog["date"]}" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(schema, ensure_ascii=False, indent=2)}
  </script>
</head>
<body class="page page-blog">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../index.html#referanslar">Referanslar</a>
        <a href="index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{WA}?text=Merhaba%2C%20Trabzon%20Sosyal%20Medya%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="../hizmet/index.html">Hizmetler</a>
      <a href="../index.html#referanslar">Referanslar</a>
      <a href="index.html">Blog</a>
      <a href="../bolgeler/index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
    <a href="../index.html#iletisim" class="btn btn-primary">Teklif Al</a>
  </div>
  <main id="main">
    <article class="blog-article">
      <div class="container narrow">
        <a class="blog-back" href="index.html">← Blog</a>
        <p class="blog-meta"><time datetime="{blog["date"]}">{blog["date_tr"]}</time> · {esc(blog["cat"])}</p>
        <h1>{esc(blog["title"])}</h1>
        <p class="blog-lead">{esc(blog["lead"])}</p>
        <div class="blog-cover">
          <img src="{blog["img"]}" alt="" width="1200" height="675" loading="eager" />
        </div>
        <div class="blog-content">
{chr(10).join(body_parts)}
        </div>
        <p class="blog-cta-line">
          <a href="../index.html#iletisim">Ücretsiz keşif için yazın →</a>
        </p>
        <nav class="blog-related" aria-label="Diğer yazılar">
          <p class="blog-related-label">Diğer yazılar</p>
          <ul>
{related_lis}
          </ul>
        </nav>
      </div>
    </article>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>Trabzon'un sosyal medya ajansı. 18 ilçede Instagram, TikTok ve Meta Ads ile yerel markalar için dijital büyüme.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
        <span>Ortahisar / Trabzon</span>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{WA}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


HIZMETLER = [
    {
        "slug": "sosyal-medya-ajansi.html",
        "h1": "Trabzon Sosyal Medya Ajansı",
        "title": "Trabzon Sosyal Medya Ajansı | Wesoco",
        "desc": "Trabzon sosyal medya ajansı. Instagram, TikTok, Meta Ads ve içerik üretimi. 18 ilçede Wesoco güvencesiyle.",
        "lead": "Trabzon'da sosyal medya denince akla gelen yerel ajans. Strateji, içerik, reklam ve raporlama tek çatıda.",
        "sections": [
            ("Trabzon sosyal medya ajansı olarak ne yapıyoruz?",
             "Markanızın dijital dilini kuruyoruz. İçerik takvimi, reels, story, topluluk yönetimi ve Meta Ads'i birlikte yönetiyoruz. Amaç gösterim değil; görünür, tutarlı ve ölçülebilir büyüme. Wesoco bünyesinde Trabzon Sosyal Medya, şehir ve 18 ilçede yerel işletmelere hizmet verir."),
            ("Kimler için ideal?",
             "Restoran, kafe, klinik, güzellik, otomotiv, inşaat, emlak, otel ve kurumsal markalar. «Sosyal medya hesabımı kim yönetecek» veya «müşteri bulmak için sosyal medya ajansı» diyen her işletme için süreç netleştiririz."),
            ("Neden yerel ajans?",
             "Trabzon'un sezonları, ilçe dinamikleri ve müşteri dili farklıdır. Genel şablonlar yetmez. Yerinde çekim, hızlı iletişim ve yerel referanslar fark yaratır."),
            ("Nasıl başlıyoruz?",
             "Ücretsiz keşif → strateji → üretim → reklam/optimizasyon → aylık rapor. Teklif şeffaf kalemlerle yazılır."),
        ],
        "faqs": [
            ("En iyi sosyal medya ajansı Trabzon hangisi?", "Doğru ajans; süreç, rapor, içerik kalitesi ve yerel deneyimle seçilir. Keşifte mevcut hesabınıza bakıp net öneri sunarız."),
            ("Hangi ilçelerde çalışıyorsunuz?", "Trabzon'un 18 ilçesinde."),
            ("Ücretsiz keşif var mı?", "Evet. Form veya WhatsApp yeterli."),
            ("Kurumsal sosyal medya yönetimi var mı?", "Evet. Onay süreçleri ve raporlama kurumsal yapıya uyarlanır."),
        ],
    },
    {
        "slug": "sosyal-medya-yonetimi.html",
        "h1": "Trabzon Sosyal Medya Yönetimi",
        "title": "Trabzon Sosyal Medya Yönetimi | Paket ve Süreç",
        "desc": "Trabzon sosyal medya yönetimi: Instagram, Facebook, TikTok, LinkedIn. Paket, süreç ve raporlama.",
        "lead": "Profesyonel sosyal medya yönetimi ile hesaplarınız düzenli, marka diliniz tutarlı, büyümeniz ölçülebilir olur.",
        "sections": [
            ("Yönetim kapsamı",
             "İçerik planı, üretim, yayınlama, etkileşim ve aylık performans raporu. İhtiyaca göre reels kotası ve Meta Ads yönetimi eklenir. Trabzon sosyal medya paketi ihtiyaca göre ölçeklenir."),
            ("İşletme için sosyal medya yönetimi Trabzon",
             "Zamanı olmayan KOBİ'ler için yönetim; tutarlılık ve hız demektir. Onay süreciniz netleşir, kriz anında yalnız kalmazsınız."),
            ("Fiyat mantığı",
             "Sosyal medya yönetimi fiyatları Trabzon'da platform ve hacme göre değişir. Keşif sonrası net teklif sunulur; sürpriz kalem yok."),
            ("Süreç",
             "Keşif, strateji, üretim, yayın, optimizasyon. Her ay iyileştirme önerisiyle devam edilir."),
        ],
        "faqs": [
            ("Pakete reklam dahil mi?", "Yönetim dahil olabilir; medya bütçesi ayrıdır."),
            ("Sözleşme süresi?", "Standart süre 12 aydır. İlk ay içinde cayma hakkı vardır."),
            ("İçerik onayı?", "Taslaklar onayınıza sunulur."),
            ("Hangi platformlar?", "Instagram, Facebook, TikTok, LinkedIn."),
        ],
    },
    {
        "slug": "dijital-pazarlama-ajansi.html",
        "h1": "Trabzon Dijital Pazarlama Ajansı",
        "title": "Trabzon Dijital Pazarlama Ajansı | Sosyal + Reklam",
        "desc": "Trabzon dijital pazarlama ajansı. Sosyal medya, Meta Ads, içerik ve ölçülebilir büyüme.",
        "lead": "Dijital pazarlamayı kanal kanal değil, sistem olarak kuruyoruz: mesaj, içerik, reklam ve ölçüm.",
        "sections": [
            ("Dijital pazarlama hizmeti Trabzon",
             "Sosyal medya yönetimi, içerik üretimi ve Meta Ads'i hedefe bağlarız. Gerektiğinde web/SEO yönlendirmesiyle destekleriz."),
            ("Kurumsal ve KOBİ",
             "Küçük işletmeden kurumsal yapıya ölçeklenebilir plan. Onay katmanları ve rapor dili ihtiyaca uyarlanır."),
            ("Ölçüm",
             "KPI'lar baştan yazılır. Aylık raporda neyin işe yaradığı net görülür."),
            ("Yerel odak",
             "18 ilçede sahada çekim ve yerel hedefleme ile çalışırız."),
        ],
        "faqs": [
            ("Sadece reklam olur mu?", "Evet; kreatif planı da öneririz."),
            ("SEO dahil mi?", "İçerik ve teknik yönlendirme; kapsam teklifte yazılır."),
            ("Rapor sıklığı?", "Aylık standarttır."),
            ("Keşif ücretsiz mi?", "Evet."),
        ],
    },
    {
        "slug": "reklam-ajansi.html",
        "h1": "Trabzon Reklam Ajansı",
        "title": "Trabzon Reklam Ajansı | Meta Ads ve Performans",
        "desc": "Trabzon reklam ajansı. Instagram ve Facebook reklamları, şeffaf bütçe ve performans raporu.",
        "lead": "Reklam bütçenizin nereye gittiğini bilerek büyütün. Meta Ads odaklı, şeffaf performans yönetimi.",
        "sections": [
            ("Trabzon reklam ajansı yaklaşımımız",
             "Kurulum, kreatif, hedefleme, optimizasyon, rapor. En iyi reklam ajansı Trabzon arayanlar için şeffaflık vazgeçilmezdir."),
            ("Meta ve yerel hedefleme",
             "İlçe ve yarıçap hedefleme, retargeting ve A/B test. Google reklam veren firma Trabzon ihtiyacı varsa yönlendiririz; odak Meta performansıdır."),
            ("Fiyat",
             "Trabzon reklam ajansı fiyatları: yönetim ücreti + medya bütçesi ayrı. Gizli kalem yok."),
            ("Kimler için?",
             "Restoran, klinik, perakende, otomotiv, emlak, hizmet işletmeleri."),
        ],
        "faqs": [
            ("Medya bütçesi kime ait?", "Size. Hesap mülkiyeti sizde kalır."),
            ("Minimum bütçe?", "Hedefe göre keşifte netleşir."),
            ("Kreatif dahil mi?", "Pakete göre; çoğu plana dahildir."),
            ("Rapor?", "Kampanya özeti + aylık detay."),
        ],
    },
    {
        "slug": "instagram-yonetimi.html",
        "h1": "Trabzon Instagram Yönetimi",
        "title": "Trabzon Instagram Yönetimi | İçerik ve Reklam",
        "desc": "Trabzon Instagram yönetimi. Post, story, reels, etkileşim ve Instagram reklamı.",
        "lead": "Instagram hesabınızı büyüten değil; doğru kitleye ulaşıp dönüşüm üreten yönetim.",
        "sections": [
            ("Kapsam",
             "Profil optimizasyonu, içerik takvimi, story/reels, yayınlama, DM/yorum ve isteğe bağlı Instagram reklamı."),
            ("Büyüme",
             "«Instagram hesabımı büyütmek istiyorum» hedefi; takipçi + mesaj + satış dengesiyle ele alınır."),
            ("Yerel içerik",
             "Trabzon'da çekim ve yerel dil ile güven artar. Şablon içerik yerine markaya özel üretim."),
            ("Rapor",
             "Erişim, etkileşim, kaydetme, reklam sonuçları ve sonraki ay planı."),
        ],
        "faqs": [
            ("Story dahil mi?", "Çoğu pakette evet."),
            ("Reels kotası?", "Pakete göre değişir."),
            ("Reklam ayrı mı?", "Medya bütçesi ayrıdır."),
            ("Onay süreci?", "Yayın öncesi onayınız alınır."),
        ],
    },
    {
        "slug": "meta-ads.html",
        "h1": "Trabzon Meta Reklam Ajansı",
        "title": "Trabzon Meta Ads | Instagram ve Facebook Reklamları",
        "desc": "Trabzon Meta reklam ajansı. Facebook ve Instagram reklamları, retargeting ve şeffaf raporlama.",
        "lead": "Meta Ads ile doğru kitleye, doğru bütçeyle. Trabzon işletmeleri için performans odaklı reklam yönetimi.",
        "sections": [
            ("Neden Meta Ads?",
             "Yerel hedefleme, görsel kreatif ve hızlı öğrenme döngüsü. Trabzon Facebook reklamları ve Instagram reklamı aynı hesapta yönetilir."),
            ("Kampanya yapısı",
             "Farkındalık, trafik/mesaj, dönüşüm ve retargeting katmanları. Tek kampanyaya her şey yüklenmez."),
            ("Şeffaflık",
             "Ajans ücreti ve medya bütçesi ayrı. Harcama ve sonuç raporu açıktır."),
            ("Teknik",
             "Pixel/CAPI ve dönüşüm olayları ihtiyaca göre kurulur."),
        ],
        "faqs": [
            ("Meta Ads uzmanı Trabzon olarak çalışıyor musunuz?", "Evet. Kurulumdan optimizasyona."),
            ("Sonuç süresi?", "İlk veri günler içinde; optimizasyon haftalar içinde oturur."),
            ("Hesap erişimi?", "Business Manager ile; mülkiyet sizde."),
            ("Kreatif kimde?", "Ajans üretir, siz onaylarsınız."),
        ],
    },
    {
        "slug": "icerik-uretimi-cekim.html",
        "h1": "Trabzon İçerik Üretimi ve Profesyonel Çekim",
        "title": "Trabzon İçerik Üretimi | Reels, Fotoğraf, Video, Drone",
        "desc": "Trabzon içerik üretimi, reels çekimi, video prodüksiyon, drone ve profesyonel fotoğraf çekimi.",
        "lead": "Markanıza özel görsel ve video. Reels, fotoğraf, video prodüksiyon ve drone çekimi ile içerik stoğu oluşturuyoruz.",
        "sections": [
            ("Sosyal medya içerik üretimi Trabzon",
             "Post, story ve reels için planlı üretim. Brief, çekim, kurgu, yayın formatına teslim."),
            ("Çekim hizmetleri",
             "Reels çekimi Trabzon, profesyonel fotoğraf çekimi Trabzon, video prodüksiyon Trabzon ve drone çekimi Trabzon ihtiyaçlarını aynı planlama içinde çözebiliriz."),
            ("Kimler için?",
             "Restoran, klinik, otel, otomotiv, inşaat, perakende ve kurumsal markalar."),
            ("Teslim",
             "Platforma hazır boyutlar, yazı/müzik kurgusu ve kullanım hakları netleşir."),
        ],
        "faqs": [
            ("Tek günde kaç içerik?", "Mekân ve plana göre değişir; önceden shot list hazırlanır."),
            ("Drone her yerde olur mu?", "İzin ve hava koşullarına bağlıdır."),
            ("Kurgu süresi?", "Hacme göre planlanır; takvim baştan yazılır."),
            ("Yalnızca çekim alınır mı?", "Evet. Yönetimle kombine de edilebilir."),
        ],
    },
]


def pad_hizmet(h: dict) -> dict:
    # ensure substantial body ~800+ words roughly via padding paragraphs
    h = dict(h)
    secs = []
    for title, p in h["sections"]:
        if len(p) < 450:
            p = pad_section(p, 520)
        secs.append((title, p))
    h["sections"] = secs
    return h


def hizmet_page(h: dict) -> str:
    h = pad_hizmet(h)
    sections = "\n".join(
        f'          <h2>{esc(t)}</h2>\n          <p>{esc(p)}</p>' for t, p in h["sections"]
    )
    faqs = "\n".join(
        f'          <details class="faq-item"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>'
        for q, a in h["faqs"]
    )
    faq_schema = {
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a},
            }
            for q, a in h["faqs"]
        ],
    }
    service_schema = {
        "@type": "Service",
        "name": h["h1"],
        "serviceType": h["h1"],
        "provider": {
            "@type": "ProfessionalService",
            "name": "Trabzon Sosyal Medya",
            "url": "https://trabzonsosyalmedya.com",
            "telephone": "+905380581122",
        },
        "areaServed": {"@type": "City", "name": "Trabzon"},
        "url": f"https://trabzonsosyalmedya.com/hizmet/{h['slug']}",
        "description": h["desc"],
    }
    graph = {"@context": "https://schema.org", "@graph": [service_schema, faq_schema]}
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{esc(h["title"])}</title>
  <meta name="description" content="{esc(h["desc"])}" />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/hizmet/{h["slug"]}" />
  <meta property="og:title" content="{esc(h["h1"])}" />
  <meta property="og:description" content="{esc(h["desc"])}" />
  <meta property="og:type" content="website" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(graph, ensure_ascii=False, indent=2)}
  </script>
</head>
<body class="page page-hizmet">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="index.html">Hizmetler</a>
        <a href="../index.html#referanslar">Referanslar</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{WA}" class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="index.html">Hizmetler</a>
      <a href="../blog/index.html">Blog</a>
      <a href="../bolgeler/index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
    <a href="../index.html#iletisim" class="btn btn-primary">Teklif Al</a>
  </div>
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <a href="../index.html">Ana sayfa</a>
          <span aria-hidden="true">/</span>
          <a href="index.html">Hizmetler</a>
          <span aria-hidden="true">/</span>
          <span>{esc(h["h1"])}</span>
        </nav>
        <span class="section-label">Hizmet</span>
        <h1>{esc(h["h1"])}</h1>
        <p class="lead">{esc(h["lead"])}</p>
        <div class="page-hero-actions">
          <a href="{WA}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">WhatsApp ile yazın</a>
          <a href="../index.html#iletisim" class="btn btn-outline-dark">Teklif al</a>
        </div>
      </div>
    </section>
    <section class="page-block">
      <div class="container">
{sections}
        <p class="page-inline-links">İlçe bazlı hizmet: <a href="../bolgeler/index.html">Trabzon bölgeler</a>. Yazılar: <a href="../blog/index.html">Blog</a>.</p>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <h2>Sıkça sorulanlar</h2>
        <div class="faq-list page-faq">
{faqs}
        </div>
      </div>
    </section>
    <section class="page-block">
      <div class="container">
        <div class="page-cta">
          <h2>Ücretsiz keşif görüşmesi.</h2>
          <p>Markanızı dinleyelim, ihtiyaca özel yol haritası çıkaralım.</p>
          <a href="{WA}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Hemen yazın</a>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>Trabzon'un sosyal medya ajansı. 18 ilçede yerel markalar için dijital büyüme.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
        <span>Ortahisar / Trabzon</span>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{WA}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


def district_long_copy(name: str, label: str, sectors: str, places: str, neighbors: str) -> list[tuple[str, str]]:
    return [
        (f"{name}'da sosyal medya yönetimi neden kritik?",
         pad_section(
             f"{name}, Trabzon'un {label.lower()} bölgesinde {sectors} için yoğun bir rekabet alanı sunar. "
             f"Cadde trafiği kadar Instagram ve TikTok görünürlüğü de müşteri kararını etkiler. "
             f"{name} sosyal medya yönetimi; yerel dil, doğru içerik ritmi ve ölçülebilir reklamla büyümeyi hızlandırır. "
             f"{places} çevresindeki işletmeler için tutarlı bir dijital vitrin artık zorunluya yakındır. "
             f"Trabzon Sosyal Medya olarak {name} işletmelerine Wesoco güvencesiyle hizmet veriyoruz.",
             700,
         )),
        (f"{name} işletmeleri için içerik ve reklam yaklaşımı",
         pad_section(
             f"{name}'da içerik planı sektöre göre kurulur: restoran ve kafelerde ürün/ambiyans, kliniklerde güven, "
             f"inşaat ve emlakta süreç, turizmde deneyim. Reels ve story ile keşfet; Meta Ads ile yerel hedefleme birleşir. "
             f"Komşu ilçeler ({neighbors}) da reklam hedeflemesine dahil edilebilir. "
             f"Aylık raporda erişim, etkileşim ve dönüşüm net görülür. "
             f"Yerinde çekim gerektiğinde {name} ve çevresinde planlı üretim yapılır.",
             650,
         )),
        (f"{name} için süreç nasıl işler?",
         pad_section(
             f"Keşif görüşmesinde mevcut hesaplar incelenir. Sonra strateji ve takvim yazılır; içerikler onayınıza sunulur. "
             f"Yayınlama ve topluluk yönetimi sürerken reklam ihtiyacı varsa Meta Ads kurulur. "
             f"Her ay optimizasyon önerileriyle devam edilir. "
             f"{name} sosyal medya ajansı arayanlar için şeffaf kapsam ve net iletişim standarttır.",
             600,
         )),
    ]


def district_page(slug: str, name: str, label: str, sectors: str, places: str, neighbors: str) -> str:
    sections = district_long_copy(name, label, sectors, places, neighbors)
    body = "\n".join(f"          <h2>{esc(t)}</h2>\n          <p>{esc(p)}</p>" for t, p in sections)
    faqs = [
        (f"{name}'da sosyal medya yönetimi yapıyor musunuz?", f"Evet. {name} ve tüm Trabzon ilçelerinde hizmet veriyoruz."),
        ("Yerinde çekim olur mu?", f"Evet. {name} ve çevresinde planlı çekim yapılabilir."),
        ("Ne kadar sürede başlanır?", "Keşif sonrası kısa sürede strateji ve ilk içerik planı çıkarılır."),
        ("Ücretsiz keşif var mı?", "Evet. WhatsApp veya form üzerinden."),
    ]
    faq_html = "\n".join(
        f'          <details class="faq-item"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in faqs
    )
    region_bits = []
    for s, n, *_ in DISTRICTS:
        cls = ' class="is-current"' if s == slug else ""
        region_bits.append(f'          <a href="{s}.html"{cls}>{n}</a>')
    region_links = "\n".join(region_bits)
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": f"{name} Sosyal Medya Yönetimi",
                "serviceType": "Sosyal medya yönetimi",
                "provider": {
                    "@type": "ProfessionalService",
                    "name": "Trabzon Sosyal Medya",
                    "url": "https://trabzonsosyalmedya.com",
                    "telephone": "+905380581122",
                },
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": name,
                    "containedInPlace": {"@type": "City", "name": "Trabzon"},
                },
                "url": f"https://trabzonsosyalmedya.com/bolgeler/{slug}.html",
                "description": f"{name} sosyal medya ajansı. Instagram yönetimi, içerik, Meta Ads. Trabzon {name}.",
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Ana sayfa", "item": "https://trabzonsosyalmedya.com/"},
                    {"@type": "ListItem", "position": 2, "name": "Hizmet bölgeleri", "item": "https://trabzonsosyalmedya.com/bolgeler/"},
                    {"@type": "ListItem", "position": 3, "name": name, "item": f"https://trabzonsosyalmedya.com/bolgeler/{slug}.html"},
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                    for q, a in faqs
                ],
            },
        ],
    }
    wa_q = f"{WA}?text=Merhaba%2C%20{name}%20sosyal%20medya%20y%C3%B6netimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{name} Sosyal Medya Yönetimi | Trabzon Sosyal Medya Ajansı</title>
  <meta name="description" content="{name} sosyal medya ajansı. Instagram yönetimi, içerik üretimi ve Meta Ads. Trabzon {name} için Wesoco güvencesiyle." />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="geo.region" content="TR-61" />
  <meta name="geo.placename" content="{name}, Trabzon" />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/bolgeler/{slug}.html" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:url" content="https://trabzonsosyalmedya.com/bolgeler/{slug}.html" />
  <meta property="og:title" content="{name} Sosyal Medya Yönetimi" />
  <meta property="og:description" content="{name} sosyal medya ajansı. Instagram, içerik ve Meta Ads." />
  <meta property="og:site_name" content="Trabzon Sosyal Medya" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
{json.dumps(schema, ensure_ascii=False, indent=2)}
  </script>
</head>
<body class="page page-district">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../index.html#referanslar">Referanslar</a>
        <a href="../blog/index.html">Blog</a>
        <a href="index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{wa_q}" class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="../hizmet/index.html">Hizmetler</a>
      <a href="../blog/index.html">Blog</a>
      <a href="index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
    <a href="../index.html#iletisim" class="btn btn-primary">Teklif Al</a>
  </div>
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <a href="../index.html">Ana sayfa</a>
          <span aria-hidden="true">/</span>
          <a href="index.html">Hizmet bölgeleri</a>
          <span aria-hidden="true">/</span>
          <span>{name}</span>
        </nav>
        <span class="section-label">{esc(label)}</span>
        <h1>{name} sosyal medya yönetimi.</h1>
        <p class="lead">{name}'da Instagram, içerik üretimi ve Meta Ads ile işletmenizi büyütün. Trabzon Sosyal Medya · Wesoco.</p>
        <div class="page-hero-actions">
          <a href="{wa_q}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">WhatsApp ile yazın</a>
          <a href="../index.html#iletisim" class="btn btn-outline-dark">Teklif al</a>
        </div>
      </div>
    </section>
    <section class="page-block">
      <div class="container">
{body}
        <p class="page-inline-links">İlgili: <a href="../hizmet/sosyal-medya-yonetimi.html">Sosyal medya yönetimi</a>, <a href="../hizmet/instagram-yonetimi.html">Instagram yönetimi</a>, <a href="../blog/index.html">Blog</a>.</p>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <h2>{name} sosyal medya hizmeti</h2>
        <p class="block-desc">{name} işletmeleri için Instagram, içerik, Meta Ads ve Google Ads’i tek çatıda yönetiyoruz. Doğrudan sosyal medya hizmet paketimizi inceleyin.</p>
        <div class="page-services">
          <a class="page-service page-service-link" href="../hizmet/sosyal-medya-yonetimi.html">
            <span class="page-service-num">01</span>
            <div>
              <h3>Sosyal Medya Yönetimi</h3>
              <p>{name} için içerik takvimi, yayınlama, etkileşim ve aylık rapor. Detayı inceleyin →</p>
            </div>
          </a>
          <a class="page-service page-service-link" href="../hizmet/instagram-yonetimi.html">
            <span class="page-service-num">02</span>
            <div>
              <h3>Instagram Yönetimi</h3>
              <p>Post, story ve reels ile {name}’da görünürlük ve dönüşüm. Detayı inceleyin →</p>
            </div>
          </a>
          <a class="page-service page-service-link" href="../hizmet/meta-ads.html">
            <span class="page-service-num">03</span>
            <div>
              <h3>Meta Ads</h3>
              <p>Facebook ve Instagram reklamlarıyla {name} ve çevresinde doğru kitle. Detayı inceleyin →</p>
            </div>
          </a>
          <a class="page-service page-service-link" href="../hizmet/google-ads.html">
            <span class="page-service-num">04</span>
            <div>
              <h3>Google Ads</h3>
              <p>Arama niyetindeki müşteriye ulaşın. {name} işletmeleri için performans reklamı. Detayı inceleyin →</p>
            </div>
          </a>
        </div>
        <p class="page-inline-links"><a href="../hizmet/sosyal-medya-yonetimi.html">Sosyal medya hizmetini incele →</a></p>
      </div>
    </section>
    <section class="page-block">
      <div class="container">
        <h2>Sıkça sorulanlar</h2>
        <div class="faq-list page-faq">
{faq_html}
        </div>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <div class="page-cta">
          <h2>{name} için ücretsiz keşif görüşmesi.</h2>
          <p>Markanızı dinleyelim, mevcut hesaplarınıza bakalım ve net bir yol haritası çıkaralım.</p>
          <a href="{wa_q}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Hemen yazın</a>
        </div>
      </div>
    </section>
    <section class="page-block page-regions">
      <div class="container">
        <h2>Diğer hizmet bölgelerimiz</h2>
        <div class="page-regions-list">
{region_links}
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>Trabzon'un sosyal medya ajansı. 18 ilçede Instagram, TikTok ve Meta Ads.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col footer-regions">
        <span class="footer-heading">Hizmet Bölgeleri</span>
        <div class="footer-regions-list">
{region_links}
        </div>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
        <span>Gazipaşa Mah., Uzun Sk. Can Bakkal İş Merkezi No:25<br />Ortahisar / Trabzon</span>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{wa_q}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


def blog_index(blogs: list[dict]) -> str:
    cards = []
    for b in blogs:
        cards.append(f"""          <article class="blog-card reveal">
            <a href="{b["slug"]}" class="blog-card-media">
              <img src="{b["img"]}" alt="{esc(b["title"])}" width="800" height="520" loading="lazy" />
            </a>
            <div class="blog-card-body">
              <div class="blog-card-meta">
                <span>{esc(b["cat"])}</span>
                <time datetime="{b["date"]}">{b["date_tr"]}</time>
              </div>
              <h3><a href="{b["slug"]}">{esc(b["title"])}</a></h3>
              <p>{esc(b["desc"])}</p>
              <a href="{b["slug"]}" class="blog-card-link">Devamını oku <span aria-hidden="true">→</span></a>
            </div>
          </article>""")
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog | Trabzon Sosyal Medya Ajansı</title>
  <meta name="description" content="Trabzon sosyal medya ajansı, Instagram yönetimi, Meta Ads, restoran ve klinik sosyal medya yazıları." />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/blog/" />
  <meta property="og:title" content="Blog | Trabzon Sosyal Medya" />
  <meta property="og:description" content="Sosyal medya yönetimi, Instagram, reklam ve sektör yazıları." />
  <meta property="og:type" content="website" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body class="page page-blog">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../index.html#referanslar">Referanslar</a>
        <a href="index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{WA}" class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="../hizmet/index.html">Hizmetler</a>
      <a href="index.html">Blog</a>
      <a href="../bolgeler/index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
    <a href="../index.html#iletisim" class="btn btn-primary">Teklif Al</a>
  </div>
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <a href="../index.html">Ana sayfa</a>
          <span aria-hidden="true">/</span>
          <span>Blog</span>
        </nav>
        <span class="section-label">Blog</span>
        <h1>Trabzon sosyal medya üzerine yazılar.</h1>
        <p class="lead">Ajans seçimi, Instagram yönetimi, Meta Ads, restoran ve klinik sosyal medya rehberleri.</p>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <div class="blog-grid">
{chr(10).join(cards)}
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>Trabzon'un sosyal medya ajansı. 18 ilçede dijital büyüme.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{WA}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


def hizmet_index() -> str:
    items = "\n".join(
        f'          <a class="service-hub-card" href="{h["slug"]}"><h2>{esc(h["h1"])}</h2><p>{esc(h["lead"])}</p><span>İncele →</span></a>'
        for h in HIZMETLER
    )
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hizmetler | Trabzon Sosyal Medya Ajansı</title>
  <meta name="description" content="Trabzon sosyal medya ajansı hizmetleri: yönetim, Instagram, Meta Ads, dijital pazarlama, reklam ve içerik üretimi." />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/hizmet/" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body class="page page-hizmet">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{WA}" class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="index.html">Hizmetler</a>
      <a href="../blog/index.html">Blog</a>
      <a href="../bolgeler/index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
  </div>
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <a href="../index.html">Ana sayfa</a>
          <span aria-hidden="true">/</span>
          <span>Hizmetler</span>
        </nav>
        <span class="section-label">Hizmetler</span>
        <h1>Trabzon sosyal medya ve dijital pazarlama hizmetleri.</h1>
        <p class="lead">Ajans, yönetim, Instagram, Meta Ads, reklam ve içerik üretimi. İhtiyacınıza uygun sayfayı seçin.</p>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <div class="service-hub-grid">
{items}
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>Wesoco bünyesinde Trabzon'un sosyal medya ajansı.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../bolgeler/index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{WA}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


def bolgeler_index() -> str:
    cards = "\n".join(
        f'          <a class="region-hub-card" href="{s}.html"><strong>{n}</strong><span>{lab}</span></a>'
        for s, n, lab, *_ in DISTRICTS
    )
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trabzon Hizmet Bölgeleri | 18 İlçe Sosyal Medya</title>
  <meta name="description" content="Trabzon'un 18 ilçesinde sosyal medya yönetimi: Ortahisar, Akçaabat, Of, Yomra ve tüm ilçeler." />
  <link rel="canonical" href="https://trabzonsosyalmedya.com/bolgeler/" />
  <link rel="icon" href="../assets/wesoco-icon.png" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body class="page page-district">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header is-scrolled" id="header">
    <div class="header-inner">
      <a href="../index.html" class="logo" aria-label="Trabzon Sosyal Medya ana sayfa">
        <img class="logo-img logo-img-white" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <img class="logo-img logo-img-navy" src="../assets/wesoco-logo-navy.svg" alt="Wesoco" width="140" height="22" />
      </a>
      <nav class="nav-desktop" aria-label="Ana menü">
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </nav>
      <div class="header-actions">
        <a href="{WA}" class="btn btn-primary btn-sm header-cta header-whatsapp" target="_blank" rel="noopener noreferrer">{WA_ICON} WhatsApp</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav" hidden>
    <nav aria-label="Mobil menü">
      <a href="../hizmet/index.html">Hizmetler</a>
      <a href="../blog/index.html">Blog</a>
      <a href="index.html">Bölgeler</a>
      <a href="../index.html#iletisim">İletişim</a>
    </nav>
  </div>
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Sayfa yolu">
          <a href="../index.html">Ana sayfa</a>
          <span aria-hidden="true">/</span>
          <span>Hizmet bölgeleri</span>
        </nav>
        <span class="section-label">Bölgeler</span>
        <h1>Trabzon'un 18 ilçesinde sosyal medya yönetimi.</h1>
        <p class="lead">Ortahisar'dan Of'a, Akçaabat'tan Yomra'ya yerel işletmeler için Instagram, içerik ve Meta Ads.</p>
      </div>
    </section>
    <section class="page-block soft">
      <div class="container">
        <div class="region-hub-grid">
{cards}
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="../assets/wesoco-logo-beyaz.svg" alt="Wesoco" width="140" height="22" />
        <strong>Trabzon Sosyal Medya</strong>
        <p>18 ilçede yerel sosyal medya ajansı.</p>
      </div>
      <div class="footer-col">
        <span class="footer-heading">Keşfet</span>
        <a href="../hizmet/index.html">Hizmetler</a>
        <a href="../blog/index.html">Blog</a>
        <a href="index.html">Bölgeler</a>
        <a href="../index.html#iletisim">İletişim</a>
      </div>
      <div class="footer-col">
        <span class="footer-heading">İletişim</span>
        <a href="tel:+905380581122">+90 (538) 058 11 22</a>
        <a href="mailto:info@wesoco.com">info@wesoco.com</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> Trabzon Sosyal Medya. Tüm hakları saklıdır.</p>
      <p class="footer-domain">trabzonsosyalmedya.com</p>
    </div>
  </footer>
  <a href="{WA}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA_FLOAT}</a>
  <script src="../script.js"></script>
</body>
</html>
"""


def write_sitemap() -> None:
    urls = ["https://trabzonsosyalmedya.com/"]
    urls.append("https://trabzonsosyalmedya.com/hizmet/")
    for h in HIZMETLER:
        urls.append(f"https://trabzonsosyalmedya.com/hizmet/{h['slug']}")
    urls.append("https://trabzonsosyalmedya.com/blog/")
    for b in BLOGS:
        urls.append(f"https://trabzonsosyalmedya.com/blog/{b['slug']}")
    urls.append("https://trabzonsosyalmedya.com/bolgeler/")
    for s, *_ in DISTRICTS:
        urls.append(f"https://trabzonsosyalmedya.com/bolgeler/{s}.html")
    body = "\n".join(
        f"  <url><loc>{u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" for u in urls
    )
    (ROOT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n',
        encoding="utf-8",
    )
    (ROOT / "robots.txt").write_text(
        "User-agent: *\nAllow: /\nSitemap: https://trabzonsosyalmedya.com/sitemap.xml\n",
        encoding="utf-8",
    )


def main() -> None:
    blog_dir = ROOT / "blog"
    for i, blog in enumerate(BLOGS):
        related = [BLOGS[(i + j) % len(BLOGS)] for j in range(1, 4)]
        html = blog_shell(blog, related)
        (blog_dir / blog["slug"]).write_text(html, encoding="utf-8")
        c = char_count(ensure_blog_length(blog)["sections"], blog["lead"], blog["faqs"])
        print(f"blog {blog['slug']}: ~{c} chars")
    (blog_dir / "index.html").write_text(blog_index(BLOGS), encoding="utf-8")

    hizmet_dir = ROOT / "hizmet"
    hizmet_dir.mkdir(exist_ok=True)
    (hizmet_dir / "index.html").write_text(hizmet_index(), encoding="utf-8")
    for h in HIZMETLER:
        (hizmet_dir / h["slug"]).write_text(hizmet_page(h), encoding="utf-8")
        print(f"hizmet {h['slug']}")

    bolge_dir = ROOT / "bolgeler"
    (bolge_dir / "index.html").write_text(bolgeler_index(), encoding="utf-8")
    for row in DISTRICTS:
        (bolge_dir / f"{row[0]}.html").write_text(district_page(*row), encoding="utf-8")
        print(f"bolge {row[0]}")

    write_sitemap()
    print("sitemap + robots ok")


if __name__ == "__main__":
    main()
