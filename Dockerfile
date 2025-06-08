FROM node:16-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

WORKDIR /app/dist/browser

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]