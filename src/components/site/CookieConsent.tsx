"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { paths } from "@/lib/paths";

export const CONSENT_STORAGE_KEY = "ssm-consent";
const OPEN_EVENT = "ssm-consent-open";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function applyChoice(choice: Choice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* gizli sekme: yalnız bu oturum */
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  w.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  w.dataLayer?.push({ event: "consent_update", consent: choice });
  window.dispatchEvent(new CustomEvent(CONSENT_STORAGE_KEY, { detail: choice }));
}

/**
 * KVKK çerez onayı — analitik/reklam çerezleri onaydan önce kapalı (Consent Mode v2).
 * SSR'da `hidden` gelir; tercih yoksa istemcide açılır (geri dönen ziyaretçide yanıp sönmez).
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // İlk boyamadan sonra aç: LCP öğesiyle yarışmasın
    const timer = readChoice() ? undefined : window.setTimeout(() => setOpen(true), 800);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const choose = (choice: Choice) => {
    applyChoice(choice);
    setOpen(false);
  };

  return (
    <section
      id="cookie-consent"
      className="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihleri"
      data-consent-banner
      hidden={!open}
    >
      <p>
        Sitemizi geliştirmek ve reklam performansını ölçmek için analitik ve pazarlama çerezleri kullanıyoruz. Onay
        vermezseniz yalnızca zorunlu çerezler çalışır. Ayrıntılar:{" "}
        <Link href={paths.cookies}>Çerez Politikası</Link> ve <Link href={paths.kvkk}>KVKK Aydınlatma Metni</Link>.
      </p>
      <div className="cookie-consent-actions">
        <button type="button" className="btn cookie-consent-reject" onClick={() => choose("denied")}>
          Reddet
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
          Kabul et
        </button>
      </div>
    </section>
  );
}

/** Footer'dan tercihleri yeniden açar */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="footer-legal-btn"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Çerez tercihleri
    </button>
  );
}
