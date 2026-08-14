# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY packages ./packages
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ISR pages query Postgres at build time — pass a reachable DATABASE_URL (CI service or local).
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG NEXT_PUBLIC_SITE_URL=https://samsunsosyalmedya.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GTM_ID=GTM-M2W8R68W
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV UPLOAD_DIR=/app/uploads
ARG NEXT_PUBLIC_SITE_URL=https://samsunsosyalmedya.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GTM_ID=GTM-M2W8R68W
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && npm install -g prisma@6.19.3 \
  && mkdir -p /app/uploads \
  && chown -R nextjs:nodejs /app/uploads

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Engines after standalone so they are not overwritten by traced node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
VOLUME ["/app/uploads"]

ENTRYPOINT ["./docker-entrypoint.sh"]
