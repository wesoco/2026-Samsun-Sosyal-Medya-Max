import { permanentRedirect } from "next/navigation";
import { paths } from "@/lib/paths";

/** Yok / yayında değil içerik → ana sayfa 301 (eski indeksler, soft-404 yerine). */
export function redirectMissingToHome(): never {
  permanentRedirect(paths.home);
}
