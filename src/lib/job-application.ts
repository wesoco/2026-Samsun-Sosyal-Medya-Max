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
