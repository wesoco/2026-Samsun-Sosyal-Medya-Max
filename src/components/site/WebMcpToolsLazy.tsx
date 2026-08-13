"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WebMcpToolsInner = dynamic(
  () => import("@/components/site/WebMcpTools").then((m) => ({ default: m.WebMcpTools })),
  { ssr: false },
);

/** WebMCP LCP sonrası  -  agent araçları ilk boyamayı engellemesin */
export function WebMcpToolsLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const arm = () => {
      if (!cancelled) setReady(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(arm, { timeout: 4000 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = globalThis.setTimeout(arm, 2000);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(t);
    };
  }, []);

  if (!ready) return null;
  return <WebMcpToolsInner />;
}
