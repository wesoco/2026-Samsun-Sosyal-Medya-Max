"use client";

import { useMemo, useState } from "react";

/** [sektör, içerik odağı, sinyal] */
export type ApproachRow = [string, string, string];

type Props = {
  name?: string;
  initial: ApproachRow[];
};

const emptyRow = (): ApproachRow => ["", "", ""];

export function ApproachTableEditor({ name = "approachTableJson", initial }: Props) {
  const [rows, setRows] = useState<ApproachRow[]>(
    initial.length
      ? initial.map((r) => [String(r[0] || ""), String(r[1] || ""), String(r[2] || "")] as ApproachRow)
      : [emptyRow()],
  );

  const json = useMemo(() => JSON.stringify(rows), [rows]);

  function update(i: number, col: 0 | 1 | 2, value: string) {
    setRows((prev) =>
      prev.map((row, idx) => {
        if (idx !== i) return row;
        const next: ApproachRow = [row[0], row[1], row[2]];
        next[col] = value;
        return next;
      }),
    );
  }

  function add() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function remove(i: number) {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));
  }

  function move(i: number, dir: -1 | 1) {
    setRows((prev) => {
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
      {rows.map((row, i) => (
        <fieldset key={i} className="admin-fieldset admin-hero-slide">
          <legend>
            Satır {i + 1}
            <span className="admin-hero-slide-tools">
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => move(i, 1)}
                disabled={i === rows.length - 1}
              >
                ↓
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => remove(i)} disabled={rows.length <= 1}>
                Sil
              </button>
            </span>
          </legend>
          <div className="admin-field-grid">
            <label>
              Sektör
              <input value={row[0]} onChange={(e) => update(i, 0, e.target.value)} required placeholder="Restoran / kafe" />
            </label>
            <label>
              İçerik planı odağı
              <input value={row[1]} onChange={(e) => update(i, 1, e.target.value)} required placeholder="Menü, story temposu…" />
            </label>
            <label>
              İzlediğimiz sinyal
              <input value={row[2]} onChange={(e) => update(i, 2, e.target.value)} required placeholder="Mesaj / rezervasyon" />
            </label>
          </div>
        </fieldset>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>
        + Satır ekle
      </button>
    </div>
  );
}
