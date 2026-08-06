"use client";

import { useMemo, useState } from "react";

export type ProcessStepForm = {
  num: string;
  title: string;
  desc: string;
};

type Props = {
  name?: string;
  initial: ProcessStepForm[];
};

const emptyStep = (index: number): ProcessStepForm => ({
  num: String(index + 1).padStart(2, "0"),
  title: "",
  desc: "",
});

export function ProcessStepsEditor({ name = "processJson", initial }: Props) {
  const [steps, setSteps] = useState<ProcessStepForm[]>(
    initial.length ? initial.map((s) => ({ ...emptyStep(0), ...s })) : [emptyStep(0)],
  );

  const json = useMemo(() => JSON.stringify(steps), [steps]);

  function update(i: number, patch: Partial<ProcessStepForm>) {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function renumber(list: ProcessStepForm[]) {
    return list.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));
  }

  function add() {
    setSteps((prev) => [...prev, emptyStep(prev.length)]);
  }

  function remove(i: number) {
    setSteps((prev) => (prev.length <= 1 ? prev : renumber(prev.filter((_, idx) => idx !== i))));
  }

  function move(i: number, dir: -1 | 1) {
    setSteps((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return renumber(next);
    });
  }

  return (
    <div className="admin-hero-editor">
      <input type="hidden" name={name} value={json} />
      {steps.map((step, i) => (
        <fieldset key={i} className="admin-fieldset admin-hero-slide">
          <legend>
            Adım {step.num || i + 1}
            <span className="admin-hero-slide-tools">
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => move(i, 1)}
                disabled={i === steps.length - 1}
              >
                ↓
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => remove(i)} disabled={steps.length <= 1}>
                Sil
              </button>
            </span>
          </legend>
          <div className="admin-field-grid">
            <label>
              Numara
              <input value={step.num} onChange={(e) => update(i, { num: e.target.value })} required placeholder="01" />
            </label>
            <label>
              Başlık
              <input value={step.title} onChange={(e) => update(i, { title: e.target.value })} required />
            </label>
          </div>
          <label>
            Açıklama
            <textarea value={step.desc} onChange={(e) => update(i, { desc: e.target.value })} rows={2} required />
          </label>
        </fieldset>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>
        + Adım ekle
      </button>
    </div>
  );
}
