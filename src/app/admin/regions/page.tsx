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

export default async function AdminRegionsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireStaff();
  const districts = await prisma.district.findMany({ orderBy: { sortOrder: "asc" } });
  const sp = await searchParams;

  async function deleteDistrict(formData: FormData) {
    "use server";
    await requireStaff();
    const id = String(formData.get("id"));
    const d = await prisma.district.findUnique({ where: { id } });
    await prisma.district.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/regions");
    revalidatePath("/bolgeler");
    if (d) {
      revalidatePath(`/regions/${d.slug}`);
      revalidatePath(`/bolgeler/${d.slug}`);
    }
    revalidateSitemapAndFeed();
    redirect("/admin/regions");
  }

  return (
    <AdminChrome
      title="Bölgeler"
      description="18 ilçe SEO sayfası. Footer ve /bolgeler üzerinden indekslenir; ana menüde gösterilmez."
      actions={
        <Link href="/admin/regions/new" className="admin-btn admin-btn-primary">
          Yeni bölge
        </Link>
      }
    >
      {sp.error ? <p className="form-error admin-alert">Kayıt başarısız (slug çakışması olabilir).</p> : null}
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>İlçe</th>
                <th>Etiket</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((d) => (
                <tr key={d.id}>
                  <td>
                    <strong>{d.name}</strong>
                    <div className="admin-muted">
                      <Link href={paths.region(d.slug)} target="_blank" className="admin-link">
                        /bolgeler/{d.slug}
                      </Link>
                    </div>
                  </td>
                  <td>{d.regionLabel}</td>
                  <td>
                    <span className={`admin-badge ${d.published ? "is-live" : "is-draft"}`}>
                      {d.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={`/admin/regions/${d.id}`} className="admin-btn admin-btn-sm">
                        Düzenle
                      </Link>
                      <form action={deleteDistrict}>
                        <input type="hidden" name="id" value={d.id} />
                        <ConfirmDeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminChrome>
  );
}
