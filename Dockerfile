FROM node:18-alpine AS base

# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache curl libc6-compat

RUN curl -sSL https://rover.apollo.dev/nix/v0.14.2 | sh
ENV PATH="/root/.rover/bin:${PATH}"
RUN rover --version

ARG BPD_MAIN_BASEPATH=http://backpackerdeals-main:8080
ARG ENV_TARGET="stage"
ENV BPD_MAIN_BASEPATH=$BPD_MAIN_BASEPATH
ENV NODE_OPTIONS='--max_old_space_size=4096'

WORKDIR /app
COPY . .
ENV CI true
RUN npm ci --legacy-peer-deps
RUN npm install sharp@0.32.2 --no-save --legacy-peer-deps
RUN rm -rf ./public
RUN mkdir -p public
RUN echo "ENV_TARGET=$ENV_TARGET"; \
    if [ "$ENV_TARGET" = "production" ]; then \
      npm run schema:download:prod; \
    else \
      npm run schema:download; \
    fi;
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

RUN apk add --no-cache tini

WORKDIR /app

ARG REPO_VERSION=0
ARG SERVICE_NAME="backpackerdeals-next"
ARG BITBUCKET_COMMIT="dev"
ENV REPO_VERSION=$REPO_VERSION
ENV K_SERVICE=$SERVICE_NAME
ENV K_REVISION=$REPO_VERSION
ENV BITBUCKET_COMMIT=${BITBUCKET_COMMIT}
ENV HOSTNAME="0.0.0.0"

ENV NODE_ENV production

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nextjs --uid 1001

RUN touch newrelic_agent.log
RUN chown nextjs:nodejs newrelic_agent.log

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN npm install sharp@0.32.2 --no-save --legacy-peer-deps

USER nextjs

ENV PORT 3000
EXPOSE 3000

# match DOCUMENT_ROOT in php container
ARG BPD_MAIN_BASEPATH=http://backpackerdeals-main:8080
ENV BPD_MAIN_BASEPATH=$BPD_MAIN_BASEPATH

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1
ENV CLOUD_LOGGING 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./server.js"]

# Production image, copy all the files static files and searve from openresty
FROM openresty/openresty:1.21.4.1-alpine AS nginx

COPY ./docker/nginx/rootfs /

WORKDIR /var/www/html

COPY --from=builder /app/public ./
# only copy static files
COPY --from=builder /app/.next/static ./_next/static
