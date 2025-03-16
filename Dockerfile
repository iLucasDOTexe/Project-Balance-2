FROM node:latest

WORKDIR /home/lucaspi/apps/ProjectBalanceApp/running

COPY Backend/package*.json ./

RUN npm install

COPY Backend/projectbalance.js ./

COPY Frontend ./Frontend

COPY . .

CMD ["npm", "start"]