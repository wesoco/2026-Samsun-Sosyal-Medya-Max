import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";

export const dynamic = "force-dynamic";

export default async function AdminSectorEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStaff();
  const { id } = await params;
  const item = await prisma.sectorPage.findUnique({ where: { id } });
  if (!item) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireStaff();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.sectorPage.update({
        where: { id },
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
      redirect(`/admin/sectors/${id}?error=1`);
    }
    revalidatePath("/sektorler");
    revalidatePath(`/sektorler/${slug}`);
    revalidateSitemapAndFeed();
    redirect("/admin/sectors");
  }

  return (
    <AdminChrome title={`Sektör: ${item.name}`}>
      <form action={update} className="admin-form">
        <ContentFields
          title={item.name}
          slug={item.slug}
          lead={item.lead}
          bodyHtml={item.bodyHtml}
          seoTitle={item.seoTitle}
          seoDesc={item.seoDesc}
          published={item.published}
          showFaq
          faqs={faqToPairs(item.faqJson)}
          extra={
            <>
              <label>
                Sayfa H1 / title
                <input name="seoH1" defaultValue={item.title} />
              </label>
              <label>
                Sıra
                <input name="sortOrder" type="number" defaultValue={item.sortOrder} />
              </label>
            </>
          }
        />
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </AdminChrome>
  );
}
