import type { FaqPair } from "@/lib/seo";

/** Form alanlarından: faq_q_0 / faq_a_0 … */
export function parseFaqFromFormData(formData: FormData, max = 12): FaqPair[] {
  const out: FaqPair[] = [];
  for (let i = 0; i < max; i++) {
    const q = String(formData.get(`faq_q_${i}`) || "").trim();
    const a = String(formData.get(`faq_a_${i}`) || "").trim();
    if (q && a) out.push({ q, a });
  }
  return out;
}

/** Eski JSON textarea desteği (geriye dönük) */
export function parseFaqFormValue(raw: string): FaqPair[] {
  try {
    const v = JSON.parse(raw || "[]");
    if (!Array.isArray(v)) return [];
    return v
      .map((item: Record<string, string>) => ({
        q: String(item.q || item.question || "").trim(),
        a: String(item.a || item.answer || "").trim(),
      }))
      .filter((f: FaqPair) => f.q && f.a);
  } catch {
    return [];
  }
}

export function faqToPairs(faq: unknown): FaqPair[] {
  if (!Array.isArray(faq)) return [];
  return faq
    .map((item: Record<string, string>) => ({
      q: String(item.q || item.question || "").trim(),
      a: String(item.a || item.answer || "").trim(),
    }))
    .filter((f) => f.q && f.a);
}

/** @deprecated admin artık FaqEditor kullanıyor */
export function faqJsonToFormValue(faq: unknown): string {
  return JSON.stringify(faqToPairs(faq), null, 2);
}
