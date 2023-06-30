FROM node:19.9.0-alpine3.18 AS builder-front
WORKDIR /client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run build

FROM node:19.9.0-alpine3.18 AS builder
WORKDIR /app
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
RUN npm install
COPY ./server .

FROM node:19.9.0-alpine3.18 AS prod
WORKDIR /app
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
COPY --from=builder /app ./
COPY --from=builder-front /client/build ./build
RUN npm ci --only=production
COPY ./server/.env ./
CMD ["node", "server.js"]
