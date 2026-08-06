import { auth } from "@/lib/auth";
import { saveUpload } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return Response.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "file alanı gerekli" }, { status: 400 });
    }
    const folder = typeof form.get("folder") === "string" ? String(form.get("folder")) : "misc";
    const saved = await saveUpload(file, folder);
    return Response.json(saved);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Yükleme başarısız";
    return Response.json({ error: message }, { status: 400 });
  }
}
