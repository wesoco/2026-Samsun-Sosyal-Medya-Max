"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashOrTop(attempt = 0) {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const el = document.getElementById(decodeURIComponent(hash));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (attempt < 12) {
      window.setTimeout(() => scrollToHashOrTop(attempt + 1), 60);
    }
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/** Soft navigasyonda hash bölümlerine ve sayfa başına scroll. */
export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const t = window.setTimeout(() => scrollToHashOrTop(0), 40);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onHash = () => scrollToHashOrTop(0);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return null;
}
