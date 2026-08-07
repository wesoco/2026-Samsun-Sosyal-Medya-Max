export function jsonLdScript(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function buildLlmsTxt(input: {
  siteName: string;
  domain: string;
  description: string;
  posts: { title: string; slug: string; metaDescription: string }[];
}): string {
  const lines = [
    `# ${input.siteName}`,
    "",
    `> ${input.description}`,
    "",
    `Site: https://${input.domain.replace(/^https?:\/\//, "")}`,
    "",
    "## Blog",
    "",
  ];
  for (const p of input.posts) {
    lines.push(`- [${p.title}](/blog/${p.slug}): ${p.metaDescription}`);
  }
  lines.push("");
  return lines.join("\n");
}
