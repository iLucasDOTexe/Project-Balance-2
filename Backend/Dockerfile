FROM node:latest

WORKDIR /running

COPY /home/lucaspi/apps/Project-Balance-2/Backend/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]