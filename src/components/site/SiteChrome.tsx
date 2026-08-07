import { prisma } from "@/lib/prisma";
import { SiteHeader, MobileNav } from "@/components/site/Header";
import { SiteFooter, WhatsAppFloat } from "@/components/site/Footer";
import { SiteInteractionsLazy } from "@/components/site/SiteInteractionsLazy";
import { WebMcpToolsLazy } from "@/components/site/WebMcpToolsLazy";
import { ScrollManager } from "@/components/site/ScrollManager";

type Settings = {
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  addressLine1: string;
  addressLine2: string;
};

const FALLBACK: Settings = {
  phone: "+905380581122",
  phoneDisplay: "+90 (538) 058 11 22",
  email: "info@wesoco.com",
  whatsapp: "905380581122",
  addressLine1: "Gazipaşa Mah. Uzun Sk.",
  addressLine2: "Can Bakkal İş Merkezi, Ortahisar / Trabzon",
};

export async function getSiteSettings(): Promise<Settings> {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  return {
    phone: settings?.phone ?? FALLBACK.phone,
    phoneDisplay: settings?.phoneDisplay ?? FALLBACK.phoneDisplay,
    email: settings?.email ?? FALLBACK.email,
    whatsapp: settings?.whatsapp ?? FALLBACK.whatsapp,
    addressLine1: settings?.addressLine1 ?? FALLBACK.addressLine1,
    addressLine2: settings?.addressLine2 ?? FALLBACK.addressLine2,
  };
}

/** Tek header + footer - ana sayfa ve tüm iç sayfalar aynı chrome */
export async function SiteChrome({
  children,
  variant = "inner",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "home" | "inner";
  className?: string;
}) {
  const s = await getSiteSettings();
  const districts = await prisma.district.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, name: true },
  });

  return (
    <div className={className || undefined}>
      <SiteHeader phoneDisplay={s.phoneDisplay} whatsapp={s.whatsapp} variant={variant} />
      <MobileNav whatsapp={s.whatsapp} />
      <ScrollManager />
      <SiteInteractionsLazy variant={variant} />
      <WebMcpToolsLazy />
      {children}
      <SiteFooter
        phone={s.phone}
        phoneDisplay={s.phoneDisplay}
        email={s.email}
        whatsapp={s.whatsapp}
        addressLine1={s.addressLine1}
        addressLine2={s.addressLine2}
        regions={districts}
      />
      <WhatsAppFloat whatsapp={s.whatsapp} />
    </div>
  );
}
