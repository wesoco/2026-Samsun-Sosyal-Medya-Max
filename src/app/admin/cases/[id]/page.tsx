import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

function slugify(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function AdminCaseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const item = await prisma.caseStudy.findUnique({ where: { id } });
  if (!item) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    const slug = slugify(String(formData.get("slug") || ""));
    try {
      await prisma.caseStudy.update({
        where: { id },
        data: {
          slug,
          sector: String(formData.get("sector") || ""),
          title: String(formData.get("title") || ""),
          lead: String(formData.get("lead") || ""),
          challenge: String(formData.get("challenge") || ""),
          workDone: String(formData.get("workDone") || ""),
          result: String(formData.get("result") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          sortOrder: Number(formData.get("sortOrder") || 0),
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect(`/admin/cases/${id}?error=1`);
    }
    revalidatePath("/vakalar");
    revalidatePath(`/vakalar/${slug}`);
    redirect("/admin/cases");
  }

  return (
    <AdminChrome title={`Vaka: ${item.title}`}>
      <form action={update} className="admin-form admin-form-wide">
        <div className="admin-field-grid">
          <label>
            Başlık
            <input name="title" required defaultValue={item.title} />
          </label>
          <label>
            Slug
            <input name="slug" required defaultValue={item.slug} />
          </label>
          <label>
            Sektör
            <input name="sector" required defaultValue={item.sector} />
          </label>
          <label>
            Sıra
            <input name="sortOrder" type="number" defaultValue={item.sortOrder} />
          </label>
        </div>
        <label>
          Lead
          <textarea name="lead" rows={2} required defaultValue={item.lead} />
        </label>
        <label>
          Challenge
          <textarea name="challenge" rows={3} required defaultValue={item.challenge} />
        </label>
        <label>
          Yapılan iş
          <textarea name="workDone" rows={3} required defaultValue={item.workDone} />
        </label>
        <label>
          Sonuç
          <textarea name="result" rows={3} required defaultValue={item.result} />
        </label>
        <label>
          HTML gövde
          <textarea name="bodyHtml" rows={8} defaultValue={item.bodyHtml} />
        </label>
        <label>
          SEO title
          <input name="seoTitle" defaultValue={item.seoTitle || ""} />
        </label>
        <label>
          SEO description
          <textarea name="seoDesc" rows={2} defaultValue={item.seoDesc || ""} />
        </label>
        <label className="admin-check">
          <input name="published" type="checkbox" defaultChecked={item.published} />
          Yayında
        </label>
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </AdminChrome>
  );
}
