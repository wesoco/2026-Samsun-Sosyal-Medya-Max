"use client";

import { useState } from "react";

export type ContactFormLabels = {
  name: string;
  phone: string;
  email: string;
  district: string;
  service: string;
  message: string;
  submit: string;
  success: string;
  error: string;
};

const DEFAULT_LABELS: ContactFormLabels = {
  name: "Ad Soyad",
  phone: "Telefon",
  email: "E-posta",
  district: "İlçe",
  service: "Hizmet",
  message: "Mesaj",
  submit: "Gönder",
  success: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
  error: "Gönderilemedi. Lütfen tekrar deneyin veya WhatsApp yazın.",
};

type Props = {
  districts: string[];
  services: string[];
  labels?: Partial<ContactFormLabels>;
};

export function ContactForm({ districts, services, labels }: Props) {
  const L = { ...DEFAULT_LABELS, ...labels };
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || data?.ok === false) {
        setStatus("err");
        return;
      }
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={onSubmit}
      toolname="submit_contact_form"
      tooldescription="Trabzon Sosyal Medya iletişim formunu doldurup gönderir. Teklif, WhatsApp veya proje talebi için kullanın."
    >
      <div className="form-row">
        <label>
          {L.name}
          <input name="name" required autoComplete="name" title={L.name} aria-label={L.name} />
        </label>
        <label>
          {L.phone}
          <input name="phone" required autoComplete="tel" title={L.phone} aria-label={L.phone} />
        </label>
      </div>
      <div className="form-row">
        <label>
          {L.email}
          <input name="email" type="email" autoComplete="email" title={L.email} aria-label={L.email} />
        </label>
        <label>
          {L.district}
          <select name="district" defaultValue="" title={L.district} aria-label={L.district}>
            <option value="" disabled>
              Seçin
            </option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {L.service}
        <select name="service" defaultValue="" title={L.service} aria-label={L.service}>
          <option value="" disabled>
            Seçin
          </option>
          {services.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </label>
      <label>
        {L.message}
        <textarea name="message" rows={4} required title={L.message} aria-label={L.message} />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Gönderiliyor..." : L.submit}
      </button>
      {status === "ok" && <p className="form-success">{L.success}</p>}
      {status === "err" && <p className="form-error">{L.error}</p>}
    </form>
  );
}
