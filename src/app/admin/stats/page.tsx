import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  await requireAdmin();
  const stats = await prisma.homeStat.findMany({ orderBy: { sortOrder: "asc" } });

  async function create(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.homeStat.create({
      data: {
        value: String(formData.get("value") || ""),
        label: String(formData.get("label") || ""),
        sortOrder: Number(formData.get("sortOrder") || 0),
      },
    });
    revalidatePath("/");
    redirect("/admin/stats");
  }

  async function deleteStat(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.homeStat.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    redirect("/admin/stats");
  }

  return (
    <AdminChrome title="Anasayfa istatistikleri">
      <form action={create} className="admin-form">
        <label>
          Değer
          <input name="value" required placeholder="18" />
        </label>
        <label>
          Etiket
          <input name="label" required placeholder="İlçede hizmet" />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={stats.length + 1} />
        </label>
        <button className="btn btn-primary" type="submit">
          Ekle
        </button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Değer</th>
            <th>Etiket</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.id}>
              <td>{s.value}</td>
              <td>{s.label}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link href={`/admin/stats/${s.id}`}>Düzenle</Link>
                <form action={deleteStat}>
                  <input type="hidden" name="id" value={s.id} />
                  <button type="submit">Sil</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminChrome>
  );
}
