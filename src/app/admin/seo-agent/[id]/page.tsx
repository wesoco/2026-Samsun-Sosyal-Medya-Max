import Link from "next/link";
import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { notFound, redirect } from "next/navigation";
import { createDefaultStore, normalizeAgentPostImages } from "@wesoco/seo-agent";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { ImageField } from "@/components/admin/ImageField";
import { paths } from "@/lib/paths";
import { faqToPairs, parseFaqFromFormData } from "@/lib/faq";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

export default async function AdminSeoAgentEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireStaff();
  const { id } = await params;
  const sp = await searchParams;
  const store = createDefaultStore();
  const raw = await store.getById(id).catch(() => null);
  if (!raw) notFound();
  const post = normalizeAgentPostImages(raw);

  async function update(formData: FormData) {
    "use server";
    await requireStaff();
    const s = createDefaultStore();
    const existing = await s.getById(id);
    if (!existing) redirect("/admin/seo-agent");

    const slug = slugify(String(formData.get("slug") || ""));
    if (!slug) redirect(`/admin/seo-agent/${id}?error=1`);

    const coverRaw = String(formData.get("coverUrl") || "").trim();
    const bodyHtml = String(formData.get("bodyHtml") || "<p></p>");
    const faqs = parseFaqFromFormData(formData);
    const title = String(formData.get("seoTitle") || formData.get("title") || "").trim();
    const metaDescription = String(
      formData.get("seoDesc") || formData.get("lead") || "",
    ).trim();

    const next = normalizeAgentPostImages({
      ...existing,
      slug,
      title: title || String(formData.get("title") || ""),
      metaDescription,
      bodyHtml,
      coverImageUrl: coverRaw || undefined,
      faq: faqs.map((f) => ({ question: f.q, answer: f.a })),
      status: formData.get("published") === "on" ? "published" : "draft",
      updatedAt: new Date().toISOString(),
      publishedAt:
        formData.get("published") === "on"
          ? existing.publishedAt || new Date().toISOString()
          : existing.publishedAt,
    });

    try {
      await s.upsert(next);
    } catch {
      redirect(`/admin/seo-agent/${id}?error=1`);
    }

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/seo-agent");
    revalidateSitemapAndFeed();
    redirect(`/admin/seo-agent/${id}?saved=1`);
  }

  async function remove() {
    "use server";
    await requireStaff();
    const s = createDefaultStore();
    const existing = await s.getById(id);
    await s.deleteById(id);
    revalidatePath("/");
    revalidatePath("/blog");
    if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/admin/seo-agent");
    revalidateSitemapAndFeed();
    redirect("/admin/seo-agent");
  }

  return (
    <AdminChrome
      title="SEO Agent yazısı düzenle"
      description="Panelden gelen yazıyı burada düzeltin. Kapak + içerikte aynı görsel varsa kapak otomatik kalkar."
      actions={
        <>
          <Link href="/admin/seo-agent" className="admin-btn admin-btn-secondary">
            ← Liste
          </Link>
          <a
            href={paths.blogPost(post.slug)}
            className="admin-btn admin-btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Önizle ↗
          </a>
        </>
      }
    >
      {sp.error ? <p className="form-error admin-alert">Kayıt başarısız.</p> : null}
      {sp.saved ? <p className="form-success admin-alert is-ok">Kaydedildi.</p> : null}

      <form action={update} className="admin-form admin-form-wide">
        <ContentFields
          title={post.title}
          slug={post.slug}
          lead={post.metaDescription}
          bodyHtml={post.bodyHtml}
          seoTitle={post.title}
          seoDesc={post.metaDescription}
          published={post.status === "published"}
          showFaq
          faqs={faqToPairs(post.faq)}
          extra={
            <>
              <ImageField
                name="coverUrl"
                label="Kapak görseli (opsiyonel)"
                folder="blog"
                defaultValue={post.coverImageUrl || ""}
                placeholder="Boş bırakın — içerikteki görsel kullanılır"
              />
              <p className="admin-hint">
                İçerikte zaten görsel varsa kapak boş kalsın; yoksa kırık çift görsel oluşur.
              </p>
            </>
          }
        />
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn-primary" type="submit">
            Kaydet
          </button>
        </div>
      </form>

      <form action={remove} className="admin-panel admin-stack">
        <div className="admin-panel-head">
          <h2>Sil</h2>
        </div>
        <p className="admin-hint">
          Bu yazı yalnızca SEO Agent deposundan silinir (Prisma blog’a dokunulmaz).
        </p>
        <ConfirmDeleteButton />
      </form>
    </AdminChrome>
  );
}
