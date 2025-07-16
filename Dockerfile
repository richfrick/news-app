FROM node:24.2.0-alpine3.22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9090

CMD ["npm", "run", "start"]