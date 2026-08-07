import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";

export const dynamic = "force-dynamic";

export default async function AdminRegionEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const d = await prisma.district.findUnique({ where: { id } });
  if (!d) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.district.update({
        where: { id },
        data: {
          slug,
          name: String(formData.get("title") || ""),
          regionLabel: String(formData.get("regionLabel") || ""),
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
      redirect(`/admin/regions/${id}?error=1`);
    }
    revalidatePath("/");
    revalidatePath("/regions");
    revalidatePath("/bolgeler");
    revalidatePath(`/regions/${slug}`);
    revalidatePath(`/bolgeler/${slug}`);
    revalidateSitemapAndFeed();
    redirect("/admin/regions");
  }

  return (
    <AdminChrome title={`Bölge: ${d.name}`}>
      {sp.error ? <p className="form-error">Kayıt başarısız (slug çakışması olabilir).</p> : null}
      <form action={update} className="admin-form">
        <ContentFields
          title={d.name}
          slug={d.slug}
          lead={d.lead}
          bodyHtml={d.bodyHtml}
          seoTitle={d.seoTitle}
          seoDesc={d.seoDesc}
          published={d.published}
          showFaq
          faqs={faqToPairs(d.faqJson)}
          extra={
            <>
              <label>
                Bölge etiketi
                <input name="regionLabel" required defaultValue={d.regionLabel} />
              </label>
              <label>
                Sıra
                <input name="sortOrder" type="number" defaultValue={d.sortOrder} />
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
