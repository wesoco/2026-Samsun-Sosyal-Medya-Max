import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminStatEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const s = await prisma.homeStat.findUnique({ where: { id } });
  if (!s) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.homeStat.update({
      where: { id },
      data: {
        value: String(formData.get("value") || ""),
        label: String(formData.get("label") || ""),
        sortOrder: Number(formData.get("sortOrder") || 0),
      },
    });
    revalidatePath("/");
    redirect("/admin/stats");
  }

  return (
    <AdminChrome title="İstatistik düzenle">
      <form action={update} className="admin-form">
        <label>
          Değer
          <input name="value" required defaultValue={s.value} />
        </label>
        <label>
          Etiket
          <input name="label" required defaultValue={s.label} />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={s.sortOrder} />
        </label>
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
