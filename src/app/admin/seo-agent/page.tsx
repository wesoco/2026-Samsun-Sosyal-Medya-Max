import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createDefaultStore,
  normalizeAgentPostImages,
} from "@wesoco/seo-agent";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { requireAdmin, requireStaff } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { getSeoAgentConfig, maskCredential } from "@/lib/seo-agent-config";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";

export const dynamic = "force-dynamic";

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default async function SeoAgentAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ fixed?: string; saved?: string }>;
}) {
  const session = await requireStaff();
  const isAdmin = session.user.role === "ADMIN";
  const sp = await searchParams;
  const store = createDefaultStore();
  const posts = await store.list().catch(() => []);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status !== "published");
  const sorted = [...posts].sort((a, b) => {
    const aT = Date.parse(a.updatedAt || a.publishedAt || "") || 0;
    const bT = Date.parse(b.updatedAt || b.publishedAt || "") || 0;
    return bT - aT;
  });

  const cfg = await getSeoAgentConfig();
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const hasKey = Boolean(cfg.siteKey);
  const hasSecret = Boolean(cfg.siteSecret);
  const linkOk = hasKey && hasSecret;

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

  async function saveConnection(formData: FormData) {
    "use server";
    await requireAdmin();
    const existing = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    const publicUrl = String(formData.get("seoAgentPublicUrl") || "").trim();
    const siteKey = String(formData.get("seoAgentSiteKey") || "").trim();
    const secretRaw = String(formData.get("seoAgentSecret") || "").trim();

    // Key/secret boşsa mevcut DB değeri korunur — tam değer HTML’e hiç basılmaz
    const data = {
      seoAgentPublicUrl: publicUrl || null,
      seoAgentSiteKey: siteKey || existing?.seoAgentSiteKey || null,
      seoAgentSecret: secretRaw || existing?.seoAgentSecret || null,
    };

    await prisma.siteSetting.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    });

    revalidatePath("/admin/seo-agent");
    redirect("/admin/seo-agent?saved=1");
  }

  return (
    <AdminChrome
      title="SEO Agent"
      description="Wesoco panelinden gelen yazılar. Bağlantıyı buradan yönetip yazıları düzenleyebilirsiniz."
      actions={
        <Link href="/admin/blog" className="admin-btn admin-btn-secondary">
          Prisma blog
        </Link>
      }
    >
      {sp.fixed != null ? (
        <p className="form-success admin-alert is-ok">
          Çift kapak temizlendi: {sp.fixed} yazı güncellendi.
        </p>
      ) : null}
      {sp.saved ? (
        <p className="form-success admin-alert is-ok">Bağlantı ayarları kaydedildi.</p>
      ) : null}

      <section className="admin-stat-grid" aria-label="SEO Agent özeti">
        <article className="admin-stat-card">
          <span className="admin-stat-label">Yayında</span>
          <strong>{published.length}</strong>
          <span className="admin-stat-meta">Panelden yayınlanan</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Taslak</span>
          <strong>{drafts.length}</strong>
          <span className="admin-stat-meta">Henüz yayında değil</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Toplam</span>
          <strong>{posts.length}</strong>
          <span className="admin-stat-meta">Agent deposu</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Bağlantı</span>
          <strong className={linkOk ? undefined : "is-alert"}>
            {[hasKey, hasSecret].filter(Boolean).length}/2
          </strong>
          <span className="admin-stat-meta">
            {linkOk ? "Key ve secret hazır" : "Eksik — yazı basılamaz"}
          </span>
        </article>
      </section>

      <section className="admin-dash-grid admin-stack">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>Çift görsel düzelt</h2>
          </div>
          <p className="admin-hint">
            Panel kapak + içerikte aynı görseli gönderince biri kırık görünür. Bu düğme içerikte
            görsel olan yazılarda ayrı kapağı kaldırır.
          </p>
          <form action={fixDuplicateImages}>
            <button type="submit" className="admin-btn admin-btn-secondary">
              Tek görsele indir
            </button>
          </form>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>Bağlantı</h2>
          </div>
          <p className="admin-hint">
            Değerler maskeli gösterilir; tam key/secret sayfada açılmaz. API:{" "}
            <code className="admin-mono">/api/seo-agent/*</code>
            {cfg.fromDb.siteKey || cfg.fromDb.secret || cfg.fromDb.publicUrl
              ? " · Kaynak: veritabanı"
              : " · Kaynak: ortam değişkeni"}
          </p>
          <dl className="admin-kv">
            <div>
              <dt>Public URL</dt>
              <dd className="admin-mono">{cfg.publicBaseUrl || "—"}</dd>
            </div>
            <div>
              <dt>Site key</dt>
              <dd className="admin-mono">
                {hasKey ? maskCredential(cfg.siteKey) : "—"}{" "}
                <span className={`admin-badge ${hasKey ? "is-live" : "is-alert"}`}>
                  {hasKey ? "tanımlı" : "eksik"}
                </span>
              </dd>
            </div>
            <div>
              <dt>Secret</dt>
              <dd className="admin-mono">
                {hasSecret ? "••••••••••••" : "—"}{" "}
                <span className={`admin-badge ${hasSecret ? "is-live" : "is-alert"}`}>
                  {hasSecret ? "tanımlı" : "eksik"}
                </span>
              </dd>
            </div>
          </dl>

          {isAdmin ? (
            <form action={saveConnection} className="admin-form admin-stack">
              <p className="admin-hint">
                Değiştirmek için yeni değeri yazın. Key/secret alanlarını boş bırakırsanız kayıtlı
                değer korunur.
              </p>
              <label>
                Public URL
                <input
                  name="seoAgentPublicUrl"
                  type="url"
                  defaultValue={
                    settings?.seoAgentPublicUrl ||
                    process.env.SEO_AGENT_PUBLIC_URL ||
                    process.env.NEXT_PUBLIC_SITE_URL ||
                    ""
                  }
                  placeholder="https://ornek.com"
                />
              </label>
              <label>
                Yeni site key <span className="admin-muted">(opsiyonel)</span>
                <input
                  name="seoAgentSiteKey"
                  placeholder={hasKey ? "Değiştirmek için yeni sk_… yazın" : "sk_…"}
                  autoComplete="off"
                />
              </label>
              <label>
                Yeni secret <span className="admin-muted">(opsiyonel)</span>
                <input
                  name="seoAgentSecret"
                  type="password"
                  placeholder={hasSecret ? "Değiştirmek için yeni sec_… yazın" : "sec_…"}
                  autoComplete="new-password"
                />
              </label>
              <button type="submit" className="admin-btn admin-btn-primary">
                Bağlantıyı kaydet
              </button>
            </form>
          ) : (
            <p className="admin-hint">Bağlantıyı yalnızca yönetici değiştirebilir.</p>
          )}
        </div>
      </section>

      <div className="admin-panel admin-stack">
        <div className="admin-panel-head">
          <h2>Agent yazıları</h2>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Yazı</th>
                <th>Durum</th>
                <th>Güncelleme</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-empty">
                    Henüz panelden gelen yazı yok.
                  </td>
                </tr>
              ) : (
                sorted.map((p) => {
                  const live = p.status === "published";
                  return (
                    <tr key={p.id}>
                      <td>
                        <strong>{p.title}</strong>
                        <div className="admin-muted">
                          {live ? (
                            <Link
                              href={paths.blogPost(p.slug)}
                              target="_blank"
                              className="admin-link"
                            >
                              /blog/{p.slug}
                            </Link>
                          ) : (
                            <span>/blog/{p.slug}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${live ? "is-live" : "is-draft"}`}>
                          {live ? "Yayında" : "Taslak"}
                        </span>
                      </td>
                      <td className="admin-muted">
                        {formatDate(p.updatedAt || p.publishedAt)}
                      </td>
                      <td>
                        <div className="admin-row-actions">
                          <Link
                            href={`/admin/seo-agent/${p.id}`}
                            className="admin-btn admin-btn-sm"
                          >
                            Düzenle
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminChrome>
  );
}
