FROM node:19

# Set workdir:
WORKDIR /usr/src/app

# Install deps:
COPY package.json ./
RUN npm install

# Copy all files:
COPY . .

CMD npm run start