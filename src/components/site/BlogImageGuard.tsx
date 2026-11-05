"use client";

import { useEffect } from "react";

/** Yazı gövdesindeki dış sunucu görselleri yüklenemezse kırık ikon yerine görseli (ve boş figure'ı) gizler */
export function BlogImageGuard() {
  useEffect(() => {
    const hide = (img: HTMLImageElement) => {
      const fig = img.closest("figure");
      (fig ?? img).style.display = "none";
    };
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(".blog-content img"));
    for (const img of imgs) {
      if (img.complete && img.naturalWidth === 0) hide(img);
      else img.addEventListener("error", () => hide(img), { once: true });
    }
  }, []);
  return null;
}
