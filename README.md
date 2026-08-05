# Trabzon Sosyal Medya (Next.js 16)

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
  Varsayılan: `admin@trabzonsosyalmedya.com` / `Admin123!`

## Path yapısı
- Kod route’ları İngilizce: `/about`, `/services`, `/regions`, `/blog`, `/contact`, `/faq`
- Public Türkçe URL’ler middleware rewrite: `/hakkimizda`, `/hizmetler`, `/bolgeler`, `/iletisim`, `/sss`
- Eski `.html` URL’ler 301 ile yeni path’lere yönlenir

## Komutlar
- `npm run dev` — geliştirme
- `npm run build && npm start` — production
- `npm run db:studio` — Prisma Studio
- `npm run db:seed` — seed tekrar

Eski statik site: `legacy/` klasöründe.
