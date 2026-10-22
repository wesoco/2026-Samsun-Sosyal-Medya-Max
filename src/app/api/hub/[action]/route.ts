import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { saveUpload } from "@/lib/uploads";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Wesoco merkezi paneli için görsel yükleme ve önbellek tazeleme.
 * HUB_API_TOKEN (en az 32 karakter) tanımlı değilse tüm istekler reddedilir.
 */
function authorized(req: Request) {
  const expected = process.env.HUB_API_TOKEN || "";
  if (expected.length < 32) return false;
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Props = { params: Promise<{ action: string }> };

export async function GET(req: Request, { params }: Props) {
  const { action } = await params;
  if (action !== "ping") return Response.json({ error: "Bulunamadı" }, { status: 404 });
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 });
  return Response.json({ ok: true });
}

export async function POST(req: Request, { params }: Props) {
  const { action } = await params;
  if (!authorized(req)) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  if (action === "upload") {
    try {
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) return Response.json({ error: "file alanı gerekli" }, { status: 400 });
      const folder = typeof form.get("folder") === "string" ? String(form.get("folder")) : "misc";
      return Response.json(await saveUpload(file, folder));
    } catch (e) {
      return Response.json({ error: e instanceof Error ? e.message : "Yükleme başarısız" }, { status: 400 });
    }
  }

  if (action === "revalidate") {
    const body = (await req.json().catch(() => ({}))) as { paths?: unknown };
    const paths = Array.isArray(body.paths)
      ? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/")).slice(0, 50)
      : [];
    for (const p of paths) revalidatePath(p);
    revalidatePath("/", "layout");
    revalidateSitemapAndFeed();
    return Response.json({ ok: true, revalidated: paths.length });
  }

  return Response.json({ error: "Bulunamadı" }, { status: 404 });
}
