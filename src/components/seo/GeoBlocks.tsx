import type { ReactNode } from "react";

type AnswerBoxProps = {
  title?: string;
  children: ReactNode;
};

/** AI Overview / AEO dostu kısa cevap kutusu */
export function AnswerBox({ title = "Kısa cevap", children }: AnswerBoxProps) {
  return (
    <aside className="seo-answer-box" aria-label={title}>
      <p className="seo-answer-label">{title}</p>
      <div className="seo-answer-body">{children}</div>
    </aside>
  );
}

type GeoSectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

export function GeoSection({ id, title, children }: GeoSectionProps) {
  return (
    <section className="seo-geo-section" id={id}>
      <h2>{title}</h2>
      <div className="seo-geo-body">{children}</div>
    </section>
  );
}

type ComparisonTableProps = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export function ComparisonTable({ caption, headers, rows }: ComparisonTableProps) {
  return (
    <div className="seo-table-wrap">
      <table className="seo-comparison-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} data-label={headers[j] || undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type FaqItem = { q: string; a: string };

type FaqBlockProps = {
  title?: string;
  faqs: FaqItem[];
};

export function FaqBlock({ title = "Sıkça sorulanlar", faqs }: FaqBlockProps) {
  if (!faqs.length) return null;
  return (
    <section className="seo-faq-block">
      <h2>{title}</h2>
      <div className="faq-list page-faq">
        {faqs.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
