"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavGroup = { title: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    title: "Genel",
    items: [
      { href: "/admin", label: "Özet" },
      { href: "/admin/home", label: "Anasayfa içeriği" },
      { href: "/admin/messages", label: "Mesajlar" },
      { href: "/admin/settings", label: "Site ayarları" },
    ],
  },
  {
    title: "İçerik",
    items: [
      { href: "/admin/blog", label: "Blog" },
      { href: "/admin/services", label: "Hizmetler" },
      { href: "/admin/sectors", label: "Sektörler" },
      { href: "/admin/cases", label: "Vakalar" },
      { href: "/admin/regions", label: "Bölgeler" },
      { href: "/admin/faq", label: "S.S.S." },
    ],
  },
  {
    title: "Sosyal kanıt",
    items: [
      { href: "/admin/references", label: "Referanslar" },
      { href: "/admin/logos", label: "Marka logoları" },
      { href: "/admin/stats", label: "İstatistikler" },
    ],
  },
];

export function AdminNav({
  email,
  unreadMessages,
}: {
  email?: string | null;
  unreadMessages: number;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="admin-nav">
      <div className="admin-nav-brand">
        <img src="/assets/wesoco-logo-beyaz.svg" alt="Wesoco" width={120} height={20} />
        <span>İçerik paneli</span>
        {email ? <p className="admin-nav-email">{email}</p> : null}
      </div>

      <nav className="admin-nav-groups" aria-label="Admin menü">
        {GROUPS.map((group) => (
          <div key={group.title} className="admin-nav-group">
            <p className="admin-nav-group-title">{group.title}</p>
            {group.items.map((item) => {
              const active = isActive(item.href);
              const showBadge = item.href === "/admin/messages" && unreadMessages > 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {showBadge ? <span className="admin-nav-badge">{unreadMessages}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-nav-footer">
        <Link href="/" className="admin-nav-link" target="_blank" rel="noopener noreferrer">
          Siteyi aç ↗
        </Link>
      </div>
    </aside>
  );
}
