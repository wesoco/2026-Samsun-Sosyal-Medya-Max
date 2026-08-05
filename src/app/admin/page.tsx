import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    postsTotal,
    postsPublished,
    postsDraft,
    districts,
    services,
    faqs,
    refs,
    logos,
    unread,
    recentMessages,
    recentPosts,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
    prisma.district.count({ where: { published: true } }),
    prisma.service.count({ where: { published: true } }),
    prisma.faqItem.count({ where: { published: true } }),
    prisma.referenceItem.count({ where: { published: true } }),
    prisma.brandLogo.count({ where: { published: true } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
  ]);

  return (
    <AdminChrome
      title="Özet"
      description="İçerik, mesajlar ve yayın durumuna tek bakışta bakın."
      actions={
        <>
          <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">
            Yeni blog
          </Link>
          <Link href="/admin/messages" className="admin-btn admin-btn-secondary">
            Mesajlar{unread ? ` (${unread})` : ""}
          </Link>
        </>
      }
    >
      <section className="admin-stat-grid" aria-label="Özet sayaçlar">
        <article className="admin-stat-card">
          <span className="admin-stat-label">Blog yayında</span>
          <strong>{postsPublished}</strong>
          <span className="admin-stat-meta">{postsDraft} taslak · {postsTotal} toplam</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Hizmetler</span>
          <strong>{services}</strong>
          <span className="admin-stat-meta">Yayındaki hizmet sayfaları</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Bölgeler</span>
          <strong>{districts}</strong>
          <span className="admin-stat-meta">İlçe SEO sayfaları</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Okunmamış mesaj</span>
          <strong className={unread ? "is-alert" : undefined}>{unread}</strong>
          <span className="admin-stat-meta">İletişim formu</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">SSS</span>
          <strong>{faqs}</strong>
          <span className="admin-stat-meta">Ana sayfa / SSS</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-label">Referans / logo</span>
          <strong>
            {refs}/{logos}
          </strong>
          <span className="admin-stat-meta">Sosyal kanıt öğeleri</span>
        </article>
      </section>

      <section className="admin-dash-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>Hızlı işlemler</h2>
          </div>
          <div className="admin-quick-grid">
            <Link href="/admin/blog/new" className="admin-quick">
              <strong>Blog yazısı</strong>
              <span>Yeni rehber / pillar içerik</span>
            </Link>
            <Link href="/admin/services" className="admin-quick">
              <strong>Hizmetler</strong>
              <span>Paket ve FAQ düzenle</span>
            </Link>
            <Link href="/admin/sectors" className="admin-quick">
              <strong>Sektörler</strong>
              <span>Sektör landing sayfaları</span>
            </Link>
            <Link href="/admin/cases" className="admin-quick">
              <strong>Vakalar</strong>
              <span>Ölçülebilir vaka çalışmaları</span>
            </Link>
            <Link href="/admin/regions" className="admin-quick">
              <strong>Bölgeler</strong>
              <span>18 ilçe SEO sayfası</span>
            </Link>
            <Link href="/admin/home" className="admin-quick">
              <strong>Anasayfa</strong>
              <span>Hero, bölümler, yaklaşım</span>
            </Link>
            <Link href="/admin/settings" className="admin-quick">
              <strong>Ayarlar + SMTP</strong>
              <span>NAP, form etiketleri, mail</span>
            </Link>
            <Link href={paths.home} className="admin-quick" target="_blank">
              <strong>Canlı site</strong>
              <span>Önizleme için yeni sekme</span>
            </Link>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>Son mesajlar</h2>
            <Link href="/admin/messages">Tümü</Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="admin-empty">Henüz mesaj yok.</p>
          ) : (
            <ul className="admin-feed">
              {recentMessages.map((m) => (
                <li key={m.id} className={!m.read ? "is-unread" : undefined}>
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.phone}</span>
                  </div>
                  <p>{m.message.slice(0, 110)}{m.message.length > 110 ? "…" : ""}</p>
                  <time dateTime={m.createdAt.toISOString()}>
                    {m.createdAt.toLocaleString("tr-TR")}
                    {!m.read ? " · Yeni" : ""}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="admin-panel" style={{ marginTop: 20 }}>
        <div className="admin-panel-head">
          <h2>Son güncellenen bloglar</h2>
          <Link href="/admin/blog">Blog yönetimi</Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>Güncelleme</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.title}</strong>
                    <div className="admin-muted">{p.slug}</div>
                  </td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`admin-badge ${p.published ? "is-live" : "is-draft"}`}>
                      {p.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td>{p.updatedAt.toLocaleDateString("tr-TR")}</td>
                  <td>
                    <Link href={`/admin/blog/${p.id}`} className="admin-link">
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminChrome>
  );
}
