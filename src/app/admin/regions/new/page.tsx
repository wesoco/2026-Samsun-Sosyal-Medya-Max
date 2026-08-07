import { revalidatePath } from "next/cache";
import { revalidateSitemapAndFeed } from "@/lib/revalidate-public";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/admin";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { ContentFields } from "@/components/admin/ContentFields";

export const dynamic = "force-dynamic";

export default async function AdminRegionNewPage() {
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
      await prisma.district.create({
        data: {
          slug,
          name: String(formData.get("title") || ""),
          regionLabel: String(formData.get("regionLabel") || ""),
          lead: String(formData.get("lead") || ""),
          bodyHtml: String(formData.get("bodyHtml") || "<p></p>"),
          seoTitle: String(formData.get("seoTitle") || "") || null,
          seoDesc: String(formData.get("seoDesc") || "") || null,
          sortOrder: Number(formData.get("sortOrder") || 0),
          published: formData.get("published") === "on",
        },
      });
    } catch {
      redirect("/admin/regions?error=1");
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
    <AdminChrome title="Yeni bölge">
      <form action={create} className="admin-form">
        <ContentFields
          slugLabel="Slug"
          extra={
            <>
              <label>
                Bölge etiketi
                <input name="regionLabel" required placeholder="Merkez" />
              </label>
              <label>
                Sıra
                <input name="sortOrder" type="number" defaultValue={0} />
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
