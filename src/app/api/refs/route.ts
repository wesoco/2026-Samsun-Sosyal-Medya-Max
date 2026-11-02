import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FILTERS = new Set(["tanitici", "gorsel", "reels"]);

/** Ana sayfa referansları: sekme ilk açılınca ilk sayfa (limit), "Devamını gör" ile kalanı */
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "";
  const offset = Math.max(0, Number(searchParams.get("offset")) || 0);
  const limit = Number(searchParams.get("limit")) || undefined;
  if (!FILTERS.has(filter)) {
    return NextResponse.json({ items: [] }, { status: 400 });
  }

  const items = await prisma.referenceItem.findMany({
    where: { published: true, filter },
    orderBy: { sortOrder: "asc" },
    skip: offset,
    take: limit && limit > 0 ? Math.min(limit, 60) : undefined,
    select: { id: true, title: true, lead: true, filter: true, imageUrl: true, videoUrl: true },
  });

  return NextResponse.json(
    { items },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
