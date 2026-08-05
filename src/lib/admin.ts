import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { paths } from "@/lib/paths";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect(paths.adminLogin);
  }
  return session;
}
