# Use a single stage for building to ensure consistency
FROM node:24.15.0-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Cache dependencies
COPY package.json package-lock.json ./
COPY apps/admin-web/package.json ./apps/admin-web/
COPY apps/storefront-web/package.json ./apps/storefront-web/
COPY services/api-gateway/package.json ./services/api-gateway/
COPY services/commerce-service/package.json ./services/commerce-service/
COPY services/admin-service/package.json ./services/admin-service/
COPY services/customer-service/package.json ./services/customer-service/
COPY packages/contracts/package.json ./packages/contracts/
COPY packages/database/package.json ./packages/database/

RUN npm ci --include=dev

# Build
COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GATEWAY_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GATEWAY_URL=$NEXT_PUBLIC_GATEWAY_URL

RUN npm run build -w project

# Stage 2: Runner
FROM node:24.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/storefront-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront-web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront-web/.next/static ./apps/storefront-web/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "apps/storefront-web/server.js"]
