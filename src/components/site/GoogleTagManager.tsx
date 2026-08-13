import Script from "next/script";

const FALLBACK_GTM = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W";

export function resolveGtmId(fromDb?: string | null) {
  const id = (fromDb || FALLBACK_GTM || "").trim();
  return /^GTM-[A-Z0-9]+$/i.test(id) ? id : "";
}

/** Google Tag Manager  -  head script + body noscript */
export function GoogleTagManager({ gtmId }: { gtmId?: string | null }) {
  const id = resolveGtmId(gtmId);
  if (!id) return null;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
    `}</Script>
  );
}

export function GoogleTagManagerNoscript({ gtmId }: { gtmId?: string | null }) {
  const id = resolveGtmId(gtmId);
  if (!id) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
