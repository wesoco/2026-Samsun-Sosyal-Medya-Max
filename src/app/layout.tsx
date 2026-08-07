import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/site/GoogleTagManager";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  return buildMetadata({
    title: settings?.defaultTitle || "Trabzon Sosyal Medya Ajansı",
    description:
      settings?.defaultDesc ||
      "Trabzon sosyal medya ajansı. Instagram yönetimi, Meta Ads, Google Ads ve içerik üretimi.",
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
      </body>
    </html>
  );
}
