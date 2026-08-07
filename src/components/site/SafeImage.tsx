import Image, { type ImageProps } from "next/image";

function isAbsoluteUrl(src: string) {
  return /^https?:\/\//i.test(src);
}

/**
 * Harici CDN (ör. blog.wesoco.com.tr) görsellerini next/image optimizer
 * üzerinden geçirme — Coolify içinde fetch 400 verebiliyor; tarayıcı doğrudan yükler.
 */
export function SafeImage({ src, alt, unoptimized, ...rest }: ImageProps) {
  const url = typeof src === "string" ? src : "";
  const remote = isAbsoluteUrl(url);
  return (
    <Image src={src} alt={alt} unoptimized={remote || Boolean(unoptimized)} {...rest} />
  );
}
