import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";

type Props = {
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  addressLine1: string;
  addressLine2: string;
  regions?: { slug: string; name: string }[];
};

const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Gazipa%C5%9Fa+Mah.+Uzun+Sk.+Can+Bakkal+%C4%B0%C5%9F+Merkezi+Kat+7+Daire+61+Ortahisar+Trabzon";

export async function SiteFooter({
  phone,
  phoneDisplay,
  email,
  whatsapp: _whatsapp,
  addressLine1,
  addressLine2,
  regions,
}: Props) {
  const year = new Date().getFullYear();
  const districts =
    regions ??
    (await prisma.district.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, name: true },
    }));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand">
          <img className="footer-logo" src="/assets/wesoco-logo-beyaz.svg" alt="Wesoco" width={140} height={22} />
          <span className="footer-brand-divider" aria-hidden="true" />
          <div className="footer-brand-copy">
            <strong>Samsun Sosyal Medya</strong>
            <p>Yerel işletmeler için Instagram yönetimi, içerik ve performans reklamı.</p>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <span className="footer-heading">Keşfet</span>
            <Link href={paths.hash.services}>Hizmetler</Link>
            <Link href={paths.sectors}>Sektörler</Link>
            <Link href={paths.cases}>Vakalar</Link>
            <Link href={paths.hash.refs}>Referanslar</Link>
            <Link href={paths.about}>Hakkımızda</Link>
            <Link href={paths.hash.blog}>Blog</Link>
            <Link href={paths.hash.faq}>S.S.S.</Link>
            <Link href={paths.hash.contact}>İletişim</Link>
          </div>
          <div className="footer-col footer-regions">
            <span className="footer-heading">Hizmet Bölgeleri</span>
            <div className="footer-regions-list">
              <Link href={paths.regions}>
                <strong>Tüm ilçeler</strong>
              </Link>
              {districts.map((d) => (
                <Link key={d.slug} href={paths.region(d.slug)}>
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-col footer-contact">
            <span className="footer-heading">İletişim</span>
            <a className="footer-contact-row" href={`tel:${phone}`}>
              <span className="footer-contact-icon" aria-hidden="true">
                <IconPhone />
              </span>
              <span>{phoneDisplay}</span>
            </a>
            <a className="footer-contact-row" href={`mailto:${email}`}>
              <span className="footer-contact-icon" aria-hidden="true">
                <IconMail />
              </span>
              <span>{email}</span>
            </a>
            <a className="footer-contact-row" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
              <span className="footer-contact-icon" aria-hidden="true">
                <IconPin />
              </span>
              <address className="footer-address">
                {addressLine1}
                <br />
                {addressLine2}
              </address>
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} Samsun Sosyal Medya. Tüm hakları saklıdır.</p>
        <nav className="footer-legal" aria-label="Yasal">
          <Link href={paths.kvkk}>KVKK</Link>
          <Link href={paths.privacy}>Gizlilik</Link>
          <Link href={paths.cookies}>Çerezler</Link>
          <Link href={paths.disclosure}>Aydınlatma</Link>
        </nav>
        <p className="footer-credit">
          <a
            href="https://www.wesoco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-logo"
            aria-label="Web tasarım: Wesoco"
          >
            <span>Web Tasarım:</span>
            <img src="/assets/wesoco-logo-beyaz.svg" alt="" width={96} height={16} aria-hidden="true" />
          </a>
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
