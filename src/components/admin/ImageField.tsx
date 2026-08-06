"use client";

import { useId, useState } from "react";

type Props = {
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  folder?: "refs" | "logos" | "blog" | "home" | "misc";
  placeholder?: string;
};

export function ImageField({
  name,
  label = "Görsel",
  defaultValue = "",
  required,
  folder = "misc",
  placeholder = "/media/… veya https://…",
}: Props) {
  const inputId = useId();
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Yükleme başarısız");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-image-field">
      <label htmlFor={inputId}>
        {label}
        <input
          id={inputId}
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required={required}
          placeholder={placeholder}
        />
      </label>
      <div className="admin-image-field-actions">
        <label className="admin-btn admin-btn-secondary admin-upload-btn">
          {busy ? "Yükleniyor…" : "Dosya yükle"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" hidden disabled={busy} onChange={onFile} />
        </label>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="admin-image-preview" />
        ) : null}
      </div>
      {error ? <p className="form-error admin-alert">{error}</p> : null}
      <p className="admin-hint">Yükleme veya harici /assets yolu. Max 8 MB · JPG/PNG/WebP/AVIF/GIF</p>
    </div>
  );
}
