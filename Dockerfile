FROM node:24-alpine

WORKDIR /foundry-discord-dice

COPY package*.json .

RUN npm install --silent --progress=false

COPY . .

RUN npx prisma migrate deploy

CMD ["npm", "start"]
