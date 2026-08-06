import { permanentRedirect } from "next/navigation";
import { paths } from "@/lib/paths";

/**
 * Bilinmeyen / kaldırılmış / eski site URL’leri 404 yerine ana sayfaya 301.
 * Domain üzerine yeni site çekildiğinde Google’daki eski URL equity’si home’a taşınır.
 * Admin 404’leri: `app/admin/not-found.tsx`
 */
export default function NotFound() {
  permanentRedirect(paths.home);
}
