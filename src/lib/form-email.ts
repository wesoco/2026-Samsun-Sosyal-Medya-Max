/**
 * Form bildirim maili (Wesoco koyu tema + Gmail dark-mode).
 * Logo: public PNG (SVG/CID yok), koyu arka plana uygun beyaz/açık logo.
 */

const SITE_URL = "https://samsunsosyalmedya.com";
const EMAIL_LOGO_URL = "https://www.wesoco.com/images/email/wesoco-logo-beyaz.png";
const BRAND = "Samsun Sosyal Medya";

export type FormEmailType = "contact" | "dealer" | "investor" | "career" | "spontaneous";

export type FormEmailAttachmentInfo = { label: string; filename: string; size: number };

/**
 * Tasarım her istemcide koyu. Gmail dark-mode çevirisini atlatmak için:
 * - arka planlar background-image gradient
 * - yazılar screen + difference blend (ink)
 * Renkli yazı bozulur → beyaz/gri tutulur.
 */
const COLORS = {
  page: "#070d18",
  card: "#0f1829",
  head: "#0a1220",
  headBorder: "#1e2a42",
  soft: "#16213a",
  border: "#22304b",
  chip: "#2a3a5a",
  red: "#b91c1c",
  text: "#f1f5f9",
  muted: "#94a3b8",
};

const TYPE_META: Record<FormEmailType, { badge: string; title: string }> = {
  contact: { badge: "İletişim Formu", title: "Yeni iletişim talebi" },
  dealer: { badge: "Bayilik Başvurusu", title: "Yeni bayilik başvurusu" },
  investor: { badge: "Yatırımcı Başvurusu", title: "Yeni yatırımcı başvurusu" },
  career: { badge: "İş Başvurusu", title: "Yeni iş başvurusu" },
  spontaneous: { badge: "Spontane Başvuru", title: "Yeni spontane başvuru" },
};

const LOCALE_NAMES: Record<string, string> = {
  tr: "Türkçe",
  en: "İngilizce",
  de: "Almanca",
  ar: "Arapça",
  ka: "Gürcüce",
  ru: "Rusça",
};

const FIELD_ORDER: { keys: string[]; label: string; kind?: "email" | "phone" }[] = [
  { keys: ["positionTitle"], label: "Pozisyon" },
  { keys: ["name", "fullName"], label: "Ad Soyad" },
  { keys: ["email"], label: "E-posta", kind: "email" },
  { keys: ["phone", "telefon"], label: "Telefon", kind: "phone" },
  { keys: ["company", "firmaAdi"], label: "Firma" },
  { keys: ["vergiNo"], label: "Vergi No" },
  { keys: ["konu"], label: "Konu" },
  { keys: ["ulke"], label: "Ülke" },
  { keys: ["il"], label: "İl" },
  { keys: ["district"], label: "İlçe" },
];

const MESSAGE_KEYS = ["message", "mesaj"];
const HIDDEN_KEYS = new Set(["positionId", "formType", "ad", "soyad", "ekler", ...MESSAGE_KEYS]);

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function str(value: unknown): string {
  return value == null ? "" : String(value).trim();
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

function whatsappHref(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "90" + digits.slice(1);
  else if (digits.length === 10 && digits.startsWith("5")) digits = "90" + digits;
  return `https://wa.me/${digits}`;
}

function bg(color: string): string {
  return `background-color:${color};background-image:linear-gradient(${color},${color});`;
}

function ink(html: string): string {
  return `<span class="gs"><span class="gd">${html}</span></span>`;
}

const GMAIL_STYLE = `
  u + .body .gs, u + .body .gd { display:block; margin:0; padding:0; }
  u + .body .gs { background:#000; mix-blend-mode:screen; }
  u + .body .gd { background:#000; mix-blend-mode:difference; }`;

function framed(inner: string, color: string, radius: number, style = ""): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;${style}"><tr>
    <td bgcolor="${color}" style="${bg(color)}padding:1px;border-radius:${radius}px;">${inner}</td>
  </tr></table>`;
}

type Row = { label: string; value: string; kind?: "email" | "phone" };

function collectRows(payload: Record<string, unknown>): Row[] {
  const data: Record<string, unknown> = { ...payload };
  const fullName = [str(data.ad), str(data.soyad)].filter(Boolean).join(" ");
  if (fullName && !str(data.name)) data.fullName = fullName;

  const rows: Row[] = [];
  const used = new Set<string>();
  for (const field of FIELD_ORDER) {
    const key = field.keys.find((k) => str(data[k]));
    field.keys.forEach((k) => used.add(k));
    if (!key) continue;
    rows.push({ label: field.label, value: str(data[key]), kind: field.kind });
  }
  for (const [k, v] of Object.entries(data)) {
    if (used.has(k) || HIDDEN_KEYS.has(k) || !str(v)) continue;
    rows.push({ label: k, value: str(v) });
  }
  return rows;
}

function renderValue(row: Row): string {
  const link = (href: string) =>
    ink(`<a href="${esc(href)}" style="color:${COLORS.text};text-decoration:none;font-weight:600;">${esc(row.value)}</a>`);
  if (row.kind === "email") return link(`mailto:${row.value}`);
  if (row.kind === "phone") return link(telHref(row.value));
  return ink(esc(row.value));
}

function button(href: string, label: string, primary: boolean): string {
  const color = primary ? COLORS.red : COLORS.chip;
  return `<a href="${esc(href)}" style="display:inline-block;padding:12px 20px;margin:0 8px 8px 0;border-radius:10px;${bg(color)}color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">${ink(label)}</a>`;
}

function siteHost(): string {
  try {
    return new URL(SITE_URL).host.replace(/^www\./, "");
  } catch {
    return SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export function buildFormEmail(input: {
  type: FormEmailType;
  payload: Record<string, unknown>;
  submissionId: string;
  locale?: string;
  createdAt?: Date;
  attachments?: FormEmailAttachmentInfo[];
}): { html: string; text: string } {
  const { type, payload, submissionId } = input;
  const meta = TYPE_META[type];
  const rows = collectRows(payload);
  const message = MESSAGE_KEYS.map((k) => str(payload[k])).find(Boolean) ?? "";
  const attachments = input.attachments ?? [];
  const email = str(payload.email);
  const phone = str(payload.phone) || str(payload.telefon);
  const nameRow = rows.find((r) => r.label === "Ad Soyad");
  const positionTitle = str(payload.positionTitle);
  const createdAt = (input.createdAt ?? new Date()).toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    dateStyle: "long",
    timeStyle: "short",
  });
  const localeName = input.locale ? LOCALE_NAMES[input.locale] ?? input.locale : "";
  const adminUrl = `${SITE_URL.replace(/\/$/, "")}/admin/messages`;

  const headline = nameRow ? esc(nameRow.value) : meta.title;
  const subline = type === "career" && positionTitle ? `${esc(positionTitle)} pozisyonu için başvurdu` : meta.title;

  const actions = [
    email ? button(`mailto:${email}`, "E-posta ile yanıtla", true) : "",
    phone ? button(telHref(phone), "Ara", false) : "",
    phone ? button(whatsappHref(phone), "WhatsApp", false) : "",
  ].join("");

  const divider = (color: string, colspan = 1) =>
    `<tr><td colspan="${colspan}" height="1" bgcolor="${color}" style="${bg(color)}height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>`;

  const rowsHtml = rows
    .map(
      (r, i) => `
        ${i > 0 ? divider(COLORS.border, 2) : ""}
        <tr>
          <td bgcolor="${COLORS.card}" style="${bg(COLORS.card)}padding:12px 16px;width:34%;font-size:13px;color:${COLORS.muted};vertical-align:top;">${ink(esc(r.label))}</td>
          <td bgcolor="${COLORS.card}" style="${bg(COLORS.card)}padding:12px 16px;font-size:14px;color:${COLORS.text};font-weight:500;word-break:break-word;">${renderValue(r)}</td>
        </tr>`
    )
    .join("");

  const sectionLabel = (label: string) =>
    `<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.muted};font-weight:600;margin-bottom:10px;">${ink(label)}</div>`;

  const messageHtml = message
    ? `
      <tr><td style="padding:24px 32px 0;">
        ${sectionLabel("Mesaj")}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;"><tr>
          <td width="3" bgcolor="${COLORS.red}" style="${bg(COLORS.red)}width:3px;border-radius:8px 0 0 8px;font-size:0;">&nbsp;</td>
          <td bgcolor="${COLORS.soft}" style="${bg(COLORS.soft)}border-radius:0 8px 8px 0;padding:16px 18px;font-size:14px;line-height:1.65;color:${COLORS.text};white-space:pre-wrap;word-break:break-word;">${ink(esc(message))}</td>
        </tr></table>
      </td></tr>`
    : "";

  const attachmentsHtml = attachments.length
    ? `
      <tr><td style="padding:24px 32px 0;">
        ${sectionLabel("Ekler")}
        ${attachments
          .map((a) =>
            framed(
              `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${COLORS.card}" style="${bg(COLORS.card)}border-radius:9px;border-collapse:separate;"><tr>
                <td width="1" style="padding:12px 10px 12px 16px;white-space:nowrap;vertical-align:middle;">
                  <span style="display:inline-block;${bg(COLORS.chip)}color:#ffffff;font-size:11px;font-weight:700;letter-spacing:.5px;border-radius:6px;padding:3px 8px;">${ink(esc(a.label))}</span>
                </td>
                <td style="padding:12px 16px 12px 0;font-size:14px;color:${COLORS.text};vertical-align:middle;">${ink(
                  `<strong style="color:${COLORS.text};word-break:break-all;">${esc(a.filename)}</strong><span style="color:${COLORS.muted};"> · ${formatFileSize(a.size)}</span>`
                )}</td>
              </tr></table>`,
              COLORS.border,
              10,
              "margin-bottom:8px;"
            )
          )
          .join("")}
        <div style="font-size:12px;color:${COLORS.muted};margin-top:4px;">${ink("Dosyalar bu e-postaya ek olarak iliştirilmiştir.")}</div>
      </td></tr>`
    : "";

  const metaLine = (label: string, value: string) =>
    `<div>${ink(`<strong style="color:${COLORS.text};">${label}:</strong> ${esc(value)}`)}</div>`;

  const card = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${COLORS.card}" style="${bg(COLORS.card)}border-radius:17px;border-collapse:separate;overflow:hidden;">
        <tr><td bgcolor="${COLORS.head}" style="${bg(COLORS.head)}border-radius:17px 17px 0 0;padding:24px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td><a href="${SITE_URL}" style="text-decoration:none;"><img src="${EMAIL_LOGO_URL}" width="150" height="24" alt="${esc(BRAND)}" style="display:block;border:0;outline:none;width:150px;height:auto;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:3px;"></a></td>
            <td align="right"><span style="display:inline-block;${bg(COLORS.red)}color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:999px;padding:6px 12px;">${ink(esc(meta.badge))}</span></td>
          </tr></table>
        </td></tr>
        ${divider(COLORS.headBorder)}

        <tr><td style="padding:32px 32px 8px;">
          <div style="font-size:13px;color:${COLORS.muted};margin-bottom:6px;">${ink(subline)}</div>
          <div style="font-size:24px;line-height:1.3;font-weight:700;color:${COLORS.text};">${ink(headline)}</div>
        </td></tr>

        ${actions ? `<tr><td style="padding:16px 32px 0;">${actions}</td></tr>` : ""}

        <tr><td style="padding:16px 32px 0;">
          ${framed(
            `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${COLORS.card}" style="${bg(COLORS.card)}border-radius:11px;border-collapse:separate;overflow:hidden;">${rowsHtml}</table>`,
            COLORS.border,
            12
          )}
        </td></tr>

        ${messageHtml}
        ${attachmentsHtml}

        <tr><td style="padding:28px 32px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;"><tr>
            <td bgcolor="${COLORS.soft}" style="${bg(COLORS.soft)}border-radius:12px;padding:14px 16px;font-size:12px;line-height:1.7;color:${COLORS.muted};">
              ${metaLine("Tarih", createdAt)}
              ${localeName ? metaLine("Site dili", localeName) : ""}
              ${metaLine("Kayıt no", submissionId)}
              <div>${ink(`<a href="${esc(adminUrl)}" style="color:${COLORS.text};font-weight:600;text-decoration:none;">Admin panelinde görüntüle →</a>`)}</div>
            </td>
          </tr></table>
        </td></tr>
      </table>`;

  const html = `<!DOCTYPE html>
<html lang="tr" style="${bg(COLORS.page)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(meta.title)}</title>
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body { margin:0; padding:0; background-color:${COLORS.page}; }
  ${GMAIL_STYLE}
</style>
</head>
<body class="body" bgcolor="${COLORS.page}" style="margin:0;padding:0;${bg(COLORS.page)}font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${esc(meta.title)}${nameRow ? " — " + esc(nameRow.value) : ""}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${COLORS.page}" style="${bg(COLORS.page)}">
    <tr><td align="center" style="padding:32px 12px;">
      ${framed(card, COLORS.headBorder, 18, "max-width:600px;")}
      <div style="max-width:600px;padding:16px 12px 0;font-size:11px;line-height:1.6;color:${COLORS.muted};text-align:center;">
        ${ink(`Bu e-posta ${siteHost()} üzerindeki form aracılığıyla otomatik gönderildi.${email ? " Yanıtla dediğinizde cevabınız doğrudan başvurana gider." : ""}`)}
      </div>
    </td></tr>
  </table>
</body>
</html>`;

  const textLines = [
    meta.title.toLocaleUpperCase("tr-TR"),
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    ...(message ? ["", "Mesaj:", message] : []),
    ...(attachments.length ? ["", "Ekler:", ...attachments.map((a) => `- ${a.label}: ${a.filename} (${formatFileSize(a.size)})`)] : []),
    "",
    `Tarih: ${createdAt}`,
    ...(localeName ? [`Site dili: ${localeName}`] : []),
    `Kayıt no: ${submissionId}`,
    `Admin: ${adminUrl}`,
  ];

  return { html, text: textLines.join("\n") };
}
