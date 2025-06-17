FROM node:24-alpine3.22

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --silent

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run start"]
