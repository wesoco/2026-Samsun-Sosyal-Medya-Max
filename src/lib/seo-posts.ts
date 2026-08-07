import {
  createDefaultStore,
  normalizeAgentPostImages,
  type AgentPost,
} from "@wesoco/seo-agent";

export type { AgentPost };

export async function listSeoPosts(): Promise<AgentPost[]> {
  return (await createDefaultStore().list())
    .filter((p) => p.status === "published")
    .map(normalizeAgentPostImages);
}

export async function getSeoPost(slug: string): Promise<AgentPost | null> {
  const post = await createDefaultStore().getBySlug(slug);
  if (!post || post.status !== "published") return null;
  return normalizeAgentPostImages(post);
}
