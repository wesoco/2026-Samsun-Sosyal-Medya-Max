import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { clientIp, hit, isLimited, reset } from "@/lib/rate-limit";

/** Kaba kuvvet koruması: e-posta başına 5, IP başına 20 hatalı deneme / 15 dk */
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_PER_EMAIL = 5;
const LOGIN_MAX_PER_IP = 20;

/** Proxy arkasında da __Secure- önekli, Secure bayraklı oturum çerezi */
const SECURE_COOKIES = (process.env.AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "").startsWith("https://");

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  useSecureCookies: SECURE_COOKIES,
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const email = (credentials?.email as string | undefined)?.trim();
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const emailKey = `login:email:${email.toLowerCase()}`;
        const ipKey = `login:ip:${clientIp(request.headers)}`;
        if (isLimited(emailKey, LOGIN_MAX_PER_EMAIL) || isLimited(ipKey, LOGIN_MAX_PER_IP)) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
        if (!user || !ok) {
          hit(emailKey, LOGIN_MAX_PER_EMAIL, LOGIN_WINDOW_MS);
          hit(ipKey, LOGIN_MAX_PER_IP, LOGIN_WINDOW_MS);
          return null;
        }
        reset(emailKey);
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});
