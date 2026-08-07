import Link from "next/link";
import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; q?: string; status?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const q = (sp.q || "").trim();
  const status = sp.status || "all";

  const posts = await prisma.blogPost.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { slug: { contains: q, mode: "insensitive" } },
                { category: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        status === "live" ? { published: true } : status === "draft" ? { published: false } : {},
      ],
    },
    orderBy: { publishedAt: "desc" },
  });

  const [liveCount, draftCount] = await Promise.all([
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
  ]);

  async function deletePost(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = String(formData.get("id"));
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidateSitemapAndFeed();
    redirect("/admin/blog");
  }

  return (
    <AdminChrome
      title="Blog yönetimi"
      description={`${liveCount} yayında · ${draftCount} taslak. SEO title, özet, HTML ve SSS buradan düzenlenir.`}
      actions={
        <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">
          Yeni yazı
        </Link>
      }
    >
      {sp.error ? <p className="form-error admin-alert">Kayıt başarısız (slug çakışması olabilir).</p> : null}

      <form className="admin-toolbar" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Başlık, slug veya kategori ara…"
          className="admin-search"
        />
        <select name="status" defaultValue={status} className="admin-select">
          <option value="all">Tümü</option>
          <option value="live">Yayında</option>
          <option value="draft">Taslak</option>
        </select>
        <button type="submit" className="admin-btn admin-btn-secondary">
          Filtrele
        </button>
      </form>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Yazı</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>Tarih</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    Sonuç yok.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.title}</strong>
                      <div className="admin-muted">
                        <Link href={paths.blogPost(p.slug)} target="_blank" className="admin-link">
                          /blog/{p.slug}
                        </Link>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <span className={`admin-badge ${p.published ? "is-live" : "is-draft"}`}>
                        {p.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td>{p.publishedAt.toLocaleDateString("tr-TR")}</td>
                    <td>
                      <div className="admin-row-actions">
                        <Link href={`/admin/blog/${p.id}`} className="admin-btn admin-btn-sm">
                          Düzenle
                        </Link>
                        <form action={deletePost}>
                          <input type="hidden" name="id" value={p.id} />
                          <button type="submit" className="admin-btn admin-btn-sm admin-btn-danger">
                            Sil
                          </button>
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
