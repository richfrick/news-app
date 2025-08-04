FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN chmod +x scripts/wait-for-it.sh

ENV PGHOST=postgres \
    PGDATABASE=nc_news_test \
    PGUSER=postgres \
    PGPASSWORD=postgres \
    PGPORT=5432 \
    TZ=UTC\
    NODE_ENV=test


CMD ["npm", "test"]