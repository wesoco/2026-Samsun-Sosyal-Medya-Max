import Link from "next/link";
import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  const sp = await searchParams;

  async function deleteService(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = String(formData.get("id"));
    const s = await prisma.service.findUnique({ where: { id } });
    await prisma.service.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/hizmetler");
    if (s) {
      revalidatePath(`/services/${s.slug}`);
      revalidatePath(`/hizmetler/${s.slug}`);
    }
    revalidateSitemapAndFeed();
    redirect("/admin/services");
  }

  return (
    <AdminChrome
      title="Hizmetler"
      description="Hizmet sayfaları, SEO alanları ve SSS. Sıra ana sayfa ve /hizmetler listesini etkiler."
      actions={
        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
          Yeni hizmet
        </Link>
      }
    >
      {sp.error ? <p className="form-error admin-alert">Kayıt başarısız (slug çakışması olabilir).</p> : null}
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hizmet</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.title}</strong>
                    <div className="admin-muted">
                      <Link href={paths.service(s.slug)} target="_blank" className="admin-link">
                        /hizmetler/{s.slug}
                      </Link>
                    </div>
                  </td>
                  <td>{s.sortOrder}</td>
                  <td>
                    <span className={`admin-badge ${s.published ? "is-live" : "is-draft"}`}>
                      {s.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={`/admin/services/${s.id}`} className="admin-btn admin-btn-sm">
                        Düzenle
                      </Link>
                      <form action={deleteService}>
                        <input type="hidden" name="id" value={s.id} />
                        <button type="submit" className="admin-btn admin-btn-sm admin-btn-danger">
                          Sil
                        </button>
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
