FROM node:16-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

WORKDIR /app/dist/browser

# Renombrar si no existe index.html pero sí index.csr.html
RUN mv index.csr.html index.html

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]
