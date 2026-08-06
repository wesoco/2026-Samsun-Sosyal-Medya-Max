import Link from "next/link";
import { paths } from "@/lib/paths";

/** Admin panelde 404 → ana sayfaya atma; panel içinde kal. */
export default function AdminNotFound() {
  return (
    <main style={{ padding: "48px 24px", maxWidth: 480, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "1.25rem", marginBottom: 8 }}>Sayfa bulunamadı</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>Bu admin yolu yok veya kaldırılmış.</p>
      <Link href={paths.admin} style={{ color: "#0c1727", fontWeight: 600 }}>
        Panele dön
      </Link>
    </main>
  );
}
