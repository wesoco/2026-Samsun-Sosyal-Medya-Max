export const JOB_APPLICATION_SUBJECT = "İş Başvurusu";

const MB = 1024 * 1024;

export const JOB_FILES = {
  cv: {
    field: "cv",
    label: "CV",
    maxBytes: 5 * MB,
    maxLabel: "5 MB",
    extensions: [".pdf", ".doc", ".docx"],
    required: true,
  },
  portfolio: {
    field: "portfolio",
    label: "Portfolyo",
    maxBytes: 15 * MB,
    maxLabel: "15 MB",
    extensions: [".pdf", ".zip", ".ppt", ".pptx", ".jpg", ".jpeg", ".png", ".webp"],
    required: false,
  },
} as const;

export type JobFileKey = keyof typeof JOB_FILES;

export function isJobApplicationSubject(value: unknown): boolean {
  return (
    typeof value === "string" &&
    value.trim().toLocaleLowerCase("tr-TR") === JOB_APPLICATION_SUBJECT.toLocaleLowerCase("tr-TR")
  );
}

export function withJobApplicationSubject(subjects: string[]): string[] {
  return subjects.some(isJobApplicationSubject) ? subjects : [...subjects, JOB_APPLICATION_SUBJECT];
}

export function hasAllowedExtension(filename: string, key: JobFileKey): boolean {
  const lower = filename.toLowerCase();
  return JOB_FILES[key].extensions.some((ext) => lower.endsWith(ext));
}

function fileExtension(filename: string) {
  const m = /\.[^.]+$/.exec(filename.toLowerCase());
  return m ? m[0] : "";
}

/**
 * Sunucu tarafı: dosyanın ilk baytları uzantısıyla uyuşmalı (yeniden adlandırılmış
 * çalıştırılabilir dosya ya da betik e-postaya ek olarak gitmesin).
 */
export function matchesFileSignature(filename: string, bytes: Uint8Array): boolean {
  const at = (i: number, ...sig: number[]) => sig.every((b, j) => bytes[i + j] === b);
  const ascii = (i: number, text: string) => at(i, ...Array.from(text, (c) => c.charCodeAt(0)));
  switch (fileExtension(filename)) {
    case ".pdf":
      return ascii(0, "%PDF");
    case ".doc":
    case ".ppt":
      return at(0, 0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
    case ".docx":
    case ".pptx":
    case ".zip":
      return at(0, 0x50, 0x4b, 0x03, 0x04);
    case ".jpg":
    case ".jpeg":
      return at(0, 0xff, 0xd8, 0xff);
    case ".png":
      return at(0, 0x89, 0x50, 0x4e, 0x47);
    case ".webp":
      return ascii(0, "RIFF") && ascii(8, "WEBP");
    default:
      return false;
  }
}
