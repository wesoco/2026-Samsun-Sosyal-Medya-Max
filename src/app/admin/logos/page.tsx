import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ImageField } from "@/components/admin/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminLogosPage() {
  await requireAdmin();
  const logos = await prisma.brandLogo.findMany({ orderBy: { sortOrder: "asc" } });

  async function create(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.brandLogo.create({
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

  async function deleteLogo(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.brandLogo.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    redirect("/admin/logos");
  }

  return (
    <AdminChrome title="Logolar">
      <form action={create} className="admin-form">
        <label>
          Ad
          <input name="name" required />
        </label>
        <ImageField name="imageUrl" label="Görsel" folder="logos" required placeholder="/assets/logos/…" />
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={logos.length + 1} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked /> Yayınla
        </label>
        <button className="btn btn-primary" type="submit">
          Ekle
        </button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Görsel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logos.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>
                <code>{l.imageUrl}</code>
              </td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link href={`/admin/logos/${l.id}`}>Düzenle</Link>
                <form action={deleteLogo}>
                  <input type="hidden" name="id" value={l.id} />
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
