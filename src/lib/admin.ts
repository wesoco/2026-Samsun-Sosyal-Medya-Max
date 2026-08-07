import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { paths } from "@/lib/paths";

export type StaffRole = "ADMIN" | "EDITOR";

export async function requireStaff() {
  const session = await auth();
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
