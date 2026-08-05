(() => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ——— Header ——— */
  const onScroll = () => {
    if (document.body.classList.contains("page")) {
      header?.classList.add("is-scrolled");
      return;
    }
    header?.classList.toggle("is-scrolled", window.scrollY > 48);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ——— Mobile menu ——— */
  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Menüyü aç");
    mobileNav?.setAttribute("hidden", "");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "true");
    menuToggle?.setAttribute("aria-label", "Menüyü kapat");
    mobileNav?.removeAttribute("hidden");
    document.body.classList.add("nav-open");
  };

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    open ? closeMenu() : openMenu();
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ——— Hero carousel ——— */
  const slides = [...document.querySelectorAll(".hero-slide")];
  const pagers = [...document.querySelectorAll(".pager-btn")];
  let current = 0;
  let timer;

  const goTo = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      if (active) slide.removeAttribute("hidden");
      else slide.setAttribute("hidden", "");
    });

    pagers.forEach((btn, i) => {
      const active = i === current;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  };

  const startAuto = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6500);
  };

  pagers.forEach((btn) => {
    btn.addEventListener("click", () => {
      goTo(Number(btn.dataset.goto));
      startAuto();
    });
  });

  if (slides.length > 1) {
    goTo(0);
    startAuto();

    const stage = document.getElementById("heroStage");
    stage?.addEventListener("mouseenter", () => clearInterval(timer));
    stage?.addEventListener("mouseleave", startAuto);
  }

  /* ——— Reference filters ——— */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const refItems = document.querySelectorAll(".ref-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      refItems.forEach((item) => {
        const show = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ——— Video lightbox ——— */
  const lightbox = document.getElementById("videoLightbox");
  const lightboxFrame = document.getElementById("videoLightboxFrame");

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxFrame) lightboxFrame.innerHTML = "";
  };

  const openLightbox = (youtubeId) => {
    if (!lightbox || !lightboxFrame || !youtubeId) return;
    lightboxFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0" title="Referans videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  };

  document.querySelectorAll(".ref-play").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.youtube));
  });

  lightbox?.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ——— Reveal ——— */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 8) * 50}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ——— Contact form ——— */
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const district = String(data.get("district") || "").trim();
    const need = String(data.get("need") || "").trim();

    if (!name || !phone || !message || !district || !need) {
      formNote.textContent = "Lütfen zorunlu alanları doldurun.";
      formNote.className = "form-note err";
      return;
    }

    const text = encodeURIComponent(
      `Merhaba, ben ${name}.\nİlçe: ${district}\nİhtiyaç: ${need}\nTelefon: ${phone}\n\n${message}`
    );
    window.open(`https://wa.me/905380581122?text=${text}`, "_blank", "noopener,noreferrer");

    formNote.textContent = "WhatsApp yönlendirildi. Mesajınızı gönderebilirsiniz.";
    formNote.className = "form-note ok";
    form.reset();
  });
})();
