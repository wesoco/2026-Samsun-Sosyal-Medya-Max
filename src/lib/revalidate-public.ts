import { revalidatePath } from "next/cache";

/** İçerik değişince sitemap / RSS taze kalsın */
export function revalidateSitemapAndFeed() {
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
  revalidatePath("/feed.xml");
}
