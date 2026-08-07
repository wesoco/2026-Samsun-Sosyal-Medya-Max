import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminLogosPage() {
  await requireStaff();
  const logos = await prisma.brandLogo.findMany({ orderBy: { sortOrder: "asc" } });

  async function create(formData: FormData) {
    "use server";
    await requireStaff();
    await prisma.brandLogo.create({
      data: {
        name: String(formData.get("name") || ""),
        imageUrl: String(formData.get("imageUrl") || ""),
        sortOrder: Number(formData.get("sortOrder") || 0),
        published: formData.get("published") === "on",
      },
    });
    revalidatePath("/");
    redirect("/admin/logos");
  }

  async function deleteLogo(formData: FormData) {
    "use server";
    await requireStaff();
    await prisma.brandLogo.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    redirect("/admin/logos");
  }

  return (
    <AdminChrome
      title="Marka logoları"
      description="Ana sayfadaki kayan logo şeridi. Yüksek çözünürlüklü PNG/WebP önerilir."
    >
      <form action={create} className="admin-form admin-panel">
        <h2 className="admin-subhead">Yeni logo</h2>
        <label>
          Ad
          <input name="name" required />
        </label>
        <ImageField name="imageUrl" label="Görsel" folder="logos" required placeholder="/assets/logos/…" />
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={logos.length + 1} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked /> Yayınla
        </label>
        <button className="admin-btn admin-btn-primary" type="submit">
          Ekle
        </button>
      </form>

      <div className="admin-media-grid admin-media-grid-logos">
        {logos.map((l) => (
          <article key={l.id} className="admin-media-card admin-media-card-logo">
            <div className="admin-media-thumb admin-media-thumb-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.imageUrl} alt={l.name} />
            </div>
            <div className="admin-media-body">
              <div className="admin-media-meta">
                <span className={`admin-badge ${l.published ? "is-live" : "is-draft"}`}>
                  {l.published ? "Yayında" : "Taslak"}
                </span>
                <span className="admin-muted">#{l.sortOrder}</span>
              </div>
              <strong>{l.name}</strong>
              <div className="admin-row-actions">
                <Link href={`/admin/logos/${l.id}`} className="admin-btn admin-btn-sm">
                  Düzenle
                </Link>
                <form action={deleteLogo}>
                  <input type="hidden" name="id" value={l.id} />
                  <ConfirmDeleteButton confirmMessage={`“${l.name}” logosu silinsin mi?`} />
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminChrome>
  );
}
