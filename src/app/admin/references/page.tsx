import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

const FILTER_LABEL: Record<string, string> = {
  gorsel: "Post",
  reels: "Reels",
  tanitici: "Tanıtım",
};

export default async function AdminReferencesPage() {
  await requireStaff();
  const items = await prisma.referenceItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function create(formData: FormData) {
    "use server";
    await requireStaff();
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
    await requireStaff();
    await prisma.referenceItem.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    redirect("/admin/references");
  }

  return (
    <AdminChrome
      title="Referanslar"
      description="Ana sayfa portföy kartları. Görsel yükleyin veya URL yapıştırın."
    >
      <form action={create} className="admin-form admin-panel">
        <h2 className="admin-subhead">Yeni referans</h2>
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
        <button className="admin-btn admin-btn-primary" type="submit">
          Ekle
        </button>
      </form>

      <div className="admin-media-grid">
        {items.map((r) => (
          <article key={r.id} className="admin-media-card">
            <div className="admin-media-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.imageUrl} alt="" />
            </div>
            <div className="admin-media-body">
              <div className="admin-media-meta">
                <span className="admin-badge">{FILTER_LABEL[r.filter] || r.filter}</span>
                <span className={`admin-badge ${r.published ? "is-live" : "is-draft"}`}>
                  {r.published ? "Yayında" : "Taslak"}
                </span>
              </div>
              <strong>{r.title}</strong>
              {r.lead ? <p className="admin-muted">{r.lead}</p> : null}
              <div className="admin-row-actions">
                <Link href={`/admin/references/${r.id}`} className="admin-btn admin-btn-sm">
                  Düzenle
                </Link>
                <form action={deleteItem}>
                  <input type="hidden" name="id" value={r.id} />
                  <ConfirmDeleteButton confirmMessage={`“${r.title}” silinsin mi?`} />
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminChrome>
  );
}
