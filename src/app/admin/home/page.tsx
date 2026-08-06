import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ImageField } from "@/components/admin/ImageField";
import { HeroSlidesEditor, type HeroSlideForm } from "@/components/admin/HeroSlidesEditor";

export const dynamic = "force-dynamic";

const DEFAULT_SLIDES: HeroSlideForm[] = [
  {
    signal: "Trabzon Sosyal Medya Ajansı",
    title: "Trabzon sosyal medya yönetimi için güvenilir ajans.",
    lead: "Instagram, TikTok, Facebook ve LinkedIn'de yerel markaları büyütüyoruz. Ortahisar'dan 18 ilçeye Wesoco güvencesiyle.",
    image: "/assets/hero/01.webp",
    alt: "Trabzon sosyal medya ajansı. Wesoco ekibi ve yerel marka çalışmaları",
    href: "/hizmetler/sosyal-medya-yonetimi",
    cta: "Sosyal medya yönetimi",
  },
];

const DEFAULT_PROCESS = [
  { num: "01", title: "Keşif", desc: "Markanızı, hedef kitlenizi ve rakiplerinizi dinliyoruz." },
  { num: "02", title: "Strateji", desc: "İçerik dili, takvim ve kanal planını birlikte netleştiriyoruz." },
  { num: "03", title: "Üretim", desc: "Çekim, kurgu, tasarım ve onaylı yayın." },
  { num: "04", title: "Büyüme", desc: "Reklam, optimizasyon ve aylık rapor." },
];

const DEFAULT_APPROACH_TABLE = [
  ["Restoran / kafe", "Menü, atmosfer, rezervasyon ritmi", "Rezervasyon / DM"],
  ["Klinik / güzellik", "Güven, önce-sonra, randevu", "Randevu formu"],
  ["Otel / turizm", "Oda, manzara, sezon kampanyası", "Direkt rezervasyon"],
  ["Otomotiv", "Model lansmanı, showroom, test sürüşü çağrısı", "Arama ve mesaj"],
  ["İnşaat / emlak", "Proje ölçeği, drone, satış ofisi yönlendirmesi", "Keşif formu / arama"],
  ["Perakende / B2B", "Ürün vitrini, kampanya ritmi veya LinkedIn güveni", "Mağaza trafiği / lead"],
];

function str(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) || fallback);
}

function normalizeSlides(raw: unknown): HeroSlideForm[] {
  if (!Array.isArray(raw) || !raw.length) return DEFAULT_SLIDES;
  return raw.map((item) => {
    const s = item as Partial<HeroSlideForm>;
    return {
      signal: String(s.signal || ""),
      title: String(s.title || ""),
      lead: String(s.lead || ""),
      image: String(s.image || "/assets/hero/01.webp"),
      alt: String(s.alt || ""),
      href: s.href ? String(s.href) : "",
      cta: s.cta ? String(s.cta) : "",
    };
  });
}

export default async function AdminHomePage() {
  await requireAdmin();
  let home = await prisma.homeContent.findUnique({ where: { id: "default" } });
  if (!home) {
    home = await prisma.homeContent.create({
      data: {
        id: "default",
        heroSlidesJson: DEFAULT_SLIDES,
        processJson: DEFAULT_PROCESS,
        approachTableJson: DEFAULT_APPROACH_TABLE,
      },
    });
  }

  const slides = normalizeSlides(home.heroSlidesJson);
  const process = JSON.stringify(home.processJson, null, 2);
  const approachTable = JSON.stringify(
    Array.isArray(home.approachTableJson) && (home.approachTableJson as unknown[]).length
      ? home.approachTableJson
      : DEFAULT_APPROACH_TABLE,
    null,
    2,
  );

  async function save(formData: FormData) {
    "use server";
    await requireAdmin();
    let heroSlidesJson: unknown = DEFAULT_SLIDES;
    let processJson: unknown = DEFAULT_PROCESS;
    let approachTableJson: unknown = DEFAULT_APPROACH_TABLE;
    try {
      heroSlidesJson = normalizeSlides(JSON.parse(String(formData.get("heroSlidesJson") || "[]")));
      processJson = JSON.parse(String(formData.get("processJson") || "[]"));
      approachTableJson = JSON.parse(String(formData.get("approachTableJson") || "[]"));
    } catch {
      redirect("/admin/home?error=json");
    }

    const data = {
      aboutTitle: str(formData, "aboutTitle"),
      aboutLead: str(formData, "aboutLead"),
      aboutBody: str(formData, "aboutBody"),
      ctaTitle: str(formData, "ctaTitle"),
      ctaText: str(formData, "ctaText"),
      ctaImage: str(formData, "ctaImage"),
      servicesTitle: str(formData, "servicesTitle"),
      servicesLead: str(formData, "servicesLead"),
      processTitle: str(formData, "processTitle"),
      processLead: str(formData, "processLead"),
      refsTitle: str(formData, "refsTitle"),
      refsLead: str(formData, "refsLead"),
      blogTitle: str(formData, "blogTitle"),
      approachTitle: str(formData, "approachTitle"),
      approachLead: str(formData, "approachLead"),
      faqTitle: str(formData, "faqTitle"),
      faqLead: str(formData, "faqLead"),
      contactTitle: str(formData, "contactTitle"),
      contactLead: str(formData, "contactLead"),
      heroSlidesJson: heroSlidesJson as object,
      processJson: processJson as object,
      approachTableJson: approachTableJson as object,
    };

    await prisma.homeContent.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    });
    revalidatePath("/");
    redirect("/admin/home");
  }

  return (
    <AdminChrome
      title="Anasayfa içerikleri"
      description="Hero slaytları form ile düzenlenir; görseller yüklenebilir. Bölüm metinleri ve CTA burada."
    >
      <form action={save} className="admin-form admin-form-wide">
        <fieldset className="admin-fieldset">
          <legend>Hero slaytları</legend>
          <p className="admin-hint">
            Her slayt için başlık, metin, buton ve görsel. Dosya yükleyebilir veya URL yapıştırabilirsiniz.
          </p>
          <HeroSlidesEditor initial={slides} />
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Hakkımızda</legend>
          <label>
            Başlık
            <input name="aboutTitle" required defaultValue={home.aboutTitle} />
          </label>
          <label>
            Lead
            <textarea name="aboutLead" required rows={2} defaultValue={home.aboutLead} />
          </label>
          <label>
            Gövde
            <textarea name="aboutBody" required rows={3} defaultValue={home.aboutBody} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Bölüm başlıkları</legend>
          <div className="admin-field-grid">
            <label>
              Hizmetler başlık
              <input name="servicesTitle" defaultValue={home.servicesTitle} />
            </label>
            <label>
              Süreç başlık
              <input name="processTitle" defaultValue={home.processTitle} />
            </label>
            <label>
              Referanslar başlık
              <input name="refsTitle" defaultValue={home.refsTitle} />
            </label>
            <label>
              Blog başlık
              <input name="blogTitle" defaultValue={home.blogTitle} />
            </label>
            <label>
              Yaklaşım başlık
              <input name="approachTitle" defaultValue={home.approachTitle} />
            </label>
            <label>
              SSS başlık
              <input name="faqTitle" defaultValue={home.faqTitle} />
            </label>
            <label>
              İletişim başlık
              <input name="contactTitle" defaultValue={home.contactTitle} />
            </label>
          </div>
          <label>
            Hizmetler açıklama
            <textarea name="servicesLead" rows={2} defaultValue={home.servicesLead} />
          </label>
          <label>
            Süreç açıklama
            <textarea name="processLead" rows={2} defaultValue={home.processLead} />
          </label>
          <label>
            Referanslar açıklama
            <textarea name="refsLead" rows={2} defaultValue={home.refsLead || ""} />
          </label>
          <label>
            Yaklaşım açıklama
            <textarea name="approachLead" rows={3} defaultValue={home.approachLead} />
          </label>
          <label>
            SSS açıklama
            <textarea name="faqLead" rows={2} defaultValue={home.faqLead} />
          </label>
          <label>
            İletişim açıklama
            <textarea name="contactLead" rows={2} defaultValue={home.contactLead} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>CTA bandı</legend>
          <label>
            CTA başlık
            <input name="ctaTitle" required defaultValue={home.ctaTitle} />
          </label>
          <label>
            CTA metin
            <textarea name="ctaText" required rows={2} defaultValue={home.ctaText} />
          </label>
          <ImageField name="ctaImage" label="CTA görsel" folder="home" required defaultValue={home.ctaImage} />
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Süreç &amp; yaklaşım tablosu (JSON)</legend>
          <p className="admin-hint">İleri seviye. Süreç adımları ve yaklaşım tablosu.</p>
          <label>
            Süreç adımları (JSON)
            <textarea name="processJson" rows={8} defaultValue={process} className="admin-code" />
          </label>
          <label>
            Yaklaşım tablosu (JSON)
            <textarea name="approachTableJson" rows={10} defaultValue={approachTable} className="admin-code" />
          </label>
        </fieldset>

        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </AdminChrome>
  );
}
