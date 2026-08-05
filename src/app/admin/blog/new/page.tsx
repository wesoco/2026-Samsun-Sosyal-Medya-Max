import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";

export const dynamic = "force-dynamic";

export default async function AdminBlogNewPage() {
  await requireAdmin();

  async function create(formData: FormData) {
    "use server";
    await requireAdmin();
    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    try {
      await prisma.blogPost.create({
        data: {
          slug,
          title: String(formData.get("title") || ""),
          lead: String(formData.get("lead") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          category: String(formData.get("category") || "Genel"),
          coverUrl: String(formData.get("coverUrl") || "") || null,
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect("/admin/blog?error=1");
    }
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    redirect("/admin/blog");
  }

  return (
    <AdminChrome title="Yeni blog yazısı">
      <form action={create} className="admin-form">
        <ContentFields
          extra={
            <>
              <label>
                Kategori
                <input name="category" defaultValue="Genel" />
              </label>
              <label>
                Kapak URL
                <input name="coverUrl" />
              </label>
            </>
          }
        />
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
