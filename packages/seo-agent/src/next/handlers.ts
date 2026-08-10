import { slugify, verifySignature } from "@wesoco/seo-core";
import { normalizeAgentPostImages } from "../normalize-images";
import { createDefaultStore, type AgentPost, type PostStore } from "../storage";

export interface AgentHandlerOptions {
  store?: PostStore;
  siteKey?: string;
  siteSecret?: string;
  publicBaseUrl?: string;
}

function config(opts?: AgentHandlerOptions) {
  return {
    store: opts?.store ?? createDefaultStore(),
    siteKey: opts?.siteKey ?? process.env.SEO_AGENT_SITE_KEY ?? "",
    siteSecret: opts?.siteSecret ?? process.env.SEO_AGENT_SECRET ?? "",
    publicBaseUrl:
      opts?.publicBaseUrl ??
      process.env.SEO_AGENT_PUBLIC_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "",
  };
}

async function readBody(req: Request): Promise<string> {
  return req.text();
}

function unauthorized(message = "Unauthorized") {
  return Response.json({ error: message }, { status: 401 });
}

function authorize(req: Request, body: string, secret: string, siteKey: string) {
  const key = req.headers.get("x-seo-agent-key") || "";
  const timestamp = req.headers.get("x-seo-agent-timestamp") || "";
  const signature = req.headers.get("x-seo-agent-signature") || "";
  if (!siteKey || !secret) return false;
  if (key !== siteKey) return false;
  return verifySignature({ secret, timestamp, body, signature });
}

export function createSeoAgentHandlers(opts?: AgentHandlerOptions) {
  const cfg = () => config(opts);

  async function GET(req: Request) {
    const { store, siteKey, siteSecret } = cfg();
    const url = new URL(req.url);

    // IndexNow anahtar dosyası: arama motorları imzasız okur
    const indexNowKey = (process.env.INDEXNOW_KEY || "").trim();
    if (indexNowKey) {
      const last = url.pathname.split("/").filter(Boolean).pop() || "";
      if (
        last === `${indexNowKey}.txt` ||
        last === "indexnow.txt" ||
        url.searchParams.get("indexnow") === "1"
      ) {
        return new Response(indexNowKey, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }
    }

    if (!authorize(req, "", siteSecret, siteKey)) return unauthorized();

    const slug = url.searchParams.get("slug");
    if (slug) {
      const post = await store.getBySlug(slug);
      if (!post) return Response.json({ error: "Not found" }, { status: 404 });
      return Response.json({ post });
    }
    const posts = await store.list();
    return Response.json({
      posts: posts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        bodyMarkdown: p.bodyMarkdown,
        status: p.status,
        publishedAt: p.publishedAt,
      })),
    });
  }

  async function POST(req: Request) {
    const { store, siteKey, siteSecret, publicBaseUrl } = cfg();
    const body = await readBody(req);
    if (!authorize(req, body, siteSecret, siteKey)) return unauthorized();

    let payload: Partial<AgentPost>;
    try {
      payload = JSON.parse(body) as Partial<AgentPost>;
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!payload.slug || !payload.title || !payload.bodyHtml) {
      return Response.json(
        { error: "slug, title, bodyHtml required" },
        { status: 400 },
      );
    }

    const safeSlug = slugify(String(payload.slug));
    if (!safeSlug) {
      return Response.json(
        { error: "slug geçersiz — yalnızca latin harf, rakam ve tire" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const existing =
      (await store.getBySlug(safeSlug)) ||
      (await store.getBySlug(String(payload.slug)));
    const rawCategory =
      typeof payload.category === "string" ? payload.category.trim() : "";
    const category =
      rawCategory && !/seo\s*agent/i.test(rawCategory)
        ? rawCategory.slice(0, 64)
        : existing?.category;
    const post = normalizeAgentPostImages({
      id: existing?.id ?? `post_${Date.now().toString(36)}`,
      slug: safeSlug,
      title: payload.title,
      metaDescription: payload.metaDescription ?? "",
      bodyHtml: payload.bodyHtml,
      bodyMarkdown: payload.bodyMarkdown ?? "",
      faq: payload.faq ?? [],
      schemaJson: payload.schemaJson ?? {},
      coverImageUrl: payload.coverImageUrl || existing?.coverImageUrl,
      ...(category ? { category } : {}),
      status: payload.status === "draft" ? "draft" : "published",
      publishedAt:
        payload.status === "draft"
          ? existing?.publishedAt
          : payload.publishedAt ?? now,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });

    await store.upsert(post);
    const base = publicBaseUrl.replace(/\/$/, "");
    return Response.json({
      id: post.id,
      slug: post.slug,
      url: base ? `${base}/blog/${post.slug}` : `/blog/${post.slug}`,
    });
  }

  async function PUT(req: Request) {
    return POST(req);
  }

  async function DELETE(req: Request) {
    const { store, siteKey, siteSecret } = cfg();
    const body = await readBody(req);
    if (!authorize(req, body, siteSecret, siteKey)) return unauthorized();

    let payload: { slug?: string };
    try {
      payload = JSON.parse(body || "{}") as { slug?: string };
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const raw = String(payload.slug || "").trim();
    const slug = slugify(raw) || raw;
    if (!slug) {
      return Response.json({ error: "slug required" }, { status: 400 });
    }

    const removed =
      (await store.deleteBySlug(slug)) ||
      (raw !== slug ? await store.deleteBySlug(raw) : false);
    if (!removed) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true, slug });
  }

  return { GET, POST, PUT, DELETE };
}

/** Default handlers using env config — for `export { GET, POST, PUT, DELETE } from "@wesoco/seo-agent/next"`. */
const defaultHandlers = createSeoAgentHandlers();
export const GET = defaultHandlers.GET;
export const POST = defaultHandlers.POST;
export const PUT = defaultHandlers.PUT;
export const DELETE = defaultHandlers.DELETE;
