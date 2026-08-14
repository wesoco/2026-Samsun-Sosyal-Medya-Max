import type { Metadata } from "next";
import { OFFICE_LAT, OFFICE_LNG } from "@/lib/office-location";
import { absoluteUrl, siteUrl } from "@/lib/paths";

export type FaqPair = { q: string; a: string };

export type SiteNap = {
  siteName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  latitude?: number;
  longitude?: number;
  sameAs?: string[];
};

const DISTRICTS = [
  "İlkadım",
  "Atakum",
  "Canik",
  "Tekkeköy",
  "Bafra",
  "Çarşamba",
  "Vezirköprü",
  "Terme",
  "Havza",
  "Kavak",
  "Alaçam",
  "19 Mayıs",
  "Salıpazarı",
  "Asarcık",
  "Ladik",
  "Ayvacık",
  "Yakakent",
] as const;

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || absoluteUrl("/assets/wesoco-icon.png");
  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "tr-TR": url },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Samsun Sosyal Medya",
      locale: "tr_TR",
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

function postalAddress(nap: SiteNap) {
  return {
    "@type": "PostalAddress",
    streetAddress: nap.addressLine1,
    addressLocality: "Ortahisar",
    addressRegion: "Trabzon",
    postalCode: "61030",
    addressCountry: "TR",
  };
}

export function organizationJsonLd(nap: SiteNap) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: nap.siteName,
    url: siteUrl(),
    logo: absoluteUrl("/assets/wesoco-logo-navy.svg"),
    email: nap.email,
    telephone: nap.phone,
    address: postalAddress(nap),
    sameAs: nap.sameAs || [],
  };
}

export function localBusinessJsonLd(nap: SiteNap) {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${siteUrl()}/#localbusiness`,
    name: nap.siteName,
    url: siteUrl(),
    image: absoluteUrl("/assets/wesoco-icon.png"),
    telephone: nap.phone,
    email: nap.email,
    address: postalAddress(nap),
    geo: {
      "@type": "GeoCoordinates",
      latitude: nap.latitude ?? OFFICE_LAT,
      longitude: nap.longitude ?? OFFICE_LNG,
    },
    areaServed: DISTRICTS.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "AdministrativeArea", name: "Samsun" },
    })),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    parentOrganization: { "@id": `${siteUrl()}/#organization` },
    sameAs: nap.sameAs || [],
  };
}

export function faqPageJsonLd(faqs: FaqPair[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  nap: SiteNap;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${siteUrl()}/#localbusiness` },
    areaServed: { "@type": "AdministrativeArea", name: "Samsun" },
    serviceType: input.name,
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  nap: SiteNap;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image || absoluteUrl("/assets/wesoco-icon.png"),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    inLanguage: "tr-TR",
    keywords: input.keywords?.join(", "),
    author: {
      "@type": "Organization",
      "@id": `${siteUrl()}/#organization`,
      name: input.nap.siteName,
      url: siteUrl(),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl()}/#organization`,
      name: input.nap.siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/wesoco-logo-navy.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    isPartBafra: {
      "@type": "WebSite",
      "@id": `${siteUrl()}/#website`,
      name: input.nap.siteName,
      url: siteUrl(),
    },
  };
}

/** Adım adım süreç - AEO / HowTo snippet adayları */
export function howToJsonLd(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  if (!input.steps.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Homepage / portfolio reference gallery */
export function referenceItemListJsonLd(
  items: { title: string; lead: string; imageUrl: string; filter: string }[]
) {
  const formatLabel = (f: string) =>
    f === "reels" ? "Reels" : f === "tanitici" ? "Tanıtım filmi" : "Sosyal medya postu";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Samsun sosyal medya referansları",
    description:
      "Wesoco / Samsun Sosyal Medya ajansının post, reels ve tanıtım filmi çalışmalarından seçilmiş referanslar.",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.lead,
        image: item.imageUrl.startsWith("http") ? item.imageUrl : absoluteUrl(item.imageUrl),
        genre: formatLabel(item.filter),
        creator: { "@type": "Organization", name: "Wesoco", url: siteUrl() },
      },
    })),
  };
}

export function entityGraphJsonLd(nap: SiteNap) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(nap), localBusinessJsonLd(nap)],
  };
}

export { DISTRICTS };
