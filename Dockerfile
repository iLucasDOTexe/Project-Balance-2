FROM node:latest

WORKDIR /home/lucaspi/apps/running

COPY package*.json ./

RUN npm install

COPY projectbalance.js ./

COPY Frontend ./Frontend

COPY . .

CMD ["npm", "start"]