"use client";

import { useState } from "react";
import type { FaqPair } from "@/lib/seo";

type Props = {
  initial?: FaqPair[];
};

/** SSS - ziyaretçi normal soru-cevap görür; adminde JSON yok */
export function FaqEditor({ initial = [] }: Props) {
  const [items, setItems] = useState<FaqPair[]>(
    initial.length > 0 ? initial : [{ q: "", a: "" }, { q: "", a: "" }],
  );

  function update(i: number, key: "q" | "a", value: string) {
    setItems((prev) => prev.map((row, idx) => (idx === i ? { ...row, [key]: value } : row)));
  }

  function addRow() {
    if (items.length >= 12) return;
    setItems((prev) => [ ...prev, { q: "", a: "" }]);
  }

  function removeRow(i: number) {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i)));
  }

  return (
    <div className="admin-faq-editor">
      <p className="admin-hint">
        Sitede ziyaretçi bunları açılır soru-cevap olarak görür. Ham JSON yazmanıza gerek yok.
      </p>
      {items.map((row, i) => (
        <div key={i} className="admin-faq-row">
          <div className="admin-faq-row-head">
            <span>Soru {i + 1}</span>
            <button type="button" className="admin-btn admin-btn-sm admin-btn-ghost" onClick={() => removeRow(i)}>
              Kaldır
            </button>
          </div>
          <label>
            Soru
            <input
              name={`faq_q_${i}`}
              value={row.q}
              onChange={(e) => update(i, "q", e.target.value)}
              placeholder="Örn. Süreç ne kadar sürer?"
            />
          </label>
          <label>
            Cevap
            <textarea
              name={`faq_a_${i}`}
              rows={3}
              value={row.a}
              onChange={(e) => update(i, "a", e.target.value)}
              placeholder="Kısa, net cevap…"
            />
          </label>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addRow}>
        + Soru ekle
      </button>
    </div>
  );
}
