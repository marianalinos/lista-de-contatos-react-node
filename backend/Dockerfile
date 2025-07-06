# imagem base dependencias
FROM node:22 AS base

RUN apt-get update && apt-get install -y curl

# imagem de desenvolvimento
FROM base AS dev
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts" ]

# imagem de produção
# FROM base AS prod
# WORKDIR /usr/src/app
# COPY package*.json .
# RUN npm ci --only=production
# COPY . .
# RUN npm run build
# EXPOSE 5000
# CMD [ "node", "dist/server.js" ]
