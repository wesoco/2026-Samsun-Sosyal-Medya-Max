import { LazyMap } from "@/components/site/LazyMap";
import { MAP_EMBED, MAPS_LINK } from "@/lib/office-location";

type Props = {
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp?: string;
  addressLine1: string;
  addressLine2: string;
};

const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export function ContactInfo({ phone, phoneDisplay, email, whatsapp, addressLine1, addressLine2 }: Props) {
  const wa = whatsapp?.replace(/\D/g, "") || "";

  return (
    <aside className="contact-info">
      <a className="contact-row" href={`tel:${phone}`}>
        <span className="contact-icon" aria-hidden="true">
          <IconPhone />
        </span>
        <span>
          <span className="contact-label">Telefon</span>
          <strong>{phoneDisplay}</strong>
        </span>
      </a>

      <a className="contact-row" href={`mailto:${email}`}>
        <span className="contact-icon" aria-hidden="true">
          <IconMail />
        </span>
        <span>
          <span className="contact-label">E-posta</span>
          <strong>{email}</strong>
        </span>
      </a>

      {wa ? (
        <a
          className="contact-row"
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon" aria-hidden="true">
            <IconWhatsApp />
          </span>
          <span>
            <span className="contact-label">WhatsApp</span>
            <strong>Hemen yazın</strong>
          </span>
        </a>
      ) : null}

      <a className="contact-row" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
        <span className="contact-icon" aria-hidden="true">
          <IconPin />
        </span>
        <span>
          <span className="contact-label">Adres</span>
          <strong className="contact-address">
            <span>{addressLine1}</span>
            <span>{addressLine2}</span>
          </strong>
        </span>
      </a>

      <div className="contact-row contact-row-static">
        <span className="contact-icon" aria-hidden="true">
          <IconClock />
        </span>
        <span>
          <span className="contact-label">Çalışma Saatleri</span>
          <strong>Pzt - Cmt, 09:00 - 18:00</strong>
        </span>
      </div>

      <LazyMap
        src={MAP_EMBED}
        title="Wesoco Teknoloji ofis konumu — Ortahisar, Trabzon"
      />
    </aside>
  );
}
