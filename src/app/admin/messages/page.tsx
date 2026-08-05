import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  const unread = messages.filter((m) => !m.read).length;

  async function markRead(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.contactMessage.update({
      where: { id: String(formData.get("id")) },
      data: { read: true },
    });
    revalidatePath("/admin/messages");
    redirect("/admin/messages");
  }

  async function deleteMessage(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.contactMessage.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/admin/messages");
    redirect("/admin/messages");
  }

  return (
    <AdminChrome
      title="İletişim mesajları"
      description={`${unread} okunmamış · ${messages.length} toplam. Formdan gelen talepler burada listelenir.`}
    >
      <div className="admin-panel">
        {messages.length === 0 ? (
          <p className="admin-empty">Henüz mesaj yok.</p>
        ) : (
          <ul className="admin-message-list">
            {messages.map((m) => (
              <li key={m.id} className={`admin-message-card${!m.read ? " is-unread" : ""}`}>
                <div className="admin-message-meta">
                  <div>
                    <strong>{m.name}</strong>
                    {!m.read ? <span className="admin-badge is-alert">Yeni</span> : null}
                  </div>
                  <time dateTime={m.createdAt.toISOString()}>{m.createdAt.toLocaleString("tr-TR")}</time>
                </div>
                <div className="admin-message-contacts">
                  <a href={`tel:${m.phone}`}>{m.phone}</a>
                  {m.email ? <a href={`mailto:${m.email}`}>{m.email}</a> : null}
                  {m.district ? <span>{m.district}</span> : null}
                  {m.service ? <span>{m.service}</span> : null}
                </div>
                <p className="admin-message-body">{m.message}</p>
                <div className="admin-row-actions">
                  {!m.read ? (
                    <form action={markRead}>
                      <input type="hidden" name="id" value={m.id} />
                      <button type="submit" className="admin-btn admin-btn-sm admin-btn-secondary">
                        Okundu işaretle
                      </button>
                    </form>
                  ) : null}
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="admin-btn admin-btn-sm admin-btn-danger">
                      Sil
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminChrome>
  );
}
