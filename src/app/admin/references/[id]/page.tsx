import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminReferenceEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const r = await prisma.referenceItem.findUnique({ where: { id } });
  if (!r) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.referenceItem.update({
      where: { id },
      data: {
        title: String(formData.get("title") || ""),
        lead: String(formData.get("lead") || ""),
        filter: String(formData.get("filter") || "gorsel"),
        imageUrl: String(formData.get("imageUrl") || ""),
        videoUrl: String(formData.get("videoUrl") || "") || null,
        sortOrder: Number(formData.get("sortOrder") || 0),
        published: formData.get("published") === "on",
      },
    });
    revalidatePath("/");
    redirect("/admin/references");
  }

  return (
    <AdminChrome title="Referans düzenle">
      <form action={update} className="admin-form">
        <label>
          Başlık
          <input name="title" required defaultValue={r.title} />
        </label>
        <label>
          Kısa açıklama
          <input name="lead" defaultValue={r.lead} />
        </label>
        <label>
          Format
          <select name="filter" required defaultValue={r.filter}>
            <option value="gorsel">Post · 1080×1350</option>
            <option value="reels">Reels · 1080×1920</option>
            <option value="tanitici">Tanıtım filmi · 1920×1080</option>
          </select>
        </label>
        <ImageField name="imageUrl" label="Görsel" folder="refs" required defaultValue={r.imageUrl} />
        <label>
          Video URL
          <input name="videoUrl" defaultValue={r.videoUrl || ""} />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={r.sortOrder} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={r.published} /> Yayınla
        </label>
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
