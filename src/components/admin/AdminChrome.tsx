import { signOut } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { AdminNav } from "@/components/admin/AdminNav";

export async function AdminChrome({
  children,
  title,
  description,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  const session = await requireAdmin();
  const unreadMessages = await prisma.contactMessage.count({ where: { read: false } });

  return (
    <div className="admin-shell">
      <AdminNav email={session.user?.email} unreadMessages={unreadMessages} />
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar-copy">
            <p className="admin-eyebrow">Trabzon Sosyal Medya</p>
            <h1>{title}</h1>
            {description ? <p className="admin-desc">{description}</p> : null}
          </div>
          <div className="admin-topbar-actions">
            {actions}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: paths.adminLogin });
              }}
            >
              <button type="submit" className="admin-btn admin-btn-ghost">
                Çıkış
              </button>
            </form>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
