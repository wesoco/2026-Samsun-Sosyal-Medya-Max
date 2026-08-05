import { paths } from "@/lib/paths";
import { buildLegalMetadata, LegalPageShell } from "@/components/site/LegalPageShell";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildLegalMetadata(
    "KVKK Aydınlatma ve Veri Politikası | Trabzon Sosyal Medya",
    "Trabzon Sosyal Medya (Wesoco) KVKK kapsamında kişisel verilerin işlenmesi hakkında bilgilendirme.",
    paths.kvkk,
  );
}

export default function KvkkPage() {
  return (
    <LegalPageShell
      title="KVKK"
      description="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme."
      path={paths.kvkk}
      heading="KVKK"
    >
      <h2>Veri sorumlusu</h2>
      <p>
        Trabzon Sosyal Medya / Wesoco. Gazipaşa Mah. Uzun Sk. Can Bakkal İş Merkezi Kapı No:25, Ortahisar / Trabzon.
        İletişim: info@wesoco.com · +90 (538) 058 11 22.
      </p>
      <h2>İşlenen veriler</h2>
      <p>
        İletişim formu, WhatsApp ve telefon üzerinden; ad soyad, telefon, e-posta, ilçe, hizmet tercihi ve mesaj içeriği
        işlenebilir.
      </p>
      <h2>Amaç ve hukuki sebep</h2>
      <p>
        Teklif, keşif görüşmesi, sözleşme süreçleri ve müşteri ilişkileri yönetimi. Hukuki sebepler: açık rıza, sözleşmenin
        kurulması/ifası ve meşru menfaat.
      </p>
      <h2>Saklama ve aktarım</h2>
      <p>
        Veriler yurt içinde, hizmetin gerektirdiği süre boyunca saklanır; yasal zorunluluk olmadıkça üçüncü kişilere
        satılmaz. Barındırma / e-posta altyapısı sağlayıcıları teknik işleyen sıfatıyla kullanılabilir.
      </p>
      <h2>Haklarınız</h2>
      <p>
        KVKK md. 11 kapsamındaki haklarınız için info@wesoco.com adresine başvurabilirsiniz. Aydınlatma metni için{" "}
        <a href={paths.disclosure}>/aydinlatma</a> sayfasına bakın.
      </p>
    </LegalPageShell>
  );
}
