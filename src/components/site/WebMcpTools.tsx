"use client";

import { useEffect } from "react";

type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: string; description?: string }>;
    required?: string[];
  };
  execute: (args: Record<string, unknown>) => Promise<{ content: { type: "text"; text: string }[] }>;
};

type ModelContext = {
  registerTool: (tool: ToolDefinition) => { unregister?: () => void } | void;
};

/**
 * WebMCP araçlarını kaydeder (Lighthouse Agentic Browsing + AI agentler).
 * Native API yoksa sessizce çıkar; polyfill eklenmez (performans için).
 */
export function WebMcpTools() {
  useEffect(() => {
    const ctx = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!ctx?.registerTool) return;

    const regs: Array<{ unregister?: () => void } | void> = [];

    regs.push(
      ctx.registerTool({
        name: "open_whatsapp",
        description:
          "Trabzon Sosyal Medya WhatsApp sohbetini açar. Hızlı teklif veya soru için kullanın.",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Önceden doldurulacak mesaj (opsiyonel)",
            },
          },
        },
        execute: async ({ message }) => {
          const link = document.querySelector<HTMLAnchorElement>("a.header-whatsapp, a.wa-float");
          const href = link?.href || "https://wa.me/905380581122";
          const url = new URL(href);
          if (typeof message === "string" && message.trim()) {
            url.searchParams.set("text", message.trim());
          }
          window.open(url.toString(), "_blank", "noopener,noreferrer");
          return { content: [{ type: "text", text: "WhatsApp açıldı." }] };
        },
      }),
    );

    regs.push(
      ctx.registerTool({
        name: "navigate_site",
        description:
          "Sitede bir sayfaya gider. Örnek path: /hizmetler, /iletisim, /blog, /vakalar, /sss.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Site içi path (ör. /hizmetler veya /iletisim)",
            },
          },
          required: ["path"],
        },
        execute: async ({ path }) => {
          const raw = String(path || "/").trim();
          const next = raw.startsWith("/") ? raw : `/${raw}`;
          window.location.assign(next);
          return { content: [{ type: "text", text: `Yönlendirildi: ${next}` }] };
        },
      }),
    );

    regs.push(
      ctx.registerTool({
        name: "scroll_to_contact",
        description: "Ana sayfadaki iletişim / teklif formuna kaydırır.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          const el = document.getElementById("iletisim") || document.querySelector(".contact-form");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return { content: [{ type: "text", text: "İletişim bölümüne kaydırıldı." }] };
          }
          window.location.assign("/iletisim");
          return { content: [{ type: "text", text: "İletişim sayfasına yönlendirildi." }] };
        },
      }),
    );

    return () => {
      for (const r of regs) r?.unregister?.();
    };
  }, []);

  return null;
}
