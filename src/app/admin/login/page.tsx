import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/lib/auth";
import { paths } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect(paths.admin);
  const sp = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: paths.admin,
      });
    } catch (e) {
      if (e instanceof AuthError) redirect("/admin/login?error=1");
      throw e;
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-stage">
        <div className="admin-login-brand">
          <img src="/assets/wesoco-logo-beyaz.svg" alt="Wesoco" width={160} height={26} />
          <h1>Trabzon Sosyal Medya</h1>
          <p>İçerik, SEO ve mesaj yönetimi paneli. Yalnızca yetkili kullanıcılar.</p>
        </div>
        <form action={login} className="admin-login-card">
          <h2>Admin girişi</h2>
          {sp.error ? <p className="form-error">E-posta veya şifre hatalı.</p> : null}
          <label>
            E-posta
            <input name="email" type="email" required autoComplete="username" placeholder="admin@…" />
          </label>
          <label>
            Şifre
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          <button className="admin-btn admin-btn-primary admin-btn-block" type="submit">
            Giriş yap
          </button>
          <a href={paths.home} className="admin-login-back">
            ← Siteye dön
          </a>
        </form>
      </div>
    </div>
  );
}
