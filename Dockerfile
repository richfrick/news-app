FROM node:24.2.0-alpine3.22

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 9090

CMD ["npm", "run", "start"]