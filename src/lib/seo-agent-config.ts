import { prisma } from "@/lib/prisma";

export type SeoAgentConfig = {
  siteKey: string;
  siteSecret: string;
  publicBaseUrl: string;
  /** DB’de kayıtlı mı (env fallback değil) */
  fromDb: {
    publicUrl: boolean;
    siteKey: boolean;
    secret: boolean;
  };
};

/** Admin önizleme: baş/son birkaç karakter, ortası gizli. */
export function maskCredential(value: string, visible = 4): string {
  const v = value.trim();
  if (!v) return "—";
  if (v.length <= visible * 2) return "••••••••";
  return `${v.slice(0, visible)}••••${v.slice(-visible)}`;
}

/** Admin / API: DB değeri varsa onu, yoksa env kullanır. */
export async function getSeoAgentConfig(): Promise<SeoAgentConfig> {
  const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const dbUrl = s?.seoAgentPublicUrl?.trim() || "";
  const dbKey = s?.seoAgentSiteKey?.trim() || "";
  const dbSecret = s?.seoAgentSecret?.trim() || "";

  return {
    publicBaseUrl:
      dbUrl ||
      process.env.SEO_AGENT_PUBLIC_URL?.trim() ||
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "",
    siteKey: dbKey || process.env.SEO_AGENT_SITE_KEY?.trim() || "",
    siteSecret: dbSecret || process.env.SEO_AGENT_SECRET?.trim() || "",
    fromDb: {
      publicUrl: Boolean(dbUrl),
      siteKey: Boolean(dbKey),
      secret: Boolean(dbSecret),
    },
  };
}
