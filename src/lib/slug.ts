/** URL slug — Türkçe karakterler ASCII’ye (öğrenci → ogrenci). */

const TR_MAP: Record<string, string> = {
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ş: "s",
  Ş: "s",
  ı: "i",
  I: "i",
  İ: "i",
  i: "i",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

export function slugify(input: string): string {
  return String(input || "")
    .trim()
    .replace(/[ğĞüÜşŞıIİiöÖçÇ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLocaleLowerCase("en-US")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isAsciiSlug(input: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(input || "").trim());
}
