import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createDefaultStore,
  normalizeAgentPostImages,
} from "@wesoco/seo-agent";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { requireStaff } from "@/lib/admin";
import { paths } from "@/lib/paths";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";

export const dynamic = "force-dynamic";

export default async function SeoAgentAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ fixed?: string }>;
}) {
  await requireStaff();
  const sp = await searchParams;
  const store = createDefaultStore();
  const posts = await store.list().catch(() => []);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status !== "published");

  async function fixDuplicateImages() {
    "use server";
    await requireStaff();
    const s = createDefaultStore();
    const all = await s.list();
    let n = 0;
    for (const p of all) {
      const fixed = normalizeAgentPostImages(p);
      if (fixed.coverImageUrl !== p.coverImageUrl) {
        await s.upsert({ ...fixed, updatedAt: new Date().toISOString() });
        n += 1;
      }
    }
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/seo-agent");
    revalidateSitemapAndFeed();
    redirect(`/admin/seo-agent?fixed=${n}`);
  }

  return (
    <AdminChrome
      title="SEO Agent"
      description="Wesoco panelinden gelen yazılar. Buradan düzenleyip tek görsele indirebilirsiniz."
      actions={
        <Link href="/admin/blog" className="admin-btn admin-btn-secondary">
          Prisma blog
        </Link>
      }
    >
      {sp.fixed != null ? (
        <p className="admin-alert" style={{ color: "var(--ok, #0a7)" }}>
          Çift kapak temizlendi: {sp.fixed} yazı güncellendi.
        </p>
      ) : null}

      <section className="admin-card">
        <h2>Çift görsel düzelt</h2>
        <p className="admin-muted">
          Panel kapak + içerikte aynı görseli gönderince biri kırık görünür. Bu düğme içerikte görsel olan
          yazılarda ayrı kapağı kaldırır.
        </p>
        <form action={fixDuplicateImages}>
          <button type="submit" className="admin-btn admin-btn-primary">
            Tüm agent yazılarında tek görsele indir
          </button>
        </form>
      </section>
      <section className="admin-card">
        <h2>Bağlantı</h2>
        <p>
          Public URL:{" "}
          <code>{process.env.SEO_AGENT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "—"}</code>
        </p>
        <p>
          Site key:{" "}
          <code>{process.env.SEO_AGENT_SITE_KEY ? "tanımlı" : "eksik"}</code>
          {" · "}
          Secret: <code>{process.env.SEO_AGENT_SECRET ? "tanımlı" : "eksik"}</code>
        </p>
        <p className="admin-muted">
          API: <code>/api/seo-agent/*</code> — imzasız istek 401 döner.
        </p>
      </section>

      <section className="admin-card">
        <h2>Yayında ({published.length})</h2>
        {published.length === 0 ? (
          <p>Henüz panelden yayınlanmış yazı yok.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Yazı</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {published.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.title}</strong>
                      <div className="admin-muted">
                        <Link href={paths.blogPost(p.slug)} target="_blank" className="admin-link">
                          /blog/{p.slug}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge is-live">Yayında</span>
                    </td>
                    <td>
                      <Link href={`/admin/seo-agent/${p.id}`} className="admin-btn admin-btn-sm">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {drafts.length > 0 ? (
        <section className="admin-card">
          <h2>Taslak ({drafts.length})</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Yazı</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.title}</strong>
                      <div className="admin-muted">/{p.slug}</div>
                    </td>
                    <td>
                      <Link href={`/admin/seo-agent/${p.id}`} className="admin-btn admin-btn-sm">
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </AdminChrome>
  );
}
