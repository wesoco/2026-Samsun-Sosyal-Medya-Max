# Samsun Sosyal Medya (Next.js 16)

SSR-first Next.js 16 + PostgreSQL (Prisma) + Admin paneli.

## Gereksinimler
- Node 22+
- PostgreSQL 16 (`brew services start postgresql@16`)

## Kurulum
```bash
cp .env.example .env
# DATABASE_URL ve AUTH_SECRET düzenle
npm install
npm run db:push
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login  
  Varsayılan: `admin@samsunsosyalmedya.com` / `Admin123!`

## Path yapısı
- Kod route’ları İngilizce: `/about`, `/services`, `/regions`, `/blog`, `/contact`, `/faq`
- Public Türkçe URL’ler middleware rewrite: `/hakkimizda`, `/hizmetler`, `/bolgeler`, `/iletisim`, `/sss`
- Eski `.html` URL’ler 301 ile yeni path’lere yönlenir

## Komutlar
- `npm run dev` — geliştirme
- `npm run build && npm start` — production
- `npm run db:studio` — Prisma Studio
- `npm run db:seed` — seed tekrar

## Deploy (GitHub → GHCR → Coolify)

Akış: `main` push → GitHub Actions image build → `ghcr.io/wesoco/2026-samsun-sosyal-medya-max` → Coolify image pull + Postgres.

### Repo tarafı
- [`Dockerfile`](Dockerfile) — Next.js `standalone` + Prisma
- [`.github/workflows/ghcr.yml`](.github/workflows/ghcr.yml) — build & push (`latest` + `sha-<short>`)
- Build sırasında Postgres gerekir (workflow’da service); lokal test:

```bash
# Postgres ayaktayken
docker build --build-arg DATABASE_URL="$DATABASE_URL" -t samsun-sosyal-medya .
```

### Coolify checklist
1. PostgreSQL servisi oluştur (volume + güçlü şifre); internal `DATABASE_URL` al
2. Resource: **Docker Image** → `ghcr.io/wesoco/2026-samsun-sosyal-medya-max:latest`
3. Private GHCR ise registry credentials (PAT: `read:packages`)
4. Domain + HTTPS
5. Env: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
6. Deploy — container start’ta `prisma db push`; seed **otomatik çalışmaz**
7. Bir kerelik seed: lokalden prod `DATABASE_URL` ile `npm run db:seed` (gerekirse diğer `db:seed-*`)
8. İsteğe bağlı: Coolify webhook ile Actions sonrası auto-redeploy

Eski statik site: `legacy/` klasöründe.
