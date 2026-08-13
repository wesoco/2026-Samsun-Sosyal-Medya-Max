"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  text: string;
};

/** 3 satırı aşan referans lead’inde Devamını oku / Kısalt */
export function RefLead({ text }: Props) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);

  useLayoutEffect(() => {
    const el = pRef.current;
    if (!el || expanded) return;
    // Clamp sonrası taşma varsa buton göster
    setNeedsToggle(el.scrollHeight > el.clientHeight + 1);
  }, [text, expanded]);

  if (!text.trim()) return null;

  return (
    <>
      <p ref={pRef} className={expanded ? "is-expanded" : undefined}>
        {text}
      </p>
      {needsToggle || expanded ? (
        <button
          type="button"
          className="ref-lead-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Kısalt" : "Devamını oku"}
        </button>
      ) : null}
    </>
  );
}
