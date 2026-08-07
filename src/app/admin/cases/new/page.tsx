import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

function slugify(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function AdminCaseNewPage() {
  await requireStaff();

  async function create(formData: FormData) {
    "use server";
    await requireStaff();
    const slug = slugify(String(formData.get("slug") || formData.get("title") || ""));
    try {
      await prisma.caseStudy.create({
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
      redirect("/admin/cases/new?error=1");
    }
    revalidatePath("/vakalar");
    revalidateSitemapAndFeed();
    redirect("/admin/cases");
  }

  return (
    <AdminChrome title="Yeni vaka">
      <form action={create} className="admin-form admin-form-wide">
        <div className="admin-field-grid">
          <label>
            Başlık
            <input name="title" required />
          </label>
          <label>
            Slug
            <input name="slug" required placeholder="restoran-story-rezervasyon" />
          </label>
          <label>
            Sektör
            <input name="sector" required placeholder="Restoran" />
          </label>
          <label>
            Sıra
            <input name="sortOrder" type="number" defaultValue={0} />
          </label>
        </div>
        <label>
          Lead
          <textarea name="lead" rows={2} required />
        </label>
        <label>
          Challenge
          <textarea name="challenge" rows={3} required />
        </label>
        <label>
          Yapılan iş
          <textarea name="workDone" rows={3} required />
        </label>
        <label>
          Sonuç
          <textarea name="result" rows={3} required />
        </label>
        <label>
          HTML gövde
          <textarea name="bodyHtml" rows={8} defaultValue="<p></p>" />
        </label>
        <label>
          SEO title
          <input name="seoTitle" />
        </label>
        <label>
          SEO description
          <textarea name="seoDesc" rows={2} />
        </label>
        <label className="admin-check">
          <input name="published" type="checkbox" defaultChecked />
          Yayında
        </label>
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Oluştur
          </button>
        </div>
      </form>
    </AdminChrome>
  );
}
