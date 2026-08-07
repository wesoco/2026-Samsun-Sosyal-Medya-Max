import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import type { Role } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const session = await auth();
  const meId = session?.user?.id;
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  async function createUser(formData: FormData) {
    "use server";
    await requireAdmin();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const name = String(formData.get("name") || "").trim() || null;
    const password = String(formData.get("password") || "");
    const role = (String(formData.get("role") || "EDITOR") as Role) === "ADMIN" ? "ADMIN" : "EDITOR";
    if (!email || password.length < 8) {
      redirect("/admin/users?error=validation");
    }
    try {
      await prisma.user.create({
        data: {
          email,
          name,
          role,
          passwordHash: await bcrypt.hash(password, 10),
        },
      });
    } catch {
      redirect("/admin/users?error=duplicate");
    }
    revalidatePath("/admin/users");
    redirect("/admin/users?ok=created");
  }

  async function updateRole(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = String(formData.get("id") || "");
    const role = (String(formData.get("role") || "EDITOR") as Role) === "ADMIN" ? "ADMIN" : "EDITOR";
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) redirect("/admin/users?error=missing");
    if (target.role === "ADMIN" && role !== "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) redirect("/admin/users?error=last-admin");
    }
    await prisma.user.update({ where: { id }, data: { role } });
    revalidatePath("/admin/users");
    redirect("/admin/users?ok=role");
  }

  async function deleteUser(formData: FormData) {
    "use server";
    await requireAdmin();
    const session = await auth();
    const id = String(formData.get("id") || "");
    if (session?.user?.id === id) redirect("/admin/users?error=self");
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) redirect("/admin/users?error=missing");
    if (target.role === "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) redirect("/admin/users?error=last-admin");
    }
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    redirect("/admin/users?ok=deleted");
  }

  return (
    <AdminChrome
      title="Kullanıcılar"
      description="Admin tüm yetkilere sahiptir. Editör içerik yönetebilir; ayarlar ve kullanıcı yönetimi yok."
    >
      {sp.error === "validation" ? (
        <p className="form-error admin-alert">E-posta ve en az 8 karakter şifre gerekli.</p>
      ) : null}
      {sp.error === "duplicate" ? (
        <p className="form-error admin-alert">Bu e-posta zaten kayıtlı.</p>
      ) : null}
      {sp.error === "last-admin" ? (
        <p className="form-error admin-alert">Son yönetici kaldırılamaz / düşürülemez.</p>
      ) : null}
      {sp.error === "self" ? (
        <p className="form-error admin-alert">Kendi hesabınızı silemezsiniz.</p>
      ) : null}
      {sp.ok ? <p className="form-success admin-alert">Kaydedildi.</p> : null}

      <form action={createUser} className="admin-form admin-panel">
        <h2 className="admin-subhead">Yeni kullanıcı</h2>
        <div className="admin-field-grid">
          <label>
            E-posta
            <input name="email" type="email" required autoComplete="off" />
          </label>
          <label>
            Ad
            <input name="name" autoComplete="off" />
          </label>
          <label>
            Şifre
            <input name="password" type="password" required minLength={8} autoComplete="new-password" />
          </label>
          <label>
            Rol
            <select name="role" defaultValue="EDITOR">
              <option value="EDITOR">Editör</option>
              <option value="ADMIN">Yönetici</option>
            </select>
          </label>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary">
          Kullanıcı ekle
        </button>
      </form>

      <div className="admin-panel" style={{ marginTop: 24 }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>E-posta</th>
                <th>Ad</th>
                <th>Rol</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.email}</strong>
                    {u.id === meId ? <span className="admin-muted"> (siz)</span> : null}
                  </td>
                  <td>{u.name || "—"}</td>
                  <td>
                    <form action={updateRole} className="admin-inline-form">
                      <input type="hidden" name="id" value={u.id} />
                      <select name="role" defaultValue={u.role}>
                        <option value="ADMIN">Yönetici</option>
                        <option value="EDITOR">Editör</option>
                      </select>
                      <button type="submit" className="admin-btn admin-btn-sm">
                        Güncelle
                      </button>
                    </form>
                  </td>
                  <td>
                    {u.id === meId ? (
                      <span className="admin-muted">—</span>
                    ) : (
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={u.id} />
                        <ConfirmDeleteButton confirmMessage={`${u.email} silinsin mi?`} />
                      </form>
                    )}
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
