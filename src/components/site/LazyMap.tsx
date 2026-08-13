"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
};

/** Harita iframe’ini viewport’a girince yükler  -  bfcache / ana thread için. */
export function LazyMap({ src, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <div className="contact-map reveal" ref={ref}>
      {active ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="contact-map-placeholder"
          onClick={() => setActive(true)}
          aria-label="Haritayı yükle"
        >
          Haritayı göster
        </button>
      )}
    </div>
  );
}
