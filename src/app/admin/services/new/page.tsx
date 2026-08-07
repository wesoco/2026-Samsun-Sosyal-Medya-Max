import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";

export const dynamic = "force-dynamic";

export default async function AdminServiceNewPage() {
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
      await prisma.service.create({
        data: {
          slug,
          title: String(formData.get("title") || ""),
          lead: String(formData.get("lead") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          sortOrder: Number(formData.get("sortOrder") || 0),
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect("/admin/services?error=1");
    }
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/hizmetler");
    revalidatePath(`/services/${slug}`);
    revalidatePath(`/hizmetler/${slug}`);
    revalidateSitemapAndFeed();
    redirect("/admin/services");
  }

  return (
    <AdminChrome title="Yeni hizmet">
      <form action={create} className="admin-form">
        <ContentFields
          extra={
            <label>
              Sıra
              <input name="sortOrder" type="number" defaultValue={0} />
            </label>
          }
        />
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </AdminChrome>
  );
}
