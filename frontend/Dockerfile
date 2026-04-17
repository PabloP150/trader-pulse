# Stage 1: Build Image
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
# Use clean install avoiding caching issues
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
