import Link from "next/link";
import { paths } from "@/lib/paths";

export type ClusterLink = { href: string; label: string };

type Props = {
  title?: string;
  services?: ClusterLink[];
  regions?: ClusterLink[];
  posts?: ClusterLink[];
  showDefaults?: boolean;
  /** compact: tek satır/akış - SEO spam hissi yok */
  variant?: "grid" | "compact";
};

function shortLabel(label: string, max = 42) {
  const t = label.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

/** İç link bloğu - sade; yetim sayfa bırakmamak için */
export function TopicCluster({
  title = "Bunlara da bakın",
  services = [],
  regions = [],
  posts = [],
  showDefaults = true,
  variant = "compact",
}: Props) {
  const defaults: ClusterLink[] = showDefaults
    ? [
        { href: paths.services, label: "Hizmetler" },
        { href: paths.sectors, label: "Sektörler" },
        { href: paths.cases, label: "Vakalar" },
        { href: paths.regions, label: "İlçeler" },
        { href: paths.blog, label: "Blog" },
        { href: paths.hash.contact, label: "İletişim" },
      ]
    : [];

  if (variant === "compact") {
    const links = [ ...services.slice(0, 3),
      ...regions.slice(0, 3),
      ...posts.slice(0, 2),
      ...defaults.slice(0, 6),
    ];
    if (!links.length) return null;
    return (
      <nav className="seo-topic-cluster seo-topic-cluster-compact" aria-label={title}>
        <p className="seo-topic-cluster-title">{title}</p>
        <ul className="seo-topic-cluster-chips">
          {links.map((item) => (
            <li key={item.href + item.label}>
              <Link href={item.href}>{shortLabel(item.label, 36)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  const groups = [
    { heading: "Hizmetler", items: services.slice(0, 4) },
    { heading: "Bölgeler", items: regions.slice(0, 4) },
    { heading: "Yazılar", items: posts.slice(0, 3) },
    { heading: "Keşfet", items: defaults },
  ].filter((g) => g.items.length > 0);

  if (!groups.length) return null;

  return (
    <nav className="seo-topic-cluster" aria-label={title}>
      <p className="seo-topic-cluster-title">{title}</p>
      <div className="seo-topic-cluster-grid">
        {groups.map((g) => (
          <div key={g.heading} className="seo-topic-cluster-col">
            <span className="seo-topic-cluster-heading">{g.heading}</span>
            <ul>
              {g.items.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href}>{shortLabel(item.label, 48)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
