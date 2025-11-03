# Production / staging build for AWS ECS
FROM node:20-alpine AS build
WORKDIR /app

# Build-time environment
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Optional build step for TS or bundled apps
# RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./

ENV NODE_ENV=production
ENV PORT=9090
EXPOSE 9090
CMD ["npm", "run", "start"]
