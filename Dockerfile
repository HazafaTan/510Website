FROM node:19

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ARG DB_USER
ARG DB_PASS
ARG SSH_PASS


RUN npm run build

CMD ["node", "/app/build/index.js"]