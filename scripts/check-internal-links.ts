/**
 * Dahili link tarayıcı - bodyHtml + bilinen path’ler.
 * npm run check:links
 */
import { PrismaClient } from "@prisma/client";
import { paths } from "../src/lib/paths";

const prisma = new PrismaClient();

const STATIC_OK = new Set([
  paths.home,
  paths.about,
  paths.services,
  paths.regions,
  paths.blog,
  paths.contact,
  paths.faq,
  paths.kvkk,
  paths.privacy,
  paths.cookies,
  paths.disclosure,
  "/#iletisim",
  "/#blog",
  "/#referanslar",
  "/#sss",
  "/#hizmetler",
  "/#anasayfa",
]);

function extractHrefs(html: string): string[] {
  const out: string[] = [];
  const re = /href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function normalize(href: string): string | null {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me")) {
    return null;
  }
  if (href.startsWith("#")) return null;
  try {
    const u = href.split("?")[0].split("#")[0];
    return u || null;
  } catch {
    return null;
  }
}

async function main() {
  const [services, districts, posts] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, bodyHtml: true, published: true } }),
    prisma.district.findMany({ select: { slug: true, bodyHtml: true, published: true } }),
    prisma.blogPost.findMany({ select: { slug: true, bodyHtml: true, published: true } }),
  ]);

  const known = new Set<string>(STATIC_OK);
  for (const s of services) if (s.published) known.add(paths.service(s.slug));
  for (const d of districts) if (d.published) known.add(paths.region(d.slug));
  for (const p of posts) if (p.published) known.add(paths.blogPost(p.slug));

  const broken: { source: string; href: string }[] = [];
  const sources: { id: string; html: string }[] = [ ...services.map((s) => ({ id: `service:${s.slug}`, html: s.bodyHtml })),
    ...districts.map((d) => ({ id: `district:${d.slug}`, html: d.bodyHtml })),
    ...posts.map((p) => ({ id: `blog:${p.slug}`, html: p.bodyHtml })),
  ];

  for (const src of sources) {
    for (const raw of extractHrefs(src.html)) {
      const href = normalize(raw);
      if (!href) continue;
      if (href.startsWith("/assets/") || href.startsWith("/_next")) continue;
      // hash-only paths already filtered; allow /#x via STATIC_OK when full path kept
      const pathOnly = href.includes("#") ? href : href;
      if (!known.has(pathOnly) && !known.has(href.split("#")[0] || href)) {
        // allow /bolgeler/foo if district exists
        broken.push({ source: src.id, href });
      }
    }
  }

  // Dedupe
  const uniq = new Map<string, { source: string; href: string }>();
  for (const b of broken) uniq.set(`${b.source}|${b.href}`, b);

  const list = [ ...uniq.values()];
  console.log(
    JSON.stringify(
      {
        knownRoutes: known.size,
        scannedSources: sources.length,
        brokenCount: list.length,
        broken: list.slice(0, 50),
        truncated: list.length > 50,
      },
      null,
      2,
    ),
  );

  if (list.length > 0) process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
