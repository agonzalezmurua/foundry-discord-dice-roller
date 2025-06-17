FROM node:22-alpine

COPY package.json,package-lock.json .

WORKDIR /foundry-discord-dice

RUN npm install --silent --progress=false --omit-dev=true

RUN npx prisma migrate deploy

CMD ["npm", "start"]
