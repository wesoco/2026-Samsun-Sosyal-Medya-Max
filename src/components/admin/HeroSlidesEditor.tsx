"use client";

import { useMemo, useState } from "react";

export type HeroSlideForm = {
  signal: string;
  title: string;
  lead: string;
  image: string;
  alt: string;
  href?: string;
  cta?: string;
};

type Props = {
  name?: string;
  initial: HeroSlideForm[];
};

const emptySlide = (): HeroSlideForm => ({
  signal: "",
  title: "",
  lead: "",
  image: "/assets/hero/01.webp",
  alt: "",
  href: "",
  cta: "",
});

export function HeroSlidesEditor({ name = "heroSlidesJson", initial }: Props) {
  const [slides, setSlides] = useState<HeroSlideForm[]>(
    initial.length ? initial.map((s) => ({ ...emptySlide(), ...s })) : [emptySlide()],
  );

  const json = useMemo(() => JSON.stringify(slides), [slides]);

  function update(i: number, patch: Partial<HeroSlideForm>) {
    setSlides((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function add() {
    setSlides((prev) => [...prev, emptySlide()]);
  }

  function remove(i: number) {
    setSlides((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));
  }

  function move(i: number, dir: -1 | 1) {
    setSlides((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div className="admin-hero-editor">
      <input type="hidden" name={name} value={json} />
      {slides.map((slide, i) => (
        <fieldset key={i} className="admin-fieldset admin-hero-slide">
          <legend>
            Slayt {i + 1}
            <span className="admin-hero-slide-tools">
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => move(i, 1)}
                disabled={i === slides.length - 1}
              >
                ↓
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => remove(i)} disabled={slides.length <= 1}>
                Sil
              </button>
            </span>
          </legend>
          <div className="admin-field-grid">
            <label>
              Üst etiket (signal)
              <input value={slide.signal} onChange={(e) => update(i, { signal: e.target.value })} required />
            </label>
            <label>
              Buton metni (CTA)
              <input value={slide.cta || ""} onChange={(e) => update(i, { cta: e.target.value })} placeholder="Sosyal medya yönetimi" />
            </label>
          </div>
          <label>
            Başlık
            <input value={slide.title} onChange={(e) => update(i, { title: e.target.value })} required />
          </label>
          <label>
            Lead / kısa metin
            <textarea value={slide.lead} onChange={(e) => update(i, { lead: e.target.value })} rows={2} required />
          </label>
          <div className="admin-field-grid">
            <label>
              Buton linki
              <input value={slide.href || ""} onChange={(e) => update(i, { href: e.target.value })} placeholder="/hizmetler/…" />
            </label>
            <label>
              Görsel alt metni
              <input value={slide.alt} onChange={(e) => update(i, { alt: e.target.value })} required />
            </label>
          </div>
          <SlideImageField
            label="Slayt görseli"
            value={slide.image}
            onChange={(image) => update(i, { image })}
          />
        </fieldset>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>
        + Slayt ekle
      </button>
    </div>
  );
}

function SlideImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
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
      fd.set("folder", "home");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Yükleme başarısız");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-image-field">
      <label>
        {label}
        <input value={value} onChange={(e) => onChange(e.target.value)} required placeholder="/media/… veya /assets/hero/…" />
      </label>
      <div className="admin-image-field-actions">
        <label className="admin-btn admin-btn-secondary admin-upload-btn">
          {busy ? "Yükleniyor…" : "Dosya yükle"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" hidden disabled={busy} onChange={onFile} />
        </label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="admin-image-preview" />
        ) : null}
      </div>
      {error ? <p className="form-error admin-alert">{error}</p> : null}
    </div>
  );
}
