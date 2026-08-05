import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";

export const dynamic = "force-dynamic";

export default async function AdminServiceEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.service.update({
        where: { id },
        data: {
          slug,
          title: String(formData.get("title") || ""),
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
      redirect(`/admin/services/${id}?error=1`);
    }
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/hizmetler");
    revalidatePath(`/services/${slug}`);
    revalidatePath(`/hizmetler/${slug}`);
    redirect("/admin/services");
  }

  return (
    <AdminChrome title={`Hizmet: ${s.title}`}>
      {sp.error ? <p className="form-error">Kayıt başarısız (slug çakışması olabilir).</p> : null}
      <form action={update} className="admin-form">
        <ContentFields
          title={s.title}
          slug={s.slug}
          lead={s.lead}
          bodyHtml={s.bodyHtml}
          seoTitle={s.seoTitle}
          seoDesc={s.seoDesc}
          published={s.published}
          showFaq
          faqs={faqToPairs(s.faqJson)}
          extra={
            <label>
              Sıra
              <input name="sortOrder" type="number" defaultValue={s.sortOrder} />
            </label>
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
