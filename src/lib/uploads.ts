import { createHash, randomBytes } from "crypto";
import { mkdir, writeFile, readFile, access } from "fs/promises";
import path from "path";
import { constants as fsConstants } from "fs";

const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/gif", "gif"],
]);

const FOLDERS = new Set(["refs", "logos", "blog", "home", "misc"]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export function getUploadRoot() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
}

export function sanitizeFolder(raw: string | null | undefined) {
  const f = (raw || "misc").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return FOLDERS.has(f) ? f : "misc";
}

export function extensionForMime(mime: string) {
  return ALLOWED.get(mime.toLowerCase()) || null;
}

export function isAllowedMime(mime: string) {
  return ALLOWED.has(mime.toLowerCase());
}

function monthStamp() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${m}`;
}

function uniqueName(ext: string) {
  const stamp = Date.now().toString(36);
  const rand = randomBytes(4).toString("hex");
  return `${stamp}-${rand}.${ext}`;
}

/** Kaydet → public URL `/media/{folder}/{yyyy-mm}/{file}` */
export async function saveUpload(file: File, folderRaw?: string | null) {
  if (!file || !file.size) throw new Error("Dosya yok");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Dosya en fazla 8 MB olabilir");
  const mime = file.type || "application/octet-stream";
  const ext = extensionForMime(mime);
  if (!ext) throw new Error("Sadece JPG, PNG, WebP, AVIF veya GIF yükleyebilirsiniz");

  const folder = sanitizeFolder(folderRaw);
  const relDir = path.join(folder, monthStamp());
  const filename = uniqueName(ext);
  const absDir = path.join(getUploadRoot(), relDir);
  await mkdir(absDir, { recursive: true });

  const buf = Buffer.from(await file.arrayBuffer());
  const absFile = path.join(absDir, filename);
  await writeFile(absFile, buf);

  const urlPath = `/media/${relDir.replace(/\\/g, "/")}/${filename}`;
  const hash = createHash("sha256").update(buf).digest("hex").slice(0, 12);
  return { url: urlPath, bytes: buf.length, mime, hash };
}

/** Path traversal korumalı dosya oku */
export async function readUpload(parts: string[]) {
  const safe = parts
    .map((p) => p.replace(/\\/g, "/"))
    .filter((p) => p && p !== "." && p !== ".." && !p.includes(".."));
  if (!safe.length) return null;

  const root = path.resolve(getUploadRoot());
  const abs = path.resolve(root, ...safe);
  if (!abs.startsWith(root + path.sep) && abs !== root) return null;

  try {
    await access(abs, fsConstants.R_OK);
    const data = await readFile(abs);
    return { data, abs };
  } catch {
    return null;
  }
}

export function mimeFromExt(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".gif": "image/gif",
  };
  return map[ext] || "application/octet-stream";
}
