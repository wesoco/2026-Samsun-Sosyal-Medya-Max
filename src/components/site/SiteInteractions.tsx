"use client";

import { useEffect } from "react";

export function SiteInteractions({ variant = "home" }: { variant?: "home" | "inner" }) {
  useEffect(() => {
    const header = document.getElementById("header");
    const toggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (variant === "inner") {
      header?.classList.add("is-scrolled");
    }

    const onScroll = () => {
      if (!header || variant === "inner") return;
      header.classList.toggle("is-scrolled", window.scrollY > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onToggle = () => {
      const open = document.body.classList.toggle("nav-open");
      toggle?.setAttribute("aria-expanded", String(open));
      if (mobileNav) {
        if (open) mobileNav.removeAttribute("hidden");
        else mobileNav.setAttribute("hidden", "");
      }
    };
    toggle?.addEventListener("click", onToggle);

    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));

    const slides = Array.from(document.querySelectorAll<HTMLElement>(".hero-slide"));
    const pagerBtns = Array.from(
      document.querySelectorAll<HTMLElement>(".hero-pager button, .hero-pager [data-slide]")
    );
    let idx = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const show = (n: number) => {
      if (!slides.length) return;
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const active = i === idx;
        s.classList.toggle("is-active", active);
        // SEO: HTML hidden kullanma  içerik kaynakta kalsın; görsel geçiş CSS ile
        if (active) s.removeAttribute("aria-hidden");
        else s.setAttribute("aria-hidden", "true");
        // Gecikmeli hero görseli (LCP dışı slaytlar)
        if (active) {
          const img = s.querySelector<HTMLImageElement>("img.hero-img[data-src]");
          if (img?.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("srcset");
            img.removeAttribute("data-src");
          }
          // LCP sonrası hafif drift
          window.setTimeout(() => s.classList.add("is-ready"), 1800);
        }
      });
      pagerBtns.forEach((b, i) => {
        const active = i === idx;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
    };

    if (slides.length) {
      show(0);
      document.querySelector(".hero-slides")?.classList.add("is-animated");
      // LCP penceresini bozmamak için otomatik geçişi geciktir
      const startAutoplay = () => {
        if (timer) return;
        timer = setInterval(() => show(idx + 1), 7000);
      };
      window.setTimeout(startAutoplay, 12000);
      pagerBtns.forEach((b, i) =>
        b.addEventListener("click", () => {
          show(i);
          if (timer) clearInterval(timer);
          timer = undefined;
          startAutoplay();
        })
      );
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      toggle?.removeEventListener("click", onToggle);
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [variant]);

  return null;
}
