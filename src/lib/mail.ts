import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { buildFormEmail } from "@/lib/form-email";

export type ContactMailAttachment = {
  label: string;
  filename: string;
  contentType: string;
  content: Buffer;
};

export type ContactMailPayload = {
  id: string;
  createdAt: Date;
  name: string;
  phone: string;
  email?: string | null;
  district?: string | null;
  service?: string | null;
  message: string;
  isJobApplication?: boolean;
  attachments?: ContactMailAttachment[];
};

/** Admin’de virgül / noktalı virgül / boşlukla ayrılmış birden çok alıcı yazılabilir. */
export function parseRecipients(raw: string | null | undefined): string[] {
  const seen = new Set<string>();
  for (const part of (raw || "").split(/[,;\s]+/)) {
    const addr = part.trim().toLowerCase();
    if (addr.includes("@")) seen.add(addr);
  }
  return [...seen];
}

export async function sendContactNotification(payload: ContactMailPayload) {
  const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!s?.smtpEnabled || !s.smtpHost || !s.smtpUser || !s.smtpPass) {
    return { sent: false, reason: "smtp-disabled" as const };
  }
  const to = parseRecipients(s.notifyEmail || s.email);
  if (!to.length) return { sent: false, reason: "no-recipient" as const };

  const from = (s.smtpFrom || s.smtpUser).trim();
  const prefix = (s.emailSubjectPrefix || "Siteden yeni mesaj").trim();
  const subject = payload.isJobApplication
    ? `${prefix} – İş Başvurusu – ${payload.name}`
    : `${prefix} – ${payload.name}`;
  const attachments = payload.attachments ?? [];

  const { html, text } = buildFormEmail({
    type: payload.isJobApplication ? "career" : "contact",
    submissionId: payload.id,
    createdAt: payload.createdAt,
    payload: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      konu: payload.service,
      district: payload.district,
      message: payload.message,
    },
    attachments: attachments.map((a) => ({
      label: a.label,
      filename: a.filename,
      size: a.content.length,
    })),
  });

  const transporter = nodemailer.createTransport({
    host: s.smtpHost,
    port: s.smtpPort || 587,
    secure: s.smtpSecure,
    auth: {
      user: s.smtpUser,
      pass: s.smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"${s.siteName}" <${from}>`,
    to,
    replyTo: payload.email || undefined,
    subject,
    text,
    html,
    attachments: attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });
  return { sent: true as const };
}
