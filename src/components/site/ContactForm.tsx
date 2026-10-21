"use client";

import { useState } from "react";
import {
  JOB_FILES,
  hasAllowedExtension,
  isJobApplicationSubject,
  withJobApplicationSubject,
  type JobFileKey,
} from "@/lib/job-application";

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

const FILE_LABELS: Record<JobFileKey, string> = {
  cv: "CV ekle",
  portfolio: "Portfolyo ekle",
};

type Props = {
  districts: string[];
  services: string[];
  labels?: Partial<ContactFormLabels>;
};

function fileError(key: JobFileKey, file: File | null): string | null {
  const spec = JOB_FILES[key];
  if (!file || file.size === 0) {
    return spec.required ? `${spec.label} dosyası gerekli.` : null;
  }
  if (file.size > spec.maxBytes) return `${spec.label} en fazla ${spec.maxLabel} olabilir.`;
  if (!hasAllowedExtension(file.name, key)) {
    return `${spec.label} için ${spec.extensions.join(", ")} dosyası yükleyin.`;
  }
  return null;
}

export function ContactForm({ districts, services, labels }: Props) {
  const L = { ...DEFAULT_LABELS, ...labels };
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [subject, setSubject] = useState("");
  const [fileErrors, setFileErrors] = useState<Partial<Record<JobFileKey, string>>>({});
  const subjects = withJobApplicationSubject(services);
  const isJobApplication = isJobApplicationSubject(subject);

  function onFileChange(key: JobFileKey, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0] ?? null;
    const error = file ? fileError(key, file) : null;
    e.currentTarget.setCustomValidity(error ?? "");
    setFileErrors((prev) => ({ ...prev, [key]: error ?? undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (isJobApplication) {
      const errors: Partial<Record<JobFileKey, string>> = {};
      for (const key of Object.keys(JOB_FILES) as JobFileKey[]) {
        const value = fd.get(JOB_FILES[key].field);
        const error = fileError(key, value instanceof File ? value : null);
        if (error) errors[key] = error;
      }
      setFileErrors(errors);
      if (Object.keys(errors).length) return;
    } else {
      for (const key of Object.keys(JOB_FILES) as JobFileKey[]) fd.delete(JOB_FILES[key].field);
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || data?.ok === false) {
        setStatus("err");
        return;
      }
      form.reset();
      setSubject("");
      setFileErrors({});
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={onSubmit}
      encType="multipart/form-data"
      toolname="submit_contact_form"
      tooldescription="Samsun Sosyal Medya iletişim formunu doldurup gönderir. Teklif, WhatsApp, proje talebi veya iş başvurusu için kullanın."
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
        <select
          name="service"
          value={subject}
          onChange={(e) => setSubject(e.currentTarget.value)}
          title={L.service}
          aria-label={L.service}
        >
          <option value="" disabled>
            Seçin
          </option>
          {subjects.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </label>
      {isJobApplication && (
        <div className="form-row">
          {(Object.keys(JOB_FILES) as JobFileKey[]).map((key) => {
            const spec = JOB_FILES[key];
            const hintId = `contact-${spec.field}-hint`;
            return (
              <label key={key}>
                <span>
                  {FILE_LABELS[key]}
                  {!spec.required && <span className="form-optional"> (isteğe bağlı)</span>}
                </span>
                <input
                  name={spec.field}
                  type="file"
                  required={spec.required}
                  accept={spec.extensions.join(",")}
                  aria-describedby={hintId}
                  onChange={(e) => onFileChange(key, e)}
                />
                <span id={hintId} className={fileErrors[key] ? "form-hint form-error" : "form-hint"}>
                  {fileErrors[key] ??
                    `${spec.extensions.map((x) => x.slice(1).toUpperCase()).join(", ")} · en fazla ${spec.maxLabel}`}
                </span>
              </label>
            );
          })}
        </div>
      )}
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
