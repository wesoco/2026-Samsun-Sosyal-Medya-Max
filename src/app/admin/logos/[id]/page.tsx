import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminLogoEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const l = await prisma.brandLogo.findUnique({ where: { id } });
  if (!l) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.brandLogo.update({
      where: { id },
      data: {
        name: String(formData.get("name") || ""),
        imageUrl: String(formData.get("imageUrl") || ""),
        sortOrder: Number(formData.get("sortOrder") || 0),
        published: formData.get("published") === "on",
      },
    });
    revalidatePath("/");
    redirect("/admin/logos");
  }

  return (
    <AdminChrome title="Logo düzenle">
      <form action={update} className="admin-form">
        <label>
          Ad
          <input name="name" required defaultValue={l.name} />
        </label>
        <label>
          Görsel URL
          <input name="imageUrl" required defaultValue={l.imageUrl} />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={l.sortOrder} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={l.published} /> Yayınla
        </label>
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
