# Stage 1: Build the React Single Page Application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm ci

# Copy full frontend source code
COPY . .

# Build production bundle to /app/dist
RUN npm run build

# Stage 2: Serve optimized assets with high-performance Nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean default nginx public assets
RUN rm -rf ./*

# Copy compiled assets from build stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration for React SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
