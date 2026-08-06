import { mimeFromExt, readUpload } from "@/lib/uploads";

export const runtime = "nodejs";

type Props = { params: Promise<{ path: string[] }> };

export async function GET(_req: Request, { params }: Props) {
  const { path: parts } = await params;
  const file = await readUpload(parts);
  if (!file) return new Response("Not found", { status: 404 });

  const mime = mimeFromExt(file.abs);
  return new Response(new Uint8Array(file.data), {
    status: 200,
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
