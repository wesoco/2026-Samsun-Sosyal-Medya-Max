import Link from "next/link";
import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function AdminSectorsPage() {
  await requireStaff();
  const items = await prisma.sectorPage.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });

  async function deleteItem(formData: FormData) {
    "use server";
    await requireStaff();
    await prisma.sectorPage.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/sektorler");
    revalidateSitemapAndFeed();
    redirect("/admin/sectors");
  }

  return (
    <AdminChrome
      title="Sektör sayfaları"
      description="Restoran, klinik, otel vb. sektör landing sayfaları."
      actions={
        <Link href="/admin/sectors/new" className="admin-btn admin-btn-primary">
          Yeni sektör
        </Link>
      }
    >
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sektör</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="admin-empty">
                    Henüz sektör yok.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <div className="admin-muted">
                        <Link href={paths.sector(item.slug)} target="_blank" className="admin-link">
                          /sektorler/{item.slug}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${item.published ? "is-live" : "is-draft"}`}>
                        {item.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <Link href={`/admin/sectors/${item.id}`} className="admin-btn admin-btn-sm">
                          Düzenle
                        </Link>
                        <form action={deleteItem}>
                          <input type="hidden" name="id" value={item.id} />
                          <ConfirmDeleteButton />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminChrome>
  );
}
