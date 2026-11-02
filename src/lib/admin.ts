import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

export type StaffRole = "ADMIN" | "EDITOR";

/**
 * Oturum JWT; kullanıcı panelden ya da ensure-admin (ADMIN_EXCLUSIVE) ile silinince
 * token süresi dolana kadar geçerli kalırdı. Rol her istekte DB'den okunur; kullanıcı yoksa oturum yok sayılır.
 * (Middleware edge'de çalışır, Prisma orada kullanılamaz; kontrol burada.)
 */
export async function currentStaff() {
  const session = await auth();
  const id = session?.user?.id;
  if (!session?.user || !id) return null;
  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } });
  if (!user) return null;
  (session.user as { role?: string }).role = user.role;
  return session;
}

export async function requireStaff() {
  const session = await currentStaff();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "EDITOR")) {
    redirect(paths.adminLogin);
  }
  return session;
}

/** Sadece ADMIN — ayarlar, kullanıcılar, GTM */
export async function requireAdmin() {
  const session = await requireStaff();
  if (session.user.role !== "ADMIN") {
    redirect("/admin");
  }
  return session;
}
