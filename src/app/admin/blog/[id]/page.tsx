import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";

export const dynamic = "force-dynamic";

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireAdmin();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.blogPost.update({
        where: { id },
        data: {
          slug,
          title: String(formData.get("title") || ""),
          lead: String(formData.get("lead") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          category: String(formData.get("category") || "Genel"),
          coverUrl: String(formData.get("coverUrl") || "") || null,
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          faqJson: parseFaqFromFormData(formData),
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect(`/admin/blog/${id}?error=1`);
    }
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    redirect("/admin/blog");
  }

  return (
    <AdminChrome
      title="Blog düzenle"
      description="İçerik, SEO ve SSS. Kaydettikten sonra canlı sayfa ve sitemap yenilenir."
      actions={
        <a href={`/blog/${post.slug}`} className="admin-btn admin-btn-secondary" target="_blank" rel="noreferrer">
          Önizle ↗
        </a>
      }
    >
      {sp.error ? <p className="form-error admin-alert">Kayıt başarısız (slug çakışması olabilir).</p> : null}
      <form action={update} className="admin-form admin-form-wide">
        <ContentFields
          title={post.title}
          slug={post.slug}
          lead={post.lead}
          bodyHtml={post.bodyHtml}
          seoTitle={post.seoTitle}
          seoDesc={post.seoDesc}
          published={post.published}
          showFaq
          faqs={faqToPairs(post.faqJson)}
          extra={
            <div className="admin-field-grid">
              <label>
                Kategori
                <input name="category" defaultValue={post.category} />
              </label>
              <label>
                Kapak URL
                <input name="coverUrl" defaultValue={post.coverUrl || "/assets/Trabzon-sosyal-medya.webp"} />
              </label>
            </div>
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
