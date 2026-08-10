import { createSeoAgentHandlers } from "@wesoco/seo-agent";
import { getSeoAgentConfig } from "@/lib/seo-agent-config";

async function handlers() {
  const cfg = await getSeoAgentConfig();
  return createSeoAgentHandlers({
    siteKey: cfg.siteKey,
    siteSecret: cfg.siteSecret,
    publicBaseUrl: cfg.publicBaseUrl,
  });
}

export async function GET(req: Request) {
  return (await handlers()).GET(req);
}

export async function POST(req: Request) {
  return (await handlers()).POST(req);
}

export async function PUT(req: Request) {
  return (await handlers()).PUT(req);
}

export async function DELETE(req: Request) {
  return (await handlers()).DELETE(req);
}
