import { promises as fs } from "node:fs";
import path from "node:path";

export interface AgentPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  bodyHtml: string;
  bodyMarkdown: string;
  faq: { question: string; answer: string }[];
  schemaJson: Record<string, unknown>;
  coverImageUrl?: string;
  status: "draft" | "published";
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
}

export interface PostStore {
  list(): Promise<AgentPost[]>;
  getBySlug(slug: string): Promise<AgentPost | null>;
  getById(id: string): Promise<AgentPost | null>;
  upsert(post: AgentPost): Promise<AgentPost>;
  deleteById(id: string): Promise<boolean>;
}

/** File-backed store for demo / simple Next sites. */
export class FilePostStore implements PostStore {
  constructor(private dir: string) {}

  private filePath() {
    return path.join(this.dir, "posts.json");
  }

  private async ensure() {
    await fs.mkdir(this.dir, { recursive: true });
    try {
      await fs.access(this.filePath());
    } catch {
      await fs.writeFile(this.filePath(), "[]", "utf8");
    }
  }

  async list(): Promise<AgentPost[]> {
    await this.ensure();
    const raw = await fs.readFile(this.filePath(), "utf8");
    return JSON.parse(raw) as AgentPost[];
  }

  async getBySlug(slug: string): Promise<AgentPost | null> {
    const posts = await this.list();
    return posts.find((p) => p.slug === slug) ?? null;
  }

  async getById(id: string): Promise<AgentPost | null> {
    const posts = await this.list();
    return posts.find((p) => p.id === id) ?? null;
  }

  async upsert(post: AgentPost): Promise<AgentPost> {
    const posts = await this.list();
    const idx = posts.findIndex((p) => p.slug === post.slug || p.id === post.id);
    if (idx >= 0) posts[idx] = post;
    else posts.unshift(post);
    await fs.writeFile(this.filePath(), JSON.stringify(posts, null, 2), "utf8");
    return post;
  }

  async deleteById(id: string): Promise<boolean> {
    const posts = await this.list();
    const next = posts.filter((p) => p.id !== id);
    if (next.length === posts.length) return false;
    await fs.writeFile(this.filePath(), JSON.stringify(next, null, 2), "utf8");
    return true;
  }
}

export function createDefaultStore(): PostStore {
  const dir =
    process.env.SEO_AGENT_DATA_DIR ||
    path.join(process.cwd(), ".data", "seo-agent");
  return new FilePostStore(dir);
}
