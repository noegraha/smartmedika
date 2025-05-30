FROM node:16-alpine

WORKDIR /app

COPY package* .
RUN npm i --legacy-peer-deps

COPY . .

CMD [ "npm", "start" ]