FROM node:16-slim


WORKDIR /app
COPY dist/browser /app /*ver ruta del index.html al ejecutar el ng build*/


RUN npm install -g serve


EXPOSE 8080


CMD ["serve", "-s", ".", "-l", "8080"]