import { SiteChrome } from "@/components/site/SiteChrome";

export const dynamic = "force-dynamic";

export async function SiteShell({
  children,
  bodyClass = "page",
}: {
  children: React.ReactNode;
  bodyClass?: string;
}) {
  return (
    <SiteChrome variant="inner" className={`site-page ${bodyClass}`}>
      {children}
    </SiteChrome>
  );
}
