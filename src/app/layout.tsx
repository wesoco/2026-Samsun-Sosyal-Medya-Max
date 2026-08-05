import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";

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
    description: settings?.defaultDesc || "Trabzon sosyal medya ajansı",
    path: paths.home,
    image: settings?.ogImage,
  });
}

export const revalidate = 60;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero/01-xs.avif"
          type="image/avif"
          fetchPriority="high"
          imageSrcSet="/assets/hero/01-xs.avif 640w"
          imageSizes="360px"
        />
      </head>
      <body className={`${montserrat.variable} ${montserrat.className}`}>
        <a className="skip-link" href="#main">
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
