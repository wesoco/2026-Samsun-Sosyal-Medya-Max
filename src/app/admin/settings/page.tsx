import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });

  async function save(formData: FormData) {
    "use server";
    await requireAdmin();
    const existing = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    const smtpPassRaw = String(formData.get("smtpPass") || "");
    const data = {
      siteName: String(formData.get("siteName") || "Samsun Sosyal Medya"),
      phone: String(formData.get("phone") || ""),
      phoneDisplay: String(formData.get("phoneDisplay") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      addressLine1: String(formData.get("addressLine1") || ""),
      addressLine2: String(formData.get("addressLine2") || ""),
      defaultTitle: String(formData.get("defaultTitle") || ""),
      defaultDesc: String(formData.get("defaultDesc") || ""),
      ogImage: String(formData.get("ogImage") || "") || null,
      formNameLabel: String(formData.get("formNameLabel") || "Ad Soyad"),
      formPhoneLabel: String(formData.get("formPhoneLabel") || "Telefon"),
      formEmailLabel: String(formData.get("formEmailLabel") || "E-posta"),
      formDistrictLabel: String(formData.get("formDistrictLabel") || "İlçe"),
      formServiceLabel: String(formData.get("formServiceLabel") || "Hizmet"),
      formMessageLabel: String(formData.get("formMessageLabel") || "Mesaj"),
      formSubmitLabel: String(formData.get("formSubmitLabel") || "Gönder"),
      formSuccessMsg: String(formData.get("formSuccessMsg") || ""),
      formErrorMsg: String(formData.get("formErrorMsg") || ""),
      gtmId: String(formData.get("gtmId") || "").trim() || null,
      smtpEnabled: formData.get("smtpEnabled") === "on",
      smtpHost: String(formData.get("smtpHost") || "") || null,
      smtpPort: Number(formData.get("smtpPort") || 587),
      smtpSecure: formData.get("smtpSecure") === "on",
      smtpUser: String(formData.get("smtpUser") || "") || null,
      smtpPass: smtpPassRaw ? smtpPassRaw : existing?.smtpPass || null,
      smtpFrom: String(formData.get("smtpFrom") || "") || null,
      notifyEmail: String(formData.get("notifyEmail") || "") || null,
      emailSubjectPrefix: String(formData.get("emailSubjectPrefix") || "Siteden yeni mesaj"),
    };
    await prisma.siteSetting.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    });
    revalidatePath("/");
    revalidatePath("/iletisim");
    revalidatePath("/contact");
    redirect("/admin/settings");
  }

  return (
    <AdminChrome
      title="Site ayarları"
      description="İletişim bilgileri, SEO, GTM, form etiketleri ve SMTP. Form gönderimleri hem mesajlara düşer hem (açıksa) e-postaya gider."
    >
      <form action={save} className="admin-form admin-form-wide">
        <fieldset className="admin-fieldset">
          <legend>Kimlik & iletişim</legend>
          <div className="admin-field-grid">
            <label>
              Site adı
              <input name="siteName" defaultValue={s?.siteName || "Samsun Sosyal Medya"} />
            </label>
            <label>
              E-posta (sitede görünen)
              <input name="email" type="email" defaultValue={s?.email || ""} />
            </label>
            <label>
              Telefon (E.164)
              <input name="phone" defaultValue={s?.phone || ""} placeholder="+905…" />
            </label>
            <label>
              Telefon görünümü
              <input name="phoneDisplay" defaultValue={s?.phoneDisplay || ""} />
            </label>
            <label>
              WhatsApp (ülke koduyla)
              <input name="whatsapp" defaultValue={s?.whatsapp || ""} placeholder="905…" />
            </label>
          </div>
          <label>
            Adres satır 1
            <input name="addressLine1" defaultValue={s?.addressLine1 || ""} />
          </label>
          <label>
            Adres satır 2
            <input name="addressLine2" defaultValue={s?.addressLine2 || ""} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Varsayılan SEO</legend>
          <p className="admin-hint">Ana sayfa ve eksik meta alanlarında kullanılır.</p>
          <label>
            Varsayılan title
            <input name="defaultTitle" defaultValue={s?.defaultTitle || ""} />
          </label>
          <label>
            Varsayılan description
            <textarea name="defaultDesc" rows={3} defaultValue={s?.defaultDesc || ""} />
          </label>
          <ImageField name="ogImage" label="OG Image" folder="misc" defaultValue={s?.ogImage || ""} placeholder="/assets/…" />
          <label>
            Google Tag Manager ID
            <input
              name="gtmId"
              defaultValue={s?.gtmId || process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W"}
              placeholder="GTM-XXXXXXX"
              pattern="GTM-[A-Za-z0-9]+"
            />
          </label>
          <p className="admin-hint">Boş bırakırsanız ortam değişkeni / varsayılan GTM kullanılır. Örnek: GTM-M2W8R68W</p>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>İletişim formu etiketleri</legend>
          <p className="admin-hint">Sitedeki form alanlarının görünen metinleri.</p>
          <div className="admin-field-grid">
            <label>
              Ad Soyad
              <input name="formNameLabel" defaultValue={s?.formNameLabel || "Ad Soyad"} />
            </label>
            <label>
              Telefon
              <input name="formPhoneLabel" defaultValue={s?.formPhoneLabel || "Telefon"} />
            </label>
            <label>
              E-posta
              <input name="formEmailLabel" defaultValue={s?.formEmailLabel || "E-posta"} />
            </label>
            <label>
              İlçe
              <input name="formDistrictLabel" defaultValue={s?.formDistrictLabel || "İlçe"} />
            </label>
            <label>
              Hizmet
              <input name="formServiceLabel" defaultValue={s?.formServiceLabel || "Hizmet"} />
            </label>
            <label>
              Mesaj
              <input name="formMessageLabel" defaultValue={s?.formMessageLabel || "Mesaj"} />
            </label>
            <label>
              Gönder butonu
              <input name="formSubmitLabel" defaultValue={s?.formSubmitLabel || "Gönder"} />
            </label>
          </div>
          <label>
            Başarı mesajı
            <input name="formSuccessMsg" defaultValue={s?.formSuccessMsg || ""} />
          </label>
          <label>
            Hata mesajı
            <input name="formErrorMsg" defaultValue={s?.formErrorMsg || ""} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>SMTP / form e-postası</legend>
          <p className="admin-hint">
            Form gönderilince mesaj panele kaydolur; SMTP açıksa seçtiğiniz adrese de mail gider. Konu örneği:{" "}
            <strong>Siteden yeni mesaj — Ahmet Yılmaz</strong>
          </p>
          <label className="admin-check">
            <input name="smtpEnabled" type="checkbox" defaultChecked={s?.smtpEnabled || false} />
            SMTP ile e-posta bildirimi açık
          </label>
          <div className="admin-field-grid">
            <label>
              SMTP host
              <input name="smtpHost" defaultValue={s?.smtpHost || ""} placeholder="smtp.gmail.com" />
            </label>
            <label>
              Port
              <input name="smtpPort" type="number" defaultValue={s?.smtpPort ?? 587} />
            </label>
            <label>
              Kullanıcı
              <input name="smtpUser" defaultValue={s?.smtpUser || ""} autoComplete="off" />
            </label>
            <label>
              Şifre {s?.smtpPass ? <span className="admin-muted">(kayıtlı — boş bırakırsanız değişmez)</span> : null}
              <input name="smtpPass" type="password" placeholder={s?.smtpPass ? "••••••••" : ""} autoComplete="new-password" />
            </label>
            <label>
              Gönderen (From)
              <input name="smtpFrom" defaultValue={s?.smtpFrom || ""} placeholder="info@wesoco.com" />
            </label>
            <label>
              Bildirim alıcısı
              <input name="notifyEmail" type="email" defaultValue={s?.notifyEmail || ""} placeholder="Boşsa sitedeki e-posta kullanılır" />
            </label>
          </div>
          <label className="admin-check">
            <input name="smtpSecure" type="checkbox" defaultChecked={s?.smtpSecure || false} />
            SSL/TLS (genelde port 465)
          </label>
          <label>
            Konu öneki
            <input
              name="emailSubjectPrefix"
              defaultValue={s?.emailSubjectPrefix || "Siteden yeni mesaj"}
              placeholder="Siteden yeni mesaj"
            />
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
