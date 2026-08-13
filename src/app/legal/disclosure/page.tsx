import { paths } from "@/lib/paths";
import { buildLegalMetadata, LegalPageShell } from "@/components/site/LegalPageShell";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildLegalMetadata(
    "Aydınlatma Metni | Samsun Sosyal Medya",
    "KVKK kapsamında Samsun Sosyal Medya aydınlatma metni.",
    paths.disclosure,
  );
}

export default function DisclosurePage() {
  return (
    <LegalPageShell
      title="Aydınlatma"
      description="Kişisel verilerinizin işlenmesine ilişkin aydınlatma metni."
      path={paths.disclosure}
      heading="Aydınlatma Metni"
    >
      <h2>1. Veri sorumlusu</h2>
      <p>
        Samsun Sosyal Medya (Wesoco), Ortahisar / Trabzon. E-posta: info@wesoco.com · Tel: +90 (538) 058 11 22.
      </p>
      <h2>2. İşleme amaçları</h2>
      <p>İletişim taleplerinin yanıtlanması, teklif hazırlama, sözleşme ve faturalama süreçleri, yasal yükümlülükler.</p>
      <h2>3. Toplama yöntemi</h2>
      <p>Web formu, e-posta, telefon, WhatsApp ve yüz yüze görüşmeler.</p>
      <h2>4. Haklar</h2>
      <p>
        KVKK md. 11 kapsamındaki haklarınızı kullanmak için yazılı veya elektronik başvuruda bulunabilirsiniz. Detaylı
        politika: <a href={paths.kvkk}>KVKK</a> ve <a href={paths.privacy}>Gizlilik</a>.
      </p>
    </LegalPageShell>
  );
}
