import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export type ContactMailPayload = {
  name: string;
  phone: string;
  email?: string | null;
  district?: string | null;
  service?: string | null;
  message: string;
};

export async function sendContactNotification(payload: ContactMailPayload) {
  const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!s?.smtpEnabled || !s.smtpHost || !s.smtpUser || !s.smtpPass) {
    return { sent: false, reason: "smtp-disabled" as const };
  }

  const to = (s.notifyEmail || s.email || "").trim();
  if (!to) return { sent: false, reason: "no-recipient" as const };

  const from = (s.smtpFrom || s.smtpUser).trim();
  const prefix = (s.emailSubjectPrefix || "Siteden yeni mesaj").trim();
  const subject = `${prefix} — ${payload.name}`;

  const lines = [
    "Web sitesi iletişim formundan yeni mesaj:",
    "",
    `Ad Soyad: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-posta: ${payload.email || "—"}`,
    `İlçe: ${payload.district || "—"}`,
    `Hizmet: ${payload.service || "—"}`,
    "",
    "Mesaj:",
    payload.message,
    "",
    "—",
    `${s.siteName} iletişim formu`,
  ];

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
    text: lines.join("\n"),
  });

  return { sent: true as const };
}
