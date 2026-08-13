import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { ImageField } from "@/components/admin/ImageField";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireStaff();
  const { id } = await params;
  const sp = await searchParams;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  async function update(formData: FormData) {
    "use server";
    await requireStaff();
    const slug = slugify(String(formData.get("slug") || ""));
    if (!slug) redirect(`/admin/blog/${id}?error=1`);
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
    revalidateSitemapAndFeed();
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
              <ImageField
                name="coverUrl"
                label="Kapak görseli"
                folder="blog"
                defaultValue={post.coverUrl || "/assets/Samsun-sosyal-medya.webp"}
              />
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
