import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().optional().or(z.literal("")),
  district: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(5).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        district: data.district || null,
        service: data.service || null,
        message: data.message,
      },
    });

    try {
      await sendContactNotification({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        district: data.district || null,
        service: data.service || null,
        message: data.message,
      });
    } catch (err) {
      console.error("[contact] mail send failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
