FROM node:16.16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD npx tsc && npx copyfiles ./resources/**/**/*.* ./build/ && node -r ts-node/register/transpile-only -r tsconfig-paths/register .