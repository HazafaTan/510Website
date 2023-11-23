FROM node:19

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY

ARG DISCORD_CLIENT_ID
ARG DISCORD_CLIENT_SECRET

RUN npm run build

CMD ["node", "/app/build/index.js"]