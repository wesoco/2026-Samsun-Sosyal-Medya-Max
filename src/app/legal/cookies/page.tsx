import { paths } from "@/lib/paths";
import { buildLegalMetadata, LegalPageShell } from "@/components/site/LegalPageShell";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildLegalMetadata(
    "Çerez Politikası | Samsun Sosyal Medya",
    "SamsunSosyalMedya.com çerez kullanımı ve tercihleriniz hakkında bilgilendirme.",
    paths.cookies,
  );
}

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Çerezler"
      description="Sitemizde kullanılan çerez türleri ve amaçları."
      path={paths.cookies}
      heading="Çerez Politikası"
    >
      <h2>Çerez nedir?</h2>
      <p>
        Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır. Siteyi çalıştırmak, güvenliği sağlamak ve (onay
        verilirse) analitik ölçüm yapmak için kullanılabilir.
      </p>
      <h2>Türler</h2>
      <ul>
        <li>
          <strong>Zorunlu:</strong> oturum, güvenlik, form koruması
        </li>
        <li>
          <strong>Performans / analitik:</strong> trafik ve hata analizi (açık rıza ile)
        </li>
      </ul>
      <h2>Yönetim</h2>
      <p>Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz; bazı özellikler kısıtlanabilir.</p>
    </LegalPageShell>
  );
}
