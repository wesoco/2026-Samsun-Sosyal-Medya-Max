"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";

export function SiteLogo() {
  const pathname = usePathname();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/" && pathname !== "") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.classList.remove("nav-open");
    document.getElementById("menuToggle")?.setAttribute("aria-expanded", "false");
    document.getElementById("mobileNav")?.setAttribute("hidden", "");
  }

  return (
    <Link href={paths.home} className="logo" aria-label="Trabzon Sosyal Medya ana sayfa" onClick={onClick}>
      <img
        className="logo-img logo-img-white"
        src="/assets/wesoco-logo-beyaz.svg"
        alt=""
        width={140}
        height={22}
        aria-hidden="true"
      />
      <img
        className="logo-img logo-img-navy"
        src="/assets/wesoco-logo-navy.svg"
        alt=""
        width={140}
        height={22}
        aria-hidden="true"
      />
    </Link>
  );
}
