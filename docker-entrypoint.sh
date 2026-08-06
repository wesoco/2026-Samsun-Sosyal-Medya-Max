#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

echo "Syncing database schema (prisma db push)..."
prisma db push --skip-generate

echo "Starting Next.js..."
exec node server.js
