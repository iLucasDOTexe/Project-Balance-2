FROM node:latest

WORKDIR ~/apps/running

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]