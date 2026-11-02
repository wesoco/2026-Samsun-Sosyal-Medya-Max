"use client";

import { useState } from "react";
import { RefLead } from "@/components/site/RefLead";
import { REF_PAGE, type HomeRef } from "@/lib/home-refs";

const FILTERS = [
  { key: "tanitici", label: "Tanıtım Filmi" },
  { key: "gorsel", label: "Post" },
  { key: "reels", label: "Reels" },
] as const;

function youtubeId(url: string | null | undefined) {
  if (!url) return null;
  if (/^[\w-]{11}$/.test(url)) return url;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m?.[1] || null;
}

function RefCard({ r, hidden, reveal }: { r: HomeRef; hidden: boolean; reveal: boolean }) {
  const [playing, setPlaying] = useState(false);
  const yt = youtubeId(r.videoUrl);
  const dims =
    r.filter === "reels"
      ? { w: 1080, h: 1920, label: "Reels" }
      : r.filter === "tanitici"
        ? { w: 1920, h: 1080, label: "Tanıtım filmi" }
        : { w: 1080, h: 1350, label: "Post" };

  return (
    <article
      className={`ref-card${reveal ? " reveal" : ""}${yt ? " ref-card-video" : ""}`}
      data-cat={r.filter}
      hidden={hidden}
    >
      {yt && playing ? (
        <div className="ref-media">
          <iframe
            src={`https://www.youtube.com/embed/${yt}?autoplay=1`}
            title={r.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : yt ? (
        <button
          type="button"
          className="ref-media ref-play"
          aria-label={`${r.title} videosunu oynat`}
          onClick={() => setPlaying(true)}
        >
          <img
            src={r.imageUrl}
            alt={`${r.title}, Samsun ${dims.label.toLowerCase()} referansı`}
            width={dims.w}
            height={dims.h}
            loading="lazy"
            referrerPolicy="no-referrer"
            decoding="async"
          />
          <span className="play-icon" aria-hidden="true" />
        </button>
      ) : (
        <div className="ref-media">
          <img
            src={r.imageUrl}
            alt={`${r.title} Samsun sosyal medya referansı (${dims.label})`}
            width={dims.w}
            height={dims.h}
            loading="lazy"
            referrerPolicy="no-referrer"
            decoding="async"
          />
        </div>
      )}
      <div className="ref-body">
        <span className="ref-sector">{dims.label}</span>
        <h3>{r.title}</h3>
        <RefLead text={r.lead || ""} />
      </div>
    </article>
  );
}

/**
 * Ana sayfa referansları: HTML'de yalnız açık sekmenin ilk REF_PAGE kartı gelir.
 * Diğer sekmeler ilk tıklamada, "Devamını gör" kalanı /api/refs'ten çeker
 * (ana sayfa HTML'i ve RSC verisi küçülsün — mobil LCP/TBT için).
 */
export function HomeRefs({ initial, totals }: { initial: HomeRef[]; totals: Record<string, number> }) {
  const first = initial[0]?.filter ?? "tanitici";
  const [filter, setFilter] = useState<string>(first);
  const [loaded, setLoaded] = useState<Record<string, HomeRef[]>>({ [first]: initial });
  const [complete, setComplete] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fetchRefs = async (key: string, offset: number, limit?: number) => {
    setLoading(true);
    try {
      const q = `filter=${encodeURIComponent(key)}&offset=${offset}${limit ? `&limit=${limit}` : ""}`;
      const res = await fetch(`/api/refs?${q}`);
      const data = (await res.json()) as { items?: HomeRef[] };
      setLoaded((prev) => ({ ...prev, [key]: [...(prev[key] ?? []), ...(data.items ?? [])] }));
      if (!limit) setComplete((prev) => ({ ...prev, [key]: true }));
    } finally {
      setLoading(false);
    }
  };

  const selectFilter = (key: string) => {
    setFilter(key);
    if (!loaded[key]) void fetchRefs(key, 0, REF_PAGE);
  };

  const shown = loaded[filter]?.length ?? 0;
  const needsMore = !complete[filter] && (totals[filter] ?? 0) > shown;

  return (
    <>
      <div className="ref-filters" role="tablist" aria-label="Referans türü">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn${filter === f.key ? " is-active" : ""}`}
            data-filter={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => selectFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="ref-grid" id="refGrid">
        {Object.entries(loaded).flatMap(([key, items]) =>
          items.map((r, i) => (
            <RefCard
              key={r.id}
              r={r}
              hidden={key !== filter}
              reveal={key === first && i < REF_PAGE}
            />
          ))
        )}
      </div>
      <div className="ref-more-wrap">
        {needsMore ? (
          <button
            type="button"
            className="btn btn-primary ref-more-btn"
            onClick={() => fetchRefs(filter, shown)}
            disabled={loading}
          >
            {loading ? "Yükleniyor…" : "Devamını gör"}
          </button>
        ) : null}
      </div>
    </>
  );
}
