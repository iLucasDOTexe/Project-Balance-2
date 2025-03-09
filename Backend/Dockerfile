FROM node:latest

WORKDIR /home/lucaspi/apps/running

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]