import Link from "next/link";
import { createDefaultStore } from "@wesoco/seo-agent";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { requireStaff } from "@/lib/admin";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function SeoAgentAdminPage() {
  await requireStaff();
  const posts = await createDefaultStore().list().catch(() => []);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status !== "published");

  return (
    <AdminChrome
      title="SEO Agent"
      description="Wesoco panelinden gelen yazılar. Secret yalnızca .env.local içinde olmalı."
    >
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
          <ul className="admin-list">
            {published.map((p) => (
              <li key={p.id}>
                <Link href={paths.blogPost(p.slug)}>{p.title}</Link>
                <span className="admin-muted"> /{p.slug}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {drafts.length > 0 ? (
        <section className="admin-card">
          <h2>Taslak ({drafts.length})</h2>
          <ul className="admin-list">
            {drafts.map((p) => (
              <li key={p.id}>
                {p.title}
                <span className="admin-muted"> /{p.slug}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </AdminChrome>
  );
}
