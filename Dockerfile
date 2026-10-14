# OpenTodo website: built with Astro from the pinned site bundle, served by nginx.
# Coolify: build pack Dockerfile, base directory /, port 80. No variables needed.

# 1. Build: fetch the bundle pinned in bundle.json, check the content, build dist/.
FROM node:22-alpine AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Production builds refuse preview bundles (website-platform spec).
ENV SITE_ENV=production
RUN npm run build

# 2. Serve the static output.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/dist/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
