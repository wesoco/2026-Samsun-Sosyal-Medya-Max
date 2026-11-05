#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

UPLOAD_DIR="${UPLOAD_DIR:-/app/uploads}"
mkdir -p "$UPLOAD_DIR"

echo "Syncing database schema (prisma db push)..."
prisma db push --skip-generate

# Kardeş sitelerle aynı kalıp blog yazılarını yayından kaldır (idempotent)
node scripts/retire-blog-posts.cjs

# Tek panel girişi: ADMIN_EMAIL + ADMIN_PASSWORD (+ ADMIN_EXCLUSIVE=1) yoksa hiçbir şey yapmaz
node scripts/ensure-admin.cjs

echo "Starting Next.js..."
exec node server.js
