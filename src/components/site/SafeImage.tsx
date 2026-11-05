"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { BLOG_FALLBACK_COVER } from "@/lib/blog-cover";

function isAbsoluteUrl(src: string) {
  return /^https?:\/\//i.test(src);
}

/** Ortak blog görseli de yüklenemezse son çare: yerel görsel (kırık simge görünmesin) */
const LOCAL_FALLBACK = "/assets/hero/01.webp";

/**
 * Harici CDN (ör. wesolog.com) görsellerini next/image optimizer
 * üzerinden geçirme  -  Coolify içinde fetch 400 verebiliyor; tarayıcı doğrudan yükler.
 * Görsel boşsa ya da yüklenemezse ortak blog görseline, o da olmazsa yerel görsele düşer.
 */
export function SafeImage({ src, alt, unoptimized, ...rest }: ImageProps) {
  // 0: asıl görsel, 1: ortak blog görseli, 2: yerel görsel
  const [stage, setStage] = useState(0);
  const url = typeof src === "string" ? src.trim() : "";
  const level = typeof src === "string" && !url ? Math.max(stage, 1) : stage;
  const current = level === 0 ? src : level === 1 && url !== BLOG_FALLBACK_COVER ? BLOG_FALLBACK_COVER : LOCAL_FALLBACK;
  const currentUrl = typeof current === "string" ? current : "";
  return (
    <Image
      src={current}
      alt={alt}
      unoptimized={isAbsoluteUrl(currentUrl) || Boolean(unoptimized)}
      onError={current === LOCAL_FALLBACK ? undefined : () => setStage(current === BLOG_FALLBACK_COVER ? 2 : level + 1)}
      {...rest}
    />
  );
}
