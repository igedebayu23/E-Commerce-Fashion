# Stage 1: Dependencies
FROM node:24.15.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
# Use npm ci for clean, deterministic installs
RUN npm ci

# Stage 2: Builder
FROM node:24.15.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ARGs allow passing values during build time (e.g. for Prisma)
ARG DATABASE_URL
ARG DIRECT_URL

# Set them as ENV for build process
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

# Generate Prisma Client (uses custom output path from schema.prisma)
RUN npx prisma generate

# Build the application (compiles TS to JS in dist/)
RUN npm run build

# Stage 3: Runner
FROM node:24.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Set ownership
RUN chown -R expressjs:nodejs /app

USER expressjs
EXPOSE 3001
ENV PORT=3001

# Run the compiled application
CMD ["node", "dist/index.js"]
