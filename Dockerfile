FROM node:24-alpine

WORKDIR /foundry-discord-dice-roller

COPY package*.json ./

RUN npm install --silent --progress=false --omit-dev

COPY . .

CMD ["npm", "start"]
