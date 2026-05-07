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
RUN npx prisma generate --schema=services/commerce-service/prisma/schema.prisma
RUN npm run build -w @novure/commerce-service

# Stage 2: Runner
FROM node:24.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=builder /app/services/commerce-service/src ./src
COPY --from=builder /app/services/commerce-service/package.json ./package.json
COPY --from=builder /app/services/commerce-service/prisma ./prisma
COPY --from=builder /app/services/commerce-service/src/generated ./src/generated
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R expressjs:nodejs /app

USER expressjs
EXPOSE 3001
ENV PORT=3001

CMD ["npx", "tsx", "services/commerce-service/src/index.ts"]
