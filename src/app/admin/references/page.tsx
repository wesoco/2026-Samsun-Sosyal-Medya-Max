import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminReferencesPage() {
  await requireAdmin();
  const items = await prisma.referenceItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function create(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.referenceItem.create({
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

  async function deleteItem(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.referenceItem.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    redirect("/admin/references");
  }

  return (
    <AdminChrome title="Referanslar">
      <form action={create} className="admin-form">
        <label>
          Başlık
          <input name="title" required />
        </label>
        <label>
          Kısa açıklama
          <input name="lead" />
        </label>
        <label>
          Format
          <select name="filter" defaultValue="gorsel" required>
            <option value="gorsel">Post · 1080×1350</option>
            <option value="reels">Reels · 1080×1920</option>
            <option value="tanitici">Tanıtım filmi · 1920×1080</option>
          </select>
        </label>
        <ImageField name="imageUrl" label="Görsel" folder="refs" required placeholder="/assets/refs/…" />
        <label>
          Video URL (YouTube ID veya link)
          <input name="videoUrl" />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={items.length + 1} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked /> Yayınla
        </label>
        <button className="btn btn-primary" type="submit">
          Ekle
        </button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Filtre</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.filter}</td>
              <td>{r.published ? "Yayında" : "Taslak"}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link href={`/admin/references/${r.id}`}>Düzenle</Link>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit">Sil</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminChrome>
  );
}
