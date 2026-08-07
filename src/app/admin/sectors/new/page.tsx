import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { parseFaqFromFormData } from "@/lib/faq";

export const dynamic = "force-dynamic";

export default async function AdminSectorNewPage() {
  await requireStaff();

  async function create(formData: FormData) {
    "use server";
    await requireStaff();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.sectorPage.create({
        data: {
          slug,
          name: String(formData.get("title") || ""),
          title: String(formData.get("seoH1") || formData.get("title") || ""),
          lead: String(formData.get("lead") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          faqJson: parseFaqFromFormData(formData),
          sortOrder: Number(formData.get("sortOrder") || 0),
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect("/admin/sectors/new?error=1");
    }
    revalidatePath("/sektorler");
    revalidateSitemapAndFeed();
    redirect("/admin/sectors");
  }

  return (
    <AdminChrome title="Yeni sektör">
      <form action={create} className="admin-form">
        <ContentFields
          title=""
          slug=""
          lead=""
          bodyHtml="<p></p>"
          seoTitle=""
          seoDesc=""
          published
          showFaq
          faqs={[]}
          extra={
            <>
              <label>
                Sayfa H1 / title
                <input name="seoH1" placeholder="Restoran & kafe sosyal medya yönetimi" />
              </label>
              <label>
                Sıra
                <input name="sortOrder" type="number" defaultValue={0} />
              </label>
            </>
          }
        />
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Oluştur
          </button>
        </div>
      </form>
    </AdminChrome>
  );
}
