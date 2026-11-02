import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import {
  ConsentDefaults,
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/site/GoogleTagManager";
import { CookieConsent } from "@/components/site/CookieConsent";

/**
 * Montserrat — Türkçe karakterlere ve 400–700 ağırlığa indirgenmiş tek değişken dosya
 * (Google Fonts latin + latin-ext: 105 KB → 30 KB). Lisans: ./fonts/OFL.txt
 */
const montserrat = localFont({
  src: "./fonts/montserrat-tr.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  return buildMetadata({
    title: settings?.defaultTitle || "Samsun Sosyal Medya Ajansı",
    description:
      settings?.defaultDesc ||
      "Samsun sosyal medya ajansı. Instagram yönetimi, Meta Ads, Google Ads ve içerik üretimi.",
    path: paths.home,
    image: settings?.ogImage,
  });
}

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "default" },
    select: { gtmId: true },
  });

  return (
    <html lang="tr">
      <head>
        <ConsentDefaults />
        <link
          rel="preload"
          as="image"
          href="/assets/hero/03.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${montserrat.variable} ${montserrat.className}`}>
        <GoogleTagManagerNoscript gtmId={settings?.gtmId} />
        <GoogleTagManager gtmId={settings?.gtmId} />
        <a className="skip-link" href="#main">
          İçeriğe geç
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
