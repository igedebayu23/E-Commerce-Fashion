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
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npm run prepare -w @novure/admin-service || echo "Prepare failed, continuing..."
RUN npm run build -w @novure/admin-service

# Stage 2: Runner
FROM node:24.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

COPY --from=builder /app/services/admin-service/src ./src
COPY --from=builder /app/services/admin-service/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R sveltekit:nodejs /app

USER sveltekit
EXPOSE 4001
ENV PORT=4001

CMD ["npx", "tsx", "services/admin-service/src/index.ts"]
