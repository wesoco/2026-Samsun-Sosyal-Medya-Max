import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification, type ContactMailAttachment } from "@/lib/mail";
import {
  JOB_FILES,
  hasAllowedExtension,
  isJobApplicationSubject,
  type JobFileKey,
} from "@/lib/job-application";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().optional().or(z.literal("")),
  district: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(5).max(5000),
});

type FileError = { field: JobFileKey; error: "required" | "too-large" | "bad-type" };

async function readJobFiles(
  fd: FormData,
): Promise<{ attachments: ContactMailAttachment[] } | FileError> {
  const attachments: ContactMailAttachment[] = [];
  for (const key of Object.keys(JOB_FILES) as JobFileKey[]) {
    const spec = JOB_FILES[key];
    const value = fd.get(spec.field);
    const file = value instanceof File && value.size > 0 ? value : null;
    if (!file) {
      if (spec.required) return { field: key, error: "required" };
      continue;
    }
    if (file.size > spec.maxBytes) return { field: key, error: "too-large" };
    if (!hasAllowedExtension(file.name, key)) return { field: key, error: "bad-type" };
    attachments.push({
      label: spec.label,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      content: Buffer.from(await file.arrayBuffer()),
    });
  }
  return { attachments };
}

export async function POST(req: Request) {
  try {
    const isMultipart = (req.headers.get("content-type") || "").includes("multipart/form-data");
    const fd = isMultipart ? await req.formData() : null;
    const body = fd
      ? Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string"))
      : await req.json();
    const data = schema.parse(body);
    const isJobApplication = isJobApplicationSubject(data.service);

    let attachments: ContactMailAttachment[] = [];
    if (isJobApplication) {
      if (!fd) return NextResponse.json({ ok: false, field: "cv", error: "required" }, { status: 400 });
      const result = await readJobFiles(fd);
      if ("error" in result) return NextResponse.json({ ok: false, ...result }, { status: 400 });
      attachments = result.attachments;
    }

    const storedMessage = attachments.length
      ? `${data.message}\n\nEkler (e-postada): ${attachments.map((a) => `${a.label}: ${a.filename}`).join(", ")}`
      : data.message;

    const record = await prisma.contactMessage.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        district: data.district || null,
        service: data.service || null,
        message: storedMessage,
      },
    });

    try {
      await sendContactNotification({
        id: record.id,
        createdAt: record.createdAt,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        district: data.district || null,
        service: data.service || null,
        message: data.message,
        isJobApplication,
        attachments,
      });
    } catch (err) {
      console.error("[contact] mail send failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
