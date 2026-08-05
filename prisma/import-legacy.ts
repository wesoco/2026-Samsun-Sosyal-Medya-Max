/**
 * Legacy HTML → Prisma içerik aktarımı
 * Çalıştır: npx tsx prisma/import-legacy.ts
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ROOT = path.join(process.cwd(), "legacy");

function meta(html: string, name: string) {
  const m = html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i"))
    || html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+name="${name}"`, "i"));
  return m?.[1]?.trim() || null;
}

function og(html: string, prop: string) {
  const m = html.match(new RegExp(`<meta\\s+property="${prop}"\\s+content="([^"]*)"`, "i"))
    || html.match(new RegExp(`<meta\\s+content="([^"]*)"\\s+property="${prop}"`, "i"));
  return m?.[1]?.trim() || null;
}

function titleTag(html: string) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.replace(/\s*\|.*$/, "").trim() || null;
}

function between(html: string, startRe: RegExp, endRe: RegExp) {
  const s = html.search(startRe);
  if (s < 0) return "";
  const after = html.slice(s);
  const openEnd = after.indexOf(">");
  const rest = after.slice(openEnd + 1);
  const e = rest.search(endRe);
  return e < 0 ? rest : rest.slice(0, e);
}

function rewriteLinks(html: string, section: "bolgeler" | "hizmet" | "blog") {
  const indexMap = { bolgeler: "/bolgeler", hizmet: "/hizmetler", blog: "/blog" } as const;
  return html
    .replace(/href="\.\.\/index\.html(#[^"]*)?"/g, (_m, hash: string | undefined) => `href="/${hash || ""}"`)
    .replace(/href="\.\.\/hizmet\/index\.html"/g, 'href="/hizmetler"')
    .replace(/href="\.\.\/hizmet\/([^"]+)\.html"/g, 'href="/hizmetler/$1"')
    .replace(/href="\.\.\/bolgeler\/index\.html"/g, 'href="/bolgeler"')
    .replace(/href="\.\.\/bolgeler\/([^"]+)\.html"/g, 'href="/bolgeler/$1"')
    .replace(/href="\.\.\/blog\/index\.html"/g, 'href="/blog"')
    .replace(/href="\.\.\/blog\/([^"]+)\.html"/g, 'href="/blog/$1"')
    .replace(/href="index\.html"/g, `href="${indexMap[section]}"`)
    .replace(/href="([^"/]+)\.html"/g, (_m, slug: string) => {
      if (section === "bolgeler") return `href="/bolgeler/${slug}"`;
      if (section === "hizmet") return `href="/hizmetler/${slug}"`;
      return `href="/blog/${slug}"`;
    });
}

function extractFaqs(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  const re =
    /<details class="faq-item[^"]*">\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    faqs.push({
      q: m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
      a: m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    });
  }
  return faqs;
}

function extractPageBlocks(html: string) {
  const blocks: string[] = [];
  const re = /<section class="page-block[^"]*">([\s\S]*?)<\/section>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const block = m[0];
    if (/class="page-block[^"]*page-regions/.test(block) || /page-regions-list/.test(block)) continue;
    if (/Sıkça sorulanlar/.test(block) && /faq-item/.test(block)) continue;
    let inner = block.match(/<div class="container[^"]*">([\s\S]*)<\/div>\s*<\/section>/i)?.[1];
    if (!inner) continue;
    // İlçe sayfalarında gereksiz şablon blokları
    inner = inner
      .replace(/<p class="page-inline-links">[\s\S]*?<\/p>/gi, "")
      .replace(/<h2>[^<]*sosyal medya hizmeti<\/h2>\s*<p class="block-desc">[\s\S]*?<\/p>\s*<div class="page-services">[\s\S]*?<\/div>/gi, "")
      .replace(/<div class="page-services">[\s\S]*?<\/div>/gi, "")
      .replace(/<p class="block-desc">[\s\S]*?<\/p>/gi, "")
      .trim();
    if (inner) blocks.push(inner);
  }
  return blocks;
}

function slugFromFile(file: string) {
  return path.basename(file, ".html");
}

async function importDistricts() {
  const dir = path.join(ROOT, "bolgeler");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html") && f !== "index.html");
  let i = 0;
  for (const file of files) {
    i += 1;
    const slug = slugFromFile(file);
    const html = fs.readFileSync(path.join(dir, file), "utf8");
    const regionLabel =
      html.match(/<span class="section-label">([^<]*)<\/span>/)?.[1]?.trim() || "Trabzon";
    const h1 = html.match(/<h1>([^<]*)<\/h1>/)?.[1]?.trim() || `${slug} sosyal medya yönetimi.`;
    const name = h1.replace(/\s*sosyal medya yönetimi\.?\s*$/i, "").trim() || slug;
    const lead = html.match(/<p class="lead">([^<]*)<\/p>/)?.[1]?.trim() || "";
    const faqs = extractFaqs(html);
    const bodyHtml = rewriteLinks(extractPageBlocks(html).join("\n"), "bolgeler");
    const seoTitle = titleTag(html) || `${name} Sosyal Medya Yönetimi | Trabzon Sosyal Medya Ajansı`;
    const seoDesc = meta(html, "description") || lead;

    await prisma.district.upsert({
      where: { slug },
      create: {
        slug,
        name,
        regionLabel,
        lead,
        bodyHtml,
        faqJson: faqs,
        seoTitle,
        seoDesc,
        published: true,
        sortOrder: i,
      },
      update: {
        name,
        regionLabel,
        lead,
        bodyHtml,
        faqJson: faqs,
        seoTitle,
        seoDesc,
        published: true,
        sortOrder: i,
      },
    });
    console.log("district", slug, "body", bodyHtml.length);
  }
}

async function importServices() {
  const dir = path.join(ROOT, "hizmet");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html") && f !== "index.html");
  const order = [
    "sosyal-medya-yonetimi",
    "instagram-yonetimi",
    "icerik-uretimi-cekim",
    "meta-ads",
    "google-ads",
    "drone-cekimi",
    "dijital-pazarlama-ajansi",
    "sosyal-medya-ajansi",
    "reklam-ajansi",
  ];
  files.sort((a, b) => {
    const ia = order.indexOf(slugFromFile(a));
    const ib = order.indexOf(slugFromFile(b));
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  let i = 0;
  for (const file of files) {
    i += 1;
    const slug = slugFromFile(file);
    const html = fs.readFileSync(path.join(dir, file), "utf8");
    const title = html.match(/<h1>([^<]*)<\/h1>/)?.[1]?.trim() || slug;
    const lead = html.match(/<p class="lead">([^<]*)<\/p>/)?.[1]?.trim() || "";
    const faqs = extractFaqs(html);
    const bodyHtml = rewriteLinks(extractPageBlocks(html).join("\n"), "hizmet");
    const seoTitle = titleTag(html) || `${title} | Trabzon Sosyal Medya`;
    const seoDesc = meta(html, "description") || lead;

    await prisma.service.upsert({
      where: { slug },
      create: {
        slug,
        title,
        lead,
        bodyHtml,
        faqJson: faqs,
        seoTitle,
        seoDesc,
        published: true,
        sortOrder: i,
      },
      update: {
        title,
        lead,
        bodyHtml,
        faqJson: faqs,
        seoTitle,
        seoDesc,
        published: true,
        sortOrder: i,
      },
    });
    console.log("service", slug, "body", bodyHtml.length);
  }
}

async function importBlogs() {
  const dir = path.join(ROOT, "blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html") && f !== "index.html");
  for (const file of files) {
    const slug = slugFromFile(file);
    const html = fs.readFileSync(path.join(dir, file), "utf8");
    const title = html.match(/<article[\s\S]*?<h1>([^<]*)<\/h1>/)?.[1]?.trim() || titleTag(html) || slug;
    const lead =
      html.match(/<p class="blog-lead">([\s\S]*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, "").trim() ||
      meta(html, "description") ||
      "";
    const coverUrl = og(html, "og:image") || html.match(/<div class="blog-cover">\s*<img[^>]+src="([^"]+)"/)?.[1] || null;
    const category =
      html.match(/blog-meta">[^<]*·\s*([^<]+)</)?.[1]?.trim() ||
      html.match(/·\s*([^<]+)<\/p>/)?.[1]?.trim() ||
      "Genel";
    const dateStr =
      html.match(/datetime="([^"]+)"/)?.[1] ||
      og(html, "article:published_time") ||
      "2026-07-28";
    const publishedAt = new Date(dateStr);
    let bodyHtml = html.match(/<div class="blog-content">([\s\S]*?)<\/div>\s*(?:<p class="blog-cta-line">|<nav class="blog-related")/)?.[1] || "";
    if (!bodyHtml) {
      bodyHtml = between(html, /<div class="blog-content">/i, /<\/div>\s*<p class="blog-cta-line"|<\/div>\s*<nav class="blog-related"/i);
    }
    // strip nested FAQ from body if present  keep in body as HTML is fine for blogs
    bodyHtml = rewriteLinks(bodyHtml.trim(), "blog");
    const faqs = extractFaqs(html);
    const seoTitle = titleTag(html) || `${title} | Trabzon Sosyal Medya`;
    const seoDesc = meta(html, "description") || lead;

    await prisma.blogPost.upsert({
      where: { slug },
      create: {
        slug,
        title,
        lead,
        bodyHtml,
        coverUrl,
        category,
        publishedAt: Number.isNaN(publishedAt.getTime()) ? new Date() : publishedAt,
        published: true,
        seoTitle,
        seoDesc,
        faqJson: faqs,
      },
      update: {
        title,
        lead,
        bodyHtml,
        coverUrl,
        category,
        publishedAt: Number.isNaN(publishedAt.getTime()) ? undefined : publishedAt,
        published: true,
        seoTitle,
        seoDesc,
        faqJson: faqs,
      },
    });
    console.log("blog", slug, "body", bodyHtml.length);
  }
}

async function importHomeFaqs() {
  const file = path.join(ROOT, "index.html");
  if (!fs.existsSync(file)) {
    console.warn("legacy/index.html yok, ana sayfa SSS atlandı");
    return;
  }
  const html = fs.readFileSync(file, "utf8");
  const sec = html.match(/id="sss"[\s\S]*?<\/section>/i)?.[0] || html;
  const faqs = extractFaqs(sec);
  if (!faqs.length) {
    console.warn("Ana sayfa SSS bulunamadı");
    return;
  }
  await prisma.faqItem.deleteMany();
  await prisma.faqItem.createMany({
    data: faqs.map((f, i) => ({
      question: f.q,
      answer: f.a,
      sortOrder: i + 1,
      published: true,
    })),
  });
  console.log("home faqs", faqs.length);
}

async function main() {
  await importDistricts();
  await importServices();
  await importBlogs();
  await importHomeFaqs();
  console.log("Legacy import completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
