import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function AdminFaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const f = await prisma.faqItem.findUnique({ where: { id } });
  if (!f) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireStaff();
    await prisma.faqItem.update({
      where: { id },
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

  return (
    <AdminChrome title="SSS düzenle">
      <form action={update} className="admin-form">
        <label>
          Soru
          <input name="question" required defaultValue={f.question} />
        </label>
        <label>
          Cevap
          <textarea name="answer" required rows={5} defaultValue={f.answer} />
        </label>
        <label>
          Sıra
          <input name="sortOrder" type="number" defaultValue={f.sortOrder} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={f.published} /> Yayınla
        </label>
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
