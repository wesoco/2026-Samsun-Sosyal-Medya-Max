import { paths } from "@/lib/paths";
import { buildLegalMetadata, LegalPageShell } from "@/components/site/LegalPageShell";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return buildLegalMetadata(
    "Gizlilik Politikası | Samsun Sosyal Medya",
    "SamsunSosyalMedya.com gizlilik politikası: hangi verileri neden işlediğimiz.",
    paths.privacy,
  );
}

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Gizlilik"
      description="Sitemizi ve hizmetlerimizi kullanırken gizliliğinize nasıl saygı gösterdiğimiz."
      path={paths.privacy}
      heading="Gizlilik Politikası"
    >
      <h2>Kapsam</h2>
      <p>
        Bu politika samsunsosyalmedya.com ziyaretçileri ve Samsun Sosyal Medya (Wesoco) hizmet adayları için geçerlidir.
      </p>
      <h2>Topladığımız bilgiler</h2>
      <ul>
        <li>İletişim formundan gönderilen bilgiler</li>
        <li>Teknik loglar (IP, tarayıcı tipi. güvenlik ve performans)</li>
        <li>Çerezler (ayrıntı: <a href={paths.cookies}>Çerez Politikası</a>)</li>
      </ul>
      <h2>Kullanım</h2>
      <p>Talebinize yanıt, hizmet sunumu, site güvenliği ve yasal yükümlülükler.</p>
      <h2>İletişim</h2>
      <p>Sorularınız için info@wesoco.com</p>
    </LegalPageShell>
  );
}
