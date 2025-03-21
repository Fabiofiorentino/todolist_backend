FROM node:18-alpine

WORKDIR /app

# Atualiza os repositórios do Alpine e instala os pacotes
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
