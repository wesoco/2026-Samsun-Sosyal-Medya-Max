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

export default async function AdminCasesPage() {
  await requireStaff();
  const items = await prisma.caseStudy.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });

  async function deleteItem(formData: FormData) {
    "use server";
    await requireStaff();
    await prisma.caseStudy.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/vakalar");
    revalidatePath("/cases");
    revalidateSitemapAndFeed();
    redirect("/admin/cases");
  }

  return (
    <AdminChrome
      title="Vaka çalışmaları"
      description="Sektörel vaka sayfaları. Challenge, iş ve sonuç metinleri buradan yönetilir."
      actions={
        <Link href="/admin/cases/new" className="admin-btn admin-btn-primary">
          Yeni vaka
        </Link>
      }
    >
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vaka</th>
                <th>Sektör</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-empty">
                    Henüz vaka yok.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <div className="admin-muted">
                        <Link href={paths.caseStudy(item.slug)} target="_blank" className="admin-link">
                          /vakalar/{item.slug}
                        </Link>
                      </div>
                    </td>
                    <td>{item.sector}</td>
                    <td>
                      <span className={`admin-badge ${item.published ? "is-live" : "is-draft"}`}>
                        {item.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <Link href={`/admin/cases/${item.id}`} className="admin-btn admin-btn-sm">
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
