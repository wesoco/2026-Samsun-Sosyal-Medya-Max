"use client";

import dynamic from "next/dynamic";

const SiteInteractions = dynamic(
  () => import("@/components/site/SiteInteractions").then((m) => ({ default: m.SiteInteractions })),
  { ssr: false },
);

/** Ayrı chunk — LCP sonrası hydrate (menü/scroll için gecikmesiz) */
export function SiteInteractionsLazy({ variant = "inner" }: { variant?: "home" | "inner" }) {
  return <SiteInteractions variant={variant} />;
}
