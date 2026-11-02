import Script from "next/script";

const FALLBACK_GTM = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M2W8R68W";

export function resolveGtmId(fromDb?: string | null) {
  const id = (fromDb || FALLBACK_GTM || "").trim();
  return /^GTM-[A-Z0-9]+$/i.test(id) ? id : "";
}

/**
 * Google Tag Manager — ilk etkileşimde (kaydırma, dokunma, tıklama, tuş) ya da
 * sayfa yüklendikten 4 sn sonra yüklenir. GTM + GA4 ~300 KB script ve ~400 ms ana thread
 * kilidiydi; açılışta LCP/TBT'yi bozuyordu. dataLayer olayları bekleme sırasında kuyrukta kalır.
 */
export function GoogleTagManager({ gtmId }: { gtmId?: string | null }) {
  const id = resolveGtmId(gtmId);
  if (!id) return null;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,l,i){
        w[l]=w[l]||[];
        var done=false,ev=['scroll','pointerdown','touchstart','keydown','mousemove'];
        function load(){
          if(done)return;done=true;
          ev.forEach(function(e){w.removeEventListener(e,load,{passive:true});});
          w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var j=d.createElement('script');j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i;
          d.head.appendChild(j);
        }
        ev.forEach(function(e){w.addEventListener(e,load,{passive:true,once:true});});
        function later(){setTimeout(load,4000);}
        if(d.readyState==='complete')later();else w.addEventListener('load',later,{once:true});
      })(window,document,'dataLayer','${id}');
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

/**
 * Consent Mode v2 varsayılanı — GTM'den önce çalışmalı. Kayıtlı onay varsa hemen günceller.
 * Anahtar CookieConsent ile aynı: "ssm-consent".
 */
export function ConsentDefaults() {
  return (
    <script
      id="consent-defaults"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{if(localStorage.getItem('ssm-consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`,
      }}
    />
  );
}
