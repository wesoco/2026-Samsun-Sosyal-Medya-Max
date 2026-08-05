import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  await requireAdmin();
  const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function createFaq(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.faqItem.create({
      data: {
        question: String(formData.get("question") || ""),
        answer: String(formData.get("answer") || ""),
        sortOrder: Number(formData.get("sortOrder") || 0),
        published: formData.get("published") === "on",
      },
    });
    revalidatePath("/");
    revalidatePath("/faq");
    revalidatePath("/sss");
    redirect("/admin/faq");
  }

  async function deleteFaq(formData: FormData) {
    "use server";
    await requireAdmin();
    await prisma.faqItem.delete({ where: { id: String(formData.get("id")) } });
    revalidatePath("/");
    revalidatePath("/faq");
    revalidatePath("/sss");
    redirect("/admin/faq");
  }

  return (
    <AdminChrome title="SSS yönetimi">
      <form action={createFaq} className="admin-form">
        <label>
          Soru
          <input name="question" required />
        </label>
        <label>
          Cevap
          <textarea name="answer" required rows={3} />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={faqs.length + 1} />
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
            <th>Soru</th>
            <th>Sıra</th>
            <th>Durum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((f) => (
            <tr key={f.id}>
              <td>{f.question}</td>
              <td>{f.sortOrder}</td>
              <td>{f.published ? "Yayında" : "Taslak"}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link href={`/admin/faq/${f.id}`}>Düzenle</Link>
                <form action={deleteFaq}>
                  <input type="hidden" name="id" value={f.id} />
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
