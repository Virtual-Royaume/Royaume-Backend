FROM node:16.16-alpine

WORKDIR /app

COPY package*.json node_modules ./

RUN npm install

COPY . .

CMD npm run dev